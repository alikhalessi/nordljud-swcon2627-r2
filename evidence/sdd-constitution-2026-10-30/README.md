# SDD-007 — genuine Codex Constitution draft session

Date: 2026-10-30 Europe/Helsinki.
Status: CONSTITUTION SKILL EXECUTED / DRAFT GENERATED / NOT RATIFIED.
This is an AI-authored record of this actual session, not a student quotation or approval.
Specify and every subsequent stage remain NOT EXECUTED by this session.

## Exact provenance and input

- Branch: `condition/spec-driven`.
- Starting HEAD: `bc397a95f10c71b65f0562921716f9a36d8224d2`; working copy was clean.
- Agent: Codex in VS Code; session metadata `source=vscode`, `originator=codex_vscode`.
- Session: `01a18a09-eeac-7901-b13e-f306d7ac8ce3`.
- Constitution turn: `01a18a15-c3b0-7ca2-b4dc-f2519686fbfa`.
- Model recorded in this turn's actual `turn_context`: `gpt-6.1-sol`.
  Model label displayed in the UI: UNKNOWN; no screenshot/UI inspection was performed.
- Session metadata CLI version: `0.164.0-alpha.11.1`. This is a current recorded fact,
  not a correction of SDD_005's earlier CLI-version observation.
- Current user request timestamp in the source session: `2026-10-29T23:54:05.094Z`.
- Live transcript source:
  `C:\Users\alikh\.codex\sessions\2026\10\30\rollout-2026-10-30T01-41-09-01a18a09-eeac-7901-b13e-f306d7ac8ce3.jsonl`.
- [Request as received](request-as-received.txt) is a byte-for-byte copy of the user attachment.
  The user's message identifies that pasted text as the request. It contains the SDD-006
  wrapper and the Constitution-only block; it is not itself a Constitution approval.
- [Exact Constitution input](constitution-input.txt) is the block beginning
  `$speckit-constitution`, extracted from that attachment without rewriting its text.

The agent read and followed `.agents/skills/speckit-constitution/SKILL.md` in this turn:
preflight, hook-file check, existing-template review, drafting, dependent synchronization,
Sync Impact Report and validation. This is genuine agent skill execution; no shell command
named Constitution, fabricated transcript, substitute toolkit or multi-stage runner was used.
Integration metadata declares official Spec Kit `0.12.11` and Codex/sh with separator `-`.
Official installation provenance is the existing SDD_005 record; this stage did not download
or independently reauthenticate upstream packages.

## Review artifacts and actual evidence

- [Draft Constitution](../../.specify/memory/constitution.md): version `0.1.0`.
- [Review diff](review.diff): actual Git diff of the six synchronized tracked files against
  the starting HEAD, with external diff/text conversion disabled.
- [Authoring payload](authoring-changes.json): the actual AI-authored document and guarded
  replacement data used in the successful write command. It is not a generated Spec or Plan.
- [Pre-edit state](pre-edit-state.json): actual starting revision, approved input byte hashes,
  original authoring-file hashes, session identity and cached freeze anchor.
- [Validation script](verify-constitution.ps1): local documentary/preservation checks only.
- `validation-001.json`: first actual execution of those checks, including captured Git
  commands/results. Later runs, if necessary, use new numbered files and preserve failures.
- `session-visible-records.jsonl`: selected original user/assistant commentary and tool
  call/result records from this turn, copied from the live session through a completed
  tool-result boundary. It excludes internal reasoning and system/developer instructions.
  This is a bounded evidence snapshot, not a claim to include the future final response.
- `transcript-export.json`: exact source, selected record boundaries, byte counts/hashes and
  export policy. The source session remains the reference for subsequent messages.
- `artifact-manifest.json`: SHA-256 inventory of this stage's review/evidence artifacts;
  it excludes itself and is not a Git commit or publication claim.

Files named above are created by actual commands in this stage; their existence and actual
results must be checked. A link or the planned name alone does not prove execution.

## Preservation and line-ending qualification

