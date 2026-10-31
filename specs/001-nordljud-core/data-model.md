# Nordljud CORE — Conceptual Data Model

Status: Phase 1 design proposal, Plan v0.1.0, 2026-10-30. No SQL, migration, database or runtime model implementation is created here.
Authority: [approved spec](spec.md), [research](research.md), [interface contracts](contracts/core-http.md).

## 1. Frozen source entities

| Entity | Fields / identity | Invariants |
| --- | --- | --- |
| Source manifest | Exact approved blob identities for A2/B1/B2/C1 and mission seeds; a deterministic combined manifest digest | Defines the dataset revision used by adapters and state namespaces; a mismatch is an error, not permission to repair source |
| Level | A2, B1, B2, C1, derived from source filename | Each has exactly 456 rows; source `frequency` is independent metadata |
| Source sense | `senseId = level:ordinal` (four zero-padded ordinal digits), raw `v`, `meaning`, `frequency`, `page`, `forms` | Ordinal 0–455 in frozen array; 455 written spellings; distinct `sticka` at 361/362 never merge |
| Form | One of Inf/Imp/Pres/Pret/Sup; stored `word`, `sv`, `en`; derived availability per field | Preserve strings exactly; blank/whitespace-only or editorial em dash is unavailable; one missing field does not erase other fields |
| Semantic counterpart | Unique exact raw `(v, meaning)` match in a target level | Zero/multiple candidates means unavailable; never fallback by spelling or change source |
| Mission | Frozen seed ID, level, title, learner goal, source verb/ordinal, allowed form keys | Four representative missions only; no daily schedule, new curriculum or fabricated language |
| Check definition | Mission/check kind, source field references, valid distinct choices and source-backed correct choice | One comprehension and one verb-form check where required fields are usable; missing inputs produce unavailable status |

Current source pairs and order match across levels. This structural correspondence is not linguistic certification. State never propagates merely because two rows are semantic counterparts.

## 2. Guest state

Native IndexedDB namespace: Condition B + CORE + schema version + source-manifest digest. This isolates the independent application without inspecting or reusing Vibe storage. Only these records persist:

| Record | Key / fields | Transitions |
| --- | --- | --- |
| Guest preferences | One preferences key; selected level and selected sense or null | Explicit selection/level change persists after transaction completion; missing counterpart clears selection as approved |
| Guest sense flags | Level-specific sense ID; favorite Boolean; studied Boolean | Explicit favorite/unfavorite or mark/unmark Studied; new rows default false/false; no automatic Studied from viewing/practice/completion |

Mission completion, active attempts and latest practice feedback stay in memory and reset on refresh. Browser application-data clearing removes Guest records. No Guest import, account merge, extra clearing UI or retention timer is added.

Within a readwrite transaction, read the current row, patch only the intended field and wait for transaction completion. Unrelated flag edits survive; overlapping transactions serialize. Same-flag updates resolve by successful transaction commit order, not promised wall-clock click order. Re-read on focus/notifications; close stale connections on versionchange.

Denied storage, quota/abort/I/O failure, blocked upgrades, corrupt data or an unknown newer schema retain existing data. Continue in memory with explicit unsaved/session-only feedback. No silent delete/reset, unrequested downgrade or power-loss durability guarantee.

## 3. Account identity and lifecycle

The owner is the verified Supabase user UUID from a fresh server check, not an owner field accepted from request JSON or user-editable metadata. Browser session synchronization uses the selected standard SSR SDK; it is not the Guest store.

Identity transitions: unverified/signed out → verified owner; verified owner → local sign-out; owner A → owner B only through verified auth transitions. Clear account UI/in-memory caches, cancel/ignore obsolete responses and never replay pending writes into the new identity. Saved cloud records are not deleted by sign-out. PLAN-Q01 explicitly limits sign-out to this browser; other device sessions remain independent.

## 4. Proposed owner-state records

These are conceptual constraints for later schema work. They are not executable DDL or evidence that RLS exists.

### 4.1 Learner sense state

| Field | Meaning / validation |
| --- | --- |
| owner_id | Verified owner UUID; required and immutable through ordinary updates |
| level | Approved level enum |
| sense_ordinal / sense_id | Valid ordinal and its consistent level-specific ID; not a written-spelling key |
| source_manifest_id | Matches the frozen source revision; no silent state reuse after a future dataset replacement |
| favorite | Boolean, default false |
| studied | Boolean, default false; only explicit mark/unmark |
| revision | Positive integer after creation; required expected revision for changes |
| updated_at | Server-set UTC time for diagnostics/conflict information; not a daily-learning feature |

Unique identity: owner + source revision + level-specific sense. There is no cross-level shared flag row. Reads of an absent owned flag row yield the explicit false/false default; this does not create rows or imply saved activity.

### 4.2 Learner mission state

Fields: owner UUID, frozen mission ID/level, source revision, completion Boolean, revision and server update time. Unique identity: owner + source revision + mission ID.

Completion starts false and is set by an explicit learner completion action. Repeated completion is idempotent. Completion is self-report, separate from Studied, correctness or mastery. No new daily Undo/archive operation is introduced. Guest completion never enters this record.

### 4.3 Latest practice/check state

Fields: owner UUID, frozen mission/check kind, source revision, latest outcome (absent initially; correct/incorrect/revealed/unavailable after observation), source-choice reference when applicable, reveal/no-credit distinction, current-attempt identity, revision and server update time. One row per owner/source revision/mission/check kind; no full attempt history.

The current displayed check is one attempt. A reveal latches the no-credit state for that attempt. Submitting afterward must not convert that revealed attempt into an independently correct outcome. An explicit fresh retry starts a new attempt identity; a later result may replace the latest outcome but does not rewrite the earlier revealed attempt as correct. Source-backed correctness can be recomputed; no client-supplied points/credit field is trusted. This is honest practice feedback, not an anti-cheating or measured-mastery claim.

Missing valid source fields produce unavailable with no correctness credit. Provider/save failure does not create a persisted-result claim. Concurrent stale attempt/revision actions return conflict rather than overwriting another tab's accepted state. The mechanism retains only current/latest state, not a hidden history requirement.

## 5. Ownership and write invariants

- RLS on every exposed account-state table; no Guest/anon grants. Only least necessary authenticated privileges.
- SELECT and DELETE restrict owner; INSERT checks owner; UPDATE checks both existing and resulting owner and has the required SELECT visibility.
- No mutable profile/user metadata as authorization, elevated runtime key or SECURITY DEFINER permission workaround.
- Server mutations accept action/identity/expected revision, derive owner from verified auth, validate source IDs and use user-scoped access. Cross-owner requests do not leak another record's existence/content.
- Initial inserts use unique identities; existing writes condition on expected revision. Zero affected rows are never reported as saved. A missing row/creation race and an owned stale revision have explicit non-disclosing responses.
- Auth responses and private data are not shared-cacheable. Only public immutable teaching content can be cached separately.
- No offline account write queue. Preserve pending intent for explicit retry after verifying the same identity; never merge it with Guest data or silently replay on another account.

## 6. Validation implications

Structural input audit observed counts and missing fields; application cases remain NOT TESTED. Future tests must cover source IDs/pairs, missing-field independence, Guest transactions/fallback, manual flags and cross-level separation, self-report completion, zero wrong/reveal credit, positive owner CRUD and negative cross-owner operations/reassignment.

Original F01–F15 expected outcomes remain unchanged. New FR-020/FR-021 and detailed CRUD/reveal checks are supplementary where they exceed original case wording. D02 is a real-account/environment prerequisite; no mock or this data model can establish live auth/isolation PASS.
