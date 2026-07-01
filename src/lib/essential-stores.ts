import { type Store } from "@/lib/data";

export const essentialStoreSlugs = [
  "shopping-china",
  "cell-shop",
  "nissei",
  "mega-eletronicos",
  "monalisa",
  "new-zone",
  "shopping-americana",
  "sax-department-store",
  "hb-games",
  "mega-vestcasa",
] as const;

const essentialStoreOrder = new Map<string, number>(
  essentialStoreSlugs.map((slug, index) => [slug, index] as [string, number]),
);

export function getEssentialStores(stores: Store[]) {
  return stores
    .filter((store) => essentialStoreOrder.has(store.slug))
    .sort((left, right) => {
      const leftIndex = essentialStoreOrder.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = essentialStoreOrder.get(right.slug) ?? Number.MAX_SAFE_INTEGER;
      return leftIndex - rightIndex;
    });
}

export function getPriorityStores(stores: Store[], limit = 8) {
  const essentials = getEssentialStores(stores);
  if (essentials.length >= limit) {
    return essentials.slice(0, limit);
  }

  const seen = new Set(essentials.map((store) => store.slug));
  const featuredFallback = stores.filter((store) => store.featured && !seen.has(store.slug));

  return [...essentials, ...featuredFallback].slice(0, limit);
}
