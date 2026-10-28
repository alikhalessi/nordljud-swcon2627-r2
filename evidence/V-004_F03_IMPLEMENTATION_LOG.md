# V-004-F03 — expansion from five to 26 photographed Swedish verb senses

**Date:** 2026-10-29 (Europe/Helsinki)  
**Condition:** V2-A, assisted Vibe Coding  
**User's exact instruction:** [V-004_F03_USER_FEEDBACK.md](V-004_F03_USER_FEEDBACK.md), committed **before code** at [e08d1d9](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/e08d1d909d8c8ea7b5c4c89c7fab143a348aa1fc).

## Scope / authorship

The user wrote (verbatim) "it is good and I would like to add as much as possible mpre photos". This is broad natural-language feedback, **not** approval of 21 specific new links, technical filters or a 456-image guarantee. ChatGPT independently selected a feasible set of new candidate action photos and implemented the source lookup and UX through its GitHub connector. There was **no separate external coding agent**, no official Spec Kit session, and no new V-005 implementation.

### Added 21 exact source-data verb/meaning pairs

1. `cykla / cycle, ride a bike`
2. `diska / wash the dishes`
3. `hoppa / jump`
4. `baka / bake`
5. `dansa / dance`
6. `sjunga / sing`
7. `simma / swim`
8. `borsta / brush` (example: brushing teeth)
9. `spela / play` (example: playing guitar)
10. `rida / ride (a horse)`
11. `fiska / fish`
12. `dammsuga / vacuum`
13. `rita / draw`
14. `måla / paint`
15. `sy / sew`
16. `kasta / throw; to throw away` (photo illustrates throwing a ball, **not** disposal)
17. `vattna / water`
18. `grilla / grill, barbecue`
19. `gå / go, walk` (photo illustrates walking)
20. `handla / shop; to be about (handla om)` (photo illustrates shopping only)
21. `dricka / drink`

The five original photo identities remain unchanged. Thus the complete catalog contains **26 unique verb+meaning records**, and the same mapping is available for each of A2/B1/B2/C1. All existing Swedish/English vocabulary source records remain unedited.

## Asset provenance and verification limits

The [JSON manifest](../visual-content/pilot-action-photos.json) stores an individual Unsplash original page URL, directly linked `images.unsplash.com` photo resource, artist/photographer credit, attribution link, accessible descriptive alternative text, and URL for the Unsplash License. Individual source pages displayed **Free to use under the Unsplash License** at lookup. Unsplash+ premium photo pages were excluded. Attribution and licensing are visible to users on the existing component.

An image ID was extracted from an individual source page's image link, **not fabricated from the short Unsplash photo slug**. Several remote previews could not be re-fetched due to rate limiting, cache miss or CDN-tool restrictions. This creates an explicit outstanding **human-browser image loading and semantic review gate**, not a claim that each of 26 images was visually verified on the hosted site. For abstract/multi-meaning verbs, an arbitrary photo is deliberately not supplied. The other `sticka` sense is not given a knitting photo.

Unsplash licensing allows use under its terms, but licensing verification via third-party search cannot fully establish all conceivable trademark/model/property rights. The project uses externally hosted photos and depends on the CDN and its terms. No image files have been bundled in GitHub.

## Exact implementation and CI chronology

- [`93c88fd`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/93c88fd777ba418a5312602ef3a134d7cee52f16): expanded manifest to 26 mapped records.
- [**RED CI 40780989437**](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40780989437): tests failed because the pre-expansion test explicitly asserted *exactly five* photo entries (`26 !== 5`). This was a stale **test assumption**, not evidence that all new photos were broken. Typechecking/build steps were **SKIPPED** in this run.
- [`8377cb0`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/8377cb0e8ceb95130f5fc6de68ee0c30a6a1b299): revised tests to require 26 unique pair-keyed photos, real source/credit/license fields, preservation of original five, and identity matches in 456-entry datasets across all four levels.
- [`8973132`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/89731328e82d7efa659b93f6311a4c9939acb713): user-facing **Only verbs with photos** filtering checkbox with count, preserving existing explorer and search; [styling `26dbeb8`](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/26dbeb8c04b2d8d134e9657e83cef317e9a76408).
- [**GREEN CI 40781105812**](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40781105812): **19 of 19 automated tests PASS**, 0 failed; TypeScript checker PASS; Next.js production build PASS, at exact application-code commit `26dbeb8c04b2d8d134e9657e83cef317e9a76408`.
- [**Exact-code Vercel deployment**](https://nordljud-r2-vibe-9gojr28mr-aleksi9.vercel.app) reported **READY** for `26dbeb8`. This does not prove each image has rendered, nor that the new checkbox was clicked on a real device.

## Manual acceptance checklist (not yet completed by student)

- In Learning Mode, tick **Only verbs with photos** and inspect the 26 searchable entries and individual credit/source links.
- Inspect examples: `cykla`, `baka`, `sy`, `dammsuga`, `vattna`, `dricka`. Confirm the action, not just a vaguely related noun, is visible.
- Inspect `sticka/knit` and the other `sticka` meaning separately; the second should not reuse knitting photo.
- Check all four levels, mobile width, source-photo loading and whether the selection/Practice Mode and pronunciation still work.

**Status:** Source identity and build checks passed; **browser visual validation and legal editorial spot check pending**.

## Next source-governance step for V3 comparison

If visual assets become a common product feature across V3 Vibe and V3 SDD, freeze a **method-neutral** accepted photo/credit dataset, with the same sense keys and exact license metadata supplied to *both* isolated conditions. Do not copy V2's React component or CI fixes into an isolated implementation. The student's previous image-picking knowledge is a disclosed experiment confound.
