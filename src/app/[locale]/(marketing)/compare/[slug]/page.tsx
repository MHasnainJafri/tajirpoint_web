import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaPanel, GhostButton, MintButton } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tick } from "@/components/marketing/landing/Stroke";
import {
  CompareTable,
  FaqList,
  RelatedComparisons,
  SourcesList,
} from "@/components/marketing/compare/CompareParts";
import { COMPARE_SLUGS, checkedOn, getComparison } from "@/content/compare";
import { getPlans, planSummary } from "@/lib/api/plans";
import { legal, siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { BRAND_NAME, brand } from "@/lib/config/brand";
import { assertPageShown, isPageShown } from "@/lib/config/pages";
import { RelatedGuides } from "@/components/marketing/guides/RelatedGuides";
import { comparisonArticleSchema } from "@/lib/marketing/guide-schema";

/** Only the listed comparisons exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARE_SLUGS.filter((slug) => isPageShown(`/compare/${slug}`)).map((slug) => ({ slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.seo.title,
    description: c.seo.description,
    path: `/compare/${c.slug}`,
    locale,
    keywords: c.seo.keywords,
    type: "article",
    // The title already starts with the brand.
    absoluteTitle: true,
  });
}

export default async function ComparisonPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  // Left out of builds for another market or business type (src/lib/config/pages.ts).
  assertPageShown(`/compare/${slug}`);
  const c = getComparison(slug);
  if (!c) notFound();

  const plans = await getPlans();
  const tpPlans = planSummary(plans);
  const isCompetitor = c.kind === "competitor";

  return (
    // The copy is English only for now; on /ur and /ar it keeps its own
    // language and direction so it reads correctly inside an RTL page.
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[
          comparisonArticleSchema(c, locale),
          faqSchema(c.faqs),
          pageBreadcrumbs(locale, [
            ["Compare", "/compare"],
            [c.label, `/compare/${c.slug}`],
          ]),
        ]}
      />

      <div
        className="mx-auto max-w-[1140px] px-[clamp(16px,3vw,24px)]"
        style={{ overflowX: "clip" }}
      >
        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="pt-5 text-[12.5px] text-[var(--color-muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/compare"
                className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]"
              >
                Compare
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[var(--color-ink)]">
              {c.label}
            </li>
          </ol>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="pb-[clamp(28px,4vw,44px)] pt-[clamp(24px,4vw,48px)]">
          <div className="eyebrow">{c.hero.eyebrow}</div>
          <h1 className="mt-4 max-w-[22ch] text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance">
            {c.hero.h1}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {c.hero.sub}
          </p>
          <p className="mt-3 text-[13px] text-[var(--color-muted)]">
            {brand.founderName
              ? `Written by ${brand.founderName}, ${brand.founderTitle.toLowerCase()} of ${siteConfig.name}.`
              : `Written by the ${siteConfig.name} team.`}
            {isCompetitor ? (
              <>
                {" "}
                Facts about {c.otherName} checked{" "}
                <time dateTime={checkedOn(c).iso}>{checkedOn(c).label}</time> from its own pages (
                <a href="#sources-title" className="underline underline-offset-2">
                  sources
                </a>
                ).
              </>
            ) : null}
          </p>
          <div className="mt-7 flex flex-wrap gap-[10px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free — 3 months <span aria-hidden="true">→</span>
            </MintButton>
            <GhostButton href="/book-demo">Book a free demo</GhostButton>
          </div>
        </section>

        {/* ── The short answer ──────────────────────────────────── */}
        <section aria-labelledby="verdict-title">
          <h2
            id="verdict-title"
            className="text-[clamp(22px,2.8vw,30px)] font-extrabold tracking-[-0.025em]"
          >
            The short answer
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[18px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-5">
              <div className="text-[13px] font-bold text-[var(--color-mint-2)]">
                {`${BRAND_NAME} is a better fit if…`}
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">
                {c.verdict.tajirpoint}
              </p>
            </div>
            <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
              <div className="text-[13px] font-bold text-[var(--color-ink-3)]">
                {c.otherName} is a better fit if…
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">
                {c.verdict.other}
              </p>
            </div>
          </div>
        </section>

        {/* ── Strengths, both sides ─────────────────────────────── */}
        <section aria-labelledby="strengths-title" className="mt-[clamp(40px,6vw,72px)]">
          <h2
            id="strengths-title"
            className="text-[clamp(22px,2.8vw,30px)] font-extrabold tracking-[-0.025em]"
          >
            Where each one is stronger
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-[16px] font-bold text-[var(--color-ink)]">
                {`Where ${BRAND_NAME} helps`}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {c.tajirpointStrengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-[15px] leading-[1.55] text-[var(--color-body)]"
                  >
                    <span className="mt-[2px] shrink-0 text-[var(--color-mint-2)]">
                      <Tick />
                    </span>
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[var(--color-ink)]">
                Where {c.otherName} is stronger
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {c.otherStrengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-[15px] leading-[1.55] text-[var(--color-body)]"
                  >
                    <span className="mt-[2px] shrink-0 text-[var(--color-muted)]">
                      <Tick />
                    </span>
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Feature table ─────────────────────────────────────── */}
        <section aria-labelledby="table-title" className="mt-[clamp(40px,6vw,72px)]">
          <h2
            id="table-title"
            className="text-[clamp(22px,2.8vw,30px)] font-extrabold tracking-[-0.025em]"
          >
            {`${BRAND_NAME} vs ${c.otherName}, feature by feature`}
          </h2>
          <p className="mb-5 mt-2 max-w-[70ch] text-[14px] leading-[1.6] text-[var(--color-muted)]">
            “Partly” means on a higher plan, with an add-on or with a limit. “Coming soon” means
            built or being built, not released yet.
            {isCompetitor
              ? " Where we could not confirm something on their site, we say so instead of guessing."
              : ""}
          </p>
          <CompareTable c={c} />
          <p className="mt-4 text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
            {tpPlans ? (
              <>
                {`${BRAND_NAME} plans today: `}
                {tpPlans}.{" "}
              </>
            ) : null}
            <Link
              href="/pricing"
              className="font-semibold text-[var(--color-mint-2)] hover:underline"
            >
              {`See ${BRAND_NAME} pricing`}
            </Link>
            .
          </p>
        </section>

        {/* ── The detail ────────────────────────────────────────── */}
        <div className="mt-[clamp(40px,6vw,72px)] max-w-[760px]">
          {c.sections.map((s) => (
            <section key={s.heading} className="mt-8 first:mt-0">
              <h2 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-3 text-[16px] leading-[1.7] text-[var(--color-body)]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
          <section className="mt-8">
            <h2 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
              {`Switching to ${BRAND_NAME}`}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.7] text-[var(--color-body)]">
              Send us an export from your current system or your sheets (Excel or CSV is fine) and
              our team loads your products, customers, suppliers, credit balances and opening stock
              for free before you go live.{" "}
              <Link
                href="/book-demo?migrate=1"
                className="font-semibold text-[var(--color-mint-2)] hover:underline"
              >
                Book a free migration call
              </Link>
              .
            </p>
          </section>
        </div>

        <SourcesList sources={c.sources} checked={checkedOn(c)} />

        <FaqList faqs={c.faqs} />

        <RelatedComparisons slugs={c.related} />

        {isCompetitor ? (
          <p className="mt-10 max-w-[760px] text-[13px] leading-[1.6] text-[var(--color-muted)]">
            {c.otherName} is a trademark of its owner. This page is written by {siteConfig.name}, is
            not affiliated with or endorsed by {c.otherName}, and compares public information only.
            Spotted a mistake? Email{" "}
            <a href={`mailto:${legal.email}`} className="underline underline-offset-2">
              {legal.email}
            </a>{" "}
            and we will fix it.
          </p>
        ) : null}
      </div>

      <RelatedGuides path={`/compare/${slug}`} locale={locale} />

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="px-[clamp(16px,3vw,24px)] pb-[110px] pt-[clamp(48px,7vw,88px)]">
        <CtaPanel>
          <h2 className="relative text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.03em]">
            {`Try ${BRAND_NAME} free for 3 months.`}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[460px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            No card needed. We move your data for free.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free <span aria-hidden="true">→</span>
            </MintButton>
            <GhostButton href="/get-a-call">Get a call back</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
