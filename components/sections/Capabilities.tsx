import { BedDouble, Building2, Layers, ShoppingBag, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
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
    <section className="bg-secondary py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">01 / What I can build</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
            More than just a website.
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            I enjoy building digital experiences that help businesses present themselves professionally and connect with their customers.
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">These are kinds of websites I can build. They are not a list of paid commissions.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {items.map((item, index) => {
            const Icon = icons[item.icon] ?? Layers;
            return (
              <Reveal key={item.id} delay={index * 0.04} className="h-full">
                <article className="h-full rounded-2xl border border-line bg-surface p-4">
                  <Icon size={18} className="text-lime" />
                  <h3 className="mt-4 font-display text-xl tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
