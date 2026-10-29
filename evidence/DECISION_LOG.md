# Dated decisions (do not silently rewrite)

| Date | Decision | Origin / evidence | Scope impact |
|---|---|---|---|
| 2026-10-28 | Approve PC-001 and start an independent Round 2 repo | Student explicitly approved the charter in ChatGPT | Pre-implementation only |
| 2026-10-28 | Compare only Vibe Coding and Spec Kit-based SDD; no God Mode | Student discussion and charter approval | Two conditions |
| 2026-10-28 | Every Vibe prompt must be written in the student's natural voice, reviewed and approved before execution | Student explicit preference | Mandatory approval gate |
| 2026-10-28 | Reuse historical owner-held Swedish *input data* only; no old application code | Chartered approach and SOURCE_MANIFEST | Data provenance |
| 2026-10-28 | Keep both branches on the same baseline; evaluate with shared independent tests | Experiment protocol | Methodological control |

| 2026-10-29 | Perform UX-REVIEW-01 as a **read-only** baseline audit after V-006-F02, not as V-007 | Exact student [approval](UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md); [audit](UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md), source-only because live browser blocked | Seven classified findings; no application fixes authorized |
| 2026-10-29 | **Choose Option A: V-006-F03 focused stabilization** ahead of V-007/8/9, but **defer execution until student later authorizes** | Student's verbatim Persian selection and alternation observation preserved in [detailed decision and research rationale](V-006-F03_FOCUSED_STABILIZATION_DECISION_AND_RESEARCH_RATIONALE_2026-10-29.md) | Planning choice, not an approved code prompt; all fixes remain pending; avoid renumbering V-007 |
| 2026-10-29 | Preserve the student's **Construct → Fixation → Construct → Fixation** process observation as a key final-report hypothesis, with genuine corrections, human interventions and negative runs | [Research rationale](V-006-F03_FOCUSED_STABILIZATION_DECISION_AND_RESEARCH_RATIONALE_2026-10-29.md), §8–9 | Compare empirical cycles responsibly; historic pilot has three methods, Round 2 only Vibe and SDD; no premature causal claims |

| 2026-10-29 | Student **explicitly approved the exact V-006-F03 coding prompt**, after prior strategy-only approval; execute a *single* focused corrective increment | [Original exact approval](V-006-F03_STUDENT_APPROVAL_2026-10-29.md) predates app code; [AI-written exact prompt](V-006-F03_AI_DRAFT_FOCUSED_STABILIZATION_PROMPT_2026-10-29.md) | Permission to fix UX01/02/03/04/05; UX06/07 deferred to V-007; no new features or SDD implementation |
| 2026-10-29 | F03 fixes committed and validated by **41/41 automated checks**, TypeScript and production build; preserve RED CI and require **student + live-browser acceptance** before V-007 | [Actual dated implementation and failures](V-006_F03_IMPLEMENTATION_LOG.md); [issue statuses](V-006_F03_ISSUE_STATUS.csv); [CI 40883820378](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883820378) | Vibe app code modified; SDD, data, Supabase untouched; live browser/deployment unverified |

Future decisions, scope changes, failed validations and changed assumptions are appended with dates; do not retroactively edit history.
