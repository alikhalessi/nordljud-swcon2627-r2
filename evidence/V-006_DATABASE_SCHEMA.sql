-- V-006 Nordljud V2-A. Human-approved requirement; ChatGPT-authored DB schema.
-- Non-destructive new tables only. Each owner constrained to auth.uid() via RLS.
-- No user email/password is stored here. Guest clients have no table privileges.

create table public.nordljud_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  verb text not null check (char_length(verb) between 1 and 120),
  meaning text not null check (char_length(meaning) between 1 and 400),
  added_at timestamptz not null default now(),
  primary key (user_id, verb, meaning)
);
create table public.nordljud_studied (
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null check (level in ('A2','B1','B2','C1')),
  verb text not null check (char_length(verb) between 1 and 120),
  meaning text not null check (char_length(meaning) between 1 and 400),
  studied_at timestamptz not null default now(),
  primary key (user_id, level, verb, meaning)
);
create table public.nordljud_practice_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null check (level in ('A2','B1','B2','C1')),
  verb text not null check (char_length(verb) between 1 and 120),
  meaning text not null check (char_length(meaning) between 1 and 400),
  score integer not null check (score >= 0),
  total integer not null check (total between 1 and 50),
  completed_at timestamptz not null default now(),
  constraint nordljud_score_within_total check (score <= total)
);
create index nordljud_studied_user_level_idx on public.nordljud_studied (user_id, level);
create index nordljud_practice_user_time_idx on public.nordljud_practice_history (user_id, completed_at desc);

alter table public.nordljud_favorites enable row level security;
alter table public.nordljud_studied enable row level security;
alter table public.nordljud_practice_history enable row level security;

-- Remove any default open public-schema table privileges and explicitly grant minimum.
revoke all on public.nordljud_favorites, public.nordljud_studied, public.nordljud_practice_history from public, anon, authenticated;
grant select, insert, delete on public.nordljud_favorites, public.nordljud_studied, public.nordljud_practice_history to authenticated;

create policy favorites_select_owner on public.nordljud_favorites for select to authenticated using ((select auth.uid()) = user_id);
create policy favorites_insert_owner on public.nordljud_favorites for insert to authenticated with check ((select auth.uid()) = user_id);
create policy favorites_delete_owner on public.nordljud_favorites for delete to authenticated using ((select auth.uid()) = user_id);
create policy studied_select_owner on public.nordljud_studied for select to authenticated using ((select auth.uid()) = user_id);
create policy studied_insert_owner on public.nordljud_studied for insert to authenticated with check ((select auth.uid()) = user_id);
create policy studied_delete_owner on public.nordljud_studied for delete to authenticated using ((select auth.uid()) = user_id);
create policy history_select_owner on public.nordljud_practice_history for select to authenticated using ((select auth.uid()) = user_id);
create policy history_insert_owner on public.nordljud_practice_history for insert to authenticated with check ((select auth.uid()) = user_id);
create policy history_delete_owner on public.nordljud_practice_history for delete to authenticated using ((select auth.uid()) = user_id);
