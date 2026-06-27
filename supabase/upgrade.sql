-- =============================================================================
-- Navya EdTech — incremental upgrade migration
-- =============================================================================
-- Run this on an EXISTING database that was created from an earlier version of
-- `schema.sql`. It adds:
--   • Server-side spam protection + throttling on the contact form
--   • A public "submit a testimonial" RLS policy (moderated: stays hidden)
--   • A public `blog-images` Storage bucket for the blog editor uploads
--
-- It is idempotent: safe to run multiple times. For a fresh database just run
-- `schema.sql`, which already contains all of the below.
--   Supabase dashboard → SQL Editor → New query → paste → Run.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Contact form: server-side validation + per-email throttling
-- -----------------------------------------------------------------------------
-- Defence in depth. The client validates and rate-limits too, but anyone can
-- POST straight at the anon API, so the real guard rails live here. SECURITY
-- DEFINER lets the throttle count rows past RLS (anon otherwise can't read them).
create or replace function public.enforce_contact_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  if length(trim(coalesce(new.name, ''))) < 2 or length(new.name) > 120 then
    raise exception 'Please enter a valid name.' using errcode = 'check_violation';
  end if;

  if new.email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Please enter a valid email address.' using errcode = 'check_violation';
  end if;

  if length(trim(coalesce(new.message, ''))) < 10 or length(new.message) > 5000 then
    raise exception 'Your message looks too short or too long.' using errcode = 'check_violation';
  end if;

  -- Throttle: at most 3 submissions per email address per rolling hour.
  select count(*) into recent_count
  from public.contact_submissions
  where lower(email) = lower(new.email)
    and created_at > now() - interval '1 hour';

  if recent_count >= 3 then
    raise exception 'Too many messages from this email. Please try again later.'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_contact_rules on public.contact_submissions;
create trigger trg_contact_rules
  before insert on public.contact_submissions
  for each row execute function public.enforce_contact_rules();

-- -----------------------------------------------------------------------------
-- 2. Public testimonial submissions (moderated)
-- -----------------------------------------------------------------------------
-- Visitors may submit a testimonial, but only as an UNPUBLISHED draft. An admin
-- reviews it in the dashboard and flips `is_published` to show it on the site.
drop policy if exists "testimonials: public submit" on public.testimonials;

create policy "testimonials: public submit"
  on public.testimonials for insert
  to anon, authenticated
  with check (is_published = false);

-- -----------------------------------------------------------------------------
-- 3. Blog image storage bucket
-- -----------------------------------------------------------------------------
-- A public bucket: anyone can read (so <img> tags work), only admins can write.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "blog-images: public read"  on storage.objects;
drop policy if exists "blog-images: admin write"  on storage.objects;
drop policy if exists "blog-images: admin modify" on storage.objects;

create policy "blog-images: public read"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "blog-images: admin write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and public.is_admin());

create policy "blog-images: admin modify"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and public.is_admin())
  with check (bucket_id = 'blog-images' and public.is_admin());

-- (delete intentionally admin-only via the same modify policy family)
drop policy if exists "blog-images: admin delete" on storage.objects;
create policy "blog-images: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and public.is_admin());

-- =============================================================================
-- Done.
-- =============================================================================
