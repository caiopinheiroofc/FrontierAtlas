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
  googleMapsUrl: string;
  instagramUrl?: string;
  websiteUrl?: string;
  whatsapp?: string;
  openingHours: string;
  paymentMethods: string[];
  parkingInfo: string;
  coverAccent: string;
  logoText: string;
  tags: string[];
  featured: boolean;
  premium: boolean;
  score: ScoreBreakdown;
  reviewSummary: string;
  worthIt: string;
  recommendedProducts: string[];
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
  { id: "cat-first", name: "Primeira Viagem", slug: "primeira-viagem", description: "Tudo para quem está indo pela primeira vez.", type: "mission", icon: "Compass", accent: "from-blue-400 to-indigo-500" },
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
    fullDescription: "Uma das paradas mais conhecidas de Ciudad del Este para quem quer variedade ampla, boa estrutura e uma compra mais previsível. Funciona bem para primeira viagem porque concentra categorias importantes em um único lugar.",
    categorySlugs: ["tecnologia", "perfumes", "casa"],
    missionSlugs: ["eletronicos", "perfumes", "primeira-viagem"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Avenida Monseñor Rodríguez, Ciudad del Este",
    googleMapsUrl: "https://maps.google.com/?q=Shopping+China+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/shoppingchina",
    websiteUrl: "https://shoppingchina.com.py",
    whatsapp: "+595000000001",
    openingHours: "Seg a sáb, 7h às 16h30",
    paymentMethods: ["Pix via parceiros", "Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estacionamento amplo com fluxo intenso em horários de pico.",
    coverAccent: "from-zinc-900 via-emerald-950 to-emerald-600",
    logoText: "SC",
    tags: ["premium", "primeira viagem", "eletrônicos", "perfumes"],
    featured: true,
    premium: false,
    score: { price: 8.4, trust: 9.3, variety: 9.8, service: 8.2, warranty: 8.7, location: 9.1, parking: 8.8, wholesale: 7.2 },
    reviewSummary: "Excelente para centralizar compras com segurança e variedade.",
    worthIt: "Vale muito a pena para quem quer resolver várias frentes em uma única parada.",
    recommendedProducts: ["iPhone", "Whisky", "Perfumes importados", "Fones premium"],
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
    googleMapsUrl: "https://maps.google.com/?q=Cell+Shop+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/cellshopimportados",
    websiteUrl: "https://cellshop.com.py",
    whatsapp: "+595000000002",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estacionamento coberto no complexo.",
    coverAccent: "from-sky-950 via-sky-700 to-cyan-400",
    logoText: "CS",
    tags: ["iphone", "notebook", "apple", "confiança"],
    featured: true,
    premium: false,
    score: { price: 8.1, trust: 9.1, variety: 8.9, service: 8.4, warranty: 8.6, location: 8.9, parking: 8.5, wholesale: 7.1 },
    reviewSummary: "Compra mais confortável para tecnologia e acessórios de giro rápido.",
    worthIt: "Vale quando o foco é confiança e suporte visual para comprar melhor.",
    recommendedProducts: ["iPhone", "Apple Watch", "Fones Bluetooth", "Acessórios MagSafe"],
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
    googleMapsUrl: "https://maps.google.com/?q=Nissei+Ciudad+del+Este",
    websiteUrl: "https://nissei.com.py",
    whatsapp: "+595000000003",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar", "Guarani"],
    parkingInfo: "Varia conforme a unidade; vale planejar a chegada cedo.",
    coverAccent: "from-neutral-900 via-zinc-700 to-lime-400",
    logoText: "NI",
    tags: ["mix amplo", "casa", "eletrônicos"],
    featured: true,
    premium: false,
    score: { price: 8.6, trust: 8.8, variety: 8.7, service: 7.9, warranty: 8.1, location: 8.5, parking: 7.3, wholesale: 6.9 },
    reviewSummary: "Boa relação entre variedade, preço e praticidade.",
    worthIt: "Vale como loja coringa para encaixar na rota do dia.",
    recommendedProducts: ["Eletroportáteis", "Acessórios tech", "Itens de casa"],
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
    googleMapsUrl: "https://maps.google.com/?q=Mega+Eletronicos+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/megaeletronicos",
    whatsapp: "+595000000004",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Dinheiro", "Dólar", "Transferência"],
    parkingInfo: "Estacionamento mais limitado; ideal ir cedo.",
    coverAccent: "from-emerald-950 via-emerald-700 to-lime-400",
    logoText: "ME",
    tags: ["revenda", "preço", "eletrônicos"],
    featured: true,
    premium: false,
    score: { price: 9.0, trust: 8.1, variety: 8.4, service: 7.6, warranty: 7.8, location: 8.2, parking: 6.7, wholesale: 8.8 },
    reviewSummary: "Mais atrativa para quem quer margem e compra com velocidade.",
    worthIt: "Vale quando o preço pesa mais que a experiência premium.",
    recommendedProducts: ["Smartphones Android", "Caixas de som", "Acessórios", "Informática"],
  },
  {
    id: "store-new-zone",
    name: "New Zone",
    slug: "new-zone",
    shortDescription: "Mix interessante para eletrônicos e presentes com navegação simples.",
    fullDescription: "Boa alternativa para quem quer fugir dos nomes mais óbvios sem perder sensação de estrutura. Costuma funcionar melhor em compras pontuais e comparação de oportunidade.",
    categorySlugs: ["tecnologia", "games"],
    missionSlugs: ["eletronicos", "games"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Galeria no centro de CDE",
    googleMapsUrl: "https://maps.google.com/?q=New+Zone+Ciudad+del+Este",
    whatsapp: "+595000000005",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Dinheiro", "Cartão"],
    parkingInfo: "Rotatividade rápida em estacionamentos próximos.",
    coverAccent: "from-indigo-950 via-indigo-700 to-cyan-400",
    logoText: "NZ",
    tags: ["tech", "games", "oportunidade"],
    featured: false,
    premium: false,
    score: { price: 8.3, trust: 7.9, variety: 7.8, service: 7.7, warranty: 7.3, location: 8.0, parking: 6.8, wholesale: 7.4 },
    reviewSummary: "Boa para caça de oportunidade e compra complementar.",
    worthIt: "Vale se estiver no seu trajeto e houver item específico na lista.",
    recommendedProducts: ["Fones", "Periféricos", "Itens gamer"],
  },
  {
    id: "store-roma-shopping",
    name: "Roma Shopping",
    slug: "roma-shopping",
    shortDescription: "Parada equilibrada para tecnologia, presentes e categorias variadas.",
    fullDescription: "A Roma encaixa bem no roteiro de quem quer explorar opções além dos grandes ícones, com boa combinação entre variedade e circulação interna.",
    categorySlugs: ["tecnologia", "moda", "casa"],
    missionSlugs: ["primeira-viagem", "casa"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Área central, Ciudad del Este",
    googleMapsUrl: "https://maps.google.com/?q=Roma+Shopping+Ciudad+del+Este",
    whatsapp: "+595000000006",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estacionamento disponível conforme a unidade.",
    coverAccent: "from-red-950 via-red-700 to-orange-400",
    logoText: "RO",
    tags: ["variedade", "presente", "shopping"],
    featured: false,
    premium: false,
    score: { price: 7.9, trust: 8.0, variety: 8.2, service: 7.8, warranty: 7.4, location: 8.1, parking: 7.1, wholesale: 6.5 },
    reviewSummary: "Boa parada de suporte para rotas mais amplas.",
    worthIt: "Vale como complemento de missão, não como única parada.",
    recommendedProducts: ["Presentes", "Acessórios", "Itens de casa"],
  },
  {
    id: "store-hb-games",
    name: "HB Games",
    slug: "hb-games",
    shortDescription: "Especializada em consoles, jogos e acessórios gamer.",
    fullDescription: "Loja de nicho que faz sentido quando a missão é games. Ajuda a encontrar acessórios específicos e dá mais precisão para quem não quer misturar essa compra com varejo generalista.",
    categorySlugs: ["games", "tecnologia"],
    missionSlugs: ["games", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro comercial de CDE",
    googleMapsUrl: "https://maps.google.com/?q=HB+Games+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/hbgamespy",
    whatsapp: "+595000000007",
    openingHours: "Seg a sáb, 7h30 às 15h30",
    paymentMethods: ["Dinheiro", "Dólar", "Cartão"],
    parkingInfo: "Estacionamento rotativo próximo.",
    coverAccent: "from-violet-950 via-violet-700 to-fuchsia-500",
    logoText: "HB",
    tags: ["playstation", "nintendo", "acessórios"],
    featured: true,
    premium: false,
    score: { price: 8.2, trust: 8.3, variety: 8.6, service: 8.1, warranty: 7.4, location: 7.9, parking: 6.5, wholesale: 7.9 },
    reviewSummary: "Missão games mais eficiente quando você vai direto ao especialista.",
    worthIt: "Vale muito para quem quer precisão no segmento gamer.",
    recommendedProducts: ["PlayStation", "Nintendo", "Headsets", "Controles"],
  },
  {
    id: "store-toku-importados",
    name: "Toku Importados",
    slug: "toku-importados",
    shortDescription: "Boa opção para presentes, utilidades e itens de casa.",
    fullDescription: "Uma parada prática para completar compras de casa e presentes com estética mais organizada. Faz sentido para quem quer variedade sem entrar em lojas gigantescas.",
    categorySlugs: ["casa", "moda"],
    missionSlugs: ["casa"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro de CDE",
    googleMapsUrl: "https://maps.google.com/?q=Toku+Importados+Ciudad+del+Este",
    whatsapp: "+595000000008",
    openingHours: "Seg a sáb, 7h às 15h",
    paymentMethods: ["Dinheiro", "Cartão"],
    parkingInfo: "Estacionamento de rua e bolsões próximos.",
    coverAccent: "from-amber-950 via-amber-700 to-yellow-300",
    logoText: "TK",
    tags: ["utilidades", "presente", "casa"],
    featured: false,
    premium: false,
    score: { price: 8.0, trust: 7.8, variety: 8.2, service: 7.7, warranty: 7.0, location: 7.8, parking: 6.6, wholesale: 7.3 },
    reviewSummary: "Boa surpresa para casa e presentes fora do circuito mais previsível.",
    worthIt: "Vale se a sua missão envolver itens de casa e ticket médio.",
    recommendedProducts: ["Utensílios", "Decoração", "Presentes"],
  },
  {
    id: "store-sax",
    name: "SAX Department Store",
    slug: "sax-department-store",
    shortDescription: "Departamento premium com foco em moda, beleza e experiência.",
    fullDescription: "SAX entrega uma sensação mais sofisticada de compra, especialmente em moda e beleza. É menos sobre caçar o menor preço e mais sobre seleção, ambiente e marcas desejadas.",
    categorySlugs: ["moda", "perfumes"],
    missionSlugs: ["moda", "perfumes"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Shopping Del Este, Ciudad del Este",
    googleMapsUrl: "https://maps.google.com/?q=SAX+Department+Store+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/saxdepartmentstore",
    websiteUrl: "https://sax.com.py",
    whatsapp: "+595000000009",
    openingHours: "Seg a sáb, 7h às 16h30",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Boa estrutura de acesso.",
    coverAccent: "from-zinc-950 via-stone-800 to-amber-400",
    logoText: "SX",
    tags: ["premium", "moda", "beleza"],
    featured: true,
    premium: true,
    score: { price: 7.1, trust: 8.9, variety: 8.5, service: 9.1, warranty: 8.3, location: 8.8, parking: 8.2, wholesale: 5.8 },
    reviewSummary: "Experiência premium com apelo forte para moda e beleza.",
    worthIt: "Vale quando a experiência e a curadoria pesam mais que o desconto máximo.",
    recommendedProducts: ["Perfumes de luxo", "Bolsas", "Cosméticos", "Óculos"],
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
    googleMapsUrl: "https://maps.google.com/?q=Monalisa+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/monalisapy",
    websiteUrl: "https://monalisa.com.py",
    whatsapp: "+595000000010",
    openingHours: "Seg a sáb, 7h às 16h",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Estrutura conhecida, mas com maior fluxo em datas fortes.",
    coverAccent: "from-rose-950 via-fuchsia-700 to-pink-400",
    logoText: "MO",
    tags: ["perfume", "luxo", "beleza"],
    featured: true,
    premium: false,
    score: { price: 7.8, trust: 9.2, variety: 8.8, service: 8.9, warranty: 8.1, location: 8.7, parking: 7.8, wholesale: 5.9 },
    reviewSummary: "Muito forte em confiança para perfumaria e cosméticos.",
    worthIt: "Vale especialmente para quem quer comprar beleza sem risco desnecessário.",
    recommendedProducts: ["Perfumes importados", "Skincare", "Maquiagem premium"],
  },
  {
    id: "store-elegancia",
    name: "Elegância",
    slug: "elegancia",
    shortDescription: "Moda e acessórios com apelo comercial e boa rotatividade.",
    fullDescription: "Ponto interessante para quem quer explorar moda com potencial de revenda e compra por impulso. Mais relevante quando a missão é montar sacolas de variedade.",
    categorySlugs: ["moda", "atacado"],
    missionSlugs: ["moda", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Galeria de moda no centro",
    googleMapsUrl: "https://maps.google.com/?q=Elegancia+Ciudad+del+Este",
    whatsapp: "+595000000011",
    openingHours: "Seg a sáb, 7h às 15h",
    paymentMethods: ["Dinheiro", "Pix via parceiro", "Cartão"],
    parkingInfo: "Melhor chegar cedo para evitar caminhada maior.",
    coverAccent: "from-pink-950 via-rose-700 to-orange-300",
    logoText: "EL",
    tags: ["moda", "revenda", "acessórios"],
    featured: false,
    premium: false,
    score: { price: 8.4, trust: 7.5, variety: 8.1, service: 7.4, warranty: 6.7, location: 7.7, parking: 6.2, wholesale: 8.2 },
    reviewSummary: "Boa para moda com foco comercial e compra rápida.",
    worthIt: "Vale para quem já conhece seu público e busca margem.",
    recommendedProducts: ["Bolsas", "Acessórios femininos", "Peças de giro rápido"],
  },
  {
    id: "store-macedonia",
    name: "Macedônia",
    slug: "macedonia",
    shortDescription: "Fornecedor lembrado por importados e operações de volume.",
    fullDescription: "Mais interessante para quem compra com cabeça de revenda ou precisa explorar mix menos turístico. Não é a loja mais amigável para iniciantes, mas compensa para quem sabe o que quer.",
    categorySlugs: ["atacado", "casa", "moda"],
    missionSlugs: ["revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Microcentro de CDE",
    googleMapsUrl: "https://maps.google.com/?q=Macedonia+Ciudad+del+Este",
    whatsapp: "+595000000012",
    openingHours: "Seg a sáb, 7h às 15h",
    paymentMethods: ["Dinheiro", "Transferência"],
    parkingInfo: "Acesso mais funcional do que confortável.",
    coverAccent: "from-lime-950 via-green-700 to-emerald-400",
    logoText: "MA",
    tags: ["atacado", "importados", "revenda"],
    featured: false,
    premium: true,
    score: { price: 8.8, trust: 7.4, variety: 8.1, service: 7.1, warranty: 6.8, location: 7.4, parking: 5.9, wholesale: 9.1 },
    reviewSummary: "Mais valiosa para quem compra volume e já domina a rota.",
    worthIt: "Vale quando a missão é margem e não passeio.",
    recommendedProducts: ["Utilidades", "Moda popular", "Mix de revenda"],
  },
  {
    id: "store-la-petisqueira",
    name: "La Petisqueira",
    slug: "la-petisqueira",
    shortDescription: "Parada gastronômica útil no meio da missão de compras.",
    fullDescription: "Nem toda parada precisa ser sobre compra. A La Petisqueira entra como apoio de rota para reorganizar o dia, descansar e seguir comprando com menos desgaste.",
    categorySlugs: ["gastronomia"],
    missionSlugs: ["primeira-viagem"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Próximo ao eixo comercial central",
    googleMapsUrl: "https://maps.google.com/?q=La+Petisqueira+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/lapetisqueira",
    whatsapp: "+595000000013",
    openingHours: "Seg a sáb, 10h às 18h",
    paymentMethods: ["Cartão", "Dinheiro"],
    parkingInfo: "Estacionamento próximo com rotatividade moderada.",
    coverAccent: "from-orange-950 via-red-700 to-amber-300",
    logoText: "LP",
    tags: ["almoço", "pausa", "rota"],
    featured: false,
    premium: false,
    score: { price: 7.6, trust: 8.4, variety: 7.1, service: 8.2, warranty: 7.0, location: 8.1, parking: 7.0, wholesale: 4.0 },
    reviewSummary: "Boa pausa estratégica em um dia de compras intenso.",
    worthIt: "Vale como ponto de respiro no meio da rota.",
    recommendedProducts: ["Refeições rápidas", "Café", "Pausa de rota"],
  },
  {
    id: "store-sa-shop",
    name: "SA Shop",
    slug: "sa-shop",
    shortDescription: "Loja prática para eletrônicos de giro e comparativos rápidos.",
    fullDescription: "Uma boa opção para quem gosta de montar rota com 3 ou 4 paradas de comparação. Não é necessariamente a mais famosa, mas pode render achados relevantes.",
    categorySlugs: ["tecnologia"],
    missionSlugs: ["eletronicos", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro comercial de CDE",
    googleMapsUrl: "https://maps.google.com/?q=SA+Shop+Ciudad+del+Este",
    whatsapp: "+595000000014",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Dinheiro", "Dólar", "Cartão"],
    parkingInfo: "Acesso médio, sem grande estrutura dedicada.",
    coverAccent: "from-slate-950 via-slate-700 to-cyan-300",
    logoText: "SA",
    tags: ["comparativo", "tech", "giro rápido"],
    featured: false,
    premium: false,
    score: { price: 8.5, trust: 7.7, variety: 7.8, service: 7.5, warranty: 7.1, location: 7.6, parking: 6.1, wholesale: 7.9 },
    reviewSummary: "Boa para comparação final antes de fechar tecnologia.",
    worthIt: "Vale se você estiver montando uma rota orientada por preço.",
    recommendedProducts: ["Acessórios", "Smartphones", "Informática"],
  },
  {
    id: "store-oasis-plaza",
    name: "Oasis Plaza",
    slug: "oasis-plaza",
    shortDescription: "Complexo útil para circulação mais confortável e compras combinadas.",
    fullDescription: "Oasis Plaza ajuda quando a prioridade é organizar o dia e mesclar compras com logística mais tranquila. Boa opção para quem valoriza experiência e variedade moderada.",
    categorySlugs: ["moda", "casa", "tecnologia"],
    missionSlugs: ["primeira-viagem", "moda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Região central com acesso facilitado",
    googleMapsUrl: "https://maps.google.com/?q=Oasis+Plaza+Ciudad+del+Este",
    whatsapp: "+595000000015",
    openingHours: "Seg a sáb, 8h às 16h",
    paymentMethods: ["Cartão", "Dinheiro"],
    parkingInfo: "Ponto positivo do complexo.",
    coverAccent: "from-teal-950 via-emerald-700 to-cyan-300",
    logoText: "OP",
    tags: ["conforto", "shopping", "primeira viagem"],
    featured: false,
    premium: false,
    score: { price: 7.7, trust: 8.0, variety: 7.9, service: 8.1, warranty: 7.2, location: 8.2, parking: 8.4, wholesale: 6.0 },
    reviewSummary: "Boa opção para quem quer um dia menos caótico.",
    worthIt: "Vale quando a logística pesa tanto quanto o preço.",
    recommendedProducts: ["Moda casual", "Acessórios", "Itens variados"],
  },
  {
    id: "store-shopping-americana",
    name: "Shopping Americana",
    slug: "shopping-americana",
    shortDescription: "Mix popular com boa leitura para compras de impulso e revenda.",
    fullDescription: "Interessante para explorar produtos de giro, itens populares e compras mais agressivas em preço. Menos premium, mais comercial.",
    categorySlugs: ["atacado", "moda", "casa"],
    missionSlugs: ["revenda", "casa"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Microcentro de CDE",
    googleMapsUrl: "https://maps.google.com/?q=Shopping+Americana+Ciudad+del+Este",
    whatsapp: "+595000000016",
    openingHours: "Seg a sáb, 7h às 15h",
    paymentMethods: ["Dinheiro", "Transferência", "Cartão"],
    parkingInfo: "Estrutura básica com bastante movimento.",
    coverAccent: "from-yellow-950 via-orange-700 to-lime-300",
    logoText: "AM",
    tags: ["revenda", "popular", "mix"],
    featured: false,
    premium: false,
    score: { price: 8.7, trust: 7.2, variety: 8.0, service: 7.0, warranty: 6.5, location: 7.5, parking: 5.8, wholesale: 8.9 },
    reviewSummary: "Mais comercial do que aspiracional, com potencial de margem.",
    worthIt: "Vale para quem busca giro e compra enxuta por oportunidade.",
    recommendedProducts: ["Acessórios populares", "Utilidades", "Moda de volume"],
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
    googleMapsUrl: "https://maps.google.com/?q=Mega+Vestcasa+Ciudad+del+Este",
    whatsapp: "+595000000017",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Dinheiro", "Cartão"],
    parkingInfo: "Bolsões próximos; vale evitar pico.",
    coverAccent: "from-stone-950 via-amber-700 to-orange-300",
    logoText: "MV",
    tags: ["casa", "enxoval", "utilidades"],
    featured: true,
    premium: false,
    score: { price: 8.6, trust: 7.9, variety: 8.5, service: 7.6, warranty: 7.0, location: 7.8, parking: 6.4, wholesale: 8.1 },
    reviewSummary: "Excelente foco para missão casa e revenda leve.",
    worthIt: "Vale muito quando o objetivo é comprar casa sem dispersão.",
    recommendedProducts: ["Enxoval", "Utensílios", "Organização"],
  },
  {
    id: "store-infinity-sport",
    name: "Infinity Sport",
    slug: "infinity-sport",
    shortDescription: "Moda esportiva, tênis e peças com apelo comercial.",
    fullDescription: "Ponto útil para quem busca artigos esportivos ou quer testar uma missão mais voltada a moda casual e sneakers. Relevante tanto para consumo quanto para revenda pontual.",
    categorySlugs: ["moda"],
    missionSlugs: ["moda", "revenda"],
    city: "Ciudad del Este",
    country: "Paraguai",
    address: "Centro comercial de CDE",
    googleMapsUrl: "https://maps.google.com/?q=Infinity+Sport+Ciudad+del+Este",
    instagramUrl: "https://instagram.com/infinitysportpy",
    whatsapp: "+595000000018",
    openingHours: "Seg a sáb, 7h às 15h30",
    paymentMethods: ["Cartão", "Dinheiro", "Dólar"],
    parkingInfo: "Rotatividade média e acesso razoável.",
    coverAccent: "from-blue-950 via-indigo-700 to-sky-400",
    logoText: "IS",
    tags: ["sport", "tenis", "moda"],
    featured: false,
    premium: false,
    score: { price: 8.2, trust: 7.8, variety: 8.0, service: 7.7, warranty: 7.1, location: 7.9, parking: 6.3, wholesale: 7.8 },
    reviewSummary: "Boa parada para moda esportiva e tênis com apelo comercial.",
    worthIt: "Vale se a missão inclui peças esportivas e compra orientada por giro.",
    recommendedProducts: ["Tênis", "Camisas esportivas", "Acessórios fitness"],
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
    id: "guide-dinheiro",
    title: "Como trocar dinheiro",
    slug: "como-trocar-dinheiro",
    category: "Câmbio",
    summary: "Como decidir entre real, dólar, cartão e câmbio no dia.",
    content: [
      "Compare a taxa efetiva e não apenas a cotação anunciada.",
      "Algumas lojas têm vantagem em dólar, outras em pagamento local.",
      "Evite chegar sem plano de pagamento para não perder margem logo no início.",
    ],
    premium: true,
    accent: "from-emerald-600 to-lime-400",
  },
  {
    id: "guide-golpes",
    title: "Como evitar golpes",
    slug: "como-evitar-golpes",
    category: "Segurança",
    summary: "Sinais simples que protegem tempo, dinheiro e energia.",
    content: [
      "Desconfie de urgência artificial e ofertas que não permitem comparação.",
      "Confirme localização, reputação e canais oficiais antes de comprar.",
      "Mantenha a rota clara para não depender de orientação improvisada.",
    ],
    premium: false,
    accent: "from-amber-500 to-red-500",
  },
  {
    id: "guide-checklist",
    title: "Checklist primeira viagem",
    slug: "checklist-primeira-viagem",
    category: "Primeira viagem",
    summary: "O essencial para sair do zero e atravessar com mais segurança.",
    content: [
      "Defina objetivo principal, orçamento e lista de prioridades.",
      "Escolha 3 a 5 paradas estratégicas e evite excesso de improviso.",
      "Planeje alimentação, câmbio e retorno antes de começar a comprar.",
    ],
    premium: true,
    accent: "from-indigo-600 to-sky-400",
  },
  {
    id: "guide-receita",
    title: "Receita Federal e cota",
    slug: "receita-federal-e-cota",
    category: "Regras",
    summary: "Uma leitura rápida para evitar compras sem contexto de retorno.",
    content: [
      "Entenda sua cota antes de definir a lista de produtos.",
      "A soma da compra importa tanto quanto o item individual.",
      "Compra sem estratégia pode gerar economia falsa.",
    ],
    premium: false,
    accent: "from-zinc-700 to-zinc-400",
  },
  {
    id: "guide-estacionar",
    title: "Onde estacionar",
    slug: "onde-estacionar",
    category: "Logística",
    summary: "Como ganhar tempo escolhendo melhor sua base de apoio.",
    content: [
      "Avalie estacionamento pela proximidade da primeira missão, não pelo preço isolado.",
      "Se o plano é comprar volume, conforto na saída vale muito.",
      "Estacionar bem pode salvar a segunda metade do dia.",
    ],
    premium: true,
    accent: "from-teal-600 to-cyan-400",
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
  {
    id: "sup-perfume-depot",
    name: "Perfume Depot",
    slug: "perfume-depot",
    segment: "Perfumes",
    description: "Mix de fragrâncias com foco em lotes comerciais e giro rápido.",
    instagramUrl: "https://instagram.com/perfumedepotpy",
    whatsapp: "+595000100002",
    minimumOrder: "Caixa fechada por marca",
    sellsWholesale: true,
    shipsToBrazil: true,
    paymentMethods: ["Dólar", "Dinheiro"],
    frontierNote: "Boa opção para quem já valida saída no Instagram ou WhatsApp.",
    premium: true,
    accent: "from-rose-900 to-fuchsia-500",
  },
  {
    id: "sup-rio-fashion",
    name: "Rio Fashion Source",
    slug: "rio-fashion-source",
    segment: "Roupas",
    description: "Fornecimento de moda casual e peças femininas de giro.",
    whatsapp: "+595000100003",
    minimumOrder: "30 peças mistas",
    sellsWholesale: true,
    shipsToBrazil: false,
    paymentMethods: ["Transferência", "Dinheiro"],
    frontierNote: "Vale para quem já conhece grade e trabalha com prova social.",
    premium: false,
    accent: "from-orange-900 to-pink-500",
  },
  {
    id: "sup-home-origin",
    name: "Home Origin",
    slug: "home-origin",
    segment: "Casa",
    description: "Utilidades, organização e kits de casa para revenda.",
    whatsapp: "+595000100004",
    minimumOrder: "Pedido mínimo de USD 300",
    sellsWholesale: true,
    shipsToBrazil: true,
    paymentMethods: ["Dólar", "Transferência"],
    frontierNote: "Boa entrada para quem quer revender enxoval e utilidades.",
    premium: false,
    accent: "from-amber-900 to-yellow-400",
  },
  {
    id: "sup-toy-route",
    name: "Toy Route",
    slug: "toy-route",
    segment: "Brinquedos",
    description: "Mix comercial de brinquedos, presentes e itens sazonais.",
    instagramUrl: "https://instagram.com/toyroutepy",
    whatsapp: "+595000100005",
    minimumOrder: "USD 250 por pedido",
    sellsWholesale: true,
    shipsToBrazil: false,
    paymentMethods: ["Dinheiro", "Dólar"],
    frontierNote: "Faz mais sentido em épocas de datas comemorativas.",
    premium: false,
    accent: "from-indigo-900 to-violet-500",
  },
  {
    id: "sup-moto-core",
    name: "Moto Core",
    slug: "moto-core",
    segment: "Moto",
    description: "Capacetes, peças e acessórios com foco técnico.",
    whatsapp: "+595000100006",
    minimumOrder: "A partir de 10 peças",
    sellsWholesale: true,
    shipsToBrazil: false,
    paymentMethods: ["Transferência", "Dólar"],
    frontierNote: "Interessante para nichos de ticket maior e público específico.",
    premium: true,
    accent: "from-lime-900 to-green-500",
  },
  {
    id: "sup-game-wholesale",
    name: "Game Wholesale",
    slug: "game-wholesale",
    segment: "Games",
    description: "Consoles, periféricos e acessórios com leitura de revenda.",
    instagramUrl: "https://instagram.com/gamewholesalepy",
    whatsapp: "+595000100007",
    minimumOrder: "A partir de USD 500",
    sellsWholesale: true,
    shipsToBrazil: false,
    paymentMethods: ["Dólar", "Crédito empresarial"],
    frontierNote: "Bom para quem já vende tech e quer abrir frente gamer.",
    premium: true,
    accent: "from-violet-900 to-indigo-500",
  },
  {
    id: "sup-atacado-plus",
    name: "Atacado Plus",
    slug: "atacado-plus",
    segment: "Atacado",
    description: "Mix geral de oportunidade para lojistas e sacoleiros estruturados.",
    whatsapp: "+595000100008",
    minimumOrder: "Conforme categoria",
    sellsWholesale: true,
    shipsToBrazil: true,
    paymentMethods: ["Transferência", "Dólar", "Dinheiro"],
    frontierNote: "Mais útil para quem gosta de montar carrinho misto por margem.",
    premium: true,
    accent: "from-emerald-900 to-teal-500",
  },
];

export const weeklyOpportunities = [
  "Rota curta para eletrônicos: Cell Shop, Shopping China e SA Shop.",
  "Perfumaria com menos atrito: Monalisa primeiro, comparação final na SAX.",
  "Missão casa direta: Mega Vestcasa + Toku Importados.",
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
