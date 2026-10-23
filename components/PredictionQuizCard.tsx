"use client";

import React from "react";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { Option } from "@/data/curatedChallenges";

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
  const selectedOption = options.find((o) => o.id === selectedOptionId);

  return (
    <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl shadow-black/30 space-y-4">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
            <HelpCircle className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Mental Model Probe
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Predict output before revealing
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-base font-semibold text-white leading-snug">
        {question}
      </h3>

      {/* Options List (Inspired by reference CHi8EUCs... and h3HRs1...) */}
      <div className="space-y-2.5">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let containerClasses =
            "w-full text-left p-3.5 rounded-xl border font-mono text-sm transition-all flex items-center justify-between ";

          if (!isSubmitted) {
            containerClasses += isSelected
              ? "bg-indigo-950/60 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
              : "bg-[#090d16] border-[#1f293d] text-slate-300 hover:border-slate-500 hover:bg-[#131b2e]";
          } else {
            if (option.isCorrect) {
              containerClasses +=
                "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold";
            } else if (isSelected && !option.isCorrect) {
              containerClasses +=
                "bg-rose-950/40 border-rose-500/80 text-rose-200 font-semibold";
            } else {
              containerClasses +=
                "bg-[#090d16]/60 border-[#1f293d]/60 text-slate-400 opacity-60";
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
                      : "bg-[#1e293b] text-slate-400"
                  }`}
                >
                  {option.id}
                </span>
                <span className="break-all">{option.text}</span>
              </div>

              {isSubmitted && (
                <div>
                  {option.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
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
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Submit Prediction & Diagnose</span>
          </button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Evaluation complete
            </span>
            <button
              onClick={onReset}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
            >
              Try Another Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
