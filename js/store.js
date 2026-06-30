/* ============================================================
   Store — handles progress, XP, streaks, profile and (when
   configured) syncing to Supabase for the group leaderboard.

   Works with ZERO setup: everything saves to the phone via
   localStorage. Add Supabase keys in js/config.js to also push
   XP to a shared leaderboard.
   ============================================================ */

const Store = (() => {
  const KEY = 't4ai_state_v1';

  const defaultState = {
    clientId: null,        // random per-device id for the leaderboard
    name: '',
    trade: '',
    avatar: '🦺',
    xp: 0,
    streak: 0,
    lastActiveDay: null,   // YYYY-MM-DD
    completedLessons: {},   // { lessonId: true }
    onboarded: false
  };

  let state = load();
  let supa = null;

  // Ensure a stable device id exists (used as the leaderboard key).
  function ensureClientId() {
    if (!state.clientId) {
      state.clientId = (crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 't4ai-' + Date.now() + '-' + Math.random().toString(36).slice(2);
      save();
    }
    return state.clientId;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign({}, defaultState, JSON.parse(raw));
    } catch (e) { /* ignore */ }
    return Object.assign({}, defaultState);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function daysBetween(a, b) {
    const da = new Date(a + 'T00:00:00');
    const db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  }

  // ---- Streak logic: bump when they do activity on a new day ----
  function touchStreak() {
    const today = todayStr();
    if (state.lastActiveDay === today) return; // already counted today
    if (!state.lastActiveDay) {
      state.streak = 1;
    } else {
      const gap = daysBetween(state.lastActiveDay, today);
      if (gap === 1) state.streak += 1;       // consecutive day
      else if (gap > 1) state.streak = 1;     // missed a day, reset
    }
    state.lastActiveDay = today;
    save();
  }

  // ---- Supabase (optional) ----
  function supabaseReady() {
    return !!(window.CONFIG && window.CONFIG.SUPABASE_URL && window.CONFIG.SUPABASE_ANON_KEY && window.supabase);
  }

  async function initSupabase() {
    if (!supabaseReady()) return false;
    // SAFETY: never touch the live database from local dev/testing. Only the
    // real deployed site (not localhost) reads or writes the leaderboard.
    if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(location.hostname)) {
      console.log('Local dev — leaderboard/Supabase disabled so testing can’t affect live data.');
      return false;
    }
    try {
      supa = window.supabase.createClient(window.CONFIG.SUPABASE_URL, window.CONFIG.SUPABASE_ANON_KEY);
      ensureClientId();
      await syncProfile();
      return true;
    } catch (e) {
      console.warn('Supabase unavailable, running local-only:', e.message);
      supa = null;
      return false;
    }
  }

  async function syncProfile() {
    // Only put someone on the leaderboard once they've actually signed up
    // (entered a name) — not the moment they open the app.
    if (!supa || !state.onboarded) return;
    try {
      const { error } = await supa.rpc('upsert_profile', {
        p_client_id: ensureClientId(),
        p_name: state.name || 'Tradie',
        p_trade: state.trade || '',
        p_avatar: state.avatar || '🦺',
        p_total_xp: state.xp,
        p_streak: state.streak,
        p_last_active: state.lastActiveDay
      });
      if (error) throw error;
    } catch (e) { console.warn('profile sync failed', e.message); }
  }

  async function getLeaderboard(limit = 50) {
    if (!supa) return null; // signal: not configured
    try {
      const { data, error } = await supa.rpc('get_leaderboard', { lim: limit });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('leaderboard fetch failed', e.message);
      return null;
    }
  }

  // ---- Ideas board (community topic requests) ----
  async function getSuggestions(limit = 60) {
    if (!supa) return null; // not configured
    try {
      const { data, error } = await supa.rpc('get_suggestions', { p_client_id: ensureClientId(), lim: limit });
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('suggestions fetch failed', e.message); return null; }
  }

  async function addSuggestion(text) {
    if (!supa) return { ok: false, reason: 'offline' };
    try {
      const { data, error } = await supa.rpc('add_suggestion', { p_client_id: ensureClientId(), p_text: text });
      if (error) throw error;
      return { ok: true, id: data };
    } catch (e) { console.warn('add suggestion failed', e.message); return { ok: false, reason: e.message }; }
  }

  async function toggleSuggestionVote(id) {
    if (!supa) return false;
    try {
      const { error } = await supa.rpc('toggle_suggestion_vote', { p_client_id: ensureClientId(), p_suggestion_id: id });
      if (error) throw error;
      return true;
    } catch (e) { console.warn('vote failed', e.message); return false; }
  }

  // ---- Public API ----
  return {
    get: () => state,
    isSupabaseConfigured: supabaseReady,
    init: initSupabase,

    setProfile(name, trade, avatar) {
      state.name = name;
      state.trade = trade;
      if (avatar) state.avatar = avatar;
      state.onboarded = true;
      save();
      syncProfile();
    },

    completeLesson(lessonId, xpEarned) {
      const firstTime = !state.completedLessons[lessonId];
      state.completedLessons[lessonId] = true;
      // Full XP first time, a small top-up for practice repeats.
      state.xp += firstTime ? xpEarned : Math.round(xpEarned * 0.25);
      touchStreak();
      save();
      syncProfile();
      return { firstTime };
    },

    isLessonDone: (lessonId) => !!state.completedLessons[lessonId],

    unitProgress(unit) {
      const total = unit.lessons.length;
      const done = unit.lessons.filter(l => state.completedLessons[l.id]).length;
      return { done, total };
    },

    getLeaderboard,
    getSuggestions,
    addSuggestion,
    toggleSuggestionVote,

    reset() {
      state = Object.assign({}, defaultState);
      save();
    }
  };
})();
