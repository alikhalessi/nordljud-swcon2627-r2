# CORE Readiness — Author Documentary Assessment

Date: 2026-10-30 Europe/Helsinki. Basis: approved spec v0.4.0, Plan v0.1.0 and its design documents.

This companion note records an author reading of requirements, not an application test or a separate Spec Kit stage. The generated checklist keeps all 35 markers unchecked for student review. Evidence supports 33 questions; two wording/completeness gaps need resolution. This is not a 33/35 software score or human sign-off.

| Item | Author assessment | Written basis |
| --- | --- | --- |
| CHK001 | Supported | The specification defines all four levels, 456 senses per level, unchanged source content and missing-field obligations. |
| CHK002 | Supported | The learning capabilities and their supported/unavailable outcomes have distinct requirements and scenarios. |
| CHK003 | Supported | The approved retention boundaries distinguish Guest preferences/flags, transient Guest completion/results and owned account state. |
| CHK004 | Supported | PRIMARY N=15, separate SECONDARY N=7 and supplementary FR-020/FR-021 remain explicitly separated. |
| CHK005 | Supported | Supported ownership operations, safe identity changes, secret exclusion and non-disclosing failures are documented. |
| CHK006 | Supported | CLARIFY-C01=A and FR-020 define explicit mark/unmark and reject automatic Studied changes. |
| CHK007 | Supported | The same meaning may remain selected across levels while the destination retains its own independent saved flags. |
| CHK008 | Supported | Completion and correctness remain separate; reveal receives no credit and fresh retries are distinguished from rewriting a revealed attempt. |
| CHK009 | Supported | The interaction/state contracts distinguish confirmation of persistence from optimistic feedback, conflict or dependency failure; bounded waiting is tracked separately in G01. |
| CHK010 | Supported | B/B/B, manual Studied and level-specific flags agree across the specification and design documents. |
| CHK011 | Supported | The actual PLAN-Q01=A answer specifies this-browser-only sign-out, independent device sessions and preserved progress. |
| CHK012 | Supported | Field-level availability preserves nonblank examples without inventing absent form words or answer keys. |
| CHK013 | Supported | The documents distinguish four source levels, 456 senses versus 455 spellings and the two independent sticka meanings. |
| CHK014 | Supported | Original functional requirements map to scenarios/success criteria; the new flag rules map to supplementary US1.7/US1.8 without changing original case wording. |
| CHK015 | Supported | The records require actual source/tested identity, expected/observed outcomes and PASS/FAIL/BLOCKED/NOT TESTED totals summing to 15. |
| CHK016 | Supported | The plan defines bounded source-data scope and later observations while explicitly declining an invented SLA or benchmark expansion. |
| CHK017 | Supported | D01 defines the two Edge/Windows CSS-pixel viewports, keyboard observations, actual versions/audio evidence and stated coverage limits. |
| CHK018 | Supported | Source exploration, missions, practice, Guest work and private account progress have actor-specific scenarios. |
| CHK019 | Supported | The specification states honest empty/unavailable outcomes and preserves supported learning activities. |
| CHK020 | Supported | Authentication exceptions and owner-boundary failures have non-disclosing outcomes and no fake valid session. |
| CHK021 | Supported | The design preserves intent for explicit same-owner retry, clears obsolete private views and prohibits cross-identity replay or import. |
| CHK022 | Supported | Separate meanings and per-level flags are explicit; counterpart failure clears only active selection and retains existing saved records. |
| CHK023 | Supported | Guest storage exceptions retain existing data and permit truthful session-only operation rather than an unrequested reset. |
| CHK024 | Needs clarification | States, failures and explicit retry are documented, but an operation that remains pending or commits after interruption lacks a defined bound/cancellation/uncertain-result resolution policy. |
| CHK025 | Needs clarification | Runtime write failures and external setup authorization are documented, but the future schema-preparation failure/rollback authority and existing-data preservation procedure are not explicitly stated. |
| CHK026 | Supported | The essential-flow requirements include login and both approved viewports, without inferring complete coverage when provider-dependent observations are absent. |
| CHK027 | Supported | The source documents specify ownership, safe identity transitions, secret exclusion and privacy-preserving failure outcomes. |
| CHK028 | Supported | The documents prohibit unsupported certification, token/credential disclosure and substitution of document/build evidence for runtime results. |
| CHK029 | Supported | Unrelated fields are preserved, saved confirmation is explicit, conflicts require review/retry and no global click-order or power-loss guarantee is asserted. |
| CHK030 | Supported | D02 names the unavailable real environment, allowed recipients and actual provider observations; Guest fallback does not establish auth PASS. |
| CHK031 | Supported | D03 remains an independent publication/accuracy gate despite student approval of the feature documents. |
| CHK032 | Supported | Proposed versions and current local versions are separate; installation, lockfile, build and real test validation are explicitly future work. |
| CHK033 | Supported | Dated hash-bound approval receipts supersede historical pending labels without rewriting the reviewed artifacts or earlier records. |
| CHK034 | Supported | The companion assessment names the two documentation gaps for resolution before Tasks and keeps D02/D03 as separate operational/publication prerequisites. |
| CHK035 | Supported | The approved workflow requires separate later authorization and keeps requirements review, runtime acceptance and publication decisions distinct. |

## Findings requiring review

### G01 — CHK024

Pending/saving/error states and same-owner retry are written, but automatic operations have no explicit bounded-wait/cancellation policy or resolution for a late/uncertain save outcome.

Independent implementers could disagree about indefinite pending feedback or whether a retry follows an operation that may already have committed.

Proposed resolution direction (not adopted): Document bounded pending/cancellation and late-outcome reconciliation requirements for automatic source retrieval/saves, preserving intent and avoiding a new primary performance benchmark. Do not apply this mechanically to interactive provider consent.

Disposition: Resolve in a new reviewable documentation revision before Tasks; not waived by this author assessment.

### G02 — CHK025

Guest/account write failures and separate D02 setup authorization are written; the future schema-preparation failure procedure, existing-data preservation and rollback/reset authority are not explicit.

A later implementer lacks a clear requirement to stop and preserve data rather than attempt an unapproved destructive recovery after setup failure.

Proposed resolution direction (not adopted): Document stop/preserve/report and separately authorized recovery/rollback boundaries for future independent schema preparation. Do not execute or draft migrations during Checklist.

Disposition: Resolve in a new reviewable documentation revision before Tasks; no schema or service action is authorized.

## Scope and stopping point

D02/D03 and package/runtime validation are explicit external prerequisites, not hidden successful tests or automatically missing requirement text. No approved source/Plan file is changed here. No fix is adopted by this assessment. Preserve the historical Plan approval while reviewing a later addendum/revision if the findings are accepted.

The Checklist stage has generated its requested artifact. Requirements readiness remains under human review; do not start Tasks while the two documented gaps lack an approved disposition. No implementation, service configuration, application test, commit or push is authorized or performed.
