# V-008-R02 — Authentication and Secure Cloud Completion: authentic evidence and partial outcome

**Date:** 2026-10-29 (Europe/Helsinki; precise timestamps from GitHub CI / commits).
**Condition:** Nordljud Round 2, Vibe Coding. Isolated branch `hardening/v008-r02`, based on R01-approved `hardening/v008-r01`.
**Status:** `STAGING SOURCE IMPLEMENTED / AUTOMATED 82/82 GREEN / LIVE AUTH PROVIDER AND PROD SCHEMA CHANGE NOT AUTHORIZED / TWO-USER RLS NOT TESTED / STUDENT R02 ACCEPTANCE PENDING`
**Exact student [R02 authorization](V-008-R02_STUDENT_APPROVAL_2026-10-29.md)** committed `24e75a1bf49c1a560692107c05ab5647412a94c5` **BEFORE any R02 application, test, or CI change**. The prior English-only [AI draft](V-008-R02_AI_DRAFT_AUTHENTICATION_AND_CLOUD_COMPLETION_2026-10-29.md), commit `879368da5cf80bbe0423b822646e0112d248a615`, was shown to the student in complete Persian in chat; GitHub records only English.
**First R02 change:** CI branch trigger extension `868ae4ec165fb086d7b08fa9ad856f3be542a2eb`, after approval; first new RED tests `b4ff67f5e001567f93eeff7be8f9108f8b4f0f5f`.
**Known original R01 source-check baseline:** 77/77 green tests, TypeScript and Next build at `9f2945c81a55acbf26d6bdebe7f72e5a8c97dfaa`. R01 Draft PR #1 remains unmerged; `release/vibe` is a separately tracked production branch and has not received R02 source.
**Existing Production working app code:** `7f64839dbcb8ae945b0416ecf83b84d78009b1f0` release branch unchanged, with R01's provider rate-limit and GitHub Free branch-enforcement limitations. Future development-to-Preview verification is still mandatory before Vibe Freeze.

## 1. Implementation and source fixes staged (not published)

| File | Changes and constraints |
|---|---|
| `lib/auth-flow.mjs`, `lib/auth-flow.d.mts` | Pure allowlist validator for exact HTTPS app origins and only callback/recovery paths. Production aliases explicitly enumerated; optional additional HTTPS origins from a developer-configured allowlist, localhost development only. Never trust arbitrary `*.vercel.app` or a user-supplied arbitrary `redirectTo`. Generic Auth error messages avoid echoing private provider details or account identifiers. |
| `app/auth-controls.tsx` | Email sign-up confirmation returns to trusted `/auth/callback`, Google OAuth uses same allowlisted callback, and Email sign-in exposes a **Forgot password?** recovery request with a non-enumerating message. An OAuth request is not shown as proof of completing login. |
| `app/auth/callback/page.tsx` | Client-only PKCE-aware sign-in completion, with session check, possible code exchange, safe failure and return to home. No OAuth token is printed in logs. |
| `app/auth/reset/page.tsx` | Session-validated password update screen using Supabase `updateUser` and a minimum 12-character new password. Merely presenting a URL without a valid authenticated recovery/session token does not authorize data changes. Real password recovery remains provider/browser unverified. |
| `app/review-state.tsx` | For user-scoped Cloud deletes and updates, `.select("user_id")` explicitly requests affected rows and `requireOneChangedRow` rejects zero/multiple results; no false successful "saved" return when PostgREST updates/deletes nothing. The existing post-write `loadCloud` verification, account-switch stale request guard, and separate Guest local store remain. |
| `database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql` | Separate **NOT APPLIED** reviewed three-table SQL proposal with 12 owner-bound SELECT/INSERT/UPDATE/DELETE policies, Data API grants, anon revocation, unique exact-sense keys, relevant constraints and strengthened JSON result array length check. No SQL was run or migration history added in Supabase. |
| `tests/v008-r02-auth-cloud.test.mjs` | Five initial R02 tests: strict allowed OAuth paths, safe error reporting, Auth recovery/callback source, zero-row cloud persistence handling, and owner-bound **unapplied** SQL proposal. |
| `docs/R02_AUTH_CLOUD_DEPLOYMENT_AND_SECURITY_GATES_2026-10-29.md` | Read-only provider observations, exact live Auth change approval gate, exact Production migration approval gate, real two-user RLS/REST test protocol, rollback and research acceptance criteria. |

