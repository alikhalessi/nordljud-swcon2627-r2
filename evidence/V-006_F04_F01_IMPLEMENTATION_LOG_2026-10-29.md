# V-006-F04-F01 — Today's Lesson relocated into Your Learning

**Date:** 2026-10-29 (Europe/Helsinki; use GitHub timestamps for actual commits)
**Course:** Åbo Akademi Software Construction SWCON2627
**Experiment:** Nordljud Round 2, Condition A / Vibe Coding
**Branch:** `condition/vibe`
**Status:** `CODE CORRECTION IMPLEMENTED / CI GREEN 51 OF 51 / LIVE BROWSER AND STUDENT ACCEPTANCE PENDING`
**Tested implementation commit:** `f5e7bf653f966c6b8a53537b55740b7ef026beaf`
**Pre-F01 application baseline:** `aa86cb6d69e9a52a4668863132f7e93996491811`, [F04 46/46 green run 40887257970](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40887257970).
**Draft exact prompt archived FIRST:** [F04-F01 AI draft](V-006-F04-F01_AI_DRAFT_MOVE_TODAYS_LESSON_TO_YOUR_LEARNING_2026-10-29.md) / `fd53d3afb32b07510d1ae74fb4d66a46fef50dbe`.
**Exact student approval committed BEFORE any code:** [F04-F01 original approval](V-006-F04-F01_STUDENT_APPROVAL_2026-10-29.md) / `c3c46f701d4929c857d795470ba5535fd2bd1311`.
**Original student feedback (verbatim Persian):** [post-F04 Learning Hub feedback](V-006_F04_POST_IMPLEMENTATION_STUDENT_FEEDBACK_LEARNING_HUB_2026-10-29.md).
**Prompt author:** ChatGPT prepared the English development draft; student explicitly approved exactly that version. Assistant authored and committed changes. Do not misattribute English draft wording as originally student-authored.

## 1. Trigger and correction rationale

The student reviewed F04 and asked to place Today's Lesson within **Your Learning**, since the daily words and original Mini Lesson are part of the learning journey, not mere free-form word exploration. The same feedback introduced future **Daily Archive**, **Remind Me Later** and 7-/14-day tests, but these are new, separately deferred requirements for later V-008. They were NOT authorized as part of this scoped correction. The student explicitly approved this narrower change after seeing the exact prompt.

This is `FIXATION: INFORMATION_ARCHITECTURE / STUDENT_FEEDBACK`, not newly constructed daily-content logic. It is a clear real example of the student's proposed **Construct → Human Evaluation → Fixation → Validation** sequence. A prior F04 automated GREEN CI did not independently validate the student's mental model for where daily learning belongs. It does not establish any comparative causal conclusion.

## 2. Files and actual changes

| File | Scope | Outcome |
|---|---|---|
| `tests/v006-f04-f01-learning-navigation.test.mjs` | New targeted tests committed before source change (`be4d6ebc5`) | Five tests for two main areas, accessible nested Today/My Progress, Guest access, shared level and exact sense handoff, original lesson/quiz, and no new archive/reminders |
| `app/learning-app.tsx` | Main navigation and render structure (`89c6b8ad`) | Retained main **Explore Your Words** and **Your Learning** tabs; Explore now directly contains the original `VocabularyExplorer`; **Your Learning** contains default **Today's Lesson** and **My Progress** secondary ARIA tabs. Relocated existing `DailyLesson` and unique original Mini Lesson/quiz together into Today's Lesson; kept `LearningDashboard` in My Progress without changing account-based data code |
| `app/learning-app.tsx` | Shared selection and keyboard | Existing A2–C1 level buttons in Explore plus a compact `learning-level-select` control in Your Learning both call the same `changeLevel` state handler; no independently diverging levels. Left/Right/Home/End and selected-state focus are handled by `onLearningViewKeyDown` |
| `app/learning-app.tsx` | Guest and exact sense | Daily area lives *outside* the private-data dashboard; it remains available to Guest Mode. `returnToVerb` retains the full `verb+meaning+level` handoff to Explore; selected study context is preserved by mounted hidden panels |
| `app/globals.css` | Scoped CSS replacement (`af6a5707`) | Renamed old Explore subtab styling to Your Learning subtabs, added compact responsive Your Learning level picker and retained existing responsive daily cards |
| `tests/v006-f04-daily-lessons.test.mjs` | Old navigation expectations (`33f73826`) | Updated old F04 structural assertions to the newly approved location while retaining source-data/date/meaning tests |
| `app/vocabulary-explorer.tsx` | Navigation hint (`f5e7bf65`) | Now points to **Your Learning → Today's Lesson** rather than an Explore subsection |

