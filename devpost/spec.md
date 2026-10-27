---
doc: spec
status: approved
---

# SkillMirror : Technical Spec

## How This Works, In Plain Language
SkillMirror is a developer education web app that tests what you actually understand about code rather than just explaining it to you. When you paste code or pick a classic pitfall (like JavaScript closures or Python mutable defaults), SkillMirror parses the code and generates a multi-choice prediction quiz. Instead of looking at execution outputs passively, you must predict what the code does first.

When you make a choice, SkillMirror doesn't just say "correct" or "wrong": it compares your chosen answer against a catalog of common mental model misconceptions. If you pick an answer that reflects a known trap (e.g., thinking `var` creates a new variable per loop iteration), SkillMirror calls out the exact misconception in plain English, and immediately generates an adaptive follow-up challenge that isolates that flaw. A Socratic Coach chat panel lets you ask questions without giving away answers, while a Knowledge Summary tracks your strengths and skill gaps.

## The Core Journey Through the System
1. **User loads page:** Next.js loads the Client App (`app/page.tsx`). Stored user progress (streak, accuracy, completed counts, strengths, skill gaps) is hydrated from browser `localStorage`.
2. **User selects/pastes code:** User picks a preset from `Curated Lab` (e.g., JS Closures) or pastes custom code.
3. **Challenge Generation:** User clicks "Mirror My Understanding". The app sends the code to `/api/diagnose`. If an LLM API key (`GEMINI_API_KEY` or `OPENAI_API_KEY`) is set, the API queries the model for output prediction options, edge cases, and misconception maps; if no key is present, the built-in diagnostic catalog serves instant, rich evaluations.
4. **Prediction Quiz Render:** The left panel renders the syntax-highlighted snippet and presents the Prediction Quiz Card with 4 distinct options (`A:`, `B:`, `C:`, `D:`).
5. **Prediction Submission & Diagnosis:** The learner selects an option. The client validates the choice against the answer key.
   - If incorrect: A vibrant coral banner reveals the true runtime output and displays the exact Diagnosed Misconception.
   - If correct: A vibrant emerald banner confirms the correct mental model and explains why edge cases behave as they do.
6. **Adaptive Follow-Up Trigger:** The app calls `/api/followup` (or loads the tailored remedial scenario). It updates the workbench with a targeted follow-up snippet and question isolating the detected gap.
7. **Socratic Coach Query:** The learner clicks into the right-hand Socratic Discussion drawer to ask questions (e.g. "Why did that happen?"). The request posts to `/api/chat` which responds in a Socratic guiding style.
8. **Mastery Tracking Update:** The outcome updates `localStorage`: increments streak, recalculates accuracy, logs the concept to Strengths or Skill Gaps, and refreshes the Knowledge Summary view.

