# V-006-F01 — expanding Your Learning panel blocks primary lesson

**Date:** 2026-10-29 (Europe/Helsinki)
**Condition:** V2-A assisted Vibe Coding, branch `condition/vibe`.
**Approval/provenance:** The student's direct browser-feedback message (original Persian) is reproduced verbatim below. This is **direct student corrective feedback**, not a separately approved ChatGPT-expanded English programming prompt.
**Evidence timing:** This file is committed BEFORE any corrective implementation files change.

## Exact student-authored feedback

> ببین مورد اولیه که من متوجه شدم وقتی که من یک موردی از ورب‌ها رو انتخاب می‌کنم توی لیست Your Learning میاره بالا و این لیست Your Learning به تعداد وربی که انتخاب می‌شه هی رشد می‌کنه، بزرگ و بزرگ‌تر می‌شه که باعث می‌شه صفحه بیاد پایین و خب عوض این‌که این کار رو بکنه، این می‌تونه یک منویی باشه که باز و بسته بشه که از این قضیه جلوگیری بکنه. این یه موردیه که به نظر من فعلاً رسید. باز هم بگم.بقیه موارد هم چک کردم به نظر درست میاد.

## Assistant interpretation (NOT an approved literal user coding prompt)

- The `Your Learning / Saved learning & favorites` panel sits above the Vocabulary Explorer and permanently expands with each saved Favorite or practice row, displacing the active lesson.
- Collapse the panel by default into one compact, accessible header/summary. A user can **open and close it deliberately**; all saved data stays intact. Ensure long lists scroll inside a bounded-height area when opened, so growth is contained.
- Preserve existing Favorites, separate level studied counts, activity history, delete actions, guest message, account-private Supabase state and learning/practice functionality.
- Student's phrase "بقیه موارد هم چک کردم به نظر درست میاد" is a **general positive functional observation**; do NOT upgrade it to a formal account-isolation, cross-device, or automated E2E PASS without specific test artifacts.
- The code change is implemented directly by ChatGPT through connected GitHub tools, **not** by an independent coding agent or official Spec Kit run.
