import { Link } from "@/i18n/navigation";
import { CtaPanel } from "@/components/design/primitives";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tick } from "@/components/marketing/landing/Stroke";
import { StatusBadge } from "@/components/marketing/addons/StatusBadge";
import { BUSINESSES, OFFER_LINE } from "@/lib/marketing/businesses";
import type { Addon } from "@/lib/marketing/addons";
import { legal, siteConfig, whatsappLink } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/metadata";
import { WEBSITE_ID, faqSchema } from "@/lib/seo/schemas";
import {
  STATUS_PHRASE,
  getLocation,
  locationPath,
  type LocationFaq,
  type LocationPage,
  type StatusPhrase,
  type SupportTone,
} from "@/content/locations";
import { BRAND_NAME } from "@/lib/config/brand";
import { RelatedGuides } from "@/components/marketing/guides/RelatedGuides";

const TONE: Record<SupportTone, { bg: string; fg: string; dot: string }> = {
  ready: { bg: "#E4FAEF", fg: "#05603A", dot: "#00A862" },
  partial: { bg: "#FFF4E0", fg: "#8A5A00", dot: "#F5A524" },
  no: { bg: "#F2F3F5", fg: "#4B5058", dot: "#8A8F98" },
};

function ToneBadge({ tone, label }: { tone: SupportTone; label: string }) {
  const s = TONE[tone];
  return (
    <span
      className="inline-flex flex-none items-center gap-[6px] whitespace-nowrap rounded-full px-[10px] py-[4px] text-[12px] font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] rounded-full"
        style={{ background: s.dot }}
      />
      {label}
    </span>
  );
}

/** `status(slug)` for FAQ answers: the add-on's live status, mid-sentence. */
export function statusPhrase(addons: ReadonlyMap<string, Addon>): StatusPhrase {
  return (slug) => {
    const a = addons.get(slug);
    return a ? STATUS_PHRASE[a.status] : "not available yet";
  };
}

export function resolveFaqs(faqs: readonly LocationFaq[], status: StatusPhrase) {
  return faqs.map((f) => ({ q: f.q, a: typeof f.a === "function" ? f.a(status) : f.a }));
}

const h2 = "text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance";
const card =
  "min-w-0 rounded-[18px] border border-[var(--color-line-2)] bg-white p-[clamp(16px,2.4vw,24px)] shadow-[var(--shadow-card)]";

/**
 * One location page. Server component, no client JS. English copy, so on
 * /ur and /ar it keeps its own language and direction (like the business
 * pages) inside the translated nav and footer.
 */
