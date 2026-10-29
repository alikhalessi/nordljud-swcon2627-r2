# UX-REVIEW-01 — read-only UX/UI baseline audit

**Date:** 2026-10-29 (Europe/Helsinki; no precise elapsed-time capture)
**Condition:** Nordljud Round 2, A — Vibe Coding
**Student approval:** [exact unmodified approval](UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md), commit `998bd195587e5d018cf3c4231065ef4ce92c65bb`; the [exact AI draft](UX-REVIEW-01_AI_DRAFT_2026-10-29.md) was committed first as `09e21edd82ae96d2ed301ee9cddcf8b81bd6ed5a`.
**Status:** `EXECUTED — SOURCE AUDIT COMPLETE / LIVE BROWSER AUDIT BLOCKED / NO FIXES MADE`
**Application-code snapshot:** `b7a6a990ddbb7e4a8fe0d9e0cccefd349806e088` (latest application-code-changing commit identified in the current branch history; subsequent commits `591c59e`, `09e21ed`, `998bd19` are evidence-only).
**Repository branch HEAD when assessed:** `998bd195587e5d018cf3c4231065ef4ce92c65bb`.
**Suggested hosted production:** https://nordljud-r2-vibe-sepia.vercel.app
**Exact-code READY preview according to previous implementation log:** https://nordljud-r2-vibe-mv6dhl0bq-aleksi9.vercel.app
**Method:** GitHub source review, source-traceable deterministic UX logic inspection, CSS contrast calculation, historical CI status and evidence-log inspection. **Not** a completed interactive desktop/mobile or accessibility-technology audit.

## 1. What was actually executed and what failed to open

1. Read the current `condition/vibe` TypeScript/React components, CSS, vocabulary/lesson/API logic, acceptance matrix, original V-005/V-006 approved prompts, V-006-F02 implementation evidence, and GitHub commit/Actions metadata. No code, database, content, application configuration or deployment was modified.
2. Both Vercel URLs were attempted through web retrieval, which reported them inaccessible. An independent read-only HTTP check also failed DNS resolution in the execution container. This does **not** prove the app is down or inaccessible to a normal user; it means **this evaluator could not reach the live page**.
3. Connected browser tab reading previously returned `Browser access requires the originating browser context`, so no authenticated or interactive browser actions, responsive screenshots, keyboard journeys, voice/audio checks, or real-person testing were performed.
4. Vercel project inspection previously returned `403 forbidden` requiring Vercel team authorization; no access was assumed. No authorization, login or Supabase account creation was silently bypassed.
5. GitHub Actions result for the approval HEAD `998bd195...`: [run 40877587773](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40877587773) **completed SUCCESS**; for preceding AI-draft evidence commit `09e21edd...`, [run 40876936841](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40876936841) **completed SUCCESS**. Prior [GREEN run 40859801729](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859801729) was recorded as **33 automated tests passed, TypeScript/build passed** at the repaired application-code SHA. Preserve the preceding [RED run 40859654821](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859654821) for the assistant-authored malformed test as evidence, not a product-browser failure.
6. **Screenshots: none acquired in this audit.** Screenshot evidence must not be invented. Baseline live desktop/mobile screenshots and instrumented browser actions remain **BLOCKED / NOT TESTED**.

## 2. Evidence classifications

- `SOURCE-VERIFIED`: behavior can be deduced from checked source/declared CSS and exact line references; no claim of visual browser reproduction.
- `CSS-CALCULATED`: exact declared color pairs evaluated with the WCAG relative-luminance contrast formula; live rendered theme/background still to be corroborated.
- `CI-VERIFIED`: result returned from GitHub Actions metadata, not manual acceptance.
- `REQUIREMENT-CONFLICT`: difference between independent acceptance matrix and approved incremental prompt; do not unilaterally call a feature defect.
- `BROWSER-BLOCKED`: interactive run could not be conducted here; NOT TESTED, not PASS/FAIL.

Official contrast criterion: [W3C WCAG 2.2 Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), normal text 4.5:1 at AA.

