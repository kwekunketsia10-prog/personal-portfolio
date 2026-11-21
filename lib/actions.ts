"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { PROFILE_ID } from "@/data/seed";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";

export type AuthState = { error?: string };

async function sessionClient() {
  await requireAdmin();
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not connected.");
  return supabase;
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function lines(formData: FormData, key: string) {
  return text(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function storeFile(file: FormDataEntryValue | null, path: string) {
  if (!(file instanceof File) || file.size === 0) return "";
  const service = createServiceClient();
  if (!service) return "";
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploaded = await service.storage.from("portfolio-media").upload(path, bytes, {
    upsert: true,
    contentType: file.type || "image/png",
  });
  if (uploaded.error) return "";
  const { data } = service.storage.from("portfolio-media").getPublicUrl(path);
  return data.publicUrl;
}

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Connect the new Supabase project in .env.local before signing in." };
  }
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  const { data } = await supabase.auth.getUser();
  if (data.user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    await supabase.auth.signOut();
    return { error: "This account is not allowed into the admin." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateProfile(formData: FormData) {
  const supabase = await sessionClient();
  const portrait = await storeFile(formData.get("portrait"), "profile/portrait");
  const video = await storeFile(formData.get("journeyVideo"), "profile/journey-video");
  const payload = {
    id: PROFILE_ID,
    name: text(formData, "name"),
    title: text(formData, "title"),
    location: text(formData, "location"),
    email: text(formData, "email"),
    whatsapp: text(formData, "whatsapp"),
    linkedin_url: text(formData, "linkedinUrl"),
    github_url: text(formData, "githubUrl"),
    availability_label: text(formData, "availabilityLabel"),
    hero_label: text(formData, "heroLabel"),
    hero_heading: text(formData, "heroHeading"),
    hero_accent: text(formData, "heroAccent"),
    hero_body: text(formData, "heroBody"),
    hero_support: text(formData, "heroSupport"),
    journey_video_autoplay: formData.get("journeyVideoAutoplay") === "on",
    seo_title: text(formData, "seoTitle"),
    seo_description: text(formData, "seoDescription"),
    updated_at: new Date().toISOString(),
  };
  const extra: Record<string, string> = {
    portrait_path: portrait || text(formData, "portraitPath"),
    journey_video_path: video || text(formData, "journeyVideoPath"),
    journey_poster_path: text(formData, "journeyPosterPath"),
    journey_captions_path: text(formData, "journeyCaptionsPath"),
  };
  const { error } = await supabase.from("site_profile").upsert({ ...payload, ...extra });
  if (error) redirect("/admin/profile?error=1");
  updateTag("site-content");
  redirect("/admin/profile?saved=1");
}

export async function saveProject(formData: FormData) {
  const supabase = await sessionClient();
  const slug = text(formData, "slug");
  const desktop = await storeFile(formData.get("desktopImage"), `projects/${slug}-desktop`);
  const mobile = await storeFile(formData.get("mobileImage"), `projects/${slug}-mobile`);
  const row = {
    slug,
    name: text(formData, "name"),
    category: text(formData, "category"),
    summary: text(formData, "summary"),
    objective: text(formData, "objective"),
    design_direction: text(formData, "designDirection"),
    highlights: lines(formData, "highlights"),
    features: lines(formData, "features"),
    role: text(formData, "role"),
    learned: text(formData, "learned"),
    live_url: text(formData, "liveUrl"),
    technologies: lines(formData, "technologies"),
    host: text(formData, "host"),
    layout: text(formData, "layout") || "full",
    sort_order: Number(text(formData, "sortOrder") || "0"),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
    ...(desktop ? { desktop_image: desktop } : {}),
    ...(mobile ? { mobile_image: mobile } : {}),
    ...(text(formData, "desktopImagePath") && !desktop ? { desktop_image: text(formData, "desktopImagePath") } : {}),
    ...(text(formData, "mobileImagePath") && !mobile ? { mobile_image: text(formData, "mobileImagePath") } : {}),
  };
  const { error } = await supabase.from("projects").upsert(row, { onConflict: "slug" });
  if (error) redirect(`/admin/projects/${slug}?error=1`);
  updateTag("site-content");
  redirect(`/admin/projects/${slug}?saved=1`);
}

export async function saveSections(formData: FormData) {
  const supabase = await sessionClient();
  const ids = (name: string) => formData.getAll(name).map((value) => String(value));

  const journeyIds = ids("journeyId");
  await supabase.from("journey_stages").upsert(
    journeyIds.map((id, index) => ({
      id,
      sort_order: index + 1,
      number: text(formData, `journey-${id}-number`),
      title: text(formData, `journey-${id}-title`),
      body: text(formData, `journey-${id}-body`),
    })),
  );

  const capabilityIds = ids("capabilityId");
  await supabase.from("capabilities").upsert(
    capabilityIds.map((id, index) => ({
      id,
      sort_order: index + 1,
      number: text(formData, `capability-${id}-number`),
      title: text(formData, `capability-${id}-title`),
      body: text(formData, `capability-${id}-body`),
      icon: text(formData, `capability-${id}-icon`),
    })),
  );

  const storyIds = ids("storyId");
  await supabase.from("story_scenes").upsert(
    storyIds.map((id, index) => ({
      id,
      sort_order: index + 1,
      on_screen_text: text(formData, `story-${id}-onScreenText`),
      voice_over: text(formData, `story-${id}-voiceOver`),
      closing_headline: text(formData, `story-${id}-closingHeadline`),
      cta_label: text(formData, `story-${id}-ctaLabel`),
    })),
  );

  const processIds = ids("processId");
  await supabase.from("process_steps").upsert(
    processIds.map((id, index) => ({
      id,
      sort_order: index + 1,
      number: text(formData, `process-${id}-number`),
      title: text(formData, `process-${id}-title`),
      body: text(formData, `process-${id}-body`),
    })),
  );

  const valueIds = ids("valueId");
  await supabase.from("value_points").upsert(
    valueIds.map((id, index) => ({
      id,
      sort_order: index + 1,
      title: text(formData, `value-${id}-title`),
      body: text(formData, `value-${id}-body`),
    })),
  );

  const skillIds = ids("skillId");
  for (const [groupIndex, id] of skillIds.entries()) {
    const title = text(formData, `skill-${id}-title`);
    const items = lines(formData, `skill-${id}-items`);
    await supabase.from("skill_groups").upsert({ id, sort_order: groupIndex + 1, title });
    await supabase.from("skills").delete().eq("group_id", id);
    if (items.length) {
      await supabase.from("skills").insert(
        items.map((label, index) => ({
          id: `${id}-${index + 1}`,
          group_id: id,
          sort_order: index + 1,
          label,
        })),
      );
    }
  }

  updateTag("site-content");
  redirect("/admin/sections?saved=1");
}

export async function markEnquiryRead(formData: FormData) {
  const supabase = await sessionClient();
  const id = text(formData, "id");
  await supabase.from("enquiries").update({ read_at: new Date().toISOString() }).eq("id", id);
  redirect("/admin");
}
