"use client";

import React from "react";
import { AlertCircle, CheckCircle, ArrowRight, Zap, Target } from "lucide-react";
import { Option } from "@/data/curatedChallenges";
import { useTheme } from "@/context/ThemeContext";

interface DiagnosticBannerProps {
  selectedOption: Option;
  onOpenFollowUp: () => void;
  hasFollowUp: boolean;
}

export function DiagnosticBanner({
  selectedOption,
  onOpenFollowUp,
  hasFollowUp,
}: DiagnosticBannerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isCorrect = selectedOption.isCorrect;

  return (
    <div
      className={`rounded-2xl p-5 border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isCorrect
          ? isDark
            ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-950/50"
            : "bg-emerald-50 border-emerald-300 text-emerald-950 shadow-md shadow-emerald-100"
          : isDark
          ? "bg-rose-950/30 border-rose-500/50 text-rose-100 shadow-lg shadow-rose-950/50"
          : "bg-rose-50 border-rose-300 text-rose-950 shadow-md shadow-rose-100"
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isCorrect
              ? isDark
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-emerald-100 text-emerald-700"
              : isDark
              ? "bg-rose-500/20 text-rose-400"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {isCorrect ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base flex items-center gap-2">
              {isCorrect ? "Correct Mental Model!" : "Misconception Diagnosed"}
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isCorrect
                    ? isDark
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-emerald-200/60 text-emerald-800 border border-emerald-300"
                    : isDark
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "bg-rose-200/60 text-rose-800 border border-rose-300"
                }`}
              >
                {isCorrect ? "Validated" : "Cognitive Trap Detected"}
              </span>
            </h4>
          </div>

          {!isCorrect && selectedOption.misconception && (
            <div
              className={`border rounded-xl p-3 text-xs leading-relaxed ${
                isDark
                  ? "bg-[#110c14] border-rose-900/60 text-rose-200"
                  : "bg-white border-rose-200 text-rose-900"
              }`}
            >
              <span
                className={`font-bold block mb-1 flex items-center gap-1.5 ${
                  isDark ? "text-rose-400" : "text-rose-700"
                }`}
              >
                <Target className="h-3.5 w-3.5" />
                Underlying Blind Spot:
              </span>
              {selectedOption.misconception}
            </div>
          )}

          <div
            className={`text-sm leading-relaxed ${
              isDark ? "text-slate-200" : "text-slate-700 font-normal"
            }`}
          >
            {selectedOption.explanation}
          </div>

          {hasFollowUp && (
            <div className="pt-2">
              <button
                onClick={onOpenFollowUp}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-md ${
                  isCorrect
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                    : "bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-rose-600/30"
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>
                  {isCorrect
                    ? "Try Follow-Up Edge Case Challenge"
                    : "Remediate: Solve Targeted Follow-Up Challenge"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
