import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { Icon } from "@/components/design/Icon";
import { VerticalScreenMock } from "@/components/marketing/landing/VerticalScreenMock";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Distribution & Wholesale POS",
    description:
      "Tajir Point for distributors and wholesalers. Route planning, driver dispatch, proof of delivery, purchase orders, and multi-warehouse inventory.",
    path: "/solutions/distributors",
    locale,
  });
}

const FEATURES = [
  {
    icon: "route",
    title: "Route planning",
    body: "Create delivery routes by area, assign stops to drivers, and optimize the order to minimize travel time.",
  },
  {
    icon: "truck",
    title: "Driver dispatch app",
    body: "Drivers get their route on their phone. Each stop shows items to deliver, quantities, and the customer's address.",
  },
  {
    icon: "shield",
    title: "Proof of delivery",
    body: "Drivers capture a signature or photo at each stop. Returns and partial deliveries are logged immediately.",
  },
  {
    icon: "ledgerbook",
    title: "Purchase orders",
    body: "Create POs for suppliers, receive goods against the PO, and auto-update stock. Track what's ordered vs received.",
  },
  {
    icon: "warehouse",
    title: "Multi-warehouse",
    body: "Stock across multiple warehouses or branches. Transfer stock between locations and track each warehouse separately.",
  },
  {
    icon: "bank",
    title: "Supplier payables",
    body: "Track what you owe each supplier, log advance payments, and see outstanding balances at a glance.",
  },
  {
    icon: "goods",
    title: "Bulk order management",
    body: "Handle carton, pallet, and unit-level inventory. Sell in bulk to retailers and track each customer's order history.",
  },
  {
    icon: "chart",
    title: "Distribution reports",
    body: "Daily dispatch summary, driver performance, per-route revenue, and slow-moving stock alerts.",
  },
];

const MOCK_ROWS = [
  { a: "Route Midtown → Riverside", b: "14 / 18 stops · 3 credit sales", c: "$842.00 cash" },
  { a: "Load · 240 cartons", b: "186 sold · 4 returned damaged", c: "50 on van" },
  { a: "Day-end reconciliation", b: "Cash, goods & fuel matched", c: "Variance $0.00" },
];

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Link
              href="/solutions"
              className="mb-7 inline-flex items-center gap-2 font-mono text-[12px] tracking-[1.5px] text-[var(--color-muted-2)] transition-colors hover:text-[var(--color-mint-2)]"
            >
              ← All solutions
            </Link>

            <div>
              <PillBadge>Distributors &amp; Wholesale</PillBadge>
            </div>

            <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.8vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              From warehouse
              <br />
              to last-mile delivery.
            </h1>

            <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
              FMCG · Pharma · Electronics · Bulk Supply
            </p>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.65] text-[rgba(242,247,244,.64)]">
              Route planning, driver dispatch, proof of delivery, purchase orders, and
              multi-warehouse inventory — built for businesses that move stock at scale.
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

          <div className="mt-4 lg:mt-0">
            <VerticalScreenMock
              id="distribution"
              screenTitle="Trip TRP-0418 · VAN-4471"
              rows={MOCK_ROWS}
            />
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
              <span className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border border-[rgba(0,210,122,.22)] bg-[rgba(0,210,122,.12)]">
                <Icon name={f.icon} size={22} />
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
