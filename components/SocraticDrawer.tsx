"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Sparkles,
  Lightbulb,
  CornerDownLeft,
} from "lucide-react";
import { Challenge } from "@/data/curatedChallenges";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface SocraticDrawerProps {
  challenge: Challenge;
  activeMisconception?: string;
}

export function SocraticDrawer({
  challenge,
  activeMisconception,
}: SocraticDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-init",
      sender: "bot",
      text: `Hello! I'm your Socratic Mirror Coach. Need help understanding "${challenge.title}"? Ask me anything about how the JavaScript/Python engine evaluates this, or ask for a progressive hint!`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userPrompt) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          concept: challenge.concept,
          code: challenge.code,
          activeMisconception,
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: data.response || "Think about where the variable is stored in memory during each iteration.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback response
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: `Think about how the runtime allocates variables: Does '${challenge.language === "python" ? "the default argument" : "var"}' get recreated on each run, or does a single reference get reused?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Why does this behave this way?",
    "Give me a hint without giving the answer",
    "Explain the memory model simply",
  ];

  return (
    <div className="bg-[#111827] border border-[#1f293d] rounded-2xl flex flex-col h-[580px] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#0e1424] px-4 py-3 border-b border-[#1f293d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Follow-Up Discussion
            </h4>
            <p className="text-[11px] text-slate-400">Socratic Mentor · Guides without spoiling</p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="AI Ready" />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-2 bg-[#090d16] border-b border-[#1f293d] flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <Sparkles className="h-3 w-3 text-indigo-400 shrink-0" />
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#1e293b] text-slate-300 hover:text-white hover:bg-indigo-600/30 hover:border-indigo-500/40 border border-slate-700/60 transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area (Inspired by reference h3HRs1OKmi...) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m) => {
          const isBot = m.sender === "bot";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
            >
              {isBot && (
                <div className="h-6 w-6 rounded-md bg-indigo-600/30 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                  isBot
                    ? "bg-[#162032] border border-[#23334e] text-slate-200"
                    : "bg-indigo-600 text-white font-medium"
                }`}
              >
                <div>{m.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    isBot ? "text-slate-400" : "text-indigo-200"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {!isBot && (
                <div className="h-6 w-6 rounded-md bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <Bot className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
            <span>Socratic coach is formulating guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#0e1424] border-t border-[#1f293d]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about this code or explanation..."
            className="w-full bg-[#090d16] border border-[#23334e] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 p-1.5 rounded-lg transition ${
              input.trim() && !isLoading
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "text-slate-600"
            }`}
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
