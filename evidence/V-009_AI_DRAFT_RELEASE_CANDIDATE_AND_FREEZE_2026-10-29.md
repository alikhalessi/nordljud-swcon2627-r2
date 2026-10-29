# V-009 — Release Candidate and Evidence-Driven Vibe Freeze
**Date:** 2026-10-29 (Europe/Helsinki)  
**Provenance/status:** AI_DRAFT / NOT YET STUDENT_APPROVED / NOT EXECUTED  
**Condition:** A, iterative Vibe Coding only.  
**Base:** Accepted R03, `hardening/v008-r03`. Isolated V009 branch: `hardening/v009-release-candidate`.  
**Source defining V009:** `evidence/PRE_V009_PRODUCTION_READINESS_AUDIT_AND_GATES_2026-10-29.md`, section 3, V-009 — Release Candidate / Freeze.  
**Exact student kickoff instruction:** `تایید شد. برو سراغ ورژن 9.` recorded at `evidence/V-008-R03_STUDENT_ACCEPTANCE_AND_V009_START_2026-10-29.md` on R03 branch before V009 kickoff.

## Exact English AI_DRAFT — for student review and approval
> Finish V-009 as Nordljud's final Vibe release candidate, without adding new features. Work only on the isolated V-009 Vibe branch. Reuse the accepted V-008 implementation and existing RED/GREEN evidence. Verify the candidate's exact Git SHA, the existing reproducible test/build results, Vercel deployment routing and Preview, all shared F01–F15 acceptance cases, and the new daily/archive/reminder/review features. Prioritize real browser, mobile, keyboard, guest-state and authenticated Cloud tests; do not mark an unperformed test as passed. Record missing Preview Supabase configuration, actual two-account RLS tests, Auth/Google/email/recovery and release-branch safeguards as explicit blockers until genuine evidence exists. Fix only confirmed P0/P1 problems, using an honest test-first record, and document any remaining P2 issues. Create a concise release manifest with exact tested commit, backend schema migration, environment names but no secrets, URLs, CI and runtime evidence, known limitations, rollback instructions, and a proposed immutable Vibe freeze. Do not merge PRs, publish unapproved code, change Production Vercel/Auth/Google/SMTP, create test accounts, repeat the database migration, or modify the independent SDD branch without my separate permission. If mandatory release checks remain blocked, prepare a non-frozen release candidate and identify only the shortest necessary actions; do not falsely call it Production Ready or freeze it. Obtain my final release acceptance before any release or freeze, then prepare the neutral SDD handoff without copying Vibe code.

## Execution boundaries and stop conditions
- Directional approval to **begin V009** is on record; this exact prompt is not yet approved. Per `docs/PROMPT_APPROVAL_PROTOCOL.md`, **no V009 coding/feature/test changes can precede exact human approval and preservation of the approval in GitHub**.
- SSO-protected Preview may have no working Supabase client because Preview-only environment variables were absent in last verified check. Do not edit dashboard settings or expose keys without distinct scope approval.
- R01–R03 acceptance with limitations does not prove F09–F12, browser/mobile, release branch or final freeze gates.
- Current known database migration `20261029192724 v008_r02_secure_cloud_schema` was applied once and independently verified, including 12 owner RLS policies. Never re-run it.
- The last genuine automated Green source run is `40928342244`, 94/94 on source SHA `357fa7239e3b9b4efb57a57fad6817d49762af90`. Read-only compare previously showed R03 app source unchanged. Green source tests alone are not release evidence.
- Keep all Vibe code independent from `condition/spec-driven`. Do not silently alter the pre-registered acceptance matrix, teaching corpus or research chronology.
- A proposed release manifest is **not** an immutable release tag or Production deployment. Separate explicit approval of exact tested SHA is required for freeze and public release.

## Next research checkpoint
Show the complete text and a faithful Persian translation to the student. On exact approval, commit that verbatim approval **before any V009 code/test work**. Execute only the approved prompt, document the actual result and offer a human acceptance gate.
