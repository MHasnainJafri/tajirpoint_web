import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Privacy — Your Data Belongs to You",
  description: "How Tajir Point handles your business data — merchant ownership, per-merchant isolation, regional data residency (AWS ap-south-1, me-south-1), and your right to deletion.",
  path: "/data-privacy",
});

const PRINCIPLES = [
  {
    icon: "🔒",
    title: "You own your data",
    body: "Every transaction, customer record, and report belongs to you — not us. We are a processor, never a controller of your business data. Export everything, any time.",
  },
  {
    icon: "🏗️",
    title: "Isolated per merchant",
    body: "Your data is stored in a logically isolated environment. No other merchant can access your records. Multi-tenant isolation is enforced at the database and API layer.",
  },
  {
    icon: "📍",
    title: "Data residency",
    body: "Pakistan merchants: data stored in AWS ap-south-1 (Mumbai). UAE & Saudi: data stored in AWS me-south-1 (Bahrain). Your data never leaves your region without consent.",
  },
  {
    icon: "🗑️",
    title: "Right to deletion",
    body: "Request full deletion of your account and all associated data at any time. We complete verified deletion within 30 days. Regulatory records are retained only as legally required.",
  },
  {
    icon: "📦",
    title: "Full data portability",
    body: "Export your entire dataset — products, customers, transactions, and reports — in CSV, Excel, or JSON at any time. No lock-in, no extraction fees.",
  },
  {
    icon: "👁️",
    title: "No data selling",
    body: "We do not sell, share, or monetize your business data. We don't use your transaction data to train AI models or benchmark competitors without explicit consent.",
  },
];

const DATA_TYPES = [
  {
    category: "Business data",
    examples: "Products, prices, inventory, purchase orders, suppliers",
    who: "You only",
    retention: "Until deletion requested",
  },
  {
    category: "Transaction records",
    examples: "Sales, returns, payments, receipts",
    who: "You + regulators (FBR/ZATCA)",
    retention: "7 years (legal requirement)",
  },
  {
    category: "Customer data",
    examples: "Names, phone numbers, khata balances",
    who: "You only",
    retention: "Until deletion requested",
  },
  {
    category: "Account data",
    examples: "Email, business name, billing info",
    who: "Tajir Point (service delivery)",
    retention: "Account lifetime + 90 days",
  },
  {
    category: "Usage analytics",
    examples: "Feature interactions, screen views",
    who: "Tajir Point (anonymised)",
    retention: "24 months",
  },
];

export default function DataPrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Data Privacy
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)] max-w-[760px]">
            Your data is yours.
            <br />
            Always.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            We process your data to run your business — nothing more. Here's exactly what we collect, where we store it, who can access it, and how you get it back.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/privacy" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2">
              Read our Privacy Policy →
            </Link>
            <span className="text-[var(--color-muted-2)]">·</span>
            <Link href="/data-security" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">
              Data Security →
            </Link>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--color-muted-2)] mb-8">
            Our commitments to you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="text-[15px] font-bold text-[var(--color-ink)] mb-2">{p.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data map table */}
      <section className="py-20 lg:py-24 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="mb-10">
            <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
              What we store and why
            </h2>
            <p className="mt-3 text-[15px] text-[var(--color-muted)] max-w-[480px]">
              A plain-English map of every category of data we hold, who can see it, and how long we keep it.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[16px] border border-[var(--color-line)]">
            <table className="w-full text-[14px] bg-white">
              <thead className="bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-start py-3.5 px-5 font-semibold text-[var(--color-ink)] text-[12px] tracking-[0.06em] uppercase">Data category</th>
                  <th className="text-start py-3.5 px-5 font-semibold text-[var(--color-ink)] text-[12px] tracking-[0.06em] uppercase">Examples</th>
                  <th className="text-start py-3.5 px-5 font-semibold text-[var(--color-ink)] text-[12px] tracking-[0.06em] uppercase">Who can access</th>
                  <th className="text-start py-3.5 px-5 font-semibold text-[var(--color-ink)] text-[12px] tracking-[0.06em] uppercase">Retention</th>
                </tr>
              </thead>
              <tbody>
                {DATA_TYPES.map((row, i) => (
                  <tr key={row.category} className={i < DATA_TYPES.length - 1 ? "border-b border-[var(--color-line)]" : ""}>
                    <td className="py-4 px-5 font-semibold text-[var(--color-ink)]">{row.category}</td>
                    <td className="py-4 px-5 text-[var(--color-muted)]">{row.examples}</td>
                    <td className="py-4 px-5 text-[var(--color-muted)]">{row.who}</td>
                    <td className="py-4 px-5 text-[var(--color-muted)]">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Data residency map */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-4">
                Data stays in your region.
              </h2>
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.65]">
                We don't move your data across borders without your explicit consent. All infrastructure is hosted on AWS in region-specific data centres certified to ISO 27001.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { flag: "🇵🇰", country: "Pakistan", region: "AWS ap-south-1", location: "Mumbai, India", note: "Closest available AWS region" },
                { flag: "🇦🇪", country: "UAE", region: "AWS me-south-1", location: "Bahrain", note: "In-region Middle East storage" },
                { flag: "🇸🇦", country: "Saudi Arabia", region: "AWS me-south-1", location: "Bahrain", note: "ZATCA-compliant infrastructure" },
              ].map((r) => (
                <div key={r.country} className="flex items-start gap-4 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                  <span className="text-2xl shrink-0">{r.flag}</span>
                  <div>
                    <div className="font-bold text-[14.5px] text-[var(--color-ink)]">{r.country}</div>
                    <div className="text-[13px] text-[var(--color-muted)] font-mono mt-0.5">{r.region} · {r.location}</div>
                    <div className="text-[12px] text-[var(--color-muted-2)] mt-0.5">{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your rights */}
      <section className="py-16 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[24px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)] mb-6">Exercise your rights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { action: "Export your data", desc: "Download everything in CSV or JSON from your dashboard at any time." },
              { action: "Delete your account", desc: "Request full deletion from Settings → Account → Delete. We complete it in 30 days." },
              { action: "Contact privacy team", desc: "Email privacy@tajirpoint.com for access requests, corrections, or complaints." },
            ].map((r) => (
              <div key={r.action} className="rounded-[16px] border border-[var(--color-line)] bg-white p-5">
                <div className="font-bold text-[14.5px] text-[var(--color-ink)] mb-1">{r.action}</div>
                <div className="text-[13.5px] text-[var(--color-muted)]">{r.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-[13.5px] text-[var(--color-muted)]">
            Full legal detail is in our{" "}
            <Link href="/privacy" className="text-[var(--color-mint)] font-semibold hover:underline underline-offset-2">Privacy Policy</Link>.
            For security-related questions, see our{" "}
            <Link href="/data-security" className="text-[var(--color-mint)] font-semibold hover:underline underline-offset-2">Data Security</Link> page.
          </p>
        </div>
      </section>
    </main>
  );
}
