# V-004 — Student-confirmed Learning Mode and Practice Mode prompt

**Date:** 2026-10-29 (Europe/Helsinki)  
**Condition:** V2-A assisted Vibe Coding  
**Status at capture:** **Student approved; not yet implemented.**  
**Provenance:** The English prompt below originated from a ChatGPT-authored WritingBlock (ID 68421). The student explicitly responded “V-003 is confirmed and please execute 004.” This is approval of the immediately preceding complete V-004 text, not a claim that the student independently authored it. Preserve all original wording; do not silently append implementation details.

## Exact approved prompt

```text
I have been testing Nordljud, and now I want to improve the actual learning experience.

At the moment, I can explore Swedish verbs, see their different forms, listen to examples and compare them across A2, B1, B2 and C1. But I want to do more than just read the vocabulary.

I would like to have two separate sections: Learning Mode and Practice Mode.

In Learning Mode, I want to study the verb I selected, understand its meaning, see the different verb forms, read Swedish example sentences with English translations and listen to their pronunciation.

In Practice Mode, I want to test myself using the same selected verb. For example, I could choose the correct English meaning, identify the correct Swedish verb form or complete a sentence.

Please give me clear feedback when my answer is correct or incorrect, and let me try again or move to another question.

I want the exercises to use the existing Swedish vocabulary data. Please don't invent sentences or translations that are not in the dataset.

Keep the four learning levels, vocabulary search, cross-level comparison and pronunciation features we already have. I don't want to lose anything we have built so far.

Let's implement these two learning modes first. After that, I want to test the application myself before adding user accounts or saving progress.
```

## Boundaries clarified for implementation (assistant interpretation, NOT part of approved prompt)

- Distinct Learning and Practice modes act on the **selected** vocabulary record at the currently selected CEFR level, preserving separate homograph senses.
- Existing original V-001 fixed mini-lesson remains intact; don't quietly replace it with the new practice.
- Examples and translations come from existing shared-content JSON; no generated Swedish/English sentences.
- No login, cloud database, saved progress, persistent quiz scores or gamification during this increment.
- Preserve V-002 audio controls and V-003 comparison, without claiming audio has been listened to on the student's device.
- Confirm functionality with actual CI/build and student browser verification, not code existence alone.

## V-003 manual acceptance provenance

Student's **exact** current-message statement: “V-003 is confirmed and please execute 004.” This is overall explicit acceptance of the V-003 increment; no separate per-interaction report or audio-listening confirmation was provided. Preserve this distinction in the central ledger.
