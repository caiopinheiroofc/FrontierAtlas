import { AppShell } from "@/components/app-shell";
import { ExploreClient } from "@/components/explore-client";
import { SectionHeading } from "@/components/section-heading";
import { getCategories, getStores } from "@/lib/frontier-data";

export default async function ExplorarPage({
  searchParams,
}: {
  searchParams: Promise<{ mission?: string }>;
}) {
  const params = await searchParams;
  const [stores, categories] = await Promise.all([getStores(), getCategories()]);

  return (
    <AppShell
      title="Descubra lojas com menos ruído."
      subtitle="Filtre por categoria, missão ou busca simples para montar sua rota com mais intenção."
    >
      <SectionHeading
        eyebrow="Explorar"
        title="Lista inicial de lojas"
        description="Cada card já entrega categoria principal, Frontier Score, descrição curta e atalho para detalhes e mapa."
      />
      <ExploreClient initialMission={params.mission} stores={stores} categories={categories} />
    </AppShell>
  );
}
