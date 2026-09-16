import Image from "next/image";
import Link from "next/link";
import { aboutInfo, contactInfo, services, websiteSettings } from "@/lib/site-data";
import { getPublicPortfolio } from "@/lib/cms";

export default async function Home() {
  const { categories, media: mediaItems } = await getPublicPortfolio();
  const featuredPortfolio = mediaItems.filter((item) => item.featured).slice(0, 6);
  const heroVideo = mediaItems.find((item) => item.mediaType === "video") ?? mediaItems[0];

  return (
    <main className="bg-[#04070d] text-[#f3efe8]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Images Production logo" width={52} height={52} className="rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.45em] text-[#d9c5a2]">IMAGES PRODUCTION</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-[0.7rem] uppercase tracking-[0.28em] text-white/75 md:flex">
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        <Link href="#contact" className="rounded-full border border-[#d9c5a2] px-5 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-[#f8f4ee]">
          Contact Us
        </Link>
      </header>

      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0">
          <video src={heroVideo?.fileUrl ?? "/images/Cinematic 1.mp4"} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,96,255,0.35),transparent_40%),linear-gradient(to_right,_rgba(4,7,13,0.72),rgba(4,7,13,0.38),rgba(4,7,13,0.7))]" />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pb-16 pt-12 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs uppercase tracking-[0.55em] text-[#d9c5a2]">Frames Alive with Imagination</p>
            <h1 className="text-5xl uppercase tracking-[0.12em] text-white md:text-7xl xl:text-[7rem]">IMAGES PRODUCTION</h1>
            <p className="mt-5 text-lg uppercase tracking-[0.35em] text-white/75 md:text-xl">Photography • Videography • Video Editing</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/portfolio" className="rounded-full bg-[#d9c5a2] px-7 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#03070d] transition hover:scale-[1.02]">
                VIEW OUR WORK
              </Link>
              <Link href="#contact" className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-white transition hover:border-[#d9c5a2] hover:text-[#d9c5a2]">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-[0_10px_35px_rgba(37,211,102,0.5)] transition hover:scale-105">💬</a>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">About Narayan Mane</p>
          <h2 className="mt-4 text-4xl uppercase tracking-[0.12em] md:text-5xl">Founder & Creative Director</h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <Image src="/images/owner.jpeg" alt="Narayan Mane" width={900} height={1100} className="h-[640px] w-full object-cover" />
          </div>

          <div className="space-y-7">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#d9c5a2]">Images Production</p>
              <h3 className="text-3xl uppercase tracking-[0.14em]">Narayan Mane</h3>
            </div>
            <p className="text-lg leading-8 text-white/80">{aboutInfo.bio}</p>
            <p className="text-lg leading-8 text-white/80">{aboutInfo.creativeApproach}</p>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#d9c5a2]">Photography</div>
                <p className="text-sm leading-7 text-white/75">{aboutInfo.photography}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#d9c5a2]">Videography</div>
                <p className="text-sm leading-7 text-white/75">{aboutInfo.videography}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#d9c5a2]">Editing</div>
                <p className="text-sm leading-7 text-white/75">{aboutInfo.editing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-white/10 bg-[#0a101a]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Our Services</p>
            <h2 className="mt-4 text-4xl uppercase tracking-[0.12em] md:text-5xl">Crafted for Memorable Stories</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d9c5a2]/60">
                <div className="mb-5 text-[0.7rem] uppercase tracking-[0.4em] text-[#d9c5a2]">{service.number}</div>
                <h3 className="text-2xl uppercase tracking-[0.12em]">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Our Work</p>
            <h2 className="mt-4 text-4xl uppercase tracking-[0.12em] md:text-5xl">Featured Stories</h2>
          </div>
          <Link href="/portfolio" className="hidden rounded-full border border-white/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:inline-flex">Explore Portfolio</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredPortfolio.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5">
              <div className="relative h-80 overflow-hidden">
                {item.mediaType === "video" ? (
                  <video src={item.fileUrl} muted autoPlay loop playsInline className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <Image src={item.fileUrl} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="mb-2 text-[0.7rem] uppercase tracking-[0.32em] text-[#d9c5a2]">{item.mediaType}</div>
                <div className="text-xl uppercase tracking-[0.12em]">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Cinematic Portfolio</p>
          <h2 className="mt-4 text-4xl uppercase tracking-[0.12em] md:text-5xl">Browse by Category</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link href={`/portfolio/${category.slug}`} key={category.id} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div className="relative h-[400px] overflow-hidden">
                {category.coverImage.endsWith(".mp4") ? (
                  <video src={category.coverImage} muted autoPlay loop playsInline className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <Image src={category.coverImage} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="text-[0.7rem] uppercase tracking-[0.42em] text-[#d9c5a2]">{category.name}</div>
                <div className="mt-3 text-2xl uppercase tracking-[0.12em]">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#0a101a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#d9c5a2]">Contact</p>
            <h2 className="mt-4 text-4xl uppercase tracking-[0.12em] md:text-5xl">Let’s Create Something Beautiful</h2>

            <div className="mt-8 space-y-5 text-base text-white/75">
              <div><span className="block text-[0.68rem] uppercase tracking-[0.3em] text-[#d9c5a2]">Narayan Mane</span> Founder & Creative Director</div>
              <div><span className="block text-[0.68rem] uppercase tracking-[0.3em] text-[#d9c5a2]">Phone</span> +91 8433975695</div>
              <div><span className="block text-[0.68rem] uppercase tracking-[0.3em] text-[#d9c5a2]">WhatsApp</span> +91 8433975695</div>
              <div><span className="block text-[0.68rem] uppercase tracking-[0.3em] text-[#d9c5a2]">Address</span> 11, Jalaram Niwas, Ganesh Gawade Rd, Mulund West, Mumbai, Maharashtra 400080</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+918433975695" className="rounded-full bg-[#d9c5a2] px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-[#03070d]">Call Now</a>
              <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-white">WhatsApp</a>
              <a href="https://maps.google.com/?q=11,+Jalaram+Niwas,+Ganesh+Gawade+Rd,+Mulund+West,+Mumbai,+Maharashtra+400080" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-white">Get Directions</a>
            </div>
          </div>

          <form className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Name
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Your name" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Phone
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Your phone" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Email
                <input type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Your email" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Service
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Wedding photography" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Project Type
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Wedding" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-1">
                Event Date
                <input type="date" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-2">
                Location
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Mumbai" />
              </label>
              <label className="text-[0.68rem] uppercase tracking-[0.25em] text-white/75 md:col-span-2">
                Message
                <textarea className="mt-2 min-h-32 w-full rounded-xl border border-white/10 bg-[#0b1220] p-3 text-sm text-white" placeholder="Tell us about your vision" />
              </label>
            </div>
            <button type="button" className="mt-8 rounded-full bg-[#d9c5a2] px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-[#03070d]">Submit</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-[0.68rem] uppercase tracking-[0.28em] text-white/60">
        {websiteSettings.title}
      </footer>
    </main>
  );
}
