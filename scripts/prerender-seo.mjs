import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteName = "SKAY GAMES";
const brandName = "SKAY GAMES Paraguay";
const siteUrl = "https://www.skaygames.com.py";
const today = new Date().toISOString().slice(0, 10);
const defaultSeoImage = `${siteUrl}/og-skay-games.svg`;
const DIGITAL_OFFERS_PAGE_ID = "juegos-digitales-oferta";
const RECHARGE_ROUTE_PREFIX = "recargas-servicios/";

const fallbackProducts = [
  {
    id: 1776704593089,
    name: "The last of us 2",
    price: "350000",
    category: "juegos",
    platform: "ps4",
    image: "https://i.imgur.com/NXSuqcR.jpeg",
    condition: "Nuevo",
    createdAt: "2026-04-20",
  },
  {
    id: 1776702219605,
    name: "God Of War",
    price: "150000",
    category: "juegos",
    platform: "ps4",
    image: "https://i.imgur.com/GHOGmmI.jpeg",
    description: "1",
    condition: "Nuevo",
    createdAt: "2026-04-20",
  },
  {
    id: 3,
    name: "God of War Ragnarok",
    price: "Consultar precio",
    category: "juegos",
    platform: "ps5",
    image: "https://i.imgur.com/h18c8aJ.jpeg",
    condition: "Nuevo",
    createdAt: "2026-04-20",
  },
];

const fallbackRechargeItems = [
  {
    id: 1,
    type: "recarga",
    name: "Free Fire",
    rechargeMethod: "via-id",
    image: "https://i.imgur.com/QLBhjxz.png",
    options: [
      { id: 1, label: "100 💎", price: "Gs. 10.000" },
      { id: 2, label: "310 💎", price: "Gs. 30.000" },
      { id: 3, label: "520 💎", price: "Gs. 50.000" },
      { id: 1776717350986.0034, label: "600 💎", price: "Gs. 60.000" },
    ],
  },
  {
    id: 2,
    type: "recarga",
    name: "Call of Duty Mobile",
    rechargeMethod: "via-id",
    image: "https://i.imgur.com/YRrshz6.png",
    options: [
      { id: 1, label: "80 CP", price: "Gs. 10.000" },
      { id: 2, label: "420 CP", price: "Gs. 35.000" },
      { id: 3, label: "880 CP", price: "Gs. 70.000" },
    ],
  },
  {
    id: 3,
    type: "streaming",
    name: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    options: [
      { id: 1, label: "Plan mensual", price: "Consultar" },
      { id: 2, label: "Cuenta compartida", price: "Consultar" },
    ],
  },
];

const pageSeo = {
  "/": {
    title: `${siteName} | Videojuegos, consolas y recargas en Paraguay`,
    description:
      "SKAY GAMES Paraguay - videojuegos, consolas, accesorios, recargas y servicios digitales.",
    image: defaultSeoImage,
    priority: "1.0",
  },
  "/juegos": {
    title: `Juegos PS4, PS5 y mas | ${brandName}`,
    description:
      "Encontrá juegos físicos y digitales para PS4, PS5 y otras plataformas en SKAY GAMES Paraguay. Revisá novedades, ofertas, usados y nuevos según stock.",
    image: "https://i.imgur.com/MlECLuE.jpeg",
    priority: "0.9",
  },
  "/consolas": {
    title: `Consolas en Paraguay | ${brandName}`,
    description:
      "Comprá consolas PlayStation, Xbox y otras opciones gamer en SKAY GAMES Paraguay. Consultá modelos nuevos o usados, stock, precio y combos disponibles.",
    image: "https://i.imgur.com/Uv1nMii.jpeg",
    priority: "0.9",
  },
  "/accesorios": {
    title: `Accesorios gamer | ${brandName}`,
    description:
      "Comprá accesorios gamer, controles, auriculares, cables, bases y repuestos para consolas en SKAY GAMES Paraguay. Consultá disponibilidad por WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
    priority: "0.9",
  },
  "/recargas-servicios": {
    title: `Recargas y servicios | ${brandName}`,
    description:
      "Recargas de juegos, diamantes, monedas, puntos y servicios digitales en SKAY GAMES Paraguay. Elegí el paquete, revisá precios y consultá por WhatsApp.",
    image: "https://i.imgur.com/LnLO32v.png",
    priority: "0.8",
  },
  [`/${DIGITAL_OFFERS_PAGE_ID}`]: {
    title: `Juegos digitales en oferta para PS4 y PS5 | ${brandName}`,
    description:
      "Encontrá juegos digitales para PS4 y PS5 a precios especiales en SKAY GAMES. Consultá las ofertas disponibles, el stock y las condiciones de entrega.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    priority: "0.8",
  },
};

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
    // Local builds can run without env files.
  }
};

