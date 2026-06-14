import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Tajir Point — Built for Merchants Who Work Hard",
  description: "Learn how Tajir Point gives every merchant in Pakistan, UAE, and Saudi Arabia enterprise-grade POS, inventory, and khata tools — in their language, built for their market, compliant out of the box.",
  path: "/about",
});

const VALUES = [
  {
    title: "Works without internet",
    body: "Your shop doesn't close when the internet does. Every feature works without a connection and syncs the moment you're back online.",
    icon: "⚡",
  },
  {
    title: "Tri-lingual by default",
    body: "English, اردو, and العربية are first-class citizens — not afterthoughts. Every screen, receipt, and report renders in the merchant's language.",
    icon: "🌐",
  },
  {
    title: "Built for the region",
    body: "FBR, ZATCA, 1Link, JazzCash — the compliance and payment rails that matter in PK, AE, and SA are built in, not bolted on.",
    icon: "🗺️",
  },
  {
    title: "One price, every module",
    body: "No per-module fees. No transaction percentages. Pay per branch, get everything. We grow when you grow.",
    icon: "💚",
  },
];

const STATS = [
  { value: "12,000+", label: "Active merchants" },
  { value: "3",       label: "Countries" },
  { value: "3",       label: "Languages" },
  { value: "99.9%",   label: "Uptime SLA" },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-[var(--color-ink)] text-white">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Our story
          </span>
          <h1 className="text-[44px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] max-w-[800px]">
            Built for merchants
            <br />
            who work hard.
          </h1>
          <p className="mt-6 text-[18px] text-white/65 leading-[1.65] max-w-[540px]">
            We started Tajir Point because the tools available to merchants in South Asia and the Gulf were either too expensive, too complex, or simply not built for local languages and compliance needs.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/[0.08]">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[42px] font-extrabold tracking-[-0.04em] text-white leading-none">{s.value}</div>
                <div className="mt-1.5 text-[14px] text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-mint)] uppercase block mb-4">Mission</span>
              <h2 className="text-[36px] lg:text-[48px] font-extrabold tracking-[-0.035em] leading-[1.08]">
                Every merchant deserves
                <br />
                enterprise-grade tools.
              </h2>
              <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65]">
                A kiryana in Lahore, a restaurant in Dubai, an electronics shop in Riyadh — they all have the same operational needs as a chain store. We built one platform that serves all of them.
              </p>
              <p className="mt-4 text-[17px] text-[var(--color-muted)] leading-[1.65]">
                Tajir Point works on any Android device — even without internet — prints to any Bluetooth printer, and speaks your language right out of the box.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="text-[15px] font-bold text-[var(--color-ink)] mb-2">{v.title}</h3>
                  <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <h2 className="text-[36px] lg:text-[48px] font-extrabold tracking-[-0.035em]">Ready to see it live?</h2>
          <p className="mt-4 text-[17px] text-[var(--color-muted)] max-w-[480px] mx-auto">
            Book a free 30-minute demo and we'll walk you through Tajir Point for your specific business type.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Book a demo →
            </Link>
            <a
              href="https://dashboard.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--color-line)] text-[15px] font-semibold text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Start free trial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
