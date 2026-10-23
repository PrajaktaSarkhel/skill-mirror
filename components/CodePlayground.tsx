"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, RotateCcw, Edit3 } from "lucide-react";
import { highlightCode } from "@/lib/syntaxHighlighter";
import { Challenge } from "@/data/curatedChallenges";

interface CodePlaygroundProps {
  challenge: Challenge;
  customCode: string;
  isCustom: boolean;
  onSelectPreset: (challengeId: string) => void;
  onCustomCodeChange: (code: string) => void;
  onToggleCustom: (isCustom: boolean) => void;
  curatedChallenges: Challenge[];
}

export function CodePlayground({
  challenge,
  customCode,
  isCustom,
  onSelectPreset,
  onCustomCodeChange,
  onToggleCustom,
  curatedChallenges,
}: CodePlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const activeCode = isCustom ? customCode : challenge.code;
  const activeLanguage = isCustom ? "javascript" : challenge.language;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeCode.split("\n");

  return (
    <div className="bg-[#111827] border border-[#1f293d] rounded-2xl overflow-hidden shadow-xl shadow-black/40">
      {/* Preset Selector Bar (Inspired by Codelingo and CodeBuddy references) */}
      <div className="bg-[#0b101c] px-4 py-2.5 border-b border-[#1f293d] flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5 shrink-0">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            Concepts:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {curatedChallenges.map((c) => {
              const isSelected = !isCustom && c.id === challenge.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onToggleCustom(false);
                    onSelectPreset(c.id);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    isSelected
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#162032] border border-transparent"
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
            <button
              onClick={() => onToggleCustom(true)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                isCustom
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#162032] border border-transparent"
              }`}
            >
              <Edit3 className="h-3 w-3" />
              Custom Snippet
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#1e293b] text-slate-300 border border-[#334155]">
            {activeLanguage}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition"
            title="Copy Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative font-mono text-sm leading-relaxed p-4 bg-[#090d16] min-h-[190px]">
        {/* Terminal Header Dots */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f293d]/60 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-slate-400 text-xs font-semibold">
              {isCustom ? "custom_snippet.js" : `${challenge.id}.${challenge.language === "python" ? "py" : "js"}`}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {isCustom ? "Editable" : "Read-only inspection"}
          </span>
        </div>

        {isCustom ? (
          <textarea
            value={customCode}
            onChange={(e) => onCustomCodeChange(e.target.value)}
            placeholder="// Paste your code snippet here..."
            className="w-full h-44 bg-transparent text-slate-200 font-mono text-sm focus:outline-none resize-none placeholder-slate-600"
          />
        ) : (
          <div className="flex">
            {/* Line Numbers Column */}
            <div className="select-none text-slate-400 pr-4 text-right border-r border-[#1f293d]/80 font-mono text-xs space-y-1">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Lines with Syntax Highlighting */}
            <div className="pl-4 overflow-x-auto flex-1 font-mono text-xs space-y-1">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(line, activeLanguage) || "&nbsp;",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
