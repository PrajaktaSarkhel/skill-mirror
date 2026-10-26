"use client";

import React from "react";
import { Compass, ArrowRight, Zap, Code, BookOpen } from "lucide-react";
import { CURATED_CHALLENGES, Challenge } from "@/data/curatedChallenges";
import { highlightCode } from "@/lib/syntaxHighlighter";
import { useTheme } from "@/context/ThemeContext";

interface CuratedLabViewProps {
  onSelectChallenge: (challenge: Challenge) => void;
}

export function CuratedLabView({ onSelectChallenge }: CuratedLabViewProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`text-2xl font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Curated Mental Model Lab
          </h2>
          <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Hand-crafted diagnostic probes covering the most notorious misconceptions in software engineering.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
          5 Core Traps Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CURATED_CHALLENGES.map((c) => (
          <div
            key={c.id}
            className={`border rounded-2xl p-5 shadow-xl transition-all group flex flex-col justify-between space-y-4 ${
              isDark
                ? "bg-[#111827] border-[#1f293d] hover:border-indigo-500/50"
                : "bg-white border-slate-200 hover:border-indigo-400 shadow-slate-200/50"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isDark
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {c.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    c.difficulty === "Beginner"
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : c.difficulty === "Intermediate"
                      ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                      : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                  }`}
                >
                  {c.difficulty}
                </span>
              </div>

              <div>
                <h3
                  className={`text-base font-bold transition ${
                    isDark
                      ? "text-white group-hover:text-indigo-300"
                      : "text-slate-900 group-hover:text-indigo-600"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="text-xs text-indigo-500 font-medium mt-0.5">
                  Concept: {c.concept}
                </p>
              </div>

              {/* Code Preview snippet */}
              <div
                className={`border rounded-xl p-3 font-mono text-[11px] max-h-28 overflow-hidden relative transition-colors ${
                  isDark
                    ? "bg-[#090d16] border-[#1f293d] text-slate-300"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(c.code.slice(0, 140) + "...", c.language),
                  }}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t ${
                    isDark ? "from-[#090d16] to-transparent" : "from-slate-50 to-transparent"
                  }`}
                />
              </div>
            </div>

            <button
              onClick={() => onSelectChallenge(c)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? "bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border-indigo-500/30"
                  : "bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border-indigo-200"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Launch Diagnostic Probe</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
