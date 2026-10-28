# V-004-F02 — photographic action pilot / research provenance

**Approved input:** [V-004_F02_APPROVED_PROMPT.md](V-004_F02_APPROVED_PROMPT.md), saved BEFORE code. ChatGPT drafted English prompt; the student approved with "yes dear comrade." ChatGPT implemented using GitHub connector, with no independently used Copilot.

## Asset selection and constraints
Five exact source-linked verb/sense mappings only: `springa/run`, `äta/eat`, `skriva/write`, `läsa/read; to study`, and `sticka/knit`. The *other* `sticka` sense (`sting, prick; to leave (colloquial)`) deliberately has NO image. Unmatched/abstract senses also have no image. No automatic search based on the lemma, no unsourced or imagined photographs.

The source metadata (real photographers, original photo page URLs, image URLs and license URLs) is stored in [visual-content/pilot-action-photos.json](../visual-content/pilot-action-photos.json). Images were selected from real visible photo previews and identifiable individual source pages. Each page identified free use under the Unsplash License (https://unsplash.com/license). As a courtesy, the photographer, original source and license are all visibly credited. These are *licensed Unsplash photographs*, not CC0 or user-owned images. Unsplash does not guarantee all third-party/model rights and the web pages' license representations still warrant human review.

**Distribution:** Remote static CDN images from `images.unsplash.com` are used with fixed URLs; they are NOT copied as repository binaries. Browser may block a remote image or the file may later disappear, in which case the UI suppresses the failed image rather than showing a broken image or a mismatched substitute. Consequently the image-dependent UI relies on a third-party CDN and cannot be represented as fully offline reproducible without archiving appropriately licensed binaries.

## User intent vs assistant technical choices
- Student asked for real action photos next to the selected word in Learning Mode and careful distinction between homographs. The assistant chose the pilot of five, image CDN URLs, exact pair-key matching, source links, responsive layout and no-image policy.
- Original Swedish dataset, V-003 comparison, audio controls, V-004 Practice Mode and original fixed mini lesson were retained.
- **No claim of 456-image coverage**; pilot of five senses only. All four CEFR levels may reuse each matching photo since the sense identifier remains stable.
- Source matches and license fields are unit-testable, but neither the actual browser rendering nor visual/copyright due diligence is certified by an automated test. Student review required.

## Pending execution evidence
CI success/failure, actual deployment URL/commit and browser visual acceptance must be appended after observed results. Do not fabricate the outcome. If an image appears broken, capture the actual browser observation and fix as a separate documented corrective event.
