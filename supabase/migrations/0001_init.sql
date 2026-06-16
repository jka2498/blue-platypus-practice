-- ─────────────────────────────────────────────────────────────────────────────
-- DevPath initial schema.
-- Content tables (topics, flashcards, quiz_questions, challenges) are publicly
-- readable. User-owned tables are protected with RLS keyed on a per-request GUC
-- (app.current_user_id) set via the set_current_user() RPC. The server-side data
-- layer uses the service-role key and additionally scopes every query by user_id.
-- ─────────────────────────────────────────────────────────────────────────────

-- Users -----------------------------------------------------------------------
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth0_id text unique not null,
  email text,
  display_name text,
  xp integer not null default 0,
  streak_days integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);

-- Topics ----------------------------------------------------------------------
create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  track text not null, -- 'javascript' | 'react'
  order_index integer
);

-- Flashcards ------------------------------------------------------------------
create table if not exists flashcards (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references topics(id) on delete set null,
  slug text unique,
  front text not null,
  back text not null,
  difficulty text not null default 'medium'
);

-- Flashcard progress (per user, per card — SM-2) ------------------------------
create table if not exists flashcard_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  flashcard_id uuid references flashcards(id) on delete cascade,
  ease_factor float not null default 2.5,
  interval_days integer not null default 1,
  next_review_date date not null default current_date,
  repetitions integer not null default 0,
  last_rating text,
  updated_at timestamptz not null default now(),
  unique(user_id, flashcard_id)
);

-- Quiz questions --------------------------------------------------------------
create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references topics(id) on delete set null,
  slug text unique,
  question text not null,
  options jsonb not null,        -- array of 4 strings
  correct_index integer not null,-- 0-3
  explanation text
);

-- Quiz attempts ---------------------------------------------------------------
create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  topic_id uuid references topics(id) on delete set null,
  score integer,
  total integer,
  answers jsonb,                 -- array of selected indices
  completed_at timestamptz not null default now()
);

-- Coding challenges -----------------------------------------------------------
create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  difficulty text not null,      -- 'easy' | 'medium' | 'hard'
  topic_id uuid references topics(id) on delete set null,
  type text not null default 'js', -- 'js' | 'react'
  description text not null,     -- markdown
  fn_name text not null default 'solution',
  starter_code text not null,
  solution_code text not null,
  annotated_solution text,
  test_cases jsonb not null,     -- [{ input, expected_output, description }]
  hints jsonb not null default '{"levels":["","",""]}'::jsonb,
  react_checklist jsonb,         -- string[] for guided React verification
  order_index integer
);

-- Challenge attempts ----------------------------------------------------------
create table if not exists challenge_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  challenge_id uuid references challenges(id) on delete cascade,
  status text not null,          -- 'passed' | 'failed' | 'attempted'
  submitted_code text,
  test_results jsonb,
  attempted_at timestamptz not null default now()
);

-- Activity log (for the heatmap) ----------------------------------------------
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  activity_date date not null default current_date,
  xp_earned integer not null default 0,
  unique(user_id, activity_date)
);

-- Helpful indexes -------------------------------------------------------------
create index if not exists idx_flashcards_topic on flashcards(topic_id);
create index if not exists idx_quiz_questions_topic on quiz_questions(topic_id);
create index if not exists idx_challenges_topic on challenges(topic_id);
create index if not exists idx_fp_user on flashcard_progress(user_id);
create index if not exists idx_qa_user on quiz_attempts(user_id);
create index if not exists idx_ca_user on challenge_attempts(user_id);
create index if not exists idx_al_user on activity_log(user_id);

-- Row Level Security ----------------------------------------------------------
alter table users enable row level security;
alter table flashcard_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table challenge_attempts enable row level security;
alter table activity_log enable row level security;

-- Policies: users can only access their own rows (keyed on the request GUC).
drop policy if exists "users_own" on users;
create policy "users_own" on users for all
  using (auth0_id = current_setting('app.current_user_id', true));

drop policy if exists "fp_own" on flashcard_progress;
create policy "fp_own" on flashcard_progress for all
  using (user_id = (select id from users where auth0_id = current_setting('app.current_user_id', true)));

drop policy if exists "qa_own" on quiz_attempts;
create policy "qa_own" on quiz_attempts for all
  using (user_id = (select id from users where auth0_id = current_setting('app.current_user_id', true)));

drop policy if exists "ca_own" on challenge_attempts;
create policy "ca_own" on challenge_attempts for all
  using (user_id = (select id from users where auth0_id = current_setting('app.current_user_id', true)));

drop policy if exists "al_own" on activity_log;
create policy "al_own" on activity_log for all
  using (user_id = (select id from users where auth0_id = current_setting('app.current_user_id', true)));
