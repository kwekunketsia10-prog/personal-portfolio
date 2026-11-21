import type { ProcessStep } from "@/lib/types";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] tracking-[-0.045em]">
          From idea to interface.
        </h2>
        <ol className="mt-14 grid gap-4 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id} className="rounded-3xl border border-line bg-surface p-6">
              <p className="inline-flex size-10 items-center justify-center rounded-full bg-lime font-mono text-xs text-background">{step.number}</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight">{step.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
