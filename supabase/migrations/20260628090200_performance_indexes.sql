-- =============================================================================
-- Performance indexes (migration 0003)
-- =============================================================================
-- Additive, non-breaking. Targets the two hottest query shapes the app issues.
-- =============================================================================

-- Public blog reads always filter `status = 'published'` and order by
-- `published_at desc` (see services/blogs.ts). A partial index on just the
-- published rows is smaller and more selective than the composite
-- (status, published_at) index, and stays small as drafts pile up.
create index if not exists idx_blog_posts_published
  on public.blog_posts (published_at desc)
  where status = 'published';

-- The contact throttle trigger (enforce_contact_rules) runs
--   where lower(email) = lower($1) and created_at > now() - interval '1 hour'
-- on every submission. A functional index on lower(email) + created_at makes
-- that lookup an index scan instead of a sequential scan as the table grows.
create index if not exists idx_contact_submissions_email_lower
  on public.contact_submissions (lower(email), created_at desc);
