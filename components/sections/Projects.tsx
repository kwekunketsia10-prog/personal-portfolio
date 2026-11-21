import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-24 py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="Selected work.">
          A collection of self-initiated projects I&apos;ve built while learning, experimenting, and developing my skills.
        </SectionHeading>
        <div className="mt-8">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
