export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  displayOrder: number;
  published: boolean;
};

export type Project = {
  id: string;
  categoryId: string;
  projectName: string;
  slug: string;
  description: string;
  coverImage: string;
  eventDate: string;
  location: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

export type MediaItem = {
  id: string;
  fileUrl: string;
  thumbnailUrl?: string;
  mediaType: "photo" | "video";
  title: string;
  description: string;
  categoryId: string;
  projectId: string;
  tags: string[];
  location: string;
  date: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "wedding",
    name: "Wedding",
    slug: "wedding",
    description:
      "Romantic cinematic narratives framed through emotion, movement, and atmosphere.",
    coverImage: "/images/wedding photo 1.JPG",
    displayOrder: 1,
    published: true,
  },
  {
    id: "pre-wedding",
    name: "Pre-Wedding",
    slug: "pre-wedding",
    description:
      "Lush portraits and intimate storytelling designed to feel intimate and cinematic.",
    coverImage: "/images/pre wedding 4.jpg",
    displayOrder: 2,
    published: true,
  },
  {
    id: "engagement",
    name: "Engagement",
    slug: "engagement",
    description:
      "Quiet glances, warm tones, and beautifully composed frames for a meaningful beginning.",
    coverImage: "/images/pre weding 3.jpg",
    displayOrder: 3,
    published: true,
  },
  {
    id: "events",
    name: "Events",
    slug: "events",
    description:
      "Live celebrations captured with energy, precision, and emotional depth.",
    coverImage: "/images/Event Highlights.mp4",
    displayOrder: 4,
    published: true,
  },
  {
    id: "reels",
    name: "Reels",
    slug: "reels",
    description:
      "Fast-moving social-first visual stories built for attention and impact.",
    coverImage: "/images/Cinematic 1.mp4",
    displayOrder: 5,
    published: true,
  },
  {
    id: "cinematography",
    name: "Cinematography",
    slug: "cinematography",
    description:
      "High-end motion work shaped with editorial rhythm and dramatic storytelling.",
    coverImage: "/images/Cinematic 2.mp4",
    displayOrder: 6,
    published: true,
  },
  {
    id: "video-editing",
    name: "Video Editing",
    slug: "video-editing",
    description:
      "Polished edits blending emotion, pacing, and refined visual craftsmanship.",
    coverImage: "/images/Commercial Films.mp4",
    displayOrder: 7,
    published: true,
  },
  {
    id: "product-brand-content",
    name: "Product / Brand Content",
    slug: "product-brand-content",
    description:
      "Premium brand narratives that elevate product storytelling across digital channels.",
    coverImage: "/images/product 1.JPG",
    displayOrder: 8,
    published: true,
  },
];

