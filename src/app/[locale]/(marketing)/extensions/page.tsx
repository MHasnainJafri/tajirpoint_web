import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Extensions — Payments, Integrations & More",
  description: "Extend Tajir Point with JazzCash, FBR e-invoicing, WhatsApp receipts, QuickBooks, and more. One-click integrations for merchants in Pakistan, UAE, and Saudi Arabia.",
  path: "/extensions",
});

// Server-side so the bundle stays clean and there's no CORS.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

type Extension = {
  slug: string;
  name: string;
  category: string;
  category_label: string;
  tagline: string;
  description: string;
  icon_url: string;
  is_free: boolean;
  features: string[];
};

// Live catalog from the backend — only extensions enabled in the product show
// up here, so toggling one off in the DB removes it from this page too.
async function getExtensions(): Promise<Extension[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/extensions/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results ?? []) as Extension[];
  } catch {
    return [];
  }
}

function initials(name: string): string {
  return name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "EX";
}

const COMING_SOON_PAYMENTS = [
  { name: "Stripe", sub: "Card-present & online" },
  { name: "1Link", sub: "Pakistan interbank" },
  { name: "Easypaisa", sub: "PK mobile wallet" },
  { name: "HBL Konnect", sub: "PK digital wallet" },
  { name: "STC Pay", sub: "Saudi Arabia" },
  { name: "mada", sub: "Saudi debit network" },
];

const INTEGRATIONS = [
  { name: "QuickBooks Online", sub: "Accounting sync", icon: "QB" },
  { name: "Shopify & Daraz", sub: "Online storefront sync", icon: "S" },
  { name: "Google Maps", sub: "Location & delivery", icon: "G" },
  { name: "Amazon SES", sub: "Transactional email", icon: "A" },
  { name: "Slack & Webhooks", sub: "Custom notifications", icon: "⚡" },
  { name: "Zapier", sub: "No-code automation", icon: "Z" },
];

export default async function ExtensionsPage() {
  const extensions = await getExtensions();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Extensions
          </span>
          <h1 className="text-[44px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)] max-w-[800px]">
            Plug in what
            <br />
            your business needs.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            Payments, compliance, messaging, and third-party integrations — install in one click, no developer needed.
          </p>
        </div>
      </section>

      {/* Available extensions — live from the backend catalog */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--color-muted-2)] mb-8">
            Available now
          </h2>
          {extensions.length === 0 ? (
            <p className="text-[15px] text-[var(--color-muted)]">
              Our extension catalog is loading — please check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {extensions.map((ext) => (
                <article
                  key={ext.slug}
                  className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 lg:p-8 flex flex-col hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center text-[12px] font-extrabold shrink-0 bg-[var(--color-ink)] text-[var(--color-mint)]">
                        {initials(ext.name)}
                      </div>
                      <div>
                        <div className="font-extrabold text-[17px] text-[var(--color-ink)]">{ext.name}</div>
                        <div className="text-[12px] text-[var(--color-muted)]">{ext.category_label}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-mint)]/15 text-[#009955]">
                      Live
                    </span>
                  </div>

                  {ext.tagline && (
                    <p className="text-[14.5px] font-semibold text-[var(--color-ink)] mb-2 leading-[1.4]">{ext.tagline}</p>
                  )}
                  <p className="text-[14px] text-[var(--color-muted)] leading-[1.65] flex-1">{ext.description}</p>

                  {ext.features?.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-[var(--color-line)] flex flex-wrap gap-1.5">
                      {ext.features.map((f) => (
                        <span
                          key={f}
                          className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-3)]"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[8px] font-bold shrink-0">✓</span>
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5">
                    <a
                      href="https://dashboard.tajirpoint.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
                    >
                      Install {ext.name} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming soon payments */}
      <section className="py-20 lg:py-24 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="mb-10">
            <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
              Payments — coming soon
            </h2>
            <p className="mt-3 text-[15.5px] text-[var(--color-muted)] max-w-[480px]">
              More payment methods are in active development. Let us know which one you need first.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COMING_SOON_PAYMENTS.map((p) => (
              <div
                key={p.name}
                className="rounded-[16px] border border-[var(--color-line)] bg-white p-4 flex flex-col gap-1 opacity-70"
              >
                <div className="text-[14px] font-bold text-[var(--color-ink)]">{p.name}</div>
                <div className="text-[12px] text-[var(--color-muted)]">{p.sub}</div>
                <div className="mt-1 text-[11px] font-medium text-[var(--color-muted-2)] border border-[var(--color-line)] rounded-full px-2 py-0.5 self-start">Soon</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="text-[13.5px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
            >
              Vote for your payment method →
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] lg:text-[40px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] leading-[1.1]">
                Connect your
                <br />
                existing tools.
              </h2>
              <p className="mt-4 text-[15.5px] text-[var(--color-muted)] leading-[1.65] max-w-[420px]">
                Tajir Point integrates with the tools you already use — from accounting software to e-commerce platforms. Data flows automatically, no manual exports.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
              >
                Request an integration →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEGRATIONS.map((int) => (
                <div
                  key={int.name}
                  className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-4 flex flex-col gap-2"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-[var(--color-bg-3)] flex items-center justify-center text-[13px] font-extrabold text-[var(--color-ink)]">
                    {int.icon}
                  </div>
                  <div className="text-[13.5px] font-bold text-[var(--color-ink)] leading-tight">{int.name}</div>
                  <div className="text-[12px] text-[var(--color-muted)]">{int.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
