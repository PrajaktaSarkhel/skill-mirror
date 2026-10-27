import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, code, concept, activeMisconception } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the Socratic Mirror Coach in SkillMirror.
Your mission is to guide the user to understand code execution, mental models, and resolve misconceptions without simply giving away the final answers.
Use short, encouraging Socratic questions and analogies.
Context:
Concept: ${concept || "General Programming"}
Code snippet:
${code || "N/A"}
Active Diagnosed Misconception: ${activeMisconception || "None"}

User message: ${prompt}

Respond directly in 2-3 concise, insightful paragraphs. Ask one guiding question at the end to prompt them to test their intuition.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ response: reply });
          }
        }
      } catch (err) {
        console.warn("Gemini Chat failed, using Socratic heuristic generator", err);
      }
    }

    // High quality Socratic Heuristic Responses
    const lower = (prompt || "").toLowerCase();
    let reply = "";

    if (lower.includes("why") && lower.includes("var")) {
      reply =
        "Great question! In JavaScript, 'var' declarations were designed before block scoping existed. When you declare 'var i = 0' inside a for loop, it hoists to the nearest enclosing function or global object. That means all 3 callback functions share the exact same variable in memory! By the time you call them, the loop has already completed. What do you think the value of that shared variable is when the loop finishes?";
    } else if (lower.includes("closure")) {
      reply =
        "Think of a closure as a backpack that a function carries around with it. Wherever the function goes, it keeps a live reference to the variables in the room where it was born. Crucially, it doesn't take a snapshot of the value:it holds a reference to the actual variable box. If that box changes later, the closure sees the new value. Does that change how you view inner functions?";
    } else if (lower.includes("hint")) {
      reply =
        "Here is a clue: Pay close attention to timing. When are the functions created versus when are they actually called? If a variable changes between creation time and call time, which value does the function see?";
    } else if (lower.includes("mutable") || lower.includes("python")) {
      reply =
        "In Python, function definitions are executable statements. When Python reads 'def func(items=[])', it creates the list object immediately at definition time. Each subsequent call without an argument simply points to that exact same pre-existing list! How might you create a fresh list every single time the function is called instead?";
    } else {
      reply = `Let's break this down together. Notice how the code organizes memory: when the function references '${concept || "the variable"}', is it creating a copy or referencing existing state? What would happen if you stepped through line-by-line in a debugger?`;
    }

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({
      response:
        "Consider how the runtime treats variable bindings in this scope. What happens if you inspect the variable right before execution?",
    });
  }
}
