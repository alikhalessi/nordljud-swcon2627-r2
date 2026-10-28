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
Status on creation of this file: NOT TESTED. Actual CI run URL, deployment status and user browser tests must be recorded after observed execution. Student should click both **Form** and **Example** for e.g. B2/acceptera and test all five conjugations, a different verb, and the Stop button. A successful build cannot verify installed Swedish voices or audible sound.

## Academic provenance
This is an incremental feedback-driven corrective edit on V-002 triggered by the student's exact English sentence, not a silently rewritten original V-002 prompt or a new student-approved V-003. ChatGPT authored the implementation through GitHub connector.
