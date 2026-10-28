# Prompt ledger (authentic executed history)

PC-001 was approved as project charter, not a Vibe coding prompt.

| ID | Exact student supplied wording | Approval | Tool/input provenance | Initial result | Real verification | Status |
|---|---|---|---|---|---|---|
| V-001 | [Unmodified student-confirmed text](V-001_APPROVED_PROMPT.md) | 2026-10-28; student supplied edited version after ChatGPT draft | ChatGPT generated first source version using connected GitHub integration; no interactive Copilot | [Initial code 974ff5f](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/974ff5fe2617dfbf632b2f36569d8f4b4a016d17); [fix 39e3625](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/39e36252568186e35264a24044557f59a1bbdf75) | [RED 40681873875](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40681873875): 3 tests PASS, TS18048 FAIL, build SKIPPED; [GREEN 40682028306](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40682028306): tests, TypeScript, build PASS. First Vercel `main` deployment ERROR; `condition/vibe` deployment READY. Student saw working first-lesson page and identified missing vocabulary explorer; audio **not verified**. [Complete issue-resolution audit](V-001_ISSUE_RESOLUTION_LOG.md). | **EXECUTED — original increment built and deployed, scope gap led to V-002; no comprehensive acceptance** |

**Source provenance:** V-001 began as an assistant draft and was edited, supplied and approved in full by the student; do not mislabel the original AI draft as wholly authored by the student. The code was created by ChatGPT. Preserve real failed runs. At the time of the V-001 record, no V-002 had yet been approved. See the later V-002 entry below.

## V-002 — observed problem and incremental correction

| ID | Exact student approved wording | Approval | Tool/input provenance | Initial result | Real verification | Status |
|---|---|---|---|---|---|---|
| V-002 | [Unmodified approved text](V-002_APPROVED_PROMPT.md) | 2026-10-28; English text drafted by ChatGPT, approved verbatim by student in chat | ChatGPT generated code and Git objects through connected GitHub connector; no separate Copilot agent used | [Implementation 054504c](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/054504c46cd9c24b9289d5c704c526acf33ea946) | [RED CI 40762818743](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40762818743): incorrect assistant test assumption about missing Imp.sv, 5/6 tests PASS; [fixed test 3a15ed9](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/3a15ed981aecba56fdd80bdc773accc58f355d12); [GREEN CI 40763022944](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40763022944): 7/7 tests, TypeScript and build PASS; Vercel deployed READY; **student browser review PENDING** | **IMPLEMENTED — awaiting manual acceptance** |

The first V-001 site was successfully deployed from the Vibe branch and the student observed that only one fixed verb existed per level. This observed UX requirement gap caused V-002. The V-002 selected word does not yet control the mini-lesson exercise (future task), and source linguistic quality is not yet verified. See [implementation log](V-002_IMPLEMENTATION_LOG.md) and [data audit](V-002_DATA_AUDIT.md).

## V-002-F01 — feedback-led audio correction (retrospective index of already committed evidence)

**Important provenance distinction:** The student wrote the **exact** text "voice is not activated for all of these." in a browser-feedback message with a screenshot. That sentence was a *natural-language corrective request*, but **NOT a separately approved, expanded implementation prompt**. ChatGPT independently interpreted the required behavior and directly implemented it via the GitHub connector, without sending a prompt to an independent coding agent. The interpretation was documented [separately before the code change](V-002_F01_USER_FEEDBACK.md). **Do not list it as an approved V-003 prompt or silently extend V-002's original approved text.**

| ID | Student's exact instruction | Prompt approval status | AI interpretation / implementation source | Code commit | Automated verification | Browser acceptance |
|---|---|---|---|---|---|---|
| V-002-F01 | [Exact feedback and separately labeled assistant interpretation](V-002_F01_USER_FEEDBACK.md) | Student gave direct feedback; no separate full corrected prompt was submitted for approval | ChatGPT chose browser `sv-SE` speech synthesis and added lemma, form, sentence playback and stop controls; [technical log](V-002_F01_IMPLEMENTATION_LOG.md); no independent Copilot prompt | [775fdc6](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/775fdc6793c212b8c39963fbcbcdc73a4b8c6cff) | [GitHub Actions 40772903429](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40772903429) — tests/typecheck/build successful | Real audio heard by student: **NOT YET CONFIRMED** |

**When compiling V3 input packs:** Preserve V-002-F01 as an *observed V2 feedback/correction*, separate from frozen, exact student-approved initial prompts. For a V3 Vibe replication, predeclare whether the same feedback may be replayed **only if the equivalent defect appears**, or whether a standardized speech-availability requirement will be included in the shared input. For V3 SDD, represent the same expected audio functionality as a neutral, testable product requirement, not as V2's specific browser TTS code solution. Any intervention, timing or requirement-information asymmetry must be reported. Do not assume context/memory isolation by simply telling an agent not to look at earlier chats.

This ledger indexing was added **after** the original correction was committed because the student questioned the missing explicit prompt gate. It records the prior facts rather than misdating a new user-approved agent prompt.

## V-003 — student-confirmed cross-level comparison

| ID | Exact approved wording | Approval/provenance | Implementation | Automated checks | Manual status |
|---|---|---|---|---|---|
| V-003 | [Full exact prompt](V-003_APPROVED_PROMPT.md) | 2026-10-28: ChatGPT-drafted English prompt, explicitly confirmed by student after asking for an SDD/Vercel explanation. Prompt committed **before code**. | [Component/API/tests `9819b3b`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/9819b3bce1392b9e095fa8e76b8e45a1a99f9983); [UI integration `0d93de9`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/0d93de9df497b45f612f35fb97a46d136ea8430f), both ChatGPT through GitHub connector (no independent coding agent). | [CI `40775728679`](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40775728679) **PASS**: 10/10 tests, TypeScript, Next.js build. Deployment of code commit **READY**. | **AWAITING STUDENT BROWSER VALIDATION** for persistent selection, `sticka` sense alignment, cross-level comparison and actual speech output. |

The SDD deployment question was answered in chat *before execution*: external service operations may be human-in-the-loop with a predeclared approval gate and evidence. No V2 SDD process has yet been implemented. The student-approved V-003 prompt contains no additional deployment instructions.
