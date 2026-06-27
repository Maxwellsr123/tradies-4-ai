# 🤖 Tradies 4 AI

A Duolingo-style app that teaches tradies AI from the basics — bite-sized lessons,
XP, daily streaks and a group leaderboard. Built mobile-first so your crew opens it
on their phone and you drop the link in the group chat.

No build tools, no framework. Just open `index.html`. Works offline once loaded and
installs to the home screen like a real app.

---

## What's in it

Five full units (33 playable lessons), all trade-friendly:

- **AI Basics** (5) — What is AI? · Your first chat · Prompts 101 · Good vs bad prompts · Don't get burned
- **AI Medium** (6) — Give it a role · Show don't tell · Feed it your stuff · Don't take answer #1 · Save your winners
- **AI High Level** (6) — Build your own assistant · Connect your apps · Loops & automations · Agents & harnesses · Build your own tools
- **Meet Claude** (9) — covers 13 features: Projects · Artifacts · Cowork · Connectors · Skills · vision · files · web search · voice · long docs · deep thinking · Claude Code
- **Meet ChatGPT** (7) — covers 14 features: voice · vision · image gen · Custom GPTs · GPT Store · Projects · Canvas · data analysis · web search · memory · Tasks · agent mode · deep research

Plus **Run the Business · On the Tools · Winning Work** mapped out as "coming soon" teasers.

All units are **start-anywhere** — a tradie can dive straight into Claude, ChatGPT, or the basics, whatever grabs them.

- Lesson types: teaching cards, multiple choice, Tip-or-Trap (true/false), match-the-pairs,
  put-in-order
- XP, daily streaks, accuracy, profile, and a live group leaderboard
- **Ideas tab** — a community "what should we learn next?" board where the crew pitches topics
  and upvotes each other's, so you can see exactly what to build next
- Installable PWA (Add to Home Screen) + offline support

---

## 1. Run it on your own machine

Any static server works. From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. On your phone (same Wi-Fi) use your computer's IP,
e.g. `http://192.168.1.20:8000`.

---

## 2. Put it online (so the crew can use it)

Pick one — all free:

- **Netlify Drop** (easiest): go to <https://app.netlify.com/drop> and drag this whole
  folder onto the page. You get a live link in ~10 seconds. Share that in the group chat.
- **Vercel**: `npm i -g vercel` then run `vercel` in this folder.
- **GitHub Pages**: push this folder to a repo, then Settings → Pages → deploy from `main`.
- **Cloudflare Pages**: connect the repo or drag-and-drop the folder.

> Tip: a custom domain like `learn.tradies4ai.com` looks the business and is easy to add
> on any of these.

---

## 3. The group leaderboard — ✅ already live

This is **already connected and working**. A dedicated Supabase project
(`Tradies 4 AI`, Sydney region) is set up, the database is built, and the keys are
already in [`js/config.js`](js/config.js). As soon as you deploy, the leaderboard works.

**How it works:** no login. Each phone gets a random device id saved locally, so every
tradie shows up on the board the moment they start — no passwords, no email. Scores and
streaks sync automatically as they learn. The publishable key in `config.js` is **safe to
ship in the browser**: the database is locked down so writes only ever touch your own row
and reads only ever expose names + scores (never the device id). See
[`supabase-setup.sql`](supabase-setup.sql) for the full schema.

> Heads up: it's a friendly trust-based board (good for a private crew of mates). Because
> there are no passwords, a determined person could fudge their own score — fine for a
> learning group. If it's ever abused, the next step is a server-side check on XP.

**Managing it:** the Supabase dashboard for project `Tradies 4 AI` lets you watch sign-ups,
clear the board, or export scores. To wipe the leaderboard (e.g. start a fresh weekly race):
`truncate table public.profiles;` in the SQL Editor.

**Seeing what the crew wants to learn** (the Ideas tab): the most-requested topics are one query away —

```sql
select s.text, count(v.client_id) as votes
from public.suggestions s
left join public.suggestion_votes v on v.suggestion_id = s.id
group by s.id order by votes desc;
```

Build the top ones, and they tick off your "coming soon" list for you.

---

## Admin dashboard (just for you)

There's a private dashboard at **`/admin.html`** (e.g. `your-site/admin.html`) — not linked
from the app, so the crew never sees it. It's locked behind an **admin passcode**: enter it once
and you get, at a glance:

- **Stats** — total tradies, total XP, who's active today, idea + vote counts
- **The full leaderboard** — with a *remove* button for any dodgy entry
- **The Ideas board** — every requested topic + votes, with a *delete* button for spam
- **Reset leaderboard** — wipe scores for a fresh weekly race (ideas are kept)
- **Change passcode** — set your own anytime

It's secure: the passcode is checked **on the server** (stored only as a bcrypt hash), and every
admin action re-checks it — so the page being public doesn't matter, nothing works without the
passcode. For full raw control you can also always use the Supabase dashboard directly.

---

## 4. Add or edit lessons (no real coding)

All content lives in [`js/content.js`](js/content.js). Copy a lesson block, edit the text,
done. The card types you can use are documented at the top of that file:

- `info` — a teaching card
- `choice` — multiple choice
- `truefalse` — Tip or Trap
- `match` — match the pairs
- `order` — put in order

To open up Unit 2/3/4, set `locked: false` on the unit and fill in each lesson's `cards`.

---

## File map

```
index.html              app shell
manifest.webmanifest    PWA install config
sw.js                   offline service worker
css/styles.css          all styling (high-vis tradie theme)
js/config.js            Supabase keys + group name  ← edit to go live
js/content.js           the course (edit to add lessons)  ← your content
js/store.js             progress, XP, streaks, Supabase sync
js/app.js               screens + lesson player
icons/                  app icons
supabase-setup.sql      run once in Supabase for the leaderboard
```

---

## Ideas for v2

- Open up Units 2–4 with real lessons
- "Prompt practice" cards that actually call an AI to grade what they typed
- Weekly leaderboard reset + a weekly winner shout-out in the group chat
- Push notifications to protect the streak ("🔥 Don't lose your 6-day streak!")
- A short "AI for [your trade]" path that branches by trade
