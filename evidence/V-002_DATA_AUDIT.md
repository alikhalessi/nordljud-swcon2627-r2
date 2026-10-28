# V-002 source-data audit — evidence of gaps, not repaired

**Date:** 2026-10-28 (Europe/Helsinki)  
**Source:** four unchanged shared-content/verb-library/LEVEL.json files, each containing 456 semantic records.  
**Method:** Count missing/empty fields in all five verb forms for all levels, comparing literal stored text. No teacher assessment, semantic checking, or translation validation is implied.

## Missing / empty fields in source data

| Level | Inf examples (SV + EN) | Imp examples (SV + EN) | Pres examples | Pret examples | Sup examples | Pret conjugated words |
|---|---:|---:|---:|---:|---:|---:|
| A2 | 1 | 34 | 0 | 0 | 1 | 0 |
| B1 | 0 | 29 | 0 | 0 | 0 | 3 |
| B2 | 0 | 31 | 0 | 0 | 0 | 0 |
| C1 | 0 | 31 | 0 | 0 | 0 | 1 |

Both translation fields are empty for those example entries; the app displays "No example in source data" rather than inventing an example or silently hiding a word. Missing conjugated words are displayed as "Not provided." The source records and their meaning distinctions remain unchanged.

## Authentic RED test and correction

- Initial V-002 implementation: [commit 054504c](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/054504c46cd9c24b9289d5c704c526acf33ea946).
- [GitHub Actions run 40762818743](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40762818743): FAILED — five of six tests passed; V-002 test wrongly assumed every form had a populated Swedish and English example. Specifically, A2 index 5, Imp.sv was empty. TypeScript and build steps skipped.
- Root cause is *the assistant's incorrect test expectation against incomplete historical data*, not evidence the new explorer deleted or changed the dataset.
- Correction: preserve the incomplete source; check that form fields exist, translations are paired when present, and all present-tense examples exist. Explicitly test known gaps; record any subsequent outcome independently.
- Semantic/grammatical accuracy and CEFR appropriateness of source sentences are **not validated** at V-002 and remain future work.

## Manual acceptance yet to be performed by student

- Check A2/B1/B2/C1 show 456 records each and all can be reached via paging/search.
- Search by Swedish infinitive and English meaning; inspect any entry.
- Check five conjugation panels, example translations and explicit missing-data messages.
- Verify the original mini lesson and translation quiz still operate.
- Verify long list mobile layout and the two different senses of "sticka."
