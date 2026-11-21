import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { getSiteContent } from "@/lib/content";

export async function generateStaticParams() {
  const { projects } = await getSiteContent();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { projects, profile } = await getSiteContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: `${project.summary} A self-initiated project by ${profile.name}.`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getSiteContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main>
      <ProjectDetails project={project} />
    </main>
  );
}
