import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const bucketName = process.env.SEO_IMAGES_BUCKET || "seo-images";
const siteUrl = "https://www.skaygames.com.py";
const fallbackSeoImage = `${siteUrl}/og-skay-games.svg`;

const loadEnvFile = async (fileName) => {
  try {
    const content = await fs.readFile(path.join(rootDir, fileName), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // Optional env files.
  }
};

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isPublicHttpImage = (value) => /^https?:\/\//i.test(String(value || "").trim());
const isDataImage = (value) => String(value || "").trim().startsWith("data:image/");
const normalizePublicUrl = (value) => String(value || "").trim().replace(/^http:\/\//i, "https://");

const dataUrlToBuffer = (dataUrl) => {
  const match = String(dataUrl || "").match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) throw new Error("Formato data:image no valido.");
  const [, contentType, base64] = match;
  return {
    contentType,
    buffer: Buffer.from(base64, "base64"),
  };
};

const getExtension = (contentType) => {
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("png")) return "png";
  return "webp";
};

const updateSeoFields = async (supabase, productId, values) => {
  const { error } = await supabase
    .from("productos")
    .update({
      ...values,
      seo_image_migrated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) throw error;
};

const main = async () => {
  await loadEnvFile(".env");
  await loadEnvFile(".env.local");
  await loadEnvFile(".env.production");

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Faltan VITE_SUPABASE_URL y una key de Supabase para ejecutar el backfill.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data: products, error } = await supabase
    .from("productos")
    .select("id,nombre,imagen,seo_image_url,seo_image_migration_status,updated_at")
    .eq("activo", true)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron leer productos. Ejecuta primero supabase/seo-image-migration.sql. Detalle: ${error.message}`);
  }

  const backupDir = path.join(rootDir, "backups");
  await fs.mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupDir, `product-images-backup-${stamp}.json`);
  await fs.writeFile(
    backupPath,
    JSON.stringify(
      products.map((product) => ({
        id: product.id,
        nombre: product.nombre,
        imagen: product.imagen,
        seo_image_url: product.seo_image_url,
        seo_image_migration_status: product.seo_image_migration_status,
        updated_at: product.updated_at,
      })),
      null,
      2
    ),
    "utf8"
  );

  const summary = {
    total: products.length,
    alreadyPublic: 0,
    uploadedFromDataImage: 0,
    fallbackSeo: 0,
    unchangedVisualImages: products.length,
    backupPath,
    failed: [],
  };

  for (const product of products) {
    const visualImage = String(product.imagen || "").trim();

    try {
      if (isPublicHttpImage(visualImage)) {
        const publicUrl = normalizePublicUrl(visualImage);
        summary.alreadyPublic += 1;
        if (product.seo_image_url !== publicUrl) {
          await updateSeoFields(supabase, product.id, {
            seo_image_url: publicUrl,
            seo_image_migration_status: "public-url-reused",
          });
        }
        continue;
      }

      if (isDataImage(visualImage)) {
        const { buffer, contentType } = dataUrlToBuffer(visualImage);
        const extension = getExtension(contentType);
        const filePath = `productos/${slugify(product.nombre || "producto")}-${product.id}-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, buffer, {
            contentType,
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        const publicUrl = publicData?.publicUrl;
        if (!publicUrl) throw new Error("Supabase no devolvio publicUrl.");

        await updateSeoFields(supabase, product.id, {
          seo_image_url: publicUrl,
          seo_image_migration_status: "data-image-uploaded",
        });
        summary.uploadedFromDataImage += 1;
        continue;
      }

      summary.fallbackSeo += 1;
      await updateSeoFields(supabase, product.id, {
        seo_image_url: null,
        seo_image_migration_status: "fallback-seo-image",
      });
    } catch (migrationError) {
      summary.fallbackSeo += 1;
      summary.failed.push({
        id: product.id,
        nombre: product.nombre,
        reason: migrationError.message,
      });

      try {
        await updateSeoFields(supabase, product.id, {
          seo_image_url: null,
          seo_image_migration_status: `failed: ${migrationError.message}`.slice(0, 250),
        });
      } catch {
        // Keep going. The visual image was never modified.
      }
    }
  }

  const reportPath = path.join(backupDir, `seo-image-backfill-report-${stamp}.json`);
  await fs.writeFile(reportPath, JSON.stringify(summary, null, 2), "utf8");

  console.log("Backfill SEO de imagenes terminado.");
  console.log(`Productos con URL publica existente: ${summary.alreadyPublic}`);
  console.log(`Imagenes data:image publicadas correctamente: ${summary.uploadedFromDataImage}`);
  console.log(`Productos con fallback SEO temporal: ${summary.fallbackSeo}`);
  console.log(`Imagenes visuales modificadas: 0`);
  console.log(`Fallback SEO usado cuando hace falta: ${fallbackSeoImage}`);
  console.log(`Backup: ${backupPath}`);
  console.log(`Reporte: ${reportPath}`);
};

main().catch((error) => {
  console.error("Error en backfill SEO de imagenes:", error);
  process.exit(1);
});
