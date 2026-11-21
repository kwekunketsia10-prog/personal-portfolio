import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PROFILE_ID, seedContent } from "../data/seed";

function loadEnv(file: string) {
  const path = resolve(file);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Create a new Supabase project first, then add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.");
  process.exit(1);
}

const host = new URL(url).host;
console.log(`Seeding ${host}`);

const supabase = createClient(url, key, { auth: { persistSession: false } });
const { profile, projects, story, journey, capabilities, skills, process: steps, values } = seedContent;

const profileResult = await supabase.from("site_profile").upsert({
  id: PROFILE_ID,
  name: profile.name,
  title: profile.title,
  location: profile.location,
  email: profile.email,
  whatsapp: profile.whatsapp,
  linkedin_url: profile.linkedinUrl,
  github_url: profile.githubUrl,
  availability_label: profile.availabilityLabel,
  hero_label: profile.heroLabel,
  hero_heading: profile.heroHeading,
  hero_accent: profile.heroAccent,
  hero_body: profile.heroBody,
  hero_support: profile.heroSupport,
  portrait_path: profile.portraitPath,
  journey_video_path: profile.journeyVideoPath,
  journey_poster_path: profile.journeyPosterPath,
  journey_captions_path: profile.journeyCaptionsPath,
  journey_video_autoplay: profile.journeyVideoAutoplay,
  seo_title: profile.seoTitle,
  seo_description: profile.seoDescription,
});
if (profileResult.error) throw profileResult.error;

const projectResult = await supabase.from("projects").upsert(
  projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    category: project.category,
    summary: project.summary,
    objective: project.objective,
    design_direction: project.designDirection,
    highlights: project.highlights,
    features: project.features,
    role: project.role,
    learned: project.learned,
    live_url: project.liveUrl,
    technologies: project.technologies,
    host: project.host,
    layout: project.layout,
    desktop_image: project.desktopImage,
    mobile_image: project.mobileImage,
    sort_order: project.sortOrder,
    published: project.published,
  })),
  { onConflict: "slug" },
);
if (projectResult.error) throw projectResult.error;

const writes = [
  supabase.from("story_scenes").upsert(
    story.map((scene) => ({
      id: scene.id,
      sort_order: scene.sortOrder,
      on_screen_text: scene.onScreenText,
      voice_over: scene.voiceOver,
      closing_headline: scene.closingHeadline,
      cta_label: scene.ctaLabel,
    })),
  ),
  supabase.from("journey_stages").upsert(
    journey.map((stage) => ({
      id: stage.id,
      sort_order: stage.sortOrder,
      number: stage.number,
      title: stage.title,
      body: stage.body,
    })),
  ),
  supabase.from("capabilities").upsert(
    capabilities.map((item) => ({
      id: item.id,
      sort_order: item.sortOrder,
      number: item.number,
      title: item.title,
      body: item.body,
      icon: item.icon,
    })),
  ),
  supabase.from("skill_groups").upsert(
    skills.map((group) => ({ id: group.id, sort_order: group.sortOrder, title: group.title })),
  ),
  supabase.from("process_steps").upsert(
    steps.map((step) => ({
      id: step.id,
      sort_order: step.sortOrder,
      number: step.number,
      title: step.title,
      body: step.body,
    })),
  ),
  supabase.from("value_points").upsert(
    values.map((point) => ({
      id: point.id,
      sort_order: point.sortOrder,
      title: point.title,
      body: point.body,
    })),
  ),
];

for (const result of await Promise.all(writes)) {
  if (result.error) throw result.error;
}

for (const group of skills) {
  const removed = await supabase.from("skills").delete().eq("group_id", group.id);
  if (removed.error) throw removed.error;
  const inserted = await supabase.from("skills").insert(
    group.items.map((label, index) => ({
      id: `${group.id}-${index + 1}`,
      group_id: group.id,
      sort_order: index + 1,
      label,
    })),
  );
  if (inserted.error) throw inserted.error;
}

for (const project of projects) {
  const desktop = await uploadImage(project.desktopImage, `projects/${project.slug}-desktop.png`);
  const mobile = await uploadImage(project.mobileImage, `projects/${project.slug}-mobile.png`);
  if (desktop !== project.desktopImage || mobile !== project.mobileImage) {
    const updated = await supabase
      .from("projects")
      .update({ desktop_image: desktop, mobile_image: mobile })
      .eq("slug", project.slug);
    if (updated.error) throw updated.error;
  }
}

async function uploadImage(localPath: string, objectPath: string) {
  if (!localPath.startsWith("/")) return localPath;
  const file = resolve(`public${localPath}`);
  if (!existsSync(file)) return localPath;
  const bytes = readFileSync(file);
  const uploaded = await supabase.storage.from("portfolio-media").upload(objectPath, bytes, {
    upsert: true,
    contentType: "image/png",
  });
  if (uploaded.error) {
    console.warn(`Kept local image for ${objectPath}: ${uploaded.error.message}`);
    return localPath;
  }
  return supabase.storage.from("portfolio-media").getPublicUrl(objectPath).data.publicUrl;
}

if (process.env.ADMIN_EMAIL) {
  const allow = await supabase.from("admin_allowlist").upsert({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (allow.error) throw allow.error;
}

console.log("Seed complete.");
