# V-006-F02 — student-approved two-tab navigation correction

**Date:** 2026-10-29 (Europe/Helsinki). **Condition:** V2-A assisted Vibe Coding, branch `condition/vibe`.

## Approval and authentic wording

The student first reported, in Persian, that the V-006-F01 accordion was still impractical: **Your Learning** stayed above the main learning interface and opening a large list pushed its lower content away. The student proposed two adjacent switchable sections/tabs, `Explore Your Words` and `Your Learning`, so only one occupies the main area at a time.

The assistant responded with a **ChatGPT-authored UI proposal**, explicitly recommending **two main tabs** in place of a physically nested folder, keeping the selected level and verb when switching, and separate Favorites / Learning Progress / Practice History within Your Learning, with search/filter/pagination for long lists.

The student's **verbatim approval** to that proposal was:

> موافقم، لطفا انجامش بده.

This direct assent approves the previously visible assistant proposal; **it is not an independently student-written English coding prompt**. Preserve this distinction in research reporting.

## Implementation interpretation (assistant-authored, not literal student text)

1. Render accessible `Explore Your Words` / `Your Learning` top-level tabs side by side just below the page introduction.
2. Show levels, Vocabulary Explorer, selected verb's forms, images, pronunciation, Learning / Practice and original mini-lesson **only in Explore**; show account-private saved Favorites, Learning Progress and Practice History **only in Your Learning**.
3. Keep both main panels mounted but hide the inactive one, so switching doesn't wipe the selected verb, level, search terms, practice session or saves; tapping `Study` on a favorite switches back to Explore and selects that sense when available at the current level.
4. In Your Learning, provide search/filter and pagination or bounded result pages to avoid unbounded vertical growth. Retain remove/delete buttons and level-specific counts.
5. Keep Guest Mode and signed-in Supabase storage/security semantics unchanged. This is a UI/navigation refactor; **no Supabase schema changes needed**.
6. Preserve a record that V-006-F01 accordion was an unsuccessful UX solution superseded by this correction; do not falsify tests or user acceptance. Build/test and Vercel deploy must be reported separately from actual student browser acceptance.

## Evidence timing

Recorded before implementation code changes. Coding is performed by ChatGPT through the connected GitHub tool, **not** by independent Copilot/Spec Kit/SDD agents.
