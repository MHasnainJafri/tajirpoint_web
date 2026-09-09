import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/marketing/landing/Hero";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

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
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd schema={softwareApplicationSchema()} />

      {/* Narrative order: the pitch and today's numbers → what it replaces →
          who it's for (real shop photography) → the five things it does differently →
          vertical trade screens → unified surfaces (counter, back office, online) →
          the full back office → where it runs → extensions marketplace → price → FAQ.

          `overflow-x: clip` (not hidden) contains the hero's decorative circles
          without creating a scroll container, so `position: sticky` on the nav
          still works. */}
      <div
        id="top"
        className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pt-4"
        style={{ overflowX: "clip" }}
      >
        <Hero />
        <Replaces />
        <WhoItsFor />
        <Signature />
        <Solutions />
        <Ecosystem />
        <Pillars />
        <Platforms />
        <Extensions />
        <Pricing />
        <Faq />
      </div>

      {/* Wider than the page grid on purpose — see FinalCta. */}
      <FinalCta />
    </>
  );
}
