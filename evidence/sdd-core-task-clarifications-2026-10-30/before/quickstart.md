# Nordljud CORE — Future Validation Quickstart

Status: Phase 1 run/validation guide, not an executed application run. Date: 2026-10-30 Europe/Helsinki.

The repository currently contains documents and shared inputs, not the planned application/tooling. Commands in the future procedures below are **NOT EXECUTED** and require the later reviewed implementation to exist. They do not authorize installations, provider setup, migrations, deployment, paid services or another Spec Kit stage now. Actual read-only setup/version/source observations from Plan are recorded separately in its evidence.

## 1. Preconditions

1. Obtain required human approval of specification v0.4.0, this Plan and reviewed acceptance cases, followed by the separately authorized Checklist/Tasks/Analyze/Implement workflow. Plan itself does not create app code, tests, package.json, lockfile or migrations.
2. Prepare the proposed local/CI Node 24.22.2 and npm 11.19.1 toolchain only when authorized. Current observed Node 22.15.0/npm 10.9.2 is not a claim that the proposed baseline is ready. Exact package pins and declared compatibility limitations are in [research](research.md#r2--exact-proposed-dependency-baseline).
3. During implementation, create the independent files deliberately rather than running a root scaffold over protected AGENTS/docs/templates. Resolve exact direct pins into a real reviewed lockfile. Review dependency/lifecycle-script implications before installation, then reproduce with `npm ci`. No lockfile or install outcome is invented by this guide.
4. D01 uses existing Edge on Windows at 1280×800 and 360×800 CSS pixels. Record actual OS/browser versions, headless/headed mode and viewport; do not install/replace Edge. Real Swedish voice/audio remains a manual observation.
5. D02 needs separately authorized independent Supabase/project/origin configuration and two legitimate synthetic accounts, permitted email delivery and Google provider capability. Use exact allowed hosted callback URLs and least privileges. Do not configure another project, custom SMTP or paid service merely to make a test pass. Unavailable prerequisites remain BLOCKED/NOT TESTED in N=15.
6. D03 source rights and educational accuracy remain unverified. No public educational-data release follows from this guide. A later deployment or freeze requires its own authorization.
7. Use a separate test browser profile/contexts and minimal synthetic data. Do not inspect, run or alter frozen Vibe content from the SDD agent session. Later comparison must use authorized equivalent black-box conditions and preserve the documented informed/order effects.

## 2. Future declared scripts

These are proposed package script contracts, not current runnable repository commands. The later implementation must create them exactly or document/review a change before validation.

| Script | Proposed command | Purpose |
| --- | --- | --- |
| dev | `next dev --port 3100` | Independent local development |
| build | `next build` | Production artifact build |
| start | `next start --port 3100` | Serve the reviewed local production build |
| typecheck | `tsc --noEmit` | Strict TypeScript check |
| lint | `eslint .` | Independent code quality check |
| test | `vitest run` | Domain/client tests |
| test:sources | `vitest run tests/unit/source-contract.test.ts` | Frozen input identities/schema/field rules |
| test:rls | `vitest run tests/integration/ownership.test.ts` | Authorized real two-account ownership tests only |
| test:e2e | `playwright test` | Real Edge browser journeys |

The Playwright configuration must define `msedge-desktop` and `msedge-narrow`, using the existing `msedge` channel and the two approved CSS-pixel viewports. Run an independently started production server on port 3100 and disallow reuse of another existing server. If the port is busy, stop/report; do not kill or attach to a different app. Real audio and interactive Google flows need separately recorded manual observation.

## 3. Future setup/build checks

Run from `E:\DevStorage\nordljud-swcon2627-r2` only after implementation/toolchain prerequisites exist. Record actual commands, stdout/stderr, exit codes and versions. These steps have not run in Plan.

```powershell
git branch --show-current
git status --short --branch
git rev-parse HEAD
node --version
npm --version
npm ci
npm run typecheck
npm run lint
npm run test:sources
npm test
npm run build
```

A successful install/typecheck/build is not application/auth/privacy acceptance. A missing executable, incompatible environment or absent D02 configuration is a setup/prerequisite problem, not a product RED. Do not label the documentation-only starting commit as a tested implementation.

Before acceptance evaluation, identify the exact reviewed implementation SHA and worktree condition. Dirty work must retain its exact diff/hash and cannot be represented as a clean immutable fixed-SHA comparison. Final comparative freezes require separate authorization; preserve failures and each later corrected snapshot rather than repairing a frozen artifact silently.

## 4. Genuine test-first behavior work

For each automatable behavior in the later authorized implementation:

1. Create the reviewed behavior test and run it while the behavior is missing. Preserve the actual failing output and explain the expected/observed mismatch.
2. Implement the minimal behavior, then retain its passing output and relevant regression results.
3. Include source identities/missing fields, separate senses/counterparts, wrong/revealed credit, manual/per-level flags, storage failures, account persistence and ownership boundaries.
4. Distinguish unit/synthetic fixtures from actual browser/provider evidence. Missing-counterpart and corrupt-storage fixtures do not rewrite frozen teaching inputs. Manual-only scenarios retain reproducible steps and limitations rather than fabricated automation.

No RED, GREEN, browser test, RLS test or acceptance run has occurred during this Plan stage.

## 5. Future public/Guest browser procedures

After the reviewed build and test harness exist, the proposed commands are:

```powershell
npm run test:e2e -- --project=msedge-desktop
npm run test:e2e -- --project=msedge-narrow
```

Record the actual source/tested revision and trace/screenshots. Observe all four source levels, the full collection and both `sticka` meanings; verify selected sense/source examples across levels. Exercise correct/incorrect/revealed/unavailable check states without granting wrong/reveal credit.

For Guest, explicitly choose level/sense, set different Favorites/Studied choices at different levels, refresh and verify only approved persisted fields return. Mission/practice results reset. Viewing, practising and completion do not automatically mark Studied. Clear only the isolated test profile's application data when testing the approved clearing boundary; no new application clearing UI is implied.

Test IndexedDB transaction completion, independent flag updates, blocked/denied/quota/corrupt/newer-schema outcomes and safe session-only fallback. Synthetic failures are labeled as such; do not claim all physical storage failure modes or power-loss durability were reproduced.

For speech, request stored Swedish with `sv-SE`; record actual voice availability and an audible/manual observation where supported. Also retain meaningful unavailable behavior. API presence, headless metadata or a mocked utterance callback alone is not proof of real speech.

## 6. Future authorized account/provider procedures

Do not run these until D02 and its specific test operations are authorized. Secrets and real personal data do not enter committed evidence. Configuration names contain only publishable runtime access where appropriate; elevated schema-setup permissions, if ever separately authorized, are not application runtime credentials.

- **Email:** Register an authorized recipient, follow the default confirmation URL in the same browser, verify a real session; test invalid credentials/sign-in/local sign-out and clear UI state. Observe email recipient/rate restrictions honestly.
- **Google:** Use the exact authorized hosted origin, observe provider consent/cancel/failure and code callback, then verify an actual session/private request. Redirect alone does not pass F10.
- **Two devices:** Sign out locally on one browser; the other legitimate session can remain signed in, and owned progress survives. Do not claim immediate universal access-token revocation.
- **Persistence:** Save explicit completion, favorites, manual Studied and latest results; refresh/sign out/in. Preserve source/level identities and no Guest import. Record unavailable device/network coverage explicitly.
- **Isolation:** A/B positive own-record operations plus negative cross-owner read/create/update/delete and owner-reassignment attempts using real scoped credentials. Verify denied writes leave the target unchanged, including zero-row responses. No privileged key or hidden UI is evidence of RLS correctness.
- **Conflicts/failures:** Stale revision, creation race, expired/cancelled session, unavailable provider and failed save; no false saved/authenticated result or replay into another identity.

The proposed RLS harness command, after its implementation and D02 authorization, is:

```powershell
npm run test:rls
```

This is not permission to configure a project or run database operations now.

## 7. Original acceptance ledger — unchanged primary denominator

All cases are currently NOT TESTED. Future rows retain exact environment, steps, expected/actual outcome, tested SHA and evidence location; counts PASS+FAIL+BLOCKED+NOT TESTED must sum to 15. Source structural audits or unit-test totals do not replace user-facing cases.

| ID | Required original observation | Planned evidence / important boundary |
| --- | --- | --- |
| F01 | Four selectable levels and distinct source-linked missions | Real Guest browser journeys at all four levels |
| F02 | Frozen Swedish/English match; assistance toggles | Browser/source pair checks, no invented translation |
| F03 | Swedish request where available, meaningful unavailable status otherwise | Actual Edge/voice/audio observations; conditional outcomes and unexercised branches disclosed |
| F04 | Both checks give correct/incorrect feedback, zero incorrect credit | Real browser outcomes; reveal/no-credit and missing-field rules additionally retain FR/scenario identities |
| F05 | Search/load 456 senses per level | All four browser/data retrievals; input counts alone are insufficient |
| F06 | Two independent `sticka` meanings | Real separate selections and correct meanings; added flag checks stay supplementary |
| F07 | A2→C1 sense continuity with level examples | Real counterpart journey; missing/ambiguous fixtures are supplementary, sources unchanged |
| F08 | Guest study and appropriate state after reload | Real IndexedDB/refresh flow; no provider prerequisite for supported Guest learning |
| F09 | Registration, invalid credentials, sign-in/out | Authorized real email/session observations; Guest fallback alone is insufficient |
| F10 | Hosted Google callback authenticates, not localhost | Authorized real hosted/provider session proof |
| F11 | Personal completion/favorites survive refresh/sign-out/in | Actual owner persistence; Studied/latest-result details separately mapped |
| F12 | A/B cannot read or overwrite each other's state | Real positive/negative scoped requests and unchanged target data; extra CRUD observations supplementary |
| F13 | Essential study/navigation/login at narrow viewport and keyboard | Both approved viewports; incomplete login coverage must not become a full-case PASS |
| F14 | No elevated client secrets; actionable failures | Later source/delivered-bundle review and actual permitted failure observations; no penetration-test claim |
| F15 | Versions, source count, tested commit, typecheck/build reproducible | Actual install/lockfile/command/output/exit records at the tested snapshot |

Report FR-020/US1.7 manual Studied and FR-021/US1.8 per-level flags separately where their observations exceed original case wording. Do not alter original expected outcomes, inflate the primary denominator or merge SECONDARY N=7.

## Approved G01/G02 Validation Obligations

The [approved operation/recovery contract](contracts/operation-recovery.md) is part of Plan v0.1.1. Future automated behavior tests must cover the 15-second automatic-operation waiting boundary, local cancellation, uncertain/late save results, same-owner read-back before explicit retry, and no cross-identity replay. Controlled clocks/failures are labeled fixtures; they do not establish a real provider result or amend PRIMARY N=15. Interactive consent is excluded from this deadline.

Before any later schema operation, retain its actual separate authorization. If preparation fails, stop automatic work, preserve data/evidence and report. Normal abort of the failed transaction is permitted; destructive resets or recovery affecting existing data require a concrete reviewed plan and separate approval. Do not run schema/recovery commands during documentation or task generation. A setup failure is not product RED.

## 8. Result integrity and stopping rules

PASS requires all stated observations for that case with evidence. FAIL means an executed contradictory observation. BLOCKED names the prerequisite preventing completion; NOT TESTED means insufficient execution evidence. Missing providers are not removed from the denominator. Partial coverage is reported honestly.

Stop on wrong branch, changed protected inputs, unexpected work, unreviewed provider/paid/deployment action or missing required approvals. Do not substitute a mock, CI/build result or configuration claim for live auth/ownership evidence. Preserve the informed second-iteration/agent/chronology limitations and leave the Vibe freeze unchanged.
