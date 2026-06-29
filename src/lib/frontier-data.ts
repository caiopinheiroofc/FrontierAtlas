import {
  categories as fallbackCategories,
  guides as fallbackGuides,
  suppliers as fallbackSuppliers,
  stores as fallbackStores,
  type Category,
  type Guide,
  type ScoreBreakdown,
  type Store,
  type Supplier,
} from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase/client";

type StoreRow = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  main_category: string | null;
  secondary_categories: string | null;
  city: string | null;
  country: string | null;
  address: string | null;
  google_maps_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  whatsapp: string | null;
  opening_hours: string | null;
  payment_methods: string | null;
  parking_info: string | null;
  tags: string | null;
  recommended_products: string | null;
  review_summary: string | null;
  frontier_note: string | null;
  frontier_score: number | null;
  price_score: number | null;
  trust_score: number | null;
  variety_score: number | null;
  service_score: number | null;
  warranty_score: number | null;
  location_score: number | null;
  parking_score: number | null;
  wholesale_score: number | null;
  is_featured: boolean | null;
  is_premium: boolean | null;
  sells_wholesale: boolean | null;
  status: string | null;
};

type SupplierRow = {
  id: string;
  name: string;
  slug: string;
  segment: string | null;
  description: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
  website_url: string | null;
  minimum_order: string | null;
  sells_wholesale: boolean | null;
  ships_to_brazil: boolean | null;
  payment_methods: string | null;
  frontier_note: string | null;
  is_premium: boolean | null;
  status: string | null;
};

type GuideRow = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  content: string | null;
  is_premium: boolean | null;
  accent: string | null;
  status: string | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean | null;
};

export async function getStores(): Promise<Store[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackStores;

  const { data, error } = await supabase
    .from("stores")
    .select(
      "id,name,slug,short_description,full_description,main_category,secondary_categories,city,country,address,google_maps_url,instagram_url,website_url,whatsapp,opening_hours,payment_methods,parking_info,tags,recommended_products,review_summary,frontier_note,frontier_score,price_score,trust_score,variety_score,service_score,warranty_score,location_score,parking_score,wholesale_score,is_featured,is_premium,sells_wholesale,status",
    )
    .in("status", ["active", "review"])
    .order("name");

  if (error || !data?.length) return fallbackStores;
  return data.map(mapStoreRow);
}

export async function getSuppliers(): Promise<Supplier[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackSuppliers;

  const { data, error } = await supabase
    .from("suppliers")
    .select(
      "id,name,slug,segment,description,instagram_url,whatsapp,website_url,minimum_order,sells_wholesale,ships_to_brazil,payment_methods,frontier_note,is_premium,status",
    )
    .in("status", ["active", "review"])
    .order("name");

  if (error || !data?.length) return fallbackSuppliers;
  return data.map(mapSupplierRow);
}

export async function getGuides(): Promise<Guide[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackGuides;

  const { data, error } = await supabase
    .from("guides")
    .select("id,title,slug,category,summary,content,is_premium,accent,status")
    .in("status", ["active", "review"])
    .order("title");

  if (error || !data?.length) return fallbackGuides;
  return data.map(mapGuideRow);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description,type,icon,color,is_active")
    .eq("is_active", true)
    .order("order");

  if (error || !data?.length) return fallbackCategories;
  return data.map(mapCategoryRow);
}

export async function getStoreBySlug(slug: string) {
  const stores = await getStores();
  return stores.find((store) => store.slug === slug);
}

export async function getRelatedStores(store: Store) {
  const stores = await getStores();
  return stores
    .filter(
      (candidate) =>
        candidate.slug !== store.slug &&
        candidate.categorySlugs.some((slug) => store.categorySlugs.includes(slug)),
    )
    .slice(0, 3);
}

export async function searchAll(query: string) {
  const [stores, guides, suppliers, categories] = await Promise.all([
    getStores(),
    getGuides(),
    getSuppliers(),
    getCategories(),
  ]);

  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return {
      stores: stores.slice(0, 6),
      guides: guides.slice(0, 4),
      suppliers: suppliers.slice(0, 4),
      categories: categories.slice(0, 6),
    };
  }

  const includesText = (values: string[]) =>
    values.some((value) => value.toLowerCase().includes(normalized));

  return {
    stores: stores.filter((store) =>
      includesText([
        store.name,
        store.shortDescription,
        store.fullDescription,
        store.city,
        ...store.tags,
        ...store.categorySlugs,
        ...store.missionSlugs,
      ]),
    ),
    guides: guides.filter((guide) =>
      includesText([guide.title, guide.summary, guide.category, ...guide.content]),
    ),
    suppliers: suppliers.filter((supplier) =>
      includesText([
        supplier.name,
        supplier.segment,
        supplier.description,
        supplier.frontierNote,
      ]),
    ),
    categories: categories.filter((category) =>
      includesText([category.name, category.description, category.slug]),
    ),
  };
}

