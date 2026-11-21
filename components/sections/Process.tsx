import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/lib/types";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <SectionHeading index="06 / How I work" title="From idea to interface." />
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id} className="rounded-2xl bg-secondary p-4">
              <p className="font-mono text-[11px] text-lime">{step.number}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
