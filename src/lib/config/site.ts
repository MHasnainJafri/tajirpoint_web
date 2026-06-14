// Single source of truth for brand, URLs, nav, and social.
export const siteConfig = {
  name: "Tajir Point",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "The offline-first operating system for the modern merchant — POS, ledger, storefront, in three languages, on every device.",
  tagline: "Run your shop. Everywhere.",
  locale: "en",

  ogImage: "/og-default.png",
  twitterHandle: "@tajirpoint",

  // External links
  dashboardUrl: "https://app.tajirpoint.com",
  signupUrl: "https://app.tajirpoint.com/signup",
  calendlyUrl: "https://calendly.com/mhasnainjafri/tajir-point",
  docsUrl: "https://docs.tajirpoint.com",
  statusUrl: "https://status.tajirpoint.com",

  nav: {
    main: [
      { label: "Solutions", href: "/solutions", mega: "business" },
      { label: "Extensions", href: "/extensions", mega: "extensions" },
      { label: "Pricing", href: "/pricing" },
    ],
    footer: [
      {
        heading: "Solutions",
        links: [
          { label: "General Retail", href: "/solutions/general-retail" },
          { label: "Restaurants", href: "/solutions/restaurants" },
          { label: "Electronics", href: "/solutions/electronics" },
          { label: "Services", href: "/solutions/services" },
          { label: "Distributors", href: "/solutions/distributors" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data Privacy", href: "/data-privacy" },
      { label: "Data Security", href: "/data-security" },
    ],
  },

  social: {
    youtube: "https://youtube.com/@tajirpoint",
    whatsapp: "https://wa.me/923001234567",
    facebook: "https://facebook.com/tajirpoint",
    instagram: "https://instagram.com/tajirpoint",
    tiktok: "https://tiktok.com/@tajirpoint",
  },
} as const;

export type SiteConfig = typeof siteConfig;
