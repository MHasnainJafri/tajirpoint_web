import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero/Hero";
import { ThreeSurfaces } from "@/components/marketing/sections/ThreeSurfaces";
import { Offline } from "@/components/marketing/sections/Offline";
import { Khata } from "@/components/marketing/sections/Khata";
import { FeatureGrid } from "@/components/marketing/sections/FeatureGrid";
import { Verticals } from "@/components/marketing/sections/Verticals";
import { Storefront } from "@/components/marketing/sections/Storefront";
import { TriLingual } from "@/components/marketing/sections/TriLingual";
import { Hardware } from "@/components/marketing/sections/Hardware";
import { AppDownload } from "@/components/marketing/sections/AppDownload";
import { Pricing } from "@/components/marketing/sections/Pricing";
import { FinalCTA } from "@/components/marketing/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tajir Point — POS, Inventory & Khata for Merchants in PK, UAE & KSA",
  description:
    "POS, inventory, khata ledger, and storefront in one platform — for merchants in Pakistan, UAE, and Saudi Arabia. Three languages, every device.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd schema={softwareApplicationSchema()} />
      <Hero />
      <ThreeSurfaces />
      <Offline />
      <Khata />
      <FeatureGrid />
      <Verticals />
      <Storefront />
      <TriLingual />
      <Hardware />
      <AppDownload />
      <Pricing />
      <FinalCTA />
    </>
  );
}
