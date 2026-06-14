import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const queue = [
  {
    icon: "↑",
    name: "Sale #A-2486",
    small: "Rs 2,059.20 · 3 line items",
    status: "QUEUED" as const,
  },
  {
    icon: "↑",
    name: "Khata payment · Khan Traders",
    small: "Rs 8,000 advance",
    status: "QUEUED" as const,
  },
  {
    icon: "↕",
    name: "Stock transfer · Liaquat → Saddar",
    small: "14 SKUs in transit",
    status: "QUEUED" as const,
  },
  {
    icon: "✓",
    name: "Shift opened · Bilal A.",
    small: "Float Rs 5,000 · 09:14",
    status: "SYNCED" as const,
  },
  {
    icon: "✓",
    name: "GRN #G-1192 · Noor General Store",
    small: "32 cartons received",
    status: "SYNCED" as const,
  },
];

export function Offline() {
  return (
    <Section id="offline" tone="dark">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Eyebrow variant="on-dark">Differentiator · 01</Eyebrow>
            <h2 className="display-2 text-white">
              Works without
              <br />
              internet. Always.
            </h2>
            <p className="lead mt-8">
              When the cable drops, the cashier doesn&apos;t notice. Sales, inventory, customer
              ledgers, receipts — all keep working. The moment you&apos;re back online, every change
              merges perfectly. No duplicates. No lost sales. No conflicts to clean up.
            </p>
            <div className="flex flex-wrap gap-12 mt-10">
              <Stat title="Zero downtime" sub="at the counter, ever" />
              <Stat title="Auto-merge" sub="two branches, one second apart" />
              <Stat title="Always live" sub="local first, cloud second" />
            </div>
            <div className="mt-10">
              <Button asChild variant="mint">
                <a href="https://docs.tajirpoint.com" target="_blank" rel="noopener noreferrer">
                  How sync works <span className="arrow">→</span>
                </a>
              </Button>
            </div>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{
              background: "#0f0f0f",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-2">
              <div className="text-[13px] text-white/50 font-medium">Sync queue · register #2</div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(220,38,38,0.14)] text-[#ffb4b4] text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                Offline · 12m
              </div>
            </div>
            {queue.map((row, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3.5 py-3.5 text-[13.5px] text-white/[0.78]",
                  i < queue.length - 1 && "border-b border-dashed border-white/[0.06]"
                )}
              >
                <div className="w-[30px] h-[30px] rounded-[9px] bg-white/5 flex items-center justify-center text-[var(--color-mint)] text-[13px] shrink-0">
                  {row.icon}
                </div>
                <div className="flex-1">
                  {row.name}
                  <small className="block text-white/40 text-[11.5px] mt-0.5">{row.small}</small>
                </div>
                <span
                  className={cn(
                    "text-[11px] px-2 py-1 rounded-full font-semibold tracking-[0.02em]",
                    row.status === "SYNCED"
                      ? "bg-[rgba(0,210,122,0.16)] text-[var(--color-mint)]"
                      : "bg-[rgba(245,158,11,0.14)] text-[#ffd778]"
                  )}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Stat({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <b className="text-[42px] font-extrabold tracking-[-0.03em] text-white block leading-none">
        {title}
      </b>
      <span className="text-[13px] text-white/55 mt-2 block">{sub}</span>
    </div>
  );
}
