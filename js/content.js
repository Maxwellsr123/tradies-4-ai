/* ============================================================
   Tradies 4 AI — Course content
   ------------------------------------------------------------
   Written to actually teach. Two rules:
   1. Teaching cards explain the real mechanism (trade examples
      only where they sharpen a point).
   2. Every multiple-choice question has PLAUSIBLE wrong answers
      built from real misconceptions — no joke options. You should
      have to understand the material to answer.
   Difficulty ramps up within each unit.

   Card types:
     info      → { type:'info', title, body }
     choice    → { type:'choice', q, options:[], answer:<index>, explain }
     truefalse → { type:'truefalse', q, isTrue:true|false, explain }
     match     → { type:'match', q, pairs:[[a,b],...], explain }
     order     → { type:'order', q, steps:[...correct order], explain }
   ============================================================ */

const COURSE = {
  units: [
    /* ===================== UNIT 1 — AI BASICS ===================== */
    {
      id: 'u1',
      title: 'AI Basics',
      subtitle: 'How these tools actually work',
      color: '#FF6A00',
      icon: '🤖',
      locked: false,
      lessons: [
        /* ---- u1l1 ---- */
        {
          id: 'u1l1',
          title: 'What AI actually is',
          icon: '🧠',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'It predicts — it doesn’t look things up',
              body: 'ChatGPT and Claude are <b>large language models</b> (LLMs). They were trained on a huge amount of human writing and learned the patterns in it — which words and ideas tend to follow which. When you ask something, the model isn’t pulling an answer from a database. It builds the reply a piece at a time, each step predicting the most likely next bit of text. That one idea — <b>it predicts, it doesn’t retrieve</b> — explains nearly everything it does.'
            },
            {
              type: 'choice',
              q: 'So how does an LLM actually produce an answer?',
              options: [
                'It predicts the most likely next words from patterns it learned in training',
                'It looks the answer up in a stored database of facts',
                'It finds the closest question it saw in training and repeats that exact answer'
              ],
              answer: 0,
              explain: 'It generates word by word — it isn’t looking anything up, and it isn’t replaying a memorised answer. That’s why it can write something genuinely new for your job, and why it can also be wrong.'
            },
            {
              type: 'info',
              title: 'Why it sometimes makes things up',
              body: 'Because it predicts <b>plausible</b> text rather than retrieving <b>verified</b> facts, it can produce something that sounds dead right but isn’t — a made-up statistic, a Building Code clause that doesn’t exist. This is a <b>hallucination</b>. It’s not lying; the model has no built-in sense of true vs false. It’s aiming for “a likely, well-formed answer”, not “a correct one”.'
            },
            {
              type: 'choice',
              q: 'Why can it state a wrong fact with total confidence?',
              options: [
                'Confidence and correctness are separate — it generates plausible text either way',
                'It only sounds confident when it has actually checked the fact',
                'It copied a wrong fact from one bad website it read'
              ],
              answer: 0,
              explain: 'It has no internal “am I right?” meter, so it sounds equally sure whether it’s right or wrong. The error usually isn’t a bad source either — it generated something that merely looked right. So you verify anything that carries risk.'
            },
            {
              type: 'info',
              title: 'It has a use-by date',
              body: 'A model’s training stops at a certain point, so on its own it doesn’t know anything after that — last week’s price rise, a rule that changed last month. Some versions can search the web to fill the gap. If yours can’t, assume its knowledge has an expiry date and check current facts yourself.'
            },
            {
              type: 'truefalse',
              q: 'An AI with no web access will reliably know about a regulation that changed last month.',
              isTrue: false,
              explain: 'Its training likely predates the change, and with no web access it has no way to know it happened. Verify recent facts against the real source.'
            }
          ]
        },

        /* ---- u1l2 ---- */
        {
          id: 'u1l2',
          title: 'How a conversation works',
          icon: '💬',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'It can “see” the whole chat — until you start a new one',
              body: 'As you go, the model keeps the whole conversation in view — your messages and its replies. That running history is its <b>context</b>. It’s why you can refine: “shorter”, “more formal”, “you forgot the GST” — it adjusts because it can see what came before. Start a <b>new chat</b>, though, and that context is gone. By default it doesn’t carry memory from one chat to the next.'
            },
            {
              type: 'choice',
              q: 'You send four follow-ups and each reply gets closer to what you want. Why?',
              options: [
                'It can see the whole thread and adjusts to your corrections',
                'It’s permanently learning your preferences as you type',
                'Each reply is independent — it just happened to improve'
              ],
              answer: 0,
              explain: 'Within a chat it works off the full thread, so your corrections steer it. It isn’t learning permanently (a new chat won’t remember any of this), and the improvement isn’t luck — it’s responding to your feedback.'
            },
            {
              type: 'truefalse',
              q: 'By default, a brand-new chat remembers everything from a chat you had last week.',
              isTrue: false,
              explain: 'Fresh chat = clean slate, unless you’re using a “memory” feature or a saved Project. Handy to know: if a chat goes off the rails, just start a new one.'
            },
            {
              type: 'info',
              title: 'There’s a limit to how much it can hold',
              body: 'The context isn’t infinite — there’s a ceiling on how much text it can keep in view at once (you’ll hear this called the <b>context window</b>). In a very long chat, the earliest stuff can effectively drop off the back. For a big task, it’s often cleaner to start fresh and paste in just what matters.'
            },
            {
              type: 'choice',
              q: 'A chat has run for hours and it starts forgetting details from the start. The real reason?',
              options: [
                'The conversation has outgrown its context window, so early text drops off',
                'It’s gotten lazy and needs to be told to try harder',
                'It deleted the early messages to save space on your phone'
              ],
              answer: 0,
              explain: 'You’ve filled the context window — the oldest text falls out of view. It’s not effort, and it’s nothing to do with your phone’s storage. Fix: start a clean chat with just the key info.'
            }
          ]
        },

        /* ---- u1l3 ---- */
        {
          id: 'u1l3',
          title: 'How prompting works',
          icon: '🎯',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'A prompt is context that steers the prediction',
              body: 'Since the model predicts based on what it’s been given, the prompt is you <b>steering</b> it. Vague prompt → it fills the gaps with generic assumptions. Specific prompt → it conditions on your actual situation and the answer narrows to fit. A strong prompt usually has four parts: a <b>role</b>, the <b>task</b>, the <b>specifics</b>, and the <b>format</b> you want back.'
            },
            {
              type: 'match',
              q: 'Match each part of a strong prompt to an example:',
              pairs: [
                ['Role', '“You’re an experienced plumber…”'],
                ['Task', '“…write a follow-up text to a customer”'],
                ['Specifics', '“…the quote was $4,200, sent 8 days ago”'],
                ['Format', '“…keep it to 3 short lines, friendly”']
              ],
              explain: 'Each part removes guesswork. Together they pin the answer to your job instead of a generic one.'
            },
            {
              type: 'choice',
              q: 'Why does a detailed prompt usually beat a vague one?',
              options: [
                'The detail conditions the model on your situation, so it predicts a fitting answer',
                'Longer prompts always score better, regardless of what’s in them',
                'It signals you’re serious, so the model puts in more effort'
              ],
              answer: 0,
              explain: 'It’s the relevant detail that helps, not the word count — and the model doesn’t “try harder” based on tone. A short, specific prompt beats a long, waffly one.'
            },
            {
              type: 'truefalse',
              q: 'Spelling out the format you want (“3 lines”, “a bullet list”, “a formal email”) reliably changes what you get back.',
              isTrue: true,
              explain: 'Format is part of the steering. State length, tone and structure and it’ll match them.'
            }
          ]
        },

        /* ---- u1l4 ---- */
        {
          id: 'u1l4',
          title: 'Why prompts fail',
          icon: '🔧',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Most bad answers trace back to the prompt',
              body: 'Three common faults: (1) <b>too vague</b> — it fills gaps with safe, generic assumptions; (2) <b>no constraints</b> — you didn’t say the length, tone, or what to avoid; (3) <b>no grounding</b> — you asked about your job but didn’t give it your details. Fixing the prompt fixes most “bad” answers.'
            },
            {
              type: 'choice',
              q: 'It gave a generic, waffly answer about your job. The fix most likely to work?',
              options: [
                'Add your real specifics and state exactly what you want',
                'Rephrase the same request more politely',
                'Send it again unchanged a couple of times until it lands'
              ],
              answer: 0,
              explain: 'Generic in, generic out — give it your details and constraints. Politeness doesn’t change the answer, and re-sending the same vague prompt just gets you more vague answers.'
            },
            {
              type: 'info',
              title: 'Give it permission to say “I don’t know”',
              body: 'A useful trick against hallucination: add “if you’re not sure, say so, and don’t make up numbers or references.” Left alone, the model will produce a confident answer regardless. Telling it that <b>uncertainty is an acceptable answer</b> noticeably cuts the made-up stuff.'
            },
            {
              type: 'choice',
              q: 'Which addition most reduces the risk of it inventing a fake standard or figure?',
              options: [
                '“If you’re not certain, say so — don’t make up references or numbers.”',
                '“Please be 100% accurate and don’t make any mistakes.”',
                '“Only use real, correct information.”'
              ],
              answer: 0,
              explain: 'Giving it an honest “out” works — it can flag doubt when allowed to. Commanding it to “be accurate” or “only use real info” does little, because it can’t tell which of its own outputs are real; it has no accuracy dial to turn up.'
            },
            {
              type: 'truefalse',
              q: 'Telling it what NOT to do (“no jargon, don’t exceed 100 words”) is a valid way to steer it.',
              isTrue: true,
              explain: 'Negative constraints are real steering. Boundaries shape the output as much as the main instruction.'
            }
          ]
        },

        /* ---- u1l5 ---- */
        {
          id: 'u1l5',
          title: 'Trust, privacy & verifying',
          icon: '🦺',
          xp: 30,
          cards: [
            {
              type: 'info',
              title: 'Ground it, then check it',
              body: 'The best way to get accurate answers: <b>give it the source</b>. Paste the actual spec, the real email, the council PDF, and ask it to work only from that. It’s far less likely to invent things when summarising material you handed it than when answering from memory. For anything risky, also ask it to point to where in the document the answer came from.'
            },
            {
              type: 'choice',
              q: 'Which approach gives the most reliable answer about a 40-page spec?',
              options: [
                'Upload the spec and tell it to answer only from that document',
                'Ask from memory — it has probably read that exact spec before',
                'Ask it what a spec like that one usually contains'
              ],
              answer: 0,
              explain: 'Grounding it in the real document is the difference between summarising and guessing. It hasn’t “read your spec”, and “what specs usually contain” is exactly how it drifts into making things up.'
            },
            {
              type: 'info',
              title: 'Assume what you type can be seen',
              body: 'On consumer (free/personal) versions, what you type may be used to help improve the model unless you’ve turned that off in settings. Business and enterprise versions usually don’t train on your data. Safe rule regardless: never paste genuinely sensitive stuff — customer bank details, passwords, anything you wouldn’t want leaving your control.'
            },
            {
              type: 'truefalse',
              q: 'It’s fine to paste a customer’s card number into a personal ChatGPT account to “sort the invoice”.',
              isTrue: false,
              explain: 'No. Treat sensitive data as off-limits. Use it for the wording and structure; keep the private numbers out.'
            },
            {
              type: 'choice',
              q: 'AI gives you an exact NZ Building Code clause for a customer doc. The professional move?',
              options: [
                'Check the clause against the actual code before relying on it',
                'Trust it — a number that specific must be confirmed',
                'Ask again; if it repeats the same clause, that confirms it'
              ],
              answer: 0,
              explain: 'A specific-sounding number is exactly what a hallucination looks like — and asking twice just gets you the same made-up answer again. Confidence and repetition aren’t proof. Check the real code.'
            },
            {
              type: 'info',
              title: 'You’ve got the mental model',
              body: 'It predicts rather than retrieves; it holds a conversation within a context window; you steer it with a good prompt; it can be confidently wrong, so you ground and verify. That’s the foundation most people never learn. Next unit: getting noticeably better results on purpose.'
            }
          ]
        }
      ]
    },

    /* ===================== UNIT 2 — AI MEDIUM ===================== */
    {
      id: 'umed',
      title: 'AI Medium',
      subtitle: 'Getting better results on purpose',
      color: '#F4A100',
      icon: '📈',
      locked: false,
      lessons: [
        {
          id: 'umed1', title: 'From asking to steering', icon: '📈', xp: 20,
          cards: [
            { type: 'info', title: 'The input is the lever', body: 'At this level the mindset shifts from “ask a question” to “engineer the input”. The model’s output quality is mostly downstream of what you feed it: the role, the context, the examples, the constraints. Same model, very different results — depending on how well you set it up. The next few lessons are the highest-leverage techniques, and <i>why</i> each one works.' },
            { type: 'choice', q: 'Two people use the exact same AI and get very different quality. The biggest factor is usually…', options: ['How well they set up the input — context, examples, constraints', 'Which one pays for the higher tier; the prompt barely matters', 'Luck — the output is basically random each time'], answer: 0, explain: 'The model is identical, so the setup is the variable. A better tier helps a bit, but a sharp prompt on a basic model beats a lazy prompt on the best one. And it’s not random — your input drives it.' },
            { type: 'truefalse', q: 'A well-engineered prompt can outperform a “smarter” model handed a lazy prompt.', isTrue: true, explain: 'Often, yes. Good input beats raw horsepower wasted on a vague ask.' }
          ]
        },
        {
          id: 'umed2', title: 'Roles & personas', icon: '🎭', xp: 25,
          cards: [
            { type: 'info', title: 'Why a role works', body: 'Opening with “You’re an experienced NZ plumber writing to a homeowner…” does real work. It conditions the model toward the vocabulary, tone and assumptions of that role — it shifts the patterns it draws on. You’re not flattering it; you’re narrowing the slice of its training it leans on.' },
            { type: 'choice', q: 'What is a role prompt actually doing under the hood?', options: ['Steering it toward the vocabulary and assumptions tied to that role', 'Unlocking expert knowledge it otherwise keeps hidden from you', 'Making it legally accountable for the answer it gives'], answer: 0, explain: 'It steers, it doesn’t unlock — there’s no hidden vault it opens (it can’t give facts it doesn’t have). And a role is just framing; it carries no accountability. “Explain to an apprentice” vs “to an inspector” genuinely changes the answer.' },
            { type: 'truefalse', q: 'Naming the audience (“…explained to a homeowner with no trade knowledge”) changes the output as much as the role does.', isTrue: true, explain: 'Role + audience together are two of the strongest, cheapest levers you have.' },
            { type: 'choice', q: 'When does a role prompt help LEAST?', options: ['A simple factual lookup with one right answer (“convert 3/4 inch to mm”)', 'Drafting a customer email in a particular tone', 'Explaining a tricky concept to a specific audience'], answer: 0, explain: 'Roles shape tone and judgement. For a single hard fact there’s nothing to shape — just ask plainly. The other two are exactly where a role earns its keep.' }
          ]
        },
        {
          id: 'umed3', title: 'Show it examples', icon: '🧩', xp: 25,
          cards: [
            { type: 'info', title: 'Examples teach it the pattern on the spot', body: 'Paste one or two examples of what “good” looks like — a past quote, a text you’d send — and ask for more in the same style. The model picks up the pattern from your examples and copies it. This is <b>in-context learning</b>: you’re not retraining anything, you’re showing it the target inside the prompt. It’s the most reliable way to control format and tone.' },
            { type: 'choice', q: 'You paste two past quotes and ask for a third “like these”. What’s happening?', options: ['It copies the pattern from your examples, just for this chat', 'It’s now permanently trained on your quoting style', 'It saves your quotes to use in other people’s chats too'], answer: 0, explain: 'In-context learning is on-the-spot pattern matching — it lasts only as long as the examples are in front of it. Nothing is permanently trained, and your examples don’t leak into other chats.' },
            { type: 'truefalse', q: 'Examples are especially powerful when you need a consistent FORMAT every time.', isTrue: true, explain: 'Format and tone are exactly what examples lock in — better than any written description.' },
            { type: 'match', q: 'Match the goal to the better technique:', pairs: [['Match my exact quote layout', 'Show 1–2 examples'], ['Get the right tone of voice', 'Show an example + name the audience'], ['One quick fact', 'Just ask plainly']], explain: 'Right technique for the job: examples for pattern, plain ask for facts.' }
          ]
        },
        {
          id: 'umed4', title: 'Ground it in your data', icon: '📎', xp: 25,
          cards: [
            { type: 'info', title: 'Make it answer from YOUR material', body: 'The strongest defence against made-up answers is <b>grounding</b>: give it the actual document, numbers or photos and tell it to answer only from those. Now it’s reading and summarising your material instead of guessing from memory. This is the same idea the big “chat with your documents” tools use under the hood — feed in the relevant source, then ask.' },
            { type: 'truefalse', q: 'Uploading the real spec and telling it to work only from that reduces hallucination versus asking from memory.', isTrue: true, explain: 'Hugely. It can only summarise what’s in front of it, so there’s far less room to invent.' },
            { type: 'choice', q: 'Best way to get an accurate summary of a council consent document?', options: ['Upload it and say “answer only from this, and quote the section”', 'Describe it roughly and ask what it probably says', 'Ask it to recall consent documents like it from training'], answer: 0, explain: 'Ground it in the real file and ask it to cite, so you can check. “What it probably says” and “recall from training” are both invitations to make things up.' },
            { type: 'choice', q: 'Why also ask it to “point to where in the document the answer is”?', options: ['You can verify it in seconds, and it discourages inventing', 'Citations make it impossible for the model to hallucinate', 'It forces the model to read more carefully than it normally can'], answer: 0, explain: 'Citations let you check fast and nudge it to stay grounded — but they’re not bulletproof: it can cite the wrong section too. That’s exactly why you glance at the cite, not just trust it.' }
          ]
        },
        {
          id: 'umed5', title: 'Iterate & make it think', icon: '🔁', xp: 25,
          cards: [
            { type: 'info', title: 'First answer = draft. Push it.', body: 'Treat the first reply as a starting point. Three high-value moves: ask for <b>options</b> (“give me 3 versions, different tones”); ask it to <b>show its working</b> on anything with steps or numbers (“work through it step by step”) — this genuinely improves accuracy on reasoning; and ask it to <b>check itself</b> (“review that for errors or anything you assumed”).' },
            { type: 'choice', q: 'For a multi-step calculation, why does “work through it step by step” improve accuracy?', options: ['Reasoning through the steps catches errors a snap answer skips over', 'It changes only the formatting, not the actual result', 'The answer is already fixed, so it makes no real difference'], answer: 0, explain: 'Forcing the working (you’ll hear “chain of thought”) means it actually reasons rather than blurting the first plausible number — that’s a real accuracy gain, not just a tidier layout.' },
            { type: 'truefalse', q: 'Asking it to critique its own previous answer can surface mistakes and weak assumptions.', isTrue: true, explain: 'Self-review is cheap and effective: “What did you assume? What might be wrong here?”' },
            { type: 'choice', q: 'You want the best wording for an important email. Smartest ask?', options: ['“Give me 3 versions in different tones, then we’ll refine the best.”', 'Accept the first draft to save time', '“Just make it perfect.”'], answer: 0, explain: 'Options + refinement keeps you the editor. The first draft is rarely the best, and “make it perfect” gives it no useful direction to act on.' }
          ]
        },
        {
          id: 'umed6', title: 'Build a prompt kit', icon: '💾', xp: 30,
          cards: [
            { type: 'info', title: 'Reuse what works — and know it varies', body: 'When a prompt nails it, save it. Over time you build a kit of go-to prompts for the jobs you do weekly (quotes, follow-ups, reviews). One thing to expect: the same prompt can give slightly different answers each time — there’s deliberate variation built in. That’s normal, not a bug; it’s why “give me 3 options” works.' },
            { type: 'truefalse', q: 'Running the identical prompt twice can produce two different answers.', isTrue: true, explain: 'There’s built-in randomness so it doesn’t parrot the same line every time. Handy for variety; worth knowing when you expected identical output.' },
            { type: 'choice', q: 'The real payoff of saving your best prompts is…', options: ['Consistent, fast results on the jobs you repeat', 'The AI starts to recognise and remember you personally', 'It makes each answer cheaper to generate'], answer: 0, explain: 'A reusable prompt is a small tool you sharpen once and use forever. It doesn’t build a relationship with you, and it doesn’t change the cost.' },
            { type: 'info', title: 'Medium tier: done', body: 'Roles, examples (in-context learning), grounding, making it reason, iterating, and a reusable kit. You’re now ahead of most people using these tools. Next: the pro stuff — assistants, tools, automations and agents.' }
          ]
        }
      ]
    },

    /* ===================== UNIT 3 — AI HIGH LEVEL ===================== */
    {
      id: 'uhigh',
      title: 'AI High Level',
      subtitle: 'Assistants, tools, agents',
      color: '#34495E',
      icon: '🚀',
      locked: false,
      lessons: [
        {
          id: 'uhigh1', title: 'From tool to system', icon: '🚀', xp: 25,
          cards: [
            { type: 'info', title: 'Stop chatting, start building', body: 'So far it’s been you typing to a chat. The leap now: package your instructions so the behaviour is <b>reusable</b>, give the model <b>tools</b> so it can fetch real data and take actions, and put it in a <b>loop</b> so it can do multi-step jobs on its own. Same underlying model — wrapped in a system that does work. You won’t need all of it; you’ll know which pieces fit your business.' },
            { type: 'choice', q: 'The core shift at “high level” is…', options: ['Wrapping the model in instructions, tools and loops so it completes whole jobs', 'Switching to a fundamentally different kind of AI', 'Just paying for the most expensive plan available'], answer: 0, explain: 'It’s the same model — the leverage is the system around it. A bigger plan or model alone doesn’t give you assistants, tools and automations; the wrapping does.' },
            { type: 'truefalse', q: 'You should adopt every advanced feature to get value from AI.', isTrue: false, explain: 'Pick the few that save you real time. Ignore the rest until they’re useful.' }
          ]
        },
        {
          id: 'uhigh2', title: 'Build your own assistant', icon: '🛠️', xp: 30,
          cards: [
            { type: 'info', title: 'Package the instructions + the knowledge', body: 'A <b>Custom GPT</b> (ChatGPT) or a <b>Project / Skill</b> (Claude) is a reusable assistant. Two ingredients: a <b>system instruction</b> — standing rules it follows every time (“You quote for KPA Plumbing. Always itemise labour and materials, add 5% P&G, friendly-but-professional tone”) — and <b>knowledge</b> you attach (rate cards, past quotes, your terms). Now every chat starts already knowing your business.' },
            { type: 'choice', q: 'What’s the “system instruction” of a custom assistant?', options: ['Standing rules it applies to every conversation automatically', 'A single message that only affects the current chat', 'A summary it writes for you after each chat ends'], answer: 0, explain: 'It’s the always-on brief — set once, applied every time. That’s different from a one-off message (which only steers the current chat) and isn’t any kind of after-the-fact summary.' },
            { type: 'truefalse', q: 'Attaching your rate card and past quotes as “knowledge” makes its answers fit your business without re-pasting.', isTrue: true, explain: 'That attached knowledge is what makes it <i>yours</i> rather than generic.' },
            { type: 'choice', q: 'The biggest benefit of a custom assistant over a plain chat?', options: ['Consistent results with no re-explaining your business every time', 'It can answer things a plain chat fundamentally cannot', 'It keeps working with no internet connection'], answer: 0, explain: 'It’s the same model underneath — so it can’t do anything a well-prompted plain chat couldn’t, and it still needs the internet. What it adds is consistency and zero setup each time.' }
          ]
        },
        {
          id: 'uhigh3', title: 'Tools & connectors', icon: '🔌', xp: 30,
          cards: [
            { type: 'info', title: 'Give it hands and live data', body: 'On its own the model only knows its training. Connect <b>tools</b> — Xero, Gmail, your calendar, a web search — and it can pull <b>real, current data</b> and take <b>actions</b>. Mechanically: the model decides a tool is needed, calls it, gets the result back, and continues. (Claude’s open standard for this is <b>MCP</b>; ChatGPT calls them actions/connectors.) This is the jump from “gives advice” to “gets things done”.' },
            { type: 'truefalse', q: 'Connecting tools lets the model use real, up-to-date data instead of only its training.', isTrue: true, explain: 'A connected model can read your actual invoices today — not a guess from months ago.' },
            { type: 'choice', q: 'When the model “calls a tool”, what’s actually happening?', options: ['It decides a tool is needed, runs it, reads the result, and carries on', 'It hands the whole task to the tool and stops reasoning', 'The tool takes over and replaces the model for that job'], answer: 0, explain: 'The model stays in charge — it reaches for the tool mid-task, reads what comes back, and keeps going. The tool fetches or acts; the thinking stays with the model.' },
            { type: 'choice', q: 'A genuine risk once AI can take actions in your apps?', options: ['It could act on a wrong assumption — so limit its access and review key actions', 'It always asks before doing anything, so there’s nothing to manage', 'Connecting an app makes that app’s data public'], answer: 0, explain: 'Hands mean responsibility: scope its access and keep a human check on anything that sends money or messages. It won’t always ask first, and connecting an app doesn’t make your data public.' }
          ]
        },
        {
          id: 'uhigh4', title: 'Loops & automations', icon: '♾️', xp: 30,
          cards: [
            { type: 'info', title: 'A trigger, an action, repeated', body: 'An <b>automation</b> is the model wired into a pipeline: a <b>trigger</b> fires (a new invoice, 7 days passing, an email arriving), the model does a defined <b>task</b>, and something happens (a draft chaser, a tagged email). A <b>loop</b> just means it runs on every matching event. Set up once, runs forever. The skill is defining the trigger and the guardrails tightly so it does exactly the right thing.' },
            { type: 'choice', q: 'The safest high-value pattern for a first automation?', options: ['Invoice hits 7 days overdue → it drafts a chaser for you to approve and send', 'It auto-sends every overdue chaser the instant the trigger fires', 'It decides which customers to chase and how, with no rules set'], answer: 0, explain: 'Clear trigger, useful task, you approve the send. Auto-sending with no review, or letting it freelance with no rules, is where automations embarrass you at scale.' },
            { type: 'truefalse', q: 'A good automation needs a clearly-defined trigger and guardrails, not just “do stuff”.', isTrue: true, explain: 'Vague automations misfire. Tight trigger + tight task + a review step on anything risky.' },
            { type: 'choice', q: 'Why keep a human approval step on an automated customer email at first?', options: ['A single bad assumption could reach everyone before you notice', 'Automated emails aren’t legal without a person approving each one', 'The model can’t actually write an email on its own'], answer: 0, explain: 'Automation multiplies both good and bad — approval contains the blast radius until you trust it. It’s not a legal rule, and the model can absolutely write the email; that’s the point.' }
          ]
        },
        {
          id: 'uhigh5', title: 'Agents & harnesses', icon: '🤖', xp: 35,
          cards: [
            { type: 'info', title: 'An agent is a model in a loop with tools and a goal', body: 'An <b>agent</b> doesn’t just answer — you give it a goal and it runs a loop: <i>look at the situation → decide the next step → use a tool → see the result → repeat</i>, until the goal’s met. The <b>harness</b> is the scaffolding around it: it provides the tools, runs the loop, sets stopping conditions, and checks the work. Claude Code and ChatGPT’s agent mode are harnesses. That structure is what turns a chatbot into something that completes a multi-step job.' },
            { type: 'choice', q: 'What actually makes an agent different from a normal chat answer?', options: ['It runs a decide→act→observe loop with tools until a goal is reached', 'It gives longer, more detailed written answers', 'It thinks harder but still does a single step and stops'], answer: 0, explain: 'The difference is autonomy across many steps — looping and using tools toward a goal — not answer length or just “more thinking”. A long answer or a single careful reply is still a chat.' },
            { type: 'truefalse', q: 'The “harness” is the system that gives the agent its tools, runs the loop, and decides when it’s done.', isTrue: true, explain: 'The model is the brain; the harness is the workshop, the tools, and the foreman keeping it on task.' },
            { type: 'choice', q: 'Why do agents tend to go wrong on long tasks?', options: ['Small errors compound across many steps if nothing verifies the work', 'They forget they’re an agent partway through', 'The tools they use are guaranteed to fail eventually'], answer: 0, explain: 'A mistake at step 3 poisons steps 4–10 — that compounding is the core failure mode. Good harnesses add checks and limits to catch drift early. It’s not amnesia or doomed tools.' },
            { type: 'choice', q: 'So the practical rule with agents is…', options: ['Great for multi-step grunt work — scope it tightly and verify the result', 'Best saved for trivial one-step tasks', 'Only safe if you watch every single step live'], answer: 0, explain: 'Their whole value is multi-step work, so trivial tasks waste them — but you set the bounds and check the output rather than babysitting every step.' }
          ]
        },
        {
          id: 'uhigh6', title: 'Choosing the right model', icon: '🧰', xp: 35,
          cards: [
            { type: 'info', title: 'Match the model to the job', body: 'There’s a spread of models: bigger “reasoning” ones that think harder (slower, dearer) and lighter ones that are fast and cheap. The skill is matching them: a quick text reply doesn’t need the heavy reasoner; a tricky multi-part problem or a tender analysis does. Two other levers: the <b>context window</b> (how much you can paste in at once) and whether the model can <b>search the web</b> for current info.' },
            { type: 'choice', q: 'You need a one-line reminder text. Sensible choice?', options: ['A fast, light model — the job doesn’t need heavy reasoning', 'The most powerful reasoning model, just to be safe', 'It makes no difference which model you pick, ever'], answer: 0, explain: 'Match the tool to the task. Defaulting to the heaviest model “to be safe” is slower and dearer for no gain — and for hard problems the model choice very much does matter.' },
            { type: 'choice', q: 'When does a heavier “reasoning” model actually earn its keep?', options: ['A complex, multi-step problem where getting it right matters', 'Any task at all, since more reasoning is always better', 'Only when the lighter model happens to be unavailable'], answer: 0, explain: 'Reserve the heavy thinking for genuinely hard, high-stakes work. For simple asks it’s overkill — more reasoning isn’t free and isn’t always better.' },
            { type: 'info', title: 'You can also have it build you tools', body: 'You can get a model to build small working tools with no coding from you — a job-cost calculator, a checklist app, a simple site (Claude calls these <b>Artifacts</b>). You describe it, it builds and runs it, you refine by chatting. Worth knowing the ceiling of what you can make yourself before paying someone.' },
            { type: 'info', title: 'That’s the pro tier', body: 'Reusable assistants, tools & connectors, automations, agents, and choosing the right model. You now understand not just <i>what</i> these tools do but <i>how</i> they work. Keep an eye on the Ideas tab — request the deep-dives you want next.' }
          ]
        }
      ]
    },

    /* ===================== UNIT 4 — MEET CLAUDE ===================== */
    {
      id: 'ucl',
      title: 'Meet Claude',
      subtitle: 'Anthropic’s AI — what each feature really does',
      color: '#D97757',
      icon: '🧡',
      locked: false,
      lessons: [
        {
          id: 'ucl1',
          title: 'Meet Claude',
          icon: '🧡',
          xp: 20,
          cards: [
            { type: 'info', title: 'Same kind of tool, different strengths', body: 'Claude (by <b>Anthropic</b>) is an LLM like ChatGPT — it predicts text — but it’s known for a few things: handling <b>very long documents</b> in one go, careful step-by-step <b>reasoning</b>, and a writing style many find more natural. It’s built with a heavy focus on being safe and honest. Get it at <b>claude.ai</b> or the app.' },
            { type: 'choice', q: 'Claude is a particularly strong pick when you need to…', options: ['Work carefully through a long, dense document like a full spec or contract', 'Get an answer you can rely on without ever checking it', 'Handle a trivial question at the absolute lowest cost'], answer: 0, explain: 'Long-context comprehension and careful reasoning are its edge. No LLM gives un-checkable answers — that’s not a Claude feature — and for trivial, cheap one-liners almost any tool will do.' },
            { type: 'truefalse', q: 'Despite its strengths, Claude runs on the same predict-the-next-text foundation — including the hallucination risk.', isTrue: true, explain: 'Same fundamentals, so the same habits apply: ground it and verify what matters.' },
            { type: 'info', title: 'The features worth knowing', body: 'This unit covers what each one actually does and when to reach for it: <b>Projects</b>, <b>Artifacts</b>, <b>Cowork</b>, <b>Connectors</b>, <b>Skills</b>, plus reading images & files, web search and deep thinking.' }
          ]
        },
        {
          id: 'ucl2',
          title: 'Projects',
          icon: '📁',
          xp: 25,
          cards: [
            { type: 'info', title: 'A workspace with standing context', body: 'A <b>Project</b> bundles two things every chat inside it inherits: <b>custom instructions</b> (standing rules — your trade, tone, how you want things done) and <b>knowledge</b> (files you upload — rate cards, templates, past jobs). Every new chat in that Project starts already loaded with all of it. It’s the practical fix for re-explaining your business every single time.' },
            { type: 'choice', q: 'What does a Project actually give every chat inside it?', options: ['Your standing instructions plus your uploaded knowledge, automatically', 'A private, more powerful version of the AI', 'Access to everything from all your other Projects too'], answer: 0, explain: 'It’s your instructions + files, inherited by default. It’s the same model (not a souped-up private one), and each Project is its own walled-off context — they don’t share knowledge.' },
            { type: 'truefalse', q: 'You can run separate Projects for separate jobs — e.g. one for quoting, one for marketing.', isTrue: true, explain: 'Separate Projects keep each job focused on just the right instructions and files.' },
            { type: 'choice', q: 'You upload your rate card and terms to a “KPA Quotes” Project. The effect?', options: ['Quote chats in that Project can use your real rates and terms without re-pasting', 'The AI permanently learns your rates for every chat you ever have', 'It auto-fills the rates straight into your accounting software'], answer: 0, explain: 'The knowledge sits in that Project, ready to use. It doesn’t bleed into chats outside the Project, and a Project on its own doesn’t plug into your other software (that’s what Connectors are for).' }
          ]
        },
        {
          id: 'ucl3',
          title: 'Artifacts',
          icon: '🛠️',
          xp: 25,
          cards: [
            { type: 'info', title: 'It builds the actual thing, live', body: 'Normally it replies in chat. With <b>Artifacts</b>, when you ask it to make something — a document, a checklist, a price calculator, a small web app — it opens a panel and <b>builds it there, working and live</b>. It can write and run code to do it. You refine by chatting (“add a GST line”, “make the button bigger”) and download or share the result. You get a finished tool, not just words about one.' },
            { type: 'choice', q: 'What’s genuinely different about an Artifact versus a normal reply?', options: ['It’s a working, editable thing in a side panel — often built by running code', 'It’s the same text answer, just shown in a separate window', 'It’s a file the AI downloads ready-made from the web'], answer: 0, explain: 'The point is that it’s a real, runnable artefact it builds (a calculator, a page) — not just text in another pane, and not something it fetched off the web.' },
            { type: 'truefalse', q: 'You can keep refining an Artifact by chatting, then download or share it.', isTrue: true, explain: 'It’s iterative: build, tweak, tweak, ship.' },
            { type: 'choice', q: 'Which task is the right fit for an Artifact?', options: ['“Build me a reno cost calculator I can put on my website”', '“Remind me what the current GST rate is”', '“Summarise this email in one line”'], answer: 0, explain: 'Artifacts are for built things — calculators, pages, mini-apps. A quick fact or a one-line summary is just a normal chat reply; no panel needed.' }
          ]
        },
        {
          id: 'ucl4',
          title: 'Cowork',
          icon: '🤝',
          xp: 30,
          cards: [
            { type: 'info', title: 'Claude doing multi-step work on real files', body: 'Chat answers; <b>Cowork</b> does. You point Claude at a folder or connected apps and it works through a whole job — reading and editing files, building a spreadsheet, going step by step — and can even split work across helper <b>sub-agents</b> for bigger tasks. It’s Claude operating as an agent (loop + tools + goal) rather than a one-shot reply. Use it for real jobs; use plain chat for quick questions.' },
            { type: 'choice', q: 'Cowork is the right tool when…', options: ['You’ve a multi-step job over real files — “go through these 30 invoices and build a summary”', 'You want one quick factual answer', 'You want a more polite tone in a single reply'], answer: 0, explain: 'Multi-step, file-based, goal-driven work is Cowork’s lane. A quick fact or a tone tweak is just a normal chat.' },
            { type: 'truefalse', q: 'In Cowork, Claude can read and edit actual files and use connected apps to finish a task end-to-end.', isTrue: true, explain: 'That’s the leap from advice to done work.' },
            { type: 'choice', q: 'Because Cowork can change files and take actions, the sensible habit is…', options: ['Limit what it can touch and review its work, especially the first few times', 'Trust it fully — as a careful model it won’t make mistakes', 'Only ever run it on an empty folder to be safe'], answer: 0, explain: 'Capable tool, real consequences — bound it and check it, then trust it more over time. It can still err (careful ≠ infallible), and running it on an empty folder just makes it useless.' }
          ]
        },
        {
          id: 'ucl5conn', title: 'Connectors (MCP)', icon: '🔌', xp: 25,
          cards: [
            { type: 'info', title: 'A standard way to plug in your tools', body: 'A <b>Connector</b> links Claude to an app or data source — Gmail, Xero, Google Drive, Slack — so it can use the real thing. Anthropic built an open standard for this called <b>MCP</b> (Model Context Protocol): a universal adapter so any tool can plug into any AI the same way. Connect once, and Claude can read a file from Drive or draft from a real email — no copy-paste.' },
            { type: 'choice', q: 'What problem do Connectors / MCP solve?', options: ['A standard way to plug real tools and live data into the AI', 'A way to make the AI respond faster', 'A backup of your past chat history'], answer: 0, explain: 'One standard “adapter” means tools and AIs connect the same way, instead of every pair needing custom wiring. It’s about access to live data, not speed or backups.' },
            { type: 'match', q: 'Match the connector to what Claude can then do:', pairs: [['Xero', 'Work with real invoices & figures'], ['Gmail', 'Draft from actual emails'], ['Drive', 'Read your real files']], explain: 'Connected = live data in the loop, not a guess.' },
            { type: 'truefalse', q: 'Connectors are optional — plain Claude still works without any connected.', isTrue: true, explain: 'They’re power-ups. Add the ones that save you time; skip the rest.' }
          ]
        },
        {
          id: 'ucl6skills', title: 'Skills', icon: '🎓', xp: 25,
          cards: [
            { type: 'info', title: 'Packaged know-how for a repeatable job', body: 'A <b>Skill</b> is a saved procedure that teaches Claude how to do a specific job your way — “build a KPA quote from a measure sheet”, end to end. Unlike a one-off prompt you retype, a Skill is reusable and can bundle steps, rules and even files. Once it exists, you trigger it and Claude follows your method every time. It’s how you turn “the way I do X” into something the AI just does.' },
            { type: 'choice', q: 'How is a Skill different from just typing a good prompt each time?', options: ['It’s a saved, reusable procedure — bundled steps and rules you trigger, not retype', 'It’s a one-off instruction that resets the moment you use it', 'It’s a setting that simply makes answers shorter'], answer: 0, explain: 'A prompt is a sentence you write each time; a Skill is a saved workflow you reuse. It persists, and it’s about <i>how</i> a job is done, not answer length.' },
            { type: 'truefalse', q: 'Skills shine for jobs you repeat the same way (quotes, job reports, standard emails).', isTrue: true, explain: 'Repeatable + your-specific-method = perfect Skill territory.' },
            { type: 'choice', q: 'Project vs Skill — the clean distinction?', options: ['A Project holds context/knowledge; a Skill packages a repeatable procedure to run', 'A Project is for ChatGPT and a Skill is for Claude', 'A Skill is just a Project with a different name'], answer: 0, explain: 'Project = a workspace that knows your stuff. Skill = a saved way of doing a job. They’re different things, both within Claude.' }
          ]
        },
        {
          id: 'ucl7eyes', title: 'Images, files & voice', icon: '👀', xp: 25,
          cards: [
            { type: 'info', title: 'It’s multimodal — not just text', body: 'Claude can take in more than typing. Show it a <b>photo</b> (a part, a fault, a handwritten note) and it reads and reasons about it. Upload <b>files</b> — PDFs, spreadsheets, long specs — and it works through them. On the app you can <b>talk</b> to it. Useful limit to remember: vision and document reading aren’t perfect — confirm anything critical it pulls off a blurry photo or a dense table.' },
            { type: 'truefalse', q: 'You can upload a 50-page PDF and have Claude pull out and explain the key points.', isTrue: true, explain: 'Long documents are a particular strength — its big context window helps here.' },
            { type: 'choice', q: 'It reads a measurement off a blurry site photo. Smart move?', options: ['Use it as a lead, but confirm the critical number yourself', 'Trust it — its vision reading is always exact', 'Ignore it — it can’t actually use photos'], answer: 0, explain: 'Vision is genuinely useful and genuinely imperfect. It can read photos (so don’t ignore it), but it can misread a blurry one — so verify anything that drives a real decision.' },
            { type: 'match', q: 'Match the input to a good use:', pairs: [['Photo', 'Identify a part or read a note'], ['PDF / sheet', 'Summarise or analyse a document'], ['Voice', 'Hands-free Q&A on the app']], explain: 'Type it, show it, or say it — Claude takes all three.' }
          ]
        },
        {
          id: 'ucl8power', title: 'Web search & deep thinking', icon: '⚡', xp: 25,
          cards: [
            { type: 'info', title: 'Current info and harder reasoning', body: 'Two more levers. <b>Web search</b> lets Claude look up current information — today’s prices, a recent rule change — closing the training cut-off gap, with links so you can check. <b>Extended thinking</b> (a deeper reasoning mode) makes it work a tricky problem through more carefully before answering — slower, but better on genuinely hard, multi-part questions. And for the technical, <b>Claude Code</b> runs it as a coding agent in the terminal.' },
            { type: 'truefalse', q: 'With web search on, Claude can ground an answer in current sources and show you the links.', isTrue: true, explain: 'It pulls live info and cites it — so you’re not stuck with stale training data, and you can verify.' },
            { type: 'choice', q: 'When is “extended thinking” worth the extra wait?', options: ['A complex, multi-part problem where accuracy matters', 'Every question — more thinking is always better', 'Whenever you’re not in a hurry, regardless of the task'], answer: 0, explain: 'Save the heavy reasoning for genuinely hard problems. It’s overkill for simple asks — the trigger is the difficulty of the task, not how much spare time you have.' },
            { type: 'choice', q: 'Web search mainly fixes which limitation of an LLM?', options: ['Its knowledge cut-off — on its own it doesn’t know recent events', 'Its tendency to write too formally', 'Its inability to do basic maths'], answer: 0, explain: 'Search bridges “trained months ago” and “what’s true today”. It’s got nothing to do with writing style or arithmetic.' }
          ]
        },
        {
          id: 'ucl5',
          title: 'Which feature, when?',
          icon: '🧭',
          xp: 30,
          cards: [
            { type: 'info', title: 'A decision framework', body: 'You don’t pick features at random — you match them to the shape of the job. Here’s the map, with the reasoning.' },
            { type: 'match', q: 'Match the job to the right Claude feature:', pairs: [['Quick one-off question', 'Plain chat'], ['Stop re-explaining your business', 'A Project'], ['Produce a finished tool/doc', 'An Artifact'], ['Do a multi-step job on files', 'Cowork']], explain: 'Chat for asking, Project for context, Artifact for building, Cowork for doing.' },
            { type: 'choice', q: 'You want it to work with your live Xero figures. The piece you need is…', options: ['A Connector, so it reaches your real data', 'A Project with last year’s export uploaded', 'Extended thinking mode'], answer: 0, explain: 'Live data needs a Connector. An old export in a Project is stale the moment your numbers change, and thinking mode doesn’t fetch anything.' },
            { type: 'choice', q: 'You do the same fiddly job your way every week. Best fit?', options: ['A Skill — a packaged, repeatable procedure', 'A fresh chat where you re-explain it each time', 'Web search'], answer: 0, explain: 'Repeatable + your method = a Skill: build it once, run it forever. Re-explaining weekly is the exact thing a Skill removes.' },
            { type: 'info', title: 'You know Claude properly now', body: 'Projects hold context, Artifacts build things, Cowork does jobs, Connectors plug in real data, Skills package your methods, and it reads images, files and the live web. Next: the same depth on ChatGPT.' }
          ]
        }
      ]
    },

    /* ===================== UNIT 5 — MEET CHATGPT ===================== */
    {
      id: 'ugp',
      title: 'Meet ChatGPT',
      subtitle: 'OpenAI’s AI — what each feature really does',
      color: '#10A37F',
      icon: '💚',
      locked: false,
      lessons: [
        {
          id: 'ugp1',
          title: 'Meet ChatGPT',
          icon: '💚',
          xp: 20,
          cards: [
            { type: 'info', title: 'The all-rounder that kicked it off', body: 'ChatGPT (by <b>OpenAI</b>) is the tool that put this tech in front of everyone. It’s a capable all-rounder — strong at writing, explaining, coding — and fully <b>multimodal</b> (text, voice, images). It runs on OpenAI’s <b>GPT</b> models, with a free tier and paid tiers that unlock the better models and higher limits. Get it at <b>chatgpt.com</b> or the app.' },
            { type: 'choice', q: 'What does the free vs paid tier mainly change?', options: ['Access to the more capable models and higher usage limits', 'Whether your conversations stay private', 'Whether it can make mistakes or hallucinate'], answer: 0, explain: 'Paid unlocks stronger models and more usage. Privacy is a settings/account-type matter on both tiers, and paying does NOT remove hallucination — the foundation is the same.' },
            { type: 'truefalse', q: 'ChatGPT runs on the same predict-the-next-text foundation as other LLMs, so it can hallucinate too.', isTrue: true, explain: 'Different brand, same fundamentals — ground it and verify the important stuff.' },
            { type: 'info', title: 'What we’ll cover', body: 'The features that matter and when to use each: voice, vision & image generation; Custom GPTs & Projects; Canvas & data analysis; web search, memory & Tasks; and agent mode.' }
          ]
        },
        {
          id: 'ugp2',
          title: 'Voice, vision & images',
          icon: '🎙️',
          xp: 25,
          cards: [
            { type: 'info', title: 'Three different multimodal skills', body: 'Don’t lump these together — they’re distinct. <b>Voice</b>: a real-time spoken conversation, great hands-free on site or driving. <b>Vision</b>: it <i>reads and reasons about</i> a photo you show it (a part, a fault, a label). <b>Image generation</b>: it <i>creates</i> a new picture from your description — for marketing, mock-ups, social posts. One understands images; the other makes them.' },
            { type: 'choice', q: 'What’s the difference between vision and image generation?', options: ['Vision reads an image you give it; generation creates a new one from a description', 'Vision makes images; generation just describes images in words', 'They’re two names for the same single feature'], answer: 0, explain: 'Understanding an image you provide vs creating a brand-new one — two different jobs. They’re not the same feature, and the definitions aren’t the other way round.' },
            { type: 'truefalse', q: 'Voice mode is well suited to asking questions when your hands are full on the tools.', isTrue: true, explain: 'Hands-free, real-time — built for the ute or the site.' },
            { type: 'choice', q: 'You snap a photo of an unfamiliar valve and ask what it is. Sensible habit?', options: ['Treat its answer as a strong lead, then confirm before you rely on it', 'Take it as gospel — it sees better than a person', 'Describe it in words instead, since photos don’t work'], answer: 0, explain: 'Vision is useful and imperfect: it genuinely can read the photo (so use it), but verify anything that drives a real decision.' }
          ]
        },
        {
          id: 'ugp3',
          title: 'Custom GPTs & Projects',
          icon: '🧰',
          xp: 25,
          cards: [
            { type: 'info', title: 'Reusable assistants vs tidy workspaces', body: 'A <b>Custom GPT</b> is a packaged assistant: standing instructions, attached knowledge, and optionally <b>actions</b> (connections to other tools) — built for one job, like a quoting helper. There’s a whole <b>GPT Store</b> of ready-made ones. A <b>Project</b> is different: a workspace that keeps the chats and files for one big job together. GPT = a reusable helper; Project = an organised folder.' },
            { type: 'choice', q: 'A Custom GPT is best described as…', options: ['A reusable assistant with set instructions, knowledge and optional tool actions', 'A more powerful AI model than the standard one', 'A single saved conversation you can reopen'], answer: 0, explain: 'It’s a packaged helper built on the <i>same</i> model — not a stronger AI, and not just one saved chat. Same idea as Claude’s Projects/Skills.' },
            { type: 'truefalse', q: 'A ChatGPT Project keeps the chats and files for one job in one place.', isTrue: true, explain: 'Stops a big reno or tender getting scattered across random chats.' },
            { type: 'match', q: 'Match it up:', pairs: [['Custom GPT', 'Reusable assistant for one job'], ['GPT Store', 'Library of ready-made GPTs'], ['Project', 'Workspace for one job’s chats + files']], explain: 'A helper, a library of helpers, and a place to keep a job tidy.' }
          ]
        },
        {
          id: 'ugp4',
          title: 'Canvas & data analysis',
          icon: '📊',
          xp: 25,
          cards: [
            { type: 'info', title: 'A shared editor, and a number-cruncher', body: 'Two power features. <b>Canvas</b> opens a document beside the chat you both edit directly — great for quotes, letters, web copy — instead of regenerating the whole thing each time. <b>Data analysis</b> is bigger than it sounds: upload a spreadsheet and ChatGPT actually <b>writes and runs code</b> (Python) on your data to total it, find outliers, and draw charts. It’s computing real results, not guessing at numbers.' },
            { type: 'choice', q: 'When ChatGPT analyses your spreadsheet, what’s really happening?', options: ['It writes and runs real code on your data to compute the results', 'It predicts the likely totals from patterns, the way it predicts text', 'It forwards your file to a human analyst to work out'], answer: 0, explain: 'This is the key bit: it actually computes — so the totals and charts are calculated, not “predicted”. That makes them reliable (sanity-check the setup, not the arithmetic), and no human is involved.' },
            { type: 'truefalse', q: 'Canvas is better than plain chat when you want to edit a document together line by line.', isTrue: true, explain: 'Direct editing beats regenerating the whole reply for every small change.' },
            { type: 'choice', q: 'Which task is the right fit for data analysis?', options: ['“Total my jobs spreadsheet by month and chart it”', '“Draft a friendly reminder text for a customer”', '“Explain what GST is in simple terms”'], answer: 0, explain: 'Data analysis is for crunching real numbers from a file. Drafting a text or explaining a concept is just a normal chat — no spreadsheet, no code.' }
          ]
        },
        {
          id: 'ugp5more', title: 'Web search, memory & Tasks', icon: '🧠', xp: 25,
          cards: [
            { type: 'info', title: 'Current info, a memory, and a scheduler', body: 'Three more. <b>Web search</b>: pulls current info and cites it, fixing the training cut-off. <b>Memory</b>: it can remember things about you across chats (your trade, your style) and apply them automatically — and you can view, edit or clear what it’s stored. <b>Tasks</b>: schedule it to run on its own — e.g. a summary every Friday morning — so recurring jobs happen without you asking.' },
            { type: 'truefalse', q: 'ChatGPT’s memory persists across chats, and you can see and delete what it has stored.', isTrue: true, explain: 'It carries useful context forward — and you stay in control. Worth checking what’s in there occasionally.' },
            { type: 'choice', q: 'How is “memory” different from a Project?', options: ['Memory follows you across all chats automatically; a Project’s context stays in that one workspace', 'Memory works only in a single chat; Projects work everywhere', 'A Project remembers you, while memory remembers nothing at all'], answer: 0, explain: 'Memory is global and automatic; a Project is a deliberate, contained setup. The other two options have it backwards.' },
            { type: 'choice', q: 'You want a weekly summary generated every Friday without asking. Use…', options: ['Tasks (scheduled runs)', 'Memory', 'A Custom GPT'], answer: 0, explain: 'Tasks is the built-in scheduler. Memory just carries context; a Custom GPT is a ready-made helper — neither runs itself on a timetable.' }
          ]
        },
        {
          id: 'ugp6agent', title: 'Agent mode', icon: '🤖', xp: 25,
          cards: [
            { type: 'info', title: 'When it does the job, not just describes it', body: 'ChatGPT has an <b>agent</b> side: give it a multi-step goal and it works through it using tools — browsing, clicking, filling things in — then comes back with it done. <b>Deep research</b> is a focused version: it hunts across many sources and writes you a structured, cited rundown. Same agent idea as Claude’s Cowork — a model in a loop with tools. Same caution too: scope it, and check the result.' },
            { type: 'choice', q: 'What is agent mode doing that normal chat isn’t?', options: ['Running a multi-step task with tools to actually complete it', 'Giving longer, more detailed written answers', 'Thinking harder but still just replying with text'], answer: 0, explain: 'It carries out the job end-to-end with tools, rather than just writing about it — that’s the difference, not answer length or extra thinking.' },
            { type: 'truefalse', q: 'Deep research is good for “tell me everything about X”, pulling many sources into one cited summary.', isTrue: true, explain: 'Multi-source synthesis with citations — a real time-saver for big questions.' },
            { type: 'choice', q: 'Because an agent takes real actions, the smart rule is…', options: ['Use it for the legwork, but scope its access and check what it did', 'Relax — it only ever reads things, it never changes anything', 'Watch every single action live or it’s not worth using'], answer: 0, explain: 'Same as any capable agent: great for grunt work, you keep oversight. It can take real actions (not read-only), but you also don’t need to babysit every click — scope it and review.' }
          ]
        },
        {
          id: 'ugp5',
          title: 'Which feature, when?',
          icon: '🧭',
          xp: 30,
          cards: [
            { type: 'info', title: 'Match the tool to the job', body: 'A quick framework so you reach for the right one without thinking.' },
            { type: 'match', q: 'Match the job to the ChatGPT feature:', pairs: [['Ask hands-free on site', 'Voice'], ['Read a part off a photo', 'Vision'], ['Edit a quote together', 'Canvas'], ['Crunch a spreadsheet', 'Data analysis']], explain: 'Each has its moment — now you know which is which and why.' },
            { type: 'choice', q: 'You want a reusable assistant loaded with your business rules. Use…', options: ['A Custom GPT', 'Canvas', 'Memory'], answer: 0, explain: 'A Custom GPT packages instructions + knowledge into a reusable helper. Canvas is for editing a doc; memory just carries loose context across chats.' },
            { type: 'choice', q: 'You need current info with sources for a quote. Use…', options: ['Web search', 'Memory', 'Canvas'], answer: 0, explain: 'Only web search pulls live, cited info to close the knowledge-cut-off gap.' },
            { type: 'info', title: 'You’ve met both properly', body: 'Claude and ChatGPT are both strong all-rounders built on the same foundation, each with their own kit. You now understand what each feature does and when to use it. Use whichever you’ve got — or both. Then get on the tools and put it to work.' }
          ]
        }
      ]
    },

    /* ===================== UNIT 6 (teaser) ===================== */
    {
      id: 'u2',
      title: 'Run the Business',
      subtitle: 'Quotes, invoices, customers',
      color: '#2D9CDB',
      icon: '💼',
      locked: true,
      lessons: [
        { id: 'u2l1', title: 'Quotes in seconds', icon: '🧾', xp: 25, cards: [] },
        { id: 'u2l2', title: 'Chasing payments', icon: '💸', xp: 25, cards: [] },
        { id: 'u2l3', title: 'Customer messages', icon: '📨', xp: 25, cards: [] }
      ]
    },

    /* ===================== UNIT 7 (teaser) ===================== */
    {
      id: 'u3',
      title: 'On the Tools',
      subtitle: 'AI on the job site',
      color: '#27AE60',
      icon: '🛠️',
      locked: true,
      lessons: [
        { id: 'u3l1', title: 'Photo → advice', icon: '📷', xp: 25, cards: [] },
        { id: 'u3l2', title: 'Voice notes → notes', icon: '🎙️', xp: 25, cards: [] },
        { id: 'u3l3', title: 'Reading plans & specs', icon: '📐', xp: 25, cards: [] }
      ]
    },

    /* ===================== UNIT 8 (teaser) ===================== */
    {
      id: 'u4',
      title: 'Winning Work',
      subtitle: 'Tenders, leads, marketing',
      color: '#9B51E0',
      icon: '🏆',
      locked: true,
      lessons: [
        { id: 'u4l1', title: 'Tenders & RFQs', icon: '📑', xp: 30, cards: [] },
        { id: 'u4l2', title: 'Social media posts', icon: '📱', xp: 25, cards: [] },
        { id: 'u4l3', title: 'Getting more leads', icon: '🧲', xp: 30, cards: [] }
      ]
    }
  ]
};
