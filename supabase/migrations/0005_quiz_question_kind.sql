-- Quiz question kind ---------------------------------------------------------
-- Supports rendering MCQs where answers are code snippets.

alter table quiz_questions
add column if not exists question_kind text not null default 'text';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'quiz_questions_question_kind_check'
  ) then
    alter table quiz_questions
      add constraint quiz_questions_question_kind_check
      check (question_kind in ('text', 'code'));
  end if;
end $$;
