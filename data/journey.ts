import type { JourneyStage } from "@/lib/types";

export const journey: JourneyStage[] = [
  {
    id: "discovery",
    sortOrder: 1,
    number: "01",
    title: "Discovery",
    body: "Began exploring web development and learning how websites are structured.",
  },
  {
    id: "learning",
    sortOrder: 2,
    number: "02",
    title: "Learning",
    body: "Started understanding frontend development, design principles, responsive layouts, and the technologies used to build modern websites.",
  },
  {
    id: "experimentation",
    sortOrder: 3,
    number: "03",
    title: "Experimentation",
    body: "Began creating practical projects to apply what I was learning.",
  },
  {
    id: "building",
    sortOrder: 4,
    number: "04",
    title: "Building",
    body: "Created websites across different industries, from fashion and cosmetics to hospitality and business websites.",
  },
  {
    id: "next",
    sortOrder: 5,
    number: "05",
    title: "What's next",
    body: "Continuing to improve, explore new technologies, and build better digital experiences.",
  },
];
