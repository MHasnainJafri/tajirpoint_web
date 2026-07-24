import type { Metadata } from "next";
import {
  WifiOff,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ShoppingBag,
  Utensils,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildMetadata({
  title: "Offline-First POS — Keep Selling When the Internet Drops",
  description:
    "Power cuts and dead connections should never stop a sale. Tajir Point bills offline, writes every sale to the device first, and syncs automatically — with no duplicates and no lost receipts.",
  path: "/features/offline",
});

/** The proof points from the design's "how TajirPoint solves it" column. */
const SOLUTION_POINTS = [
  "Bill customers exactly as normal with no connection",
  "Every sale written safely to the device first",
  "Automatic sync the moment you are back online",
  "No duplicate sales, no lost receipts",
  "Works across web, desktop and Android",
  "Clear on-screen status so staff always know",
];

const SYNC_GUARANTEES = [
  {
    icon: HardDrive,
    title: "Saved on device",
    body: "Nothing depends on the network",
  },
  {
    icon: RefreshCw,
    title: "Auto reconcile",
    body: "Merges cleanly when back online",
  },
  {
    icon: ShieldCheck,
    title: "No duplicates",
    body: "Each sale posts exactly once",
  },
];

const AUDIENCES = [
  { icon: ShoppingBag, label: "Retail", href: "/solutions/general-retail" },
  { icon: Utensils, label: "Restaurant", href: "/solutions/restaurants" },
  { icon: Truck, label: "Distribution", href: "/solutions/distributors" },
] as const;

const FAQS = [
  {
    question: "What if two registers were offline at once?",
    answer:
      "Each device keeps its own queue and syncs independently; the server merges them without duplicates.",
  },
  {
    question: "Is there a time limit offline?",
    answer: "No. Sell offline as long as you need — everything syncs when a connection returns.",
  },
];

export default function OfflineFeaturePage() {
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
              <PillBadge>Offline-First</PillBadge>
            </div>

            <span className="mt-6 flex h-[56px] w-[56px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.22)] bg-[var(--color-mint-soft)]">
              <WifiOff className="h-7 w-7 text-[var(--color-mint-2)]" strokeWidth={1.7} />
            </span>

            <h1 className="mt-[18px] max-w-[620px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Keep selling when
              <br />
              the internet drops.
            </h1>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
              Power cuts and dead connections should never stop a sale. Tajir Point keeps billing
              and syncs safely later.
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
                    <WifiOff
                      className="h-[17px] w-[17px] text-[var(--color-mint-2)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[14px] font-extrabold text-[var(--color-ink)]">
                    POS · Offline
                  </span>
                </div>

                {[
                  { label: "Connection", value: "Offline", tone: "text-[var(--color-amber)]" },
                  { label: "Queued sales", value: "6", tone: "text-[var(--color-ink)]" },
                  {
                    label: "Will sync",
                    value: "Automatically",
                    tone: "text-[var(--color-mint-2)]",
                  },
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
            Most cloud POS freezes the moment it loses signal
          </h2>
          <p className="mt-[14px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            A dropped connection at the counter means a queue that cannot move. For many shops that
            is a daily reality, not an edge case.
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
              Sell now, sync automatically
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
          </div>

          <div
            data-reveal
            data-reveal-delay={100}
            className="rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-1)] p-[30px]"
          >
            <div className="mb-4 text-[14px] font-extrabold">How the sync stays safe</div>
            <div className="flex flex-col gap-[10px]">
              {SYNC_GUARANTEES.map(({ icon: GuaranteeIcon, title, body }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-[14px]"
                >
                  <GuaranteeIcon
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
            14-day free trial. No card needed.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Pull the plug on your test till and watch it keep billing — then watch it sync itself
            back.
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
