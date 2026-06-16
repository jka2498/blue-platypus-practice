-- ─────────────────────────────────────────────────────────────────────────────
-- RPC helpers.
--   • set_current_user(text)  — sets the per-request GUC the RLS policies read.
--   • increment_user_xp(...)   — atomic XP bump, returns the new total.
-- ─────────────────────────────────────────────────────────────────────────────

-- Set the current user for RLS (honours the spec's app.current_user_id pattern).
create or replace function set_current_user(p_auth0_id text)
returns void
language sql
security definer
as $$
  select set_config('app.current_user_id', coalesce(p_auth0_id, ''), false);
$$;

-- Atomically increment a user's XP and return the new value.
create or replace function increment_user_xp(p_user_id uuid, p_amount integer)
returns integer
language plpgsql
security definer
as $$
declare
  new_xp integer;
begin
  update users
     set xp = xp + greatest(p_amount, 0)
   where id = p_user_id
  returning xp into new_xp;
  return coalesce(new_xp, 0);
end;
$$;

grant execute on function set_current_user(text) to anon, authenticated, service_role;
grant execute on function increment_user_xp(uuid, integer) to anon, authenticated, service_role;
