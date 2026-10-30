# SDD-010 — student's B/B/B answers applied within Specify

Date: 2026-10-30 Europe/Helsinki.
Status: Q1=B / Q2=B / Q3=B RECORDED; revised specification v0.2.0 remains a draft.
The actual user choices, rather than the assistant's earlier suggested A options, govern
this revision. This is a continuation of the existing Specify skill, not a new standalone
Clarify, Checklist or other Spec Kit stage.

## Actual source and approved choices

`answers-as-received.txt` retains the actual current user message as UTF-8, including its
IDE context and stray Markdown formatting. `answer-interpretation.json` records source
line 927 in session `01a189f1-258e-7cb2-b93d-e5fb3b56db4c`, turn
`01a18c3b-f836-7070-8155-52e09b0beb62`, timestamp `2026-10-30T09:55:03.039Z`. Only formatting
backticks were ignored when parsing the three unambiguous B values. The received text was
not rewritten. Model from the actual turn context: `gpt-6.1-sol`;
the UI model label was not inspected and is UNKNOWN.

- Q1=B: Guest retains level/selected sense and per-sense favorites/studied across refresh.
  Guest mission/practice state does not persist across refresh. Guest and account state
  remain separate, with no import or automatic merge. Browser application-data clearing
  removes browser-scoped records; no new clearing interface or arbitrary expiry was added.
- Q2=B: Representative-mission completion is explicitly marked by the learner as self-report.
  Authenticated accounts retain that status and latest per-check results separately, with
  favorites/studied. No full attempt history is required; wrong/reveal still earns zero
  correctness credit and completion does not claim assessed success or mastery.
- Q3=B: On a missing target-level counterpart, explain absence, clear active target-level
  selection and require a new explicit choice before selected-sense study/practice resumes.
  Do not silently substitute meanings or delete existing per-sense saved records.

## Actual document changes and review

Only the active feature `spec.md` and `checklists/requirements.md` were edited. `revision.diff`
contains actual read-only Git no-index comparisons from retained v0.1.0 snapshots to the
current files; exit 1 denotes the expected differences. `draft-v0.2.0/` preserves the exact
revised files at this review checkpoint.

The actual revised scenarios, requirements, entities, acceptance mappings and success
criteria were checked for consistency with B/B/B. All three product markers are removed;
there are zero unresolved bracketed product questions. F01–F15 coverage and the separate
secondary scope are unchanged. The manual-completion rule is specifically distinguished
from practice correctness; Guest refresh retention differs intentionally from account
persistence. No daily completion/Undo or other secondary feature was added.

Checklist iteration 2 has 11/16 documentary items complete, five incomplete. The remaining
gap is D01's concrete browser/device/audio/narrow-viewport measurement profile, which affects
FR-014/SC-008 and universal testability/measurement/readiness items. D02 independent account/
provider authorization and D03 source/publication limitations remain explicit dependencies.
No profile was silently selected in this revision; a proposed D01 profile is presented to
the student separately. Installed Edge/Chrome binaries were observed read-only, not launched
or functionally tested. Those observations do not establish product compatibility or speech.

Answering Q1–Q3 does not approve the entire revised specification and does not authorize
Plan or another stage. This revision remains NOT APPROVED FOR PLAN. All 15 application
cases remain NOT TESTED; no application implementation or runtime verification occurred.

## Immutable history and preservation

All 90 pre-existing tracked files and all 18 files in the original Specify evidence directory
remain byte-for-byte unchanged. Constitution v1.0.0, approved MBR/EP/approval inputs, templates,
earlier evidence and metadata remain untouched. All local Git refs and HEAD remain unchanged.

The original Specify artifact manifest describes draft v0.1.0. Its two active spec/checklist
entries now resolve through the already-retained `../sdd-specify-core-2026-10-30/draft-v0.1.0/`
snapshots; every original manifest entry was verified through that historical mapping.
`prior-stage-artifact-resolution.json` records this explicitly. The old manifest, validation,
question tables and review were not overwritten to imply B/B/B was known earlier.

The exact user-visible commands/results and current answer are retained in a bounded session
export. It excludes internal reasoning and system/developer instructions, ends at a completed
tool-result boundary and does not claim to include its own export result or a future final
answer. The live session remains the reference for later responses.

No branch switch/creation, staging, commit, push, external hook, service operation, Supabase,
production, deployment or paid action occurred. The freeze check is cached local hash only;
no remote state was queried. Planning estimates are not recorded as measured execution time.
