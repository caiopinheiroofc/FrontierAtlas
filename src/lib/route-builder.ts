import { type Store } from "@/lib/data";

export type RouteTime = "expressa" | "meio-dia" | "dia-todo";
export type RouteMobility = "a-pe" | "carro";

export type RouteSuggestionStop = {
  store: Store;
  matchedItems: string[];
  score: number;
  reason: string;
};

export type RouteSuggestion = {
  items: string[];
  stops: RouteSuggestionStop[];
  summary: {
    estimatedTime: string;
    routeProfile: string;
    walkingLevel: string;
  };
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function parseShoppingList(value: string) {
  return Array.from(
    new Set(
      value
        .split(/[\n,;]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function getStopLimit(time: RouteTime, mobility: RouteMobility) {
  if (time === "expressa") return mobility === "a-pe" ? 3 : 4;
  if (time === "meio-dia") return mobility === "a-pe" ? 4 : 5;
  return mobility === "a-pe" ? 5 : 6;
}

function getEstimatedTime(time: RouteTime, stopCount: number) {
  if (time === "expressa") return `${Math.max(1, stopCount)}h a ${Math.max(2, stopCount + 1)}h`;
  if (time === "meio-dia") return `${Math.max(2, stopCount)}h a ${Math.max(3, stopCount + 2)}h`;
  return `${Math.max(4, stopCount)}h a ${Math.max(5, stopCount + 2)}h`;
}

function getRouteProfile(items: string[]) {
  if (items.length <= 2) return "Rota direta para resolver o essencial";
  if (items.length <= 5) return "Rota equilibrada para comparar sem cansar demais";
  return "Rota mais ampla para lista grande e compra planejada";
}

function getWalkingLevel(time: RouteTime, mobility: RouteMobility) {
  if (mobility === "carro") return "deslocamento mais flexivel";
  if (time === "expressa") return "caminhada baixa";
  if (time === "meio-dia") return "caminhada moderada";
  return "caminhada planejada";
}

function buildReason(store: Store, matchedItems: string[]) {
  if (matchedItems.length > 1) {
    return `Boa parada para resolver ${matchedItems.slice(0, 2).join(" e ")} sem sair muito da linha principal da compra.`;
  }

  if (matchedItems.length === 1) {
    return `Entra na rota porque tem boa aderencia para ${matchedItems[0]} e ajuda a reduzir improviso.`;
  }

  if (store.featured) {
    return "Entra como parada de apoio pela curadoria Frontier e pela boa capacidade de resolver compras gerais.";
  }

  return "Funciona como apoio de rota para completar a lista com mais seguranca.";
}

function scoreStoreAgainstItems(store: Store, items: string[]) {
  const haystack = {
    name: normalizeText(store.name),
    shortDescription: normalizeText(store.shortDescription),
    fullDescription: normalizeText(store.fullDescription),
    tags: store.tags.map(normalizeText),
    recommendedProducts: store.recommendedProducts.map(normalizeText),
    categories: store.categorySlugs.map(normalizeText),
    missions: store.missionSlugs.map(normalizeText),
  };

  let score = 0;
  const matchedItems: string[] = [];

  for (const item of items) {
    const normalizedItem = normalizeText(item);
    let itemScore = 0;

    if (
      haystack.recommendedProducts.some(
        (product) => product.includes(normalizedItem) || normalizedItem.includes(product),
      )
    ) {
      itemScore += 12;
    }

    if (
      haystack.tags.some((tag) => tag.includes(normalizedItem) || normalizedItem.includes(tag))
    ) {
      itemScore += 9;
    }

    if (
      haystack.name.includes(normalizedItem) ||
      haystack.shortDescription.includes(normalizedItem) ||
      haystack.fullDescription.includes(normalizedItem)
    ) {
      itemScore += 7;
    }

    if (
      haystack.categories.some(
        (category) => category.includes(normalizedItem) || normalizedItem.includes(category),
      ) ||
      haystack.missions.some(
        (mission) => mission.includes(normalizedItem) || normalizedItem.includes(mission),
      )
    ) {
      itemScore += 5;
    }

    if (itemScore > 0) {
      matchedItems.push(item);
      score += itemScore;
    }
  }

  score += store.score.trust + store.score.variety + store.score.price;
  if (store.featured) score += 4;
  if (store.premium) score += 1;

  return { score, matchedItems };
}

export function buildSuggestedRoute(
  stores: Store[],
  shoppingList: string,
  time: RouteTime,
  mobility: RouteMobility,
): RouteSuggestion {
  const items = parseShoppingList(shoppingList);
  const stopLimit = getStopLimit(time, mobility);

  const rankedStops = stores
    .map((store) => {
      const { score, matchedItems } = scoreStoreAgainstItems(store, items);
      return {
        store,
        matchedItems,
        score,
        reason: buildReason(store, matchedItems),
      } satisfies RouteSuggestionStop;
    })
    .filter((item) => (items.length ? item.matchedItems.length > 0 : item.store.featured))
    .sort((left, right) => right.score - left.score);

  const selectedStops: RouteSuggestionStop[] = [];
  const usedCategories = new Set<string>();

  for (const stop of rankedStops) {
    const mainCategory = stop.store.categorySlugs[0] || stop.store.slug;
    const mustKeep =
      stop.matchedItems.length > 1 || selectedStops.length < Math.min(2, stopLimit);

    if (mustKeep || !usedCategories.has(mainCategory)) {
      selectedStops.push(stop);
      usedCategories.add(mainCategory);
    }

    if (selectedStops.length >= stopLimit) break;
  }

  const fallbackStops =
    selectedStops.length > 0
      ? selectedStops
      : stores
          .filter((store) => store.featured)
          .slice(0, stopLimit)
          .map((store) => ({
            store,
            matchedItems: [],
            score: store.score.trust + store.score.variety + store.score.price,
            reason:
              "Boa parada inicial para quem ainda nao definiu todos os itens e quer uma rota mais segura.",
          }));

  return {
    items,
    stops: fallbackStops,
    summary: {
      estimatedTime: getEstimatedTime(time, fallbackStops.length),
      routeProfile: getRouteProfile(items),
      walkingLevel: getWalkingLevel(time, mobility),
    },
  };
}
