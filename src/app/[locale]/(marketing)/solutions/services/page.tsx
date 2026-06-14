import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "POS for Service Businesses — Salons, Clinics & Gyms",
  description:
    "Tajir Point for salons, clinics, gyms, and service businesses in Pakistan, UAE, and Saudi Arabia. Appointment scheduling, staff commissions, packages, and recurring billing.",
  path: "/solutions/services",
});

const FEATURES = [
  {
    icon: "📅",
    title: "Appointments & bookings",
    body: "Let customers book online or walk in. View your schedule by day, week, or staff member. Send confirmation via WhatsApp.",
  },
  {
    icon: "💇",
    title: "Staff & commission",
    body: "Assign services to staff, track each employee's revenue, and auto-calculate commissions at month end.",
  },
  {
    icon: "📦",
    title: "Packages & memberships",
    body: "Sell session bundles, monthly memberships, or prepaid packages. Track remaining sessions per customer automatically.",
  },
  {
    icon: "🔄",
    title: "Recurring billing",
    body: "Auto-charge monthly members. Send due reminders before the next cycle and track lapsed memberships.",
  },
  {
    icon: "📋",
    title: "Customer history",
    body: "See every visit, service, product purchase, and payment for each customer — going back to day one.",
  },
  {
    icon: "🛒",
    title: "Retail alongside services",
    body: "Sell shampoos, supplements, or accessories at the counter while tracking them as separate inventory from your services.",
  },
  {
    icon: "🧾",
    title: "Service invoices",
    body: "Clean, branded invoices for each service rendered — including technician name, service time, and any products used.",
  },
  {
    icon: "📊",
    title: "Staff performance reports",
    body: "Revenue per staff member, most-booked services, average ticket value, and client retention rate — monthly.",
  },
];

export default function ServicesPage() {
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
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-full border border-sky-200 text-sky-600 bg-sky-50">
            Services
          </div>
          <h1 className="text-[44px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            Sell your time
            <br />
            as efficiently as products.
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-muted)]">
            Salons · Clinics · Gyms · Tutors · Car Wash
          </p>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            Appointments, staff commissions, package deals, memberships, and recurring billing —
            everything a service business needs to run smoothly.
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
            We'll set up appointments and staff commissions live in your demo call.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Start free — Services →
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
