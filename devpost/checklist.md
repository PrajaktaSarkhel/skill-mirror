---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Next.js App Foundation, Theme Design System & Code Playground**
  Becomes usable: A running Next.js web application with dark-slate styling, responsive layout, left navigation sidebar (`SidebarNav`), and interactive `CodePlayground` with line numbers and curated concept presets.
  Why now: Proves the runtime and aesthetic baseline, establishes design tokens from the reference screenshots, and creates the container for all challenge interactions.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Features and Behavior` (Code Snippet Selection)
  Spec ref: `spec.md > Components` (SidebarNav, CodePlayground), `spec.md > File Structure`
  Build: Initialize Next.js with Tailwind CSS, Lucide icons, dark slate theme variables, layout structure, curated presets data, SidebarNav, and CodePlayground.
  Verify (mechanical): Run dev server and build command; verify page renders without hydration or styling errors at http://localhost:3000.
  Learner check: Open http://localhost:3000 and verify the dark-mode developer workbench, navigation sidebar, and code snippet viewer.
  Commit: `Initialize Next.js app with dark theme and code playground`

- [x] **2. Prediction Quiz Engine with Misconception Diagnostic Banner**
  Becomes usable: Learners can actively predict execution outputs before answers are revealed. Picking an answer immediately renders a diagnostic banner: red/coral with the diagnosed cognitive misconception, or green with full execution rationale.
  Why now: Directly proves the unique kernel of SkillMirror: active mental model diagnosis instead of passive explanation.
  PRD ref: `prd.md > Features and Behavior` (Intelligent Prediction Generator, Misconception Diagnostic Engine)
  Spec ref: `spec.md > Components` (PredictionQuizCard, DiagnosticBanner)
  Build: Build `PredictionQuizCard` with option buttons (`A:`, `B:`, `C:`, `D:`) and `DiagnosticBanner` with misconception tag, connecting to `/api/diagnose` and the diagnostic catalog.
  Verify (mechanical): Select choice "0" on the JavaScript closure challenge; verify the coral banner mounts and displays "Misconception: Assumed var has block scope in for loops".
  Learner check: Try selecting an intuitive wrong answer, observe the diagnostic banner diagnose your mental model, and review the explanation.
  Commit: `Add prediction quiz engine and misconception diagnostic banner`

- [x] **3. Adaptive Follow-up Challenge Generator**
  Becomes usable: After diagnosing a misconception, SkillMirror dynamically synthesizes an adaptive follow-up challenge with revised code isolating the identified flaw (e.g. swapping `var` with `let`) to confirm understanding.
  Why now: Closes the adaptive learning loop, turning diagnosis into immediate guided remediation.
  PRD ref: `prd.md > Features and Behavior` (Targeted Adaptive Follow-up Generation)
  Spec ref: `spec.md > Components` (AdaptiveFollowUpCard), `spec.md > Data Model`
  Build: Build `AdaptiveFollowUpCard` and `/api/followup` integration, allowing the user to inspect the corrected snippet and answer the follow-up prediction.
  Verify (mechanical): Trigger the follow-up action and verify the follow-up card displays the targeted misconception badge and options.
  Learner check: Complete the follow-up challenge to verify your mental model is repaired.
  Commit: `Add adaptive follow-up challenge generator`

- [x] **4. Socratic AI Mentor Drawer & Mastery Analytics**
  Becomes usable: The right-hand Socratic Discussion drawer enables conversational questions with an AI coach that guides without spoiling answers. The Knowledge Summary tab shows Strengths vs. Skill Gaps, accuracy %, and practice streaks.
  Why now: Delivers the full product experience matching references `h3HRs1...` and `R9KfT...` with persistent progress in `localStorage`.
  PRD ref: `prd.md > Features and Behavior` (Socratic Mirror, Mastery Analytics)
  Spec ref: `spec.md > Components` (SocraticCoachPanel, KnowledgeSummaryView)
  Build: Build `SocraticDrawer` with conversational `/api/chat`, build `KnowledgeSummary` view with circular mastery meters, strengths/gaps tracking, and local storage sync.
  Verify (mechanical): Test `/api/chat` for Socratic response; verify progress state updates in `localStorage` across page reload.
  Learner check: Chat with the Socratic coach about closures, inspect your Knowledge Summary dashboard, and verify your updated skill gaps.
  Commit: `Add Socratic AI mentor drawer and mastery analytics`

## Hands-on Checkpoints

- [x] Early usable behavior explored : verified Next.js app running at http://localhost:3000
- [x] Final kick-the-tires exploration and feedback completed : tested diagnosis and chat API routes

## Final Review

- [x] Final review complete : feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete : guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed : offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Verified end-to-end diagnosis flow with Next.js App Router and tokenized code highlighting
Route and stops: app/page.tsx -> components/CodePlayground.tsx -> components/PredictionQuizCard.tsx -> components/DiagnosticBanner.tsx -> components/AdaptiveFollowup.tsx -> components/SocraticDrawer.tsx -> components/KnowledgeSummary.tsx
Edit outcome: not applicable; verified build passes with 0 errors
Reflection: Flipped interaction dynamic: requiring prediction before revealing answers accelerates true understanding
Activity mode: live app running on http://localhost:3000

## Revisions

