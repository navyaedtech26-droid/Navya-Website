-- =============================================================================
-- Navya EdTech — Supabase schema
-- =============================================================================
-- Run this in the Supabase dashboard:  SQL Editor → New query → paste → Run.
-- It is idempotent (safe to re-run): it creates tables, indexes, triggers and
-- Row-Level Security (RLS) policies for the public website.
--
-- Tables
--   profiles            – per-user data, 1:1 with auth.users
--   contact_submissions – messages from the Contact form
--   testimonials        – client testimonials shown on the site
--   blog_posts          – blog / articles
--
-- Security model
--   • Anonymous visitors may INSERT contact messages and READ published
--     testimonials and blog posts. Nothing else is exposed.
--   • Authenticated users own their profile row.
--   • Admins (profiles.role = 'admin') can manage everything.
-- =============================================================================

-- Extensions ------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- Helper: keep an updated_at column fresh on every UPDATE -----------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- profiles  (user data storage)
-- =============================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  email       text,
  avatar_url  text,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Helper: is the current user an admin? ---------------------------------------
-- Defined after profiles so the table it queries already exists at creation time.
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own"   on public.profiles;
drop policy if exists "profiles: update own" on public.profiles;
drop policy if exists "profiles: admin all"  on public.profiles;

create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: admin all"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- contact_submissions  (Contact form)
-- =============================================================================
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  service     text,
  budget      text,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_contact_submissions_created_at
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

drop policy if exists "contact: anyone can submit" on public.contact_submissions;
drop policy if exists "contact: admin can read"    on public.contact_submissions;

-- Anyone (incl. anonymous visitors) may submit a message…
-- `to anon, authenticated` is explicit so the policy unambiguously covers
-- requests made with the public anon/publishable key.
create policy "contact: anyone can submit"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- …but only admins can read / manage them.
create policy "contact: admin can read"
  on public.contact_submissions for all
  using (public.is_admin())
  with check (public.is_admin());

-- Server-side validation + per-email throttling (defence in depth; the client
-- validates and rate-limits too). SECURITY DEFINER so the throttle count can
-- see rows that RLS would otherwise hide from the anonymous caller.
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

-- =============================================================================
-- newsletter_subscribers  (footer subscribe form)
-- =============================================================================
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_newsletter_created_at
  on public.newsletter_subscribers (created_at desc);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter: anyone can subscribe" on public.newsletter_subscribers;
drop policy if exists "newsletter: admin manage"         on public.newsletter_subscribers;

create policy "newsletter: anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');

create policy "newsletter: admin manage"
  on public.newsletter_subscribers for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- testimonials
-- =============================================================================
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  quote         text not null,
  name          text not null,
  role          text,
  company       text,
  icon          text,                       -- lucide icon key, e.g. 'ShoppingBag'
  rating        int  not null default 5 check (rating between 1 and 5),
  is_published  boolean not null default true,
  sort_order    int  not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists idx_testimonials_published
  on public.testimonials (is_published, sort_order);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials: public read" on public.testimonials;
drop policy if exists "testimonials: admin all"   on public.testimonials;

create policy "testimonials: public read"
  on public.testimonials for select
  using (is_published or public.is_admin());

-- Visitors may submit a testimonial, but only as an UNPUBLISHED draft that an
-- admin reviews before it appears on the site.
drop policy if exists "testimonials: public submit" on public.testimonials;
create policy "testimonials: public submit"
  on public.testimonials for insert
  to anon, authenticated
  with check (is_published = false);

create policy "testimonials: admin all"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- blog_posts
-- =============================================================================
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  content       text,                        -- markdown / HTML
  cover_image   text,
  author        text,
  category      text,
  tags          text[] not null default '{}',
  status        text not null default 'draft' check (status in ('draft', 'published')),
  read_minutes  int,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_blog_posts_status_pub
  on public.blog_posts (status, published_at desc);
create index if not exists idx_blog_posts_slug
  on public.blog_posts (slug);

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "blog: public read published" on public.blog_posts;
drop policy if exists "blog: admin all"              on public.blog_posts;

create policy "blog: public read published"
  on public.blog_posts for select
  using ((status = 'published' and published_at <= now()) or public.is_admin());

create policy "blog: admin all"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- Storage: blog-images bucket (public read, admin-only write)
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "blog-images: public read"  on storage.objects;
drop policy if exists "blog-images: admin write"  on storage.objects;
drop policy if exists "blog-images: admin modify" on storage.objects;
drop policy if exists "blog-images: admin delete" on storage.objects;

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

create policy "blog-images: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and public.is_admin());

-- =============================================================================
-- Done. To make yourself an admin after signing up, run:
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- =============================================================================
