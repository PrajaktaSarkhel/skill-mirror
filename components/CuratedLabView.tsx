"use client";

import React from "react";
import { Compass, ArrowRight, Zap, Code, BookOpen } from "lucide-react";
import { CURATED_CHALLENGES, Challenge } from "@/data/curatedChallenges";
import { highlightCode } from "@/lib/syntaxHighlighter";

interface CuratedLabViewProps {
  onSelectChallenge: (challenge: Challenge) => void;
}

export function CuratedLabView({ onSelectChallenge }: CuratedLabViewProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Curated Mental Model Lab
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Hand-crafted diagnostic probes covering the most notorious misconceptions in software engineering.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          5 Core Traps Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CURATED_CHALLENGES.map((c) => (
          <div
            key={c.id}
            className="bg-[#111827] border border-[#1f293d] hover:border-indigo-500/50 rounded-2xl p-5 shadow-xl transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {c.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    c.difficulty === "Beginner"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : c.difficulty === "Intermediate"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {c.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                  {c.title}
                </h3>
                <p className="text-xs text-indigo-400/90 font-medium mt-0.5">
                  Concept: {c.concept}
                </p>
              </div>

              {/* Code Preview snippet */}
              <div className="bg-[#090d16] border border-[#1f293d] rounded-xl p-3 font-mono text-[11px] max-h-28 overflow-hidden text-slate-300 relative">
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(c.code.slice(0, 140) + "...", c.language),
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#090d16] to-transparent" />
              </div>
            </div>

            <button
              onClick={() => onSelectChallenge(c)}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all flex items-center justify-center gap-2"
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
