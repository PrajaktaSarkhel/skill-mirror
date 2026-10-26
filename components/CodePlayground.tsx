"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, RotateCcw, Edit3 } from "lucide-react";
import { highlightCode } from "@/lib/syntaxHighlighter";
import { Challenge } from "@/data/curatedChallenges";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    <div
      className={`border rounded-2xl overflow-hidden shadow-xl transition-colors ${
        isDark
          ? "bg-[#111827] border-[#1f293d] shadow-black/40"
          : "bg-white border-slate-200 shadow-slate-200/50"
      }`}
    >
      {/* Preset Selector Bar (Inspired by Codelingo and CodeBuddy references) */}
      <div
        className={`px-4 py-2.5 border-b flex items-center justify-between gap-2 overflow-x-auto transition-colors ${
          isDark ? "bg-[#0b101c] border-[#1f293d]" : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold mr-1 flex items-center gap-1.5 shrink-0 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-indigo-500" />
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
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? "bg-indigo-600/25 text-indigo-300 border border-indigo-500/40 shadow-sm"
                        : "bg-indigo-600 text-white shadow-sm"
                      : isDark
                      ? "text-slate-400 hover:text-slate-200 hover:bg-[#162032] border border-transparent"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-transparent"
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
            <button
              onClick={() => onToggleCustom(true)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all cursor-pointer ${
                isCustom
                  ? isDark
                    ? "bg-indigo-600/25 text-indigo-300 border border-indigo-500/40"
                    : "bg-indigo-600 text-white shadow-sm"
                  : isDark
                  ? "text-slate-400 hover:text-slate-200 hover:bg-[#162032] border border-transparent"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-transparent"
              }`}
            >
              <Edit3 className="h-3 w-3" />
              Custom Snippet
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${
              isDark
                ? "bg-[#1e293b] text-slate-300 border-[#334155]"
                : "bg-slate-200 text-slate-700 border-slate-300"
            }`}
          >
            {activeLanguage}
          </span>
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-[#1e293b]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            }`}
            title="Copy Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div
        className={`relative font-mono text-sm leading-relaxed p-4 min-h-[190px] transition-colors ${
          isDark
            ? "bg-[#090d16] text-slate-200"
            : "bg-slate-50/90 text-slate-800"
        }`}
      >
        {/* Terminal Header Dots */}
        <div
          className={`flex items-center justify-between pb-3 mb-3 border-b text-xs font-sans transition-colors ${
            isDark
              ? "border-[#1f293d]/60 text-slate-400"
              : "border-slate-200 text-slate-600"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span
              className={`ml-2 font-mono text-xs font-semibold ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {isCustom ? "custom_snippet.js" : `${challenge.id}.${challenge.language === "python" ? "py" : "js"}`}
            </span>
          </div>
          <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {isCustom ? "Editable" : "Read-only inspection"}
          </span>
        </div>

        {isCustom ? (
          <textarea
            value={customCode}
            onChange={(e) => onCustomCodeChange(e.target.value)}
            placeholder="// Paste your code snippet here..."
            className={`w-full h-44 bg-transparent font-mono text-sm focus:outline-none resize-none ${
              isDark
                ? "text-slate-200 placeholder-slate-600"
                : "text-slate-800 placeholder-slate-400"
            }`}
          />
        ) : (
          <div className="flex">
            {/* Line Numbers Column */}
            <div
              className={`select-none pr-4 text-right border-r font-mono text-xs space-y-1 transition-colors ${
                isDark
                  ? "text-slate-500 border-[#1f293d]/80"
                  : "text-slate-400 border-slate-200"
              }`}
            >
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
