import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { cn } from "@/lib/utils/cn";

interface Feature {
  num: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  pills: string[];
  dark?: boolean;
}

const I = (path: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const features: Feature[] = [
  {
    num: "01 / SELL ANYWHERE",
    icon: I(<><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8M12 18v4"/></>),
    title: "POS that doesn't blink",
    body: "Cart, NumPad, barcode scan, hold orders, parked carts, shift open/close. Cash, card, cheque, wallet, split tenders.",
    pills: ["All thermal printers", "Hold & park", "Multi-tender", "Custom receipts"],
  },
  {
    num: "02 / INVENTORY",
    icon: I(<path d="M20 7l-8-4-8 4 8 4 8-4zM4 11l8 4 8-4M4 15l8 4 8-4"/>),
    title: "Stock you can actually trust.",
    body: "Multi-warehouse with in-transit tracking. FIFO / Moving Average / Actual cost per product. UOM conversions auto-chain across carton ↔ box ↔ piece. Batch tracking, serial numbers, GRNs that capture UOM + batch + serial + cost in one transaction.",
    pills: ["Multi-warehouse", "FIFO / MovAvg / Actual", "UOM graph", "Batches & serials", "GRNs", "Custom fields"],
    dark: true,
  },
  {
    num: "03 / SALES & PROMO",
    icon: I(<><path d="M20 12V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v-1"/><path d="M14 12h8M18 8l4 4-4 4"/></>),
    title: "Quote → invoice → returns",
    body: "Quotations convert to sales orders. Multi-rule discount engine: time-based, customer-segment, BOGO, percentage, fixed.",
    pills: ["Coupons", "Loyalty", "Wallet credit", "Returns"],
  },
  {
    num: "04 / PURCHASES",
    icon: I(<><path d="M3 3h2l3 12h13l3-9H6"/><circle cx="9" cy="20" r="2"/><circle cx="18" cy="20" r="2"/></>),
    title: "PO to payment, one trail",
    body: "POs → GRN → supplier invoice → payment. Returns to supplier with credit notes. Advances allocated against bills.",
    pills: ["PO lifecycle", "Returns", "Advances"],
  },
  {
    num: "05 / DISPATCH",
    icon: I(<><circle cx="6" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M2 5h11l3 12M14 8h6l1 5"/></>),
    title: "Trip planning & POD",
    body: "Multi-stop trips, load/unload tracking, a driver app on iPhone or Android, proof-of-delivery capture, end-of-day reconciliation.",
    pills: ["Driver app", "POD", "Trip reconcile"],
  },
  {
    num: "06 / RESTAURANTS",
    icon: I(<><path d="M3 11h18l-2 9H5l-2-9z"/><path d="M8 11V6a4 4 0 018 0v5"/></>),
    title: "Kitchen, tables, takeaway",
    body: "Menu with modifiers and photos, table floor plan, KDS with station routing, dine-in / takeaway / delivery.",
    pills: ["KDS", "Tables", "Reservations", "Online"],
  },
  {
    num: "07 / REPORTS",
    icon: I(<><path d="M3 3v18h18"/><path d="M7 14l3-3 4 4 5-7"/></>),
    title: "10+ pre-built, fast at scale",
    body: "Inventory valuation, P&L, tax summary, customer/supplier ledgers, COGS, stock aging. Instant even with a million transactions in the books.",
    pills: ["Smooth scrolling", "Instant filters", "KPI dashboard"],
  },
  {
    num: "08 / TEAMS & SECURITY",
    icon: I(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>),
    title: "Bulletproof permissions.",
    body: "Eight ready-made roles plus full custom — from Cashier to Regional Manager. Sensitive financial data stays in the right hands. Every action is tracked, every shift is attributed, nothing is ever truly deleted.",
    pills: ["Granular roles", "Per-shift attribution", "Full audit trail", "Recoverable history", "Trusted integrations"],
    dark: true,
  },
  {
    num: "09 / ONBOARDING",
    icon: I(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></>),
    title: "Setup wizard + bulk import",
    body: "Shop info → currency → tax → first products → first user. Bulk import for products, customers, opening stock, balances.",
    pills: ["Wizard", "Imports", "Migrations"],
  },
];

export function FeatureGrid() {
  return (
    <Section id="features" tone="light-2">
      <Container>
        <SectionHeader right="Everything below ships in the box — not as an extension, not as a partner integration. The platform is the product.">
          <Eyebrow>Native capabilities · day one</Eyebrow>
          <h2 className="display-2">
            Ten buckets.
            <br />
            No bolt-ons.
          </h2>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map((f) => (
            <article
              key={f.title}
              className={cn(
                "p-9 rounded-[24px] transition-[background,transform] duration-200 hover:-translate-y-1",
                f.dark
                  ? "bg-[var(--color-ink)] text-white/[0.78] hover:bg-[#161616] md:col-span-2"
                  : "bg-transparent hover:bg-[var(--color-bg-2)]"
              )}
            >
              <div
                className={cn(
                  "font-mono text-[11.5px] font-medium mb-6 tracking-[0.02em]",
                  f.dark ? "text-[var(--color-mint)]" : "text-[var(--color-muted-2)]"
                )}
              >
                {f.num}
              </div>
              <div
                className={cn(
                  "w-12 h-12 rounded-[14px] flex items-center justify-center mb-5",
                  f.dark ? "bg-white/[0.07] text-[var(--color-mint)]" : "bg-[var(--color-bg-3)] text-[var(--color-ink)]"
                )}
              >
                {f.icon}
              </div>
              <h3 className={cn("text-[21px] leading-[1.2] mb-2.5 tracking-[-0.025em]", f.dark && "text-white")}>
                {f.title}
              </h3>
              <p className={cn("text-[15px] leading-[1.55]", f.dark ? "text-white/[0.65]" : "text-[var(--color-muted)]")}>
                {f.body}
              </p>
              <ul className="flex flex-wrap gap-1.5 mt-4.5 mt-[18px]" role="list">
                {f.pills.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      "text-[11.5px] px-2.5 py-1 rounded-full font-medium",
                      f.dark ? "bg-white/[0.07] text-white/85" : "bg-[var(--color-bg-3)] text-[var(--color-ink-3)]"
                    )}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