export function LocationView({
  page,
  locale,
  addons,
}: {
  page: LocationPage;
  locale: string;
  addons: ReadonlyMap<string, Addon>;
}) {
  const path = locationPath(page.slug);
  const faqs = resolveFaqs(page.faqs, statusPhrase(addons));
  const parent = page.parent ? getLocation(page.parent) : undefined;
  const track = `location_${page.slug.replace(/-/g, "_")}`;
  const waText = `Hi, I'd like to know how ${BRAND_NAME} works for my business in ${page.kind === "city" ? page.name : page.slug === "uk" ? "the UK" : page.name}.`;

  const crumbs = [
    { label: "Locations", href: "/pos" },
    ...(parent ? [{ label: parent.label.en, href: locationPath(parent.slug) }] : []),
    { label: page.label.en, href: path },
  ];

  return (
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${canonicalUrl(path, locale)}#webpage`,
            name: page.seo.title,
            description: page.seo.description,
            url: canonicalUrl(path, locale),
            inLanguage: "en",
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": `${siteConfig.url}/#software` },
            spatialCoverage: {
              "@type": "Place",
              name: page.slug === "uk" ? "United Kingdom" : page.name,
              ...(page.kind === "city" && {
                containedInPlace: { "@type": "Country", name: parent?.name ?? "Pakistan" },
              }),
            },
            dateModified: page.updated,
          } as never,
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div
        className="mx-auto max-w-[1240px] px-[clamp(16px,3vw,24px)]"
        style={{ overflowX: "clip" }}
      >
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pb-[clamp(32px,5vw,56px)] pt-[clamp(24px,4vw,48px)]">
          <h1 className="max-w-[22ch] text-[clamp(30px,4.6vw,56px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-balance">
            <span className="eyebrow">{page.hero.eyebrow}</span>
            <span className="sr-only">: </span>
            <span className="mt-4 block">{page.hero.headline}</span>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {page.hero.sub}
          </p>
          <div className="mt-7 flex flex-wrap gap-[10px]" data-track={`${track}_hero`}>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-[13px] text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-[2px]"
            >
              Book a free demo <span aria-hidden="true">→</span>
            </Link>
            <a
              href={siteConfig.signupUrl}
              className="inline-flex items-center rounded-full bg-[var(--color-mint)] px-6 py-[13px] text-[15px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px]"
            >
              Start free — 3 months
            </a>
            <Link
              href="/get-a-call"
              className="inline-flex items-center rounded-full border border-[var(--color-line-2)] bg-white px-6 py-[13px] text-[15px] font-semibold text-[var(--color-ink)]"
            >
              Get a call back
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-[var(--color-muted)]">{OFFER_LINE}</p>
        </section>

        {/* ── At a glance ──────────────────────────────────────── */}
        <section aria-labelledby="glance-title">
          <h2 id="glance-title" className="sr-only">
            At a glance
          </h2>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
            {page.facts.map((f) => (
              <div key={f.label} className={card}>
                <dt className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {f.label}
                </dt>
                <dd className="mt-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Tax ──────────────────────────────────────────────── */}
        <section aria-labelledby="tax-title" className="mt-[clamp(56px,8vw,96px)]">
          <h2 id="tax-title" className={h2}>
            {page.tax.heading}
          </h2>
          <p className="mt-4 max-w-[68ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            {page.tax.intro}
          </p>
          <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
            {page.tax.rows.map((row) => {
              const addon = row.addon ? addons.get(row.addon) : undefined;
              return (
                <li key={row.short + row.name} className={card}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[18px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
                      {row.short}
                    </span>
                    {addon ? (
                      <StatusBadge status={addon.status} />
                    ) : row.ours ? (
                      <ToneBadge tone={row.ours.tone} label={row.ours.label} />
                    ) : (
                      <ToneBadge tone="no" label="Not available yet" />
                    )}
                  </div>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--color-muted)]">
                    {row.name}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
                    {row.covers}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
                    {row.note}
                  </p>
                  {addon && (
                    <Link
                      href={`/extensions/${addon.slug}`}
                      className="mt-3 inline-block text-[13.5px] font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline"
                    >
                      About the {addon.name} add-on
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          {page.tax.note && (
            <p className="mt-5 max-w-[78ch] rounded-[14px] bg-[var(--color-surface)] px-4 py-3 text-[14px] leading-[1.6] text-[var(--color-ink-3)]">
              {page.tax.note}
            </p>
          )}
        </section>

        {/* ── Payments, delivery ───────────────────────────────── */}
        {page.blocks.map((block) => {
          const rows = block.addons
            .map((slug) => addons.get(slug))
            .filter((a): a is Addon => Boolean(a));
          return (
            <section
              key={block.id}
              aria-labelledby={`${block.id}-title`}
              className="mt-[clamp(56px,8vw,96px)]"
            >
              <h2 id={`${block.id}-title`} className={h2}>
                {block.heading}
              </h2>
              <p className="mt-4 max-w-[68ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
                {block.intro}
              </p>
              <div className="mt-6 grid gap-3 lg:grid-cols-2">
                <div className={card}>
                  <h3 className="text-[16px] font-bold text-[var(--color-ink)]">Works today</h3>
                  <ul className="mt-4 flex flex-col gap-[10px]">
                    {block.now.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-[10px] text-[14.5px] leading-[1.5] text-[var(--color-ink)]"
                      >
                        <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                          <Tick size={17} />
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {rows.length > 0 && (
                  <div className={card}>
                    <h3 className="text-[16px] font-bold text-[var(--color-ink)]">Add-ons</h3>
                    <ul className="mt-3 divide-y divide-[var(--color-line-2)]">
                      {rows.map((a) => (
                        <li
                          key={a.slug}
                          className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3"
                        >
                          <Link
                            href={`/extensions/${a.slug}`}
                            className="min-w-0 text-[14.5px] font-semibold text-[var(--color-ink)] underline-offset-2 hover:underline"
                          >
                            {a.name}
                          </Link>
                          <StatusBadge status={a.status} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* ── Businesses ───────────────────────────────────────── */}
        <section aria-labelledby="biz-title" className="mt-[clamp(56px,8vw,96px)]">
          <h2 id="biz-title" className={h2}>
            {page.businesses.heading}
          </h2>
          {page.businesses.intro && (
            <p className="mt-4 max-w-[68ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
              {page.businesses.intro}
            </p>
          )}
          <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
            {page.businesses.items.map((item) => {
              const b = BUSINESSES.find((x) => x.slug === item.slug);
              if (!b) return null;
              return (
                <li key={item.slug} className="min-w-0">
                  <Link
                    href={`/business/${b.slug}`}
                    className={`${card} block h-full transition-[border-color,transform] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)]`}
                  >
                    <span className="block text-[16px] font-bold text-[var(--color-ink)]">
                      {b.name}
                    </span>
                    <span className="mt-2 block text-[14px] leading-[1.55] text-[var(--color-body)]">
                      {item.why}
                    </span>
                    <span className="mt-3 block text-[13px] font-semibold text-[var(--color-brand)]">
                      See {b.name.toLowerCase()} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Local notes ──────────────────────────────────────── */}
        {page.sections.map((s) => (
          <section
            key={s.id}
            aria-labelledby={`${s.id}-title`}
            className="mt-[clamp(56px,8vw,96px)] max-w-[860px]"
          >
            <h2 id={`${s.id}-title`} className={h2}>
              {s.heading}
            </h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-[15.5px] leading-[1.7] text-[var(--color-body)]">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-5 flex flex-col gap-[10px]">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-[10px] text-[14.5px] text-[var(--color-ink)]"
                  >
                    <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                      <Tick size={17} />
                    </span>
                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-title"
          className="mx-auto mt-[clamp(64px,9vw,112px)] max-w-[860px]"
        >
          <h2 id="faq-title" className={`${h2} text-center`}>
            Questions from{" "}
            {page.kind === "city"
              ? `${page.name} businesses`
              : page.slug === "uk"
                ? "UK food businesses"
                : `businesses in ${page.name}`}
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[16px] border border-[var(--color-line-2)] bg-white open:shadow-[var(--shadow-card)]"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15.5px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-[20px] leading-none text-[var(--color-muted)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-[14.5px] leading-[1.65] text-[var(--color-body)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Other locations ──────────────────────────────────── */}
        <nav
          aria-label="Other locations"
          className="mx-auto mt-[clamp(48px,7vw,80px)] max-w-[860px] text-center"
        >
          <h2 className="text-[15px] font-semibold text-[var(--color-muted)]">Other locations</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {page.related.map((slug) => {
              const other = getLocation(slug);
              if (!other) return null;
              return (
                <li key={slug}>
                  <Link
                    href={locationPath(other.slug)}
                    className="inline-block rounded-full border border-[var(--color-line-2)] bg-white px-[14px] py-[8px] text-[13.5px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-mint-line)] hover:text-[var(--color-ink)]"
                  >
                    {other.label.en}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/pos"
                className="inline-block rounded-full border border-[var(--color-line-2)] bg-white px-[14px] py-[8px] text-[13.5px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-mint-line)] hover:text-[var(--color-ink)]"
              >
                All locations
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <RelatedGuides path={path} locale={locale} />

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="px-[clamp(12px,3vw,24px)] pb-[clamp(56px,8vw,96px)] pt-[clamp(56px,8vw,96px)]">
        <CtaPanel>
          <h2 className="relative mx-auto max-w-[22ch] text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.03em] text-balance">
            {page.cta.headline}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[var(--color-on-dark-2)]">
            {page.cta.sub}
          </p>
          <div
            className="relative mt-8 flex flex-wrap justify-center gap-[12px]"
            data-track={`${track}_final`}
          >
            <Link
              href="/book-demo"
              className="inline-flex items-center rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15.5px] font-bold text-[#0A0A0A]"
            >
              Book a free demo
            </Link>
            {legal.whatsappUrl && (
              <a
                href={whatsappLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/30 px-7 py-[14px] text-[15.5px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ask on WhatsApp
              </a>
            )}
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
