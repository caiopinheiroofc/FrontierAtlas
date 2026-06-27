import Link from "next/link";
import { AtlasIcon } from "@/components/icon";
import { Mission } from "@/lib/data";

export function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Link
      href={`/explorar?mission=${mission.slug}`}
      className="group rounded-[28px] border border-black/6 bg-white p-4 shadow-[0_25px_80px_-48px_rgba(10,10,10,0.65)] transition hover:-translate-y-1"
    >
      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${mission.accent} text-white shadow-lg`}>
        <AtlasIcon name={mission.icon} className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold tracking-[-0.03em] text-[#0a0a0a]">{mission.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#677264]">{mission.description}</p>
      <p className="mt-4 text-sm font-semibold text-[#0a0a0a]">Abrir missão</p>
    </Link>
  );
}
