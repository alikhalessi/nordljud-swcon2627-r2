# V-008 — Learning Hub (Daily Archive, Remind Me Later, 7/14-day reviews)

**Project/course:** Nordljud Round 2, Åbo Akademi SWCON2627
**Date:** 2026-10-29, Europe/Helsinki (GitHub commit timestamps are the authoritative exact times)
**Experimental condition:** A — Vibe Coding, branch `condition/vibe`
**Outcome:** `FINAL 72/72 TESTS + TYPECHECK + PRODUCTION BUILD PASS / VERCEL INTEGRATION SUCCESS / GUEST LOCAL STORAGE SOURCE TESTED (NOT BROWSER VERIFIED) / AUTHENTICATED CLOUD STORAGE BLOCKED PENDING STUDENT DB AUTHORIZATION / LIVE UX ACCEPTANCE PENDING`
**Prior user acceptance:** [Exact V-007 student acceptance](V-007_STUDENT_ACCEPTANCE_2026-10-29.md), `0f90d3bf380bfeae7ad6e5f4f61f1f90506843f3`, accepted V-007 with disclosed Swedish expert/browser limits.
**Exact proposed English prompt saved BEFORE V-008 permission:** [V-008 AI_DRAFT](V-008_AI_DRAFT_LEARNING_HUB_ARCHIVE_REVIEW_2026-10-29.md), `2316b131517ca74c11db56685982a0e8c68357fa`.
**Student's VERBATIM authorization committed BEFORE ANY V-008 code:** [V-008 STUDENT_APPROVAL](V-008_STUDENT_APPROVAL_2026-10-29.md), `25bb0614e69971985b7d060b6a1a3d363ede84e7`, followed by first V-008 test commit `0e3e2117690f1769e9718dfcf46aaf7f0ded6fce`.
**Baseline:** last verified V-007 application/test SHA `7e71f78a1e1d299e1a3718d00b76612c2d79c8`, 58/58 green tests, TypeScript/build PASS ([40894383384](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40894383384)).
**Final application/test code SHA:** `d9a472ba934aad3dec1c3244cfeefbaa72ca8746`. **VERIFIED FINAL GREEN: 72/72 tests, 0 failures, TypeScript PASS, Next.js Production Build PASS**, [GitHub run 40898856815](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898856815), job `123535318588` with raw test totals. GitHub's Vercel commit status for the **exact same code SHA** reports `SUCCESS / Deployment has completed` ([Vercel status](https://vercel.com/aleksi9/nordljud-r2-vibe/FYVmd9Qt69XHArdNoDdKNjfjvvnp)); this is integration metadata, NOT browser E2E. All later commits are documentation-only.
**No V-009 work has been started.**

## 1. Human-driven scope and academic classification

The user explicitly asked to evolve the app from a simple word explorer to a daily personal learning center, with **daily-lesson archives, Remind Me Later, and weekly/fortnightly review questions**. The original authentic Persian feedback was preserved [here](V-006_F04_POST_IMPLEMENTATION_STUDENT_FEEDBACK_LEARNING_HUB_2026-10-29.md). ChatGPT authored the official English V-008 prompt and an exact full Persian translation shown in chat only, which the student reviewed and expressly approved. The English prompt in GitHub is the sole authorized implementation text.

This is **USER-DRIVEN LATE FEATURE CONSTRUCTION / PRODUCT SCOPE CHANGE**, not an original defect correction nor originally frozen F01–F15 benchmark requirement. It must be separated from original Round 2 Vibe-vs-Spec Kit SDD comparative scoring, and the historical three-method Vibe/God Mode/SDD pilot must not be confused with this two-method Round 2 implementation.

## 2. Actual implemented behavior

### Navigation
- Exactly **two top-level areas** remain: `Explore Your Words` and `Your Learning`.
- `Your Learning` now has four accessible secondary destinations: **Today's Lesson** (default), **Daily Archive**, **My Review**, **My Progress**. Old Favorites, Learning Progress, Practice History code remained unchanged in the original account dashboard.
- The shared A2/B1/B2/C1 level state remains in `app/learning-app.tsx`. Roving keyboard focus (Left/Right/Home/End), tab ARIA associations and mobile wrapping are in source, **not live E2E verified**.

### Date-based Daily Archive
- `app/daily-archive.tsx` retrieves unchanged source data at current level and reconstructs each earlier day's exact three verb+sense items via original pure `selectDailyVerbs`; the earliest published day is **2026-10-29**, and the date input excludes dates prior to the original release or future days. Original source example and English translation and **Explore this verb** are present.
- `lib/review-core.mjs` uses `DAILY_SELECTION_VERSION=f04-2026-10-29-v1` to label the original algorithm, and a strict date-plus-CEFR completion key to prevent silent historical category changes. Algorithm and frozen source are unmodified.
- **Manual/self-reported** `Mark lesson as completed` / `Undo` exists in archive and also Today's Lesson. Viewing alone does not record mastery or completion. The original fixed Mini Lesson and quiz remain unchanged.

