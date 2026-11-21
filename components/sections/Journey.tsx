import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { JourneyStage } from "@/lib/types";

export function Journey({ stages }: { stages: JourneyStage[] }) {
  return (
    <section id="journey" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="The journey so far.">
          Every project has been an opportunity to learn something new, experiment with ideas, and become better at what I do.
        </SectionHeading>
        <ol className="mt-16 border-t border-line">
          {stages.map((stage, index) => (
            <Reveal key={stage.id} delay={index * 0.05}>
              <li className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-start md:py-10">
                <p className="font-mono text-sm tracking-[0.18em] text-lime md:col-span-2">{stage.number}</p>
                <h3 className="font-display text-3xl tracking-tight md:col-span-4 md:text-4xl">{stage.title}</h3>
                <p className="text-lg leading-relaxed text-muted md:col-span-6">{stage.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
