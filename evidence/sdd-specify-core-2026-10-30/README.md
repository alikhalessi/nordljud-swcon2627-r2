# SDD-009 — official Codex Specify stage for Nordljud CORE

Date: 2026-10-30 Europe/Helsinki.
Status: SPECIFY DRAFT GENERATED / QUALITY INCOMPLETE / AWAITING STUDENT ANSWERS.
This AI-authored evidence describes this real supported-agent invocation. It is not a
student approval, a completed application or a claim that the draft is ready for Plan.

## Actual invocation and source

- Agent: Codex. Raw session metadata: source `vscode`, originator `codex_work_desktop`.
- Session: `01a189f1-258e-7cb2-b93d-e5fb3b56db4c`; turn: `01a18c28-1365-7a53-9821-7345f9c8c77d`.
- Model in the actual turn context: `gpt-6.1-sol`. UI model label: UNKNOWN.
- Session CLI version: `0.165.0-alpha.1.2`; official Spec Kit CLI observed: 0.12.11.
- Session working directory: `C:\Users\alikh\Documents\Codex\2026-10-30\referenced-chatgpt-conversation-this-is-an`; target repository: `E:\DevStorage\nordljud-swcon2627-r2`.
  These are recorded separately; no false claim is made that the chat's original directory
  was the repository directory.
- Starting branch: `condition/spec-driven`; clean starting HEAD `7ab6822ad5ac2411b3453911ad9abfb9e098783c`.
- Installed skill actually read and followed: `.agents/skills/speckit-specify/SKILL.md`.
- Actual received request: `request-as-received.txt`; invocation extracted from that request:
  `specify-invocation.txt`. Original source message begins at line 775
  of the session JSONL identified in `preflight.json`.

The already-installed pinned CLI actually ran `version`, `preset resolve spec-template`
and `preset resolve checklist-template`. Resolution selected the project's
`.specify/templates/spec-template.md` and `.specify/templates/checklist-template.md`, top
layer core. Exact command arguments/stdout are retained in the selected session records.
No package download, upgrade, reinitialization or network resolution was performed.

## Created project artifacts

- `../../specs/001-nordljud-core/spec.md`: CORE draft v0.1.0, generated from the resolved template.
- `../../specs/001-nordljud-core/checklists/requirements.md`: Specify's required quality checklist;
  the standalone Checklist stage was NOT executed.
- `../../.specify/feature.json`: actual `feature_directory` is `specs/001-nordljud-core`.
- `feature-initialization.json`: proves the template was copied byte-for-byte before filling
  its sections. No new branch was created and no existing branch was switched.
- `authoring-payload.json`: actual Codex-authored text and hashes, not an imported Vibe SRS.
- `review.diff`: actual Git no-index diffs of the three new project artifacts against
  `/dev/null`; exit 1 is the expected difference result, not a tool failure or product RED.
- `draft-v0.1.0/`: exact copies of the draft specification and checklist at this review gate.
- `clarification-questions.md`: all Q1–Q3 options, presented together for human response.

The specification covers the existing F01–F15 PRIMARY N=15 contract and explicitly excludes
the separate secondary feature scope. No source benchmark, teaching data, approved input,
Constitution, template or historical evidence was edited.

## Validation, unresolved decisions and stopping point

`validation-001.json` and `quality-review.md` distinguish document/preservation checks from
requirements readiness. All 90 tracked pre-existing files retain their exact working-copy
SHA-256 values. The three approved committed blobs and CRLF qualifications were verified
before drafting; no normalization took place on disk.

Quality checklist: 10 of 16 complete, six incomplete. Exactly three material clarification
markers remain. Q1 Guest retention/import, Q2 completion/results/history and Q3 missing
counterpart behavior require the student's decisions; no option has been silently adopted.
D01 concrete test profiles, D02 independently authorized account/provider conditions and
D03 source/publication limitations remain explicit. They are not extra hidden policy guesses.
The draft is NOT APPROVED and NOT READY FOR PLAN.

All 15 application cases are NOT TESTED in this stage. The 0/0/0/15 documentary status tally
does not pretend that a built or frozen application was evaluated. No application source,
runtime tests, ownership/security result or accessibility certification was produced.

The installed skill explicitly says: "Wait for user to respond with their choices for all
questions". The user also requested presentation and a stop for human review. Accordingly,
this invocation stops with the actual draft/checklist/diff and all three questions; it
does not invoke a separate Clarify, Plan or any later skill. Later answer-driven updates
must retain the original draft and this evidence rather than rewrite prior results.

## Scope and provenance limitations

- `.specify/extensions.yml` was absent at both pre- and post-execution checks: no hook ran.
- A large combined source read was truncated. The complete Master and approval were then
  reread separately before authoring; the truncated output was not treated as a full review.
- Repository access required approved execution outside the restricted helper for scoped
  local commands. This is an execution-permission fact, not a product defect or provider action.
- The frozen anchor was checked by cached local ref hash only; live remote state was not
  queried and no Git ref was updated.
- `session-visible-records.jsonl` is a bounded copy of original user/visible assistant and
  tool-call/result records from this turn, ending at a completed result. It excludes reasoning
  and system/developer instructions and is not a claim to include its future final answer.
- No commit, push, branch creation, external hook, multi-stage workflow, Supabase/production,
  deployment, provider setup or paid-service operation occurred. Planning estimates are
  not recorded as actual execution duration.

The source session remains the reference for later messages. New execution evidence is
limited to this directory; project changes are limited to the feature and required metadata.
