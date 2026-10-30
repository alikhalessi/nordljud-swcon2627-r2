# US1 source and lexicon observations

Actual Windows Edge 156.0.4314.50 runs at both D01 sizes retrieved and rendered all four 456-record collections (455 spellings each). Exact search preserves both sticka meanings. Source-adapter tests compare all unchanged raw fields and frozen blob identities; destination-level examples and flags are independently observed. Invalid/duplicate/unexpected queries return safe 400 responses.

Full browser evidence: T079; additional public-query and source scenarios: T041. Each tested application session fetched each selected lexicon once, including a repeated A2 visit; searching/selecting issued no per-entry requests. Unavailable/cancelled source reads recover only through explicit action. Missing/ambiguous counterparts use bounded synthetic unit fixtures without changing sources.

`derived-observations.json` retains actual millisecond samples and method. Each run uses a fresh browser context, one sample per level/profile; repeated A2 visits are warm application-cache visits. PerformanceResourceTiming measures source requests; search/clear/render samples include automation/assertion overhead. These are supplementary observations, not thresholds, stable benchmarks or primary cases.
