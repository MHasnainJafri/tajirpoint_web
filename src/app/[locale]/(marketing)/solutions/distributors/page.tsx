import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Distribution & Wholesale POS — Route Planning & Dispatch",
  description: "Tajir Point for distributors and wholesalers in Pakistan, UAE, and Saudi Arabia. Route planning, driver dispatch, proof of delivery, purchase orders, and multi-warehouse inventory.",
  path: "/solutions/distributors",
});

const FEATURES = [
  { icon: "🗺️", title: "Route planning", body: "Create delivery routes by area, assign stops to drivers, and optimize the order to minimize travel time." },
  { icon: "🛵", title: "Driver dispatch app", body: "Drivers get their route on their phone. Each stop shows items to deliver, quantities, and the customer's address." },
  { icon: "📸", title: "Proof of delivery", body: "Drivers capture a signature or photo at each stop. Returns and partial deliveries are logged immediately." },
  { icon: "📋", title: "Purchase orders", body: "Create POs for suppliers, receive goods against the PO, and auto-update stock. Track what's ordered vs received." },
  { icon: "🏭", title: "Multi-warehouse", body: "Stock across multiple warehouses or branches. Transfer stock between locations and track each warehouse separately." },
  { icon: "💳", title: "Supplier payables", body: "Track what you owe each supplier, log advance payments, and see outstanding balances at a glance." },
  { icon: "📦", title: "Bulk order management", body: "Handle carton, pallet, and unit-level inventory. Sell in bulk to retailers and track each customer's order history." },
  { icon: "📊", title: "Distribution reports", body: "Daily dispatch summary, driver performance, per-route revenue, and slow-moving stock alerts." },
];

export default function DistributorsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8 transition-colors">
            ← All solutions
          </Link>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-full border border-teal-200 text-teal-600 bg-teal-50">
            Distributors & Wholesale
          </div>
          <h1 className="text-[44px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            From warehouse<br />to last-mile delivery.
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-muted)]">FMCG · Pharma · Electronics · Bulk Supply</p>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            Route planning, driver dispatch, proof of delivery, purchase orders, and multi-warehouse inventory — built for businesses that move stock at scale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://dashboard.tajirpoint.com/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity">
              Start free trial →
            </a>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--color-line)] text-[15px] font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg-2)] transition-colors">
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6">
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
          <h2 className="text-[32px] lg:text-[44px] font-extrabold tracking-[-0.035em] text-white">14-day free trial. No card needed.</h2>
          <p className="mt-4 text-[16px] text-white/55 max-w-[400px] mx-auto">We'll demo the full dispatch flow — route creation, driver app, and proof of delivery — in your call.</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a href="https://dashboard.tajirpoint.com/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity">
              Start free — Distributors →
            </a>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
