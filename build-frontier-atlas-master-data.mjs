import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const projectRoot = "/Users/mdc/Documents/Codex/frontier-atlas";
const outputXlsx = path.join(projectRoot, "frontier-atlas-master-data.xlsx");
const outputCsv = path.join(projectRoot, "frontier-atlas-master-data.csv");

const statuses = ["active", "draft", "review", "inactive"];

const sheetColumns = {
  stores: [
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
  ],
  suppliers: [
    "id",
    "name",
    "slug",
    "segment",
    "description",
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
    "minimum_order",
    "sells_wholesale",
    "ships_to_brazil",
    "payment_methods",
    "product_categories",
    "brands",
    "frontier_note",
    "frontier_score",
    "is_premium",
    "status",
    "last_verified_at",
  ],
  restaurants: [
    "id",
    "name",
    "slug",
    "cuisine_type",
    "description",
    "city",
    "country",
    "address",
    "latitude",
    "longitude",
    "google_maps_url",
    "instagram_url",
    "website_url",
    "whatsapp",
    "phone",
    "opening_hours",
    "price_range",
    "best_for",
    "parking_info",
    "frontier_score",
    "frontier_note",
    "status",
    "last_verified_at",
  ],
  hotels: [
    "id",
    "name",
    "slug",
    "description",
    "city",
    "country",
    "address",
    "latitude",
    "longitude",
    "google_maps_url",
    "instagram_url",
    "website_url",
    "whatsapp",
    "phone",
    "price_range",
    "distance_to_microcentro",
    "amenities",
    "parking_info",
    "frontier_score",
    "frontier_note",
    "status",
    "last_verified_at",
  ],
  exchange_houses: [
    "id",
    "name",
    "slug",
    "description",
    "city",
    "country",
    "address",
    "latitude",
    "longitude",
    "google_maps_url",
    "instagram_url",
    "website_url",
    "whatsapp",
    "phone",
    "opening_hours",
    "locations",
    "frontier_score",
    "frontier_note",
    "status",
    "last_verified_at",
  ],
  parking: [
    "id",
    "name",
    "slug",
    "description",
    "city",
    "country",
    "address",
    "latitude",
    "longitude",
    "google_maps_url",
    "whatsapp",
    "phone",
    "opening_hours",
    "price_range",
    "security_level",
    "covered",
    "frontier_score",
    "frontier_note",
    "status",
    "last_verified_at",
  ],
  categories: [
    "id",
    "name",
    "slug",
    "type",
    "icon",
    "color",
    "description",
    "is_active",
    "order",
  ],
  collections: [
    "id",
    "title",
    "slug",
    "description",
    "objective",
    "icon",
    "cover_image",
    "is_premium",
    "status",
    "order",
  ],
};

