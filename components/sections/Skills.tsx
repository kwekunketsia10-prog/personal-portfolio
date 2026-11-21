import type { SkillGroup } from "@/lib/types";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  const items = groups.flatMap((group) => group.items);

  return (
    <section id="skills" className="scroll-mt-20 px-5 py-8 sm:px-8 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">04 / Toolkit</p>
        <h2 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.3rem)] leading-[0.98] tracking-[-0.04em]">
          The tools behind the work.
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {items.map((item) => (
            <li key={item} className="rounded-2xl bg-surface px-4 py-3 text-sm text-ink">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
