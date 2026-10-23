---
doc: prd
status: approved
---

# SkillMirror — Product Requirements

An adaptive developer education application that diagnoses underlying misconceptions in code comprehension and delivers targeted remedial challenges.
Source: `scope.md > The Unique Kernel` and `scope.md > The Core Loop`.

## The Core Journey
1. **Arrival:** The learner lands on the SkillMirror dashboard. They see an overview of their current Practice Streak, Accuracy, Strengths vs. Skill Gaps, and a featured challenge card.
2. **Select or Paste Code:** The learner can select from curated concept snippets (e.g., JavaScript Closures & Event Loop, Python List Mutability, React Stale State, Async Microtasks) or paste their own snippet with language selection (JS, TS, Python).
3. **Analyze & Generate Challenge:** The learner clicks "Mirror My Understanding" (or selects a preset). SkillMirror's AI engine breaks down the snippet, highlights the execution focus, and generates a Prediction Quiz.
4. **Predict Before Reveal:** Rather than simply showing output, SkillMirror presents a prediction question ("What will `funcs[0]()` print to the console?") with distinct option pills (`A:`, `B:`, `C:`, `D:`) or custom output prediction.
5. **Instant Diagnostic Feedback:**
   - If correct: Positive confirmation with deep rationale and an advanced edge-case question.
   - If incorrect: A high-visibility diagnostic banner identifies the exact misconception (e.g., *"Misconception: Assumed `var` has block scope inside loops"*), contrasting the user's intuitive model with actual runtime semantics.
6. **Adaptive Follow-up Challenge:** SkillMirror dynamically generates a follow-up challenge isolating that exact misconception (e.g., swapping `var` with `let` or introducing an IIFE) to test whether the mental model is now fixed.
7. **Socratic Coach Discussion:** On the right pane, the user can chat with the Socratic AI Coach to ask "Why did `var` hoist like that?" or request progressive hints.
8. **Updated Mastery Summary:** The user's Knowledge Summary updates in real-time, showing newly demonstrated strengths and remaining skill gaps.

## Screens and Layout
Inspired by reference images `_0c_R-1b0...`, `brLL1hG...`, `vFcGy...`, and `h3HRs1...`:
1. **Left Navigation Sidebar:**
   - Brand header with glowing SkillMirror icon and version tag.
   - Navigation links:
     - **Challenge Workbench:** The active code testing and diagnosis view.
     - **Curated Lab:** Browse popular tricky concepts (Closures, Mutability, Event Loop, Memory references).
     - **Knowledge Summary & Gaps:** Visual skill gap analysis, accuracy meter, and practice history.
   - User profile badge with current XP and streak counter.
2. **Main Challenge Surface (Dual-Pane Split):**
   - **Left Pane (Code & Challenge Stage):**
     - Top breadcrumb & challenge meta (e.g., `JavaScript Foundations / Closure Scope Conundrum`, difficulty badge, estimated time).
     - Code Playground container: Dark terminal styling, line numbers, syntax highlighting, copy button, and reset button.
     - Interactive Quiz Card: Question header, question prompt, hexagonal/pill choice selectors (`A:`, `B:`, `C:`, `D:`), and submit button.
     - Diagnostic Outcome Box: Red/Coral error banner with misconception identification, or Green success banner with runtime explanation.
     - Adaptive Follow-Up Card: Dynamic follow-up exercise specifically targeting the misconception.
   - **Right Pane (Socratic Coach & Live Metrics):**
     - Socratic Discussion chat drawer: Conversational AI mentor ready to unpack execution semantics without spoon-feeding answers.
     - Instant Skill Metrics: Quick-view of current concept mastery %, accuracy, and detected skill gaps.

## Look and Feel
- **Theme:** High-tech developer dark theme with rich slate surfaces.
- **Palette:**
  - Base Background: `#090d16` (deep obsidian slate)
  - Card & Container Surfaces: `#111827` and `#1e293b` with subtle 1px border `#334155`
  - Primary Accent: `#6366f1` (electric indigo) with soft glow `rgba(99, 102, 241, 0.25)`
  - Secondary Accent / Success: `#10b981` (emerald green)
  - Diagnostic / Error Highlight: `#f43f5e` (vibrant rose/coral)
  - Warning / Streak Accent: `#f59e0b` (amber flame)
- **Typography:**
  - Headings & UI: Inter / Outfit / System Sans with tight tracking and high contrast.
  - Code & Terminal: JetBrains Mono / Fira Code with clear ligatures and syntax tokens.
