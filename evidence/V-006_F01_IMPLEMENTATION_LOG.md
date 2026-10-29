# V-006-F01 — Collapsible Your Learning feedback correction

**Date:** 2026-10-29 (Europe/Helsinki)  
**Condition:** V2-A assisted Vibe Coding on `condition/vibe`.

## Source / prompt integrity
Student supplied the following practical problem in Persian: the **Your Learning** list grows with selected/saved verbs and pushes the main page down; they want an open/close menu. Student also reported that other checked functions *seemed to work*. The [complete literal student text](V-006_F01_USER_FEEDBACK.md) was committed **before implementation**, in [`691b00d`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/691b00da5d71ea19919046130caddb1ab525e7f6). ChatGPT independently translated this into the concrete implementation choices below. **The user did not separately approve an expanded English technical prompt**; this is direct feedback correction, not a new V-007 prompt. No independent Copilot/SDD agent was used.

## Implementation and retained behavior

[Code and new tests `f6e48ca`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/f6e48ca1b34e19a82afca2cf9cf2e7033cb6aa81):

- `app/learning-dashboard.tsx`: initial `expanded=false` for compact collapsed view, explicit **Show your learning / Hide your learning** toggle button, accessible `aria-expanded` and named panel, always-visible live counts of favorites, studied entries and recent history, plus Guest Mode message if unauthenticated.
- `app/globals.css`: compact spacing, visible keyboard focus and chevron; long favorites or practice history scroll **within** a fixed-height (~320px / mobile viewport-scaled) container instead of growing the main page.
- `tests/v006-f01-collapsible-dashboard.test.mjs`: static assertions for default-collapse, accessible toggle, existing CRUD controls and bounded scrolling.
- The Favorite action, `Study` navigation, four level progress counters, Practice History, deleting individual/all sessions, Guest behavior, auth session state and RLS database policies were left intact. No new Supabase migration, new credentials or user data mutations were made.

## Verification

- [Actions run `40858106443`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40858106443): **SUCCESS, 28 tests PASS, 0 FAIL**, TypeScript check PASS, Next.js production build PASS.
- [Vercel for exact code commit `f6e48ca`](https://nordljud-r2-vibe-l18829fek-aleksi9.vercel.app): **READY**.
- **Not verified manually:** student clicking the new control, viewing long content on mobile, and keyboard accessible behavior in a real browser. Need student browser acceptance.
- Original Google Login/Logout user confirmation from V-005 still stands; email registration remains **NOT student-tested**. User has not supplied a formal two-account RLS isolation test or independently documented cross-device re-login test. This fix must not inflate those acceptance claims.

## Suggested human acceptance

1. Open the hosted site; confirm Your Learning shows compact totals and **Show your learning** while the panel is initially closed.
2. Click to expand; check A2/B1/B2/C1 counts, Favorites list, saved practice results, removal and all usual interactions.
3. Add many favorites and practice rows; observe **internal list scroll**, not unbounded page growth.
4. Click **Hide your learning**, confirm main Vocabulary Explorer remains close and all account state stays saved after refresh.
