"use client";

import React from "react";
import {
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  Zap,
  Target,
  Clock,
  Sparkles,
} from "lucide-react";
import { UserProgress } from "@/lib/storage";
import { useTheme } from "@/context/ThemeContext";

interface KnowledgeSummaryProps {
  progress: UserProgress;
  onNavigateToWorkbench: () => void;
}

export function KnowledgeSummary({
  progress,
  onNavigateToWorkbench,
}: KnowledgeSummaryProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const accuracy =
    progress.totalAttempts > 0
      ? Math.round((progress.correctAttempts / progress.totalAttempts) * 100)
      : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`text-2xl font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Knowledge Summary & Cognitive Map
          </h2>
          <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Tracks demonstrated execution understanding and isolated mental model gaps.
          </p>
        </div>

        <button
          onClick={onNavigateToWorkbench}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition cursor-pointer"
        >
          <span>Continue Practice</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Top Practice Scores (Inspired by reference vFcGy5qigj... Context-Free Coder) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Prediction Accuracy */}
        <div
          className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div>
            <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Prediction Accuracy
            </span>
            <div className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              {accuracy}%
            </div>
            <span className="text-[11px] text-emerald-500 font-medium">
              +{progress.correctAttempts} verified
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-500">
            {accuracy}%
          </div>
        </div>

        {/* Card 2: Mental Model Health */}
        <div
          className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div>
            <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Mental Model Health
            </span>
            <div className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              {progress.skillGaps.length === 0 ? "Rock Solid" : "Active Tuning"}
            </div>
            <span className={`text-[11px] font-medium ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
              {progress.skillGaps.length} gaps flagged
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-500">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Practice Streak */}
        <div
          className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div>
            <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Consistency Streak
            </span>
            <div className="text-2xl font-bold text-amber-500 mt-1">
              {progress.streakDays} Days
            </div>
            <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Daily micro-probes
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center font-bold text-xs text-amber-500">
            🔥
          </div>
        </div>

        {/* Card 4: Total Probes */}
        <div
          className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div>
            <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Total Probes Tested
            </span>
            <div className="text-2xl font-bold text-cyan-500 mt-1">
              {progress.totalAttempts}
            </div>
            <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Execution challenges
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 flex items-center justify-center font-bold text-xs text-cyan-500">
            <Target className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Breakdown: Strengths vs Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div
          className={`border rounded-2xl p-5 shadow-xl space-y-4 transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-slate-200/50"
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDark ? "border-[#1f293d]" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                Demonstrated Strengths
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              {progress.strengths.length} Mastered
            </span>
          </div>

          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Concepts where your predicted output matched runtime execution behavior across attempts.
          </p>

          <div className="space-y-3">
            {progress.strengths.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-xl p-3 flex items-center justify-between transition-colors ${
                  isDark
                    ? "bg-[#0b101c] border-emerald-900/40"
                    : "bg-emerald-50/50 border-emerald-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span
                    className={`text-xs font-semibold ${
                      isDark ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {item.concept}
                  </span>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isDark
                      ? "text-emerald-400 bg-emerald-950/60"
                      : "text-emerald-700 bg-emerald-100"
                  }`}
                >
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gaps & Misconceptions Card */}
        <div
          className={`border rounded-2xl p-5 shadow-xl space-y-4 transition-colors ${
            isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-slate-200/50"
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDark ? "border-[#1f293d]" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                Identified Skill Gaps
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-500 border border-rose-500/30">
              {progress.skillGaps.length} Actionable
            </span>
          </div>

          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            These are not "mistakes" — they are valuable cognitive misalignments ready for remediation.
          </p>

          <div className="space-y-3">
            {progress.skillGaps.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-xl p-3 space-y-2 transition-colors ${
                  isDark
                    ? "bg-[#0b101c] border-rose-900/40"
                    : "bg-rose-50/50 border-rose-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span
                      className={`text-xs font-semibold ${
                        isDark ? "text-rose-200" : "text-rose-900"
                      }`}
                    >
                      {item.concept}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isDark ? "text-rose-400 bg-rose-950/60" : "text-rose-700 bg-rose-100"
                    }`}
                  >
                    {item.score}
                  </span>
                </div>
                <div
                  className={`text-[11px] p-2 rounded-lg leading-relaxed border ${
                    isDark
                      ? "text-slate-400 bg-[#140c14] border-rose-950"
                      : "text-slate-700 bg-white border-rose-200"
                  }`}
                >
                  <span className={`font-semibold ${isDark ? "text-rose-400" : "text-rose-600"}`}>
                    Diagnosed trap:{" "}
                  </span>
                  {item.misconception}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent History Table */}
      <div
        className={`border rounded-2xl p-5 shadow-xl space-y-3 transition-colors ${
          isDark ? "bg-[#111827] border-[#1f293d]" : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 font-bold text-sm ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            <Clock className="h-4 w-4 text-indigo-500" />
            <span>Diagnostic History</span>
          </div>
          <span className="text-xs text-slate-500">Auto-saved to local session</span>
        </div>

        <div
          className={`divide-y border-t text-xs transition-colors ${
            isDark
              ? "divide-[#1f293d] border-[#1f293d]"
              : "divide-slate-200 border-slate-200"
          }`}
        >
          {progress.recentHistory.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <span
                  className={`font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}
                >
                  {item.challengeTitle}
                </span>
                <span className="text-slate-500 text-[11px] block">{item.concept}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">{item.timestamp}</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    item.passed
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                  }`}
                >
                  {item.passed ? "Passed" : "Gap Detected"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
