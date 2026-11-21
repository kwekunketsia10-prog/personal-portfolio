import type { JourneyStage, ProcessStep } from "@/lib/types";

export function Process({ steps, stages = [] }: { steps: ProcessStep[]; stages?: JourneyStage[] }) {
  return (
    <section id="journey" className="scroll-mt-20 px-5 py-8 sm:px-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">05 / How I work</p>
          <h2 className="mt-2 max-w-[12ch] font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.04em]">
            From idea to interface.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Every project has been a chance to learn something new, experiment, and get better at the work.
          </p>
          {stages.length ? (
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {stages.map((stage) => stage.title).join(" · ")}
            </p>
          ) : null}
        </div>
        <ol className="grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <li key={step.id}>
              <p className="font-display text-3xl tracking-tight text-lime">{step.number}</p>
              <h3 className="mt-2 font-display text-xl tracking-tight">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
