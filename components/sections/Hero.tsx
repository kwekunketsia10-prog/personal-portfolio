import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const preview = projects[0];

  return (
    <section id="home" className="scroll-mt-24 bg-background px-5 pt-24 pb-6 sm:px-8 lg:px-12">
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-lime uppercase">{profile.heroLabel}</p>
          {profile.availabilityLabel ? (
            <p className="mt-3 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {profile.availabilityLabel}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-ink">
            <AnimatedText text={profile.heroHeading} />
            <span className="block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{profile.heroBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.12em] text-background uppercase hover:bg-lime-deep">
              Explore my work
              <ArrowRight size={15} />
            </a>
            <a href="#journey" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 text-[0.75rem] font-semibold tracking-[0.12em] text-ink uppercase hover:border-lime hover:text-lime">
              About me
              <ArrowRight size={15} />
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            Web developer <span className="mx-2 text-lime">→</span> Practice websites
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-square max-w-[440px]">
            <div className="absolute inset-[10%] rounded-full bg-secondary" />
            {profile.portraitPath ? (
              <div className="absolute inset-[16%] overflow-hidden rounded-full border border-white shadow-xl">
                <Image src={profile.portraitPath} alt="" fill className="object-cover" sizes="360px" priority />
              </div>
            ) : preview ? (
              <div className="absolute inset-x-2 top-[22%] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_50px_rgba(14,124,116,0.16)]">
                <Image
                  src={preview.desktopImage}
                  alt={`${preview.name} homepage preview`}
                  width={960}
                  height={640}
                  priority
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            ) : null}
            {preview ? (
              <div className="absolute right-0 bottom-[6%] w-[13.5rem] rounded-2xl border border-line bg-surface p-4 shadow-[0_16px_40px_rgba(18,36,33,0.08)]">
                <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">Live preview</p>
                <p className="mt-1 font-display text-lg leading-tight tracking-tight">{preview.name}</p>
                <p className="mt-1 text-xs text-muted">Self-initiated</p>
              </div>
            ) : null}
          </div>
          <p className="absolute top-6 -right-1 hidden font-mono text-[10px] tracking-[0.22em] text-muted uppercase [writing-mode:vertical-rl] lg:block">
            {profile.title}
          </p>
        </div>
      </div>
    </section>
  );
}
