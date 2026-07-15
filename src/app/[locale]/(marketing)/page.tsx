import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/marketing/landing/Hero";
import { Marquee } from "@/components/marketing/landing/Marquee";
import { Platform } from "@/components/marketing/landing/Platform";
import { Bento } from "@/components/marketing/landing/Bento";
import { Ledger } from "@/components/marketing/landing/Ledger";
import { InTheBox } from "@/components/marketing/landing/InTheBox";
import { Devices } from "@/components/marketing/landing/Devices";
import { ExtensionsRail } from "@/components/marketing/landing/ExtensionsRail";
import { HowItWorks } from "@/components/marketing/landing/HowItWorks";
import { VerticalsGrid } from "@/components/marketing/landing/VerticalsGrid";
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
      <Hero />
      <Marquee />
      <Platform />
      <Bento />
      <Ledger />
      <InTheBox />
      <Devices />
      <ExtensionsRail />
      <HowItWorks />
      <VerticalsGrid />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
