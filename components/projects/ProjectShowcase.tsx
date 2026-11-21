import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MobilePreview, ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const reversed = project.layout === "split-reverse";
  const split = project.layout === "split" || reversed;

  return (
    <article className="group border-t border-line py-16 md:py-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.2em] text-lime uppercase">
          {number} — {project.category}
        </p>
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Self-initiated project</p>
      </div>

      {split ? (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(reversed && "lg:order-2")}>
            <ProjectBrowserMockup
              src={project.desktopImage}
              alt={`${project.name} homepage`}
              url={project.liveUrl}
            />
          </div>
          <ProjectCopy project={project} className={cn(reversed && "lg:order-1")} />
        </div>
      ) : (
        <div>
          <div className={cn("relative", project.layout === "mobile-float" && "mb-16 md:mb-8")}>
            <ProjectBrowserMockup
              src={project.desktopImage}
              alt={`${project.name} homepage`}
              url={project.liveUrl}
              priority={index === 0}
            />
            {project.layout === "mobile-float" ? (
              <div className="absolute -bottom-10 right-4 hidden md:block lg:right-10">
                <MobilePreview src={project.mobileImage} alt={`${project.name} on a phone`} />
              </div>
            ) : null}
          </div>
          <div className={cn("mt-8 grid gap-8 lg:grid-cols-12", project.layout === "mobile-float" && "md:mt-20")}>
            <h3 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.045em] lg:col-span-7">
              {project.name}
            </h3>
            <ProjectCopy project={project} className="lg:col-span-5" hideTitle />
          </div>
        </div>
      )}
    </article>
  );
}

function ProjectCopy({
  project,
  className,
  hideTitle = false,
}: {
  project: Project;
  className?: string;
  hideTitle?: boolean;
}) {
  return (
    <div className={className}>
      {hideTitle ? null : (
        <h3 className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-[0.95] tracking-[-0.045em]">
          {project.name}
        </h3>
      )}
      <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-6 space-y-2">
        {project.highlights.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-3 text-sm text-ink">
            <span className="mt-2 h-px w-4 shrink-0 bg-lime" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {project.technologies.join(" · ")}
        {project.host ? ` · Hosted on ${project.host}` : ""}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.16em] text-background uppercase hover:bg-ink"
        >
          View live project <ArrowUpRight size={16} />
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-line px-5 text-[0.75rem] font-semibold tracking-[0.16em] uppercase hover:border-lime hover:text-lime"
        >
          Explore project
        </Link>
      </div>
    </div>
  );
}
