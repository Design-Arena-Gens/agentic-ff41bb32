import { DateSaver } from "@/components/DateSaver";
import { FeatureList } from "@/components/FeatureList";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 pb-24 pt-32 sm:px-10 lg:px-16">
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-indigo-950/80 to-slate-950/95 p-12 shadow-[0_60px_120px_-40px_rgba(79,70,229,0.35)]">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                DateSave Studio
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Shop modern save-the-date suites and lock your celebration
                timeline in one place.
              </h1>
              <p className="text-lg text-white/70">
                Discover artful stationery, bundle concierge services, and keep
                every milestone—rehearsal dinners, welcome parties, afterglows—
                perfectly organized.
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-600 hover:shadow-xl"
                >
                  Browse collections
                </a>
                <a
                  href="#dates"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white/80 transition hover:border-white hover:text-white"
                >
                  Save your date
                </a>
              </div>
            </div>
            <div className="relative flex h-full w-full max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span className="uppercase tracking-[0.3em]">Next drop</span>
                <span>April 28</span>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary-500/80 via-sky-500/70 to-emerald-500/60 p-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                  Spotlight suite
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Lumen Cascade</h2>
                <p className="mt-4 text-sm text-white/80">
                  Iridescent foil, vellum overlay, and a micro-site animation
                  for hybrid celebrations.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
                <p className="font-semibold text-white">
                  Concierge calendar opens Friday at 10 AM EST.
                </p>
                <p className="mt-2">
                  Secure a design slot now to receive curated palettes,
                  typography, and print specs within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Signature collections
              </h2>
              <p className="text-sm text-white/60">
                Curated palettes crafted for the moments you don&apos;t want to
                forget.
              </p>
            </div>
            <a
              href="mailto:hello@datesave.studio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Request bespoke
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Everything you need to announce beautifully
              </h2>
              <p className="text-sm text-white/60">
                Concierge services and smart tooling keep your guests perfectly
                in sync.
              </p>
            </div>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              New • Timeline automation
            </span>
          </div>
          <FeatureList />
        </section>

        <section id="dates">
          <DateSaver products={products} />
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-semibold text-white">
              Couples who saved their date with us
            </h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              4.9 ★ experience rating
            </span>
          </div>
          <Testimonials />
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-white/60 sm:flex-row">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <span className="font-semibold text-white">DateSave Studio</span>
            <p>Crafted for modern celebrations • Est. 2024</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="mailto:hello@datesave.studio"
              className="transition hover:text-white"
            >
              Concierge
            </a>
            <a
              href="#shop"
              className="transition hover:text-white"
            >
              Collections
            </a>
            <a
              href="#dates"
              className="transition hover:text-white"
            >
              Save a date
            </a>
            <span>© {new Date().getFullYear()} All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