const data = {
  stores: [
    {
      id: "store-shopping-china",
      name: "Shopping China",
      slug: "shopping-china",
      main_category: "Tecnologia",
      secondary_categories: "Perfumes,Casa",
      short_description: "Loja âncora para tecnologia, perfumaria e compras de ticket alto.",
      full_description:
        "Operação robusta e conhecida por reunir categorias estratégicas em uma estrutura grande, prática e confiável para quem quer fazer várias compras no mesmo lugar.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Avenida Monseñor Rodríguez, Ciudad del Este",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=Shopping+China+Ciudad+del+Este",
      instagram_url: "https://instagram.com/shoppingchina",
      facebook_url: "",
      website_url: "https://shoppingchina.com.py",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "Seg a sáb, 07:00-16:30",
      payment_methods: "Cartão,Dinheiro,Dólar,Guarani",
      parking_info: "Estacionamento amplo com fluxo intenso em horários de pico.",
      has_air_conditioning: "TRUE",
      has_restroom: "TRUE",
      sells_wholesale: "FALSE",
      ships_to_brazil: "FALSE",
      warranty_info: "to_verify",
      recommended_products: "iPhone,Perfumes importados,Whisky,Fones premium",
      brands: "Apple,Samsung,Dior,Carolina Herrera",
      tags: "premium,primeira viagem,tecnologia,perfumes",
      frontier_score: 9.2,
      price_score: 4.2,
      trust_score: 4.8,
      variety_score: 4.9,
      service_score: 4.1,
      warranty_score: 4.3,
      location_score: 4.6,
      parking_score: 4.4,
      wholesale_score: 3.6,
      review_summary: "Excelente para centralizar compras com segurança e variedade.",
      frontier_note: "Boa entrada para primeira viagem e roteiro premium.",
      is_featured: "TRUE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "review",
      last_verified_at: "to_verify",
    },
    {
      id: "store-cell-shop",
      name: "Cell Shop",
      slug: "cell-shop",
      main_category: "Tecnologia",
      secondary_categories: "Primeira Viagem,Atacado",
      short_description: "Referência em eletrônicos e acessórios com operação conhecida do público brasileiro.",
      full_description:
        "Boa escolha para compras de tecnologia com ambiente organizado, variedade de acessórios e percepção alta de confiança para comparação no mesmo dia.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Shopping Paris, Ciudad del Este",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=Cell+Shop+Ciudad+del+Este",
      instagram_url: "https://instagram.com/cellshopimportados",
      facebook_url: "",
      website_url: "https://cellshop.com.py",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "Seg a sáb, 07:00-16:00",
      payment_methods: "Cartão,Dinheiro,Dólar",
      parking_info: "Estacionamento coberto no complexo.",
      has_air_conditioning: "TRUE",
      has_restroom: "TRUE",
      sells_wholesale: "TRUE",
      ships_to_brazil: "FALSE",
      warranty_info: "to_verify",
      recommended_products: "iPhone,Apple Watch,Fones Bluetooth,Acessórios MagSafe",
      brands: "Apple,Anker,JBL",
      tags: "iphone,apple,confiança,eletrônicos",
      frontier_score: 8.8,
      price_score: 4.0,
      trust_score: 4.7,
      variety_score: 4.4,
      service_score: 4.2,
      warranty_score: 4.3,
      location_score: 4.4,
      parking_score: 4.2,
      wholesale_score: 3.6,
      review_summary: "Compra confortável para tecnologia e acessórios de giro rápido.",
      frontier_note: "Ótima parada para comparação com Shopping China e Nissei.",
      is_featured: "TRUE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "review",
      last_verified_at: "to_verify",
    },
    {
      id: "store-nissei",
      name: "Nissei",
      slug: "nissei",
      main_category: "Tecnologia",
      secondary_categories: "Casa,Primeira Viagem",
      short_description: "Operação forte em eletrônicos, casa e itens de conveniência.",
      full_description:
        "Loja relevante para quem quer combinar tecnologia com utilidades e itens de casa em uma rota mais enxuta e funcional.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Centro de Ciudad del Este",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=Nissei+Ciudad+del+Este",
      instagram_url: "",
      facebook_url: "",
      website_url: "https://nissei.com.py",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "Seg a sáb, 07:00-15:30",
      payment_methods: "Cartão,Dinheiro,Dólar,Guarani",
      parking_info: "Varia conforme a unidade; melhor planejar chegada cedo.",
      has_air_conditioning: "TRUE",
      has_restroom: "TRUE",
      sells_wholesale: "FALSE",
      ships_to_brazil: "FALSE",
      warranty_info: "to_verify",
      recommended_products: "Eletroportáteis,Acessórios tech,Itens de casa",
      brands: "Philips,Electrolux,Xiaomi",
      tags: "mix amplo,casa,eletrônicos",
      frontier_score: 8.5,
      price_score: 4.3,
      trust_score: 4.4,
      variety_score: 4.4,
      service_score: 4.0,
      warranty_score: 4.1,
      location_score: 4.2,
      parking_score: 3.7,
      wholesale_score: 3.4,
      review_summary: "Boa relação entre variedade, preço e praticidade.",
      frontier_note: "Funciona bem como loja coringa no meio da rota.",
      is_featured: "TRUE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "review",
      last_verified_at: "to_verify",
    },
    {
      id: "store-mega-eletronicos",
      name: "Mega Eletrônicos",
      slug: "mega-eletronicos",
      main_category: "Tecnologia",
      secondary_categories: "Atacado,Revenda",
      short_description: "Foco em preço agressivo para eletrônicos e oportunidades de giro.",
      full_description:
        "Mais relevante para quem quer margem, comparação rápida e compra orientada por lista, especialmente em viagens com cabeça de revenda.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Microcentro de Ciudad del Este",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=Mega+Eletronicos+Ciudad+del+Este",
      instagram_url: "https://instagram.com/megaeletronicos",
      facebook_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "Seg a sáb, 07:00-16:00",
      payment_methods: "Dinheiro,Dólar,Transferência",
      parking_info: "Estacionamento mais limitado; ideal ir cedo.",
      has_air_conditioning: "to_verify",
      has_restroom: "to_verify",
      sells_wholesale: "TRUE",
      ships_to_brazil: "FALSE",
      warranty_info: "to_verify",
      recommended_products: "Smartphones Android,Caixas de som,Acessórios,Informática",
      brands: "Xiaomi,Samsung,JBL",
      tags: "revenda,preço,eletrônicos",
      frontier_score: 8.3,
      price_score: 4.5,
      trust_score: 4.1,
      variety_score: 4.2,
      service_score: 3.8,
      warranty_score: 3.9,
      location_score: 4.1,
      parking_score: 3.4,
      wholesale_score: 4.4,
      review_summary: "Atrativa para quem quer margem e compra com velocidade.",
      frontier_note: "Mais comercial do que premium; vale para roteiros de revenda.",
      is_featured: "TRUE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "review",
      last_verified_at: "to_verify",
    },
    {
      id: "store-new-zone",
      name: "New Zone",
      slug: "new-zone",
      main_category: "Tecnologia",
      secondary_categories: "Games",
      short_description: "Mix interessante para eletrônicos e presentes com navegação simples.",
      full_description:
        "Alternativa para quem quer escapar dos nomes mais óbvios sem perder estrutura básica. Faz sentido em compras pontuais e busca de oportunidade.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Galeria no centro de Ciudad del Este",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=New+Zone+Ciudad+del+Este",
      instagram_url: "",
      facebook_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "Seg a sáb, 07:00-15:30",
      payment_methods: "Dinheiro,Cartão",
      parking_info: "Rotatividade rápida em estacionamentos próximos.",
      has_air_conditioning: "to_verify",
      has_restroom: "to_verify",
      sells_wholesale: "FALSE",
      ships_to_brazil: "FALSE",
      warranty_info: "to_verify",
      recommended_products: "Fones,Periféricos,Itens gamer",
      brands: "HyperX,Redragon,to_verify",
      tags: "tech,games,oportunidade",
      frontier_score: 7.9,
      price_score: 4.2,
      trust_score: 4.0,
      variety_score: 3.9,
      service_score: 3.8,
      warranty_score: 3.7,
      location_score: 4.0,
      parking_score: 3.4,
      wholesale_score: 3.7,
      review_summary: "Boa para caça de oportunidade e compra complementar.",
      frontier_note: "Entrar somente depois de validar contatos e operação oficial.",
      is_featured: "FALSE",
      is_partner: "FALSE",
      is_premium: "FALSE",
      status: "review",
      last_verified_at: "to_verify",
    },
  ],
  suppliers: [
    {
      id: "supplier-apple-hub-py",
      name: "Apple Hub PY",
      slug: "apple-hub-py",
      segment: "Apple",
      description: "Fornecedor focado em iPhone, AirPods e acessórios de giro para revenda leve.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      facebook_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      minimum_order: "A partir de 5 unidades",
      sells_wholesale: "TRUE",
      ships_to_brazil: "FALSE",
      payment_methods: "Dólar,Transferência",
      product_categories: "Apple,Acessórios",
      brands: "Apple",
      frontier_note: "Cadastro inicial; validar contato antes de liberar ao público.",
      frontier_score: 8.2,
      is_premium: "TRUE",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "supplier-perfume-depot",
      name: "Perfume Depot",
      slug: "perfume-depot",
      segment: "Perfumes",
      description: "Mix de fragrâncias com foco em lotes comerciais e giro rápido.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      facebook_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      minimum_order: "Caixa fechada por marca",
      sells_wholesale: "TRUE",
      ships_to_brazil: "TRUE",
      payment_methods: "Dólar,Dinheiro",
      product_categories: "Perfumes,Cosméticos",
      brands: "to_verify",
      frontier_note: "Promissor para Source Premium, mas ainda sem validação completa.",
      frontier_score: 8.0,
      is_premium: "TRUE",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "supplier-game-wholesale",
      name: "Game Wholesale",
      slug: "game-wholesale",
      segment: "Games",
      description: "Consoles, periféricos e acessórios com leitura de revenda.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      facebook_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      minimum_order: "A partir de USD 500",
      sells_wholesale: "TRUE",
      ships_to_brazil: "FALSE",
      payment_methods: "Dólar,Crédito empresarial",
      product_categories: "Games,Periféricos",
      brands: "Sony,Nintendo,Xbox",
      frontier_note: "Boa frente para coleção Missão Gamer e Source Premium.",
      frontier_score: 7.9,
      is_premium: "TRUE",
      status: "draft",
      last_verified_at: "to_verify",
    },
  ],
  restaurants: [
    {
      id: "restaurant-la-petisqueira",
      name: "La Petisqueira",
      slug: "la-petisqueira",
      cuisine_type: "Brasileira,Petiscos",
      description: "Parada estratégica para almoço ou pausa no meio da missão de compras.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "Próximo ao eixo comercial central",
      latitude: "",
      longitude: "",
      google_maps_url: "https://maps.google.com/?q=La+Petisqueira+Ciudad+del+Este",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$$",
      best_for: "Almoço,Pausa de rota,Primeira viagem",
      parking_info: "to_verify",
      frontier_score: 7.8,
      frontier_note: "Boa referência inicial para alimentação em roteiro de compras.",
      status: "review",
      last_verified_at: "to_verify",
    },
    {
      id: "restaurant-sax-cafe",
      name: "SAX Café",
      slug: "sax-cafe",
      cuisine_type: "Café,Doces",
      description: "Ponto de pausa premium para reuniões rápidas e descanso no meio do roteiro.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$$",
      best_for: "Café,Espera curta,Reuniões",
      parking_info: "to_verify",
      frontier_score: 7.5,
      frontier_note: "Entrar somente após validar operação atual e nome oficial.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "restaurant-casa-almoco-centro",
      name: "Casa Almoço Centro",
      slug: "casa-almoco-centro",
      cuisine_type: "to_verify",
      description: "Linha placeholder para cadastrar uma opção econômica próxima ao microcentro.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$",
      best_for: "Rota econômica",
      parking_info: "to_verify",
      frontier_score: 6.8,
      frontier_note: "Substituir por restaurante real assim que houver validação.",
      status: "draft",
      last_verified_at: "to_verify",
    },
  ],
  hotels: [
    {
      id: "hotel-bisinnii",
      name: "Bisinii Hotel Boutique",
      slug: "bisinii-hotel-boutique",
      description: "Opção de hospedagem mais confortável para quem quer base segura na cidade.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      price_range: "$$$",
      distance_to_microcentro: "to_verify",
      amenities: "Wi-Fi,Estacionamento,Café da manhã",
      parking_info: "to_verify",
      frontier_score: 8.1,
      frontier_note: "Bom candidato para coleção Rota Premium.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "hotel-las-ventanas",
      name: "Las Ventanas Hotel",
      slug: "las-ventanas-hotel",
      description: "Hotel de apoio para viagens curtas de compra e descanso.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      price_range: "$$",
      distance_to_microcentro: "to_verify",
      amenities: "Wi-Fi,Café da manhã,to_verify",
      parking_info: "to_verify",
      frontier_score: 7.4,
      frontier_note: "Validar distância real para o microcentro.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "hotel-nobile-cde",
      name: "Nobile Hotel Ciudad del Este",
      slug: "nobile-hotel-ciudad-del-este",
      description: "Opção corporativa para quem quer conforto previsível e logística estável.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      price_range: "$$$",
      distance_to_microcentro: "to_verify",
      amenities: "Wi-Fi,Estacionamento,Restaurante,Piscina",
      parking_info: "to_verify",
      frontier_score: 7.9,
      frontier_note: "Boa base potencial para roteiro com família ou viagem mais longa.",
      status: "draft",
      last_verified_at: "to_verify",
    },
  ],
  exchange_houses: [
    {
      id: "exchange-maxicambios",
      name: "Maxi Cambios",
      slug: "maxi-cambios",
      description: "Casa de câmbio conhecida por operação em áreas de alto fluxo.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "to_verify",
      locations: "Microcentro",
      frontier_score: 7.8,
      frontier_note: "Validar canais oficiais e horários antes de publicar.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "exchange-bonanza",
      name: "Bonanza Cambios",
      slug: "bonanza-cambios",
      description: "Ponto de câmbio para comparação de taxa e conveniência.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "to_verify",
      locations: "Microcentro",
      frontier_score: 7.3,
      frontier_note: "Cadastrar somente após validar spread e reputação.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "exchange-alberdi-cde",
      name: "Alberdi Cambios",
      slug: "alberdi-cambios-cde",
      description: "Marca conhecida na região e candidata para linha de apoio ao viajante.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      instagram_url: "",
      website_url: "",
      whatsapp: "to_verify",
      phone: "",
      opening_hours: "to_verify",
      locations: "to_verify",
      frontier_score: 7.6,
      frontier_note: "Linha inicial; completar endereços e janelas operacionais.",
      status: "draft",
      last_verified_at: "to_verify",
    },
  ],
  parking: [
    {
      id: "parking-shopping-paris",
      name: "Estacionamento Shopping Paris",
      slug: "estacionamento-shopping-paris",
      description: "Base útil para operações no entorno do Shopping Paris e Cell Shop.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      whatsapp: "",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$$",
      security_level: "Médio",
      covered: "TRUE",
      frontier_score: 7.9,
      frontier_note: "Boa base para tecnologia e primeira viagem.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "parking-oasis-plaza",
      name: "Estacionamento Oasis Plaza",
      slug: "estacionamento-oasis-plaza",
      description: "Opção com proposta de acesso mais confortável e circulação mais calma.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      whatsapp: "",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$$",
      security_level: "Médio",
      covered: "TRUE",
      frontier_score: 7.5,
      frontier_note: "Interessante para quem quer menos atrito logístico.",
      status: "draft",
      last_verified_at: "to_verify",
    },
    {
      id: "parking-microcentro-economico",
      name: "Estacionamento Microcentro Econômico",
      slug: "estacionamento-microcentro-economico",
      description: "Linha placeholder para mapear uma opção econômica próxima ao centro.",
      city: "Ciudad del Este",
      country: "Paraguai",
      address: "to_verify",
      latitude: "",
      longitude: "",
      google_maps_url: "",
      whatsapp: "",
      phone: "",
      opening_hours: "to_verify",
      price_range: "$",
      security_level: "to_verify",
      covered: "FALSE",
      frontier_score: 6.5,
      frontier_note: "Substituir por estacionamento real assim que houver validação.",
      status: "draft",
      last_verified_at: "to_verify",
    },
  ],
  categories: [
    { id: "cat-tecnologia", name: "Tecnologia", slug: "tecnologia", type: "store", icon: "Smartphone", color: "#0EA5E9", description: "Eletrônicos, celulares e acessórios.", is_active: "TRUE", order: 1 },
    { id: "cat-perfumes", name: "Perfumes", slug: "perfumes", type: "store", icon: "Sparkles", color: "#EC4899", description: "Perfumes, cosméticos e beleza.", is_active: "TRUE", order: 2 },
    { id: "cat-casa", name: "Casa", slug: "casa", type: "store", icon: "Home", color: "#F59E0B", description: "Utilidades, decoração e enxoval.", is_active: "TRUE", order: 3 },
    { id: "cat-games", name: "Games", slug: "games", type: "store", icon: "Gamepad2", color: "#8B5CF6", description: "Consoles, jogos e periféricos.", is_active: "TRUE", order: 4 },
    { id: "cat-moda", name: "Moda", slug: "moda", type: "store", icon: "Shirt", color: "#FB7185", description: "Roupas, tênis e acessórios.", is_active: "TRUE", order: 5 },
    { id: "cat-moto", name: "Moto", slug: "moto", type: "store", icon: "Bike", color: "#65A30D", description: "Peças e acessórios para moto.", is_active: "TRUE", order: 6 },
    { id: "cat-automotivo", name: "Automotivo", slug: "automotivo", type: "store", icon: "Car", color: "#475569", description: "Peças, som e acessórios automotivos.", is_active: "TRUE", order: 7 },
    { id: "cat-gastronomia", name: "Gastronomia", slug: "gastronomia", type: "restaurant", icon: "UtensilsCrossed", color: "#F97316", description: "Restaurantes, cafés e pausas de rota.", is_active: "TRUE", order: 8 },
    { id: "cat-hoteis", name: "Hotéis", slug: "hoteis", type: "hotel", icon: "Hotel", color: "#64748B", description: "Hospedagens de apoio na cidade.", is_active: "TRUE", order: 9 },
    { id: "cat-cambio", name: "Câmbio", slug: "cambio", type: "exchange_house", icon: "BadgeDollarSign", color: "#10B981", description: "Casas de câmbio e serviços de moeda.", is_active: "TRUE", order: 10 },
    { id: "cat-estacionamento", name: "Estacionamento", slug: "estacionamento", type: "parking", icon: "SquareParking", color: "#0F766E", description: "Bases de estacionamento para compras e logística.", is_active: "TRUE", order: 11 },
    { id: "cat-atacado", name: "Atacado", slug: "atacado", type: "supplier", icon: "Boxes", color: "#CA8A04", description: "Compras de volume e revenda.", is_active: "TRUE", order: 12 },
    { id: "cat-primeira-viagem", name: "Primeira Viagem", slug: "primeira-viagem", type: "collection", icon: "Compass", color: "#2563EB", description: "Curadoria para quem vai à fronteira pela primeira vez.", is_active: "TRUE", order: 13 },
  ],
  collections: [
    { id: "collection-missao-apple", title: "Missão Apple", slug: "missao-apple", description: "Rota e curadoria para quem busca iPhone, Apple Watch e acessórios.", objective: "Comprar itens Apple com mais segurança e comparação rápida.", icon: "Smartphone", cover_image: "", is_premium: "TRUE", status: "draft", order: 1 },
    { id: "collection-missao-perfumes", title: "Missão Perfumes", slug: "missao-perfumes", description: "Seleção de lojas para fragrâncias e cosméticos importados.", objective: "Reduzir risco de compra e acelerar decisão em perfumaria.", icon: "Sparkles", cover_image: "", is_premium: "FALSE", status: "draft", order: 2 },
    { id: "collection-missao-gamer", title: "Missão Gamer", slug: "missao-gamer", description: "Mapa inicial para consoles, acessórios e presentes gamer.", objective: "Ir direto ao que importa para compras gamer.", icon: "Gamepad2", cover_image: "", is_premium: "FALSE", status: "draft", order: 3 },
    { id: "collection-missao-casa-nova", title: "Missão Casa Nova", slug: "missao-casa-nova", description: "Itens de casa, enxoval e utilidades em rota dedicada.", objective: "Montar uma compra funcional para casa e presenteáveis.", icon: "Home", cover_image: "", is_premium: "FALSE", status: "draft", order: 4 },
    { id: "collection-missao-revenda", title: "Missão Revenda", slug: "missao-revenda", description: "Lojas e fornecedores para quem compra com olhar de margem.", objective: "Priorizar giro, atacado e compras orientadas por revenda.", icon: "TrendingUp", cover_image: "", is_premium: "TRUE", status: "draft", order: 5 },
    { id: "collection-primeira-viagem", title: "Primeira Viagem", slug: "primeira-viagem", description: "Curadoria para atravessar melhor e errar menos na primeira ida.", objective: "Dar clareza e segurança nas primeiras 2 horas de uso.", icon: "Compass", cover_image: "", is_premium: "FALSE", status: "draft", order: 6 },
    { id: "collection-presentes-baratos", title: "Presentes Baratos", slug: "presentes-baratos", description: "Ideias rápidas para presentes com boa percepção de valor.", objective: "Encontrar itens presenteáveis sem dispersão.", icon: "Gift", cover_image: "", is_premium: "FALSE", status: "draft", order: 7 },
    { id: "collection-compras-em-familia", title: "Compras em Família", slug: "compras-em-familia", description: "Rota mais confortável para quem viaja com família.", objective: "Equilibrar compra, logística, pausas e conforto.", icon: "Users", cover_image: "", is_premium: "FALSE", status: "draft", order: 8 },
    { id: "collection-rota-economica", title: "Rota Econômica", slug: "rota-economica", description: "Seleção pensada para quem quer comprar com atenção máxima ao preço.", objective: "Maximizar economia sem virar caos operacional.", icon: "Wallet", cover_image: "", is_premium: "FALSE", status: "draft", order: 9 },
    { id: "collection-rota-premium", title: "Rota Premium", slug: "rota-premium", description: "Percurso com foco em experiência, conforto e estrutura.", objective: "Atender quem valoriza segurança, ambiente e conveniência.", icon: "Crown", cover_image: "", is_premium: "TRUE", status: "draft", order: 10 },
  ],
};

