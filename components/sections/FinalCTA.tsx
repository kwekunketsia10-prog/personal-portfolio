import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">Your next website</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.96] tracking-[-0.045em]">
            Your business deserves a great website.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Whether you&apos;re starting a business, growing an existing brand, or looking to improve your online presence, I can help turn your idea into a professional website.
          </p>
          <p className="mt-3 max-w-xl text-muted">
            I&apos;ve shown you what I&apos;ve built so far. Now, let&apos;s talk about what I can build for you.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
            Let&apos;s build your website
            <ArrowRight size={16} />
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase hover:border-lime hover:text-lime">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
