import type { Metadata } from "next";
import Link from "next/link";
import { CakeSlice, CalendarClock, Smartphone, Store, Truck, UtensilsCrossed } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "POS Solutions for Every Merchant — Retail, Restaurants & More",
  description:
    "Tajir Point POS adapts to retail, restaurants, electronics, services, bakeries, and distributors in Pakistan, UAE, and Saudi Arabia. Start free in 90 seconds.",
  path: "/solutions",
});

const VERTICALS = [
  {
    num: "01",
    title: "General Retail",
    subtitle: "Kiryana · Apparel · Hardware · Grocery",
    body: "Fast checkout, barcode scanning, multi-unit pricing, and a built-in digital ledger for credit customers. Works on any Android device, even with no internet.",
    tags: ["Barcode scanner", "Credit khata", "FBR e-invoice", "Multi-unit pricing", "Offline POS"],
    href: "/solutions/general-retail",
    icon: <Store size={28} strokeWidth={1.8} />,
    accentColor: "var(--color-mint)",
  },
  {
    num: "02",
    title: "Restaurants & Cafés",
    subtitle: "Dine-in · Takeaway · Delivery · Cloud Kitchen",
    body: "Table management, Kitchen Display System, modifier groups, split bills, and driver dispatch — from a single counter to a multi-branch chain.",
    tags: ["Table management", "KDS", "Modifiers", "Split bill", "Delivery dispatch"],
    href: "/solutions/restaurants",
    icon: <UtensilsCrossed size={28} strokeWidth={1.8} />,
    accentColor: "#f97316",
  },
  {
    num: "03",
    title: "Electronics & Mobile",
    subtitle: "Mobile Phones · Accessories · Computers · Repair",
    body: "Serial number tracking, IMEI management, warranty registers, and repair job cards. Never lose track of a unit from purchase to sale.",
    tags: [
      "IMEI tracking",
      "Serial numbers",
      "Warranty register",
      "Repair jobs",
      "Supplier ledger",
    ],
    href: "/solutions/electronics",
    icon: <Smartphone size={28} strokeWidth={1.8} />,
    accentColor: "#6366f1",
  },
  {
    num: "04",
    title: "Digital Services",
    subtitle: "Salons · Clinics · Gyms · Tutors · Car Wash",
    body: "Appointment scheduling, staff commission tracking, package deals, and recurring billing. Sell your time as efficiently as a product.",
    tags: [
      "Appointments",
      "Staff commissions",
      "Packages",
      "Recurring billing",
      "Customer history",
    ],
    href: "/solutions/services",
    icon: <CalendarClock size={28} strokeWidth={1.8} />,
    accentColor: "#0ea5e9",
  },
  {
    num: "05",
    title: "Bakeries & Sweets",
    subtitle: "Bakeries · Sweets · Juices · Snacks",
    body: "Production recipes, batch tracking, modifier add-ons, daily production planning, and waste monitoring — for shops where every ingredient counts.",
    tags: ["Production recipes", "Batch tracking", "Modifiers", "Daily planning", "Waste log"],
    href: "/solutions/restaurants",
    icon: <CakeSlice size={28} strokeWidth={1.8} />,
    accentColor: "#ec4899",
  },
  {
    num: "06",
    title: "Distributors & Wholesale",
    subtitle: "FMCG · Pharma · Electronics · Bulk Supply",
    body: "Route planning, driver dispatch, proof-of-delivery, purchase orders, supplier payables, and multi-warehouse inventory across branches.",
    tags: ["Route planning", "Driver dispatch", "Purchase orders", "Multi-warehouse", "Payables"],
    href: "/solutions/distributors",
    icon: <Truck size={28} strokeWidth={1.8} />,
    accentColor: "#14b8a6",
  },
];

const REGIONS = [
  {
    flag: "🇵🇰",
    country: "Pakistan",
    code: "PK",
    compliance: [
      "FBR e-invoicing (Tier-1 POS)",
      "POS-IRN generation",
      "Real-time FBR transmission",
      "FBR Annex-C export",
    ],
    payments: ["JazzCash QR", "Easypaisa", "1Link debit", "Cash"],
    currency: "PKR",
  },
  {
    flag: "🇦🇪",
    country: "UAE",
    code: "AE",
    compliance: [
      "5% VAT invoicing",
      "Multi-rate VAT (0%, 5%, exempt)",
      "VAT return export",
      "FTA-ready reports",
    ],
    payments: ["Card (Visa/MC)", "Apple Pay", "Cash", "Bank transfer"],
    currency: "AED",
  },
  {
    flag: "🇸🇦",
    country: "Saudi Arabia",
    code: "SA",
    compliance: [
      "ZATCA Phase 2 clearance",
      "CSID & cryptographic stamp",
      "Arabic e-invoice (XML)",
      "ZATCA QR code",
    ],
    payments: ["STC Pay", "mada", "Card", "Cash"],
    currency: "SAR",
  },
];

