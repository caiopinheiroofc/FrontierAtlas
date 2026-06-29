import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as cheerio from "cheerio";

const BASE_URL = "https://www.comprasparaguai.com.br";
const LIST_URL = `${BASE_URL}/lojas/`;
const OUTPUT_DIR = path.resolve("outputs/compras-paraguai");
const MASTER_STORE_HEADERS = [
  "entity_type",
  "id",
  "name",
  "slug",
  "main_category",
  "secondary_categories",
  "short_description",
  "full_description",
  "city",
  "country",
  "address",
  "latitude",
  "longitude",
  "google_maps_url",
  "instagram_url",
  "facebook_url",
  "website_url",
  "whatsapp",
  "phone",
  "opening_hours",
  "payment_methods",
  "parking_info",
  "has_air_conditioning",
  "has_restroom",
  "sells_wholesale",
  "ships_to_brazil",
  "warranty_info",
  "recommended_products",
  "brands",
  "tags",
  "frontier_score",
  "price_score",
  "trust_score",
  "variety_score",
  "service_score",
  "warranty_score",
  "location_score",
  "parking_score",
  "wholesale_score",
  "review_summary",
  "frontier_note",
  "is_featured",
  "is_partner",
  "is_premium",
  "status",
  "last_verified_at",
];

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  }),
);

