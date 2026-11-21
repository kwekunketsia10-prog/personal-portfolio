import type { SkillGroup } from "@/lib/types";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-line bg-secondary py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">03 / Toolkit</p>
        <h2 className="mt-3 max-w-xl font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
          The tools behind the work.
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          A working set of tools I use to design and build websites. Edit this list from the admin as it changes.
        </p>
        <div className="mt-8 space-y-5">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