function mapStoreRow(row: StoreRow): Store {
  const mainCategory = slugifyLoose(row.main_category || "tecnologia");
  const secondary = splitCsv(row.secondary_categories);
  const categorySlugs = Array.from(new Set([mainCategory, ...secondary]));
  const score = {
    price: normalizeScoreUnit(row.price_score, 4),
    trust: normalizeScoreUnit(row.trust_score, 4),
    variety: normalizeScoreUnit(row.variety_score, 4),
    service: normalizeScoreUnit(row.service_score, 4),
    warranty: normalizeScoreUnit(row.warranty_score, 4),
    location: normalizeScoreUnit(row.location_score, 4),
    parking: normalizeScoreUnit(row.parking_score, 4),
    wholesale: normalizeScoreUnit(row.wholesale_score, row.sells_wholesale ? 4 : 2),
  } satisfies ScoreBreakdown;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description || "Descrição curta em atualização.",
    fullDescription: row.full_description || row.short_description || "Descrição em atualização.",
    categorySlugs,
    missionSlugs: inferMissionSlugs(categorySlugs),
    city: row.city || "Ciudad del Este",
    country: row.country || "Paraguai",
    address: row.address || "Endereço em verificação",
    googleMapsUrl: row.google_maps_url || "",
    instagramUrl: row.instagram_url || undefined,
    websiteUrl: row.website_url || undefined,
    whatsapp: row.whatsapp || undefined,
    openingHours: row.opening_hours || "Horário em verificação",
    paymentMethods: splitCsv(row.payment_methods),
    parkingInfo: row.parking_info || "Informação em verificação",
    coverAccent: accentFromCategory(mainCategory),
    logoText: initials(row.name),
    tags: splitCsv(row.tags),
    featured: Boolean(row.is_featured),
    premium: Boolean(row.is_premium),
    score,
    reviewSummary: row.review_summary || "Avaliação inicial em atualização.",
    worthIt: row.frontier_note || row.review_summary || "Análise em atualização.",
    recommendedProducts: splitCsv(row.recommended_products),
  };
}

function mapSupplierRow(row: SupplierRow): Supplier {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    segment: row.segment || "Fornecedor",
    description: row.description || "Descrição em atualização.",
    instagramUrl: row.instagram_url || undefined,
    whatsapp: row.whatsapp || undefined,
    websiteUrl: row.website_url || undefined,
    minimumOrder: row.minimum_order || "to_verify",
    sellsWholesale: Boolean(row.sells_wholesale),
    shipsToBrazil: Boolean(row.ships_to_brazil),
    paymentMethods: splitCsv(row.payment_methods),
    frontierNote: row.frontier_note || "Observação Frontier em atualização.",
    premium: Boolean(row.is_premium),
    accent: accentFromSegment(row.segment),
  };
}

function mapGuideRow(row: GuideRow): Guide {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category || "Guia",
    summary: row.summary || "Resumo em atualização.",
    content: splitParagraphs(row.content),
    premium: Boolean(row.is_premium),
    accent: row.accent || "from-blue-600 to-cyan-400",
  };
}

function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    type: normalizeCategoryType(row.type),
    icon: row.icon || "Compass",
    accent: colorToAccent(row.color),
  };
}

function splitCsv(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string | null) {
  const paragraphs = value
    ? value
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  return paragraphs.length ? paragraphs : ["Conteúdo em atualização."];
}

function normalizeScoreUnit(value: number | null, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback * 2;
  return value <= 5 ? Number((value * 2).toFixed(1)) : value;
}

function slugifyLoose(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function inferMissionSlugs(categorySlugs: string[]) {
  const missionMap: Record<string, string> = {
    tecnologia: "eletronicos",
    perfumes: "perfumes",
    casa: "casa",
    games: "games",
    moda: "moda",
    moto: "moto",
    atacado: "revenda",
  };

  const missions = categorySlugs
    .map((slug) => missionMap[slug])
    .filter(Boolean);

  return Array.from(new Set(missions.length ? missions : ["primeira-viagem"]));
}

function accentFromCategory(category: string) {
  const map: Record<string, string> = {
    tecnologia: "from-sky-950 via-sky-700 to-cyan-400",
    perfumes: "from-rose-950 via-fuchsia-700 to-pink-400",
    casa: "from-amber-950 via-amber-700 to-yellow-300",
    games: "from-violet-950 via-violet-700 to-fuchsia-500",
    moda: "from-pink-950 via-rose-700 to-orange-300",
    moto: "from-lime-950 via-green-700 to-emerald-400",
    atacado: "from-yellow-950 via-orange-700 to-lime-300",
  };

  return map[category] || "from-zinc-900 via-zinc-700 to-emerald-500";
}

function accentFromSegment(segment: string | null) {
  const slug = slugifyLoose(segment || "");
  return (
    {
      apple: "from-slate-900 to-sky-500",
      perfumes: "from-rose-900 to-fuchsia-500",
      roupas: "from-orange-900 to-pink-500",
      casa: "from-amber-900 to-yellow-400",
      brinquedos: "from-indigo-900 to-violet-500",
      moto: "from-lime-900 to-green-500",
      games: "from-violet-900 to-indigo-500",
      atacado: "from-emerald-900 to-teal-500",
    }[slug] || "from-zinc-900 to-zinc-500"
  );
}

function normalizeCategoryType(type: string | null): Category["type"] {
  if (type === "mission" || type === "source" || type === "guide") return type;
  return "store";
}

function colorToAccent(color: string | null) {
  if (!color) return "from-zinc-500 to-zinc-700";
  return `from-[${color}] to-zinc-900`;
}
