# Nordljud SDD technical publication index

This package publishes technical artifacts from the existing independent SDD work. It does not execute a new Spec Kit stage, change application behavior, rerun tests or claim full CORE completion. No report, private question, prompt, full conversation or session transcript is included in this package.

## Current acceptance and tested provenance

- Current ledger: [F01–F15, N=15](../../evaluation/sdd-core-results.json): **8 PASS, 0 FAIL, 3 BLOCKED, 4 NOT TESTED**.
- [Existing focused-verification receipt](verification/verification-receipt.json), [actual commands/results](verification/commands.jsonl), [browser observations](verification/actual-browser-observations.json), and [historical Converge handoff](verification/convergence-handoff.json).
- Tested commit: `9d2f273d55a83b15863604b75174c689bb7a0c05`, dirty documentary state `8207d28704f3b6f3ba6549f6cd8240ad1946614f10b0c5e3d9894e7f3d4272d0`; runtime artifact digest `78aaeaaa341140524ddbe20cc50f8a40386cd03949a244331f1cf86b3b0495e7`.
- Existing observations: 86 offline tests, 56 Edge checks, typecheck and build passed; no live account/provider/RLS tests. Native speech invocation does not prove audible quality. Test totals are not acceptance-case counts.
- The [earlier ledger](historical/evaluation/sdd-core-results.json), [earlier review](historical/docs/final-core-review.md), [earlier limitations](historical/docs/evaluation-limitations.md), and [earlier README](historical/README.md) are exact historical working-byte copies. Their nine-PASS assessment is superseded for current full-mapped reporting; F08 Guest subchecks still pass but account-transition/no-import proof is missing.

## Documentation and review provenance

The canonical feature is [specs/001-nordljud-core](../../specs/001-nordljud-core/). Approved specification v0.4.0, plan v0.1.1, quickstart v0.1.2 and tasks v0.1.1 retain their existing bytes. Official Converge previously appended T083–T094 and did not converge. Existing task checkboxes are unchanged by publication.

The stage-records directory contains selected technical fields and approval bindings, with SHA-256 bindings to unchanged local originals. Original generation-time PENDING/draft labels remain historical. Later approval receipts and implementation authority do not rewrite those earlier records.

Approved/reviewed document snapshots remain at their existing evidence paths in sdd-clarify-core-2026-10-30, sdd-plan-core-2026-10-30, sdd-checklist-core-2026-10-30, sdd-tasks-core-2026-10-30 and sdd-core-task-clarifications-2026-10-30. The original artifact manifests are preserved as historical inventories. Some entries refer to intentionally omitted local-only mixed records; use [this publication manifest](artifact-manifest.json) for the actual published subset. No assertion is made that all original evidence files are publicly available.

Snapshot SHA-256 values bind raw working bytes. Explicit staging uses command-local core.autocrlf=false so selected snapshot bytes are preserved in Git; no global line-ending setting or protected file is changed. Historical approved input blobs retain their existing LF/CRLF checkout qualification.

## Publication boundary

[Deployment exclusion review](deployment-exclusion-review.json) records the supported exact-branch Vercel exclusion. [Privacy review](privacy-review.json) records the outbound audit and selection method. Vibe, main, production, provider-wide settings, protected inputs, Constitution, templates and previous evidence are unchanged. The Vibe freeze remains `0b5a4a58631503c3a454ecc36d62b892c569ef14`.

Conversation-bearing originals, authoring/session exports, report drafts, personal inputs and operational budget records remain local and are not selected for staging. Original technical execution timestamps and failures remain historical; publication preparation is not measured implementation/test execution.
