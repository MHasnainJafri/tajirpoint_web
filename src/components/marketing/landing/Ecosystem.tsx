import Image from "next/image";

export function Ecosystem() {
  return (
    <section className="mt-[clamp(64px,9vw,120px)]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">UNIFIED COMMERCE SURFACES</div>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            One platform across every surface you work on.
          </h2>
        </div>
        <p className="max-w-[42ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          Everything syncs in real time: a sale at the checkout immediately updates the stock count
          on your phone and writes the double-entry journal entry in your back office ledger.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
        {/* Left: Back office */}
        <div
          data-reveal
          className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 transition-all duration-300 hover:border-[var(--color-line-3)] hover:shadow-[0_20px_40px_rgba(10,10,10,.08)] lg:col-span-4"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[var(--color-bg-3)]">
            <Image
              src="/images/eco-back-office.jpg"
              alt="Back office analytics on laptop"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[#0A0A0A]/75 px-3 py-1 font-mono text-[10px] font-bold tracking-wide text-white backdrop-blur-md">
              BACK OFFICE & LEDGER
            </span>
          </div>
          <div className="mt-4 p-2">
            <h3 className="text-[17px] font-bold tracking-[-0.02em]">Centralized Management</h3>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-[var(--color-body)]">
              View live revenue, reorder stock from suppliers, and let your accountant pull clean
              general ledger statements without setting foot in the shop.
            </p>
          </div>
        </div>

        {/* Center: The POS Counter (Hero card) */}
        <div
          data-reveal
          data-reveal-delay={80}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border-2 border-[var(--color-mint)] bg-[var(--color-surface)] p-4 shadow-[0_24px_50px_rgba(0,210,122,.12)] transition-all duration-300 hover:shadow-[0_28px_60px_rgba(0,210,122,.2)] lg:col-span-5"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[var(--color-bg-3)]">
            <Image
              src="/images/eco-counter.jpg"
              alt="Checkout counter POS hardware"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[var(--color-mint)] px-3 py-1 font-mono text-[10px] font-extrabold tracking-wide text-[#0A0A0A]">
              POINT OF SALE COUNTER
            </span>
          </div>
          <div className="mt-4 p-2">
            <h3 className="text-[18px] font-bold tracking-[-0.02em]">Sub-Second Checkout Speed</h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--color-body)]">
              Equipped with barcode scanning, quick touch tiles, dual receipts, customer credit
              validation, and offline engine that never stalls during peak rushes.
            </p>
          </div>
        </div>

        {/* Right: Online store & Mobile */}
        <div
          data-reveal
          data-reveal-delay={160}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 transition-all duration-300 hover:border-[var(--color-line-3)] hover:shadow-[0_20px_40px_rgba(10,10,10,.08)] lg:col-span-3"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[var(--color-bg-3)]">
            <Image
              src="/images/eco-online.jpg"
              alt="Customer mobile store ordering"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[#0A0A0A]/75 px-3 py-1 font-mono text-[10px] font-bold tracking-wide text-white backdrop-blur-md">
              ONLINE & MOBILE
            </span>
          </div>
          <div className="mt-4 p-2">
            <h3 className="text-[17px] font-bold tracking-[-0.02em]">Customer Portal</h3>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-[var(--color-body)]">
              Let loyal clients browse your online catalog, view their outstanding khata statement,
              and settle payments via digital wallets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
