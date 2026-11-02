import type { Metadata } from "next";
import { NextStep } from "@/components/shared/NextStep";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { BusinessGrid } from "@/components/marketing/business/BusinessGrid";
import { MigrationBand } from "@/components/marketing/business/MigrationBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { BUSINESSES, OFFER_LINE } from "@/lib/marketing/businesses";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { pageBreadcrumbs } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "POS System for Every Kind of Business",
    description:
      "TajirPoint POS for restaurants, cafés, cloud kitchens, clothing, grocery and kiryana stores, pharmacies, mobile shops, salons, distributors and factories.",
    path: "/business",
    locale,
  });
}

export default async function BusinessIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-[1240px] px-[clamp(16px,3vw,24px)] pb-[clamp(56px,8vw,104px)]" style={{ overflowX: "clip" }}>
      <JsonLd
        schema={[
          pageBreadcrumbs(locale, [["Businesses", "/business"]]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TajirPoint by business type",
            itemListElement: BUSINESSES.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              url: canonicalUrl(`/business/${b.slug}`, locale),
            })),
          },
        ]}
      />
      <section className="pb-10 pt-[clamp(36px,7vw,90px)] text-center">
        <PillBadge>Find your business</PillBadge>
        <h1 className="mx-auto mt-6 max-w-[20ch] text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
          One POS system, shaped around your counter.
        </h1>
        <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
          Pick your kind of business to see the screens, apps and reports you would use — then book a
          free demo or start free.
        </p>
        <NextStep locale="en" location="business_index_header" secondary={["demo", "call"]} className="mt-7" />
      </section>

      <BusinessGrid locale={locale} headingLevel="h2" />

      <div className="mt-[clamp(56px,8vw,96px)]">
        <MigrationBand />
      </div>

      <section className="mt-[clamp(56px,8vw,96px)] text-center">
        <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold tracking-[-0.03em]">Not sure which fits?</h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--color-body)]">{OFFER_LINE}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-[10px]" data-track="business_index">
          <Link href="/book-demo" className="inline-flex rounded-full bg-[#0A0A0A] px-6 py-3 text-[15px] font-bold text-white">
            Book a free demo
          </Link>
          <a href={siteConfig.signupUrl} className="inline-flex rounded-full bg-[var(--color-mint)] px-6 py-3 text-[15px] font-bold text-[#0A0A0A]">
            Start free — 3 months
          </a>
        </div>
      </section>
    </div>
  );
}
