# Nordljud 2.0 — shared classroom product brief (A and B)

**Status:** Fixed common goal approved as part of PC-001; this is deliberately NOT a complete SRS and NOT a coding prompt.

A responsive **Swedish-through-English** learning web app for A2, B1, B2 and C1. One representative mission per level, each with a source-backed Swedish example, English assistance, browser Swedish speech (`sv-SE`) with graceful fallback, a comprehension check, a verb-form check, correct/incorrect feedback and saved learning status.

Explore the **entire source lexicon** by level. Each level has 456 *meaning/sense* records and 455 different spellings: `sticka` is represented by two independent senses. Show the supplied five verb forms where available; do not invent missing forms or example sentences. Preserve the selected semantic sense when switching level and allow per-sense favorites.

Guest use should work without sign-in; authentication by email/password and Google, account-specific favorites and progress restored after reload/sign-in, and a clear sign-out flow are expected in the full MVP. Do not assume provider credentials exist or misrepresent untested auth as working. Privacy must rely on appropriate server-side access controls such as Supabase RLS, not only UI hiding.

**Common stack:** Next.js, React, TypeScript, Supabase, GitHub, Vercel, browser speech synthesis. Fix and report tested exact tool/dependency versions when development begins; no service-role credentials in client code or Git. Separate deployments and method-specific storage so one experimental condition does not erase another's progress.

**Not in scope:** Payments, AI chat tutor, speech recognition or scoring, admin portal, social features, large curriculum creation, production-grade localization. Students should not be required to create hundreds of new lessons.

**Experiment boundary:** Both methods start with the same data, these goals, and the same independent test obligations. Condition A develops through ordinary conversational prompts with student approval rather than receiving a fully engineered SRS; B creates its detailed specifications via Spec Kit before implementation. No old application source is supplied as new code.

The original inputs are historical and not Swedish-teacher-certified; provenance and permissions require review before publishing educational data publicly.
