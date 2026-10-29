# V-008-R01 — Separate release-branch authorization, execution and verification status

**Date:** 2026-10-29 (Europe/Helsinki; GitHub/Vercel timestamps control the exact chronology)
**Status:** `AUTHORIZED / RELEASE BRANCH CREATED / VERCEL PRODUCTION SETTING BLOCKED BY CONNECTOR CAPABILITY / R01 NOT YET ACCEPTED`
**Condition:** Vibe only, repo `alikhalessi/nordljud-swcon2627-r2`.
**Official report language:** English-only per student preference.

## Exact, verbatim user authorization (in the conversation BEFORE any branch action)

> I separately authorize completing the V-008-R01 controlled-release setup by configuring Vercel Production to use a dedicated release/vibe branch, while preserving the current working production deployment and domains. First verify and record existing versus proposed settings and safeguards, then apply only necessary release-control changes, verify them with real evidence and preserve rollback capability. Do not apply Supabase production migrations, do not start R02, and do not merge or publish unapproved code. Present R01 for my final acceptance.

**Separate original R01 implementation authorization:** [R01 student approval](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-008-R01_STUDENT_APPROVAL_2026-10-29.md). This additional message specifically authorizes the live release-branch setting change, but explicitly forbids publishing/merging unapproved code and any Supabase Production migration or R02 work.

## Before-change provider snapshot (recorded first)

See [pre-change provider audit and safeguards](V-008-R01_PRODUCTION_BRANCH_SWITCH_PRECHANGE_SAFEGUARDS_2026-10-29.md), committed on isolated `hardening/v008-r01` branch as `45073b88e925b37f59f75b570e6139eb1c41a957` **before creation of the release branch**.

Verified from connected GitHub/Vercel:
- Project `nordljud-r2-vibe`, project ID `prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2`.
- Current READY Production deployment `dpl_GyGByUnZBcWzEENAY58yDX1qBf24`, source branch `condition/vibe`, SHA `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`.
- Aliases associated with this deployment: `nordljud-r2-vibe-sepia.vercel.app`, `nordljud-r2-vibe-aleksi9.vercel.app`, and `nordljud-r2-vibe-git-condition-vibe-aleksi9.vercel.app`.
- Public project domain `nordljud-r2-vibe-sepia.vercel.app` is verified with no explicit branch-specific mapping or redirect.
- The preceding confirmed app-code SHA `d9a472ba934aad3dec1c3244cfeefbaa72ca8746` passed 72/72 automated checks. GitHub compare between this and `7f648...` showed documentation-only changes, no user-facing app code modifications.

## Actual safe action performed

1. GitHub branch `release/vibe` was **created directly from the exact current READY Production SHA** `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`, not from the newer R01 hardening branch. The new branch HEAD was checked and matches this SHA exactly.
2. `condition/vibe` remains unchanged at `47a25779d50455d1dad205ed93f71e6287c31cc1`. R01 draft PR #1 remains open, unmerged, with staging source only.
3. AFTER creating `release/vibe`, the connected Vercel API was rechecked: latest Production deployment still `READY` on `condition/vibe` at `7f648...`, and the public domain is unchanged.
4. No Promotion, Rollback, Production deployment, DNS/domain change, Supabase migration, Auth change, PR merge, R02 or V009 work was performed.

## The remaining setting change — BLOCKED, not claimed as completed

Connected Vercel `update_project` accepts named project settings but **does not support editing `Production Branch` / `link.productionBranch`** in its strict schema. No other writable connected Vercel tool allows this branch setting, and read-only `get_project` also does not expose its current configured value. Deployment metadata conclusively shows the latest deployed source ref, but not the hidden underlying project configuration. Neither trying unsupported arguments nor changing GitHub's repository default branch, promoting a deployment, manipulating domains, or silently creating a new Vercel project would satisfy the student's safety requirements.

**Authorized operator handoff (NOT executed by agent):**

1. Open Vercel dashboard and select project `nordljud-r2-vibe` in account `aleksi9`.
2. Go to **Settings → Environments → Production → Branch Tracking**. The official current Vercel documentation (last updated Jan 7, 2026) confirms that this is where Production Branch is changed: https://vercel.com/docs/git .
3. Confirm the current branch is `condition/vibe` (or record any mismatch), then change only the Branch Tracking branch to **`release/vibe`** and select **Save**.
4. Do **not** modify public domains, environment variables, protection, GitHub repository default branch, auto-assignment, or create/push a new release code commit. Do **not** press Redeploy, Promote, or Rollback.
5. Check the public `nordljud-r2-vibe-sepia.vercel.app` and the Production environment branch; compare current deployed SHA to the saved `7f648...` SHA. A provider-side new build on the same code SHA must be independently inspected before being regarded as safe.
6. Send a screenshot or simply report the actual saved setting and any warning/error for subsequent read-only verification.

