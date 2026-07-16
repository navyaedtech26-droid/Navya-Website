insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

drop policy if exists "portfolio-images: public read"  on storage.objects;
drop policy if exists "portfolio-images: admin write"  on storage.objects;
drop policy if exists "portfolio-images: admin modify" on storage.objects;
drop policy if exists "portfolio-images: admin delete" on storage.objects;

create policy "portfolio-images: public read"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "portfolio-images: admin write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-images' and public.is_admin());

create policy "portfolio-images: admin modify"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-images' and public.is_admin())
  with check (bucket_id = 'portfolio-images' and public.is_admin());

create policy "portfolio-images: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-images' and public.is_admin());
