-- =============================================================================
-- FIX: blog cover-image / in-content image upload fails with
--   "StorageApiError: Bucket not found" (blog-images)
-- =============================================================================
-- Symptom: uploading a cover image or an inline image in the Blogs admin form
-- fails immediately with "Upload failed. Please try again." and the browser
-- console shows `[storage] upload to blog-images failed StorageApiError:
-- Bucket not found`.
--
-- Cause: the `blog-images` Storage bucket (and its RLS policies) defined in
-- supabase/migrations/20260628090000_baseline.sql was never created on this
-- project — the migration file documents the intended schema, but this
-- statement apparently didn't run against the live database.
--
-- Apply: Supabase dashboard → SQL Editor → New query → paste this → Run.
-- It is idempotent and safe to run multiple times.
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

-- Sanity check — should return one row named "blog-images", public = true:
--   select id, name, public from storage.buckets where id = 'blog-images';
