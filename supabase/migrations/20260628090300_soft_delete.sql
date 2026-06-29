-- =============================================================================
-- Soft delete for content tables (migration 0004)
-- =============================================================================
-- Adds a recoverable delete + audit trail to blog_posts and testimonials.
-- contact_submissions intentionally keeps HARD delete: those rows hold visitor
-- PII (name/email/phone/message), so an admin "delete" must actually erase it
-- (right-to-erasure), not just hide it.
--
-- A row is "live" when deleted_at IS NULL. Public read policies are tightened to
-- hide soft-deleted rows from everyone; admins retain SELECT on them (via their
-- "admin all" policy) so a future trash/restore view is possible.
-- =============================================================================

-- --- columns -----------------------------------------------------------------
alter table public.blog_posts   add column if not exists deleted_at timestamptz;
alter table public.testimonials add column if not exists deleted_at timestamptz;

-- --- blog slug uniqueness must ignore deleted rows ---------------------------
-- Drop the table-level UNIQUE (so a deleted post's slug can be reused) and
-- replace it with a partial unique index over live rows only.
alter table public.blog_posts drop constraint if exists blog_posts_slug_key;
create unique index if not exists idx_blog_posts_slug_unique
  on public.blog_posts (slug)
  where deleted_at is null;

-- --- indexes: keep the hot paths scanning only live rows ---------------------
drop index if exists idx_blog_posts_published;
create index if not exists idx_blog_posts_published
  on public.blog_posts (published_at desc)
  where status = 'published' and deleted_at is null;

create index if not exists idx_testimonials_live
  on public.testimonials (is_published, sort_order)
  where deleted_at is null;

-- --- read policies: hide soft-deleted rows from the public -------------------
drop policy if exists "blog: public read published" on public.blog_posts;
create policy "blog: public read published"
  on public.blog_posts for select
  using (
    (status = 'published' and published_at <= now() and deleted_at is null)
    or public.is_admin()
  );

drop policy if exists "testimonials: public read" on public.testimonials;
create policy "testimonials: public read"
  on public.testimonials for select
  using ((is_published and deleted_at is null) or public.is_admin());

-- --- overview RPC: counts exclude soft-deleted blogs/testimonials ------------
create or replace function public.admin_overview_charts(
  days integer default 30,
  tz   text    default 'UTC'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result        jsonb;
  window_start  date;
begin
  if not public.is_admin() then
    raise exception 'Not authorized' using errcode = 'insufficient_privilege';
  end if;

  days := greatest(1, least(coalesce(days, 30), 1825));
  window_start := ((now() at time zone tz)::date) - (days - 1);

  select jsonb_build_object(
    'contactsByDay', coalesce((
      select jsonb_agg(jsonb_build_object('date', d, 'count', c) order by d)
      from (
        select (created_at at time zone tz)::date as d, count(*)::int as c
        from public.contact_submissions
        where (created_at at time zone tz)::date >= window_start
        group by 1
      ) t
    ), '[]'::jsonb),
    'contactsByStatus', jsonb_build_object(
      'new',      coalesce((select count(*) from public.contact_submissions where status = 'new'), 0),
      'read',     coalesce((select count(*) from public.contact_submissions where status = 'read'), 0),
      'archived', coalesce((select count(*) from public.contact_submissions where status = 'archived'), 0)
    ),
    'contactsByService', coalesce((
      select jsonb_agg(jsonb_build_object('service', service, 'count', c) order by c desc)
      from (
        select trim(service) as service, count(*)::int as c
        from public.contact_submissions
        where service is not null and trim(service) <> ''
        group by trim(service)
        order by c desc
        limit 6
      ) s
    ), '[]'::jsonb),
    'blogsByStatus', jsonb_build_object(
      'published', coalesce((select count(*) from public.blog_posts where status = 'published' and deleted_at is null), 0),
      'draft',     coalesce((select count(*) from public.blog_posts where status <> 'published' and deleted_at is null), 0)
    ),
    'testimonialsByRating', coalesce((
      select jsonb_agg(coalesce(r.c, 0) order by r.rating)
      from (
        select g.rating,
               (select count(*)::int from public.testimonials
                where deleted_at is null
                  and least(5, greatest(1, coalesce(rating, 0))) = g.rating) as c
        from generate_series(1, 5) as g(rating)
      ) r
    ), '[0,0,0,0,0]'::jsonb)
  )
  into result;

  return result;
end;
$$;
