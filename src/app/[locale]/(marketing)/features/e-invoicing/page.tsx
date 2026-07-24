import type { Metadata } from "next";
import {
  ReceiptText,
  CheckCircle2,
  Sparkles,
  Zap,
  QrCode,
  Percent,
  ChevronDown,
  ShoppingBag,
  Cross,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildMetadata({
  title: "E-Invoicing & Fiscal Compliance — Built Into Checkout",
  description:
    "E-invoicing, VAT/GST and fiscal receipts for the regions you operate in. Tajir Point reports invoices in real time, prints QR receipts, and keeps audit-ready records for every transaction.",
  path: "/features/e-invoicing",
});

/** The proof points from the design's "how Tajir Point solves it" column. */
const SOLUTION_POINTS = [
  "Real-time invoice submission where a market requires it",
  "QR codes on printed receipts",
  "VAT / GST capture and reporting",
  "Withholding tax with certificates",
  "Region-aware tax structures",
  "Audit-ready records for every transaction",
];

const BUILT_IN_POINTS = [
  {
    icon: Zap,
    title: "Real-time",
    body: "Reported as you print",
  },
  {
    icon: QrCode,
    title: "QR receipts",
    body: "Verifiable at a glance",
  },
  {
    icon: Percent,
    title: "Tax handled",
    body: "VAT/GST and withholding",
  },
];

const AUDIENCES = [
  { icon: ShoppingBag, label: "Retail", href: "/solutions/general-retail" },
  { icon: Cross, label: "Pharmacies", href: "/solutions" },
  { icon: Truck, label: "Distribution", href: "/solutions/distributors" },
] as const;

const FAQS = [
  {
    question: "Which regions are supported?",
    answer:
      "Compliance is configured per market. Talk to us about the specific countries you operate in.",
  },
  {
    question: "Are receipts verifiable?",
    answer: "Yes — a QR code on each receipt lets customers and inspectors verify it.",
  },
];

export default function EInvoicingFeaturePage() {
  return (
    <>
      <JsonLd schema={faqSchema(FAQS)} />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-[70px] pt-[140px] md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 62%)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-[44px] lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Link
              href="/solutions"
              className="mb-7 inline-flex items-center gap-2 font-mono text-[12px] tracking-[1.5px] text-[var(--color-muted-2)] transition-colors hover:text-[var(--color-mint-2)]"
            >
              ← All solutions
            </Link>

            <div>
              <PillBadge>E-Invoicing</PillBadge>
            </div>

            <span className="mt-6 flex h-[56px] w-[56px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.22)] bg-[var(--color-mint-soft)]">
              <ReceiptText className="h-7 w-7 text-[var(--color-mint-2)]" strokeWidth={1.7} />
            </span>

            <h1 className="mt-[18px] max-w-[620px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Fiscal compliance,
              <br />
              built into checkout.
            </h1>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
              E-invoicing, VAT/GST and fiscal receipts for the regions you operate in — part of the
              sale, not an afterthought.
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

          {/* Invoice mock — always dark, per the showcase convention. */}
          <div data-reveal data-reveal-delay={120} className="flex justify-center">
            <div className="on-dark w-full max-w-[420px] rounded-[18px] border border-[var(--color-line)] bg-[#060d0a] p-[11px] shadow-[0_30px_64px_rgba(0,0,0,.45)]">
              <div className="flex min-h-[260px] flex-col gap-3 rounded-[11px] bg-[var(--color-panel)] p-[18px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--color-mint-soft)]">
                    <ReceiptText
                      className="h-[17px] w-[17px] text-[var(--color-mint-2)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[14px] font-extrabold text-[var(--color-ink)]">
                    Invoice · #10241
                  </span>
                </div>

                {[
                  { label: "Status", value: "Reported", tone: "text-[var(--color-mint-2)]" },
                  { label: "VAT", value: "Rs 3,980", tone: "text-[var(--color-ink)]" },
                  { label: "QR receipt", value: "Printed", tone: "text-[var(--color-mint-2)]" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between rounded-[9px] border border-[var(--color-line-soft)] bg-[var(--surface-1)] p-3 text-[12px]"
                  >
                    <span className="text-[var(--color-muted-2)]">{row.label}</span>
                    <span className={`font-extrabold ${row.tone}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ─────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-5 py-[80px] md:px-10">
        <div data-reveal className="mx-auto max-w-[900px] text-center">
          <div className="inline-block rounded-full bg-[var(--surface-2)] px-[14px] py-[6px] font-mono text-[12px] tracking-[2px] text-[var(--color-muted-2)]">
            THE PROBLEM
          </div>
          <h2 className="mt-4 text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.025em]">
            Tax rules differ by country and change often
          </h2>
          <p className="mt-[14px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            Bolting compliance on after the fact is painful and risky. Rules shift, formats change,
            and a rejected invoice is a real problem.
          </p>
        </div>
      </section>

      {/* ── How we solve it ─────────────────────────────────────────── */}
      <section className="px-5 pb-[80px] md:px-10">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-[44px] lg:grid-cols-2">
          <div data-reveal>
            <div className="inline-block rounded-full border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] px-[14px] py-[6px] font-mono text-[12px] tracking-[2px] text-[var(--color-mint-2)]">
              HOW TAJIR POINT SOLVES IT
            </div>
            <h2 className="mt-4 text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.025em]">
              Compliant the moment you ring it up
            </h2>

            <ul className="mt-[22px] flex flex-col gap-[14px]">
              {SOLUTION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-[2px] h-5 w-5 shrink-0 text-[var(--color-mint-2)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-[15px] font-semibold leading-[1.5] text-[var(--color-ink-3)]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Scope note — the design calls this out so nobody reads it as a certification. */}
            <div className="mt-5 inline-flex items-start gap-[9px] rounded-[999px] border border-[var(--color-line)] bg-[var(--surface-2)] px-4 py-2 text-[13px] font-semibold leading-[1.5] text-[var(--color-amber)]">
              <Sparkles className="mt-[2px] h-[15px] w-[15px] shrink-0" strokeWidth={1.8} />
              Markets served include EU, UAE VAT and Saudi ZATCA — configured per region, not a
              certification we hold.
            </div>
          </div>

          <div
            data-reveal
            data-reveal-delay={100}
            className="rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-1)] p-[30px]"
          >
            <div className="mb-4 text-[14px] font-extrabold">Built into the sale</div>
            <div className="flex flex-col gap-[10px]">
              {BUILT_IN_POINTS.map(({ icon: PointIcon, title, body }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-[14px]"
                >
                  <PointIcon
                    className="h-5 w-5 shrink-0 text-[var(--color-mint-2)]"
                    strokeWidth={1.7}
                  />
                  <div>
                    <div className="text-[14px] font-bold">{title}</div>
                    <div className="text-[12.5px] text-[var(--color-muted-3)]">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who this helps ──────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-2)] px-5 py-[70px] text-center md:px-10">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.025em]">
            Who this helps most
          </h2>
          <div data-reveal className="mt-[26px] flex flex-wrap justify-center gap-[14px]">
            {AUDIENCES.map(({ icon: AudienceIcon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-[9px] rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-[18px] py-3 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)] hover:shadow-[0_18px_40px_rgba(0,0,0,.18)]"
              >
                <AudienceIcon
                  className="h-[18px] w-[18px] text-[var(--color-mint-2)]"
                  strokeWidth={1.8}
                />
                <span className="text-[14px] font-bold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────────────── */}
      <section className="px-5 py-[70px] md:px-10">
        <div className="mx-auto max-w-[820px]">
          <h2 className="text-center text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.025em]">
            Questions
          </h2>

          <div data-reveal className="mt-[26px]">
            {FAQS.map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className="group border-b border-[var(--color-line-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-[var(--color-muted-3)] transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.8}
                  />
                </summary>
                <p className="mb-5 text-[15px] leading-[1.65] text-[var(--color-muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-5 pb-[110px] pt-5 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            Start free 14-day trial — no card required
          </h2>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free trial <span>→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
