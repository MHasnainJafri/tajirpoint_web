import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Restaurant POS — Table Management, KDS & Delivery",
  description: "Tajir Point for restaurants, cafés, and cloud kitchens in Pakistan, UAE, and Saudi Arabia. Table management, Kitchen Display System, modifiers, split bills, and delivery dispatch.",
  path: "/solutions/restaurants",
});

const FEATURES = [
  { icon: "🍽️", title: "Table management", body: "Visual floor plan with live table status. Seat guests, merge tables, transfer orders, and track covers — all from one screen." },
  { icon: "👨‍🍳", title: "Kitchen Display System", body: "Orders appear on the KDS the moment they're placed. Course sequencing, bump on pickup, and preparation timers built in." },
  { icon: "🔧", title: "Modifiers & combos", body: "Add-ons, size variants, combo deals, and mandatory choices. Every item can have its own modifier groups." },
  { icon: "🧾", title: "Split bill & partial pay", body: "Split a table's bill by item or by seat. Accept partial payments and mix cash with card or wallet on the same order." },
  { icon: "🛵", title: "Delivery dispatch", body: "Assign orders to drivers, track delivery status, and get proof-of-delivery photo uploads. Works with your own riders." },
  { icon: "📊", title: "F&B reports", body: "Hourly covers, table turnover rate, most-ordered items, void & comp analysis, and daily kitchen productivity." },
  { icon: "☁️", title: "Cloud kitchen support", body: "Run multiple brands out of one kitchen. Separate menus, separate receipts, one inventory, one dashboard." },
  { icon: "🌐", title: "Online ordering", body: "Customers order from your Storefront and orders land directly in the KDS — no tablet juggling, no third-party fees." },
];

export default function RestaurantsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8 transition-colors">
            ← All solutions
          </Link>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-full border border-orange-200 text-orange-600 bg-orange-50">
            Restaurants & Cafés
          </div>
          <h1 className="text-[44px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            From first order<br />to last cover.
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-muted)]">Dine-in · Takeaway · Delivery · Cloud Kitchen</p>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            Table management, KDS, modifiers, split bills, and delivery dispatch — everything a restaurant needs, in one system that works even when the WiFi doesn't.
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
          <p className="mt-4 text-[16px] text-white/55 max-w-[400px] mx-auto">See the full restaurant flow — from order to kitchen to bill — live in your demo.</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a href="https://dashboard.tajirpoint.com/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity">
              Start free — Restaurants →
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
