# SkillMirror : Find Out What You Actually Understand

> **Built for Devpost Learn: Build With AI: Basics Hackathon**  
> *Adaptive Learning · Developer Education · Cognitive Misconception Diagnosis*

---

## 🎯 The Core Problem
With AI coding assistants, learners can generate working code in seconds:but often don't truly understand how it executes. Traditional tutorials and AI chatbots provide passive text explanations that foster an "illusion of competence," leaving developers stuck when faced with production bugs or technical interviews.

## 🪞 The Solution: SkillMirror
SkillMirror flips the dynamic. Instead of passively explaining code to you:
1. **Predict Before You Peek:** Paste any code snippet or pick a classic mental model trap. SkillMirror forces you to predict runtime output, evaluation timing, or edge-case behavior before answers are revealed.
2. **Cognitive Misconception Diagnosis:** When you select an intuitive wrong answer, SkillMirror doesn't just say "wrong":it pinpoints the exact cognitive flaw in your mental model (e.g., *"You assumed `var` is block-scoped inside loops"*).
3. **Adaptive Targeted Remediation:** SkillMirror dynamically generates a follow-up challenge isolating that exact misconception (e.g., swapping `var` with `let`) to confirm your mental model is repaired.
4. **Socratic Mirror Coach:** A split-screen AI mentor provides progressive hints and execution explanations without spoiling solutions.
5. **Knowledge Summary & Cognitive Map:** Tracks your demonstrated strengths, active skill gaps, accuracy %, and practice streaks.

---

## 📁 Devpost Learn Planning Artifacts
As required by the Devpost Learn Skill Pack, all planning documents generated during flipped interaction are included in the repository:

- [`devpost/scope.md`](devpost/scope.md) : The Unique Kernel, Core Loop, and PoC Boundary ([Interactive Scope View](devpost/scope.html))
- [`devpost/prd.md`](devpost/prd.md) : Product Requirements, User Journey, and Look & Feel ([Interactive PRD View](devpost/prd.html))
- [`devpost/spec.md`](devpost/spec.md) : Technical Blueprint, Data Model, and Fallback Strategy ([Interactive Spec View](devpost/spec.html))
- [`devpost/checklist.md`](devpost/checklist.md) : Slices, verification logs, and completion record
- [`devpost/app-map.html`](devpost/app-map.html) : Component architecture map and reusable learning takeaways

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+ or v22+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd skill-mirror

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Zero-Config Resilient Fallback:** SkillMirror is ready out of the box with 5 classic mental model traps (JS Closures, Python Mutable Defaults, Event Loop Microtasks, React Stale State, and Python List Mutation).  
> *(Optional)* To enable live AI synthesis for arbitrary custom code snippets, create `.env.local` and add:  
> `GEMINI_API_KEY=your_gemini_api_key`

---

## 🎬 1-to-3 Minute Demo Video Walkthrough Guide
For your hackathon submission video:
1. **Introduction (0:00 - 0:25):** Introduce SkillMirror and the core philosophy: *"AI can write code for you, but do you actually understand it? SkillMirror tests your mental model through active prediction."*
2. **The Prediction Probe (0:25 - 0:50):** Select the JavaScript Closures challenge (`for (var i = 0; i < 3; i++)`). Show the dark-mode code viewer. Select option **A ("0 1 2")** and click *Submit Prediction & Diagnose*.
3. **Misconception Diagnosis (0:50 - 1:15):** Highlight the red diagnostic banner: point out how SkillMirror immediately identified the underlying mental model trap (*"Assumed `var` has block scope in for loops"*).
4. **Adaptive Follow-Up (1:15 - 1:45):** Click *Remediate: Solve Targeted Follow-Up Challenge*. Show the dynamic snippet with `let`. Select option **A ("0 1 2")** and verify that your mental model is now solidified.
5. **Socratic Coach & Knowledge Summary (1:45 - 2:15):** Click a quick prompt in the Socratic Discussion drawer (*"Why does this behave this way?"*). Then click *Knowledge Summary* in the left navigation to showcase Strengths vs. Skill Gaps and accuracy metrics.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS + Custom Dark Slate Design Tokens
- **Icons:** Lucide React
- **Diagnostics & Chat:** Next.js API Routes (`/api/diagnose`, `/api/chat`) with Google Gemini API & instant fallback engine
- **Persistence:** Browser `localStorage` (zero login barrier for demo reviewers)
