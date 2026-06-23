-- =============================================================================
-- FIX: allow anonymous visitors to submit the contact form
-- =============================================================================
-- Symptom: submitting the Contact form fails with
--   "new row violates row-level security policy for table contact_submissions"
--   (Postgres error 42501)
--
-- Cause: the INSERT policy that lets the public (anon key) add a row was not
-- present/active in the database.
--
-- Apply: Supabase dashboard → SQL Editor → New query → paste this → Run.
-- It is idempotent and safe to run multiple times.
-- =============================================================================

alter table public.contact_submissions enable row level security;

drop policy if exists "contact: anyone can submit" on public.contact_submissions;

create policy "contact: anyone can submit"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Sanity check — should list the insert policy you just created:
--   select policyname, cmd, roles
--   from pg_policies
--   where tablename = 'contact_submissions';