const compactText = (value) => String(value || "").replace(/\s+/g, " ").trim();
const normalizeCatalogText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeScriptJson = (data) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

const parseSafePrice = (value) => {
  const text = String(value ?? "").trim();
  if (!text || /consultar|disponible|promo|combo|plan/i.test(text)) return null;
  const onlyDigits = text.replace(/[^\d]/g, "");
  return onlyDigits ? Number(onlyDigits) : null;
};

const normalizeCondition = (value) => {
  const text = String(value || "Nuevo").trim().toLowerCase();
  if (text.includes("usado")) return "Usado";
  if (text.includes("nuevo")) return "Nuevo";
  if (text.includes("disponible")) return "Nuevo";
  return value || "Nuevo";
};

const getProductFormat = (...values) => {
  const text = normalizeCatalogText(values.filter(Boolean).join(" "));
  if (text.includes("digital")) return "digital";
  if (text.includes("fisico") || text.includes("físico")) return "fisico";
  return "";
};

const getProductFormatLabel = (product = {}) => {
  const format = product.format || getProductFormat(product.rawCondition, product.condition, product.description, product.name);
  if (format === "digital") return "Digital";
  if (format === "fisico") return "Físico";
  return "";
};

const getComparableCategory = (category) => {
  const normalized = normalizeCatalogText(category).replace(/\s+/g, "-");
  if (["recargas", "servicios", "recargas-servicios", "recargas-y-servicios"].includes(normalized)) {
    return "recargas-servicios";
  }
  return normalized;
};

const getSeoCategoryName = (category) => {
  const labels = {
    juegos: "Juegos",
    consolas: "Consolas",
    accesorios: "Accesorios",
    "recargas-servicios": "Recargas y servicios",
    [DIGITAL_OFFERS_PAGE_ID]: "Juegos digitales en oferta",
  };
  return labels[getComparableCategory(category)] || labels[category] || "Productos";
};

const getProductRouteSlug = (product = {}) => {
  const idSlug = slugify(product.id || "producto");
  const platformOrCategory = product.platform || (product.category === "recargas-servicios" ? "recargas" : product.category || "producto");
  const textSlug = slugify([product.name, platformOrCategory].filter(Boolean).join(" "));
  return `${idSlug}-${textSlug || "producto"}`;
};

const hasProductOffer = (product = {}) => {
  const originalPrice = parseSafePrice(product.originalPrice);
  const currentPrice = parseSafePrice(product.price);
  if (originalPrice !== null && currentPrice !== null) return originalPrice > currentPrice;
  return Boolean(String(product.originalPrice || "").trim());
};

const isDigitalOfferProduct = (product = {}) => {
  const platform = normalizeCatalogText(product.platform);
  return (
    getComparableCategory(product.category) === "juegos" &&
    ["ps4", "ps5"].includes(platform) &&
    getProductFormatLabel(product) === "Digital" &&
    hasProductOffer(product)
  );
};

const getProductPlatformLabel = (product = {}) =>
  product.platform ? String(product.platform).toUpperCase() : "";

const getProductConditionLabel = (product = {}) =>
  normalizeCondition(product.condition || product.rawCondition || "Nuevo");

