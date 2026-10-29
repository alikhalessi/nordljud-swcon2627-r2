# V-008-R01 — Student's exact approval BEFORE code or CI changes

**Date:** 2026-10-29 (Europe/Helsinki; use GitHub's exact commit timestamp)  
**Branch/condition:** Nordljud Round 2, Vibe Coding, `condition/vibe`  
**Status at this commit:** `STUDENT_APPROVED / NOT YET IMPLEMENTED / PRODUCTION SETTINGS & MIGRATIONS NOT AUTHORIZED`  
**Current pre-approval branch HEAD:** `8b9fe732ad7c898891914821c0d0059c4451b7ba`.  
**Last verified application release candidate:** `d9a472ba934aad3dec1c3244cfeefbaa72ca8746` (V-008; 72/72 tests + typecheck + Next build), separate from later evidence-only commits.  
**Earlier full English prompt:** [V-008-R01 AI_DRAFT](V-008-R01_AI_DRAFT_CONTROLLED_RELEASE_FOUNDATION_2026-10-29.md), commit `e61b179cceaac209db9fb1899699627c44c63023`. The user reviewed a full Persian translation in chat; official GitHub documents contain only English as requested.

## Exact original student authorization (verbatim)

> I have reviewed the full Persian translation and approve V-008-R01 exactly as written in the English GitHub V-008-R01_AI_DRAFT_CONTROLLED_RELEASE_FOUNDATION_2026-10-29.md. Record my exact approval before code or CI changes, implement R01 on condition/vibe, preserve RED/GREEN and research evidence, and do not change live Vercel production settings or apply Supabase production migrations without the separate approvals specified in the prompt. Do not start R02 before my acceptance.

## Scope, sequencing, and safety

The student expressly approves the complete earlier AI-authored English R01 prompt for **Vibe-only** release engineering: a reproducible npm lockfile and `npm ci`, CI/CD gates, preview-versus-public release isolation, release smoke checks, rollback instructions and factual RED/GREEN evidence. The English wording is assistant-authored, explicitly student-approved, not originally student-authored.

The user **did not** authorize changing live Vercel Production settings, deploying/promoting/rolling back Production without any required extra confirmation, or applying Production Supabase migrations. No R02/R03/V009 coding is authorized by this approval. Frozen F01–F15 benchmarks and the independent `condition/spec-driven` branch must remain untouched.

**Protection when testing:** GitHub `condition/vibe` is presently linked to Vercel Production. To preserve genuine test-first RED events while avoiding deployment of knowingly failing partial code to Production, it is safer to implement and validate R01 on an isolated branch **forked exactly from the student-approved Vibe branch**, then propose a final tested merge into `condition/vibe`. Do not merge/promote unapproved code into a Production-triggering branch merely to claim completion. Record this environmental gate honestly and seek a separate go-live confirmation if needed.

**This approval record is committed before any R01 source, CI or provider setting change.**
