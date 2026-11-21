import type { ValuePoint } from "@/lib/types";

export function WhyWorkWithMe({ points }: { points: ValuePoint[] }) {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Why work with me</p>
        <h2 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.3rem)] leading-[0.98] tracking-[-0.04em]">The way I approach the work.</h2>
      <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => (
          <li key={point.id}>
            <h3 className="font-display text-base tracking-tight">{point.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{point.body}</p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