## Stack
- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
  - *Rationale:* Fast server-side and client-side rendering, standard API routes, and easy local dev and zero-config deployment.
  - [Next.js Documentation](https://nextjs.org/docs)
- **Styling:** Tailwind CSS + Vanilla CSS Tokens
  - *Rationale:* Rapid utility classes combined with custom CSS tokens for dark slate aesthetics, glowing badges, and pill borders matching the reference images.
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Icons:** `lucide-react`
  - *Rationale:* Crisp, modern SVG icons for developer dashboards (code, zap, check-circle, alert-triangle, flame, message-square).
  - [Lucide Icons](https://lucide.dev)
- **Code Highlighting & Formatting:** Custom lightweight syntax tokenizer with dark-theme tokens (keywords, functions, strings, numbers, comments).
  - *Rationale:* Lightweight, zero heavy bundle penalty, guaranteed reliable server and client hydration without hydration mismatches.
- **LLM Diagnostic Integration:** Server route supporting Google Gemini API / OpenAI API with fallback Mock Engine.
  - *Rationale:* Enables full live AI synthesis when a key is present while ensuring 100% functionality and zero friction when testing or recording demo videos locally.

## Where It Runs and How Someone Tries It
- **Runtime:** Node.js v20+ / v22+
- **Environment:** Local development server
- **API Keys (Optional):** `GEMINI_API_KEY` in `.env.local` (mock engine automatically activates if key is absent).
- **Start Command:**
  ```bash
  npm run dev
  ```
- **Browser URL:** `http://localhost:3000`
- **Submission Demo:** Screen recording (1–3 minutes) demonstrating:
  1. Selecting the JS Closures challenge.
  2. Predicting `0` (the classic `var` loop misconception).
  3. SkillMirror flagging the error and diagnosing the mental model trap.
  4. Dynamic adaptive follow-up challenge fixing it with `let`.
  5. Socratic chat interaction and Knowledge Summary metrics updating.

## Look and Feel
- **Color Palette:**
  - Base canvas: `#090d16` (obsidian slate)
  - Card containers: `#111827` and `#1e293b` with border `#334155`
  - Accent Primary: `#6366f1` (electric indigo) with glow `rgba(99, 102, 241, 0.25)`
  - Accent Success: `#10b981` (emerald green)
  - Accent Error/Diagnostic: `#f43f5e` (coral rose)
  - Accent Flame/Streak: `#f59e0b` (amber)
- **Typography:**
  - UI: Inter / Outfit / Sans-serif
  - Code: JetBrains Mono / SF Mono / Consolas
- **Layout:**
  - Desktop: Left navigation sidebar, dual-pane workspace (Code & Challenge on the left, Socratic Coach & Analytics on the right).
  - Responsive: Stacks neatly on narrower viewports.

## Components
Implements `prd.md > Screens and Layout` and `prd.md > Features and Behavior`.

### 1. `SidebarNav`
- Left navigation containing brand logo, view switcher (`Workbench`, `Curated Lab`, `Mastery & Gaps`), streak counter, and user profile badge.
- PRD ref: `prd.md > Screens and Layout (Left Navigation Sidebar)`.

### 2. `CodePlayground`
- Visual code editor with line numbers, syntax tokens, language indicator, copy snippet button, and reset button.
- PRD ref: `prd.md > Features and Behavior (Code Snippet Selection)`.

### 3. `PredictionQuizCard`
- The core comprehension test: renders question prompt, 4 selectable option pills (`A:`, `B:`, `C:`, `D:`), and action buttons.
- PRD ref: `prd.md > Features and Behavior (Intelligent Prediction Generator)`.

### 4. `DiagnosticBanner`
- Appears upon answer submission. In error state, displays the Diagnosed Misconception card with a red tag and explains the mental model trap. In success state, confirms runtime correctness.
- PRD ref: `prd.md > Features and Behavior (Misconception Diagnostic Engine)`.

### 5. `AdaptiveFollowUpCard`
- Renders the targeted follow-up question and code snippet specifically generated to test if the identified misconception has been resolved.
- PRD ref: `prd.md > Features and Behavior (Targeted Adaptive Follow-up Generation)`.

### 6. `SocraticCoachPanel`
- Split-screen drawer featuring conversational chat with an AI Socratic tutor that guides the user towards understanding without giving answers away.
- PRD ref: `prd.md > Features and Behavior (Socratic Mirror)`.

### 7. `KnowledgeSummaryView`
- Analytics dashboard showing accuracy percentage, practice streaks, strengths breakdown, and active skill gaps.
- PRD ref: `prd.md > Features and Behavior (Mastery Analytics & Strengths/Gaps)`.

## Data Model
Client State & `localStorage`:
```typescript
interface Option {
  id: string; // "A" | "B" | "C" | "D"
  text: string;
  isCorrect: boolean;
  misconception?: string; // e.g. "Assumed var is block-scoped in for loops"
  explanation: string;
}

interface Challenge {
  id: string;
  title: string;
  concept: string; // e.g. "Closures & Scoping"
  language: "javascript" | "python" | "typescript";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  code: string;
  question: string;
  options: Option[];
  followUp: {
    code: string;
    question: string;
    options: Option[];
    targetedMisconception: string;
  };
}

interface UserProgress {
  streakDays: number;
  totalAttempts: number;
  correctAttempts: number;
  strengths: { concept: string; score: string }[];
  skillGaps: { concept: string; score: string; misconception: string }[];
  recentHistory: {
    challengeId: string;
    challengeTitle: string;
    concept: string;
    passed: boolean;
    date: string;
  }[];
}
```

## File Structure
```
skill-mirror/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts         # Socratic Coach conversational API
│   │   ├── diagnose/
│   │   │   └── route.ts         # Challenge and misconception generation API
│   │   └── followup/
│   │       └── route.ts         # Adaptive remedial follow-up API
│   ├── favicon.ico
│   ├── globals.css              # Custom tokens, slate themes, glow utilities
│   ├── layout.tsx               # Root layout with font imports
│   └── page.tsx                 # Main application dashboard & dual-pane layout
├── components/
│   ├── AdaptiveFollowup.tsx     # Targeted follow-up challenge card
│   ├── CodePlayground.tsx       # Dark-mode syntax highlighted code box
│   ├── DiagnosticBanner.tsx     # Misconception outcome banner
│   ├── KnowledgeSummary.tsx     # Mastery stats, strengths & skill gaps view
│   ├── PredictionQuizCard.tsx   # Quiz question & pill options
│   ├── SidebarNav.tsx           # Navigation sidebar with streak/XP
│   └── SocraticDrawer.tsx       # Chat panel for Socratic tutor
├── data/
│   └── curatedChallenges.ts     # Library of classic mental model traps
├── lib/
│   ├── storage.ts               # LocalStorage helpers for user progress
│   └── syntaxHighlighter.ts     # Safe token-based code syntax highlighter
├── devpost/                     # Devpost Learn Hackathon Artifacts
│   ├── checklist.md
│   ├── learner-profile.md
│   ├── prd.html
│   ├── prd.md
│   ├── scope.html
│   ├── scope.md
│   ├── spec.html
│   └── spec.md
├── .gitignore
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## External Services and Dependencies
- **Next.js 15+ / React 19:** Application foundation and client routing.
- **Lucide React:** Iconography.
- **Tailwind CSS:** Responsive styling engine.
- **Gemini API (Optional):** Generates dynamic diagnoses for arbitrary code snippets when `GEMINI_API_KEY` is provided in `.env.local`. When absent, the app falls back smoothly to the rich internal diagnostic engine.

## Important Failure Modes
1. **No API key provided or API rate-limited:** The app falls back immediately and transparently to the rich built-in diagnostic catalog, preventing any broken user states during testing or recording.
2. **User pastes empty or non-code text:** The UI provides an inline validation alert explaining that a valid code snippet is required.
3. **Local storage unavailable (incognito/security):** The app falls back to in-memory state with a non-intrusive warning, ensuring the session remains fully interactive.

## What Was Simplified and Why
- **In-memory + LocalStorage State instead of PostgreSQL / Supabase:** For a hackathon proof-of-concept, requiring users to register an account and run database migrations creates unnecessary friction. LocalStorage gives instant persistence and zero-friction setup.
- **Curated Challenge Library + AI Custom Generator:** Combining verified preset pitfalls with an AI generator ensures flawless 1-minute demo presentations while still enabling arbitrary custom snippet testing.

## Decisions and Open Issues
- **Decision:** Dual-pane layout (Challenge on left, Socratic coach on right) to match the reference images (`h3HRs1...`, `_0c_R-1b0...`) allowing learners to inspect code and discuss nuances simultaneously without context-switching.
- **Clarification:** Misconceptions are explicitly diagnosed and named in the feedback banner so learners immediately recognize the specific cognitive bug in their mental model.