The three current HEAD blobs match SDD_005 exactly:

| Input | Expected and actual HEAD blob |
| --- | --- |
| MBR-B-002 | `61e4f31ea150c827c92ecf785677c56af45ce04f` |
| EP-B-001 | `8e45c7d20a8039491dcc91afc9e6c5cc0f270394` |
| SDD_002 verbatim approval | `d00a5bac308b182dcd5fc99f290089a9d15d26e5` |

Raw working-copy blob hashes differ because the existing checkout uses CRLF. The prior
read-only turn established `core.autocrlf=true`; this turn independently reproduced all
three expected blob IDs after CRLF-to-LF normalization in memory. The pre-edit raw SHA-256
values are preserved in `pre-edit-state.json`; post-edit checks compare those exact bytes.
No approved input was rewritten or normalized on disk. Historical AI_DRAFT and NOT EXECUTED
labels in the original documents remain intact; SDD_002 supplies the later exact approval.

The local freeze branch ref is absent. The cached remote-tracking ref
`refs/remotes/origin/freeze/v009-vibe-research-2026-10-29` was read as
`0b5a4a58631503c3a454ecc36d62b892c569ef14`. No fetch or remote query occurred, so this proves
the local cached anchor only, not live remote state. No Git ref was changed.

## Synchronization decisions

1. Replaced the stock Constitution with eight enforceable principles and governance gates.
   Initial draft `0.1.0` is not an amendment of a previously ratified version. Ratification
   date is intentionally `TODO(RATIFICATION_DATE)` pending explicit student approval.
2. Updated plan/spec templates with Condition B branch, review, traceability, scope and
   observable source/privacy/Guest/usability/evidence obligations. No architecture was chosen.
3. Replaced optional-test wording in the tasks template with required appropriate behavior
   verification and genuine failure/passing evidence; manual limitations remain explicit.
4. Clarified that a requirements checklist tick is neither a runtime result nor approval.
5. Added a current draft/evidence pointer to README without deleting its historical status.
6. Reviewed the generic Constitution initializer without changing it. Command templates and
   `docs/quickstart.md` are absent. `AGENTS.md` and all approved neutral documents are unchanged.

CORE F01-F15 remains PRIMARY N=15. E01-E07/EXT-AC01-07 remains SECONDARY N=7, with separate
denominators and PASS/FAIL/BLOCKED/NOT TESTED reporting. No application acceptance case was
executed or scored in this document-only stage. No runtime/security PASS is claimed.

## Actual failures and limitations retained

- The first sandboxed read failed before command execution with
  `helper_unknown_error: setup refresh had errors`. Approved execution outside that failing
  helper completed the scoped local reads/writes. No external service was contacted.
- One large read response was truncated by the tool-output limit; the complete Master was
  reread separately. No truncated source was treated as fully reviewed.
- A targeted `git show-ref --verify` failed because the local freeze ref is absent;
  `git for-each-ref` subsequently read the cached remote-tracking anchor without content access.
- Ordinary `.NET ReadAllLines` could not open the live session because another process held
  it. Read-only shared access succeeded. No session file was written or lock forcibly removed.
- Two `apply_patch` attempts failed context verification and made no changes. A subsequent
  encoding/hash/status check confirmed ordinary UTF-8 files and a clean working copy.
  The successful write used exact raw-hash preconditions and literal replacement-count checks.
- These are tooling/setup/document-authoring failures, not product defects or TDD RED evidence.
- This session performed no Vibe implementation/history inspection, application implementation,
  hooks, cloud/database/provider operations, paid actions, deployment, publication or merge.
  No new Git commit exists; changed paths are a working-copy draft at the starting HEAD.

## Human checkpoint

Review the complete Constitution and diff. The sole intentional deferred field is the real
ratification date, which cannot be filled before student approval. No Specify or later stage
may start from this draft alone. Suggested commit message, only if separately authorized:

`docs: draft Nordljud Constitution v0.1.0 and synchronize templates`
