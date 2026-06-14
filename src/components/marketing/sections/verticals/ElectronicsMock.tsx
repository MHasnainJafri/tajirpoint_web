export function ElectronicsMock() {
  return (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.07] mb-4">
        <div className="text-[12px] text-white/50 tracking-[0.12em] uppercase font-semibold">
          Sale · Samsung A55 5G
        </div>
        <div className="font-mono text-[12px] text-[var(--color-mint)]">#E-2042 · serial-tracked</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4">
        <div>
          <div className="p-3.5 bg-white/[0.04] rounded-[14px] flex gap-3 items-start">
            <div className="w-[54px] h-16 rounded-lg shrink-0 bg-gradient-to-br from-[#1f3a5f] to-[#0a2a40]" />
            <div className="flex-1">
              <div className="text-white font-semibold text-[14px]">Samsung Galaxy A55 · 256GB</div>
              <div className="text-white/45 text-[11px] font-mono mt-0.5">SKU SM-A556 · Awesome Navy</div>
              <div className="mt-2 text-[11px] font-mono text-white/55">IMEI 354988123456789</div>
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--color-mint-soft)] text-[#0d6b3d] rounded-full text-[10.5px] font-semibold">
                ● Warranty 1yr
              </div>
            </div>
            <div className="font-mono text-white font-semibold text-right">
              Rs 124,900
              <div className="text-[10px] text-white/45 font-normal mt-1">12mo · Rs 10,950</div>
            </div>
          </div>
          <div className="mt-2 p-3 bg-white/[0.04] rounded-[14px] text-[12px] text-white/70 flex justify-between">
            <span>Trade-in · iPhone 11</span>
            <span className="font-mono">−Rs 28,000</span>
          </div>
        </div>
        <div className="bg-white/[0.04] rounded-[14px] p-4 flex flex-col gap-2">
          <div className="text-[10.5px] text-white/40 tracking-[0.12em] uppercase font-semibold">
            Installment plan
          </div>
          <div className="text-white text-[15px] font-bold">12 × Rs 10,950</div>
          <div className="text-[11px] text-white/55">First payment due today</div>
          <div className="h-px bg-white/[0.08] my-1" />
          <div className="flex justify-between text-[12.5px] text-white/70">
            <span>Net</span>
            <span className="font-mono">96,900</span>
          </div>
          <div className="flex justify-between text-white font-bold text-[14px]">
            <span>Total today</span>
            <span>Rs 10,950</span>
          </div>
          <div className="mt-1.5 px-3.5 py-2.5 bg-[var(--color-mint)] text-[var(--color-ink)] text-center rounded-full text-[12.5px] font-semibold">
            Charge · card
          </div>
        </div>
      </div>
    </>
  );
}
