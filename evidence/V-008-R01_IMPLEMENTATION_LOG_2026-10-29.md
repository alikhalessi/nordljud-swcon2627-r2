# V-008-R01 — Controlled Release Foundation — authentic implementation and evidence

**Date:** 2026-10-29 Europe/Helsinki (exact commit/run timestamps in GitHub)
**Project:** Nordljud Round 2 / Åbo Akademi SWCON2627
**Condition:** Vibe Coding, student-approved base `condition/vibe`; protected working branch `hardening/v008-r01`.
**Status:** `STAGING SOURCE IMPLEMENTED / 77 OF 77 TESTS + TS + BUILD GREEN / PRODUCTION GATE NOT YET ENFORCED / HUMAN ACCEPTANCE PENDING`.
**Official English [AI draft](V-008-R01_AI_DRAFT_CONTROLLED_RELEASE_FOUNDATION_2026-10-29.md)** committed earlier as `e61b179c...`.
**Student's [exact verbatim approval](V-008-R01_STUDENT_APPROVAL_2026-10-29.md)** committed on `condition/vibe` in `47a25779d50455d1dad205ed93f71e6287c31cc1` **before all R01 test/source/CI changes**.
**Baseline application release:** `d9a472ba934aad3dec1c3244cfeefbaa72ca8746`, V-008 [72/72 success](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898856815), last confirmed Vercel READY Production deploy `dpl_FYVmd9Qt69XHArdNoDdKNjfjvvnp` from `condition/vibe`.
**Staging candidate tested SHA:** `3d3fb6fde23e703b23412cd9cab9fe7112766616`.
**Exact verified green run:** [40904256959](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40904256959), job `123554569228`: **77/77 tests, 0 fails; TypeScript PASS; Next.js production build PASS; clean `npm ci` PASS**. Raw logs explicitly show `NOT TESTED: R01_CANDIDATE_URL is unset; candidate HTTP smoke was skipped.`
**Review/merge status:** [Draft PR #1](https://github.com/alikhalessi/nordljud-swcon2627-r2/pull/1) **OPEN DRAFT, NOT MERGED**. Production-linked `condition/vibe` HEAD still `47a25779d50455d1dad205ed93f71e6287c31cc1` as of the review check, with no R01 source merged.
**Production Vercel and Supabase settings:** **NOT CHANGED**, in accordance with explicit separate consent boundary.

## 1. The critical safety decision

Connected Vercel deployment metadata established that the live public production project's accepted deployment `dpl_FYVmd9Qt69XHArdNoDdKNjfjvvnp` comes from branch `condition/vibe` and records its exact Git SHA. Prior intermediate commits on that branch resulted in multiple Production READY/ERROR/CANCELED deployments. It would have violated the student's R01 restriction to push **intentional failing test-first commits** straight into Production.

Accordingly, after committing original student approval to `condition/vibe`, the agent created `hardening/v008-r01` from the exact approved commit. RED and GREEN runs, temporary lockfile generation, and code changes happened **only on this isolated Vibe-derived branch**. A draft PR returns the finished code for approval; **no automatic merge, release promotion, rollback or Production settings change** occurred. The user explicitly requires separate confirmation before any live Vercel Production branch/alias change and acceptance before R02.

## 2. Actual implementation

| Location | What was implemented or changed |
|---|---|
| `package-lock.json` | A **genuine npm registry-resolved lockfile**, generated on a GitHub Actions runner via one-time `npm install --package-lock-only --ignore-scripts`; committed by a temporary `contents:write` workflow to the isolated branch, never synthesized manually. The temporary privileged bootstrap workflow was then **deleted**. |
| `.github/workflows/vibe-first-check.yml` | Runs for `hardening/v008-r01` and Vibe-targeting PRs, in addition to the legacy branch pending safe Production release separation. Actions checkout pinned to audited SHA, Node **22.23.4** verified from previously green CI logs, `npm ci --no-audit --no-fund`, `npm test`, TypeScript, Next build and optional candidate HTTP smoke. No automatic Vercel release/promotion, Supabase migration, or rollback step. |
| `tests/v008-r01-release-controls.test.mjs` | Test-first source checks for actual lockfile integrity, `npm ci`, CI triggers, absence of direct deployment commands and release runbook. |
| `scripts/r01-candidate-smoke.mjs` and `tests/v008-r01-candidate-smoke.test.mjs` | Optional bounded HTTPS HTTP/HTML/Nordljud marker smoke with safe URL validation and direct unit tests. If `R01_CANDIDATE_URL` is missing, prints explicit **NOT TESTED**, without claiming live auth, RLS or full browser E2E. |
| `docs/R01_CONTROLLED_RELEASE_RUNBOOK.md` | Factual current Vercel project/branch, proposal to move Production to dedicated `release/vibe` only after separate user confirmation, rollback procedure, exact SHA traceability, Preview plan, unverified release gates and independent SDD boundaries. |
| `evidence/` | This original-approval-based implementation log, authentic negative CI and final accepted candidate evidence; no fabricated screenshots. |

**No app language/practice code was modified** in R01; no Swedish source JSON or shared F01–F15 benchmark, DB/RLS/Auth, Vercel live settings or independent SDD branch was changed.

## 3. Chronological RED/GREEN evidence and failures (do not erase)

| GitHub run / commit | Result / reason |
|---|---|
| [40903016890](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40903016890) / `65cc243285` | Staging CI enabled; old suite GREEN before new R01 tests. |
| [40903262007](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40903262007) / `2f69e60f21` | **GENUINE RED, 73/75 PASS, 2 FAIL** because no real package-lock and no release runbook. New tests were committed first, not retrofitted after a fix. |
| [40903404539](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40903404539) and other intermediate branch runs | RED while the lockfile, docs and workflow were in intermediate states. These intentionally incomplete stages were isolated from Production; keep CI job logs as authentic research evidence. |
| [40903404651](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40903404651) | One-time temporary bootstrap job SUCCESS; resolved `package-lock.json` from real registry; privileged workflow subsequently removed. |
| [40903983392](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40903983392) / `3ee9d0d05` | Another genuine RED: pinned **Node 22.16.0** was too old for native TypeScript `.ts` imports in `tests/v008-learning-hub.test.mjs` (`ERR_UNKNOWN_FILE_EXTENSION`), even though `npm ci` passed. Agent had selected the wrong patch pin. |
| [40904022058](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40904022058) / `7b8496cc92` | Same Node 22.16.0 failure before the version fix. |
| [40904256959](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40904256959) / `3d3fb6fde23e703b23412cd9cab9fe7112766616` | **FINAL STAGING GREEN: 77/77 tests PASS, 0 FAIL; TypeScript PASS; production build PASS; `npm ci` PASS** after pinning the previous known-working Node **22.23.4**, directly confirmed in V-008 original CI logs. HTTP candidate smoke explicitly **NOT TESTED**, because URL variable not yet configured. |
| [40904694870](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40904694870) | Additional PR-triggered CI on same exact tested SHA; do not assume result until inspected. |

**Research interpretation:** Early RED was the missing pre-existing release controls, while later failures included an assistant-introduced Node version mismatch. The data do **not** prove that R01 needed this many iterations or that one development method outperforms SDD; record chronology, scope and agent mistake honestly.

## 4. What is STILL BLOCKED and why

- **Enforced public release gate: BLOCKED.** The Vercel project `nordljud-r2-vibe` is still wired to Production on `condition/vibe`. Changing it to the proposed protected `release/vibe` (or an equivalent genuinely gated configuration) is a live-provider setting change the student expressly reserved for separate confirmation. This step was **NOT authorized** in this R01 implementation request. Merging draft PR #1 into `condition/vibe` would again trigger a Production deployment, so **DO NOT MERGE until a safe release path is approved and active**.
- **Browser/live candidate smoke:** `R01_CANDIDATE_URL` not set for successful CI run. GitHub PR subsequently initiated Vercel Preview deployment `dpl_3t1vp6KXd5RBN7CzNqoLooUQxDnj` for the exact SHA `3d3fb6fd`; last inspected status was `BUILDING`, not asserted READY. Actual candidate URL can be used for a separate smoke check after it becomes READY and is accessible. Browser E2E, Google sign-in and two-user RLS were NOT performed.
- **Supabase:** User-owned V-008 cloud tables are **not deployed**. Production migration has not been approved or run, and no live ownership/RLS test is claimed. This belongs in V-008-R02 after the student's separate explicit authorization.
- **CI emails:** Historical failing workflows are preserved; user account notifications are not centrally disabled. Isolated staging avoids known RED code reaching Production but may still notify about genuine errors, which is scientifically honest.
- **Acceptance:** The student has not yet accepted R01; R02 and V009 have not started. R01's GREEN code checks are insufficient alone to close the Production readiness audit.

## 5. Exact remaining release decisions

1. Review [draft PR #1](https://github.com/alikhalessi/nordljud-swcon2627-r2/pull/1) and this evidence log.
2. Independently authorize changing live Vercel Production branch/deployment settings and deploying only **green, accepted, exact** SHAs, or provide an equivalent operator-controlled plan. Until that approval, leave PR in DRAFT.
3. Confirm a Vercel Preview for exact test SHA and run HTTP + authenticated real-user E2E separately; record verified results only.
4. Student acceptance of R01 is required before preparing/executing R02; R02 production migration needs its own explicit user approval; V009 requires prior acceptance gates.
5. Before final freeze, merge/publish only through a genuinely protected release path and record tested release SHA, schema version, deployment ID, sign-in status and manual acceptance.
