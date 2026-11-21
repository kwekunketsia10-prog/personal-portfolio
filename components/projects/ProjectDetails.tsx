import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MobilePreview, ProjectBrowserMockup } from "@/components/projects/ProjectBrowserMockup";
import type { Project } from "@/lib/types";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <article className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-12 sm:px-8 lg:px-12">
      <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase hover:text-lime">
        <ArrowLeft size={14} /> Selected work
      </Link>
      <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-lime uppercase">
        {project.category} · Self-initiated project
      </p>
      <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[0.94] tracking-[-0.05em]">
        {project.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-5">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.12em] text-background uppercase hover:bg-lime-deep"
        >
          View live website <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="mt-8 rounded-[1.75rem] bg-secondary p-3 sm:p-4">
        <ProjectBrowserMockup src={project.desktopImage} alt={`${project.name} homepage`} url={project.liveUrl} priority />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <Detail label="Project objective" text={project.objective} />
          <Detail label="Design direction" text={project.designDirection} />
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Main features</h2>
            <ul className="mt-3 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="text-sm leading-relaxed text-ink">
                  <span className="mr-2 text-lime">→</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-secondary p-5 lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Personal study and practice</p>
          <dl className="mt-4 space-y-4">
            <Meta term="My role" value={project.role} />
            <Meta term="What I learned" value={project.learned} />
            <Meta
              term="Technology"
              value={[...project.technologies, project.host ? `Hosted on ${project.host}` : ""].filter(Boolean).join(" · ")}
            />
          </dl>
          {project.mobileImage ? (
            <div className="mt-6">
              <MobilePreview src={project.mobileImage} alt={`${project.name} mobile homepage`} />
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">{label}</h2>
      <p className="mt-2 leading-relaxed text-ink">{text}</p>
    </div>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{term}</dt>
      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}
