// Type contracts for seed content. The seeder (`scripts/seed.ts`) resolves
// `topicSlug` to a real topic UUID at insert time. `slug` fields make the seed
// idempotent (upsert on conflict).

import type { Difficulty, ChallengeType, TestCase } from "@/types";

export interface SeedFlashcard {
  /** Must match a slug in lib/content-config TOPICS. */
  topicSlug: string;
  slug: string;
  front: string;
  back: string; // may contain markdown / inline `code`
  difficulty: Difficulty;
}

export interface SeedQuizQuestion {
  topicSlug: string;
  slug: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface SeedChallenge {
  title: string;
  slug: string;
  difficulty: Difficulty;
  topicSlug: string;
  type: ChallengeType;
  description: string; // markdown
  /** Function name the JS test runner will invoke (ignored for react type). */
  fnName: string;
  starterCode: string;
  solutionCode: string;
  /** Solution with explanatory inline comments, revealed after 3 fails. */
  annotatedSolution?: string;
  testCases: TestCase[];
  /** Exactly three progressive hints: vague → specific → near-solution. */
  hints: [string, string, string];
  /** React challenges: expected-behaviour checklist for guided self-verify. */
  reactChecklist?: string[];
  orderIndex: number;
}
