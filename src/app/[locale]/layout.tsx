import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Reem_Kufi } from "next/font/google";
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

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Not preloaded: the mono face only sets small labels (eyebrows, chart axes),
// so it must not compete with the sans text for the first bytes on a slow
// phone. It still loads as soon as the CSS asks for it, and swaps in.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Not preloaded: only Urdu/Arabic pages use it (see fontClasses below), so a
// preload made every English page download two Arabic font files it never
// draws. The browser fetches it on ur/ar pages when the text needs it.
const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
  preload: false,
});

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
    icons: {
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
  const fontClasses = [geist.variable, geistMono.variable, locale !== "en" ? reemKufi.variable : ""]
    .filter(Boolean)
    .join(" ");

  // Only the namespaces that client components actually read: Nav (nav,
  // extensions.items), ExtensionGrid (extensions) and the cookie banner
  // (consent). Passing the whole catalogue shipped every string into the RSC
  // payload of every page.
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
        {/* Warm up connections to external domains hit on first meaningful interaction */}
        <link rel="preconnect" href="https://app.tajirpoint.com" />
        <JsonLd schema={[organizationSchema(), websiteSchema(locale)]} />
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
