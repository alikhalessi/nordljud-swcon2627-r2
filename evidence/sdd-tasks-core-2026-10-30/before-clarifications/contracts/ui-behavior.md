# Nordljud CORE — User Interaction Contract

Status: proposed interaction design for the approved requirements; no screens or implementation are generated.

## Learning and source fidelity

Provide one accessible learning surface with level, mission, lexicon search/sense details, practice and account status. Layout/component details are independent implementation choices; do not copy Vibe tabs, accordions, screenshots or CSS. English interface wording explains authentic stored Swedish content.

Every level exposes its full 456 sense records. Exact spelling search and empty-result feedback are sufficient; display both `sticka` meanings independently. Details expose supplied five-form information/examples where present, with unavailable labels per field. English assistance can be shown/hidden without changing the source content. Level comes from the selected file, not its `frequency` metadata.

Preserve semantic selection only through a unique exact counterpart. Show destination-level examples and its own Favorites/Studied flags. Missing/ambiguous counterpart explains the absence and clears active selection until a deliberate new choice; it never deletes other flags.

## Explicit state and feedback

Favorites and Studied are separate controls for each level-specific sense. Studied changes only through explicit mark/unmark; viewing, practice and mission completion do not toggle it. Guest and account contexts use the same domain behavior with their respective persistence rules.

Mission completion is an explicit self-report control, independent of correctness/mastery. No daily curriculum, archive, daily Undo, reminder, 7/14-day recall or illustration feature is added. Guest completion/results reset on refresh; only approved preferences/flags persist. Account results keep the latest outcome per check, not full attempt history.

Practice offers one source-backed comprehension and one verb-form choice check per representative mission where source fields permit. Correct/incorrect/revealed/unavailable feedback is distinguishable. Wrong/revealed answers receive no correctness credit; a reveal latches no-credit for that attempt, and an explicit fresh retry is distinguishable rather than a retroactive conversion. Missing valid content disables only the affected check and never creates invented Swedish or an answer key.

## Persistence/error states

Display distinct loading, ready, saving, saved, unsaved/conflict, unavailable and session-status states as applicable. “Saved” requires completed local transaction or confirmed server write, not a click or optimistic render. Changing accounts clears private views and does not transfer Guest data.

On Guest denied/quota/corrupt/newer-schema failure, retain existing data and continue in memory with clear session-only feedback. On account save/provider failure, preserve safe pending intent for explicit same-account retry, without a background queue, data import or false success. Switching to a target level restores only its own saved flags.

## Speech and accessibility

Speech explicitly requests `sv-SE`, handles voice-list changes and utterance errors, and leaves reading/practice usable when unavailable. Browser/API/voice presence is not evidence that audio was heard.

All essential study/navigation/login controls must remain reachable and usable by keyboard, with visible focus, meaningful labels and understandable feedback at both approved Edge/Windows viewports: 1280×800 and 360×800 CSS pixels. No physical-phone or broad accessibility certification follows from these checks. Account-provider dependencies cannot be excluded while reporting a full login-flow PASS.

Error messages suggest an appropriate next step without revealing credentials, another owner’s data or false completion. Real runtime acceptance and safe-error observations remain future work; this interaction contract is a document review artifact.
