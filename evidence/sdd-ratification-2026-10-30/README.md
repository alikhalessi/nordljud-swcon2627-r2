# SDD-008 — student ratification of Constitution v1.0.0

Date: 2026-10-30 Europe/Helsinki.
Status: STUDENT_RATIFIED / v1.0.0. No Specify or later stage is authorized or executed here.
This is a documentary ratification of the existing reviewed draft, not a rerun of Constitution.

## Genuine approval and preservation

The direct user instruction authorizes recording ratification and committing/pushing only
`condition/spec-driven`. `student-approval-extract.txt` retains the exact quoted Persian
approval supplied by the user. It is explicitly an extract, not the complete earlier message.
`ratification-request-as-received.txt` retains the current instruction text as received in
this chat, represented in UTF-8; it is not claimed to be a client-message byte export.

Reviewed draft: v0.1.0, raw SHA-256 `90B8BDF5E5657F84102AF65BA6D49F5027B88CE994824FA1D2BBE15DBF4E9CE4`.
Starting commit: `bc397a95f10c71b65f0562921716f9a36d8224d2`. The working copy already held the six reviewed changes and the
original Constitution execution evidence. They were preserved, not reset or regenerated.

`reviewed-v0.1.0/` contains exact raw-byte snapshots of all six reviewed files, including
the draft Constitution and synchronized templates/README. The original 13 execution-evidence
files remain untouched in `../sdd-constitution-2026-10-30/`.

The original artifact manifest describes the historical v0.1.0 state. For its six authoring
file entries, use `ratification-record.json`'s `reviewed_snapshot_map` to resolve the preserved
reviewed bytes; current Constitution and README now describe v1.0.0. The old manifest and
validation record are historical evidence and have not been overwritten to imply ratification.

Only Constitution version, ratification and status references and README's current governance
pointer were updated in this ratification. Core Principles I–VIII remain byte-for-byte
identical to the reviewed draft. The four reviewed dependent templates were not changed again.
The approval date is the actual student-authorized date, 2026-10-30; it is not inferred from the
earlier product-input approval. No separately committed draft version is invented.

## Verification and publication boundary

`validation.json` records actual scoped preservation checks. All original approved inputs,
their committed Git blobs and raw CRLF working-copy bytes must remain unchanged. All original
execution evidence and other protected tracked files must match their pre-ratification hashes.
`refs-before.json` records the live branch refs read before this update; no other ref may move.

`commands-before-commit.json` records actual read/check commands and results. The authorized
next Git operations stage only the six reviewed tracked paths and the original/new evidence
directories, inspect the staged diff, commit, and push `HEAD:refs/heads/condition/spec-driven`
without force. Commit SHA and push success cannot be embedded self-referentially in this same
commit: consult Git history and the separate post-commit publication receipt. This file does
not claim those later operations have already succeeded.

No Constitution rerun, Specify, implementation, application test, hook, Supabase/production,
paid service, deployment, merge or other-branch update is performed by this ratification.
Runtime acceptance remains NOT TESTED. Planning estimates are not measured execution time.

Staging preservation method: use the per-command Git option `-c core.autocrlf=false`
when adding the reviewed paths/evidence, then verify every staged blob against the exact
working-file bytes. This preserves original Windows evidence and reviewed snapshots in
Git without changing the user's persistent `core.autocrlf=true` setting. The actual staged
verification and commit/push results are retained in the post-commit publication receipt.

Staged whitespace qualification: the all-files check reported literal space-prefixed blank
context lines inside the preserved historical `../sdd-constitution-2026-10-30/review.diff`.
That unified-diff artifact remains byte-for-byte unchanged. The check excluding only that
historical patch passed for every other staged file; see `staging-whitespace-check.json`.
No original evidence was reformatted to make a check pass.