### Remind Me Later and My Review
- `app/vocabulary-explorer.tsx`, `app/daily-lesson.tsx` and `app/daily-archive.tsx` provide explicit **Remind Me Later** action for exact **level + Swedish verb + English meaning**. This is independent from Favorites and Studied; both `sticka` senses remain distinguishable.
- `app/my-review.tsx` lists due/upcoming items, with **Study again**, **Mark reviewed**, **Snooze 2d/7d/14d**, **Remove**.
- Default due date is **two local calendar days after adding the item**. Mark reviewed moves the next due date by seven days. This is simple user-facing scheduling, **not** a scientifically optimized spacing model, and never auto-declares mastery.
- Optional 7-/14-day exams are eligible after rolling **7 or 14 local calendar days from the first explicit reminder request**; never automatically shown as a pop-up or phone push. They reuse `lib/practice-engine.mjs` V-007's source-grounded questions, selected by exact sense; failed previously recorded responses can be prioritized. At least five valid items are required (maximum ten); otherwise show an honest insufficient-content message.
- Learner selects answers and receives feedback; revealing a wrong answer **does not grant points**. `ReviewSession` stores actual source senses/question IDs, day, review window, score and result flags, separately from Favorite/Studied/older Practice History. It does not delete the queue or auto-mark mastery.
- Preserve current selected word, Today's three daily cards and original fixed seed lessons. No scheduled Android/PWA notifications.

### Guest privacy and account storage
- `lib/review-core.mjs` and `lib/review-core.d.mts` define a **separate versioned and validated browser-only Guest storage key**, bounded to max 500 completions, 500 reminders, 100 review sessions. Malformed, oversized or invalid records fail closed. Guest can clear all V-008 local learning records. Storage unavailable gracefully stays in memory and displays non-persistence warning.
- `app/review-state.tsx` adds `ReviewProvider`, transitions by authenticated user ID, clears the previous user's UI state immediately on session changes, checks stale in-flight work and **does not silently merge Guest data into an account**.
- Authenticated cloud paths are coded against **three new user-owned tables**, with messages indicating **BLOCKED** if tables/permissions are not accessible. They must **not** silently fall back to another user's local storage. Backend schemas/RLS have not been deployed in Production.
- Proposed SQL only: [V008_review_learning_records_PROPOSAL_NOT_APPLIED.sql](../database/proposed-migrations/V008_review_learning_records_PROPOSAL_NOT_APPLIED.sql). Proposal includes `auth.users` ownership, 4 per-table CRUD policies, `auth.uid()` guards, least-privilege `authenticated` grants and `anon` revocation.
- [Separate production deployment approval + RLS test plan](../database/proposed-migrations/V008_DEPLOYMENT_GATE_AND_RLS_TEST_PLAN.md). **No Production migration application was authorized or performed**; live RLS and multi-account privacy verification are **BLOCKED, NOT TESTED**.

## 3. Files by purpose

| File(s) | Change |
|---|---|
| `tests/v008-learning-hub.test.mjs` | Test-first daily date, invalid guest data, exact-sense keys, completion, due+snooze, eligibility, source-grounded quiz, case-specific UI checks |
| `lib/review-core.mjs` and `lib/review-core.d.mts` | Pure and typed local calendar, guest schema validation, explicit learning record transitions, source-grounded quiz assembly |
| `app/review-state.tsx` | Guest-local and account-scoped Cloud paths, auth transition, sign-out clearing and explicit BLOCKED status |
| `app/daily-archive.tsx` | Previous-day browser and self-reported completion |
| `app/my-review.tsx` | Queue and optional 7-/14-day review UI and scores |
| `app/daily-lesson.tsx` | Add Remind Me Later and today's manual completion |
| `app/vocabulary-explorer.tsx` | Independent selected-sense Remind Me Later |
| `app/learning-app.tsx` | Four subviews of Your Learning; unchanged main two-tab division and original Mini Lesson |
| `app/globals.css` | Responsive secondary tabs and scoped archive/review styles |
| `database/proposed-migrations/*.sql` and security gate plan | **Proposed, unapplied schema, RLS and verification procedure**, no migration applied |
| `tests/v006-f04-f01-learning-navigation.test.mjs` | Earlier test still verifies two MAIN tabs, original saved views and Guest access; adjusts superseded two-subview and no-archive expectations after explicit new feature approval |
| `tests/v008-storage-security.test.mjs` | Source-only RLS, Guest validation, logout/account-switch and no-notification checks |

