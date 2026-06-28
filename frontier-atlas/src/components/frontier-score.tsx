import { averageScore, ScoreBreakdown } from "@/lib/data";

const labels: Array<[keyof ScoreBreakdown, string]> = [
  ["price", "Preço"],
  ["trust", "Confiança"],
  ["variety", "Variedade"],
  ["service", "Atendimento"],
  ["warranty", "Garantia"],
  ["location", "Localização"],
  ["parking", "Estacionamento"],
  ["wholesale", "Atacado"],
];

export function FrontierScore({
  score,
  compact = false,
}: {
  score: ScoreBreakdown;
  compact?: boolean;
}) {
  const finalScore = averageScore(score);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-3 py-2 text-sm font-semibold text-[#0a0a0a]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27d76c] text-xs font-black text-white">
          {finalScore}
        </span>
        Frontier Score
      </div>
    );
  }

  return (
    <section className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-50px_rgba(10,10,10,0.5)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Frontier Score</p>
          <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Avaliação manual inicial</h3>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(from_220deg,_#27d76c_0deg,_#d9ff1f_220deg,_#ecf2e8_220deg)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-black text-[#0a0a0a]">
            {finalScore}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {labels.map(([key, label]) => (
          <div key={key} className="rounded-2xl bg-[#f5f7f2] p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-[#5f695d]">{label}</span>
              <span className="font-bold text-[#0a0a0a]">{score[key].toFixed(1)}</span>
            </div>
            <div className="h-2 rounded-full bg-white">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#27d76c] to-[#d9ff1f]"
                style={{ width: `${score[key] * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
