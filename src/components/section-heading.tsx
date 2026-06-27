export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">{eyebrow}</p>
      <h2 className="text-2xl font-black tracking-[-0.04em] text-[#0a0a0a] sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-6 text-[#5e685b] sm:text-base">{description}</p>
    </div>
  );
}
