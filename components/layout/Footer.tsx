"use client";

import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { footerNavigation } from "@/data/navigation";
import type { Profile, Project } from "@/lib/types";
import { sectionHref } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

function useYear() {
  return useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );
}

export function Footer({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const pathname = usePathname();
  const year = useYear();
  const work = projects.slice(0, 5);

  return (
    <footer className="bg-ink-deep text-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-12">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] text-sun uppercase">Start a project</p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
            Have an idea worth a website?
          </h2>
        </div>
        <a
          href={sectionHref("contact", pathname)}
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep"
        >
          Let&apos;s work together
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-8 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl tracking-tight">{profile.name}</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-sun uppercase">{profile.title}</p>
            <p className="mt-3 max-w-sm leading-relaxed text-background/70">
              Designing and building digital experiences, one project at a time.
            </p>
            <SocialLinks profile={profile} tone="light" className="mt-4" />
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="font-display text-lg">Explore</p>
            <ul className="mt-3 space-y-2">
              {footerNavigation.map((item) => (
                <li key={item.id}>
                  <a href={sectionHref(item.id, pathname)} className="text-background/70 hover:text-background">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-display text-lg">Selected work</p>
            <ul className="mt-3 space-y-2">
              {work.map((project) => (
                <li key={project.slug}>
                  <a href={`/projects/${project.slug}`} className="text-background/70 hover:text-background">
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display text-lg">Contact</p>
            <ul className="mt-3 space-y-2 text-background/70">
              {profile.email ? (
                <li>
                  <a className="hover:text-background" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </li>
              ) : null}
              {profile.whatsapp ? <li>WhatsApp: {profile.whatsapp}</li> : null}
              {profile.location ? <li>{profile.location}</li> : null}
              <li>
                <a href={sectionHref("contact", pathname)} className="hover:text-background">
                  Send a project enquiry
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-6 text-sm text-background/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase">Built with curiosity and code.</p>
        </div>
      </div>
    </footer>
  );
}
