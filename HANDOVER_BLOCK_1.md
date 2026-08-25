BLOCK COMPLETED: 1 — Authentication
DATE: 2026-08-25

WHAT WAS BUILT (plain English, 3-5 sentences):
A login screen that lets you (the parent) sign in with your Google account — nothing else, no
email/password or phone options. Once signed in, the app remembers you across page reloads and
new browser sessions, so you don't have to sign in every time. Any page meant to require sign-in
can now be wrapped in a "protected route" guard that automatically sends signed-out visitors to
the login screen. A sign-out button is in place on the (placeholder) dashboard page. There is no
separate login for your son — this block only creates a parent identity; his profile will live as
data under your account, not as its own login, starting in Block 2.

WHAT'S WORKING (the specific things you tested and confirmed):
- Signing in with Google from the login screen lands you on /dashboard, showing your name and email.
- Refreshing /dashboard keeps you signed in (session persists across reloads).
- Opening /dashboard directly while signed out redirects you to /login (protected route works).
- Clicking "Sign out" signs you out and returns you to /login.
- `npm run build` completes with no errors.

WHAT'S NOT YET BUILT (explicitly out of scope for this block, deferred to a later block):
- No child profile data or Firestore records yet — the child-as-sub-record structure is Block 2's job.
- No security rules yet (Block 2) — there's nothing in the database to protect yet, since nothing
  is being written to Firestore in this block.
- Dashboard page is a placeholder (name, email, sign-out button only) — real content starts Block 3.
- No child PIN/login, no password reset flow, no role-based permissions — all explicitly out of
  scope per this block's brief, staying out of v1 entirely.

KNOWN ISSUES / THINGS THAT FELT OFF:
- One manual setup snag: Google Sign-In initially failed with an `auth/operation-not-allowed`
  error. The actual root cause was an empty "Public-facing name for project" field at the
  project level in the Firebase console's Authentication > Sign-in method screen — this silently
  blocked the Google provider from saving as enabled. This is a one-time console fix, not a code
  issue — now resolved and documented below so it doesn't get missed on any future environment.

FILES/FOLDERS ADDED OR CHANGED (high level, not full code):
- lib/firebase.ts (new) — connects the app to your Firebase project using the config values.
- lib/auth-context.tsx (new) — tracks whether you're signed in, app-wide.
- components/protected-route.tsx (new) — reusable wrapper that guards any future page behind login.
- app/login/page.tsx (new) — the Google sign-in screen.
- app/dashboard/page.tsx (new) — placeholder protected page, proves the guard works, has sign-out.
- app/page.tsx (changed) — no longer the default Next.js starter page; now redirects to /dashboard
  if signed in, /login if not.
- app/layout.tsx (changed) — app-wide sign-in tracking wired in; page title changed to "Ask Spidey".
- .env.local (new, NOT committed to GitHub) — holds the Firebase project's connection values.
- package.json / package-lock.json (changed) — added the `firebase` package.
- BUILD_PLAN.md (changed) — Block 1's scope section updated to reflect the final parent-only,
  Google-Sign-In-only, child-as-Firestore-sub-record decision (was originally written assuming a
  separate child login, which we've deliberately dropped).

ANY MANUAL SETUP STEPS DEBRAJ NEEDS TO REMEMBER (API keys created, accounts set up, names only):
- Firebase project "shontu-personal-tutor": a web app was registered inside it (this is what the
  .env.local connection values come from).
- Firebase Authentication was turned on, with Google as the only enabled sign-in provider. The
  project-level "Public-facing name for project" field also had to be filled in (required for the
  Google provider to save as enabled at all — this was the thing that caused the one hiccup above).
- No new GitHub secrets or GCP billing changes — still on the free Spark plan, same as Block 0.

WHAT THE NEXT BLOCK NEEDS TO KNOW TO START:
Block 2 (Data layer) can proceed directly. You (parent) have a working Firebase Auth identity —
`auth.currentUser.uid` is available anywhere inside the app via `useAuth()` from
lib/auth-context.tsx. Block 2 should create the Firestore structure with the child's profile
stored as a sub-record/document under that parent UID (not a separate Auth user), plus security
rules that key off the parent's UID. No Firestore collections exist yet — Block 2 is starting
from an empty database.
