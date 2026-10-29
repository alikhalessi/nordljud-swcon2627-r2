# V-006-F04 — Daily Micro-Lessons + Explore Navigation: actual implementation and evaluation record

**Date:** 2026-10-29 (Europe/Helsinki; exact commit times are available in GitHub rather than invented here)
**Project:** Åbo Akademi SWCON2627, Nordljud Round 2
**Method condition:** A / iterative Vibe Coding
**Branch:** `condition/vibe`
**Status:** **IMPLEMENTED / 46 OF 46 CI TESTS PASS / STUDENT LIVE UX ACCEPTANCE PENDING**
**Last application/test SHA verified:** `aa86cb6d69e9a52a4668863132f7e93996491811`
**Last F03 application SHA before this increment:** `473c7c60ed468c3634acb886b3b275dbc1b93d5a`
**Actual prompt:** [AI-written original text saved before approval](V-006-F04_AI_DRAFT_DAILY_MICROLESSONS_2026-10-29.md), commit `73ff4b58b7b463c46fa80f9ef9075f4240fbab96`.
**Approval before code:** [Student's exact unchanged approval](V-006-F04_STUDENT_APPROVAL_2026-10-29.md), commit `49e73ab980a6988825ab6c9a8654d6b483eb9ac8`.
**Student's original Persian suggestion:** Preserved verbatim in the AI draft's provenance section, and earlier [misplaced Mini Lesson feedback](V-006_F03_UX04_STUDENT_FEEDBACK_AND_DESIGN_OPTIONS_2026-10-29.md).
**Research classification:** `MIXED: USER UX CORRECTION + USER-REQUESTED DAILY FEATURE CONSTRUCTION`; not a mere F03 bug-fix, and not an originally preregistered common feature.

## 1. Concrete implementation, no unapproved expansion

### User experience and navigation
- Preserved two **primary** destinations: `Explore Your Words` and `Your Learning`.
- Added two **nested** destinations inside Explore: `Verb Explorer` and `Today's Lesson · 3 daily verbs`.
- Kept the existing A2/B1/B2/C1 selector above the nested destinations. This single level value controls both; default subview stays Verb Explorer to avoid changing the established first visit/guest study flow.
- Added nested ARIA tab list/panel relationships, selected state, keyboard Left/Right/Home/End and focus handling. Kept both nested panels mounted and one hidden, preserving old selected sense and original seeded quiz state while switching destinations.
- `returnToVerb` from the dashboard or a daily card selects the exact `verb+meaning+level`, switches to Verb Explorer and original Explore top tab, and retains the earlier top-navigation focus/scroll behavior.
- Moved the **single existing fixed Mini Lesson section and its original quiz** from after the Vocabulary Explorer into Today's Lesson, below three daily cards. No duplicate quiz and no new answer engine; source missions in `app/page.tsx` remained untouched. Labeled as a fixed distinct example from the rotating cards.
- Updated explorer explanatory text to link mentally to the relocated lesson.
- CSS styles nested tabs and up to three responsive daily cards: 3 columns desktop, 2 below 850px and 1 below 600px. This is source-verified CSS, **not** a real mobile visual/keyboard acceptance result.

### Three daily entries
- `lib/daily-lessons.ts`: deterministic, pure function `selectDailyVerbs(entries,level,dayKey)` and `localDateKey(now)`.
- Each pick is an **exact word+sense identity** (preserving the two `sticka` meanings) from the unchanged `/api/verbs?level=...` frozen dataset. Only existing bilingual Swedish/English examples are selected (prefer Pres/Inf/Pret/Sup/Imp in that order); entries with no full example are skipped. No LLM-generated Swedish text.
- Same local calendar date, selected level and original source ordering yield same daily three entries after refresh/reopen. Index is based on UTC ordinal **of the local calendar-date components**, not the device's current UTC date. Daily index advances by 3 per local date; successive days have disjoint sets when enough eligible entries exist. After exhaustion it cycles; no claim of infinite novelty.
- `app/daily-lesson.tsx`: client date initialized after hydration; updates on window focus, visibility changes and a 60-second timer. Fetch is abortable and has direct Retry on failure. Shows selected meaning, authentic source example, English translation and optional Swedish browser TTS with graceful unavailable messaging. Each card has a **Explore this verb** action redirecting to the *existing* full Verb Explorer with its current Learning/Practice Modes.
- Explicit wording: daily picks are **not personalized mastery recommendations** and may contain already known words. No guest/server history, streaks, badges, point scoring, mastery progress or notification logic was added.
- Existing Guest Mode, Favorites, History, sign-in components, source corpus and RLS tables were not changed.

### Changed/created files by purpose

| Purpose | File(s) |
|---|---|
| Pure selection and date algorithm | NEW `lib/daily-lessons.ts` |
| New read-only daily-card UI | NEW `app/daily-lesson.tsx` |
| Shared selector, nested tabs, relocated original fixed quiz, exact-sense return | UPDATED `app/learning-app.tsx` |
| Corrected helper text | UPDATED `app/vocabulary-explorer.tsx` |
| Responsive daily cards and accessible nested tab styles | UPDATED `app/globals.css` |
| New functional + static tests | NEW `tests/v006-f04-daily-lessons.test.mjs` |
| Preserve existing regressions with new nested nav and moved lesson | UPDATED `tests/v006-f02-main-navigation.test.mjs`, `tests/v006-f03-stabilization.test.mjs` |

**Not changed:** `shared-content`, `app/page.tsx`, database schema, Supabase migration/RLS/auth code, user data, independent SDD branch, original `evaluation/ACCEPTANCE_MATRIX.md`, Android/notification/PWA code. There is no new package dependency.

## 2. Authentic RED / GREEN development chronology (do not erase failures)

| Commit or run | Observation |
|---|---|
| `73ff4b58` | Exact assistant-proposed F04 prompt stored as `AI_DRAFT`; **not an approval** |
| `49e73ab9` / [40886599690](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40886599690) | Exact student approval committed **before** any F04 code; baseline CI PASS |
| `237eeb32` / [40886823067](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40886823067) | **RED 41/42** after adding new F04 tests BEFORE F04 helper/code existed; missing new helper import caused new test file failure, previous suite passed. Typecheck/build skipped by workflow. |
| `5e958894`, `80a0d4e4`, `2fa0c15a`, `da6903d5`, `9900c132` | Helper, client daily view, nested navigation, location-corrected explanation and CSS committed incrementally. Intermediate CI stayed RED while old static test assumptions still reflected pre-F04 markup. Runs: [40886888377](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40886888377), [40886994042](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40886994042), [40887078410](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887078410), [40887111532](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887111532), [40887172689](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887172689). |
| `9900c132` / [40887172689](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887172689) | **RED 44/46**: V-006-F02 test incorrectly counted *all* `role=tab` controls as primary (now 2 primary + 2 nested); F03 static test looked for exact original explanatory phrase, intentionally changed when moving the mini-lesson. Neither failure was shown to be a new user-facing navigation bug. |
| `b487d1bf` / [40887251860](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887251860) | **RED 45/46** after correctly scoping the original "exactly two primary tabs" test to primary markup. The remaining failure required re-scoping the original mini-lesson explanation assertion to its new location. |
| `aa86cb6d` / [40887257970](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887257970) | **GREEN 46/46 tests, 0 FAIL; TypeScript PASS; Next.js build PASS**, after F03 test adjusted without deleting test or requirement. |

CI verification evidence: The GitHub Actions job steps, logs and check results confirm all three gates on the final app/test commit. Full suite has 41 previous + 5 F04 checks. The new F04 checks use TypeScript transpilation + pure-function evaluation with the real 456-row A2/B1/B2/C1 library, alongside static structural assertions.

### Specific tested assertions (and their limits)

- 456 source records/level; three bilingual, distinct `verb+meaning` picks for each level on same date; same date outputs identical selections.
- Next local day yields a disjoint three-sense set for all four level sources on sample dates.
- Synthetic two-`sticka` input verifies differing meanings are separate selectable senses, and unusable bilingual example rows are skipped.
- Local-date key uses local calendar components.
- Source inspection confirms original fixed mini-lesson exists once, two main sections and two nested destinations, navigation handoff, audio and no notification code.

Tests are **not** full browser E2E; they do **not** verify actual spoken audio, Web Push (deliberately absent), keyboard accessibility in a browser, restored guest exact sense while switching from daily tab, or running at midnight across device time zones. Do not present these as passed.

## 3. Deployment and manual-verification limits

- GitHub Actions: [40887257970](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887257970) **completed SUCCESS** at `aa86cb6d`. 46 tests passed; typecheck and build successful.
- GitHub commit status for the **exact same SHA** reports `Vercel` **SUCCESS — "Deployment has completed"**, with dashboard [deployment reference](https://vercel.com/aleksi9/nordljud-r2-vibe/4rnAM4gbjsk94LoDRwS58aspuQoj). This is authenticated GitHub integration metadata, not direct visual/functional evidence of the hosted app.
- Attempt to open https://nordljud-r2-vibe-sepia.vercel.app through web retrieval in this turn returned inaccessible. Prior browser connector attempts required an originating browser context; Vercel team API previously returned forbidden. No actual browser screenshot, session walkthrough or phone UI screenshot could be captured. **Browser interaction: BLOCKED / NOT TESTED**. This is not evidence that the website is down.
- No new Supabase access, migration, authentication test or RLS verification executed in F04.
- **Student acceptance:** PENDING. The student approved implementation, not the untested deployed UX.

## 4. Late scope and fairness in comparative report

The user's earlier UX critique of the end-of-page Mini Lesson triggered a location correction; the new user proposal added **three daily words and a future Android reminder vision**. This iteration combines **CONSTRUCTION+FIXATION** in the student's observed cycle. Do not count the feature expansion as an ordinary bug fix or claim Android reminders were delivered.

Shared methodology note in `main`: [CR-F04 late product feature and neutral assessment note](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/main/evaluation/CR-F04_LATE_DAILY_LESSONS_SCOPE_2026-10-29.md), commit `adde75044eb00e1af3e1533a21662a49ce3e914d`. Original independent F01–F15 test matrix remains pre-registered and unchanged; F04 is explicitly **post-baseline supplementary feature scope**, potentially assessable for both conditions after separate implementation. Do not feed condition/vibe implementation code/tests as a template to SDD.

Original pilot contains **Vibe, God Mode, SDD**; Round 2 contains **Vibe and Spec Kit SDD only**. Do not misrepresent the comparison designs.

**Android reminder roadmap only:** the student suggests optional daily push at user-selected time later. No PWA, Android package, service worker, push permission, notification subscription or server scheduler introduced in F04.

## 5. Manual acceptance checklist to complete with authentic browser evidence

1. Open stable hosted app, choose A2/B1/B2/C1. Confirm primary Explore vs Your Learning remains distinct and the Explore nested views **Verb Explorer** / **Today's Lesson** work with click and Left/Right/Home/End keyboard.
2. Open Today's Lesson in each level: confirm exactly three cards, authentic bilingual examples and listen buttons. Note if Swedish TTS is supported or not; test on at least one device.
3. Refresh on the same local day, verify the same three picks per level. Recheck when the local day changes; avoid manually changing the device's system clock without documenting it.
4. Click **Explore this verb** for a card; confirm same CEFR level and exact word+meaning is shown in Verb Explorer, and that its existing Learning and Practice Modes remain usable.
5. Open the original **fixed mini-lesson** below the three cards in Today's Lesson; verify quiz options/feedback, Swedish/English reveal, audio and correct level remain functional.
6. Switch between nested views and back; verify selected-verb state, saved Favorites/History and existing Guest Mode aren't lost or overwritten.
7. On phone/narrow viewport inspect card stacking, scroll and focus; capture authentic screenshots if permitted. Test login and user isolation separately where appropriate.

For each case preserve tested SHA and URL, device/browser/date, PASS/FAIL/BLOCKED result, reproduction steps and screenshots if actually captured. If the user reports problems, create an explicit correction prompt and receive approval **before** any additional implementation.

**No move to V-007 before the student accepts F04 or explicitly decides to continue with documented limitations.**
