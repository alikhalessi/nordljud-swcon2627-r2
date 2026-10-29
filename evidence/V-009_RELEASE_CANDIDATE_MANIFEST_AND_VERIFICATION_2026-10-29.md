# V-009 — Evidence-driven release candidate manifest and execution result
**Date:** 2026-10-29 (Europe/Helsinki)  
**Project:** Nordljud, SWCON2627 Round 2, Method A Vibe Coding  
**Status:** **CANDIDATE DOCUMENTED — NOT READY TO FREEZE, NOT PUBLICLY RELEASED**  
**Branch:** `hardening/v009-release-candidate` (isolated, Draft PR #4 into `hardening/v008-r03`).  
**Human prior prompt approval:** `evidence/V-009_STUDENT_APPROVAL_2026-10-29.md`, approval commit `268ad241a9eed285987539740fcfe1282c6f4dbe`. Exact English approved draft: `evidence/V-009_AI_DRAFT_RELEASE_CANDIDATE_AND_FREEZE_2026-10-29.md` blob `0621721903a5592046985f78004768772da307a9`.  
**No final release/freeze approval has been requested or given.**

## 1. Candidate source identity and reproducibility
- **Last genuinely tested executable source:** SHA `357fa7239e3b9b4efb57a57fad6817d49762af90`, [GitHub Actions run 40928342244](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40928342244). Independently fetched GitHub job logs again during V-009: **94 passed, 0 failed**, `npm ci --no-audit --no-fund` succeeded, TypeScript step succeeded, Next.js 15.5.28 production build `Compiled successfully`.
- **Candidate branch differential:** live GitHub compare `357fa7239e3b9b4efb57a57fad6817d49762af90...hardening/v009-release-candidate` returned 18 newer commits **only in `docs/` and `evidence/`**, with no application source, tests, dependency lock, assets or Swedish teaching dataset changes at inspection. Since then only this evidence manifest was created. Thus the *application source* matches the last GREEN SHA; this is not a fresh V009-head CI run.
- CI workflow `.github/workflows/vibe-first-check.yml` only triggers push on `condition/vibe`, `hardening/v008-r01`, `hardening/v008-r02`; PR builds only on base `condition/vibe`. The V009 branch **has no automatic source-test workflow trigger**. There is a manual workflow_dispatch entry, but it was not invoked. The earlier R03 attempt to amend workflow was rejected by connector safety checks; this attempt was not retried or circumvented.
- The optional smoke-test job **explicitly printed** `NOT TESTED: R01_CANDIDATE_URL is unset; candidate HTTP smoke was skipped.` A green CI step is NOT an HTTP smoke PASS.

## 2. Deployment and public behavior: provider-grounded, read-only
- Vercel project `prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2` (`nordljud-r2-vibe`) is connected with SSO protection for Preview.
- **V009 branch:** no Vercel deployment returned from branch-scoped list at V009 check. Latest prior R03 Preview available `dpl_5YvoqTJwkkMyw1kf3NXEEdUNeUe1` (`READY`) corresponds to **older R03 documentation SHA `b74df793de5a8cd3a078c1215dcb60127739ee0e`**, not this V009 candidate branch. Do not substitute it for a verified deployed V009 commit.
- **Existing public Production aliases** `nordljud-r2-vibe-sepia.vercel.app` and `nordljud-r2-vibe-aleksi9.vercel.app` still mapped to `dpl_GyGByUnZBcWzEENAY58yDX1qBf24`, `condition/vibe` source SHA `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`. No `release/vibe` deployment returned. This does **not** verify that development pushes are safely routed to Preview; required release routing remains **NOT VERIFIED**. No setting was changed.
- Vercel public env variable **names** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` were rechecked with decrypted values **not requested**: both target `production` only. Neither targets `preview`. Auth/Cloud flow therefore cannot be claimed working on Preview.
- HTTP opening attempts for both public Production URL and protected R03 Preview URL were **not accessible via the available web fetch tool**. No HTTP PASS, screenshot, mobile/keyboard browser UAT or authentication E2E is asserted.
- Some recently checked commit statuses report a Vercel `build-rate-limit` failure; status alone does not mean a separately observed older `READY` deployment failed.

## 3. Database and API security: read-only V009 check
- Supabase Production project `rhtrzuoqycdnwcbgctpe` (`nordljud-v2-auth`, `eu-central-2`) reports `ACTIVE_HEALTHY`, PostgreSQL 17.11.
- Migration history exactly includes `20261029101938 nordljud_v006_private_learning_state` and the user-approved once-executed `20261029192724 v008_r02_secure_cloud_schema`. **No new migration applied in V009**.
- Aggregated data counts unchanged: `auth.users=1`, Favorites=5, Studied=2, Practice History=1, Daily Completions=0, Review Items=0, Review Sessions=0. No identities or records exported by V009.
- All six `public.nordljud_*` tables have RLS enabled: original three have 3 owner policies each; new three have 4 policies each (total **21**). Prior exact migration verification also confirmed new tables deny anon and grant authenticated only CRUD.
- This schema check **is NOT** a real two-authenticated-account signed-JWT cross-user test.
- Supabase Security Advisor still shows `auth_leaked_password_protection` WARN (disabled), [official remediation](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). Not proof of a breach. Any live Auth change needs separate approval.

## 4. Frozen F01–F15 acceptance evidence (no fake black-box PASS)
| Cases | V009 verified classification | Grounding / remaining work |
|---|---|---|
| F01–F08 | **SOURCE/CODE UNIT GREEN, BROWSER NOT TESTED** | Four CEFR levels, linked source missions, speech fallback, comprehension & verb-form quizzes, 456-sense lexicons, separate `sticka` senses, level switching, Guest state; represented in source and prior test suite, no live browser confirmation |
| F09 Email Auth | **BLOCKED / NOT LIVE TESTED** | Provider screenshot showed Email enabled, confirmation enabled; real confirmation, sign-in/out and recovery delivery not tested |
| F10 Google OAuth | **BLOCKED / NOT LIVE TESTED** | Google provider status remains unverified; exact redirect allowlist incomplete; Preview lacks Supabase env targets |
| F11 Cloud persistence | **SCHEMA AND SOURCE PREPARED; LIVE NOT TESTED** | RLS tables present, but no Preview-connected authenticated browser persistence/refresh test |
| F12 Two-user isolation | **SCHEMA RLS VERIFIED; TWO-ACCOUNT TEST NOT RUN** | Requires two legitimate test sessions and negative cross-account Data API tests |
| F13 Mobile & keyboard | **SOURCE PREPARED; ACTUAL BROWSER NOT TESTED** | Keyboard/ARIA handlers and responsive CSS exist; no recorded real narrow viewport/keyboard UAT |
| F14 Secrets/failures | **PARTIAL SOURCE/SQL CHECK; LIVE NOT TESTED** | Browser client guards against secret key; safe auth errors; runtime and UI negative-path verification missing |
| F15 Reproducibility | **PARTIAL PASS** | Prior exact source SHA 94/94 GREEN npm ci/typecheck/build; **no exact V009 HEAD CI**, no exact V009 HTTP smoke/deployment |

R01–R03 student acceptance with limitations is preserved; it does **not** upgrade missing external verification to PASS. Original `evaluation/ACCEPTANCE_MATRIX.md` remains unchanged.

## 5. V-008 late-scope feature status
Daily Lesson, Daily Archive, self-report completion/undo, Remind Me Later, seven/fourteen-day review, My Progress and account-switch guards exist in source and prior automated tests. No new V009 feature or speculative P0/P1 source fix was made: no independently observed high-confidence new code defect was established in the available tests. **Guest, browser and authenticated cloud behavior remain NOT LIVE TESTED.** The Swedish corpus and independent `condition/spec-driven` branch were not touched.

## 6. Exactly four remaining blockers before TRUE Vibe freeze
1. **Preview QA wiring**: Obtain separate owner permission to target the two **publishable** Supabase client env variable names to the isolated Preview, ensure safe explicit `NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS` and corresponding Auth redirect allowlist, with no secrets in GitHub and no change to public Production/Google/SMTP without distinct permission. Then verify a V009 exact-SHA protected Preview and HTTP/app marker. Never copy `service_role` or private keys into `NEXT_PUBLIC_`.
2. **Real black-box evidence**: Execute approved Guest, mobile/keyboard, actual Email/Google flows and two-account RLS/Data API tests using authorized identities and an accessible preview or safe test environment, preserving only redacted proof. If provider setup unavailable, keep F09–F12 blocked, not passed.
3. **Release routing and reproducibility**: Owner verifies Vercel Production branch tracking `release/vibe`, demonstrates a non-release development commit routes only to Preview (not Production), and checks release branch review controls (GitHub private Free protection limit explicitly accepted as an unenforced policy). Trigger full exact-candidate CI plus smoke; no silently skipped step.
4. **Human release sign-off**: With real gates complete and no P0/P1, get **separate explicit user approval of the exact release candidate SHA and chosen publication/freezing action**, then publish/tag and record the accepted exact production deployment. Freeze only after verification. There is **no such approval now**.

## 7. No-action boundaries and rollback note
- **No V009 application/test code, new migration, Supabase Auth setting, Vercel Production branch, domain, environment variable, secret, public release, user accounts, or SDD code changed** in this work.
- Draft PRs #1–#4 remain unmerged. No immutable tag or release asset created. Current Production runs its previously observed `condition/vibe` SHA.
- Source/code rollback if ever authorized must restore the last observed READY accepted deployment and verify DB compatibility. Do **not** remove the additive V008 R02 tables or delete users/data as a "rollback" without separately reviewed permission. Existing pre-migration SQL backups are user-held locally and were locally restored with explicit limitations.
- This manifest is the **actual executed V009 result** at present, not a claim that public Production Ready or Vibe Freeze occurred.