const requestedLimit = Number(args.get("limit") || "");
const limit = Number.isFinite(requestedLimit) && requestedLimit > 0 ? requestedLimit : null;
const requestedMaxPages = Number(args.get("max-pages") || "");
const maxPages = Number.isFinite(requestedMaxPages) && requestedMaxPages > 0 ? requestedMaxPages : 20;

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const listStores = await collectStoreList();
  const storesToProcess = limit ? listStores.slice(0, limit) : listStores;
  const extractedAt = new Date().toISOString();

  const detailedStores = [];

  for (const [index, store] of storesToProcess.entries()) {
    console.log(`Extraindo ${index + 1}/${storesToProcess.length}: ${store.name}`);
    const detailHtml = await fetchHtml(store.detailUrl);
    const detail = parseStoreDetail(detailHtml, store.name);
    detailedStores.push(buildStoreRecord(store, detail, extractedAt));
    await sleep(250);
  }

  const rawPath = path.join(OUTPUT_DIR, "compras-paraguai-stores-raw.json");
  const frontierJsonPath = path.join(OUTPUT_DIR, "compras-paraguai-stores-frontier.json");
  const frontierCsvPath = path.join(OUTPUT_DIR, "compras-paraguai-stores-frontier.csv");
  const summaryPath = path.join(OUTPUT_DIR, "compras-paraguai-stores-summary.json");

  await fs.writeFile(rawPath, JSON.stringify(detailedStores, null, 2), "utf8");
  await fs.writeFile(
    frontierJsonPath,
    JSON.stringify(detailedStores.map(toFrontierStoreRow), null, 2),
    "utf8",
  );
  await fs.writeFile(
    frontierCsvPath,
    toCsv(detailedStores.map(toFrontierStoreRow), MASTER_STORE_HEADERS),
    "utf8",
  );
  await fs.writeFile(
    summaryPath,
    JSON.stringify(
      {
        extracted_at: extractedAt,
        source_url: LIST_URL,
        total_stores_found: listStores.length,
        total_stores_exported: detailedStores.length,
        output_files: {
          raw: rawPath,
          frontier_json: frontierJsonPath,
          frontier_csv: frontierCsvPath,
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Pronto. ${detailedStores.length} lojas exportadas em ${OUTPUT_DIR}`);
}

function parseStoreList(html) {
  const $ = cheerio.load(html);
  const stores = [];

  $(".str-results-group-body-item.js-result-item").each((_, element) => {
    const card = $(element);
    const detailPath = card.find('a[href^="/lojas/"]').first().attr("href");
    const name = cleanText(card.find(".establishment-name").first().text());

    if (!detailPath || !name) return;

    const ratingStyle = card.find(".str-col-reviews-stars-inner").first().attr("style") || "";
    const ratingPercent = Number((ratingStyle.match(/width:\s*([\d.]+)%/) || [])[1] || "");
    const reviewCount = Number(
      cleanText(card.find(".establishment-votes").first().text()).replace(/[^\d]/g, ""),
    );

    stores.push({
      name,
      slug: detailPath.replace(/^\/lojas\//, "").replace(/\/$/, ""),
      detailUrl: absoluteUrl(detailPath),
      typeLabel: cleanText(card.find(".establishment-type").first().text()),
      websiteUrl: card.find('.line-3 a[target="_blank"]').first().attr("href") || "",
      searchUrl: absoluteUrl(card.find('.line-3 a[href^="/busca/"]').first().attr("href") || ""),
      imageUrl: card.find("img").first().attr("data-src") || card.find("img").first().attr("src") || "",
      openingHours: cleanText(card.find(".working-time").first().text()),
      ratingPercent: Number.isFinite(ratingPercent) ? ratingPercent : null,
      reviewCount: Number.isFinite(reviewCount) ? reviewCount : null,
      differentials: card
        .find(".diferenciais-est li[title]")
        .map((__, item) => cleanText($(item).attr("title")))
        .get()
        .filter(Boolean),
      premiumListing: card.hasClass("premium"),
    });
  });

  return stores;
}

async function collectStoreList() {
  const allStores = [];
  const seenSlugs = new Set();

  for (let page = 1; page <= maxPages; page += 1) {
    const pageUrl = page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`;
    const html = await fetchHtml(pageUrl);
    const pageStores = parseStoreList(html);
    const freshStores = pageStores.filter((store) => !seenSlugs.has(store.slug));

    for (const store of freshStores) {
      seenSlugs.add(store.slug);
      allStores.push(store);
    }

    console.log(
      `Lista page ${page}: ${pageStores.length} lojas encontradas, ${freshStores.length} novas, total ${allStores.length}.`,
    );

    if (!pageStores.length || !freshStores.length) break;
    if (limit && allStores.length >= limit) break;
  }

  return allStores;
}

function parseStoreDetail(html, name) {
  const $ = cheerio.load(html);
  const contactLinks = $(".str-contact-box .str-contact-list li a");
  const socialLinks = $(".box-social-icons a");

  const whatsappUrl = contactLinks
    .filter((_, element) => /Whatsapp/i.test($(element).attr("title") || ""))
    .first()
    .attr("href");
  const whatsapp = normalizePhone(
    (whatsappUrl || "").match(/phone=([0-9]+)/)?.[1] ||
      contactLinks
        .filter((_, element) => /Whatsapp/i.test($(element).text()))
        .first()
        .text(),
  );

  const phone = normalizePhone(
    contactLinks
      .filter((_, element) => /Telefone/i.test($(element).attr("title") || ""))
      .first()
      .text(),
  );

  const messenger = contactLinks
    .filter((_, element) => /Messenger/i.test($(element).attr("title") || ""))
    .first()
    .attr("href") || "";

  const emailAnchor = contactLinks
    .filter((_, element) => /Email/i.test($(element).text()))
    .first();
  const emailHref = emailAnchor.attr("href") || "";
  const email = decodeCloudflareEmail(emailHref) || extractEmail(emailAnchor.text());

  const overallHours = extractHoursFromPopover($);
  const aboutText = extractSectionTextByHeading($, new RegExp(`^Sobre\\s+${escapeRegex(name)}$`, "i"));
  const warrantyText = extractSectionTextByHeading($, /^Diferenciais e Garantias$/i);
  const warrantyUrl =
    $('a.btn-garantia[href^="http"]').first().attr("href") ||
    $('a[href*="garantia"]').first().attr("href") ||
    "";

  const categories = $(".str-detail-about-categs a")
    .map((_, element) => cleanText($(element).attr("title") || $(element).text()))
    .get()
    .filter(Boolean);

  const branches = $("#enderecos .str-detail-storelist-item")
    .map((_, element) => {
      const item = $(element);
      const label = cleanText(item.find(".btn-accordion strong").first().text());
      const hours = cleanText(item.find(".horario-funcionamento-filiais p").first().text());
      const mapNode = item.find(".js-mapa-loja-meio").first();
      const latitude = toNumber(mapNode.attr("data-lat"));
      const longitude = toNumber(mapNode.attr("data-lng"));
      const city = label.includes(" - ") ? cleanText(label.split(" - ").at(-1)) : "";

      return {
        label,
        city,
        openingHours: hours,
        latitude,
        longitude,
        googleMapsUrl:
          latitude !== null && longitude !== null
            ? `https://maps.google.com/?q=${latitude},${longitude}`
            : "",
      };
    })
    .get()
    .filter((branch) => branch.label);

  const instagramUrl = findSocialLink(socialLinks, "Instagram");
  const facebookUrl = findSocialLink(socialLinks, "Facebook");
  const youtubeUrl = findSocialLink(socialLinks, "Youtube");
  const twitterUrl = findSocialLink(socialLinks, "Twitter");

  return {
    whatsapp,
    whatsappUrl: whatsappUrl || "",
    phone,
    messenger,
    email,
    instagramUrl,
    facebookUrl,
    youtubeUrl,
    twitterUrl,
    overallHours,
    aboutText,
    warrantyText,
    warrantyUrl,
    categories,
    branches,
  };
}

function buildStoreRecord(listStore, detail, extractedAt) {
  const primaryBranch =
    detail.branches.find((branch) => /Ciudad del Este/i.test(branch.city || branch.label)) ||
    detail.branches[0] ||
    null;

  const normalizedCategories = normalizeFrontierCategories([
    listStore.typeLabel,
    ...detail.categories,
    ...listStore.differentials,
  ]);
  const mainCategory = normalizedCategories[0] || "tecnologia";
  const secondaryCategories = normalizedCategories.slice(1);
  const recommendedProducts = detail.categories.slice(0, 8);
  const paymentMethods = inferPaymentMethods(listStore.differentials);
  const hasParking = hasKeyword(listStore.differentials, ["estacionamento"]);
  const hasRestroom = hasKeyword(listStore.differentials, ["banheiro"]);
  const hasAirConditioning = hasKeyword(listStore.differentials, [
    "ar condicionado",
    "climatizado",
  ]);
  const sellsWholesale = /atacado/i.test(`${listStore.name} ${listStore.typeLabel}`) ||
    hasKeyword(detail.categories, ["atacado", "distribuidor"]);
  const tags = [
    "compras-paraguai",
    ...secondaryCategories,
    ...(listStore.premiumListing ? ["premium-listing"] : []),
    ...listStore.differentials.map((item) => slugify(item)),
  ]
    .filter(Boolean)
    .filter(uniqueOnly);

  return {
    source: {
      extractedAt,
      listUrl: LIST_URL,
      detailUrl: listStore.detailUrl,
      searchUrl: listStore.searchUrl,
    },
    id: `store-${slugify(listStore.slug)}`,
    slug: slugify(listStore.slug),
    name: listStore.name,
    typeLabel: listStore.typeLabel,
    websiteUrl: listStore.websiteUrl,
    imageUrl: listStore.imageUrl,
    premiumListing: listStore.premiumListing,
    reviewCount: listStore.reviewCount,
    ratingPercent: listStore.ratingPercent,
    listOpeningHours: listStore.openingHours,
    differentials: listStore.differentials,
    contacts: {
      whatsapp: detail.whatsapp,
      whatsappUrl: detail.whatsappUrl,
      phone: detail.phone,
      messenger: detail.messenger,
      email: detail.email,
    },
    social: {
      instagramUrl: detail.instagramUrl,
      facebookUrl: detail.facebookUrl,
      youtubeUrl: detail.youtubeUrl,
      twitterUrl: detail.twitterUrl,
    },
    detailCategories: detail.categories,
    aboutText: detail.aboutText,
    warrantyText: detail.warrantyText,
    warrantyUrl: detail.warrantyUrl,
    branches: detail.branches,
    frontierDraft: {
      entity_type: "stores",
      id: `store-${slugify(listStore.slug)}`,
      name: listStore.name,
      slug: slugify(listStore.slug),
      main_category: mainCategory,
      secondary_categories: secondaryCategories.join(","),
      short_description: `${listStore.typeLabel} listada no Compras Paraguai, com ficha automatizada para revisão editorial do Frontier Atlas.`,
      full_description:
        detail.aboutText ||
        `${listStore.name} aparece no Compras Paraguai com categorias, contatos e dados operacionais que ainda devem passar por curadoria do Frontier Atlas.`,
      city: primaryBranch?.city || "Ciudad del Este",
      country: "Paraguai",
      address: primaryBranch?.label || `${listStore.name} - endereço em revisão`,
      latitude: primaryBranch?.latitude ?? "",
      longitude: primaryBranch?.longitude ?? "",
      google_maps_url: primaryBranch?.googleMapsUrl || "",
      instagram_url: detail.instagramUrl,
      facebook_url: detail.facebookUrl,
      website_url: listStore.websiteUrl,
      whatsapp: detail.whatsapp,
      phone: detail.phone,
      opening_hours: primaryBranch?.openingHours || detail.overallHours || listStore.openingHours,
      payment_methods: paymentMethods.join(","),
      parking_info: hasParking
        ? "Compras Paraguai indica disponibilidade de estacionamento; validar detalhes no local."
        : "to_verify",
      has_air_conditioning: boolOrVerify(hasAirConditioning),
      has_restroom: boolOrVerify(hasRestroom),
      sells_wholesale: boolOrVerify(sellsWholesale),
      ships_to_brazil: "to_verify",
      warranty_info: [detail.warrantyText, detail.warrantyUrl].filter(Boolean).join(" | "),
      recommended_products: recommendedProducts.join(","),
      brands: "",
      tags: tags.join(","),
      frontier_score: "",
      price_score: "",
      trust_score: "",
      variety_score: "",
      service_score: "",
      warranty_score: "",
      location_score: "",
      parking_score: "",
      wholesale_score: "",
      review_summary: buildReviewSummary(listStore.reviewCount, listStore.ratingPercent),
      frontier_note:
        `Importado automaticamente do Compras Paraguai em ${extractedAt.slice(0, 10)}. Revisar contato, política comercial e consistência editorial antes de publicar.`,
      is_featured: listStore.premiumListing ? "TRUE" : "FALSE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "draft",
      last_verified_at: extractedAt,
    },
  };
}

function toFrontierStoreRow(store) {
  return store.frontierDraft;
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      "accept-language": "pt-BR,pt;q=0.9,en;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao baixar ${url}: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

function extractHoursFromPopover($) {
  const content = $('.str-detail-thumbnail[data-content]').first().attr("data-content") || "";
  const text = cleanText(cheerio.load(`<div>${content}</div>`).text());
  return text.replace(/^Funcionamento\s*\(\s*Horário Brasil\s*\)\s*/i, "").trim();
}

function extractSectionTextByHeading($, headingRegex) {
  const heading = $("h2, h3")
    .toArray()
    .find((element) => headingRegex.test(cleanText($(element).text())));

  if (!heading) return "";

  const chunks = [];
  let current = $(heading).next();

  while (current.length) {
    if (/^h[1-6]$/i.test(current.get(0).tagName || "")) break;
    if (current.is("p")) {
      const text = cleanText(current.text());
      if (text) chunks.push(text);
    }
    current = current.next();
  }

  return chunks.join("\n\n");
}

function findSocialLink(collection, title) {
  return (
    collection
      .filter((_, element) => new RegExp(title, "i").test(element.attribs?.title || ""))
      .first()
      .attr("href") || ""
  );
}

function normalizeFrontierCategories(values) {
  const scores = new Map();
  const preference = [
    "tecnologia",
    "perfumes",
    "casa",
    "games",
    "moda",
    "automotivo",
    "moto",
    "gastronomia",
    "hoteis",
    "cambio",
    "estacionamento",
    "atacado",
  ];

  const add = (category, weight = 1) => {
    scores.set(category, (scores.get(category) || 0) + weight);
  };

  for (const rawValue of values) {
    const value = slugify(rawValue);
    if (!value) continue;

    if (matchesAny(value, ["loja-de-eletronicos", "loja-de-informatica"])) {
      add("tecnologia", 4);
    }

    if (matchesAny(value, ["loja-de-departamentos", "departamentos"])) {
      add("tecnologia", 2);
      add("perfumes", 2);
      add("casa", 2);
    }

    if (matchesAny(value, ["restaurante", "gastronomia", "alimentos", "bebidas", "petisquera"])) {
      add("gastronomia", matchesAny(value, ["restaurante", "petisquera"]) ? 4 : 1);
      continue;
    }

    if (matchesAny(value, ["hotel", "hosped"])) {
      add("hoteis", 4);
      continue;
    }

    if (matchesAny(value, ["cambio", "moeda"])) {
      add("cambio", 4);
      continue;
    }

    if (matchesAny(value, ["estacionamento"])) {
      add("estacionamento", 1);
      continue;
    }

    if (matchesAny(value, ["moto", "capacete"])) {
      add("moto", 2);
      continue;
    }

    if (matchesAny(value, ["automot", "som-e-video-automotivo", "central-multimidia"])) {
      add("automotivo", 2);
      continue;
    }

    if (
      matchesAny(value, [
        "perfume",
        "cosmet",
        "maquiagem",
        "beleza",
        "skincare",
      ])
    ) {
      add("perfumes", 2);
      continue;
    }

    if (matchesAny(value, ["game", "videogame", "console"])) {
      add("games", 2);
      continue;
    }

    if (
      matchesAny(value, [
        "moda",
        "roupa",
        "relogio",
        "oculos",
        "bolsa",
        "tenis",
        "joia",
      ])
    ) {
      add("moda", 2);
      continue;
    }

    if (
      matchesAny(value, [
        "casa",
        "eletrodomestico",
        "utilidade",
        "decoracao",
        "ar-condicionado",
      ])
    ) {
      add("casa", 2);
      continue;
    }

    if (
      matchesAny(value, [
        "atacado",
        "distribuidor",
        "distribuicao",
      ])
    ) {
      add("atacado", 2);
      continue;
    }

    if (
      matchesAny(value, [
        "eletron",
        "informatica",
        "celular",
        "notebook",
        "tablet",
        "computador",
        "drone",
        "gps",
        "camera",
        "projetor",
      ])
    ) {
      add("tecnologia", 2);
    }
  }

  return [...scores.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) return right[1] - left[1];
      return preference.indexOf(left[0]) - preference.indexOf(right[0]);
    })
    .map(([category]) => category);
}

function inferPaymentMethods(differentials) {
  const methods = [];

  if (hasKeyword(differentials, ["aceita cartao", "cartao"])) {
    methods.push("Cartão");
  }

  if (hasKeyword(differentials, ["parcela no cartao"])) {
    methods.push("Cartão parcelado");
  }

  return methods;
}

function buildReviewSummary(reviewCount, ratingPercent) {
  const parts = [];
  if (Number.isFinite(reviewCount) && reviewCount > 0) {
    parts.push(`${reviewCount} avaliações visíveis no Compras Paraguai`);
  }
  if (Number.isFinite(ratingPercent) && ratingPercent > 0) {
    parts.push(`aprovação visual de ${ratingPercent}%`);
  }
  return parts.length ? `${parts.join(", ")}.` : "";
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/[^\d+]/g, "");
  return digits || "";
}

