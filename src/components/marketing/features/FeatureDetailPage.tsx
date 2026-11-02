import { CheckCircle2, ChevronDown, Sparkles, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge, MintButton, GhostButton, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { backArrow, forwardArrow, pickCopy } from "@/content/i18n/page-copy";
import { FEATURE_COMMON } from "@/content/i18n/features/common";
import type { FeaturePageCopy } from "@/content/i18n/features/types";
import type { Localized } from "@/content/i18n/page-copy";

/**
 * The shared layout of the five /features/<slug> pages (khata, accounting,
 * e-invoicing, offline, van sales): hero with an always-dark device mock, the
 * problem, the solution list + a side card, who it helps, FAQ and a CTA.
 *
 * Words come from src/content/i18n/features/<slug>.ts in English, Urdu and
 * Arabic; this file keeps the layout, icons and colours. Headings drop the
 * negative letter-spacing in RTL (it breaks Arabic-script joining) and the
 * small mono eyebrows switch to the sans font there.
 */
export interface FeatureDetailPageProps {
  locale: string;
  path: string;
  copy: Localized<FeaturePageCopy>;
  /** Hero + mock icon. */
  icon: LucideIcon;
  /** One icon per panel item, same order as `copy.panel.items`. */
  panelIcons: readonly LucideIcon[];
  /** One per `copy.audiences` label, same order. */
  audiences: ReadonlyArray<{ icon: LucideIcon; href: string }>;
  /** Text colour class per mock row, same order as `copy.mock.rows`. */
  mockTones: readonly string[];
  /** Where the CTA's second button goes ("/pricing", "/extensions"). */
  ctaSecondaryHref: string;
}

export function FeatureDetailPage({
  locale,
  path,
  copy,
  icon: Icon,
  panelIcons,
  audiences,
  mockTones,
  ctaSecondaryHref,
}: FeatureDetailPageProps) {
  const { t, lang, dir, rtl } = pickCopy(copy, locale);
  const common = pickCopy(FEATURE_COMMON, lang).t;
  /** Negative letter-spacing breaks Arabic-script joining: drop it in RTL. */
  const track = (cls: string) => (rtl ? "tracking-normal" : cls);
  const eyebrowFont = rtl ? "font-sans tracking-normal" : "font-mono tracking-[2px]";

  return (
    <div lang={lang} dir={dir}>
      <JsonLd schema={[faqSchema(t.faqs), pageBreadcrumbs(locale, [[t.breadcrumb, path]])]} />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-[70px] pt-[140px] md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 62%)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-[44px] lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <Link
              href="/business"
              className={`mb-7 inline-flex items-center gap-2 text-[12px] text-[var(--color-muted-2)] transition-colors hover:text-[var(--color-mint-2)] ${rtl ? "font-sans text-[13px]" : "font-mono tracking-[1.5px]"}`}
            >
              <span aria-hidden="true">{backArrow(rtl)}</span> {common.allBusinesses}
            </Link>

            <div>
              <PillBadge>{t.badge}</PillBadge>
            </div>

            <span className="mt-6 flex h-[56px] w-[56px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.22)] bg-[var(--color-mint-soft)]">
              <Icon className="h-7 w-7 text-[var(--color-mint-2)]" strokeWidth={1.7} />
            </span>

            <h1
              className={`mt-[18px] max-w-[620px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,4.6vw,56px)] font-extrabold ${track("tracking-[-0.035em]")} ${rtl ? "leading-[1.3]" : "leading-[1.05]"}`}
            >
              {t.headline[0]}
              <br />
              {t.headline[1]}
            </h1>

            <p className="mt-5 max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
              {t.sub}
            </p>

            <div className="mt-9 flex animate-[tpFadeUp_.8s_.36s_cubic-bezier(.22,1,.36,1)_both] flex-wrap gap-[14px]">
              <MintButton href={siteConfig.signupUrl} external>
                {common.startFree} <span aria-hidden="true">{forwardArrow(rtl)}</span>
              </MintButton>
              <GhostButton href="/book-demo">{common.bookDemo}</GhostButton>
            </div>
          </div>

          {/* Device mock — always dark, per the showcase convention. */}
          <div data-reveal data-reveal-delay={120} className="flex min-w-0 justify-center">
            <div className="on-dark w-full max-w-[420px] rounded-[18px] border border-[var(--color-line)] bg-[#060d0a] p-[11px] shadow-[0_30px_64px_rgba(0,0,0,.45)]">
              <div className="flex min-h-[260px] flex-col gap-3 rounded-[11px] bg-[var(--color-panel)] p-[18px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--color-mint-soft)]">
                    <Icon
                      className="h-[17px] w-[17px] text-[var(--color-mint-2)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[14px] font-extrabold text-[var(--color-ink)]">
                    {t.mock.title}
                  </span>
                </div>

                {t.mock.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-3 rounded-[9px] border border-[var(--color-line-soft)] bg-[var(--surface-1)] p-3 text-[12px]"
                  >
                    <span className="text-[var(--color-muted-2)]">{row.label}</span>
                    {/* dir=auto: amounts like "+$230.00" stay left-to-right
                        inside an RTL row, words follow their own script. */}
                    <span
                      dir="auto"
                      className={`font-extrabold ${mockTones[i] ?? "text-[var(--color-ink)]"}`}
                    >
                      {row.value}
                    </span>
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
          <div
            className={`inline-block rounded-full bg-[var(--surface-2)] px-[14px] py-[6px] text-[12px] text-[var(--color-muted-2)] ${eyebrowFont}`}
          >
            {common.problemEyebrow}
          </div>
          <h2
            className={`mt-4 text-[clamp(26px,3.2vw,34px)] font-extrabold ${track("tracking-[-0.025em]")}`}
          >
            {t.problem.title}
          </h2>
          <p className="mt-[14px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            {t.problem.body}
          </p>
        </div>
      </section>

      {/* ── How we solve it ─────────────────────────────────────────── */}
      <section className="px-5 pb-[80px] md:px-10">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-[44px] lg:grid-cols-2">
          <div data-reveal className="min-w-0">
            <div
              className={`inline-block rounded-full border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] px-[14px] py-[6px] text-[12px] text-[var(--color-mint-2)] ${eyebrowFont}`}
            >
              {common.solutionEyebrow}
            </div>
            <h2
              className={`mt-4 text-[clamp(24px,3vw,32px)] font-extrabold ${track("tracking-[-0.025em]")}`}
            >
              {t.solution.title}
            </h2>

            <ul className="mt-[22px] flex flex-col gap-[14px]">
              {t.solution.points.map((point) => (
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

            {t.solution.note && (
              <div className="mt-5 inline-flex items-start gap-[9px] rounded-[16px] border border-[var(--color-line)] bg-[var(--surface-2)] px-4 py-2 text-[13px] font-semibold leading-[1.5] text-[var(--color-amber)]">
                <Sparkles className="mt-[2px] h-[15px] w-[15px] shrink-0" strokeWidth={1.8} />
                {t.solution.note}
              </div>
            )}
          </div>

          <div
            data-reveal
            data-reveal-delay={100}
            className="min-w-0 rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-1)] p-[30px]"
          >
            <div className="mb-4 text-[14px] font-extrabold">{t.panel.title}</div>
            <div className="flex flex-col gap-[10px]">
              {t.panel.items.map(({ title, body }, i) => {
                const ItemIcon = panelIcons[i] ?? CheckCircle2;
                return (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-[14px]"
                  >
                    <ItemIcon
                      className="h-5 w-5 shrink-0 text-[var(--color-mint-2)]"
                      strokeWidth={1.7}
                    />
                    <div>
                      <div className="text-[14px] font-bold">{title}</div>
                      <div className="text-[12.5px] text-[var(--color-muted-3)]">{body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who this helps ──────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-2)] px-5 py-[70px] text-center md:px-10">
        <div className="mx-auto max-w-[900px]">
          <h2
            className={`text-[clamp(22px,2.6vw,28px)] font-extrabold ${track("tracking-[-0.025em]")}`}
          >
            {common.whoHelps}
          </h2>
          <div data-reveal className="mt-[26px] flex flex-wrap justify-center gap-[14px]">
            {audiences.map(({ icon: AudienceIcon, href }, i) => {
              const label = t.audiences[i] ?? "";
              return (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-[9px] rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-[18px] py-3 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)] hover:shadow-[0_18px_40px_rgba(0,0,0,.18)]"
                >
                  <AudienceIcon
                    className="h-[18px] w-[18px] text-[var(--color-mint-2)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-[14px] font-bold">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────────────── */}
      <section className="px-5 py-[70px] md:px-10">
        <div className="mx-auto max-w-[820px]">
          <h2
            className={`text-center text-[clamp(22px,2.6vw,28px)] font-extrabold ${track("tracking-[-0.025em]")}`}
          >
            {common.questions}
          </h2>

          <div data-reveal className="mt-[26px]">
            {t.faqs.map((faq, i) => (
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
          <h2
            className={`relative text-[clamp(28px,3.6vw,46px)] font-extrabold ${track("tracking-[-0.03em]")}`}
          >
            {t.cta.headline}
          </h2>
          {t.cta.body && (
            <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
              {t.cta.body}
            </p>
          )}
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              {common.startFree} <span aria-hidden="true">{forwardArrow(rtl)}</span>
            </MintButton>
            <GhostButton href={ctaSecondaryHref}>{t.cta.secondary}</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