**Not modified:** frozen four Swedish JSON arrays, original mission seeds and fixed lesson content, existing Supabase schema or live data, three existing Favorite/Studied/History tables, independent `condition/spec-driven`, original `evaluation/ACCEPTANCE_MATRIX.md`. No PWA/Android/native/push or V-009.

## 4. Authentic chronology (no fabricated GREEN, retain ALL intermediate RED)

| Evidence event | Actual CI result and interpretation |
|---|---|
| [40897078200](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897078200) | **GREEN baseline after exact user-approval-only commit** `25bb0614`; confirms **no implementation started before approval** |
| [40897236125](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897236125) | **RED** new V-008 tests committed first, `0e3e2117`, before `lib/review-core.mjs`/new UI existed |
| [40897335294](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897335294), [40897427654](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897427654), [40897594013](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897594013), [40897734533](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897734533), [40897865532](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897865532), [40897903994](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897903994), [40897944364](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40897944364) | **RED during staged construction** as V-008 module, provider, archive, review screen and UI actions accumulated. Do not suggest red runs imply a previously live user-facing error if a module/test was intentionally incomplete |
| [40898069176](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898069176), [40898132655](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898132655), [40898227719](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898227719) | **RED 65/68**: legacy V-006-F04-F01 assertions still required exactly *two secondary* views and *no archive* although the new student-approved feature adds four; the V-008 static check initially pointed to the provider instead of the actual clear-data UI |
| [40898343619](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898343619) | Intermediate RED during sequential test updates, retained |
| [40898351698](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898351698) | **GREEN 68/68 tests, 0 failed; TypeScript PASS, Next.js Production Build PASS**, after updating only superseded structural assertions and preserving original behavior checks |
| [40898542277](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898542277) | **GREEN 68/68 tests, typecheck/build PASS** after cloud-save verification-state correction |
| [40898676469](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898676469) | **GREEN 72/72 tests, 0 failures; TypeScript PASS; Next.js Production Build PASS** after four additional proposed RLS/Guest/logout-security *source tests* |
| [40898856815](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40898856815) | **VERIFIED FINAL GREEN 72/72, no failures, TypeScript PASS, production Next.js build PASS**, on last app-code commit `d9a472ba`, checked from job `123535318588` and logs; GitHub Vercel integration also reports deployment completed for this exact code SHA. |

**Note on test interpretation:** These include unit/data and source/static checks, not authenticated browser E2E or real database security tests. A source test that checks SQL for RLS statements is **not proof RLS is deployed** or correctly isolates two users in real Supabase.

## 5. Student acceptance scenarios and residual blockers

**Independent browser check attempted in this turn:** Connected Browser returned `Browser access requires the originating browser context`. No live browser walkthrough, mobile/keyboard/screen reader, audio, Google sign-in, cross-account RLS or actual Supabase records could be tested. These are `BLOCKED / NOT TESTED`, **not PASSED**.

1. Guest: change CEFR levels, open Today's Lesson and Daily Archive; select 2026-10-29 and next dates, verify exact old sets and Explore handoff. Mark today's or historical lesson completed and undo; refreshing should restore only explicitly saved selections.
2. Guest: choose Remind Me Later for exact `sticka` **knit** and **sting, prick; to leave (colloquial)** separately; verify both in My Review, then Mark reviewed/Snooze/Remove; refresh to verify persistence. Try malformed/unavailable storage to confirm errors and no crash.
3. Guest: advance a local calendar past 7 and 14 days (test-only fake clock rather than changing actual device time without documenting it); check quiz eligibility and 5–10 valid questions, audio/word/meaning consistency and no-credit-on-reveal. Revisit prior wrong cases and verify score persistence.
4. Authenticated: existing Favorites, Studied and Practice History should continue. **Cloud review, completions and session records are expected BLOCKED until production migration approval**. Do not fake or claim Cloud passes.
5. Use real mobile/keyboard/screen reader and actual UI checks if possible; record tested SHA, browser, time, screenshots where actually captured, and mark inaccessible tests `BLOCKED`.
6. Only with separate student authorization: stage/deploy proposed new tables and execute true two-account RLS probes; until then `CLOUD SECURITY LIVE VERIFICATION BLOCKED`.
7. **Student has NOT accepted V-008 yet. V-009 must not begin without explicit user acceptance.**

## 6. Honesty and provenance

The student supplied the high-level learning/review idea, selected the broader design through feedback, reviewed the full Persian translation, and approved the exact English GitHub prompt. ChatGPT generated code, test scenarios, schema proposal and evidence records as the Vibe Coding agent. Version-control commits and negative CI are authentic tool-observed results. Do not imply unsupervised human-written code or unmeasured coding time. The revised feature scope must not be folded into Round 2 frozen baseline or copied to the independent SDD condition.
