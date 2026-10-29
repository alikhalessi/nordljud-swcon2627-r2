# V-009-CLOSURE-P01 — Final Vibe Verification, Release Readiness & Freeze

**Status: AI_DRAFT — Awaiting Student Approval**

Finish the Nordljud Vibe Coding implementation through one final iteration called **V-009 Closure**. Do not create R04, R05, R06 or additional feature iterations.

Work exclusively on the existing isolated V-009 branch and PR #4. Preserve all existing Swedish datasets, previous approvals, RED/GREEN evidence, database records, and the independent SDD implementation.

Complete the following work:

1. **Preview and Cloud:** Configure the existing Supabase public client URL and publishable key for the protected Vercel Preview, preserving Production configuration. Never expose credentials or privileged keys. Use an isolated testing environment where available; otherwise, I authorize two temporary synthetic test accounts and strictly scoped test records in the existing Supabase project. Clean up only the test data created during this iteration.

2. **Real verification:** Execute the F01–F15 acceptance scenarios and V-008 learning features, including all four levels, both meanings of *sticka*, Guest Mode, Daily Archive, reminders, seven/fourteen-day reviews, mobile, keyboard, email/Google authentication, Cloud persistence, and actual two-account RLS isolation. Record real PASS, FAIL, BLOCKED, or NOT TESTED outcomes with reproducible evidence.

3. **Release controls:** Verify exact-SHA CI, build, Preview deployment, HTTP smoke, and development-to-Preview routing. Where supported, complete the previously authorized safe Production Branch Tracking switch to `release/vibe`, but only if the current public deployment and domains remain unchanged. Otherwise, record the blocker without an unsafe workaround.

4. **Focused corrections:** Fix only genuinely demonstrated release-blocking defects using test-first RED/GREEN evidence. Do not introduce new features or unnecessary architectural changes. Keep all corrections within this approved iteration and document their exact prompts, commits, and outcomes.

5. **Final closure:** Prepare one complete release manifest containing the tested Git SHA, deployment URLs, Supabase migration version, CI and acceptance results, limitations, rollback procedure, and final Vibe comparison snapshot.

If all mandatory release gates pass, prepare the candidate for my separate final Freeze and release approval. If external limitations prevent complete verification, produce an explicitly labeled **RESEARCH_SNAPSHOT_ONLY** with unresolved tests recorded honestly, instead of claiming Production Ready.

**Authorization boundaries:** I authorize the narrowly scoped Preview configuration and synthetic testing described above. Do not merge PRs, promote or publicly publish unapproved code, alter live Google/SMTP settings, delete existing user data, repeat Production migrations, purchase paid services, or modify the independent SDD codebase. Stop before any irreversible or unapproved Production action.

After completing this single Closure iteration, present the actual evidence and obtain my final acceptance. Then we can move to the independent GitHub Spec Kit SDD implementation and comparative university report.