## 3. Findings ledger (ordered by next action)

### UX01 — Selection and filtered list can disagree
**Priority:** P1 / High usability concern. **Evidence:** SOURCE-VERIFIED, not browser-reproduced. **Phase:** V-009.  
**Code:** `app/vocabulary-explorer.tsx`, especially lines 212–224, 257–261 and 282–297. Filtering changes `matching` / `pageEntries`, but `chosen` is taken from unfiltered `entries` using old `selectedId`. Search typing does not change selection.
**Deterministic reproduction scenario to confirm live:** Select `arbeta` in the vocabulary list; then type `sticka` in search. The list filters to `sticka` while the detail pane can continue displaying `arbeta`. Or type a query with zero results; the old detail can remain visible next to `No matching verbs`.
**Expected:** Make clear whether detail is the previous selection and visible filtered results differ, or intentionally clear/reselect and label the new selection. **Actual from source:** No synchronization/notice for the query-change path. **Suggested minimal fix:** preserve intentional selection but show a visible `Selected word is outside current results` indicator with clear/reset selection; alternatively reselect only when appropriate. Confirm exact UX with student before implementation.

### UX02 — Guest retention does not satisfy the frozen F08 wording
**Priority:** P1 / Requirements decision, not automatically an approved bug fix. **Evidence:** REQUIREMENT-CONFLICT + source inspection. **Phase:** pre-V-008 decision, common change log if needed.
**Sources:** `evaluation/ACCEPTANCE_MATRIX.md` F08: a guest can retain appropriate browser-scoped local state after reload. `evidence/V-006_APPROVED_PROMPT.md` lines 18, 27: guests can learn/practice but their progress is not permanently saved and should have no remote persistence. `app/learning-state.tsx` and `app/vocabulary-explorer.tsx`: React-memory state with no guest localStorage/sessionStorage restore path; guest cloud writes disabled. GitHub code search for `localStorage` and `sessionStorage` returned no matching files on default-branch search, which alone is not proof for this branch; source component inspection is the direct basis.
**Expected per F08:** define which guest items, if any, persist after refresh in browser scope. **Actual:** no source-supported reload persistence for guest learning progress/selection. **Decision required:** (a) add limited browser-only guest retention, or (b) formally revise F08 for *both* experimental conditions before grading; do not silently move the target or violate the student's V-006 intent. Live refresh remains NOT TESTED.

### UX03 — Small explanatory text has inadequate declared contrast
**Priority:** P1/P2 accessibility correction. **Evidence:** CSS-CALCULATED, live rendering not verified. **Phase:** V-009.
**Code:** `app/globals.css` lines 59, 111, 114, 196; `body` page background `#f8faf8`, vocabulary card `#fff`.
- `footer` `#7d8a8b` on `#f8faf8`: **3.40:1** (12px; below 4.5).
- `.detail-footnote` `#73867d` on white: **3.86:1** (12px; below 4.5).
- `.vocabulary-explanation` `#6b7c73` on white: **4.42:1** (12px; below 4.5).
- `.visual-credits` `#687d72` on white: **4.41:1** (10px; below 4.5).
**Expected:** WCAG 2.2 AA normal-text contrast >=4.5:1 for the rendered foreground/background pair. **Actual:** above exact declared pairs are below that threshold. **Suggested fix:** darken relevant text tokens with minimum appearance change, then check live rendered pair/zoom/high contrast and automated axe when available. This is not a claim of full WCAG compliance/noncompliance beyond the reviewed pairs.

