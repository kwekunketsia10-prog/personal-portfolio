"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project, StoryScene } from "@/lib/types";

export function StorySequence({ scenes, projects }: { scenes: StoryScene[]; projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce || !desktop) return;
    const node = track.current;
    if (!node) return;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(scenes.length - 1, Math.floor(progress * scenes.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [desktop, reduce, scenes.length]);

  if (reduce || !desktop) {
    return (
      <div className="space-y-6">
        {scenes.map((scene, index) => (
          <Scene key={scene.id} scene={scene} index={index} projects={projects} />
        ))}
      </div>
    );
  }

  return (
    <div ref={track} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-svh items-center">
        <Scene scene={scenes[active] ?? scenes[0]} index={active} projects={projects} />
      </div>
    </div>
  );
}

function Scene({ scene, index, projects }: { scene: StoryScene; index: number; projects: Project[] }) {
  return (
    <div className="grid w-full items-center gap-8 border border-line bg-[#10141a]/90 p-6 md:grid-cols-12 md:p-10">
      <div className="md:col-span-6">
        <p className="font-mono text-xs tracking-[0.2em] text-lime uppercase">Scene 0{index + 1}</p>
        <h3 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
          {scene.onScreenText}
        </h3>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{scene.voiceOver}</p>
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Voice-over placeholder</p>
        {scene.closingHeadline ? (
          <p className="mt-8 font-display text-3xl tracking-tight text-lime md:text-4xl">{scene.closingHeadline}</p>
        ) : null}
        {scene.ctaLabel ? (
          <a
            href="#contact"
            className="mt-6 inline-flex min-h-12 items-center bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-ink"
          >
            {scene.ctaLabel}
          </a>
        ) : null}
      </div>
      <div className="md:col-span-6">
        <SceneVisual index={index} projects={projects} />
      </div>
    </div>
  );
}

function SceneVisual({ index, projects }: { index: number; projects: Project[] }) {
  if (index === 0) {
    return (
      <div className="border border-line bg-background p-5 font-mono text-sm leading-8 text-muted">
        <p className="text-lime">editor.tsx</p>
        <p className="mt-4">
          <span className="text-ink">const</span> idea = curiosity
        </p>
        <p>
          <span className="text-ink">const</span> page = open(browser)
        </p>
        <p>write(page, idea)</p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {["Layout", "Type", "Colour", "Motion"].map((label) => (
          <div key={label} className="border border-line bg-background p-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">{label}</p>
            <div className="mt-4 h-16 border border-line bg-surface" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {projects.map((project) => (
        <figure key={project.slug} className="overflow-hidden border border-line bg-background">
          {project.desktopImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.desktopImage} alt="" className="aspect-[16/10] w-full object-cover object-top" />
          ) : null}
          <figcaption className="px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
            {project.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
