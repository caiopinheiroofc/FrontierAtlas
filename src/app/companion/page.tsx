import { AppShell } from "@/components/app-shell";
import { CompanionPanel } from "@/components/companion-panel";
import { SectionHeading } from "@/components/section-heading";

export default function CompanionPage() {
  return (
    <AppShell
      title="O Companion acompanha a jornada de compra do começo ao fim."
      subtitle="No MVP, ele funciona como uma timeline simples para orientar o ritmo da viagem e preparar a evolucao futura do copiloto."
    >
      <SectionHeading
        eyebrow="Companion"
        title="Sua viagem organizada em passos simples"
        description="A ideia nao e distrair. E manter a compra com mais contexto, ritmo e menos cansaco mental."
      />
      <CompanionPanel />
    </AppShell>
  );
}
