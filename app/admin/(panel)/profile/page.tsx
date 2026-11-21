import { updateProfile } from "@/lib/actions";
import { getSiteContent } from "@/lib/content";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { profile } = await getSiteContent();

  return (
    <section>
      <h1 className="font-display text-5xl tracking-tight">Profile</h1>
      <p className="mt-3 max-w-2xl text-muted">These fields appear across the public site. Leave availability blank unless you want that label shown.</p>
      {params.saved ? <p className="mt-4 text-lime">Saved.</p> : null}
      {params.error ? <p className="mt-4 text-lime">The profile could not be saved.</p> : null}
      <form action={updateProfile} className="mt-8 grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" defaultValue={profile.name} />
        <Input label="Title" name="title" defaultValue={profile.title} />
        <Input label="Location" name="location" defaultValue={profile.location} />
        <Input label="Email" name="email" defaultValue={profile.email} />
        <Input label="WhatsApp" name="whatsapp" defaultValue={profile.whatsapp} />
        <Input label="LinkedIn URL" name="linkedinUrl" defaultValue={profile.linkedinUrl} />
        <Input label="GitHub URL" name="githubUrl" defaultValue={profile.githubUrl} />
        <Input label="Availability label" name="availabilityLabel" defaultValue={profile.availabilityLabel} />
        <Input label="Hero label" name="heroLabel" defaultValue={profile.heroLabel} />
        <Input label="Hero heading" name="heroHeading" defaultValue={profile.heroHeading} />
        <Input label="Hero accent" name="heroAccent" defaultValue={profile.heroAccent} />
        <Area label="Hero introduction" name="heroBody" defaultValue={profile.heroBody} />
        <Area label="Hero supporting line" name="heroSupport" defaultValue={profile.heroSupport} />
        <Input label="SEO title" name="seoTitle" defaultValue={profile.seoTitle} />
        <Area label="SEO description" name="seoDescription" defaultValue={profile.seoDescription} />
        <Input label="Portrait path" name="portraitPath" defaultValue={profile.portraitPath} />
        <Input label="Journey video path" name="journeyVideoPath" defaultValue={profile.journeyVideoPath} />
        <Input label="Video poster path" name="journeyPosterPath" defaultValue={profile.journeyPosterPath} />
        <Input label="Captions path" name="journeyCaptionsPath" defaultValue={profile.journeyCaptionsPath} />
        <label className="block text-sm">
          Replace portrait
          <input name="portrait" type="file" accept="image/*" className="mt-2 block w-full" />
        </label>
        <label className="block text-sm">
          Replace journey video
          <input name="journeyVideo" type="file" accept="video/*" className="mt-2 block w-full" />
        </label>
        <label className="flex items-center gap-3 sm:col-span-2">
          <input name="journeyVideoAutoplay" type="checkbox" defaultChecked={profile.journeyVideoAutoplay} />
          Allow muted autoplay for the journey video
        </label>
        <button className="inline-flex min-h-12 w-fit items-center bg-lime px-5 text-sm font-semibold tracking-[0.14em] text-background uppercase">
          Save profile
        </button>
      </form>
    </section>
  );
}

function Input({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</span>
      <input name={name} defaultValue={defaultValue} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
    </label>
  );
}

function Area({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <label className="block sm:col-span-2">
      <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={4} className="mt-2 w-full border-b border-line bg-transparent py-3 outline-none" />
    </label>
  );
}
