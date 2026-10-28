"use client";

import React from "react";
import {
  Code2,
  BrainCircuit,
  Compass,
  Flame,
  Award,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside
      className={`w-64 border-r flex flex-col p-4 shrink-0 h-screen sticky top-0 transition-colors duration-200 overflow-y-auto ${
        isDark
          ? "bg-[#0d121f] border-[#1f293d]"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="space-y-6">
        {/* Brand / Logo + Light/Dark Mode Toggle on the right side of SkillMirror */}
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-bold text-base tracking-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  SkillMirror
                </span>
                <span className="text-[9px] uppercase font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                  AI Beta
                </span>
              </div>
              <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Adaptive Mental Models
              </p>
            </div>
          </div>

          {/* Light / Dark Mode Toggle button right beside SkillMirror */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle light and dark mode"
            className={`p-2 rounded-xl transition-all flex items-center justify-center shrink-0 border cursor-pointer ${
              isDark
                ? "bg-[#162032] border-[#253654] text-amber-400 hover:bg-[#1f2d47] hover:text-amber-300 shadow-sm"
                : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-indigo-600 shadow-sm"
            }`}
          >
            {isDark ? (
              <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Quick Streak & Stats Card */}
        <div
          className={`border rounded-xl p-3.5 space-y-2.5 transition-colors ${
            isDark ? "bg-[#131c2e] border-[#202e48]" : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 rounded-lg bg-amber-500/15 text-amber-500 items-center justify-center">
                <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              </span>
              <div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Practice Streak
                </div>
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  +{streakDays} Days
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Accuracy
              </div>
              <div className="text-sm font-bold text-emerald-500">{accuracy}%</div>
            </div>
          </div>
          <div
            className={`w-full rounded-full h-1.5 overflow-hidden ${
              isDark ? "bg-[#1e293b]" : "bg-slate-200"
            }`}
          >
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
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              activeTab === "workbench"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : isDark
                ? "text-slate-300 hover:bg-[#162032] hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              activeTab === "lab"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : isDark
                ? "text-slate-300 hover:bg-[#162032] hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="h-4 w-4" />
              <span>Curated Lab</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDark ? "bg-[#1e293b] text-slate-400" : "bg-slate-200 text-slate-600"
              }`}
            >
              5
            </span>
          </button>

          <button
            onClick={() => onTabChange("mastery")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              activeTab === "mastery"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : isDark
                ? "text-slate-300 hover:bg-[#162032] hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4" />
              <span>Knowledge Summary</span>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  );
}
