import type { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/marketing/sections/Pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { faqSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — One Price, Every Module",
  description: "Transparent POS pricing for merchants in Pakistan, UAE, and Saudi Arabia. One flat rate per branch — POS, inventory, khata, storefront, and compliance included. 14-day free trial, no card needed.",
  path: "/pricing",
});

const FAQS = [
  {
    q: "Is there really no per-module fee?",
    a: "Yes. Every plan includes POS, inventory, khata ledger, storefront, reports, and all compliance features. You pay per branch, not per feature.",
  },
  {
    q: "What happens after the 14-day trial?",
    a: "Your data stays intact. You can choose a plan or continue on the free tier (1 branch, limited transactions). No credit card is required to start.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade or downgrade at any time. Changes take effect immediately and billing is prorated.",
  },
  {
    q: "Do you charge transaction fees?",
    a: "Never. We don't take a cut of your sales. JazzCash, 1Link, or any payment processor fees are between you and them — we charge nothing on top.",
  },
  {
    q: "What currencies do you accept?",
    a: "We bill in PKR for Pakistan, AED for UAE, and SAR for Saudi Arabia. Enterprise contracts can be settled in USD.",
  },
  {
    q: "Is the software available offline?",
    a: "Yes. Tajir Point works completely without internet — your POS, inventory, and khata keep running. Data syncs automatically the moment you're back online.",
  },
  {
    q: "Do you offer discounts for multiple branches?",
    a: "The Growth plan covers up to 5 branches at a flat rate. For 5+ branches, our Enterprise plan gives you unlimited branches at a negotiated price.",
  },
  {
    q: "What support is included?",
    a: "Starter gets email support. Growth gets priority chat. Enterprise gets a dedicated success manager and a custom SLA.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
      <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
        <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }]} />
      {/* Hero */}
      <section className="pt-20 pb-4 lg:pt-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Simple, transparent pricing
          </span>
          <h1 className="text-[44px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--color-ink)]">
            One price.
            <br />
            Every module.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[500px] mx-auto">
            No per-module up-sells. No transaction fees. Pay per branch and get everything — POS, inventory, khata, storefront, compliance, and more.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[13.5px] text-[var(--color-muted)] bg-[var(--color-bg-2)] border border-[var(--color-line)] rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] inline-block" />
            14-day free trial · No credit card required
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <Pricing />

      {/* Feature comparison */}
      <section className="py-20 border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-10 text-center">
            What's included
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--color-line)]">
                  <th className="text-start py-4 pr-6 font-semibold text-[var(--color-ink)] w-[40%]">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-ink)]">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-ink)] bg-[var(--color-ink)]/[0.03] rounded-t-lg">Growth</th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-ink)]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["POS (works without internet)", true, true, true],
                  ["Inventory management", true, true, true],
                  ["Khata / Digital ledger", true, true, true],
                  ["FBR / ZATCA compliance", true, true, true],
                  ["Storefront (subdomain)", true, true, true],
                  ["Custom domain", false, true, true],
                  ["Multi-branch management", false, "Up to 5", "Unlimited"],
                  ["Users", "2", "15", "Unlimited"],
                  ["Restaurant KDS", false, true, true],
                  ["Purchase orders & dispatch", false, true, true],
                  ["Advanced reports", false, true, true],
                  ["Single sign-on (SSO)", false, false, true],
                  ["Dedicated success manager", false, false, true],
                  ["Custom integrations", false, false, true],
                  ["On-premise option", false, false, true],
                  ["Migration assistance", false, false, true],
                ].map(([feature, starter, growth, enterprise]) => (
                  <tr key={feature as string} className="border-b border-[var(--color-line)] hover:bg-[var(--color-bg-2)]">
                    <td className="py-3.5 pr-6 text-[var(--color-ink)]">{feature as string}</td>
                    <td className="py-3.5 px-4 text-center">{renderCell(starter)}</td>
                    <td className="py-3.5 px-4 text-center bg-[var(--color-ink)]/[0.02]">{renderCell(growth)}</td>
                    <td className="py-3.5 px-4 text-center">{renderCell(enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="max-w-[760px] mx-auto">
            <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-12 text-center">
              Frequently asked questions
            </h2>
            <div className="flex flex-col divide-y divide-[var(--color-line)]">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="text-[16px] font-semibold text-[var(--color-ink)]">{faq.q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-bg-3)] flex items-center justify-center text-[var(--color-muted)] group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] text-[var(--color-muted)] leading-[1.65]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[var(--color-ink)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <h2 className="text-[32px] lg:text-[48px] font-extrabold tracking-[-0.035em] text-white">
            Still have questions?
          </h2>
          <p className="mt-4 text-[17px] text-white/60 max-w-[440px] mx-auto">
            Talk to our team and we'll help you find the right plan for your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Book a demo →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

function renderCell(val: boolean | string | undefined) {
  if (val === undefined) return null;
  if (val === true) {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[10px] font-bold mx-auto">
        ✓
      </span>
    );
  }
  if (val === false) {
    return <span className="text-[var(--color-muted-2)] text-lg leading-none">–</span>;
  }
  return <span className="text-[13px] font-medium text-[var(--color-ink)]">{val}</span>;
}
