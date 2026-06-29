export type ScoreBreakdown = {
  price: number;
  trust: number;
  variety: number;
  service: number;
  warranty: number;
  location: number;
  parking: number;
  wholesale: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type RouteSegment = {
  from: string;
  to: string;
  distance: number; // em km
  duration: number; // em minutos
  difficulty: 'easy' | 'moderate' | 'hard';
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: "store" | "guide" | "source" | "mission";
  icon: string;
  accent: string;
};

export type Store = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  categorySlugs: string[];
  missionSlugs: string[];
  city: string;
  country: string;
  address: string;
  coordinates: Coordinates;
  googleMapsUrl: string;
  instagramUrl?: string;
  websiteUrl?: string;
  whatsapp?: string;
  openingHours: string;
  paymentMethods: string[];
  parkingInfo: string;
  parkingScore: number; // 0-10
  coverAccent: string;
  logoText: string;
  tags: string[];
  featured: boolean;
  premium: boolean;
  score: ScoreBreakdown;
  reviewSummary: string;
  worthIt: string;
  recommendedProducts: string[];
  difficulty: 'easy' | 'moderate' | 'hard'; // dificuldade de compra
  crowdLevel: 'low' | 'medium' | 'high'; // nível de aglomeração
  bestTimeToVisit: string; // melhor horário
};

export type Guide = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string[];
  premium: boolean;
  accent: string;
};

export type Supplier = {
  id: string;
  name: string;
  slug: string;
  segment: string;
  description: string;
  instagramUrl?: string;
  whatsapp?: string;
  websiteUrl?: string;
  minimumOrder: string;
  sellsWholesale: boolean;
  shipsToBrazil: boolean;
  paymentMethods: string[];
  frontierNote: string;
  premium: boolean;
  accent: string;
};

export type Mission = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
};

export type SmartRoute = {
  id: string;
  missionSlug: string;
  stores: Store[];
  totalDistance: number;
  estimatedTime: number;
  segments: RouteSegment[];
  difficulty: 'easy' | 'moderate' | 'hard';
  description: string;
};

export const categories: Category[] = [
  { id: "cat-tech", name: "Tecnologia", slug: "tecnologia", description: "Eletrônicos, celulares e acessórios.", type: "store", icon: "Smartphone", accent: "from-cyan-400 to-sky-600" },
  { id: "cat-perf", name: "Perfumes", slug: "perfumes", description: "Fragrâncias, cosméticos e beleza.", type: "store", icon: "Sparkles", accent: "from-fuchsia-400 to-rose-500" },
  { id: "cat-home", name: "Casa", slug: "casa", description: "Utilidades, decoração e enxoval.", type: "store", icon: "Home", accent: "from-amber-300 to-orange-500" },
  { id: "cat-games", name: "Games", slug: "games", description: "Consoles, jogos e colecionáveis.", type: "store", icon: "Gamepad2", accent: "from-violet-500 to-indigo-600" },
  { id: "cat-fashion", name: "Moda", slug: "moda", description: "Roupas, tênis e esportes.", type: "store", icon: "Shirt", accent: "from-pink-400 to-orange-400" },
  { id: "cat-moto", name: "Moto", slug: "moto", description: "Peças, acessórios e equipamentos.", type: "store", icon: "Bike", accent: "from-lime-400 to-green-600" },
  { id: "cat-gastro", name: "Gastronomia", slug: "gastronomia", description: "Onde comer e fazer pausas.", type: "store", icon: "UtensilsCrossed", accent: "from-red-400 to-orange-500" },
  { id: "cat-hotels", name: "Hotéis", slug: "hoteis", description: "Base segura para dormir e guardar compras.", type: "store", icon: "Hotel", accent: "from-slate-400 to-slate-700" },
  { id: "cat-exchange", name: "Câmbio", slug: "cambio", description: "Casas de câmbio e meios de pagamento.", type: "store", icon: "BadgeDollarSign", accent: "from-emerald-400 to-teal-600" },
  { id: "cat-wholesale", name: "Atacado", slug: "atacado", description: "Quem compra volume e revende.", type: "store", icon: "Boxes", accent: "from-yellow-300 to-lime-500" },
];

