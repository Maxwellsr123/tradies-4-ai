/* ============================================================
   Tradies 4 AI — Course content
   ------------------------------------------------------------
   To add lessons: copy a lesson block and edit it. To add a
   whole unit: copy a unit block. No coding needed beyond this
   file. Card types you can use:

     info      → a teaching card (no scoring). { type:'info', title, body }
     choice    → multiple choice.  { type:'choice', q, options:[], answer:<index>, explain }
     truefalse → "Tip or Trap".    { type:'truefalse', q, isTrue:true|false, explain }
     match     → match the pairs.  { type:'match', q, pairs:[[a,b],...], explain }
     order     → put in order.     { type:'order', q, steps:[...in correct order], explain }
   ============================================================ */

const COURSE = {
  units: [
    /* ===================== UNIT 1 ===================== */
    {
      id: 'u1',
      title: 'AI Basics',
      subtitle: 'Start here — no jargon',
      color: '#FF6A00',
      icon: '🤖',
      locked: false,
      lessons: [
        /* ---- Lesson 1 ---- */
        {
          id: 'u1l1',
          title: 'What even is AI?',
          icon: '👋',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'Gidday — let’s clear this up',
              body: 'AI like <b>ChatGPT</b> and <b>Claude</b> is basically a computer you can talk to in plain English. It’s read a huge chunk of the internet, so it can answer questions, write stuff, and explain things — like a smart mate who never knocks off.'
            },
            {
              type: 'choice',
              q: 'What’s the best way to think about ChatGPT?',
              options: [
                'A search engine like Google',
                'A smart mate you chat to in plain English',
                'A robot that does the plumbing for you'
              ],
              answer: 1,
              explain: 'It chats back in plain English and writes things for you. It’s not just Google — and it definitely won’t crimp your PEX.'
            },
            {
              type: 'truefalse',
              q: 'AI can write a customer email, explain a building rule, and draft a quote — all in seconds.',
              isTrue: true,
              explain: 'Spot on. That office-type work is exactly what it’s quick at.'
            },
            {
              type: 'choice',
              q: 'Which of these is an AI chat app you can talk to?',
              options: ['Xero', 'ChatGPT', 'Trade Me'],
              answer: 1,
              explain: 'ChatGPT is the AI chat app. The others are great tools — just not the AI you have a yarn with.'
            },
            {
              type: 'truefalse',
              q: 'Out of the box, the AI already knows you, your mates, and all your job history.',
              isTrue: false,
              explain: 'Trap! By default it only knows what you type into the chat. Fresh chat = mostly a blank slate.'
            },
            {
              type: 'choice',
              q: 'Your apprentice asks “what can this AI thing actually do for me?” Best answer?',
              options: [
                'Write emails, explain things, and draft quotes',
                'Replace your hands on the tools',
                'Nothing useful for a tradie'
              ],
              answer: 0,
              explain: 'It’s a hand with the wordy/office jobs — emails, explaining, drafting. The tools are still yours.'
            }
          ]
        },

        /* ---- Lesson 2 ---- */
        {
          id: 'u1l2',
          title: 'Your first chat',
          icon: '💬',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'It’s just texting',
              body: 'Using AI is like texting a mate. You open the app or website, type your question, hit send, and read what comes back. Don’t like the answer? Just tell it what to fix and it’ll have another crack.'
            },
            {
              type: 'order',
              q: 'Put the steps in order to get your first answer:',
              steps: [
                'Open ChatGPT (app or website)',
                'Type your question in plain English',
                'Hit send',
                'Read the answer',
                'Ask a follow-up if it’s not quite right'
              ],
              explain: 'That’s the whole loop. Type, send, read, tweak. Easy as.'
            },
            {
              type: 'truefalse',
              q: 'You need special computer code or commands to talk to AI.',
              isTrue: false,
              explain: 'Trap! Just type like you’d talk. “Write me a text to a customer” works perfectly.'
            },
            {
              type: 'choice',
              q: 'The answer’s close but too formal and long. What do you do?',
              options: [
                'Start a brand new chat and give up',
                'Reply: “Make it shorter and more casual”',
                'Accept it as-is, nothing you can do'
              ],
              answer: 1,
              explain: 'Just tell it what to change. AI is happy to redo it 100 times — no eye-rolls.'
            },
            {
              type: 'choice',
              q: 'Which is a perfectly good thing to type into AI?',
              options: [
                'EXECUTE.QUERY( customer_email )',
                'Write a friendly text telling my customer I’m running 20 min late',
                'You must use exact keywords only'
              ],
              answer: 1,
              explain: 'Plain English, like talking to a person. That’s all it needs.'
            },
            {
              type: 'truefalse',
              q: 'You can keep the conversation going — ask follow-ups and it remembers what you said earlier in that chat.',
              isTrue: true,
              explain: 'Yep. Within the same chat it follows the thread, so you can refine as you go.'
            }
          ]
        },

        /* ---- Lesson 3 ---- */
        {
          id: 'u1l3',
          title: 'Prompts 101',
          icon: '🎯',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'A “prompt” is just your instruction',
              body: 'The thing you type is called a <b>prompt</b>. The trick: be specific and give it context. A good prompt usually has three bits — <b>who/what the situation is</b>, <b>the job you want done</b>, and <b>how you want it back</b> (short, friendly, a list, etc).'
            },
            {
              type: 'choice',
              q: 'Which prompt will get you a better result?',
              options: [
                'Write an email',
                'Write a short, friendly email to a customer saying the parts are delayed a week, and apologise'
              ],
              answer: 1,
              explain: 'The second one gives context (delayed parts), the job (email), and the style (short, friendly). Specific = better.'
            },
            {
              type: 'match',
              q: 'Match each part of a good prompt to an example:',
              pairs: [
                ['Context', 'I’m a plumber, customer’s hot water’s out'],
                ['The job', 'Write a text to book them in tomorrow'],
                ['How you want it', 'Keep it short and friendly']
              ],
              explain: 'Context + the job + how you want it back. Nail those three and the answer’s usually bang on.'
            },
            {
              type: 'truefalse',
              q: 'Telling the AI “you’re a plumber writing to a customer” helps it give a better answer.',
              isTrue: true,
              explain: 'Giving it a role and context sharpens the answer every time.'
            },
            {
              type: 'choice',
              q: 'You want a 3-line quote follow-up text. Best prompt?',
              options: [
                'Quote stuff',
                'Write a polite 3-line text following up on the quote I sent last week, asking if they’d like to go ahead',
                'Follow up'
              ],
              answer: 1,
              explain: 'It states the job, the length (3 lines), the tone (polite), and the goal. That’s a strong prompt.'
            },
            {
              type: 'order',
              q: 'Order these from worst to best prompt:',
              steps: [
                'Email',
                'Write an email to a customer',
                'Write a short friendly email to a customer about a delayed job, and apologise'
              ],
              explain: 'Each step adds context and detail. More detail (within reason) = better answer.'
            }
          ]
        },

        /* ---- Lesson 4 ---- */
        {
          id: 'u1l4',
          title: 'Good vs bad prompts',
          icon: '🔧',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Time to sharpen up',
              body: 'Now you know the three bits, let’s get an eye for it. Spotting a strong prompt is half the battle — same as eyeballing a dodgy fitting before it leaks.'
            },
            {
              type: 'choice',
              q: 'A customer left a grumpy review. You want a calm reply. Best prompt?',
              options: [
                'Reply to review',
                'Write a calm, professional reply to this 1-star review, apologising and offering to make it right: “[paste review]”',
                'Tell them they’re wrong'
              ],
              answer: 1,
              explain: 'It sets the tone (calm, professional), the goal (apologise + fix), and gives the actual review to work from.'
            },
            {
              type: 'truefalse',
              q: 'Pasting the actual details (the review, the job, the numbers) into your prompt gives a better answer.',
              isTrue: true,
              explain: 'AI can only work with what you give it. More real detail in = more useful out.'
            },
            {
              type: 'choice',
              q: 'Which prompt is missing the “how you want it back” part?',
              options: [
                'Write a short text reminding the customer about tomorrow’s 9am job',
                'Write something for the customer about tomorrow',
                'Write a friendly 2-line reminder text for tomorrow’s 9am job'
              ],
              answer: 1,
              explain: 'Option 2 is vague — no length, no tone, no specifics. The others tell it exactly how you want it.'
            },
            {
              type: 'match',
              q: 'Match the weak prompt to its fix:',
              pairs: [
                ['“Write a quote”', 'Add what the job is and the price'],
                ['“Make it good”', 'Say the tone you want — friendly, formal'],
                ['“Email the customer”', 'Add why you’re emailing them']
              ],
              explain: 'Every weak prompt gets better by adding context and saying how you want it back.'
            },
            {
              type: 'truefalse',
              q: 'If the first answer isn’t great, your prompt was probably too vague.',
              isTrue: true,
              explain: 'Usually, yeah. Add detail and ask again — the answer follows your prompt.'
            }
          ]
        },

        /* ---- Lesson 5 ---- */
        {
          id: 'u1l5',
          title: 'Don’t get burned',
          icon: '🦺',
          xp: 30,
          cards: [
            {
              type: 'info',
              title: 'AI is a power tool, not a boss',
              body: 'AI is mega useful but it can be <b>confidently wrong</b> — it sometimes makes stuff up (called a “hallucination”). And don’t paste private info into it. You’re still the tradie who signs off. Treat it like a keen apprentice: great help, but you check the work.'
            },
            {
              type: 'truefalse',
              q: 'AI can state a wrong fact while sounding 100% sure of itself.',
              isTrue: true,
              explain: 'Yep — that’s a hallucination. For codes, prices, and legal stuff, always double-check.'
            },
            {
              type: 'choice',
              q: 'AI gives you an exact NZ Building Code clause number for a quote. What now?',
              options: [
                'Copy it straight to the customer — she’ll be right',
                'Double-check it against the actual code before you rely on it',
                'Never use AI again'
              ],
              answer: 1,
              explain: 'Use it as a starting point, then verify anything official. Trust but check.'
            },
            {
              type: 'truefalse',
              q: 'It’s fine to paste a customer’s credit card or bank details into a public AI chat.',
              isTrue: false,
              explain: 'Big trap! Never paste private info — card numbers, passwords, anything sensitive. Keep that out of it.'
            },
            {
              type: 'choice',
              q: 'Which job is AI safest and most useful for?',
              options: [
                'Signing off a gas certification for you',
                'Drafting a friendly email you’ll read before sending',
                'Storing your customers’ bank logins'
              ],
              answer: 1,
              explain: 'Drafting things you review = perfect. Anything official or private = your call, not the AI’s.'
            },
            {
              type: 'match',
              q: 'Match the situation to the smart move:',
              pairs: [
                ['AI quotes a price', 'Check it against real supplier prices'],
                ['AI writes an email', 'Read it, tweak, then send'],
                ['AI gives a code clause', 'Verify against the official code']
              ],
              explain: 'Same rule every time: let AI do the first draft, you do the final check.'
            },
            {
              type: 'info',
              title: 'You’ve finished AI Basics! 🎉',
              body: 'You now get what AI is, how to chat to it, how to write a solid prompt, and how to stay safe. That’s the foundation. Next units put it to work on your <b>business</b>, <b>on the tools</b>, and <b>winning jobs</b>.'
            }
          ]
        }
      ]
    },

    /* ===================== UNIT: AI MEDIUM ===================== */
    {
      id: 'umed',
      title: 'AI Medium',
      subtitle: 'Level up — get better answers',
      color: '#F4A100',
      icon: '📈',
      locked: false,
      lessons: [
        {
          id: 'umed1', title: 'Ready to level up', icon: '📈', xp: 20,
          cards: [
            { type: 'info', title: 'Ready to level up?', body: 'You’ve got the basics. Now a few tricks that take you from “okay” answers to “bloody spot on” — the difference between rushing a job and doing it proper.' },
            { type: 'choice', q: 'What turns okay AI answers into great ones?', options: ['Giving it more context and direction', 'Asking louder', 'Pure luck'], answer: 0, explain: 'The more you steer it, the better it lands. Direction beats hope.' },
            { type: 'truefalse', q: 'Small changes to how you ask can make a big difference to what you get back.', isTrue: true, explain: 'Spot on — how you ask shapes what you get.' }
          ]
        },
        {
          id: 'umed2', title: 'Give it a role', icon: '🎭', xp: 25,
          cards: [
            { type: 'info', title: 'Tell it who to be', body: 'Kick off your prompt by giving AI a role: “You’re an experienced NZ plumber writing to a customer…”. Putting it in the right hat instantly sharpens the answer.' },
            { type: 'choice', q: 'Which gets a sharper answer?', options: ['“You’re an experienced sparky. Explain this fault simply to a customer.”', '“Explain this.”'], answer: 0, explain: 'The role + the job + who it’s for = a much better answer.' },
            { type: 'truefalse', q: 'Telling AI to “act as a builder” helps it answer in the right way.', isTrue: true, explain: 'Give it a hat to wear and it talks the part.' },
            { type: 'choice', q: 'You want a reply that sounds like a seasoned tradie. Start with…', options: ['“You’re a seasoned tradie…”', '“Hello computer”', 'Nothing in particular'], answer: 0, explain: 'Set the role first, then ask. Works a treat.' }
          ]
        },
        {
          id: 'umed3', title: 'Show, don’t tell', icon: '🧩', xp: 25,
          cards: [
            { type: 'info', title: 'Give it an example', body: 'Want it to match your style? Paste an example. “Here’s a quote I sent last time — write the new one the same way.” AI copies the pattern. Showing beats explaining.' },
            { type: 'truefalse', q: 'Pasting an example of how you like things helps AI match your style.', isTrue: true, explain: 'Give it a sample to copy and it nails your style.' },
            { type: 'choice', q: 'Best way to get AI to write in your style?', options: ['Show it an example you’ve done before', 'Hope it guesses right', 'Use big fancy words'], answer: 0, explain: 'One real example does more than a paragraph of instructions.' }
          ]
        },
        {
          id: 'umed4', title: 'Feed it your stuff', icon: '📎', xp: 25,
          cards: [
            { type: 'info', title: 'Give it the goods', body: 'AI can only work with what it’s got. Upload the actual PDF, paste the real numbers, attach the photo. The more of YOUR real info you give it, the more the answer fits your job — not some generic one.' },
            { type: 'truefalse', q: 'Uploading the real spec/photo/numbers beats just describing them.', isTrue: true, explain: 'Real detail in = useful answer out.' },
            { type: 'choice', q: 'AI’s answer is too generic. Likely fix?', options: ['Give it your real details and files', 'Ask the exact same thing again', 'Give up on it'], answer: 0, explain: 'Generic in, generic out. Feed it the real goods.' }
          ]
        },
        {
          id: 'umed5', title: 'Don’t take answer #1', icon: '🔁', xp: 25,
          cards: [
            { type: 'info', title: 'First go isn’t the final go', body: 'The first answer’s a draft, not gospel. Push back: “shorter”, “more formal”, “give me 3 options”, “you forgot the GST”. AI will happily redo it till it’s right — no sulking.' },
            { type: 'choice', q: 'First answer’s close but too long. Best move?', options: ['Reply “make it shorter”', 'Just accept it', 'Scrap it and start over'], answer: 0, explain: 'Tweak it with a quick follow-up. Don’t start from scratch.' },
            { type: 'truefalse', q: 'Asking for “3 options” is a good way to get a better result.', isTrue: true, explain: 'Pick the best or mix them. Options beat one-and-done.' }
          ]
        },
        {
          id: 'umed6', title: 'Save your winners', icon: '💾', xp: 30,
          cards: [
            { type: 'info', title: 'Keep what works', body: 'Found a prompt that nails your quotes? Save it and reuse it. And always sense-check the important stuff — prices, codes, dates. AI does the heavy lifting; you sign it off.' },
            { type: 'truefalse', q: 'Reusing a prompt that worked well saves time on jobs you do often.', isTrue: true, explain: 'Build up a little kit of go-to prompts.' },
            { type: 'choice', q: 'AI gives you a price and a code clause for a customer. Before sending…', options: ['Sense-check the price and clause', 'Fire it off as-is', 'Never check anything'], answer: 0, explain: 'Trust but verify — same as checking a fitting before you wall it up.' },
            { type: 'info', title: 'You’ve levelled up! 📈', body: 'Roles, examples, your real info, pushing back, and saving winners. That’s the medium tier sorted. Ready for the pro moves? Have a crack at <b>AI High Level</b>.' }
          ]
        }
      ]
    },

    /* ===================== UNIT: AI HIGH LEVEL ===================== */
    {
      id: 'uhigh',
      title: 'AI High Level',
      subtitle: 'Pro moves & automations',
      color: '#34495E',
      icon: '🚀',
      locked: false,
      lessons: [
        {
          id: 'uhigh1', title: 'Going pro', icon: '🚀', xp: 25,
          cards: [
            { type: 'info', title: 'Welcome to the deep end', body: 'This is where AI stops being a chat and starts being a worker — custom assistants, connected apps, and jobs that run themselves. Don’t stress if it’s a lot; you don’t need all of it. Take what’s useful and leave the rest.' },
            { type: 'choice', q: 'What’s the theme of “high level” AI?', options: ['AI that does whole jobs, not just answers', 'Just bigger words', 'Only being expensive'], answer: 0, explain: 'Pro-level = AI doing real work, end to end.' },
            { type: 'truefalse', q: 'You don’t have to use every advanced feature — pick what helps your business.', isTrue: true, explain: 'Use what saves you time. Ignore the rest.' }
          ]
        },
        {
          id: 'uhigh2', title: 'Build your own assistant', icon: '🛠️', xp: 30,
          cards: [
            { type: 'info', title: 'Make it yours', body: 'Instead of explaining yourself each time, set up your own assistant: a <b>Custom GPT</b> (ChatGPT) or a <b>Project / Skill</b> (Claude) loaded with your rates, style and rules. Now it’s a mini-staffer that already knows your business.' },
            { type: 'choice', q: 'A Custom GPT or Claude Project loaded with your info is like…', options: ['A mini-staffer that knows your business', 'A brand new ute', 'A fax machine'], answer: 0, explain: 'Set it up once; it remembers your way of doing things forever.' },
            { type: 'truefalse', q: 'Your own assistant means less re-explaining and more consistent results.', isTrue: true, explain: 'Consistency without the repetition — that’s the win.' }
          ]
        },
        {
          id: 'uhigh3', title: 'Connect your apps', icon: '🔌', xp: 30,
          cards: [
            { type: 'info', title: 'Hook it to your tools', body: 'Connect AI to the apps you run — Xero, Gmail, Drive, your calendar. Now it pulls your real numbers, drafts from real emails, and works with real files. This is where it goes from “clever” to “actually saves me hours a week”.' },
            { type: 'truefalse', q: 'Connecting AI to Xero/Gmail lets it work with your real business data.', isTrue: true, explain: 'Real data in the loop = real time saved.' },
            { type: 'choice', q: 'Why connect your apps to AI?', options: ['So it works with your real data, not made-up stuff', 'Just for decoration', 'No reason really'], answer: 0, explain: 'It can only help with what it can reach. Plug it in.' }
          ]
        },
        {
          id: 'uhigh4', title: 'Loops & automations', icon: '♾️', xp: 30,
          cards: [
            { type: 'info', title: 'Set it and forget it', body: 'An <b>automation</b> is a job AI runs by itself when something triggers it. A <b>loop</b> is it doing that job again and again. Example: every invoice that hits 7 days overdue → AI drafts a polite chaser. Set up once, runs forever.' },
            { type: 'choice', q: 'What’s an automation?', options: ['A job AI runs by itself on a trigger', 'A hand tool', 'A type of loan'], answer: 0, explain: 'Trigger happens → AI does the job. No you required.' },
            { type: 'truefalse', q: 'Good use of a loop: automatically chase every overdue invoice the same way.', isTrue: true, explain: 'Repeating jobs are exactly what loops are for.' },
            { type: 'choice', q: '“Set it up once, it runs forever” best describes…', options: ['An automation / loop', 'A single chat', 'A phone call'], answer: 0, explain: 'That’s the magic of automating the boring repeat jobs.' }
          ]
        },
        {
          id: 'uhigh5', title: 'Agents & harnesses', icon: '🤖', xp: 35,
          cards: [
            { type: 'info', title: 'Agents that do the whole job', body: 'An <b>agent</b> is AI that doesn’t just answer — it works through a job step by step, using tools and checking itself, till it’s done. The <b>harness</b> is the setup around it that makes that possible: giving it tools, letting it loop, and keeping it on track. Think foreman running an apprentice, not just a chat.' },
            { type: 'choice', q: 'What’s an AI “agent”?', options: ['AI that carries out a whole multi-step job, using tools', 'A travel agent', 'A single one-off answer'], answer: 0, explain: 'An agent works the job, not just talks about it.' },
            { type: 'truefalse', q: 'An “agent harness” is the setup that lets an agent use tools, loop, and check its own work.', isTrue: true, explain: 'The harness is the scaffolding that turns a chatbot into a worker.' },
            { type: 'truefalse', q: 'An agent is just a one-line answer with no tools.', isTrue: false, explain: 'Trap! An agent uses tools and works through steps — that’s the whole point.' }
          ]
        },
        {
          id: 'uhigh6', title: 'Build your own tools', icon: '🧰', xp: 35,
          cards: [
            { type: 'info', title: 'Build your own gear', body: 'You can get AI to build you actual little tools — a job-cost calculator, a checklist app, a simple website — no coding needed (Claude calls these Artifacts). And know your models: heavier ones for hard thinking, quick ones for simple stuff.' },
            { type: 'truefalse', q: 'You can get AI to build a working cost calculator without writing any code.', isTrue: true, explain: 'Describe it, it builds it. No code, no dramas.' },
            { type: 'choice', q: 'For a quick, simple question, the smart move is…', options: ['Use a fast, cheap model', 'Always the biggest model', 'Don’t ask at all'], answer: 0, explain: 'Match the model to the job — big guns for hard problems, quick ones for easy asks.' },
            { type: 'info', title: 'You’re flying now! 🚀', body: 'Custom assistants, connected apps, automations, agents, and your own tools — that’s pro-level AI. Keep an eye on the <b>Ideas</b> tab and request the deep-dives you want next.' }
          ]
        }
      ]
    },

    /* ===================== UNIT: MEET CLAUDE ===================== */
    {
      id: 'ucl',
      title: 'Meet Claude',
      subtitle: 'Anthropic’s AI, feature by feature',
      color: '#D97757',
      icon: '🧡',
      locked: false,
      lessons: [
        /* ---- Claude L1 ---- */
        {
          id: 'ucl1',
          title: 'Meet Claude',
          icon: '🧡',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'Say hello to Claude',
              body: 'Claude is an AI made by a mob called <b>Anthropic</b>. Same deal as ChatGPT — you chat in plain English — but Claude’s a gun at writing, thinking things through, and chewing through long documents (contracts, specs, big council PDFs). Grab it at <b>claude.ai</b> or the app.'
            },
            { type: 'choice', q: 'Who makes Claude?', options: ['Google', 'Anthropic', 'Bunnings'], answer: 1, explain: 'Anthropic. (ChatGPT’s the OpenAI one — different mob, same kind of tool.)' },
            { type: 'truefalse', q: 'Claude is a solid pick when you’ve got a long document to make sense of, like a 40-page spec.', isTrue: true, explain: 'Yep — long, wordy stuff is right in Claude’s wheelhouse.' },
            { type: 'choice', q: 'Where do you get Claude?', options: ['claude.ai or the Claude app', 'At the trade counter', 'It comes with your ute'], answer: 0, explain: 'claude.ai or the app on your phone. Free to start.' },
            { type: 'truefalse', q: 'Claude and ChatGPT are the exact same app.', isTrue: false, explain: 'Trap! Different companies, both great. Plenty of tradies keep both in the toolbox.' },
            {
              type: 'info',
              title: 'Claude’s got a big toolbox',
              body: 'The headline features: <b>Projects</b> (remembers your stuff), <b>Artifacts</b> (builds things), <b>Cowork</b> (does jobs), <b>Connectors</b> (plug in your apps), <b>Skills</b> (your way) — plus it can read photos, chew through files, search the web and talk. We’ll hit the lot, no jargon.'
            }
          ]
        },
        /* ---- Claude L2: Projects ---- */
        {
          id: 'ucl2',
          title: 'Projects',
          icon: '📁',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Projects = Claude remembers your gear',
              body: 'A <b>Project</b> is like a job folder. You load in your business details once — your rates, your tone, your patch, even old quotes — and every chat inside that Project already knows it. No more re-explaining yourself every single time.'
            },
            { type: 'choice', q: 'What’s a Claude Project, best described?', options: ['A folder where Claude remembers your stuff', 'A brand of fitting', 'A type of invoice'], answer: 0, explain: 'A saved workspace that remembers your info so you don’t repeat yourself.' },
            { type: 'truefalse', q: 'With a Project set up for your business, Claude already knows your pricing and style every time you start a new chat in it.', isTrue: true, explain: 'That’s the whole point — load it once, it’s there every time.' },
            { type: 'choice', q: 'You quote weekly and keep typing the same business info. The fix?', options: ['Make a Project with your details', 'Type faster', 'Give up'], answer: 0, explain: 'A Project holds it for you. Set up once, reuse forever.' },
            {
              type: 'match',
              q: 'What goes in a “My Business” Project:',
              pairs: [
                ['Your call-out rate', 'So quotes are priced right'],
                ['Your tone', 'So emails sound like you'],
                ['Your service area', 'So it knows where you work']
              ],
              explain: 'Load it once, Claude leans on it every chat in that Project.'
            },
            { type: 'truefalse', q: 'You can have separate Projects for separate jobs — say one for quoting, one for social media.', isTrue: true, explain: 'Yep — keeps each one focused with just the right info.' }
          ]
        },
        /* ---- Claude L3: Artifacts ---- */
        {
          id: 'ucl3',
          title: 'Artifacts',
          icon: '🛠️',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Artifacts = Claude builds the actual thing',
              body: 'Ask Claude to make something — a quote, a checklist, a price calculator, even a little website — and it opens a panel beside the chat and builds it there, <b>live</b>. You can tweak it, copy it, or download it. You get a finished thing, not just words.'
            },
            { type: 'choice', q: 'What’s an Artifact?', options: ['A live thing Claude builds in a side panel', 'An old tool in a museum', 'A type of fastener'], answer: 0, explain: 'It’s the actual doc/tool/app Claude builds, shown live beside your chat.' },
            { type: 'truefalse', q: 'If Claude builds you a job checklist as an Artifact, you can edit it and download it.', isTrue: true, explain: 'Exactly — tweak it, copy it, download it. It’s yours.' },
            { type: 'choice', q: 'You want a “what’ll my bathroom reno cost” calculator for your website. That comes back as…', options: ['An Artifact', 'A text message', 'A fax'], answer: 0, explain: 'Calculators, web pages, charts — all Artifacts.' },
            {
              type: 'order',
              q: 'How using an Artifact usually goes:',
              steps: [
                'Ask Claude to build the thing',
                'It appears live in a side panel',
                'You ask for tweaks',
                'You copy or download the finished version'
              ],
              explain: 'Describe it, watch it build, refine, take it away.'
            },
            { type: 'truefalse', q: 'Artifacts are only ever plain text.', isTrue: false, explain: 'Trap! They can be interactive — calculators, web pages, charts, the lot.' }
          ]
        },
        /* ---- Claude L4: Cowork ---- */
        {
          id: 'ucl4',
          title: 'Cowork',
          icon: '🤝',
          xp: 30,
          cards: [
            {
              type: 'info',
              title: 'Cowork = Claude rolls its sleeves up',
              body: 'Chat is for <b>asking</b>. Cowork is for <b>doing</b>. In Cowork, Claude works through a whole job — goes through your files, builds a spreadsheet, or uses your connected apps (Gmail, Xero, Google Drive) to get it done end to end. Less “answer my question”, more “sort this out for me”.'
            },
            { type: 'choice', q: 'Normal chat vs Cowork — the difference?', options: ['Cowork actually does multi-step jobs, not just answers', 'Cowork is just a louder chat', 'No difference'], answer: 0, explain: 'Cowork carries out the job. Chat just talks about it.' },
            { type: 'truefalse', q: 'In Cowork, Claude can use apps you’ve connected — like pulling figures from Xero or drafting emails in Gmail.', isTrue: true, explain: 'True. Those hook-ups are called Connectors — they let Claude reach your real tools.' },
            { type: 'choice', q: 'Which job suits Cowork best?', options: ['“Go through these 20 invoices and build me a summary spreadsheet”', '“What’s 10% of 500?”', '“Define plumbing”'], answer: 0, explain: 'Big, multi-step jobs are Cowork territory. Quick questions = just chat.' },
            {
              type: 'match',
              q: 'Match the connected app to what Claude can do:',
              pairs: [
                ['Xero', 'Pull your numbers'],
                ['Gmail', 'Draft & sort emails'],
                ['Drive', 'Read your files']
              ],
              explain: 'These are Connectors — Cowork uses them to do real work for you.'
            },
            { type: 'truefalse', q: 'Cowork is best for tiny one-line questions.', isTrue: false, explain: 'Trap! Quick questions — plain chat’s faster. Save Cowork for the bigger jobs.' }
          ]
        },
        /* ---- Claude L5: Connectors ---- */
        {
          id: 'ucl5conn', title: 'Connectors', icon: '🔌', xp: 25,
          cards: [
            { type: 'info', title: 'Connectors = plug in your apps', body: 'A <b>Connector</b> hooks Claude up to an app you already use — Gmail, Xero, Google Drive, Slack — so it can work with your real stuff. Connect once, and Claude can grab a file from Drive or draft an email in Gmail without you copy-pasting.' },
            { type: 'choice', q: 'What does a Connector do?', options: ['Links Claude to an app you use (Gmail, Xero…)', 'Charges your drill', 'Joins two pipes'], answer: 0, explain: 'It plugs Claude into your real tools.' },
            { type: 'match', q: 'Match the app to what Claude can do with it:', pairs: [['Gmail', 'Draft & send emails'], ['Xero', 'Work with your invoices'], ['Drive', 'Open your files']], explain: 'Connect it once, then Claude works with the real thing.' },
            { type: 'truefalse', q: 'Once connected, Claude can pull info from your apps so you don’t copy-paste it in.', isTrue: true, explain: 'Saves the copy-paste shuffle every time.' },
            { type: 'truefalse', q: 'You must connect every app or Claude won’t work at all.', isTrue: false, explain: 'Trap! Connectors are optional extras. Plain Claude works fine; they just plug in your real tools.' }
          ]
        },
        /* ---- Claude L6: Skills ---- */
        {
          id: 'ucl6skills', title: 'Skills', icon: '🎓', xp: 25,
          cards: [
            { type: 'info', title: 'Skills = teach it your way', body: 'A <b>Skill</b> teaches Claude the way YOU do a job — like “build my quotes the way I like them” or “write my job updates in my style”. Set it up once and Claude nails it your way every time, no re-explaining.' },
            { type: 'choice', q: 'A Skill is…', options: ['A saved how-to that teaches Claude your way of doing a job', 'A TAFE course', 'A new app to download'], answer: 0, explain: 'It bakes in your method so you don’t repeat it.' },
            { type: 'truefalse', q: 'With a quoting Skill, Claude builds quotes your way without you explaining the steps each time.', isTrue: true, explain: 'Your process, on tap.' },
            { type: 'choice', q: 'You do job reports the same way every week. Best fix?', options: ['Make a Skill for it', 'Retype the steps each time', 'Stop doing reports'], answer: 0, explain: 'Repeatable job done your way = perfect for a Skill.' }
          ]
        },
        /* ---- Claude L7: Eyes, ears & files ---- */
        {
          id: 'ucl7eyes', title: 'Eyes, ears & files', icon: '👀', xp: 25,
          cards: [
            { type: 'info', title: 'Eyes, ears and a good memory', body: 'Claude does more than read your text. Show it a <b>photo</b> (a part, a fault, a handwritten note) and it’ll read it. <b>Upload a file</b> — a PDF spec, a spreadsheet, a council doc — and it’ll go through it. On the app you can even <b>talk</b> to it.' },
            { type: 'truefalse', q: 'You can upload a 50-page PDF spec and have Claude pull out the key points.', isTrue: true, explain: 'Long docs are no drama for Claude.' },
            { type: 'choice', q: 'Found a mystery part on site. Quickest way to ask Claude?', options: ['Snap a photo and ask what it is', 'Describe it for 10 minutes', 'Reckon it can’t be done'], answer: 0, explain: 'Show it — a photo beats a thousand words.' },
            { type: 'match', q: 'Match the input to what it’s for:', pairs: [['Photo', 'Show it a part or note'], ['PDF / sheet', 'Have it read your docs'], ['Voice', 'Talk to it on the app']], explain: 'Type it, show it, or say it — Claude takes the lot.' }
          ]
        },
        /* ---- Claude L8: More power ---- */
        {
          id: 'ucl8power', title: 'More power', icon: '⚡', xp: 25,
          cards: [
            { type: 'info', title: 'A few more party tricks', body: 'Claude can <b>search the web</b> for up-to-date info, handle <b>huge documents</b> in one go, and do <b>deep thinking</b> on tricky problems (a research / think-harder mode). There’s even <b>Claude Code</b> for the techy folks who want it building software.' },
            { type: 'truefalse', q: 'Claude can look things up on the web for current info, like today’s rules or prices.', isTrue: true, explain: 'Web search means it’s not stuck with old info.' },
            { type: 'choice', q: 'Got a gnarly problem with lots of moving parts. What helps?', options: ['Ask Claude to think it through deeply (research mode)', 'Nothing, you’re stuck', 'Turn it off and on'], answer: 0, explain: 'Deep-thinking mode is built for the hard, tangled ones.' },
            { type: 'truefalse', q: 'Claude can only handle a paragraph or two at a time.', isTrue: false, explain: 'Trap! It handles big, long documents in one hit — whole specs, long threads, the lot.' }
          ]
        },
        /* ---- Claude L9: recap ---- */
        {
          id: 'ucl5',
          title: 'Which bit, when?',
          icon: '🧭',
          xp: 30,
          cards: [
            { type: 'info', title: 'Right tool, right job', body: 'Quick recap so you know what to reach for with Claude.' },
            {
              type: 'match',
              q: 'Match the job to the Claude feature:',
              pairs: [
                ['Quick question', 'Just chat'],
                ['Stop re-explaining your biz', 'A Project'],
                ['Get a finished doc/tool', 'An Artifact'],
                ['Do a big multi-step job', 'Cowork']
              ],
              explain: 'Chat asks, Projects remember, Artifacts build, Cowork does.'
            },
            { type: 'choice', q: 'You want Claude to remember your rates for every quote chat. Use…', options: ['A Project', 'An Artifact', 'Voice'], answer: 0, explain: 'A Project holds your info so every chat starts knowing it.' },
            { type: 'choice', q: 'You want Claude to build a downloadable site-safety checklist. Use…', options: ['An Artifact', 'A Project', 'Cowork'], answer: 0, explain: 'A finished, downloadable thing = an Artifact.' },
            { type: 'truefalse', q: '“Skills” are like teaching Claude how YOU do a job, so it does it your way every time.', isTrue: true, explain: 'Spot on — a Skill is a saved how-to (e.g. “build my quotes my way”). Handy once you’re rolling.' },
            { type: 'info', title: 'You know Claude now! 🧡', body: 'Projects remember, Artifacts build, Cowork does the work, Connectors plug in your apps, Skills teach it your way. Next up — <b>ChatGPT</b>.' }
          ]
        }
      ]
    },

    /* ===================== UNIT: MEET CHATGPT ===================== */
    {
      id: 'ugp',
      title: 'Meet ChatGPT',
      subtitle: 'OpenAI’s AI, feature by feature',
      color: '#10A37F',
      icon: '💚',
      locked: false,
      lessons: [
        /* ---- ChatGPT L1 ---- */
        {
          id: 'ugp1',
          title: 'Meet ChatGPT',
          icon: '💚',
          xp: 20,
          cards: [
            {
              type: 'info',
              title: 'Say hello to ChatGPT',
              body: 'ChatGPT is the AI from a mob called <b>OpenAI</b> — the one that kicked off the whole craze. A cracking all-rounder: writing, answers, images, and a brilliant voice mode. There’s a free version and a paid one. Get it at <b>chatgpt.com</b> or the app.'
            },
            { type: 'choice', q: 'Who makes ChatGPT?', options: ['OpenAI', 'Anthropic', 'Telstra'], answer: 0, explain: 'OpenAI. (Claude’s the Anthropic one.)' },
            { type: 'truefalse', q: 'There’s a free version of ChatGPT you can start on.', isTrue: true, explain: 'Yep. Paid unlocks more, but free’s plenty to learn on.' },
            { type: 'choice', q: 'ChatGPT is best described as…', options: ['A great all-rounder you chat, talk and share photos with', 'A power tool', 'A spreadsheet'], answer: 0, explain: 'Jack of all trades — type, talk, or show it a photo.' },
            {
              type: 'info',
              title: 'What’s under the bonnet',
              body: 'ChatGPT can <b>talk out loud</b>, <b>see photos</b>, <b>make images</b>, build docs beside you, crunch spreadsheets, <b>search the web</b>, <b>remember</b> your details, and even go off and <b>do whole tasks</b>. The next lessons walk through the big ones.'
            }
          ]
        },
        /* ---- ChatGPT L2: voice + vision + images ---- */
        {
          id: 'ugp2',
          title: 'Talk & snap',
          icon: '🎙️',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Hands-free and eyes-on',
              body: 'Two of ChatGPT’s best tricks on site: tap the <b>voice</b> button and just talk to it (gold when your hands are full or you’re driving), and tap the <b>camera</b> to show it a photo and ask about it. It can also <b>make images</b> for you — handy for marketing.'
            },
            { type: 'choice', q: 'Hands full on site but need to ask something. Best move?', options: ['Use voice mode and just talk', 'Stop and type with greasy hands', 'Wait till tomorrow'], answer: 0, explain: 'Voice mode is made for this — talk to it like a mate.' },
            { type: 'truefalse', q: 'You can snap a photo of a part or a fault and ask ChatGPT what it reckons.', isTrue: true, explain: 'That’s “vision” — show it, don’t just describe it. (Still check anything important yourself.)' },
            { type: 'choice', q: 'You want a logo-style pic for a Facebook post. ChatGPT can…', options: ['Generate an image for you', 'Only do words', 'Print it'], answer: 0, explain: 'It makes images from a description — good for quick marketing bits.' },
            {
              type: 'match',
              q: 'Match the trick to the job:',
              pairs: [
                ['Voice', 'Ask hands-free on site'],
                ['Camera', 'Show it a part or fault'],
                ['Image maker', 'Knock up a marketing pic']
              ],
              explain: 'Type, talk, or show — whatever suits the moment.'
            },
            { type: 'truefalse', q: 'ChatGPT can only read typed words — no talking, no photos.', isTrue: false, explain: 'Trap! It sees, hears and speaks now. Talk to it, show it stuff.' }
          ]
        },
        /* ---- ChatGPT L3: GPTs + Projects ---- */
        {
          id: 'ugp3',
          title: 'GPTs & Projects',
          icon: '🧰',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Mini-helpers and job folders',
              body: 'A <b>Custom GPT</b> is a mini-version of ChatGPT set up for one job — like a quoting helper or a marketing helper — and there’s a whole store of them. <b>Projects</b> are folders that keep related chats and files together, so a big job stays tidy.'
            },
            { type: 'choice', q: 'What’s a Custom GPT?', options: ['A mini ChatGPT set up for one specific job', 'A new phone', 'A type of bolt'], answer: 0, explain: 'A purpose-built helper — point it at one job and it’s ready.' },
            { type: 'truefalse', q: 'ChatGPT Projects let you keep all the chats and files for one big job in the one spot.', isTrue: true, explain: 'Keeps a reno or a tender from getting scattered everywhere.' },
            { type: 'choice', q: 'There’s a whole ___ of ready-made Custom GPTs you can grab.', options: ['store', 'shed', 'ute'], answer: 0, explain: 'The GPT Store — millions of them, made for all sorts of jobs.' },
            {
              type: 'match',
              q: 'Match it up:',
              pairs: [
                ['Custom GPT', 'A helper built for one job'],
                ['Project', 'A folder for one job’s chats + files']
              ],
              explain: 'GPTs do a job; Projects keep a job organised.'
            }
          ]
        },
        /* ---- ChatGPT L4: Canvas + files ---- */
        {
          id: 'ugp4',
          title: 'Canvas & files',
          icon: '📊',
          xp: 25,
          cards: [
            {
              type: 'info',
              title: 'Edit side-by-side & crunch files',
              body: '<b>Canvas</b> opens a document beside your chat so you can edit the wording together — great for quotes, letters, website copy. And you can <b>upload a file</b> — a spreadsheet, a PDF, a council doc — and ChatGPT will summarise it, pull the key bits, or crunch the numbers.'
            },
            { type: 'choice', q: 'What’s Canvas good for?', options: ['Editing a document side-by-side with ChatGPT', 'Painting the fence', 'Storing tools'], answer: 0, explain: 'A shared editor for quotes, letters, web copy — tidy it up together.' },
            { type: 'truefalse', q: 'You can upload a messy spreadsheet and ask ChatGPT to total it up or find the dearest items.', isTrue: true, explain: 'That’s the file/data smarts. Upload, then ask away.' },
            { type: 'choice', q: 'Got a 30-page PDF spec and no time. ChatGPT can…', options: ['Summarise it and pull the key points', 'Only if you retype it all', 'Nope, can’t'], answer: 0, explain: 'Upload it and ask for the guts of it. (Double-check anything critical.)' },
            {
              type: 'order',
              q: 'Using a file with ChatGPT:',
              steps: [
                'Upload the file',
                'Tell it what you want — summary, totals, key points',
                'Read what it gives back',
                'Double-check anything important'
              ],
              explain: 'Upload, ask, read, verify. Same as a keen apprentice — check the work.'
            }
          ]
        },
        /* ---- ChatGPT L5: more handy bits ---- */
        {
          id: 'ugp5more', title: 'More handy bits', icon: '🧠', xp: 25,
          cards: [
            { type: 'info', title: 'More handy bits', body: 'Beyond chatting, ChatGPT can <b>search the web</b> for current info, <b>remember</b> things about you between chats (your trade, your style), <b>crunch data</b> from a spreadsheet (totals, charts), and even <b>run jobs on a schedule</b> — like a Monday-morning summary.' },
            { type: 'truefalse', q: 'ChatGPT can remember your trade and style across chats so you don’t repeat it.', isTrue: true, explain: 'That’s “memory”. Handy — and you can turn it off or clear it anytime.' },
            { type: 'choice', q: 'Upload your job spreadsheet and ask for a total and a chart. ChatGPT…', options: ['Crunches the numbers and makes the chart', 'Can’t do maths', 'Just prints it'], answer: 0, explain: 'That’s data analysis — great for the numbers side.' },
            { type: 'truefalse', q: 'ChatGPT can look up current info on the web, not just old knowledge.', isTrue: true, explain: 'Web search keeps it up to date.' },
            { type: 'choice', q: 'Want a summary of your week every Friday. ChatGPT can…', options: ['Run it on a schedule (Tasks)', 'Only if you ask each time', 'Not at all'], answer: 0, explain: 'Scheduled Tasks do the recurring stuff for you.' }
          ]
        },
        /* ---- ChatGPT L6: agent mode ---- */
        {
          id: 'ugp6agent', title: 'Agent mode', icon: '🤖', xp: 25,
          cards: [
            { type: 'info', title: 'When ChatGPT goes and does it', body: 'ChatGPT has an <b>agent</b> side — give it a multi-step job and it’ll go off, work through it using tools, and come back with it done. There’s also <b>deep research</b>, where it digs through loads of sources and writes you a proper rundown.' },
            { type: 'choice', q: 'What’s “agent mode”?', options: ['ChatGPT carries out a multi-step task for you', 'A louder voice', 'A pricier phone plan'], answer: 0, explain: 'It does the job, not just describes it — like Claude’s Cowork.' },
            { type: 'truefalse', q: 'Deep research has ChatGPT dig through lots of sources and write you a proper summary.', isTrue: true, explain: 'Great for “tell me everything about X” jobs.' },
            { type: 'truefalse', q: 'Agent mode is best for a one-word question.', isTrue: false, explain: 'Trap! Quick Q’s = normal chat. Agent mode shines on bigger, do-it-for-me jobs.' }
          ]
        },
        /* ---- ChatGPT L7: recap ---- */
        {
          id: 'ugp5',
          title: 'Which bit, when?',
          icon: '🧭',
          xp: 30,
          cards: [
            { type: 'info', title: 'Right tool, right job', body: 'Quick recap so you know what to reach for with ChatGPT.' },
            {
              type: 'match',
              q: 'Match job to feature:',
              pairs: [
                ['Ask hands-free', 'Voice'],
                ['Show it a part', 'Camera'],
                ['Edit a quote together', 'Canvas'],
                ['Make sense of a big PDF', 'Upload the file']
              ],
              explain: 'Each trick has its moment — now you know which is which.'
            },
            { type: 'choice', q: 'Hands full on the tools, need an answer. Use…', options: ['Voice', 'Canvas', 'A Project'], answer: 0, explain: 'Voice — talk to it, no typing.' },
            { type: 'choice', q: 'Want to tidy the wording of a quote together. Use…', options: ['Canvas', 'Image maker', 'Voice'], answer: 0, explain: 'Canvas — edit the document side-by-side.' },
            { type: 'truefalse', q: 'ChatGPT can also do bigger “go and do it” agent jobs, not just answer questions.', isTrue: true, explain: 'Yep — it’s growing agent smarts that carry out multi-step tasks, a bit like Claude’s Cowork.' },
            { type: 'info', title: 'You’ve met both! 💚🧡', body: 'Claude and ChatGPT are both cracking — most tradies just use whichever they’ve got, or both. You now know the big features of each and when to reach for them. Get on the tools and have a play!' }
          ]
        }
      ]
    },

    /* ===================== UNIT 2 (teaser) ===================== */
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

    /* ===================== UNIT 3 (teaser) ===================== */
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

    /* ===================== UNIT 4 (teaser) ===================== */
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
