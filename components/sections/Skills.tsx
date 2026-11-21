import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/lib/types";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="scroll-mt-24 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <SectionHeading index="05 / Toolkit" title="The tools behind the work.">
          A working set of tools I use to design and build websites. Edit this list from the admin as it changes.
        </SectionHeading>
        <div className="mt-6 space-y-4">
          {groups.map((group) => (
            <div key={group.id}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{group.title}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink">
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
