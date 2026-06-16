"use server";

import { revalidatePath } from "next/cache";
import type { FlashcardRating } from "@/types";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { applySm2, type Sm2State, DEFAULT_SM2_STATE } from "@/lib/sm2";
import { awardXp, flashcardXp } from "@/lib/xp";

export interface RateFlashcardResult {
  ease_factor: number;
  interval_days: number;
  next_review_date: string;
  repetitions: number;
  xpAwarded: number;
  totalXp: number;
}

/** Record a flashcard review: update SM-2 state and award XP for good/easy. */
export async function rateFlashcard(
  flashcardId: string,
  rating: FlashcardRating,
): Promise<RateFlashcardResult> {
  const user = await requireUser();
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("flashcard_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("flashcard_id", flashcardId)
    .maybeSingle();

  const prev: Sm2State = existing
    ? {
        ease_factor: existing.ease_factor as number,
        interval_days: existing.interval_days as number,
        repetitions: existing.repetitions as number,
      }
    : DEFAULT_SM2_STATE;

  const next = applySm2(prev, rating);

  await supabase.from("flashcard_progress").upsert(
    {
      user_id: user.id,
      flashcard_id: flashcardId,
      ease_factor: next.ease_factor,
      interval_days: next.interval_days,
      next_review_date: next.next_review_date,
      repetitions: next.repetitions,
      last_rating: rating,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,flashcard_id" },
  );

  const xpAwarded = flashcardXp(rating);
  const totalXp = xpAwarded > 0 ? await awardXp(user.id, xpAwarded) : user.xp;

  revalidatePath("/dashboard");
  revalidatePath("/progress");

  return {
    ease_factor: next.ease_factor,
    interval_days: next.interval_days,
    next_review_date: next.next_review_date,
    repetitions: next.repetitions,
    xpAwarded,
    totalXp,
  };
}