const getProductSeoPriceSentence = (product = {}) => {
  const numericPrice = parseSafePrice(product.price);
  if (numericPrice === null) return "Consultá precio y disponibilidad.";
  return `Precio: Gs. ${numericPrice.toLocaleString("es-PY")}. Consultá stock y disponibilidad.`;
};

const getProductAutomaticSeoText = (product = {}) => {
  const name = compactText(product.name) || "este producto";
  const category = getComparableCategory(product.category);
  const platform = getProductPlatformLabel(product);
  const state = getProductConditionLabel(product).toLowerCase();
  const formatLabel = getProductFormatLabel(product);
  const format = formatLabel.toLowerCase();
  const priceSentence = getProductSeoPriceSentence(product);

  if (isDigitalOfferProduct(product)) {
    const platformText = platform ? ` para ${platform}` : "";
    return compactText(
      `Comprá ${name}${platformText} en oferta digital en ${brandName}. Juego digital disponible según stock y condiciones. ${priceSentence}`
    );
  }

  if (category === "juegos") {
    const platformText = platform ? ` para ${platform}` : "";
    const details = [format ? `en formato ${format}` : "", state ? `en estado ${state}` : ""].filter(Boolean);
    const availabilityText = details.length ? `Disponible ${details.join(", ")}.` : "Disponible según stock.";
    return compactText(`Comprá ${name}${platformText} en ${brandName}. ${availabilityText} ${priceSentence}`);
  }

  if (category === "consolas") {
    return compactText(`Encontrá ${name} en ${brandName}. Consola ${state} disponible según stock. ${priceSentence}`);
  }

  if (category === "accesorios") {
    const platformText = platform ? ` para ${platform}` : "";
    return compactText(`Comprá ${name}${platformText} en ${brandName}. Accesorio gamer ${state} disponible según stock. ${priceSentence}`);
  }

  if (category === "recargas-servicios") {
    return compactText(`Solicitá ${name} en ${brandName}. Recarga o servicio digital rápido y seguro, disponible según las condiciones publicadas. ${priceSentence}`);
  }

  return compactText(`Consultá por ${name} en ${brandName}. ${priceSentence}`);
};

const getProductSeoTitle = (product = {}) => {
  const name = compactText(product.name) || "Producto";
  const platform = getProductPlatformLabel(product);
  const category = getComparableCategory(product.category);
  const condition = getProductConditionLabel(product);
  const formatLabel = getProductFormatLabel(product);

  if (isDigitalOfferProduct(product)) {
    return compactText(`${name}${platform ? ` ${platform}` : ""} | Juego digital en oferta | ${brandName}`);
  }

  if (category === "juegos") {
    const formatText = formatLabel ? `Juego ${formatLabel}` : "Juego";
    return compactText(`${name}${platform ? ` ${platform}` : ""} | ${formatText} | ${brandName}`);
  }

  if (category === "consolas") return compactText(`${name} | Consola ${condition} | ${brandName}`);
  if (category === "accesorios") return compactText(`${name}${platform ? ` ${platform}` : ""} | Accesorio gamer | ${brandName}`);
  if (category === "recargas-servicios") return compactText(`${name} | Recarga o servicio digital | ${brandName}`);
  return compactText(`${name} | ${getSeoCategoryName(category)} | ${brandName}`);
};

const getProductImageAlt = (product = {}) =>
  compactText([product.name, getProductPlatformLabel(product) || getSeoCategoryName(product.category)].filter(Boolean).join(" ")) ||
  "Producto SKAY GAMES";

