# Common acceptance clarification CR-F08-01 — guest browser-scoped state

**Date:** 2026-10-29
**Status:** STUDENT-APPROVED INTERPRETATION / BASE MATRIX TEXT UNCHANGED
**Approval provenance:** [Exact V-006-F03 student approval on Vibe branch](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006-F03_STUDENT_APPROVAL_2026-10-29.md), approving the [exact proposed prompt](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/V-006-F03_AI_DRAFT_FOCUSED_STABILIZATION_PROMPT_2026-10-29.md) including F08 interpretation.
**Original criterion:** [evaluation/ACCEPTANCE_MATRIX.md](ACCEPTANCE_MATRIX.md), F08: "A guest can study and retain appropriate browser-scoped local state after reload."
**Evidence source for requirement conflict:** [UX-REVIEW-01 baseline audit](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/condition/vibe/evidence/UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md).

## Why an explicit interpretation is necessary

The frozen F08 expected some browser-scoped guest state to survive reload, while an earlier approved V-006 prompt described guest *progress* as not being saved permanently. This is potentially confusing but need not conflict: selected **study navigation preferences** can persist locally, whereas personal scores/history/favorites need not.

The student explicitly approved the following narrow F08 reading for V-006-F03, *after* the original independent matrix was frozen. This is a transparent late interpretation, **not** a silent rewrite of the original common matrix.

## Same outcome expectation for both method conditions

For both independently implemented Round 2 apps (Condition A Vibe and Condition B SDD), a guest should be able to:
1. Select level B2, then select the exact Swedish word-sense pair `sticka` / `knit`, then choose Practice Mode.
2. Refresh in the **same browser**, on the **same origin**, with storage enabled. The UI should recover B2, the exact `sticka` / `knit` sense, and Practice Mode.
3. Change to the *other* `sticka` sense; after refresh it should return to that exact meaning, not merely the identical spelling.
4. Use learning/practice without a cloud account, and without cloud persistence of guest favorites, practice scores or practice history. Guest account-private state should not be inferred from public/local UI.
5. When storage is disabled or invalid, the app should remain usable as a guest with a safe default; persistence may not be guaranteed.

Exact browser mechanism is intentionally **unspecified** for SDD (localStorage, session mechanism, etc. are implementation choices); testing is **black box**. Data may remain on the shared local browser for a subsequent visitor and is not a private user account; clear-browser-data option may therefore be relevant to final privacy review.

## Scope and fairness

- The original F08 text in `ACCEPTANCE_MATRIX.md` stays unchanged and retains its pre-implementation provenance.
- This clarification is post-baseline, student-approved **while Condition A was under development**, and must be explicitly disclosed as a sequencing/order and informed-requirements bias in comparative analysis.
- The neutral outcome expectation is available to **both** conditions. The SDD implementation must not receive the Vibe fix, architecture, code or tests as a template. Independent common acceptance is performed after both are frozen.
- Do not claim browser test PASS solely from static source or green CI. Desktop/mobile keyboard testing, second-account privacy and OAuth remain separate requirements.
- Historical pilot remains three-method; the current Round 2 has only two conditions. This note does not add a third current implementation.

## Evidence collection checklist (future browser evaluation)

Record timestamp/date, condition, deployment/origin, tested commit SHA, browser and storage configuration, initial level/sense/mode, state after reload, guest account status, screenshot/video when authentic, verdict PASS/FAIL/BLOCKED/NOT TESTED, and any correction required.

**This file changes neither application nor SDD code, data source nor database schema.**
