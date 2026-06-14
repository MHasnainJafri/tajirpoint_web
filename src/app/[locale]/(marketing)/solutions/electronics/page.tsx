import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "POS for Electronics & Mobile Shops — IMEI & Serial Tracking",
  description:
    "Tajir Point for electronics and mobile phone shops in Pakistan, UAE, and Saudi Arabia. IMEI tracking, serial numbers, warranty management, repair job cards, and supplier ledger.",
  path: "/solutions/electronics",
});

const FEATURES = [
  {
    icon: "📱",
    title: "IMEI & serial tracking",
    body: "Every unit is tracked by IMEI or serial number from purchase to sale. Full chain of custody — no unit ever goes missing.",
  },
  {
    icon: "🔖",
    title: "Warranty register",
    body: "Log warranty start/end per unit at time of sale. Customers can claim warranty by IMEI — you see the full purchase record instantly.",
  },
  {
    icon: "🔧",
    title: "Repair job cards",
    body: "Create job cards for repairs, assign to a technician, track parts used, and notify customers when the device is ready.",
  },
  {
    icon: "📦",
    title: "Box-level inventory",
    body: "Stock phones by model, color, and storage variant. See exactly how many Redmi Note 13 128GB in Black you have.",
  },
  {
    icon: "🏪",
    title: "Supplier management",
    body: "Track purchases per supplier, log advance payments, and see outstanding payables across all vendors at a glance.",
  },
  {
    icon: "🧾",
    title: "Detailed receipts",
    body: "Receipts show IMEI, model, color, and warranty expiry. Customers get a receipt they can actually use for claims.",
  },
  {
    icon: "💰",
    title: "Trade-in & exchange",
    body: "Log trade-in devices with IMEI, deduct the trade-in value from the new sale, and track the second-hand unit separately.",
  },
  {
    icon: "📊",
    title: "Model-wise reports",
    body: "See which models sell fastest, your average margin per brand, and slow-moving stock before it becomes a problem.",
  },
];

export default function ElectronicsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8 transition-colors"
          >
            ← All solutions
          </Link>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50">
            Electronics & Mobile
          </div>
          <h1 className="text-[44px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            Every unit tracked,
            <br />
            from box to buyer.
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-muted)]">
            Mobile Phones · Accessories · Computers · Repair
          </p>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            IMEI tracking, warranty registers, repair job cards, and serial-level inventory. Built
            for shops where every unit has a unique identity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Start free trial →
            </a>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--color-line)] text-[15px] font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg-2)] transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-[15px] font-bold text-[var(--color-ink)] mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-ink)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <h2 className="text-[32px] lg:text-[44px] font-extrabold tracking-[-0.035em] text-white">
            14-day free trial. No card needed.
          </h2>
          <p className="mt-4 text-[16px] text-white/55 max-w-[400px] mx-auto">
            We'll walk you through IMEI tracking and warranty setup in your demo — live, on your own
            data.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Start free — Electronics →
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
