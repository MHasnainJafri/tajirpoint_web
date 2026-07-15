import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Distribution & Wholesale POS — Route Planning & Dispatch",
  description:
    "Tajir Point for distributors and wholesalers in Pakistan, UAE, and Saudi Arabia. Route planning, driver dispatch, proof of delivery, purchase orders, and multi-warehouse inventory.",
  path: "/solutions/distributors",
});

const FEATURES = [
  {
    icon: "🗺️",
    title: "Route planning",
    body: "Create delivery routes by area, assign stops to drivers, and optimize the order to minimize travel time.",
  },
  {
    icon: "🛵",
    title: "Driver dispatch app",
    body: "Drivers get their route on their phone. Each stop shows items to deliver, quantities, and the customer's address.",
  },
  {
    icon: "📸",
    title: "Proof of delivery",
    body: "Drivers capture a signature or photo at each stop. Returns and partial deliveries are logged immediately.",
  },
  {
    icon: "📋",
    title: "Purchase orders",
    body: "Create POs for suppliers, receive goods against the PO, and auto-update stock. Track what's ordered vs received.",
  },
  {
    icon: "🏭",
    title: "Multi-warehouse",
    body: "Stock across multiple warehouses or branches. Transfer stock between locations and track each warehouse separately.",
  },
  {
    icon: "💳",
    title: "Supplier payables",
    body: "Track what you owe each supplier, log advance payments, and see outstanding balances at a glance.",
  },
  {
    icon: "📦",
    title: "Bulk order management",
    body: "Handle carton, pallet, and unit-level inventory. Sell in bulk to retailers and track each customer's order history.",
  },
  {
    icon: "📊",
    title: "Distribution reports",
    body: "Daily dispatch summary, driver performance, per-route revenue, and slow-moving stock alerts.",
  },
];

export default function DistributorsPage() {
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
            <PillBadge>Distributors &amp; Wholesale</PillBadge>
          </div>

          <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.2vw,68px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            From warehouse
            <br />
            to last-mile delivery.
          </h1>

          <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
            FMCG · Pharma · Electronics · Bulk Supply
          </p>

          <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.65] text-[rgba(242,247,244,.64)]">
            Route planning, driver dispatch, proof of delivery, purchase orders, and multi-warehouse
            inventory — built for businesses that move stock at scale.
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
            We'll demo the full dispatch flow — route creation, driver app, and proof of delivery —
            in your call.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free — Distributors <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
