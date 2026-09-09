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
    title: "Restaurant POS — Tables, KDS & Delivery",
    description:
      "Tajir Point for restaurants, cafés, and cloud kitchens. Table management, Kitchen Display System, modifiers, split bills, and delivery dispatch.",
    path: "/solutions/restaurants",
    locale,
  });
}

const FEATURES = [
  {
    icon: "restaurant",
    title: "Table management",
    body: "Visual floor plan with live table status. Seat guests, merge tables, transfer orders, and track covers — all from one screen.",
  },
  {
    icon: "pos",
    title: "Kitchen Display System",
    body: "Orders appear on the KDS the moment they're placed. Course sequencing, bump on pickup, and preparation timers built in.",
  },
  {
    icon: "receipt",
    title: "Modifiers & combos",
    body: "Add-ons, size variants, combo deals, and mandatory choices. Every item can have its own modifier groups.",
  },
  {
    icon: "card",
    title: "Split bill & partial pay",
    body: "Split a table's bill by item or by seat. Accept partial payments and mix cash with card or wallet on the same order.",
  },
  {
    icon: "scooter",
    title: "Delivery dispatch",
    body: "Assign orders to drivers, track delivery status, and get proof-of-delivery photo uploads. Works with your own riders.",
  },
  {
    icon: "chart",
    title: "F&B reports",
    body: "Hourly covers, table turnover rate, most-ordered items, void & comp analysis, and daily kitchen productivity.",
  },
  {
    icon: "cloud",
    title: "Cloud kitchen support",
    body: "Run multiple brands out of one kitchen. Separate menus, separate receipts, one inventory, one dashboard.",
  },
  {
    icon: "globe",
    title: "Online ordering",
    body: "Customers order from your Storefront and orders land directly in the KDS — no tablet juggling, no third-party fees.",
  },
];

const MOCK_ROWS = [
  {
    a: "Grilled chicken platter · extra bread ×3",
    b: "Fired to Kitchen Station 2 · 12 min",
    c: "$24.00",
  },
  { a: "Table 07 · 6 guests", b: "Split bill by seat · 2 paid", c: "4 pending" },
  { a: "Delivery app order #8812", b: "Auto-accepted → KDS", c: "Prep 18 min" },
];

export default async function RestaurantsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <PillBadge>Restaurants &amp; Cafés</PillBadge>
            </div>

            <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.8vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              From first order
              <br />
              to last cover.
            </h1>

            <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
              Dine-in · Takeaway · Delivery · Cloud Kitchen
            </p>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.65] text-[rgba(242,247,244,.64)]">
              Table management, KDS, modifiers, split bills, and delivery dispatch — everything a
              restaurant needs, in one system that works even when the WiFi doesn't.
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
            <VerticalScreenMock id="restaurants" screenTitle="Floor · Table 07" rows={MOCK_ROWS} />
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
            See the full restaurant flow — from order to kitchen to bill — live in your demo.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free — Restaurants <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
