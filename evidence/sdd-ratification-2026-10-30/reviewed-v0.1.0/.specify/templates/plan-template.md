# Implementation Plan: [FEATURE]

**Branch**: `condition/spec-driven` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Read `.specify/memory/constitution.md` and record its version and human approval evidence.
An unratified draft blocks progression; this template does not authorize running Plan.
Feature directories do not authorize creating or switching branches.

For each gate, record PASS/FAIL/BLOCKED/NOT TESTED with evidence or a named open action:

- **I-II — Source:** frozen source blob IDs, four levels/456 senses each/two `sticka`
  meanings, missing-field behavior, educational limitations and any media rights.
- **III — Ownership:** planned server enforcement, authorized two-account negative cases,
  minimal test data and no elevated browser secrets; planned checks are not runtime PASS.
- **IV — Guest/usability:** clarified local-state boundaries, no account mixing, keyboard,
  narrow viewport, speech/provider fallbacks and honest answer/completion credit.
- **V — Verification:** acceptance mapping, real failing/passing runs, exact versions/SHA,
  reproducible procedures and explicit limitations for unavailable/manual checks.
- **VI — Isolation:** neutral inputs only, Condition B branch/state separation, protected
  refs unchanged and disclosed chronology/prior-learning/agent differences.
- **VII — Evaluation:** CORE F01-F15 N=15; separately versioned E01-E07/EXT-AC01-07 N=7;
  fixed separate denominators and all four result statuses.
- **VIII — Authorization:** actual stage provenance, required student reviews, primary-first
  order and no inferred permission for hooks, services, spending or deployment.

Recheck these gates after design. Requirements for future runtime tests remain NOT TESTED
until executed; documentary plan alignment alone cannot establish application acceptance.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

This table does not waive Constitution obligations. A governance conflict requires an explicit
reviewed amendment; immutable inputs, truthful evidence, ownership, method isolation and the
fixed primary benchmark cannot be bypassed by recording a complexity rationale.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
