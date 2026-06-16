"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { awardXp, quizXp } from "@/lib/xp";

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
  input.questionIds.forEach((qid, i) => {
    if (correctById.get(qid) === input.answers[i]) score += 1;
  });
  const total = input.questionIds.length;

  await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    topic_id: input.topicId,
    score,
    total,
    answers: input.answers,
  });

  const xpAwarded = quizXp(score);
  const totalXp = await awardXp(user.id, xpAwarded);

  revalidatePath("/dashboard");
  revalidatePath("/progress");

  return { score, total, xpAwarded, totalXp };
}
