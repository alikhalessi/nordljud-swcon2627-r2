# Nordljud CORE — HTTP and State Contracts

Status: proposed Phase 1 interfaces, not implemented endpoints. See [data model](../data-model.md), [auth](auth.md) and [UI behavior](ui-behavior.md).

## Common rules

All paths are relative to the independent application origin. Public source reads require no sign-in; private routes use the request's freshly verified owner. The browser never sends an authoritative owner UUID. JSON shapes below are conceptual contracts, not generated handler code.

Private responses, including errors/session results, use `private, no-store`; auth/cookie updates carry the SDK's required cache headers. Mutations require the exact allowed same-origin Origin and a supported JSON content type; no permissive CORS or forwarded-host-derived redirect origin. Validate enums, IDs, lengths and unexpected fields before persistence. Never return raw tokens, passwords, privileged keys or database error details.

Errors have a stable application code, concise user message, retryability and optional opaque correlation ID. Logs may include case/operation ID, safe status and revision-conflict counts; no auth codes/tokens, credential bodies or real user records. Do not claim a regulatory retention policy or production observability service.

| Status | Meaning |
| --- | --- |
| 400 | Malformed/unsupported input, source level or action |
| 401 | No fresh verified identity for a private operation |
| 403 | Disallowed mutation origin or explicitly denied operation |
| 404 | Absent/inaccessible resource without another owner's data disclosure |
| 409 | Owned state revision/attempt conflict or creation race; refresh and explicitly retry |
| 422 | Source-backed check cannot be formed or submitted choice is invalid |
| 429 | An actual provider/app limit is encountered; only expose a trustworthy retry hint |
| 503 | Required provider/storage dependency unavailable; no false saved/authenticated result |

## Public source interfaces

| Interface | Input | Success contract |
| --- | --- | --- |
| `GET /api/lexicon?level=A2` | Exactly one approved level | Manifest/source identity, selected level, 456 ordered records with level-specific IDs, unchanged raw fields and per-field availability |
| `GET /api/missions?level=A2` | Approved level | Its frozen representative mission, source references and supported check definitions/availability; no newly authored Swedish |

Client exact-spelling search operates on the loaded level's collection. It returns both same-spelling senses separately; it does not silently add fuzzy/ranking requirements. A level load failure shows a retry/empty-unavailable state without fabricating entries or silently substituting a different level.

Changing level resolves the exact stored `(v, meaning)` pair in the destination. Exactly one candidate preserves selection with destination examples; otherwise selection becomes null with an explanation. Favorites/Studied come from the destination's own record. Counterpart matching never transfers saved flags.

## Session and account interfaces

| Interface | Input | Success contract |
| --- | --- | --- |
| `GET /api/session` | Request-scoped SDK cookies | Verified authenticated, signed-out or unavailable status; minimal identity/UI information, no raw token |
| `GET /api/me/progress` | Fresh verified owner | Only that owner's source-bound sense flags, mission completion and latest check state/revisions |
| `PUT /api/me/senses/{senseId}` | One explicit action: favorite/unfavorite/markStudied/unmarkStudied; expectedRevision | Persisted source-bound owner record/new revision; no changes to unrelated fields or other level records |
| `PUT /api/me/missions/{missionId}/completion` | Explicit complete action; expectedRevision | Self-reported completion and new revision, independent of practice/Studied; no daily Undo feature |
| `POST /api/me/missions/{missionId}/checks/{kind}/attempt` | Explicit fresh attempt; expectedRevision | Current attempt identity/revision; no attempt-history collection |
| `POST /api/me/missions/{missionId}/checks/{kind}/reveal` | Current attempt identity; expectedRevision | Revealed/no-credit outcome with source answer and new revision |
| `POST /api/me/missions/{missionId}/checks/{kind}/answer` | Current attempt identity, source-choice ID, reveal state; expectedRevision | Source-recomputed feedback/latest outcome; no wrong/revealed correctness credit |

Check kind is comprehension or verbForm. No endpoint accepts a caller-supplied owner, arbitrary Swedish answer key, points total or mastery assertion. New records use an explicit absent/initial revision convention; subsequent writes require the returned revision. A zero-row update or response from an obsolete identity is never success. Cross-tab stale attempts cannot overwrite a later accepted reveal/result.

Beginning a new attempt does not silently clear an existing latest outcome before a new completed observation. Reveal remains no-credit for its attempt; a fresh retry is distinguished by its new attempt identity. No record of every past attempt is required or exposed. For Guest, equivalent domain transitions happen in memory without these private routes.

## RLS is independently testable

The public UI does not expose account-owner selection or a new bulk-delete interface. Nevertheless, authenticated database privileges/policies must protect every supported read/create/update/delete and owner reassignment. Authorized negative tests use separate legitimate A/B credentials and minimal synthetic rows against the independent Data API, without privileged browser keys. Check target state after zero-row denials; an error message alone is insufficient. These checks are specified, not executed by Plan.

## Bounded Pending Operations and Unknown Saves

The approved [G01 policy](operation-recovery.md#g01--bounded-waiting-cancellation-and-uncertain-outcomes) sets a 15-second client waiting limit for automatic source/progress operations, excluding interactive consent. Cancellation or deadline expiry does not prove a server write was rolled back. Without acknowledgement, show save status unknown, retain same-owner intent and reconcile current state/revision before an explicit retry. A late response cannot overwrite a newer accepted operation or identity context. No automatic account-write replay is added.

## Conflict and lifecycle rules

A stale expected revision retains the user's unsaved intent in memory, reports a conflict and allows reload/explicit retry in the same verified identity. There is no background account-write queue or automatic conflict merge. Sign-out/identity change cancels or ignores pending responses and clears private views; it does not replay data as the new owner or import Guest flags.

Guest storage errors are defined in the UI/data contracts rather than reported as successful HTTP account writes. Public source availability, authentication availability, save status and audio availability have separate states; one failure must not create false success in another.
