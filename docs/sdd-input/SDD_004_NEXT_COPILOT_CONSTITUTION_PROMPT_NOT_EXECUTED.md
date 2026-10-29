# SDD-004 — Exact first interactive Constitution invocation for installed official Copilot integration

**Date:** 2026-10-30 Europe/Helsinki  
**Status:** **AGENT_INPUT_READY / NOT EXECUTED / NO CONSTITUTION APPROVAL YET**  
**Official integration:** `specify-cli==0.12.11`; `.specify/integration.json` declares `copilot` with `invoke_separator="."`. This is the **Copilot commands layout**. In **VS Code Copilot Chat**, the prompt file can expose `/speckit.constitution`; in **Copilot CLI**, choose the installed `speckit.constitution` custom agent through the `/agent` picker (or select `--agent speckit.constitution` when invoking the CLI), then supply the project instructions. Do **not** treat the old dotted shorthand as an executable shell command, and do not confuse it with `/speckit-constitution` in the different skills layout. See [official Copilot integration documentation](https://github.github.com/spec-kit/integrations/copilot.html).
**Approved input:** `docs/sdd-input/MBR-B-002_APPROVED_CORE_MASTER.md`, `docs/sdd-input/EP-B-001_APPROVED_SECONDARY_EXTENSION.md`; preserve original F01–F15 with separate EXT-AC01–07.

## Agent-facing prompt — user-authorized project requirements, AI-authored execution wrapper

```text
/speckit.constitution
Establish the governing Constitution for Nordljud Condition B using the officially installed GitHub Spec Kit project files and the independently approved product inputs. Work only on the existing condition/spec-driven branch, which originated from the original common baseline. Read docs/PROJECT_CHARTER_PC-001.md, shared-content/PRODUCT_BRIEF.md, shared-content/SOURCE_MANIFEST.md, evaluation/ACCEPTANCE_MATRIX.md, docs/EXPERIMENT_PROTOCOL.md, docs/sdd-input/MBR-B-002_APPROVED_CORE_MASTER.md and docs/sdd-input/EP-B-001_APPROVED_SECONDARY_EXTENSION.md. Do not read any Vibe implementation, Vibe-ledger, source, tests, design, SQL, fixes, retrospective report or screenshots; the two coding conditions must be independent.

Define enforceable principles governing: precise source/data fidelity (four levels, exactly 456 senses each, two separate sticka meanings, no invented forms/sentences); privacy and server-enforced account ownership; explicit human authorization for paid/external provider/production actions; no elevated browser keys; Guest accessibility; usable keyboard and mobile navigation; reproducible tests with real failure/RED evidence; exact-sha traceability; explicit PASS/FAIL/BLOCKED/NOT TESTED evidence; no false runtime/security conclusions; appropriate human review checkpoints; keep original F01-F15 PRIMARY and extended E01-E07/EXT-AC01-07 SECONDARY with separate denominators; record unavoidable order and prior-learning effects.

Using the real installed Spec Kit Constitution agent instructions and .specify/memory/constitution.md template, replace all unresolved placeholders, update the genuine constitution with adoption and amendment rules, and validate it against the original shared constraints. Do not create product source code or database migrations. Preserve a genuine command/transcript/evidence record with the agent/tool identity and exact commit. Show the completed Constitution to the student for review and wait for acceptance before invoking /speckit.specify.
```

**Execution tracking:** [GitHub Issue #5](https://github.com/alikhalessi/nordljud-swcon2627-r2/issues/5) contains the branch-isolated genuine Copilot Constitution task. Issue creation does not prove Copilot began. Never auto-assign a billable agent without separately verified access and permission; capture real session/PR output.

## Academic honesty
This file is an **AI-authored proposed Copilot command**, prepared from already user-approved objectives. It is not a command run, agent transcript, generated Constitution or a student-authored direct quote. The official CLI init was run and verified in GitHub Actions 40966668593, but its installed `.specify/memory/constitution.md` currently remains the **template**. Do not label Constitution PASS until the agent actually creates and verifies the project-specific text.
