-- ============================================================
--  Tradies 4 AI — Supabase setup for the group leaderboard
--
--  ✅ This has ALREADY been applied to the live project
--     (htzjyoxcjruepcadkwdl, region ap-southeast-2 / Sydney).
--
--  Keep this file as the source of truth — re-run it only if you ever
--  need to rebuild the database from scratch in a new project.
--
--  Design: no login required. Each phone gets a random device id
--  (client_id) stored locally. Writes go through a locked-down function
--  so a tradie can only update their own row; reads come from a function
--  that exposes scores + names ONLY (never the device id). The table
--  itself is fully locked (RLS on, no policies) — nothing touches it
--  directly except these two functions.
-- ============================================================

create table if not exists public.profiles (
  client_id      text primary key,
  display_name   text not null default 'Tradie',
  trade          text default '',
  avatar         text default '🦺',
  total_xp       integer not null default 0,
  current_streak integer not null default 0,
  last_active    date,
  updated_at     timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;

-- WRITE: upsert only your own row (keyed on the unguessable device id).
create or replace function public.upsert_profile(
  p_client_id   text,
  p_name        text,
  p_trade       text,
  p_avatar      text,
  p_total_xp    integer,
  p_streak      integer,
  p_last_active date
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_client_id is null or length(p_client_id) < 8 then
    raise exception 'invalid client_id';
  end if;
  insert into public.profiles as pr
    (client_id, display_name, trade, avatar, total_xp, current_streak, last_active, updated_at)
  values
    (p_client_id, coalesce(nullif(p_name,''),'Tradie'), coalesce(p_trade,''), coalesce(nullif(p_avatar,''),'🦺'),
     greatest(coalesce(p_total_xp,0),0), greatest(coalesce(p_streak,0),0), p_last_active, now())
  on conflict (client_id) do update set
    display_name   = excluded.display_name,
    trade          = excluded.trade,
    avatar         = excluded.avatar,
    total_xp       = greatest(excluded.total_xp, pr.total_xp), -- score never goes backwards
    current_streak = excluded.current_streak,
    last_active    = excluded.last_active,
    updated_at     = now();
end;
$$;

grant execute on function public.upsert_profile(text,text,text,text,integer,integer,date) to anon;

-- READ: the leaderboard — safe columns only, never client_id.
create or replace function public.get_leaderboard(lim integer default 50)
returns table (
  display_name   text,
  trade          text,
  avatar         text,
  total_xp       integer,
  current_streak integer
)
language sql
security definer
set search_path = public
as $$
  select display_name, trade, avatar, total_xp, current_streak
  from public.profiles
  order by total_xp desc, updated_at asc
  limit greatest(least(coalesce(lim, 50), 200), 1);
$$;

grant execute on function public.get_leaderboard(integer) to anon;


-- ============================================================
--  Ideas board — community "what should we learn next?" topics + upvotes.
--  Same locked-down pattern: tables sealed, all access via functions.
-- ============================================================

create table if not exists public.suggestions (
  id         uuid primary key default gen_random_uuid(),
  text       text not null,
  created_by text,
  created_at timestamptz not null default now()
);
create table if not exists public.suggestion_votes (
  suggestion_id uuid not null references public.suggestions(id) on delete cascade,
  client_id     text not null,
  created_at    timestamptz not null default now(),
  primary key (suggestion_id, client_id)
);

alter table public.suggestions enable row level security;
alter table public.suggestion_votes enable row level security;
revoke all on public.suggestions from anon, authenticated;
revoke all on public.suggestion_votes from anon, authenticated;

-- Add a topic (merges duplicates case-insensitively and auto-upvotes).
create or replace function public.add_suggestion(p_client_id text, p_text text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_text text; v_existing uuid;
begin
  if p_client_id is null or length(p_client_id) < 8 then raise exception 'invalid client_id'; end if;
  v_text := btrim(p_text);
  if length(v_text) < 3 or length(v_text) > 120 then raise exception 'text must be 3-120 chars'; end if;
  select id into v_existing from suggestions where lower(text) = lower(v_text) limit 1;
  if v_existing is not null then
    insert into suggestion_votes(suggestion_id, client_id) values (v_existing, p_client_id) on conflict do nothing;
    return v_existing;
  end if;
  insert into suggestions(text, created_by) values (v_text, p_client_id) returning id into v_id;
  insert into suggestion_votes(suggestion_id, client_id) values (v_id, p_client_id) on conflict do nothing;
  return v_id;
end; $$;
grant execute on function public.add_suggestion(text, text) to anon;

-- Toggle an upvote.
create or replace function public.toggle_suggestion_vote(p_client_id text, p_suggestion_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_client_id is null or length(p_client_id) < 8 then raise exception 'invalid client_id'; end if;
  if exists (select 1 from suggestion_votes where suggestion_id = p_suggestion_id and client_id = p_client_id) then
    delete from suggestion_votes where suggestion_id = p_suggestion_id and client_id = p_client_id;
  else
    insert into suggestion_votes(suggestion_id, client_id) values (p_suggestion_id, p_client_id) on conflict do nothing;
  end if;
end; $$;
grant execute on function public.toggle_suggestion_vote(text, uuid) to anon;

-- List topics, most-wanted first.
create or replace function public.get_suggestions(p_client_id text, lim integer default 60)
returns table (id uuid, text text, votes bigint, voted boolean, mine boolean)
language sql security definer set search_path = public as $$
  select s.id, s.text,
         count(v.client_id) as votes,
         coalesce(bool_or(v.client_id = p_client_id), false) as voted,
         (s.created_by = p_client_id) as mine
  from suggestions s
  left join suggestion_votes v on v.suggestion_id = s.id
  group by s.id
  order by count(v.client_id) desc, s.created_at asc
  limit greatest(least(coalesce(lim, 60), 200), 1);
$$;
grant execute on function public.get_suggestions(text, integer) to anon;
