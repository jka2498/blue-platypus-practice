// ─────────────────────────────────────────────────────────────────────────────
// Level progression. 100 XP per level. Names themed around frontend mastery and
// cycle through Apprentice → Practitioner → Engineer → Senior → Architect, with a
// track-flavoured prefix so e.g. "React Apprentice" reads nicely on the dashboard.
// ─────────────────────────────────────────────────────────────────────────────

import type { LevelInfo } from "@/types";

export const XP_PER_LEVEL = 100;

const TIER_NAMES = [
  "Apprentice",
  "Practitioner",
  "Engineer",
  "Senior",
  "Architect",
] as const;

/** Build the display name for a given (1-indexed) level. */
export function levelName(level: number): string {
  // Levels 1-5 → Apprentice..Architect, then it keeps climbing with a numeral.
  if (level <= TIER_NAMES.length) {
    return `React ${TIER_NAMES[level - 1]}`;
  }
  const cycles = Math.floor((level - 1) / TIER_NAMES.length);
  const tier = TIER_NAMES[(level - 1) % TIER_NAMES.length];
  return `React ${tier} ${"★".repeat(Math.min(cycles, 5))}`;
}

/** Resolve full level info from a total XP value. */
export function getLevelInfo(totalXp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(totalXp));
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = safeXp % XP_PER_LEVEL;
  return {
    level,
    name: levelName(level),
    xpIntoLevel,
    xpForLevel: XP_PER_LEVEL,
    totalXp: safeXp,
    progress: xpIntoLevel / XP_PER_LEVEL,
  };
}
