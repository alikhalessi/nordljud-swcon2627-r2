# V-009 — Exact student approval BEFORE implementation
Date: 2026-10-29 (Europe/Helsinki).
Method: Condition A / Vibe Coding.
English prompt approved: `evidence/V-009_AI_DRAFT_RELEASE_CANDIDATE_AND_FREEZE_2026-10-29.md`, GitHub blob SHA **`0621721903a5592046985f78004768772da307a9`**.

## Exact student's original Persian response (verbatim)
> موافقم شروع کن، موافقم.

Translation supplied by assistant, NOT the original wording: "I agree, start, I agree."

The response immediately follows the assistant's full English V-009 draft link and complete Persian translation, with the instruction to approve that exact text before code changes. No modifications were requested.

## Approved scope
- Review existing R01–R03 Vibe source and real evidence, inspect actual CI/Preview/release routing/accepted F01–F15; make only focused test-first fixes to actually observed high-severity regressions.
- Build an accurate release-candidate manifest with specific tested code SHA, migration ID, relevant public environment variable *names* and link to accepted evidence; no secrets or personal user data.
- Clearly label NOT TESTED/BLOCKED Auth/Google/email/recovery/two-user RLS/Preview cloud/runtime/mobile/keyboard if inaccessible; do NOT fabricate PASS.
- Do NOT merge PRs, publish/promote unapproved code, change live Vercel Production/Auth/Google/SMTP settings, create new test identities, repeat Production DB migration, or modify independent Spec Kit SDD branch.
- **A separate final student release acceptance is mandatory before any public promotion, final immutable tag or Vibe freeze.**

## Chronology
1. The English AI_DRAFT was committed on V009 isolated branch as `df4a0f6507cb53b5405a9c22cf7d9a312cb4a233`.
2. Student reviewed its complete Persian translation and responded with the exact acceptance above.
3. This approval record is committed before any new V009 source/test modifications or executable workflow changes.
