"use client";

import React, { useState, useEffect } from "react";
import { SidebarNav, NavTab } from "@/components/SidebarNav";
import { CodePlayground } from "@/components/CodePlayground";
import { PredictionQuizCard } from "@/components/PredictionQuizCard";
import { DiagnosticBanner } from "@/components/DiagnosticBanner";
import { AdaptiveFollowUp } from "@/components/AdaptiveFollowup";
import { SocraticDrawer } from "@/components/SocraticDrawer";
import { KnowledgeSummary } from "@/components/KnowledgeSummary";
import { CuratedLabView } from "@/components/CuratedLabView";
import { CURATED_CHALLENGES, Challenge, Option } from "@/data/curatedChallenges";
import { getStoredProgress, recordAttempt, UserProgress } from "@/lib/storage";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Terminal, ChevronRight, Zap } from "lucide-react";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<NavTab>("workbench");
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(CURATED_CHALLENGES[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [customCode, setCustomCode] = useState(`// Paste your snippet here to test execution understanding
function example() {
  let a = 10;
  return () => a++;
}
const counter = example();
console.log(counter(), counter());`);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);

  // User progress from localStorage
  const [progress, setProgress] = useState<UserProgress>({
    streakDays: 3,
    totalAttempts: 5,
    correctAttempts: 4,
    strengths: [
      { concept: "Function Invocation & Returns", score: "4/4", count: 4 },
      { concept: "Variable Mutation & Assignment", score: "3/3", count: 3 },
    ],
    skillGaps: [
      {
        concept: "Variable Scoping & Closure Capture",
        score: "1/2",
        misconception: "Assumed 'var' has block scope in loops instead of function scope",
      },
    ],
    recentHistory: [],
  });

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const accuracy =
    progress.totalAttempts > 0
      ? Math.round((progress.correctAttempts / progress.totalAttempts) * 100)
      : 80;

  const handleSelectPreset = (id: string) => {
    const found = CURATED_CHALLENGES.find((c) => c.id === id);
    if (found) {
      setCurrentChallenge(found);
      setIsCustom(false);
      setSelectedOptionId(null);
      setIsSubmitted(false);
      setShowFollowUp(false);
    }
  };

  const handleCustomAnalyze = async () => {
    if (!customCode.trim()) return;
    setIsAnalyzingCustom(true);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: customCode, language: "javascript" }),
      });
      const data = await res.json();
      if (data && data.options) {
        const customChallenge: Challenge = {
          id: `custom-${Date.now()}`,
          title: data.title || "Custom Code Challenge",
          concept: data.concept || "Custom Execution Flow",
          language: "javascript",
          difficulty: "Intermediate",
          category: "User Custom Code",
          code: customCode,
          question: data.question || "What will this code output?",
          options: data.options,
          followUp: {
            title: "Follow-up Edge Case",
            code: customCode,
            question: "How does behavior change under strict mode or re-invocation?",
            targetedMisconception: "Runtime Execution Scope",
            options: data.options,
          },
        };
        setCurrentChallenge(customChallenge);
        setSelectedOptionId(null);
        setIsSubmitted(false);
        setShowFollowUp(false);
      }
    } catch (err) {
      console.error("Custom analyze failed", err);
    } finally {
      setIsAnalyzingCustom(false);
    }
  };

  const handleSubmitPrediction = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);

    const selectedOption = currentChallenge.options.find((o) => o.id === selectedOptionId);
    const passed = !!selectedOption?.isCorrect;
    const misconception = selectedOption?.misconception;

    const updated = recordAttempt(
      currentChallenge.id,
      currentChallenge.title,
      currentChallenge.concept,
      passed,
      misconception
    );
    setProgress(updated);
  };

  const handleResetChallenge = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setShowFollowUp(false);
  };

  const selectedOption = currentChallenge.options.find((o) => o.id === selectedOptionId);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-200 ${
        isDark ? "bg-[#090d16] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Left Sidebar */}
      <SidebarNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "workbench") {
            setShowFollowUp(false);
          }
        }}
        streakDays={progress.streakDays}
        accuracy={accuracy}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-screen">
        {activeTab === "lab" && (
          <CuratedLabView
            onSelectChallenge={(c) => {
              setCurrentChallenge(c);
              setIsCustom(false);
              setSelectedOptionId(null);
              setIsSubmitted(false);
              setShowFollowUp(false);
              setActiveTab("workbench");
            }}
          />
        )}

        {activeTab === "mastery" && (
          <KnowledgeSummary
            progress={progress}
            onNavigateToWorkbench={() => setActiveTab("workbench")}
          />
        )}

        {activeTab === "workbench" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header / Breadcrumb Bar (Matching Codelingo _0c_R-1b0... reference) */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 transition-colors ${
                isDark ? "border-[#1f293d]" : "border-slate-200"
              }`}
            >
              <div>
                <div
                  className={`flex items-center gap-2 text-xs font-medium mb-1 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span>{currentChallenge.category}</span>
                  <ChevronRight
                    className={`h-3 w-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                  />
                  <span className="text-indigo-500 font-semibold">{currentChallenge.concept}</span>
                </div>
                <h1
                  className={`text-2xl font-black tracking-tight flex items-center gap-2.5 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  <span>{currentChallenge.title}</span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      currentChallenge.difficulty === "Beginner"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : currentChallenge.difficulty === "Intermediate"
                        ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                        : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                    }`}
                  >
                    {currentChallenge.difficulty}
                  </span>
                </h1>
              </div>

              {/* Status / Quick Action */}
              <div className="flex items-center gap-2">
                {isCustom && (
                  <button
                    onClick={handleCustomAnalyze}
                    disabled={isAnalyzingCustom}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>{isAnalyzingCustom ? "Analyzing..." : "Mirror My Code"}</span>
                  </button>
                )}
                {!isCustom && (
                  <div
                    className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                      isDark
                        ? "text-slate-300 bg-[#111827] border-[#1f293d]"
                        : "text-slate-700 bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                    <span>Active Probe Stage</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dual-Pane Layout: Left Stage (Code & Prediction) vs Right Stage (Socratic Coach) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Code Playground & Diagnostic Probe (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Code Playground */}
                <CodePlayground
                  challenge={currentChallenge}
                  customCode={customCode}
                  isCustom={isCustom}
                  onSelectPreset={handleSelectPreset}
                  onCustomCodeChange={setCustomCode}
                  onToggleCustom={(val) => {
                    setIsCustom(val);
                    setSelectedOptionId(null);
                    setIsSubmitted(false);
                    setShowFollowUp(false);
                  }}
                  curatedChallenges={CURATED_CHALLENGES}
                />

                {/* Challenge Stage: Either Main Prediction Quiz or Adaptive Follow-Up */}
                {!showFollowUp ? (
                  <div className="space-y-4">
                    <PredictionQuizCard
                      question={currentChallenge.question}
                      options={currentChallenge.options}
                      selectedOptionId={selectedOptionId}
                      onSelectOption={(id) => setSelectedOptionId(id)}
                      isSubmitted={isSubmitted}
                      onSubmit={handleSubmitPrediction}
                      onReset={handleResetChallenge}
                    />

                    {/* Diagnostic Banner once submitted */}
                    {isSubmitted && selectedOption && (
                      <DiagnosticBanner
                        selectedOption={selectedOption}
                        onOpenFollowUp={() => setShowFollowUp(true)}
                        hasFollowUp={!!currentChallenge.followUp}
                      />
                    )}
                  </div>
                ) : (
                  <AdaptiveFollowUp
                    title={currentChallenge.followUp.title}
                    code={currentChallenge.followUp.code}
                    question={currentChallenge.followUp.question}
                    targetedMisconception={currentChallenge.followUp.targetedMisconception}
                    options={currentChallenge.followUp.options}
                    language={currentChallenge.language}
                    onBack={() => setShowFollowUp(false)}
                    onSuccess={() => {
                      const updated = recordAttempt(
                        `${currentChallenge.id}-followup`,
                        currentChallenge.followUp.title,
                        currentChallenge.concept,
                        true
                      );
                      setProgress(updated);
                    }}
                  />
                )}
              </div>

              {/* Right Column: Socratic AI Mentor Panel (5 cols) (Inspired by reference h3HRs1OKmi...) */}
              <div className="lg:col-span-5 space-y-4">
                <SocraticDrawer
                  challenge={currentChallenge}
                  activeMisconception={selectedOption?.misconception}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
