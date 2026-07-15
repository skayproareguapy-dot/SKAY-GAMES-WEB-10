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

  const DIGITAL_OFFERS_PAGE_ID = "juegos-digitales-oferta";

  const digitalOffersCard = {
    id: DIGITAL_OFFERS_PAGE_ID,
    title: "Juegos digitales en oferta",
    description: "Juegos digitales para PS4 y PS5 a precios especiales.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    badge: "Oferta digital",
    kicker: "PS4 · PS5",
  };

  const catalogPageIds = ["consolas", "juegos", "accesorios", "recargas-servicios", DIGITAL_OFFERS_PAGE_ID];
  const RECHARGE_ROUTE_PREFIX = "recargas-servicios/";

  const catalogCategoryOptions = [
    { value: "all", label: "Todos" },
    { value: "consolas", label: "Consolas" },
    { value: "juegos", label: "Juegos" },
    { value: "accesorios", label: "Accesorios" },
    { value: "recargas-servicios", label: "Recargas y servicios" },
  ];

  const catalogPlatformOptions = [
    { value: "all", label: "Todos" },
    { value: "ps2", label: "PS2" },
    { value: "ps3", label: "PS3" },
    { value: "ps4", label: "PS4" },
    { value: "ps5", label: "PS5" },
    { value: "xbox", label: "Xbox" },
    { value: "nintendo", label: "Nintendo" },
    { value: "pc", label: "PC" },
    { value: "gamer", label: "Gamer" },
  ];

  const catalogConditionOptions = [
    { value: "all", label: "Todos" },
    { value: "nuevo", label: "Nuevo" },
    { value: "usado", label: "Usado" },
  ];

  const catalogSortOptions = [
    { value: "recent", label: "Más recientes" },
    { value: "price-asc", label: "Menor precio" },
    { value: "price-desc", label: "Mayor precio" },
    { value: "discount-desc", label: "Mayor descuento" },
    { value: "featured", label: "Destacados primero" },
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
  const [catalogSearchTerm, setCatalogSearchTerm] = useState("");
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState("all");
  const [catalogPlatformFilter, setCatalogPlatformFilter] = useState("all");
  const [catalogConditionFilter, setCatalogConditionFilter] = useState("all");
  const [catalogSortOrder, setCatalogSortOrder] = useState("recent");
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [headerBackgroundIndex, setHeaderBackgroundIndex] = useState(0);
  const [rechargeFilter, setRechargeFilter] = useState("all");
  const [selectedRechargeItem, setSelectedRechargeItem] = useState(null);
  const [activeAdminSection, setActiveAdminSection] = useState("mercaderias");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminUserEmail, setAdminUserEmail] = useState("");
  const [isAdminLoginLoading, setIsAdminLoginLoading] = useState(false);
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
  const [editableDigitalOffersCard, setEditableDigitalOffersCard] = useState(digitalOffersCard);
  const [draftDigitalOffersCard, setDraftDigitalOffersCard] = useState(digitalOffersCard);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("juegos");
  const [newProductPlatform, setNewProductPlatform] = useState("ps4");
  const [newProductCondition, setNewProductCondition] = useState("Nuevo");
  const [newProductFormat, setNewProductFormat] = useState("fisico");
  const [newProductDigitalOffer, setNewProductDigitalOffer] = useState(false);
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductFeatured, setNewProductFeatured] = useState(false);
  const [newProductRecent, setNewProductRecent] = useState(true);
  const [productFormMessage, setProductFormMessage] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editableRechargeItems, setEditableRechargeItems] = useState(defaultRechargeItems);
  const [newRechargeName, setNewRechargeName] = useState("");
  const [newRechargeDescription, setNewRechargeDescription] = useState("");
  const [newRechargeImage, setNewRechargeImage] = useState("");
  const [newRechargeType, setNewRechargeType] = useState("recarga");
  const [newRechargeOptions, setNewRechargeOptions] = useState([{ id: Date.now(), label: "", price: "", description: "" }]);
  const [rechargeFormMessage, setRechargeFormMessage] = useState("");
  const [editingRechargeId, setEditingRechargeId] = useState(null);

  const PRODUCT_ROUTE_PREFIX = "producto/";

  const getLegacyHashRoute = () => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash || "";
    if (!hash.startsWith("#/")) return "";

    return hash.replace("#/", "").trim() || "home";
  };

  const getPathRoute = () => {
    if (typeof window === "undefined") return "home";
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "").trim();
    return path || "home";
  };

  const getRouteFromLocation = () => getLegacyHashRoute() || getPathRoute();

  const replaceLegacyHashRoute = () => {
    if (typeof window === "undefined") return;

    const legacyRoute = getLegacyHashRoute();
    if (!legacyRoute) return;

    const nextPath = legacyRoute === "home" ? "/" : `/${legacyRoute}`;
    window.history.replaceState(null, "", nextPath);
  };

  const getProductSlugFromLocation = () => {
    const route = getRouteFromLocation();
    return route.startsWith(PRODUCT_ROUTE_PREFIX) ? route.replace(PRODUCT_ROUTE_PREFIX, "").trim() : "";
  };

  const getRechargeSlugFromLocation = () => {
    const route = getRouteFromLocation();
    return route.startsWith(RECHARGE_ROUTE_PREFIX) ? route.replace(RECHARGE_ROUTE_PREFIX, "").trim() : "";
  };

  const getPageFromLocation = () => {
    const route = getRouteFromLocation();
    if (route.startsWith(PRODUCT_ROUTE_PREFIX)) return "home";
    if (route.startsWith(RECHARGE_ROUTE_PREFIX)) return "recargas-servicios";
    return route;
  };

  const [activePage, setActivePage] = useState(getPageFromLocation());
  const [activeProductSlug, setActiveProductSlug] = useState(getProductSlugFromLocation());
  const [activeRechargeSlug, setActiveRechargeSlug] = useState(getRechargeSlugFromLocation());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState(initialProducts);

  useEffect(() => {
    if (!catalogPageIds.includes(activePage)) return;

    setCatalogSearchTerm("");
    setCatalogCategoryFilter(activePage === DIGITAL_OFFERS_PAGE_ID ? "juegos" : activePage);
    setCatalogPlatformFilter("all");
    setCatalogConditionFilter("all");
    setCatalogSortOrder(activePage === DIGITAL_OFFERS_PAGE_ID ? "discount-desc" : "recent");
  }, [activePage]);

  const navigateTo = (page) => {
    if (page !== "admin") setAdminLoginError("");
    const nextPath = page === "home" ? "/" : `/${page}`;
    setActiveProductSlug("");
    setActiveRechargeSlug("");
    window.history.pushState(null, "", nextPath);
    setActivePage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToRechargeItem = (item) => {
    const routeSlug = getRechargeItemRouteSlug(item);
    const nextPath = `/${RECHARGE_ROUTE_PREFIX}${routeSlug}`;
    setActiveProductSlug("");
    setActiveRechargeSlug(routeSlug);
    window.history.pushState(null, "", nextPath);
    setActivePage("recargas-servicios");
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getHeroSlideTargetPage = (slide) => {
    const text = `${slide?.title || ""} ${slide?.subtitle || ""} ${slide?.buttonText || ""} ${slide?.message || ""}`.toLowerCase();

    if (text.includes("recarga") || text.includes("servicio") || text.includes("streaming")) return "recargas-servicios";
    if (text.includes("juego") || text.includes("ps4") || text.includes("ps5") || text.includes("lanzamiento")) return "juegos";
    if (text.includes("consola") || text.includes("ps3")) return "consolas";
    if (text.includes("accesorio") || text.includes("mando") || text.includes("auricular")) return "accesorios";

    return "juegos";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % editableHeroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [editableHeroSlides.length]);

  useEffect(() => {
    if (!supabase?.auth) return undefined;

    let isMounted = true;

    const applySession = (session) => {
      if (!isMounted) return;

      const email = session?.user?.email || "";
      setIsAdminAuthenticated(Boolean(session));
      setAdminUserEmail(email);
      if (email) setAdminEmail(email);
      if (!session) setAdminPassword("");
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error leyendo sesión admin:", error);
        return;
      }

      applySession(data?.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const comboInterval = setInterval(() => {
      setCurrentComboSlide((prev) => (prev + 1) % editableComboSlides.length);
    }, 3000);
    return () => clearInterval(comboInterval);
  }, [editableComboSlides.length]);

  useEffect(() => {
    const handleRouteChange = () => {
      replaceLegacyHashRoute();

      const nextProductSlug = getProductSlugFromLocation();
      const nextRechargeSlug = getRechargeSlugFromLocation();
      setActiveProductSlug(nextProductSlug);
      setActiveRechargeSlug(nextRechargeSlug);
      setActivePage(getPageFromLocation());
      if (!nextProductSlug) setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    replaceLegacyHashRoute();
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

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
    const format = product.format || getProductFormat(product.formato, product.tipo, product.rawCondition, product.condition, product.description, product.name);
    if (format === "digital") return "Digital";
    if (format === "fisico") return "Físico";
    return "";
  };

  const buildStoredCondition = (condition, format) => {
    const cleanCondition = normalizeCondition(condition);
    if (format === "digital") return `${cleanCondition} Digital`;
    if (format === "fisico") return cleanCondition;
    return cleanCondition;
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
    rawCondition: item.condicion || "Nuevo",
    condition: normalizeCondition(item.condicion || "Nuevo"),
    format: getProductFormat(item.formato, item.tipo, item.formato_producto, item.tipo_producto, item.condicion, item.descripcion, item.nombre),
    stock: item.stock ?? 0,
  });

  const parseNumericPrice = (value) => {
    const onlyDigits = String(value ?? "").replace(/[^\d]/g, "");
    return onlyDigits ? Number(onlyDigits) : null;
  };

  const parseSafePrice = (value) => {
    const text = String(value ?? "").trim();
    if (!text || /consultar|disponible|promo|combo|plan/i.test(text)) return null;

    const onlyDigits = text.replace(/[^\d]/g, "");
    return onlyDigits ? Number(onlyDigits) : null;
  };

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

  const getRechargeTypeLabel = (type) => (type === "streaming" ? "Streaming" : "Recarga");

  const getRechargeItemRouteSlug = (item = {}) => {
    const readableSlug = slugify(item.slug || item.name);
    return readableSlug || slugify(item.id || "servicio");
  };

  const findRechargeItemByRouteSlug = (routeSlug) =>
    editableRechargeItems.find((item) => {
      const itemSlug = getRechargeItemRouteSlug(item);
      const legacySlug = slugify([item.id, item.name].filter(Boolean).join(" "));
      const idSlug = slugify(item.id || "");
      return routeSlug === itemSlug || routeSlug === legacySlug || (idSlug && routeSlug.startsWith(`${idSlug}-`));
    });

  const getRechargeSeoTitle = (item = {}) => {
    const typeLabel = getRechargeTypeLabel(item.type).toLowerCase();
    return `${typeLabel === "streaming" ? "Servicio" : "Recarga"} ${item.name || "digital"} en SKAY GAMES Paraguay`;
  };

  const getRechargeSeoDescription = (item = {}) => {
    if (compactText(item.description)) return compactText(item.description);

    const name = compactText(item.name) || "este servicio";
    if (item.type === "streaming") {
      return compactText(
        `Consultá planes de ${name} en SKAY GAMES Paraguay. Servicio digital disponible según condiciones, con atención directa por WhatsApp.`
      );
    }

    return compactText(
      `Recargá ${name} en SKAY GAMES Paraguay. Elegí el paquete disponible, verificá precio y solicitá la recarga de forma rápida por WhatsApp.`
    );
  };

  const getRechargeOptionTitle = (item = {}, option = {}) => {
    const name = compactText(item.name) || "servicio";
    const optionLabel = compactText(option.label) || "opción";
    return item.type === "streaming"
      ? `${name} - ${optionLabel}`
      : `Recarga ${name} ${optionLabel}`;
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

    return compactText(`${title} disponible en SKAY GAMES Paraguay.${priceText} ${actionText}`);
  };

  const getProductCategorySlug = (category) => {
    if (category === "recargas-servicios") return "recargas";
    return category || "producto";
  };

  const getComparableCategory = (category) => {
    const normalized = normalizeCatalogText(category).replace(/\s+/g, "-");
    if (["recargas", "servicios", "recargas-servicios", "recargas-y-servicios"].includes(normalized)) {
      return "recargas-servicios";
    }
    return normalized;
  };

  const getProductCategoryLabel = (category) => {
    const labels = {
      juegos: "juegos",
      consolas: "consolas",
      accesorios: "accesorios",
      "recargas-servicios": "recargas y servicios",
    };
    return labels[getComparableCategory(category)] || "productos";
  };

  const getCategoryCtaLabel = (category) => {
    const labels = {
      consolas: "Ver consolas",
      juegos: "Ver juegos",
      accesorios: "Ver accesorios",
      "recargas-servicios": "Ver recargas",
    };
    return labels[category] || "Ver productos";
  };

  const getProductRouteSlug = (product = {}) => {
    const idSlug = slugify(product.id || "producto");
    const platformOrCategory = product.platform || getProductCategorySlug(product.category);
    const textSlug = slugify([product.name, platformOrCategory].filter(Boolean).join(" "));
    return `${idSlug}-${textSlug || "producto"}`;
  };

  const hasProductOffer = (product = {}) => {
    const originalPrice = parseSafePrice(product.originalPrice);
    const currentPrice = parseSafePrice(product.price);
    if (originalPrice !== null && currentPrice !== null) return originalPrice > currentPrice;
    return Boolean(String(product.originalPrice || "").trim());
  };

  const getProductDiscountAmount = (product = {}) => {
    const originalPrice = parseSafePrice(product.originalPrice);
    const currentPrice = parseSafePrice(product.price);
    if (originalPrice === null || currentPrice === null) return 0;
    return Math.max(0, originalPrice - currentPrice);
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

  const compactText = (value) => String(value || "").replace(/\s+/g, " ").trim();

  const getProductAutomaticSeoText = (product = {}) => {
    const name = compactText(product.name) || "este producto";
    const category = getComparableCategory(product.category);
    const platform = product.platform ? String(product.platform).toUpperCase() : "";
    const state = normalizeCondition(product.condition || product.rawCondition || "Nuevo").toLowerCase();
    const format = getProductFormatLabel(product).toLowerCase();

    if (category === "juegos") {
      const platformText = platform ? ` para ${platform}` : "";
      const details = [format ? `en formato ${format}` : "", state ? `en estado ${state}` : ""].filter(Boolean);
      const availabilityText = details.length ? `Disponible ${details.join(", ")}.` : "Disponible según stock.";
      return compactText(
        `Comprá ${name}${platformText} en SKAY GAMES Paraguay. ${availabilityText} Consultá precio, stock y disponibilidad desde nuestra tienda online.`
      );
    }

    if (category === "consolas") {
      const stateText = state ? ` ${state}` : "";
      return compactText(
        `Encontrá ${name} en SKAY GAMES Paraguay. Consola${stateText} disponible según stock. Consultá precio, características y disponibilidad desde nuestra tienda online.`
      );
    }

    if (category === "accesorios") {
      const platformText = platform ? ` para ${platform}` : "";
      const stateText = state ? ` ${state}` : "";
      return compactText(
        `Comprá ${name}${platformText} en SKAY GAMES Paraguay. Accesorio${stateText} disponible según stock. Consultá precio y disponibilidad.`
      );
    }

    if (category === "recargas-servicios") {
      return compactText(
        `Solicitá ${name} en SKAY GAMES Paraguay. Servicio digital rápido y seguro, disponible según las condiciones publicadas. Consultá precio y disponibilidad.`
      );
    }

    return compactText(`Consultá por ${name} en SKAY GAMES Paraguay. Verificá precio, stock y disponibilidad desde nuestra tienda online.`);
  };

  const getProductSearchText = (product = {}) =>
    normalizeCatalogText(
      [
        product.name,
        product.description,
        product.category,
        getProductCategoryLabel(product.category),
        product.platform,
        product.condition,
        product.rawCondition,
        getProductFormatLabel(product),
        product.slug,
        product.url,
        getProductRouteSlug(product),
        `/producto/${getProductRouteSlug(product)}`,
      ]
        .filter(Boolean)
        .join(" ")
    );

  const matchesPlatformFilter = (product, platformFilter) => {
    if (platformFilter === "all") return true;

    const platformText = normalizeCatalogText(product?.platform || "");
    const aliases = {
      ps2: ["ps2", "playstation 2"],
      ps3: ["ps3", "playstation 3"],
      ps4: ["ps4", "playstation 4"],
      ps5: ["ps5", "playstation 5"],
      xbox: ["xbox"],
      nintendo: ["nintendo", "switch"],
      pc: ["pc", "computadora"],
      gamer: ["gamer"],
    };

    return (aliases[platformFilter] || [platformFilter]).some((alias) => platformText.includes(alias));
  };

  const getProductTimestamp = (product) => {
    const timestamp = new Date(product?.createdAt || 0).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const getFeaturedScore = (product) => (product?.isFeatured || product?.featured ? 1 : 0);

  const findProductByRouteSlug = (routeSlug) =>
    productsData.find((product) => {
      const productSlug = getProductRouteSlug(product);
      const idSlug = slugify(product.id || "");
      return productSlug === routeSlug || (idSlug && routeSlug.startsWith(`${idSlug}-`));
    });

  const getProductSeoTitle = (product = {}) => {
    const platformText = product.platform ? ` para ${String(product.platform).toUpperCase()}` : "";
    const categoryText = !product.platform && product.category ? ` - ${getProductCategoryLabel(product.category)}` : "";
    return `${product.name || "Producto"}${platformText}${categoryText} en SKAY GAMES`;
  };

  const getCanonicalUrl = (path = "/") => {
    const cleanPath = path && path !== "home" ? path : "/";
    return `https://skaygames.com.py${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
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

  useEffect(() => {
    if (!activeProductSlug) return;

    const product = findProductByRouteSlug(activeProductSlug);
    if (!product) return;

    setSelectedProduct(product);
    setActivePage(product.category || "home");
  }, [activeProductSlug, productsData]);

  const activeRechargeItem = useMemo(
    () => (activeRechargeSlug ? findRechargeItemByRouteSlug(activeRechargeSlug) : null),
    [activeRechargeSlug, editableRechargeItems]
  );

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

  const normalizeDigitalOffersCard = (value) => ({
    ...digitalOffersCard,
    ...(value && typeof value === "object" && !Array.isArray(value) ? value : {}),
  });

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

    if (byKey.digitalOffersCard && typeof byKey.digitalOffersCard === "object" && !Array.isArray(byKey.digitalOffersCard)) {
      const normalizedDigitalOffersCard = normalizeDigitalOffersCard(byKey.digitalOffersCard);
      setEditableDigitalOffersCard(normalizedDigitalOffersCard);
      setDraftDigitalOffersCard(normalizedDigitalOffersCard);
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

  const loadImageFromFile = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };

      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("No se pudo leer la imagen."));
      };

      image.src = url;
    });

  const removeWhiteBackgroundFromFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      throw new Error("Seleccioná un archivo de imagen válido.");
    }

    const image = await loadImageFromFile(file);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const maxSide = 1200;
    const scale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("No se pudo procesar la imagen.");

    context.drawImage(image, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const { data } = imageData;
    const totalPixels = width * height;
    const visited = new Uint8Array(totalPixels);
    const queue = new Int32Array(totalPixels);
    let head = 0;
    let tail = 0;

    const isWhiteBackgroundPixel = (pixelIndex) => {
      const offset = pixelIndex * 4;
      const alpha = data[offset + 3];
      if (alpha === 0) return true;

      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const brightness = (red + green + blue) / 3;

      return brightness >= 224 && max - min <= 48;
    };

    const enqueue = (x, y) => {
      if (x < 0 || x >= width || y < 0 || y >= height) return;

      const pixelIndex = y * width + x;
      if (visited[pixelIndex] || !isWhiteBackgroundPixel(pixelIndex)) return;

      visited[pixelIndex] = 1;
      queue[tail] = pixelIndex;
      tail += 1;
    };

    for (let x = 0; x < width; x += 1) {
      enqueue(x, 0);
      enqueue(x, height - 1);
    }

    for (let y = 0; y < height; y += 1) {
      enqueue(0, y);
      enqueue(width - 1, y);
    }

    while (head < tail) {
      const pixelIndex = queue[head];
      head += 1;

      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);

      enqueue(x + 1, y);
      enqueue(x - 1, y);
      enqueue(x, y + 1);
      enqueue(x, y - 1);
    }

    for (let pixelIndex = 0; pixelIndex < totalPixels; pixelIndex += 1) {
      if (visited[pixelIndex]) {
        data[pixelIndex * 4 + 3] = 0;
      }
    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
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
      [DIGITAL_OFFERS_PAGE_ID]: {
        title: "Juegos digitales en oferta para PS4 y PS5",
        subtitle: "Precios especiales en juegos digitales.",
        description: "Encontrá juegos digitales para PS4 y PS5 a precios especiales en SKAY GAMES. Consultá las ofertas disponibles, el stock y las condiciones de entrega.",
      },
    };
    return pages[activePage] ?? null;
  }, [activePage]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(document.createElement("meta"));
    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      document.head.appendChild(document.createElement("link"));

    metaDescription.setAttribute("name", "description");
    canonical.setAttribute("rel", "canonical");

    if (selectedProduct) {
      const seoTitle = getProductSeoTitle(selectedProduct);
      document.title = `${seoTitle} | SKAY GAMES`;
      metaDescription.setAttribute("content", getProductAutomaticSeoText(selectedProduct).slice(0, 160));
      canonical.setAttribute("href", getCanonicalUrl(`/producto/${getProductRouteSlug(selectedProduct)}`));
      return;
    }

    if (activeRechargeItem) {
      document.title = `${getRechargeSeoTitle(activeRechargeItem)} | SKAY GAMES`;
      metaDescription.setAttribute("content", getRechargeSeoDescription(activeRechargeItem).slice(0, 160));
      canonical.setAttribute("href", getCanonicalUrl(`/${RECHARGE_ROUTE_PREFIX}${getRechargeItemRouteSlug(activeRechargeItem)}`));
      return;
    }

    document.title = pageContent?.title ? `${pageContent.title} | SKAY GAMES` : "SKAY GAMES";
    metaDescription.setAttribute(
      "content",
      pageContent?.description || "SKAY GAMES - videojuegos, consolas, accesorios, recargas y servicios."
    );
    canonical.setAttribute("href", getCanonicalUrl(activePage === "home" ? "/" : `/${activePage}`));
  }, [selectedProduct, activeRechargeItem, pageContent, activePage]);

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

  const catalogProducts = useMemo(() => {
    const searchText = normalizeCatalogText(catalogSearchTerm);

    return [...productsData]
      .filter((product) => {
        const productCategory = getComparableCategory(product?.category);
        const productCondition = normalizeCondition(product?.condition).toLowerCase();
        const matchesDigitalOfferPage = activePage !== DIGITAL_OFFERS_PAGE_ID || isDigitalOfferProduct(product);
        const matchesCategory = catalogCategoryFilter === "all" || productCategory === catalogCategoryFilter;
        const matchesPlatform = matchesPlatformFilter(product, catalogPlatformFilter);
        const matchesCondition = catalogConditionFilter === "all" || productCondition === catalogConditionFilter;
        const matchesSearch = !searchText || getProductSearchText(product).includes(searchText);

        return matchesDigitalOfferPage && matchesCategory && matchesPlatform && matchesCondition && matchesSearch;
      })
      .sort((a, b) => {
        if (catalogSortOrder === "discount-desc") {
          const discountDiff = getProductDiscountAmount(b) - getProductDiscountAmount(a);
          if (discountDiff !== 0) return discountDiff;
          return getProductTimestamp(b) - getProductTimestamp(a);
        }

        if (catalogSortOrder === "featured") {
          const featuredDiff = getFeaturedScore(b) - getFeaturedScore(a);
          if (featuredDiff !== 0) return featuredDiff;
          return getProductTimestamp(b) - getProductTimestamp(a);
        }

        if (catalogSortOrder === "price-asc" || catalogSortOrder === "price-desc") {
          const priceA = parseSafePrice(a?.price);
          const priceB = parseSafePrice(b?.price);

          if (priceA === null && priceB === null) return getProductTimestamp(b) - getProductTimestamp(a);
          if (priceA === null) return 1;
          if (priceB === null) return -1;

          return catalogSortOrder === "price-asc" ? priceA - priceB : priceB - priceA;
        }

        return getProductTimestamp(b) - getProductTimestamp(a);
      });
  }, [productsData, activePage, catalogSearchTerm, catalogCategoryFilter, catalogPlatformFilter, catalogConditionFilter, catalogSortOrder]);

  const productsToShow = activePage === "home" ? featuredProducts : catalogProducts;

  const openProductDetail = (product) => {
    const productSlug = getProductRouteSlug(product);
    setSelectedProduct(product);
    setActiveProductSlug(productSlug);
    setActivePage(product.category || activePage);

    if (typeof window !== "undefined") {
      const nextPath = `/producto/${productSlug}`;
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, "", nextPath);
      }
    }
  };

  const closeProductDetail = () => {
    const fallbackPage = selectedProduct?.category || activePage || "home";
    setSelectedProduct(null);
    setActiveProductSlug("");

    if (typeof window !== "undefined" && getProductSlugFromLocation()) {
      navigateTo(fallbackPage);
    }
  };

  const renderProductDetailModal = () => {
    if (!selectedProduct) return null;

    const selectedProductSeoText = getProductAutomaticSeoText(selectedProduct);
    const selectedProductManualDescription =
      selectedProduct.description || "Consultá por este producto para recibir detalles específicos, stock y disponibilidad.";
    const selectedProductFormatLabel = getProductFormatLabel(selectedProduct);

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
                {selectedProductFormatLabel && (
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-200">
                    {selectedProductFormatLabel}
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

              <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-400/[0.06] p-5 text-base leading-7 text-cyan-50/85">
                {selectedProductSeoText}
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-black text-white">Sobre el producto</h4>
                <p className="mt-3 text-base leading-7 text-white/70">
                  {selectedProductManualDescription}
                </p>
              </div>

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
    "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-900 to-black shadow-2xl shadow-cyan-400/5 transition duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-400/25 hover:shadow-cyan-400/20";

  const catalogControlClass =
    "w-full rounded-2xl border border-cyan-400/20 bg-black/65 px-4 py-3 text-sm font-bold text-white outline-none transition duration-300 placeholder:text-white/35 focus:border-cyan-300 focus:bg-black focus:shadow-[0_0_22px_rgba(34,211,238,0.22)]";

  const renderCategoryCtaContent = (category) => {
    const [action, ...mainWords] = getCategoryCtaLabel(category).split(" ");

    return (
      <>
        <span>
          {action} <span className="text-cyan-300">{mainWords.join(" ")}</span>
        </span>
        <span className="text-cyan-300 transition duration-300 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </>
    );
  };

  const renderProductCard = (product, buttonLabel = "Pedir por WhatsApp") => (
    <div
      key={product.id ?? product.name}
      className={`${productCardClass} cursor-pointer`}
      onClick={() => openProductDetail(product)}
    >
      <div className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-8 rounded-[32px] bg-cyan-400/20 blur-3xl opacity-55 transition duration-500 group-hover:opacity-85" />
        <div className="pointer-events-none absolute inset-x-12 bottom-8 h-10 rounded-full bg-cyan-300/25 blur-2xl opacity-70 transition duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-10 top-8 h-12 rounded-full bg-purple-500/15 blur-2xl opacity-45 transition duration-500 group-hover:opacity-70" />
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 h-64 w-full object-contain bg-transparent p-4 drop-shadow-[0_0_18px_rgba(34,211,238,0.22)] transition duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_28px_rgba(34,211,238,0.36)]"
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
          {getProductFormatLabel(product) && (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-200">
              {getProductFormatLabel(product)}
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

  const clearCatalogFilters = () => {
    setCatalogSearchTerm("");
    setCatalogCategoryFilter("all");
    setCatalogPlatformFilter("all");
    setCatalogConditionFilter("all");
    setCatalogSortOrder("recent");
  };

  const renderCatalogFilters = () => (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-black via-slate-950 to-black p-5 shadow-[0_0_45px_rgba(34,211,238,0.08)] md:p-6">
        <div className="pointer-events-none absolute inset-x-8 -top-20 h-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-6 h-44 w-44 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">Buscador gamer</p>
              <h3 className="mt-2 text-2xl font-black md:text-3xl">Encontrá productos al toque</h3>
            </div>
            <p className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
              {productsToShow.length} resultado{productsToShow.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
            <input
              type="search"
              value={catalogSearchTerm}
              onChange={(e) => setCatalogSearchTerm(e.target.value)}
              placeholder="Buscar juegos, consolas, accesorios, recargas..."
              className={catalogControlClass}
            />
            <select value={catalogCategoryFilter} onChange={(e) => setCatalogCategoryFilter(e.target.value)} className={catalogControlClass}>
              {catalogCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={catalogPlatformFilter} onChange={(e) => setCatalogPlatformFilter(e.target.value)} className={catalogControlClass}>
              {catalogPlatformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={catalogConditionFilter} onChange={(e) => setCatalogConditionFilter(e.target.value)} className={catalogControlClass}>
              {catalogConditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={catalogSortOrder} onChange={(e) => setCatalogSortOrder(e.target.value)} className={catalogControlClass}>
              {catalogSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={clearCatalogFilters}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10 hover:text-cyan-100 hover:shadow-[0_0_22px_rgba(34,211,238,0.18)]"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCatalogProductsSection = () => (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {productsToShow.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productsToShow.map((product) => renderProductCard(product))}
        </div>
      ) : (
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-black via-slate-950 to-black px-6 py-12 text-center shadow-[0_0_36px_rgba(34,211,238,0.08)]">
          <p className="mx-auto max-w-2xl text-lg font-bold text-white/80">
            {activePage === DIGITAL_OFFERS_PAGE_ID
              ? "No encontramos juegos digitales en oferta con esos filtros. Probá con PS4, PS5 o consultanos por WhatsApp."
              : "No encontramos productos con esos filtros. Probá con otra búsqueda o consultanos por WhatsApp."}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black transition hover:scale-105"
          >
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </section>
  );

  const applyGamesPlatformFilter = (platformId = "all") => {
    setCatalogSearchTerm("");
    setCatalogCategoryFilter("juegos");
    setCatalogPlatformFilter(platformId);
    setCatalogConditionFilter("all");
    setCatalogSortOrder("recent");
  };

  const renderGamesPlatformSelector = () => (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="text-3xl font-black md:text-4xl">Subcategorías de juegos</h3>
          <p className="mt-3 text-white/65">Entrá directo a PS4, PS5 o a las ofertas digitales sin salir de Juegos.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => applyGamesPlatformFilter("all")}
            className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${
              catalogPlatformFilter === "all"
                ? "border-cyan-400/50 bg-cyan-400 text-black"
                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            Todos los juegos
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {editableGamePlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => applyGamesPlatformFilter(platform.id)}
            className={`overflow-hidden rounded-3xl border text-left shadow-2xl transition hover:-translate-y-1 ${
              catalogPlatformFilter === platform.id ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-white/5"
            }`}
          >
            <img src={platform.image} alt={platform.title} className="h-64 w-full object-contain bg-black p-4" />
            <div className="p-6">
              <div className="mb-3 inline-block rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">Juegos</div>
              <h4 className="text-3xl font-black">{platform.title}</h4>
              <p className="mt-3 text-white/70">{platform.description}</p>
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={() => navigateTo(DIGITAL_OFFERS_PAGE_ID)}
          className="group overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-950/35 via-black to-purple-950/25 text-left shadow-2xl transition hover:-translate-y-1 hover:border-cyan-300/55 hover:shadow-[0_0_34px_rgba(34,211,238,0.2)]"
        >
          <div className="relative h-64 overflow-hidden bg-black">
            <img
              src={editableDigitalOffersCard.image || digitalOffersCard.image}
              alt={editableDigitalOffersCard.title || digitalOffersCard.title}
              className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              onError={(e) => {
                if (e.currentTarget.src !== digitalOffersCard.image) {
                  e.currentTarget.src = digitalOffersCard.image;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-cyan-300/35 bg-black/55 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_32px_rgba(34,211,238,0.16)]">
              {editableDigitalOffersCard.kicker || digitalOffersCard.kicker}
            </div>
          </div>
          <div className="p-6">
            <div className="mb-3 inline-block rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">
              {editableDigitalOffersCard.badge || digitalOffersCard.badge}
            </div>
            <h4 className="text-3xl font-black">{editableDigitalOffersCard.title || digitalOffersCard.title}</h4>
            <p className="mt-3 text-white/70">{editableDigitalOffersCard.description || digitalOffersCard.description}</p>
          </div>
        </button>
      </div>
    </section>
  );

  const renderRechargeServicesPage = () => {
    const recargas = editableRechargeItems.filter((item) => item.type === "recarga");
    const streaming = editableRechargeItems.filter((item) => item.type === "streaming");

    const getServiceTheme = (item, type) => {
      const name = String(item?.name || "").toLowerCase();

      if (name.includes("netflix")) {
        return {
          accent: "red",
          card: "border-red-500/35 from-red-950/25 via-slate-950 to-black",
          glow: "from-red-500/20 via-transparent to-red-500/10",
          logoBorder: "border-red-500/45",
          logoGlow: "shadow-[0_0_38px_rgba(239,68,68,0.35)]",
          badge: "bg-red-500/20 text-red-200 border-red-400/35",
          button: "border-red-400/45 text-red-100 hover:bg-red-500/15",
        };
      }

      if (name.includes("disney")) {
        return {
          accent: "cyan",
          card: "border-cyan-400/35 from-cyan-950/25 via-slate-950 to-black",
          glow: "from-cyan-400/20 via-transparent to-blue-500/10",
          logoBorder: "border-cyan-400/45",
          logoGlow: "shadow-[0_0_38px_rgba(34,211,238,0.35)]",
          badge: "bg-cyan-400/20 text-cyan-200 border-cyan-300/35",
          button: "border-cyan-300/45 text-cyan-100 hover:bg-cyan-400/15",
        };
      }

      if (name.includes("max")) {
        return {
          accent: "blue",
          card: "border-blue-500/35 from-blue-950/25 via-slate-950 to-black",
          glow: "from-blue-500/20 via-transparent to-indigo-500/10",
          logoBorder: "border-blue-500/45",
          logoGlow: "shadow-[0_0_38px_rgba(59,130,246,0.35)]",
          badge: "bg-blue-500/20 text-blue-200 border-blue-400/35",
          button: "border-blue-400/45 text-blue-100 hover:bg-blue-500/15",
        };
      }

      if (name.includes("prime")) {
        return {
          accent: "sky",
          card: "border-sky-400/35 from-sky-950/25 via-slate-950 to-black",
          glow: "from-sky-400/20 via-transparent to-cyan-500/10",
          logoBorder: "border-sky-400/45",
          logoGlow: "shadow-[0_0_38px_rgba(56,189,248,0.35)]",
          badge: "bg-sky-400/20 text-sky-200 border-sky-300/35",
          button: "border-sky-300/45 text-sky-100 hover:bg-sky-400/15",
        };
      }

      if (name.includes("crunchy")) {
        return {
          accent: "orange",
          card: "border-orange-500/35 from-orange-950/25 via-slate-950 to-black",
          glow: "from-orange-500/20 via-transparent to-orange-400/10",
          logoBorder: "border-orange-500/45",
          logoGlow: "shadow-[0_0_38px_rgba(249,115,22,0.35)]",
          badge: "bg-orange-500/20 text-orange-200 border-orange-400/35",
          button: "border-orange-400/45 text-orange-100 hover:bg-orange-500/15",
        };
      }

      if (name.includes("flujo")) {
        return {
          accent: "orange",
          card: "border-orange-500/35 from-orange-950/25 via-slate-950 to-black",
          glow: "from-orange-500/20 via-transparent to-red-500/10",
          logoBorder: "border-orange-500/45",
          logoGlow: "shadow-[0_0_38px_rgba(249,115,22,0.35)]",
          badge: "bg-orange-500/20 text-orange-200 border-orange-400/35",
          button: "border-orange-400/45 text-orange-100 hover:bg-orange-500/15",
        };
      }

      if (type === "recarga") {
        return {
          accent: "cyan",
          card: "border-cyan-400/35 from-cyan-950/25 via-slate-950 to-black",
          glow: "from-cyan-400/20 via-transparent to-purple-500/10",
          logoBorder: "border-cyan-400/45",
          logoGlow: "shadow-[0_0_38px_rgba(34,211,238,0.32)]",
          badge: "bg-cyan-400/20 text-cyan-200 border-cyan-300/35",
          button: "border-cyan-300/45 text-cyan-100 hover:bg-cyan-400/15",
        };
      }

      return {
        accent: "purple",
        card: "border-purple-500/35 from-purple-950/25 via-slate-950 to-black",
        glow: "from-purple-500/20 via-transparent to-pink-500/10",
        logoBorder: "border-purple-500/45",
        logoGlow: "shadow-[0_0_38px_rgba(168,85,247,0.35)]",
        badge: "bg-purple-500/20 text-purple-200 border-purple-400/35",
        button: "border-purple-400/45 text-purple-100 hover:bg-purple-500/15",
      };
    };

    const getRechargeWhatsappMessage = (item, option) =>
      `Hola! Quiero consultar por ${getRechargeOptionTitle(item, option)}${option.price ? ` - ${option.price}` : ""}.`;

    const renderRechargeOptionCard = (item, option, theme) => (
      <article key={option.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white/55">
          {getRechargeTypeLabel(item.type)}
        </div>
        <h2 className="text-2xl font-black text-white">{getRechargeOptionTitle(item, option)}</h2>
        <div className="mt-3 text-2xl font-black text-cyan-300">{option.price}</div>
        <p className="mt-4 text-sm leading-6 text-white/68">{getRechargeOptionSeoText(item, option)}</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getRechargeWhatsappMessage(item, option))}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-3 text-sm font-black text-black shadow-lg shadow-green-500/15 transition hover:scale-[1.02] hover:bg-green-400 sm:w-auto"
        >
          Pedir por WhatsApp
        </a>
      </article>
    );

    const renderRechargeDetailPage = (item) => {
      const theme = getServiceTheme(item, item.type);
      const typeLabel = getRechargeTypeLabel(item.type);

      return (
        <>
          <section className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${theme.card} py-20`}>
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-80 blur-3xl`} />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_360px] lg:items-center">
              <div>
                <button onClick={() => navigateTo("recargas-servicios")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver a recargas</button>
                <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-black ${theme.badge}`}>{typeLabel}</span>
                <h1 className="mt-5 text-4xl font-black md:text-6xl">{item.name}</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{getRechargeSeoDescription(item)}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2">{item.options?.length || 0} opciones disponibles</span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2">Atención por WhatsApp</span>
                </div>
              </div>
              <div className={`flex h-72 items-center justify-center rounded-[32px] border bg-black/45 p-8 backdrop-blur-md ${theme.logoBorder} ${theme.logoGlow}`}>
                <img src={item.image} alt={item.name} className="max-h-48 w-full object-contain" />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-14">
            <div className="mb-8">
              <h2 className="text-3xl font-black md:text-4xl">Precios y opciones</h2>
              <p className="mt-3 text-white/60">Cada opción tiene texto SEO visible y consulta directa por WhatsApp.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(item.options || []).map((option) => renderRechargeOptionCard(item, option, theme))}
            </div>
          </section>
        </>
      );
    };

    if (activeRechargeSlug) {
      if (!activeRechargeItem) {
        return (
          <section className="mx-auto max-w-4xl px-6 py-24 text-center">
            <button onClick={() => navigateTo("recargas-servicios")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver a recargas</button>
            <h1 className="text-4xl font-black">No encontramos ese servicio</h1>
            <p className="mt-4 text-white/65">Puede que haya cambiado el nombre o que ya no esté disponible.</p>
          </section>
        );
      }

      return renderRechargeDetailPage(activeRechargeItem);
    }

    const renderCard = (item, type) => {
      const theme = getServiceTheme(item, type);

      return (
        <div
          key={item.id}
          className={`group relative overflow-hidden rounded-[30px] border bg-gradient-to-br ${theme.card} p-[1px] shadow-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.015]`}
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-80 blur-2xl transition duration-500 group-hover:opacity-100`} />
          <div className="relative h-full overflow-hidden rounded-[29px] bg-black/70 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.10),transparent_28%)]" />
            <div className="relative flex h-64 w-full items-center justify-center p-6">
              <div className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-tight ${theme.badge}`}>
                {type === "recarga" ? "Recarga" : "Streaming"}
              </div>
              <div className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-[11px] font-bold ${theme.badge}`}>
                {type === "recarga" ? "Entrega inmediata" : "Servicio digital"}
              </div>

              <div className={`flex h-36 w-full max-w-[260px] items-center justify-center rounded-[28px] border bg-black/45 px-6 py-5 backdrop-blur-md ${theme.logoBorder} ${theme.logoGlow}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-24 w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="relative p-6 pt-2">
              <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h4 className="text-2xl font-black tracking-tight text-white">{item.name}</h4>
              <p className="mt-2 min-h-[44px] text-sm leading-6 text-white/65">
                {type === "recarga"
                  ? "Elegí el paquete y pedilo directo por WhatsApp."
                  : "Planes disponibles, renovación y cuentas nuevas."}
              </p>

              <a
                href={`/${RECHARGE_ROUTE_PREFIX}${getRechargeItemRouteSlug(item)}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToRechargeItem(item);
                }}
                className={`mt-5 flex w-full items-center justify-between rounded-2xl border bg-black/35 px-5 py-4 text-sm font-black transition duration-300 ${theme.button}`}
              >
                <span>Ver precios y detalles</span>
                <span className="text-lg">›</span>
              </a>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
            <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta: /recargas-servicios</span>
            <h1 className="mt-5 text-4xl font-black md:text-6xl">Recargas y servicios</h1>
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
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{recargas.map((item) => renderCard(item, "recarga"))}</div>
          </section>
        )}

        {(rechargeFilter === "all" || rechargeFilter === "streaming") && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="mb-8">
              <h3 className="text-3xl font-black md:text-4xl">Servicios streaming</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{streaming.map((item) => renderCard(item, "streaming"))}</div>
          </section>
        )}
      </>
    );
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoginError("");

    const email = adminEmail.trim();
    if (!email || !adminPassword) {
      setAdminLoginError("Ingresá correo y contraseña.");
      return;
    }

    if (!supabase?.auth) {
      setAdminLoginError("Supabase Auth no está configurado.");
      return;
    }

    setIsAdminLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: adminPassword,
      });

      if (error) {
        console.error("Error iniciando sesión admin:", error);
        setAdminLoginError("Correo o contraseña incorrectos.");
        return;
      }

      setIsAdminAuthenticated(Boolean(data.session));
      setAdminUserEmail(data.user?.email || email);
      setAdminPassword("");
    } catch (err) {
      console.error("Error inesperado iniciando sesión admin:", err);
      setAdminLoginError("No se pudo iniciar sesión. Probá de nuevo.");
    } finally {
      setIsAdminLoginLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      if (supabase?.auth) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Error cerrando sesión admin:", err);
    }

    setIsAdminAuthenticated(false);
    setAdminUserEmail("");
    setAdminEmail("");
    setAdminPassword("");
    setAdminLoginError("");
  };

  const renderAdminLoginPage = () => (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
          <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta privada: /admin</span>
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
          <form onSubmit={handleAdminLogin} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h3 className="text-3xl font-black">Iniciar sesión</h3>
            <div className="mt-8 grid gap-4">
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="Correo admin" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/35" />
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/35" />
              {adminLoginError && <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">{adminLoginError}</div>}
              <button type="submit" disabled={isAdminLoginLoading} className="mt-2 rounded-2xl bg-cyan-400 px-6 py-4 font-black text-black disabled:cursor-not-allowed disabled:opacity-60">
                {isAdminLoginLoading ? "Ingresando..." : "Ingresar al panel"}
              </button>
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

    const updateDigitalOffersCard = (field, value) => {
      setDraftDigitalOffersCard((prev) => ({ ...prev, [field]: value }));
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

    const saveDigitalOffersCard = async () => {
      const next = normalizeDigitalOffersCard(draftDigitalOffersCard);
      setEditableDigitalOffersCard(next);
      setDraftDigitalOffersCard(next);

      const result = await saveWebContentToSupabase("digitalOffersCard", next);
      setContentSaveMessage(
        result.ok
          ? "Subcategoría Juegos digitales en oferta guardada correctamente."
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
      setDraftDigitalOffersCard(digitalOffersCard);
      setDraftOffers(defaultOffers);
      setEditableHeroSlides(heroSlides);
      setEditableCategories(categories);
      setEditableHeaderBackgrounds(headerBackgrounds);
      setEditableComboSlides(comboSlides);
      setEditableGamePlatforms(gamePlatforms);
      setEditableDigitalOffersCard(digitalOffersCard);
      setSavedOffers(defaultOffers);

      await Promise.all([
        saveWebContentToSupabase("heroSlides", heroSlides),
        saveWebContentToSupabase("categories", categories),
        saveWebContentToSupabase("headerBackgrounds", headerBackgrounds),
        saveWebContentToSupabase("comboSlides", comboSlides),
        saveWebContentToSupabase("gamePlatforms", gamePlatforms),
        saveWebContentToSupabase("digitalOffersCard", digitalOffersCard),
        saveWebContentToSupabase("offers", defaultOffers),
      ]);

      setContentSaveMessage("Se restauró el contenido visual.");
      setComboSaveMessage("");
      setOfferSaveMessage("");
    };

    const handleProductImageFileChange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setProductFormMessage("Procesando imagen y eliminando fondo blanco...");
        const processedImage = await removeWhiteBackgroundFromFile(file);
        setNewProductImage(processedImage);
        setProductFormMessage("Imagen cargada con fondo blanco eliminado. Guardá el producto para aplicar.");
      } catch (err) {
        console.error("Error procesando imagen:", err);
        setProductFormMessage(err?.message || "No se pudo procesar la imagen.");
      } finally {
        event.target.value = "";
      }
    };

    const getDigitalOfferPlatform = (platform) => {
      const normalizedPlatform = normalizeCatalogText(platform);
      return ["ps4", "ps5"].includes(normalizedPlatform) ? normalizedPlatform : "ps4";
    };

    const applyProductDigitalOffer = (checked) => {
      setNewProductDigitalOffer(checked);

      if (!checked) return;

      setNewProductCategory("juegos");
      setNewProductPlatform((prev) => getDigitalOfferPlatform(prev));
      setNewProductFormat("digital");
    };

    const handleProductCategoryChange = (value) => {
      setNewProductCategory(value);
      if (value !== "juegos") setNewProductDigitalOffer(false);
    };

    const handleProductPlatformChange = (value) => {
      setNewProductPlatform(value);
      if (newProductDigitalOffer && !["ps4", "ps5"].includes(normalizeCatalogText(value))) {
        setNewProductDigitalOffer(false);
      }
    };

    const handleProductFormatChange = (value) => {
      setNewProductFormat(value);
      if (value !== "digital") setNewProductDigitalOffer(false);
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

      if (newProductDigitalOffer && !newProductOriginalPrice.trim()) {
        setProductFormMessage("Para agregar a Juegos digitales en oferta cargá también el precio anterior / normal.");
        return;
      }

      const categoria = newProductDigitalOffer ? "juegos" : newProductCategory;
      const usaPlataforma = ["juegos", "accesorios"].includes(categoria);
      const productPlatform = newProductDigitalOffer ? getDigitalOfferPlatform(newProductPlatform) : newProductPlatform;
      const productFormat = newProductDigitalOffer ? "digital" : newProductFormat;

      const payloadBasico = {
        nombre: newProductName.trim(),
        precio: parseNumericPrice(newProductPrice) ?? 0,
        categoria,
        imagen: newProductImage.trim() || "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
        descripcion: newProductDescription.trim(),
        stock: 0,
        activo: true,
        featured: newProductFeatured,
        recent: newProductRecent,
      };

      const productCondition = categoria === "juegos" ? buildStoredCondition(newProductCondition, productFormat) : "Disponible";

      const payloadCompleto = {
        ...payloadBasico,
        plataforma: usaPlataforma ? productPlatform : null,
        precio_anterior: parseNumericPrice(newProductOriginalPrice),
        condicion: productCondition,
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
        setNewProductFormat("fisico");
        setNewProductDigitalOffer(false);
        setNewProductImage("");
        setNewProductDescription("");
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
      setNewProductFormat(product.format || getProductFormat(product.rawCondition, product.condition, product.description, product.name) || "fisico");
      setNewProductDigitalOffer(isDigitalOfferProduct(product));
      setNewProductImage(product.image || "");
      setNewProductDescription(product.description || "");
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
      setNewProductFormat("fisico");
      setNewProductDigitalOffer(false);
      setNewProductImage("");
      setNewProductDescription("");
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
      setNewRechargeOptions((prev) => [...prev, { id: Date.now() + Math.random(), label: "", price: "", description: "" }]);
    };

    const removeRechargeOption = (optionId) => {
      setNewRechargeOptions((prev) => prev.filter((option) => option.id !== optionId));
    };

    const resetRechargeForm = () => {
      setEditingRechargeId(null);
      setNewRechargeName("");
      setNewRechargeDescription("");
      setNewRechargeImage("");
      setNewRechargeType("recarga");
      setNewRechargeOptions([{ id: Date.now(), label: "", price: "", description: "" }]);
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
        description: newRechargeDescription.trim(),
        image: newRechargeImage.trim(),
        options: newRechargeOptions.map((option, index) => ({
          id: option.id || index + 1,
          label: option.label.trim(),
          price: option.price.trim(),
          description: option.description?.trim() || "",
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
      setNewRechargeDescription(item.description || "");
      setNewRechargeImage(item.image);
      setNewRechargeType(item.type);
      setNewRechargeOptions(item.options.map((option) => ({ description: "", ...option })));
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
                <button onClick={handleAdminLogout} className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20">Cerrar sesión</button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
            <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="mb-4 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Acceso</p>
                <p className="mt-2 break-words text-lg font-black">{adminUserEmail || "Sesión admin"}</p>
                <p className="mt-1 text-sm text-white/55">Ruta privada: /admin</p>
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
                      <input value={newProductOriginalPrice} onChange={(e) => setNewProductOriginalPrice(e.target.value)} placeholder="Precio anterior / normal (marca En oferta)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                      <select value={newProductCategory} onChange={(e) => handleProductCategoryChange(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="juegos">Juegos</option>
                        <option value="consolas">Consolas</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="recargas-servicios">Recargas y servicios</option>
                      </select>
                      <select value={newProductPlatform} onChange={(e) => handleProductPlatformChange(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
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
                      <select value={newProductFormat} onChange={(e) => handleProductFormatChange(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
                        <option value="fisico">Formato físico</option>
                        <option value="digital">Formato digital</option>
                      </select>
                      <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 text-sm md:col-span-2 ${
                        newProductDigitalOffer
                          ? "border-cyan-300/45 bg-cyan-400/15 text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.14)]"
                          : "border-cyan-400/15 bg-cyan-400/10 text-cyan-100"
                      }`}>
                        <input
                          type="checkbox"
                          checked={newProductDigitalOffer}
                          onChange={(e) => applyProductDigitalOffer(e.target.checked)}
                          className="mt-1"
                        />
                        <span>
                          <span className="block font-black">Agregar a Juegos digitales en oferta</span>
                          <span className="mt-1 block text-xs text-white/60">
                            Activa Juegos + PS4/PS5 + formato digital. Para que figure como oferta, cargá también el precio anterior / normal.
                          </span>
                        </span>
                      </label>
                      <textarea
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        placeholder="Descripción manual del producto. El bloque SEO se genera automáticamente."
                        className="min-h-[120px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2"
                      />
                      <div className="space-y-3 md:col-span-2">
                        <input
                          value={newProductImage.startsWith("data:image/") ? "Imagen subida y procesada con fondo transparente" : newProductImage}
                          onChange={(e) => setNewProductImage(e.target.value)}
                          placeholder="URL de imagen o subí un archivo"
                          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                        />
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="cursor-pointer rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-400/20">
                            Subir imagen y quitar fondo blanco
                            <input type="file" accept="image/*" onChange={handleProductImageFileChange} className="hidden" />
                          </label>
                          <span className="text-xs text-white/45">Ideal para cajas con fondo blanco liso.</span>
                        </div>
                        {newProductImage && (
                          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-3">
                            <img src={newProductImage} alt="Vista previa del producto" className="h-28 w-28 rounded-xl bg-black object-contain p-2" />
                            <div className="text-xs text-white/55">
                              Vista previa sobre fondo negro. Si queda algún borde blanco, probá con una foto más limpia o con fondo bien liso.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={newProductFeatured} onChange={(e) => setNewProductFeatured(e.target.checked)} /> Agregar a destacados</label>
                      <label className="flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={newProductRecent} onChange={(e) => setNewProductRecent(e.target.checked)} /> Agregar a recién llegados</label>
                    </div>
                    {newProductImage && (
                      <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-black/40 p-4">
                        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                          <div>
                            <div className="text-sm font-black text-cyan-300">Vista previa pública</div>
                            <p className="mt-1 text-xs text-white/50">Así se vería la tarjeta del producto para los clientes, sin guardar nada.</p>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/55">Solo prueba local</div>
                        </div>
                        <div className="max-w-sm">
                          {renderProductCard(
                            {
                              id: "preview-product",
                              name: newProductName.trim() || "Nombre del producto",
                              price: newProductPrice.trim() || "Gs. 0",
                              originalPrice: newProductOriginalPrice.trim(),
                              category: newProductDigitalOffer ? "juegos" : newProductCategory,
                              platform: ["juegos", "accesorios"].includes(newProductDigitalOffer ? "juegos" : newProductCategory)
                                ? newProductDigitalOffer
                                  ? getDigitalOfferPlatform(newProductPlatform)
                                  : newProductPlatform
                                : undefined,
                              condition: (newProductDigitalOffer ? "juegos" : newProductCategory) === "juegos" ? newProductCondition : "Disponible",
                              rawCondition: (newProductDigitalOffer ? "juegos" : newProductCategory) === "juegos"
                                ? buildStoredCondition(newProductCondition, newProductDigitalOffer ? "digital" : newProductFormat)
                                : "Disponible",
                              format: newProductDigitalOffer ? "digital" : newProductFormat,
                              image: newProductImage,
                              description: newProductDescription.trim(),
                              message: `Hola! Quiero consultar por ${newProductName.trim() || "este producto"}.`,
                            },
                            "Vista previa"
                          )}
                        </div>
                      </div>
                    )}
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
                            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-contain bg-black p-1" />
                            <div>
                              <div className="text-base font-bold text-white">{item.name}</div>
                              <div className="mt-1 text-sm text-white/60">
                                {item.category}{item.platform ? ` · ${item.platform.toUpperCase()}` : ""}{getProductFormatLabel(item) ? ` · ${getProductFormatLabel(item)}` : ""}{hasProductOffer(item) ? " · Oferta" : ""}
                              </div>
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
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                        <div className="mb-3 text-sm font-bold text-white">Juegos digitales en oferta</div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <input value={draftDigitalOffersCard.title || ""} onChange={(e) => updateDigitalOffersCard("title", e.target.value)} placeholder="Título" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                          <input value={draftDigitalOffersCard.badge || ""} onChange={(e) => updateDigitalOffersCard("badge", e.target.value)} placeholder="Etiqueta (ej: Oferta digital)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                          <input value={draftDigitalOffersCard.id || DIGITAL_OFFERS_PAGE_ID} disabled className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/50 outline-none" />
                          <input value={draftDigitalOffersCard.kicker || ""} onChange={(e) => updateDigitalOffersCard("kicker", e.target.value)} placeholder="Texto superior (ej: PS4 · PS5)" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
                          <input value={draftDigitalOffersCard.image || ""} onChange={(e) => updateDigitalOffersCard("image", e.target.value)} placeholder="URL de imagen / portada" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2" />
                          <textarea value={draftDigitalOffersCard.description || ""} onChange={(e) => updateDigitalOffersCard("description", e.target.value)} placeholder="Descripción" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2 min-h-[90px]" />
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button type="button" onClick={saveDigitalOffersCard} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-black">Guardar subcategoría</button>
                        </div>
                      </div>
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
                      <textarea
                        value={newRechargeDescription}
                        onChange={(e) => setNewRechargeDescription(e.target.value)}
                        placeholder="Descripción SEO/manual del servicio. Si lo dejás vacío, la web genera una automática."
                        className="min-h-[95px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-2"
                      />
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
                            <textarea
                              value={option.description || ""}
                              onChange={(e) => handleRechargeOptionChange(option.id, "description", e.target.value)}
                              placeholder="Descripción SEO opcional de esta opción. Si queda vacío, se genera automático."
                              className="min-h-[80px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none md:col-span-3"
                            />
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
                                <div className="mt-1 text-xs text-cyan-300">URL: /recargas-servicios/{getRechargeItemRouteSlug(item)}</div>
                                {item.description && <div className="mt-2 max-w-2xl text-sm text-white/55">{item.description}</div>}
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
              alt=""
              aria-hidden="true"
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
            <div className="text-3xl font-extrabold tracking-tighter text-cyan-400">SKAY GAMES</div>
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
          <>
            {renderRechargeServicesPage()}
            {renderCatalogFilters()}
            {renderCatalogProductsSection()}
          </>
        ) : activePage !== "home" ? (
          <>
            <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)] py-20">
              <div className="mx-auto max-w-7xl px-6">
                <button onClick={() => navigateTo("home")} className="mb-6 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10">← Volver al inicio</button>
                <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">Ruta: {activePage === "home" ? "/" : `/${activePage}`}</span>
                <h1 className="mt-5 text-4xl font-black md:text-6xl">{pageContent?.title}</h1>
                <p className="mt-4 text-xl text-white/75">{pageContent?.subtitle}</p>
                <p className="mt-4 max-w-3xl text-white/65">{pageContent?.description}</p>
              </div>
            </section>
            {activePage === "juegos" && renderGamesPlatformSelector()}
            {renderCatalogFilters()}
            {renderCatalogProductsSection()}
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
                    <h1 className="text-4xl font-black leading-tight md:text-6xl">{editableHeroSlides[currentSlide].title}</h1>
                    <p className="mt-5 text-lg text-white/75 md:text-xl">{editableHeroSlides[currentSlide].subtitle}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(editableHeroSlides[currentSlide].message)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-green-500 px-6 py-3 font-bold text-black transition hover:scale-105">{editableHeroSlides[currentSlide].buttonText}</a>
                      <button
                        type="button"
                        onClick={() => navigateTo(getHeroSlideTargetPage(editableHeroSlides[currentSlide]))}
                        className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-bold transition hover:bg-white/10"
                      >
                        Ver sección
                      </button>
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
                  <button key={item.id} onClick={() => navigateTo(item.id)} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_0_32px_rgba(34,211,238,0.16)]">
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
                      <div className="mt-4 inline-flex w-full items-center justify-between gap-3 rounded-2xl border border-cyan-300/55 bg-gradient-to-r from-slate-950 via-black to-cyan-950/40 px-4 py-3 text-sm font-black text-white shadow-[0_0_18px_rgba(34,211,238,0.18)] transition duration-300 group-hover:border-cyan-200 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] sm:w-auto">
                        {renderCategoryCtaContent(item.id)}
                      </div>
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