### UX04 — The fixed mini-lesson is a second, disconnected study flow
**Priority:** P2 / Medium; likely unnecessary navigation/scroll friction, not browser-confirmed severity. **Evidence:** SOURCE-VERIFIED structural design plus unverified experiential impact. **Phase:** V-009.
**Code:** `app/learning-app.tsx` lines 172–174 and later fixed `lesson.*` section; `app/page.tsx` derives one fixed mission per level; `app/vocabulary-explorer.tsx` line ~439 explicitly explains the original fixed lesson is separate.
**Reproduction:** Choose a verb not equal to the fixed seed for the current level, complete or inspect Learning / Practice above, then scroll to the original mini-lesson. The mini-lesson still uses the static seed, not the selected verb.
**Expected:** Make the second flow obviously independent or place it in an intentional compact/separate route; do not accidentally imply that its question applies to the currently selected verb. **Actual from source:** fixed lesson is below the large explorer and comparison. **Suggested fix:** clearly label it as a separate example, collapse it or simplify navigation if live review corroborates confusion. Do not remove required seeded missions without maintaining F01–F04.

### UX05 — Failed vocabulary load requires changing levels to retry
**Priority:** P2 / Medium friction. **Evidence:** SOURCE-VERIFIED. **Phase:** V-009.
**Code:** `app/vocabulary-explorer.tsx` lines 155–195, 242–245. The error message advises `Select another level and return to try again`; the data-fetching effect depends on `level`. No direct Retry button is present.
**Reproduction:** Simulate an API/network failure while loading A2. **Expected:** directly retry A2 from current error state. **Actual:** manual detour via B1 and A2. **Suggested fix:** add retry trigger with loading/error status and request cancellation; preserve currently selected word where possible. No live API failure was induced.

### UX06 — Meaning-only practice can be ambiguous for polysemous words
**Priority:** P1 for educational clarity, but belongs to **V-007 language/practice quality**, not the UX refactor. **Evidence:** SOURCE-VERIFIED. **Phase:** V-007.
**Code:** `lib/practice-engine.mjs` lines 67–78 constructs `Which English meaning matches "sticka"?`; the same written `sticka` has independent `knit` and `sting/prick/leave` senses in source. The question stem gives no contextual sentence identifying a single sense, even though the chosen question answer is tied to one specific record.
**Expected:** word-sense-specific exercise prompt (e.g. source sentence/context) without changing frozen dataset. **Suggested fix:** adapt exercise-generation logic in separately approved V-007 implementation. This is a content/question-design finding rather than an observed browser incident.

### UX07 — Missing verb-form placeholders can still be offered for speech
**Priority:** P2 content/affordance; belongs to V-007. **Evidence:** SOURCE-VERIFIED. **Phase:** V-007.
**Code:** `app/vocabulary-explorer.tsx` form playback condition checks `form?.word?.trim()`, which accepts the literal em dash `—` present as a missing-form placeholder in the original corpus; it then sends that placeholder to browser TTS.
**Expected:** no `Listen to form` button for a missing/placeholder form. **Suggested fix:** check usable linguistic form versus placeholder without silently filling in missing source material. Audible result NOT TESTED.

## 4. Positive design evidence (not live acceptance)

- Source includes two top-level `role=tab` controls with labeled tab panels, selected state, Left/Right/Home/End keyboard handling, and panel hiding (`app/learning-app.tsx` and `app/globals.css`). **Source-verified implementation, keyboard E2E NOT TESTED**.
- Source maintains separate semantic identity for the two `sticka` meanings, and `LevelComparison` validates both lemma and meaning. **Source-verified, browser selection NOT TESTED**.
- The dashboard provides Favorites / Learning Progress / Practice History views, search, level filters, 10-row pagination and explicit `latest 100` practice-history limit. **Source-verified, account sync NOT TESTED**.
- Main CSS has responsive breakpoints at 760px / 600px / 540px; `prefers-reduced-motion` rule is present. **Source-verified responsive rules, no narrow viewport screenshot or actual resize test**.
- Auth forms have input labels, email/password autocomplete, guest fallback, validation messages and explicit Google sign-in. **Source-verified; email sign-up, OAuth session, two-account isolation NOT TESTED**.
- Buttons have a global `:focus-visible` outline, selected tab styling, and some error/live status regions. **Source-verified; assistive-tech / axe audit NOT TESTED**.

## 5. Common acceptance matrix status for this audit (not the final product)

