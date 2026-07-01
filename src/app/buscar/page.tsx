import { AppShell } from "@/components/app-shell";
import { CreateRouteBuilder } from "@/components/create-route-builder";
import { SectionHeading } from "@/components/section-heading";
import { getStores } from "@/lib/frontier-data";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const stores = await getStores();

  return (
    <AppShell
      title="Crie sua rota de compras com base na sua lista."
      subtitle="Diga o que voce quer comprar, ajuste tempo e locomoção, e receba uma sequencia de lojas mais util para reduzir caminhada e erro."
    >
      <SectionHeading
        eyebrow="Criar minha rota"
        title="O Atlas organiza o proximo passo da sua compra"
        description="Em vez de procurar a cidade inteira, voce monta a lista e recebe uma rota mais pratica para comecar certo."
      />
      <CreateRouteBuilder initialQuery={params.q ?? ""} stores={stores} />
    </AppShell>
  );
}
