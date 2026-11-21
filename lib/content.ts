import { cacheLife, cacheTag } from "next/cache";
import { seedContent } from "@/data/seed";
import { createAnonClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import type {
  Capability,
  JourneyStage,
  ProcessStep,
  Profile,
  Project,
  SiteContent,
  SkillGroup,
  StoryScene,
  ValuePoint,
} from "@/lib/types";

type Row = Record<string, unknown>;

function text(row: Row, key: string) {
  const value = row[key];
  return typeof value === "string" ? value : "";
}

function list(row: Row, key: string) {
  const value = row[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapProfile(row: Row): Profile {
  return {
    name: text(row, "name") || seedContent.profile.name,
    title: text(row, "title"),
    location: text(row, "location"),
    email: text(row, "email"),
    whatsapp: text(row, "whatsapp"),
    linkedinUrl: text(row, "linkedin_url"),
    githubUrl: text(row, "github_url"),
    availabilityLabel: text(row, "availability_label"),
    heroLabel: text(row, "hero_label"),
    heroHeading: text(row, "hero_heading"),
    heroAccent: text(row, "hero_accent"),
    heroBody: text(row, "hero_body"),
    heroSupport: text(row, "hero_support"),
    portraitPath: text(row, "portrait_path"),
    journeyVideoPath: text(row, "journey_video_path"),
    journeyPosterPath: text(row, "journey_poster_path"),
    journeyCaptionsPath: text(row, "journey_captions_path"),
    journeyVideoAutoplay: row.journey_video_autoplay === true,
    seoTitle: text(row, "seo_title") || seedContent.profile.seoTitle,
    seoDescription: text(row, "seo_description") || seedContent.profile.seoDescription,
  };
}

function mapProject(row: Row): Project {
  const layout = text(row, "layout");
  return {
    slug: text(row, "slug"),
    name: text(row, "name"),
    category: text(row, "category"),
    summary: text(row, "summary"),
    objective: text(row, "objective"),
    designDirection: text(row, "design_direction"),
    highlights: list(row, "highlights"),
    features: list(row, "features"),
    role: text(row, "role"),
    learned: text(row, "learned"),
    liveUrl: text(row, "live_url"),
    technologies: list(row, "technologies"),
    host: text(row, "host"),
    layout:
      layout === "split" || layout === "split-reverse" || layout === "mobile-float" || layout === "full"
        ? layout
        : "full",
    desktopImage: text(row, "desktop_image"),
    mobileImage: text(row, "mobile_image"),
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
    published: row.published !== false,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-content");

  if (!isSupabaseConfigured()) return seedContent;

  try {
    const supabase = createAnonClient();
    if (!supabase) return seedContent;

    const [profileResult, projectResult, storyResult, journeyResult, capabilityResult, groupResult, skillResult, processResult, valueResult] =
      await Promise.all([
        supabase.from("site_profile").select("*").limit(1),
        supabase.from("projects").select("*").eq("published", true).order("sort_order"),
        supabase.from("story_scenes").select("*").order("sort_order"),
        supabase.from("journey_stages").select("*").order("sort_order"),
        supabase.from("capabilities").select("*").order("sort_order"),
        supabase.from("skill_groups").select("*").order("sort_order"),
        supabase.from("skills").select("*").order("sort_order"),
        supabase.from("process_steps").select("*").order("sort_order"),
        supabase.from("value_points").select("*").order("sort_order"),
      ]);

    if (profileResult.error || !profileResult.data?.[0]) return seedContent;

    const groups = (groupResult.data ?? []) as Row[];
    const skillRows = (skillResult.data ?? []) as Row[];
    const skills: SkillGroup[] = groups.map((group) => ({
      id: text(group, "id"),
      sortOrder: typeof group.sort_order === "number" ? group.sort_order : 0,
      title: text(group, "title"),
      items: skillRows
        .filter((skill) => text(skill, "group_id") === text(group, "id"))
        .map((skill) => text(skill, "label"))
        .filter(Boolean),
    }));

    return {
      profile: mapProfile(profileResult.data[0] as Row),
      projects: projectResult.data?.length
        ? (projectResult.data as Row[]).map(mapProject).filter((project) => project.slug)
        : seedContent.projects,
      story: storyResult.data?.length
        ? (storyResult.data as Row[]).map(
            (row): StoryScene => ({
              id: text(row, "id"),
              sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
              onScreenText: text(row, "on_screen_text"),
              voiceOver: text(row, "voice_over"),
              closingHeadline: text(row, "closing_headline"),
              ctaLabel: text(row, "cta_label"),
            }),
          )
        : seedContent.story,
      journey: journeyResult.data?.length
        ? (journeyResult.data as Row[]).map(
            (row): JourneyStage => ({
              id: text(row, "id"),
              sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
              number: text(row, "number"),
              title: text(row, "title"),
              body: text(row, "body"),
            }),
          )
        : seedContent.journey,
      capabilities: capabilityResult.data?.length
        ? (capabilityResult.data as Row[]).map(
            (row): Capability => ({
              id: text(row, "id"),
              sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
              number: text(row, "number"),
              title: text(row, "title"),
              body: text(row, "body"),
              icon: text(row, "icon"),
            }),
          )
        : seedContent.capabilities,
      skills: skills.length ? skills : seedContent.skills,
      process: processResult.data?.length
        ? (processResult.data as Row[]).map(
            (row): ProcessStep => ({
              id: text(row, "id"),
              sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
              number: text(row, "number"),
              title: text(row, "title"),
              body: text(row, "body"),
            }),
          )
        : seedContent.process,
      values: valueResult.data?.length
        ? (valueResult.data as Row[]).map(
            (row): ValuePoint => ({
              id: text(row, "id"),
              sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
              title: text(row, "title"),
              body: text(row, "body"),
            }),
          )
        : seedContent.values,
    };
  } catch {
    return seedContent;
  }
}