const getPublicImageUrl = (image) => {
  const value = String(image || "").trim();
  if (!value) return defaultSeoImage;
  if (value.startsWith("data:image/")) return defaultSeoImage;
  if (value.startsWith("//")) return `https:${value}`;
  if (/^https?:\/\//i.test(value)) return value.replace(/^http:\/\//i, "https://");
  if (value.startsWith("/")) return `${siteUrl}${value}`;
  return `${siteUrl}/${value.replace(/^\/+/, "")}`;
};

const isPublicHttpImage = (image) => /^https?:\/\//i.test(String(image || "").trim());

const getProductSeoImageUrl = (product = {}) => {
  const explicitSeoImage = product.seoImageUrl || product.publicImageUrl || product.seo_image_url || product.public_image_url;
  if (isPublicHttpImage(explicitSeoImage)) return getPublicImageUrl(explicitSeoImage);
  if (isPublicHttpImage(product.image)) return getPublicImageUrl(product.image);
  return defaultSeoImage;
};

const getCanonicalUrl = (route = "/") => `${siteUrl}${route.startsWith("/") ? route : `/${route}`}`;

const getRechargeMethodValue = (item = {}) => {
  const rawMethod = normalizeCatalogText(item.rechargeMethod || item.method || item.via || "");
  if (rawMethod.includes("cuenta")) return "via-cuenta";
  if (rawMethod.includes("id")) return "via-id";
  return "";
};

const getRechargeMethodLabel = (item = {}) => {
  const method = getRechargeMethodValue(item);
  if (method === "via-id") return "Vía ID";
  if (method === "via-cuenta") return "Vía cuenta";
  return "";
};

const getRechargeMethodSeoText = (item = {}) => {
  const label = getRechargeMethodLabel(item);
  return label ? label.toLowerCase() : "";
};

const getRechargeTypeLabel = (type) => (type === "streaming" ? "Streaming" : "Recarga");
const getRechargeItemRouteSlug = (item = {}) => slugify(item.slug || item.name) || slugify(item.id || "servicio");
const getRechargeOptionSlugText = (option = {}) =>
  String(option.slug || option.label || option.id || "opcion")
    .replace(/💎/g, " diamantes ")
    .replace(/\bdiamante\b/gi, "diamantes");
const getRechargeOptionRouteSlug = (option = {}) => slugify(getRechargeOptionSlugText(option)) || slugify(option.id || "opcion");
const getRechargeOptionImage = (item = {}) => item.optionImage || item.priceImage || item.image || "";

const getRechargeSeoTitle = (item = {}) => {
  const typeLabel = getRechargeTypeLabel(item.type).toLowerCase();
  const methodText = getRechargeMethodSeoText(item);
  const methodSuffix = methodText ? ` ${methodText}` : "";
  return `${typeLabel === "streaming" ? "Servicio" : "Recarga"} ${item.name || "digital"}${methodSuffix} en ${brandName}`;
};

const getRechargeSeoDescription = (item = {}) => {
  if (compactText(item.description)) return compactText(item.description);
  const name = compactText(item.name) || "este servicio";
  if (item.type === "streaming") {
    return compactText(`Consultá planes de ${name} en ${brandName}. Servicio digital disponible según condiciones, con atención directa por WhatsApp.`);
  }
  const methodText = getRechargeMethodSeoText(item);
  const methodSentence = methodText ? ` Modalidad: ${methodText}.` : "";
  return compactText(`Recargá ${name} en ${brandName}.${methodSentence} Elegí el paquete disponible, verificá precio y solicitá la recarga de forma rápida por WhatsApp.`);
};

const getRechargeOptionTitle = (item = {}, option = {}) => {
  const name = compactText(item.name) || "servicio";
  const optionLabel = compactText(option.label) || "opción";
  const methodText = getRechargeMethodSeoText(item);
  const methodSuffix = methodText ? ` ${methodText}` : "";
  return item.type === "streaming" ? `${name} - ${optionLabel}` : `Recarga ${name} ${optionLabel}${methodSuffix}`;
};

const getRechargeOptionSeoText = (item = {}, option = {}) => {
  if (compactText(option.description)) return compactText(option.description);
  const title = getRechargeOptionTitle(item, option);
  const price = compactText(option.price);
  const priceText = price ? ` Precio: ${price}.` : "";
  const actionText =
    item.type === "streaming"
      ? "Consultá disponibilidad, condiciones del servicio y activación por WhatsApp."
      : "Consultá disponibilidad y pedí la recarga por WhatsApp.";
  return compactText(`${title} disponible en ${brandName}.${priceText} ${actionText}`);
};

const buildOfferSchema = (price, url) => {
  const priceValue = parseSafePrice(price);
  const offer = {
    "@type": "Offer",
    url,
    priceCurrency: "PYG",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: siteName },
  };
  if (priceValue !== null) offer.price = priceValue;
  return offer;
};

