-- Quiz review queue —————————————————————————————————————————————————————————
-- Tracks which specific quiz questions a user has gotten wrong so they can
-- be surfaced as a dedicated "Review" session. Questions are automatically
-- removed from the queue when answered correctly (even in a normal quiz).

create table if not exists quiz_review_queue (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  question_id uuid not null references quiz_questions(id) on delete cascade,
  added_at    timestamptz not null default now(),
  unique(user_id, question_id)
);

create index if not exists idx_qrq_user on quiz_review_queue(user_id);

alter table quiz_review_queue enable row level security;

drop policy if exists "qrq_own" on quiz_review_queue;
create policy "qrq_own" on quiz_review_queue for all
  using (user_id = (
    select id from users
    where auth0_id = current_setting('app.current_user_id', true)
  ));

-- Ensure service_role has full access (matches 0003_grants.sql pattern).
grant all on quiz_review_queue to service_role;
grant select on quiz_review_queue to anon, authenticated;
