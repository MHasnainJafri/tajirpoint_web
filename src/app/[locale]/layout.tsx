import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { legal, siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { verificationMetadata } from "@/lib/seo/verification";
import { routing, isRtl, type Locale } from "@/i18n/routing";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { SiteTracking } from "@/components/analytics/SiteTracking";
import { BRAND_APP_HOST, brand, brandThemeCss } from "@/lib/config/brand";

export const viewport: Viewport = {
  // Matches the page background in each colour scheme, so the browser bar
  // blends with the site on Android Chrome and iOS Safari.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Self-hosted copies of the Google Fonts files (src/app/fonts), not
// next/font/google: that one downloads the fonts during the build, and a
// Vercel build without its cache failed whenever that download did.
const geist = localFont({
  src: "../fonts/Geist-latin.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

// Not preloaded: the mono face only sets small labels (eyebrows, chart axes),
// so it must not compete with the sans text for the first bytes on a slow
// phone. It still loads as soon as the CSS asks for it, and swaps in.
const geistMono = localFont({
  src: "../fonts/GeistMono-latin.woff2",
  weight: "400 600",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Not preloaded: only Urdu/Arabic pages use it (see fontClasses below), so a
// preload made every English page download two Arabic font files it never
// draws. The browser fetches it on ur/ar pages when the text needs it.
// Two files, as Google serves them: the Arabic letters, then the Latin ones.
// The Arabic face has no Arial fallback of its own, so Latin characters in
// ur/ar text fall through to the Latin face (see --font-arabic in globals.css).
const reemKufiArabic = localFont({
  src: "../fonts/ReemKufi-arabic.woff2",
  weight: "500 700",
  variable: "--font-reem-kufi-arabic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const reemKufiLatin = localFont({
  src: "../fonts/ReemKufi-latin.woff2",
  weight: "500 700",
  variable: "--font-reem-kufi-latin",
  display: "swap",
  preload: false,
});

/** brand.ts only accepts hex colours, so this CSS cannot carry anything else. */
const BRAND_THEME_CSS = brandThemeCss();

/** Pre-render every locale at build time instead of rendering per request. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // The defaults every page inherits; pages override title, description,
  // alternates, openGraph and twitter through buildMetadata().
  const base = buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
    locale,
    absoluteTitle: true,
    image: siteConfig.ogImage,
  });

  return {
    ...base,
    // No canonical or hreflang by default: a route that does not set its own
    // (a 404, say) must not claim to be the home page. Every real page sets
    // them through buildMetadata().
    alternates: undefined,
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    applicationName: siteConfig.name,
    publisher: legal.operator,
    category: "business",
    // Large image previews in Google results and Discover; full snippets.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Keep phone numbers in copy from turning into iOS tel: links we did not
    // write (the real ones are explicit links, which are tracked).
    formatDetection: { telephone: false, email: false, address: false },
    icons: brand.ownLogo
      ? // Another brand's build: its favicon and its square icon, nothing of ours.
        { icon: [{ url: brand.favicon }], apple: [{ url: brand.icon }] }
      : {
          icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/brand/png/icon-48.png", sizes: "48x48", type: "image/png" },
            { url: "/brand/png/icon-192.png", sizes: "192x192", type: "image/png" },
          ],
          // iOS ignores SVG touch icons: a 180×180 PNG, full-bleed (iOS rounds it).
          apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
    ...verificationMetadata(),
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
  const fontClasses = [
    geist.variable,
    geistMono.variable,
    ...(locale !== "en" ? [reemKufiArabic.variable, reemKufiLatin.variable] : []),
  ]
    .filter(Boolean)
    .join(" ");

  // Only the namespaces that client components actually read: Nav (nav,
  // extensions.items) and the cookie banner (consent). Passing the whole
  // catalogue shipped every string into the RSC payload of every page.
  const messages = await getMessages();
  const clientMessages = {
    nav: messages.nav,
    extensions: messages.extensions,
    consent: messages.consent,
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
        {/* DNS only: a full preconnect to the app went unused on first load (Lighthouse). */}
        <link rel="dns-prefetch" href={`https://${BRAND_APP_HOST}`} />
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        {/* A brand's own colours over the globals.css palette (none for TajirPoint). */}
        {BRAND_THEME_CSS && <style dangerouslySetInnerHTML={{ __html: BRAND_THEME_CSS }} />}
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
        <SiteTracking />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale as Locale} messages={clientMessages}>
            {children}
            {/* Inside the intl provider: its cookie banner is translated. */}
            <AnalyticsProvider />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
