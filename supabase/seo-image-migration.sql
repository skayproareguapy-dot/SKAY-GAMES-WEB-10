-- SKAY GAMES - SEO image separation
-- Run this once in Supabase SQL editor before running scripts/backfill-seo-images.mjs.
-- This does not modify the visual product image column: productos.imagen.

alter table public.productos
  add column if not exists seo_image_url text,
  add column if not exists seo_image_migration_status text,
  add column if not exists seo_image_migrated_at timestamptz;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'seo-images',
  'seo-images',
  true,
  5242880,
  array['image/webp', 'image/png', 'image/jpeg']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read seo images'
  ) then
    create policy "Public read seo images"
    on storage.objects
    for select
    using (bucket_id = 'seo-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated upload seo images'
  ) then
    create policy "Authenticated upload seo images"
    on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'seo-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated update seo images'
  ) then
    create policy "Authenticated update seo images"
    on storage.objects
    for update
    to authenticated
    using (bucket_id = 'seo-images')
    with check (bucket_id = 'seo-images');
  end if;
end $$;
