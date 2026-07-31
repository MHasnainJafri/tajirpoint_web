import { siteConfig } from "@/lib/config/site";
import { RESOURCES } from "@/lib/docs/nav";

// Served at /llms.txt — a dotted path, so the next-intl proxy matcher
// (which excludes `.*\..*`) skips it, same as /og.png.
//
// Generated rather than dropped in /public so the absolute URLs always follow
// siteConfig.url and the API reference list stays in sync with docs/api-data.json.
// The llmstxt.org format wants a Markdown file with exactly one H1, an optional
// blockquote summary, and H2 sections of `- [name](url): description` links.
export const dynamic = "force-static";

const url = (path: string) => `${siteConfig.url}${path}`;

function link(name: string, path: string, description: string) {
  return `- [${name}](${url(path)}): ${description}`;
}

function body(): string {
  return `# Tajir Point

> Tajir Point is an offline-first point-of-sale and business operating system for
> small and medium retail, restaurant, electronics and distribution businesses.
> One platform and one login covers POS, inventory,
> purchasing, the khata (running credit ledger), double-entry accounting, staff,
> delivery and an online storefront, extended by 31 optional extensions.

Tajir Point is built for merchants who cannot depend on a stable internet
connection: the POS keeps selling while offline and reconciles when the
connection returns. Tax e-invoicing is supported per regime — FBR in Pakistan
and ZATCA in Saudi Arabia today — and it runs on web, desktop, Android and iOS.

## Core pages

${link("Home", "/", "Product overview — what Tajir Point does and who it is for")}
${link("Pricing", "/pricing", "Starter, Growth and Enterprise plans")}
${link("Solutions", "/solutions", "Index of the industry-specific configurations")}
${link("Extensions", "/extensions", "The 31 optional extensions that bolt onto the core platform")}
${link("About", "/about", "Who builds Tajir Point")}
${link("Contact", "/contact", "Sales and support contact details")}
${link("Book a demo", "/book-demo", "Schedule a live walkthrough")}

## Features

${link("Khata (credit ledger)", "/features/khata", "Running customer and supplier credit balances, the way shops actually track debt")}
${link("Offline mode", "/features/offline", "How the POS keeps selling with no internet and reconciles afterwards")}
${link("Accounting", "/features/accounting", "Double-entry general ledger driven automatically by POS activity")}
${link("Van sales", "/features/van-sales", "Mobile selling and stock reconciliation for distribution routes")}
${link("E-invoicing", "/features/e-invoicing", "FBR (Pakistan) and ZATCA (Saudi Arabia) tax e-invoicing compliance")}

## Industries

${link("General retail", "/solutions/general-retail", "Grocery, pharmacy, apparel and general stores")}
${link("Restaurants", "/solutions/restaurants", "Table service, kitchen display and delivery")}
${link("Electronics", "/solutions/electronics", "Serial and warranty tracking for electronics retail")}
${link("Services", "/solutions/services", "Appointment and service-based businesses")}
${link("Distributors", "/solutions/distributors", "Wholesale and distribution with van sales routes")}

## API documentation

${link("API introduction", "/docs", "Overview of the REST API")}
${link("Authentication", "/docs/authentication", "Getting and using an API key")}
${link("Pagination", "/docs/pagination", "How list endpoints paginate")}
${link("Errors", "/docs/errors", "Error codes and response shapes")}
${link("Idempotency", "/docs/idempotency", "Safely retrying money-moving requests")}
${link("Webhooks", "/docs/webhooks", "Subscribing to platform events")}
${RESOURCES.map((r) => link(r.title, `/docs/${r.slug}`, `${r.title} API reference`)).join("\n")}

## Legal

${link("Privacy policy", "/privacy", "How customer data is handled")}
${link("Terms of service", "/terms", "Terms governing use of Tajir Point")}
${link("Data privacy", "/data-privacy", "Data residency and processing detail")}
${link("Data security", "/data-security", "Security controls and practices")}

## Optional

${link("Security", "/security", "Security posture summary")}
- [Merchant dashboard](${siteConfig.dashboardUrl}): the logged-in application (not public)
- [Status page](${siteConfig.statusUrl}): live platform uptime
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
