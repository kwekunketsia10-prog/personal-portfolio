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
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="More than just a website.">
          I enjoy building digital experiences that help businesses present themselves professionally and connect with their customers.
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-muted">These are kinds of websites I can build. They are not a list of paid commissions.</p>
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[item.icon] ?? Layers;
            return (
              <Reveal key={item.id} delay={index * 0.04} className="h-full">
                <article className="group h-full bg-background p-7 transition hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.18em] text-lime">{item.number}</span>
                    <Icon size={20} className="text-muted transition group-hover:text-lime" />
                  </div>
                  <h3 className="mt-10 font-display text-3xl tracking-tight">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
