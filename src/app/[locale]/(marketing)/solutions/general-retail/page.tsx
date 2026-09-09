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
    title: "General Retail POS — Kiryana & Apparel",
    description:
      "Tajir Point POS for grocery, convenience, apparel and hardware stores. Credit ledger, barcode scanning, works without internet, and tax e-invoicing per country.",
    path: "/solutions/general-retail",
    locale,
  });
}

const FEATURES = [
  {
    icon: "refresh",
    title: "Works without internet",
    body: "Sell even when the internet goes down. Every sale, return, and discount is saved locally and syncs the moment you're back online.",
  },
  {
    icon: "goods",
    title: "Inventory management",
    body: "Track stock by unit, carton, or kilogram. Get low-stock alerts before you run out. Set re-order levels per product.",
  },
  {
    icon: "ledgerbook",
    title: "Khata ledger",
    body: "Record credit sales and track what every customer owes. Send WhatsApp reminders when payments are due.",
  },
  {
    icon: "brand-fbr",
    title: "FBR compliance (PK)",
    body: "Every sale transmits to FBR in real time. POS-IRN generation, e-invoicing, and Annex-C export — fully automatic.",
  },
  {
    icon: "barcode",
    title: "Barcode & label printing",
    body: "Scan barcodes at checkout or print your own shelf labels for any product. Supports USB, Bluetooth, and network scanners.",
  },
  {
    icon: "chart",
    title: "Daily & monthly reports",
    body: "Z-report at shift end, daily sales summary, top-selling products, and profit margin per item.",
  },
  {
    icon: "users",
    title: "Multi-user access",
    body: "Cashier, supervisor, and owner roles. Cashiers can't see cost prices or delete sales without manager approval.",
  },
  {
    icon: "pos",
    title: "Thermal receipt printing",
    body: "Print to any 58mm or 80mm Bluetooth or USB thermal printer. Customize your receipt header, footer, and logo.",
  },
];

const MOCK_ROWS = [
  { a: "Rice 5 kg", b: "1 case = 20 × 5 kg · sells by kg", c: "$3.40 / kg" },
  { a: "Meridian Traders", b: "Credit balance · reminder sent by WhatsApp", c: "$426.00 due" },
  { a: "Z-report · Register 1", b: "Cash counted $1,842.00 · zero variance", c: "Closed 10:14 pm" },
];

export default async function GeneralRetailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SolutionPage
      vertical="General Retail"
      subtitle="Kiryana · Apparel · Hardware · Grocery"
      headline={
        <>
          The POS built for
          <br />
          the neighbourhood shop.
        </>
      }
      description="From a single corner shop to a multi-branch grocery chain — Tajir Point handles your counter, your stock, and your credit customers in one place."
      features={FEATURES}
      ctaLabel="Start free — General Retail"
      screenMockId="retail"
      screenTitle="Counter · Northgate Market"
      screenRows={MOCK_ROWS}
    />
  );
}

function SolutionPage({
  vertical,
  subtitle,
  headline,
  description,
  features,
  ctaLabel,
  screenMockId,
  screenTitle,
  screenRows,
}: {
  vertical: string;
  subtitle: string;
  headline: React.ReactNode;
  description: string;
  features: { icon: string; title: string; body: string }[];
  ctaLabel: string;
  screenMockId: string;
  screenTitle: string;
  screenRows: ReadonlyArray<{ a: string; b: string; c: string }>;
}) {
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
              <PillBadge>{vertical}</PillBadge>
            </div>

            <h1 className="mt-6 max-w-[820px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.8vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              {headline}
            </h1>

            <p className="mt-4 animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-3)]">
              {subtitle}
            </p>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.65] text-[rgba(242,247,244,.64)]">
              {description}
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
            <VerticalScreenMock id={screenMockId} screenTitle={screenTitle} rows={screenRows} />
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-5 py-[90px] md:px-10">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
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
            Set up in minutes. Your data, your language, your compliance — ready from day one.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              {ctaLabel} <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
