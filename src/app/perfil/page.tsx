import { AppShell } from "@/components/app-shell";
import { ProfilePanel } from "@/components/profile-panel";
import { SectionHeading } from "@/components/section-heading";

export default function PerfilPage() {
  return (
    <AppShell
      title="Seu plano, seus limites e seus proximos desbloqueios."
      subtitle="Uma area simples para o usuario entender o que ja tem hoje e o que ganha ao continuar com o Frontier Atlas."
    >
      <SectionHeading
        eyebrow="Perfil"
        title="Assinatura"
        description="Aqui a assinatura aparece como parte natural da experiencia, sem interromper o uso do produto."
      />
      <ProfilePanel />
    </AppShell>
  );
}
