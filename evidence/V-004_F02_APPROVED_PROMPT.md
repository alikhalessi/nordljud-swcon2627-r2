# V-004-F02 — approved photo-supported Visual Vocabulary pilot

**Date:** 2026-10-29 (Europe/Helsinki)  
**Condition:** V2-A assisted Vibe Coding  
**Approval:** The following English prompt was drafted by ChatGPT in WritingBlock `68241`, and the student expressly approved it by responding "yes dear comrade". The student did not independently write this expanded English prompt.  
**Capture status:** Recorded before any V-004-F02 app code, image-manifest, or styling edits.  
**Implementation provenance:** Subsequent implementation is performed by ChatGPT via the connected GitHub tools, not an independent coding agent.

## Exact approved prompt (no edits)

```text
I want to make Nordljud more visual and easier to learn from.

When I select a Swedish verb in Learning Mode, I would like to see a real photograph showing the action or meaning of that verb, placed next to the selected word.

For example, "springa" should show someone running, "äta" should show someone eating, and "skriva" should show someone writing.

I want the photos to match the actual meaning of each word. Some verbs have more than one meaning, like "sticka", so please don't use the same picture for different meanings unless it really fits.

Please use properly licensed photos and keep a record of the image source and photographer. If a verb is too abstract or a suitable photo cannot be found, don't display an unrelated image.

I already have 456 vocabulary entries for each level. I would eventually like visual content for all of them, using the same suitable image across levels when the meaning is the same.

Let's start with a small set of carefully matched photos, check how they look in Learning Mode, and then expand the collection.

Please keep the existing vocabulary, pronunciation, comparison and practice features unchanged. I want to review the visual results before continuing.
```

## Separate assistant implementation interpretation — not part of the prompt

Pilot with exactly matching, manually curated *real photographic* action images (not unrestricted keyword image search), keyed by the exact pair of Swedish verb + English meaning to prevent `sticka` sense leakage. Prefer photos whose source page explicitly displays a permissive reuse license, and show photographer/source attribution beside the image. Show no image when absent. Keep the source verb-library JSON unchanged, with no image API calls from the browser and no fabricated photographer identities.
