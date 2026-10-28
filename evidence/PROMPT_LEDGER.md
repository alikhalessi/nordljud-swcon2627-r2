# Prompt ledger (authentic executed history)

PC-001 was approved as project charter, not a Vibe coding prompt.

| ID | Exact student supplied wording | Approval | Tool/input provenance | Initial result | Real verification | Status |
|---|---|---|---|---|---|---|
| V-001 | [Unmodified student-confirmed text](V-001_APPROVED_PROMPT.md) | 2026-10-28; student supplied edited version after ChatGPT draft | ChatGPT generated first source version using connected GitHub integration; no interactive Copilot | [Implementation commit 974ff5f](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/974ff5fe2617dfbf632b2f36569d8f4b4a016d17) | [Initial CI 40681873875](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40681873875): 3/3 source-data tests PASS, TypeScript FAIL (TS18048), build SKIPPED. Minimal technical fix in subsequent commit; browser/deployment **not tested** | **EXECUTED — implementation under verification** |

**Source provenance:** V-001 began as an assistant draft and was edited, supplied and approved in full by the student; do not mislabel the original AI draft as wholly authored by the student. The code was created by ChatGPT. Preserve real failed runs. At the time of the V-001 record, no V-002 had yet been approved. See the later V-002 entry below.

## V-002 — observed problem and incremental correction

| ID | Exact student approved wording | Approval | Tool/input provenance | Initial result | Real verification | Status |
|---|---|---|---|---|---|---|
| V-002 | [Unmodified approved text](V-002_APPROVED_PROMPT.md) | 2026-10-28; English text drafted by ChatGPT, approved verbatim by student in chat | ChatGPT generated code and Git objects through connected GitHub connector; no separate Copilot agent used | [Implementation 054504c](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/054504c46cd9c24b9289d5c704c526acf33ea946) | [RED CI 40762818743](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40762818743): incorrect assistant test assumption about missing Imp.sv, 5/6 tests PASS; [fixed test 3a15ed9](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/3a15ed981aecba56fdd80bdc773accc58f355d12); [GREEN CI 40763022944](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40763022944): 7/7 tests, TypeScript and build PASS; Vercel deployed READY; **student browser review PENDING** | **IMPLEMENTED — awaiting manual acceptance** |

The first V-001 site was successfully deployed from the Vibe branch and the student observed that only one fixed verb existed per level. This observed UX requirement gap caused V-002. The V-002 selected word does not yet control the mini-lesson exercise (future task), and source linguistic quality is not yet verified. See [implementation log](V-002_IMPLEMENTATION_LOG.md) and [data audit](V-002_DATA_AUDIT.md).
