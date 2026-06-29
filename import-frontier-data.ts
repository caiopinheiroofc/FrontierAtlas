import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { guides as fallbackGuides } from "./src/lib/data";

type EntityType =
  | "stores"
  | "suppliers"
  | "restaurants"
  | "hotels"
  | "exchange_houses"
  | "parking"
  | "categories"
  | "collections"
  | "guides";

const tableSchemas: Record<EntityType, string[]> = {
  stores: [
    "id","name","slug","main_category","secondary_categories","short_description","full_description","city","country","address","latitude","longitude","google_maps_url","instagram_url","facebook_url","website_url","whatsapp","phone","opening_hours","payment_methods","parking_info","has_air_conditioning","has_restroom","sells_wholesale","ships_to_brazil","warranty_info","recommended_products","brands","tags","frontier_score","price_score","trust_score","variety_score","service_score","warranty_score","location_score","parking_score","wholesale_score","review_summary","frontier_note","is_featured","is_partner","is_premium","status","last_verified_at",
  ],
  suppliers: [
    "id","name","slug","segment","description","city","country","address","latitude","longitude","google_maps_url","instagram_url","facebook_url","website_url","whatsapp","phone","minimum_order","sells_wholesale","ships_to_brazil","payment_methods","product_categories","brands","frontier_note","frontier_score","is_premium","status","last_verified_at",
  ],
  restaurants: [
    "id","name","slug","cuisine_type","description","city","country","address","latitude","longitude","google_maps_url","instagram_url","website_url","whatsapp","phone","opening_hours","price_range","best_for","parking_info","frontier_score","frontier_note","status","last_verified_at",
  ],
  hotels: [
    "id","name","slug","description","city","country","address","latitude","longitude","google_maps_url","instagram_url","website_url","whatsapp","phone","price_range","distance_to_microcentro","amenities","parking_info","frontier_score","frontier_note","status","last_verified_at",
  ],
  exchange_houses: [
    "id","name","slug","description","city","country","address","latitude","longitude","google_maps_url","instagram_url","website_url","whatsapp","phone","opening_hours","locations","frontier_score","frontier_note","status","last_verified_at",
  ],
  parking: [
    "id","name","slug","description","city","country","address","latitude","longitude","google_maps_url","whatsapp","phone","opening_hours","price_range","security_level","covered","frontier_score","frontier_note","status","last_verified_at",
  ],
  categories: ["id","name","slug","type","icon","color","description","is_active","order"],
  collections: ["id","title","slug","description","objective","icon","cover_image","is_premium","status","order"],
  guides: ["id","title","slug","category","summary","content","is_premium","accent","status"],
};

const boolLike = new Set([
  "has_air_conditioning",
  "has_restroom",
  "sells_wholesale",
  "ships_to_brazil",
  "is_featured",
  "is_partner",
  "is_premium",
  "covered",
  "is_active",
]);

const numberLike = new Set([
  "latitude",
  "longitude",
  "frontier_score",
  "price_score",
  "trust_score",
  "variety_score",
  "service_score",
  "warranty_score",
  "location_score",
  "parking_score",
  "wholesale_score",
  "order",
]);

async function main() {
  const csvPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve("./frontier-atlas-master-data.csv");

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de rodar o import.");
  }

  const csvText = await fs.readFile(csvPath, "utf8");
  const rows = parseCsv(csvText);

  if (!rows.length) {
    throw new Error("O CSV mestre esta vazio.");
  }

  const [header, ...body] = rows;
  const entityIndex = header.indexOf("entity_type");

  if (entityIndex < 0) {
    throw new Error("A coluna entity_type e obrigatoria no CSV mestre.");
  }

  const byEntity: Record<string, Record<string, unknown>[]> = {};

  for (const row of body) {
    const entity = row[entityIndex] as EntityType;
    if (!entity || !(entity in tableSchemas)) continue;

    const record: Record<string, unknown> = {};
    for (let i = 0; i < header.length; i += 1) {
      const column = header[i];
      if (column === "entity_type") continue;
      if (!tableSchemas[entity].includes(column)) continue;
      record[column] = normalizeValue(column, row[i] ?? "");
    }

    if (!byEntity[entity]) byEntity[entity] = [];
    byEntity[entity].push(record);
  }

  if (!byEntity.guides?.length) {
    byEntity.guides = fallbackGuides.map((guide) => ({
      id: guide.id,
      title: guide.title,
      slug: guide.slug,
      category: guide.category,
      summary: guide.summary,
      content: guide.content.join(" || "),
      is_premium: guide.premium,
      accent: guide.accent,
      status: "review",
    }));
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (const [entity, records] of Object.entries(byEntity)) {
    if (!records.length) continue;
    const { error } = await supabase.from(entity).upsert(records, { onConflict: "id" });
    if (error) {
      throw new Error(`Falha ao importar ${entity}: ${error.message}`);
    }
    console.log(`Importados ${records.length} registros em ${entity}.`);
  }
}

function normalizeValue(column: string, raw: string): unknown {
  const value = raw.trim();

  if (!value || value.toLowerCase() === "to_verify") return null;

  if (boolLike.has(column)) {
    if (value === "TRUE") return true;
    if (value === "FALSE") return false;
    return null;
  }

  if (numberLike.has(column)) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return value;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        currentValue += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }

    currentValue += char;
  }

  if (currentValue.length || currentRow.length) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }

  return rows;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