const allCsvColumns = [
  "entity_type",
  ...Array.from(
    new Set(
      Object.values(sheetColumns).flat(),
    ),
  ),
];

function escapeCsv(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function applyHeaderStyle(sheet, lastColLetter) {
  const header = sheet.getRange(`A1:${lastColLetter}1`);
  header.format.fill.color = "#09110C";
  header.format.font.color = "#FFFFFF";
  header.format.font.bold = true;
  header.format.verticalAlignment = "center";
  header.format.horizontalAlignment = "center";
  header.format.wrapText = true;
  header.format.rowHeight = 28;
  header.format.borders = { preset: "all", style: "thin", color: "#D9E2D2" };
}

function applyBodyStyle(sheet, rowCount, colCount) {
  if (rowCount < 2) return;
  const range = sheet.getRangeByIndexes(1, 0, rowCount - 1, colCount);
  range.format.borders = { preset: "all", style: "thin", color: "#E5E7EB" };
  range.format.verticalAlignment = "top";
  range.format.wrapText = true;
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidth = width;
  });
}

function matrixFromRows(columns, rows) {
  return [columns, ...rows.map((row) => columns.map((column) => row[column] ?? ""))];
}

const workbook = Workbook.create();

for (const [sheetName, columns] of Object.entries(sheetColumns)) {
  const rows = data[sheetName];
  const sheet = workbook.worksheets.add(sheetName);
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);

  const matrix = matrixFromRows(columns, rows);
  const endCol = toColumnLetter(columns.length);
  const range = sheet.getRange(`A1:${endCol}${matrix.length}`);
  range.values = matrix;

  applyHeaderStyle(sheet, endCol);
  applyBodyStyle(sheet, matrix.length, columns.length);
  setWidths(sheet, columns.map((column) => recommendedWidth(column)));

  const used = sheet.getUsedRange();
  used.format.autofitRows();

  const statusColumnIndex = columns.indexOf("status");
  if (statusColumnIndex >= 0) {
    const statusRange = sheet.getRangeByIndexes(1, statusColumnIndex, rows.length, 1);
    statusRange.dataValidation = {
      rule: { type: "list", values: statuses },
    };
  }

  if (sheetName === "stores") {
    styleScoreColumns(sheet, columns, rows.length);
    styleBooleanColumns(sheet, columns, rows.length);
  }

  if (["suppliers", "parking", "categories", "collections", "hotels", "restaurants", "exchange_houses"].includes(sheetName)) {
    styleBooleanColumns(sheet, columns, rows.length);
  }
}

