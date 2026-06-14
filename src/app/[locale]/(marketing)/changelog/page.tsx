import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Changelog — What's New in Tajir Point",
  description: "Latest features, improvements, and fixes across Tajir Point POS, inventory, khata, and storefront. Updated every release.",
  path: "/changelog",
});

type ChangeType = "feature" | "improvement" | "fix" | "security";

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  headline: string;
  changes: Change[];
}

const RELEASES: Release[] = [
  {
    version: "v3.4.0",
    date: "15 Apr 2025",
    headline: "ZATCA Phase 2 compliance + UAE multi-VAT support",
    changes: [
      { type: "feature", text: "Full ZATCA Phase 2 e-invoicing (CSID generation, cryptographic stamp, clearance API)" },
      { type: "feature", text: "UAE multi-VAT rate support — standard (5%), zero-rated, and exempt line items on same receipt" },
      { type: "feature", text: "Arabic receipt templates with right-to-left layout and ZATCA QR code" },
      { type: "improvement", text: "Offline sync performance improved by 40% on low-RAM Android devices" },
      { type: "improvement", text: "Khata ledger export now includes payment method breakdown" },
      { type: "fix", text: "Fixed duplicate receipt numbering when printing across two concurrent terminals" },
    ],
  },
  {
    version: "v3.3.0",
    date: "1 Mar 2025",
    headline: "Restaurant KDS overhaul + table management",
    changes: [
      { type: "feature", text: "New Kitchen Display System (KDS) with course sequencing and bump-on-pickup" },
      { type: "feature", text: "Table layout editor — drag-and-drop floor plans with live status overlay" },
      { type: "feature", text: "Split-bill and merge-table workflows for hospitality operations" },
      { type: "improvement", text: "POS receipt printer now supports 58mm and 80mm thermal paper auto-detection" },
      { type: "improvement", text: "Urdu POS interface — improved keyboard layout for Nastaleeq text entry" },
      { type: "fix", text: "Fixed tax rounding on mixed-rate carts for FBR Tier-1 retailers" },
      { type: "security", text: "Upgraded TLS to 1.3 for all cloud sync endpoints" },
    ],
  },
  {
    version: "v3.2.0",
    date: "10 Jan 2025",
    headline: "Storefront 2.0 — custom domain, SEO, and product pages",
    changes: [
      { type: "feature", text: "Custom domain support for Storefront (CNAME + auto SSL)" },
      { type: "feature", text: "Product detail pages with SEO meta, image galleries, and related products" },
      { type: "feature", text: "Storefront now available in Arabic with RTL product cards" },
      { type: "feature", text: "JazzCash online payment integration for Storefront checkout" },
      { type: "improvement", text: "Inventory sync from POS to Storefront is now real-time (was 15-minute batch)" },
      { type: "fix", text: "Fixed search ranking issue causing out-of-stock items to appear first" },
    ],
  },
  {
    version: "v3.1.0",
    date: "5 Nov 2024",
    headline: "Purchase orders, dispatch, and supplier management",
    changes: [
      { type: "feature", text: "Full purchase order lifecycle — draft, approve, receive, and auto-update stock" },
      { type: "feature", text: "Dispatch module with driver assignment, delivery tracking, and proof-of-delivery" },
      { type: "feature", text: "Supplier ledger — track payables, credit terms, and outstanding invoices" },
      { type: "improvement", text: "Growth plan dashboard redesigned with branch comparison widgets" },
      { type: "improvement", text: "CSV and Excel export for all reports including daily Z-report" },
      { type: "fix", text: "Fixed stock calculation when partial returns were processed offline" },
    ],
  },
  {
    version: "v3.0.0",
    date: "1 Sep 2024",
    headline: "Tajir Point 3.0 — new architecture, new UI, same offline reliability",
    changes: [
      { type: "feature", text: "Complete UI redesign — faster, cleaner, and accessible at WCAG 2.1 AA" },
      { type: "feature", text: "Multi-branch management with branch-level access control" },
      { type: "feature", text: "Single sign-on (SSO) via SAML 2.0 for Enterprise plans" },
      { type: "feature", text: "End-to-end encrypted offline sync using CRDTs for conflict-free merge" },
      { type: "improvement", text: "App startup time reduced from 4.2s to 1.1s on mid-range Android (2GB RAM)" },
      { type: "security", text: "All data at rest now encrypted with AES-256; key rotation every 90 days" },
      { type: "security", text: "Third-party penetration test completed — all critical findings resolved" },
    ],
  },
];

const TYPE_STYLES: Record<ChangeType, { label: string; classes: string }> = {
  feature:     { label: "New",         classes: "bg-[var(--color-mint)]/15 text-[#009955]" },
  improvement: { label: "Improved",    classes: "bg-blue-50 text-blue-700" },
  fix:         { label: "Fixed",       classes: "bg-orange-50 text-orange-700" },
  security:    { label: "Security",    classes: "bg-purple-50 text-purple-700" },
};

export default function ChangelogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-14 lg:pt-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            What's new
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)]">
            Changelog
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[480px]">
            Every release, every improvement. We ship updates regularly — here's what's changed.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="flex flex-col gap-0">
            {RELEASES.map((release, i) => (
              <div
                key={release.version}
                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-14 py-14 border-t border-[var(--color-line)] first:border-t-0"
              >
                {/* Left: version + date */}
                <div className="lg:pt-1">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-[15px] font-bold text-[var(--color-ink)] font-mono">{release.version}</span>
                    {i === 0 && (
                      <span className="text-[10px] font-bold bg-[var(--color-mint)] text-[var(--color-ink)] px-2 py-0.5 rounded-full tracking-wide">
                        LATEST
                      </span>
                    )}
                  </div>
                  <div className="text-[13.5px] text-[var(--color-muted)]">{release.date}</div>
                </div>

                {/* Right: content */}
                <div>
                  <h2 className="text-[22px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)] mb-6">
                    {release.headline}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {release.changes.map((change, j) => {
                      const style = TYPE_STYLES[change.type];
                      return (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className={`shrink-0 mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${style.classes}`}
                          >
                            {style.label}
                          </span>
                          <span className="text-[14.5px] text-[var(--color-muted)] leading-[1.55]">
                            {change.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-[var(--color-line)] text-center">
            <p className="text-[14px] text-[var(--color-muted)]">
              Older releases are available in our{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.tajirpoint.com"}/changelog`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] font-semibold hover:text-[var(--color-mint)] transition-colors"
              >
                documentation archive →
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
