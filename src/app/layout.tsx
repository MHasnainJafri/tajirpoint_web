import type { Metadata } from "next";
import { Geist, Geist_Mono, Reem_Kufi } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "@/styles/globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/config/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const rtlLocales = ["ur", "ar"];
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  // Only include the Arabic font variable when it is actually needed.
  const fontClasses = [geist.variable, geistMono.variable, locale !== "en" ? reemKufi.variable : ""]
    .filter(Boolean)
    .join(" ");

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
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