const buildProductStructuredData = (product, url) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name || "Producto SKAY GAMES",
  description: getProductAutomaticSeoText(product),
  image: [getProductSeoImageUrl(product)],
  brand: { "@type": "Brand", name: siteName },
  category: getSeoCategoryName(product.category),
  offers: buildOfferSchema(product.price, url),
});

const buildRechargeStructuredData = (item, option, url) => {
  const title = option ? getRechargeOptionTitle(item, option) : getRechargeSeoTitle(item);
  const description = option ? getRechargeOptionSeoText(item, option) : getRechargeSeoDescription(item);
  const image = option ? getRechargeOptionImage(item) : item?.image;
  const price = option?.price || item?.price || "";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: [getPublicImageUrl(image)],
    brand: { "@type": "Brand", name: siteName },
    category: item?.type === "streaming" ? "Servicios digitales" : "Recargas",
    offers: buildOfferSchema(price, url),
  };
};

const buildBreadcrumbStructuredData = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: getCanonicalUrl(item.path || "/"),
  })),
});

const mapSupabaseProduct = (item) => ({
  id: item.id,
  name: item.nombre || "Sin nombre",
  price: item.precio != null ? String(item.precio) : "Consultar precio",
  category: (item.categoria || "juegos").toLowerCase(),
  platform: item.plataforma ? String(item.plataforma).toLowerCase() : undefined,
  image: item.imagen || defaultSeoImage,
  seoImageUrl: item.seo_image_url || item.public_image_url || "",
  publicImageUrl: item.public_image_url || item.seo_image_url || "",
  description: item.descripcion || "",
  condition: normalizeCondition(item.condicion || "Nuevo"),
  rawCondition: item.condicion || "Nuevo",
  format: getProductFormat(item.formato, item.tipo, item.formato_producto, item.tipo_producto, item.condicion, item.descripcion, item.nombre),
  originalPrice: item.precio_anterior != null ? String(item.precio_anterior) : "",
  createdAt: item.created_at ? String(item.created_at).slice(0, 10) : today,
  updatedAt: item.updated_at ? String(item.updated_at).slice(0, 10) : "",
});

const parseWebContentValue = (value, fallback) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
};

const fetchSupabaseJson = async (pathAndQuery) => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${pathAndQuery}`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

const loadProducts = async () => {
  try {
    const rows = await fetchSupabaseJson("productos?select=*&activo=eq.true&order=id.desc");
    if (Array.isArray(rows) && rows.length) {
      console.log(`[seo] Productos cargados desde Supabase: ${rows.length}`);
      return rows.map(mapSupabaseProduct);
    }
  } catch (error) {
    console.warn(`[seo] No se pudieron cargar productos desde Supabase: ${error.message}`);
  }

  console.warn("[seo] Usando productos base para prerender local.");
  return fallbackProducts;
};

const loadRechargeItems = async () => {
  try {
    const rows = await fetchSupabaseJson("web_content?select=clave,valor&clave=in.(rechargeItems)");
    const rechargeRow = Array.isArray(rows) ? rows.find((row) => row.clave === "rechargeItems") : null;
    const parsed = parseWebContentValue(rechargeRow?.valor, null);
    if (Array.isArray(parsed) && parsed.length) {
      console.log(`[seo] Recargas cargadas desde Supabase: ${parsed.length}`);
      return parsed;
    }
  } catch (error) {
    console.warn(`[seo] No se pudieron cargar recargas desde Supabase: ${error.message}`);
  }

  return fallbackRechargeItems;
};

const buildHeadTags = ({ title, description, canonicalUrl, image, type = "website", primarySchema, breadcrumbSchema }) => {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(compactText(description).slice(0, 220));
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeImage = escapeHtml(getPublicImageUrl(image));

  return [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${safeDescription}" />`,
    `<link rel="canonical" href="${safeCanonical}" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDescription}" />`,
    `<meta property="og:image" content="${safeImage}" />`,
    `<meta property="og:url" content="${safeCanonical}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDescription}" />`,
    `<meta name="twitter:image" content="${safeImage}" />`,
    `<script type="application/ld+json" id="skay-primary-schema">${escapeScriptJson(primarySchema)}</script>`,
    `<script type="application/ld+json" id="skay-breadcrumb-schema">${escapeScriptJson(breadcrumbSchema)}</script>`,
  ].join("\n    ");
};

