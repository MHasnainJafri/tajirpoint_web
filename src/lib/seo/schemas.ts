import type {
  Organization,
  WebSite,
  SoftwareApplication,
  BreadcrumbList,
  FAQPage,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/config/site";

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
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
    ] as any,
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

export function softwareApplicationSchema(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    description: siteConfig.description,
    url: siteConfig.url,
    operatingSystem: "Android, iOS, Web",
    inLanguage: ["en", "ur", "ar"],
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "4500",
        priceCurrency: "PKR",
        description: "1 branch, 2 users — POS, inventory, khata, storefront, FBR/ZATCA compliance",
        url: `${siteConfig.url}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "12000",
        priceCurrency: "PKR",
        description:
          "Up to 5 branches, 15 users — full feature set including KDS, custom domain, and advanced reports",
        url: `${siteConfig.url}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        description:
          "Unlimited branches, SSO, dedicated success manager, custom SLA — contact for pricing",
        url: `${siteConfig.url}/contact`,
      },
    ] as any,
  };
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
