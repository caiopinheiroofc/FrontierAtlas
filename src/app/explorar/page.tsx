import { AppShell } from "@/components/app-shell";
import { ExploreClient } from "@/components/explore-client";
import { SectionHeading } from "@/components/section-heading";
import { getPriorityStores } from "@/lib/essential-stores";
import { getCategories, getStores } from "@/lib/frontier-data";

export default async function ExplorarPage({
  searchParams,
}: {
  searchParams: Promise<{ mission?: string }>;
}) {
  const params = await searchParams;
  const [stores, categories] = await Promise.all([getStores(), getCategories()]);
  const priorityStores = getPriorityStores(stores, 12);

  return (
    <AppShell
      title="Veja primeiro as lojas que mais importam."
      subtitle="Comece pelo essencial para montar uma compra de 1 dia ou uma rota mais completa de 3 dias."
    >
      <SectionHeading
        eyebrow="Explorar"
        title="Lojas principais da rota"
        description="Aqui entram primeiro as paradas mais úteis para uma viagem objetiva e com menos desvio."
      />
      <ExploreClient
        initialMission={params.mission}
        stores={priorityStores}
        categories={categories}
      />
    </AppShell>
  );
}
