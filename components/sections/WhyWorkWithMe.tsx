import type { ValuePoint } from "@/lib/types";

export function WhyWorkWithMe({ points }: { points: ValuePoint[] }) {
  return (
    <section className="pb-12 md:pb-16">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
            Why work with me?
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {points.map((point) => (
            <li key={point.id} className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="text-xl text-ink">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
