// ─────────────────────────────────────────────────────────────────────────────
// Auth abstraction. SERVER ONLY.
//
// Uses Supabase Auth. The Supabase user UUID becomes auth0_id in the users table.
//
// `getActiveUser()` resolves the identity, upserts the Supabase `users` row, and
// recalculates the login streak (awarding the daily streak XP at most once/day).
// ─────────────────────────────────────────────────────────────────────────────

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { AuthUser, User } from "@/types";
import { getSupabaseAdmin } from "@/lib/supabase";
import { awardXp, XP_RULES } from "@/lib/xp";
import { daysBetween, todayISO } from "@/lib/utils";

/** Resolve the raw auth identity from Supabase Auth (no DB). Returns null when unauthenticated. */
export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Server Components can be read-only for cookies; middleware refreshes sessions.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set(name, "", { ...options, maxAge: 0 });
            } catch {
              // Server Components can be read-only for cookies; middleware refreshes sessions.
            }
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      auth0_id: user.id,
      email: user.email ?? null,
      display_name:
        (user.user_metadata?.name as string | undefined) ?? user.email ?? "User",
    };
  } catch (err) {
    console.error("Failed to get auth user:", err);
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
