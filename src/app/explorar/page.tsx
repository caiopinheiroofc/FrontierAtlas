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
      title="Veja primeiro as lojas que mais importam."
      subtitle="Filtre o essencial para montar uma compra de 1 dia ou uma rota mais completa de 3 dias."
    >
      <SectionHeading
        eyebrow="Explorar"
        title="Lojas principais da rota"
        description="Aqui entram primeiro as paradas mais úteis para uma viagem objetiva e com menos desvio."
      />
      <ExploreClient initialMission={params.mission} stores={stores} categories={categories} />
    </AppShell>
  );
}
