"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, XCircle, ArrowLeft, RotateCcw, Award } from "lucide-react";
import { Option } from "@/data/curatedChallenges";
import { highlightCode } from "@/lib/syntaxHighlighter";

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
    <div className="bg-[#111827] border-2 border-indigo-500/50 rounded-2xl p-5 shadow-2xl shadow-indigo-950/40 space-y-4 animate-in fade-in zoom-in-95 duration-300">
      {/* Header with Badges */}
      <div className="flex items-center justify-between border-b border-[#1f293d] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition"
            title="Back to Main Challenge"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 rounded bg-indigo-500/20 text-indigo-400 items-center justify-center">
                <Zap className="h-3 w-3 fill-indigo-400" />
              </span>
              <h3 className="text-sm font-bold text-white">{title}</h3>
            </div>
            <p className="text-xs text-indigo-300 font-medium mt-0.5">
              Targeted Remediation for Diagnosed Gap
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full">
          Adaptive Step
        </span>
      </div>

      {/* Misconception Being Targeted */}
      <div className="bg-[#0b101c] border border-indigo-900/40 rounded-xl p-3 flex items-start gap-2.5 text-xs">
        <Award className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-400 font-medium">Resolving Blind Spot: </span>
          <span className="text-indigo-200 font-semibold">{targetedMisconception}</span>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-[#090d16] border border-[#1f293d] rounded-xl p-3.5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
        <div
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, language),
          }}
        />
      </div>

      {/* Question */}
      <div className="text-sm font-semibold text-white">
        {question}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let btnClass =
            "w-full text-left p-3 rounded-xl border font-mono text-xs transition-all flex items-center justify-between ";

          if (!isSubmitted) {
            btnClass += isSelected
              ? "bg-indigo-950/70 border-indigo-500 text-white"
              : "bg-[#090d16] border-[#1f293d] text-slate-300 hover:border-slate-500";
          } else {
            if (option.isCorrect) {
              btnClass += "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold";
            } else if (isSelected && !option.isCorrect) {
              btnClass += "bg-rose-950/40 border-rose-500/80 text-rose-200 font-semibold";
            } else {
              btnClass += "bg-[#090d16]/50 border-[#1f293d]/50 text-slate-400 opacity-50";
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
                          ? "bg-emerald-500 text-black"
                          : "bg-rose-500 text-white"
                        : "bg-indigo-600 text-white"
                      : "bg-[#1e293b] text-slate-400"
                  }`}
                >
                  {option.id}
                </span>
                <span>{option.text}</span>
              </div>
              {isSubmitted && (
                <div>
                  {option.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isSelected ? (
                    <XCircle className="h-4 w-4 text-rose-400" />
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
              ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/30 border-rose-500/40 text-rose-200"
          }`}
        >
          <div className="font-bold mb-1 flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Mental Model Solidified!</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-rose-400" />
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
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <span>Verify Corrected Understanding</span>
          </button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={onBack}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3.5 py-1.5 rounded-lg transition"
            >
              Back to Main Workbench
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