**No modifications** to `app/daily-lesson.tsx`, `lib/daily-lessons.ts`, `shared-content`, `app/learning-dashboard.tsx`, `app/learning-state.tsx`, Supabase migrations/RLS, OAuth, shared frozen acceptance matrix or independent SDD branch. No new archive, reminder, scheduled tests, PWA or push notification feature.

## 3. Chronological CI evidence: RED → GREEN, including honest intermediate failures

| SHA / GitHub run | Result from GitHub Jobs/Logs | Meaning |
|---|---|---|
| Approval evidence `c3c46f7` / [40890319729](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890319729) | SUCCESS pre-code baseline | Permission and unchanged implementation snapshot |
| New F01 tests `be4d6ebc5` / [40890430309](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890430309) | **RED: 47/51 PASS, 4 FAIL** | The new user-journey tests exposed four missing location/navigation expectations before fixes. No code change had yet occurred. Typecheck/build skipped because test step failed |
| UI code `89c6b8ad` / [40890546181](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890546181) | **RED: 49/51 PASS, 2 FAIL** | Navigation correction largely present, but old F04 tests assumed Explore nested tabs and CSS still needed re-scoping |
| CSS `af6a5707` / [40890585154](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890585154) | **RED: 50/51 PASS, 1 FAIL** | Original F04 source-structure test still looked for former Explore placement. This is a changed structural requirement, not a demonstrated live app defect |
| Adjusted old test `33f73826` / [40890644384](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890644384) | **GREEN: tests, TypeScript and build PASS** | Retained all prior data checks; old structural assertion updated to new requirement |
| Final application/test code `f5e7bf653f966c6b8a53537b55740b7ef026beaf` / [40890668799](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40890668799) | **GREEN: 51/51 PASS, 0 FAIL; TypeScript PASS; Next.js production build PASS** | Final verified implementation snapshot |

**Failures retained:** CI red runs remain accessible and are not overwritten or counted as human-tested browser defects. This is another bona fide correction cycle following a green predecessor, contributing to the research experience report.

## 4. Deployment, manual verification, and honest limits

- GitHub's authenticated Vercel commit status on the exact tested code SHA `f5e7bf653...` reports **SUCCESS — "Deployment has completed"**, [Vercel deployment dashboard](https://vercel.com/aleksi9/nordljud-r2-vibe/7fxfaW4W5JM8eUE695M7PnRdauDy). This establishes Vercel integration reporting success, **not real browser acceptance** or a guarantee that an alias is available.
- Browser connector checked in this iteration, returned: `Browser access requires the originating browser context. Open ChatGPT in the browser with the connected extension and try again.` Consequently real desktop/mobile/keyboard/speech/guest authenticated user flow and screenshots: **BLOCKED / NOT TESTED**. No screenshots fabricated.
- CI has source-pattern tests and logic checks, not E2E browser tests. 51 green checks do not prove usable mobile presentation, correct Web Speech audio or correct user experience on the actual Vercel deployment.
- No actual sign-in, two-account isolation or RLS penetration tests performed as part of F01. No Supabase data or account changes performed.
- The `Your Learning` level picker can control both main areas in code; the user's actual interaction/acceptance is pending.

## 5. Manual acceptance scenarios for the student

1. Open hosted Vibe app and choose **Explore Your Words**: direct Verb Explorer, no nested Explore subnavigation or daily cards underneath.
2. Choose **Your Learning** while signed out: default Today's Lesson must show **three daily verbs and the unique original Mini Lesson/quiz** without requiring an account.
3. Switch Your Learning to **My Progress** as Guest: should show the pre-existing guest-specific notice; signing in should show unchanged Favorites, Learning Progress and Practice History.
4. Set **B2** from Your Learning selector, switch to Explore, and confirm B2 is still selected; change to C1 in Explore and confirm Your Learning also reflects C1.
5. On daily card click **Explore this verb**: verify it opens exact Swedish verb AND exact English meaning and matches the correct level, particularly the two `sticka` meanings.
6. Complete the fixed quiz with a wrong answer and right answer, test **Try again**, translation reveal and speech if supported. Check A2/B1/B2/C1 seed missions.
7. On phone/narrow viewport check wrap, tab focus, nested arrow/Home/End keyboard actions and return focus from daily cards. Capture actual screenshots only if obtained. Record observed results, browser, date and tested deployed SHA.

**Final student acceptance remains PENDING. V-007 has NOT started.**

## 6. Final research note

The original pilot involves **Vibe / God Mode / SDD** (three methods) in `alikhalessi/nordljud-software-construction`; the current Round 2 experiment compares **Vibe / Spec Kit SDD** (two independent conditions). This UX rearrangement is an explicitly human-directed Vibe correction after the daily-learning feature construction. Preserve the student's original wording, exact prompt approval, tests and negative runs. Do not invent an F01 improvement rate, time estimate, screen-reader result or SDD counterpart.
