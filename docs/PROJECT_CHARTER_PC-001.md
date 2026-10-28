# Nordljud 2.0 — Software Construction Project Charter

**Course:** Software Construction (SWCON2627), Åbo Akademi University  
**Project Type:** Comparative, AI-Assisted Software Construction Experience Report  
**Developer:** One student, working with AI-assisted development tools  
**Target:** Address all sections of the 35-point project report rubric.  
**Charter approval:** Student approved PC-001 in the ChatGPT conversation on 28 October 2026. Document archived with AI drafting assistance.

## 1. Project Goal

I want to develop a Swedish language learning web application called Nordljud and compare two different AI-assisted software development approaches: Vibe Coding and Specification-Driven Development (SDD) using GitHub Spec Kit.

My objective is not only to build working software but also to understand how the development methods differ in requirements handling, implementation, testing, debugging and the quality of the resulting software.

## 2. Product Scope

Nordljud will support four Swedish learning levels: A2, B1, B2 and C1.

The agreed classroom MVP will include level-specific learning missions, Swedish–English vocabulary exploration using the shared teaching dataset, verb forms, translation assistance, pronunciation, interactive exercises, favorites, user authentication and saved learning progress.

The existing dataset contains 456 meaning records per level and 455 distinct written verbs, including two separate meanings of *sticka*.

The application should also support guest usage, responsive design and separation of authenticated users' saved data.

## 3. Development Methods

**Condition A — Vibe Coding:** I will communicate my requirements in natural language, review each prompt before execution, observe what the AI produces, test the results and provide further instructions when changes are necessary. The development will remain iterative rather than being driven by a complete upfront technical specification.

**Condition B — Specification-Driven Development:** I will use the official GitHub Spec Kit workflow and a supported coding agent to establish project principles, define and clarify requirements, produce plans and tasks, implement the software and verify convergence.

Both conditions will use the same product scope, source dataset, technology constraints and independent evaluation criteria. Their application code will be developed separately.

## 4. Technology

The proposed common stack is TypeScript, React, Next.js, Supabase, GitHub and Vercel. Dependency versions and external configuration will be recorded and controlled before implementation.

## 5. Evaluation and Evidence

I will preserve the real prompts, important AI outputs, Git commits, specifications, test cases, failures, corrections, screenshots and verification results.

Both implementations will be assessed using common acceptance scenarios and automated checks. Each important requirement will have an identifiable verification result: PASS, FAIL, BLOCKED or NOT TESTED.

## 6. Academic Integrity and Limitations

The earlier Nordljud repository will remain unchanged as a pilot project. This second iteration will be documented as an informed redevelopment, not an independent first-time experiment.

I will distinguish my own instructions from AI-assisted prompt drafting and AI-generated code. I will also report known limitations, including prior experience, development-order effects and unavailable measurements, without inventing evidence.

## 7. Final Deliverables

The final submission will include two independently implemented applications, their Git histories, authentic prompt and specification records, testing evidence, comparative analysis, reflections, a proposed reusable SDD workflow and an experience report following the university's official template.
