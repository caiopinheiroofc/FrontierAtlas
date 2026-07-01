export type SubscriptionRole = "FREE" | "PRO" | "BUSINESS";

export type SubscriptionPlan = {
  role: SubscriptionRole;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: string | null;
  annualPrice: string | null;
  benefits: string[];
  checkoutUrl: string | null;
  color: string;
  icon: "Compass" | "Sparkles" | "BriefcaseBusiness";
  status: "active" | "coming_soon";
};

export const subscriptionPlans: Record<SubscriptionRole, SubscriptionPlan> = {
  FREE: {
    role: "FREE",
    name: "Frontier Atlas Explorer",
    tagline: "Entrada gratuita para conhecer o Atlas",
    description:
      "Perfeito para quem quer explorar lojas, usar rotas prontas e testar o valor do produto antes de assinar.",
    monthlyPrice: null,
    annualPrice: null,
    benefits: [
      "Explorar lojas",
      "Busca",
      "Rotas prontas ilimitadas",
      "Frontier Score",
      "Frontier Picks",
      "Frontier Verified",
      "Guias básicos",
      "Mapa",
      "Até 2 rotas inteligentes completas",
    ],
    checkoutUrl: null,
    color: "from-[#f3f6eb] to-[#e7eddc]",
    icon: "Compass",
    status: "active",
  },
  PRO: {
    role: "PRO",
    name: "Frontier Atlas Pro",
    tagline: "Seu copiloto de compras na fronteira",
    description:
      "Para quem quer usar rotas inteligentes sem limite e transformar o Atlas em ferramenta principal da viagem.",
    monthlyPrice: "R$ 29/mês",
    annualPrice: "R$ 290/ano",
    benefits: [
      "Rotas inteligentes ilimitadas",
      "Lista inteligente de compras",
      "Frontier Smart Route™",
      "Frontier Companion™",
      "Guias Premium",
      "Atualizações prioritárias",
      "Favoritos (quando disponível)",
      "Histórico (quando disponível)",
    ],
    checkoutUrl: "https://pay.cakto.com.br/wgvxt7x_951442",
    color: "from-[#d9ff1f] to-[#b8ef15]",
    icon: "Sparkles",
    status: "active",
  },
  BUSINESS: {
    role: "BUSINESS",
    name: "Frontier Atlas Business",
    tagline: "Camada profissional para margem e revenda",
    description:
      "Para empresários, revendedores, importadores e compradores profissionais que precisam de mais inteligência comercial.",
    monthlyPrice: "Sob consulta",
    annualPrice: "Sob consulta",
    benefits: [
      "Tudo do Plano Pro",
      "Frontier Source™",
      "Lista de fornecedores",
      "Rotas para compras em atacado",
      "Oportunidades de negócio",
      "Conteúdos exclusivos para revenda",
      "Novas oportunidades comerciais",
      "Recursos Business futuros",
    ],
    checkoutUrl: "https://pay.cakto.com.br/yvqd7ck",
    color: "from-[#0d1411] to-[#18231d]",
    icon: "BriefcaseBusiness",
    status: "active",
  },
};
