-- Grant service_role full access and read-only access to anon/authenticated on
-- all public tables. Newer local Supabase stacks no longer apply these grants
-- by default, which breaks the seed script and server-side queries that rely
-- on the service_role key. RLS on user-owned tables (enabled in 0001_init.sql)
-- still gates per-user access; the data layer additionally scopes every query
-- by user_id.

grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant select on all tables in schema public to anon, authenticated;

alter default privileges in schema public
  grant all on tables to service_role;
alter default privileges in schema public
  grant all on sequences to service_role;
alter default privileges in schema public
  grant select on tables to anon, authenticated;
