import { BedDouble, Building2, Layers, ShoppingBag, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Capability } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  Building2,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  BedDouble,
  Layers,
};

export function Capabilities({ items }: { items: Capability[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="More than just a website.">
          I enjoy building digital experiences that help businesses present themselves professionally and connect with their customers.
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-muted">These are kinds of websites I can build. They are not a list of paid commissions.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[item.icon] ?? Layers;
            return (
              <Reveal key={item.id} delay={index * 0.04} className="h-full">
                <article className="group h-full rounded-3xl border border-line bg-surface p-5 shadow-[0_16px_40px_rgba(14,124,116,0.06)] transition hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-secondary font-mono text-xs tracking-[0.08em] text-lime">{item.number}</span>
                    <Icon size={20} className="text-muted transition group-hover:text-lime" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
