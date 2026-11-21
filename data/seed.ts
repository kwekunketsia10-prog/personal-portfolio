import { capabilities, processSteps, skills, values } from "@/data/skills";
import { journey } from "@/data/journey";
import { projects } from "@/data/projects";
import { profile } from "@/data/site-config";
import { story } from "@/data/story";
import type { SiteContent } from "@/lib/types";

export const seedContent: SiteContent = {
  profile,
  projects,
  story,
  journey,
  capabilities,
  skills,
  process: processSteps,
  values,
};

export const PROFILE_ID = "00000000-0000-0000-0000-000000000001";
