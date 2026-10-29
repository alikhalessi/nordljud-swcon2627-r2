# V-009 Kickoff — release candidate, not yet Vibe freeze
Date: 2026-10-29 (Europe/Helsinki)
Status: **STARTED (planning/evidence only); exact V009 implementation prompt is AI_DRAFT awaiting review**
Accepted R03/approval to begin V009: [verbatim user approval](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/hardening/v008-r03/evidence/V-008-R03_STUDENT_ACCEPTANCE_AND_V009_START_2026-10-29.md).
V-009 exact prompt: [AI_DRAFT](V-009_AI_DRAFT_RELEASE_CANDIDATE_AND_FREEZE_2026-10-29.md).
V009 branch is isolated from `hardening/v008-r03`; no V009 app/test code changed.
Product/benchmark definition: `shared-content/PRODUCT_BRIEF.md`, `evaluation/ACCEPTANCE_MATRIX.md` F01–F15, and `evidence/PRE_V009_PRODUCTION_READINESS_AUDIT_AND_GATES_2026-10-29.md`.

## Current known evidence / no inflated claims
- R01, R02, R03 accepted by student with documented limitations. Draft PRs #1, #2, #3 remain unmerged.
- Reproducibility: last genuine code GREEN CI was 94/94, npm ci/TypeScript/Next build at `357fa7239e3b9b4efb57a57fad6817d49762af90`, run `40928342244`. Subsequent accepted R03 compared identical app source against this SHA, though there was no fresh exact-R03-head workflow execution.
- Database: authorized single V008-R02 migration `20261029192724` created three new RLS-enabled tables, 12 policies; preexisting Auth=1, Favorites=5, Studied=2, History=1 unaffected at verification.
- Vercel: an R03 SSO-protected Preview was observed READY for an earlier documentation commit, **not an authenticated browser or HTTP pass**. Last observed Supabase client env names were Production-only, so Preview Auth/Cloud checks were blocked.
- Mandatory before declaring `READY_TO_FREEZE`: verified development branch to Preview (not directly Production), a candidate on a known exact tested SHA; actual F09–F12 Auth/Cloud/two-account RLS; browser-based Guest UX and mobile/keyboard; branch/routing controls; final user authorization for exact release. Original PRs are not approved for merge.
- GitHub private Free branch ruleset limitation is accepted but not technical policy enforcement.
- Final submission and SDD comparison are separate deliverables. Frozen common F01–F15 criteria and independent SDD implementation must remain untouched.

## Fastest allowed path
- Obtain human approval of exact English V009 AI_DRAFT once.
- After approval, inspect/execute only real test/verification and confirmed fixes, producing one evidence-backed candidate and concise manifest.
- Keep unanswered tests BLOCKED and stop short of public deployment/immutable freeze if mandatory user-defined gates are unmet. Do not turn missing evidence into PASS.
- User release approval must be separate from this start request and final report acceptance.
