import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-ink-deep px-6 py-10 text-background sm:px-12 md:py-12">
        <div className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-lime/30 blur-3xl" />
        <div className="relative max-w-4xl">
          <p className="font-mono text-xs tracking-[0.2em] text-sun uppercase">Your next website</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.96] tracking-[-0.05em]">
            Your business deserves a great website.
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-background/75">
            Whether you&apos;re starting a business, growing an existing brand, or looking to improve your online presence, I can help turn your idea into a professional website.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
              Let&apos;s build your website
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-background/25 bg-background/10 px-6 text-[0.78rem] font-semibold tracking-[0.14em] uppercase hover:bg-background/20">
              Get in touch
            </a>
          </div>
          <p className="mt-5 max-w-xl text-background/80">
            I&apos;ve shown you what I&apos;ve built so far. Now, let&apos;s talk about what I can build for you.
          </p>
        </div>
      </div>
    </section>
  );
}
