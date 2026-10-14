import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRightLeft, Gift, Languages, MonitorSmartphone, WifiOff } from "lucide-react";
import {
  CtaPanel,
  Eyebrow,
  GhostButton,
  MintButton,
  PillBadge,
} from "@/components/design/primitives";
import { legal, siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "About TajirPoint",
    description:
      "TajirPoint connects point of sale, inventory, customer credit and accounting for stores, restaurants and distributors. Available on web, desktop and Android.",
    path: "/about",
    locale,
  });
}

const FACTS = [
  {
    icon: MonitorSmartphone,
    title: "Web, Windows and Android",
    body: "Use it in the browser, on a Windows desktop or on an Android phone or tablet — your data stays in sync.",
  },
  {
    icon: Languages,
    title: "English, Urdu and Arabic",
    body: "Your team can work in the language they are most comfortable with.",
  },
  {
    icon: WifiOff,
    title: "Keeps selling offline",
    body: "If the internet drops, the point of sale keeps recording sales and syncs them when you are back online.",
  },
  {
    icon: Gift,
    title: "Light plan free for 3 months",
    body: "Start on the Light plan at no cost for your first 3 months, then choose the plan that fits.",
  },
  {
    icon: ArrowRightLeft,
    title: "Help moving from your old POS",
    body: "Already using another POS? We help you move your data across from your old system.",
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang="en" dir="ltr">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-14 pt-[clamp(48px,8vw,96px)] text-center sm:px-7 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[min(1100px,200vw)] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.12),transparent 60%)",
          }}
        />

        <PillBadge>About us</PillBadge>

        <h1 className="relative mx-auto mt-6 max-w-[860px] text-[clamp(34px,5.4vw,64px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-[var(--color-ink)]">
          A simple, honest system for businesses that work hard.
        </h1>

        <p className="relative mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.65] text-[var(--color-body)]">
          {legal.product} is a point of sale and business system for small and medium businesses —
          shops, restaurants, pharmacies and distributors. It is built in {legal.country} by{" "}
          {legal.operator}.
        </p>
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-4 py-[clamp(64px,10vw,110px)] sm:px-7 md:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2
              data-reveal
              className="mt-4 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]"
            >
              Started in March 2025, in {legal.city}.
            </h2>
            <div
              data-reveal
              className="mt-5 space-y-4 text-[16.5px] leading-[1.7] text-[var(--color-body)]"
            >
              <p>
                We started {legal.product} in March 2025 to give small and medium businesses one
                place to run the day: selling at the counter, keeping stock, tracking customer
                credit (credit), taking online orders and managing deliveries.
              </p>
              <p>
                {legal.product} is built and run by{" "}
                <a
                  href={legal.operatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-mint-2)] hover:underline"
                >
                  {legal.operator}
                </a>
                , a software company in {legal.city}, {legal.country}. We talk to the shop owners,
                restaurant managers and distributors who use it, and we keep improving it based on
                what they tell us.
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {FACTS.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                data-reveal
                className="rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)] sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
                  <Icon size={20} strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4 text-[16px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
                  {title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-4 pb-[clamp(64px,10vw,110px)] sm:px-7 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
            See {legal.product} for your business
          </h2>
          <p className="relative mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Book a demo and we’ll show you how it fits the way you work — or start on the Light
            plan, free for 3 months.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.demoPath}>
              Book a demo <span aria-hidden>→</span>
            </MintButton>
            <GhostButton href={siteConfig.signupUrl} external>
              Start free — 3 months
            </GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
