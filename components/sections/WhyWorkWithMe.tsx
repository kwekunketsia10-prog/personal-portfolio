import type { ValuePoint } from "@/lib/types";

export function WhyWorkWithMe({ points }: { points: ValuePoint[] }) {
  return (
    <section className="px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.96] tracking-[-0.04em]">Why work with me?</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <li key={point.id} className="rounded-2xl border border-line bg-surface p-4">
              <h3 className="font-display text-lg tracking-tight">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
