import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Pricing } from "@/components/marketing/landing/Pricing";
import { Faq } from "@/components/marketing/landing/Faq";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { MigrationBand } from "@/components/marketing/business/MigrationBand";
import { CallbackSection } from "@/components/marketing/callback/CallbackSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_TABS } from "@/lib/design/landing";
import { faqSchema, pageBreadcrumbs, softwareApplicationSchema } from "@/lib/seo/schemas";
import { TrackView } from "@/components/analytics/TrackView";
import { getPlans, planSummary } from "@/lib/api/plans";
import { buildMetadata, fitDescription } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.pricingMeta" });
  // English snippets lead with the live plan list from the same API rows as
  // the cards ("Shop $29/month…"), so an admin price edit reaches the search
  // result too. fitDescription drops trailing sentences rather than letting a
  // longer plan list run past 160 characters. Urdu and Arabic use their own
  // copy: the plan summary is English.
  const summary = locale === routing.defaultLocale ? planSummary(await getPlans()) : null;
  return buildMetadata({
    title: t("title"),
    description: summary ? fitDescription(`${summary}.`, t("offer"), t("terms")) : t("description"),
    path: "/pricing",
    locale,
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("landing.pricing");
  const plans = await getPlans();
  const tFaq = await getTranslations("landing.faq");

  // Flattened from the grouped FAQ so the structured data always matches what
  // the page actually renders — it drifted once already when the shape changed.
  const questions = FAQ_TABS.flatMap((tab) =>
    Array.from({ length: tab.count }, (_, i) => ({
      question: tFaq(`groups.${tab.id}.items.${i}.q`),
      answer: tFaq(`groups.${tab.id}.items.${i}.a`),
    }))
  );

  return (
    <>
      <JsonLd
        schema={[
          softwareApplicationSchema(plans),
          faqSchema(questions),
          pageBreadcrumbs(locale, [["Pricing", "/pricing"]]),
        ]}
      />
      <TrackView event="pricing" />

      <div
        className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pt-4"
        style={{ overflowX: "clip" }}
      >
        <section className="pt-[clamp(40px,7vw,80px)] text-center">
          <div className="eyebrow justify-center">{t("eyebrow")}</div>
          <h1 className="mx-auto mt-4 max-w-[18ch] animate-[tpRise_.7s_cubic-bezier(.22,.9,.3,1)_both] text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
            {t("headline")}
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] animate-[tpRise_.7s_.12s_cubic-bezier(.22,.9,.3,1)_both] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            {t("sub")}
          </p>
        </section>

        <Pricing showHeader={false} showCompare />
        {/* Below the fold on every screen: the browser skips styling and
            layout for this block until it scrolls near, which keeps the
            first screen's main-thread work small on low-end phones. The
            HTML (FAQ answers included) is all still there for search. */}
        <div className="[contain-intrinsic-size:auto_2400px] [content-visibility:auto]">
          <div className="mt-[clamp(64px,9vw,120px)]">
            <MigrationBand />
          </div>
          <Faq />
          <CallbackSection location="pricing" />
        </div>
      </div>

      <div className="[contain-intrinsic-size:auto_600px] [content-visibility:auto]">
        <FinalCta />
      </div>
    </>
  );
}
