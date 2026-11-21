import { saveProject } from "@/lib/actions";
import { getSiteContent } from "@/lib/content";
import type { Project } from "@/lib/types";

const empty: Project = {
  slug: "",
  name: "",
  category: "",
  summary: "",
  objective: "",
  designDirection: "",
  highlights: [],
  features: [],
  role: "Designed and built as a self-initiated project while learning and practising web development.",
  learned: "",
  liveUrl: "",
  technologies: ["Next.js"],
  host: "Vercel",
  layout: "full",
  desktopImage: "",
  mobileImage: "",
  sortOrder: 6,
  published: true,
};

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const { projects } = await getSiteContent();
  const project = slug === "new" ? empty : projects.find((item) => item.slug === slug);
  if (!project) {
    return <p>That project is not in the current content.</p>;
  }

  return (
    <section>
      <h1 className="font-display text-5xl tracking-tight">{slug === "new" ? "New project" : project.name}</h1>
      {query.saved ? <p className="mt-4 text-lime">Saved.</p> : null}
      {query.error ? <p className="mt-4 text-lime">The project could not be saved.</p> : null}
      <form action={saveProject} className="mt-8 grid gap-5">
        <label className="block">
          Slug
          <input name="slug" defaultValue={project.slug} required className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <label className="block">
          Name
          <input name="name" defaultValue={project.name} required className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <label className="block">
          Category
          <input name="category" defaultValue={project.category} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <Area name="summary" label="Summary" value={project.summary} />
        <Area name="objective" label="Objective" value={project.objective} />
        <Area name="designDirection" label="Design direction" value={project.designDirection} />
        <Area name="highlights" label="Highlights, one per line" value={project.highlights.join("\n")} />
        <Area name="features" label="Features, one per line" value={project.features.join("\n")} />
        <Area name="role" label="Role" value={project.role} />
        <Area name="learned" label="What I learned" value={project.learned} />
        <label className="block">
          Live URL
          <input name="liveUrl" defaultValue={project.liveUrl} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <Area name="technologies" label="Technologies, one per line" value={project.technologies.join("\n")} />
        <label className="block">
          Host
          <input name="host" defaultValue={project.host} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <label className="block">
          Layout
          <select name="layout" defaultValue={project.layout} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none">
            <option value="full">Full width</option>
            <option value="split">Split</option>
            <option value="split-reverse">Split, reversed</option>
            <option value="mobile-float">Mobile float</option>
          </select>
        </label>
        <label className="block">
          Sort order
          <input name="sortOrder" type="number" defaultValue={project.sortOrder} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
        </label>
        <label className="flex items-center gap-3">
          <input name="published" type="checkbox" defaultChecked={project.published} />
          Published
        </label>
        <input type="hidden" name="desktopImagePath" value={project.desktopImage} />
        <input type="hidden" name="mobileImagePath" value={project.mobileImage} />
        <label className="block">
          Desktop screenshot
          <input name="desktopImage" type="file" accept="image/*" className="mt-2 block" />
        </label>
        <label className="block">
          Mobile screenshot
          <input name="mobileImage" type="file" accept="image/*" className="mt-2 block" />
        </label>
        <button className="inline-flex min-h-12 w-fit items-center bg-lime px-5 text-sm font-semibold tracking-[0.14em] text-background uppercase">
          Save project
        </button>
      </form>
    </section>
  );
}

function Area({ name, label, value }: { name: string; label: string; value: string }) {
  return (
    <label className="block">
      {label}
      <textarea name={name} defaultValue={value} rows={4} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
    </label>
  );
}
