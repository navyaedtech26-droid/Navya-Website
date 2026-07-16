-- =============================================================================
-- Migration: Create Case Studies
-- =============================================================================

create table if not exists public.case_studies (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null,               
  client         text not null,
  category       text not null,
  industry       text not null,
  summary        text not null,
  platform       text not null,
  duration       text not null,
  image          text not null,
  accent         text not null default 'blue',
  icon           text not null,
  challenge      text not null,
  solution_short text not null,
  tags           text[] not null default '{}',
  content        jsonb not null default '{}'::jsonb, 
  status         text not null default 'draft' check (status in ('draft', 'published')),
  published_at   timestamptz,
  deleted_at     timestamptz,                 -- soft delete: live row when NULL
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Slug is unique among *live* rows only.
create unique index if not exists idx_case_studies_slug_unique
  on public.case_studies (slug)
  where deleted_at is null;

create index if not exists idx_case_studies_status_pub
  on public.case_studies (status, published_at desc);
create index if not exists idx_case_studies_slug
  on public.case_studies (slug);
create index if not exists idx_case_studies_published
  on public.case_studies (published_at desc)
  where status = 'published' and deleted_at is null;

-- Trigger to update `updated_at`
create trigger trg_case_studies_updated_at
  before update on public.case_studies
  for each row execute function public.set_updated_at();

-- RLS
alter table public.case_studies enable row level security;

create policy "case_studies: public read published"
  on public.case_studies for select
  using (
    (status = 'published' and deleted_at is null)
    or public.is_admin()
  );

create policy "case_studies: admin all"
  on public.case_studies for all
  using (public.is_admin())
  with check (public.is_admin());
