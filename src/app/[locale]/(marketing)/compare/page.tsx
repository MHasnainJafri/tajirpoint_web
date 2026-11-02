import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CtaPanel, GhostButton, MintButton } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompareCard, FaqList } from "@/components/marketing/compare/CompareParts";
import { CHECKED, CHECKED_ISO, COMPARE_HUB, COMPARISONS } from "@/content/compare";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: COMPARE_HUB.seo.title,
    description: COMPARE_HUB.seo.description,
    path: "/compare",
    locale,
    keywords: [...COMPARE_HUB.seo.keywords],
    // The title already names the brand.
    absoluteTitle: true,
  });
}

const GROUPS = [
  {
    id: "today",
    title: "Instead of the way you do it now",
    sub: "Paper, spreadsheets and a simple till all work — until the shop gets busy.",
    kind: "alternative" as const,
  },
  {
    id: "pos",
    title: "TajirPoint vs other POS systems",
    sub: `Fair, side-by-side, with a source and the date (${CHECKED}) for every fact about the other product.`,
    kind: "competitor" as const,
  },
];

export default async function CompareHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[
          faqSchema([...COMPARE_HUB.faqs]),
          pageBreadcrumbs(locale, [["Compare", "/compare"]]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TajirPoint comparisons",
            itemListElement: COMPARISONS.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              url: canonicalUrl(`/compare/${c.slug}`, locale),
            })),
          },
        ]}
      />

      <div className="mx-auto max-w-[1140px] px-[clamp(16px,3vw,24px)]" style={{ overflowX: "clip" }}>
        <section className="pb-[clamp(24px,4vw,40px)] pt-[clamp(40px,6vw,72px)]">
          <div className="eyebrow">Compare</div>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance">
            Is TajirPoint right for you? An honest comparison.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            See how {siteConfig.name} compares with a paper khata, Excel, a cash register and other
            POS systems. We show where we help, where the other option is stronger, and what is
            still coming soon on our side.
          </p>
          <p className="mt-3 text-[13px] text-[var(--color-muted)]">
            Written by the {siteConfig.name} team. Competitor facts checked{" "}
            <time dateTime={CHECKED_ISO}>{CHECKED}</time> from each company&rsquo;s own pages.
          </p>
        </section>

        {GROUPS.map((g) => (
          <section key={g.id} aria-labelledby={`${g.id}-title`} className="mt-[clamp(32px,5vw,56px)]">
            <h2 id={`${g.id}-title`} className="text-[clamp(22px,2.8vw,30px)] font-extrabold tracking-[-0.025em]">
              {g.title}
            </h2>
            <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.6] text-[var(--color-muted)]">{g.sub}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMPARISONS.filter((c) => c.kind === g.kind).map((c) => (
                <CompareCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="how-title" className="mt-[clamp(40px,6vw,72px)] max-w-[760px]">
          <h2 id="how-title" className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
            How we compare
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 ps-5 text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            <li>Our side lists only what works in TajirPoint today. Anything not released says “coming soon”.</li>
            <li>Their side uses only their own public pages, linked on each comparison with the date we read them.</li>
            <li>If we could not confirm something on their site, we say so instead of guessing.</li>
            <li>Every page has a section on where the other option is the better choice.</li>
          </ul>
        </section>

        <FaqList faqs={COMPARE_HUB.faqs} />
      </div>

      <section className="px-[clamp(16px,3vw,24px)] pb-[110px] pt-[clamp(48px,7vw,88px)]">
        <CtaPanel>
          <h2 className="relative text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.03em]">
            The best comparison is your own shop.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[460px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Free for 3 months, no card needed. Or book a demo with your own products.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free <span aria-hidden="true">→</span>
            </MintButton>
            <GhostButton href="/book-demo">Book a free demo</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
