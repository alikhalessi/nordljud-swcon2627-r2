# V-003 — Approved Cross-Level Vocabulary Comparison prompt

**Date:** 2026-10-28 (Europe/Helsinki)  
**Method:** Version 2-A assisted Vibe Coding  
**Approval:** The English prompt below was drafted by ChatGPT and shown to the student in the preceding turn. Student explicitly confirmed after asking for an SDD/Vercel explanation: "after answering this, the V-003 prompt is confirmed." No wording changes were requested.  
**Status at capture:** Student-approved, saved **before any V-003 application-code implementation**.  
**AI coding provenance:** Subsequent source changes are authored by ChatGPT using connected GitHub; do not claim an independent Copilot/Speckit agent ran V-003.

## Exact approved text

```text
I tested the Vocabulary Explorer in Nordljud, and it is much better now. But I noticed another problem.

When I select a Swedish verb and change the learning level, the application goes back to the first word in the new level. I lose the word I was studying.

I want to improve this.

For example, if I select "arbeta" in A2, I want to keep studying the same verb when I switch to B1, B2 or C1. I want to see how the Swedish example sentences and their English translations change depending on the level.

I would also like a simple way to compare the same selected verb across all four levels without having to search for it again.

Some Swedish verbs have more than one meaning, like "sticka". Please make sure the different meanings are not mixed together when changing levels.

I want to keep the Vocabulary Explorer, search, verb forms and Swedish pronunciation features we already have. Please use the existing vocabulary data and don't invent new example sentences if something is missing.

Keep the design clean and simple, and don't remove the current learning exercise.

Let's implement this improvement first, and then I will test the results before we continue.
```

## Prior context and limits (not part of the approved prompt)

Prior versions had a searchable, per-level Vocabulary Explorer but reset selected entries when changing levels. The initial V-001 mini lesson remains separate. Distinct senses of `sticka` are represented by different records with the same Swedish lemma and distinct English meanings. Examples come from the original shared dataset; unavailable examples must not be invented. This clarification is assistant-authored, not additional user-approved prompt wording.