const buildNoscriptContent = ({ title, description, image, alt, breadcrumbs = [] }) => `
    <noscript>
      <main>
        <nav>${breadcrumbs.map((item) => escapeHtml(item.label)).join(" / ")}</nav>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
        <img src="${escapeHtml(getPublicImageUrl(image))}" alt="${escapeHtml(alt || title)}" />
      </main>
    </noscript>`;

const injectSeo = (baseHtml, seo) => {
  const headTags = buildHeadTags(seo);
  const htmlWithHead = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, headTags);
  return htmlWithHead.replace(
    /<div id="root"><\/div>/i,
    `${buildNoscriptContent(seo)}\n    <div id="root"></div>`
  );
};

const writeRouteHtml = async (route, html) => {
  const cleanRoute = route === "/" ? "" : route.replace(/^\/+|\/+$/g, "");
  if (!cleanRoute) {
    await fs.writeFile(path.join(distDir, "index.html"), html, "utf8");
    return;
  }

  const nestedPath = path.join(distDir, cleanRoute, "index.html");
  await fs.mkdir(path.dirname(nestedPath), { recursive: true });
  await fs.writeFile(nestedPath, html, "utf8");

  const htmlPath = path.join(distDir, `${cleanRoute}.html`);
  await fs.mkdir(path.dirname(htmlPath), { recursive: true });
  await fs.writeFile(htmlPath, html, "utf8");
};

const buildWebPageSchema = (title, description, canonicalUrl) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: canonicalUrl,
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
});

const makeBreadcrumbs = (...items) => [{ label: "Inicio", path: "/" }, ...items];

const getProductBreadcrumbs = (product, route) => {
  const category = getComparableCategory(product.category);
  const platform = getProductPlatformLabel(product);
  return makeBreadcrumbs(
    { label: getSeoCategoryName(category), path: `/${category}` },
    ...(platform ? [{ label: platform, path: `/${category}` }] : []),
    { label: product.name || "Producto", path: route }
  );
};

const getRechargeBreadcrumbs = (item, option, route) =>
  makeBreadcrumbs(
    { label: "Recargas y servicios", path: "/recargas-servicios" },
    { label: item.name || "Servicio", path: `/${RECHARGE_ROUTE_PREFIX}${getRechargeItemRouteSlug(item)}` },
    ...(option ? [{ label: compactText(option.label) || "Opción", path: route }] : [])
  );

const buildSitemap = (entries) => {
  const uniqueEntries = Array.from(new Map(entries.map((entry) => [entry.loc, entry])).values());
  return `<?xml version="1.0" encoding="UTF-8"?>\n\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueEntries
    .map(
      (entry) => `
  <url>
    <loc>${escapeHtml(entry.loc)}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <priority>${entry.priority || "0.7"}</priority>
  </url>`
    )
    .join("\n")}\n\n</urlset>\n`;
};

