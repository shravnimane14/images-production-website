"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  aboutInfo,
  categories as defaultCategories,
  contactInfo,
  mediaItems as defaultMedia,
  projects as defaultProjects,
  services as defaultServices,
  socialLinks,
  websiteSettings,
  type Category,
  type MediaItem,
  type Project,
} from "@/lib/site-data";

type SiteState = {
  categories: Category[];
  projects: Project[];
  media: MediaItem[];
  about: typeof aboutInfo;
  services: typeof defaultServices;
  contact: typeof contactInfo;
  socials: typeof socialLinks;
  settings: typeof websiteSettings;
};

export default function AdminPage() {
  const [site, setSite] = useState<SiteState>({
    categories: defaultCategories,
    projects: defaultProjects,
    media: defaultMedia,
    about: aboutInfo,
    services: defaultServices,
    contact: contactInfo,
    socials: socialLinks,
    settings: websiteSettings,
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mediaForm, setMediaForm] = useState({
    title: "",
    categoryId: defaultCategories[0]?.id ?? "",
    projectId: defaultProjects[0]?.id ?? "",
    mediaType: "photo",
    description: "",
    location: "",
    date: "",
    tags: "",
    featured: true,
    published: true,
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    coverImage: "/images/Cinematic photo 1.JPG",
    published: true,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient();
        const [{ data: categories }, { data: projects }, { data: media }] = await Promise.all([
          supabase.from("categories").select("*").order("display_order"),
          supabase.from("projects").select("*").order("display_order"),
          supabase.from("media").select("*").order("display_order"),
        ]);
        if (categories && projects && media) {
          setSite((current) => ({ ...current, categories: categories.map((item) => ({ id: item.id, name: item.name, slug: item.slug, description: item.description, coverImage: item.cover_image, displayOrder: item.display_order, published: item.published })), projects: projects.map((item) => ({ id: item.id, categoryId: item.category_id, projectName: item.project_name, slug: item.slug, description: item.description, coverImage: item.cover_image, eventDate: item.event_date ?? "", location: item.location, featured: item.featured, published: item.published, displayOrder: item.display_order })), media: media.map((item) => ({ id: item.id, fileUrl: item.file_url, thumbnailUrl: item.thumbnail_url ?? undefined, mediaType: item.media_type, title: item.title, description: item.description, categoryId: item.category_id, projectId: item.project_id, tags: item.tags ?? [], location: item.location, date: item.date ?? "", featured: item.featured, published: item.published, displayOrder: item.display_order })) }));
          const firstCategory = categories[0]?.id ?? "";
          const firstProject = projects.find((project) => project.category_id === firstCategory)?.id ?? projects[0]?.id ?? "";
          setMediaForm((current) => ({ ...current, categoryId: firstCategory, projectId: firstProject }));
          setStatus("Connected to Supabase");
        }
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to connect to Supabase");
      }
    };
    void load();
  }, []);

  const totalPhotos = useMemo(
    () => site.media.filter((item) => item.mediaType === "photo").length,
    [site.media],
  );
  const totalVideos = useMemo(
    () => site.media.filter((item) => item.mediaType === "video").length,
    [site.media],
  );

  const addMedia = async () => {
    if (!files.length) {
      setStatus("Choose one or more files first");
      return;
    }
    const supabase = createClient();
    setStatus("Uploading media...");
    const created: MediaItem[] = [];
    for (const file of files) {
      const path = `${mediaForm.categoryId}/${mediaForm.projectId}/${crypto.randomUUID()}-${file.name}`;
      const upload = await supabase.storage.from("media").upload(path, file, { upsert: false, cacheControl: "3600" });
      if (upload.error) { setStatus(upload.error.message); return; }
      const { data: publicFile } = supabase.storage.from("media").getPublicUrl(path);
      const { data: row, error } = await supabase.from("media").insert({ file_url: publicFile.publicUrl, storage_path: path, media_type: mediaForm.mediaType, title: mediaForm.title || file.name.replace(/\.[^/.]+$/, ""), description: mediaForm.description, category_id: mediaForm.categoryId, project_id: mediaForm.projectId, tags: mediaForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean), location: mediaForm.location, date: mediaForm.date || new Date().toISOString().slice(0, 10), featured: mediaForm.featured, published: mediaForm.published, display_order: site.media.length + created.length + 1 }).select().single();
      if (error || !row) { setStatus(error?.message ?? "Unable to save media"); return; }
      created.push({ id: row.id, fileUrl: row.file_url, thumbnailUrl: row.thumbnail_url ?? undefined, mediaType: row.media_type, title: row.title, description: row.description, categoryId: row.category_id, projectId: row.project_id, tags: row.tags ?? [], location: row.location, date: row.date ?? "", featured: row.featured, published: row.published, displayOrder: row.display_order });
    }
    setSite((current) => ({ ...current, media: [...created, ...current.media] }));
    setFiles([]);
    setStatus(`${created.length} media file${created.length === 1 ? "" : "s"} uploaded`);
    setMediaForm({
      title: "",
      categoryId: defaultCategories[0]?.id ?? "",
      projectId: defaultProjects[0]?.id ?? "",
      mediaType: "photo",
      description: "",
      location: "",
      date: "",
      tags: "",
      featured: true,
      published: true,
    });
  };

  const deleteMedia = async (item: MediaItem) => {
    const supabase = createClient();
    const { error } = await supabase.from("media").delete().eq("id", item.id);
    if (error) { setStatus(error.message); return; }
    setSite((current) => ({ ...current, media: current.media.filter((entry) => entry.id !== item.id) }));
  };

  const visibleMedia = site.media.filter((item) => {
    const matchesSearch = `${item.title} ${item.tags.join(" ")} ${item.location}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (typeFilter === "all" || item.mediaType === typeFilter) && (categoryFilter === "all" || item.categoryId === categoryFilter) && (publishedFilter === "all" || String(item.published) === publishedFilter);
  });

  const addCategory = async () => {
    if (!categoryForm.name.trim()) return;
    const slug = categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { data, error } = await createClient().from("categories").insert({ name: categoryForm.name, slug, description: categoryForm.description, cover_image: categoryForm.coverImage, display_order: site.categories.length + 1, published: categoryForm.published }).select().single();
    if (error || !data) { setStatus(error?.message ?? "Unable to create category"); return; }
    const newCategory: Category = { id: data.id, name: data.name, slug: data.slug, description: data.description, coverImage: data.cover_image, displayOrder: data.display_order, published: data.published };
    setSite((current) => ({ ...current, categories: [...current.categories, newCategory] }));
    setCategoryForm({ name: "", description: "", coverImage: "/images/Cinematic photo 1.JPG", published: true });
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "media", label: "Media" },
    { id: "categories", label: "Categories" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <main className="min-h-screen bg-[#04070d] p-6 text-[#f3efe8] md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Admin</p>
            <h1 className="mt-2 text-3xl uppercase tracking-[0.14em]">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#d9c5a2]/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#d9c5a2]">{status || "Images Production CMS"}</span>
            <button onClick={() => void createClient().auth.signOut()} className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/75">Sign out</button>
          </div>
        </header>

        <nav className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${
                activeTab === tab.id ? "border-[#d9c5a2] bg-[#d9c5a2] text-[#02040a]" : "border-white/10 bg-white/5 text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "dashboard" && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {[
              { label: "Total Photos", value: totalPhotos },
              { label: "Total Videos", value: totalVideos },
              { label: "Total Categories", value: site.categories.length },
              { label: "Total Projects", value: site.projects.length },
              { label: "Published Media", value: site.media.filter((item) => item.published).length },
              { label: "Draft Media", value: site.media.filter((item) => !item.published).length },
            ].map((card) => (
              <div key={card.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d9c5a2]">{card.label}</div>
                <div className="text-3xl font-light">{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "media" && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Add Media</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                  Files
                  <input type="file" multiple accept="image/*,video/*" onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="mt-2 block w-full rounded-xl border border-dashed border-[#d9c5a2]/50 bg-[#0b1220] p-4 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                  Title
                  <input value={mediaForm.title} onChange={(event) => setMediaForm({ ...mediaForm, title: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Media Type
                  <select value={mediaForm.mediaType} onChange={(event) => setMediaForm({ ...mediaForm, mediaType: event.target.value as "photo" | "video" })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white">
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Category
                  <select value={mediaForm.categoryId} onChange={(event) => setMediaForm({ ...mediaForm, categoryId: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white">
                    {site.categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Project
                  <select value={mediaForm.projectId} onChange={(event) => setMediaForm({ ...mediaForm, projectId: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white">
                    {site.projects.map((project) => (
                      <option key={project.id} value={project.id}>{project.projectName}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                  Description
                  <textarea value={mediaForm.description} onChange={(event) => setMediaForm({ ...mediaForm, description: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Location
                  <input value={mediaForm.location} onChange={(event) => setMediaForm({ ...mediaForm, location: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Date
                  <input type="date" value={mediaForm.date} onChange={(event) => setMediaForm({ ...mediaForm, date: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                  Tags
                  <input value={mediaForm.tags} onChange={(event) => setMediaForm({ ...mediaForm, tags: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  <input type="checkbox" checked={mediaForm.featured} onChange={(event) => setMediaForm({ ...mediaForm, featured: event.target.checked })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  <input type="checkbox" checked={mediaForm.published} onChange={(event) => setMediaForm({ ...mediaForm, published: event.target.checked })} />
                  Published
                </label>
              </div>
              <button onClick={addMedia} className="mt-6 rounded-full bg-[#d9c5a2] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#03080d]">Save & Publish</button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Media Library</h2>
              <div className="grid max-h-[700px] gap-4 overflow-auto pr-2">
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search media" className="rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                  <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white"><option value="all">All types</option><option value="photo">Photos</option><option value="video">Videos</option></select>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white"><option value="all">All categories</option>{site.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                  <select value={publishedFilter} onChange={(event) => setPublishedFilter(event.target.value)} className="rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white"><option value="all">Published and drafts</option><option value="true">Published</option><option value="false">Drafts</option></select>
                </div>
                {visibleMedia.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-[1.2rem] border border-white/10 bg-[#0b1220] p-3">
                    {item.mediaType === "photo" ? (
                      <Image src={item.fileUrl} alt={item.title} width={96} height={96} className="h-24 w-24 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-[#6a5efb] to-[#ff4ecb] text-xs uppercase tracking-[0.25em] text-white">Video</div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium uppercase tracking-[0.12em]">{item.title}</div>
                      <div className="mt-1 text-xs text-white/60">{item.mediaType} • {site.categories.find((category) => category.id === item.categoryId)?.name ?? item.categoryId}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[#d9c5a2]">{item.published ? "Published" : "Draft"}</div>
                      <button onClick={() => void deleteMedia(item)} className="mt-3 text-xs uppercase tracking-[0.18em] text-red-300">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Add Category</h2>
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Category Name
                  <input value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                  Category Description
                  <textarea value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
                </label>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  <input type="checkbox" checked={categoryForm.published} onChange={(event) => setCategoryForm({ ...categoryForm, published: event.target.checked })} />
                  Published
                </label>
                <button onClick={addCategory} className="rounded-full bg-[#d9c5a2] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#03080d]">Add Category</button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Existing Categories</h2>
              <div className="grid gap-4">
                {site.categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-[#0b1220] p-4">
                    <div>
                      <div className="text-sm uppercase tracking-[0.18em]">{category.name}</div>
                      <div className="mt-1 text-xs text-white/60">/{category.slug}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#d9c5a2]">{category.published ? "Live" : "Draft"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Projects</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {site.projects.map((project) => (
                <div key={project.id} className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-4">
                  <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#d9c5a2]">
                    {site.categories.find((category) => category.id === project.categoryId)?.name ?? project.categoryId}
                  </div>
                  <div className="text-lg uppercase tracking-[0.14em]">{project.projectName}</div>
                  <div className="mt-2 text-sm text-white/60">{project.location}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">About Narayan Mane</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                Founder Name
                <input value={site.about.founder} onChange={(event) => setSite({ ...site, about: { ...site.about, founder: event.target.value } })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70">
                Studio
                <input value={site.about.studio} onChange={(event) => setSite({ ...site, about: { ...site.about, studio: event.target.value } })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                Bio
                <textarea value={site.about.bio} onChange={(event) => setSite({ ...site, about: { ...site.about, bio: event.target.value } })} className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                Creative Approach
                <textarea value={site.about.creativeApproach} onChange={(event) => setSite({ ...site, about: { ...site.about, creativeApproach: event.target.value } })} className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="mb-6 text-xl uppercase tracking-[0.2em]">Website Settings</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                Title
                <input value={site.settings.title} onChange={(event) => setSite({ ...site, settings: { ...site.settings, title: event.target.value } })} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/70 md:col-span-2">
                Description
                <textarea value={site.settings.description} onChange={(event) => setSite({ ...site, settings: { ...site.settings, description: event.target.value } })} className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
