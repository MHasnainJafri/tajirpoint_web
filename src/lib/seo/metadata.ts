import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ur: "ur_PK",
  ar: "ar_AE",
};

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  locale?: string;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noIndex = false,
  keywords,
  locale = "en",
}: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const ogLocale = OG_LOCALE_MAP[locale] ?? "en_US";

  // No hreflang, deliberately.
  //
  // hreflang annotates *distinct URLs per language*. With
  // `localePrefix: "never"` there is exactly one URL and the language is chosen
  // per-request from a cookie / Accept-Language, so pointing en, ur and ar at
  // the same href is a self-referential cluster that Google discards outright.
  // It also cannot work in practice: Googlebot crawls cookieless from US IPs,
  // so it only ever sees the default locale. (And today messages/en.json,
  // ur.json and ar.json are byte-identical English, so there is no translated
  // content to annotate in the first place.)
  //
  // To make the site genuinely multilingual, switch routing to
  // `localePrefix: "as-needed"` so /ur/* and /ar/* become real, crawlable URLs,
  // then restore `languages` here mapping each locale to its own prefixed URL.

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [imageUrl],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