| ID | Relevant evaluation scope | Result in UX-REVIEW-01 | Reason |
|---|---|---|---|
| F01–F04 | Four-level missions, listening, two practice checks | NOT TESTED live | Source present, no interactive access |
| F05–F07 | 456 senses/level, two `sticka` senses, level switch | NOT TESTED live | Source support; manual end-to-end unavailable |
| F08 | Guest learning and reload retention | REQUIREMENT-CONFLICT / runtime NOT TESTED | Frozen F08 differs from recorded guest-state behavior |
| F09–F10 | Email/Google authentication | BLOCKED | No live session/provider walkthrough |
| F11–F12 | Cloud saved progress / identity isolation | BLOCKED | No authenticated account access or controlled second-user test |
| F13 | Mobile and keyboard study navigation | BLOCKED | Responsive/focus CSS exists, but no real browser |
| F14 | Actionable failures, secret handling | PARTIAL STATIC | UX05 retry path concern; no full security review |
| F15 | Reproducibility | CI-VERIFIED PARTIAL | Git HEAD and CI observed, no independent environment rebuild |

**No UX functional scenario was newly marked PASS from static inspection alone.** CI SUCCESS is a technical status only.

## 6. Recommended implementation sequence and approval gates

1. **Before code:** Student reviews this audit and approves any changes in a *new* development prompt. Resolve F08 guest-retention matrix conflict once for both conditions.
2. **V-007:** Fix ambiguous practice sense and placeholder audio, while preserving frozen educational dataset and independently logging uncertain language corrections.
3. **V-008 Lite:** Check cloud favorites, studied, progress and history with real users; avoid rebuilding functionality that already exists.
4. **V-009:** Correct list/detail mismatch, contrast, direct retry and optional fixed-lesson navigation simplification. Verify mobile and keyboard with real browser.
5. **V-010 Final Gate:** Run independent shared F01–F15 acceptance against frozen Vibe and SDD snapshots, record method-specific RED/GREEN, performance/assistive-tech checks when environment permits, and write final seven-section course report with honest gaps.

**Research separation:** The original pilot compares **Vibe / God Mode / SDD** in `alikhalessi/nordljud-software-construction`; Round 2 compares **Vibe / Spec Kit SDD only** in this repository. Do not invent a third Round 2 condition or copy Vibe code into SDD. The historical comparison can inform discussion but is a distinct experiment.

## 7. Evidence index and reproducibility

| Evidence | GitHub reference / source |
|---|---|
| Student original approval | `evidence/UX-REVIEW-01_STUDENT_APPROVAL_2026-10-29.md` / `998bd195` |
| Prior exact prompt, AI-authored | `evidence/UX-REVIEW-01_AI_DRAFT_2026-10-29.md` / `09e21edd` |
| Base implementation, test repair | `b7a6a990ddbb7e4a8fe0d9e0cccefd349806e088` |
| Successful current approval CI | [40877587773](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40877587773) |
| Successful earlier 33-test code CI | [40859801729](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859801729) |
| Historical failure (must retain) | [40859654821](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40859654821) |
| App source | `app/learning-app.tsx`, `app/vocabulary-explorer.tsx`, `app/learning-dashboard.tsx`, `app/auth-controls.tsx`, `app/globals.css`, `lib/practice-engine.mjs` |
| Fixed common acceptance | `evaluation/ACCEPTANCE_MATRIX.md` |
| Screenshots | **NONE — inaccessible from this session, do not fabricate** |
| Actual UI/browser actions | **NONE — blocked, needs connected browser or user-provided authentic evidence** |
| Database modifications | **NONE** |
| Application code modifications | **NONE** |
| Deployments triggered by the audit | **NONE requested** (repository evidence commits may trigger the existing CI/deployment automation; do not conflate that with a feature deployment) |

**Audit conclusion:** Useful source-based UX blockers and design risks were identified, but **live UX/UI acceptance is not complete**. This is a finished **read-only static baseline audit with explicit browser-access gap**, not a declaration that the deployed product is fully verified.
