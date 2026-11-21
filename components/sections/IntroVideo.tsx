import { StorySequence } from "@/components/sections/StorySequence";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import type { Profile, Project, StoryScene } from "@/lib/types";

export function IntroVideo({
  profile,
  scenes,
  projects,
}: {
  profile: Profile;
  scenes: StoryScene[];
  projects: Project[];
}) {
  return (
    <section id="story" className="scroll-mt-24 py-10 md:py-6">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="font-mono text-xs tracking-[0.2em] text-lime uppercase">The story so far</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.045em]">
          From a first idea to websites people can open.
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          This sequence is a designed stand-in. It is not a recording. Add your own footage from the admin when it is ready.
        </p>
        <div className="mt-6">
          {profile.journeyVideoPath ? (
            <VideoPlayer
              src={profile.journeyVideoPath}
              poster={profile.journeyPosterPath}
              captions={profile.journeyCaptionsPath}
              autoPlay={profile.journeyVideoAutoplay}
            />
          ) : (
            <StorySequence scenes={scenes} projects={projects} />
          )}
        </div>
      </div>
    </section>
  );
}
