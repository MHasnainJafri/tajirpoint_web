import type { Metadata } from "next";
import {
  Truck,
  CheckCircle2,
  Sparkles,
  Wallet,
  Fuel,
  TrendingUp,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildMetadata({
  title: "Van Sales & Route Dispatch — Turn Every Truck Into a Mobile Warehouse",
  description:
    "Van sales, route dispatch and day-end reconciliation for distributors who sell on the move. Tajir Point loads stock onto a van, collects cash door to door, and balances every route at night.",
  path: "/features/van-sales",
});

/** The proof points from the design's "how Tajir Point solves it" column. */
const SOLUTION_POINTS = [
  "Load stock onto a van as a mobile warehouse",
  "Route selling and door-to-door cash collection",
  "Day-end reconciliation of cash, goods and fuel",
  "Track what each driver still owes",
  "Per-trip and per-route profit",
  "Returns and damages handled on the route",
];

const DAY_END = [
  {
    icon: Wallet,
    title: "Cash reconciled",
    body: "Matched to goods sold",
  },
  {
    icon: Fuel,
    title: "Fuel logged",
    body: "Costed against the route",
  },
  {
    icon: TrendingUp,
    title: "Route profit",
    body: "Margin per trip, per driver",
  },
];

const AUDIENCES = [
  { icon: Truck, label: "Distribution", href: "/solutions/distributors" },
  { icon: ShoppingBag, label: "Retail", href: "/solutions/general-retail" },
] as const;

const FAQS = [
  {
    question: "Do drivers need internet on the route?",
    answer: "No. The mobile app sells offline and reconciles when it reconnects.",
  },
  {
    question: "Can I price differently per customer?",
    answer: "Yes — tiered and bulk pricing apply automatically on the route.",
  },
];

export default function VanSalesFeaturePage() {
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
              <PillBadge>Van Sales</PillBadge>
            </div>

            <span className="mt-6 flex h-[56px] w-[56px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.22)] bg-[var(--color-mint-soft)]">
              <Truck className="h-7 w-7 text-[var(--color-mint-2)]" strokeWidth={1.7} />
            </span>

            <h1 className="mt-[18px] max-w-[620px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Turn every truck into
              <br />a mobile warehouse.
            </h1>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
              Van sales, route dispatch and day-end reconciliation — for distributors who sell on
              the move.
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

          {/* Van mock — always dark, per the showcase convention. */}
          <div data-reveal data-reveal-delay={120} className="flex justify-center">
            <div className="on-dark w-full max-w-[420px] rounded-[18px] border border-[var(--color-line)] bg-[#060d0a] p-[11px] shadow-[0_30px_64px_rgba(0,0,0,.45)]">
              <div className="flex min-h-[260px] flex-col gap-3 rounded-[11px] bg-[var(--color-panel)] p-[18px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--color-mint-soft)]">
                    <Truck
                      className="h-[17px] w-[17px] text-[var(--color-mint-2)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[14px] font-extrabold text-[var(--color-ink)]">
                    Route North
                  </span>
                </div>

                {[
                  // Sold − collected = owed; keep the three in step if edited.
                  { label: "Sold", value: "Rs 1,154,000", tone: "text-[var(--color-mint-2)]" },
                  {
                    label: "Cash collected",
                    value: "Rs 1,092,000",
                    tone: "text-[var(--color-ink)]",
                  },
                  { label: "Driver owes", value: "Rs 62,000", tone: "text-[var(--color-amber)]" },
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
            Load a van, send it out, and hope it balances
          </h2>
          <p className="mt-[14px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            Cash, goods and fuel rarely match at night, and profit per route is a guess. Almost no
            mid-market POS handles this at all.
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
              Every route accounted for
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

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--surface-2)] px-4 py-2 text-[13px] font-bold text-[var(--color-amber)]">
              <Sparkles className="h-[15px] w-[15px] shrink-0" strokeWidth={1.8} />
              Almost no mid-market POS does this — we do.
            </div>
          </div>

          <div
            data-reveal
            data-reveal-delay={100}
            className="rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-1)] p-[30px]"
          >
            <div className="mb-4 text-[14px] font-extrabold">At day end</div>
            <div className="flex flex-col gap-[10px]">
              {DAY_END.map(({ icon: DayEndIcon, title, body }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-[14px]"
                >
                  <DayEndIcon
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
            Load one van, run one route, and see the day balance itself at night.
          </p>
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
