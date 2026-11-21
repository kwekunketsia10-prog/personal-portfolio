import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { getSiteContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main>
      <Hero profile={content.profile} projects={content.projects} />
      <Capabilities items={content.capabilities} />
      <Projects projects={content.projects} scenes={content.story} />
      <Skills groups={content.skills} />
      <Process steps={content.process} stages={content.journey} />
      <WhyWorkWithMe points={content.values} />
      <Contact profile={content.profile} />
    </main>
  );
}
