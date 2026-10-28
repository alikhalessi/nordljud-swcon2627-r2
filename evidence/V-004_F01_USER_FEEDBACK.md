# V-004-F01 — Optional answer reveal after an incorrect practice response

**Date:** 2026-10-29 (Europe/Helsinki)  
**Method:** V2-A, feedback on already implemented V-004 Practice Mode.  
**Evidence status:** Saved BEFORE modifying V-004 source for this correction.

## Exact student wording

```text
good just when there is mistake give option for seeing the correct answer by extra click as option
```

## Provenance

This is the student's own direct natural-language corrective request. The expanded behavioral rules below are the **assistant's interpretation**, not a separately submitted student-approved developer prompt or a new V-005.

## Proposed interpretation made before execution

- After an incorrect Practice Mode answer, display an optional **Show correct answer** button without revealing the correct choice automatically.
- Only after clicking that button display the correct answer from the existing source-based question, together with its existing explanation.
- Keep **Try again** and **Next question** available after mistakes; maintain the original correct-answer feedback and final score interface.
- To prevent answer leakage from generating points, after revealing the answer, the current question is marked as revealed and can no longer earn a point; the learner can advance. Before revealing, retry remains available.
- Do not alter Swedish learning data, invent new sentences, introduce accounts/progress storage, or change the separate historical V-001 mini lesson.
- Record code/CI/deployment separately and do not claim actual user interaction was tested by CI.

**Important:** The prompt and technical implementation details for this correction were not separately submitted for the student's preapproval; preserve the observed degree of AI discretion in this Vibe coding experiment.
