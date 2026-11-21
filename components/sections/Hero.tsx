import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const preview = projects[0];
  const tags = ["Web developer", "Practice websites", "Fashion and beauty"];

  return (
    <section id="home" className="scroll-mt-20 px-5 pt-24 pb-8 sm:px-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-lime uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-3 inline-flex rounded-full bg-surface px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(3.1rem,5.8vw,5.4rem)] leading-[0.9] tracking-[-0.045em] text-ink">
            <AnimatedText text={profile.heroHeading} />
            <span className="block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{profile.heroBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 text-[0.72rem] font-semibold tracking-[0.12em] text-background uppercase hover:bg-lime-deep">
              Explore my work <ArrowRight size={14} />
            </a>
            <a href="#journey" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-5 text-[0.72rem] font-semibold tracking-[0.12em] text-ink uppercase hover:text-lime">
              About me <ArrowRight size={14} />
            </a>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            {tags.map((tag, index) => (
              <span key={tag} className="inline-flex items-center gap-3">
                {index > 0 ? <span className="text-lime">→</span> : null}
                {tag}
              </span>
            ))}
          </p>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[460px]">
          <div className="absolute top-2 right-6 size-[320px] rounded-full bg-sky/80" />
          {profile.portraitPath ? (
            <div className="absolute top-8 left-6 h-[380px] w-[280px] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(14,124,116,0.18)]">
              <Image src={profile.portraitPath} alt="" fill priority className="object-cover" sizes="280px" />
            </div>
          ) : preview ? (
            <div className="absolute top-10 left-2 h-[360px] w-[300px] overflow-hidden rounded-[1.75rem] border border-white shadow-[0_24px_60px_rgba(14,124,116,0.18)]">
              <Image
                src={preview.desktopImage}
                alt={`${preview.name} homepage preview`}
                fill
                priority
                className="object-cover object-top"
                sizes="300px"
              />
            </div>
          ) : null}
          {preview ? (
            <div className="absolute right-0 bottom-6 w-52 rounded-2xl bg-surface p-4 shadow-[0_16px_40px_rgba(18,36,33,0.1)]">
              <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Live preview</p>
              <p className="mt-1 font-display text-xl leading-tight tracking-tight">{preview.name}</p>
              <p className="mt-1 text-sm text-muted">Self-initiated</p>
            </div>
          ) : null}
          <p className="absolute top-8 -right-2 hidden font-mono text-[10px] tracking-[0.22em] text-muted uppercase [writing-mode:vertical-rl] lg:block">
            {profile.title}
          </p>
        </div>
      </div>
    </section>
  );
}
