import type { Metadata } from "next";
import { pageBreadcrumbs } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";
import { ArrowRightLeft, Gift, Languages, MonitorSmartphone, WifiOff } from "lucide-react";
import {
  CtaPanel,
  Eyebrow,
  GhostButton,
  MintButton,
  PillBadge,
} from "@/components/design/primitives";
import { NextStep } from "@/components/shared/NextStep";
import { legal, siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { ABOUT_COPY } from "@/content/i18n/lead-pages/pages";
import { forwardArrow, pickCopy } from "@/content/i18n/page-copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(ABOUT_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    absoluteTitle: true,
    description: t.meta.description,
    path: "/about",
    locale,
  });
}

/** Same order as ABOUT_COPY facts: platforms, languages, offline, Light plan, switching. */
const FACT_ICONS = [MonitorSmartphone, Languages, WifiOff, Gift, ArrowRightLeft] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { t, lang, dir, rtl } = pickCopy(ABOUT_COPY, locale);
  const track = (cls: string) => (rtl ? "tracking-normal" : cls);

  return (
    <div lang={lang} dir={dir}>
      <JsonLd schema={pageBreadcrumbs(locale, [[t.breadcrumb, "/about"]])} />
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-14 pt-[clamp(48px,8vw,96px)] text-center sm:px-7 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[min(1100px,200vw)] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.12),transparent 60%)",
          }}
        />

        <PillBadge>{t.badge}</PillBadge>

        <h1
          className={`relative mx-auto mt-6 max-w-[860px] text-[clamp(34px,5.4vw,64px)] font-extrabold text-[var(--color-ink)] ${rtl ? "leading-[1.3]" : "leading-[1.06]"} ${track("tracking-[-0.035em]")}`}
        >
          {t.headline}
        </h1>

        <p className="relative mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.65] text-[var(--color-body)]">
          {t.intro(legal.product, legal.country, legal.operator)}
        </p>

        <NextStep
          locale={locale}
          location="about_header"
          secondary={["demo", "call"]}
          className="mt-8"
        />
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-4 py-[clamp(64px,10vw,110px)] sm:px-7 md:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <h2
              data-reveal
              className={`mt-4 text-[clamp(28px,4vw,44px)] font-extrabold text-[var(--color-ink)] ${rtl ? "leading-[1.35]" : "leading-[1.1]"} ${track("tracking-[-0.03em]")}`}
            >
              {t.storyTitle(legal.city)}
            </h2>
            <div
              data-reveal
              className="mt-5 space-y-4 text-[16.5px] leading-[1.7] text-[var(--color-body)]"
            >
              <p>{t.story1(legal.product)}</p>
              <p>
                {t.story2Before(legal.product)}
                <a
                  href={legal.operatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-mint-2)] hover:underline"
                >
                  {legal.operator}
                </a>
                {legal.registration && <> ({legal.registration})</>}
                {t.story2After(legal.city, legal.country)}
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {t.facts.map(({ title, body }, i) => {
              const Icon = FACT_ICONS[i] ?? Gift;
              return (
                <li
                  key={title}
                  data-reveal
                  className="rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)] sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
                    <Icon size={20} strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3
                    className={`mt-4 text-[16px] font-bold text-[var(--color-ink)] ${track("tracking-[-0.01em]")}`}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
                    {body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-4 pb-[clamp(64px,10vw,110px)] sm:px-7 md:px-10">
        <CtaPanel>
          <h2
            className={`relative text-[clamp(28px,3.6vw,44px)] font-extrabold text-[var(--color-ink)] ${track("tracking-[-0.03em]")}`}
          >
            {t.ctaTitle(legal.product)}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            {t.ctaBody}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.demoPath}>
              {t.bookDemo} <span aria-hidden>{forwardArrow(rtl)}</span>
            </MintButton>
            <GhostButton href={siteConfig.signupUrl} external>
              {t.startFree}
            </GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