const main = async () => {
  await loadEnvFile(".env");
  await loadEnvFile(".env.local");
  await loadEnvFile(".env.production");

  const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const products = await loadProducts();
  const rechargeItems = await loadRechargeItems();
  const sitemapEntries = [];
  const routes = [];

  for (const [route, seo] of Object.entries(pageSeo)) {
    const canonicalUrl = getCanonicalUrl(route);
    const breadcrumbs = route === "/" ? [{ label: "Inicio", path: "/" }] : makeBreadcrumbs({ label: seo.title.split("|")[0].trim(), path: route });
    routes.push({
      route,
      seo: {
        ...seo,
        canonicalUrl,
        type: "website",
        primarySchema: buildWebPageSchema(seo.title, seo.description, canonicalUrl),
        breadcrumbSchema: buildBreadcrumbStructuredData(breadcrumbs),
        breadcrumbs,
        alt: seo.title,
      },
    });
    sitemapEntries.push({ loc: canonicalUrl, priority: seo.priority, lastmod: today });
  }

  for (const product of products) {
    const route = `/producto/${getProductRouteSlug(product)}`;
    const canonicalUrl = getCanonicalUrl(route);
    const title = getProductSeoTitle(product);
    const description = getProductAutomaticSeoText(product);
    const breadcrumbs = getProductBreadcrumbs(product, route);
    routes.push({
      route,
      seo: {
        title,
        description,
        canonicalUrl,
        image: getProductSeoImageUrl(product),
        type: "product",
        primarySchema: buildProductStructuredData(product, canonicalUrl),
        breadcrumbSchema: buildBreadcrumbStructuredData(breadcrumbs),
        breadcrumbs,
        alt: getProductImageAlt(product),
      },
    });
    sitemapEntries.push({
      loc: canonicalUrl,
      priority: isDigitalOfferProduct(product) ? "0.78" : "0.72",
      lastmod: product.updatedAt || product.createdAt || today,
    });
  }

  for (const item of rechargeItems) {
    const itemRoute = `/${RECHARGE_ROUTE_PREFIX}${getRechargeItemRouteSlug(item)}`;
    const itemCanonicalUrl = getCanonicalUrl(itemRoute);
    const itemTitle = `${getRechargeSeoTitle(item)} | ${siteName}`;
    const itemDescription = getRechargeSeoDescription(item);
    const itemBreadcrumbs = getRechargeBreadcrumbs(item, null, itemRoute);
    routes.push({
      route: itemRoute,
      seo: {
        title: itemTitle,
        description: itemDescription,
        canonicalUrl: itemCanonicalUrl,
        image: item.image,
        type: "product",
        primarySchema: buildRechargeStructuredData(item, null, itemCanonicalUrl),
        breadcrumbSchema: buildBreadcrumbStructuredData(itemBreadcrumbs),
        breadcrumbs: itemBreadcrumbs,
        alt: `${item.name} ${getRechargeTypeLabel(item.type)}`,
      },
    });
    sitemapEntries.push({ loc: itemCanonicalUrl, priority: "0.7", lastmod: today });

    for (const option of item.options || []) {
      const optionRoute = `${itemRoute}/${getRechargeOptionRouteSlug(option)}`;
      const optionCanonicalUrl = getCanonicalUrl(optionRoute);
      const optionTitle = `${getRechargeOptionTitle(item, option)} | ${brandName}`;
      const optionDescription = getRechargeOptionSeoText(item, option);
      const optionBreadcrumbs = getRechargeBreadcrumbs(item, option, optionRoute);
      routes.push({
        route: optionRoute,
        seo: {
          title: optionTitle,
          description: optionDescription,
          canonicalUrl: optionCanonicalUrl,
          image: getRechargeOptionImage(item),
          type: "product",
          primarySchema: buildRechargeStructuredData(item, option, optionCanonicalUrl),
          breadcrumbSchema: buildBreadcrumbStructuredData(optionBreadcrumbs),
          breadcrumbs: optionBreadcrumbs,
          alt: optionTitle,
        },
      });
      sitemapEntries.push({ loc: optionCanonicalUrl, priority: "0.65", lastmod: today });
    }
  }

  const uniqueRoutes = Array.from(new Map(routes.map((item) => [item.route, item])).values());
  for (const { route, seo } of uniqueRoutes) {
    await writeRouteHtml(route, injectSeo(baseHtml, seo));
  }

  await fs.writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(sitemapEntries), "utf8");
  console.log(`[seo] HTML inicial generado para ${uniqueRoutes.length} rutas públicas.`);
};

main().catch((error) => {
  console.error("[seo] Error generando HTML SEO inicial:", error);
  process.exit(1);
});
