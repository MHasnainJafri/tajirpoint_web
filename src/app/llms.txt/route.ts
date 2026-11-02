import { legal, siteConfig } from "@/lib/config/site";
import { BUSINESSES } from "@/lib/marketing/businesses";
import { RESOURCES } from "@/lib/docs/nav";
import { getPlans, planSummary } from "@/lib/api/plans";
import { STATUS_LABEL, getAddonCatalogue, type Addon } from "@/lib/marketing/addons";
import { CHECKED, COMPARISONS } from "@/content/compare";
import { LOCATIONS, LOCATIONS_HUB, locationPath } from "@/content/locations";

// Served at /llms.txt — a dotted path, so the next-intl proxy matcher
// (which excludes `.*\..*`) skips it, same as /og.png.
//
// Generated rather than dropped in /public so the absolute URLs always follow
// siteConfig.url and the API reference list stays in sync with docs/api-data.json.
// The llmstxt.org format wants a Markdown file with exactly one H1, an optional
// blockquote summary, and H2 sections of `- [name](url): description` links.
//
// The pricing line is read from the plans API, like the pricing cards, and the
// file is regenerated at most every five minutes so an admin edit to a plan
// shows up here too.
export const revalidate = 300;

const url = (path: string) => `${siteConfig.url}${path}`;

function link(name: string, path: string, description: string) {
  return `- [${name}](${url(path)}): ${description}`;
}

function body(pricing: string, addons: Addon[]): string {
  return `# TajirPoint

> TajirPoint is a point-of-sale and back-office system for shops, restaurants,
> pharmacies, distributors and other small and medium businesses — POS,
> inventory, khata (customer and supplier credit), purchasing, staff, online
> ordering and delivery, in English, Urdu and Arabic. The Light plan is free
> for 3 months with no card; Shop and Business are the paid plans.

TajirPoint keeps selling while offline and syncs when the connection returns.
It runs in the browser, as a Windows desktop app and on Android. Switching from
another POS is free: the team loads your products, customers, suppliers and
khata balances for you. Operated by ${legal.operator}, ${legal.city}, ${legal.country}.
Contact: ${legal.email}, WhatsApp ${legal.whatsappDisplay}.

## Core pages

${link("Home", "/", "Product overview — what TajirPoint does and who it is for")}
${link("Pricing", "/pricing", pricing)}
${link("Book a demo", "/book-demo", "Book a free demo; optional free data migration from your old POS")}
${link("Get a call back", "/get-a-call", "Leave a business name and phone number; the team calls within one working day")}
${link("Businesses", "/business", "Every business type TajirPoint is set up for")}
${link("Add-ons", "/extensions", "Optional add-ons (extensions) that add features per shop, with status and price")}
${link("About", "/about", "Who builds TajirPoint")}
${link("Contact", "/contact", "Email and WhatsApp")}
${link("اردو (Urdu home page)", "/ur", "The home page and pricing in Urdu")}
${link("العربية (Arabic home page)", "/ar", "The home page and pricing in Arabic")}
${link("کھاتہ ایپ (Urdu feature pages)", "/ur/features/khata", "Feature pages (khata, offline, accounting, van sales, e-invoicing), book a demo, call back, contact and about are also in Urdu under /ur")}
${link("دفتر الآجل (Arabic feature pages)", "/ar/features/khata", "The same feature, demo, call-back, contact and about pages in Arabic under /ar")}

## By business

${BUSINESSES.map((b) => link(b.name, `/business/${b.slug}`, b.navLine)).join("\n")}

## Locations

${link("Locations", LOCATIONS_HUB.path, "Pakistan and its main cities, and UK takeaways: currency, tax authority and our honest status, payments and languages for each place. Not available yet for the UAE or Saudi Arabia (no UAE e-invoicing or ZATCA)")}
${LOCATIONS.map((l) => link(l.seo.title, locationPath(l.slug), l.summary)).join("\n")}

## Add-ons

${addons.map((a) => link(a.name, `/extensions/${a.slug}`, `${STATUS_LABEL[a.status]}, ${a.price}. ${a.summary}`)).join("\n")}

## Features

${link("Khata app (credit ledger)", "/features/khata", "Running customer and supplier credit balances, the way shops actually track debt")}
${link("Offline POS", "/features/offline", "How the POS keeps selling with no internet and syncs afterwards")}
${link("Accounting", "/features/accounting", "Double-entry ledger posted from POS activity (Shop plan and above)")}
${link("Van sales", "/features/van-sales", "Route selling and day-end reconciliation for distributors")}
${link("Tax & e-invoicing", "/features/e-invoicing", "Tax-inclusive pricing, VAT/GST and withholding at checkout; regulatory e-invoicing connectors (e.g. FBR) are not yet released")}

## Comparisons

${link("Compare", "/compare", `Honest comparisons with paper khata, Excel, a cash register and other POS systems; competitor facts sourced and checked ${CHECKED}`)}
${COMPARISONS.map((c) => link(c.label, `/compare/${c.slug}`, c.blurb)).join("\n")}

## API documentation

${link("API introduction", "/docs", "Overview of the REST API")}
${link("Authentication", "/docs/authentication", "Getting and using an API key")}
${link("Pagination", "/docs/pagination", "How list endpoints paginate")}
${link("Errors", "/docs/errors", "Error codes and response shapes")}
${link("Idempotency", "/docs/idempotency", "Safely retrying money-moving requests")}
${link("Webhooks", "/docs/webhooks", "Subscribing to platform events")}
${RESOURCES.map((r) => link(r.title, `/docs/${r.slug}`, `${r.title} API reference`)).join("\n")}

## Legal

${link("Terms of service", "/terms", "Terms governing use of TajirPoint")}
${link("Privacy policy", "/privacy", "How personal and business data is handled")}
${link("Cookie policy", "/cookies", "Cookies and similar technologies on the website and apps")}
${link("Refund policy", "/refund-policy", "Cancellations and the 15-day refund window")}
${link("Security", "/security", "How accounts and data are protected")}
${link("Delete your account", "/delete-account", "How to request account and data deletion")}

## Optional

- [Merchant app](${siteConfig.dashboardUrl}): the logged-in application (not public)
- [Sign up](${siteConfig.signupUrl}): start the free Light plan
`;
}

export async function GET() {
  const [plans, catalogue] = await Promise.all([getPlans(), getAddonCatalogue()]);
  const summary = planSummary(plans);
  const pricing = summary
    ? `Plans and prices (USD): ${summary}. Light is free for 3 months with no card; paid plans can be cancelled any time, with a 15-day refund window on payments`
    : "Light is free for 3 months with no card; Shop and Business are paid plans, priced in USD";
  return new Response(body(pricing, catalogue.addons), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
