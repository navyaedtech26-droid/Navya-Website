-- =============================================================================
-- Overview dashboard aggregation RPC (migration 0002)
-- =============================================================================
-- The Overview charts originally pulled every contact / blog / testimonial row
-- to the browser and grouped them in JS. This function does the grouping in
-- Postgres and returns one compact JSON payload, so the client makes a single
-- round trip and downloads only the aggregates.
--
-- Security: SECURITY DEFINER + an explicit is_admin() gate. It only ever returns
-- counts (never row contents) and refuses non-admin callers.
--
-- The client (src/services/admin.ts) calls this and transparently falls back to
-- in-browser aggregation if the function is absent, so this is non-breaking.
-- =============================================================================

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
  -- Authorization: counts are admin-only, mirroring the table RLS policies.
  if not public.is_admin() then
    raise exception 'Not authorized' using errcode = 'insufficient_privilege';
  end if;

  -- Clamp the window to something sane (1 day .. ~5 years).
  days := greatest(1, least(coalesce(days, 30), 1825));
  window_start := ((now() at time zone tz)::date) - (days - 1);

  select jsonb_build_object(
    -- Submissions per day within the window, bucketed in the caller's tz.
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

    -- Top 6 requested services (non-empty), most-requested first.
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
      'published', coalesce((select count(*) from public.blog_posts where status = 'published'), 0),
      'draft',     coalesce((select count(*) from public.blog_posts where status <> 'published'), 0)
    ),

    -- Counts indexed 1★..5★ as a 5-element array.
    'testimonialsByRating', coalesce((
      select jsonb_agg(coalesce(r.c, 0) order by r.rating)
      from (
        select g.rating,
               (select count(*)::int from public.testimonials
                where least(5, greatest(1, coalesce(rating, 0))) = g.rating) as c
        from generate_series(1, 5) as g(rating)
      ) r
    ), '[0,0,0,0,0]'::jsonb)
  )
  into result;

  return result;
end;
$$;

-- Allow logged-in users to call it (the is_admin() check inside does the real
-- gating); anon is intentionally excluded.
revoke all on function public.admin_overview_charts(integer, text) from public, anon;
grant execute on function public.admin_overview_charts(integer, text) to authenticated;
