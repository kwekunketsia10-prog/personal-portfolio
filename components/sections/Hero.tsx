import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import type { Profile, Project } from "@/lib/types";

export function Hero({ profile }: { profile: Profile; projects: Project[] }) {
  const tags = ["Web developer", "Practice websites", "Fashion and beauty"];

  return (
    <section id="home" className="scroll-mt-20 bg-secondary px-5 pt-24 pb-12 sm:px-8 lg:px-8 lg:pt-28 lg:pb-16">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">{profile.heroLabel}</p>
          <h1 className="font-hero mt-5 text-[clamp(2.7rem,4.15vw,4.15rem)] leading-[0.96] tracking-[-0.035em] text-ink">
            <span className="block">
              <AnimatedText text={profile.heroHeading} />
            </span>
            <span className="block text-lime">
              <AnimatedText text={profile.heroAccent} />
            </span>
          </h1>
          <p className="mt-6 max-w-[28rem] text-[15px] leading-relaxed text-muted sm:text-base">{profile.heroBody}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[0.72rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep">
              Explore my work <ArrowRight size={14} />
            </a>
            <a href="#journey" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.72rem] font-semibold tracking-[0.14em] text-ink uppercase hover:border-lime">
              About me <ArrowRight size={14} />
            </a>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <ArrowRight size={12} className="text-lime" aria-hidden="true" />
            {tags.map((tag, index) => (
              <span key={tag} className="inline-flex items-center gap-2.5">
                {index > 0 ? <span className="text-lime">→</span> : null}
                {tag}
              </span>
            ))}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-[500px]">
          <div className="relative aspect-[753/836]">
            <Image
              src="/images/hero/portrait.png"
              alt=""
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1024px) 500px, 90vw"
            />
            <svg className="pointer-events-none absolute top-[2%] right-0 h-[70%] w-[70%]" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M70 6 A 48 48 0 0 1 98 48" fill="none" stroke="#0E7C74" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
            </svg>
          </div>
          <div className="absolute right-0 bottom-[7%] w-[200px] rounded-[1.15rem] bg-surface px-5 py-4 shadow-[0_18px_44px_rgba(18,36,33,0.1)] sm:right-1 sm:w-[220px]">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Self-initiated</p>
            <p className="font-hero mt-2 text-[1.55rem] leading-[1.12] tracking-[-0.03em] text-ink">
              Learn. Build.
              <br />
              Improve. <ArrowRight className="inline -translate-y-px" size={16} aria-hidden="true" />
            </p>
          </div>
          <p className="absolute top-[18%] right-0 hidden font-mono text-[10px] tracking-[0.28em] text-muted uppercase [writing-mode:vertical-rl] lg:block">
            Ideas into digital experiences
          </p>
        </div>
      </div>
    </section>
  );
}
