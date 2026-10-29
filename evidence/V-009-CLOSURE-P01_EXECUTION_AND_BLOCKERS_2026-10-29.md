# V-009-CLOSURE-P01 — Execution evidence and blocked-gate status
Date: 2026-10-29 (Europe/Helsinki)
Provenance: exact English prompt saved at `evidence/V-009-CLOSURE-P01_EXACT_ENGLISH_AI_DRAFT_2026-10-29.md` (blob `2cff2dc18387393d8245f7a4d47725668eec959d`). Verbatim student approval `پرامپت V-009-CLOSURE-P01 را دقیقاً تأیید می‌کنم. اجرا کن.` captured **before external changes** in `evidence/V-009-CLOSURE-P01_STUDENT_APPROVAL_BEFORE_EXECUTION_2026-10-29.md`, commit `51e2fb1dcc26fce4125c7119599ff7214bff860e`.

## Work performed
- Inspected Vercel project `prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2` environment variables. Pre-change `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` were Production-only, encrypted in provider.
- Retrieved both existing project environment values through provider tools to verify their type and expected Supabase project `rhtrzuoqycdnwcbgctpe`. Values were not emitted in assistant-visible output, GitHub files, or chat. Confirmed publishable key uses `sb_publishable_` format, NOT a secret/service-role key.
- Created **two branch-scoped Preview entries only**, both encrypted, targeting `hardening/v009-release-candidate`, via Vercel `create_project_env`. Postflight independently confirmed:
  - `NEXT_PUBLIC_SUPABASE_URL`, target `preview`, branch `hardening/v009-release-candidate`, provider ID `vc9TiFUzY9HA0Nna`.
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, target `preview`, branch `hardening/v009-release-candidate`, provider ID `GFqDAFOnAkyoUwSc`.
  - Original Production entries remain unchanged: URL ID `BJTTjePUUCwCs5o3`; publishable key ID `PuzoHWgL2XHrW1Lu`.
- Attempted creation of a new branch-only deployment against GitHub SHA `51e2fb1dcc26fce4125c7119599ff7214bff860e`. First request was rejected `400 target preview invalid` (API accepts omitted target for Preview). Corrected request without target was rejected by Vercel with `402 payment_required`, reason `api-deployments-free-per-day` (more than 100 deployments), `retryAfter=86400`. **No paid upgrade was made, and the failed deploy was not counted as a successful new deployment.**
- Later Vercel read-only branch listing showed existing SSO-protected `READY` Preview deployments at `874929679618a69bca0e4f515fecaeb438c60c98`, `3cf54d7690fb8b3221599a9170410a2c33b06f6e`, `ba0edb09c7f00915e209dc966eec941452969d19`. All were created **before** the new Preview environment configuration and cannot establish that new environment values were embedded in the browser bundle. A new build is required.
- No new Supabase users, synthetic data, real account logins or test sessions created; this would be premature while Preview env cannot be confirmed in a new build.
- No PR merged, Production Vercel branch/domain/alias/Auth/Google/SMTP changed, Production migration re-run, or SDD source modified.

## Verification status and blockers
| Gate | Actual outcome |
|---|---|
| Prompt provenance / human approval | PASS |
| Branch-scoped Preview Supabase environment variable creation | PASS (provider postflight IDs verified) |
| Production env variables remain present and isolated | PASS (provider postflight) |
| Build a **new** Preview with those environment variables | **BLOCKED: 402 free daily deployment quota, retry after 86400 s** |
| HTTP smoke/authenticated Preview / Google/email flows | NOT TESTED |
| Two legitimate distinct real Auth accounts, Cloud CRUD and negative cross-user RLS | NOT TESTED; no accounts created |
| Auth callback/return origin allowlist | NOT VERIFIED (needs explicit trusted URL and Supabase Auth configuration review, not silently applied) |
| F01–F15 live browser/mobile/keyboard acceptance | NOT TESTED; prior genuine 94/94 source CI unchanged |
| Production `condition/vibe` → Preview re-routing and dedicated `release/vibe` tracking | NOT VERIFIED; existing Production remains on previously reported `condition/vibe` deployment |
| Exact-HEAD CI and HTTP smoke | NOT TESTED |
| Public publish, tag, Vibe Freeze | NOT AUTHORIZED |

## Final objective evaluation
The approved V009 Closure prompt was **partially executed**: Preview env configuration is completed and verified, but Vercel deployment quota prevents authentic post-change Preview testing this turn. No new P0/P1 application defect has been demonstrated, so no speculative source edits were made. The current honest classification is **`RESEARCH_SNAPSHOT_ONLY` (provisional, not student-accepted; NOT Production Ready)**. R01–R03 historical acceptance and the V009 reference manifest remain available. Closing the current research snapshot needs separate final student review; a real verified public Vibe Freeze requires the remaining external tests and release-routing controls.

Next time the Vercel build quota permits, rebuild protected Preview from the approved exact V009 branch after verifying correct auth allowlist, then run test sessions in an isolated test backend where feasible (otherwise the separately authorized synthetic account approach), retain redacted evidence, and verify public routing before requesting final release approval. Do not start a new Vibe version to do this; keep the work under **V009 Closure / PR #4**.
