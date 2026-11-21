import { SectionHeading } from "@/components/ui/SectionHeading";
import type { JourneyStage } from "@/lib/types";

export function Journey({ stages }: { stages: JourneyStage[] }) {
  return (
    <section id="journey" className="scroll-mt-24 px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1180px] rounded-[1.75rem] bg-secondary px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeading index="About" title="The journey so far.">
          Every project has been an opportunity to learn something new, experiment with ideas, and become better at what I do.
        </SectionHeading>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => (
            <li key={stage.id} className="rounded-2xl bg-surface p-4">
              <p className="font-mono text-[11px] text-lime">{stage.number}</p>
              <h3 className="mt-2 font-display text-xl tracking-tight">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
