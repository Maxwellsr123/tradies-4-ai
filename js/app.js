/* ============================================================
   Tradies 4 AI — App shell, router and lesson player
   ============================================================ */

const App = (() => {
  const root = document.getElementById('app');
  let route = { screen: 'home' };

  // ---------- tiny helpers ----------
  const h = (s) => (s == null ? '' : String(s)); // already-trusted html in content
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [a[i], a[k]] = [a[k], a[i]];
    }
    return a;
  };
  const haptic = (ms = 10) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };

  function go(screen, params = {}) {
    route = Object.assign({ screen }, params);
    render();
    window.scrollTo(0, 0);
  }

  // ============================================================
  //  ONBOARDING
  // ============================================================
  function renderOnboarding() {
    const avatars = ['🦺','🔧','⚡','🪛','🔨','🚰','🧰','👷'];
    root.innerHTML = `
      <div class="screen onboard">
        <div class="onboard-hero">
          <div class="logo-badge">🤖</div>
          <h1>Tradies <span>4</span> AI</h1>
          <p class="tag">Learn AI the tradie way. Bite-sized. No jargon.</p>
        </div>
        <div class="card onboard-card">
          <label class="field-label">What do we call ya?</label>
          <input id="ob-name" class="text-input" placeholder="e.g. Dave, or KPA Plumbing" maxlength="24" autocomplete="off" />
          <label class="field-label">Your trade</label>
          <input id="ob-trade" class="text-input" placeholder="e.g. Plumber, Sparky, Builder" maxlength="24" autocomplete="off" />
          <label class="field-label">Pick your badge</label>
          <div class="avatar-row" id="ob-avatars">
            ${avatars.map((a, i) => `<button class="avatar-pick${i===0?' selected':''}" data-a="${a}">${a}</button>`).join('')}
          </div>
          <button id="ob-go" class="btn btn-primary btn-block">Start learning →</button>
          <p class="fineprint">No password. Your progress saves on this phone${Store.isSupabaseConfigured() ? ' and to the group leaderboard.' : '.'}</p>
        </div>
      </div>`;

    let chosen = avatars[0];
    document.getElementById('ob-avatars').addEventListener('click', (e) => {
      const b = e.target.closest('.avatar-pick');
      if (!b) return;
      chosen = b.dataset.a;
      document.querySelectorAll('.avatar-pick').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      haptic();
    });
    document.getElementById('ob-go').addEventListener('click', () => {
      const name = document.getElementById('ob-name').value.trim() || 'Tradie';
      const trade = document.getElementById('ob-trade').value.trim();
      Store.setProfile(name, trade, chosen);
      go('home');
    });
  }

  // ============================================================
  //  HOME (the learning path)
  // ============================================================
  function renderHome() {
    const s = Store.get();
    const intro = `<div class="path-intro">Jump in wherever you like — start with the basics, or dive straight into Claude or ChatGPT. 👇</div>`;
    let units = COURSE.units.map((u, ui) => renderUnit(u, ui)).join('');
    root.innerHTML = `
      ${topBar()}
      <div class="screen path-screen">
        ${intro}
        <div class="path">${units}</div>
        <div class="path-end">🪜 More units land soon — and you can <b>request topics</b> on the Ideas tab!</div>
      </div>
      ${bottomNav('home')}`;
    wirePath();
    wireNav();
  }

  function renderUnit(u, ui) {
    const prog = Store.unitProgress(u);
    const headerLocked = u.locked ? '<span class="lock-pill">🔒 Soon</span>' : `<span class="prog-pill">${prog.done}/${prog.total}</span>`;
    const nodes = u.lessons.map((l, li) => renderNode(u, l, li, ui)).join('');
    return `
      <section class="unit" style="--unit:${u.color}">
        <div class="unit-header">
          <div class="unit-icon">${u.icon}</div>
          <div class="unit-meta">
            <div class="unit-title">${esc(u.title)}</div>
            <div class="unit-sub">${esc(u.subtitle)}</div>
          </div>
          ${headerLocked}
        </div>
        <div class="unit-track">${nodes}</div>
      </section>`;
  }

  function renderNode(u, l, li, ui) {
    const done = Store.isLessonDone(l.id);
    // a lesson is playable if the unit is unlocked AND (first lesson OR previous lesson done)
    const prev = li > 0 ? u.lessons[li - 1] : null;
    const unlocked = !u.locked && (li === 0 || (prev && Store.isLessonDone(prev.id)));
    const isNext = unlocked && !done;
    const cls = done ? 'done' : (unlocked ? 'open' : 'locked');
    const wiggle = (li % 2 === 0) ? 'left' : 'right';
    const badge = done ? '✓' : (unlocked ? l.icon : '🔒');
    return `
      <div class="node-wrap ${wiggle}">
        <button class="node ${cls}" data-unit="${u.id}" data-lesson="${l.id}" ${(!unlocked)?'disabled':''}>
          <span class="node-face">${badge}</span>
          ${isNext ? '<span class="node-pulse"></span>' : ''}
        </button>
        <div class="node-label">${esc(l.title)}${l.cards && l.cards.length ? '' : ' '}</div>
        ${isNext ? '<div class="start-flag">START</div>' : ''}
      </div>`;
  }

  function wirePath() {
    root.querySelectorAll('.node:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const unitId = btn.dataset.unit;
        const lessonId = btn.dataset.lesson;
        const unit = COURSE.units.find(u => u.id === unitId);
        const lesson = unit.lessons.find(l => l.id === lessonId);
        if (!lesson.cards || lesson.cards.length === 0) {
          toast('That lesson’s being written — coming soon!');
          return;
        }
        startLesson(unit, lesson);
      });
    });
  }

  // ============================================================
  //  LESSON PLAYER
  // ============================================================
  let lessonState = null;

  function startLesson(unit, lesson) {
    lessonState = {
      unit, lesson,
      cards: lesson.cards,
      idx: 0,
      correct: 0,
      answered: false,
      wasRight: false
    };
    go('lesson');
  }

  function renderLesson() {
    const ls = lessonState;
    const card = ls.cards[ls.idx];
    const pct = Math.round((ls.idx / ls.cards.length) * 100);
    root.innerHTML = `
      <div class="screen lesson-screen" style="--unit:${ls.unit.color}">
        <div class="lesson-top">
          <button class="x-btn" id="l-quit">✕</button>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <div class="lesson-body" id="l-body">${renderCard(card)}</div>
        <div class="lesson-foot" id="l-foot">
          <button class="btn btn-primary btn-block" id="l-check" disabled>Check</button>
        </div>
      </div>`;
    document.getElementById('l-quit').addEventListener('click', confirmQuit);
    wireCard(card);
  }

  function renderCard(card) {
    switch (card.type) {
      case 'info':      return cardInfo(card);
      case 'choice':    return cardChoice(card);
      case 'truefalse': return cardTrueFalse(card);
      case 'match':     return cardMatch(card);
      case 'order':     return cardOrder(card);
      default:          return `<p>Unknown card.</p>`;
    }
  }

  // ---- INFO ----
  function cardInfo(c) {
    return `
      <div class="card-info">
        <div class="info-emoji">${h(c.icon || '💡')}</div>
        <h2>${h(c.title)}</h2>
        <p>${h(c.body)}</p>
      </div>`;
  }

  // ---- CHOICE ----
  function cardChoice(c) {
    // Shuffle the DISPLAY order so the correct answer isn't always in the same spot.
    // data-i keeps the ORIGINAL index, so the answer-checking logic stays correct.
    const opts = shuffle(c.options.map((o, i) => ({ o, i })));
    return `
      <div class="q-head"><span class="q-kicker">Pick one</span><h2>${h(c.q)}</h2></div>
      <div class="options" id="opts">
        ${opts.map(x => `<button class="opt" data-i="${x.i}">${esc(x.o)}</button>`).join('')}
      </div>`;
  }

  // ---- TRUE/FALSE ----
  function cardTrueFalse(c) {
    return `
      <div class="q-head"><span class="q-kicker">Tip or Trap?</span><h2>${h(c.q)}</h2></div>
      <div class="options tf" id="opts">
        <button class="opt" data-i="1">👍 Tip (true)</button>
        <button class="opt" data-i="0">👎 Trap (false)</button>
      </div>`;
  }

  // ---- MATCH ----
  function cardMatch(c) {
    const lefts = c.pairs.map((p, i) => ({ t: p[0], id: i }));
    const rights = shuffle(c.pairs.map((p, i) => ({ t: p[1], id: i })));
    return `
      <div class="q-head"><span class="q-kicker">Match the pairs</span><h2>${h(c.q)}</h2></div>
      <div class="match-grid">
        <div class="match-col" id="m-left">
          ${lefts.map(l => `<button class="m-item" data-side="L" data-id="${l.id}">${esc(l.t)}</button>`).join('')}
        </div>
        <div class="match-col" id="m-right">
          ${rights.map(r => `<button class="m-item" data-side="R" data-id="${r.id}">${esc(r.t)}</button>`).join('')}
        </div>
      </div>`;
  }

  // ---- ORDER ----
  function cardOrder(c) {
    const items = shuffle(c.steps.map((t, i) => ({ t, correct: i })));
    return `
      <div class="q-head"><span class="q-kicker">Put in order</span><h2>${h(c.q)}</h2></div>
      <div class="order-list" id="order">
        ${items.map(it => `
          <div class="order-item" draggable="false" data-correct="${it.correct}">
            <span class="order-grip">⋮⋮</span>
            <span class="order-text">${esc(it.t)}</span>
            <span class="order-moves">
              <button class="ord-up" aria-label="up">▲</button>
              <button class="ord-down" aria-label="down">▼</button>
            </span>
          </div>`).join('')}
      </div>
      <p class="hint">Tap ▲ ▼ to reorder, top = first.</p>`;
  }

  // ---------- card wiring ----------
  function wireCard(card) {
    const checkBtn = document.getElementById('l-check');

    if (card.type === 'info') {
      checkBtn.disabled = false;
      checkBtn.textContent = 'Got it';
      checkBtn.onclick = () => nextCard();
      return;
    }

    if (card.type === 'choice' || card.type === 'truefalse') {
      let picked = null;
      root.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
        root.querySelectorAll('.opt').forEach(x => x.classList.remove('picked'));
        b.classList.add('picked');
        picked = parseInt(b.dataset.i, 10);
        checkBtn.disabled = false;
        haptic();
      }));
      checkBtn.onclick = () => {
        if (picked === null) return;
        const right = (card.type === 'truefalse') ? (picked === (card.isTrue ? 1 : 0)) : (picked === card.answer);
        const correctIndex = (card.type === 'truefalse') ? (card.isTrue ? 1 : 0) : card.answer;
        root.querySelectorAll('.opt').forEach(b => {
          const i = parseInt(b.dataset.i, 10);
          b.disabled = true;
          if (i === correctIndex) b.classList.add('correct');
          else if (i === picked) b.classList.add('wrong');
        });
        showFeedback(right, card.explain);
      };
      return;
    }

    if (card.type === 'match') {
      let selected = null; // {side,id,el}
      let solved = 0;
      const total = card.pairs.length;
      root.querySelectorAll('.m-item').forEach(b => b.addEventListener('click', () => {
        if (b.classList.contains('matched')) return;
        if (!selected) {
          selected = { side: b.dataset.side, id: b.dataset.id, el: b };
          b.classList.add('sel');
          return;
        }
        if (selected.el === b) { b.classList.remove('sel'); selected = null; return; }
        if (selected.side === b.dataset.side) { // re-pick same side
          selected.el.classList.remove('sel');
          selected = { side: b.dataset.side, id: b.dataset.id, el: b };
          b.classList.add('sel');
          return;
        }
        // different sides — check match
        if (selected.id === b.dataset.id) {
          selected.el.classList.remove('sel');
          selected.el.classList.add('matched');
          b.classList.add('matched');
          haptic();
          solved++;
          if (solved === total) { checkBtn.disabled = false; }
        } else {
          const a = selected.el;
          a.classList.add('miss'); b.classList.add('miss');
          setTimeout(() => { a.classList.remove('miss','sel'); b.classList.remove('miss'); }, 450);
        }
        selected = null;
      }));
      checkBtn.textContent = 'Check';
      checkBtn.onclick = () => showFeedback(true, card.explain); // matching only completes when all right
      return;
    }

    if (card.type === 'order') {
      const list = document.getElementById('order');
      const refresh = () => { checkBtn.disabled = false; };
      list.addEventListener('click', (e) => {
        const item = e.target.closest('.order-item');
        if (!item) return;
        if (e.target.classList.contains('ord-up') && item.previousElementSibling) {
          list.insertBefore(item, item.previousElementSibling);
          haptic();
        } else if (e.target.classList.contains('ord-down') && item.nextElementSibling) {
          list.insertBefore(item.nextElementSibling, item);
          haptic();
        }
        refresh();
      });
      checkBtn.disabled = false;
      checkBtn.onclick = () => {
        const items = [...list.querySelectorAll('.order-item')];
        const ok = items.every((it, i) => parseInt(it.dataset.correct, 10) === i);
        items.forEach((it, i) => {
          it.classList.add(parseInt(it.dataset.correct,10) === i ? 'ord-right' : 'ord-wrong');
        });
        showFeedback(ok, card.explain);
      };
      return;
    }
  }

  // ---------- feedback footer ----------
  function showFeedback(right, explain) {
    lessonState.answered = true;
    lessonState.wasRight = right;
    if (right) lessonState.correct++;
    haptic(right ? 12 : 30);
    const foot = document.getElementById('l-foot');
    foot.className = 'lesson-foot ' + (right ? 'fb-right' : 'fb-wrong');
    foot.innerHTML = `
      <div class="fb-msg">
        <div class="fb-icon">${right ? '✅' : '📌'}</div>
        <div>
          <div class="fb-title">${right ? 'Nailed it!' : 'Good to know'}</div>
          <div class="fb-text">${h(explain || '')}</div>
        </div>
      </div>
      <button class="btn btn-block ${right ? 'btn-primary' : 'btn-amber'}" id="l-next">Continue</button>`;
    document.getElementById('l-next').addEventListener('click', nextCard);
  }

  function nextCard() {
    lessonState.idx++;
    lessonState.answered = false;
    if (lessonState.idx >= lessonState.cards.length) {
      finishLesson();
    } else {
      renderLesson();
    }
  }

  // Find the next lesson to flow into: next playable lesson in the same unit,
  // else the first playable lesson of the next unlocked unit.
  function findNextLesson(unit, lesson) {
    const li = unit.lessons.indexOf(lesson);
    for (let i = li + 1; i < unit.lessons.length; i++) {
      if (unit.lessons[i].cards && unit.lessons[i].cards.length) return { unit, lesson: unit.lessons[i], sameUnit: true };
    }
    const ui = COURSE.units.indexOf(unit);
    for (let u = ui + 1; u < COURSE.units.length; u++) {
      const nu = COURSE.units[u];
      if (nu.locked) continue;
      const first = nu.lessons.find(l => l.cards && l.cards.length);
      if (first) return { unit: nu, lesson: first, sameUnit: false };
    }
    return null;
  }

  function finishLesson() {
    const ls = lessonState;
    const scored = ls.cards.filter(c => c.type !== 'info').length;
    const { firstTime } = Store.completeLesson(ls.lesson.id, ls.lesson.xp);
    const s = Store.get();
    const accuracy = scored ? Math.round((ls.correct / scored) * 100) : 100;
    const next = findNextLesson(ls.unit, ls.lesson);
    const nextLabel = next ? (next.sameUnit ? 'Next lesson →' : `Next: ${esc(next.unit.title)} →`) : '';
    root.innerHTML = `
      <div class="screen done-screen" style="--unit:${ls.unit.color}">
        <div class="done-burst">🎉</div>
        <h1>Lesson smashed!</h1>
        <div class="done-stats">
          <div class="dstat"><div class="dstat-num">+${firstTime ? ls.lesson.xp : Math.round(ls.lesson.xp*0.25)}</div><div class="dstat-lbl">XP</div></div>
          <div class="dstat"><div class="dstat-num">${accuracy}%</div><div class="dstat-lbl">Accuracy</div></div>
          <div class="dstat"><div class="dstat-num">🔥 ${s.streak}</div><div class="dstat-lbl">Day streak</div></div>
        </div>
        <div class="done-total">Total: <b>${s.xp} XP</b></div>
        ${next ? `<button class="btn btn-primary btn-block" id="d-next">${nextLabel}</button>` : ''}
        <button class="btn ${next ? 'btn-ghost' : 'btn-primary'} btn-block" id="d-cont">Back to path</button>
        ${Store.isSupabaseConfigured() ? '<button class="btn btn-ghost btn-block" id="d-board">See leaderboard 🏆</button>' : ''}
      </div>`;
    const dn = document.getElementById('d-next');
    if (dn) dn.addEventListener('click', () => startLesson(next.unit, next.lesson));
    document.getElementById('d-cont').addEventListener('click', () => go('home'));
    const db = document.getElementById('d-board');
    if (db) db.addEventListener('click', () => go('leaderboard'));
  }

  function confirmQuit() {
    if (lessonState.idx === 0 || confirm('Quit this lesson? Your progress in it won’t be saved.')) {
      go('home');
    }
  }

  // ============================================================
  //  LEADERBOARD
  // ============================================================
  async function renderLeaderboard() {
    root.innerHTML = `
      ${topBar()}
      <div class="screen board-screen">
        <h1 class="board-title">🏆 ${esc((window.CONFIG && window.CONFIG.GROUP_NAME) || 'Group')} Leaderboard</h1>
        <div id="board-list"><div class="loading">Loading the ladder…</div></div>
      </div>
      ${bottomNav('leaderboard')}`;
    wireNav();

    const list = document.getElementById('board-list');
    if (!Store.isSupabaseConfigured()) {
      list.innerHTML = `
        <div class="card empty-board">
          <div class="big-emoji">🔌</div>
          <h3>Leaderboard not switched on yet</h3>
          <p>Once the group leaderboard is connected, you’ll see every tradie ranked by XP here — and the daily streak race is ON.</p>
          <p class="fineprint">(For the builder: add your Supabase keys in <code>js/config.js</code>.)</p>
        </div>`;
      return;
    }
    const data = await Store.getLeaderboard(50);
    const me = Store.get();
    if (!data) { list.innerHTML = `<div class="card empty-board"><p>Couldn’t load the leaderboard. Check your connection.</p></div>`; return; }
    if (data.length === 0) { list.innerHTML = `<div class="card empty-board"><p>No scores yet — be the first on the board!</p></div>`; return; }
    list.innerHTML = data.map((p, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `<span class="rank-num">${i+1}</span>`;
      const isMe = p.display_name === me.name;
      return `
        <div class="board-row${isMe ? ' me' : ''}">
          <div class="rank">${medal}</div>
          <div class="board-av">${esc(p.avatar || '🦺')}</div>
          <div class="board-name">
            <div>${esc(p.display_name)}${isMe ? ' <span class="you">you</span>' : ''}</div>
            <div class="board-trade">${esc(p.trade || '')}</div>
          </div>
          <div class="board-xp">🔥${p.current_streak||0} · ${p.total_xp} XP</div>
        </div>`;
    }).join('');
  }

  // ============================================================
  //  IDEAS BOARD (community topic requests)
  // ============================================================
  async function renderSuggestions() {
    root.innerHTML = `
      ${topBar()}
      <div class="screen ideas-screen">
        <h1 class="board-title">💡 What should we learn next?</h1>
        <p class="ideas-intro">Pitch a topic, or 👍 the ones you want most. We build the popular ones.</p>
        <div class="idea-add">
          <input id="idea-input" class="text-input" maxlength="120" placeholder="e.g. Loops &amp; automations, AI for invoices…" autocomplete="off" />
          <button id="idea-submit" class="btn btn-primary idea-add-btn">Add</button>
        </div>
        <div id="idea-list"><div class="loading">Loading ideas…</div></div>
      </div>
      ${bottomNav('ideas')}`;
    wireNav();
    const input = document.getElementById('idea-input');
    const submit = document.getElementById('idea-submit');
    submit.addEventListener('click', async () => {
      const t = input.value.trim();
      if (t.length < 3) { toast('A few more words, mate 🙂'); return; }
      submit.disabled = true;
      const r = await Store.addSuggestion(t);
      submit.disabled = false;
      if (r.ok) { input.value = ''; toast('Cheers — added to the board!'); loadIdeas(); }
      else if (r.reason === 'offline') { toast('Need a connection for the ideas board'); }
      else { toast('Hmm, that didn’t go through'); }
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit.click(); });
    loadIdeas();
  }

  async function loadIdeas() {
    const list = document.getElementById('idea-list');
    if (!list) return;
    if (!Store.isSupabaseConfigured()) {
      list.innerHTML = `<div class="card empty-board"><div class="big-emoji">💡</div><h3>Ideas board needs the connection</h3><p>Once connected, the crew can request topics here.</p></div>`;
      return;
    }
    const data = await Store.getSuggestions(60);
    if (!data) { list.innerHTML = `<div class="card empty-board"><p>Couldn’t load ideas. Check your connection.</p></div>`; return; }
    if (!data.length) { list.innerHTML = `<div class="card empty-board"><p>No ideas yet — be the first to pitch one!</p></div>`; return; }
    list.innerHTML = data.map((s, i) => `
      <div class="idea-row">
        <button class="idea-vote${s.voted ? ' on' : ''}" data-id="${s.id}">
          <span class="iv-arrow">▲</span><span class="iv-count">${s.votes}</span>
        </button>
        <div class="idea-text">${esc(s.text)}${s.mine ? ' <span class="you">yours</span>' : ''}</div>
      </div>`).join('');
    list.querySelectorAll('.idea-vote').forEach(b => b.addEventListener('click', async () => {
      b.disabled = true;
      const ok = await Store.toggleSuggestionVote(b.dataset.id);
      if (ok) loadIdeas(); else { b.disabled = false; toast('Vote didn’t go through'); }
    }));
  }

  // ============================================================
  //  PROFILE
  // ============================================================
  function renderProfile() {
    const s = Store.get();
    const totalLessons = COURSE.units.reduce((n, u) => n + u.lessons.filter(l => l.cards && l.cards.length).length, 0);
    const done = Object.keys(s.completedLessons).length;
    root.innerHTML = `
      ${topBar()}
      <div class="screen profile-screen">
        <div class="profile-hero">
          <div class="profile-av">${esc(s.avatar || '🦺')}</div>
          <h1>${esc(s.name || 'Tradie')}</h1>
          <div class="profile-trade">${esc(s.trade || 'Tradie')}</div>
        </div>
        <div class="stat-grid">
          <div class="card stat-card"><div class="stat-big">🔥 ${s.streak}</div><div class="stat-lbl">Day streak</div></div>
          <div class="card stat-card"><div class="stat-big">${s.xp}</div><div class="stat-lbl">Total XP</div></div>
          <div class="card stat-card"><div class="stat-big">${done}/${totalLessons}</div><div class="stat-lbl">Lessons done</div></div>
          <div class="card stat-card"><div class="stat-big">${COURSE.units.filter(u=>!u.locked).length}</div><div class="stat-lbl">Units open</div></div>
        </div>
        <button class="btn btn-ghost btn-block" id="p-share">📣 Invite the crew</button>
        <button class="btn btn-ghost btn-block subtle" id="p-reset">Reset my progress</button>
      </div>
      ${bottomNav('profile')}`;
    wireNav();
    document.getElementById('p-share').addEventListener('click', shareApp);
    document.getElementById('p-reset').addEventListener('click', () => {
      if (confirm('Reset all progress on this phone?')) { Store.reset(); go('home'); }
    });
  }

  async function shareApp() {
    const url = window.location.href.split('#')[0];
    const text = 'Learning AI the tradie way 🤖🔧 Jump on Tradies 4 AI:';
    if (navigator.share) {
      try { await navigator.share({ title: 'Tradies 4 AI', text, url }); } catch (e) {}
    } else {
      try { await navigator.clipboard.writeText(url); toast('Link copied — paste it in the group chat!'); }
      catch (e) { toast(url); }
    }
  }

  // ============================================================
  //  SHARED CHROME
  // ============================================================
  function topBar() {
    const s = Store.get();
    return `
      <header class="topbar">
        <div class="tb-brand">🤖 Tradies <span>4</span> AI</div>
        <div class="tb-stats">
          <span class="tb-streak">🔥 ${s.streak}</span>
          <span class="tb-xp">⚡ ${s.xp}</span>
        </div>
      </header>`;
  }

  function bottomNav(active) {
    const item = (id, icon, label) => `
      <button class="nav-item${active===id?' active':''}" data-nav="${id}">
        <span class="nav-icon">${icon}</span><span class="nav-lbl">${label}</span>
      </button>`;
    return `
      <nav class="bottom-nav">
        ${item('home','🛤️','Learn')}
        ${item('leaderboard','🏆','Ranks')}
        ${item('ideas','💡','Ideas')}
        ${item('profile','👷','You')}
      </nav>`;
  }

  function wireNav() {
    root.querySelectorAll('.nav-item').forEach(b => b.addEventListener('click', () => go(b.dataset.nav)));
  }

  // ---------- toast ----------
  let toastTimer = null;
  function toast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // ============================================================
  //  RENDER / BOOT
  // ============================================================
  function render() {
    if (!Store.get().onboarded) { renderOnboarding(); return; }
    switch (route.screen) {
      case 'lesson':      renderLesson(); break;
      case 'leaderboard': renderLeaderboard(); break;
      case 'ideas':       renderSuggestions(); break;
      case 'profile':     renderProfile(); break;
      case 'home':
      default:            renderHome(); break;
    }
  }

  async function boot() {
    render();
    // Register service worker for install-to-homescreen + offline.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
    // Fire up Supabase in the background; re-render leaderboard if we're on it.
    await Store.init();
  }

  return { boot, go };
})();

document.addEventListener('DOMContentLoaded', App.boot);
