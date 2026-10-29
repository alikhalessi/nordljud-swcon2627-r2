# V-008-R03 — Verbatim student approval recorded before implementation
Date: 2026-10-29 (Europe/Helsinki)
Branch: `hardening/v008-r03`
Approved AI_DRAFT: `evidence/V-008-R03_AI_DRAFT_FINAL_STABILIZATION_2026-10-29.md`, GitHub blob SHA `dfe605bbd29fdaeeb0ad1c717e2d6f96fbf6624d`.

## Exact student reply — original Persian, verbatim
> موافقم، اجراش کن لطفاً.

Meaning: "I agree, please execute it."

The reply directly follows the assistant's request to approve the exact linked R03 English AI_DRAFT (including its Persian translation). No changes to the reviewed prompt were requested.

## Scope accepted before implementation
Student approved **the full exact English prompt** in the linked AI_DRAFT. Execute only R03 final stabilization and verification in the isolated Vibe branch. Run existing unit tests, TypeScript, production build; make code/test changes only to remedy an actual found defect using test-first evidence. Try authentic browser Guest/lesson/review/accessibility checks only to the extent accessible; do not invent browser tests. Preview may lack Supabase environment variables and be SSO protected; retain live Auth/Cloud/two-account RLS as NOT TESTED unless actually verified.

This approval is **not** permission to merge PR #1/#2/#3, promote code to public Production, change Production Vercel settings or Supabase Auth/Google/SMTP, create test users or re-run Production schema migration. Do not start V-009 without separate student approval.

Provenance: AI_DRAFT (prior GitHub file) -> STUDENT_APPROVED (this entry, committed before any R03 coding) -> subsequent execution/evidence.
