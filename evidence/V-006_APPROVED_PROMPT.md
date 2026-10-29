# V-006 — exact student-authored, revised implementation prompt

**Date:** 2026-10-29 (Europe/Helsinki). **Condition:** V2-A assisted Vibe Coding, branch `condition/vibe`.
**Provenance:** Student personally supplied the *entire corrected English text* in chat in reply to an earlier ChatGPT-drafted proposal. This is the **student-edited, student-approved exact source**. Do not substitute the earlier inaccurate assistant draft.
**Specific correction:** Google Login and Logout were tested; **email registration NOT tested**. Do not call email signup a student-verified PASS.
**Timing:** Recorded before V-006 code changes and before Supabase migration. No independent coding agent or Spec Kit invocation.

## Exact student-supplied prompt

```text
I have successfully tested user authentication in Nordljud, including Google Login but not email registration, and logout.
Now I want Nordljud to remember what each user has learned.
When I sign in, I would like to save my favorite Swedish verbs and easily find them again in a separate Favorites section.
I also want to mark verbs as studied and see my learning progress separately for A2, B1, B2, and C1.
When I complete a Practice Mode exercise, I want my score and activity to be saved automatically so I can see my previous results.
All this information should remain available after refreshing the page, logging out, and logging back in, even on another device.
Please use the existing Supabase project and keep each user's information private. One user must never be able to view or change another user's favorites, scores, or progress.
I also want to keep Guest Mode. Guests should still be able to study and practice without an account, but the application should clearly explain that their progress will not be saved permanently.
Users should be able to remove favorites, change the studied status of verbs, and delete their saved learning history.
Please keep the existing learning levels, vocabulary explorer, verb forms, pronunciation, photographs, cross-level comparison, and practice features unchanged.
If any database configuration or security settings require manual work, tell me exactly what needs to be done instead of assuming that you have access.
Let's implement this improvement first. Then I will test the saved information, account privacy, and learning experience before we continue.
```

## Assistant implementation boundaries (not part of student's wording)

Use the existing separate `nordljud-v2-auth` project (`rhtrzuoqycdnwcbgctpe`). Enforce per-user isolation in database RLS, not merely a client-side filter. Keep guest work functional without remote persistence. Differentiate exact `verb + meaning` senses (e.g., two `sticka` meanings), and studied status by level. Never claim browser E2E until the student actually tests it. Build/CI/deploy/manual actions need their own chronological evidence.
