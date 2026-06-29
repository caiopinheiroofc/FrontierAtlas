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
      title="Mapa inteligente para comprar com menos erro."
      subtitle="Em vez de jogar lojas soltas na tela, o Frontier Atlas organiza Ciudad del Este por eixos reais de circulação, comparação e decisão."
    >
      <SectionHeading
        eyebrow="Mapa Inteligente"
        title="A cidade organizada por lógica de compra"
        description="Cada eixo mostra onde vale começar, comparar ou aprofundar a missão. A ideia não é só abrir o Maps, mas te ajudar a pensar a ordem da rota."
      />
      <SmartMapClient zones={smartMap.zones} />
    </AppShell>
  );
}
