import { BedDouble, Building2, Layers, ShoppingBag, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
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
    <section id="expertise" className="scroll-mt-24 px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <SectionHeading index="01 / What I can build" title="Websites with a clear purpose.">
            I enjoy building digital experiences that help businesses present themselves professionally and connect with their customers.
          </SectionHeading>
          <p className="mt-3 max-w-sm text-sm text-muted">These are kinds of websites I can build. They are not a list of paid commissions.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {items.map((item) => {
            const Icon = icons[item.icon] ?? Layers;
            return (
              <article key={item.id} className="rounded-2xl border border-line bg-surface p-4">
                <Icon size={18} className="text-lime" />
                <h3 className="mt-3 font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
