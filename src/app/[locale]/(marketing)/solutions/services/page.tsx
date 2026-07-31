import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "POS for Service Businesses — Salons, Clinics & Gyms",
  description:
    "Tajir Point for salons, clinics, gyms, and service businesses. Appointment scheduling, staff commissions, packages, and recurring billing.",
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
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-14 pt-[140px] md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 62%)",
          }}
        />

        <div className="relative mx-auto max-w-[1140px]">
          <Link
            href="/solutions"
            className="mb-7 inline-flex items-center gap-2 font-mono text-[12px] tracking-[1.5px] text-[var(--color-muted-2)] transition-colors hover:text-[var(--color-mint-2)]"
          >
            ← All solutions
          </Link>

          <div>
            <PillBadge>Services</PillBadge>
          </div>

          <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.2vw,68px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            Sell your time
            <br />
            as efficiently as products.
          </h1>

          <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
            Salons · Clinics · Gyms · Tutors · Car Wash
          </p>

          <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.65] text-[rgba(242,247,244,.64)]">
            Appointments, staff commissions, package deals, memberships, and recurring billing —
            everything a service business needs to run smoothly.
          </p>

          <div className="mt-9 flex animate-[tpFadeUp_.8s_.36s_cubic-bezier(.22,1,.36,1)_both] flex-wrap gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free trial <span>→</span>
            </MintButton>
            <GhostButton href={siteConfig.calendlyUrl} external>
              Book a demo
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-5 py-[90px] md:px-10">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              data-reveal-delay={(i % 4) * 80}
              className="rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)] hover:shadow-[0_18px_50px_rgba(0,0,0,.4)]"
            >
              <span className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border border-[rgba(0,210,122,.22)] bg-[rgba(0,210,122,.12)] text-[20px]">
                {f.icon}
              </span>
              <h3 className="text-[16px] font-bold tracking-[-0.01em]">{f.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[rgba(242,247,244,.58)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-5 pb-[110px] pt-5 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            14-day free trial. No card needed.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[rgba(242,247,244,.64)]">
            We'll set up appointments and staff commissions live in your demo call.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free — Services <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
