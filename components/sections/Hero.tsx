import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const primary = projects[0];
  const secondary = projects[4] ?? projects[1];

  return (
    <section id="home" className="relative min-h-svh">
      <div className="mx-auto grid min-h-svh w-full max-w-[1440px] items-end gap-12 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.22em] text-lime uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-4 inline-flex border border-line px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.3rem,8vw,7.2rem)] leading-[0.9] tracking-[-0.055em]">
            <AnimatedText text={profile.heroHeading} />
            <span className="block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink">{profile.heroBody}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{profile.heroSupport}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-12 items-center justify-center bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-lime-deep">
              Explore my work
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center border border-line px-6 text-[0.78rem] font-semibold tracking-[0.16em] uppercase hover:border-lime hover:text-lime">
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          {profile.portraitPath ? (
            <div className="absolute -top-16 right-0 z-20 hidden size-24 overflow-hidden border border-line lg:block">
              <Image src={profile.portraitPath} alt="" fill className="object-cover" sizes="96px" />
            </div>
          ) : null}
          <div className="float-slow relative z-10">
            {primary ? (
              <ProjectBrowserMockup
                src={primary.desktopImage}
                alt={`${primary.name} homepage preview`}
                url={primary.liveUrl}
                priority
              />
            ) : null}
          </div>
          {secondary ? (
            <div className="float-slower absolute -bottom-8 -left-6 z-20 hidden w-[46%] border border-line bg-surface p-3 shadow-2xl md:block">
              <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Live preview</p>
              <p className="mt-2 font-display text-xl tracking-tight">{secondary.name}</p>
              <p className="mt-1 text-xs text-muted">{secondary.category}</p>
            </div>
          ) : null}
          <div className="absolute -top-6 right-4 z-20 hidden border border-line bg-background/80 p-4 font-mono text-[11px] leading-relaxed text-muted backdrop-blur md:block">
            <p className="text-lime">build(idea)</p>
            <p>return experience</p>
          </div>
        </div>
      </div>
      <a href="#story" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] text-muted uppercase md:block">
        Scroll
      </a>
    </section>
  );
}
