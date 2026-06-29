import { type Store } from "@/lib/data";

export type SmartMapZone = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  highlight: string;
  accent: string;
  matchers: string[];
};

export type SmartMapStore = {
  store: Store;
  zoneSlug: string;
  routeRole: "anchor" | "compare" | "specialist" | "support";
  tripFits: string[];
  coordinate: { lat: number; lng: number } | null;
  priority: number;
};

export type SmartMapOrigin = {
  slug: string;
  title: string;
  description: string;
  accent: string;
  coordinate: { lat: number; lng: number };
};

export type SmartMapMissionRoute = {
  slug: string;
  title: string;
  description: string;
  recommendedOriginSlug: string;
  storeSlugs: string[];
};

export type SmartMapZoneGroup = SmartMapZone & {
  stores: SmartMapStore[];
};

export const smartMapZones: SmartMapZone[] = [
  {
    slug: "shopping-china",
    title: "Eixo Shopping China",
    subtitle: "Âncora premium e primeira viagem",
    role: "Abre muito bem rotas amplas com confiança alta.",
    description:
      "Bloco para começar o dia quando a missão mistura tecnologia, perfumes, casa e compra com menos improviso.",
    highlight: "Começo natural para premium, presentes e primeira viagem.",
    accent: "from-[#0d1b12] via-[#124d32] to-[#d9ff1f]",
    matchers: ["shopping china"],
  },
  {
    slug: "shopping-del-este",
    title: "Eixo Shopping Del Este",
    subtitle: "Presentes, perfumes e compra turística",
    role: "Complementa a rota com mix, presentes e lojas de apelo mais turístico.",
    description:
      "Funciona melhor depois de uma parada âncora de tecnologia, quando a pessoa quer ampliar repertório sem sair do microcentro.",
    highlight: "Bom para meio de rota e compra complementar.",
    accent: "from-[#341118] via-[#7a1f34] to-[#ffb56b]",
    matchers: ["shopping del este"],
  },
  {
    slug: "jebai-center",
    title: "Eixo Jebai Center",
    subtitle: "Comparação rápida e densidade",
    role: "Cluster forte para celular, games, oportunidade e revenda leve.",
    description:
      "É o trecho para comparar várias operações com deslocamento curto e manter a decisão viva no meio da rota.",
    highlight: "Muito bom para comparar preço e fechar compra pontual.",
    accent: "from-[#10192e] via-[#1d4ed8] to-[#7dd3fc]",
    matchers: ["jebai center", "galeria jebai"],
  },
  {
    slug: "lai-lai-center",
    title: "Eixo Lai Lai Center",
    subtitle: "Informática, gamer e compra técnica",
    role: "Trecho mais racional para setup, periféricos e hardware.",
    description:
      "Ideal para missão gamer e informática, quando o usuário já sabe melhor o que procura e quer comparar ficha técnica.",
    highlight: "Excelente para aprofundar compra técnica.",
    accent: "from-[#191021] via-[#5b21b6] to-[#a78bfa]",
    matchers: ["lai lai center", "shopping lai lai"],
  },
  {
    slug: "san-blas-mega",
    title: "Eixo San Blás / Mega / Intershop",
    subtitle: "Eletrônicos, comparação e fechamento",
    role: "Bloco híbrido entre grandes operações e comparadores fortes.",
    description:
      "Um dos melhores eixos para quem quer cruzar grandes lojas de eletrônicos e fechar compra com mais segurança de comparação.",
    highlight: "Bom para abrir ou desenvolver a rota de tecnologia.",
    accent: "from-[#13210f] via-[#4d7c0f] to-[#bef264]",
    matchers: ["san blás", "san blas", "mega", "dfs", "adrián jara", "adrian jara"],
  },
  {
    slug: "shopping-paris-apoio",
    title: "Eixo Paris e apoio operacional",
    subtitle: "Conveniência, acesso e entrada",
    role: "Serve como base prática de entrada, carro e logística.",
    description:
      "Mais do que um ponto de compra, aqui está uma lógica de conforto operacional para começar o dia sem atrito.",
    highlight: "Forte para primeira viagem e acesso com carro.",
    accent: "from-[#1c1c1c] via-[#3f3f46] to-[#d4d4d8]",
    matchers: ["shopping paris", "ibiza"],
  },
];

