BLOCK COMPLETED: 2 — Data layer (Firestore + security rules)
DATE: 2026-08-25

WHAT WAS BUILT (plain English, 3-5 sentences):
Firestore is now locked down with real security rules, replacing the Firebase-generated
default that was open to anyone with a database reference and set to auto-expire on
2026-09-24. A small data layer creates your parent profile and Aryaman's child profile
automatically the moment you sign in — no separate setup step. Everything for your family
now lives under one path in the database, `users/{yourUID}/...`, and the security rule is a
single, simple statement: only you, signed in as yourself, can read or write anything there,
nobody else, ever. This same rule will automatically cover every future collection (lessons,
progress, mastery, companion settings, etc.) as later blocks create them, with no rule changes
needed.

WHAT'S WORKING (the specific things you tested and confirmed):
- Signing in with Google creates/updates a `users/{yourUID}` document (email, display name,
  and a one-time "created" timestamp that's never overwritten on later sign-ins).
- Signing in also creates a `users/{yourUID}/child/profile` document, but only the first time
  — seeded with Aryaman's name and "Class 5". Confirmed present in the Firestore console with
  the correct fields.
- The new rules were deployed live and verified with an automated check against a local
  sandbox copy of the rules (a Firestore emulator, not your real data): a signed-in owner
  writing their own data is ALLOWED, a different signed-in user reading it is DENIED, and a
  signed-out request reading it is DENIED. All three came back exactly as expected.
- `npm run build` completes with no errors.

WHAT'S NOT YET BUILT (explicitly out of scope for this block, deferred to a later block):
- No lessons/progress/mastery/companion-settings collections exist yet — those get created by
  the blocks that actually populate them (4, 6, 9, 11 respectively). The security rule already
  covers them the moment they're created, since everything nests under `users/{yourUID}`.
- No screen for editing the child profile yet — if you want to change Aryaman's name or class
  before that UI exists, it's a manual edit in the Firestore console.
- No rules for anything outside `/users/{uid}/...` — there's nothing else in the database yet,
  so nothing else needed a rule.

KNOWN ISSUES / THINGS THAT FELT OFF:
- The Firestore database itself didn't exist before this block — deploying the rules created
  it for the first time. Worth knowing this is genuinely the first block to touch Firestore at
  all (Blocks 0-1 only touched Auth).
- The rules that were live from Block 0 through the start of this block were the
  Firebase-generated "wide open, expires 2026-09-24" default — meaning anyone with a reference
  to the database could have read or written everything until that date. This window is now
  closed; flagging it here since it was a real, if time-boxed, exposure that existed since the
  project was created.

FILES/FOLDERS ADDED OR CHANGED (high level, not full code):
- firestore.rules (changed) — replaced the default open/expiring rule with the real lockdown
  rule described above.
- lib/user-data.ts (new) — creates/updates your profile doc and creates Aryaman's profile doc
  on sign-in, without ever overwriting a value you've since changed by hand.
- lib/auth-context.tsx (changed) — calls the above automatically whenever someone signs in.
- .gitignore (changed) — ignores Firestore emulator debug logs so they don't get committed.
- package.json / package-lock.json (changed) — added `@firebase/rules-unit-testing` as a
  dev-only tool, so security rules can be re-verified automatically whenever they change in
  future blocks. Nothing about the live app depends on it.

ANY MANUAL SETUP STEPS DEBRAJ NEEDS TO REMEMBER (API keys created, accounts set up, names only):
- OpenJDK (Java) was installed on this machine via Homebrew — required by the Firestore
  emulator, a local testing sandbox separate from your real database, used to verify the
  security rules. Only needed again if we re-run rule tests in a future block.
- Firestore security rules were deployed live to the `shontu-personal-tutor` project via
  `firebase deploy --only firestore:rules`.
- No new API keys, accounts, or billing changes — still on the free Spark plan.

WHAT THE NEXT BLOCK NEEDS TO KNOW TO START:
Block 3 (Dashboard) can proceed directly. The child's profile is readable at
`users/{parentUid}/child/profile` (fields: `name`, `className`, `createdAt`) using the same
`db` export from `lib/firebase.ts`. Anything Block 3 writes should continue to live under
`users/{parentUid}/...` — no security rule changes are needed as long as that convention holds.
