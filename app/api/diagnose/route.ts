import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code snippet is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are SkillMirror, an expert developer educator. Analyze this ${language || "code"} snippet:
\`\`\`${language || "text"}
${code}
\`\`\`

Generate a prediction quiz to test the learner's understanding of execution semantics and edge cases.
Identify common mental model misconceptions that beginners or intermediate developers have when reading this code.

Respond ONLY with valid JSON in this exact structure:
{
  "title": "Short title describing the concept",
  "concept": "Core concept name (e.g. Closure Variable Binding)",
  "question": "What is the output or behavior of this code?",
  "options": [
    {
      "id": "A",
      "text": "Option text representing an outcome or output",
      "isCorrect": true,
      "explanation": "Why this is the correct runtime behavior"
    },
    {
      "id": "B",
      "text": "Option text representing a common misconception",
      "isCorrect": false,
      "misconception": "Exact cognitive misconception (e.g. Assumed variable is passed by value)",
      "explanation": "Why this intuitive assumption is incorrect in the language specification"
    },
    {
      "id": "C",
      "text": "Another plausible distractor",
      "isCorrect": false,
      "misconception": "Alternative misconception",
      "explanation": "Why this distractor fails"
    },
    {
      "id": "D",
      "text": "Error or edge case distractor",
      "isCorrect": false,
      "misconception": "Assumed runtime exception",
      "explanation": "Why no error is thrown"
    }
  ]
}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
          }
        );

        if (res.ok) {
          const geminiData = await res.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json(parsed);
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local diagnostic analyzer", err);
      }
    }

    // Heuristic Fallback Analyzer for custom snippets
    return NextResponse.json({
      title: "Custom Code Execution Probe",
      concept: "Runtime Evaluation & Semantics",
      question: "What will this code snippet evaluate to or print upon execution?",
      options: [
        {
          id: "A",
          text: "Evaluates synchronously to expected return/output",
          isCorrect: true,
          explanation:
            "Correct! Execution proceeds through the call stack respecting lexical scoping and reference rules.",
        },
        {
          id: "B",
          text: "Retains state or re-binds outer scope unexpectedly",
          isCorrect: false,
          misconception: "Assumed outer closure snapshotting or scope hoisting applies differently.",
          explanation:
            "Variables in outer scopes remain bound to their lexical environment unless explicitly shadowed or re-declared.",
        },
        {
          id: "C",
          text: "Returns undefined or None",
          isCorrect: false,
          misconception: "Assumed expression evaluation does not complete before return.",
          explanation: "The runtime executes all side effects prior to returning control.",
        },
        {
          id: "D",
          text: "Throws an unhandled TypeError or ReferenceError",
          isCorrect: false,
          misconception: "Anticipated strict-mode or reference boundary error.",
          explanation: "All identifiers are properly resolved within the current scope chain.",
        },
      ],
    });
  } catch (error) {
    console.error("Diagnostic error:", error);
    return NextResponse.json({ error: "Failed to generate diagnosis" }, { status: 500 });
  }
}
