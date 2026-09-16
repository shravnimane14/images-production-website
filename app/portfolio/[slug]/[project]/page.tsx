import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicPortfolio } from "@/lib/cms";

export async function generateStaticParams() {
  const { projects } = await getPublicPortfolio();
  return projects.map((project) => ({
    slug: project.categoryId === "wedding" ? "wedding" : project.categoryId,
    project: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string; project: string }> }) {
  const { slug, project } = await params;
  const portfolio = await getPublicPortfolio();
  const category = portfolio.categories.find((entry) => entry.slug === slug);
  if (!category) notFound();

  const projectMatch = portfolio.projects.find((entry) => entry.slug === project && entry.categoryId === category.id);
  if (!projectMatch) notFound();

  const projectMedia = portfolio.media.filter((item) => item.projectId === projectMatch.id && item.published);
  const photos = projectMedia.filter((item) => item.mediaType === "photo");
  const videos = projectMedia.filter((item) => item.mediaType === "video");
  const relatedProjects = portfolio.projects.filter((entry) => entry.categoryId === category.id && entry.id !== projectMatch.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#04070d] text-[#f3efe8]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Images Production logo" width={52} height={52} className="rounded-full object-cover" />
          <div className="text-xs uppercase tracking-[0.42em] text-[#d9c5a2]">Images Production</div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm uppercase tracking-[0.3em] text-white/70 md:flex">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href={`/portfolio/${category.slug}`}>{category.name}</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-6 text-xs uppercase tracking-[0.48em] text-[#d9c5a2]">{category.name}</div>
        <h1 className="text-4xl uppercase tracking-[0.12em] md:text-6xl">{projectMatch.projectName}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{projectMatch.description}</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
        <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/10">
          <Image src={projectMatch.coverImage} alt={projectMatch.projectName} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/20 to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
        <div className="mb-6 text-2xl uppercase tracking-[0.16em]">Photo Story</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {photos.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <div className="relative h-[320px]">
                <Image src={item.fileUrl} alt={item.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
        <div className="mb-6 text-2xl uppercase tracking-[0.16em]">Film</div>
        <div className="grid gap-5 md:grid-cols-2">
          {videos.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
              <div className="relative aspect-video">
                <video src={item.fileUrl} controls poster={item.thumbnailUrl} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[#d9c5a2]">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="mb-6 text-2xl uppercase tracking-[0.16em]">More From {category.name}</div>
        <div className="grid gap-5 md:grid-cols-3">
          {relatedProjects.map((entry) => (
            <Link key={entry.id} href={`/portfolio/${category.slug}/${entry.slug}`} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/5">
              <div className="relative h-72 overflow-hidden">
                <Image src={entry.coverImage} alt={entry.projectName} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[#d9c5a2]">{entry.eventDate}</div>
                <div className="mt-2 text-lg uppercase tracking-[0.12em]">{entry.projectName}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
