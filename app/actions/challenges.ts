"use server";

import { revalidatePath } from "next/cache";
import type { ChallengeStatus, Difficulty, TestResult } from "@/types";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { awardXp, challengeXp } from "@/lib/xp";

export interface SubmitChallengeInput {
  challengeId: string;
  status: ChallengeStatus;
  code: string;
  testResults: TestResult[];
}

export interface SubmitChallengeResult {
  xpAwarded: number;
  totalXp: number;
  firstSolve: boolean;
}

/**
 * Record a challenge attempt. XP for a pass is awarded only the first time the
 * challenge is solved (no farming repeated submits).
 */
export async function submitChallenge(
  input: SubmitChallengeInput,
): Promise<SubmitChallengeResult> {
  const user = await requireUser();
  const supabase = getSupabaseAdmin();

  // Was it already solved?
  const { data: priorPass } = await supabase
    .from("challenge_attempts")
    .select("id")
    .eq("user_id", user.id)
    .eq("challenge_id", input.challengeId)
    .eq("status", "passed")
    .limit(1);
  const alreadySolved = (priorPass ?? []).length > 0;

  await supabase.from("challenge_attempts").insert({
    user_id: user.id,
    challenge_id: input.challengeId,
    status: input.status,
    submitted_code: input.code,
    test_results: input.testResults,
  });

  let xpAwarded = 0;
  let totalXp = user.xp;
  const firstSolve = input.status === "passed" && !alreadySolved;

  if (firstSolve) {
    const { data: challenge } = await supabase
      .from("challenges")
      .select("difficulty")
      .eq("id", input.challengeId)
      .maybeSingle();
    const difficulty = (challenge?.difficulty as Difficulty | undefined) ?? "easy";
    xpAwarded = challengeXp(difficulty);
    totalXp = await awardXp(user.id, xpAwarded);
  }

  revalidatePath("/challenges");
  revalidatePath("/dashboard");
  revalidatePath("/progress");

  return { xpAwarded, totalXp, firstSolve };
}
