export interface UserProgress {
  streakDays: number;
  totalAttempts: number;
  correctAttempts: number;
  strengths: { concept: string; score: string; count: number }[];
  skillGaps: { concept: string; score: string; misconception: string }[];
  recentHistory: {
    challengeId: string;
    challengeTitle: string;
    concept: string;
    passed: boolean;
    timestamp: string;
  }[];
}

const STORAGE_KEY = "skillmirror_user_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
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
  recentHistory: [
    {
      challengeId: "py-mutation-rebinding",
      challengeTitle: "List Mutation vs Variable Rebinding",
      concept: "Object Mutation vs Rebinding",
      passed: true,
      timestamp: "Today, 10:14 AM",
    },
  ],
};

export function getStoredProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not read from localStorage, using default", err);
    return DEFAULT_PROGRESS;
  }
}

export function recordAttempt(
  challengeId: string,
  challengeTitle: string,
  concept: string,
  passed: boolean,
  misconception?: string
): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const current = getStoredProgress();
    const updated: UserProgress = {
      ...current,
      totalAttempts: current.totalAttempts + 1,
      correctAttempts: passed ? current.correctAttempts + 1 : current.correctAttempts,
      streakDays: passed ? current.streakDays + 1 : Math.max(1, current.streakDays),
      recentHistory: [
        {
          challengeId,
          challengeTitle,
          concept,
          passed,
          timestamp: "Just now",
        },
        ...current.recentHistory.slice(0, 9),
      ],
      strengths: [...current.strengths],
      skillGaps: [...current.skillGaps],
    };

    if (passed) {
      const existingStrength = updated.strengths.find((s) => s.concept === concept);
      if (existingStrength) {
        existingStrength.count += 1;
        existingStrength.score = `${existingStrength.count}/${existingStrength.count}`;
      } else {
        updated.strengths.push({ concept, score: "1/1", count: 1 });
      }
      // If was previously a gap, resolve it or decrement
      updated.skillGaps = updated.skillGaps.filter((g) => g.concept !== concept);
    } else {
      const existingGap = updated.skillGaps.find((g) => g.concept === concept);
      if (existingGap) {
        existingGap.score = "1/2";
        if (misconception) existingGap.misconception = misconception;
      } else {
        updated.skillGaps.push({
          concept,
          score: "0/1",
          misconception: misconception || "Mental model misaligned with runtime semantics",
        });
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Could not write to localStorage", err);
    return DEFAULT_PROGRESS;
  }
}
