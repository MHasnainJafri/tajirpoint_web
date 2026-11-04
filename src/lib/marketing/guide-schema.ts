import type { Article, CollectionPage, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/metadata";
import { ORG_ID, SOFTWARE_ID, WEBSITE_ID } from "@/lib/seo/schemas";
import { ogImageForPath } from "@/lib/seo/og-cards";
import { GUIDES, GUIDES_HUB, guideWordCount, plainText, type Guide } from "@/content/guides";
import { CHECKED_ISO, type Comparison } from "@/content/compare";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** The byline on every guide: the team, as an Organization (no named person). */
const AUTHOR = {
  "@type": "Organization",
  name: `${siteConfig.name} team`,
  url: `${siteConfig.url}/about`,
  parentOrganization: { "@id": ORG_ID },
} as any;

function imageFor(path: string): string {
  return `${siteConfig.url}${ogImageForPath(path) ?? siteConfig.ogImage}`;
}

/**
 * One guide as an Article. Guides are English only, so the URL is always the
 * English canonical (an /ur or /ar copy canonicalises to it).
 */
export function guideArticleSchema(guide: Guide, locale: string): WithContext<Article> {
  const path = `/guides/${guide.slug}`;
  const url = canonicalUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.seoDescription,
    abstract: plainText(guide.shortAnswer),
    url,
    mainEntityOfPage: url,
    image: imageFor(path),
    inLanguage: "en",
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: AUTHOR,
    publisher: { "@id": ORG_ID } as any,
    isPartOf: { "@id": WEBSITE_ID } as any,
    articleSection: guide.category,
    keywords: guide.keywords.join(", "),
    wordCount: guideWordCount(guide),
    // Official sources the guide relies on (laws, deadlines, penalties).
    ...(guide.sources?.length
      ? {
          citation: guide.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.label,
            url: s.url,
            publisher: { "@type": "Organization", name: s.publisher },
          })) as any,
        }
      : {}),
  };
}

/**
 * One comparison page as an Article: same byline as the guides, dated by the
 * day its competitor facts were checked, citing the competitor pages those
 * facts came from (SEO audit 4 Nov 2026). English only, like the guides.
 */
export function comparisonArticleSchema(c: Comparison, locale: string): WithContext<Article> {
  const path = `/compare/${c.slug}`;
  const url = canonicalUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: c.hero.h1,
    description: c.seo.description,
    url,
    mainEntityOfPage: url,
    image: imageFor(path),
    inLanguage: "en",
    datePublished: CHECKED_ISO,
    dateModified: CHECKED_ISO,
    author: AUTHOR,
    publisher: { "@id": ORG_ID } as any,
    isPartOf: { "@id": WEBSITE_ID } as any,
    keywords: c.seo.keywords.join(", "),
    about: { "@id": SOFTWARE_ID } as any,
    ...(c.sources.length
      ? {
          citation: c.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.label,
            url: s.url,
          })) as any,
        }
      : {}),
  };
}

/** The /guides hub as a CollectionPage listing every guide. */
export function guidesHubSchema(locale: string): WithContext<CollectionPage> {
  const url = canonicalUrl(GUIDES_HUB.path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: GUIDES_HUB.title,
    description: GUIDES_HUB.seoDescription,
    url,
    inLanguage: "en",
    image: imageFor(GUIDES_HUB.path),
    isPartOf: { "@id": WEBSITE_ID } as any,
    publisher: { "@id": ORG_ID } as any,
    dateModified: GUIDES_HUB.updated,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: canonicalUrl(`/guides/${g.slug}`, locale),
        name: g.title,
      })),
    } as any,
  };
}
