import type { Metadata } from "next";
import { TrialDays } from "@/components/marketing/TrialDays";
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
    title: "Electronics & Mobile Shop POS — IMEI Tracking",
    description:
      "Tajir Point for electronics and mobile phone shops. IMEI tracking, serial numbers, warranty management, repair job cards, and supplier ledger.",
    path: "/solutions/electronics",
    locale,
  });
}

const FEATURES = [
  {
    icon: "phone",
    title: "IMEI & serial tracking",
    body: "Every unit is tracked by IMEI or serial number from purchase to sale. Full chain of custody — no unit ever goes missing.",
  },
  {
    icon: "shield",
    title: "Warranty register",
    body: "Log warranty start/end per unit at time of sale. Customers can claim warranty by IMEI — you see the full purchase record instantly.",
  },
  {
    icon: "barcode",
    title: "Repair job cards",
    body: "Create job cards for repairs, assign to a technician, track parts used, and notify customers when the device is ready.",
  },
  {
    icon: "package",
    title: "Box-level inventory",
    body: "Stock phones by model, color, and storage variant. See exactly how many Redmi Note 13 128GB in Black you have.",
  },
  {
    icon: "warehouse",
    title: "Supplier management",
    body: "Track purchases per supplier, log advance payments, and see outstanding payables across all vendors at a glance.",
  },
  {
    icon: "receipt",
    title: "Detailed receipts",
    body: "Receipts show IMEI, model, color, and warranty expiry. Customers get a receipt they can actually use for claims.",
  },
  {
    icon: "cash",
    title: "Trade-in & exchange",
    body: "Log trade-in devices with IMEI, deduct the trade-in value from the new sale, and track the second-hand unit separately.",
  },
  {
    icon: "chart",
    title: "Model-wise reports",
    body: "See which models sell fastest, your average margin per brand, and slow-moving stock before it becomes a problem.",
  },
];

const MOCK_ROWS = [
  { a: "IMEI 35-882109-•••-4", b: "Sold 12 Mar · warranty to 12 Mar 2027", c: "Active" },
  { a: "Repair job RJ-221", b: "Screen replacement · parts reserved", c: "Ready for pickup" },
  { a: "Trade-in · iPhone 11", b: "Valued $380.00 → applied to sale", c: "Accepted" },
];

export default async function ElectronicsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <PillBadge>Electronics &amp; Mobile</PillBadge>
            </div>

            <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.8vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              Every unit tracked,
              <br />
              from box to buyer.
            </h1>

            <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
              Mobile Phones · Accessories · Computers · Repair
            </p>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.65] text-[rgba(242,247,244,.64)]">
              IMEI tracking, warranty registers, repair job cards, and serial-level inventory. Built
              for shops where every unit has a unique identity.
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
              id="electronics"
              screenTitle="Serials · Galaxy A15"
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
            <TrialDays />-day free trial. No card needed.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[rgba(242,247,244,.64)]">
            We'll walk you through IMEI tracking and warranty setup in your demo — live, on your own
            data.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free — Electronics <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
