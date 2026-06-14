import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

const VERTICALS = [
  {
    id: "retail",
    num: "01",
    title: "General Retail",
    subtitle: "Clothing · Grocery · Hardware",
    body: "Variants & price lists for fashion. Barcode-driven checkout for grocery. Label printing, GRNs, batch tracking, multi-branch stock. Scales from a single kiryana to 50 branches.",
    tags: ["Variants & sizes", "Barcode checkout", "Multi-branch stock", "Label printing", "Price tiers", "Reorder alerts"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: "restaurant",
    num: "02",
    title: "Restaurants & Cafés",
    subtitle: "Dine-in · Takeaway · KDS",
    body: "Floor plan, table service, KDS, KOT printing, modifiers, course timings. Quick service or full service — same product, different defaults.",
    tags: ["Floor plan & tables", "Kitchen Display", "KOT printing", "Modifiers & courses", "Online ordering", "Bill split"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    id: "electronics",
    num: "03",
    title: "Electronics",
    subtitle: "Serial-tracked · Warranty · Installments",
    body: "IMEI / serial capture at sale. Warranty windows tied to invoices. Installment plans with auto-reminders. Trade-in valuation against new sales.",
    tags: ["Serial / IMEI", "Warranty register", "Installment plans", "Trade-ins", "RMA & repairs", "Bundle pricing"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
        <rect x="2" y="2" width="20" height="20" rx="2" />
      </svg>
    ),
  },
  {
    id: "services",
    num: "04",
    title: "Digital Services",
    subtitle: "Bookings · Schedules · Subscriptions",
    body: "Multi-staff calendar, recurring appointments, deposits, no-show fees. Online booking syncs to the same calendar. Send reminders over WhatsApp.",
    tags: ["Staff calendar", "Online bookings", "Recurring appts", "Deposits", "WhatsApp reminders", "Resource bookings"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

export function Verticals() {
  return (
    <Section id="verticals">
      <Container>
        {/* Header */}
        <div className="mb-14 md:mb-[72px]">
          <Eyebrow>Launch verticals</Eyebrow>
          <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-16">
            <h2 className="display-2 max-w-[420px]">
              Four shops.
              <br />
              One operating system.
            </h2>
            <p className="text-[17px] text-[var(--color-muted)] max-w-[400px] leading-[1.6] md:pb-1">
              Each vertical ships with its own screen library, reports, and defaults — sharing the same inventory, ledger, and customer record.
            </p>
          </div>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {VERTICALS.map((v) => (
            <div
              key={v.id}
              className="flex flex-col gap-5 rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 lg:p-8 hover:border-[var(--color-line-2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-mint)] uppercase block mb-2">
                    {v.num}
                  </span>
                  <h3 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                    {v.title}
                  </h3>
                  <p className="text-[13px] text-[var(--color-muted)] font-medium mt-0.5">
                    {v.subtitle}
                  </p>
                </div>
                <span className="shrink-0 w-10 h-10 rounded-[10px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)]">
                  {v.icon}
                </span>
              </div>

              {/* Description */}
              <p className="text-[15px] text-[var(--color-ink-2)] leading-[1.65]">{v.body}</p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 pt-1 mt-auto">
                {v.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-white text-[12.5px] text-[var(--color-ink-2)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
