import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/lib/types";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-line bg-secondary py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="The tools behind the work.">
          A working set of tools I use to design and build websites. Edit this list from the admin as it changes.
        </SectionHeading>
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="font-mono text-xs tracking-[0.18em] text-lime uppercase">{group.title}</h3>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {group.items.map((item) => (
                  <li key={item} className="py-4 text-lg">
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
