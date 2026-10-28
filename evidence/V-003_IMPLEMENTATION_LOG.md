# V-003 implementation evidence — cross-level comparison

**Approved input:** [Verbatim V-003](V-003_APPROVED_PROMPT.md), saved before changes.  
**Provenance:** ChatGPT authored all V-003 code through the connected GitHub tool; no independent Copilot agent or Spec Kit invocation was involved.

## Incremental execution
- [9819b3b](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/9819b3bce1392b9e095fa8e76b8e45a1a99f9983): added four-level comparison API and React component plus source-data tests.
- This follow-up code commit: connects UI, maintains selected verb-and-meaning identity when changing levels, positions pagination so selection remains visible, and adds responsive styling.

## Assistant implementation decisions (not part of approved prompt)
1. Identify selected vocabulary by the original Swedish lemma **and** exact English meaning, ensuring the two senses of `sticka` are distinct.
2. On changing A2/B1/B2/C1, retain selection by the same identity; reset search, show the selected entry on the correct page.
3. In the currently selected verb panel, compare original Swedish examples and English translations at all four levels. The user can switch between five conjugation forms, and optionally play a Swedish sentence.
4. The API returns matching records with the same identity, without altering datasets or fabricating missing examples.
5. All existing search, word forms, browser speech controls, fixed mini lesson and translation quiz remain.

## Verification caveats
At this initial evidence capture, no V-003 CI result or user browser test has yet been observed. Add actual test and deployment results only after tool verification. Audibly correct Swedish still requires manual student confirmation. Data-level tests cover identity and examples but cannot prove the browser interaction by themselves.

## Manual student checks to request
- Select `arbeta` at A2, switch to B1/B2/C1; check selection remains `arbeta / work`, visible in left list and active detail.
- Select `sticka / knit` versus `sticka / sting, prick; to leave (colloquial)`, switch levels, verify no meaning mix-up.
- In comparison area, switch form tabs, confirm original Swedish and English examples for all four levels.
- Check previous search, speech, and quiz; confirm the voice actually plays on the device.
