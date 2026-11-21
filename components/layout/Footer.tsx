"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { footerNavigation } from "@/data/navigation";
import type { Profile } from "@/lib/types";
import { sectionHref } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

function useYear() {
  return useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );
}

export function Footer({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const year = useYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-6">
          <p className="font-display text-3xl tracking-tight">{profile.name}</p>
          <p className="mt-2 font-mono text-xs tracking-[0.18em] text-muted uppercase">{profile.title}</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Designing and building digital experiences, one project at a time.
          </p>
        </div>
        <nav className="lg:col-span-3" aria-label="Footer">
          <ul className="space-y-3">
            {footerNavigation.map((item) => (
              <li key={item.id}>
                <a href={sectionHref(item.id, pathname)} className="text-ink hover:text-lime">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <SocialLinks profile={profile} className="flex-col" />
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase">Built with curiosity and code.</p>
        </div>
      </div>
    </footer>
  );
}
