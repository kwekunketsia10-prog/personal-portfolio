import type { Project } from "@/lib/types";

const role =
  "Designed and built as a self-initiated project while learning and practising web development.";

export const projects: Project[] = [
  {
    slug: "cimantikos",
    name: "Cimantikós",
    category: "Fashion / Bespoke Tailoring",
    summary:
      "A refined digital experience for a bespoke fashion and tailoring brand, designed to communicate craftsmanship, elegance, and a distinctive brand identity.",
    objective:
      "To practise an editorial fashion website for a bespoke tailoring house, including look presentation and an appointment-led visit.",
    designDirection:
      "A dark, high-contrast editorial layout. The live homepage leads with a large serif line, “Presence is never accidental.”, and a quiet navigation bar.",
    highlights: [
      "Premium fashion presentation",
      "Editorial-style content",
      "Look and collection presentation",
      "Brand storytelling",
      "Appointment-oriented experience",
    ],
    features: [
      "Homepage built around the tailoring house and its looks",
      "Navigation for the collection, atelier, journal, about, and contact",
      "Atelier sections for suits, agbada, and weddings",
      "Appointment calls to action, with studio hours shown for Accra",
    ],
    role,
    learned:
      "How to pace a fashion homepage so the clothes, the brand line, and the appointment path each have room.",
    liveUrl: "https://cimantikos.vercel.app/",
    technologies: ["Next.js"],
    host: "Vercel",
    layout: "full",
    desktopImage: "/images/projects/cimantikos-desktop.png",
    mobileImage: "/images/projects/cimantikos-mobile.png",
    sortOrder: 1,
    published: true,
  },
  {
    slug: "acc-cosmetics",
    name: "ACC Cosmetics & Beauty",
    category: "Beauty / Cosmetics / Salon",
    summary:
      "A business website that brings two related experiences together under one brand vision: a cosmetics shop and a beauty bar.",
    objective:
      "To practise presenting a cosmetics shop and a beauty bar as two related experiences on one website.",
    designDirection:
      "A warm, light interface. The live site introduces Ani Cocoa Cosmetics alongside the beauty bar, with shop and appointment paths on the first screen.",
    highlights: [
      "Two-business presentation",
      "Cosmetics shop experience",
      "Beauty bar experience",
      "Hair and beauty appointment direction",
      "Clear navigation between both businesses",
    ],
    features: [
      "Shared introduction for the cosmetics shop and the beauty bar",
      "Navigation between shop, beauty bar, about, and contact",
      "Beauty bar services including braiding, hair styling, and pedicure",
      "A product selection with prices shown in Ghana cedis",
      "Appointment direction for beauty bar services",
    ],
    role,
    learned:
      "How to give two related businesses a shared website without making either one feel like an afterthought.",
    liveUrl: "https://acc-cosmetics-and-beauty.vercel.app/",
    technologies: ["Next.js"],
    host: "Vercel",
    layout: "split",
    desktopImage: "/images/projects/acc-cosmetics-desktop.png",
    mobileImage: "/images/projects/acc-cosmetics-mobile.png",
    sortOrder: 2,
    published: true,
  },
  {
    slug: "the-girls-closet",
    name: "The Girl's Closet",
    category: "Fashion / E-commerce",
    summary:
      "A fashion storefront designed to present clothing collections, product categories, and a premium shopping experience.",
    objective:
      "To practise a fashion storefront with collections, product browsing, and a shopping-oriented interface.",
    designDirection:
      "A light retail layout with a large campaign image, category navigation, search, and product browsing beneath the fold.",
    highlights: [
      "Fashion storefront",
      "Product categories",
      "Product cards",
      "Shopping-oriented interface",
      "Brand presentation",
      "Customer-facing navigation",
    ],
    features: [
      "Campaign homepage and featured products with prices in Ghana cedis",
      "Category, collection, search, wishlist, and cart navigation",
      "Account and order-tracking entry points",
      "The live site states that no payment is taken",
    ],
    role,
    learned:
      "How to structure a storefront for browsing categories and products, and how to be clear about what the shop can and cannot do yet.",
    liveUrl: "https://www.thegirlscloset.shop/",
    technologies: ["Next.js"],
    host: "Vercel",
    layout: "mobile-float",
    desktopImage: "/images/projects/the-girls-closet-desktop.png",
    mobileImage: "/images/projects/the-girls-closet-mobile.png",
    sortOrder: 3,
    published: true,
  },
  {
    slug: "carls-cosmetics",
    name: "Carl's Cosmetics",
    category: "Beauty / Skincare / E-commerce",
    summary:
      "A skincare and beauty storefront focused on product discovery, skincare collections, and a clean shopping experience.",
    objective:
      "To practise a skincare storefront organised around product discovery and categories.",
    designDirection:
      "A soft, light beauty layout. The homepage is led by a large still life and a direct path into the shop.",
    highlights: [
      "Skincare product presentation",
      "Product categories",
      "Featured products",
      "Product-focused layout",
      "Beauty brand identity",
    ],
    features: [
      "Product-led homepage for a skincare collection",
      "Categories for face care, shower, lotions, and fragrance",
      "Featured products with prices in Ghana cedis",
      "Shop, cart, and wishlist navigation",
    ],
    role,
    learned:
      "How to organise a product catalogue so categories and featured pieces are easy to scan.",
    liveUrl: "https://carls-cosmetics.vercel.app/",
    technologies: ["Next.js"],
    host: "Vercel",
    layout: "split-reverse",
    desktopImage: "/images/projects/carls-cosmetics-desktop.png",
    mobileImage: "/images/projects/carls-cosmetics-mobile.png",
    sortOrder: 4,
    published: true,
  },
  {
    slug: "night-out",
    name: "Night Out",
    category: "Hospitality / Hotel",
    summary:
      "A hospitality website concept designed to present a hotel experience, showcase rooms, and guide visitors towards reservation enquiries.",
    objective:
      "To practise a hospitality website that presents a hotel, its rooms, and a path toward a reservation enquiry.",
    designDirection:
      "A dark, cinematic first screen with the hotel introduction and a date, guest, and availability search in view.",
    highlights: [
      "Hotel presentation",
      "Room listings",
      "Room details",
      "Reservation-oriented interface",
      "Hospitality content",
      "Premium visual presentation",
    ],
    features: [
      "Hotel introduction set in Ridge, Accra",
      "Suites listed with weeknight rates and room details",
      "Dining, spa, and experience sections",
      "A reservation search for dates, guests, and availability",
    ],
    role,
    learned:
      "How to introduce a hotel, its rooms, and a reservation path on a single cinematic page.",
    liveUrl: "https://night-out-mocha.vercel.app/",
    technologies: ["Next.js"],
    host: "Vercel",
    layout: "full",
    desktopImage: "/images/projects/night-out-desktop.png",
    mobileImage: "/images/projects/night-out-mobile.png",
    sortOrder: 5,
    published: true,
  },
];
