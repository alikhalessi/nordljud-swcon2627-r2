# V-008-R01 — Production branch separation: verified pre-change snapshot and safeguards

**Date:** 2026-10-29 (Europe/Helsinki; refer to GitHub/Vercel metadata for exact times)
**Scope:** Vibe Round 2; Vercel project `nordljud-r2-vibe` (`prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2`).
**Student's exact additional authorization:** The student separately authorized configuring a dedicated `release/vibe` Production branch while preserving current working Production deployment/domains and rollback ability; explicitly forbade applying Supabase Production migrations, starting R02, and merging/publishing unapproved code.
**Research protocol:** [Exact R01 approval before code](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-008-R01_STUDENT_APPROVAL_2026-10-29.md); [original R01 staging PR #1](https://github.com/alikhalessi/nordljud-swcon2627-r2/pull/1), DRAFT and not merged.

## Verified existing state BEFORE applying the release-control settings change

| Property | Verified state | Source |
|---|---|---|
| Vercel project | `nordljud-r2-vibe` / `prj_ZyW5gjGLrwr0XKWQcUdNdOo4fVh2` | Connected Vercel get_project |
| Live READY Production deployment | `dpl_GyGByUnZBcWzEENAY58yDX1qBf24` | Vercel get_deployment and production deployments listing |
| Live deployed SHA and reported Git ref | `7f64839dbcb8ae945b0416ecf83b84d78009b1f0` / `condition/vibe` | Vercel deployment metadata, provider state READY and Vercel Git status SUCCESS |
| Current public aliases associated with that READY deployment | `nordljud-r2-vibe-sepia.vercel.app`, `nordljud-r2-vibe-aleksi9.vercel.app`, `nordljud-r2-vibe-git-condition-vibe-aleksi9.vercel.app` | Vercel get_deployment alias metadata |
| Project domain | `nordljud-r2-vibe-sepia.vercel.app`; verified, no redirect or branch-specific assignment | Vercel get_project_domain |
| Known prior tested V-008 app code | `d9a472ba934aad3dec1c3244cfeefbaa72ca8746`; [72/72 PASS](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898856815) | GitHub Actions |
| Difference: tested V-008 code → current READY live SHA | GitHub comparison reports only `database/proposed-migrations/V008_DEPLOYMENT_GATE_AND_RLS_TEST_PLAN.md`, `evidence/*` documentation and ledger files; **no app code changed** | GitHub compare `d9a472ba...7f64839d` |
| Current `condition/vibe` HEAD | `47a25779d50455d1dad205ed93f71e6287c31cc1`, includes the R01 approval and additional documentation; no R01 staging changes merged | GitHub branch API |
| R01 draft source | `hardening/v008-r01` with independent 77/77 PASS code and Draft PR #1, **not merged** | GitHub PR/CI |
| Vercel Production Branch settings API access | Connected `get_project` exposes no editable productionBranch metadata, and `update_project` tool schema has **no `productionBranch` or `link` argument** | Connected Vercel tool contracts |

**Limit:** the Production ref is grounded in actual deployment metadata, but the internal Git configuration field cannot be independently read/updated with the available connected tool schema. **Do not assert the setting has been updated until Vercel's Settings → Git screen or another authorized provider action verifies it.**

## Approved target configuration and risk controls

| Property | Before | Proposed after | Hard safety rule |
|---|---|---|---|
| Git branch used to create Production | Observed deployed ref `condition/vibe` | Dedicated `release/vibe` branch pointing to the same vetted deployed SHA `7f64839d` at creation | Do not publish any unapproved R01 source, staging commit or PR |
| Vibe development | Directly linked to Production | Development remains `condition/vibe`, staging in `hardening/v008-r01` or similar; neither directly publishes Production | Prevent new experimental RED commits reaching public aliases |
| Production deployment and aliases | READY `dpl_GyGByUnZBcWzEENAY58yDX1qBf24` and the three aliases above | Keep same deployment/domain assignments; no promotion, rollback, domain reassignment or new code publication in this operation | No unscheduled outage or data change |
| Deployment release gate | Intermediate pushes to `condition/vibe` have triggered Production builds | New release branch receives only explicitly reviewed and tested SHA and has a human-release gate | Separate user acceptance required for future promotions |
| Rollback | Existing READY deployment(s), including `dpl_GyGBy...` and historical `dpl_FYVmd...` | Preserve IDs/aliases and document reverse Production branch setting after explicit consent if a future switch causes regressions | Verify rollback target schema/app compatibility before action |

**Execution constraint:** Creating an unmerged `release/vibe` branch from **the exact current READY SHA** is a safe preparation step, not a Production settings change. The user already expressly authorized the separate Vercel Production branch change, but the available Vercel MCP update action **does not accept that setting**. Do not misuse another project property, change GitHub's default branch, transfer domains, promote a deployment, or guess an undocumented action as a substitute. Report the missing connector action as a concrete operational blocker and supply an accurate UI handoff if an authorized agent cannot set it.

**Independent verification required AFTER branch switch:** Re-read Git Production branch setting in Vercel, verify public domain remains assigned and READY at the known deployment SHA, check a real HTTP response/user browser, then create a harmless documentation-only commit on `condition/vibe` and confirm that it produces Preview rather than Production (only when the switch is securely confirmed; do not test before), and verify `release/vibe` is the sole source of subsequent Production Git-triggered deployment. All failures and limits retained.

**Forbidden in this authorization:** Supabase Production schema change, R02/R03/V009, any PR merge, R01 unapproved code publication, production rollback or domain change.
