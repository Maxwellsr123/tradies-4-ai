/* ============================================================
   Tradies 4 AI — Course content
   ------------------------------------------------------------
   Written to actually teach: explain the real mechanism, use a
   trade example only where it sharpens the point. Difficulty
   ramps up within each unit.

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
                'It predicts the most likely next words from patterns it learned across huge amounts of text',
                'It searches the web and pastes the best result',
                'It stores every fact it read and looks the answer up'
              ],
              answer: 0,
              explain: 'It generates, word by word. That’s why it can write a quote for a job it’s never seen — and also why it can be confidently wrong.'
            },
            {
              type: 'info',
              title: 'Why it sometimes makes things up',
              body: 'Because it predicts <b>plausible</b> text rather than retrieving <b>verified</b> facts, it can produce something that sounds dead right but isn’t — a made-up statistic, a Building Code clause number that doesn’t exist. This is a <b>hallucination</b>. It’s not lying; the model has no built-in sense of true vs false. It’s aiming for “a likely, well-formed answer”, not “a correct one”.'
            },
            {
              type: 'choice',
              q: 'Why can it state a wrong fact with total confidence?',
              options: [
                'It generates plausible-sounding text, not checked facts — it optimises for “likely”, not “true”',
                'It’s deliberately lying to you',
                'It’s broken and needs reinstalling'
              ],
              answer: 0,
              explain: 'The fluency and the confidently-wrong problem come from the same place. So anything with risk attached — prices, codes, compliance — you treat as a sharp first draft and verify.'
            },
            {
              type: 'info',
              title: 'It has a use-by date',
              body: 'A model’s core training stops at a certain point, so on its own it doesn’t know anything after that — last week’s price rise, a rule that changed last month. Some versions can search the web to fill the gap. If yours can’t, assume its knowledge has an expiry date and check current facts yourself.'
            },
            {
              type: 'truefalse',
              q: 'An AI with no web access will always know about a regulation that changed last month.',
              isTrue: false,
              explain: 'Its training likely predates the change. No web access = no idea it happened. Verify recent facts against the real source.'
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
                'It can see the whole thread (the context) and adjusts to your corrections',
                'It’s learning permanently and will remember this forever',
                'It’s guessing randomly until one sticks'
              ],
              answer: 0,
              explain: 'Within a chat it works off the full thread. That’s the loop: ask, read, correct, repeat.'
            },
            {
              type: 'truefalse',
              q: 'By default, a brand-new chat remembers everything from a chat you had last week.',
              isTrue: false,
              explain: 'Fresh chat = clean slate, unless you’re using a “memory” feature or a saved Project. Useful to know: if a chat goes off the rails, just start a new one.'
            },
            {
              type: 'info',
              title: 'There’s a limit to how much it can hold',
              body: 'The context isn’t infinite — there’s a ceiling on how much text it can keep in view at once (you’ll hear this called the <b>context window</b>). In a very long chat, the earliest stuff can effectively drop off the back. For a big task, it’s often cleaner to start fresh and paste in just what matters.'
            },
            {
              type: 'choice',
              q: 'A chat has gone for hours and it starts forgetting early details. Best move?',
              options: [
                'Start a fresh chat and paste in just the key info it needs',
                'Keep going and hope it remembers',
                'Give up — it’s maxed out forever'
              ],
              answer: 0,
              explain: 'You’ve filled the context window. A clean chat with the essential details beats a bloated one.'
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
              q: 'Why does “Write a 3-line friendly reminder about the $4,200 quote I sent last week” beat “write a follow-up”?',
              options: [
                'The detail conditions the model on your exact situation, so it predicts a fitting answer instead of a generic guess',
                'Longer prompts always score higher with the AI',
                'It makes the AI try harder out of politeness'
              ],
              answer: 0,
              explain: 'It’s not about length — it’s about relevant context. More of the right detail in = a tighter answer out.'
            },
            {
              type: 'truefalse',
              q: 'Telling it the format you want (“a bullet list”, “3 lines”, “a formal email”) reliably changes what you get.',
              isTrue: true,
              explain: 'Format is part of the steering. Spell out length, tone and structure and it’ll match them.'
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
              q: 'It gave a generic, waffly answer about your job. The most likely fix?',
              options: [
                'Add your real specifics and say exactly what you want',
                'Send the identical prompt again and hope',
                'Switch it off — it can’t do this'
              ],
              answer: 0,
              explain: 'Generic in, generic out. Ground it in your details and constrain the output.'
            },
            {
              type: 'info',
              title: 'Give it permission to say “I don’t know”',
              body: 'A useful trick against hallucination: add “if you’re not sure, say so, and don’t make up numbers or references.” Left to its own devices the model will produce a confident answer regardless. Telling it that <b>uncertainty is an acceptable answer</b> noticeably cuts the made-up stuff.'
            },
            {
              type: 'choice',
              q: 'Which addition most reduces the risk of it inventing a fake standard or figure?',
              options: [
                '“If you’re not certain, say so — don’t make up references or numbers.”',
                '“Please be 100% accurate.”',
                '“Answer fast.”'
              ],
              answer: 0,
              explain: 'Giving it an honest “out” works far better than ordering it to be accurate. It can’t will itself correct, but it can flag doubt when you allow it.'
            },
            {
              type: 'truefalse',
              q: 'Telling the model what NOT to do (e.g. “no jargon, don’t exceed 100 words”) is a valid way to steer it.',
              isTrue: true,
              explain: 'Negative constraints are legit steering. Boundaries shape the output as much as the main instruction.'
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
              body: 'The single best way to get accurate answers: <b>give it the source</b>. Paste the actual spec, the real email, the council PDF, and ask it to work only from that. It’s far less likely to invent things when it’s summarising material you handed it than when it’s answering from memory. For anything that carries risk, also ask it to point to where in the document the answer came from.'
            },
            {
              type: 'choice',
              q: 'Which approach gives the most reliable answer about a 40-page spec?',
              options: [
                'Upload the spec and ask it to answer only from that document',
                'Ask from memory and hope it’s read that exact spec',
                'Ask it to guess the likely contents'
              ],
              answer: 0,
              explain: 'Grounding it in the real document is the difference between “summarising” and “making it up”.'
            },
            {
              type: 'info',
              title: 'Assume what you type can be seen',
              body: 'On consumer (free/personal) versions, what you type may be used to help improve the model unless you’ve turned that off in settings. Business and enterprise versions usually don’t train on your data. The safe rule regardless: never paste genuinely sensitive stuff — customer bank details, passwords, anything you wouldn’t want leaving your control.'
            },
            {
              type: 'truefalse',
              q: 'It’s fine to paste a customer’s card number into a personal ChatGPT account to “sort the invoice”.',
              isTrue: false,
              explain: 'No. Treat sensitive data as off-limits. Use it for the wording and structure, keep the private numbers out.'
            },
            {
              type: 'choice',
              q: 'AI hands you an exact NZ Building Code clause for a customer doc. The professional move?',
              options: [
                'Verify the clause against the actual code before relying on it',
                'Copy it straight in — it sounded specific',
                'Never reference codes again'
              ],
              answer: 0,
              explain: 'Specific-sounding is exactly how a hallucination looks. Use it as a pointer, confirm the real thing.'
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
            { type: 'choice', q: 'Two people use the exact same AI and get very different quality. The biggest factor is usually…', options: ['How well they set up the input (context, examples, constraints)', 'Who pays more', 'Random luck on the day'], answer: 0, explain: 'The model is the same. The setup is the variable you control.' },
            { type: 'truefalse', q: 'A better-engineered prompt can outperform a “smarter” model fed a lazy prompt.', isTrue: true, explain: 'Often, yes. Good input beats raw horsepower wasted on a vague ask.' }
          ]
        },
        {
          id: 'umed2', title: 'Roles & personas', icon: '🎭', xp: 25,
          cards: [
            { type: 'info', title: 'Why a role works', body: 'Opening with “You’re an experienced NZ plumber writing to a homeowner…” does real work. It conditions the model toward the vocabulary, tone and assumptions of that role — it shifts the patterns it draws on. You’re not flattering it; you’re narrowing the slice of its training it leans on.' },
            { type: 'choice', q: 'What is a role/persona prompt actually doing under the hood?', options: ['Steering the model toward the language and assumptions tied to that role', 'Giving the model a real job title', 'Making it legally responsible for the answer'], answer: 0, explain: 'It conditions the prediction. “Explain like I’m a first-year apprentice” vs “…to a building inspector” produces genuinely different answers.' },
            { type: 'truefalse', q: 'Adding the audience (“…explained to a homeowner with no trade knowledge”) changes the output as much as the role does.', isTrue: true, explain: 'Role + audience together are two of the strongest, cheapest levers you have.' },
            { type: 'choice', q: 'When does a role prompt help LEAST?', options: ['A simple factual lookup with one right answer (“convert 3/4 inch to mm”)', 'Drafting a customer email', 'Explaining a concept to a specific audience'], answer: 0, explain: 'Roles shape tone and judgement. For a single hard fact, they add little — just ask plainly.' }
          ]
        },
        {
          id: 'umed3', title: 'Show it examples', icon: '🧩', xp: 25,
          cards: [
            { type: 'info', title: 'Examples teach it the pattern on the spot', body: 'Paste one or two examples of what “good” looks like — a past quote, a text you’d send — and ask for more in the same style. The model picks up the pattern from your examples and copies it. This is called <b>in-context learning</b>: you’re not retraining anything, you’re showing it the target inside the prompt. It’s the most reliable way to control format and tone.' },
            { type: 'choice', q: 'You paste two of your past quotes and ask for a third “like these”. Why does this work so well?', options: ['It copies the pattern from your examples (in-context learning)', 'It permanently memorises your quoting style', 'It emails your old quotes to the customer'], answer: 0, explain: 'Showing beats telling. A real example carries more signal than a paragraph describing what you want.' },
            { type: 'truefalse', q: 'Giving examples is especially powerful when you need a consistent FORMAT every time.', isTrue: true, explain: 'Format and tone are exactly what examples lock in — better than any description.' },
            { type: 'match', q: 'Match the goal to the better technique:', pairs: [['Match my exact quote layout', 'Show 1–2 examples'], ['Get the right tone of voice', 'Show an example + name the audience'], ['One quick fact', 'Just ask plainly']], explain: 'Right technique for the job. Examples for pattern, plain ask for facts.' }
          ]
        },
        {
          id: 'umed4', title: 'Ground it in your data', icon: '📎', xp: 25,
          cards: [
            { type: 'info', title: 'Make it answer from YOUR material', body: 'The strongest defence against made-up answers is <b>grounding</b>: give it the actual document, numbers or photos and tell it to answer only from those. Now it’s reading and summarising your material instead of guessing from memory. This is the same idea big “chat with your documents” tools use under the hood — feed in the relevant source, then ask.' },
            { type: 'truefalse', q: 'Uploading the real spec and asking it to work only from that reduces hallucination compared with asking from memory.', isTrue: true, explain: 'Hugely. It can only summarise what’s in front of it, so there’s far less room to invent.' },
            { type: 'choice', q: 'Best way to get an accurate summary of a council consent document?', options: ['Paste/upload the document and say “answer only from this; quote the section”', 'Describe it roughly and ask what it probably says', 'Ask for its best guess'], answer: 0, explain: 'Ground it, and ask it to cite the section so you can check.' },
            { type: 'choice', q: 'Why also ask it to “point to where in the document the answer is”?', options: ['It lets you verify fast and discourages it from inventing', 'It makes the answer longer', 'It’s required by law'], answer: 0, explain: 'Citations turn a black-box answer into one you can check in seconds.' }
          ]
        },
        {
          id: 'umed5', title: 'Iterate & make it think', icon: '🔁', xp: 25,
          cards: [
            { type: 'info', title: 'First answer = draft. Push it.', body: 'Treat the first reply as a starting point. Three high-value moves: ask for <b>options</b> (“give me 3 versions, different tones”); ask it to <b>show its working</b> on anything with steps or numbers (“work through it step by step”) — this genuinely improves accuracy on reasoning; and ask it to <b>check itself</b> (“review that for errors or anything you assumed”).' },
            { type: 'choice', q: 'For a multi-step calculation, adding “work through it step by step” tends to…', options: ['Improve accuracy, because it reasons through the steps instead of jumping to an answer', 'Slow it down for no benefit', 'Make it refuse'], answer: 0, explain: 'Forcing the working out is a real technique (you’ll hear “chain of thought”). It catches errors a snap answer misses.' },
            { type: 'truefalse', q: 'Asking the model to critique its own previous answer can surface mistakes and weak assumptions.', isTrue: true, explain: 'Self-review is cheap and effective. “What did you assume? What might be wrong here?”' },
            { type: 'choice', q: 'You want the best wording for an important email. Smartest ask?', options: ['“Give me 3 versions with different tones, then we’ll refine the best one.”', '“Write it.” then send the first thing', '“Make it perfect.”'], answer: 0, explain: 'Options + refinement beats one-and-done. You stay the editor.' }
          ]
        },
        {
          id: 'umed6', title: 'Build a prompt kit', icon: '💾', xp: 30,
          cards: [
            { type: 'info', title: 'Reuse what works — and know it varies', body: 'When a prompt nails it, save it. Over time you build a little kit of go-to prompts for the jobs you do weekly (quotes, follow-ups, reviews). One thing to expect: the same prompt can give slightly different answers each time — there’s deliberate variation built in. That’s normal, not a bug; it’s why “give me 3 options” works.' },
            { type: 'truefalse', q: 'Running the same prompt twice can produce two different answers.', isTrue: true, explain: 'There’s built-in randomness so it doesn’t parrot the same line every time. Handy for variety; worth knowing when you expected identical output.' },
            { type: 'choice', q: 'The real payoff of saving your best prompts is…', options: ['Consistent, fast results on the jobs you repeat', 'The AI remembers you', 'It costs less'], answer: 0, explain: 'A reusable prompt is a small tool you sharpen once and use forever.' },
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
            { type: 'choice', q: 'The core shift at “high level” is…', options: ['Wrapping the model in instructions, tools and loops so it does whole jobs', 'Typing faster', 'Paying for the biggest model'], answer: 0, explain: 'The model is one component. The system around it is where the real leverage is.' },
            { type: 'truefalse', q: 'You should adopt every advanced feature to get value.', isTrue: false, explain: 'Pick the few that save you real time. Ignore the rest until they’re useful.' }
          ]
        },
        {
          id: 'uhigh2', title: 'Build your own assistant', icon: '🛠️', xp: 30,
          cards: [
            { type: 'info', title: 'Package the instructions + the knowledge', body: 'A <b>Custom GPT</b> (ChatGPT) or a <b>Project / Skill</b> (Claude) is a reusable assistant. Two ingredients: a <b>system instruction</b> — standing rules it follows every time (“You quote for KPA Plumbing. Always itemise labour and materials, add 5% P&G, use a friendly-but-professional tone”) — and <b>knowledge</b> you attach (rate cards, past quotes, your terms). Now every chat starts already knowing your business, instead of you re-explaining it.' },
            { type: 'choice', q: 'What’s the “system instruction” of a custom assistant?', options: ['Standing rules it applies to every conversation automatically', 'A one-off message you send once', 'The customer’s reply'], answer: 0, explain: 'It’s the always-on brief. Set the rules once; they apply every time without you repeating them.' },
            { type: 'truefalse', q: 'Attaching your rate card and past quotes as “knowledge” makes its answers fit your business without you pasting them each time.', isTrue: true, explain: 'That attached knowledge is what makes it <i>yours</i> rather than generic.' },
            { type: 'choice', q: 'Biggest benefit of a custom assistant over a plain chat?', options: ['Consistent results and no re-explaining your business every time', 'It’s cheaper per message', 'It types faster'], answer: 0, explain: 'Consistency + zero setup each time. That’s the whole point of packaging it.' }
          ]
        },
        {
          id: 'uhigh3', title: 'Tools & connectors', icon: '🔌', xp: 30,
          cards: [
            { type: 'info', title: 'Give it hands and live data', body: 'On its own the model only knows its training. Connect <b>tools</b> — Xero, Gmail, your calendar, a web search — and it can pull <b>real, current data</b> and take <b>actions</b>. Mechanically: the model decides a tool is needed, calls it, gets the result back, and continues. (Claude’s open standard for this is <b>MCP</b>; ChatGPT calls them actions/connectors.) This is the jump from “gives advice” to “gets things done”.' },
            { type: 'truefalse', q: 'Connecting tools lets the model use real, up-to-date data instead of only its training.', isTrue: true, explain: 'A connected model can read your actual invoices today — not a guess from months ago.' },
            { type: 'choice', q: 'When the model “calls a tool”, what’s happening?', options: ['It decides a tool is needed, runs it, reads the result, and carries on', 'It emails a human to do it', 'It pretends and makes up the data'], answer: 0, explain: 'Tool-calling is the model reaching out for real data or to perform an action mid-task.' },
            { type: 'choice', q: 'A genuine risk to manage when AI can take actions in your apps?', options: ['It could act on a misunderstanding — so scope its access and review what matters', 'It uses more electricity', 'It gets bored'], answer: 0, explain: 'Hands mean responsibility. Give limited access, and keep a human check on anything that sends money or messages.' }
          ]
        },
        {
          id: 'uhigh4', title: 'Loops & automations', icon: '♾️', xp: 30,
          cards: [
            { type: 'info', title: 'A trigger, an action, repeated', body: 'An <b>automation</b> is the model wired into a pipeline: a <b>trigger</b> fires (a new invoice, 7 days passing, an email arriving), the model does a defined <b>task</b>, and something happens (a draft chaser, a tagged email). A <b>loop</b> just means it runs on every matching event. Set up once, runs forever. The skill is defining the trigger and the guardrails tightly so it does exactly the right thing.' },
            { type: 'choice', q: 'A solid first automation for a trade business?', options: ['When an invoice hits 7 days overdue → draft a polite chaser for me to approve', 'Let AI send all money transfers unsupervised', 'Reply to every email instantly with no review'], answer: 0, explain: 'Clear trigger, useful task, human approves the send. That’s the safe, high-value pattern.' },
            { type: 'truefalse', q: 'A good automation needs a clearly-defined trigger and guardrails, not just “do stuff”.', isTrue: true, explain: 'Vague automations misfire. Tight trigger + tight task + a review step on anything risky.' },
            { type: 'choice', q: 'Why keep a human approval step on an automated customer email at first?', options: ['One bad assumption could go out 50 times before you notice — approval contains the blast radius', 'Customers prefer slow replies', 'The AI demands it'], answer: 0, explain: 'Automation multiplies both good and bad. Approve until you trust it, then loosen.' }
          ]
        },
        {
          id: 'uhigh5', title: 'Agents & harnesses', icon: '🤖', xp: 35,
          cards: [
            { type: 'info', title: 'An agent is a model in a loop with tools and a goal', body: 'An <b>agent</b> doesn’t just answer — you give it a goal and it runs a loop: <i>look at the situation → decide the next step → use a tool → see the result → repeat</i>, until the goal’s met. The <b>harness</b> is the scaffolding around it: it provides the tools, runs the loop, sets stopping conditions, and checks the work. Claude Code and ChatGPT’s agent mode are harnesses. That structure is what turns a chatbot into something that completes a multi-step job.' },
            { type: 'choice', q: 'What makes an agent different from a normal chat answer?', options: ['It runs a decide→act→observe loop with tools until a goal is reached', 'It just talks in a deeper voice', 'It answers one question and stops'], answer: 0, explain: 'Goal + tools + a loop. That’s the recipe for autonomous, multi-step work.' },
            { type: 'truefalse', q: 'The “harness” is the system that gives the agent its tools, runs the loop, and decides when it’s done.', isTrue: true, explain: 'The model is the brain; the harness is the workshop, the tools and the foreman keeping it on task.' },
            { type: 'choice', q: 'Agents can go wrong on long tasks mainly because…', options: ['Small errors compound across many steps if nothing checks the work', 'They get tired', 'They run out of words'], answer: 0, explain: 'Step 3’s mistake poisons steps 4–10. Good harnesses add verification and limits to catch drift early.' },
            { type: 'choice', q: 'So the practical rule with agents is…', options: ['Great for multi-step grunt work, but scope it and verify the result', 'Trust it blindly with anything', 'Never useful'], answer: 0, explain: 'Powerful for the legwork; you still set the bounds and check the output.' }
          ]
        },
        {
          id: 'uhigh6', title: 'Choosing the right model', icon: '🧰', xp: 35,
          cards: [
            { type: 'info', title: 'Match the model to the job', body: 'There’s a spread of models: bigger “reasoning” ones that think harder (slower, dearer) and lighter ones that are fast and cheap. The skill is matching them: a quick text reply doesn’t need the heavy reasoner; a tricky multi-part problem or a tender analysis does. Two other levers: the <b>context window</b> (how much you can paste in at once — whole specs, long threads) and whether the model can <b>search the web</b> for current info.' },
            { type: 'choice', q: 'You need a one-line reminder text. Sensible choice?', options: ['A fast, cheap model — the job doesn’t need a heavy reasoner', 'Always the biggest, slowest model', 'Don’t use AI for it'], answer: 0, explain: 'Don’t bring the excavator to plant a seedling. Match the tool to the task.' },
            { type: 'choice', q: 'When does a heavier “reasoning” model actually earn its keep?', options: ['A complex, multi-step problem where getting it right matters', 'Saying “gidday”', 'Fixing a typo'], answer: 0, explain: 'Hard, high-stakes, multi-step work is where the extra thinking pays off.' },
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
            { type: 'choice', q: 'Claude is a particularly strong pick when you need to…', options: ['Work through a long document (a full spec or contract) carefully', 'Crimp a fitting', 'Make a phone call for you'], answer: 0, explain: 'Long-context comprehension and careful reasoning are where it shines.' },
            { type: 'truefalse', q: 'Despite different strengths, Claude works on the same predict-the-next-text foundation as other LLMs — including the hallucination risk.', isTrue: true, explain: 'Same fundamentals, so the same habits apply: ground it and verify what matters.' },
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
            { type: 'choice', q: 'What does a Project actually give every chat inside it?', options: ['Your standing instructions + uploaded knowledge, automatically', 'A faster internet connection', 'A different AI model'], answer: 0, explain: 'Instructions + knowledge, inherited by default. Set up once, reused every chat.' },
            { type: 'truefalse', q: 'A Project is a good place to keep separate setups — e.g. one for quoting, one for marketing.', isTrue: true, explain: 'Separate Projects keep each job focused on just the right instructions and files.' },
            { type: 'choice', q: 'You upload your rate card and terms to a “KPA Quotes” Project. The effect?', options: ['Every quote chat there can use your real rates and terms without re-pasting', 'It posts your rates publicly', 'It charges customers automatically'], answer: 0, explain: 'The knowledge sits there ready. You just ask; it already has the context.' }
          ]
        },
        {
          id: 'ucl3',
          title: 'Artifacts',
          icon: '🛠️',
          xp: 25,
          cards: [
            { type: 'info', title: 'It builds the actual thing, live', body: 'Normally it replies in chat. With <b>Artifacts</b>, when you ask it to make something — a document, a checklist, a price calculator, a small web app — it opens a panel and <b>builds it there, working and live</b>. It can write and run code to do it. You refine by chatting (“add a GST line”, “make the button bigger”) and download or share the result. You get a finished tool, not just words about one.' },
            { type: 'choice', q: 'What’s genuinely different about an Artifact vs a normal reply?', options: ['It produces a working, editable thing in a side panel — often by writing and running code', 'It’s just bold text', 'It reads the answer aloud'], answer: 0, explain: 'It’s the real artefact — a runnable calculator or app — that you iterate on, not a description.' },
            { type: 'truefalse', q: 'You can keep refining an Artifact by chatting, then download or share it.', isTrue: true, explain: 'It’s iterative: build, tweak, tweak, ship.' },
            { type: 'choice', q: 'Best fit for an Artifact?', options: ['“Build me a bathroom-reno cost calculator I can put on my website”', '“What’s 10% of 500?”', '“Define plumbing”'], answer: 0, explain: 'Calculators, pages, charts, mini-apps — things, not one-line answers.' }
          ]
        },
        {
          id: 'ucl4',
          title: 'Cowork',
          icon: '🤝',
          xp: 30,
          cards: [
            { type: 'info', title: 'Claude doing multi-step work on real files', body: 'Chat answers; <b>Cowork</b> does. You point Claude at a folder or connected apps and it works through a whole job — reading and editing files, building a spreadsheet, going step by step — and can even split work across helper <b>sub-agents</b> for bigger tasks. It’s Claude operating as an agent (loop + tools + goal) rather than a one-shot reply. Use it for real jobs; use plain chat for quick questions.' },
            { type: 'choice', q: 'Cowork is the right tool when…', options: ['You’ve got a multi-step job over real files (“go through these 30 invoices and build a summary”)', 'You want a single quick definition', 'You want it to talk louder'], answer: 0, explain: 'Multi-step, file-based, goal-driven work — that’s Cowork’s lane.' },
            { type: 'truefalse', q: 'In Cowork, Claude can read and edit actual files and use connected apps to finish a task end-to-end.', isTrue: true, explain: 'That’s the leap from advice to done work.' },
            { type: 'choice', q: 'Because Cowork can change files and take actions, the sensible habit is…', options: ['Scope what it can touch and review the result, especially first few times', 'Let it loose on everything unsupervised', 'Never use it'], answer: 0, explain: 'Capable tool, real consequences. Bound it, check it, then trust it more over time.' }
          ]
        },
        {
          id: 'ucl5conn', title: 'Connectors (MCP)', icon: '🔌', xp: 25,
          cards: [
            { type: 'info', title: 'A standard way to plug in your tools', body: 'A <b>Connector</b> links Claude to an app or data source — Gmail, Xero, Google Drive, Slack — so it can use the real thing. Anthropic built an open standard for this called <b>MCP</b> (Model Context Protocol); think of it as a universal adapter so any tool can be plugged into any AI the same way. Connect once, and Claude can read a file from Drive or draft from a real email — no copy-paste.' },
            { type: 'choice', q: 'What problem does MCP / Connectors solve?', options: ['A standard way to plug real tools and data into the AI so it works with live info', 'Charging your tools’ batteries', 'Making the AI louder'], answer: 0, explain: 'One standard “adapter” means tools and AIs connect the same way instead of every pair needing custom wiring.' },
            { type: 'match', q: 'Match the connector to what Claude can then do:', pairs: [['Xero', 'Work with real invoices & figures'], ['Gmail', 'Draft from actual emails'], ['Drive', 'Read your real files']], explain: 'Connected = live data in the loop, not a guess.' },
            { type: 'truefalse', q: 'Connectors are optional — plain Claude still works without any connected.', isTrue: true, explain: 'They’re power-ups. Add the ones that save you time; skip the rest.' }
          ]
        },
        {
          id: 'ucl6skills', title: 'Skills', icon: '🎓', xp: 25,
          cards: [
            { type: 'info', title: 'Packaged know-how for a repeatable job', body: 'A <b>Skill</b> is a saved procedure that teaches Claude how to do a specific job your way — “build a KPA quote from a measure sheet”, end to end. Unlike a one-off prompt you retype, a Skill is reusable and can bundle steps, rules and even files. Once it exists, you trigger it and Claude follows your method every time. It’s how you turn “the way I do X” into something the AI just does.' },
            { type: 'choice', q: 'How is a Skill different from just typing a good prompt each time?', options: ['It’s a saved, reusable procedure — bundled steps and rules you trigger, not retype', 'It’s a TAFE qualification', 'It’s a faster model'], answer: 0, explain: 'A prompt is a sentence; a Skill is a saved workflow you reuse.' },
            { type: 'truefalse', q: 'Skills shine for jobs you repeat the same way (quotes, job reports, standard emails).', isTrue: true, explain: 'Repeatable + your-specific-method = perfect Skill territory.' },
            { type: 'choice', q: 'Project vs Skill — the clean distinction?', options: ['A Project holds context/knowledge; a Skill packages a repeatable procedure to run', 'They’re identical', 'A Skill stores customer data'], answer: 0, explain: 'Project = a workspace that knows your stuff. Skill = a saved way of doing a job.' }
          ]
        },
        {
          id: 'ucl7eyes', title: 'Images, files & voice', icon: '👀', xp: 25,
          cards: [
            { type: 'info', title: 'It’s multimodal — not just text', body: 'Claude can take in more than typing. Show it a <b>photo</b> (a part, a fault, a handwritten note) and it reads and reasons about it. Upload <b>files</b> — PDFs, spreadsheets, long specs — and it works through them. On the app you can <b>talk</b> to it. Useful limit to remember: vision and document reading aren’t perfect — confirm anything critical it pulls off a blurry photo or a dense table.' },
            { type: 'truefalse', q: 'You can upload a 50-page PDF and have Claude pull out and explain the key points.', isTrue: true, explain: 'Long documents are a particular strength — its big context window helps here.' },
            { type: 'choice', q: 'It reads a measurement off a blurry site photo. Smart move?', options: ['Use it, but confirm the critical number yourself', 'Trust it completely', 'Assume it can’t read photos at all'], answer: 0, explain: 'Vision is genuinely useful and genuinely imperfect. Verify what matters.' },
            { type: 'match', q: 'Match the input to a good use:', pairs: [['Photo', 'Identify a part or read a note'], ['PDF / sheet', 'Summarise or analyse a document'], ['Voice', 'Hands-free Q&A on the app']], explain: 'Type it, show it, or say it — Claude takes all three.' }
          ]
        },
        {
          id: 'ucl8power', title: 'Web search & deep thinking', icon: '⚡', xp: 25,
          cards: [
            { type: 'info', title: 'Current info and harder reasoning', body: 'Two more levers. <b>Web search</b> lets Claude look up current information — today’s prices, a recent rule change — closing the training cut-off gap, with links so you can check. <b>Extended thinking</b> (a deeper reasoning mode) makes it work a tricky problem through more carefully before answering — slower, but better on genuinely hard, multi-part questions. And for the technical, <b>Claude Code</b> runs it as a coding agent in the terminal.' },
            { type: 'truefalse', q: 'With web search on, Claude can ground an answer in current sources and show you the links.', isTrue: true, explain: 'It pulls live info and cites it — so you’re not stuck with stale training data, and you can verify.' },
            { type: 'choice', q: 'When is “extended thinking” / deeper reasoning worth the extra wait?', options: ['A complex, multi-part problem where accuracy matters', 'A one-line greeting', 'Reading the time'], answer: 0, explain: 'Save the heavy thinking for the hard stuff; it’s overkill for trivial asks.' },
            { type: 'choice', q: 'Web search mainly fixes which limitation of an LLM?', options: ['Its knowledge cut-off — it doesn’t know recent events on its own', 'Its spelling', 'Its colour'], answer: 0, explain: 'Search bridges the gap between “trained months ago” and “what’s true today”.' }
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
            { type: 'choice', q: 'You want it to work with your live Xero figures. The piece you need is…', options: ['A Connector (so it reaches real data)', 'A louder voice', 'A new password'], answer: 0, explain: 'Live data = a Connector. Without it, it’s guessing from training.' },
            { type: 'choice', q: 'You do the same fiddly job your way every week. Best fit?', options: ['A Skill (packaged, repeatable procedure)', 'A brand-new chat each time', 'Web search'], answer: 0, explain: 'Repeatable + your method = a Skill. Build it once, run it forever.' },
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
            { type: 'info', title: 'The all-rounder that kicked it off', body: 'ChatGPT (by <b>OpenAI</b>) is the tool that put this tech in front of everyone. It’s a capable all-rounder — strong at writing, explaining, coding, and it’s fully <b>multimodal</b> (text, voice, images). It runs on OpenAI’s <b>GPT</b> models, with a free tier and paid tiers that unlock the better models and higher limits. Get it at <b>chatgpt.com</b> or the app.' },
            { type: 'choice', q: 'What does the free vs paid tier mainly change?', options: ['Access to the more capable models and higher usage limits', 'Whether it can talk at all', 'The colour of the app'], answer: 0, explain: 'Free is plenty to learn on; paid unlocks the stronger models and more usage.' },
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
            { type: 'choice', q: 'What’s the difference between vision and image generation?', options: ['Vision reads an image you give it; generation creates a new image from a description', 'They’re the same thing', 'Vision is paid, generation is free'], answer: 0, explain: 'Understanding vs creating — two different jobs, two different tools.' },
            { type: 'truefalse', q: 'Voice mode is well suited to asking questions when your hands are full on the tools.', isTrue: true, explain: 'Hands-free, real-time — built for the ute or the site.' },
            { type: 'choice', q: 'You snap a photo of an unfamiliar valve and ask what it is. Sensible habit?', options: ['Use its read as a strong lead, but confirm before you rely on it for a job', 'Take it as gospel', 'Assume it can’t see photos'], answer: 0, explain: 'Vision is useful and imperfect — verify anything that drives a real decision.' }
          ]
        },
        {
          id: 'ugp3',
          title: 'Custom GPTs & Projects',
          icon: '🧰',
          xp: 25,
          cards: [
            { type: 'info', title: 'Reusable assistants vs tidy workspaces', body: 'A <b>Custom GPT</b> is a packaged assistant: standing instructions, attached knowledge, and optionally <b>actions</b> (connections to other tools) — built for one job, like a quoting helper. There’s a whole <b>GPT Store</b> of ready-made ones. A <b>Project</b> is different: a workspace that keeps the chats and files for one big job together. GPT = a reusable helper; Project = an organised folder.' },
            { type: 'choice', q: 'A Custom GPT is best described as…', options: ['A reusable assistant with set instructions, knowledge and (optionally) tool actions', 'A folder of chats', 'A new phone'], answer: 0, explain: 'It’s the packaged helper — same idea as Claude’s Projects/Skills combined.' },
            { type: 'truefalse', q: 'A ChatGPT Project keeps the chats and files for one job in one place.', isTrue: true, explain: 'Stops a big reno or tender getting scattered across random chats.' },
            { type: 'match', q: 'Match it up:', pairs: [['Custom GPT', 'Reusable assistant for one job'], ['GPT Store', 'Library of ready-made GPTs'], ['Project', 'Workspace for one job’s chats + files']], explain: 'Helper, library of helpers, and a place to keep a job tidy.' }
          ]
        },
        {
          id: 'ugp4',
          title: 'Canvas & data analysis',
          icon: '📊',
          xp: 25,
          cards: [
            { type: 'info', title: 'A shared editor, and a number-cruncher', body: 'Two power features. <b>Canvas</b> opens a document beside the chat you both edit directly — great for quotes, letters, web copy — instead of regenerating the whole thing each time. <b>Data analysis</b> is bigger than it sounds: upload a spreadsheet and ChatGPT actually <b>writes and runs code</b> (Python) on your data to total it, find outliers, and draw charts. It’s computing real results, not guessing at numbers.' },
            { type: 'choice', q: 'When ChatGPT analyses your spreadsheet, what’s really happening?', options: ['It writes and runs code on your data to compute real results', 'It eyeballs the numbers and estimates', 'It can’t handle spreadsheets'], answer: 0, explain: 'Actual computation — so the totals and charts are calculated, not predicted. Still sanity-check the setup.' },
            { type: 'truefalse', q: 'Canvas is better than plain chat when you want to edit a document together line by line.', isTrue: true, explain: 'Direct editing beats regenerating the whole reply for every small change.' },
            { type: 'choice', q: 'Best fit for data analysis?', options: ['“Here’s my jobs spreadsheet — total revenue by month and chart it”', '“Write me a poem”', '“What’s your name?”'], answer: 0, explain: 'Real numbers, real computation, a real chart out the other side.' }
          ]
        },
        {
          id: 'ugp5more', title: 'Web search, memory & Tasks', icon: '🧠', xp: 25,
          cards: [
            { type: 'info', title: 'Current info, a memory, and a scheduler', body: 'Three more. <b>Web search</b>: pulls current info and cites it, fixing the training cut-off. <b>Memory</b>: it can remember things about you across chats (your trade, your style) and apply them automatically — and you can view, edit or clear what it’s stored. <b>Tasks</b>: schedule it to run on its own — e.g. a summary every Friday morning — so recurring jobs happen without you asking.' },
            { type: 'truefalse', q: 'ChatGPT’s memory persists across chats, and you can see and delete what it has stored.', isTrue: true, explain: 'It carries useful context forward — and you stay in control of it. Worth checking what’s in there occasionally.' },
            { type: 'choice', q: 'How is “memory” different from a Project?', options: ['Memory follows you across all chats automatically; a Project’s context is scoped to that workspace', 'They’re identical', 'Memory is a spreadsheet'], answer: 0, explain: 'Memory = global, automatic. Project = a deliberate, contained setup.' },
            { type: 'choice', q: 'You want a weekly summary emailed every Friday without asking. Use…', options: ['Tasks (scheduled runs)', 'Image generation', 'Voice mode'], answer: 0, explain: 'Tasks is the built-in scheduler for recurring jobs.' }
          ]
        },
        {
          id: 'ugp6agent', title: 'Agent mode', icon: '🤖', xp: 25,
          cards: [
            { type: 'info', title: 'When it does the job, not just describes it', body: 'ChatGPT has an <b>agent</b> side: give it a multi-step goal and it works through it using tools — browsing, clicking, filling things in — then comes back with it done. <b>Deep research</b> is a focused version: it hunts across many sources and writes you a structured, cited rundown. Same agent idea as Claude’s Cowork — a model in a loop with tools. Same caution too: scope it, and check the result.' },
            { type: 'choice', q: 'What is agent mode doing that normal chat isn’t?', options: ['Running a multi-step task with tools to actually complete it', 'Talking in a deeper voice', 'Answering one question then stopping'], answer: 0, explain: 'It carries out the job end-to-end rather than telling you how to.' },
            { type: 'truefalse', q: 'Deep research is good for “tell me everything about X”, pulling many sources into one cited summary.', isTrue: true, explain: 'Multi-source synthesis with citations — a real time-saver for big questions.' },
            { type: 'choice', q: 'Because an agent takes real actions, the smart rule is…', options: ['Use it for the legwork, but scope its access and review what it did', 'Let it run wild on everything', 'Avoid it entirely'], answer: 0, explain: 'Same as any capable agent: great for grunt work, you keep the oversight.' }
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
            { type: 'choice', q: 'You want a reusable assistant loaded with your business rules. Use…', options: ['A Custom GPT', 'Image generation', 'Voice'], answer: 0, explain: 'Packaged instructions + knowledge = a Custom GPT.' },
            { type: 'choice', q: 'You need current info with sources for a quote. Use…', options: ['Web search', 'Memory', 'Canvas'], answer: 0, explain: 'Live, cited info closes the knowledge-cut-off gap.' },
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
