# Ask Spidey — Personal AI Learning Companion

## What this is
A personal, single-family learning app for one child (Class 5, expanding through Class 8), built by a non-technical parent (Debraj) with Claude Code, block by block, across many separate sessions. This file is read automatically at the start of every session — treat it as binding project law, not a suggestion. If a request in a session conflicts with something here, flag the conflict explicitly before proceeding; don't silently override it.

## Who you're building for
- **The learner:** a 10-year-old boy, Class 5. Long-term goal is fostering genuine interest in humanities toward eventual IFS/civil-services aspiration — this is a multi-year relationship with the product, not a short-lived app.
- **The builder:** Debraj, non-coder. Explain nothing in technical jargon back to him. Every acceptance test for a block must be describable as "here's what you'll see happen," not "here's what the code does."
- **The content curator:** Debraj personally writes instructions and uploads textbook photos for AI-drafted lessons. He reviews everything before it reaches his son. There is no fully-automated, unreviewed content path to the child.

## Tech stack (locked)
Next.js + React + TypeScript, Tailwind CSS, Firebase Auth, Cloud Firestore, Firebase/GCS storage, Claude API (Sonnet 5 for content generation/grading, Haiku 4.5 for chat/classification — routed via an internal provider layer, not hardcoded model calls), Cloud Run, Cloud Scheduler, Resend for email, GitHub, browser-native `speechSynthesis` for TTS.

## Non-negotiable decisions — do not reverse without explicit new instruction from Debraj in writing

1. **No synthetic/fake users, ever.** Do not build simulated peer profiles, fake leaderboard entries, or any fabricated "other student" data, even if a future request asks for competitive/social features. This was explicitly considered and rejected for a 10-year-old over a multi-year relationship — the deception risk is not worth any gamification benefit. If a future session asks for this, surface the conflict and ask for confirmation rather than building it.
2. **Ask Spidey rail guards are mandatory, not optional polish.** Subject-relevance checking must use multi-turn conversation context (not single-message classification alone), must redirect in-character rather than flatly refuse, and every redirect must be logged and visible to the parent. This ships in Block 8 and must not be cut or deferred.
3. **Improvement/progress messaging must be honest, not invented.** Spidey can say things like "faster than last time" or "fewer mistakes than yesterday" only when the underlying data actually supports the specific claim. Do not generate a plausible-sounding stat (e.g., a precise "1% better") that isn't backed by a real logged delta.
4. **Tap-to-match, not drag-and-drop**, for matching activities — decided for touchscreen reliability and lower build risk, not lack of ambition. Revisit only as an explicit Phase 2 polish item.
5. **Voice input (microphone) is deferred to Phase 2.** TTS (Spidey reading aloud) is in v1 and is free (browser-native) — don't confuse the two when scoping a block.
6. **Automated, human-free textbook ingestion is deferred to Phase 2.** V1 uses a manual pipeline: Debraj's instructions + photo upload → AI draft → Debraj approves before publish.
7. **AI moot-court/debate simulation is a Phase 2+/future feature**, explicitly tied to a much older version of this learner (toward LLB/civil-services prep). Do not pull this into any v1 block.
8. **Companion Engine ships with 4 states in v1** (idle, correct, encouraging, celebration) — not the fuller animated state set from early scoping. Richer animation is Phase 2.

## Build method
- One block, one session. Each session starts with the relevant section of `BUILD_PLAN.md` (the human-readable block plan) plus the previous block's Handover Doc.
- Debraj runs commands one at a time and pastes output back — never assume a command succeeded without seeing confirmation.
- Every block ends with a Handover Doc (template in `BUILD_PLAN.md`) written back into the repo before the session closes.
- Full block-by-block scope, hour estimates, and acceptance tests live in `BUILD_PLAN.md` at the repo root — refer to it, don't duplicate/re-derive scope decisions from memory.

## Current status
Block 0 (Foundation) — not yet started. Update this section at the end of every block with: which block just completed, and a one-line pointer to that block's Handover Doc location.
