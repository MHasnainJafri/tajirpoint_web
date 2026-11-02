import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Tick } from "@/components/marketing/landing/Stroke";
import { MigrationBand } from "@/components/marketing/business/MigrationBand";
import { PlanTeaser } from "@/components/marketing/business/PlanTeaser";
import { BusinessView } from "@/components/marketing/business/BusinessView";
import { BUSINESS_SLUGS, getBusiness, type Business } from "@/lib/marketing/businesses";
import { businessUi, localizeApp, localizeBusiness } from "@/content/i18n/businesses";
import type { BusinessUiCopy } from "@/content/i18n/businesses.types";
import { getPlans } from "@/lib/api/plans";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, verticalSoftwareSchema } from "@/lib/seo/schemas";

/** Only the catalog's slugs exist; anything else is a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return BUSINESS_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = getBusiness(slug);
  if (!found) return {};
  const b = localizeBusiness(found, locale);
  return buildMetadata({
    title: b.seo.title,
    description: b.seo.description,
    path: `/business/${b.slug}`,
    locale,
    ...(b.seo.keywords.length && { keywords: b.seo.keywords }),
  });
}

const chip = "inline-flex items-center rounded-full px-[9px] py-[3px] text-[11.5px] font-semibold";
/** Points the way the page reads: → in English, ← in Urdu and Arabic. */
const arrow = "inline-block rtl:-scale-x-100";

