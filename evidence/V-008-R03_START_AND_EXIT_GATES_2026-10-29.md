# V-008-R03 — Kickoff and minimal closeout board
Date: 2026-10-29 (Europe/Helsinki)
Status: **STARTED — read-only readiness checked; coding prompt not yet approved**.
Reference: `evidence/V-008-R02_STUDENT_ACCEPTANCE_AND_R03_START_2026-10-29.md` (verbatim student permission to proceed).
Exact AI_DRAFT for approval: `evidence/V-008-R03_AI_DRAFT_FINAL_STABILIZATION_2026-10-29.md`.

## Actual verified starting point
- V-008-R02 student-accepted **with documented exceptions**; no PR merge or release approval.
- Database migration `20261029192724 v008_r02_secure_cloud_schema` applied **once** to `rhtrzuoqycdnwcbgctpe`; three new 0-row RLS-enabled tables and 12 owner policies; old 1 Auth user and 5/2/1 source counts unchanged. Do not repeat.
- Code-source CI green **94/94** on commit `357fa7239e3b9b4efb57a57fad6817d49762af90` (GitHub Actions run `40928342244`). Do not assert this proves browser/Auth or latest documentation-only branch head checks.
- Vercel `nordljud-r2-vibe`: SSO-protected Preview `dpl_7fkyfSYLSBR4DYwWLK4hz7DPhqLU`, alias `nordljud-r2-vibe-git-hardening-v008-r02-aleksi9.vercel.app`, `READY`, source `hardening/v008-r02`. Later documentation commits may trigger other preview deployments. READY != full E2E.
- Vercel environment variable names `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are both **Production-only** (read-only verified; no secret values retrieved), so an isolated Preview Cloud/Auth test is presently **BLOCKED** until safely configured and approved.
- Vercel Production deployment and aliases remain on `condition/vibe`, SHA `7f64839dbcb8ae945b0416ecf83b84d78009b1f0` (`dpl_GyGByUnZBcWzEENAY58yDX1qBf24`); `release/vibe` has no observed deployment. Thus the mandatory `condition/vibe` => Preview routing assurance is **NOT VERIFIED** and cannot be falsely passed.
- Unverified: real two distinct authenticated users' RLS tests, Google/Email sign-up/confirmation/reset, Cloud review persistence and account-switch safety in a browser, mobile/keyboard black-box tests; not enough data to claim PASS.
- GitHub Free private repo release branch rules not enforceable from existing state; accepted operational limitation, not an enforced technical gate.

## Fast exit discipline
1. Record original student R02 acceptance (DONE) and R03 branch isolation (DONE).
2. Present concise exact English R03 Vibe prompt plus Persian translation for approval (**AI_DRAFT written; human review not complete**). Per `docs/PROMPT_APPROVAL_PROTOCOL.md`, no R03 code/test edits before exact approval.
3. After approval, run only necessary focused test-first remediation plus exact-head CI and available real Guest/mobile browser checks, without expanding product scope.
4. Keep every inaccessible Auth/RLS/Preview item `BLOCKED/NOT TESTED` rather than claiming it passed. No live provider/redirect, Vercel Production configuration, SMTP or new test users without separate authorization.
5. Obtain explicit student acceptance of R03, then prepare V-009 draft; do not freeze Vibe or start V-009 merely from an incomplete CI/build.

## Current stage statuses
| Work | Status |
|---|---|
| R02 acceptance / R03 start authorization | PASS |
| Isolated R03 branch | PASS |
| R03 exact natural-language prompt approval | PENDING |
| R03 source coding or tests | NOT STARTED |
| New R03 exact-head CI | NOT TESTED |
| R02 Vercel SSO-protected READY Preview | PASS as deployment metadata ONLY |
| Preview Supabase Auth/Cloud | BLOCKED: Production-only env names |
| Live two-account RLS and OAuth/recovery browser flows | NOT TESTED |
| Development-to-Preview routing | NOT VERIFIED |
| PR merge/public deployment | NOT AUTHORIZED |
| V-009 | NOT STARTED |
