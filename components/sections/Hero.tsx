import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const preview = projects[0];

  return (
    <section id="home" className="relative min-h-svh overflow-hidden bg-ink-deep text-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_20%,rgba(26,154,144,0.35),transparent_55%),radial-gradient(700px_420px_at_10%_80%,rgba(14,124,116,0.28),transparent_50%)]" />
      <div className="relative mx-auto grid min-h-svh w-full max-w-[1440px] items-center gap-8 px-5 pt-20 pb-14 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.22em] text-sun uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-4 inline-flex rounded-full border border-background/20 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-background uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.055em]">
            <AnimatedText text={profile.heroHeading} />
            <span className="block text-sun">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/85">{profile.heroBody}</p>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-background/65">{profile.heroSupport}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
              Explore my work
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-background/25 bg-background/10 px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-background/20">
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          {profile.portraitPath ? (
            <div className="absolute -top-16 right-0 z-20 hidden size-24 overflow-hidden rounded-2xl border border-background/20 lg:block">
              <Image src={profile.portraitPath} alt="" fill className="object-cover" sizes="96px" />
            </div>
          ) : null}
          <div className="float-slow relative z-10">
            {preview ? (
              <ProjectBrowserMockup
                src={preview.desktopImage}
                alt={`${preview.name} homepage preview`}
                url={preview.liveUrl}
                priority
              />
            ) : null}
          </div>
          {preview ? (
            <div className="float-slower absolute -bottom-8 -left-6 z-20 hidden w-[46%] rounded-2xl border border-line bg-surface p-3 text-ink shadow-2xl md:block">
              <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Live preview</p>
              <p className="mt-2 font-display text-xl tracking-tight">{preview.name}</p>
              <p className="mt-1 text-xs text-muted">{preview.category}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-t-[2rem] bg-background sm:h-14 sm:rounded-t-[2.5rem]" />
      <a href="#story" className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] text-background/60 uppercase md:block">
        Scroll
      </a>
    </section>
  );
}
