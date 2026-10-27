---
doc: scope
status: approved
---

# SkillMirror : Find Out What You Actually Understand

An adaptive developer education app that tests what you actually understand about code rather than just explaining it to you.

## The Unique Kernel
Unlike traditional AI coding tools that passively generate or explain code, SkillMirror actively challenges the learner's mental model. It forces the learner to predict execution output, timing, or edge-case behavior before revealing results, identifies the exact underlying misconception from their choices, and dynamically synthesizes an adaptive follow-up challenge calibrated to repair that specific blind spot.

## Who It's For
A developer, coding bootcamp student, or self-taught programmer who uses AI to write or study code, but secretly worries they don't actually understand how it works under the hood. Today, they read passive explanations or AI tutorials that create a false sense of competence ("fluency illusion"), only to get completely stuck during technical interviews or real-world debugging.

## The Core Loop
1. **Input:** The learner pastes a tricky code snippet or selects a curated concept (e.g., JavaScript Closures & Event Loop, Python Mutable Defaults, React Stale State).
2. **Prediction Challenge:** SkillMirror generates a high-leverage question testing execution flow, output prediction, or edge-case decisions.
3. **Active Diagnosis:** The learner selects their predicted output or submits their answer. SkillMirror evaluates the mental model, revealing the true output and diagnosing any misconception.
4. **Adaptive Follow-Up:** SkillMirror immediately generates a targeted follow-up code challenge that isolates the diagnosed misconception.
5. **Socratic Coach:** An interactive side-panel discussion lets the user ask questions, request progressive hints, or unpack nuances.
6. **Mastery Tracking:** Strengths and identified skill gaps are tracked with visual mastery metrics, streaks, and concept breakdowns.

## Inspiration & Identity
- **Design Inspiration:** Curated reference interfaces from modern developer learning platforms (Codelingo, CodeBuddy, Hyperskill, Context-Free Coder).
- **Aesthetic:** High-contrast modern dark-slate palette (`#090d16`, `#0f172a`, `#1e293b`), glowing electric indigo (`#6366f1`) and emerald (`#10b981`) accents, syntax-highlighted code editors with line numbering, pill and hexagonal answer selectors, and dual-pane layout (Challenge Workbench on the left, Socratic Tutor & Analytics on the right).
- **Tone:** Encouraging, rigorous, Socratic, and developer-first.

## Why This Matters to the Learner
In the era of AI-generated code, the limiting factor for developers is no longer typing syntax:it is understanding execution semantics and mental models. SkillMirror empowers learners to build real competence that endures.

## What "Working" Looks Like
In the live demo:
1. The user selects or pastes a classic JavaScript closure conundrum (`for (var i = 0; i < 3; i++) { funcs.push(() => i); }`).
2. SkillMirror presents a prediction quiz asking what `funcs[0]()` evaluates to.
3. The user picks the common misconception: `0`.
4. SkillMirror immediately highlights the error in red, pinpoints the misconception (*"You assumed `var` has block scope inside loops; because `var` is function-scoped, all closures reference the identical memory cell which ends at 3"*).
5. SkillMirror dynamically generates a follow-up challenge fixing the issue with `let` and asking what happens when mutated inside a `setTimeout`.
6. The user discusses the nuance in the Socratic Discussion drawer, and their Knowledge Summary reflects: Strength in Function Invocations, Skill Gap in Closure Variable Binding.

## The POC Boundary
- **In Scope:**
  - Next.js application with Tailwind/modern CSS custom styling matching reference images.
  - Curated preset library (JS Closures, Python Mutability, Async/Await microtasks, React closures) + Custom Code Paste box with language auto-detection.
  - LLM-powered challenge generator with structured outputs (output prediction, edge cases, mental model diagnosis).
  - Instant diagnostic feedback banner explaining the underlying mental model trap.
  - Adaptive follow-up generator targeting detected misconceptions.
  - Split-screen / tabbed Socratic AI discussion panel.
  - LocalStorage progress system: Strengths, Skill Gaps, Practice Streak, and Concept Mastery percentage.
  - Resilient offline/mock fallback mode ensuring the app runs immediately even before an API key is configured.
- **Later:**
  - Full multi-file repository scanning.
  - Interactive WebContainer/Pyodide sandbox to execute arbitrary untrusted code in-browser.
  - User accounts and cloud synchronization.
  - Community challenge sharing.
- **Explicitly Cut:**
  - Mandatory login/auth (unnecessary friction for a 1–3 minute hackathon demo).
  - Video tutorials or passive reading material (contradicts the active prediction philosophy).
