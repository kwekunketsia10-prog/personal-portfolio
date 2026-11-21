export type LayoutVariant = "full" | "split" | "split-reverse" | "mobile-float";

export type Profile = {
  name: string;
  title: string;
  location: string;
  email: string;
  whatsapp: string;
  linkedinUrl: string;
  githubUrl: string;
  availabilityLabel: string;
  heroLabel: string;
  heroHeading: string;
  heroAccent: string;
  heroBody: string;
  heroSupport: string;
  portraitPath: string;
  journeyVideoPath: string;
  journeyPosterPath: string;
  journeyCaptionsPath: string;
  journeyVideoAutoplay: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  objective: string;
  designDirection: string;
  highlights: string[];
  features: string[];
  role: string;
  learned: string;
  liveUrl: string;
  technologies: string[];
  host: string;
  layout: LayoutVariant;
  desktopImage: string;
  mobileImage: string;
  sortOrder: number;
  published: boolean;
};

export type StoryScene = {
  id: string;
  sortOrder: number;
  onScreenText: string;
  voiceOver: string;
  closingHeadline: string;
  ctaLabel: string;
};

export type JourneyStage = {
  id: string;
  sortOrder: number;
  number: string;
  title: string;
  body: string;
};

export type Capability = {
  id: string;
  sortOrder: number;
  number: string;
  title: string;
  body: string;
  icon: string;
};

export type SkillGroup = {
  id: string;
  sortOrder: number;
  title: string;
  items: string[];
};

export type ProcessStep = {
  id: string;
  sortOrder: number;
  number: string;
  title: string;
  body: string;
};

export type ValuePoint = {
  id: string;
  sortOrder: number;
  title: string;
  body: string;
};

export type SiteContent = {
  profile: Profile;
  projects: Project[];
  story: StoryScene[];
  journey: JourneyStage[];
  capabilities: Capability[];
  skills: SkillGroup[];
  process: ProcessStep[];
  values: ValuePoint[];
};

export type Enquiry = {
  id: string;
  fullName: string;
  email: string;
  businessName: string;
  websiteType: string;
  budget: string;
  message: string;
  createdAt: string;
  readAt: string | null;
  emailStatus: "sent" | "failed" | "skipped";
};
