// ─────────────────────────────────────────────────────────────────────────────
// DevPath — shared domain types.
// These mirror the Supabase schema (see /supabase/migrations) plus a handful of
// derived view-models used across the UI.
// ─────────────────────────────────────────────────────────────────────────────

export type Track = "javascript" | "react";
export type Difficulty = "easy" | "medium" | "hard";
export type ChallengeType = "js" | "react";
export type FlashcardRating = "again" | "hard" | "good" | "easy";
export type ChallengeStatus = "passed" | "failed" | "attempted";
export type ChallengeFilterStatus = "completed" | "attempted" | "not_started";

// ── Database row types ───────────────────────────────────────────────────────

export interface User {
  id: string;
  auth0_id: string;
  email: string | null;
  display_name: string | null;
  xp: number;
  streak_days: number;
  last_active_date: string | null; // ISO date (YYYY-MM-DD)
  created_at: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  track: Track;
  order_index: number | null;
}

export interface Flashcard {
  id: string;
  topic_id: string | null;
  front: string;
  back: string;
  difficulty: Difficulty;
}

export interface FlashcardProgress {
  id: string;
  user_id: string;
  flashcard_id: string;
  ease_factor: number;
  interval_days: number;
  next_review_date: string; // ISO date
  repetitions: number;
  last_rating: FlashcardRating | null;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  topic_id: string | null;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  topic_id: string | null;
  score: number;
  total: number;
  answers: number[];
  completed_at: string;
}

export interface TestCase {
  /** Arguments passed to the solution function (positional). */
  input: unknown[];
  /** Value the solution is expected to return (deep-equality). */
  expected_output: unknown;
  /** Human-readable description of the assertion. */
  description: string;
}

export interface ChallengeHints {
  /** 3 progressive levels: vague → specific → near-solution. */
  levels: [string, string, string];
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic_id: string | null;
  type: ChallengeType;
  description: string; // markdown
  /** Name of the function the JS test runner should invoke. */
  fn_name: string;
  starter_code: string;
  solution_code: string;
  test_cases: TestCase[];
  hints: ChallengeHints;
  /** For React challenges: expected-behavior checklist (guided self-verify). */
  react_checklist?: string[];
  /** Annotated, comment-rich version revealed after 3 failed attempts. */
  annotated_solution?: string;
}

export interface ChallengeAttempt {
  id: string;
  user_id: string;
  challenge_id: string;
  status: ChallengeStatus;
  submitted_code: string | null;
  test_results: TestResult[] | null;
  attempted_at: string;
}

export interface ActivityLogEntry {
  id: string;
  user_id: string;
  activity_date: string; // ISO date
  xp_earned: number;
}

// ── Derived / view-model types ────────────────────────────────────────────────

export interface TestResult {
  description: string;
  passed: boolean;
  expected: string;
  received: string;
  error?: string;
}

export interface RunOutput {
  /** Overall pass (all assertions passed and no fatal error). */
  passed: boolean;
  results: TestResult[];
  logs: string[];
  /** Fatal compile/runtime error not tied to a specific test case. */
  error?: string;
  /** Milliseconds the run took. */
  durationMs: number;
}

export interface LevelInfo {
  level: number;
  name: string;
  xpIntoLevel: number;
  xpForLevel: number;
  totalXp: number;
  progress: number; // 0..1 toward next level
}

export interface TrackProgress {
  track: string;
  label: string;
  completed: number;
  total: number;
  percent: number; // 0..100
}

export interface ActivityFeedItem {
  id: string;
  kind: "flashcard" | "quiz" | "challenge";
  title: string;
  detail: string;
  passed: boolean | null;
  at: string;
}

export interface TopicMastery {
  topicId: string;
  topicName: string;
  track: Track;
  flashcardScore: number; // 0..100
  quizScore: number; // 0..100
  challengeScore: number; // 0..100
  overall: number; // 0..100
}

export interface WeakArea {
  topicId: string;
  topicName: string;
  reason: string;
  score: number; // 0..100
}

export interface HeatmapDay {
  date: string; // ISO date
  xp: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity bucket
}

/** The active user resolved by the auth layer (local or Auth0). */
export interface AuthUser {
  auth0_id: string;
  email: string | null;
  display_name: string | null;
}
