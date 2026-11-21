import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Project, StoryScene } from "@/lib/types";

export function Projects({ projects, scenes = [] }: { projects: Project[]; scenes?: StoryScene[] }) {
  const featured = projects[0];
  const side = projects.slice(1, 3);
  const rest = projects.slice(3);

  return (
    <>
    <section id="projects" className="scroll-mt-20 bg-secondary px-5 py-16 sm:px-8 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">02 / Selected work</p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.3rem)] leading-[0.98] tracking-[-0.04em]">
              Practice websites, built to learn.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">Self-initiated projects. Not paid commissions.</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {featured ? (
            <div className="lg:col-span-3">
              <ProjectTile project={featured} tall />
            </div>
          ) : null}
          <div className="grid gap-4 lg:col-span-2">
            {side.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        </div>
        {rest.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        ) : null}

      </div>
    </section>
    {featured ? (
      <section className="bg-surface px-5 py-16 sm:px-8 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">03 / A closer look</p>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.96] tracking-[-0.04em]">{featured.name}</h3>
              <p className="mt-3 max-w-md text-muted">{featured.summary}</p>
              <Link href={`/projects/${featured.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-lime uppercase">
                Explore the project <ArrowUpRight size={15} />
              </Link>
            </div>
            <ProjectBrowserMockup src={featured.desktopImage} alt={`${featured.name} homepage`} url={featured.liveUrl} />
        </div>
      </section>
    ) : null}

    {scenes.length ? (
      <section id="story" className="scroll-mt-20 bg-wash px-5 py-16 sm:px-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">The story so far</p>
          <p className="mt-2 max-w-xl text-sm text-muted">A written stand-in, not a recording.</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {scenes.map((scene, index) => (
              <li key={scene.id}>
                <p className="font-mono text-[11px] text-lime">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-lg leading-tight tracking-tight">{scene.onScreenText}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{scene.voiceOver}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ) : null}
    </>
  );
}

function ProjectTile({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-2xl bg-ink ${tall ? "aspect-[16/10]" : "aspect-[16/8]"}`}>
        {project.desktopImage ? (
          <Image
            src={project.desktopImage}
            alt={`${project.name} homepage`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg leading-tight tracking-tight">{project.name}</p>
          <p className="text-xs tracking-wide text-muted uppercase">{project.category}</p>
        </div>
        <ArrowUpRight size={16} className="mt-1 shrink-0 text-lime" />
      </div>
    </Link>
  );
}
