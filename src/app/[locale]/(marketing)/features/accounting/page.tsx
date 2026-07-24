import type { Metadata } from "next";
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Banknote,
  Download,
  ChevronDown,
  ShoppingBag,
  Truck,
  CalendarCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildMetadata({
  title: "Accounting — Books That Keep Themselves",
  description:
    "A real double-entry ledger, posted automatically from everything that happens in your shop. Trial balance, P&L, balance sheet, bank reconciliation and accountant-ready exports — with no manual journal entries.",
  path: "/features/accounting",
});

/** The proof points from the design's "how Tajir Point solves it" column. */
const SOLUTION_POINTS = [
  "Real double-entry ledger from every sale, purchase, expense and payroll run",
  "Chart of accounts, trial balance, P&L, balance sheet and cash flow",
  "Bank statement import and reconciliation",
  "Cash drawers, safes and petty cash with variance tracking",
  "Multi-branch roll-ups",
  "Accountant-ready exports",
];

const ACCOUNTANT_GETS = [
  {
    icon: FileCheck,
    title: "Clean ledgers",
    body: "No manual journal entry",
  },
  {
    icon: Banknote,
    title: "Reconciled cash",
    body: "Drawers and safes matched",
  },
  {
    icon: Download,
    title: "One-click export",
    body: "Straight into their tools",
  },
];

const AUDIENCES = [
  { icon: ShoppingBag, label: "Retail", href: "/solutions/general-retail" },
  { icon: Truck, label: "Distribution", href: "/solutions/distributors" },
  { icon: CalendarCheck, label: "Services", href: "/solutions/services" },
] as const;

const FAQS = [
  {
    question: "Do I need to know accounting?",
    answer:
      "No. You run your shop; the books post themselves. Your accountant gets clean, ready ledgers.",
  },
  {
    question: "Can I connect QuickBooks?",
    answer: "Yes — the QuickBooks Online extension pushes journals straight across.",
  },
];

export default function AccountingFeaturePage() {
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
              <PillBadge>Accounting</PillBadge>
            </div>

            <span className="mt-6 flex h-[56px] w-[56px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.22)] bg-[var(--color-mint-soft)]">
              <Calculator className="h-7 w-7 text-[var(--color-mint-2)]" strokeWidth={1.7} />
            </span>

            <h1 className="mt-[18px] max-w-[620px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Books that keep
              <br />
              themselves.
            </h1>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
              A real double-entry ledger, posted automatically from everything that happens in your
              shop.
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

          {/* Device mock — always dark, per the showcase convention. */}
          <div data-reveal data-reveal-delay={120} className="flex justify-center">
            <div className="on-dark w-full max-w-[420px] rounded-[18px] border border-[var(--color-line)] bg-[#060d0a] p-[11px] shadow-[0_30px_64px_rgba(0,0,0,.45)]">
              <div className="flex min-h-[260px] flex-col gap-3 rounded-[11px] bg-[var(--color-panel)] p-[18px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--color-mint-soft)]">
                    <Calculator
                      className="h-[17px] w-[17px] text-[var(--color-mint-2)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[14px] font-extrabold text-[var(--color-ink)]">
                    This month
                  </span>
                </div>

                {[
                  { label: "Revenue", value: "Rs 8,412,000", tone: "text-[var(--color-mint-2)]" },
                  { label: "Expenses", value: "Rs 5,134,000", tone: "text-[var(--color-ink)]" },
                  { label: "Net profit", value: "+18.4%", tone: "text-[var(--color-mint-2)]" },
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
            The shopkeeper sells; the accountant reconstructs
          </h2>
          <p className="mt-[14px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            By month-end, nobody is quite sure what really happened. Receipts are missing, and the
            accountant rebuilds the story from fragments.
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
              Every transaction posts itself
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

            {/* The design's amber "reassurance" chip. */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--surface-2)] px-4 py-2 text-[13px] font-bold text-[var(--color-amber)]">
              <Sparkles className="h-[15px] w-[15px] shrink-0" strokeWidth={1.8} />
              The shopkeeper never touches a journal entry.
            </div>
          </div>

          <div
            data-reveal
            data-reveal-delay={100}
            className="rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-1)] p-[30px]"
          >
            <div className="mb-4 text-[14px] font-extrabold">Your accountant gets</div>
            <div className="flex flex-col gap-[10px]">
              {ACCOUNTANT_GETS.map(({ icon: DeliverableIcon, title, body }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-[14px]"
                >
                  <DeliverableIcon
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
          <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Run a week of real sales and watch the trial balance, P&amp;L and cash position build
            themselves.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free trial <span>→</span>
            </MintButton>
            <GhostButton href="/extensions">Browse extensions</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