export const missions: Mission[] = [
  { slug: "eletronicos", title: "Eletrônicos", description: "Celulares, notebooks, acessórios e comparativos rápidos.", icon: "Smartphone", accent: "from-sky-500 to-cyan-400" },
  { slug: "perfumes", title: "Perfumes", description: "Lojas mais confiáveis para fragrâncias originais.", icon: "Sparkles", accent: "from-fuchsia-500 to-pink-400" },
  { slug: "casa", title: "Casa", description: "Itens de utilidade, enxoval e presenteáveis.", icon: "Home", accent: "from-orange-500 to-amber-400" },
  { slug: "games", title: "Games", description: "Consoles, acessórios, retro e colecionáveis.", icon: "Gamepad2", accent: "from-violet-500 to-indigo-500" },
  { slug: "moda", title: "Moda", description: "Tênis, roupas e peças de alta procura.", icon: "Shirt", accent: "from-rose-500 to-orange-400" },
  { slug: "moto", title: "Moto", description: "Capacetes, peças e compras técnicas.", icon: "Bike", accent: "from-lime-500 to-green-500" },
  { slug: "revenda", title: "Revenda", description: "Rotas, volume e margem para quem compra para vender.", icon: "TrendingUp", accent: "from-yellow-400 to-lime-500" },
  { slug: "primeira-viagem", title: "Primeira Viagem", description: "Checklist essencial para atravessar melhor.", icon: "Map", accent: "from-blue-500 to-cyan-500" },
];

