import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicPortfolio } from "@/lib/cms";

export async function generateStaticParams() {
  const { categories } = await getPublicPortfolio();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPublicPortfolio();
  const category = portfolio.categories.find((entry) => entry.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProjects = portfolio.projects.filter((project) => project.categoryId === category.id && project.published);
  const categoryMedia = portfolio.media.filter((item) => item.categoryId === category.id && item.published);
  const featuredVideos = categoryMedia.filter((item) => item.mediaType === "video");
  const featuredPhotos = categoryMedia.filter((item) => item.mediaType === "photo");

  return (
    <main className="min-h-screen bg-[#04070d] text-[#f3efe8]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Images Production logo" width={52} height={52} className="rounded-full object-cover" />
          <div className="text-xs uppercase tracking-[0.45em] text-[#d9c5a2]">Images Production</div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm uppercase tracking-[0.3em] text-white/70 md:flex">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">{category.name}</p>
            <h1 className="text-4xl font-medium uppercase tracking-[0.12em] md:text-6xl">{category.name}</h1>
          </div>
          <Link href="/portfolio" className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
            Back to portfolio
          </Link>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10">
            {category.coverImage.endsWith(".mp4") ? (
              <video src={category.coverImage} muted autoPlay loop playsInline className="h-full w-full object-cover" />
            ) : (
              <Image src={category.coverImage} alt={category.name} fill className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/30 to-transparent" />
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Category Introduction</p>
            <p className="text-lg leading-8 text-white/80">{category.description}</p>
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl uppercase tracking-[0.15em]">Featured Work</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryProjects.map((project) => (
              <Link key={project.id} href={`/portfolio/${category.slug}/${project.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                <div className="relative h-72 overflow-hidden">
                  <Image src={project.coverImage} alt={project.projectName} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/15 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[#d9c5a2]">{project.eventDate}</div>
                  <div className="text-lg uppercase tracking-[0.12em]">{project.projectName}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-6 text-2xl uppercase tracking-[0.15em]">Photo Gallery</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredPhotos.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/5">
                <div className="relative h-80">
                  <Image src={item.fileUrl} alt={item.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-6 text-2xl uppercase tracking-[0.15em]">Video Gallery</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredVideos.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
                <div className="relative aspect-video overflow-hidden">
                  <video src={item.fileUrl} controls poster={item.thumbnailUrl} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-[#d9c5a2]">{category.name}</div>
                  <div className="mt-2 text-lg uppercase tracking-[0.12em]">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
