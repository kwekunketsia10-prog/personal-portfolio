"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { navigation } from "@/data/navigation";
import type { Profile } from "@/lib/types";
import { sectionHref } from "@/lib/utils";

function useScrolled() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => window.scrollY > 12,
    () => false,
  );
}

export function Navbar({ profile }: { profile: Profile }) {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuId = useId();

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      const marker = window.scrollY + 140;
      let current: string = navigation[0].id;
      for (const item of navigation) {
        const node = document.getElementById(item.id);
        if (node && node.offsetTop <= marker) current = item.id;
      }
      setActive((previous) => (previous === current ? previous : current));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const menu = document.getElementById(menuId);
    const focusable = menu?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const items = Array.from(focusable);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, menuId]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-line bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href={sectionHref("home", pathname)} className="min-w-0 shrink">
          <span className="font-display text-base tracking-tight text-ink sm:text-lg">{profile.name}</span>
          <span className="text-muted"> / </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px]">
            Web Developer
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={sectionHref(item.id, pathname)}
              aria-current={pathname === "/" && active === item.id ? "true" : undefined}
              className={`font-mono text-[11px] tracking-[0.16em] uppercase transition hover:text-lime ${
                pathname === "/" && active === item.id ? "text-lime" : "text-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={sectionHref("contact", pathname)}
            className="hidden min-h-11 items-center bg-lime px-4 text-[0.72rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-lime-deep sm:inline-flex"
          >
            Let&apos;s work together
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id={menuId} className="border-t border-line bg-background lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <nav className="mx-auto flex w-full max-w-[1440px] flex-col px-5 py-4 sm:px-8" aria-label="Mobile">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={sectionHref(item.id, pathname)}
                onClick={close}
                className="border-b border-line py-4 font-display text-3xl tracking-tight text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={sectionHref("contact", pathname)}
              onClick={close}
              className="mt-5 inline-flex min-h-12 items-center justify-center bg-lime text-sm font-semibold tracking-[0.16em] text-background uppercase"
            >
              Let&apos;s work together
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
