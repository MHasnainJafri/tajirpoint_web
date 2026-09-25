import type {
  Organization,
  WebSite,
  SoftwareApplication,
  BreadcrumbList,
  FAQPage,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/config/site";
import type { MarketingPlan } from "@/lib/api/plans";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/brand/mark/mark-on-white.svg`,
    } as any,
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+923446800893",
        email: "hello@tajirpoint.com",
        url: `${siteConfig.url}/contact`,
        availableLanguage: ["English", "Urdu", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: siteConfig.dashboardUrl,
        availableLanguage: ["English", "Urdu"],
      },
    ] as any,
    // The product is sold generally; naming three countries told search
    // engines it was unavailable everywhere else.
    areaServed: { "@type": "Place", name: "Worldwide" } as any,
    foundingDate: "2022",
  };
}

export function websiteSchema(): WithContext<WebSite> {
  // SearchAction is removed until a /search route exists.
  // Pointing SearchAction at a 404 triggers a Google Search Console warning.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/**
 * The product, with one Offer per tier the pricing section actually renders.
 *
 * Built from the same `getPricing()` rows the cards are built from, because a
 * hardcoded copy is how this got to where it was: the markup advertised
 * "PKR 4,500" and "PKR 12,000" long after the catalogue moved to $19 and $49,
 * and listed FBR/ZATCA compliance, a kitchen display and SSO — one stubbed,
 * one not plan-gated, one not built. Structured data that contradicts the page
 * is worse than none: Google's own guideline is that it must represent the
 * visible content, and a wrong price is the kind that ends up in a search
 * result.
 *
 * Deriving it also means a tier withheld for want of a payment gateway is
 * absent here too, automatically — `visible_plans` decides once, on the
 * server, and the cards and the markup both follow.
 *
 * Google's Rich Results Test reports "1 valid item detected" with three
 * NON-CRITICAL notices. All three are deliberate, so please do not "fix" them
 * by deleting information:
 *
 *  1. Missing `aggregateRating`. We have no reviews. This is what makes the
 *     page ineligible for the Software App rich result, and that is the
 *     correct outcome — the only way to qualify is to invent ratings, which is
 *     both a policy violation and a lie. Add it when real reviews exist.
 *  2. Invalid object type for `priceSpecification`. Google accepts a plain
 *     `PriceSpecification` here and rejects `UnitPriceSpecification` (tested
 *     both). But the plain type has no `unitCode`, so it can only repeat the
 *     number already on the offer — it buys a clean report and says nothing.
 *     The subclass is what carries "per month", and a bare `price: 19` reads
 *     as a one-time charge, which is precisely the ambiguity that let four
 *     extensions ship at PKR amounts wearing a dollar sign. Google ignores
 *     the field; every other consumer reads it. Worth one optional notice.
 *  3. "Either price or priceSpecification should be specified" on the
 *     contact-sales tier. It genuinely has no price, and schema.org has no
 *     way to say "price on application". Inventing a number would be worse.
 */
export function softwareApplicationSchema(
  plans?: MarketingPlan[] | null
): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    description: siteConfig.description,
    url: siteConfig.url,
    operatingSystem: "Android, iOS, Web",
    inLanguage: ["en", "ur", "ar"],
    offers: (plans?.length ? plans : []).map((plan) => planOffer(plan)) as any,
  };
}

/** One tier as an Offer. Prices are per month, in the plan's own currency. */
function planOffer(plan: MarketingPlan) {
  // `is_priced` is false for the free trial AND for the contact-sales tier,
  // and both carry monthly_price = 0, so neither the flag nor the amount can
  // separate them. `tier` is the documented discriminator (see MarketingPlan):
  // the trial is the `custom` tier, everything else unpriced is a conversation.
  // The first version of this read the word "free" out of the display string,
  // which is copy the admin can retype in any language.
  const isTrial = !plan.is_priced && plan.tier === "custom";
  const isContactSales = !plan.is_priced && !isTrial;

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    name: plan.name,
    description: plan.tagline,
    availability: "https://schema.org/InStock",
    // A contact-sales tier is a conversation; everything else is on the
    // pricing page, which is the page this markup describes.
    url: isContactSales ? `${siteConfig.url}/contact` : `${siteConfig.url}/pricing`,
  };

  // An offer with no price is an incomplete offer, but inventing one for a
  // "contact us" tier would be worse than omitting it. schema.org has no way
  // to say "price on application", so the tier is listed without an amount.
  if (!isContactSales) {
    const amount = isTrial ? "0" : plan.price_amount;
    offer.price = amount;
    offer.priceCurrency = plan.currency_code;
    offer.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: amount,
      priceCurrency: plan.currency_code,
      // Every published price on the page is a monthly one.
      unitCode: "MON",
      unitText: "month",
    };
  }

  return offer;
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(
  questions: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function verticalSoftwareSchema({
  name,
  applicationSubCategory,
  description,
  path,
  features,
}: {
  name: string;
  applicationSubCategory: string;
  description: string;
  path: string;
  features: string[];
}): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — ${siteConfig.name}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory,
    description,
    url: `${siteConfig.url}${path}`,
    operatingSystem: "Android, iOS, Web, Windows",
    inLanguage: ["en", "ur", "ar"],
    featureList: features.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial, all modules included",
      url: `${siteConfig.url}/pricing`,
    } as any,
  };
}
