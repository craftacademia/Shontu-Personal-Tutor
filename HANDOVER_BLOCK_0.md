BLOCK COMPLETED: 0 — Foundation
DATE: 2026-08-24

WHAT WAS BUILT (plain English, 3-5 sentences):
An empty but correctly structured Next.js web app was scaffolded, using TypeScript for code
reliability, Tailwind CSS for styling, and the Next.js App Router (the modern routing style).
It was verified to build without errors and to actually run and serve a page in a browser.
The code was committed to Git and pushed to the GitHub repository. A Google Cloud/Firebase
project was also created to host the app's future login and database.

WHAT'S WORKING (the specific things you tested and confirmed):
- `npm run build` completes with no errors (production build compiles clean).
- `npm run dev` starts a local server and serves a real page at http://localhost:3000
  (confirmed via a direct HTTP request — page loaded successfully, status 200).
- Code is committed and pushed to GitHub: https://github.com/craftacademia/Shontu-Personal-Tutor
  (commit 237923a on main).
- Google Cloud/Firebase project "shontu-personal-tutor" exists, under the
  advisory@craftacademia.com Google account.

WHAT'S NOT YET BUILT (explicitly out of scope for this block, deferred to a later block):
- No login, no database, no real content — this block is just the empty skeleton.
- Firebase/Firestore not yet connected to the app (Block 2).
- Authentication not yet built (Block 1).
- No billing account attached to the GCP project — deliberately deferred to Block 14
  (deployment), not needed while running on Spark (free) plan for local development.

KNOWN ISSUES / THINGS THAT FELT OFF:
- None.

FILES/FOLDERS ADDED OR CHANGED (high level, not full code):
- app/ (the Next.js app pages)
- public/ (static assets/icons)
- Config files: package.json, tsconfig.json, next.config.ts, eslint.config.mjs,
  postcss.config.mjs, .gitignore
- CLAUDE.md and BUILD_PLAN.md (already committed in prior commit 825b262)

ANY MANUAL SETUP STEPS DEBRAJ NEEDS TO REMEMBER (API keys created, accounts set up, names only):
- GitHub repo: craftacademia/Shontu-Personal-Tutor (exists, connected as origin).
- Google Cloud/Firebase project: "shontu-personal-tutor", under the advisory@craftacademia.com
  Google account. Currently on Spark (free) plan, no billing attached — billing to be attached
  in Block 14 at deployment time.

WHAT THE NEXT BLOCK NEEDS TO KNOW TO START:
Block 1 (Authentication) can proceed directly — the GCP/Firebase project ("shontu-personal-tutor")
already exists, so Firebase Auth can be enabled and configured against it without any prior
setup step.
