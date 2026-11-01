import type { SoftwareApplication, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config/site";
import { localeUrl } from "@/lib/seo/metadata";
import type { Addon } from "./addons";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * One add-on as a SoftwareApplication (an add-on to the main app, linked with
 * `isPartOf`). The Offer is built from the same API row the page prints, so
 * the markup never disagrees with the visible price:
 *
 * - a free add-on is an Offer at 0;
 * - a paid one carries a monthly UnitPriceSpecification, like the plans;
 * - a Contact us add-on with no listed price has no Offer at all (schema.org
 *   has no "price on application", and inventing one would be worse);
 * - Coming soon is `PreOrder`, Unavailable is `OutOfStock`.
 */
export function addonSchema(addon: Addon, locale: string): WithContext<SoftwareApplication> {
  const url = localeUrl(`/extensions/${addon.slug}`, locale);
  const availability =
    addon.status === "coming_soon"
      ? "https://schema.org/PreOrder"
      : addon.status === "unavailable"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock";

  const offer = addon.offer
    ? {
        "@type": "Offer",
        price: addon.offer.amount,
        priceCurrency: addon.offer.currency,
        availability,
        url,
        ...(addon.offer.monthly && addon.offer.amount !== "0"
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: addon.offer.amount,
                priceCurrency: addon.offer.currency,
                unitCode: "MON",
                unitText: "month",
              },
            }
          : {}),
      }
    : null;

  const features = addon.content.features.map((f) => f.title).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: addon.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: addon.content.schemaSubCategory,
    description: addon.content.seoDescription,
    url,
    ...(addon.iconUrl ? { image: addon.iconUrl } : {}),
    operatingSystem: "Android, Web, Windows",
    ...(features.length ? { featureList: features.join(", ") } : {}),
    isPartOf: {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      url: siteConfig.url,
    } as any,
    ...(offer ? { offers: offer as any } : {}),
  };
}
