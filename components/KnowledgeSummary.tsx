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

interface KnowledgeSummaryProps {
  progress: UserProgress;
  onNavigateToWorkbench: () => void;
}

export function KnowledgeSummary({
  progress,
  onNavigateToWorkbench,
}: KnowledgeSummaryProps) {
  const accuracy =
    progress.totalAttempts > 0
      ? Math.round((progress.correctAttempts / progress.totalAttempts) * 100)
      : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Knowledge Summary & Cognitive Map
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Tracks demonstrated execution understanding and isolated mental model gaps.
          </p>
        </div>

        <button
          onClick={onNavigateToWorkbench}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition"
        >
          <span>Continue Practice</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Top Practice Scores (Inspired by reference vFcGy5qigj... Context-Free Coder) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Prediction Accuracy */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Prediction Accuracy</span>
            <div className="text-2xl font-bold text-white mt-1">{accuracy}%</div>
            <span className="text-[11px] text-emerald-400 font-medium">
              +{progress.correctAttempts} verified
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-400">
            {accuracy}%
          </div>
        </div>

        {/* Card 2: Mental Model Health */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Mental Model Health</span>
            <div className="text-2xl font-bold text-white mt-1">
              {progress.skillGaps.length === 0 ? "Rock Solid" : "Active Tuning"}
            </div>
            <span className="text-[11px] text-indigo-300 font-medium">
              {progress.skillGaps.length} gaps flagged
            </span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Practice Streak */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Consistency Streak</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {progress.streakDays} Days
            </div>
            <span className="text-[11px] text-slate-400">Daily micro-probes</span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center font-bold text-xs text-amber-400">
            🔥
          </div>
        </div>

        {/* Card 4: Total Probes */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Probes Tested</span>
            <div className="text-2xl font-bold text-cyan-400 mt-1">
              {progress.totalAttempts}
            </div>
            <span className="text-[11px] text-slate-400">Execution challenges</span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 flex items-center justify-center font-bold text-xs text-cyan-400">
            <Target className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Breakdown: Strengths vs Skill Gaps (Directly matching reference R9KfTbgneQL3...) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f293d] pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Demonstrated Strengths</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {progress.strengths.length} Mastered
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Concepts where your predicted output matched runtime execution behavior across attempts.
          </p>

          <div className="space-y-3">
            {progress.strengths.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0b101c] border border-emerald-900/40 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">{item.concept}</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gaps & Misconceptions Card */}
        <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f293d] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              <h3 className="font-bold text-base text-white">Identified Skill Gaps</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
              {progress.skillGaps.length} Actionable
            </span>
          </div>

          <p className="text-xs text-slate-400">
            These are not "mistakes" — they are valuable cognitive misalignments ready for remediation.
          </p>

          <div className="space-y-3">
            {progress.skillGaps.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0b101c] border border-rose-900/40 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    <span className="text-xs font-semibold text-rose-200">{item.concept}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">
                    {item.score}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 bg-[#140c14] border border-rose-950 p-2 rounded-lg leading-relaxed">
                  <span className="text-rose-400 font-semibold">Diagnosed trap: </span>
                  {item.misconception}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Clock className="h-4 w-4 text-indigo-400" />
            <span>Diagnostic History</span>
          </div>
          <span className="text-xs text-slate-500">Auto-saved to local session</span>
        </div>

        <div className="divide-y divide-[#1f293d] border-t border-[#1f293d] text-xs">
          {progress.recentHistory.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-medium">{item.challengeTitle}</span>
                <span className="text-slate-500 text-[11px] block">{item.concept}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">{item.timestamp}</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    item.passed
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
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
