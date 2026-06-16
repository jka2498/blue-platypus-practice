// ─────────────────────────────────────────────────────────────────────────────
// Auth abstraction. SERVER ONLY.
//
// Two modes, selected by AUTH_MODE:
//   • "local" (default) — a built-in dev user. The app works instantly with no
//     external setup. Progress saves normally against this user.
//   • "auth0"          — real Auth0 session; the Auth0 `sub` becomes auth0_id.
//
// `getActiveUser()` resolves the identity, upserts the Supabase `users` row, and
// recalculates the login streak (awarding the daily streak XP at most once/day).
// ─────────────────────────────────────────────────────────────────────────────

import type { AuthUser, User } from "@/types";
import { getSupabaseAdmin } from "@/lib/supabase";
import { awardXp, XP_RULES } from "@/lib/xp";
import { daysBetween, todayISO } from "@/lib/utils";

export const LOCAL_USER_ID = "local-dev-user";

export function authMode(): "local" | "auth0" {
  return process.env.AUTH_MODE === "auth0" ? "auth0" : "local";
}

/** Resolve the raw auth identity (no DB). Returns null when unauthenticated. */
export async function getAuthUser(): Promise<AuthUser | null> {
  if (authMode() === "local") {
    return {
      auth0_id: LOCAL_USER_ID,
      email: process.env.LOCAL_USER_EMAIL ?? "you@example.com",
      display_name: process.env.LOCAL_USER_NAME ?? "Local Developer",
    };
  }

  // Auth0 mode — import lazily so local mode never loads the SDK/env.
  try {
    const { getSession } = await import("@auth0/nextjs-auth0");
    const session = await getSession();
    if (!session?.user?.sub) return null;
    return {
      auth0_id: session.user.sub,
      email: (session.user.email as string | undefined) ?? null,
      display_name:
        (session.user.name as string | undefined) ??
        (session.user.nickname as string | undefined) ??
        null,
    };
  } catch {
    return null;
  }
}

/**
 * Upsert the user row and recalculate the streak. Returns the synced `User`.
 *
 * Streak rules:
 *   • same day → unchanged
 *   • exactly +1 day → streak += 1 (+5 XP)
 *   • gap > 1 day → streak resets to 1 (+5 XP)
 *   • first ever login → streak = 1 (+5 XP)
 */
export async function ensureUser(identity: AuthUser): Promise<User> {
  const supabase = getSupabaseAdmin();
  const today = todayISO();

  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("auth0_id", identity.auth0_id)
    .maybeSingle();

  if (!existing) {
    const { data: created, error } = await supabase
      .from("users")
      .insert({
        auth0_id: identity.auth0_id,
        email: identity.email,
        display_name: identity.display_name,
        xp: 0,
        streak_days: 1,
        last_active_date: today,
      })
      .select("*")
      .single();
    if (error || !created) {
      throw new Error(`Failed to create user: ${error?.message ?? "unknown"}`);
    }
    await awardXp(created.id as string, XP_RULES.dailyStreak);
    return { ...(created as User), xp: XP_RULES.dailyStreak };
  }

  const user = existing as User;
  const last = user.last_active_date;

  if (last === today) {
    // Already counted today — nothing to do.
    return user;
  }

  const gap = last ? daysBetween(last, today) : Infinity;
  const newStreak = gap === 1 ? user.streak_days + 1 : 1;

  await supabase
    .from("users")
    .update({ streak_days: newStreak, last_active_date: today })
    .eq("id", user.id);

  const newXp = await awardXp(user.id, XP_RULES.dailyStreak);

  return { ...user, streak_days: newStreak, last_active_date: today, xp: newXp };
}

/** Resolve + sync the active user in one call. Returns null when logged out. */
export async function getActiveUser(): Promise<User | null> {
  const identity = await getAuthUser();
  if (!identity) return null;
  return ensureUser(identity);
}

/** Same as getActiveUser but throws — for routes/actions that require a user. */
export async function requireUser(): Promise<User> {
  const user = await getActiveUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}
