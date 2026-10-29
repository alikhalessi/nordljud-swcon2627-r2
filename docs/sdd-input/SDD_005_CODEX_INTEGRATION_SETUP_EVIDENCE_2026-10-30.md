# SDD-005 — Codex integration setup evidence

Date: 2026-10-30 Europe/Helsinki
Status: INTEGRATION VERIFIED; VS CODE AGENT PREFLIGHT PENDING; CONSTITUTION NOT EXECUTED.
This is an AI-authored setup record based on actual command and connector results, not a student quotation or an agent-stage completion claim.

## Scope and authorization

The user selected OpenAI Codex for Nordljud Condition B and requested migration of the official Spec Kit integration on `condition/spec-driven`, preserving approved inputs, verbatim approvals, research evidence and Vibe freeze. No paid services, production, Supabase changes or Constitution execution are part of this setup.

Baseline SDD commit: `46e272c2aa60ecff3d6a6a3ccf94ecf4c46f30fd`.
The VS Code checkout at `E:\DevStorage\nordljud-swcon2627-r2` was clean on `main`; it was read but not modified.
Migration ran in an isolated working copy under this chat's `work/nordljud-sdd-integration` directory.

## Genuine tools and source

- Git: `2.47.1.windows.1`; uv: `0.11.26`; Python used by Spec Kit: `3.12.10`.
- Official source: [github/spec-kit v0.12.11](https://github.com/github/spec-kit/tree/v0.12.11).
- `uvx --from git+https://github.com/github/spec-kit.git@v0.12.11 specify version` actually downloaded/built the official source. CLI output reported `0.12.11`, Windows AMD64.
- Installed distribution's `direct_url.json` records commit `e802a7dd52a6eceba9403cbbf40e60dced043238` and requested revision `v0.12.11`.
- The cached official executable was invoked directly for the migration after an offline uvx resolution attempt failed. No handwritten substitute generated the integration.
- Original Copilot initialization remains documented by [Actions run 40966668593](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40966668593), conclusion `success`; initialization is distinct from agent execution.

## Actual migration commands and results

The PowerShell variable `$taskSpecify` pointed to the official cached `Scripts/specify.exe` created by uvx. Exact path and selected failed attempts are recorded in `evidence/sdd-codex-setup-2026-10-30/commands-and-results.txt`.

1. `& $taskSpecify integration status --json`: exit 1, status `error`, Copilot; one missing managed file, `.vscode/settings.json`. It was already absent from the committed tree. The original bootstrap log shows it untracked, but its commit stage omitted `.vscode/`.
2. `& $taskSpecify integration switch codex --script sh`: exit 0. Removed 20 unmodified Copilot command/prompt files; installed Codex.
3. `& $taskSpecify integration status --json`: exit 0, status `ok`, installed/default integration `codex`, target alignment `codex`, 10 managed Codex skills, 0 missing, 0 modified, 0 invalid paths, no findings.
4. Git Bash `-n` syntax checks of all five `.specify/scripts/bash/*.sh` scripts: PASS. Scripts were parsed, not executed.

The official switch updated integration metadata, replaced Copilot files with `.agents/skills/speckit-*/SKILL.md`, and changed references in two shared scripts and three templates from dotted to hyphenated command names. It did not author a Constitution. It was not `init --force`.

## Access verification and limits

- GitHub connector successfully read the private repository; repository permissions report pull/push access. This proves connector access, not the student's VS Code Git credential state.
- Codex CLI `codex --version`: `codex-cli 0.165.0-alpha.1.2`.
- `codex login status`: exit 0, `Logged in using ChatGPT`. Non-fatal local temporary-directory/PATH-alias permission warnings were emitted and retained.
- VS Code extension inventory includes `openai.chatgpt@26.51021.22027`; the extension directory independently exists. The inventory command emitted local permission warnings. Installation and cached authentication do not prove that this VS Code workspace has completed a model turn.
- No Codex model inference smoke test or Constitution invocation was started by this setup. The student should perform the read-only preflight in SDD-006 in the Codex sidebar.
- CLI and IDE share cached login according to [official authentication documentation](https://learn.chatgpt.com/docs/auth). Use existing ChatGPT access; do not create API billing, purchase credits or change subscriptions for this task. If access is unavailable, retain PENDING and report the actual error.

## Exact preservation anchors

| Existing artifact | Unchanged Git blob SHA |
| --- | --- |
| MBR-B-002 | `61e4f31ea150c827c92ecf785677c56af45ce04f` |
| EP-B-001 | `8e45c7d20a8039491dcc91afc9e6c5cc0f270394` |
| Verbatim pre-execution approval | `d00a5bac308b182dcd5fc99f290089a9d15d26e5` |
| Constitution, still stock template | `a4670ff46919b276a4c9663b4ca51830108fcfc0` |
| Original bootstrap workflow | `51b621e5d8088a9123cbe1903767b0b2a61f8832` |

Every pre-existing file under `docs/`, `evidence/`, `shared-content/`, `evaluation/`, plus README, .gitignore, Constitution and bootstrap workflow, is checked byte-for-byte against the baseline Git blobs. See `preservation-verification.json` and the complete baseline tree manifest in the evidence directory. Existing historical labels and Persian approvals remain verbatim.

Frozen branch `freeze/v009-vibe-research-2026-10-29` must remain at `0b5a4a58631503c3a454ecc36d62b892c569ef14`. Main, Vibe, freeze and research refs are recorded before setup and must be unchanged after publishing. No Vibe application content was opened or copied. No production, deployment, database, service setting or billing operation was performed.

## Stage and history integrity

- SDD-004 remains the historical, unexecuted Copilot proposal. SDD-006 supersedes its integration-specific invocation for future Codex execution; it does not amend the approved product inputs.
- [Issue #5](https://github.com/alikhalessi/nordljud-swcon2627-r2/issues/5) still contains Copilot-specific instructions and an incorrectly checked session-evidence item. No genuine Constitution session is established by that checkbox. The issue was not edited or commented on during setup.
- Constitution remains NOT EXECUTED and NOT APPROVED. Spec Kit installation, a successful migration and login status do not satisfy that gate.
- Do not run the bundled multi-stage workflow, Specify, Plan, Tasks or Implement before the Constitution has been genuinely generated in Codex and reviewed/approved by the student.
- The existing one-time bootstrap workflow was preserved exactly. Its push trigger is limited to edits of its own workflow path, which this setup does not change.

## Pinned documentation

- [Integration switch and skills invocation](https://github.com/github/spec-kit/blob/v0.12.11/docs/reference/integrations.md)
- [Official Codex implementation](https://github.com/github/spec-kit/blob/v0.12.11/src/specify_cli/integrations/codex/__init__.py)
- [Official migration implementation](https://github.com/github/spec-kit/blob/v0.12.11/src/specify_cli/integrations/_migrate_commands.py)
- [VS Code Codex documentation](https://learn.chatgpt.com/docs/codex/ide)

Remote publication commit and protected-ref recheck are reported separately after the new commit exists, avoiding a self-referential commit claim in this file.

Formatting check: default git diff --check reported Windows CRLF endings in three official-generated JSON files as trailing whitespace. Their authentic bytes were preserved. git -c core.whitespace=cr-at-eol diff --check passed.

Publication preparation failure: automatic approval review rejected the first create-tree request because a stale file-enumeration binding produced an empty current-file list and null SHA entries for all baseline files. No GitHub tree, commit or ref update was applied by that rejected request. The replacement is rebuilt from a fresh self-contained scan and guarded by exact protected-file hashes and explicit change/deletion allowlists before retry.
