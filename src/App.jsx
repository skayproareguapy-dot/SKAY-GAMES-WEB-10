import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

export default function SkayGamesWeb() {
  const whatsappNumber = "595991224388";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  

  const heroSlides = [
  {
    "title": "⚡ RECARGAS DISPONIBLES",
    "subtitle": "Saldo, servicios y recargas para todos tus juegos. Consultá ahora.",
    "image": "https://i.imgur.com/LnLO32v.png",
    "buttonText": "Consultar recargas",
    "message": "Hola! Quiero consultar por recargas disponibles.",
    "imagePositionX": 50,
    "imagePositionY": 50
  },
  {
    "title": "🔥 YA DISPONIBLE",
    "subtitle": "Nuevos lanzamientos y novedades en juegos. Consultá lo último en SKAY GAMES.",
    "image": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1600&q=80",
    "buttonText": "Consultar lanzamiento",
    "message": "Hola! Quiero consultar por los juegos nuevos disponibles 🔥",
    "imagePositionX": 50,
    "imagePositionY": 50
  },
  {
    "title": "Juegos PS4 y PS5",
    "subtitle": "Encontrá títulos físicos y digitales para seguir jugando sin parar.",
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    "buttonText": "Consultar juegos",
    "message": "Hola! Quiero consultar por juegos disponibles para PS4 y PS5.",
    "imagePositionX": 50,
    "imagePositionY": 50
  },
  {
    "title": "Consolas nuevas y usadas",
    "subtitle": "PS3, PS4, PS5 y más opciones para todos los presupuestos.",
    "image": "https://i.imgur.com/V7IWjBe.jpeg",
    "buttonText": "Consultar consolas",
    "message": "Hola! Quiero consultar por consolas disponibles.",
    "imagePositionX": 50,
    "imagePositionY": 50
  }
];

  const categories = [
  {
    "id": "consolas",
    "title": "Consolas",
    "description": "PlayStation, Xbox, consolas nuevas y usadas, listas para jugar.",
    "image": "https://i.imgur.com/Uv1nMii.jpeg"
  },
  {
    "id": "juegos",
    "title": "Juegos",
    "description": "Juegos físicos y digitales para PS3, PS4, PS5 y otras plataformas.",
    "image": "https://i.imgur.com/MlECLuE.jpeg"
  },
  {
    "id": "accesorios",
    "title": "Accesorios",
    "description": "Mandos, auriculares, cables, bases, soportes y mucho más.",
    "image": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "id": "recargas-servicios",
    "title": "Recargas y servicios",
    "description": "Recargas para juegos y servicios digitales.",
    "image": "https://i.imgur.com/LnLO32v.png"
  }
];

  const gamePlatforms = [
    {
      id: "ps4",
      title: "Juegos PS4",
      description: "Catálogo de juegos para PlayStation 4 con títulos físicos y digitales.",
      image:
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1200&q=80",
      message: "Hola! Quiero consultar por juegos disponibles para PS4.",
    },
    {
      id: "ps5",
      title: "Juegos PS5",
      description: "Explorá juegos para PlayStation 5 y consultá por stock y precios.",
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
      message: "Hola! Quiero consultar por juegos disponibles para PS5.",
    },
  ];

  const accessoryPlatforms = [
    { id: "ps2", title: "Accesorios PS2" },
    { id: "ps3", title: "Accesorios PS3" },
    { id: "ps4", title: "Accesorios PS4" },
    { id: "ps5", title: "Accesorios PS5" },
    { id: "gamer", title: "Accesorios Gamer" },
  ];

  const comboSlides = [
  {
    "id": 1,
    "title": "Combo Accesorios PS2",
    "subtitle": "Armá tu combo ideal con mandos, cables y accesorios esenciales.",
    "image": "https://i.imgur.com/sVQ0Bkz.png",
    "message": "Hola! Quiero consultar por el combo de accesorios para PS2.",
    "imagePositionX": 50,
    "imagePositionY": 50
  },
  {
    "id": 2,
    "title": "Combo Mesa + Silla Gamer",
    "subtitle": "Mejorá tu espacio con un combo gamer completo para jugar cómodo.",
    "image": "https://images.unsplash.com/photo-1616588589676-62b3bd0d0b2f?auto=format&fit=crop&w=1600&q=80",
    "message": "Hola! Quiero consultar por el combo de mesa gamer + silla gamer.",
    "imagePositionX": 50,
    "imagePositionY": 50
  },
  {
    "id": 3,
    "title": "Combo PS4 + Juego + Control",
    "subtitle": "Llevate un combo listo para jugar desde el primer día.",
    "image": "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1600&q=80",
    "message": "Hola! Quiero consultar por el combo PS4 + juego + control.",
    "imagePositionX": 50,
    "imagePositionY": 50
  }
];

  const initialProducts = [
  {
    "id": 1776704593089,
    "name": "The last of us 2",
    "price": "350000",
    "category": "juegos",
    "platform": "ps4",
    "image": "https://i.imgur.com/NXSuqcR.jpeg",
    "condition": "Nuevo",
    "message": "Hola! Quiero consultar por The last of us 2.",
    "isFeatured": false,
    "createdAt": "2026-04-20"
  },
  {
    "id": 1776702219605,
    "name": "God Of War",
    "price": "150000",
    "category": "juegos",
    "platform": "ps4",
    "image": "https://i.imgur.com/GHOGmmI.jpeg",
    "description": "1",
    "message": "Hola! Quiero consultar por God Of War.",
    "isFeatured": false,
    "createdAt": "2026-04-20",
    "condition": "Nuevo"
  },
  {
    "id": 100,
    "name": "Recargas para todos los juegos",
    "price": "Disponible ahora",
    "category": "recargas-servicios",
    "image": "https://i.imgur.com/T7uvTyL.png",
    "message": "Hola! Quiero consultar por Recargas para todos los juegos.",
    "isFeatured": false,
    "createdAt": "2026-04-01"
  },
  {
    "id": 1,
    "name": "Joystick PS4",
    "price": "125.000",
    "category": "accesorios",
    "platform": "ps4",
    "image": "https://i.imgur.com/hBoVgOm.jpeg",
    "message": "Hola! Quiero consultar por Joystick PS4.",
    "isFeatured": true,
    "createdAt": "2026-04-20",
    "originalPrice": ""
  },
  {
    "id": 2,
    "name": "Auricular Gamer",
    "price": "Consultar precio",
    "category": "accesorios",
    "platform": "ps4",
    "image": "https://i.imgur.com/V7IWjBe.jpeg",
    "message": "Hola! Quiero consultar por Auricular Gamer.",
    "isFeatured": false,
    "createdAt": "2026-04-20"
  },
  {
    "id": 3,
    "name": "God of War Ragnarok",
    "price": "Consultar precio",
    "category": "juegos",
    "platform": "ps5",
    "image": "https://i.imgur.com/h18c8aJ.jpeg",
    "message": "Hola! Quiero consultar por God of War Ragnarok.",
    "isFeatured": true,
    "createdAt": "2026-04-20",
    "condition": "Nuevo"
  },
  {
    "id": 4,
    "name": "Consolas",
    "price": "Nuevas y usadas",
    "category": "consolas",
    "image": "https://i.imgur.com/Uv1nMii.jpeg",
    "message": "Hola! Quiero consultar por Consolas.",
    "isFeatured": false,
    "createdAt": "2026-04-01"
  },
  {
    "id": 5,
    "name": "Recargas para juegos",
    "price": "Promo disponible",
    "category": "recargas-servicios",
    "image": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1200&q=80",
    "message": "Hola! Quiero consultar por Recargas para juegos.",
    "isFeatured": false,
    "createdAt": "2026-04-01"
  },
  {
    "id": 6,
    "name": "Servicios streaming",
    "price": "Planes disponibles",
    "category": "recargas-servicios",
    "image": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80",
    "message": "Hola! Quiero consultar por Servicios streaming.",
    "isFeatured": false,
    "createdAt": "2026-04-01"
  },
  {
    "id": 7,
    "name": "Mando PS3",
    "price": "95.000",
    "category": "accesorios",
    "platform": "ps3",
    "image": "https://i.imgur.com/mPxekSH.png",
    "message": "Hola! Quiero consultar por Mando PS3.",
    "isFeatured": true,
    "createdAt": "2026-04-20",
    "originalPrice": "85.000"
  },
  {
    "id": 8,
    "name": "Combo PS4 + GTA V",
    "price": "Consultar combo",
    "category": "consolas",
    "image": "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
    "message": "Hola! Quiero consultar por Combo PS4 + GTA V.",
    "isFeatured": false,
    "createdAt": "2026-04-01"
  }
];

  const headerBackgrounds = [
  "https://i.imgur.com/31OfpU4.jpeg",
  "https://i.imgur.com/ViT4Fxr.jpeg",
  "https://i.imgur.com/L07oMdy.jpeg",
  "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=80"
];

  const services = [
    "Venta de consolas nuevas y usadas",
    "Venta de juegos físicos y digitales",
    "Accesorios y periféricos gamer",
    "Recargas para juegos",
    "Mantenimiento de consolas",
    "Reparación y soporte técnico",
  ];

  const createOfferDates = (durationHours = 12, startDate = new Date()) => {
    const start = new Date(startDate);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    return {
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      durationHours,
    };
  };

  const firstOfferDates = createOfferDates(12);
  const secondOfferDates = createOfferDates(12, new Date(new Date(firstOfferDates.endsAt).getTime()));
  const thirdOfferDates = createOfferDates(12, new Date(new Date(secondOfferDates.endsAt).getTime()));

  const defaultOffers = [
    {
      id: 1,
      title: "🔥 Oferta 1",
      subtitle: "Configurá el producto y elegí duración.",
      price: "Gs. 0",
      image: "https://i.imgur.com/msLP2KI.jpeg",
      backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
      backgroundPositionX: 50,
      backgroundPositionY: 50,
      imagePositionX: 50,
      imagePositionY: 50,
      ...firstOfferDates,
    },
    {
      id: 2,
      title: "🔥 Oferta 2",
      subtitle: "Se activa automáticamente al terminar la oferta 1.",
      price: "Gs. 0",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1600&q=80",
      backgroundPositionX: 50,
      backgroundPositionY: 50,
      imagePositionX: 50,
      imagePositionY: 50,
      ...secondOfferDates,
    },
    {
      id: 3,
      title: "🔥 Oferta 3",
      subtitle: "Se activa automáticamente al terminar la oferta 2.",
      price: "Gs. 0",
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1200&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
      backgroundPositionX: 50,
      backgroundPositionY: 50,
      imagePositionX: 50,
      imagePositionY: 50,
      ...thirdOfferDates,
    },
  ];

  const adminSections = [
    { id: "mercaderias", title: "Mercaderías", description: "Agregar, editar y ordenar los productos visibles.", stats: ["Agregar", "Editar", "Eliminar", "Destacado / Recién llegado"] },
    { id: "contenido-web", title: "Contenido web", description: "Editar header, sliders, botones, textos y oferta.", stats: ["Header", "Sliders", "Botones", "Temporizador"] },
    { id: "combos", title: "Combos", description: "Editar los combos destacados del home.", stats: ["Imagen", "Título", "Texto", "Mensaje"] },
    { id: "recargas", title: "Recargas y streaming", description: "Configuración futura de recargas y planes.", stats: ["Servicio", "Lista", "Tipo", "Activo"] },
    { id: "respaldo", title: "Respaldo y restauración", description: "Exportar e importar copias de seguridad.", stats: ["Exportar", "Importar", "Último backup", "Restaurar"] },
  ];

  const WEB_CONTENT_TABLE = "web_content";

  const defaultRechargeItems = [
    {
      id: 1,
      type: "recarga",
      name: "Free Fire",
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

  const normalizeOffers = (offers = []) =>
    offers.map((offer, index) => ({
      ...offer,
      image:
        offer.image ||
        defaultOffers[index]?.image ||
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
      backgroundImage:
        offer.backgroundImage ||
        defaultOffers[index]?.backgroundImage ||
        offer.image ||
        defaultOffers[index]?.image ||
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
      imagePositionX: offer.imagePositionX ?? defaultOffers[index]?.imagePositionX ?? 50,
      imagePositionY: offer.imagePositionY ?? defaultOffers[index]?.imagePositionY ?? 50,
      backgroundPositionX: offer.backgroundPositionX ?? defaultOffers[index]?.backgroundPositionX ?? 50,
      backgroundPositionY: offer.backgroundPositionY ?? defaultOffers[index]?.backgroundPositionY ?? 50,
    }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentComboSlide, setCurrentComboSlide] = useState(0);
  const [selectedGamePlatform, setSelectedGamePlatform] = useState("all");
  const [selectedGameCondition, setSelectedGameCondition] = useState("all");
  const [selectedAccessoryPlatform, setSelectedAccessoryPlatform] = useState("all");
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [headerBackgroundIndex, setHeaderBackgroundIndex] = useState(0);
  const [rechargeFilter, setRechargeFilter] = useState("all");
  const [selectedRechargeItem, setSelectedRechargeItem] = useState(null);
  const [activeAdminSection, setActiveAdminSection] = useState("mercaderias");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [savedOffers, setSavedOffers] = useState(defaultOffers);
  const [draftOffers, setDraftOffers] = useState(defaultOffers);
  const [offerCountdown, setOfferCountdown] = useState("");
  const [contentSaveMessage, setContentSaveMessage] = useState("");
  const [comboSaveMessage, setComboSaveMessage] = useState("");
  const [offerSaveMessage, setOfferSaveMessage] = useState("");
  const [editableHeroSlides, setEditableHeroSlides] = useState(heroSlides);
  const [editableCategories, setEditableCategories] = useState(categories);
  const [editableHeaderBackgrounds, setEditableHeaderBackgrounds] = useState(headerBackgrounds);
  const [editableComboSlides, setEditableComboSlides] = useState(comboSlides);
  const [draftHeroSlides, setDraftHeroSlides] = useState(heroSlides);
  const [draftCategories, setDraftCategories] = useState(categories);
  const [draftHeaderBackgrounds, setDraftHeaderBackgrounds] = useState(headerBackgrounds);
  const [draftComboSlides, setDraftComboSlides] = useState(comboSlides);
  const [editableGamePlatforms, setEditableGamePlatforms] = useState(gamePlatforms);
  const [draftGamePlatforms, setDraftGamePlatforms] = useState(gamePlatforms);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("juegos");
  const [newProductPlatform, setNewProductPlatform] = useState("ps4");
  const [newProductCondition, setNewProductCondition] = useState("Nuevo");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductFeatured, setNewProductFeatured] = useState(false);
  const [newProductRecent, setNewProductRecent] = useState(true);
  const [productFormMessage, setProductFormMessage] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editableRechargeItems, setEditableRechargeItems] = useState(defaultRechargeItems);
  const [newRechargeName, setNewRechargeName] = useState("");
  const [newRechargeImage, setNewRechargeImage] = useState("");
  const [newRechargeType, setNewRechargeType] = useState("recarga");
  const [newRechargeOptions, setNewRechargeOptions] = useState([{ id: Date.now(), label: "", price: "" }]);
  const [rechargeFormMessage, setRechargeFormMessage] = useState("");
  const [editingRechargeId, setEditingRechargeId] = useState(null);

  const getPageFromHash = () => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#/", "").trim();
    return hash || "home";
  };

  const [activePage, setActivePage] = useState(getPageFromHash());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState(initialProducts);

  const navigateTo = (page) => {
    if (page !== "admin") setAdminLoginError("");
    const nextHash = page === "home" ? "#/" : `#/${page}`;
    window.location.hash = nextHash;
    setActivePage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % editableHeroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [editableHeroSlides.length]);

  useEffect(() => {
    const comboInterval = setInterval(() => {
      setCurrentComboSlide((prev) => (prev + 1) % editableComboSlides.length);
    }, 3000);
    return () => clearInterval(comboInterval);
  }, [editableComboSlides.length]);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const normalizeCondition = (value) => {
    const text = String(value || "Nuevo").trim().toLowerCase();
    if (text.includes("usado")) return "Usado";
    if (text.includes("nuevo")) return "Nuevo";
    if (text.includes("disponible")) return "Nuevo";
    return value || "Nuevo";
  };

  const mapSupabaseProduct = (item) => ({
    id: item.id,
    name: item.nombre || "Sin nombre",
    price: item.precio != null ? String(item.precio) : "Consultar precio",
    category: (item.categoria || "juegos").toLowerCase(),
    platform: item.plataforma ? String(item.plataforma).toLowerCase() : undefined,
    image: item.imagen || "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
    description: item.descripcion || "",
    message: `Hola! Quiero consultar por ${item.nombre || "este producto"}.`,
    isFeatured: Boolean(item.featured ?? item.destacado),
    isRecent: Boolean(item.recent),
    createdAt: item.created_at ? String(item.created_at).slice(0, 10) : new Date().toISOString().slice(0, 10),
    originalPrice: item.precio_anterior != null ? String(item.precio_anterior) : "",
    condition: normalizeCondition(item.condicion || "Nuevo"),
    stock: item.stock ?? 0,
  });

  const parseNumericPrice = (value) => {
    const onlyDigits = String(value ?? "").replace(/[^\d]/g, "");
    return onlyDigits ? Number(onlyDigits) : null;
  };

  const loadProductsFromSupabase = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("activo", true)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error cargando productos desde Supabase:", error);
        return;
      }

      if (Array.isArray(data)) {
        setProductsData(data.map(mapSupabaseProduct));
      }
    } catch (err) {
      console.error("Error inesperado con Supabase:", err);
    }
  };

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

  const applyWebContentFromRemote = (rows = []) => {
    const byKey = Object.fromEntries(
      rows
        .filter((row) => row?.clave)
        .map((row) => [row.clave, parseWebContentValue(row.valor, null)])
    );

    if (Array.isArray(byKey.heroSlides)) {
      setEditableHeroSlides(byKey.heroSlides);
      setDraftHeroSlides(byKey.heroSlides);
    }

    if (Array.isArray(byKey.categories)) {
      setEditableCategories(byKey.categories);
      setDraftCategories(byKey.categories);
    }

    if (Array.isArray(byKey.headerBackgrounds)) {
      setEditableHeaderBackgrounds(byKey.headerBackgrounds);
      setDraftHeaderBackgrounds(byKey.headerBackgrounds);
    }

    if (Array.isArray(byKey.comboSlides)) {
      setEditableComboSlides(byKey.comboSlides);
      setDraftComboSlides(byKey.comboSlides);
    }

    if (Array.isArray(byKey.gamePlatforms)) {
      setEditableGamePlatforms(byKey.gamePlatforms);
      setDraftGamePlatforms(byKey.gamePlatforms);
    }

    if (Array.isArray(byKey.offers)) {
      const normalized = normalizeOffers(byKey.offers);
      setSavedOffers(normalized);
      setDraftOffers(normalized);
    }

    if (Array.isArray(byKey.rechargeItems)) {
      setEditableRechargeItems(byKey.rechargeItems);
    }
  };

  const loadWebContentFromSupabase = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from(WEB_CONTENT_TABLE)
        .select("clave, valor");

      if (error) {
        console.error("Error cargando contenido web desde Supabase:", error);
        return;
      }

      if (Array.isArray(data) && data.length > 0) {
        applyWebContentFromRemote(data);
      }
    } catch (err) {
      console.error("Error inesperado cargando contenido web:", err);
    }
  };

  const saveWebContentToSupabase = async (clave, valor) => {
    if (!supabase) {
      return { ok: false, message: "Supabase no está configurado." };
    }

    try {
      const payload = typeof valor === "string" ? valor : JSON.stringify(valor);

      const { error } = await supabase
        .from(WEB_CONTENT_TABLE)
        .upsert(
          [{ clave, valor: payload, updated_at: new Date().toISOString() }],
          { onConflict: "clave" }
        );

      if (error) {
        console.error(`Error guardando ${clave} en Supabase:`, error);
        return { ok: false, message: `No se pudo guardar ${clave} en Supabase.` };
      }

      return { ok: true };
    } catch (err) {
      console.error(`Error inesperado guardando ${clave}:`, err);
      return { ok: false, message: `Ocurrió un error guardando ${clave}.` };
    }
  };

  const deleteWebContentFromSupabase = async (clave) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from(WEB_CONTENT_TABLE)
        .delete()
        .eq("clave", clave);

      if (error) {
        console.error(`Error eliminando ${clave} de Supabase:`, error);
      }
    } catch (err) {
      console.error(`Error inesperado eliminando ${clave}:`, err);
    }
  };

  useEffect(() => {
    loadProductsFromSupabase();
    loadWebContentFromSupabase();
  }, []);

  const getActiveOffer = (offers) => {
    const now = Date.now();
    return (
      offers.find((offer) => {
        const start = new Date(offer.startsAt).getTime();
        const end = new Date(offer.endsAt).getTime();
        return !Number.isNaN(start) && !Number.isNaN(end) && now >= start && now < end;
      }) || null
    );
  };

  const activeOffer = getActiveOffer(savedOffers);
  const displayOffer = activeOffer || savedOffers[0] || null;

  const formatCountdown = (diff) => {
    if (diff <= 0) return "Finalizada";

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s restantes`;
    }

    return `${minutes}m ${seconds}s restantes`;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const active = getActiveOffer(savedOffers);

      if (active) {
        const end = new Date(active.endsAt).getTime();
        setOfferCountdown(formatCountdown(end - Date.now()));
        return;
      }

      setOfferCountdown("Sin oferta activa");
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [savedOffers]);

  useEffect(() => {
    const handleScroll = () => {
      const nextIndex = Math.min(editableHeaderBackgrounds.length - 1, Math.floor(window.scrollY / 500));
      setHeaderBackgroundIndex(nextIndex);
      setIsHeaderCompact(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [editableHeaderBackgrounds.length]);

  const formatDisplayPrice = (value) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (/^[0-9]+$/.test(text)) return Number(text).toLocaleString("es-PY");
    return text;
  };

  const getImagePositionStyle = (item, prefix = "image") => {
    const x = item?.[`${prefix}PositionX`] ?? 50;
    const y = item?.[`${prefix}PositionY`] ?? 50;
    return { objectPosition: `${x}% ${y}%` };
  };

  const ImagePositionControls = ({ label = "Posición de imagen", item, onChange, prefix = "image" }) => {
    const xKey = `${prefix}PositionX`;
    const yKey = `${prefix}PositionY`;
    const x = item?.[xKey] ?? 50;
    const y = item?.[yKey] ?? 50;

    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:col-span-2">
        <div className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">{label}</div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-bold text-white/65">
            Horizontal: {x}%
            <input
              type="range"
              min="0"
              max="100"
              value={x}
              onChange={(e) => onChange(xKey, Number(e.target.value))}
              className="mt-2 w-full accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/35">
              <span>Izq.</span><span>Centro</span><span>Der.</span>
            </div>
          </label>
          <label className="text-xs font-bold text-white/65">
            Vertical: {y}%
            <input
              type="range"
              min="0"
              max="100"
              value={y}
              onChange={(e) => onChange(yKey, Number(e.target.value))}
              className="mt-2 w-full accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/35">
              <span>Arriba</span><span>Centro</span><span>Abajo</span>
            </div>
          </label>
        </div>
        <div className="mt-3 text-xs text-white/45">
          Mové la imagen dentro del área sin cambiar el contador ni la estructura.
        </div>
      </div>
    );
  };

  const pageContent = useMemo(() => {
    const pages = {
      consolas: {
        title: "Consolas",
        subtitle: "Modelos nuevos y usados, listos para jugar.",
        description: "Explorá las consolas disponibles en SKAY GAMES y consultá por stock, precio y combos por WhatsApp.",
      },
      juegos: {
        title: "Juegos",
        subtitle: "Físicos y digitales para varias plataformas.",
        description: "Descubrí títulos disponibles para PS3, PS4 y PS5.",
      },
      accesorios: {
        title: "Accesorios",
        subtitle: "Mandos, auriculares, cables y más.",
        description: "Equipá tu setup con accesorios gamer y consultá rápido por disponibilidad.",
      },
      "recargas-servicios": {
        title: "Recargas y servicios",
        subtitle: "Recargas y servicios digitales.",
        description: "Consultá por recargas para juegos y plataformas de streaming.",
      },
    };
    return pages[activePage] ?? null;
  }, [activePage]);

  const featuredProducts = productsData
    .filter((product) => product.isFeatured || product.featured)
    .slice(0, 4);
  const latestProducts = [...productsData]
    .filter(
      (product) =>
        ["juegos", "consolas", "accesorios"].includes(product.category) &&
        (product.isRecent || product.recent)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const productsToShow =
    activePage === "home"
      ? featuredProducts
      : productsData.filter((product) => {
          if (product.category !== activePage) return false;
          if (activePage === "juegos") {
            const matchesPlatform = selectedGamePlatform === "all" || product.platform === selectedGamePlatform;
            const productCondition = normalizeCondition(product.condition);
            const matchesCondition = selectedGameCondition === "all" || productCondition.toLowerCase() === selectedGameCondition;
            return matchesPlatform && matchesCondition;
          }
          if (activePage === "accesorios") {
            if (selectedAccessoryPlatform === "all") return true;
            return product.platform === selectedAccessoryPlatform;
          }
          return true;
        });

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const renderProductDetailModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm" onClick={closeProductDetail}>
        <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950 via-black to-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={closeProductDetail}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Cerrar
          </button>

          <div className="grid gap-0 lg:grid-cols-[420px_1fr]">
            <div className="flex items-center justify-center bg-black p-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-[420px] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>

            <div className="p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProduct.category && (
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">
                    {selectedProduct.category}
                  </span>
                )}
                {selectedProduct.platform && (
                  <span className="rounded-full border border-purple-400/20 bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-300">
                    {selectedProduct.platform.toUpperCase()}
                  </span>
                )}
                {selectedProduct.category === "juegos" && selectedProduct.condition && (
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${normalizeCondition(selectedProduct.condition) === "Nuevo" ? "border-emerald-400/25 bg-emerald-500/15 text-emerald-300" : "border-amber-400/25 bg-amber-500/15 text-amber-300"}`}>
                    {normalizeCondition(selectedProduct.condition)}
                  </span>
                )}
              </div>

              <h3 className="text-3xl font-black md:text-4xl">{selectedProduct.name}</h3>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                {selectedProduct.originalPrice && (
                  <p className="text-lg font-bold text-white/35 line-through">
                    {formatDisplayPrice(selectedProduct.originalPrice)}
                  </p>
                )}
                <p className="text-4xl font-extrabold tracking-tighter text-cyan-300">
                  {formatDisplayPrice(selectedProduct.price)}
                </p>
                {selectedProduct.originalPrice && (
                  <span className="rounded-full border border-red-400/20 bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">
                    OFERTA
                  </span>
                )}
              </div>

              <p className="mt-5 text-base leading-7 text-white/70">
                {selectedProduct.description || "Consultá por este producto para recibir todos los detalles, stock y disponibilidad."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(selectedProduct.message || `Hola! Quiero consultar por ${selectedProduct.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-green-500 px-6 py-4 font-bold text-black transition hover:scale-105"
                >
                  Pedir por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={closeProductDetail}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Seguir viendo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const productCardClass =
    "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-900 to-black shadow-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-400/25";

  const renderProductCard = (product, buttonLabel = "Pedir por WhatsApp") => (
    <div
      key={product.id ?? product.name}
      className={`${productCardClass} cursor-pointer`}
      onClick={() => openProductDetail(product)}
    >
      <div className="relative overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-contain bg-black p-4 transition duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80";
          }}
        />
      </div>
      <div className="p-5">
        <div className="mb-3 h-px w-full bg-gradient-to-r from-cyan-400/20 via-white/10 to-transparent" />
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-xl font-bold">{product.name}</h4>
          {product.platform && (
            <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-400/20">
              {product.platform.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-end gap-3">
          {product.originalPrice && (
            <p className="text-base font-bold text-white/40 line-through">
              {formatDisplayPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-3xl font-extrabold tracking-tighter text-cyan-300">
            {formatDisplayPrice(product.price)}
          </p>
          {product.originalPrice && (
            <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300 border border-red-400/20">
              OFERTA
            </span>
          )}
          {product.category === "juegos" && product.condition && (
            <span className={`rounded-full px-3 py-1 text-xs font-bold border ${normalizeCondition(product.condition) === "Nuevo" ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20" : "bg-amber-500/15 text-amber-300 border-amber-400/20"}`}>
              {normalizeCondition(product.condition)}
            </span>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center font-bold text-white/85 transition duration-300 hover:bg-white/10"
          >
            Ver detalles
          </button>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.message)}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block w-full rounded-2xl bg-green-500 px-4 py-3 text-center font-bold text-black transition duration-300 hover:scale-[1.03]"
          >
            {buttonLabel}
          </a>
        </div>
      </div>
    </div>
  );

  const renderGamesPlatformSelector = () => (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="text-3xl font-black md:text-4xl">Elegí tu categoría</h3>
          <p className="mt-3 text-white/65">Entrá directo al catálogo según consola y estado del juego.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedGamePlatform("all")}
            className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${
              selectedGamePlatform === "all"
                ? "border-cyan-400/50 bg-cyan-400 text-black"
                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            Todas las consolas
          </button>
          {[
            ["all", "Todos"],
            ["nuevo", "Juegos nuevos"],
            ["usado", "Juegos usados"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedGameCondition(value)}
              className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                selectedGameCondition === value
                  ? "border-emerald-400/50 bg-emerald-400 text-black"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {editableGamePlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setSelectedGamePlatform(platform.id)}
            className={`overflow-hidden rounded-3xl border text-left shadow-2xl transition hover:-translate-y-1 ${
              selectedGamePlatform === platform.id ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-white/5"
            }`}
          >
            <img src={platform.image} alt={platform.title} className="h-64 w-full object-contain bg-black p-4" />
            <div className="p-6">
              <div className="mb-3 inline-block rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">Consola</div>
              <h4 className="text-3xl font-black">{platform.title}</h4>
              <p className="mt-3 text-white/70">{platform.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  const renderRechargeServicesPage = () => {
    const recargas = editableRechargeItems.filter((item) => item.type === "recarga");
    const streaming = editableRechargeItems.filter((item) => item.type === "streaming");

    const renderOptionList = (item) => (
      <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <h5 className="text-sm font-bold uppercase tracking-tighter text-cyan-300">Opciones disponibles</h5>
        <div className="mt-3 grid gap-3">
          {item.options.map((option) => {
            const message = `Hola! Quiero ${item.name} - ${option.label} por ${option.price}.`;
            return (
              <div key={option.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{option.label}</div>
                    <div className="mt-1 text-sm text-cyan-300">{option.price}</div>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-bold text-black transition hover:scale-[1.02]"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

    const renderCard = (item, type) => (
      <div key={item.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-900 to-black shadow-2xl transition duration-300 hover:-translate-y-1">
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-black to-black">
          <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[11px] font-bold ${type === "recarga" ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/20" : "bg-purple-500/15 text-purple-300 border border-purple-400/20"}`}>
            {type === "recarga" ? "Entrega inmediata" : "Servicio digital"}
          </div>
          <div className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm">
            <img src={item.image} alt={item.name} className="h-16 w-auto object-contain mx-auto" />
          </div>
        </div>
        <div className="p-5">
          <div className="mb-3 h-px w-full bg-gradient-to-r from-cyan-400/20 via-white/10 to-transparent" />
          <div className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${type === "recarga" ? "bg-cyan-400/15 text-cyan-300" : "bg-purple-500/15 text-purple-300"}`}>
            {type === "recarga" ? "Recarga" : "Streaming"}
          </div>
          <h4 className="text-xl font-bold tracking-tighter">{item.name}</h4>
          <p className="mt-2 text-sm text-white/60">{type === "recarga" ? "Elegí una opción y pedila directo por WhatsApp." : "Elegí un plan y consultalo directo por WhatsApp."}</p>
          <button onClick={() => setSelectedRechargeItem(selectedRechargeItem === item.id ? null : item.id)} className={`mt-4 w-full rounded-xl px-4 py-3 font-bold text-black ${type === "recarga" ? "bg-cyan-400" : "bg-purple-400"}`}>
            {selectedRechargeItem === item.id ? "Ocultar opciones" : "Ver opciones"}
          </button>
          {selectedRechargeItem === item.id && renderOptionList(item)}
        </div>
      </div>
    );

    return (
      <>
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
            <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta: #/recargas-servicios</span>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">Recargas y servicios</h2>
            <p className="mt-4 text-xl text-white/75">Cada opción tiene su propio botón de WhatsApp.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-wrap gap-3">
            {[["all", "Todos"], ["recargas", "Recargas"], ["streaming", "Streaming"]].map(([value, label]) => (
              <button key={value} onClick={() => setRechargeFilter(value)} className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${rechargeFilter === value ? "border-cyan-400/50 bg-cyan-400 text-black" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>
        </section>
        {(rechargeFilter === "all" || rechargeFilter === "recargas") && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="mb-8">
              <h3 className="text-3xl font-black md:text-4xl">Recargas para juegos</h3>
              <p className="mt-3 text-white/65">Elegí exactamente la opción que querés y pedila directo.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{recargas.map((item) => renderCard(item, "recarga"))}</div>
          </section>
        )}
        {(rechargeFilter === "all" || rechargeFilter === "streaming") && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="mb-8">
              <h3 className="text-3xl font-black md:text-4xl">Servicios streaming</h3>
              <p className="mt-3 text-white/65">Cada plan se puede consultar directo por WhatsApp.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{streaming.map((item) => renderCard(item, "streaming"))}</div>
          </section>
        )}
      </>
    );
  };

  const renderAdminLoginPage = () => (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
          <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta privada: #/admin</span>
          <h2 className="mt-5 text-4xl font-black md:text-6xl">Acceso Admin</h2>
          <p className="mt-4 max-w-3xl text-xl text-white/75">Ingresá con tu correo y contraseña para administrar la web.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 shadow-2xl">
            <div className="mb-4 inline-block rounded-full bg-cyan-400/15 px-4 py-2 text-sm font-bold text-cyan-300">Área privada</div>
            <h3 className="text-3xl font-black md:text-4xl">Panel de control de SKAY GAMES</h3>
            <p className="mt-4 text-white/70">Desde acá vas a poder cargar productos, administrar recargas y respaldos.</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (adminEmail.trim().toLowerCase() === "admin@skaygames.com.py" && adminPassword === "SkayGames2026") {
              setIsAdminAuthenticated(true);
              setAdminLoginError("");
              setAdminPassword("");
              return;
            }
            setAdminLoginError("Correo o contraseña incorrectos.");
          }} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h3 className="text-3xl font-black">Iniciar sesión</h3>
            <div className="mt-8 grid gap-4">
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="admin@skaygames.com.py" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/35" />
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/35" />
              {adminLoginError && <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">{adminLoginError}</div>}
              <button type="submit" className="mt-2 rounded-2xl bg-cyan-400 px-6 py-4 font-black text-black">Ingresar al panel</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );

  const renderAdminPage = () => {
    const updateHeroSlide = (index, field, value) => {
      setDraftHeroSlides((prev) => prev.map((slide, i) => (i === index ? { ...slide, [field]: value } : slide)));
    };

    const updateCategory = (index, field, value) => {
      setDraftCategories((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    };

    const updateGamePlatform = (index, field, value) => {
      setDraftGamePlatforms((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    };

    const updateHeaderImage = (index, value) => {
      setDraftHeaderBackgrounds((prev) => prev.map((item, i) => (i === index ? value : item)));
    };

    const updateComboSlide = (index, field, value) => {
      setDraftComboSlides((prev) => prev.map((slide, i) => (i === index ? { ...slide, [field]: value } : slide)));
    };

    const updateDraftOffer = (index, field, value) => {
      setDraftOffers((prev) =>
        prev.map((offer, i) => {
          if (i !== index) return offer;

          if (field === "durationHours") {
            const durationHours = Number(value) || 12;
            const baseStart =
              i === 0
                ? new Date()
                : new Date(prev[i - 1]?.endsAt || new Date());

            const start = new Date(baseStart);
            const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

            return {
              ...offer,
              durationHours,
              startsAt: start.toISOString(),
              endsAt: end.toISOString(),
            };
          }

          return { ...offer, [field]: value };
        })
      );
    };

    const saveSingleHeaderImage = async (index) => {
      const next = editableHeaderBackgrounds.map((item, i) => (i === index ? draftHeaderBackgrounds[index] : item));
      setEditableHeaderBackgrounds(next);

      const result = await saveWebContentToSupabase("headerBackgrounds", next);
      setContentSaveMessage(
        result.ok
          ? `Imagen de header ${index + 1} guardada correctamente.`
          : result.message
      );
    };

    const saveSingleHeroSlide = async (index) => {
      const next = editableHeroSlides.map((slide, i) => (i === index ? draftHeroSlides[index] : slide));
      setEditableHeroSlides(next);

      const result = await saveWebContentToSupabase("heroSlides", next);
      setContentSaveMessage(
        result.ok
          ? `Slide ${index + 1} guardado correctamente.`
          : result.message
      );
    };

    const saveSingleCategory = async (index) => {
      const next = editableCategories.map((item, i) => (i === index ? draftCategories[index] : item));
      setEditableCategories(next);

      const result = await saveWebContentToSupabase("categories", next);
      setContentSaveMessage(
        result.ok
          ? `Botón ${index + 1} guardado correctamente.`
          : result.message
      );
    };

    const saveSingleGamePlatform = async (index) => {
      const next = editableGamePlatforms.map((item, i) => (i === index ? draftGamePlatforms[index] : item));
      setEditableGamePlatforms(next);

      const result = await saveWebContentToSupabase("gamePlatforms", next);
      setContentSaveMessage(
        result.ok
          ? `Subcategoría de juegos ${index + 1} guardada correctamente.`
          : result.message
      );
    };

    const saveCombos = async () => {
      setEditableComboSlides(draftComboSlides);

      const result = await saveWebContentToSupabase("comboSlides", draftComboSlides);
      setComboSaveMessage(result.ok ? "Combos guardados correctamente." : result.message);
    };

    const saveSingleOffer = async (index) => {
      const next = draftOffers.map((offer, i, arr) => {
        const durationHours = Number(offer.durationHours) || 12;

        const start =
          i === 0
            ? new Date()
            : new Date(arr[i - 1].endsAt);

        const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

        return {
          ...offer,
          backgroundImage: offer.backgroundImage || offer.image || defaultOffers[i]?.backgroundImage || defaultOffers[i]?.image || "",
          durationHours,
          startsAt: start.toISOString(),
          endsAt: end.toISOString(),
        };
      });

      setDraftOffers(next);
      setSavedOffers(next);

      const result = await saveWebContentToSupabase("offers", next);
      setOfferSaveMessage(
        result.ok
          ? `Oferta ${index + 1} guardada correctamente.`
          : result.message
      );
    };

    const resetEditableContent = async () => {
      setDraftHeroSlides(heroSlides);
      setDraftCategories(categories);
      setDraftHeaderBackgrounds(headerBackgrounds);
      setDraftComboSlides(comboSlides);
      setDraftGamePlatforms(gamePlatforms);
      setDraftOffers(defaultOffers);
      setEditableHeroSlides(heroSlides);
      setEditableCategories(categories);
      setEditableHeaderBackgrounds(headerBackgrounds);
      setEditableComboSlides(comboSlides);
      setEditableGamePlatforms(gamePlatforms);
      setSavedOffers(defaultOffers);

      await Promise.all([
        saveWebContentToSupabase("heroSlides", heroSlides),
        saveWebContentToSupabase("categories", categories),
        saveWebContentToSupabase("headerBackgrounds", headerBackgrounds),
        saveWebContentToSupabase("comboSlides", comboSlides),
        saveWebContentToSupabase("gamePlatforms", gamePlatforms),
        saveWebContentToSupabase("offers", defaultOffers),
      ]);

      setContentSaveMessage("Se restauró el contenido visual.");
      setComboSaveMessage("");
      setOfferSaveMessage("");
    };

        const handleAddOrUpdateProduct = async (e) => {
      e.preventDefault();
      if (!newProductName.trim() || !newProductPrice.trim()) {
        setProductFormMessage("Completá nombre y precio.");
        return;
      }

      if (!supabase) {
        setProductFormMessage("Supabase no está configurado.");
        return;
      }

      const categoria = newProductCategory;
      const usaPlataforma = ["juegos", "accesorios"].includes(categoria);

      const payloadBasico = {
        nombre: newProductName.trim(),
        precio: parseNumericPrice(newProductPrice) ?? 0,
        categoria,
        imagen: newProductImage.trim() || "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
        descripcion: "",
        stock: 0,
        activo: true,
        featured: newProductFeatured,
        recent: newProductRecent,
      };

      const payloadCompleto = {
        ...payloadBasico,
        plataforma: usaPlataforma ? newProductPlatform : null,
        precio_anterior: parseNumericPrice(newProductOriginalPrice),
        condicion: categoria === "juegos" ? newProductCondition : "Disponible",
      };

      try {
        let error = null;

        if (editingProductId) {
          let result = await supabase
            .from("productos")
            .update(payloadCompleto)
            .eq("id", editingProductId);

          error = result.error;

          if (error) {
            const fallback = await supabase
              .from("productos")
              .update(payloadBasico)
              .eq("id", editingProductId);
            error = fallback.error;
          }

          if (error) {
            console.error("Error actualizando producto:", error);
            setProductFormMessage("No se pudo actualizar en Supabase.");
            return;
          }

          setProductFormMessage("Producto actualizado correctamente.");
        } else {
          let result = await supabase
            .from("productos")
            .insert([payloadCompleto]);

          error = result.error;

          if (error) {
            const fallback = await supabase
              .from("productos")
              .insert([payloadBasico]);
            error = fallback.error;
          }

          if (error) {
            console.error("Error agregando producto:", error);
            setProductFormMessage("No se pudo guardar en Supabase.");
            return;
          }

          setProductFormMessage("Producto agregado correctamente.");
        }

        await loadProductsFromSupabase();
        setEditingProductId(null);
        setNewProductName("");
        setNewProductPrice("");
        setNewProductOriginalPrice("");
        setNewProductCategory("juegos");
        setNewProductPlatform("ps4");
        setNewProductCondition("Nuevo");
        setNewProductImage("");
        setNewProductFeatured(false);
        setNewProductRecent(true);
      } catch (err) {
        console.error("Error inesperado guardando producto:", err);
        setProductFormMessage("Ocurrió un error al guardar.");
      }
    };

    const handleEditProduct = (product) => {
      setEditingProductId(product.id);
      setNewProductName(product.name || "");
      setNewProductPrice(product.price || "");
      setNewProductOriginalPrice(product.originalPrice || "");
      setNewProductCategory(product.category || "juegos");
      setNewProductPlatform(product.platform || "ps4");
      setNewProductCondition(normalizeCondition(product.condition || "Nuevo"));
      setNewProductImage(product.image || "");
      setNewProductFeatured(!!product.isFeatured);
      setNewProductRecent(!!product.isRecent);
      setProductFormMessage("Editando producto. Guardá para actualizar.");
    };

        const handleDeleteProduct = async (id) => {
      if (!supabase) {
        setProductFormMessage("Supabase no está configurado.");
        return;
      }

      try {
        let result = await supabase
          .from("productos")
          .update({ activo: false })
          .eq("id", id);

        let error = result.error;

        if (error) {
          const fallback = await supabase
            .from("productos")
            .delete()
            .eq("id", id);
          error = fallback.error;
        }

        if (error) {
          console.error("Error eliminando producto:", error);
          setProductFormMessage("No se pudo eliminar en Supabase.");
          return;
        }

        await loadProductsFromSupabase();
        setProductFormMessage("Producto eliminado correctamente.");
        if (editingProductId === id) {
          setEditingProductId(null);
        }
      } catch (err) {
        console.error("Error inesperado eliminando producto:", err);
        setProductFormMessage("Ocurrió un error al eliminar.");
      }
    };

        const resetProducts = async () => {
      setEditingProductId(null);
      setProductFormMessage("");
      await loadProductsFromSupabase();
    };

    const cancelEditing = () => {
      setEditingProductId(null);
      setNewProductName("");
      setNewProductPrice("");
      setNewProductOriginalPrice("");
      setNewProductCategory("juegos");
      setNewProductPlatform("ps4");
      setNewProductCondition("Nuevo");
      setNewProductImage("");
      setNewProductFeatured(false);
      setNewProductRecent(true);
      setProductFormMessage("");
    };

    const handleRechargeOptionChange = (optionId, field, value) => {
      setNewRechargeOptions((prev) =>
        prev.map((option) => (option.id === optionId ? { ...option, [field]: value } : option))
      );
    };

    const addRechargeOption = () => {
      setNewRechargeOptions((prev) => [...prev, { id: Date.now() + Math.random(), label: "", price: "" }]);
    };

    const removeRechargeOption = (optionId) => {
      setNewRechargeOptions((prev) => prev.filter((option) => option.id !== optionId));
    };

    const resetRechargeForm = () => {
      setEditingRechargeId(null);
      setNewRechargeName("");
      setNewRechargeImage("");
      setNewRechargeType("recarga");
      setNewRechargeOptions([{ id: Date.now(), label: "", price: "" }]);
      setRechargeFormMessage("");
    };

    const handleAddOrUpdateRechargeItem = async (e) => {
      e.preventDefault();
      if (
        !newRechargeName.trim() ||
        !newRechargeImage.trim() ||
        newRechargeOptions.length === 0 ||
        newRechargeOptions.some((option) => !option.label.trim() || !option.price.trim())
      ) {
        setRechargeFormMessage("Completá nombre, imagen y todas las opciones.");
        return;
      }

      const payload = {
        id: editingRechargeId || Date.now(),
        type: newRechargeType,
        name: newRechargeName.trim(),
        image: newRechargeImage.trim(),
        options: newRechargeOptions.map((option, index) => ({
          id: option.id || index + 1,
          label: option.label.trim(),
          price: option.price.trim(),
        })),
      };

      const nextItems = editingRechargeId
        ? editableRechargeItems.map((item) => (item.id === editingRechargeId ? payload : item))
        : [payload, ...editableRechargeItems];

      setEditableRechargeItems(nextItems);

      const result = await saveWebContentToSupabase("rechargeItems", nextItems);
      if (result.ok) {
        resetRechargeForm();
        setRechargeFormMessage(editingRechargeId ? "Ítem actualizado correctamente." : "Ítem agregado correctamente.");
      } else {
        setRechargeFormMessage(result.message);
      }
    };

    const handleEditRechargeItem = (item) => {
      setEditingRechargeId(item.id);
      setNewRechargeName(item.name);
      setNewRechargeImage(item.image);
      setNewRechargeType(item.type);
      setNewRechargeOptions(item.options.map((option) => ({ ...option })));
      setRechargeFormMessage("Editando ítem. Guardá para actualizar.");
    };

    const handleDeleteRechargeItem = async (id) => {
      const nextItems = editableRechargeItems.filter((item) => item.id !== id);
      setEditableRechargeItems(nextItems);

      const result = await saveWebContentToSupabase("rechargeItems", nextItems);
      setRechargeFormMessage(result.ok ? "Ítem eliminado correctamente." : result.message);

      if (editingRechargeId === id) resetRechargeForm();
    };

    if (!isAdminAuthenticated) return renderAdminLoginPage();
    return (
      <>
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.14),transparent_30%)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">Panel privado · SKAY GAMES</div>
                <h2 className="text-4xl font-black md:text-5xl">Admin</h2>
                <p className="mt-3 max-w-3xl text-white/70">La estructura de la web queda fija. Todo lo visual y los productos se editan desde acá.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigateTo("home")} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/85 transition hover:bg-white/10">← Ver web pública</button>
                <button onClick={() => { setIsAdminAuthenticated(false); setAdminEmail(""); setAdminPassword(""); setAdminLoginError(""); }} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20">Cerrar sesión</button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
            <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="mb-4 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Acceso</p>
                <p className="mt-2 text-lg font-black">admin@skaygames.com.py</p>
                <p className="mt-1 text-sm text-white/55">Ruta privada: #/admin</p>
              </div>
              <div className="space-y-2">
                {adminSections.map((section) => (
                  <button key={section.id} onClick={() => setActiveAdminSection(section.id)} className={`w-full rounded-2xl px-4 py-4 text-left transition ${activeAdminSection === section.id ? "border border-cyan-400/30 bg-cyan-400 text-black shadow-lg" : "border border-transparent bg-black/30 text-white/80 hover:bg-white/10 hover:text-white"}`}>
                    <div className="text-sm font-black">{section.title}</div>
                    <div className={`mt-1 text-xs ${activeAdminSection === section.id ? "text-black/80" : "text-white/45"}`}>{section.description}</div>
                  </button>
                ))}
              </div>
            </aside>

            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 shadow-2xl">
              <div className="mb-4 inline-block rounded-full bg-cyan-400/15 px-4 py-2 text-sm font-bold text-cyan-300">{adminSections.find((s) => s.id === activeAdminSection)?.title}</div>
              <h3 className="text-3xl font-black md:text-4xl">{adminSections.find((s) => s.id === activeAdminSection)?.title}</h3>
              <p className="mt-3 max-w-3xl text-white/65">{adminSections.find((s) => s.id === activeAdminSection)?.description}</p>

              {activeAdminSection === "mercaderias" ? (
                <div className="mt-8 space-y-6">
                  <form onSubmit={handleAddOrUpdateProduct} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">{editingProductId ? "Editar mercadería / producto" : "Agregar mercadería / producto"}</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input value={newProductName} onChange={(e) => setNewProductName(e.target.value)} placeholder="Nombre de la mercadería" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                      <input value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} placeholder="Precio actual (ej: Gs. 150.000)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                      <input value={newProductOriginalPrice} onChange={(e) => setNewProductOriginalPrice(e.target.value)} placeholder="Precio anterior / normal (opcional)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                      <select value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="juegos">Juegos</option>
                        <option value="consolas">Consolas</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="recargas-servicios">Recargas y servicios</option>
                      </select>
                      <select value={newProductPlatform} onChange={(e) => setNewProductPlatform(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="ps2">PS2</option>
                        <option value="ps3">PS3</option>
                        <option value="ps4">PS4</option>
                        <option value="ps5">PS5</option>
                        <option value="gamer">Gamer</option>
                      </select>
                      <select value={newProductCondition} onChange={(e) => setNewProductCondition(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="Nuevo">Juego nuevo</option>
                        <option value="Usado">Juego usado</option>
                      </select>
                      <input value={newProductImage} onChange={(e) => setNewProductImage(e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={newProductFeatured} onChange={(e) => setNewProductFeatured(e.target.checked)} /> Agregar a destacados</label>
                      <label className="flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={newProductRecent} onChange={(e) => setNewProductRecent(e.target.checked)} /> Agregar a recién llegados</label>
                    </div>
                    {productFormMessage && <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">{productFormMessage}</div>}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button type="submit" className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">{editingProductId ? "Actualizar producto" : "Guardar producto"}</button>
                      {editingProductId && <button type="button" onClick={cancelEditing} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/80">Cancelar edición</button>}
                      <button type="button" onClick={resetProducts} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300">Restaurar productos</button>
                    </div>
                  </form>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Mercaderías cargadas</div>
                    <div className="space-y-4">
                      {productsData.map((item) => (
                        <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover bg-black" />
                            <div>
                              <div className="text-base font-bold text-white">{item.name}</div>
                              <div className="mt-1 text-sm text-white/60">{item.category}{item.platform ? ` · ${item.platform.toUpperCase()}` : ""}</div>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                                {item.originalPrice && <span className="text-white/40 line-through">{item.originalPrice}</span>}
                                <span className="text-cyan-300 font-bold">{item.price}</span>
                              </div>
                              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                {item.isFeatured && <span className="rounded-full bg-cyan-400/15 px-3 py-1 font-bold text-cyan-300">Destacado</span>}
                                {item.isRecent && <span className="rounded-full bg-purple-500/15 px-3 py-1 font-bold text-purple-300">Recién llegado</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button onClick={() => handleEditProduct(item)} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">Editar</button>
                            <button onClick={() => handleDeleteProduct(item.id)} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">Eliminar</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeAdminSection === "contenido-web" ? (
                <div className="mt-8 space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Imágenes del header</div>
                    <div className="space-y-4">
                      {draftHeaderBackgrounds.map((item, index) => (
                        <div key={index} className="grid gap-3 md:grid-cols-[1fr_170px]">
                          <input value={item} onChange={(e) => updateHeaderImage(index, e.target.value)} placeholder={`Imagen header ${index + 1}`} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                          <button type="button" onClick={() => saveSingleHeaderImage(index)} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Sliders principales</div>
                    <div className="space-y-5">
                      {draftHeroSlides.map((slide, index) => (
                        <div key={index} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <div className="mb-3 text-sm font-bold text-white">Slide {index + 1}</div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={slide.title} onChange={(e) => updateHeroSlide(index, "title", e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={slide.buttonText} onChange={(e) => updateHeroSlide(index, "buttonText", e.target.value)} placeholder="Texto del botón" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={slide.image} onChange={(e) => updateHeroSlide(index, "image", e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                            <ImagePositionControls item={slide} onChange={(field, value) => updateHeroSlide(index, field, value)} />
                            <textarea value={slide.subtitle} onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)} placeholder="Subtítulo" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[100px]" />
                            <textarea value={slide.message} onChange={(e) => updateHeroSlide(index, "message", e.target.value)} placeholder="Mensaje de WhatsApp" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[80px]" />
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => saveSingleHeroSlide(index)} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar slide</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Botones / imágenes / textos</div>
                    <div className="space-y-5">
                      {draftCategories.map((item, index) => (
                        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <div className="mb-3 text-sm font-bold text-white">{item.title}</div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={item.title} onChange={(e) => updateCategory(index, "title", e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={item.id} disabled className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/50 outline-none" />
                            <input value={item.image} onChange={(e) => updateCategory(index, "image", e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                            <textarea value={item.description} onChange={(e) => updateCategory(index, "description", e.target.value)} placeholder="Descripción" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[90px]" />
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => saveSingleCategory(index)} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar botón</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Subcategorías de juegos</div>
                    <p className="mb-5 text-sm text-white/55">Editá los botones que aparecen dentro de la página Juegos, por ejemplo Juegos PS4 y Juegos PS5.</p>
                    <div className="space-y-5">
                      {draftGamePlatforms.map((item, index) => (
                        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <div className="mb-3 text-sm font-bold text-white">{item.title}</div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={item.title} onChange={(e) => updateGamePlatform(index, "title", e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={item.id} disabled className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/50 outline-none" />
                            <input value={item.image} onChange={(e) => updateGamePlatform(index, "image", e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                            <textarea value={item.description} onChange={(e) => updateGamePlatform(index, "description", e.target.value)} placeholder="Descripción" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[90px]" />
                            <textarea value={item.message || ""} onChange={(e) => updateGamePlatform(index, "message", e.target.value)} placeholder="Mensaje de WhatsApp" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[80px]" />
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => saveSingleGamePlatform(index)} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar subcategoría</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Ofertas encadenadas / temporizadores</div>
                    <div className="space-y-6">
                      {draftOffers.map((offer, index) => (
                        <div key={offer.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <div className="mb-3 text-sm font-bold text-white">Oferta {index + 1}</div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={offer.title} onChange={(e) => updateDraftOffer(index, "title", e.target.value)} placeholder={`Título de oferta ${index + 1}`} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={offer.price} onChange={(e) => updateDraftOffer(index, "price", e.target.value)} placeholder="Precio" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <textarea value={offer.subtitle} onChange={(e) => updateDraftOffer(index, "subtitle", e.target.value)} placeholder="Subtítulo" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[90px]" />
                            <input value={offer.image || ""} onChange={(e) => updateDraftOffer(index, "image", e.target.value)} placeholder="URL de imagen del producto / consola" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                            <input value={offer.backgroundImage || ""} onChange={(e) => updateDraftOffer(index, "backgroundImage", e.target.value)} placeholder="URL de imagen de fondo de la burbuja (opcional)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                            <ImagePositionControls label="Posición imagen del producto" item={offer} onChange={(field, value) => updateDraftOffer(index, field, value)} prefix="image" />
                            <ImagePositionControls label="Posición fondo de la burbuja" item={offer} onChange={(field, value) => updateDraftOffer(index, field, value)} prefix="background" />
                            <div>
                              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/45">Duración automática</label>
                              <select value={offer.durationHours || 12} onChange={(e) => updateDraftOffer(index, "durationHours", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                                <option value={12}>12 horas</option>
                                <option value={24}>24 horas</option>
                              </select>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70">
                              Se inicia automáticamente al guardar. La oferta {index + 1} calcula sola su tiempo y las siguientes se encadenan automáticamente.
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => saveSingleOffer(index)} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar oferta</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {offerSaveMessage && <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">{offerSaveMessage}</div>}
                  </div>
                </div>
              ) : activeAdminSection === "recargas" ? (
                <div className="mt-8 space-y-6">
                  <form onSubmit={handleAddOrUpdateRechargeItem} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">{editingRechargeId ? "Editar recarga / servicio" : "Agregar recarga / servicio"}</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input value={newRechargeName} onChange={(e) => setNewRechargeName(e.target.value)} placeholder="Nombre del juego o servicio" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                      <select value={newRechargeType} onChange={(e) => setNewRechargeType(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="recarga">Recarga</option>
                        <option value="streaming">Streaming</option>
                      </select>
                      <input value={newRechargeImage} onChange={(e) => setNewRechargeImage(e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="text-sm font-black text-cyan-300">Opciones / precios</div>
                        <button type="button" onClick={addRechargeOption} className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-black text-black">Agregar opción</button>
                      </div>
                      <div className="space-y-4">
                        {newRechargeOptions.map((option) => (
                          <div key={option.id} className="grid gap-3 md:grid-cols-[1fr_220px_120px]">
                            <input value={option.label} onChange={(e) => handleRechargeOptionChange(option.id, "label", e.target.value)} placeholder="Ej: 310 diamantes / Plan mensual" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <input value={option.price} onChange={(e) => handleRechargeOptionChange(option.id, "price", e.target.value)} placeholder="Ej: Gs. 25.000" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                            <button type="button" onClick={() => removeRechargeOption(option.id)} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">Eliminar</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {rechargeFormMessage && <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">{rechargeFormMessage}</div>}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button type="submit" className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">{editingRechargeId ? "Actualizar ítem" : "Guardar ítem"}</button>
                      {editingRechargeId && <button type="button" onClick={resetRechargeForm} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/80">Cancelar edición</button>}
                    </div>
                  </form>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="mb-4 text-sm font-black text-cyan-300">Recargas y servicios cargados</div>
                    <div className="space-y-4">
                      {editableRechargeItems.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-center gap-4">
                              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover bg-black" />
                              <div>
                                <div className="text-base font-bold text-white">{item.name}</div>
                                <div className="mt-1 text-sm text-white/60">{item.type === "recarga" ? "Recarga" : "Streaming"}</div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item.options.map((option) => (
                                    <span key={option.id} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/75">{option.label} · {option.price}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <button onClick={() => handleEditRechargeItem(item)} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">Editar</button>
                              <button onClick={() => handleDeleteRechargeItem(item.id)} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">Eliminar</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">Cada bloque se guarda por separado. Después de cambiar una imagen o texto, tocá el botón <span className="font-bold text-cyan-300">Guardar</span> del mismo bloque.</div>
                  {contentSaveMessage && <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">{contentSaveMessage}</div>}
                </div>
              ) : activeAdminSection === "combos" ? (
                <div className="mt-8 space-y-5">
                  {draftComboSlides.map((combo, index) => (
                    <div key={combo.id} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                      <div className="mb-4 text-sm font-black text-cyan-300">Combo {index + 1}</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input value={combo.title} onChange={(e) => updateComboSlide(index, "title", e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                        <input value={combo.image} onChange={(e) => updateComboSlide(index, "image", e.target.value)} placeholder="URL de imagen" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                        <ImagePositionControls item={combo} onChange={(field, value) => updateComboSlide(index, field, value)} />
                        <textarea value={combo.subtitle} onChange={(e) => updateComboSlide(index, "subtitle", e.target.value)} placeholder="Subtítulo" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[100px]" />
                        <textarea value={combo.message} onChange={(e) => updateComboSlide(index, "message", e.target.value)} placeholder="Mensaje de WhatsApp" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[80px]" />
                      </div>
                    </div>
                  ))}
                  {comboSaveMessage && <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300">{comboSaveMessage}</div>}
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={saveCombos} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar combos</button>
                    <button onClick={resetEditableContent} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300">Restaurar contenido visual</button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {(adminSections.find((s) => s.id === activeAdminSection)?.stats || []).map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/80">{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header
        id="mainHeader"
        className={`fixed top-0 left-0 w-full h-[96px] z-50 overflow-hidden backdrop-blur-md bg-black/70 transition-all duration-300 ${
          isHeaderCompact ? "shadow-2xl bg-black/85" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {editableHeaderBackgrounds.map((background, index) => (
            <img
              key={background}
              src={background}
              alt="background"
              className={`absolute inset-0 h-full w-full object-cover object-[center_41%] blur-[1px] scale-110 transition-all duration-700 ${
                headerBackgroundIndex === index ? "opacity-90" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/10 to-black" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-6">
          <button onClick={() => navigateTo("home")} className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tighter text-cyan-400">SKAY GAMES</h1>
            <p className="text-xs text-white/60">Videojuegos, consolas, accesorios y servicios</p>
          </button>

          <div className="hidden md:flex md:items-center md:gap-3 md:relative md:z-[320]">
            <div className="relative">
              <button
                onClick={() => setIsCategoriesMenuOpen((prev) => !prev)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Categorías
              </button>

              {isCategoriesMenuOpen && (
                <div className="absolute left-0 top-14 z-[9999] w-[340px] overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(5,10,20,0.96),rgba(8,8,12,0.98))] shadow-[0_0_35px_rgba(34,211,238,0.10)] backdrop-blur-xl">
                  <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                    <div className="text-sm font-black tracking-tighter text-cyan-300">Ir directo a una sección</div>
                    <div className="mt-1 text-xs text-white/45">Elegí rápido la categoría que querés ver.</div>
                  </div>

                  <div className="grid max-h-[420px] gap-2 overflow-y-auto p-3 pr-2">
                    {[
                      { id: "consolas", title: "Consolas", description: "Nuevas y usadas listas para jugar.", icon: "🎮" },
                      { id: "juegos", title: "Juegos", description: "Físicos y digitales para varias plataformas.", icon: "🕹️" },
                      { id: "accesorios", title: "Accesorios", description: "Mandos, auriculares, cables y más.", icon: "🎧" },
                      { id: "recargas-servicios", title: "Recargas y servicios", description: "Recargas y plataformas digitales.", icon: "⚡" },
                      { id: "admin", title: "Admin", description: "Acceso privado al panel.", icon: "🔐" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          navigateTo(item.id);
                          setIsCategoriesMenuOpen(false);
                        }}
                        className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 text-left transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06]"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-lg shadow-inner transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-black text-white/90 transition group-hover:text-cyan-300">{item.title}</div>
                          <div className="mt-1 text-xs leading-relaxed text-white/45">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {editableCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`rounded-2xl border px-4 py-2 text-sm font-bold transition ${
                  activePage === item.id
                    ? "border-cyan-400/50 bg-cyan-400 text-black"
                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105"
          >
            Contactanos
          </a>
        </div>
      </header>

      <div className="fixed top-[96px] left-0 w-full h-[3px] z-50 overflow-hidden">
        <div className="w-full h-full animate-[rgbWave_3s_linear_infinite] bg-[linear-gradient(90deg,#22d3ee,#a855f7,#ec4899,#22d3ee)] bg-[length:300%_100%]" />
      </div>

      <style>{`
        @keyframes rgbWave {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>

      <div className="pt-[99px]">
        {activePage === "admin" ? (
          renderAdminPage()
        ) : activePage === "recargas-servicios" ? (
          renderRechargeServicesPage()
        ) : activePage !== "home" ? (
          <>
            <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
              <div className="mx-auto max-w-7xl px-6">
                <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
                <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta: {activePage === "home" ? "#/" : `#/${activePage}`}</span>
                <h2 className="mt-5 text-4xl font-black md:text-6xl">{pageContent?.title}</h2>
                <p className="mt-4 text-xl text-white/75">{pageContent?.subtitle}</p>
                <p className="mt-4 max-w-3xl text-white/65">{pageContent?.description}</p>
              </div>
            </section>
            {activePage === "juegos" && renderGamesPlatformSelector()}
            {activePage === "accesorios" && (
              <section className="mx-auto max-w-7xl px-6 pt-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-black md:text-4xl">Elegí tu consola</h3>
                  <p className="mt-3 text-white/65">Filtrá accesorios según la consola o por accesorios gamer.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSelectedAccessoryPlatform("all")} className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${selectedAccessoryPlatform === "all" ? "border-cyan-400/50 bg-cyan-400 text-black" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}`}>Todos</button>
                  {accessoryPlatforms.map((p) => (
                    <button key={p.id} onClick={() => setSelectedAccessoryPlatform(p.id)} className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${selectedAccessoryPlatform === p.id ? "border-cyan-400/50 bg-cyan-400 text-black" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}`}>{p.title}</button>
                  ))}
                </div>
              </section>
            )}
            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{productsToShow.map((product) => renderProductCard(product))}</div>
            </section>
          </>
        ) : (
          <>
            <section className="relative overflow-hidden">
              <div className="relative h-[75vh] min-h-[520px] w-full">
                {draftHeroSlides.map((slide, index) => (
                  <div key={slide.title} className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"}`}>
                    <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" style={getImagePositionStyle(slide, "image")} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)]" />
                  </div>
                ))}
                <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl items-center px-6">
                  <div className="max-w-2xl">
                    <span className="mb-4 inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Tu tienda gamer en Areguá - Caacupemí</span>
                    <h2 className="text-4xl font-black leading-tight md:text-6xl">{editableHeroSlides[currentSlide].title}</h2>
                    <p className="mt-5 text-lg text-white/75 md:text-xl">{editableHeroSlides[currentSlide].subtitle}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(editableHeroSlides[currentSlide].message)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-green-500 px-6 py-3 font-bold text-black transition hover:scale-105">{editableHeroSlides[currentSlide].buttonText}</a>
                      <a href="#productos" className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-bold transition hover:bg-white/10">Ver productos</a>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                  {draftHeroSlides.map((slide, index) => (
                    <button key={slide.title} onClick={() => setCurrentSlide(index)} className={`h-3 rounded-full transition-all ${index === currentSlide ? "w-10 bg-cyan-400" : "w-3 bg-white/40"}`} aria-label={`Ir al slide ${index + 1}`} />
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 mt-10">
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black p-6 shadow-2xl md:p-8">
                <img
                  src={displayOffer?.backgroundImage || displayOffer?.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80"}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-65"
                  style={getImagePositionStyle(displayOffer, "background")}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(34,211,238,0.34),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(168,85,247,0.34),transparent_34%)]" />
                <div className="absolute inset-0 backdrop-blur-[1px]" />

                <div className="relative z-10 grid gap-6 md:grid-cols-[300px_1fr] items-center">
                  <div className="overflow-hidden rounded-[30px] border border-white/20 bg-black/45 shadow-2xl backdrop-blur-md">
                    <img
                      src={displayOffer?.image || "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80"}
                      alt={displayOffer?.title || "Oferta activa"}
                      className="h-72 w-full object-contain bg-black/35 p-4"
                      style={getImagePositionStyle(displayOffer, "image")}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <div className="inline-block rounded-full border border-red-400/35 bg-red-500/25 px-4 py-2 text-xs font-bold text-red-100 shadow-lg backdrop-blur-md">
                        {offerCountdown === "Sin oferta activa" ? offerCountdown : `Tiempo restante: ${offerCountdown}`}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white mt-4 drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">{displayOffer?.title || "Sin oferta activa"}</h2>
                      <p className="text-white/85 mt-3 max-w-2xl drop-shadow-lg">{displayOffer?.subtitle || "Configurá una oferta desde el panel admin."}</p>
                      <p className="text-3xl font-black text-green-400 mt-4 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">{displayOffer?.price || "Gs. 0"}</p>
                    </div>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl text-white font-bold shadow-lg">Comprar por WhatsApp</a>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-black md:text-4xl">¿Qué vas a encontrar en SKAY GAMES?</h3>
                <p className="mt-3 text-white/65">Todo lo que necesitás para jugar, equiparte o mantener tu consola en perfecto estado.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {editableCategories.map((item) => (
                  <button key={item.id} onClick={() => navigateTo(item.id)} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-xl transition hover:-translate-y-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-52 w-full object-cover"
                      onError={(e) => {
                        if (!e.currentTarget.src.includes(".jpg")) {
                          e.currentTarget.src = item.image.replace(".png", ".jpg");
                        } else if (!e.currentTarget.src.includes(".webp")) {
                          e.currentTarget.src = item.image.replace(".jpg", ".webp");
                        } else {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1200&q=80";
                        }
                      }}
                    />
                    <div className="p-5">
                      <div className="mb-3 h-px w-full bg-gradient-to-r from-cyan-400/20 via-white/10 to-transparent" />
                      <div className="mb-3 inline-block rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">Página</div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-2 text-sm text-white/70">{item.description}</p>
                      <div className="mt-4 inline-block rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-bold text-black">Ir a la página</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section id="productos" className="bg-white/5 py-16">
              <div className="mx-auto max-w-7xl px-6">
                <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <h3 className="text-3xl font-black md:text-4xl">Productos destacados</h3>
                    
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-2xl border border-green-400/40 bg-green-400/10 px-5 py-3 font-bold text-green-300 transition hover:bg-green-400/20">Consultar catálogo completo</a>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {featuredProducts.map((product) => renderProductCard(product))}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <h3 className="text-3xl font-black md:text-4xl">Combos destacados</h3>
                  
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">Ideal para combos y promos</div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
                <div className="relative h-[420px] w-full md:h-[500px]">
                  {draftComboSlides.map((combo, index) => (
                    <div key={combo.id} className={`absolute inset-0 transition-all duration-1000 ${index === currentComboSlide ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"}`}>
                      <img src={combo.image} alt={combo.title} className="h-full w-full object-cover" style={getImagePositionStyle(combo, "image")} />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
                    </div>
                  ))}
                  <div className="absolute inset-0 z-10 flex items-center px-8 md:px-12">
                    <div className="max-w-2xl">
                      <div className="mb-4 flex flex-wrap gap-3">
                        <div className="inline-block rounded-full bg-cyan-400/15 px-4 py-2 text-sm font-bold text-cyan-300">Combo destacado</div>
                        <div className="inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-300">Promo limitada</div>
                      </div>
                      <h3 className="text-3xl font-black md:text-5xl">{editableComboSlides[currentComboSlide].title}</h3>
                      <p className="mt-4 text-base text-white/75 md:text-lg">{editableComboSlides[currentComboSlide].subtitle}</p>
                      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(editableComboSlides[currentComboSlide].message)}`} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-2xl bg-green-500 px-6 py-3 font-bold text-black transition hover:scale-105">Consultar combo</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <h3 className="text-3xl font-black md:text-4xl">Recién llegados</h3>
                  
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">Controlado desde el panel admin</div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {latestProducts.map((product) => renderProductCard(product, "Consultar ahora"))}
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="grid gap-10 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
                  <h3 className="text-3xl font-black">Servicios del local</h3>
                  <p className="mt-3 text-white/65">Además de vender productos, también ofrecés soluciones y atención técnica.</p>
                  <div className="mt-6 grid gap-3">{services.map((service) => <div key={service} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/85">{service}</div>)}</div>
                </div>
                <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 p-8 shadow-2xl">
                  <h3 className="text-3xl font-black">Pedí rápido y fácil</h3>
                  <p className="mt-3 text-white/70">Consultanos por stock, precios, combos, mantenimiento o recargas. Te respondemos directo por WhatsApp.</p>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-sm text-white/60">Ubicación</p><p className="mt-1 text-lg font-bold">Areguá - Caacupemí</p></div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-sm text-white/60">Atención personalizada</p><p className="mt-1 text-lg font-bold">Ventas, soporte y asesoramiento</p></div>
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black transition hover:scale-105">Escribir al WhatsApp</a>
                </div>
              </div>
            </section>

            <footer className="border-t border-white/10 bg-black px-6 py-8 text-center text-sm text-white/50">
              <div className="mx-auto max-w-7xl">
                <h3 className="mb-4 text-xl font-bold text-white">SKAY GAMES</h3>
                <p className="mb-6 text-white/60">Seguinos y escribinos directo desde nuestras redes.</p>
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="rounded-xl bg-green-500 px-5 py-2 font-semibold text-white transition hover:bg-green-600">WhatsApp</a>
                  <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">Facebook</a>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 font-semibold text-white transition hover:opacity-90">Instagram</a>
                </div>
                © 2026 SKAY GAMES · Todos los derechos reservados
              </div>
            </footer>
          </>
        )}
      </div>
      {renderProductDetailModal()}
    </div>
  );
}