export default function SolutionsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Solutions
          </span>
          <h1 className="text-[44px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[860px]">
            POS & business software
            <br />
            for every merchant.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[540px]">
            One platform, six business types, three countries. Tajir Point adapts to your vertical,
            your language, and your compliance requirements — right out of the box.
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

      {/* Business type cards */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VERTICALS.map((v) => (
              <Link
                key={v.num}
                href={v.href}
                className="group rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 lg:p-8 flex flex-col hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:border-[var(--color-mint)] transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                    style={{ background: `${v.accentColor}18`, color: v.accentColor }}
                  >
                    {v.icon}
                  </div>
                  <span className="text-[12px] font-mono font-bold text-[var(--color-muted-2)]">
                    {v.num}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[20px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-mint)] transition-colors">
                  {v.title}
                </h2>
                <p className="text-[12.5px] text-[var(--color-muted)] mb-4">{v.subtitle}</p>
                <p className="text-[14px] text-[var(--color-muted)] leading-[1.65] flex-1">
                  {v.body}
                </p>

                {/* Tags */}
                <div className="mt-5 pt-5 border-t border-[var(--color-line)] flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] font-medium px-2.5 py-1 rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink-3)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[13px] text-[var(--color-muted)] group-hover:text-[var(--color-mint)] transition-colors shrink-0">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By region */}
      <section className="py-20 lg:py-28 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-mint)] uppercase block mb-4">
              Available markets
            </span>
            <h2 className="text-[32px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.1] text-[var(--color-ink)]">
              Compliant from day one,
              <br />
              in every market.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--color-muted)] max-w-[500px] leading-[1.65]">
              Tax compliance, payment rails, and local language support are built in — not bolt-on
              integrations you have to configure yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REGIONS.map((r) => (
              <div
                key={r.country}
                className="rounded-[24px] border border-[var(--color-line)] bg-white p-7"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{r.flag}</span>
                  <div>
                    <div className="font-extrabold text-[18px] text-[var(--color-ink)]">
                      {r.country}
                    </div>
                    <div className="text-[12px] text-[var(--color-muted)]">
                      Currency: {r.currency}
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--color-muted-2)] mb-3">
                    Compliance
                  </p>
                  <ul className="flex flex-col gap-2">
                    {r.compliance.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-[13.5px] text-[var(--color-ink-3)]"
                      >
                        <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[9px] font-bold">
                          ✓
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--color-muted-2)] mb-3">
                    Accepted payments
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.payments.map((p) => (
                      <span
                        key={p}
                        className="text-[12px] px-2.5 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-ink-3)]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[16px] border border-[var(--color-line)] bg-white p-5 flex items-center gap-4">
            <span className="text-2xl">🌍</span>
            <div>
              <span className="font-semibold text-[14px] text-[var(--color-ink)]">
                Bangladesh — coming soon
              </span>
              <span className="text-[13.5px] text-[var(--color-muted)] ms-2">
                with NBR compliance and bKash payments.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* By size */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-mint)] uppercase block mb-4">
                By size
              </span>
              <h2 className="text-[32px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.1] text-[var(--color-ink)]">
                Starts small.
                <br />
                Scales far.
              </h2>
              <p className="mt-4 text-[16px] text-[var(--color-muted)] leading-[1.65]">
                Start on Starter with one branch and two users. Grow into Growth with five branches.
                Move to Enterprise when you're running a chain or franchise.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
              >
                See all plans & pricing →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  label: "Single shop",
                  desc: "1 branch, 1–2 staff. Get started in under 5 minutes.",
                },
                {
                  label: "2–10 branches",
                  desc: "Centralised inventory, branch-level reporting, multi-user access.",
                },
                {
                  label: "Franchise & chains",
                  desc: "Standardised menu/catalog, franchise-level analytics, SSO.",
                },
                {
                  label: "Enterprise",
                  desc: "Unlimited branches, custom integrations, dedicated success manager, custom SLA.",
                },
                {
                  label: "Migrating from another POS",
                  desc: "Free CSV migration assistance. Your data, moved in days.",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-start gap-4 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[11px] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-bold text-[14.5px] text-[var(--color-ink)] mb-0.5">
                      {s.label}
                    </div>
                    <div className="text-[13.5px] text-[var(--color-muted)]">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-ink)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <h2 className="text-[32px] lg:text-[48px] font-extrabold tracking-[-0.035em] text-white">
            Start your 14-day free trial.
          </h2>
          <p className="mt-4 text-[17px] text-white/60 max-w-[440px] mx-auto">
            No credit card. No contract. Just your business, running better.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Start free →
            </a>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
