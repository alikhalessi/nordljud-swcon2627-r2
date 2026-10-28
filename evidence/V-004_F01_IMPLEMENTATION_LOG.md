# V-004-F01 — optional answer-reveal correction / implementation log

**Method:** V2-A assisted Vibe Coding  
**Date:** 2026-10-29 (Europe/Helsinki)  
**Exact student wording:** [V-004_F01_USER_FEEDBACK.md](V-004_F01_USER_FEEDBACK.md), committed **before code** in [`9ca2353`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/9ca23535f1881d258a957f0d754c47a4b9615c65).  
**Implementation:** [`a11e579`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/a11e5795f754eff31f9ec7937120830231f197ea).

## Original problem and intentional change

The initial V-004 interface immediately indicated a wrong answer and offered Try again or Next question. The student then requested **an extra, optional click** to see the correct answer after a mistake.

The assistant interpreted and implemented:
1. Wrong response: display normal **Not quite** feedback, **Try again**, **Show correct answer**, and **Next question**. The correct answer must **not** appear immediately.
2. Click **Show correct answer**: reveal the correct option and the stored explanation, keep Next question; no further answering or score credit for this question.
3. Correct first/after retry: keep existing **Correct** feedback and score behavior; do not expose Show correct answer for a correct response.
4. Switch question/restart: reset the reveal flag. The selected vocabulary and level are unchanged.
5. Keep all original stored Swedish/English content and vocabulary immutable. No accounts, persistent scores, or independently authored new lesson sentences.

## Provenance and reproducibility

The direct user instruction was accepted as a correction; **no additional complete assistant-written coding prompt was separately student-approved**. ChatGPT implemented it through the connected GitHub integration and authored the solution, including the no-credit-after-reveal rule. No independent Copilot session or Spec Kit workflow ran. Do not rewrite that as a fully preapproved student technical specification.

Affected files: `app/practice-panel.tsx`, `app/globals.css`, `lib/practice-engine.mjs`, `lib/practice-engine.d.mts` and `tests/practice-mode.test.mjs`.

The new test checks pure visibility policy: hidden before answer, hidden when correct, available when wrong, hidden again after reveal or question solved. The existing data tests still check question provenance.

## Verification and open limitations

- [GitHub Actions run 40778260051](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40778260051): **SUCCESS** for implementation commit `a11e579`. Exactly **15/15 automated tests PASS (0 failed)**, TypeScript typecheck PASS, Next.js production build PASS.
- [Vercel deployment of implementation commit a11e579](https://nordljud-r2-vibe-mxl1gc8au-aleksi9.vercel.app): deployment state **READY**. This proves deployment completion, not successful real audio or every user interaction. Later documentation-only commits may trigger further deployments.
- No actual click-through / E2E manual validation or device-level audio verification has been reported yet; user should test both wrong → reveal and wrong → retry → correct flows.
- The tests do not automatically click in the browser. The UI rendering and user experience require the student's acceptance.

## V3 research treatment

Treat F01 as **feedback during V2**, not as an advance solution provided to either isolated V3 implementation. For V3, use an equivalent neutral behavior requirement or replay the exact feedback only under the predefined conditional-feedback rule. Preserve prompt counts, provenance, unequal human interventions and any manual deployment conditions.