**Not changed:** existing Supabase Production schemas/data, Google/Auth/SMTP/redirect provider settings, Vercel Production env/branch settings, original Favorites/Studied/History schemas, shared Swedish JSON data, independent SDD branch or the frozen F01–F15 matrix. PR #1 is not merged. No R03/V009 code. No test accounts were created.

## 2. Authentic RED/GREEN timeline

| CI run (actual) | State and interpretation |
|---|---|
| [40915483744](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40915483744), SHA `868ae4ec` | **GREEN original baseline** on isolated branch after adding its own CI trigger, before new R02 tests. |
| [40915588376](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40915588376), SHA `b4ff67f5` | **GENUINE RED test-first**, `77/78 passing; 1 test failed`, because new `lib/auth-flow.mjs` did not yet exist. The R02 test module was committed before its implementation. |
| [40915734377](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40915734377) to [40916101563](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40916101563) | Intermediate **RED** as helper types, OAuth/password UI, callback routes, affected-row checks and candidate SQL accumulated. An assistant-authored test initially asserted `updateUser` inside `auth-controls.tsx` rather than the correct dedicated password-reset page. That test was corrected honestly, not hidden. |
| [40916180895](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40916180895), SHA `e1bc437b7ffbc341b75eb78fda19504d89a9c9f4` | **GREEN verified: 82/82 tests, zero failures; `npm ci` PASS; TypeScript PASS; Next.js production build PASS.** The optional R01 candidate HTTP smoke step executed but printed `NOT TESTED: R01_CANDIDATE_URL is unset; candidate HTTP smoke was skipped.` Source-level checks are not browser/Auth/RLS proof. |
| Later documentation-only commits | Later CI must be checked before claiming that their exact head SHA is green; no source code change since the above green check unless explicitly noted. |

## 3. Read-only production status checked during R02

Connected Supabase project `nordljud-v2-auth` (`rhtrzuoqycdnwcbgctpe`) reports `ACTIVE_HEALTHY`. Three existing tables: `nordljud_favorites` (5 rows), `nordljud_studied` (2 rows), `nordljud_practice_history` (1 row), all RLS enabled; the **three new R02 review tables do not exist**. Migration history still contains only earlier `20261029101938 nordljud_v006_private_learning_state`. No schema migration was executed or attempted. Supabase security advisor flags leaked-password protection disabled (WARN), not an observed breach. An earlier `provider is not enabled` Auth log was captured, but the actual disabled provider still was not independently identified.

## 4. What is BLOCKED or NOT TESTED

- **Live email registration/confirmation, Google OAuth and reset-password flow:** SOURCE IMPLEMENTED, **REAL PROVIDER/BROWSER NOT TESTED**. Any exact Google, email/SMTP or URL configuration edit requires **its own explicit student permission** after presenting specific old/new settings and rollback. No secret values may appear in public evidence.
- **Production cloud completions/reminders/review sessions:** **BLOCKED** because the three target tables were intentionally left unapplied. Student R02 code approval expressly did **NOT** authorize applying SQL to Production. Proposed SQL is not a deployed migration and is not proof of account isolation. Separate exact SQL/project/action authorization is required.
- **Two real authenticated-user RLS isolation/negative tests:** **NOT TESTED**, because no separately authorized test database and two test accounts were available. Source-level owner predicates are NOT proof of live security. The original private tables and guest-only logic remain unmodified.
- **R01 release-routing test:** **NOT VERIFIED** due to Vercel deployment-rate limiting; this remains mandatory before the final Vibe Freeze. The private GitHub Free `release/vibe` branch remains without enforced rulesets; accepted as a documented operational limit, not a technical PASS.
- **R02 browser/mobile UX and actual HTTP smoke:** **NOT TESTED**, no screenshots fabricated. R03 remains the separate stabilization stage.
- **Student R02 acceptance:** **PENDING**; until separate acceptance, do not begin R03/V009 or publicly publish R02 source.

## 5. Required future decisions and scope stop

1. Student reviews this staged source/CI result plus [R02 deployment/ownership test plan](../docs/R02_AUTH_CLOUD_DEPLOYMENT_AND_SECURITY_GATES_2026-10-29.md).
2. To complete *live* Auth/Cloud readiness, present individual settings with exact before/after + rollback and obtain separate student permission. For R02 Production schema: exact SQL, project ref, execution method and recoverability need a separate user authorization. No premature automatic action.
3. Execute real redacted **two-account RLS checks** and actual browser signup/login/recovery with legitimate test identities after explicit permissions; any unavailable result remains BLOCKED.
4. Student explicitly accepts or rejects R02's demonstrated status. A general "OK" does not automatically mean acceptance. Maintain original research protocol and no SDD copy.

