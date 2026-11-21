import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const preview = projects[0];
  const also = projects[1];

  return (
    <section id="home" className="relative overflow-hidden bg-background px-3 pt-[4.75rem] pb-6 sm:px-5 sm:pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_at_top,rgba(142,212,204,0.55),transparent_62%)]" />
      <div className="relative mx-auto w-full max-w-[1240px] rounded-[2rem] border border-white bg-surface px-5 pt-10 pb-6 shadow-[0_30px_90px_rgba(14,124,116,0.16)] sm:px-10 sm:pt-14 sm:pb-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs tracking-[0.22em] text-lime uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-3 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          {profile.portraitPath ? (
            <div className="relative mx-auto mt-5 size-16 overflow-hidden rounded-full border border-line">
              <Image src={profile.portraitPath} alt="" fill className="object-cover" sizes="64px" />
            </div>
          ) : null}
          <h1 className="mt-4 font-display text-[clamp(2.7rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.055em] text-ink">
            <AnimatedText text={profile.heroHeading} />
            <span className="mt-1 block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">{profile.heroBody}</p>
          <p className="mx-auto mt-2 max-w-xl leading-relaxed text-muted">{profile.heroSupport}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
              Explore my work
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase hover:border-lime hover:text-lime">
              Let&apos;s talk
            </a>
          </div>
        </div>

        {preview ? (
          <div className="relative mx-auto mt-10 max-w-5xl">
            <svg className="pointer-events-none absolute inset-x-8 top-6 hidden h-40 text-lime/30 lg:block" viewBox="0 0 800 160" fill="none" aria-hidden="true">
              <path d="M40 150C160 20 280 10 400 78C520 146 640 150 760 30" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <div className="pointer-events-none absolute top-0 right-0 hidden size-28 lg:block" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="size-full text-ink/55">
                <defs>
                  <path id="hero-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text fill="currentColor" fontSize="11" letterSpacing="2.4">
                  <textPath href="#hero-ring">WEB DEVELOPER · PRACTICE · </textPath>
                </text>
              </svg>
              <Sparkles size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lime" />
            </div>

            <div className="float-slow relative z-10 mx-auto max-w-[680px]">
              <ProjectBrowserMockup
                src={preview.desktopImage}
                alt={`${preview.name} homepage preview`}
                url={preview.liveUrl}
                priority
              />
            </div>

            <PreviewNote
              className="float-slower absolute top-8 left-0 z-20 hidden w-52 lg:block"
              kicker="Live preview"
              title={preview.name}
              detail={preview.category}
            />
            {also ? (
              <PreviewNote
                className="float-slower absolute top-36 right-0 z-20 hidden w-52 lg:block"
                kicker="Also in the work"
                title={also.name}
                detail={also.category}
              />
            ) : null}

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:hidden">
              <PreviewNote kicker="Live preview" title={preview.name} detail={preview.category} />
              {also ? <PreviewNote kicker="Also in the work" title={also.name} detail={also.category} /> : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
              <p>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Self-initiated</span>
                Practice websites, not client work.
              </p>
              <p className="font-display text-lg tracking-tight text-ink">From an idea to a website.</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PreviewNote({
  kicker,
  title,
  detail,
  className = "",
}: {
  kicker: string;
  title: string;
  detail: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-4 text-left shadow-[0_16px_40px_rgba(18,36,33,0.08)] ${className}`}>
      <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">{kicker}</p>
      <p className="mt-2 font-display text-lg leading-tight tracking-tight text-ink">{title}</p>
      <p className="mt-1 text-xs leading-snug text-muted">{detail}</p>
    </div>
  );
}
