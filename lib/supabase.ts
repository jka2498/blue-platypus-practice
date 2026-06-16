// ─────────────────────────────────────────────────────────────────────────────
// Supabase clients.
//
// • supabaseAdmin  — service-role key. SERVER ONLY. Bypasses RLS; the app scopes
//                    every user-owned query with `.eq("user_id", userId)`. This is
//                    the real security boundary for the local MVP. Never import
//                    this into a client component.
// • supabaseBrowser — anon key. Safe for the browser; subject to RLS.
//
// The service-role client is created lazily so that importing this module from a
// client bundle (e.g. for `supabaseBrowser`) never touches the secret.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _admin: SupabaseClient | null = null;

/** Server-only service-role client. Throws if used outside a server context. */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must only be called on the server.");
  }
  if (_admin) return _admin;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Run `supabase start` and copy the keys into .env.local.",
    );
  }
  _admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _admin;
}

/** Browser/anon client for client-side reads (subject to RLS). */
export function getSupabaseBrowser(): SupabaseClient {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return createClient(SUPABASE_URL, ANON_KEY);
}

/** True when Supabase env vars are present (used to render setup hints). */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