export default async function BusinessPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const found = getBusiness(slug);
  if (!found) notFound();
  const b = localizeBusiness(found, locale);
  const ui = businessUi(locale);

  const plans = await getPlans();
  const faqs = [...b.faqs, ...ui.commonFaqs];
  const demoHref = `/book-demo?type=${b.slug}`;
  const dir = `business/${b.slug}`;

  return (
    // Translated in Urdu and Arabic (content/i18n/businesses.*.ts); the page
    // inherits lang and dir from <html>.
    <div>
      <BusinessView slug={b.slug} />
      <JsonLd
        schema={[
          verticalSoftwareSchema({
            name: b.name,
            applicationSubCategory: b.schemaSubCategory,
            description: b.seo.description,
            // The localised URL, so the /ur and /ar pages describe themselves.
            path: new URL(canonicalUrl(`/business/${b.slug}`, locale)).pathname,
            features: b.features.filter((f) => f.status !== "soon").map((f) => f.title),
            plans,
          }),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          breadcrumbSchema([
            { name: ui.home, url: canonicalUrl("/", locale) },
            { name: ui.businesses, url: canonicalUrl("/business", locale) },
            { name: b.name, url: canonicalUrl(`/business/${b.slug}`, locale) },
          ]),
        ]}
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(16px,3vw,24px)]" style={{ overflowX: "clip" }}>
        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav aria-label={ui.breadcrumbLabel} className="pt-5 text-[12.5px] text-[var(--color-muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/business" className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]">
                {ui.businesses}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[var(--color-ink)]">
              {b.name}
            </li>
          </ol>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="grid items-center gap-[clamp(28px,5vw,64px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(24px,4vw,48px)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            {/* The eyebrow is part of the h1: it carries the search term
                ("Restaurant POS system") that the headline, written for
                people, does not. Styled exactly as before. */}
            <h1 className="text-[clamp(32px,4.8vw,58px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance rtl:leading-[1.3] rtl:tracking-normal">
              <span className="eyebrow rtl:tracking-normal">{b.hero.eyebrow}</span>
              <span className="sr-only">: </span>
              <span className="mt-4 block">{b.hero.headline}</span>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">{b.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-[10px]" data-track={`business_${b.slug}_hero`}>
              <Link
                href={demoHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-[13px] text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-[2px]"
              >
                {ui.bookDemo} <span aria-hidden="true" className={arrow}>→</span>
              </Link>
              <a
                href={siteConfig.signupUrl}
                className="inline-flex items-center rounded-full bg-[var(--color-mint)] px-6 py-[13px] text-[15px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(0,210,122,.35)]"
              >
                {ui.startFree}
              </a>
            </div>
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">{ui.offerLine}</p>
          </div>
          <MediaSlot
            dir={dir}
            media={b.hero.media}
            title={b.name}
            placeholderLabel={ui.illustration(b.name)}
            icon={b.icon}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </section>

        {/* ── Apps strip ─────────────────────────────────────────── */}
        <AppsStrip business={b} locale={locale} ui={ui} />

        {/* ── Features ───────────────────────────────────────────── */}
        <section aria-labelledby="features-title" className="mt-[clamp(56px,8vw,104px)]">
          <h2 id="features-title" className="sr-only">
            {ui.whatYouGet}
          </h2>
          {/* Jump links */}
          <nav aria-label={ui.onThisPage} className="mb-[clamp(28px,4vw,48px)] flex flex-wrap gap-2">
            {b.features.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-line-2)] bg-white px-[14px] py-[7px] text-[13px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-mint-line)] hover:text-[var(--color-ink)]"
              >
                {f.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-[clamp(56px,8vw,104px)]">
            {b.features.map((f, i) => (
              <article
                key={f.id}
                id={f.id}
                aria-labelledby={`${f.id}-title`}
                className="grid scroll-mt-[90px] items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--color-mint-soft)]">
                      <Icon name={f.icon} size={20} />
                    </span>
                    {f.status === "soon" && <span className={`${chip} bg-[#FFF4E0] text-[#8A5A00]`}>{ui.comingSoon}</span>}
                    {f.plan && <span className={`${chip} bg-[var(--color-surface)] text-[var(--color-ink-3)]`}>{f.plan}</span>}
                  </div>
                  <h3
                    id={`${f.id}-title`}
                    className="mt-4 text-[clamp(22px,2.8vw,32px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance rtl:leading-[1.35] rtl:tracking-normal"
                  >
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">{f.benefit}</p>
                  <ul className="mt-5 flex flex-col gap-[10px]">
                    {f.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-[10px] text-[14.5px] text-[var(--color-ink)]">
                        <span className="mt-[1px] text-[var(--color-mint-2)]">
                          <Tick size={17} />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <MediaSlot
                    dir={dir}
                    media={f.media}
                    title={f.title}
                    placeholderLabel={ui.illustration(f.title)}
                    icon={f.icon}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Switching ──────────────────────────────────────────── */}
        <div className="mt-[clamp(64px,9vw,120px)]">
          <MigrationBand slug={b.slug} locale={locale} />
        </div>

        {/* ── Plans ──────────────────────────────────────────────── */}
        <div className="mt-[clamp(64px,9vw,120px)]">
          <PlanTeaser locale={locale} />
        </div>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-title" className="mx-auto mt-[clamp(64px,9vw,120px)] max-w-[860px]">
          <h2 id="faq-title" className="text-center text-[clamp(24px,3.2vw,38px)] font-bold tracking-[-0.03em] rtl:tracking-normal">
            {ui.faqTitle(b.name)}
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[16px] border border-[var(--color-line-2)] bg-white open:shadow-[var(--shadow-card)]"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15.5px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="text-[20px] leading-none text-[var(--color-muted)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-[14.5px] leading-[1.65] text-[var(--color-body)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="px-[clamp(12px,3vw,24px)] pb-[clamp(56px,8vw,96px)] pt-[clamp(64px,9vw,120px)]">
        <CtaPanel>
          <h2 className="relative mx-auto max-w-[20ch] text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.03em] text-balance rtl:tracking-normal">
            {b.cta.headline}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[var(--color-on-dark-2)]">{b.cta.sub}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[12px]" data-track={`business_${b.slug}_final`}>
            <Link
              href={demoHref}
              className="inline-flex items-center rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15.5px] font-bold text-[#0A0A0A]"
            >
              {ui.bookDemo}
            </Link>
            <a
              href={siteConfig.signupUrl}
              className="inline-flex items-center rounded-full border border-white/30 px-7 py-[14px] text-[15.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {ui.startFree}
            </a>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}

function AppsStrip({ business, locale, ui }: { business: Business; locale: string; ui: BusinessUiCopy }) {
  return (
    <section aria-labelledby="apps-title" className="rounded-[24px] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-[clamp(18px,3vw,32px)]">
      <h2 id="apps-title" className="text-[18px] font-bold tracking-[-0.02em] rtl:tracking-normal">
        {ui.appsTitle}
      </h2>
      <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))] gap-3">
        {business.apps.map((id) => {
          const app = localizeApp(id, locale);
          return (
            <li key={id} className="flex items-start gap-3 rounded-[16px] bg-white p-4 shadow-[var(--shadow-card)]">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[var(--color-mint-soft)]">
                <Icon name={app.icon} size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-bold text-[var(--color-ink)]">{app.name}</span>
                <span className="mt-1 block text-[13px] leading-[1.5] text-[var(--color-muted)]">{app.line}</span>
                {(app.status === "soon" || app.plan) && (
                  <span className="mt-2 flex flex-wrap gap-[6px]">
                    {app.status === "soon" && <span className={`${chip} bg-[#FFF4E0] text-[#8A5A00]`}>{ui.comingSoon}</span>}
                    {app.plan && <span className={`${chip} bg-[var(--color-surface)] text-[var(--color-ink-3)]`}>{app.plan}</span>}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
