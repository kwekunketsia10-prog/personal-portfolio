import type { ValuePoint } from "@/lib/types";

export function WhyWorkWithMe({ points }: { points: ValuePoint[] }) {
  return (
    <section className="px-5 pb-2 sm:px-8 lg:px-8">
      <ul className="mx-auto grid w-full max-w-[1180px] gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => (
          <li key={point.id}>
            <h3 className="font-display text-base tracking-tight">{point.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{point.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
