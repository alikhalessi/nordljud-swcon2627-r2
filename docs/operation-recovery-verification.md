# G01 local operation verification

The operation-state suite exercises the exact 15,000 ms automatic wait boundary using controlled timers, cancellation, best-effort AbortSignal, uncertain writes, same-context reconciliation, late/context-stale results and no automatic replay. Native/injected Guest tests separately verify transaction acknowledgement, unknown/conflict read-back and session-only fallback. Three Guest lifecycle regressions protect late results and recovery after read failure.

Browser source cancellation ignores late completion until explicit retry. Interactive provider consent is not timed. Cancellation/timeout does not prove a server rollback. The 15-second limit is a client waiting policy, not a performance SLA. Account private-progress uncertainty/identity routes are unimplemented; no missing test file or live suite was executed as a product failure.
