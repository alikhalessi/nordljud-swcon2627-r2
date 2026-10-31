# Nordljud 2.0 — SWCON2627 (Round 2)

## Current Condition B technical status — 2026-10-31

The independent SDD branch contains a runnable local Guest learning increment and approved specification/design/task documents. CORE is incomplete: **8 PASS, 0 FAIL, 3 BLOCKED, 4 NOT TESTED; F01–F15, N=15**. Account/cloud/RLS work remains incomplete or unavailable. The older nine-PASS checkpoint is historical.

- [Current qualified acceptance ledger](evaluation/sdd-core-results.json)
- [Current review and limitations](docs/final-core-review.md)
- [Technical publication and evidence index](evidence/sdd-technical-publication-2026-10-31/README.md)
- [Local reproduction](specs/001-nordljud-core/quickstart.md)

Publication is a documentation/configuration change; it does not rerun tests, complete implementation or authorize deployment. Automatic Vercel deployments are disabled for the exact `condition/spec-driven` branch through its versioned `vercel.json`; no other branch or project-wide setting is changed. Reports and conversation-bearing originals remain local.

## Preserved historical baseline and governance notes


**Status:** PRE-IMPLEMENTATION / shared baseline preparation, 28 October 2026. No Condition A or B application code has been implemented.

## Condition B governance — 2026-10-30

The opening status is the preserved historical shared-baseline label. On
`condition/spec-driven`, the [Constitution](.specify/memory/constitution.md) is student-ratified
version 1.0.0 as of 2026-10-30. The reviewed 0.1.0 draft was generated through the installed
official Codex Constitution skill; [original session evidence](evidence/sdd-constitution-2026-10-30/README.md)
retains that execution history. [Ratification evidence](evidence/sdd-ratification-2026-10-30/README.md)
preserves the exact student approval and reviewed files. No Specify or later stage is
authorized or executed by this ratification. Follow [AGENTS.md](AGENTS.md); preserve the
approved inputs and keep CORE N=15 and EXTENDED N=7 results separate.

This **private** Åbo Akademi Software Construction course project compares exactly two approaches:
- **A — Vibe Coding:** natural student-approved prompts, iterative observation and correction.
- **B — Specification-Driven Development (SDD):** official GitHub Spec Kit, requirements-first agent workflow, implementation and convergence.

The previous [Nordljud pilot](https://github.com/alikhalessi/nordljud-software-construction) is **not** this project's implementation. Its preexisting Swedish teaching JSON and mission-seed *data* may be copied with explicit provenance; previous React, Next.js, auth, state, CSS and tests must NOT be transplanted as fresh work.

## Where to start

- [Approved charter](docs/PROJECT_CHARTER_PC-001.md)
- [Shared product brief](shared-content/PRODUCT_BRIEF.md)
- [Dataset provenance](shared-content/SOURCE_MANIFEST.md)
- [Experiment protocol](docs/EXPERIMENT_PROTOCOL.md)
- [Student-reviewed prompt protocol](docs/PROMPT_APPROVAL_PROTOCOL.md)
- [Independent common acceptance matrix](evaluation/ACCEPTANCE_MATRIX.md)
- [35-mark report evidence map](docs/ASSESSMENT_MATRIX.md)
- [Submission checklist](docs/SUBMISSION_CHECKLIST.md)

## Branching

The `main` branch is the shared baseline and research/evidence home. The branches `condition/vibe` and `condition/spec-driven` begin at **exactly the same baseline commit**, and are independent implementation roots. No God Mode in Round 2. Neither implementation should consume the other's source.

This is a second, informed iteration, not an independent blind or randomized comparison. Final grades are awarded by the instructor; this repository merely aims to provide authentic reviewable evidence.
