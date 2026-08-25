# Ask Spidey — Personal AI Learning Companion
## Block-Wise Build Plan for Claude Code

**Owner:** Debraj (non-coder, building with AI-assisted development)
**Learner:** Class 5, Social Science, expanding through Class 8
**Build tool:** Claude Code
**Working method:** One block per Claude Code chat, inside this same Project, so context and memory stay intact across the whole build.

---

## How to use this document

1. **One block = one new Claude Code chat**, inside this Project. Don't build two blocks in the same chat — the context gets muddy and Claude Code starts making decisions based on stale information.
2. At the **start** of each block's chat, paste the block's "Starting Brief" (in this doc) plus the **Handover Doc** from the previous block. That's all the new chat needs to pick up correctly.
3. I will give you Claude Code commands **one at a time**. You run each one, then paste the output back to me before I give you the next one. Don't run ahead — some commands depend on seeing the previous result first.
4. At the **end** of each block, before closing that Claude Code chat, ask Claude Code to write a **Handover Doc** (template at the bottom of this file). Save that output — you'll paste it into the next block's chat.
5. Come back to *this* chat (the planning chat) whenever you want to review scope, sanity-check a decision, or before starting a new block if you want a second opinion on the brief.

You do not need to understand the code. You need to: run the command, paste the output back, and tell me/Claude Code in plain English if something looks wrong (error message, blank screen, thing didn't happen). That's the whole job.

---

## Tech stack (decided, don't change mid-build)

| Layer | Choice |
|---|---|
| Frontend | Next.js + React + TypeScript |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication (parent/child roles) |
| Database | Cloud Firestore |
| File storage | Firebase/Google Cloud Storage (textbook images) |
| AI | Claude API — Sonnet 5 for content generation & grading, Haiku 4.5 for chat/classification, behind an internal provider layer (so you can swap models later without rewriting the app) |
| Hosting | Google Cloud Run |
| Scheduled jobs | Cloud Scheduler (daily parent reports) |
| Email | Resend |
| Source control | GitHub |
| Text-to-speech | Browser-native `speechSynthesis` — no API cost |

---

## Finalized v1 scope (what we agreed to build now)

**In v1:**
- Lesson player with micro-learning cards
- MCQs with explanations
- Tap-to-match activities (not drag-and-drop)
- Scenario-based branching activities
- TTS read-aloud (Spidey reads content)
- Ask Spidey — text-chat doubt clearance, context-aware
- Subject rail guards on Ask Spidey (multi-turn drift detection, in-character redirects, parent-visible logging)
- Gamification — streaks, XP, badges, mission framing
- Manual content pipeline — you write instructions + upload textbook photos, AI drafts a lesson, you approve before it reaches him
- Written-answer AI evaluation
- Rule-based adaptive mastery and revision queue
- Parent daily/weekly reports

**Deferred to Phase 2 (not v1):**
- Voice input (microphone) — you're the voice interface for now
- Rich multi-state companion animation (v1 ships with idle / correct / encouraging / celebration only)
- Automated no-human-in-the-loop textbook ingestion pipeline
- AI moot-court/debate simulation (this is a Class 11-12 feature, not Class 5)

---

## Block summary table

| Block | Name | Est. Hours | Depends on |
|---|---|---|---|
| 0 | Foundation | 6–10 | — |
| 1 | Authentication | 5–8 | 0 |
| 2 | Data layer (Firestore + security rules) | 10–14 | 0, 1 |
| 3 | Dashboard | 8–12 | 1, 2 |
| 4 | Lesson player + TTS | 10–14 | 2, 3 |
| 5 | Assessment & activity engine (MCQ, tap-to-match, branching) | 14–20 | 4 |
| 6 | Companion Engine (lean, 4 states) | 8–12 | 3 |
| 7 | Ask Spidey — context-aware chat core | 10–14 | 4, 6 |
| 8 | Ask Spidey — rail guards | 12–18 | 7 |
| 9 | Written-answer AI evaluation | 8–12 | 5 |
| 10 | Manual content pipeline (your instructions + photo upload → draft lesson) | 10–14 | 2, 5 |
| 11 | Adaptive progression (mastery, revision queue, badges) | 12–18 | 5, 9 |
| 12 | Parent intelligence (reports + dashboard) | 8–14 | 8, 9, 11 |
| 13 | Admin controls (your review/approve/regenerate screen) | 8–12 | 10 |
| 14 | Deployment & hardening | 14–20 | all above |

**Total: 145–210 hours.** This is slightly higher than the 135–175 range from our earlier conversation — the rail guard block (Block 8) is a real, separately-tested piece of work, not a quick add-on, and I've split it out honestly rather than folding it invisibly into Block 7.

---

## Block details

### Block 0 — Foundation
**Goal:** Empty but correctly structured project — the skeleton everything else attaches to.
**Non-technical acceptance test:** Claude Code can show you a blank web page running locally, and confirm a GitHub repository and a Google Cloud project exist.
**Handover must include:** repo URL, GCP project name, folder structure, any account/API-key setup steps you completed manually (names of keys, not the key values themselves).

### Block 1 — Authentication
**Goal:** You (parent) log in with Google Sign-In. There is no separate child login — your son uses the app under your session, and his profile is stored as data under your account, not as his own Auth identity.
**Decision log (final, not a placeholder):** Google Sign-In only — no email/password, no phone auth, to stay on the Firebase Spark (free) plan. Only the parent has a Firebase Auth identity. The child profile is a Firestore sub-record under the parent's UID. Child PIN/login, password reset flows, and role-based permissions are explicitly out of scope for v1.
**Non-technical acceptance test:** You can sign in with your Google account, stay signed in across a page reload/new session, reach a protected page that a signed-out visitor can't reach, and sign out.
**Handover must include:** confirmation that the child profile is a Firestore sub-record (not an Auth user), and how the protected-route wrapper works for future pages.

### Block 2 — Data layer
**Goal:** Firestore database structured to hold users, lessons, progress, mastery, companion settings, etc. Security rules so a child login can't read/write things it shouldn't.
**Non-technical acceptance test:** Claude Code can show you the Firestore console with the right collections created, and confirm (in plain English) what the security rules prevent.
**Handover must include:** full list of collections created, a plain-English summary of what each security rule blocks.

### Block 3 — Dashboard
**Goal:** The screen your son sees when he opens the app — mission of the day, streak, XP, continue button.
**Non-technical acceptance test:** Logging in as the child shows a dashboard with a mock mission and a streak counter that increments.
**Handover must include:** what's real data vs. placeholder data at this point.

### Block 4 — Lesson player + TTS
**Goal:** A lesson can actually be opened, read (by Spidey's voice), navigated card by card, and progress is saved if he closes the tab.
**Non-technical acceptance test:** You put in one sample lesson, open it as the child, hear it read aloud, close the tab mid-lesson, reopen — it resumes where he left off.
**Handover must include:** how a new lesson gets added at this stage (still manual, that's fine for now).

### Block 5 — Assessment & activity engine
**Goal:** MCQs, tap-to-match, and branching scenario activities all work as reusable types, not one-off code per activity.
**Non-technical acceptance test:** You can complete one of each activity type as the child, see it scored, and see an explanation after a wrong answer.
**Handover must include:** confirmation that all three types share the same underlying data structure (this matters for how easy it is to add a 4th type later).

### Block 6 — Companion Engine (lean)
**Goal:** Spidey has a visible presence with 4 states (idle, correct, encouraging, celebration) and dialogue templates.
**Motivational framing:** Spidey's encouragement language centers on small, honest daily improvement ("1% better than yesterday") rather than rank or comparison — tie every encouraging/celebration message back to *his own* last attempt, last score, or last streak, never to a hypothetical average or other person. This is the dialogue-layer expression of the same "beat your own record" principle from Block 11 — the two must stay consistent, so write both blocks' language with the same voice.
**Non-technical acceptance test:** Getting a question right/wrong/completing a mission visibly changes Spidey's state and message, not just a checkmark. Read 5-6 sample encouragement lines and confirm none of them reference rank, other students, or comparison — only his own progress.
**Handover must include:** where the persona/dialogue text lives, so you can edit tone later without touching code.

### Block 7 — Ask Spidey core
**Goal:** Your son can ask a question mid-lesson and get an answer that's aware of exactly what he's currently studying.
**Non-technical acceptance test:** Ask a question about the current lesson — the answer references the actual topic, not a generic answer. Ask the same question with the lesson closed — behavior should visibly differ (context matters).
**Handover must include:** what context is being sent with each question (class/subject/topic/lesson), confirmed in plain English.

### Block 8 — Ask Spidey rail guards
**Goal:** Off-topic questions get redirected in-character, tracked across multiple messages (not just single-message checks), and logged for you to see.
**Non-technical acceptance test:** You personally try to walk the chat off-topic gradually over 4-5 messages (this is the actual test — do it yourself before he ever touches it) and confirm it redirects before going fully off the rails. Confirm you can see the redirect log somewhere.
**Handover must include:** the exact redirect message tone (so you can approve it fits Spidey's character), and where the log lives.

### Block 9 — Written-answer AI evaluation
**Goal:** Written answers get scored with structured feedback, not just right/wrong.
**Non-technical acceptance test:** Submit a genuinely correct-but-differently-worded answer and a genuinely wrong one — confirm the feedback is fair and specific to each.
**Handover must include:** any cases where the grading felt off during your testing, flagged for follow-up.

### Block 10 — Manual content pipeline
**Goal:** You type instructions + upload a textbook photo → get a draft lesson back to review before it's published to him.
**Non-technical acceptance test:** Do this once, start to finish, with a real textbook page. Confirm you can edit/reject before it goes live.
**Handover must include:** how long the draft takes to generate, any quality issues you noticed.

### Block 11 — Adaptive progression
**Goal:** Weak topics get flagged and resurfaced for revision automatically; badges unlock; competition is against his own past performance, not fake peers.
**Decision log:** Considered and rejected simulated peer users (fake student profiles for competitive leaderboards) — deception risk to a child over a multi-year relationship outweighs any gamification benefit. Built instead: personal-best tracking (best streak, best XP week, fastest topic mastery), a visible mastery-over-time chart, and optional parent-vs-child challenge scores on the same content. No fabricated users, ever.
**"1% better every day" framing:** The mastery/progress data model should track small deltas explicitly (this week's score vs. last week's on the same topic, this attempt vs. last attempt), not just pass/fail or absolute XP — because Spidey can only credibly say "you improved" if there's an honest number behind it. This is what Block 6's encouragement dialogue draws from; don't let the two blocks diverge (e.g., Spidey shouldn't say "1% better" if the underlying data can't actually support that specific claim — keep the language honest to what's measured, e.g. "faster than last time" or "fewer mistakes than yesterday" when that's what's true).
**Non-technical acceptance test:** Deliberately get several questions on one topic wrong, confirm that topic reappears later as a revision prompt. Confirm the dashboard shows his own past-best numbers, not any other "user." Confirm Spidey's improvement messages match real deltas in the data (spot-check one).
**Handover must include:** the specific (simple) rule being used to decide "weak topic" — you should be able to state it in one sentence. Confirmation that no synthetic/fake user data exists anywhere in the system. Confirmation of what specific data points feed the "improvement" messaging.

### Block 12 — Parent intelligence
**Goal:** You get a daily report — what he did, where he struggled, meaningful questions he asked.
**Non-technical acceptance test:** A report actually lands in your email/inbox after a test session, and it's readable without technical jargon.
**Handover must include:** report schedule/timing, where to change it.

### Block 13 — Admin controls
**Goal:** Your own screen to review AI-generated content, approve/reject, regenerate, before anything reaches him.
**Non-technical acceptance test:** You can find a piece of AI-generated content, see it wasn't approved, approve it, and confirm it now appears for the child login.
**Handover must include:** where this screen lives, how you get to it.

### Block 14 — Deployment & hardening
**Goal:** The app runs on the actual internet (Cloud Run), not just your laptop, and works on his tablet on your home wifi.
**Non-technical acceptance test:** Open the real URL on his tablet, complete one full lesson + doubt question + assessment, end to end, with no crashes.
**Handover must include:** the live URL, monthly cost dashboard location, how to check if a budget alert has fired.

---

## Handover Doc Template

*Copy this into the last message of each block's Claude Code chat, ask Claude Code to fill it in, save the output, paste it into the next block's chat.*

\`\`\`
BLOCK COMPLETED: [number + name]
DATE:

WHAT WAS BUILT (plain English, 3-5 sentences):

WHAT'S WORKING (the specific things you tested and confirmed):

WHAT'S NOT YET BUILT (explicitly out of scope for this block, deferred to a later block):

KNOWN ISSUES / THINGS THAT FELT OFF:

FILES/FOLDERS ADDED OR CHANGED (high level, not full code):

ANY MANUAL SETUP STEPS DEBRAJ NEEDS TO REMEMBER (API keys created, accounts set up, names only):

WHAT THE NEXT BLOCK NEEDS TO KNOW TO START:
\`\`\`

---

*Ask Spidey — Personal AI Learning Companion | Block Build Plan | v1 | August 2026*
