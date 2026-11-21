"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { footerNavigation } from "@/data/navigation";
import type { Profile, Project } from "@/lib/types";
import { sectionHref } from "@/lib/utils";

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

  return (
    <footer className="border-t border-line/70 bg-secondary">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <a href={sectionHref("home", pathname)} className="font-display text-lg tracking-tight">
          {profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </a>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {footerNavigation.map((item) => (
            <a key={item.id} href={sectionHref(item.id, pathname)} className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase hover:text-lime">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-muted">© {year} {profile.name}</p>
      </div>
      {projects.length ? (
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap gap-x-4 gap-y-2 px-5 pb-6 text-sm text-muted sm:px-8 lg:px-12">
          {projects.slice(0, 5).map((project) => (
            <a key={project.slug} href={`/projects/${project.slug}`} className="hover:text-lime">
              {project.name}
            </a>
          ))}
        </div>
      ) : null}
    </footer>
  );
}
