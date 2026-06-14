import {
  Boxes,
  Monitor,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Truck,
  Upload,
  UtensilsCrossed,
} from "lucide-react";
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

const features: Feature[] = [
  {
    num: "01 / SELL ANYWHERE",
    icon: <Monitor size={22} />,
    title: "POS that doesn't blink",
    body: "Cart, NumPad, barcode scan, hold orders, parked carts, shift open/close. Cash, card, cheque, wallet, split tenders.",
    pills: ["All thermal printers", "Hold & park", "Multi-tender", "Custom receipts"],
  },
  {
    num: "02 / INVENTORY",
    icon: <Boxes size={22} />,
    title: "Stock you can actually trust.",
    body: "Multi-warehouse with in-transit tracking. FIFO / Moving Average / Actual cost per product. UOM conversions auto-chain across carton ↔ box ↔ piece. Batch tracking, serial numbers, GRNs that capture UOM + batch + serial + cost in one transaction.",
    pills: [
      "Multi-warehouse",
      "FIFO / MovAvg / Actual",
      "UOM graph",
      "Batches & serials",
      "GRNs",
      "Custom fields",
    ],
    dark: true,
  },
  {
    num: "03 / SALES & PROMO",
    icon: <ReceiptText size={22} />,
    title: "Quote → invoice → returns",
    body: "Quotations convert to sales orders. Multi-rule discount engine: time-based, customer-segment, BOGO, percentage, fixed.",
    pills: ["Coupons", "Loyalty", "Wallet credit", "Returns"],
  },
  {
    num: "04 / PURCHASES",
    icon: <ShoppingCart size={22} />,
    title: "PO to payment, one trail",
    body: "POs → GRN → supplier invoice → payment. Returns to supplier with credit notes. Advances allocated against bills.",
    pills: ["PO lifecycle", "Returns", "Advances"],
  },
  {
    num: "05 / DISPATCH",
    icon: <Truck size={22} />,
    title: "Trip planning & POD",
    body: "Multi-stop trips, load/unload tracking, a driver app on iPhone or Android, proof-of-delivery capture, end-of-day reconciliation.",
    pills: ["Driver app", "POD", "Trip reconcile"],
  },
  {
    num: "06 / RESTAURANTS",
    icon: <UtensilsCrossed size={22} />,
    title: "Kitchen, tables, takeaway",
    body: "Menu with modifiers and photos, table floor plan, KDS with station routing, dine-in / takeaway / delivery.",
    pills: ["KDS", "Tables", "Reservations", "Online"],
  },
  {
    num: "07 / REPORTS",
    icon: <TrendingUp size={22} />,
    title: "10+ pre-built, fast at scale",
    body: "Inventory valuation, P&L, tax summary, customer/supplier ledgers, COGS, stock aging. Instant even with a million transactions in the books.",
    pills: ["Smooth scrolling", "Instant filters", "KPI dashboard"],
  },
  {
    num: "08 / TEAMS & SECURITY",
    icon: <ShieldCheck size={22} />,
    title: "Bulletproof permissions.",
    body: "Eight ready-made roles plus full custom — from Cashier to Regional Manager. Sensitive financial data stays in the right hands. Every action is tracked, every shift is attributed, nothing is ever truly deleted.",
    pills: [
      "Granular roles",
      "Per-shift attribution",
      "Full audit trail",
      "Recoverable history",
      "Trusted integrations",
    ],
    dark: true,
  },
  {
    num: "09 / ONBOARDING",
    icon: <Upload size={22} />,
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
                  f.dark
                    ? "bg-white/[0.07] text-[var(--color-mint)]"
                    : "bg-[var(--color-bg-3)] text-[var(--color-ink)]"
                )}
              >
                {f.icon}
              </div>
              <h3
                className={cn(
                  "text-[21px] leading-[1.2] mb-2.5 tracking-[-0.025em]",
                  f.dark && "text-white"
                )}
              >
                {f.title}
              </h3>
              <p
                className={cn(
                  "text-[15px] leading-[1.55]",
                  f.dark ? "text-white/[0.65]" : "text-[var(--color-muted)]"
                )}
              >
                {f.body}
              </p>
              <ul className="flex flex-wrap gap-1.5 mt-4.5 mt-[18px]" role="list">
                {f.pills.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      "text-[11.5px] px-2.5 py-1 rounded-full font-medium",
                      f.dark
                        ? "bg-white/[0.07] text-white/85"
                        : "bg-[var(--color-bg-3)] text-[var(--color-ink-3)]"
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
