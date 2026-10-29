# V-006-F03 — focused stabilization: implementation, RED→GREEN evidence and handoff for student acceptance

**Course:** Åbo Akademi SWCON2627 / Nordljud Round 2
**Condition:** A — iterative Vibe Coding
**Branch:** `condition/vibe`
**Date:** 2026-10-29 (Helsinki, no invented exact clock time)
**Status:** **IMPLEMENTED, 41/41 CI PASS; LIVE BROWSER ACCEPTANCE BLOCKED / STUDENT ACCEPTANCE PENDING**
**Code/test commit evaluated:** `473c7c60ed468c3634acb886b3b275dbc1b93d5a`
**Previous last application code:** `b7a6a990ddbb7e4a8fe0d9e0cccefd349806e088` (V-006-F02)
**Approval FIRST, before any V-006-F03 code:** [Exact student approval](V-006-F03_STUDENT_APPROVAL_2026-10-29.md), commit `187bad3b07747112821157e19ea863e8e1e52b36`.
**Exact approved assistant-drafted prompt:** [AI draft](V-006-F03_AI_DRAFT_FOCUSED_STABILIZATION_PROMPT_2026-10-29.md), commit `88bb49b42973c0e5c6061888edfcf6229844fd83`.
**Decision history and student's original construct↔fixation research observation:** [detailed rationale](V-006-F03_FOCUSED_STABILIZATION_DECISION_AND_RESEARCH_RATIONALE_2026-10-29.md).

## 1. Why this corrective increment was executed

After V-006-F02 introduced Explore Your Words / Your Learning tabs, UX-REVIEW-01 identified source-supported usability risks and a frozen requirement discrepancy. Student deliberately selected focused Option A instead of a broad visual redesign or deferring issues; an exact prompt was drafted, saved and expressly approved before code. F03 is a **separate corrective cycle** between construction in V-006 and planned language review V-007.

### Baseline conditions

- Previous application at `b7a6a99`, docs-only commits through draft `88bb49b`, then approval `187bad3b`. No permission transfer from earlier UX read-only audit was assumed.
- Seven findings in [UX baseline audit](UX-REVIEW-01_BASELINE_AUDIT_2026-10-29.md); machine-readable original findings in [CSV](UX-REVIEW-01_FINDINGS.csv).
- No confirmed live browser audit available at start; source/CI-only baseline and explicit gaps.
- Frozen lexicon and common matrix remain untouched.

## 2. Implementation matrix — actual changes

| Item | Before (source audit) | Changes committed | Evidence status |
|---|---|---|---|
| **UX01** list and detail may disagree | Search/filter could show `sticka` while detail still shows previously selected `arbeta` without explanation | `app/vocabulary-explorer.tsx` derives `selectionOutsideResults` by checking whether selected ID occurs in filtered `matching`. Shows explanatory live-status message and **Clear filters** button resetting word query, photo-only, favorites-only and page. Keeps the intentional selected sense and target from saved dashboard. Commit `bea29b2`. | **CODE CORRECTED; STATIC TEST PASS; browser scenario NOT TESTED** |
| **UX03** insufficient text contrast | footer 3.40:1, detail footnote 3.86:1, vocabulary note 4.42:1, photo attribution 4.41:1 for stated pairs | `app/globals.css` changes to footer #52696d on #f8faf8 (~5.56:1), footnote #51695c on white (~5.96:1), explanation #536c5e on white (~5.72:1), image attribution #52695e on white (~5.93:1). Small styling for alert/retry, selected word notice and separate lesson. Commit `cfbc05a`. | **CSS CALCULATED / REGRESSION PASS; actual rendered contrast untested** |
| **UX05** no same-level retry | Level switch was recommended to retry a failed API | Adds `retryToken` effect dependency and labeled button **Retry loading {level}**, preserves `AbortController` cleanup. Commit `bea29b2`. | **CODE CORRECTED; STATIC TEST PASS; network-failure E2E NOT TESTED** |
| **F08 / UX02** guest reload selection | No persisted guest selection; frozen F08 expects appropriate browser-scoped state | New `lib/guest-preferences.ts` stores **only** level, verb spelling, exact English meaning and `learn`/`practice` mode under `nordljud-r2-guest-selection-v1`, validates stored input, catches disabled storage; `app/learning-app.tsx` restores/saves level after hydration; `app/vocabulary-explorer.tsx` restores/saves selected sense and mode, guarding writes until correct level's data loaded. Commits `67d115e`, `a387b2f`, `bea29b2`. No cloud writes for guests, no saved guest scores, favorites or study history. | **PREFS HELPER RUNTIME TEST PASS, REACT WIRING STATIC PASS; actual browser refresh NOT TESTED** |
| **UX04** fixed mini lesson may seem related to selected verb | Separate mission used static seed while exploration had arbitrary selected verb | `app/learning-app.tsx` visibly labels **SEPARATE MINI LESSON** and states the example does not change when another verb is selected; no redesign or removal of F01–F04 mission. Commit `a387b2f`. | **CODE CORRECTED; STATIC TEST PASS; user clarity acceptance pending** |

