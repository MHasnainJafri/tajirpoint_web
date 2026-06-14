import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "POS for General Retail — Kiryana, Apparel & Hardware",
  description:
    "Tajir Point POS for kiryana stores, apparel shops, and hardware stores in Pakistan, UAE, and Saudi Arabia. Khata ledger, barcode scanning, works without internet, and FBR/ZATCA compliance.",
  path: "/solutions/general-retail",
});

const FEATURES = [
  {
    icon: "/icons/offline.png",
    title: "Works without internet",
    body: "Sell even when the internet goes down. Every sale, return, and discount is saved locally and syncs the moment you're back online.",
  },
  {
    icon: "/icons/inventory.png",
    title: "Inventory management",
    body: "Track stock by unit, carton, or kilogram. Get low-stock alerts before you run out. Set re-order levels per product.",
  },
  {
    icon: "/icons/accounting.png",
    title: "Khata ledger",
    body: "Record credit sales and track what every customer owes. Send WhatsApp reminders when payments are due.",
  },
  {
    icon: "/icons/fbr.png",
    title: "FBR compliance (PK)",
    body: "Every sale transmits to FBR in real time. POS-IRN generation, e-invoicing, and Annex-C export — fully automatic.",
  },
  {
    icon: "/icons/barcode.png",
    title: "Barcode & label printing",
    body: "Scan barcodes at checkout or print your own shelf labels for any product. Supports USB, Bluetooth, and network scanners.",
  },
  {
    icon: "/icons/report.png",
    title: "Daily & monthly reports",
    body: "Z-report at shift end, daily sales summary, top-selling products, and profit margin per item.",
  },
  {
    icon: "👥",
    title: "Multi-user access",
    body: "Cashier, supervisor, and owner roles. Cashiers can't see cost prices or delete sales without manager approval.",
  },
  {
    icon: "/icons/printer.png",
    title: "Thermal receipt printing",
    body: "Print to any 58mm or 80mm Bluetooth or USB thermal printer. Customize your receipt header, footer, and logo.",
  },
];

export default function GeneralRetailPage() {
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
      description="From a small kiryana in Lahore to a multi-branch grocery chain in Dubai — Tajir Point handles your counter, your stock, and your credit customers in one place."
      accentColor="#00d27a"
      features={FEATURES}
      ctaLabel="Start free — General Retail"
    />
  );
}

function SolutionPage({
  vertical,
  subtitle,
  headline,
  description,
  accentColor,
  features,
  ctaLabel,
}: {
  vertical: string;
  subtitle: string;
  headline: React.ReactNode;
  description: string;
  accentColor: string;
  features: { icon: string; title: string; body: string }[];
  ctaLabel: string;
}) {
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
          <div
            className="inline-flex items-center gap-2 text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-full border"
            style={{
              borderColor: `${accentColor}40`,
              color: accentColor,
              background: `${accentColor}12`,
            }}
          >
            {vertical}
          </div>
          <h1 className="text-[44px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            {headline}
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-muted)]">{subtitle}</p>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-[15px] font-semibold hover:opacity-90 transition-opacity"
              style={{ background: accentColor === "#00d27a" ? "var(--color-ink)" : accentColor }}
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
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6"
              >
                <div className="mb-3">
                  {f.icon.startsWith("/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.icon}
                      alt=""
                      width={52}
                      height={52}
                      className="w-[52px] h-[52px] object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{f.icon}</span>
                  )}
                </div>
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
            Set up in minutes. Your data, your language, your compliance — ready from day one.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              {ctaLabel} →
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
