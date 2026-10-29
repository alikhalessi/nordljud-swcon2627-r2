# V-008-R01 — AI_DRAFT, student exact approval pending

**Date:** 2026-10-29 (Europe/Helsinki; actual GitHub timestamp on commit)
**Status:** `AI_DRAFT / NOT APPROVED / NO APPLICATION OR SETTINGS CHANGED`
**Condition/branch:** Nordljud Round 2 Vibe Coding / `condition/vibe`
**Prompt origin:** Drafted in English by ChatGPT following the student's broad Persian direction to complete all necessary production-readiness iterations prior to V-009, freeze the Vibe product after V-009 and then start independent SDD. This is NOT a verbatim student-authored English text and the broad direction is NOT a separate exact approval of this implementation prompt.
**Read-only factual baseline and staged roadmap:** [PRE_V009_PRODUCTION_READINESS_AUDIT_AND_GATES_2026-10-29.md](PRE_V009_PRODUCTION_READINESS_AUDIT_AND_GATES_2026-10-29.md), audit-only commit `7f64839dbcb8ae945b0416ecf83b84d78009b1f0`.
**Current latest verified app-code SHA:** `d9a472ba934aad3dec1c3244cfeefbaa72ca8746` with [72/72 CI, TypeScript and build PASS](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898856815); Vercel READY for that SHA. Subsequent research-evidence-only commits may run CI; no new product release readiness conclusion follows from their status.
**Research instruction language:** Only the English prompt is stored in GitHub. The full equivalent Persian review translation is presented in the conversation.
**Previous explicit consent boundary:** Never apply a Production Supabase migration without the student's separate explicit database-specific approval; this R01 does not request it.

## Exact English proposed prompt for the student to review

# V-008-R01 — Controlled Release Foundation and Reproducible CI

Please execute one focused, evidence-driven corrective iteration, V-008-R01, on Nordljud Round 2 Vibe Coding, before V-008-R02 and V-009. The goal is to separate experimental coding and authentic RED/GREEN evidence from public Production releases, and to make our existing automated verification reproducible. This is a release-engineering correction, not permission to add features or to change the database.

1. **Protect the current production site.** Identify the actual Vercel project, account/team, public domain, current production Git branch, last known-good deployed code SHA, and connected GitHub workflow. Inspect before changing any settings. Make experimental commits use Preview/candidate environments; only an explicitly accepted, green, exactly tested SHA may be published to Production. Propose a precise safe configuration using the available Vercel/GitHub plan and access, such as tested deployment checks or a separate, protected release branch. If changing the existing Production branch, domain assignment, or live deployment protection could disrupt users, document the proposed old/new settings and obtain my separate explicit confirmation before applying that change. Do not rely on Pro-only features without verifying entitlement and a free-tier-compatible alternative. Never release a RED or partially implemented commit.

2. **Make CI deterministic without hiding failures.** Generate and commit a package lockfile compatible with the exact pinned dependency versions; update the Vibe GitHub Actions workflow to use `npm ci` and a supported pinned Node version. Keep the complete tests, TypeScript check and Next.js production build. Preserve intentional RED tests and negative results in the research history, but do not let intermediate pushes automatically become public Production. Avoid excessive alerts through appropriate branch and notification configuration, without disabling evidence collection or deleting previous failures.

3. **Add a minimal release gate.** Add reproducible health/smoke checks suitable for the present app: source and lock integrity, a successful production build, and an HTTP response check against the exact candidate deployment when accessible. Record which checks run in GitHub CI, which require Vercel settings and which remain untested due to browser, provider or plan permissions. Do not fabricate a passing authenticated end-to-end test, Google sign-in, database storage or mobile accessibility from an HTTP 200 or a successful build.

4. **Prepare rollback and release traceability.** Document the currently accepted deployed Vibe SHA, preview/release workflow, recovery action for a bad release, and how to trace every student-approved prompt, code commit, CI run, deployment and acceptance decision. Do not automatically rollback or promote live Production without explicit authorization. Keep the independent Spec Kit SDD branch, the frozen F01–F15 shared acceptance matrix and the four 456-sense Swedish datasets untouched.

5. **Observe the research approval protocol.** Before any V-008-R01 code or CI configuration change, commit my exact approval of this full English prompt, including the current baseline, into `condition/vibe/evidence`. Add tests before fixes where practical, preserve genuine RED and GREEN runs, build/typecheck results and exact commit SHAs. Do not claim Vercel Release settings are effective unless verified in the actual provider account. Note that Vercel team/account access may require my separate action; if it is blocked, preserve a precise proposed configuration and mark that gate BLOCKED.

6. **Stop at this boundary.** Do not apply Supabase schema migrations, change Production user data, turn on Google OAuth using unverified credentials, modify user-record security policies, add new features, or begin V-008-R02/V-009. In your final report, clearly distinguish delivered source-level release controls, actually verified provider settings, and unresolved steps. Ask for my acceptance of V-008-R01 before the next corrective iteration.

## Deferred stages (not approved by this draft)

- **V-008-R02:** fix Google/email authentication/configuration; rehearse new cloud schema in safe authorized environment; separate explicit Production migration approval and live two-account RLS tests.
- **V-008-R03:** full automated and human E2E/mobile/keyboard, source-grounded exercise and review smoke, resilience and privacy regression.
- **V-009:** final product release acceptance and immutable Vibe freeze, followed by independent SDD work from the neutral baseline. No migration, release action or V-009 coding is authorized here.

## Authorization boundary

This evidence-only AI draft does not authorize modifying code, GitHub workflow, Vercel settings, Production database, Auth or SDD. Await a **new explicit student approval of this exact English prompt** committed before any implementation. Any additionally disruptive Vercel Production setting change requires separate confirmation as specified in point 1. No claim of Production Ready is made by writing this document.
