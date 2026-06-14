import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Eyebrow } from "@/components/shared/Eyebrow";

const I = (path: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const items = [
  {
    icon: I(<><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6v12M11 6v12M15 6v12"/></>),
    name: "Barcode scanners",
    desc: "1D / 2D, USB or BLE. We test and stock the dependable ones — no surprises at the counter.",
    protocol: "USB · HID · BLE",
  },
  {
    icon: I(<><path d="M6 9V4h12v5"/><rect x="2" y="9" width="20" height="9" rx="2"/><rect x="6" y="14" width="12" height="8"/></>),
    name: "Thermal printers",
    desc: "80mm and 58mm receipts, kitchen printers, label printers — auto-detected, native print.",
    protocol: "ESC/POS · USB · LAN",
  },
  {
    icon: I(<><rect x="2" y="7" width="20" height="11" rx="1"/><path d="M2 11h20M7 14h2"/></>),
    name: "Cash drawers",
    desc: "Kick-out from the receipt printer. Multi-tray support. Clean reconciliation at shift close.",
    protocol: "RJ-11 kick · USB",
  },
  {
    icon: I(<><rect x="3" y="5" width="18" height="11" rx="2"/><path d="M8 20h8M12 16v4"/></>),
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
              <div className="font-mono text-[11px] text-[var(--color-muted-2)] mt-auto">{it.protocol}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
