// ─────────────────────────────────────────────────────────────────────────────
// XP award logic. SERVER ONLY (uses the service-role client).
//
// Award table:
//   • Flashcard rated good/easy ........ +5
//   • Quiz completed ................... +10, +2 per correct answer
//   • Challenge passed ................. easy +20 / medium +40 / hard +75
//   • Daily login streak ............... +5 per day
//
// Every award bumps `users.xp` and upserts today's `activity_log` row so the
// heatmap and progress tracker stay in sync.
// ─────────────────────────────────────────────────────────────────────────────

import type { Difficulty } from "@/types";
import { getSupabaseAdmin } from "@/lib/supabase";
import { todayISO } from "@/lib/utils";

export const XP_RULES = {
  flashcardGoodEasy: 5,
  quizBase: 10,
  quizPerCorrect: 2,
  challenge: { easy: 20, medium: 40, hard: 75 } as Record<Difficulty, number>,
  dailyStreak: 5,
} as const;

/**
 * Award XP to a user: increments `users.xp` and accumulates `activity_log` for
 * today. Returns the user's new total XP.
 */
export async function awardXp(userId: string, amount: number): Promise<number> {
  if (amount <= 0) {
    const { data } = await getSupabaseAdmin()
      .from("users")
      .select("xp")
      .eq("id", userId)
      .single();
    return (data?.xp as number | undefined) ?? 0;
  }

  const supabase = getSupabaseAdmin();
  const today = todayISO();

  // 1) Bump users.xp via the increment RPC (atomic) with a read-modify-write
  //    fallback if the RPC is unavailable.
  let newXp: number | null = null;
  const { data: rpcData, error: rpcError } = await supabase.rpc("increment_user_xp", {
    p_user_id: userId,
    p_amount: amount,
  });
  if (!rpcError && typeof rpcData === "number") {
    newXp = rpcData;
  } else {
    const { data: current } = await supabase
      .from("users")
      .select("xp")
      .eq("id", userId)
      .single();
    const updated = ((current?.xp as number | undefined) ?? 0) + amount;
    await supabase.from("users").update({ xp: updated }).eq("id", userId);
    newXp = updated;
  }

  // 2) Accumulate today's activity_log (upsert + add).
  const { data: existing } = await supabase
    .from("activity_log")
    .select("xp_earned")
    .eq("user_id", userId)
    .eq("activity_date", today)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("activity_log")
      .update({ xp_earned: ((existing.xp_earned as number) ?? 0) + amount })
      .eq("user_id", userId)
      .eq("activity_date", today);
  } else {
    await supabase
      .from("activity_log")
      .insert({ user_id: userId, activity_date: today, xp_earned: amount });
  }

  return newXp ?? amount;
}

export function flashcardXp(rating: "again" | "hard" | "good" | "easy"): number {
  return rating === "good" || rating === "easy" ? XP_RULES.flashcardGoodEasy : 0;
}

export function quizXp(correct: number): number {
  return XP_RULES.quizBase + correct * XP_RULES.quizPerCorrect;
}

export function challengeXp(difficulty: Difficulty): number {
  return XP_RULES.challenge[difficulty];
}
