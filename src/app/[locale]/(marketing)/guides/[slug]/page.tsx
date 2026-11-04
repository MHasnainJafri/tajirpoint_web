import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CtaPanel, GhostButton, MintButton } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tick } from "@/components/marketing/landing/Stroke";
import { GuideBlocks } from "@/components/marketing/guides/GuideBlocks";
import { GuideText } from "@/components/marketing/guides/GuideText";
import { formatGuideDate, getGuide, GUIDE_SLUGS, plainText, readMinutes } from "@/content/guides";
import { siteConfig } from "@/lib/config/site";
import { guideArticleSchema } from "@/lib/marketing/guide-schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { BRAND_NAME, brand } from "@/lib/config/brand";
import { assertPageShown, isPageShown } from "@/lib/config/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.filter((slug) => isPageShown(`/guides/${slug}`)).map((slug) => ({ slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    locale,
    type: "article",
    keywords: guide.keywords,
  });
}

const h2 = "text-[clamp(24px,3.2vw,32px)] font-bold leading-[1.2] tracking-[-0.03em] text-balance";
const card = "rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)]";

export default async function GuidePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  // Left out of builds for another market or business type (src/lib/config/pages.ts).
  assertPageShown(`/guides/${slug}`);
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const related = guide.related.map(getGuide).filter((g) => g !== undefined);
  const toc = [
    ...guide.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(guide.faqs.length ? [{ id: "faq", label: "Questions" }] : []),
    ...(guide.sources?.length ? [{ id: "sources", label: "Sources" }] : []),
  ];

  return (
    // Guides are English for now; on /ur and /ar they keep their own language
    // and direction so they read correctly inside an RTL page.
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[
          guideArticleSchema(guide, locale),
          faqSchema(guide.faqs.map((f) => ({ question: f.q, answer: plainText(f.a) }))),
          pageBreadcrumbs(locale, [
            ["Guides", "/guides"],
            [guide.title, path],
          ]),
        ]}
      />

      <div className="mx-auto max-w-[1180px] px-4 md:px-6" style={{ overflowX: "clip" }}>
        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="pt-5 text-[12.5px] text-[var(--color-muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/guides"
                className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]"
              >
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 font-semibold text-[var(--color-ink)]">
              {guide.category}
            </li>
          </ol>
        </nav>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="max-w-[820px] pb-8 pt-[clamp(24px,4vw,44px)]">
          <span className="inline-block rounded-full border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] px-[12px] py-[4px] text-[12.5px] font-semibold text-[var(--color-mint-2)]">
            {guide.category}
          </span>
          <h1 className="mt-4 text-[clamp(30px,4.6vw,50px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance [overflow-wrap:anywhere]">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.6] text-[var(--color-body)]">
            {guide.summary}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13.5px] text-[var(--color-muted)]">
            <span>
              By{" "}
              <Link
                href={brand.founderName ? "/about#founder" : "/about"}
                className="font-semibold text-[var(--color-ink-3)] hover:text-[var(--color-ink)] max-md:inline-flex max-md:min-h-[44px] max-md:items-center"
              >
                {brand.founderName
                  ? `${brand.founderName}, ${brand.founderTitle}`
                  : `${siteConfig.name} team`}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published{" "}
              <time dateTime={guide.datePublished}>{formatGuideDate(guide.datePublished)}</time>
            </span>
            {guide.dateModified !== guide.datePublished && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated{" "}
                  <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{readMinutes(guide)} min read</span>
          </p>
        </header>

        {/* ── Short answer (the passage answer engines quote) ────── */}
        <section
          aria-labelledby="short-answer-title"
          className="max-w-[820px] rounded-[20px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-5 md:p-6"
        >
          <h2
            id="short-answer-title"
            className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-mint-2)]"
          >
            Short answer
          </h2>
          <p className="mt-2 text-[17px] leading-[1.65] text-[var(--color-ink)]">
            <GuideText text={guide.shortAnswer} />
          </p>
          <h3 className="mt-5 text-[14.5px] font-bold text-[var(--color-ink)]">In this guide</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {guide.keyPoints.map((k) => (
              <li
                key={k}
                className="flex items-start gap-[10px] text-[15px] leading-[1.5] text-[var(--color-ink-3)]"
              >
                <span className="mt-[2px] flex-none text-[var(--color-mint-2)]">
                  <Tick size={16} />
                </span>
                {k}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-[clamp(32px,5vw,56px)] grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          {/* ── Article ──────────────────────────────────────────── */}
          <article className="min-w-0 max-w-[760px] [overflow-wrap:anywhere]">
            {/* On phones the contents sit above the article, folded. */}
            <details className={`${card} mb-10 p-4 lg:hidden`}>
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown
                  className="h-5 w-5 flex-none text-[var(--color-muted)]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </summary>
              <TocList items={toc} />
            </details>

            {guide.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="mb-[clamp(40px,6vw,64px)] scroll-mt-[90px]"
              >
                <h2 id={`${s.id}-title`} className={h2}>
                  {s.heading}
                </h2>
                <GuideBlocks blocks={s.blocks} />
              </section>
            ))}

            {/* ── FAQ ─────────────────────────────────────────── */}
            {guide.faqs.length > 0 && (
              <section
                id="faq"
                aria-labelledby="faq-title"
                className="mb-[clamp(40px,6vw,64px)] scroll-mt-[90px]"
              >
                <h2 id="faq-title" className={h2}>
                  Questions people ask
                </h2>
                <div className="mt-4">
                  {guide.faqs.map((f, i) => (
                    <details
                      key={f.q}
                      open={i === 0}
                      className="group border-b border-[var(--color-line-2)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-bold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                        <h3 className="min-w-0 text-[17px] font-bold">{f.q}</h3>
                        <ChevronDown
                          className="h-5 w-5 flex-none text-[var(--color-muted)] transition-transform duration-200 group-open:rotate-180"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="mb-5 text-[15.5px] leading-[1.7] text-[var(--color-body)]">
                        <GuideText text={f.a} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* ── Sources ─────────────────────────────────────── */}
            {guide.sources && guide.sources.length > 0 && (
              <section
                id="sources"
                aria-labelledby="sources-title"
                className={`${card} mb-[clamp(40px,6vw,64px)] scroll-mt-[90px] p-5 md:p-6`}
              >
                <h2 id="sources-title" className="text-[20px] font-bold tracking-[-0.02em]">
                  Sources
                </h2>
                {guide.checked && (
                  <p className="mt-1 text-[13.5px] text-[var(--color-muted)]">
                    Official pages, checked on {guide.checked}. Rules change: always confirm the
                    current rules with the authority or a tax adviser. This guide is general
                    information, not legal or tax advice.
                  </p>
                )}
                <ul className="mt-4 flex flex-col gap-3 text-[14.5px] leading-[1.55]">
                  {guide.sources.map((s) => (
                    <li key={s.url}>
                      <span className="font-semibold text-[var(--color-ink)]">{s.publisher}:</span>{" "}
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-mint-2)] underline underline-offset-[3px]"
                      >
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* ── Sidebar (desktop) ───────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-[96px] flex flex-col gap-5">
              <nav aria-label="On this page" className={`${card} p-5`}>
                <p className="text-[14px] font-bold">On this page</p>
                <TocList items={toc} />
              </nav>
              <div className={`${card} p-5`}>
                <p className="text-[15px] font-bold leading-[1.35]">
                  {`Try ${BRAND_NAME} free for 3 months`}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--color-body)]">
                  No card needed. We move your data from Excel or your old POS for free.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={siteConfig.signupUrl}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-4 py-[10px] text-[14px] font-semibold text-[var(--color-on-brand)]"
                  >
                    Start free
                  </a>
                  <Link
                    href="/get-a-call"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-line-2)] px-4 py-[10px] text-[14px] font-semibold text-[var(--color-ink)]"
                  >
                    Get a call back
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Useful pages ───────────────────────────────────────── */}
        <section aria-labelledby="useful-title" className="mt-4">
          <h2 id="useful-title" className={h2}>
            Useful pages
          </h2>
          <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-3">
            {guide.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${card} flex h-full flex-col p-4 transition-colors hover:border-[var(--color-mint-line)]`}
                >
                  <span className="text-[15px] font-bold text-[var(--color-ink)]">{l.label} →</span>
                  <span className="mt-1 text-[13.5px] leading-[1.5] text-[var(--color-muted)]">
                    {l.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Related guides ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-[clamp(40px,6vw,64px)]">
            <h2 id="related-title" className={h2}>
              More guides
            </h2>
            <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className={`${card} flex h-full flex-col p-5 transition-colors hover:border-[var(--color-mint-line)]`}
                  >
                    <span className="text-[12.5px] font-semibold text-[var(--color-mint-2)]">
                      {g.category}
                    </span>
                    <span className="mt-2 text-[16.5px] font-bold leading-[1.35] text-[var(--color-ink)]">
                      {g.title}
                    </span>
                    <span className="mt-2 text-[13.5px] text-[var(--color-muted)]">
                      {readMinutes(g)} min read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="px-4 pb-[90px] pt-[clamp(48px,7vw,88px)] md:px-6">
        <CtaPanel>
          <h2 className="relative text-[clamp(26px,3.6vw,42px)] font-extrabold tracking-[-0.03em] text-balance">
            Free for 3 months. No card needed.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.6] opacity-85">
            Talk to a person, see a demo on your own products, or start on your own today.
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

function TocList({ items }: { items: Array<{ id: string; label: string }> }) {
  return (
    <ol className="mt-3 flex flex-col text-[13.5px] leading-[1.45] lg:gap-2">
      {items.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            className="block text-[var(--color-ink-3)] hover:text-[var(--color-mint-2)] max-lg:flex max-lg:min-h-[44px] max-lg:items-center max-lg:py-2"
          >
            {t.label}
          </a>
        </li>
      ))}
    </ol>
  );
}
