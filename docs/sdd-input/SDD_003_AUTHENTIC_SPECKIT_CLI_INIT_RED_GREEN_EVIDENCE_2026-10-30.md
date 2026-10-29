# SDD-003 — Genuine official GitHub Spec Kit CLI bootstrap: RED → GREEN

**Date:** 2026-10-30 Europe/Helsinki (GitHub Actions timestamps in UTC, mostly 2026-10-29 evening)
**Status:** **OFFICIAL CLI INSTALLED AND PROJECT INITIALIZED — VERIFIED**; **CONSTITUTION AGENT STEP NOT EXECUTED**; no SDD application source implemented.
**Condition:** B, independent `condition/spec-driven`; original common implementation baseline `90e4f6db3b6df34dee45fb14e6c3fcb4d5c255bb`.
**Student original explicit approval:** `docs/sdd-input/SDD_002_VERBATIM_APPROVAL_BEFORE_SPECKIT_2026-10-30.md`, committed first in `3bc1d19f650fa28f4fbf9b479e42fa4e94e66859`.

## 1. Approved neutral inputs were copied unmodified, before bootstrap
- `docs/sdd-input/MBR-B-002_APPROVED_CORE_MASTER.md` exact Git blob `61e4f31ea150c827c92ecf785677c56af45ce04f`, source approved MBR-B-002.
- `docs/sdd-input/EP-B-001_APPROVED_SECONDARY_EXTENSION.md` exact Git blob `8e45c7d20a8039491dcc91afc9e6c5cc0f270394`, source approved EP-B-001.
- Though the embedded historical status in these deliberately byte-identical files says AI_DRAFT, the *subsequent* verbatim human approval is separately preserved and dated in SDD-002; do not edit the approved file and lose the content hash merely to change historical status.
- These documents contain the allowed WHAT/WHY and source constraints. **No Vibe source, tests, SQL, screenshots or solutions** were brought into the independent SDD branch.

## 2. Actual official CLI execution, first attempt: RED
- Workflow created on `condition/spec-driven`: `.github/workflows/sdd-spec-kit-bootstrap.yml`; isolated one-time push path trigger. No Production deployment or cloud service change.
- [GitHub Actions run 40966566750 — genuine RED](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40966566750).
- Installed **official `specify-cli==0.12.11` from PyPI** with `uv tool install specify-cli==0.12.11`. `specify version` genuinely reported **CLI 0.12.11**, Python 3.12.3, Linux x86_64; tool installation PASSED.
- The intended command `specify init --here --force --non-interactive --ignore-agent-tools --integration copilot --script sh` FAILED **exit 2**: installed CLI 0.12.11 does not recognize the `--non-interactive` option, even though that option appears in newer upstream docs. No actual project init occurred and no generated files were committed in RED run.
- The failure and run URL are retained unchanged; no fictional GREEN is assigned to RED.

## 3. Narrow correction and second attempt: GREEN
- Corrected only the unsupported CLI flag and robustly staged only existing official-generated directories, in workflow update commit `1c23d2dcb39f3ebf71cc629fda2b13b2d0a6d85b`. Existing approved Master and extension untouched.
- [GitHub Actions run 40966668593 — genuine GREEN](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40966668593).
- `uv tool install specify-cli==0.12.11` PASS. `specify version` PASS. **`specify init --here --force --ignore-agent-tools --integration copilot --script sh` PASS**, script emitted `OFFICIAL_SPEC_KIT_INIT_EXIT_ZERO`.
- CLI reported installing shared infrastructure (.specify templates, Bash scripts, integration manifests and the official SDD workflow), copying constitution template, and Copilot agent/prompt registration.
- Real generated-file commit **`bb0adc9bf23413b938a2c532efdca69ff8f54eae`** on independent `condition/spec-driven`, authenticated via GitHub Actions logs and independent GitHub commit fetch; GitHub shows **37 official generated files**. Sample:
  - `.specify/integration.json` declares version `0.12.11`, integration `copilot`, separator `.`.
  - `.specify/memory/constitution.md` currently has unresolved placeholders, e.g. `[PROJECT_NAME]` and `[PRINCIPLE_1_NAME]`: this is the **stock template**, NOT a student-approved completed project Constitution.
  - `.specify/templates/{spec,plan,tasks,checklist,constitution}-template.md`; `.specify/scripts/bash/` installation.
  - `.github/agents/speckit.constitution.agent.md`, other official Copilot agents and `.github/prompts/speckit.constitution.prompt.md` installed.
- GitHub Actions workflow job for run 40966668593 concluded **success**, all install/init/commit steps success.
- Upstream CLI WARNED that its **Copilot legacy markdown mode is deprecated**; this pinned release remains an official supported integration, but invocation syntax is `/speckit.constitution` (period), not the newer Copilot skills-mode `/speckit-constitution` (hyphen). Any later switch to `--skills` should be separately recorded, not silently represented as already done.

## 4. Exact current stop boundary and next verified action
- **COMPLETED:** student approvals; approved input provenance copied byte-for-byte; real official Spec Kit CLI installation, `specify version`, `specify init`, generated files committed on isolated SDD branch.
- **NOT STARTED:** interactive supported coding agent invocation of `/speckit.constitution`; project-specific Constitution creation; `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, any app implementation, tests, SDD deployment. This assistant did NOT claim to operate a GitHub Copilot interactive session.
- To preserve academic methodology, the Constitution command should run in a supported coding-agent environment using the actual installed `.github/agents/speckit.constitution.agent.md` prompt, neutral original input and approved MBR/EP, with actual transcript and review. **Do not relabel hand-written Constitution text or empty CLI template as agent-produced official output.**
- Preserve original F01–F15 matrix (primary) and evaluate EP-B-001 as independent secondary scope with EXT-AC01–07; avoid copying Vibe technical solutions.
- No edits to shared neutral corpus, Vibe branches, Supabase Auth/Production, live user data or public Vercel aliases, and no paid upgrade.
