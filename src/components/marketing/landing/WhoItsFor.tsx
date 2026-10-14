import Image from "next/image";

interface Segment {
  id: string;
  img: string;
  title: string;
  badge: string;
  body: string;
}

const SEGMENTS: Segment[] = [
  {
    id: "single",
    img: "/images/shop-counter.webp",
    badge: "1 – 2 COUNTERS",
    title: "Independent shops, cafés & counters",
    body: "From corner shops and coffee bars to phone and laptop stores, one register handles fast checkouts, stock counts and customer credit without complicated setup.",
  },
  {
    id: "multi",
    img: "/images/retail-store.webp",
    badge: "MULTI-LOCATION",
    title: "Chains & growing businesses",
    body: "Manage central inventory across every outlet, transfer stock between warehouses and see consolidated profit & loss in real time.",
  },
  {
    id: "mobile",
    img: "/images/warehouse-stock.webp",
    badge: "ON THE ROAD",
    title: "Wholesale, fleets & factories",
    body: "Sell door to door from a van, dispatch trucks with proof of delivery, or supply dealers from your warehouse — and reconcile cash and stock every evening.",
  },
];

export function WhoItsFor() {
  return (
    <section lang="en" dir="ltr" className="mt-[clamp(64px,9vw,110px)]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">BUILT FOR REAL COMMERCE</div>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            Designed for the way real businesses operate.
          </h2>
        </div>
        <p className="max-w-[42ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          Whether you run one counter, five city branches, a wholesale warehouse or a fleet of
          delivery vans, TajirPoint adapts to your exact scale.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SEGMENTS.map((seg, idx) => (
          <div
            key={seg.id}
            data-reveal
            data-reveal-delay={idx * 80}
            className="group overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-3)] hover:shadow-[0_20px_40px_rgba(10,10,10,.08)]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-[var(--color-bg-3)]">
              <Image
                src={seg.img}
                alt={seg.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#0A0A0A]/75 px-3 py-1 font-mono text-[10px] font-bold tracking-wide text-white backdrop-blur-md">
                {seg.badge}
              </span>
            </div>

            <div className="p-3">
              <h3 className="text-[17px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                {seg.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-body)]">
                {seg.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
