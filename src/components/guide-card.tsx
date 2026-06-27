import { Lock, Unlock } from "lucide-react";
import { Guide } from "@/lib/data";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.5)]">
      <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${guide.accent} px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white`}>
        {guide.category}
      </div>
      <h3 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">{guide.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#667064]">{guide.summary}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-[#475143]">
        {guide.content.slice(0, 3).map((item) => (
          <li key={item} className="rounded-2xl bg-[#f6f7f2] px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-3 py-2 text-xs font-semibold text-[#0a0a0a]">
        {guide.premium ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
        {guide.premium ? "Premium" : "Gratuito"}
      </div>
    </article>
  );
}
