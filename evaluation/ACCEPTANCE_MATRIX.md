# Common independent acceptance matrix — pre-implementation version 1

This checklist is shared external evaluation evidence, **not** an SDD-style master prompt to be imposed on Vibe. Run equivalent black-box procedures against both frozen condition builds. Log environment, case steps, expected vs actual, status (PASS/FAIL/BLOCKED/NOT TESTED), screenshot/run URL and tested commit. A passing source compilation does not establish user-facing acceptance.

| ID | Acceptance scenario | Observable expected outcome | Evidence type |
|---|---|---|---|
| F01 | Four levels | A2, B1, B2 and C1 are selectable; distinct source-linked missions appear | Guest browser |
| F02 | Source sentences | Swedish text and English translation correspond to frozen inputs; reveal/hide assistance works | Browser/data |
| F03 | Speech | Request Swedish speech when available, otherwise show meaningful unavailable status | Browser/manual |
| F04 | Two practice checks | Correct **and incorrect** answers produce appropriate feedback, no credit for incorrect | Browser |
| F05 | Lexicon completeness | Search and load 456 sense records for each of four levels | Source/API/browser |
| F06 | Same spelling, different senses | Two `sticka` senses can be selected independently and retain correct meaning | Browser |
| F07 | Level switch | Selected *sense* is stable across A2→C1 change, with level-specific examples | Browser |
| F08 | Guest work | A guest can study and retain appropriate browser-scoped local state after reload | Browser |
| F09 | Email authentication | Account registration, invalid credentials, sign-in and sign-out behave correctly | Live/manual |
| F10 | Google OAuth | Hosted sign-in returns to hosted origin and authenticates, not localhost | Live/manual |
| F11 | Cloud persistence | Personal mission completion and favorites survive refresh, sign-out and re-login | Live/manual |
| F12 | Account isolation | Two different users cannot read or overwrite each other's saved state | Live/manual/RLS |
| F13 | Mobile + keyboard | Essential study navigation and login operate on narrow viewport and keyboard | Browser |
| F14 | Secrets and failures | No elevated keys in code/client; failures display actionable messages | Code audit/browser |
| F15 | Reproducibility | Dependencies, tested commits, expected source count, typecheck and build are recorded | CI/source |

**Controls:** Same test data and expectations both methods; report missing external credentials honestly; keep evidence raw; record both identical and method-specific failures. Do not claim a security penetration test without actually performing one.

**Bias disclosure:** This is a second informed iteration; the student's past experience with the two-sense `sticka` and OAuth issues can affect either method. That cannot be removed retrospectively and is not evidence of a causal superiority result.
