import type { ItemList, WebApplication, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/metadata";
import { ORG_ID } from "@/lib/seo/schemas";
import type { ToolInfo } from "@/content/tools/tools";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * One free tool as a WebApplication: free (an Offer at 0), runs in any
 * browser, published by the same Organization as the rest of the site.
 * No aggregateRating — there are no reviews, and inventing them is a lie
 * (see the note on softwareApplicationSchema).
 */
export function toolSchema(tool: ToolInfo, locale: string): WithContext<WebApplication> {
  const url = canonicalUrl(`/tools/${tool.slug}`, locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: tool.heading,
    description: tool.seo.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (runs in a web browser)",
    browserRequirements: "Requires JavaScript.",
    isAccessibleForFree: true,
    inLanguage: "en",
    image: `${siteConfig.url}/og/tool-${tool.slug}.png`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } as any,
    publisher: { "@id": ORG_ID } as any,
  };
}

/** The /tools hub as an ItemList of the tools, in page order. */
export function toolsListSchema(tools: ToolInfo[], locale: string): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free tools for shops and restaurants",
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.heading,
      url: canonicalUrl(`/tools/${t.slug}`, locale),
    })) as any,
  };
}
