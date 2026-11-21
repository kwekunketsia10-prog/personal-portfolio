import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export default async function ProjectsAdminPage() {
  const { projects } = await getSiteContent();
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-5xl tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className="bg-lime px-4 py-3 text-sm font-semibold tracking-[0.12em] text-background uppercase">
          New project
        </Link>
      </div>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug} className="flex items-center justify-between gap-4 py-5">
            <div>
              <p className="text-2xl">{project.name}</p>
              <p className="text-sm text-muted">{project.category}</p>
            </div>
            <Link href={`/admin/projects/${project.slug}`} className="text-lime">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
