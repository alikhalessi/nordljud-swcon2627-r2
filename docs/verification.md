# Verification and provenance discipline

`evidence/sdd-core-implementation/Tnnn.jsonl` contains append-only actual command argv, UTC start/end, stdout/stderr and exit code. Technical cross-references are explicitly labelled review records rather than invented executions. A RED intent is not enough: behavior assertions against loadable inert seams established the initial failures. Build/import/type errors remain ordinary setup/integration failures.

Initial domain/behavior tests were batched; later regression extensions and fixes retain their real chronology. Foundation checkpoint prose was written after execution, so T016 remains partial for its requested before-story document timing. No retrospective phase-order claim is made. Source, speech and field-availability code followed captured failures; subsequent keyboard, late-state and ledger defects were reproduced before correction.

The tested working tree is dirty relative to its base. `tested-artifacts.json` binds actual runtime/test/config/source bytes; the ledger records that digest and never calls the base commit a clean tested build. A later local commit does not rewrite the original run provenance. Standard early Playwright temporary trace folders were overwritten by subsequent runs; retained stdout/stderr remains raw evidence, while only the named final screenshots are permanent here.

The derived ledger keeps all F01–F15. Unit/mocked SDK tests, setup gates, checklists and ledger integrity are not live auth/RLS proof. Supplementary flags, timing, recovery and injected faults remain outside the primary denominator.