export const stores: Store[] = [
  {
    id: "store-shopping-china",
    name: "Shopping China",
    slug: "shopping-china",
    shortDescription: "Gigante para eletrônicos, bebidas, perfumaria e compras de ticket alto.",
    fullDescription: "Uma das paradas mais conhecidas de Ciudad del Este para quem quer variedade ampla, boa estrutura e uma compra mais previsível. Funciona bem para primeira viagem porque centraliza muitas categorias.",
    categorySlugs: ["tecnologia", "perfumes", "casa"],
    missionSlugs: ["eletronicos", "perfumes", "primeira-viagem"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Avenida Monseñor Rodríguez, Ciudad del Este",
    coordinates: { lat: -25.5095, lng: -54.6122 },
    googleMapsUrl: "https://maps.google.com/?q=Shopping+China+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/shoppingchina",
    websiteUrl: "https://shoppingchina.com.py",
    whatsapp: "+595000000001",
    openingHours: "Seg a sáb, 7h às 16h30",
    paymentMethods: ["Pix via parceiros", "Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estacionamento amplo com fluxo intenso em horários de pico.",
    parkingScore: 8.5,
    coverAccent: "from-zinc-900 via-emerald-950 to-emerald-600",
    logoText: "SC",
    tags: ["premium", "primeira viagem", "eletrônicos", "perfumes"],
    featured: true,
    premium: false,
    score: { price: 8.4, trust: 9.3, variety: 9.8, service: 8.2, warranty: 8.7, location: 9.1, parking: 8.8, wholesale: 7.2 },
    reviewSummary: "Excelente para centralizar compras com segurança e variedade.",
    worthIt: "Vale muito a pena para quem quer resolver várias frentes em uma única parada.",
    recommendedProducts: ["iPhone", "Whisky", "Perfumes importados", "Fones premium"],
    difficulty: "easy",
    crowdLevel: "high",
    bestTimeToVisit: "7h-9h (antes do pico)",
  },
  {
    id: "store-cell-shop",
    name: "Cell Shop",
    slug: "cell-shop",
    shortDescription: "Referência em eletrônicos e acessórios com operação conhecida do público brasileiro.",
    fullDescription: "Boa escolha para quem quer comprar tecnologia com ambiente organizado e percepção alta de confiança. Ideal para comparar preços com outras grandes redes no mesmo dia.",
    categorySlugs: ["tecnologia"],
    missionSlugs: ["eletronicos", "primeira-viagem", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Shopping Paris, Ciudad del Este",
    coordinates: { lat: -25.5089, lng: -54.6135 },
    googleMapsUrl: "https://maps.google.com/?q=Cell+Shop+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/cellshopimportados",
    websiteUrl: "https://cellshop.com.py",
    whatsapp: "+595000000002",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estacionamento coberto no complexo.",
    parkingScore: 8.0,
    coverAccent: "from-sky-950 via-sky-700 to-cyan-400",
    logoText: "CS",
    tags: ["iphone", "notebook", "apple", "confiança"],
    featured: true,
    premium: false,
    score: { price: 8.1, trust: 9.1, variety: 8.9, service: 8.4, warranty: 8.6, location: 8.9, parking: 8.5, wholesale: 7.1 },
    reviewSummary: "Compra mais confortável para tecnologia e acessórios de giro rápido.",
    worthIt: "Vale quando o foco é confiança e suporte visual para comprar melhor.",
    recommendedProducts: ["iPhone", "Apple Watch", "Fones Bluetooth", "Acessórios MagSafe"],
    difficulty: "easy",
    crowdLevel: "medium",
    bestTimeToVisit: "8h-10h ou 14h-15h",
  },
  {
    id: "store-nissei",
    name: "Nissei",
    slug: "nissei",
    shortDescription: "Operação forte em eletrônicos, casa e itens de conveniência.",
    fullDescription: "A Nissei combina mix amplo com logística prática para quem faz uma rota mais enxuta. É uma loja forte para complementar compras técnicas e itens de casa com preço competitivo.",
    categorySlugs: ["tecnologia", "casa"],
    missionSlugs: ["eletronicos", "casa", "primeira-viagem"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro de Ciudad del Este",
    coordinates: { lat: -25.5110, lng: -54.6100 },
    googleMapsUrl: "https://maps.google.com/?q=Nissei+Ciudad+del+Este",
    websiteUrl: "https://nissei.com.py",
    whatsapp: "+595000000003",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar", "Guarani"],
    parkingInfo: "Varia conforme a unidade; vale planejar a chegada cedo.",
    parkingScore: 7.0,
    coverAccent: "from-neutral-900 via-zinc-700 to-lime-400",
    logoText: "NI",
    tags: ["mix amplo", "casa", "eletrônicos"],
    featured: true,
    premium: false,
    score: { price: 8.6, trust: 8.8, variety: 8.7, service: 7.9, warranty: 8.1, location: 8.5, parking: 7.3, wholesale: 6.9 },
    reviewSummary: "Boa relação entre variedade, preço e praticidade.",
    worthIt: "Vale como loja coringa para encaixar na rota do dia.",
    recommendedProducts: ["Eletroportáteis", "Acessórios tech", "Itens de casa"],
    difficulty: "moderate",
    crowdLevel: "medium",
    bestTimeToVisit: "7h-8h (horário de abertura)",
  },
  {
    id: "store-mega-eletronicos",
    name: "Mega Eletrônicos",
    slug: "mega-eletronicos",
    shortDescription: "Foco em ticket competitivo para eletrônicos e oportunidades de giro.",
    fullDescription: "Loja forte para quem está caçando preço e quer comparar com players mais tradicionais. Ganha relevância para revenda e para quem já viaja com lista bem definida.",
    categorySlugs: ["tecnologia", "atacado"],
    missionSlugs: ["eletronicos", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Microcentro de Ciudad del Este",
    coordinates: { lat: -25.5125, lng: -54.6145 },
    googleMapsUrl: "https://maps.google.com/?q=Mega+Eletronicos+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/megaeletronicos",
    whatsapp: "+595000000004",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Dinheiro", "Dólar", "Transferência"],
    parkingInfo: "Estacionamento mais limitado; ideal ir cedo.",
    parkingScore: 6.5,
    coverAccent: "from-emerald-950 via-emerald-700 to-lime-400",
    logoText: "ME",
    tags: ["revenda", "preço", "eletrônicos"],
    featured: true,
    premium: false,
    score: { price: 9.0, trust: 8.1, variety: 8.4, service: 7.6, warranty: 7.8, location: 8.2, parking: 6.7, wholesale: 8.8 },
    reviewSummary: "Mais atrativa para quem quer margem e compra com velocidade.",
    worthIt: "Vale quando o preço pesa mais que a experiência premium.",
    recommendedProducts: ["Smartphones Android", "Caixas de som", "Acessórios", "Informática"],
    difficulty: "moderate",
    crowdLevel: "high",
    bestTimeToVisit: "7h-9h (abertura, menos aglomeração)",
  },
  {
    id: "store-monalisa",
    name: "Monalisa",
    slug: "monalisa",
    shortDescription: "Clássica para perfumes, cosméticos e marcas de luxo.",
    fullDescription: "Uma das operações mais associadas a perfumaria e beleza em Ciudad del Este. Funciona muito bem para quem quer segurança de marca e ambiente mais controlado.",
    categorySlugs: ["perfumes"],
    missionSlugs: ["perfumes", "primeira-viagem"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Avenida principal do centro",
    coordinates: { lat: -25.5105, lng: -54.6115 },
    googleMapsUrl: "https://maps.google.com/?q=Monalisa+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/monalisapy",
    websiteUrl: "https://monalisa.com.py",
    whatsapp: "+595000000010",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estrutura conhecida, mas com maior fluxo em datas fortes.",
    parkingScore: 7.5,
    coverAccent: "from-rose-950 via-fuchsia-700 to-pink-400",
    logoText: "MO",
    tags: ["perfume", "luxo", "beleza"],
    featured: true,
    premium: false,
    score: { price: 7.8, trust: 9.2, variety: 8.8, service: 8.9, warranty: 8.1, location: 8.7, parking: 7.8, wholesale: 5.9 },
    reviewSummary: "Muito forte em confiança para perfumaria e cosméticos.",
    worthIt: "Vale especialmente para quem quer comprar beleza sem risco desnecessário.",
    recommendedProducts: ["Perfumes importados", "Skincare", "Maquiagem premium"],
    difficulty: "easy",
    crowdLevel: "high",
    bestTimeToVisit: "7h-9h (antes do pico)",
  },
  {
    id: "store-sax",
    name: "SAX Department Store",
    slug: "sax-department-store",
    shortDescription: "Departamento premium com foco em moda, beleza e experiência.",
    fullDescription: "SAX entrega uma sensação mais sofisticada de compra, especialmente em moda e beleza. É menos sobre caçar o menor preço e mais sobre seleção, ambiente e marcas desejáveis.",
    categorySlugs: ["moda", "perfumes"],
    missionSlugs: ["moda", "perfumes"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Shopping Del Este, Ciudad del Este",
    coordinates: { lat: -25.5078, lng: -54.6108 },
    googleMapsUrl: "https://maps.google.com/?q=SAX+Department+Store+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/saxdepartmentstore",
    websiteUrl: "https://sax.com.py",
    whatsapp: "+595000000009",
    openingHours: "Seg a sáb, 7h às 16h30",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Boa estrutura de acesso.",
    parkingScore: 8.5,
    coverAccent: "from-zinc-950 via-stone-800 to-amber-400",
    logoText: "SX",
    tags: ["premium", "moda", "beleza"],
    featured: true,
    premium: true,
    score: { price: 7.1, trust: 8.9, variety: 8.5, service: 9.1, warranty: 8.3, location: 8.8, parking: 8.2, wholesale: 5.8 },
    reviewSummary: "Experiência premium com apelo forte para moda e beleza.",
    worthIt: "Vale quando a experiência e a curadoria pesam mais que o desconto máximo.",
    recommendedProducts: ["Perfumes de luxo", "Bolsas", "Cosméticos", "Óculos"],
    difficulty: "easy",
    crowdLevel: "medium",
    bestTimeToVisit: "10h-14h (horário intermediário)",
  },
  {
    id: "store-hb-games",
    name: "HB Games",
    slug: "hb-games",
    shortDescription: "Especializada em consoles, jogos e acessórios gamer.",
    fullDescription: "Loja de nicho que faz sentido quando a missão é games. Ajuda a encontrar acessórios específicos e dá mais precisão para quem não quer misturar essa compra com varejo tradicional.",
    categorySlugs: ["games", "tecnologia"],
    missionSlugs: ["games", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro comercial de CDE",
    coordinates: { lat: -25.5118, lng: -54.6128 },
    googleMapsUrl: "https://maps.google.com/?q=HB+Games+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/hbgamespy",
    whatsapp: "+595000000007",
    openingHours: "Seg a sáb, 7h30 às 15h30",
    paymentMethods: ["Dinheiro", "Dólar", "Cartão"],
    parkingInfo: "Estacionamento rotativo próximo.",
    parkingScore: 6.8,
    coverAccent: "from-violet-950 via-violet-700 to-fuchsia-500",
    logoText: "HB",
    tags: ["playstation", "nintendo", "acessórios"],
    featured: true,
    premium: false,
    score: { price: 8.2, trust: 8.3, variety: 8.6, service: 8.1, warranty: 7.4, location: 7.9, parking: 6.5, wholesale: 7.9 },
    reviewSummary: "Missão games mais eficiente quando você vai direto ao especialista.",
    worthIt: "Vale muito para quem quer precisão no segmento gamer.",
    recommendedProducts: ["PlayStation", "Nintendo", "Headsets", "Controles"],
    difficulty: "moderate",
    crowdLevel: "low",
    bestTimeToVisit: "13h-15h (menos movimento)",
  },
  {
    id: "store-mega-vestcasa",
    name: "Mega Vestcasa",
    slug: "mega-vestcasa",
    shortDescription: "Força em utilidades, enxoval e categorias de casa.",
    fullDescription: "Boa loja para quem quer focar em itens de casa sem ficar pulando entre muitos pontos. Pode render uma compra muito objetiva e eficiente.",
    categorySlugs: ["casa"],
    missionSlugs: ["casa", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Eixo comercial de CDE",
    coordinates: { lat: -25.5130, lng: -54.6150 },
    googleMapsUrl: "https://maps.google.com/?q=Mega+Vestcasa+Ciudad+del+Este",
    whatsapp: "+595000000017",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Dinheiro", "Cartão"],
    parkingInfo: "Bolsões próximos; vale evitar pico.",
    parkingScore: 7.2,
    coverAccent: "from-stone-950 via-amber-700 to-orange-300",
    logoText: "MV",
    tags: ["casa", "enxoval", "utilidades"],
    featured: true,
    premium: false,
    score: { price: 8.6, trust: 7.9, variety: 8.5, service: 7.6, warranty: 7.0, location: 7.8, parking: 6.4, wholesale: 8.1 },
    reviewSummary: "Excelente foco para missão casa e revenda leve.",
    worthIt: "Vale muito quando o objetivo é comprar casa sem dispersão.",
    recommendedProducts: ["Enxoval", "Utensílios", "Organização"],
    difficulty: "easy",
    crowdLevel: "low",
    bestTimeToVisit: "8h-11h",
  },
];

export const guides: Guide[] = [
  {
    id: "guide-ponte",
    title: "Como atravessar a Ponte da Amizade",
    slug: "como-atravessar-a-ponte-da-amizade",
    category: "Primeira viagem",
    summary: "Entenda os horários, a dinâmica do fluxo e como reduzir atrito na travessia.",
    content: [
      "Saia cedo para reduzir fila e ganhar mais tempo útil de compra.",
      "Defina antes se vai atravessar a pé, de carro ou com transporte contratado.",
      "Leve documento fácil de acessar e mantenha suas compras organizadas para a volta.",
    ],
    premium: false,
    accent: "from-blue-600 to-cyan-400",
  },
  {
    id: "guide-proibidos",
    title: "Produtos proibidos",
    slug: "produtos-proibidos",
    category: "Regras",
    summary: "O que evitar para não transformar sua viagem em dor de cabeça.",
    content: [
      "Nem todo item pode cruzar a fronteira sem restrição; confirme sempre a categoria antes da compra.",
      "Itens sensíveis costumam exigir atenção extra de nota, quantidade e finalidade.",
      "Quando houver dúvida, priorize a segurança sobre a oportunidade do preço.",
    ],
    premium: false,
    accent: "from-red-600 to-orange-400",
  },
  {
    id: "guide-documentos",
    title: "Documentos obrigatórios",
    slug: "documentos-obrigatorios",
    category: "Primeira viagem",
    summary: "Checklist direto do que você deve separar antes de sair de casa.",
    content: [
      "Documento válido e em bom estado é o mínimo para uma travessia tranquila.",
      "Se for de veículo, garanta também os documentos do carro e exigências de circulação.",
      "Tenha versões digitais de apoio, mas não dependa apenas delas.",
    ],
    premium: false,
    accent: "from-slate-700 to-slate-400",
  },
  {
    id: "guide-rota-otimizada",
    title: "Como otimizar sua rota de compras",
    slug: "como-otimizar-rota-compras",
    category: "Estratégia",
    summary: "Planejamento inteligente para maximizar tempo e reduzir cansaço.",
    content: [
      "Use o mapa inteligente para gerar rotas baseadas em suas missões escolhidas.",
      "Considere o horário de menor aglomeração para cada loja (informação no detalhe da loja).",
      "Agrupe lojas por proximidade geográfica para reduzir distâncias e tempo de deslocamento.",
      "Inclua uma pausa no meio do dia para reorganizar compras e descansar.",
    ],
    premium: false,
    accent: "from-emerald-600 to-lime-400",
  },
];

export const suppliers: Supplier[] = [
  {
    id: "sup-apple-hub",
    name: "Apple Hub PY",
    slug: "apple-hub-py",
    segment: "Apple",
    description: "Fornecedor focado em iPhone, AirPods e acessórios de alto giro para quem compra volume leve.",
    instagramUrl: "https://instagram.com/applehubpy",
    whatsapp: "+595000100001",
    minimumOrder: "A partir de 5 unidades",
    sellsWholesale: true,
    shipsToBrazil: false,
    paymentMethods: ["Dólar", "Transferência"],
    frontierNote: "Mais indicado para revenda estruturada e recompra recorrente.",
    premium: true,
    accent: "from-slate-900 to-sky-500",
  },
];

export const weeklyOpportunities = [
  "Rota curta para eletrônicos: Cell Shop, Shopping China e Mega Eletrônicos (7h-10h, menos aglomeração).",
  "Perfumaria com menos atrito: Monalisa primeiro (7h-9h), comparação final na SAX (10h-14h).",
  "Missão casa direta: Mega Vestcasa (8h-11h) + compra rápida, retorno antes do pico.",
];

export const premiumCollections = [
  "Source Premium com fornecedores validados por segmento.",
  "Missões prontas para primeira viagem e revenda.",
  "Rotas curtas para comprar mais em menos tempo.",
];

export function averageScore(score: ScoreBreakdown) {
  const values = Object.values(score);
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
}

export function getStoreBySlug(slug: string) {
  return stores.find((store) => store.slug === slug);
}

export function getRelatedStores(store: Store) {
  return stores
    .filter(
      (candidate) =>
        candidate.slug !== store.slug &&
        candidate.categorySlugs.some((slug) => store.categorySlugs.includes(slug)),
    )
    .slice(0, 3);
}

export function getStoresByMission(missionSlug: string) {
  return stores.filter((store) => store.missionSlugs.includes(missionSlug));
}

/**
 * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
 */
export function calculateDistance(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estima tempo de deslocamento entre lojas (simplificado)
 */
export function estimateTravelTime(distance: number): number {
  // Considerando velocidade média de 15 km/h em Ciudad del Este
  return Math.ceil((distance / 15) * 60);
}

/**
 * Gera uma rota inteligente baseada em missão
 */
export function generateSmartRoute(missionSlug: string): SmartRoute | null {
  const storesInMission = getStoresByMission(missionSlug);
  if (storesInMission.length === 0) return null;

  // Ordena lojas por proximidade usando algoritmo simplificado
  const sortedStores = [...storesInMission].sort((a, b) => {
    const scoreA = averageScore(a.score);
    const scoreB = averageScore(b.score);
    return scoreB - scoreA; // Maior score primeiro
  });

  // Calcula segmentos de rota
  let totalDistance = 0;
  let totalTime = 0;
  const segments: RouteSegment[] = [];

  for (let i = 0; i < sortedStores.length - 1; i++) {
    const distance = calculateDistance(
      sortedStores[i].coordinates,
      sortedStores[i + 1].coordinates,
    );
    const duration = estimateTravelTime(distance);
    totalDistance += distance;
    totalTime += duration;

    segments.push({
      from: sortedStores[i].name,
      to: sortedStores[i + 1].name,
      distance: Math.round(distance * 10) / 10,
      duration,
      difficulty: distance > 2 ? "hard" : distance > 1 ? "moderate" : "easy",
    });
  }

  // Adiciona tempo de compra estimado (30 min por loja)
  totalTime += sortedStores.length * 30;

  const difficulty =
    totalDistance > 5 ? "hard" : totalDistance > 2 ? "moderate" : "easy";

  return {
    id: `route-${missionSlug}-${Date.now()}`,
    missionSlug,
    stores: sortedStores,
    totalDistance: Math.round(totalDistance * 10) / 10,
    estimatedTime: totalTime,
    segments,
    difficulty,
    description: `Rota otimizada com ${sortedStores.length} paradas para a missão ${missionSlug}`,
  };
}

/**
 * Filtra lojas com critérios avançados
 */
export function filterStoresByAdvancedCriteria(options: {
  query?: string;
  categories?: string[];
  missions?: string[];
  maxPrice?: number;
  minTrust?: number;
  parkingRequired?: boolean;
  crowdPreference?: 'low' | 'medium' | 'high';
  difficulty?: 'easy' | 'moderate' | 'hard';
}): Store[] {
  return stores.filter((store) => {
    // Filtro por busca textual
    if (options.query) {
      const normalized = options.query.toLowerCase();
      const matches =
        store.name.toLowerCase().includes(normalized) ||
        store.tags.some((tag) => tag.toLowerCase().includes(normalized)) ||
        store.shortDescription.toLowerCase().includes(normalized);
      if (!matches) return false;
    }

    // Filtro por categorias
    if (options.categories && options.categories.length > 0) {
      const hasCategory = store.categorySlugs.some((slug) =>
        options.categories!.includes(slug),
      );
      if (!hasCategory) return false;
    }

    // Filtro por missões
    if (options.missions && options.missions.length > 0) {
      const hasMission = store.missionSlugs.some((slug) =>
        options.missions!.includes(slug),
      );
      if (!hasMission) return false;
    }

    // Filtro por preço (usando score de preço)
    if (options.maxPrice) {
      if (store.score.price < options.maxPrice) return false;
    }

    // Filtro por confiança
    if (options.minTrust && store.score.trust < options.minTrust) {
      return false;
    }

    // Filtro por estacionamento
    if (options.parkingRequired && store.parkingScore < 7) {
      return false;
    }

    // Filtro por preferência de aglomeração
    if (options.crowdPreference && store.crowdLevel !== options.crowdPreference) {
      return false;
    }

    // Filtro por dificuldade
    if (options.difficulty && store.difficulty !== options.difficulty) {
      return false;
    }

    return true;
  });
}

/**
 * Recomenda lojas baseado em preferências do usuário
 */
export function recommendStores(userPreferences: {
  prioritizeTrust?: boolean;
  prioritizePrice?: boolean;
  priorityParking?: boolean;
  maxTime?: number; // em minutos
}): Store[] {
  return [...stores]
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (userPreferences.prioritizeTrust) {
        scoreA += a.score.trust * 2;
        scoreB += b.score.trust * 2;
      }
      if (userPreferences.prioritizePrice) {
        scoreA += a.score.price;
        scoreB += b.score.price;
      }
      if (userPreferences.priorityParking) {
        scoreA += a.parkingScore;
        scoreB += b.parkingScore;
      }

      scoreA += averageScore(a.score);
      scoreB += averageScore(b.score);

      return scoreB - scoreA;
    })
    .slice(0, 10);
}

export function searchAll(query: string) {
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