export const smartMapOrigins: SmartMapOrigin[] = [
  {
    slug: "shopping-paris",
    title: "Shopping Paris",
    description: "Base confortável para começar com carro, banheiro e estrutura.",
    accent: "from-[#111827] to-[#6b7280]",
    coordinate: { lat: -25.50895, lng: -54.61169 },
  },
  {
    slug: "ponte-da-amizade",
    title: "Ponte da Amizade",
    description: "Entrada operacional para quem chega a pé ou por transporte.",
    accent: "from-[#0f172a] to-[#38bdf8]",
    coordinate: { lat: -25.50984, lng: -54.59312 },
  },
  {
    slug: "shopping-china-base",
    title: "Shopping China",
    description: "Ponto de partida premium para primeira viagem e compra ampla.",
    accent: "from-[#14532d] to-[#d9ff1f]",
    coordinate: { lat: -25.51058, lng: -54.60748 },
  },
  {
    slug: "microcentro-estacionamento",
    title: "Estacionamento do Microcentro",
    description: "Base tática para rotas curtas de comparação entre galerias.",
    accent: "from-[#3f3f46] to-[#e4e4e7]",
    coordinate: { lat: -25.5081, lng: -54.6102 },
  },
];

export const smartMapMissionRoutes: SmartMapMissionRoute[] = [
  {
    slug: "eletronicos",
    title: "Missão Eletrônicos",
    description: "Rota pensada para abrir com confiança e depois comparar preço com profundidade.",
    recommendedOriginSlug: "shopping-paris",
    storeSlugs: ["cell-shop", "mega-eletronicos", "new-zone", "nissei", "shopping-china"],
  },
  {
    slug: "perfumes",
    title: "Missão Perfumes",
    description: "Começa em estrutura premium e evolui para presentes, beleza e comparação fina.",
    recommendedOriginSlug: "shopping-china-base",
    storeSlugs: ["shopping-china", "monalisa", "sax-department-store", "cell-shop"],
  },
  {
    slug: "casa",
    title: "Missão Casa",
    description: "Rota mais prática para utilidades, enxoval e itens de presente.",
    recommendedOriginSlug: "shopping-china-base",
    storeSlugs: ["shopping-china", "nissei", "mega-vestcasa", "shopping-americana"],
  },
  {
    slug: "games",
    title: "Missão Gamer",
    description: "Percurso para console, acessórios, retro e compra técnica.",
    recommendedOriginSlug: "microcentro-estacionamento",
    storeSlugs: ["cell-shop", "hb-games", "new-zone", "shopping-china"],
  },
  {
    slug: "moda",
    title: "Missão Moda",
    description: "Rota enxuta para moda, esporte e compras mais visuais.",
    recommendedOriginSlug: "shopping-paris",
    storeSlugs: ["shopping-paris", "infinity-sport", "shopping-americana", "sax-department-store"],
  },
  {
    slug: "moto",
    title: "Missão Moto",
    description: "Percurso objetivo para compra técnica e itens específicos.",
    recommendedOriginSlug: "microcentro-estacionamento",
    storeSlugs: ["moto-core", "mega-eletronicos", "nissei"],
  },
  {
    slug: "revenda",
    title: "Missão Revenda",
    description: "Sequência para quem precisa volume, comparação e margem.",
    recommendedOriginSlug: "shopping-paris",
    storeSlugs: ["cell-shop", "mega-eletronicos", "atacado-plus", "new-zone", "nissei"],
  },
  {
    slug: "primeira-viagem",
    title: "Missão Primeira Viagem",
    description: "Abre com conforto e reduz improviso para quem ainda está pegando o ritmo da cidade.",
    recommendedOriginSlug: "shopping-paris",
    storeSlugs: ["cell-shop", "shopping-china", "nissei", "monalisa"],
  },
];

