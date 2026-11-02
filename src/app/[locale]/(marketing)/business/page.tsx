import type { Metadata } from "next";
import { NextStep } from "@/components/shared/NextStep";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { BusinessGrid } from "@/components/marketing/business/BusinessGrid";
import { MigrationBand } from "@/components/marketing/business/MigrationBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";
import { businessUi } from "@/content/i18n/businesses";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = businessUi(locale).index;
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/business",
    locale,
  });
}

export default async function BusinessIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = businessUi(locale);
  const t = ui.index;

  return (
    <div className="mx-auto max-w-[1240px] px-[clamp(16px,3vw,24px)] pb-[clamp(56px,8vw,104px)]" style={{ overflowX: "clip" }}>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: ui.home, url: canonicalUrl("/", locale) },
            { name: ui.businesses, url: canonicalUrl("/business", locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: t.itemListName,
            itemListElement: BUSINESSES.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: businessLabel(b, locale).name,
              url: canonicalUrl(`/business/${b.slug}`, locale),
            })),
          },
        ]}
      />
      <section className="pb-10 pt-[clamp(36px,7vw,90px)] text-center">
        <PillBadge>{t.badge}</PillBadge>
        <h1 className="mx-auto mt-6 max-w-[20ch] text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance rtl:leading-[1.3] rtl:tracking-normal">
          {t.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">{t.sub}</p>
        <NextStep locale={locale} location="business_index_header" secondary={["demo", "call"]} className="mt-7" />
      </section>

      <BusinessGrid locale={locale} headingLevel="h2" />

      <div className="mt-[clamp(56px,8vw,96px)]">
        <MigrationBand locale={locale} />
      </div>

      <section className="mt-[clamp(56px,8vw,96px)] text-center">
        <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold tracking-[-0.03em] rtl:tracking-normal">{t.notSure}</h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--color-body)]">{ui.offerLine}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-[10px]" data-track="business_index">
          <Link href="/book-demo" className="inline-flex rounded-full bg-[#0A0A0A] px-6 py-3 text-[15px] font-bold text-white">
            {ui.bookDemo}
          </Link>
          <a href={siteConfig.signupUrl} className="inline-flex rounded-full bg-[var(--color-mint)] px-6 py-3 text-[15px] font-bold text-[#0A0A0A]">
            {ui.startFree}
          </a>
        </div>
      </section>
    </div>
  );
}