**This is a concrete external-UI action blocker, NOT a request for a second permission** (the user's distinct authorization was already given). The tool lacks the necessary write capability.

## Rollback and release safety

The existing READY Production deployment to restore if an authorized settings switch misroutes traffic is `dpl_GyGByUnZBcWzEENAY58yDX1qBf24` (SHA `7f648...`); another earlier known-green app build is `dpl_FYVmd9Qt69XHArdNoDdKNjfjvvnp` (SHA `d9a472...`). Under a routing or branch-control problem, with user's approval, return Branch Tracking to `condition/vibe` and/or restore the prior READY Production deployment **only after verifying actual impact**; remember a Vercel rollback can change automatic assignment state and should not be done casually. No rollback performed during this execution.

## Final readiness gate status

- `release/vibe` exists and exactly matches currently deployed SHA: **PASS**.
- Original public domain and Production READY deployment preserved after branch creation: **PASS (provider read-only metadata)**.
- Vercel Production Branch Tracking changed to `release/vibe`: **BLOCKED / NOT DONE**.
- Verification that future `condition/vibe` pushes create Preview and not Production: **NOT TESTED**; do not push a test commit until the actual setting is confirmed.
- An enforced human-controlled release workflow for future versions: **NOT VERIFIED**; branch `release/vibe` currently has `protected=false`, and GitHub branch rules cannot be updated by the available GitHub connector. Human approval remains a procedural gate, not a technically enforced branch-protection rule.
- Public HTTP/browser acceptance: **NOT TESTED** in this step. Supabase Cloud Auth/migrations: intentionally **UNCHANGED**.
- R01 FINAL HUMAN ACCEPTANCE: **PENDING**; R02 and V009 not started.

**Research integrity:** The original student authorization appeared before actions in the chat; the pre-change provider snapshot was committed before branch creation. This file commits the verbatim authorization and observed action/outcome afterward, without falsely claiming it was committed earlier.

## Follow-up — user-confirmed Vercel Production setting and private repository enforcement limitation

The student subsequently supplied **actual UI screenshots**, visually inspected in ChatGPT but **not fabricated or re-created as repository image files**.

1. **Vercel Settings → Environments → Production → Branch Tracking** shows `release/vibe` and the toast **"Branch tracking saved; redeploy a deployment from release/vibe to this environment."** It also shows the unchanged domain `nordljud-r2-vibe-sepia.vercel.app`. **Status correction:** The former provider-setting write blocker was resolved **by the student in the Vercel UI**. This is **SETTING SAVED**, not evidence of a redeployed SHA or proven future push routing. Student was advised **not** to click Redeploy.
2. **GitHub Settings → Rulesets** screenshot states **"Your rulesets won't be enforced on this private repository until you move to a GitHub Team organization account."** No rulesets exist. GitHub branch GET confirms `release/vibe` `protected=false`. The student agreed to remain on the present free/private setup with a **procedural approval gate**. Do not claim enforceable branch protection or purchased GitHub Team/Pro.

**Fresh read-only verification:** `release/vibe` HEAD is `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`, unprotected. `condition/vibe` HEAD is `47a25779d50455d1dad205ed93f71e6287c31cc1`. Draft PR #1 is OPEN, DRAFT, **NOT MERGED**. Vercel's most recent Production deployment still reports old READY `condition/vibe` SHA `7f64839d`; this is consistent with no new deployment following a setting switch. Public domain remains verified. These records **do not prove** a future development push is Preview-only.

**Gate distinction:** `RELEASE_BRANCH_CREATED = PASS`; `VERCEL_BRANCH_TRACKING = SAVED_IN_USER_UI`; `NO_NEW_PUBLIC_RELEASE = VERIFIED_BY_METADATA`; `ENFORCED_GITHUB_REVIEW = UNAVAILABLE_ON_CURRENT_PRIVATE_FREE_SETUP`; `FUTURE_PUSH_ROUTING = NOT_TESTED`; `HTTP/BROWSER_ACCEPTANCE = NOT_TESTED`. R01 has a manually administered human release gate, **not a technically enforced GitHub protected-release gate**.

**Scope unchanged:** No R01 PR merge, new public release, Supabase migration, or R02/V009 coding. User's later generic "ok" messages are acknowledgments, **not explicit formal acceptance of R01**.
