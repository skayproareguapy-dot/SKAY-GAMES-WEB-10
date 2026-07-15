-- SKAY GAMES - Fix permisos Storage para backfill SEO de imagenes
-- Ejecutar en Supabase SQL editor si scripts/backfill-seo-images.mjs falla con:
-- "new row violates row-level security policy" al subir al bucket seo-images.
--
-- No modifica public.productos.
-- No modifica productos.imagen.
-- Solo agrega permiso de INSERT para la anon key en el bucket seo-images,
-- limitado a archivos dentro de la carpeta productos/.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Anon backfill upload seo images'
  ) then
    create policy "Anon backfill upload seo images"
    on storage.objects
    for insert
    to anon
    with check (
      bucket_id = 'seo-images'
      and name like 'productos/%'
    );
  end if;
end $$;
