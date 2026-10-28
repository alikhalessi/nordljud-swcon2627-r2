# Vibe Coding prompt and human-approval protocol

**NON-NEGOTIABLE:** No Vibe coding prompt is executed, and no application code committed, before the student has reviewed and approved the exact prompt text. V-001 has **not** been executed at shared-baseline creation.

For each prompt:
1. Student describes their goal in their own words (save original user message or reference its exact conversation location).
2. ChatGPT proposes **an AI-assisted draft** in natural, direct English reflecting the student's style.
3. Student reads, changes if desired, and explicitly approves the **final exact text**.
4. Record approved text **before execution**; if the tool sends a distinct technical instruction, record it separately as agent-facing input.
5. Run exactly the approved prompt within the designated method branch.
6. Record output, changed files, commit SHA, observed UI behavior, test outcomes, failures, follow-up decisions and evidence links.
7. If failed or incomplete, draft a new corrective prompt, and repeat steps 1–6.

**Provenance statuses:** USER_ORIGINAL / AI_DRAFT / STUDENT_APPROVED / EXECUTED / RESULT_VERIFIED / MISSING. Never label a retrospective paraphrase or assistant-written master prompt as an original user prompt.

**Vibe vs SDD boundary:** Do not turn natural Vibe interactions into a preapproved detailed SRS or prescribe Spec Kit stages to Condition A. The same classroom product goal and external acceptance matrix are permitted to both; detailed upfront specification belongs to Condition B.

**Privacy/academic note:** No secret tokens, passwords or private student data in prompt logs. The final report should state honestly that the student's wording was edited with AI assistance, reviewed and approved by the student.
