import { createClient } from "@/lib/supabase/server";
import {
  categories as fallbackCategories,
  getCategoryBySlug as getFallbackCategoryBySlug,
  getMediaByCategory as getFallbackMediaByCategory,
  getMediaByProject as getFallbackMediaByProject,
  projects as fallbackProjects,
  mediaItems as fallbackMedia,
  type Category,
  type MediaItem,
  type Project,
} from "@/lib/site-data";

type CategoryRow = { id: string; name: string; slug: string; description: string; cover_image: string | null; display_order: number; published: boolean };
type ProjectRow = { id: string; category_id: string; project_name: string; slug: string; description: string; cover_image: string | null; event_date: string; location: string; featured: boolean; published: boolean; display_order: number };
type MediaRow = { id: string; file_url: string; thumbnail_url: string | null; media_type: "photo" | "video"; title: string; description: string; category_id: string; project_id: string; tags: string[]; location: string; date: string; featured: boolean; published: boolean; display_order: number };

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const deployedVideoUrl = (value: string) => {
  if (!value.startsWith("/images/") || !value.toLowerCase().endsWith(".mp4")) return value;
  const filename = value.slice("/images/".length);
  return `https://media.githubusercontent.com/media/shravnimane14/images-production-website/main/public/images/${encodeURIComponent(filename)}`;
};

function mapCategory(row: CategoryRow): Category {
  const fallback = getFallbackCategoryBySlug(row.slug)?.coverImage ?? fallbackCategories[0].coverImage;
  return { id: row.id, name: row.name, slug: row.slug, description: row.description, coverImage: deployedVideoUrl(row.cover_image ?? fallback), displayOrder: row.display_order, published: row.published };
}

function mapProject(row: ProjectRow): Project {
  const fallback = fallbackProjects.find((project) => project.slug === row.slug)?.coverImage ?? fallbackCategories[0].coverImage;
  return { id: row.id, categoryId: row.category_id, projectName: row.project_name, slug: row.slug, description: row.description, coverImage: deployedVideoUrl(row.cover_image ?? fallback), eventDate: row.event_date, location: row.location, featured: row.featured, published: row.published, displayOrder: row.display_order };
}

function mapMedia(row: MediaRow): MediaItem {
  return { id: row.id, fileUrl: deployedVideoUrl(row.file_url), thumbnailUrl: row.thumbnail_url ?? undefined, mediaType: row.media_type, title: row.title, description: row.description, categoryId: row.category_id, projectId: row.project_id, tags: row.tags ?? [], location: row.location, date: row.date, featured: row.featured, published: row.published, displayOrder: row.display_order };
}

export async function getPublicPortfolio() {
  if (!configured) return { categories: fallbackCategories, projects: fallbackProjects, media: fallbackMedia };

  try {
    const supabase = await createClient();
    const [{ data: categoryRows, error: categoryError }, { data: projectRows, error: projectError }, { data: mediaRows, error: mediaError }] = await Promise.all([
      supabase.from("categories").select("*").eq("published", true).order("display_order"),
      supabase.from("projects").select("*").eq("published", true).order("display_order"),
      supabase.from("media").select("*").eq("published", true).order("display_order"),
    ]);
    if (categoryError || projectError || mediaError) throw categoryError ?? projectError ?? mediaError;
    if (!categoryRows?.length || !projectRows?.length || !mediaRows?.length) {
      return { categories: fallbackCategories, projects: fallbackProjects, media: fallbackMedia };
    }
    return { categories: (categoryRows as CategoryRow[]).map(mapCategory), projects: (projectRows as ProjectRow[]).map(mapProject), media: (mediaRows as MediaRow[]).map(mapMedia) };
  } catch {
    return { categories: fallbackCategories, projects: fallbackProjects, media: fallbackMedia };
  }
}

export async function getPublicCategory(slug: string) {
  const portfolio = await getPublicPortfolio();
  return portfolio.categories.find((category) => category.slug === slug) ?? (!configured ? getFallbackCategoryBySlug(slug) : undefined);
}

export async function getPublicCategoryMedia(categoryId: string) {
  const portfolio = await getPublicPortfolio();
  return portfolio.media.filter((item) => item.categoryId === categoryId && item.published) ?? getFallbackMediaByCategory(categoryId);
}

export async function getPublicProjectMedia(projectId: string) {
  const portfolio = await getPublicPortfolio();
  return portfolio.media.filter((item) => item.projectId === projectId && item.published) ?? getFallbackMediaByProject(projectId);
}