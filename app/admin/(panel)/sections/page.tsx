import type { ReactNode } from "react";
import { saveSections } from "@/lib/actions";
import { getSiteContent } from "@/lib/content";

export default async function SectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const params = await searchParams;
  const content = await getSiteContent();

  return (
    <section>
      <h1 className="font-display text-5xl tracking-tight">Sections</h1>
      <p className="mt-3 text-muted">Journey, story, capabilities, skills, process, and the reasons to work together.</p>
      {params.saved ? <p className="mt-4 text-lime">Saved.</p> : null}
      <form action={saveSections} className="mt-10 space-y-12">
        <Group title="Story">
          {content.story.map((scene) => (
            <fieldset key={scene.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="storyId" value={scene.id} />
              <Area name={`story-${scene.id}-onScreenText`} label="On-screen text" value={scene.onScreenText} />
              <Area name={`story-${scene.id}-voiceOver`} label="Voice-over" value={scene.voiceOver} />
              <Area name={`story-${scene.id}-closingHeadline`} label="Closing headline" value={scene.closingHeadline} />
              <Area name={`story-${scene.id}-ctaLabel`} label="Button label" value={scene.ctaLabel} />
            </fieldset>
          ))}
        </Group>
        <Group title="Journey">
          {content.journey.map((stage) => (
            <fieldset key={stage.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="journeyId" value={stage.id} />
              <Area name={`journey-${stage.id}-number`} label="Number" value={stage.number} />
              <Area name={`journey-${stage.id}-title`} label="Title" value={stage.title} />
              <Area name={`journey-${stage.id}-body`} label="Body" value={stage.body} />
            </fieldset>
          ))}
        </Group>
        <Group title="Capabilities">
          {content.capabilities.map((item) => (
            <fieldset key={item.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="capabilityId" value={item.id} />
              <input type="hidden" name={`capability-${item.id}-icon`} value={item.icon} />
              <Area name={`capability-${item.id}-number`} label="Number" value={item.number} />
              <Area name={`capability-${item.id}-title`} label="Title" value={item.title} />
              <Area name={`capability-${item.id}-body`} label="Body" value={item.body} />
            </fieldset>
          ))}
        </Group>
        <Group title="Skills">
          {content.skills.map((group) => (
            <fieldset key={group.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="skillId" value={group.id} />
              <Area name={`skill-${group.id}-title`} label="Group" value={group.title} />
              <Area name={`skill-${group.id}-items`} label="Items, one per line" value={group.items.join("\n")} />
            </fieldset>
          ))}
        </Group>
        <Group title="Process">
          {content.process.map((step) => (
            <fieldset key={step.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="processId" value={step.id} />
              <Area name={`process-${step.id}-number`} label="Number" value={step.number} />
              <Area name={`process-${step.id}-title`} label="Title" value={step.title} />
              <Area name={`process-${step.id}-body`} label="Body" value={step.body} />
            </fieldset>
          ))}
        </Group>
        <Group title="Why work with me">
          {content.values.map((point) => (
            <fieldset key={point.id} className="grid gap-3 border border-line p-4">
              <input type="hidden" name="valueId" value={point.id} />
              <Area name={`value-${point.id}-title`} label="Title" value={point.title} />
              <Area name={`value-${point.id}-body`} label="Body" value={point.body} />
            </fieldset>
          ))}
        </Group>
        <button className="inline-flex min-h-12 items-center bg-lime px-5 text-sm font-semibold tracking-[0.14em] text-ink uppercase">
          Save sections
        </button>
      </form>
    </section>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-3xl tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

function Area({ name, label, value }: { name: string; label: string; value: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <textarea name={name} defaultValue={value} rows={3} className="mt-2 w-full border-b border-line bg-transparent py-2 outline-none" />
    </label>
  );
}
