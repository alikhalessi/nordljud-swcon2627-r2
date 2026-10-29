# V-006-F02 implementation and validation — independent learning tabs

**Date:** 2026-10-29 (Europe/Helsinki)  
**Branch:** `condition/vibe` of `alikhalessi/nordljud-swcon2627-r2`

## Origin and student approval

The V-006-F01 collapsible dashboard did not solve the user's real workflow obstruction: opening a long Your Learning panel still pushed the main lesson and Vocabulary Explorer farther down the page. The student proposed two selectable destinations side by side instead of stacking both sections. The assistant authored a two-tab solution with retained selection, subviews, search/filter/pagination. The student replied **"موافقم، لطفا انجامش بده."**. [Exact approval and attribution were recorded before implementation](V-006_F02_APPROVED_NAVIGATION.md), commit [3992189](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/3992189c0b5c8a8c3c5eadfac6f077b55613ba2b). Do not represent the assistant's design interpretation as a separate student-written engineering prompt.

## Implementation

ChatGPT implemented via the GitHub connector (not an independent coding agent/Spec Kit) in [`d6a11f6`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/d6a11f6ab1b6815ef2f470247c882a6419c9d002):

- `app/learning-app.tsx`: adjacent **Explore Your Words** and **Your Learning** tabs below the intro, with ARIA tab roles, `aria-selected`, controlled panels, keyboard Left/Right/Home/End, and selected tab focus. Explore is the default. Only its panel displays the four level buttons, selected verb, Learning/Practice, cross-level comparison and original mini lesson. Only the Your Learning panel displays the personal dashboard.
- Both panels **remain mounted and the inactive one is hidden**; switching destinations does not erase in-memory selected verb, level or Practice state. `Study` from the saved dashboard passes exact `verb + meaning` and target level back to the explorer and focuses/scrolls to the Explore tab.
- `app/learning-dashboard.tsx`: independent **Favorites, Learning Progress, Practice History** subviews, current live counters by A2/B1/B2/C1, verb/meaning search, optional per-level filters and **10-record pages** with Previous/Next. Remove Favorites, undo Studied and delete one or all Practice sessions remain usable, as does Guest Mode warning. The history provider currently loads the **latest 100** records; this is visibly disclosed rather than falsely claiming full database history pagination.
- `app/globals.css`: responsive horizontal tabs, selected/focus styles and dashboard cards/filters/pagination. F01 accordion CSS was superseded. Native hidden panels are explicitly hidden via `.primary-study-panel[hidden]`.
- `tests/v006-f02-main-navigation.test.mjs`: 5 new static regression assertions for tab navigation, panel exclusivity and persistence by staying mounted, Study navigation, the three saved views and guest behavior. The former F01 accordion test file was updated *transparently* to check the original page-push regression instead of demanding the discontinued accordion.
- **No Supabase schema changes, RLS changes, database writes or authentication configuration changes** were made for F02. Student's previously saved account data remains in place.

## Real CI chronology — preserve RED

1. [RED run `40859654821`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859654821): `tests/v006-f02-main-navigation.test.mjs` contained **three missing closing parentheses in `readFileSync` calls**. The CI test step failed due to a JS syntax error, so TypeScript and build were skipped. This was an assistant-authored test mistake, not an observed product bug.
2. [Test repair commit `b7a6a99`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/b7a6a990ddbb7e4a8fe0d9e0cccefd349806e088) corrected the exact three parentheses without hiding the failed run.
3. [GREEN run `40859801729`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859801729): **33 tests PASS, zero FAIL**; TypeScript check PASS; Next.js production build PASS.
4. [Vercel deployment for exact repaired SHA](https://nordljud-r2-vibe-mv6dhl0bq-aleksi9.vercel.app): READY for `b7a6a990ddbb7e4a8fe0d9e0cccefd349806e088`. The stable project domain is `https://nordljud-r2-vibe-sepia.vercel.app`; student browser test still pending.

## Student acceptance needed

- On stable URL, check both tabs appear adjacent and only one of Explore / Your Learning is displayed at any given moment.
- Select a Swedish word at a chosen level, switch to Your Learning, then return; word, level and current lesson/practice should still be selected.
- Open Your Learning → Favorites, Learning Progress, Practice History, search/filter level, test Previous/Next after enough saved items, and test Study button navigation back.
- Verify guest can still study, but no permanent saved cloud data appears. In authenticated mode test a saved entry survives refresh and relogin. Mobile tab layout requires a browser review.
- **Still unverified elsewhere:** user-isolation with a second real account and cross-device data replay. **Email sign-up was not student-tested** (student explicitly corrected the earlier assistant's statement).

**Methodological integrity:** Static tests and READY deployment are not proof of browser-level acceptance. Do not mark V-006-F02 fully user accepted until the student reports the tested interaction.
