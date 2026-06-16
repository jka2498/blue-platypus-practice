// ─────────────────────────────────────────────────────────────────────────────
// SM-2 spaced-repetition algorithm (SuperMemo 2).
// Pure functions — no I/O — so they are trivially unit-testable.
//
// Rating → quality grade mapping (q in 0..5):
//   again → 2  (incorrect; reset)
//   hard  → 3  (correct but difficult)
//   good  → 4  (correct with some effort)
//   easy  → 5  (perfect recall)
// ─────────────────────────────────────────────────────────────────────────────

import type { FlashcardRating } from "@/types";
import { addDays, todayISO } from "@/lib/utils";

export interface Sm2State {
  ease_factor: number;
  interval_days: number;
  repetitions: number;
}

export interface Sm2Result extends Sm2State {
  next_review_date: string;
  last_rating: FlashcardRating;
}

const QUALITY: Record<FlashcardRating, number> = {
  again: 2,
  hard: 3,
  good: 4,
  easy: 5,
};

export const DEFAULT_SM2_STATE: Sm2State = {
  ease_factor: 2.5,
  interval_days: 0,
  repetitions: 0,
};

/**
 * Apply one review to an SM-2 state.
 *
 * @param prev   Current ease/interval/repetitions for this card+user.
 * @param rating User's recall rating.
 * @param today  ISO date the review happened (defaults to today).
 */
export function applySm2(
  prev: Sm2State,
  rating: FlashcardRating,
  today: string = todayISO(),
): Sm2Result {
  const q = QUALITY[rating];
  let { ease_factor, interval_days, repetitions } = prev;

  if (q < 3) {
    // Failed recall — restart the repetition cycle, review again tomorrow.
    repetitions = 0;
    interval_days = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval_days = 1;
    } else if (repetitions === 2) {
      interval_days = 6;
    } else {
      interval_days = Math.round(interval_days * ease_factor);
    }
  }

  // Update ease factor (clamped to a sane floor of 1.3).
  ease_factor = ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;
  // Round to avoid float drift accumulating in the DB.
  ease_factor = Math.round(ease_factor * 100) / 100;

  return {
    ease_factor,
    interval_days,
    repetitions,
    next_review_date: addDays(today, interval_days),
    last_rating: rating,
  };
}

/** A card is "due" when its next review date is today or earlier. */
export function isDue(nextReviewDate: string | null, today: string = todayISO()): boolean {
  if (!nextReviewDate) return true; // never reviewed → due
  return nextReviewDate <= today;
}
