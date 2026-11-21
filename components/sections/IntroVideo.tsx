import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import type { Profile, Project, StoryScene } from "@/lib/types";

export function IntroVideo({
  profile,
  scenes,
}: {
  profile: Profile;
  scenes: StoryScene[];
  projects: Project[];
}) {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 rounded-[1.75rem] bg-secondary px-5 py-8 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <SectionHeading index="04 / The story so far" title="From a first idea to websites people can open.">
            This sequence is a designed stand-in. It is not a recording. Add your own footage from the admin when it is ready.
          </SectionHeading>
          {scenes.find((scene) => scene.ctaLabel) ? (
            <a href="#contact" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-lime px-5 text-[0.75rem] font-semibold tracking-[0.12em] text-background uppercase hover:bg-lime-deep">
              {scenes.find((scene) => scene.ctaLabel)?.ctaLabel}
            </a>
          ) : null}
        </div>
        <ol className="grid gap-3 lg:col-span-7">
          {scenes.map((scene, index) => (
            <li key={scene.id} className="rounded-2xl bg-surface p-4">
              <p className="font-mono text-[11px] text-lime">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-xl tracking-tight">{scene.onScreenText}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{scene.voiceOver}</p>
            </li>
          ))}
        </ol>
        {profile.journeyVideoPath ? (
          <div className="lg:col-span-12">
            <VideoPlayer
              src={profile.journeyVideoPath}
              poster={profile.journeyPosterPath}
              captions={profile.journeyCaptionsPath}
              autoPlay={profile.journeyVideoAutoplay}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
