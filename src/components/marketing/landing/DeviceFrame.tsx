/**
 * The product shot's setting: a dark, softly-lit panel with a device bezel
 * floating in it.
 *
 * The old hero put the POS in a light browser window on a light page, so the
 * screenshot had nothing to sit against. A dark panel gives the UI contrast
 * and edge, which is what makes a POS page look like a product page rather
 * than a template.
 */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  // Deep vertical padding on purpose: it makes the panel tall enough to
  // balance the copy column instead of floating in a band of white.
  return (
    <div
      className="relative overflow-hidden rounded-[28px] px-4 py-8 shadow-[var(--shadow-hero)] sm:px-7 sm:py-12 lg:px-8 lg:py-[72px]"
      style={{ background: "linear-gradient(150deg,#1c2723 0%,#070c0a 52%,#101a15 100%)" }}
    >
      {/* Two offset blooms — one brand, one neutral — so the panel reads as a
          lit room rather than a flat gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 0%,rgba(0,210,122,.20),transparent 62%)," +
            "radial-gradient(ellipse 60% 50% at 100% 100%,rgba(255,255,255,.10),transparent 60%)",
        }}
      />

      <div className="relative rounded-[20px] border border-white/[0.16] bg-[#0a0f0d] p-[8px] shadow-[0_30px_70px_rgba(0,0,0,.55)] sm:rounded-[24px] sm:p-[10px]">
        <div className="overflow-hidden rounded-[13px] bg-white sm:rounded-[16px]">{children}</div>
      </div>
    </div>
  );
}
