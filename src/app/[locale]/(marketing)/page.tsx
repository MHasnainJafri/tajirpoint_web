import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/marketing/landing/Hero";
import { TradesMarquee } from "@/components/marketing/landing/TradesMarquee";
import { Replaces } from "@/components/marketing/landing/Replaces";
import { WhoItsFor } from "@/components/marketing/landing/WhoItsFor";
import { Signature } from "@/components/marketing/landing/Signature";
import { Solutions } from "@/components/marketing/landing/Solutions";
import { Ecosystem } from "@/components/marketing/landing/Ecosystem";
import { Pillars } from "@/components/marketing/landing/Pillars";
import { Platforms } from "@/components/marketing/landing/Platforms";
import { Extensions } from "@/components/marketing/landing/Extensions";
import { Pricing } from "@/components/marketing/landing/Pricing";
import { Faq } from "@/components/marketing/landing/Faq";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { FindYourBusiness } from "@/components/marketing/landing/FindYourBusiness";
import { BelowFold } from "@/components/marketing/landing/BelowFold";
import { MigrationBand } from "@/components/marketing/business/MigrationBand";
import { CallbackSection } from "@/components/marketing/callback/CallbackSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, faqSchema } from "@/lib/seo/schemas";
import { getPricing } from "@/lib/api/plans";
import { buildMetadata } from "@/lib/seo/metadata";
import { FAQ_TABS } from "@/lib/design/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
    locale,
    absoluteTitle: true,
    keywords: [
      "Point of Sale",
      "POS System",
      "Restaurant POS",
      "Retail POS",
      "Wholesale POS",
      "Offline POS Software",
      "Kitchen Display System KDS",
      "Van Sales Software",
      "Customer Credit Ledger",
      "Inventory Management",
      "POS Tax Records",
    ],
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqT = await getTranslations({ locale, namespace: "landing.faq" });
  const faqQuestions = FAQ_TABS.flatMap((tab) =>
    Array.from({ length: tab.count }, (_, i) => ({
      question: faqT(`groups.${tab.id}.items.${i}.q`),
      answer: faqT(`groups.${tab.id}.items.${i}.a`),
    }))
  );

  // The same rows the Pricing section renders. Next dedupes the fetch across
  // one render pass, so this is the request Pricing already makes — not a
  // second one — and the markup cannot claim a tier the cards do not show.
  const pricing = await getPricing();

  return (
    <>
      <JsonLd schema={[softwareApplicationSchema(pricing?.plans), faqSchema(faqQuestions)]} />

      {/* Narrative order: the pitch and today's numbers → find your business →
          what it replaces →
          who it's for (real shop photography) → the five things it does differently →
          vertical trade screens → unified surfaces (counter, back office, online) →
          the full back office → where it runs → extensions marketplace → switching
          is free → price → FAQ → "we'll call you" form.

          `overflow-x: clip` (not hidden) contains the hero's decorative circles
          without creating a scroll container, so `position: sticky` on the nav
          still works. */}
      <div
        id="top"
        className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pt-4"
        style={{ overflowX: "clip" }}
      >
        <Hero />
        {/* Everything after the hero starts below the fold on every screen
            (the hero alone is ~2,300px tall on a phone), so each section is
            skipped for style/layout/paint until it nears the viewport. Sizes
            are each section's measured height (phone, desktop). */}
        <BelowFold size={130} sizeLg={150}>
          <TradesMarquee />
        </BelowFold>
        <BelowFold size={1620} sizeLg={670}>
          <FindYourBusiness />
        </BelowFold>
        <BelowFold size={330} sizeLg={230}>
          <Replaces />
        </BelowFold>
        <BelowFold size={1630} sizeLg={725}>
          <WhoItsFor />
        </BelowFold>
        <BelowFold size={3650} sizeLg={1990}>
          <Signature />
        </BelowFold>
        <BelowFold size={960} sizeLg={890}>
          <Solutions />
        </BelowFold>
        <BelowFold size={1610} sizeLg={715}>
          <Ecosystem />
        </BelowFold>
        <BelowFold size={2600} sizeLg={950}>
          <Pillars />
        </BelowFold>
        <BelowFold size={1110} sizeLg={700}>
          <Platforms />
        </BelowFold>
        <BelowFold size={7840} sizeLg={2410}>
          <Extensions />
        </BelowFold>
        <BelowFold size={680} sizeLg={465}>
          <div className="mt-[clamp(64px,9vw,120px)]">
            <MigrationBand />
          </div>
        </BelowFold>
        <BelowFold size={2170} sizeLg={1120}>
          <Pricing />
        </BelowFold>
        <BelowFold size={770} sizeLg={685}>
          <Faq />
        </BelowFold>
        <BelowFold size={1250} sizeLg={770}>
          <CallbackSection location="home" />
        </BelowFold>
      </div>

      {/* Wider than the page grid on purpose — see FinalCta. */}
      <BelowFold size={720} sizeLg={550}>
        <FinalCta />
      </BelowFold>
    </>
  );
}