- **Interactive Feedback:** Micro-animations on option selection, smooth reveals for diagnostic banners, and pulse indicators on active AI generation.

## Features and Behavior

### 1. Code Snippet Selection & Custom Input
- Implements `scope.md > The Core Loop (Input)`.
- Users can choose from curated scenarios:
  1. **JavaScript Closures & Loop Scoping:** `var` vs `let` in callbacks.
  2. **Python Mutable Default Arguments:** `def append_to(val, lst=[])`.
  3. **JavaScript Event Loop & Microtasks:** `Promise.resolve().then(...)` vs `setTimeout(...)`.
  4. **React Stale Closures:** `useEffect` with missing dependency array.
  5. **Python Variable Rebinding vs In-Place Mutation:** `list += [1]` vs `list = list + [1]`.
- Users can paste any custom code snippet and select the language.

### 2. Intelligent Prediction Generator
- Implements `scope.md > The Core Loop (Prediction Challenge)`.
- Generates 4 distinct plausible output choices or execution outcomes.
- Distractors are not random; each distractor maps to a known real-world cognitive bug or beginner intuition.

### 3. Misconception Diagnostic Engine
- Implements `scope.md > The Unique Kernel`.
- When an incorrect answer is selected, SkillMirror compares the user's choice against the underlying execution rules.
- Outputs:
  - The actual execution output.
  - The diagnosed mental model trap (e.g., *"You thought loop variable `i` is captured by value at the time the function is created"*).
  - The architectural correction (e.g., *"Closures capture variables by reference, and `var` has function scope"*).

### 4. Targeted Adaptive Follow-up Generation
- Implements `scope.md > The Core Loop (Adaptive Follow-Up)`.
- Generates a follow-up snippet that specifically isolates the diagnosed gap (e.g., "Now see what happens if we replace `var` with `let` or use an IIFE. Predict the new output!").

### 5. Socratic Mirror (AI Discussion Drawer)
- Implements `scope.md > The Core Loop (Socratic Coach)`.
- Learners can ask questions ("Why didn't the closure snapshot `i`?") and receive Socratic guidance that leads them to self-discovery rather than dumping raw answers.

### 6. Mastery Analytics & Strengths/Gaps
- Implements `scope.md > The Core Loop (Mastery Tracking)`.
- Tracks:
  - Accuracy rate (e.g., 85%).
  - Total challenges completed.
  - Strengths list (e.g., `Function Calls: 4/4`, `Return Values: 3/3`).
  - Skill Gaps list (e.g., `Closure Variable Binding: 1/3`, `Microtask Queues: 1/2`).

## States and Boundaries
- **First Use:** Shows curated beginner-friendly example (JS Closures) pre-loaded with an inviting "Test Your Mental Model" prompt.
- **Analyzing / Generating:** Sleek shimmer loader with status badge ("Analyzing execution tree...", "Synthesizing mental model probes...").
- **Diagnosed Incorrect:** Distinct coral banner with misconception badge and target follow-up button.
- **Diagnosed Correct:** Green celebratory banner with technical depth note and streak increment.
- **Offline / Zero-Config Fallback:** If an LLM API key is not configured, SkillMirror seamlessly activates a rich built-in diagnostic catalog containing expert-crafted questions and misconception maps so the app is 100% functional out of the box.

## Product Decisions
- **Client-Side Storage for Progress:** Kept in `localStorage` so the user can refresh without losing streak or mastery data, requiring zero login barrier.
- **Curated Catalog + Custom Paste:** Providing both ensures the demo video can show immediate, reliable magic with known tricky snippets while still supporting user-supplied code.
- **Proactive Socratic Coach:** A built-in conversation sidecar prevents the user from leaving the app when they want deeper explanations.

## What We're Building
A complete Next.js web application with:
1. Challenge Workbench with interactive dark-mode code viewer.
2. Prediction quiz with misconception detection and diagnostic outcome banners.
3. Dynamic targeted follow-up generator.
4. Socratic AI chat drawer with instant conversational feedback.
5. Strengths vs. Skill Gaps dashboard with accuracy meters and streak counter.
6. Pre-packaged library of 5 classic developer pitfalls + custom code analyzer.

## Deferred From the POC
- Multi-user authentication & cloud backend.
- Video playback or audio narration.
- Sandboxed execution VM for untrusted third-party binaries.

## Non-Goals
- Not a replacement for a code editor (e.g., VS Code).
- Not a generic chatbot: questions must be grounded in code prediction.
