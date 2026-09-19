-- E-Summit DCRUST'26 — Supabase schema
-- Run this in your Supabase project:  SQL Editor ▸ New query ▸ paste ▸ Run.

-- 1) Registrations table -----------------------------------------------------
create table if not exists public.registrations (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  event_id     text not null,
  event_title  text not null,
  user_id      uuid references auth.users (id) on delete set null,
  user_email   text,
  data         jsonb not null default '{}'::jsonb
);

create index if not exists registrations_event_idx on public.registrations (event_id);
create index if not exists registrations_created_idx on public.registrations (created_at desc);

-- 2) Row Level Security ------------------------------------------------------
alter table public.registrations enable row level security;

-- Any signed-in user may submit a registration for themselves.
drop policy if exists "insert own registration" on public.registrations;
create policy "insert own registration"
  on public.registrations for insert
  to authenticated
  with check ( auth.uid() = user_id );

-- A signed-in user may read back their own registrations.
drop policy if exists "read own registrations" on public.registrations;
create policy "read own registrations"
  on public.registrations for select
  to authenticated
  using ( auth.uid() = user_id );

-- Admin(s) may read every registration (for the dashboard).
-- Add more emails to the list as needed.
drop policy if exists "admin reads all" on public.registrations;
create policy "admin reads all"
  on public.registrations for select
  to authenticated
  using ( (auth.jwt() ->> 'email') in ('pritikalra44@gmail.com', 'akshatsaini702@gmail.com') );

-- (Optional) let admins delete rows, e.g. test/spam entries.
drop policy if exists "admin deletes" on public.registrations;
create policy "admin deletes"
  on public.registrations for delete
  to authenticated
  using ( (auth.jwt() ->> 'email') in ('pritikalra44@gmail.com', 'akshatsaini702@gmail.com') );

-- 3) Google login is enabled from the dashboard, not here:
--    Authentication ▸ Providers ▸ Google  (see the setup checklist).
