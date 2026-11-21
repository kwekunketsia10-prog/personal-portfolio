import { ArrowRight, AudioLines, Layers, PenLine, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import type { Profile, Project } from "@/lib/types";

const marks = ["C", "A", "G", "N"];

export function Hero({ profile }: { profile: Profile; projects: Project[] }) {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden bg-background">
      <div className="px-5 pt-24 pb-8 sm:px-8 lg:hidden">
        <HeroCopy profile={profile} />
        <div className="relative mx-auto mt-6 h-[430px] max-w-[420px]">
          <Image src="/images/hero/portrait-up.png" alt="" fill priority className="object-cover object-top" sizes="420px" />
          <OrbitPill
            className="top-[18%] left-0 w-[168px] -rotate-6"
            tone="bg-lime text-background"
            icon={<PenLine size={15} />}
            title="Design"
            body="Clear layouts"
          />
          <OrbitPill
            className="top-[34%] right-0 w-[168px] rotate-6"
            tone="bg-indigo text-background"
            icon={<Layers size={15} />}
            title="Build"
            body="Working websites"
          />
        </div>
      </div>

      <div className="relative mx-auto hidden h-[860px] w-full max-w-[1180px] lg:block">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1180 860" fill="none" aria-hidden="true">
          <path d="M210 250C300 340 390 430 500 530" stroke="rgba(18,36,33,0.16)" strokeWidth="1.25" />
          <path d="M970 290C860 390 780 470 690 560" stroke="rgba(18,36,33,0.16)" strokeWidth="1.25" />
        </svg>

        <div className="relative z-20 mx-auto max-w-[740px] px-6 pt-28 text-center">
          <HeroCopy profile={profile} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[560px]">
          <Image
            src="/images/hero/portrait-up.png"
            alt=""
            fill
            priority
            className="object-contain object-bottom"
            sizes="900px"
          />
        </div>

        <NoteCard className="top-[168px] left-[18px] -rotate-6" icon={<AudioLines size={16} />} title="From idea to interface." body="Designed, then built." />
        <NoteCard
          className="top-[250px] right-[18px] rotate-3"
          faces
          title="Fashion, beauty, hospitality."
          body="Practice sites across those fields."
        />

        <div className="absolute top-[78px] right-[86px] z-30">
          <OrbitBadge />
        </div>

        <div className="absolute top-[430px] left-[150px] z-20 h-[132px] w-[168px] -rotate-[16deg] overflow-hidden rounded-[1.15rem] shadow-[0_18px_40px_rgba(18,36,33,0.14)]">
          <Image src="/images/hero/ridge.jpg" alt="" fill className="object-cover" sizes="168px" />
        </div>
        <OrbitPill
          className="top-[390px] left-[300px] z-30 w-[214px] -rotate-[8deg]"
          tone="bg-lime text-background"
          icon={<PenLine size={15} />}
          title="Design"
          body="Clear layouts"
        />
        <OrbitPill
          className="top-[500px] left-[430px] z-30 w-[214px] rotate-[6deg]"
          tone="bg-indigo text-background"
          icon={<Layers size={15} />}
          title="Build"
          body="Working websites"
        />
        <OrbitPill
          className="top-[400px] right-[250px] z-30 w-[206px] rotate-[10deg]"
          tone="bg-sun text-ink"
          icon={<Sparkles size={15} />}
          title="Refine"
          body="Ready to launch"
        />
        <div className="absolute top-[500px] right-[150px] z-20 h-[118px] w-[168px] rotate-[14deg] overflow-hidden rounded-[1.15rem] shadow-[0_18px_40px_rgba(18,36,33,0.16)]">
          <Image src="/images/hero/moon.jpg" alt="" fill className="object-cover" sizes="168px" />
        </div>

        <div className="absolute bottom-16 left-8 z-30 max-w-[180px]">
          <p className="text-sm leading-snug text-muted">Five practice websites.</p>
          <div className="mt-3 flex">
            {marks.map((mark, index) => (
              <span
                key={mark}
                className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary font-mono text-[10px] text-ink"
                style={{ marginLeft: index === 0 ? 0 : -8 }}
              >
                {mark}
              </span>
            ))}
            <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-surface text-sm text-muted" style={{ marginLeft: -8 }}>
              +
            </span>
          </div>
        </div>

        <div className="absolute right-10 bottom-16 z-30 flex items-start gap-3 text-sm leading-snug text-muted">
          <Star size={14} className="mt-0.5 shrink-0 text-lime" />
          <p>
            Learn. Build.
            <br />
            Improve.
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ profile }: { profile: Profile }) {
  return (
    <>
      <h1 className="font-hero text-[clamp(3rem,5.6vw,5.35rem)] leading-[0.92] tracking-[-0.04em] text-ink">
        <span className="block">
          <AnimatedText text={profile.heroHeading} />
        </span>
        <span className="block italic">
          <AnimatedText text={profile.heroAccent} />
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-relaxed text-muted sm:text-base">{profile.heroBody}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-background hover:bg-lime-deep">
          Explore my work <ArrowRight size={15} />
        </a>
        <a href="#journey" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink hover:border-lime">
          <span className="grid size-5 place-items-center rounded-full border border-line">
            <ArrowRight size={11} />
          </span>
          About me
        </a>
      </div>
    </>
  );
}

function NoteCard({ className, icon, faces, title, body }: { className: string; icon?: ReactNode; faces?: boolean; title: string; body: string }) {
  return (
    <div className={`absolute z-30 w-[210px] rounded-[1.2rem] bg-surface px-4 py-4 text-left shadow-[0_16px_40px_rgba(18,36,33,0.08)] ${className}`}>
      {faces ? (
        <div className="mb-3 flex">
          {marks.slice(0, 3).map((mark, index) => (
            <span
              key={mark}
              className="grid size-7 place-items-center rounded-full border-2 border-surface bg-secondary font-mono text-[10px] text-ink"
              style={{ marginLeft: index === 0 ? 0 : -8 }}
            >
              {mark}
            </span>
          ))}
          <span className="grid size-7 place-items-center rounded-full border-2 border-surface bg-background text-xs text-muted" style={{ marginLeft: -8 }}>
            +
          </span>
        </div>
      ) : (
        <span className="mb-3 grid size-8 place-items-center rounded-lg bg-secondary text-lime">{icon}</span>
      )}
      <p className="font-display text-[15px] leading-snug font-semibold tracking-tight text-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted">{body}</p>
    </div>
  );
}

function OrbitPill({ className, tone, icon, title, body }: { className: string; tone: string; icon: ReactNode; title: string; body: string }) {
  return (
    <div className={`absolute flex items-center gap-3 rounded-2xl bg-surface px-3 py-2.5 shadow-[0_14px_34px_rgba(18,36,33,0.1)] ${className}`}>
      <span className={`grid size-8 shrink-0 place-items-center rounded-full ${tone}`}>{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">{body}</span>
      </span>
    </div>
  );
}

function OrbitBadge() {
  return (
    <div className="relative size-[108px]">
      <svg viewBox="0 0 100 100" className="size-full text-ink" aria-hidden="true">
        <defs>
          <path id="hero-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fill="currentColor" fontSize="7.4" letterSpacing="1.35">
          <textPath href="#hero-ring">IDEAS INTO EXPERIENCES · IDEAS INTO EXPERIENCES ·</textPath>
        </text>
      </svg>
      <Star size={15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-ink" />
    </div>
  );
}
