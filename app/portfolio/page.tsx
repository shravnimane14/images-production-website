import Link from "next/link";
import Image from "next/image";
import { getPublicPortfolio } from "@/lib/cms";

export default async function PortfolioPage() {
  const { categories } = await getPublicPortfolio();
  return (
    <main className="min-h-screen bg-[#04070d] text-[#f3efe8]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Images Production logo" width={52} height={52} className="rounded-full object-cover" />
          <div>
            <div className="text-xs uppercase tracking-[0.45em] text-[#d9c5a2]">Images Production</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm uppercase tracking-[0.3em] text-white/70 md:flex">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link href="/#contact" className="rounded-full border border-[#d9c5a2] px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#f7f2ea]">
          Enquire
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Portfolio</p>
          <h1 className="text-4xl font-medium uppercase tracking-[0.1em] md:text-6xl">Our Work</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/portfolio/${category.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="relative h-[420px] overflow-hidden">
                {category.coverImage.endsWith(".mp4") ? (
                  <video src={category.coverImage} muted autoPlay loop playsInline className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <Image src={category.coverImage} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="mb-2 text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">{category.name}</div>
                <h2 className="text-2xl uppercase tracking-[0.12em]">{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
