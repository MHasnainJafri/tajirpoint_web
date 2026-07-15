import type { Metadata } from "next";
import Link from "next/link";
import { PillBadge } from "@/components/design/primitives";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Privacy — Your Data Belongs to You",
  description:
    "How Tajir Point handles your business data — merchant ownership, per-merchant isolation, regional data residency (AWS ap-south-1, me-south-1), and your right to deletion.",
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

const TH_CLASS =
  "text-start py-4 px-5 font-mono text-[11px] font-normal uppercase tracking-[1.5px] text-[var(--color-muted-3)]";

export default function DataPrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-[150px] lg:pb-20">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-7 lg:px-10">
          <PillBadge>Data Privacy</PillBadge>
          <h1 className="mt-6 max-w-[760px] text-[clamp(40px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            Your data is yours.
            <br />
            Always.
          </h1>
          <p className="mt-5 max-w-[520px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            We process your data to run your business — nothing more. Here's exactly what we
            collect, where we store it, who can access it, and how you get it back.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
            >
              Read our Privacy Policy →
            </Link>
            <span className="text-[var(--color-muted-3)]">·</span>
            <Link
              href="/data-security"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Data Security →
            </Link>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="mb-8 font-mono text-[12px] uppercase tracking-[2.5px] text-[var(--color-mint-2)]">
            Our commitments to you
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-white/[0.025] p-6 transition-colors hover:border-[var(--color-line-2)] hover:bg-white/[0.04]"
              >
                <div className="mb-3 text-3xl">{p.icon}</div>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--color-ink)]">{p.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data map table */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-2)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="mb-10">
            <h2 className="text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] lg:text-[36px]">
              What we store and why
            </h2>
            <p className="mt-3 max-w-[480px] text-[15px] text-[var(--color-muted)]">
              A plain-English map of every category of data we hold, who can see it, and how long we
              keep it.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[16px] border border-[var(--color-line)] bg-[var(--color-panel)]">
            <table className="w-full min-w-[720px] text-[14px]">
              <thead className="border-b border-[var(--color-line)] bg-white/[0.04]">
                <tr>
                  <th className={TH_CLASS}>Data category</th>
                  <th className={TH_CLASS}>Examples</th>
                  <th className={TH_CLASS}>Who can access</th>
                  <th className={TH_CLASS}>Retention</th>
                </tr>
              </thead>
              <tbody>
                {DATA_TYPES.map((row, i) => (
                  <tr
                    key={row.category}
                    className={
                      i < DATA_TYPES.length - 1 ? "border-b border-[var(--color-line)]" : ""
                    }
                  >
                    <td className="px-5 py-4 font-semibold text-[var(--color-ink)]">
                      {row.category}
                    </td>
                    <td className="px-5 py-4 text-[var(--color-muted)]">{row.examples}</td>
                    <td className="px-5 py-4 text-[var(--color-muted)]">{row.who}</td>
                    <td className="px-5 py-4 text-[var(--color-muted)]">{row.retention}</td>
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
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] lg:text-[36px]">
                Data stays in your region.
              </h2>
              <p className="text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
                We don't move your data across borders without your explicit consent. All
                infrastructure is hosted on AWS, whose region-specific data centres are certified to
                ISO 27001.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  flag: "🇵🇰",
                  country: "Pakistan",
                  region: "AWS ap-south-1",
                  location: "Mumbai, India",
                  note: "Closest available AWS region",
                },
                {
                  flag: "🇦🇪",
                  country: "UAE",
                  region: "AWS me-south-1",
                  location: "Bahrain",
                  note: "In-region Middle East storage",
                },
                {
                  flag: "🇸🇦",
                  country: "Saudi Arabia",
                  region: "AWS me-south-1",
                  location: "Bahrain",
                  note: "ZATCA-compliant infrastructure",
                },
              ].map((r) => (
                <div
                  key={r.country}
                  className="flex items-start gap-4 rounded-[16px] border border-[var(--color-line)] bg-white/[0.025] p-5"
                >
                  <span className="shrink-0 text-2xl">{r.flag}</span>
                  <div>
                    <div className="text-[14.5px] font-bold text-[var(--color-ink)]">
                      {r.country}
                    </div>
                    <div className="mt-0.5 font-mono text-[13px] text-[var(--color-mint-2)]">
                      {r.region} · {r.location}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[var(--color-muted-3)]">{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your rights */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-2)] py-16">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="mb-6 text-[24px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
            Exercise your rights
          </h2>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                action: "Export your data",
                desc: "Download everything in CSV or JSON from your dashboard at any time.",
              },
              {
                action: "Delete your account",
                desc: "Request full deletion from Settings → Account → Delete. We complete it in 30 days.",
              },
              {
                action: "Contact privacy team",
                desc: "Email privacy@tajirpoint.com for access requests, corrections, or complaints.",
              },
            ].map((r) => (
              <div
                key={r.action}
                className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-panel)] p-5"
              >
                <div className="mb-1 text-[14.5px] font-bold text-[var(--color-ink)]">
                  {r.action}
                </div>
                <div className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
                  {r.desc}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[13.5px] text-[var(--color-muted)]">
            Full legal detail is in our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            . For security-related questions, see our{" "}
            <Link
              href="/data-security"
              className="font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
            >
              Data Security
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
    </div>
  );
}
