"use client";

import React from "react";
import {
  Code2,
  BrainCircuit,
  Compass,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type NavTab = "workbench" | "lab" | "mastery";

interface SidebarNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  streakDays: number;
  accuracy: number;
}

export function SidebarNav({
  activeTab,
  onTabChange,
  streakDays,
  accuracy,
}: SidebarNavProps) {
  return (
    <aside className="w-64 bg-[#0d121f] border-r border-[#1f293d] flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0">
      <div className="space-y-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">SkillMirror</span>
              <span className="text-[10px] uppercase font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                AI Beta
              </span>
            </div>
            <p className="text-xs text-slate-400">Adaptive Mental Models</p>
          </div>
        </div>

        {/* Quick Streak & Stats Card (Inspired by reference Codelingo & CodeBuddy) */}
        <div className="bg-[#131c2e] border border-[#202e48] rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 rounded-lg bg-amber-500/15 text-amber-400 items-center justify-center">
                <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
              </span>
              <div>
                <div className="text-xs text-slate-400">Practice Streak</div>
                <div className="text-sm font-bold text-white">+{streakDays} Days</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Accuracy</div>
              <div className="text-sm font-bold text-emerald-400">{accuracy}%</div>
            </div>
          </div>
          <div className="w-full bg-[#1e293b] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(15, accuracy))}%` }}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <button
            onClick={() => onTabChange("workbench")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === "workbench"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:bg-[#162032] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Code2 className="h-4 w-4" />
              <span>Challenge Workbench</span>
            </div>
            {activeTab === "workbench" && (
              <ChevronRight className="h-4 w-4 text-indigo-200" />
            )}
          </button>

          <button
            onClick={() => onTabChange("lab")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === "lab"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:bg-[#162032] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="h-4 w-4" />
              <span>Curated Lab</span>
            </div>
            <span className="text-[11px] font-semibold bg-[#1e293b] text-slate-400 px-2 py-0.5 rounded-full">
              5
            </span>
          </button>

          <button
            onClick={() => onTabChange("mastery")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === "mastery"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:bg-[#162032] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4" />
              <span>Knowledge Summary</span>
            </div>
          </button>
        </nav>
      </div>

      {/* User / Badge Footer */}
      <div className="pt-4 border-t border-[#1f293d]/80 space-y-3">
        <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/30 rounded-xl p-3">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Devpost Hackathon Mode</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Diagnoses mental model blind spots through active output prediction.
          </p>
        </div>

        <div className="flex items-center gap-3 px-1 py-1">
          <div className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs text-indigo-300">
            DL
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-slate-200 truncate">Devpost Learner</div>
            <div className="text-[10px] text-emerald-400 font-medium">Adaptive Session Active</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
