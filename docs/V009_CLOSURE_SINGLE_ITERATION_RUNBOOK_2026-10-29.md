# V-009 Closure — SINGLE ITERATION EXECUTION BOARD
**Date:** 2026-10-29 (Europe/Helsinki)  
**Status:** IN PROGRESS, NOT FROZEN  
**Single work item:** existing [Draft PR #4](https://github.com/alikhalessi/nordljud-swcon2627-r2/pull/4), branch `hardening/v009-release-candidate`. **No R04/R05/R06, no extra parallel PR, no extra features.**  
**Student's verbatim directive:** [V-009 Closure student decision](../evidence/V-009_CLOSURE_SINGLE_ITERATION_STUDENT_DIRECTION_2026-10-29.md). The previously approved exact V009 source prompt remains controlling: [approved text](../evidence/V-009_AI_DRAFT_RELEASE_CANDIDATE_AND_FREEZE_2026-10-29.md) and [student approval](../evidence/V-009_STUDENT_APPROVAL_2026-10-29.md).

## One-iteration endgame — prioritized, no repeated groundwork
| Order | Closure gate / fastest proof | Current result | Exit evidence required |
|---|---|---|---|
| 1 | PREVIEW runtime: set correct *public client* Supabase URL + publishable key for isolated Preview, then run protected candidate on exact SHA | **BLOCKED:** existing env keys target Production only; isolated V009 Preview has READY deployment for SHA `ba0edb09...` | Owner-authorized narrow Preview environment change; verify target and no elevated key; browser session and redacted evidence; no existing live secrets printed |
| 2 | F01–F15 + V008 features: Guest, four levels, two distinct `sticka` meanings, archive/reminders/7+14-day review, keyboard/mobile, authentic email/Google and two-user owner-RLS Cloud roundtrip | **PARTIAL:** prior 94/94 source tests/TypeScript/build green, Supabase new schema applied with 21 total policies; actual browser/Auth/two-account tests NOT TESTED | Actual black-box result per scenario with tested SHA/environment; preserve failures; only fix actual P0/P1 using student-reviewed exact corrective prompt |
| 3 | RELEASE ROUTING: `release/vibe` must be configured/verified as Production source; Vibe dev branch `condition/vibe` must route to Preview without public promotion; branch review policy limits explicitly noted | **NOT VERIFIED:** provider shows historical Production `condition/vibe` deployment, no `release/vibe` deployment; isolated V009 branch `target=null` Preview is verified | Verified provider current branch setting AND real non-release->Preview evidence; no test push or Production change without narrow approval |
| 4 | CANDIDATE/RESEARCH CLOSURE: exact executable-source SHA, clean source checks on chosen candidate, HTTP smoke, CI, provider READY, runtime error review, limited rollback/runbook, final student sign-off | **PARTIAL:** source code identical to prior tested `357fa723...` (94/94 PASS); V009 READY Preview `ba0edb09...`, but it is a docs+identical-code SHA; current HEAD checks and HTTP NOT TESTED | Same tested SHA traced to source/checks/Preview/runtime. Obtain separate explicit final release permission for public publishing/tag/freeze. Produce either `RELEASE_READY` or `RESEARCH_SNAPSHOT_ONLY`; never overclaim |

## Facts confirmed at closure kickoff
- [V009 manifest](../evidence/V-009_RELEASE_CANDIDATE_MANIFEST_AND_VERIFICATION_2026-10-29.md) documents exact schema and evidence, including one Production Supabase migration `20261029192724`, three new tables and existing data preservation. No second migration.
- Vercel Preview from V009 exact SHA `ba0edb09c7f00915e209dc966eec941452969d19` observed READY (`dpl_EW2myq9SUKoWzkXRT7cU4TEnznNR`), SSO protected. This establishes isolated V009 branch->Preview ONLY, **not** the separate `condition/vibe`->Preview claim.
- A newer V009 documentation-only commit `3cf54d7690fb8b3221599a9170410a2c33b06f6e` entered Vercel BUILDING at this check, target `null`. Do not assert READY until rechecked.
- Existing Vercel public Supabase env keys are currently Production-only, verified without decrypting keys. Avoid copying Production user records into test evidence. Test two authorized distinct accounts with synthetic data; verify negative cross-account RLS, sign-out, session cleanup, and restore; cleanup only the specifically inserted test rows after separate authorization.
- Keep PRs #1–#4 Draft and unmerged, SDD branch isolated, and original F01–F15 acceptance definition unchanged.

## Scope and decisions
- User approved the **single-iteration plan**, not a global waiver of risk controls.
- No more automated, exploratory code changes unless a concrete P0/P1 defect has been observed. Preserve authentic original prompt/approval before any distinct corrective Vibe coding prompt.
- No public promotion, Production branch/alias/Google/SMTP/Auth provider change, real account creation, SQL migration, or immutable Vibe freeze without the specific prior authorization applicable to that action.
- If the environment/testing gates cannot be completed, **stop with a clearly labelled non-production research snapshot** and advance to independent SDD only after human acceptance of that scope. A research snapshot is not Production Ready.

## Minimal owner dependency to remove first
Authorize **Preview-only** configuration for the two public Supabase browser variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, with a named test backend/account plan and exact trusted Preview callback origins. Do not modify live Production keys/aliases/provider URLs or expose any token in GitHub/chat. Once authorized and configured, retest a brand-new Preview build because `NEXT_PUBLIC_` values are embedded at build time. This is the single highest-leverage unblocker, not another feature iteration.

## Stop condition
One final Closure verdict (with evidence) in PR #4: (A) verified release candidate + separately approved final Vibe Freeze, or (B) accepted, fixed-SHA `RESEARCH_SNAPSHOT_ONLY` with all missing external checks plainly recorded. Then begin independent official GitHub Spec Kit SDD from neutral baseline, not Vibe code.
