"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project, StoryScene } from "@/lib/types";

const chapters = ["Idea", "Practice", "Work", "Next"];

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

  const scene = scenes[active] ?? scenes[0];
  const compact = active === 1;

  return (
    <div ref={track} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center pt-[4.5rem] pb-6">
        <article className={`grid min-h-0 w-full grid-cols-12 overflow-hidden rounded-[1.75rem] border border-line bg-surface ${compact ? "h-auto" : "h-full"}`}>
          <ol className={`col-span-1 flex flex-col border-r border-line py-8 ${compact ? "justify-center gap-6" : "justify-between"}`} aria-label="Story scenes">
            {scenes.map((item, index) => (
              <li key={item.id} className="flex flex-col items-center gap-3" aria-current={index === active ? "step" : undefined}>
                <span className={`font-mono text-xs ${index === active ? "text-lime" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`${compact ? "h-5" : "h-10"} w-px ${index === active ? "bg-lime" : "bg-line"}`} aria-hidden="true" />
              </li>
            ))}
          </ol>
          <div className="col-span-5 flex min-h-0 min-w-0 flex-col justify-center px-8 py-8 lg:px-10">
            <SceneCopy scene={scene} index={active} />
          </div>
          <div className="col-span-6 min-h-0 min-w-0 border-l border-line">
            <SceneVisual scene={scene} index={active} projects={projects} fill />
          </div>
        </article>
      </div>
    </div>
  );
}

function Scene({ scene, index, projects }: { scene: StoryScene; index: number; projects: Project[] }) {
  return (
    <div className="grid items-stretch gap-6 rounded-3xl border border-line bg-surface p-5 sm:p-8">
      <SceneCopy scene={scene} index={index} />
      <SceneVisual scene={scene} index={index} projects={projects} />
    </div>
  );
}

function SceneCopy({ scene, index }: { scene: StoryScene; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const chapter = chapters[index] ?? "Scene";

  return (
    <>
      <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">
        {number}
        <span className="mx-2 text-muted">/</span>
        {chapter}
      </p>
      <h3 className="mt-4 font-display text-[clamp(2rem,3.1vw,3.35rem)] leading-[0.98] tracking-[-0.045em]">{scene.onScreenText}</h3>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{scene.voiceOver}</p>
      {scene.ctaLabel ? (
        <a
          href="#contact"
          className="mt-6 inline-flex min-h-12 w-fit items-center rounded-full bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.14em] text-background uppercase hover:bg-lime-deep md:mt-8"
        >
          {scene.ctaLabel}
        </a>
      ) : null}
    </>
  );
}

function SceneVisual({
  scene,
  index,
  projects,
  fill = false,
}: {
  scene: StoryScene;
  index: number;
  projects: Project[];
  fill?: boolean;
}) {
  if (index === 0) return <IdeaFrame fill={fill} />;
  if (index === 1) return <PracticeFrame />;
  if (index === 2) return <WorkMosaic projects={projects} fill={fill} />;
  return <InvitationFrame scene={scene} projects={projects} fill={fill} />;
}

function WindowBar() {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="size-2 rounded-full bg-lime" />
        <i className="size-2 rounded-full bg-sun" />
        <i className="size-2 rounded-full bg-sky" />
      </span>
      <span className="font-mono text-[11px] text-muted">new page</span>
    </div>
  );
}

function IdeaFrame({ fill }: { fill: boolean }) {
  return (
    <div className={`flex items-center bg-secondary ${fill ? "h-full px-8 lg:px-12" : "min-h-80 p-6"}`}>
      <div className="w-full border border-line bg-surface shadow-[0_24px_50px_rgba(14,124,116,0.1)]">
        <WindowBar />
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Before the first line</p>
          <p className="mt-4 font-display text-3xl leading-none tracking-tight sm:text-4xl">A blank page, waiting.</p>
          <div className="mt-6 space-y-2" aria-hidden="true">
            <span className="block h-1.5 w-full bg-ink/10" />
            <span className="block h-1.5 w-4/5 bg-ink/10" />
            <span className="block h-1.5 w-3/5 bg-ink/10" />
          </div>
          <span className="mt-8 block h-9 w-32 bg-lime" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function PracticeFrame() {
  const steps = [
    { title: "Layout", note: "Give the page a structure." },
    { title: "Type", note: "Give the words a voice." },
    { title: "Colour", note: "Keep the palette deliberate." },
    { title: "Motion", note: "Move only what helps." },
  ];

  return (
    <div className="grid grid-cols-2">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={`flex flex-col justify-between p-5 sm:p-6 ${index % 2 === 0 ? "border-r border-line bg-background" : "bg-secondary"} ${index < 2 ? "border-b border-line" : ""}`}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] text-lime">{String(index + 1).padStart(2, "0")}</p>
          <p className="mt-4 font-display text-2xl tracking-tight">{step.title}</p>
          <p className="mt-2 max-w-[14rem] text-sm leading-snug text-muted">{step.note}</p>
        </div>
      ))}
    </div>
  );
}

function WorkMosaic({ projects, fill }: { projects: Project[]; fill: boolean }) {
  const shown = projects.slice(0, 5);

  if (!fill) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {shown.map((project, index) => (
          <ProjectStill key={project.slug} project={project} featured={index === 0} />
        ))}
      </div>
    );
  }

  return (
    <div className="work-stack flex h-full flex-col gap-2 bg-background p-3">
      <style>{`
        .work-strip { transition: flex-grow 450ms ease; }
        .work-strip img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .work-stack:hover > .work-strip { flex-grow: 0.55; }
        .work-stack:hover > .work-strip:hover { flex-grow: 7; }
        .work-stack:hover > .work-strip:hover img { object-fit: contain; object-position: top center; }
      `}</style>
      {shown.map((project) => (
        <ProjectStill key={project.slug} project={project} fill />
      ))}
    </div>
  );
}

function InvitationFrame({ scene, projects, fill }: { scene: StoryScene; projects: Project[]; fill: boolean }) {
  return (
    <div className={`flex flex-col justify-between bg-lime text-background ${fill ? "h-full px-8 py-8 lg:px-10" : "min-h-80 p-6"}`}>
      <p className="font-mono text-[11px] tracking-[0.18em] text-background/70 uppercase">What comes next</p>
      <p className="max-w-md font-display text-[clamp(2rem,3vw,3.4rem)] leading-[0.96] tracking-tight">
        {scene.closingHeadline || "I can build your next website."}
      </p>
      <ul className="border-t border-background/25">
        {projects.map((project, index) => (
          <li key={project.slug} className="flex items-baseline justify-between gap-4 border-b border-background/25 py-2.5">
            <span className="font-display text-lg tracking-tight">{project.name}</span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-background/70">{String(index + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectStill({ project, featured = false, fill = false }: { project: Project; featured?: boolean; fill?: boolean }) {
  return (
    <figure className={`work-strip relative overflow-hidden bg-ink ${fill ? "min-h-11 basis-0 flex-1" : featured ? "col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}>
      {project.desktopImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.desktopImage}
          alt=""
          className={fill ? "absolute inset-0 h-full w-full" : "h-full w-full object-cover object-top"}
        />
      ) : null}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-background uppercase">
        {project.name}
      </figcaption>
    </figure>
  );
}
