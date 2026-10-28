# V-002-F01 — selected vocabulary audio correction log

**Student's exact feedback:** [V-002-F01](V-002_F01_USER_FEEDBACK.md) ("voice is not activated for all of these.").

## Technical change
- Added browser speech synthesis to the vocabulary detail panel: one **Listen to verb** control for the selected Swedish lemma.
- Added **Form** and **Example** speech buttons for every available conjugation and Swedish example sentence across Inf, Imp, Pres, Pret, Sup.
- Uses `SpeechSynthesisUtterance`, explicitly sets `lang = "sv-SE"` and `rate = 0.88`; selects a browser-listed Swedish voice if available.
- If a Swedish voice is not listed, displays an honest device/browser warning. If the browser lacks speech synthesis entirely or playback fails, displays a textual status. No claim of cloud TTS, uniform voice availability, teacher-level pronunciation accuracy, or actual played audio can be made without a real browser interaction.
- Added **Stop audio** and cancels prior speech when a new word/level or utterance is selected. Accessible button labels and live status for user feedback.
- Source Swedish datasets untouched; source missing examples still omitted honestly.
- Does not retarget V-001 mini-lesson/quiz to selected verb; V-003/004 are independent future requirements.

## Verification
The original version of this file was committed before CI. Subsequent observed verification is documented immediately below. Student should click both **Form** and **Example** for e.g. B2/acceptera and test all five conjugations, a different verb, and the Stop button. A successful build cannot verify installed Swedish voices or audible sound.

## Academic provenance
This is an incremental feedback-driven corrective edit on V-002 triggered by the student's exact English sentence, not a silently rewritten original V-002 prompt or a new student-approved V-003. ChatGPT authored the implementation through GitHub connector.

## Observed build and release checks (after implementation)

- [Code commit 775fdc6](https://github.com/alikhalessi/nordljud-swcon2627-r2/commit/775fdc6793c212b8c39963fbcbcdc73a4b8c6cff) records the voice-control implementation.
- [GitHub Actions run 40772903429](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40772903429): **SUCCESS** — dataset automated tests, TypeScript checking and production Next.js build all passed. These checks do not play sound.
- Vercel deployment for exactly that code SHA: [production deployment](https://nordljud-r2-vibe-hwu9960fl-aleksi9.vercel.app) reported **READY**.
- **Manual sound output verification remains PENDING:** student has not yet confirmed hearing the selected verb, an inflected form and a sample sentence on their device. Swedish voice availability/quality cannot be asserted from CI alone.