## 6. Continued R02 security correction after the 82/82 baseline (same isolated branch)

**Motivation:** Following the student's "OK, continue please", a **read-only** review found an Auth callback sequencing hazard. The original `getSession()`-first callback could accept an unrelated previously signed-in session as successful OAuth callback evidence; the reset page could enable password update based solely on an old signed-in session. With the original client setting `detectSessionInUrl: true`, the Supabase SDK could also consume a PKCE code before a manually coded callback attempted to exchange it. Simple boolean-once Effect guards would fail after React StrictMode setup/cleanup/setup replay.

**Corrective test-first RED:**
- New [PKCE regression tests](../tests/v008-r02-pkce-security.test.mjs) committed `faf0b9617a86dadb368ed0f8e8c4dc8482cae67d` **before** the security implementation. Authentic [RED run 40918630843](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40918630843): **82/85 tests passed, three failed** because the old callback behavior and automatic URL consumption remained.
- Added an additional regression requiring that StrictMode replay reuses a single in-flight PKCE promise; interim RED builds preserved. As the code evolved, outdated test assumptions were explicitly corrected: the original V005 source test required SDK `detectSessionInUrl:true`, which contradicts the new explicit, manually validated PKCE callback contract, and the first R02 test asserted `getSession()` on the password-reset route rather than one-time-code exchange. The changes reflect a deliberate security contract change, not hiding old failures.

**Isolated source fixes:**
1. `lib/supabase-browser.ts` now sets `detectSessionInUrl:false` and delegates code handling to explicit Nordljud callback/reset routes. PKCE flow and browser-only public publishable key remain.
2. `app/auth/callback/page.tsx` requires a nonempty **fresh `code`**, removes it from visible browser history, exchanges it exactly once, verifies the returned user by live `getUser()` and rejects a preexisting session as callback proof. An Effect-replayed component subscribes to a **shared in-flight promise**, avoiding a second exchange.
3. `app/auth/reset/page.tsx` similarly requires and validates a new recovery PKCE code before enabling password update, verifies session-to-user identity both on exchange and immediately before `updateUser`, clears ready state on sign-out or account change, and reuses the same in-flight promise across StrictMode replays.
4. `tests/authentication-boundary.test.mjs` and `tests/v008-r02-auth-cloud.test.mjs` were aligned transparently to the new explicit PKCE contract. Shared frozen F01–F15 matrix and SDD content unchanged.

**Authentic final source GREEN:** [GitHub Actions run 40919430702](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40919430702), SHA `dc1dcc31c04d1d498c55cbb344e91eedadb72f80`: **86/86 tests PASS, zero failures, `npm ci` PASS, TypeScript PASS, Next.js build PASS**. Optional candidate HTTP smoke explicitly printed **`NOT TESTED: R01_CANDIDATE_URL is unset; candidate HTTP smoke was skipped.`** Subsequent documentation-only commits do not independently prove live Auth/E2E; check their specific CI results before asserting head GREEN.

**Further read-only external diagnosis:**
- Vercel project's `filter_project_envs(decrypt=false)` found only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, both explicitly targeting **Production** and **not Preview**. No secret values were inspected. Preview account testing therefore needs an explicitly authorized environment-variable and test-environment plan; blindly mirroring Production credentials into public Preview is not approved.
- Supabase project `rhtrzuoqycdnwcbgctpe` was still `ACTIVE_HEALTHY` with only the original three existing RLS tables; no new R02 schema/migration applied. Security advisor warned that leaked-password protection is disabled. Recent aggregate read-only `auth_logs` analysis found zero exact 'provider is not enabled' message matches in the selected 24-hour field/window. This does **not** resolve which provider caused the earlier issue or demonstrate that Google login works.
- Current Provider enablement and Auth Site URL/redirect settings cannot be read from the connected provider schema. Review the [specific read-only screenshots, proposed changes, risks and rollback guidance](../docs/R02_LIVE_AUTH_VERIFICATION_AND_EXACT_CHANGE_REQUEST_2026-10-29.md). **No change to live Auth, Google, SMTP, Vercel Production/Preview variables, database migrations, PR merges or public release** was performed.

**Remaining blockers:** Real email/Google/recovery flows, authorized Preview environment, true two-account RLS, Production schema approval and application, browser/device E2E, Vercel branch-routing test and student acceptance **still NOT TESTED/BLOCKED/PENDING**. Code/CI GREEN does not clear them. R03 and V009 not started.
