"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, XCircle, ArrowLeft, RotateCcw, Award } from "lucide-react";
import { Option } from "@/data/curatedChallenges";
import { highlightCode } from "@/lib/syntaxHighlighter";
import { useTheme } from "@/context/ThemeContext";

interface AdaptiveFollowUpProps {
  title: string;
  code: string;
  question: string;
  targetedMisconception: string;
  options: Option[];
  language: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function AdaptiveFollowUp({
  title,
  code,
  question,
  targetedMisconception,
  options,
  language,
  onBack,
  onSuccess,
}: AdaptiveFollowUpProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOption = options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (selectedOption?.isCorrect) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  return (
    <div
      className={`border-2 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300 transition-colors ${
        isDark
          ? "bg-[#111827] border-indigo-500/50 shadow-indigo-950/40"
          : "bg-white border-indigo-400 shadow-indigo-200/40"
      }`}
    >
      {/* Header with Badges */}
      <div
        className={`flex items-center justify-between border-b pb-3 ${
          isDark ? "border-[#1f293d]" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`p-1 rounded-lg transition cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-[#1e293b]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Back to Main Challenge"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 rounded bg-indigo-500/20 text-indigo-500 items-center justify-center">
                <Zap className="h-3 w-3 fill-indigo-500" />
              </span>
              <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {title}
              </h3>
            </div>
            <p
              className={`text-xs font-medium mt-0.5 ${
                isDark ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              Targeted Remediation for Diagnosed Gap
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold bg-indigo-500/15 text-indigo-500 border border-indigo-500/30 px-2.5 py-1 rounded-full">
          Adaptive Step
        </span>
      </div>

      {/* Misconception Being Targeted */}
      <div
        className={`border rounded-xl p-3 flex items-start gap-2.5 text-xs ${
          isDark
            ? "bg-[#0b101c] border-indigo-900/40"
            : "bg-indigo-50/70 border-indigo-200"
        }`}
      >
        <Award className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <span className={`font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Resolving Blind Spot:{" "}
          </span>
          <span className={`font-semibold ${isDark ? "text-indigo-200" : "text-indigo-900"}`}>
            {targetedMisconception}
          </span>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div
        className={`border rounded-xl p-3.5 font-mono text-xs leading-relaxed overflow-x-auto transition-colors ${
          isDark
            ? "bg-[#090d16] border-[#1f293d] text-slate-200"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, language),
          }}
        />
      </div>

      {/* Question */}
      <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        {question}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let btnClass =
            "w-full text-left p-3 rounded-xl border font-mono text-xs transition-all flex items-center justify-between cursor-pointer ";

          if (!isSubmitted) {
            if (isSelected) {
              btnClass += isDark
                ? "bg-indigo-950/70 border-indigo-500 text-white shadow-sm"
                : "bg-indigo-50 border-indigo-600 text-indigo-950 font-medium shadow-sm";
            } else {
              btnClass += isDark
                ? "bg-[#090d16] border-[#1f293d] text-slate-300 hover:border-slate-500"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-100";
            }
          } else {
            if (option.isCorrect) {
              btnClass += isDark
                ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold"
                : "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold";
            } else if (isSelected && !option.isCorrect) {
              btnClass += isDark
                ? "bg-rose-950/40 border-rose-500/80 text-rose-200 font-semibold"
                : "bg-rose-50 border-rose-500 text-rose-950 font-semibold";
            } else {
              btnClass += isDark
                ? "bg-[#090d16]/50 border-[#1f293d]/50 text-slate-400 opacity-50"
                : "bg-slate-50/50 border-slate-200/50 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              disabled={isSubmitted}
              onClick={() => setSelectedOptionId(option.id)}
              className={btnClass}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 rounded items-center justify-center text-[10px] font-bold ${
                    isSelected
                      ? isSubmitted
                        ? option.isCorrect
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-rose-500 text-white"
                        : "bg-indigo-600 text-white"
                      : isDark
                      ? "bg-[#1e293b] text-slate-400"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {option.id}
                </span>
                <span>{option.text}</span>
              </div>
              {isSubmitted && (
                <div>
                  {option.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : isSelected ? (
                    <XCircle className="h-4 w-4 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Explanation */}
      {isSubmitted && selectedOption && (
        <div
          className={`rounded-xl p-3.5 border text-xs leading-relaxed ${
            isCorrect
              ? isDark
                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                : "bg-emerald-50 border-emerald-300 text-emerald-950"
              : isDark
              ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
              : "bg-rose-50 border-rose-300 text-rose-950"
          }`}
        >
          <div className="font-bold mb-1 flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Mental Model Solidified!</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-rose-500" />
                <span>Not quite yet:</span>
              </>
            )}
          </div>
          {selectedOption.explanation}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
              selectedOptionId
                ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md shadow-indigo-600/30"
                : isDark
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Verify Corrected Understanding</span>
          </button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <button
              onClick={handleReset}
              className={`text-xs flex items-center gap-1.5 cursor-pointer ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={onBack}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3.5 py-1.5 rounded-lg transition cursor-pointer"
            >
              Back to Main Workbench
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