const meta = workbook.worksheets.add("README");
meta.showGridLines = false;
meta.getRange("A1:D14").values = [
  ["Frontier Atlas Master Data", "", "", ""],
  ["Arquivo", "Uso", "Observação", "Status"],
  ["stores", "Lojas e shoppings", "Incluir contatos reais somente após validação", "active"],
  ["suppliers", "Fornecedores e atacado", "Premium por padrão quando não houver validação pública", "active"],
  ["restaurants", "Restaurantes e cafés", "Bom para rotas e experiência do usuário", "active"],
  ["hotels", "Hospedagens", "Usar para roteiros com família e viagens longas", "active"],
  ["exchange_houses", "Casas de câmbio", "Validar horários e spread antes de publicar", "active"],
  ["parking", "Estacionamentos", "Útil para logística e primeira viagem", "active"],
  ["categories", "Taxonomia base", "Serve como seed inicial", "active"],
  ["collections", "Missões e rotas", "Base para coleções premium e públicas", "active"],
  ["", "", "", ""],
  ["Regras-chave", "Slugs em minúsculo sem acento", "Booleanos TRUE/FALSE", "active"],
  ["Regras-chave", "Campos multi-valor separados por vírgula", "Status: active,draft,review,inactive", "active"],
  ["Regras-chave", "Sem inventar contatos; usar to_verify quando necessário", "Notas individuais de 0 a 5", "active"],
];
meta.getRange("A1:D14").format.wrapText = true;
meta.getRange("A1:D14").format.borders = { preset: "all", style: "thin", color: "#E5E7EB" };
meta.getRange("A1:D1").merge();
meta.getRange("A1").format.fill.color = "#09110C";
meta.getRange("A1").format.font.color = "#FFFFFF";
meta.getRange("A1").format.font.bold = true;
meta.getRange("A1").format.font.size = 14;
meta.getRange("A2:D2").format.fill.color = "#D9FF1F";
meta.getRange("A2:D2").format.font.bold = true;
setWidths(meta, [24, 28, 48, 14]);
meta.freezePanes.freezeRows(2);

