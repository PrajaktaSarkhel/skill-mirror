"use client";

import React from "react";
import { HelpCircle, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Option } from "@/data/curatedChallenges";
import { useTheme } from "@/context/ThemeContext";

interface PredictionQuizCardProps {
  question: string;
  options: Option[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

export function PredictionQuizCard({
  question,
  options,
  selectedOptionId,
  onSelectOption,
  isSubmitted,
  onSubmit,
  onReset,
}: PredictionQuizCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`border rounded-2xl p-5 shadow-xl transition-colors ${
        isDark
          ? "bg-[#111827] border-[#1f293d] shadow-black/30"
          : "bg-white border-slate-200 shadow-slate-200/50"
      } space-y-4`}
    >
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-500">
            <HelpCircle className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Mental Model Probe
          </span>
        </div>
        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Predict output before revealing
        </span>
      </div>

      {/* Question Text */}
      <h3
        className={`text-base font-semibold leading-snug ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {question}
      </h3>

      {/* Options List */}
      <div className="space-y-2.5">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let containerClasses =
            "w-full text-left p-3.5 rounded-xl border font-mono text-sm transition-all flex items-center justify-between cursor-pointer ";

          if (!isSubmitted) {
            if (isSelected) {
              containerClasses += isDark
                ? "bg-indigo-950/60 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                : "bg-indigo-50 border-indigo-600 text-indigo-950 font-medium shadow-sm";
            } else {
              containerClasses += isDark
                ? "bg-[#090d16] border-[#1f293d] text-slate-300 hover:border-slate-500 hover:bg-[#131b2e]"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-100";
            }
          } else {
            if (option.isCorrect) {
              containerClasses += isDark
                ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold"
                : "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold";
            } else if (isSelected && !option.isCorrect) {
              containerClasses += isDark
                ? "bg-rose-950/40 border-rose-500/80 text-rose-200 font-semibold"
                : "bg-rose-50 border-rose-500 text-rose-950 font-semibold";
            } else {
              containerClasses += isDark
                ? "bg-[#090d16]/60 border-[#1f293d]/60 text-slate-400 opacity-60"
                : "bg-slate-50/60 border-slate-200/60 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={option.id}
              disabled={isSubmitted}
              onClick={() => onSelectOption(option.id)}
              className={containerClasses}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 rounded-md items-center justify-center text-xs font-bold shrink-0 ${
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
                <span className="break-all">{option.text}</span>
              </div>

              {isSubmitted && (
                <div>
                  {option.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            disabled={!selectedOptionId}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              selectedOptionId
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-indigo-600/30 cursor-pointer"
                : isDark
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Submit Prediction & Diagnose</span>
          </button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Evaluation complete
            </span>
            <button
              onClick={onReset}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                isDark
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Try Another Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
