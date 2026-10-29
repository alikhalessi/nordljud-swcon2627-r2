# Student-approved Vibe Research Freeze — V-009 Closure (Condition A)
Date: 2026-10-29 Europe/Helsinki
Decision: **RESEARCH_SNAPSHOT_FROZEN** — not public Production-Ready certification.

## Exact latest student message (verbatim, original Persian)
> به نظرم مشکل حل شده و الان من فکر می‌کنم این نسخه درست کار می‌کنه. نظرت چیه؟ همین الان این رو فریز بکنیم بریم سراغ STD.

Assistant translation for clarity, NOT the original: "I think the problem is solved, and I think this version works now. What do you think? Shall we freeze it right now and go to SDD?"

The user explicitly requested immediate freeze of the currently running Vibe short-domain version, followed by the independent Specification-Driven Development condition. This is permission to **freeze the research snapshot AS IS**, not to merge/publish unapproved code or retroactively label tests as passing.

## Exactly which version was frozen — verified provider identity before creating branch
- Stable Vibe host: **https://nordljud-vibe.vercel.app**.
- Vercel `get_deployment` on the actual short host returned `READY`, Preview target `null`, deployment ID `dpl_CJmr7X2i994WttmpYhj6wWPvoex2`, source branch `hardening/v009-release-candidate`, **exact immutable Git commit ID `0b5a4a58631503c3a454ecc36d62b892c569ef14`**.
- A new **snapshot branch** `freeze/v009-vibe-research-2026-10-29` was created **from that precise SHA**, not from a moving branch name. Freeze is procedural, not an enforced GitHub branch protection rule or annotated Git tag. **Do not commit to this snapshot branch or change its pointer.** Its captured SHA remains the canonical identifier even if preview aliases or development refs move later.
- GitHub compare `357fa7239e3b9b4efb57a57fad6817d49762af90...0b5a4a58631503c3a454ecc36d62b892c569ef14` shows 30 subsequent commits **only changing research `docs/` or `evidence/`**, not application source/tests/lockfile or Swedish datasets. The exact application source is the earlier code that passed 94/94, npm ci, TypeScript and Next build in GitHub Actions run `40928342244`. This does NOT replace missing exact-frozen-HEAD CI or browser E2E.
- The earlier Vercel BUILD-QUOTA problem was superseded in operational fact: a NEW V009 protected Preview build went READY after the previous branch Preview environment settings were updated, so do not describe the current short-domain deployment as necessarily the earlier stale bundle.
- Read-only Supabase Auth logs show a real successful Google OAuth `POST /token` HTTP 200 on `2026-10-29T21:48:17Z` after the new V009 deployment. Logs do **not** identify the originating browser/domain with independent certainty; the student reports the newest version seems to work. This is positive but is not a full tested F10 acceptance protocol.
- Approved Supabase Production migration was executed once in V008; six user-owned tables have RLS, but the negative two-real-user F12 account-isolation test was not run. No test users or data writes were added in V009 Closure.
- No PR #1/#2/#3/#4 merged, no Production Vercel alias/branch changed, no privileged Auth/Google/SMTP or DB migration repeated. The original public Production remains a different older `condition/vibe` build, not the frozen V009 research snapshot.

## Final scientific outcome and limitations
**Frozen by student acceptance for academic comparison**, with evidence classifications as actually observed:
- **PASS (source):** previous real 94/94 automated tests, npm ci/typecheck/build on unchanged source.
- **PASS (hosting metadata):** short hostname routed to SSO-protected READY Preview at exact SHA.
- **PARTIAL / not independently proven fully:** Google OAuth end-to-end returned to correct host in student browser; an Auth `/token` 200 success exists, but full F10 scenario screenshots/session linkage were not independently verified.
- **NOT TESTED or BLOCKED:** authentic full F01–F15 browser matrix including mobile/keyboard, Email/Google recovery, full user-owned Cloud persistence, two-account negative RLS cross-read/write isolation, exact-HEAD HTTP smoke, and required `condition/vibe`→Preview / `release/vibe`→Production routing safeguard.
- **NO PRODUCTION-READY CLAIM.** Research freeze deliberately retains these missing tests and cannot be used as a claim of a fully verified public release.
- **NO more Vibe iteration/source changes** for the comparison. Any essential later security/public-release remediation must be separately authorized and recorded in a new non-frozen derivative, while preserving this exact snapshot unmodified.

## Next experimental condition
Start Condition B — official GitHub Spec Kit SDD using preexisting `condition/spec-driven` branch at common source baseline `90e4f6db3b6df34dee45fb14e6c3fcb4d5c255bb`. That branch is behind the main research-document branch by four documentation commits but has zero implementation commits and the agreed original data/acceptance matrix. **Do NOT copy/derive application source, styles, tests, auth code or infrastructure configuration from Condition A.** The same shared classroom product goals/datasets/acceptance matrix are permitted.
Use genuine official Spec Kit agent stages (constitution, specify, clarify, plan, checklist, tasks, analyze, implement, converge) with real execution logs and student review, not fabricated spec-kit command results.

## Preservation notes
The Git commit SHA is an immutable content identifier; a Git branch name can be moved unless actual protection exists. This is a frozen research snapshot **by convention and reference SHA**, not a GitHub immutable tag or enforced protected branch. The SSO-protected short URL may continue following its V009 source branch; for evidence requiring reproducibility rely on the precise SHA and deployment ID above, not only the moving URL.
