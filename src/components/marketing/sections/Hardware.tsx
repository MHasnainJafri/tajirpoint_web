import { Printer, ScanBarcode, Tablet, Wallet } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Eyebrow } from "@/components/shared/Eyebrow";

const items = [
  {
    icon: <ScanBarcode size={22} />,
    name: "Barcode scanners",
    desc: "1D / 2D, USB or BLE. We test and stock the dependable ones — no surprises at the counter.",
    protocol: "USB · HID · BLE",
  },
  {
    icon: <Printer size={22} />,
    name: "Thermal printers",
    desc: "80mm and 58mm receipts, kitchen printers, label printers — auto-detected, native print.",
    protocol: "ESC/POS · USB · LAN",
  },
  {
    icon: <Wallet size={22} />,
    name: "Cash drawers",
    desc: "Kick-out from the receipt printer. Multi-tray support. Clean reconciliation at shift close.",
    protocol: "RJ-11 kick · USB",
  },
  {
    icon: <Tablet size={22} />,
    name: "Customer displays",
    desc: "Show running total, scan-in items, payment confirmation. Display-2 series + custom branding.",
    protocol: "Display-2 · Serial · USB",
  },
];

export function Hardware() {
  return (
    <Section>
      <Container>
        <SectionHeader right="Bring your own gear or order ours. We sell tested bundles for kiryana, retail, and restaurants — same-day shipping across Pakistan, 2-day to UAE.">
          <Eyebrow>Hardware</Eyebrow>
          <h2 className="display-2">
            Hardware that
            <br />
            just connects.
          </h2>
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-12">
          {items.map((it) => (
            <div
              key={it.name}
              className="p-8 px-7 rounded-[24px] bg-[var(--color-bg-2)] flex flex-col gap-4 min-h-[240px] transition-[background,transform] duration-200 hover:bg-[var(--color-bg-3)] hover:-translate-y-1"
            >
              <div
                className="w-[54px] h-[54px] rounded-2xl bg-white flex items-center justify-center text-[var(--color-ink)]"
                style={{ boxShadow: "0 0 0 1px var(--color-line)" }}
              >
                {it.icon}
              </div>
              <h5 className="text-[17px] font-semibold tracking-[-0.015em]">{it.name}</h5>
              <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.5]">{it.desc}</p>
              <div className="font-mono text-[11px] text-[var(--color-muted-2)] mt-auto">
                {it.protocol}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
