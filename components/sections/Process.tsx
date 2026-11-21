import type { ProcessStep } from "@/lib/types";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">04 / How I work</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
            From idea to interface.
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id}>
              <p className="font-display text-3xl tracking-tight text-lime">{step.number}</p>
              <h3 className="mt-3 font-display text-xl tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
