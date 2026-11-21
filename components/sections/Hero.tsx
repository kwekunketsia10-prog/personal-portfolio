import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const preview = projects[0];

  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 pt-24 pb-12 sm:px-8 lg:min-h-svh lg:grid-cols-12 lg:px-12 lg:pt-28">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.2em] text-lime uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-3 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-xl font-display text-[clamp(2.8rem,5.4vw,4.8rem)] leading-[0.94] tracking-[-0.05em] text-ink">
            <AnimatedText text={profile.heroHeading} />
            <span className="block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{profile.heroBody}</p>
          <p className="mt-2 max-w-md leading-relaxed text-muted">{profile.heroSupport}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
              Explore my work
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase hover:border-lime hover:text-lime">
              Let&apos;s talk
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            {profile.title} · Self-initiated projects
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="pointer-events-none absolute top-1/2 right-0 hidden h-72 -translate-y-1/2 font-mono text-[11px] tracking-[0.28em] text-muted/70 uppercase xl:block [writing-mode:vertical-rl]">
            Ideas into websites
          </div>
          <div className="relative mx-auto w-full max-w-xl xl:mr-10">
            <div className="absolute -top-6 right-0 -z-10 size-64 rounded-full bg-secondary sm:size-80" aria-hidden="true" />
            {profile.portraitPath ? (
              <div className="relative ml-auto aspect-square w-[78%] overflow-hidden rounded-full border border-line">
                <Image src={profile.portraitPath} alt="" fill className="object-cover" sizes="480px" priority />
              </div>
            ) : preview ? (
              <ProjectBrowserMockup
                src={preview.desktopImage}
                alt={`${preview.name} homepage preview`}
                url={preview.liveUrl}
                priority
              />
            ) : null}
            {preview ? (
              <div className="relative z-10 mt-4 w-full max-w-xs rounded-2xl border border-line bg-surface p-4 shadow-[0_16px_40px_rgba(18,36,33,0.08)] sm:absolute sm:right-0 sm:bottom-6 sm:mt-0">
                <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Live preview</p>
                <p className="mt-2 font-display text-xl tracking-tight">{preview.name}</p>
                <p className="mt-1 text-xs text-muted">{preview.category}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
