import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/marketing/landing/Hero";
import { FeatureStrip } from "@/components/marketing/landing/FeatureStrip";
import { TrustBand } from "@/components/marketing/landing/TrustBand";
import { WhoItsFor } from "@/components/marketing/landing/WhoItsFor";
import { Platform } from "@/components/marketing/landing/Platform";
import { Ecosystem } from "@/components/marketing/landing/Ecosystem";
import { Bento } from "@/components/marketing/landing/Bento";
import { Ledger } from "@/components/marketing/landing/Ledger";
import { InTheBox } from "@/components/marketing/landing/InTheBox";
import { ExtensionsRail } from "@/components/marketing/landing/ExtensionsRail";
import { HowItWorks } from "@/components/marketing/landing/HowItWorks";
import { PosModes } from "@/components/marketing/landing/PosModes";
import { Pricing } from "@/components/marketing/landing/Pricing";
import { Faq } from "@/components/marketing/landing/Faq";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing.meta");
  return buildMetadata({ title: t("title"), description: t("description"), path: "/" });
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={softwareApplicationSchema()} />
      {/* Narrative order: hook → who it's for → what it replaces → how the
          pieces connect → proof → price → objections.
          `Devices` was dropped (Ecosystem makes the same point), and
          `VerticalsGrid` gave way to `PosModes` — it shows the product per
          trade instead of listing six icons, and links to the same pages. */}
      <Hero />
      <FeatureStrip />
      <TrustBand />
      <WhoItsFor />
      <Platform />
      <Ecosystem />
      <Bento />
      <Ledger />
      <InTheBox />
      <PosModes />
      <ExtensionsRail />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
