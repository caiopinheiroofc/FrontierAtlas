import { AppShell } from "@/components/app-shell";
import { GuideCard } from "@/components/guide-card";
import { SectionHeading } from "@/components/section-heading";
import { guides } from "@/lib/data";

export default function GuiasPage() {
  return (
    <AppShell
      title="Guias rápidos para atravessar melhor."
      subtitle="Conteúdo curto, útil e direto para reduzir erro de primeira viagem e aumentar clareza antes de comprar."
    >
      <SectionHeading
        eyebrow="Guias"
        title="Conteúdo rápido e útil"
        description="A lógica aqui é simples: menos texto por tela, mais orientação prática para agir melhor no mesmo dia."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </AppShell>
  );
}
