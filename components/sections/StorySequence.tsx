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
      <div className="sticky top-0 flex h-svh items-center pt-20 pb-8">
        <Scene scene={scenes[active] ?? scenes[0]} index={active} projects={projects} />
      </div>
    </div>
  );
}

function Scene({ scene, index, projects }: { scene: StoryScene; index: number; projects: Project[] }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="grid w-full items-stretch gap-8 border border-line bg-surface p-5 sm:p-8 md:grid-cols-12 md:p-10">
      <div className="flex flex-col justify-center md:col-span-5">
        <p className="font-mono text-xs text-lime uppercase">
          <span className="tracking-[0.22em]">Scene</span>
          <span className="ml-2">{number}</span>
        </p>
        <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.96] tracking-[-0.045em]">
          {scene.onScreenText}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{scene.voiceOver}</p>
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Voice-over placeholder</p>
        {scene.closingHeadline ? (
          <p className="mt-6 font-display text-2xl tracking-tight text-lime md:text-3xl">{scene.closingHeadline}</p>
        ) : null}
        {scene.ctaLabel ? (
          <a
            href="#contact"
            className="mt-6 inline-flex min-h-12 w-fit items-center bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-lime-deep"
          >
            {scene.ctaLabel}
          </a>
        ) : null}
      </div>
      <div className="md:col-span-7">
        <SceneVisual index={index} projects={projects} />
      </div>
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="size-2.5 rounded-full bg-lime" />
        <i className="size-2.5 rounded-full bg-sun" />
        <i className="size-2.5 rounded-full bg-sky" />
      </span>
      <span className="font-mono text-[11px] text-muted">{label}</span>
    </div>
  );
}

function SceneVisual({ index, projects }: { index: number; projects: Project[] }) {
  if (index === 0) return <IdeaFrame />;
  if (index === 1) return <PracticeFrame />;
  if (index === 2) return <WorkMosaic projects={projects} />;
  return <InvitationFrame projects={projects} />;
}

function IdeaFrame() {
  return (
    <div className="flex h-full min-h-72 flex-col border border-line bg-background">
      <WindowBar label="idea.tsx" />
      <div className="flex flex-1 flex-col justify-between p-5 font-mono text-sm leading-8 sm:p-6">
        <p className="text-lime">// where it starts</p>
        <div className="my-6 space-y-1 text-muted">
          <p>
            <span className="text-ink">const</span> idea = curiosity
          </p>
          <p>
            <span className="text-ink">const</span> page = open(browser)
          </p>
          <p>write(page, idea)</p>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-hidden="true">
          <span className="h-2 bg-lime" />
          <span className="h-2 bg-indigo" />
          <span className="h-2 bg-sun" />
        </div>
      </div>
    </div>
  );
}

function PracticeFrame() {
  const tiles = [
    { label: "Layout", body: <LayoutMark /> },
    { label: "Type", body: <p className="font-display text-5xl leading-none tracking-tight">Aa</p> },
    { label: "Colour", body: <ColourMark /> },
    { label: "Motion", body: <MotionMark /> },
  ];

  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {tiles.map((tile) => (
        <div key={tile.label} className="flex min-h-36 flex-col justify-between border border-line bg-background p-4">
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">{tile.label}</p>
          <div className="mt-6">{tile.body}</div>
        </div>
      ))}
    </div>
  );
}

function LayoutMark() {
  return (
    <div className="space-y-2" aria-hidden="true">
      <span className="block h-2 w-full bg-ink/80" />
      <span className="block h-2 w-4/5 bg-indigo" />
      <span className="block h-2 w-2/3 bg-lime" />
    </div>
  );
}

function ColourMark() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      <span className="size-8 bg-lime" />
      <span className="size-8 bg-indigo" />
      <span className="size-8 bg-sun" />
    </div>
  );
}

function MotionMark() {
  return (
    <div className="flex items-end gap-1.5" aria-hidden="true">
      <span className="h-4 w-2 bg-sky" />
      <span className="h-8 w-2 bg-indigo" />
      <span className="h-6 w-2 bg-lime" />
      <span className="h-10 w-2 bg-sun" />
    </div>
  );
}

function WorkMosaic({ projects }: { projects: Project[] }) {
  const [lead, ...rest] = projects;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {lead ? <ProjectStill project={lead} featured /> : null}
      {rest.map((project) => (
        <ProjectStill key={project.slug} project={project} />
      ))}
    </div>
  );
}

function InvitationFrame({ projects }: { projects: Project[] }) {
  return (
    <div className="flex h-full min-h-72 flex-col justify-between border border-line bg-[linear-gradient(165deg,#e7f3f1_0%,#f4f6f5_48%,#eaf4f6_100%)] p-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">What comes next</p>
      <p className="max-w-sm font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">Your idea, on a website people can open.</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {projects.map((project) => (
          <li key={project.slug} className="border border-line bg-surface px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectStill({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <figure className={`overflow-hidden border border-line bg-background ${featured ? "col-span-2 sm:col-span-4" : ""}`}>
      {project.desktopImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.desktopImage}
          alt=""
          className={`w-full object-cover object-top ${featured ? "aspect-[16/7]" : "aspect-[4/3]"}`}
        />
      ) : null}
      <figcaption className="truncate px-2 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
        {project.name}
      </figcaption>
    </figure>
  );
}
