import type { ProcessStep } from "@/lib/types";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.96] tracking-[-0.045em]">
          From idea to interface.
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id} className="rounded-3xl border border-line bg-surface p-6">
              <p className="inline-flex size-10 items-center justify-center rounded-full bg-lime font-mono text-xs text-background">{step.number}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
