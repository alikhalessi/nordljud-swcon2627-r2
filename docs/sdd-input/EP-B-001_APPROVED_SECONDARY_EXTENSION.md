# Nordljud SDD — Extended Parity Amendment (EP-B-001)
**Date:** 2026-10-30 Europe/Helsinki  
**Status:** **AI_DRAFT — Option C policy approved; exact extension text NOT YET STUDENT-APPROVED**  
**Research home:** `research/sdd-input-audit-2026-10-30` only. This is not in `condition/spec-driven`.  
**Master:** `research/SDD_INPUT_03_MASTER_REQUIREMENTS_BRIEF_AI_DRAFT_2026-10-30.md` version MBR-B-002.  
**Original primary scope:** unchanged `evaluation/ACCEPTANCE_MATRIX.md` F01–F15.

## Purpose and fairness declaration
The Vibe Coding condition acquired additional product features from natural student feedback after the initial shared requirements were established. The student approved **Option C**: report original CORE F01–F15 as PRIMARY and compare later optional features independently as EXTENDED PARITY. The fact these extension requirements are known ahead of SDD creates an **order/information advantage** for the SDD condition, which must be explicitly disclosed. Do not call this original preregistered scope.

## Secondary feature requirements and objective independent test cases
| Feature ID | WHAT / outcome, not Vibe implementation | Independent acceptance case |
|---|---|---|
| **E01 — Sense-relevant illustration** | If an illustration is shown, it must correctly correspond to the selected verb's **specific semantic sense**, with provenance/usage permissions documented; unavailable media has a safe fallback. Report counted coverage rather than silently mandating 26 or reproducing Vibe's assets. | **EXT-AC01:** inspect selected distinct senses incl. the two `sticka` meanings; images, where present, match meaning and rights evidence exists; missing image does not break learning; record number actually covered |
| **E02 — Daily micro-lessons** | Provide a small daily source-backed learning selection distinct from the core fixed representative mission; deterministic and reproducible for a specified local date; no fabricated Swedish sentences. | **EXT-AC02:** for the same local date and level, repeated views show a consistent set of eligible source-linked items; no unknown source record appears |
| **E03 — Daily Archive** | Permit browsing allowed earlier local dates and reconstructing what daily items corresponded to those dates; do not assert the learner visited/completed them. | **EXT-AC03:** pick an eligible earlier date and confirm consistent source-linked selection; future/unsupported date handled clearly; historical view alone does not mark completion |
| **E04 — Completion and Undo** | Enable explicit self-reported daily completion and reversal; viewing alone never implies accomplishment or verified mastery. | **EXT-AC04:** view without action => unchanged completion; mark => recorded completion; Undo => state removed, with correct feedback and no loss of other progress |
| **E05 — Remind Me Later** | Allow learner to place a **specific sense** into a deliberate reminder queue, inspect/update due/snooze and remove it; distinguish queue from Favorites/Studied. No push/notification permission. | **EXT-AC05:** select a sense; add, snooze and remove reminder; verify due state; the two `sticka` meanings stay independent; no implicit notification |
| **E06 — Seven/fourteen-day recall** | Offer eligible source-backed recall prompts with honest right/wrong scoring and a transparent due/eligibility rule. Do not reward reveal as a correct answer. | **EXT-AC06:** under documented controlled-date inputs, check eligibility at 7 and 14 days, questions cite source data, wrong/reveal earns no credit and correct earns only real credit |
| **E07 — Extension state and privacy** | Keep guest extension state within explicitly stated browser boundaries; keep authenticated extension data private to its owner across supported refresh/re-login, without mixing unrelated accounts. | **EXT-AC07:** test guest local persistence and clearing; with two legitimate users, signed-in extension records survive re-login and negative cross-user read/write/delete attempts fail |

## Comparison and implementation safeguards
- These **seven tests (EXT-AC01 through EXT-AC07) are secondary**; do not rewrite, blend or reweight original F01–F15. Report primary N=15 and secondary N=7 with separate PASS/FAIL/BLOCKED/NOT TESTED counts, evidence links, exact tested SHA and environment. Partial test results must not be counted as full PASS.
- The late-scope SDD feature set should be **specified after CORE** through its own versioned Spec Kit feature path and approved change request. This amendment provides WHAT/WHY and acceptance; new SDD agent independently designs implementation during Plan. Do not supply Vibe screenshots, React code, original test files, dataset quality reports as templates, SQL or release scripts.
- Additional requirements such as more photos, Android native app, push notifications, PWA and automated notification delivery are outside the approved extension; no purchase/rights inference.
- A delayed external service setup, incomplete photo rights, unreachable Google/Auth provider or untestable two-account privacy is **BLOCKED/NOT TESTED**, not a pass.
- The student must approve **this exact EP-B-001 text independently** before the extension becomes required implementation scope. Approval of Option C **alone** is not an extension-feature approval. Master text MBR-B-002 also awaits exact human approval.
