-- R02 SECURE REVIEWED CLOUD SCHEMA CANDIDATE — NOT APPLIED.
-- Never execute against Supabase Production without separate explicit approval
-- of this exact SQL, project ref rhtrzuoqycdnwcbgctpe and deployment operation.
-- Review with actual distinct authenticated accounts and verify RLS+Data API.
-- This is a SQL deployment candidate, not migration history nor proof of security.
-- Fail-closed CREATE TABLE (no IF NOT EXISTS): unexpected existing objects abort.
-- Restrict grants on each new table before explicitly granting owner-scoped CRUD.
-- Review session JSON shape/count checks match the application's validated quiz model.
-- Do not execute until EXACT BLOB SHA acceptance AND independently verified recoverable backup.
-- V-008 PROPOSED USER-OWNED SUPABASE MIGRATION.
-- NOT APPLIED TO ANY ENVIRONMENT. Requires separate explicit student authorization
-- before applying on Production; verify with dedicated RLS two-account tests.
-- Existing Favorites, Studied and Practice History tables are untouched.
begin;

create table public.nordljud_daily_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null check (level in ('A2','B1','B2','C1')),
  lesson_on date not null check (lesson_on >= date '2026-10-29'),
  algorithm_version text not null check (algorithm_version = 'f04-2026-10-29-v1'),
  completed_at timestamptz not null default now(),
  primary key (user_id,level,lesson_on)
);
create table public.nordljud_review_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null check (level in ('A2','B1','B2','C1')),
  verb text not null check (length(verb) between 1 and 150),
  meaning text not null check (length(meaning) between 1 and 300),
  first_requested_on date not null,
  due_on date not null,
  last_reviewed_on date,
  reviewed_count integer not null default 0 check (reviewed_count between 0 and 10000),
  created_at timestamptz not null default now(),
  primary key (user_id,level,verb,meaning)
);
create index if not exists idx_nordljud_review_items_due
  on public.nordljud_review_items (user_id,due_on);
create table public.nordljud_review_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  window_days integer not null check (window_days in (7,14)),
  reviewed_on date not null,
  score integer not null check (score >= 0 and score <= 10),
  total integer not null check (total between 1 and 10 and score <= total),
  question_results jsonb not null check (
    case when jsonb_typeof(question_results) = 'array'
      then jsonb_array_length(question_results) = total
        and octet_length(question_results::text) <= 16384
        and jsonb_array_length(jsonb_path_query_array(question_results,
          '$[*] ? (@.type() == "object" && (@.level == "A2" || @.level == "B1" || @.level == "B2" || @.level == "C1") && @.verb.type() == "string" && @.meaning.type() == "string" && @.questionId.type() == "string" && @.correct.type() == "boolean")'
        )) = total
        and jsonb_array_length(jsonb_path_query_array(question_results,
          '$[*] ? (@.correct == true)'
        )) = score
      else false end
  ),
  created_at timestamptz not null default now()
);
create index if not exists idx_nordljud_review_sessions_user
  on public.nordljud_review_sessions (user_id,created_at desc);

alter table public.nordljud_daily_completions enable row level security;
alter table public.nordljud_review_items enable row level security;
alter table public.nordljud_review_sessions enable row level security;

revoke all on table public.nordljud_daily_completions from public, anon, authenticated;
revoke all on table public.nordljud_review_items from public, anon, authenticated;
revoke all on table public.nordljud_review_sessions from public, anon, authenticated;
grant select,insert,update,delete on public.nordljud_daily_completions to authenticated;
grant select,insert,update,delete on public.nordljud_review_items to authenticated;
grant select,insert,update,delete on public.nordljud_review_sessions to authenticated;

create policy "completions_owner_read" on public.nordljud_daily_completions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "completions_owner_insert" on public.nordljud_daily_completions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "completions_owner_update" on public.nordljud_daily_completions
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "completions_owner_delete" on public.nordljud_daily_completions
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "review_items_owner_read" on public.nordljud_review_items
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "review_items_owner_insert" on public.nordljud_review_items
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "review_items_owner_update" on public.nordljud_review_items
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "review_items_owner_delete" on public.nordljud_review_items
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "review_sessions_owner_read" on public.nordljud_review_sessions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "review_sessions_owner_insert" on public.nordljud_review_sessions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "review_sessions_owner_update" on public.nordljud_review_sessions
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "review_sessions_owner_delete" on public.nordljud_review_sessions
  for delete to authenticated using ((select auth.uid()) = user_id);

commit;
