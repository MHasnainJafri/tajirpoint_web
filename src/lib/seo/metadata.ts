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

  // With localePrefix: "never" all locales share the same URL.
  // We still emit all three hreflang values + x-default so Google
  // knows this page serves English, Urdu, and Arabic audiences.
  const hreflangUrls = {
    "en":        url,
    "ur":        url,
    "ar":        url,
    "x-default": url,
  };

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
      languages: hreflangUrls,
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
