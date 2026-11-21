import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">02 / Selected work</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
            Selected work.
          </h2>
          <p className="max-w-sm text-muted">
            A collection of self-initiated projects I&apos;ve built while learning, experimenting, and developing my skills.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const span = index === 0 ? "md:col-span-4 md:row-span-2" : index < 3 ? "md:col-span-2" : "md:col-span-3";

  return (
    <article className={`overflow-hidden rounded-2xl border border-line bg-surface ${span}`}>
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className={`relative overflow-hidden bg-ink ${index === 0 ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          {project.desktopImage ? (
            <Image
              src={project.desktopImage}
              alt={`${project.name} homepage`}
              fill
              sizes={index === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
              className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex items-end justify-between gap-3 p-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-lime uppercase">{project.category}</p>
            <h3 className="mt-1 font-display text-xl tracking-tight">{project.name}</h3>
          </div>
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink group-hover:border-lime group-hover:text-lime">
            <ArrowUpRight size={16} />
            <span className="sr-only">Explore {project.name}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
