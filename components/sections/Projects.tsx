import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full overflow-hidden rounded-3xl bg-secondary">
      <div className={`relative overflow-hidden bg-ink ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        {project.desktopImage ? (
          <Image
            src={project.desktopImage}
            alt={`${project.name} homepage`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="font-display text-lg tracking-tight">{project.name}</p>
          <p className="text-xs text-muted">{project.category}</p>
        </div>
        <ArrowUpRight size={16} className="text-lime" />
      </div>
    </Link>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects[0];

  return (
    <section id="projects" className="scroll-mt-24 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading index="02 / Selected work" title="Practice websites, built to learn.">
            A collection of self-initiated projects I&apos;ve built while learning, experimenting, and developing my skills.
          </SectionHeading>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-12">
          <div className="grid gap-3 lg:col-span-7">{projects[0] ? <ProjectCard project={projects[0]} large /> : null}</div>
          <div className="grid gap-3 lg:col-span-5">
            {projects.slice(1, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {projects.slice(3).map((project) => (
            <div key={project.slug} className="lg:col-span-6">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {featured ? (
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">03 / A closer look</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.04em]">{featured.name}</h3>
              <p className="mt-3 text-muted">{featured.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {featured.highlights.slice(0, 4).map((item) => (
                  <li key={item} className="text-sm text-ink">
                    <span className="mr-2 text-lime">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.12em] text-background uppercase hover:bg-lime-deep">
                  View live project <ArrowUpRight size={15} />
                </a>
                <Link href={`/projects/${featured.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-[0.75rem] font-semibold tracking-[0.12em] uppercase hover:border-lime hover:text-lime">
                  Explore project
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProjectBrowserMockup src={featured.desktopImage} alt={`${featured.name} homepage`} url={featured.liveUrl} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
