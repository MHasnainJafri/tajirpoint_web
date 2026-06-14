export function RetailMock() {
  return (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.07] mb-4">
        <div className="text-[12px] text-white/50 tracking-[0.12em] uppercase font-semibold">
          Sale · Sapphire Lawn &apos;26
        </div>
        <div className="font-mono text-[12px] text-[var(--color-mint)]">#R-1842 · 2 items</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4">
        <div>
          <div className="flex gap-3 items-center p-3.5 bg-white/[0.04] rounded-[14px] mb-2.5">
            <div className="w-[54px] h-16 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg,#c44569,#8b3a4f)" }} />
            <div className="flex-1">
              <div className="text-white font-semibold text-[14px]">3-PC Lawn Suit · Maroon</div>
              <div className="text-white/45 text-[11px] font-mono mt-0.5">SKU 7841 · M · Stock 12</div>
              <div className="flex gap-1.5 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] rounded text-white/70">S</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-white text-[var(--color-ink)] rounded font-semibold">M</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] rounded text-white/70">L</span>
              </div>
            </div>
            <div className="font-mono text-white font-semibold">Rs 6,890</div>
          </div>
          <div className="flex gap-3 items-center p-3.5 bg-white/[0.04] rounded-[14px]">
            <div className="w-[54px] h-16 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg,#3a5f8a,#1f3a5f)" }} />
            <div className="flex-1">
              <div className="text-white font-semibold text-[14px]">Embroidered Kurti · Navy</div>
              <div className="text-white/45 text-[11px] font-mono mt-0.5">SKU 7902 · L · Stock 4</div>
              <div className="flex gap-1.5 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] rounded text-white/70">S</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] rounded text-white/70">M</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-white text-[var(--color-ink)] rounded font-semibold">L</span>
              </div>
            </div>
            <div className="font-mono text-white font-semibold">Rs 3,450</div>
          </div>
        </div>
        <div className="bg-white/[0.04] rounded-[14px] p-4 flex flex-col gap-2">
          <div className="text-[10.5px] text-white/40 tracking-[0.12em] uppercase font-semibold">Cart · 2 items</div>
          <div className="flex justify-between text-[12.5px] text-white/70">
            <span>Subtotal</span>
            <span className="font-mono">10,340</span>
          </div>
          <div className="flex justify-between text-[12.5px] text-white/70">
            <span>Loyalty −5%</span>
            <span className="font-mono">−517</span>
          </div>
          <div className="flex justify-between text-[12.5px] text-white/70">
            <span>GST 17%</span>
            <span className="font-mono">1,670</span>
          </div>
          <div className="h-px bg-white/[0.08] my-1" />
          <div className="flex justify-between text-white font-bold">
            <span>Total</span>
            <span>Rs 11,493</span>
          </div>
          <div className="mt-1.5 px-3.5 py-2.5 bg-[var(--color-mint)] text-[var(--color-ink)] text-center rounded-full text-[12.5px] font-semibold">
            Charge · card
          </div>
        </div>
      </div>
    </>
  );
}
