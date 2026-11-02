import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaPanel, PillBadge } from "@/components/design/primitives";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCATIONS, LOCATIONS_HUB, locationPath } from "@/content/locations";
import { OFFER_LINE } from "@/lib/marketing/businesses";
import { siteConfig, whatsappLink } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: LOCATIONS_HUB.seo.title,
    description: LOCATIONS_HUB.seo.description,
    path: LOCATIONS_HUB.path,
    locale,
    keywords: [...LOCATIONS_HUB.seo.keywords],
  });
}

const card =
  "min-w-0 rounded-[18px] border border-[var(--color-line-2)] bg-white p-[clamp(16px,2.4vw,24px)] shadow-[var(--shadow-card)]";
const h2 = "text-[clamp(22px,3vw,32px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance";

export default async function LocationsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pakistan = LOCATIONS.filter((l) => l.countryCode === "PK");
  const uk = LOCATIONS.filter((l) => l.countryCode === "GB");

  return (
    // English copy; keeps its own language and direction on /ur and /ar.
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TajirPoint by location",
            itemListElement: LOCATIONS.map((l, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: l.label.en,
              url: canonicalUrl(locationPath(l.slug), locale),
            })),
          } as never,
          faqSchema(LOCATIONS_HUB.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Breadcrumbs items={[{ label: "Locations", href: LOCATIONS_HUB.path }]} />

      <div
        className="mx-auto max-w-[1240px] px-[clamp(16px,3vw,24px)]"
        style={{ overflowX: "clip" }}
      >
        <section className="pb-10 pt-[clamp(32px,6vw,80px)] text-center">
          <PillBadge>{LOCATIONS_HUB.hero.eyebrow}</PillBadge>
          <h1 className="mx-auto mt-6 max-w-[20ch] text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
            {LOCATIONS_HUB.hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {LOCATIONS_HUB.hero.sub}
          </p>
        </section>

        <LocationGroup title="Pakistan" items={pakistan} />
        <LocationGroup title="United Kingdom" items={uk} />

        <section aria-labelledby="gulf-title" className={`${card} mt-[clamp(40px,6vw,72px)]`}>
          <h2 id="gulf-title" className={h2}>
            {LOCATIONS_HUB.gulf.heading}
          </h2>
          {LOCATIONS_HUB.gulf.paragraphs.map((p) => (
            <p
              key={p}
              className="mt-4 max-w-[72ch] text-[15.5px] leading-[1.7] text-[var(--color-body)]"
            >
              {p}
            </p>
          ))}
          <a
            href={whatsappLink(
              "Hi, I have a business in the Gulf and want to know if TajirPoint fits."
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-track="locations_gulf"
            className="mt-5 inline-flex items-center rounded-full border border-[var(--color-line-2)] bg-white px-5 py-[11px] text-[14.5px] font-semibold text-[var(--color-ink)]"
          >
            Ask us on WhatsApp
          </a>
        </section>

        <section
          aria-labelledby="elsewhere-title"
          className="mt-[clamp(40px,6vw,72px)] max-w-[860px]"
        >
          <h2 id="elsewhere-title" className={h2}>
            {LOCATIONS_HUB.elsewhere.heading}
          </h2>
          {LOCATIONS_HUB.elsewhere.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-[15.5px] leading-[1.7] text-[var(--color-body)]">
              {p}
            </p>
          ))}
        </section>

        <section
          aria-labelledby="faq-title"
          className="mx-auto mt-[clamp(56px,8vw,96px)] max-w-[860px]"
        >
          <h2 id="faq-title" className={`${h2} text-center`}>
            Questions
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {LOCATIONS_HUB.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[16px] border border-[var(--color-line-2)] bg-white px-5 py-4 open:shadow-[var(--shadow-card)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-[20px] leading-none text-[var(--color-muted)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--color-body)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="px-[clamp(12px,3vw,24px)] pb-[clamp(56px,8vw,96px)] pt-[clamp(56px,8vw,96px)]">
        <CtaPanel>
          <h2 className="relative mx-auto max-w-[22ch] text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.03em] text-balance">
            Not sure it fits? Ask us.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[var(--color-on-dark-2)]">
            {OFFER_LINE}
          </p>
          <div
            className="relative mt-8 flex flex-wrap justify-center gap-[12px]"
            data-track="locations_final"
          >
            <Link
              href="/book-demo"
              className="inline-flex items-center rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15.5px] font-bold text-[#0A0A0A]"
            >
              Book a free demo
            </Link>
            <a
              href={siteConfig.signupUrl}
              className="inline-flex items-center rounded-full border border-white/30 px-7 py-[14px] text-[15.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Start free — 3 months
            </a>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}

function LocationGroup({ title, items }: { title: string; items: typeof LOCATIONS }) {
  return (
    <section aria-label={title} className="mt-8">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {title}
      </h2>
      <ul className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
        {items.map((l) => (
          <li key={l.slug} className="min-w-0">
            <Link
              href={locationPath(l.slug)}
              className={`${card} block h-full transition-[border-color,transform] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)]`}
            >
              <span className="block text-[18px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                {l.kind === "country" && l.countryCode === "PK"
                  ? "Pakistan (all cities)"
                  : l.label.en}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.55] text-[var(--color-body)]">
                {l.summary}
              </span>
              <span className="mt-3 block text-[13px] font-semibold text-[var(--color-brand)]">
                {l.hero.eyebrow} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
