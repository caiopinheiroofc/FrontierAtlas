import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { SmartMapClient } from "@/components/smart-map-client";
import { getStores } from "@/lib/frontier-data";
import { buildSmartMap } from "@/lib/smart-map";

export default async function MapaPage() {
  const stores = await getStores();
  const smartMap = buildSmartMap(stores);

  return (
    <AppShell
      title="Mapa simples com o essencial para turistas na CDE."
      subtitle="Escolha uma rota curta de 1 dia ou uma rota mais completa de 3 dias com as lojas mais importantes da cidade."
    >
      <SectionHeading
        eyebrow="Mapa Essencial"
        title="As principais paradas para comprar melhor"
        description="Aqui o foco nao e mostrar tudo. E mostrar o que mais ajuda o turista a comprar com menos confusao e menos desvio."
      />
      <SmartMapClient zones={smartMap.zones} />
    </AppShell>
  );
}
