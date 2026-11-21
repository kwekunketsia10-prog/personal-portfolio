export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-y border-line py-24 md:py-36">
      <div className="drift pointer-events-none absolute -top-24 -left-16 size-80 rounded-full bg-lime/25 blur-3xl" />
      <div className="drift pointer-events-none absolute top-10 right-10 size-64 rounded-full bg-sun/40 blur-3xl" />
      <div className="drift pointer-events-none absolute right-0 bottom-0 size-72 rounded-full bg-indigo/25 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2 className="max-w-5xl font-display text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.05em]">
          Your business deserves a great website.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Whether you&apos;re starting a business, growing an existing brand, or looking to improve your online presence, I can help turn your idea into a professional website.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="inline-flex min-h-12 items-center justify-center bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-lime-deep">
            Let&apos;s build your website
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center justify-center border border-line px-6 text-[0.78rem] font-semibold tracking-[0.16em] uppercase hover:border-lime hover:text-lime">
            Get in touch
          </a>
        </div>
        <p className="mt-8 max-w-xl text-ink">
          I&apos;ve shown you what I&apos;ve built so far. Now, let&apos;s talk about what I can build for you.
        </p>
      </div>
    </section>
  );
}
