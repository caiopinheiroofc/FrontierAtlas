import { AppShell } from "@/components/app-shell";
import { SearchResults } from "@/components/search-results";
import { SectionHeading } from "@/components/section-heading";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return (
    <AppShell
      title="Busca global simples."
      subtitle="Procure em lojas, guias, fornecedores, categorias e tags sem depender de navegação complexa."
    >
      <SectionHeading
        eyebrow="Buscar"
        title="Uma entrada única para achar valor rápido"
        description="A busca desta V1 é leve, direta e serve como prova de utilidade já nos primeiros segundos de uso."
      />
      <SearchResults initialQuery={params.q ?? ""} />
    </AppShell>
  );
}