### F08 interpretation and shared fairness

The student explicitly approved browser-only guest preservation of *study selection* after refresh, not cloud saving of guest learning progress. [Shared main-branch late interpretation CR-F08-01](https://github.com/alikhalessi/nordljud-swcon2627-r2/blob/main/evaluation/F08_SHARED_INTERPRETATION_CHANGE_2026-10-29.md), commit `4c059fc527c48831251c6c9da07781c85e595500`, documents this neutral outcome for **both Round 2 conditions**, explicitly marks its post-baseline timing and does **not** rewrite `evaluation/ACCEPTANCE_MATRIX.md`. The SDD implementation receives only neutral acceptance criteria, **never the Vibe source implementation**.

Browser-local selection is shared by users of that origin/browser, even if they are signed in, and is not account-private learning history. If browser storage is cleared, disabled, or on a different device, preference restoration is not guaranteed. It is not a claim of server-side privacy verification.

### Intentionally out of scope / deferred

- **UX06**: multilingual ambiguity in bare `sticka` meaning questions → V-007.
- **UX07**: speech button for literal missing form `—` → V-007.
- CEFR certification, translation corrections and frozen educational dataset edits → V-007 or separate approved shared change control.
- New dashboard features, scores or analytics → V-008, not F03.
- Full mobile/a11y redesign → V-009 after actual browser tests.
- Security/account E2E, long-lived history and final reproducibility review → V-010.
- No Supabase table/migration, RLS, auth configuration, common frozen dataset, independent SDD code or user data was modified in this iteration.

## 3. Tests and negative results — genuine chronological record

The team intentionally added F03 regression tests **before** the implementation, creating a visible RED checkpoint. This commit series also includes mistakes made by ChatGPT during the test creation and repair; they are **preserved, not hidden**:

| SHA / run | Outcome and cause |
|---|---|
| `187bad3` / [40882902593](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40882902593) | CI SUCCESS on approval/evidence-only baseline; pre-code authorization |
| `21adad6` / [40883184389](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883184389) | RED after new `tests/v006-f03-stabilization.test.mjs` was added before actual fixes. Also contained an assistant-authored regex typo in the new test. |
| `3a07047` / [40883231001](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883231001) | Still RED as expected after repairing the test typo; changes not yet implemented. |
| `67d115e` / [40883308586](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883308586) | RED during incremental implementation. |
| `a387b2f` / [40883345724](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883345724) | RED during incremental implementation. |
| `bea29b2` / [40883429745](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883429745) | RED during incremental implementation. |
| `cfbc05a` / [40883488708](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883488708) | **37/38 passed, 1 failed**, typecheck/build skipped. Root cause: newly written negative assertion scanned the full guest preferences file for words `score/history/favorite`, falsely triggering on a comment that explicitly says those values are **not** stored. This is a **test-assertion error**, not a discovered actual privacy leak. |
| `1c8f816` / [40883676924](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883676924) | **GREEN 38/38 tests, TypeScript PASS, Next.js production build PASS**, after narrowing privacy assertion to actual TypeScript preference data structure. |
| `473c7c6` / [40883820378](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40883820378) | **FINAL GREEN 41/41 tests, TypeScript PASS, Next.js production build PASS**. Added 3 functional tests in `tests/v006-f03-guest-preferences-runtime.test.mjs`, executing transpiled real TS helper using a fake browser-localStorage, checking exact-sense persistence, invalid data recovery and storage-unavailable exception handling. |

**Method integrity:** The regression tests are not browser E2E tests. Five new F03 source-pattern/contrast tests and three controlled runtime helper tests extend the prior 33-test suite to 41 tests. The test suite contains some source-inspection assertions (like earlier project tests), so CI cannot claim end-to-end UX acceptance.

## 4. External execution limits and independent validation status

- **GitHub Actions:** run 40883820378 completed **SUCCESS**, 41 tests/0 failures, typecheck successful, build successful. This is independently observed CI metadata and job logs, not inferred from a commit label.
- **Live Vercel browser:** https://nordljud-r2-vibe-sepia.vercel.app could not be accessed using the available web retrieval path. In this environment the connected browser returned `Browser access requires the originating browser context`. Therefore no desktop screenshots, mobile screenshots, keyboard navigation, signed-in session, auth, speech/audio, live reload, or API-retry interaction was actually exercised. **BROWSER BLOCKED / NOT TESTED**. This cannot establish that the hosted application is down; it establishes evaluator access restriction.
- **Vercel metadata/deployment:** team-scoped connector returned 403 `Not authorized`; therefore no new Vercel READY deployment or production domain update was verified for the F03 commit. The GitHub branch has the code, but **deployed-state unverified**. Any Vercel automated deployment on push must be independently checked before a claim of READY.
- **Supabase data:** no database use, migrations or schema modifications during F03; existing RLS and per-account isolation were NOT tested live in this iteration.
- **Accessibility:** four specific CSS declared foreground/background pairs calculated above 4.5:1; full WCAG conformance, zoom, screen reader, responsive layout and keyboard focus remain NOT TESTED.
- **Screenshots:** NONE obtained; no false screenshot citations or visual PASS.
- **Final student acceptance:** PENDING; do not move to V-007 without explicit student acceptance or approved transition with blockers.

## 5. Focused manual student acceptance checklist (for actual live site)

1. In Guest Mode choose B2, search `sticka`, choose `knit`, select Practice Mode, reload the same site/browser: verify **B2 + knit sense + Practice Mode** restored. Switch to other `sticka` meaning and repeat; verify no cross-sense collision. Cloud history/favorites should not be guest-saved.
2. Select `arbeta`, then search `sticka`: verify the warning explains the currently visible detail is outside filtered results. Click **Clear filters** and verify search/photo/favorite filters clear and selected entry stays meaningful.
3. Trigger a network/API failure when loading a level (e.g. through browser developer tools if available): verify direct **Retry loading A2/B2** loads same level without changing the selected learning context.
4. Inspect the mini lesson below explorer: label reads **SEPARATE MINI LESSON**, and makes it clear that the fixed mission will not follow the selected verb.
5. Inspect footer, caption/credits and footnotes at desktop and narrow mobile viewport; use browser accessibility tools if available. Check keyboard navigation of both primary tabs and study controls.
6. In signed-in mode confirm cloud favorites/studied/history remain intact; basic guest browsing remains usable when storage is disabled.

Record browser, timestamp, deployment SHA/origin, observed result and screenshots if truly captured. Do not mark these PASS from this CI report alone.

## 6. Research conclusion (not a final comparative finding)

This iteration is a concrete **FIXATION/CORRECTION** following earlier V-006 feature construction and F01→F02 user-driven navigation adjustments. It includes a test-written-before-code RED interval, an additional assistant-authored false-positive test, repair, and final GREEN CI. This supports the student's qualitative **Construct → Evaluate → Fix → Validate → Construct** process hypothesis, but does NOT show that the SDD approach will have fewer/more defects; the independent SDD run and common browser acceptance are pending. Preserve all negative results and approvals for the final university report.

**Historic vs current:** Previous pilot `alikhalessi/nordljud-software-construction`: Vibe / God Mode / SDD (three methods). This Round 2 repo: Vibe vs independent Spec Kit SDD (two conditions). Do not conflate rounds or assert the same product implementations were evaluated under three methods in Round 2.

## 7. Student decision gate

The implementation and available automated verification are complete; **live app/student acceptance is not**. Await the student's actual F03 review and explicit approval to move forward to V-007. If the student finds additional defects, record a separate exact feedback/corrective prompt, classify it honestly and do not silently append unapproved scope.
