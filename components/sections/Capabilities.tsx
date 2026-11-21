import { BedDouble, Building2, Layers, ShoppingBag, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
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
    <section id="expertise" className="scroll-mt-20 px-5 py-6 sm:px-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1180px] items-start gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">01 / What I can build</p>
          <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.04em]">
            Websites with a clear purpose.
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            These are kinds of websites I can build. They are not a list of paid commissions.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.icon] ?? Layers;
            return (
              <article key={item.id} className="rounded-2xl bg-surface px-4 py-4">
                <Icon size={16} className="text-lime" />
                <h3 className="mt-3 font-display text-lg leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