function decodeCloudflareEmail(href) {
  const encoded = String(href || "").split("#")[1];
  if (!encoded || encoded.length < 4) return "";

  try {
    const key = Number.parseInt(encoded.slice(0, 2), 16);
    let email = "";
    for (let index = 2; index < encoded.length; index += 2) {
      const code = Number.parseInt(encoded.slice(index, index + 2), 16) ^ key;
      email += String.fromCharCode(code);
    }
    return email;
  } catch {
    return "";
  }
}

function extractEmail(text) {
  return cleanText(text).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
}

function boolOrVerify(value) {
  return value ? "TRUE" : "to_verify";
}

function hasKeyword(values, needles) {
  const haystack = values.map((value) => slugify(value));
  return needles.some((needle) => haystack.some((value) => value.includes(slugify(needle))));
}

function matchesAny(value, needles) {
  return needles.some((needle) => value.includes(slugify(needle)));
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function uniqueOnly(value, index, list) {
  return list.indexOf(value) === index;
}

function absoluteUrl(relativeOrAbsolute) {
  if (!relativeOrAbsolute) return "";
  if (/^https?:\/\//i.test(relativeOrAbsolute)) return relativeOrAbsolute;
  return new URL(relativeOrAbsolute, BASE_URL).toString();
}

function slugify(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value) {
  return String(value || "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toCsv(rows, headers) {
  const lines = [headers.join(",")];

  for (const row of rows) {
    const values = headers.map((header) => escapeCsvValue(row[header] ?? ""));
    lines.push(values.join(","));
  }

  return lines.join("\n");
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
