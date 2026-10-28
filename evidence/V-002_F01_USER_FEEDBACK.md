# V-002-F01 — student browser feedback before any speech enhancement

**Date:** 2026-10-28 (Europe/Helsinki)  
**Condition:** V2-A assisted Vibe Coding  
**Context:** Student tested the deployed V-002 Vocabulary Explorer and submitted a screenshot displaying the B2 entry `acceptera` and the five conjugation/example panels.

## Exact user-authored text, not assistant paraphrase

```text
voice is not activated for all of these.
```

## Observation and scope interpretation (assistant-authored, separate)

The Explorer shows five verb forms and Swedish example sentences but no play/audio controls for them. The original V-001 mini lesson below Explorer had one browser-speech button for its *fixed* sentence, which doesn't address the selected vocabulary entry. This is an **observed usability gap** after initial V-002 release, not a V-002 requirement satisfied by existing controls.

As a corrective, preserve the exact user wording above and add audible Swedish pronunciation controls to the selected verb and the Swedish examples for each of its five forms (and, when available, each inflected form). Do not invent audio files or claim TTS pronunciation quality. Use browser speech synthesis with `sv-SE`, announce missing browser support, and make no changes to source vocabulary. Browser/device voice availability needs manual student verification.

**Implementation/status at capture:** feedback documented before making any speech-feature code changes. This corrective feedback is not falsely treated as a separately student-approved, assistant-written V-003 prompt.