export function buildSmartMap(stores: Store[]) {
  const mappedStores = stores.map((store) => {
    const zone = inferZone(store);
    const routeRole = inferRouteRole(store, zone.slug);
    const tripFits = inferTripFits(store, routeRole);
    const coordinate = parseCoordinate(store.googleMapsUrl);
    const priority = computePriority(store, routeRole);

    return {
      store,
      zoneSlug: zone.slug,
      routeRole,
      tripFits,
      coordinate,
      priority,
    } satisfies SmartMapStore;
  });

  const zones = smartMapZones
    .map((zone) => ({
      ...zone,
      stores: mappedStores
        .filter((item) => item.zoneSlug === zone.slug)
        .sort((left, right) => right.priority - left.priority || left.store.name.localeCompare(right.store.name)),
    }))
    .filter((zone) => zone.stores.length > 0);

  return {
    zones,
    mappedStores,
    stats: {
      totalStores: mappedStores.length,
      totalZones: zones.length,
      anchorStores: mappedStores.filter((item) => item.routeRole === "anchor").length,
      compareStores: mappedStores.filter((item) => item.routeRole === "compare").length,
    },
  };
}

function inferZone(store: Store) {
  const haystack = `${store.name} ${store.address}`.toLowerCase();
  return (
    smartMapZones.find((zone) => zone.matchers.some((matcher) => haystack.includes(matcher))) ||
    smartMapZones.find((zone) => zone.slug === "san-blas-mega") ||
    smartMapZones[0]
  );
}

function inferRouteRole(store: Store, zoneSlug: string): SmartMapStore["routeRole"] {
  const haystack = `${store.name} ${store.shortDescription} ${store.worthIt} ${store.tags.join(" ")}`.toLowerCase();

  if (
    store.featured ||
    ["shopping-china", "nissei", "cell-shop", "mega-eletronicos", "madrid-center"].includes(store.slug)
  ) {
    return "anchor";
  }

  if (
    ["visaovip", "atacado-connect", "elegancia-company", "pontocom", "mobile-zone"].includes(store.slug) ||
    haystack.includes("especialista")
  ) {
    return "specialist";
  }

  if (
    zoneSlug === "jebai-center" ||
    zoneSlug === "lai-lai-center" ||
    haystack.includes("compar") ||
    haystack.includes("oportunidade")
  ) {
    return "compare";
  }

  return "support";
}

function inferTripFits(store: Store, routeRole: SmartMapStore["routeRole"]) {
  const fits = new Set<string>();
  const haystack = `${store.shortDescription} ${store.worthIt} ${store.tags.join(" ")}`.toLowerCase();

  if (store.missionSlugs.includes("primeira-viagem") || haystack.includes("primeira viagem")) {
    fits.add("primeira viagem");
  }
  if (store.missionSlugs.includes("revenda") || haystack.includes("revenda") || store.categorySlugs.includes("atacado")) {
    fits.add("revenda");
  }
  if (store.categorySlugs.includes("perfumes")) {
    fits.add("presentes e beleza");
  }
  if (store.categorySlugs.includes("games")) {
    fits.add("gamer");
  }
  if (routeRole === "anchor") {
    fits.add("compra ampla");
  }
  if (routeRole === "compare") {
    fits.add("comparação");
  }
  if (store.categorySlugs.includes("tecnologia")) {
    fits.add("tecnologia");
  }

  return [...fits];
}

function computePriority(store: Store, routeRole: SmartMapStore["routeRole"]) {
  const roleWeight = {
    anchor: 40,
    specialist: 26,
    compare: 18,
    support: 10,
  }[routeRole];

  const trust = Math.round(store.score.trust * 4);
  const variety = Math.round(store.score.variety * 3);
  const location = Math.round(store.score.location * 2);
  const featured = store.featured ? 10 : 0;

  return roleWeight + trust + variety + location + featured;
}

function parseCoordinate(googleMapsUrl: string) {
  const raw = googleMapsUrl.match(/[?&]q=([-\d.]+),([-\d.]+)/);
  if (!raw) return null;

  const lat = Number(raw[1]);
  const lng = Number(raw[2]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}