export const projects: Project[] = [
  {
    id: "rahul-priya",
    categoryId: "wedding",
    projectName: "Rahul & Priya Wedding",
    slug: "rahul-priya-wedding",
    description: "A richly layered wedding story blending traditional rituals with modern cinematic storytelling.",
    coverImage: "/images/wedding photo 1.JPG",
    eventDate: "2024-02-14",
    location: "Mumbai, Maharashtra",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "aisha-ved",
    categoryId: "pre-wedding",
    projectName: "Aisha & Ved Pre-Wedding",
    slug: "aisha-ved-pre-wedding",
    description: "A romantic pre-wedding film infused with warm tones, dramatic movement, and a soft editorial mood.",
    coverImage: "/images/pre wedding 4.jpg",
    eventDate: "2024-03-23",
    location: "Lonavala, Maharashtra",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "mira-aryan",
    categoryId: "engagement",
    projectName: "Mira & Aryan Engagement",
    slug: "mira-aryan-engagement",
    description: "A subtle and elegant engagement story with intimate portraits and cinematic transitions.",
    coverImage: "/images/pre weding 3.jpg",
    eventDate: "2024-05-11",
    location: "Bandra, Mumbai",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "festival-night",
    categoryId: "events",
    projectName: "Festival Night Highlights",
    slug: "festival-night-highlights",
    description: "A lively event production capturing the energy, color, and emotional rhythm of the evening.",
    coverImage: "/images/Event Highlights.mp4",
    eventDate: "2024-09-02",
    location: "Mumbai",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "brand-loom",
    categoryId: "product-brand-content",
    projectName: "Brand Story – Loom Studio",
    slug: "brand-story-loom-studio",
    description: "Curated product storytelling designed to feel premium, tactile, and visually elevated.",
    coverImage: "/images/product 1.JPG",
    eventDate: "2024-06-14",
    location: "Mumbai",
    featured: true,
    published: true,
    displayOrder: 1,
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "m-001",
    fileUrl: "/images/wedding photo 1.JPG",
    thumbnailUrl: "/images/wedding photo 1.JPG",
    mediaType: "photo",
    title: "Wedding Portrait",
    description: "A timeless frame from the bride and groom’s portrait session.",
    categoryId: "wedding",
    projectId: "rahul-priya",
    tags: ["wedding", "portrait", "candid"],
    location: "Mumbai",
    date: "2024-02-14",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-002",
    fileUrl: "/images/weding photo 2.JPG",
    thumbnailUrl: "/images/weding photo 2.JPG",
    mediaType: "photo",
    title: "Wedding Details",
    description: "Fine texture and intimate styling details in a warm editorial frame.",
    categoryId: "wedding",
    projectId: "rahul-priya",
    tags: ["details", "wedding"],
    location: "Mumbai",
    date: "2024-02-14",
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    id: "m-003",
    fileUrl: "/images/weding photo 4.JPG",
    thumbnailUrl: "/images/weding photo 4.JPG",
    mediaType: "photo",
    title: "Ceremony Glow",
    description: "A cinematic moment from the wedding mandap as the ceremony unfolds.",
    categoryId: "wedding",
    projectId: "rahul-priya",
    tags: ["ceremony", "wedding", "gold"],
    location: "Mumbai",
    date: "2024-02-14",
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    id: "m-004",
    fileUrl: "/images/pre wedding 4.jpg",
    thumbnailUrl: "/images/pre wedding 4.jpg",
    mediaType: "photo",
    title: "Pre-Wedding Romance",
    description: "A soft, atmospheric portrait set in a natural outdoor frame.",
    categoryId: "pre-wedding",
    projectId: "aisha-ved",
    tags: ["pre-wedding", "romance", "nature"],
    location: "Lonavala",
    date: "2024-03-23",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-005",
    fileUrl: "/images/pre wedding 5.jpg",
    thumbnailUrl: "/images/pre wedding 5.jpg",
    mediaType: "photo",
    title: "Golden Hour Couple Shot",
    description: "Warm editorial tones and a cinematic composition for a memorable portrait.",
    categoryId: "pre-wedding",
    projectId: "aisha-ved",
    tags: ["golden hour", "pre-wedding"],
    location: "Lonavala",
    date: "2024-03-23",
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    id: "m-006",
    fileUrl: "/images/pre weding 3.jpg",
    thumbnailUrl: "/images/pre weding 3.jpg",
    mediaType: "photo",
    title: "Engagement Moodboard",
    description: "A quiet, intimate shot that captures the essence of a meaningful promise.",
    categoryId: "engagement",
    projectId: "mira-aryan",
    tags: ["engagement", "portrait"],
    location: "Bandra",
    date: "2024-05-11",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-007",
    fileUrl: "/images/pre weeding 1.jpg",
    thumbnailUrl: "/images/pre weeding 1.jpg",
    mediaType: "photo",
    title: "Close-Up Portrait",
    description: "An intimate portrait with depth, texture, and emotional focus.",
    categoryId: "engagement",
    projectId: "mira-aryan",
    tags: ["engagement", "close-up"],
    location: "Bandra",
    date: "2024-05-11",
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    id: "m-008",
    fileUrl: "/images/Cinematic photo 1.JPG",
    thumbnailUrl: "/images/Cinematic photo 1.JPG",
    mediaType: "photo",
    title: "Cinematic Editorial Portrait",
    description: "A dramatic still designed with a premium studio-luxury aesthetic.",
    categoryId: "cinematography",
    projectId: "festival-night",
    tags: ["cinematic", "editorial"] ,
    location: "Mumbai",
    date: "2024-09-02",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-009",
    fileUrl: "/images/Cinematic photo 2.JPG",
    thumbnailUrl: "/images/Cinematic photo 2.JPG",
    mediaType: "photo",
    title: "Cinematic Motion Still",
    description: "An atmospheric frame chosen for its depth, contrast, and emotional storytelling.",
    categoryId: "cinematography",
    projectId: "festival-night",
    tags: ["cinematic", "motion", "art"],
    location: "Mumbai",
    date: "2024-09-02",
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    id: "m-010",
    fileUrl: "/images/product 1.JPG",
    thumbnailUrl: "/images/product 1.JPG",
    mediaType: "photo",
    title: "Product Detail",
    description: "A premium product still with rich detail and elevated styling.",
    categoryId: "product-brand-content",
    projectId: "brand-loom",
    tags: ["product", "brand", "editorial"],
    location: "Mumbai",
    date: "2024-06-14",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-011",
    fileUrl: "/images/Cinematic 1.mp4",
    thumbnailUrl: "/images/Cinematic photo 3.JPG",
    mediaType: "video",
    title: "Cinematic Film Sequence",
    description: "A dramatic motion sequence with immersive pacing and polished visual rhythm.",
    categoryId: "cinematography",
    projectId: "festival-night",
    tags: ["film", "cinematography"],
    location: "Mumbai",
    date: "2024-09-02",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-012",
    fileUrl: "/images/pre wedding.mp4",
    thumbnailUrl: "/images/pre wedding 7.jpg",
    mediaType: "video",
    title: "Pre-Wedding Film",
    description: "A romantic short film designed to feel deeply personal and cinematic.",
    categoryId: "pre-wedding",
    projectId: "aisha-ved",
    tags: ["pre-wedding", "film"],
    location: "Lonavala",
    date: "2024-03-23",
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: "m-013",
    fileUrl: "/images/Event Highlights.mp4",
    thumbnailUrl: "/images/Cinematic photo 4.JPG",
    mediaType: "video",
    title: "Event Highlights Reel",
    description: "Fast-paced highlights capturing moments of joy, celebration, and movement.",
    categoryId: "events",
    projectId: "festival-night",
    tags: ["events", "highlights"],
    location: "Mumbai",
    date: "2024-09-02",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "m-014",
    fileUrl: "/images/Commercial Films.mp4",
    thumbnailUrl: "/images/Cinematic photo 5.JPG",
    mediaType: "video",
    title: "Commercial Campaign Film",
    description: "A polished brand piece created with premium movement and impactful pacing.",
    categoryId: "video-editing",
    projectId: "brand-loom",
    tags: ["commercial", "editing", "brand"],
    location: "Mumbai",
    date: "2024-06-14",
    featured: true,
    published: true,
    displayOrder: 1,
  },
];

