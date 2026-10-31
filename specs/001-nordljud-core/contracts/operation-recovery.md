# Nordljud CORE — Approved Operation and Recovery Policies

Status: G01/G02 clarification approved by the student on 2026-10-30 Europe/Helsinki; recorded in Plan revision 0.1.1. These policies clarify existing safe-failure requirements. They do not expand PRIMARY N=15, add a performance benchmark, or authorize implementation/services.

## G01 — Bounded waiting, cancellation and uncertain outcomes

Automatic source retrieval and progress operations use a **15-second client waiting limit**. This is a proposed interaction policy explicitly approved by the student, not measured performance, a latency SLA, or a guarantee that the server stops when the client stops waiting. Interactive OAuth/provider consent is not subject to this timer.

When the limit is reached or the local operation is cancelled, stop indefinite pending feedback and use best-effort client cancellation. A source/read operation can show a recoverable unavailable/retry state. A write without an authoritative acknowledgement has **save status unknown**; it must not be called definitely saved or definitely uncommitted merely because the connection ended.

Retain pending intent in memory while the same verified owner/source context remains active. Before an explicit write retry, read back the same owner's current resource and revision:

- If the read confirms the intended state, report that the current desired state is saved without claiming an unobserved causal history of the original request.
- If the current state differs or conflicts, show the current state/revision and require an explicit retry/reapplication; do not overwrite it blindly.
- If read-back is unavailable, remain in the unknown state and offer a status retry or safe Guest learning. Do not automatically replay the write.
- After sign-out or identity change, clear obsolete private views/requests and never carry/replay intent into a different owner. Guest state is not an account-write queue or import mechanism.

A late response may update the view only if the verified owner, source/resource and operation context still match. It cannot overwrite a newer accepted state or reverse a later identity transition. This transport/save status is separate from practice correctness, revealed outcomes and mission completion.

## G02 — Future schema-preparation failure and recovery authority

Any future schema work requires its own authorized independent D02 environment and operation scope. No schema command, migration or service action is performed or authorized by this document.

If authorized schema preparation fails, stop automatic work, preserve existing data and relevant state, retain redacted commands/results and report the failure. Normal abort/rollback of the failed database transaction is permitted; it is not permission for an additional destructive recovery operation.

Do not automatically drop, truncate, reset or destructively downgrade a database, or apply a recovery that changes pre-existing data. Such recovery requires a concrete reviewed plan and separate explicit approval. That plan identifies the independent target, observed/partially applied state, preserved data/backup basis, proposed commands and side effects, and validation/recovery evidence. It never extends to Vibe, production or unrelated projects.

A further attempt must remain within the actual authorization and known state; ambiguous scope or partial effects require stopping for review. Do not improvise a privilege escalation, new paid service or destructive reset to make a setup check pass. A setup/migration failure is reported as such, not fabricated product RED.

## Review and evidence

G01 resolves checklist CHK024; G02 resolves CHK025. The student also approved the 33 previously supported documentary assessments. The updated 35/35 review is a requirements-writing result, not application acceptance. All 15 application cases remain NOT TESTED until real later evidence exists.

Future tests must distinguish controlled delay/failure fixtures from real browser/provider observations. No numeric timeout policy changes the original primary denominator or turns a mock into live auth/privacy proof. Approved snapshots and all earlier open-finding records remain preserved as chronology.
