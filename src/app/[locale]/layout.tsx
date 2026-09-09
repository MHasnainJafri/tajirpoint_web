import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Reem_Kufi } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/config/site";
import { localeAlternates } from "@/lib/seo/metadata";
import { routing, isRtl, type Locale } from "@/i18n/routing";

/**
 * The root layout.
 *
 * It lives under `[locale]` rather than at `src/app/` on purpose: `lang` and
 * `dir` on <html> vary per locale, so the element that carries them has to sit
 * inside the segment that knows the locale. Next.js supports this explicitly —
 * "the root layout can also be nested in the new folder (e.g.
 * `app/[lang]/layout.js`)". Keeping <html> at `src/app/layout.tsx` meant
 * reading the locale from the request via `getLocale()`, which opts every route
 * in the app out of static rendering: the previous build emitted all 29 routes
 * as `ƒ (Dynamic) server-rendered on demand`, Vercel answered every one of them
 * with `Cache-Control: private, no-cache, no-store` and `X-Vercel-Cache: MISS`,
 * and each request ran a full render in iad1 for an audience in Pakistan.
 */

// Geist is what the design is drawn in — it carries the tight tracking the
// display clamps rely on. Variable font, so no `weight` array: the whole
// 100–900 axis ships and the design's 500/600/700/800 all resolve.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

/** Pre-render every locale at build time instead of rendering per request. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ur: "ur_PK",
  ar: "ar_AE",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    robots: { index: true, follow: true },
    alternates: localeAlternates("/", locale),
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}`,
      siteName: siteConfig.name,
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // The proxy matcher skips any path containing a dot (`.*\..*`), so requests
  // like `/anything.txt` fall straight through to this dynamic segment. Without
  // this guard `/llms.txt` matched `[locale]` with locale="llms.txt" and
  // rendered the homepage with a **200** — an unbounded soft-404 surface where
  // every `/x.txt` was a crawlable duplicate of the homepage. i18n/request.ts
  // silently falls back to the default locale for unknown values, so the bad
  // param can never surface as an error on its own; the 404 has to be raised
  // here.
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Opts this route tree back into static rendering. Without it, next-intl's
  // server APIs read from the incoming request and force dynamic rendering.
  setRequestLocale(locale);

  const dir = isRtl(locale) ? "rtl" : "ltr";

  // Only include the Arabic font variable when it is actually needed.
  const fontClasses = [geist.variable, geistMono.variable, locale !== "en" ? reemKufi.variable : ""]
    .filter(Boolean)
    .join(" ");

  // Only the namespaces that client components actually read. Nav and
  // ExtensionGrid are the only "use client" trees using translations, between
  // them covering nav/extensions/solutions. Passing the whole catalogue shipped
  // every string in `landing`, `footer` and `common` into the RSC payload of
  // every page for nothing.
  const messages = await getMessages();
  const clientMessages = {
    nav: messages.nav,
    extensions: messages.extensions,
    solutions: messages.solutions,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontClasses}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Marks that scripting is alive, before first paint. The scroll-reveal
            styles are scoped to `.js`, so if this never runs the page renders
            fully visible rather than blank. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {/* Warm up connections to external domains hit on first meaningful interaction */}
        <link rel="preconnect" href="https://app.tajirpoint.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale as Locale} messages={clientMessages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
