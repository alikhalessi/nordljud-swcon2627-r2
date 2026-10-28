# V-002 — Approved Vocabulary Explorer prompt

**Project:** Nordljud Round 2  
**Method:** V2-A assisted Vibe Coding  
**Date of approval:** 2026-10-28 (Europe/Helsinki)  
**Status:** STUDENT APPROVED — captured before implementation  
**Exact-wording provenance:** ChatGPT proposed the English text in a WritingBlock, after the student described the missing vocabulary browser. The student approved that complete text without edits in the next message: «کامرد کاملاً درست است، لطفاً اجرا کن.» The actual coding is carried out by ChatGPT through the connected GitHub tools, not a separately invoked Copilot coding agent.

## Exact final approved V-002

```text
I checked the first version of Nordljud and noticed something important.

Right now, I can select A2, B1, B2 and C1, but each level only shows one fixed verb. I cannot choose the words I want to study.

I want to improve this part.

I already have the Swedish vocabulary data in the project, with 456 entries for each level. I want to see all these words in a list, search for a word and select any verb I want to learn.

When I select a verb, I want to see its English meaning, different verb forms, Swedish example sentences and their English translations.

Please keep the current simple and clean design. I don't want to remove the learning exercise we already have. I just want to add a proper vocabulary section so I can explore the words myself.

Let's implement this part first, and then I will check how it works before we continue.
```

## Scope reading made by implementing assistant

- One browsable, searchable list per selected CEFR level, including all 456 **semantic records** (not incorrectly deduplicated to 455 lemmas).
- Display all five available forms (Inf, Imp, Pres, Pret, Sup), examples and translations as supplied by the source. No teacher/semantic validation is claimed.
- Keep existing fixed mini lesson and its translation practice. Changing the selected vocabulary verb does not retarget the mini lesson in V-002; that is reserved for later prompts.
- No cross-level synchronized lemma selection, auth, saved progress, AI generation or content rewriting in this increment.
- Record source/test/deployment evidence separately; do not infer correctness from a successful CI build alone.
