"use server";

import { revalidatePath } from "next/cache";
import type { Challenge, QuizQuestion } from "@/types";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getQuizQuestions, getRandomJsChallenge } from "@/lib/queries";
import { awardXp, quizXp } from "@/lib/xp";

/** Fetch a fresh, shuffled quiz session (re-shuffles on each retake). */
export async function fetchQuizSession(
  topicId: string | null,
  count = 10,
): Promise<QuizQuestion[]> {
  await requireUser();
  return getQuizQuestions(topicId, count);
}

/** Interview simulation: 5 mixed conceptual MCQs + 1 JS coding challenge. */
export async function fetchInterviewSession(): Promise<{
  questions: QuizQuestion[];
  challenge: Challenge | null;
}> {
  await requireUser();
  const [questions, challenge] = await Promise.all([
    getQuizQuestions(null, 5),
    getRandomJsChallenge(),
  ]);
  return { questions, challenge };
}

export interface SubmitQuizInput {
  topicId: string | null;
  /** questionId → selected option index */
  questionIds: string[];
  answers: number[];
}

export interface SubmitQuizResult {
  score: number;
  total: number;
  xpAwarded: number;
  totalXp: number;
}

/**
 * Persist a quiz attempt. The score is recomputed server-side from the canonical
 * correct answers (never trust the client's tally).
 */
export async function submitQuiz(input: SubmitQuizInput): Promise<SubmitQuizResult> {
  const user = await requireUser();
  const supabase = getSupabaseAdmin();

  const { data: questionsData } = await supabase
    .from("quiz_questions")
    .select("id, correct_index")
    .in("id", input.questionIds);
  const correctById = new Map(
    ((questionsData ?? []) as { id: string; correct_index: number }[]).map((q) => [
      q.id,
      q.correct_index,
    ]),
  );

  let score = 0;
  const wrongIds: string[] = [];
  const correctIds: string[] = [];
  input.questionIds.forEach((qid, i) => {
    if (correctById.get(qid) === input.answers[i]) {
      score += 1;
      correctIds.push(qid);
    } else {
      wrongIds.push(qid);
    }
  });
  const total = input.questionIds.length;

  // Persist attempt, then maintain the review queue.
  await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    topic_id: input.topicId,
    score,
    total,
    answers: input.answers,
  });

  // Wrong answers → add to review queue (upsert so no duplicates).
  if (wrongIds.length > 0) {
    await supabase.from("quiz_review_queue").upsert(
      wrongIds.map((question_id) => ({ user_id: user.id, question_id })),
      { onConflict: "user_id,question_id", ignoreDuplicates: true },
    );
  }
  // Correct answers → remove from review queue (they're no longer wrong).
  if (correctIds.length > 0) {
    await supabase
      .from("quiz_review_queue")
      .delete()
      .eq("user_id", user.id)
      .in("question_id", correctIds);
  }

  const xpAwarded = quizXp(score);
  const totalXp = await awardXp(user.id, xpAwarded);

  revalidatePath("/dashboard");
  revalidatePath("/progress");

  return { score, total, xpAwarded, totalXp };
}