const csvRows = [];
for (const [sheetName, rows] of Object.entries(data)) {
  for (const row of rows) {
    const record = {};
    for (const column of allCsvColumns) {
      if (column === "entity_type") {
        record[column] = sheetName;
      } else {
        record[column] = row[column] ?? "";
      }
    }
    csvRows.push(record);
  }
}

const csvText = [
  allCsvColumns.join(","),
  ...csvRows.map((row) => allCsvColumns.map((column) => escapeCsv(row[column])).join(",")),
].join("\n");

await fs.writeFile(outputCsv, csvText, "utf8");
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputXlsx);

const summary = await workbook.inspect({
  kind: "sheet,table",
  include: "name",
  tableMaxRows: 4,
  tableMaxCols: 6,
  maxChars: 3000,
});

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "scan formula errors",
});

const preview = await workbook.render({ sheetName: "stores", range: "A1:Q8", scale: 1.5 });
const previewBytes = new Uint8Array(await preview.arrayBuffer());
await fs.writeFile(path.join(projectRoot, "frontier-atlas-master-data-preview.png"), previewBytes);

console.log(
  JSON.stringify(
    {
      outputXlsx,
      outputCsv,
      summary: summary.ndjson,
      formulaErrors: formulaErrors.ndjson,
    },
    null,
    2,
  ),
);

