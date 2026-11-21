import type { Capability, ProcessStep, SkillGroup, ValuePoint } from "@/lib/types";

export const capabilities: Capability[] = [
  {
    id: "business",
    sortOrder: 1,
    number: "01",
    title: "Business websites",
    body: "Professional websites for businesses that need a strong online presence.",
    icon: "Building2",
  },
  {
    id: "ecommerce",
    sortOrder: 2,
    number: "02",
    title: "E-commerce storefronts",
    body: "Online storefronts designed to present products and support shopping experiences.",
    icon: "ShoppingBag",
  },
  {
    id: "salon",
    sortOrder: 3,
    number: "03",
    title: "Salon and beauty websites",
    body: "Websites for salons and beauty businesses to present services and guide customers towards appointments.",
    icon: "Sparkles",
  },
  {
    id: "restaurant",
    sortOrder: 4,
    number: "04",
    title: "Restaurant websites",
    body: "Digital experiences for restaurants, menus, location information, and enquiries.",
    icon: "UtensilsCrossed",
  },
  {
    id: "hotel",
    sortOrder: 5,
    number: "05",
    title: "Hotel and hospitality websites",
    body: "Websites that present accommodation, facilities, rooms, and reservation information.",
    icon: "BedDouble",
  },
  {
    id: "custom",
    sortOrder: 6,
    number: "06",
    title: "Custom website experiences",
    body: "Purpose-built website experiences designed around a business's needs.",
    icon: "Layers",
  },
];

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    sortOrder: 1,
    title: "Frontend development",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    id: "styling",
    sortOrder: 2,
    title: "Styling and UI",
    items: [
      "Tailwind CSS",
      "Responsive design",
      "Component-based UI development",
      "UI/UX principles",
    ],
  },
  {
    id: "workflow",
    sortOrder: 3,
    title: "Development workflow",
    items: ["Git", "GitHub", "VS Code / Cursor", "Vercel"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    sortOrder: 1,
    number: "01",
    title: "Understand",
    body: "Understand the business, its audience, and what the website needs to achieve.",
  },
  {
    id: "plan",
    sortOrder: 2,
    number: "02",
    title: "Plan and design",
    body: "Structure the pages, plan the user journey, and establish the visual direction.",
  },
  {
    id: "build",
    sortOrder: 3,
    number: "03",
    title: "Build",
    body: "Develop the website with responsive layouts, reusable components, and functional interactions.",
  },
  {
    id: "refine",
    sortOrder: 4,
    number: "04",
    title: "Refine and launch",
    body: "Test the experience, improve details, and prepare the website for deployment.",
  },
];

export const values: ValuePoint[] = [
  {
    id: "details",
    sortOrder: 1,
    title: "I care about the details.",
    body: "Spacing, type, and the small interactions are part of the work, not an afterthought.",
  },
  {
    id: "design",
    sortOrder: 2,
    title: "I focus on clean, professional design.",
    body: "I want a website to feel considered and clear the moment it opens.",
  },
  {
    id: "mobile",
    sortOrder: 3,
    title: "I build with mobile users in mind.",
    body: "Layouts are designed for phones and tablets, not only reduced from a desktop screen.",
  },
  {
    id: "navigation",
    sortOrder: 4,
    title: "I value simple and intuitive navigation.",
    body: "People should know where they are and how to take the next step.",
  },
  {
    id: "learning",
    sortOrder: 5,
    title: "I enjoy learning and improving.",
    body: "Each project is a chance to get better at the craft.",
  },
  {
    id: "purpose",
    sortOrder: 6,
    title: "I aim to make websites that serve a real purpose.",
    body: "A website should help a business explain itself and give visitors a way to respond.",
  },
];