export const services: Service[] = [
  {
    id: "s-01",
    number: "01",
    title: "Wedding Photography",
    description: "Emotion-rich imagery shaped to preserve the beauty of your story with editorial feeling.",
  },
  {
    id: "s-02",
    number: "02",
    title: "Wedding Cinematography",
    description: "Modern cinematic films that turn rituals, movement, and emotion into a living memory.",
  },
  {
    id: "s-03",
    number: "03",
    title: "Pre-Wedding",
    description: "A thoughtfully staged visual narrative built around chemistry, atmosphere, and intimacy.",
  },
  {
    id: "s-04",
    number: "04",
    title: "Engagement",
    description: "Warm portraits and cinematic moments that reflect the beginning of your next chapter.",
  },
  {
    id: "s-05",
    number: "05",
    title: "Events",
    description: "High-energy event coverage designed to keep the atmosphere, details, and joy alive.",
  },
  {
    id: "s-06",
    number: "06",
    title: "Reels & Social Media Content",
    description: "Platform-ready content that feels premium, quick, and visually magnetic for social reach.",
  },
  {
    id: "s-07",
    number: "07",
    title: "Video Editing",
    description: "Refined storytelling and pacing for films that feel polished, emotional, and immersive.",
  },
  {
    id: "s-08",
    number: "08",
    title: "Product / Brand Content",
    description: "Luxury visual packaging for brands that need content with texture, style, and clarity.",
  },
  {
    id: "s-09",
    number: "09",
    title: "Custom Production",
    description: "Tailored creative direction for unique concepts, branded narratives, and special productions.",
  },
];

export const aboutInfo = {
  founder: "Narayan Mane",
  title: "Founder & Creative Director",
  studio: "Images Production",
  bio: "Narayan Mane leads Images Production with a cinematic eye for emotion, composition, and visual storytelling. His work blends documentary honesty with a polished editorial aesthetic to create lasting, artful imagery.",
  creativeApproach:
    "Every frame is shaped around storytelling, atmosphere, and authenticity—giving each project a depth that feels intimate and premium.",
  photography: "Wedding, portrait, event, and editorial photography with a contemporary cinematic approach.",
  videography: "Cinematic wedding films, event coverage, and motion storytelling designed to feel immersive.",
  editing: "Refined post-production with beautifully paced cuts, color, and emotional flow for modern digital audiences.",
};

export const contactInfo = {
  name: "Narayan Mane",
  role: "Founder & Creative Director",
  studio: "Images Production",
  phone: "+91 8433975695",
  whatsapp: "+91 8433975695",
  whatsappLink: "https://wa.me/918433975695",
  address: "11, Jalaram Niwas, Ganesh Gawade Rd, Mulund West, Mumbai, Maharashtra 400080",
  email: "hello@imagesproduction.in",
};

export const socialLinks = {
  instagram: "",
  facebook: "",
  youtube: "",
  other: "",
};

export const websiteSettings = {
  title: "Images Production | Photography & Videography in Mumbai",
  description:
    "Images Production is a photography, videography and video editing studio in Mulund West, Mumbai.",
};

export const seoDefaults = {
  openGraphImage: "/images/Cinematic photo 1.JPG",
};

export function buildCategoryMap() {
  return new Map(categories.map((category) => [category.slug, category]));
}

export function buildProjectMap() {
  return new Map(projects.map((project) => [project.slug, project]));
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getMediaByCategory(categoryId: string) {
  return mediaItems.filter((item) => item.categoryId === categoryId && item.published);
}

export function getMediaByProject(projectId: string) {
  return mediaItems.filter((item) => item.projectId === projectId && item.published);
}
