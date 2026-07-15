import type { Metadata } from "next";
import { Icon } from "@/components/design/Icon";
import { PillBadge, Eyebrow, CtaPanel, MintButton } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Tajir Point — Built for Merchants Who Work Hard",
  description:
    "Learn how Tajir Point gives every merchant in Pakistan, UAE, and Saudi Arabia enterprise-grade POS, inventory, and khata tools — in their language, built for their market, compliant out of the box.",
  path: "/about",
});

const VALUES = [
  {
    title: "Works without internet",
    body: "Your shop doesn't close when the internet does. Every feature works without a connection and syncs the moment you're back online.",
    icon: "cloud",
  },
  {
    title: "Tri-lingual by default",
    body: "English, اردو, and العربية are first-class citizens — not afterthoughts. Every screen, receipt, and report renders in the merchant's language.",
    icon: "globe",
  },
  {
    title: "Built for the region",
    body: "FBR, ZATCA, 1Link, JazzCash — the compliance and payment rails that matter in PK, AE, and SA are built in, not bolted on.",
    icon: "shield",
  },
  {
    title: "One price, every module",
    body: "No per-module fees. No transaction percentages. Pay per branch, get everything. We grow when you grow.",
    icon: "wallet",
  },
];

const HIGHLIGHTS = [
  { value: "Pakistan · UAE · Saudi Arabia", label: "Built for the region" },
  { value: "English · اردو · العربية", label: "Tri-lingual by default" },
  { value: "Works offline", label: "No internet required" },
  { value: "One price", label: "Every module included" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-16 pt-[150px] text-center md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>Our story</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          Built for merchants
          <br />
          <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
            who work hard.
          </span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[580px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[18px] leading-[1.6] text-[rgba(242,247,244,.64)]">
          We started Tajir Point because the tools available to merchants in South Asia and the Gulf
          were either too expensive, too complex, or simply not built for local languages and
          compliance needs.
        </p>

        <div className="relative mx-auto mt-[60px] grid max-w-[1120px] grid-cols-2 gap-[14px] md:grid-cols-4">
          {HIGHLIGHTS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              data-reveal-delay={i * 70}
              className="rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-6 text-start transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)]"
            >
              <div className="text-[19px] font-extrabold leading-tight tracking-[-0.02em]">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-[2px] text-[var(--color-muted-3)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>MISSION</Eyebrow>
            <h2
              data-reveal
              className="mt-[18px] text-[clamp(32px,4.2vw,48px)] font-extrabold leading-[1.08] tracking-[-0.035em]"
            >
              Every merchant deserves
              <br />
              enterprise-grade tools.
            </h2>
            <p
              data-reveal
              className="mt-5 max-w-[460px] text-[16.5px] leading-[1.65] text-[var(--color-muted)]"
            >
              A kiryana in Lahore, a restaurant in Dubai, an electronics shop in Riyadh — they all
              have the same operational needs as a chain store. We built one platform that serves
              all of them.
            </p>
            <p
              data-reveal
              data-reveal-delay={70}
              className="mt-4 max-w-[460px] text-[16.5px] leading-[1.65] text-[var(--color-muted)]"
            >
              Tajir Point works on any Android device — even without internet — prints to any
              Bluetooth printer, and speaks your language right out of the box.
            </p>
          </div>

          <div className="grid gap-[14px] sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                data-reveal-delay={(i % 2) * 70}
                className="rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-[26px] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,210,122,.25)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
                  <Icon name={v.icon} size={21} />
                </span>
                <h3 className="mt-4 text-[16px] font-bold tracking-[-0.01em]">{v.title}</h3>
                <p className="mt-[10px] text-[13.5px] leading-[1.6] text-[rgba(242,247,244,.58)]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-5 pb-[110px] pt-5 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            Ready to see it live?
          </h2>
          <p className="relative mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.6] text-[rgba(242,247,244,.64)]">
            Book a free 30-minute demo and we&apos;ll walk you through Tajir Point for your specific
            business type.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.calendlyUrl} external>
              Book a demo <span>→</span>
            </MintButton>
            <a
              href="https://app.tajirpoint.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-white/[0.07] px-7 py-[15px] text-[16px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
            >
              Start free trial
            </a>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