function styleScoreColumns(sheet, columns, rowCount) {
  const scoreColumns = [
    "frontier_score",
    "price_score",
    "trust_score",
    "variety_score",
    "service_score",
    "warranty_score",
    "location_score",
    "parking_score",
    "wholesale_score",
  ];

  for (const columnName of scoreColumns) {
    const columnIndex = columns.indexOf(columnName);
    if (columnIndex < 0) continue;
    const range = sheet.getRangeByIndexes(1, columnIndex, rowCount, 1);
    range.setNumberFormat(columnName === "frontier_score" ? "0.0" : "0.0");
    range.conditionalFormats.add("colorScale", {
      colors: ["#FCA5A5", "#FDE68A", "#86EFAC"],
      thresholds: ["min", "50%", "max"],
    });
  }
}

function styleBooleanColumns(sheet, columns, rowCount) {
  const boolColumns = columns.filter((column) => column.startsWith("is_") || column.startsWith("has_") || column === "covered" || column.startsWith("sells_") || column.startsWith("ships_"));

  for (const columnName of boolColumns) {
    const columnIndex = columns.indexOf(columnName);
    if (columnIndex < 0) continue;
    const range = sheet.getRangeByIndexes(1, columnIndex, rowCount, 1);
    range.dataValidation = {
      rule: { type: "list", values: ["TRUE", "FALSE", "to_verify"] },
    };
  }
}

function recommendedWidth(column) {
  if (["full_description", "description", "frontier_note", "review_summary", "objective"].includes(column)) return 42;
  if (["address", "recommended_products", "brands", "tags", "payment_methods", "amenities"].includes(column)) return 28;
  if (column.endsWith("_url")) return 32;
  if (["short_description", "opening_hours", "parking_info", "warranty_info", "best_for", "product_categories", "locations"].includes(column)) return 24;
  if (["status", "city", "country", "slug", "type", "segment", "price_range", "security_level"].includes(column)) return 14;
  return 18;
}

function toColumnLetter(index) {
  let result = "";
  let value = index;
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}
