"use client";

import { useRef, useEffect, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils/cn";

/* ─── Stage ──────────────────────────────────────────────────────────────── */

export function HeroStage() {
  const ipadRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ipadRef.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    requestAnimationFrame(() => {
      if (!ipadRef.current) return;
      ipadRef.current.style.transform = `rotateX(${8 - y * 4}deg) rotateY(${-12 + x * 6}deg) rotate(${-2 + x * 1}deg)`;
    });
  }
  function onLeave() {
    if (ipadRef.current) ipadRef.current.style.transform = "";
  }

  return (
    <div
      ref={stageRef}
      className="relative mt-8 lg:mt-0 pt-4 lg:pt-6 lg:pb-8 self-center w-full flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
    >
      {/* perspective wrapper — constrain width to prevent horizontal overflow */}
      <div
        className="relative w-full max-w-[min(92vw,100%)] lg:max-w-full"
        style={{ perspective: 1800 }}
      >
        {/* ── Floating notification cards ── */}

        {/* Left card — visible on all sizes, stays inside container on mobile */}
        <FloatingBubble
          variant="mint"
          label="Sale · charged"
          name="Rs 2,059.20"
          sub="3 items · Cash · #A-2486"
          className={cn(
            "absolute z-[3] animate-[float_6s_ease-in-out_infinite]",
            // Tucked inside on mobile, overhangs on desktop
            "top-[36px] left-2 scale-90 origin-top-left",
            "lg:top-[60px] lg:-left-9 lg:scale-100"
          )}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        {/* Right card — desktop only, overhangs right */}
        <FloatingBubble
          variant="amber"
          label="Storefront synced"
          name="3 online orders"
          sub="Inventory · 5 channels"
          className="absolute top-1/2 -right-12 z-[3] -translate-y-1/2 animate-[float3_8s_ease-in-out_-2s_infinite] hidden lg:flex"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M21 12a9 9 0 11-9-9c2.4 0 4.6.9 6.3 2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        {/* Bottom card — visible on all sizes, stays inside container on mobile */}
        <FloatingBubble
          variant="dark"
          label="12 queued · syncing"
          name="All systems green"
          sub="Auto-merges on reconnect"
          className={cn(
            "absolute z-[3] animate-[float_7s_ease-in-out_infinite_reverse]",
            "bottom-2 right-2 scale-90 origin-bottom-right",
            "lg:-bottom-7 lg:right-2 lg:scale-100"
          )}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 2v4M12 18v4M5 12H1M23 12h-4M19 5l-3 3M19 19l-3-3M5 19l3-3M5 5l3 3" strokeLinecap="round" />
            </svg>
          }
        />

        {/* ── iPad frame ── */}
        <div
          ref={ipadRef}
          id="ipad"
          className="relative w-full rounded-[42px] p-[14px] aspect-[1180/820] transition-transform duration-300 ease-out will-change-transform"
          style={{
            background: "linear-gradient(135deg, #1c1c1e 0%, #2a2a2d 100%)",
            boxShadow:
              "0 60px 120px -40px rgba(10,42,32,0.45), 0 30px 60px -20px rgba(0,0,0,0.25), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
            transform: "rotateX(8deg) rotateY(-12deg) rotate(-2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className="absolute left-1/2 top-[18px] w-1.5 h-1.5 rounded-full bg-[#0a0a0a] -translate-x-1/2"
            aria-hidden="true"
          />
          <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative">
            {/* Gloss overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-[5]"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.08) 100%)",
              }}
            />
            {/* Scale the fixed-pixel POS layout to fit any container size */}
            <IpadScaler>
              <IpadPos />
            </IpadScaler>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── IpadScaler ─────────────────────────────────────────────────────────── */
/**
 * The POS screen is designed at 1180×820px.
 * This wrapper measures its container and scales the content down proportionally
 * so it always fills the iPad at any viewport width.
 */
function IpadScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setScale(entry.contentRect.width / 1180);
    });
    ro.observe(el);
    // Set initial scale synchronously on first render
    setScale(el.offsetWidth / 1180);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        style={{
          width: 1180,
          height: 820,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── FloatingBubble ─────────────────────────────────────────────────────── */

function FloatingBubble({
  icon,
  label,
  name,
  sub,
  className,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  sub: string;
  className?: string;
  variant: "mint" | "amber" | "dark";
}) {
  const iconBg =
    variant === "mint"
      ? "bg-[var(--color-mint-soft)] text-[#0d6b3d]"
      : variant === "amber"
      ? "bg-[#fff5e0] text-[#a86b00]"
      : "bg-[var(--color-ink)] text-[var(--color-mint)]";

  return (
    <div
      className={cn(
        "flex gap-3.5 items-start bg-white rounded-[20px] px-5 py-4",
        "shadow-[0_30px_60px_-20px_rgba(10,42,32,0.30),0_0_0_1px_var(--color-line)]",
        className
      )}
      role="status"
    >
      <span
        className={cn("w-[42px] h-[42px] shrink-0 rounded-xl flex items-center justify-center", iconBg)}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted-2)]">
          {label}
        </span>
        <span className="text-[15px] font-semibold text-[var(--color-ink)] tracking-[-0.015em]">
          {name}
        </span>
        <span className="text-[12.5px] text-[var(--color-muted)]">{sub}</span>
      </span>
    </div>
  );
}

/* ─── IpadPos (fixed 1180×820 layout, scaled by IpadScaler) ─────────────── */

function IpadPos() {
  const items = [
    { name: "Pepsi 1.5L", price: "Rs 220", color: "#16a34a" },
    { name: "Lays · Salt", price: "Rs 60",  color: "#ffd000" },
    { name: "Coke 500ml", price: "Rs 120",  color: "#dc2626" },
    { name: "Mineral 1L", price: "Rs 90",   color: "#3b82f6", hot: true },
    { name: "Fanta",      price: "Rs 100",  color: "#f97316" },
    { name: "Tea bag",    price: "Rs 40",   color: "#92400e" },
    { name: "Milk pack",  price: "Rs 280",  color: "#a3a3a3" },
    { name: "Bread",      price: "Rs 180",  color: "#d97706" },
  ];

  return (
    <div className="grid grid-cols-[200px_1fr_260px] xl:grid-cols-[240px_1fr_320px] h-full text-[13px]">
      {/* Left nav */}
      <aside className="bg-[#fafafa] border-r border-[var(--color-line)] px-3.5 py-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 px-2.5 py-2 mb-4">
          <Mark className="w-6 h-6" />
          <span className="font-arabic font-bold text-[15px]" style={{ direction: "rtl", fontFamily: "var(--font-arabic)" }}>تاجر</span>
          <span className="w-px h-3.5 bg-[var(--color-ink)] opacity-20" />
          <span className="font-bold text-[14px] tracking-[-0.03em]">point</span>
        </div>
        {[
          { label: "Sell",      active: true },
          { label: "Orders"       },
          { label: "Inventory"    },
          { label: "Customers"    },
          { label: "Khata"        },
          { label: "Reports"      },
        ].map((row) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] font-medium",
              row.active ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-3)]"
            )}
          >
            <span className="w-3 h-3 inline-block rounded-sm bg-current opacity-70" />
            {row.label}
          </div>
        ))}
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted-2)] px-3 pt-3.5 pb-1.5 font-semibold">
          Branch
        </div>
        <div className="px-2.5 py-2 text-[12.5px] text-[var(--color-ink-3)] font-medium">Liaquat Road</div>
        <div className="px-2.5 py-2 text-[12.5px] text-[var(--color-ink-3)] font-medium">Saddar · #2</div>
      </aside>

      {/* Product grid */}
      <main className="px-5 py-4 flex flex-col gap-3.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <h4 className="text-[18px] font-bold tracking-[-0.025em]">Beverages · 24 SKUs</h4>
          <div className="px-3 py-1 rounded-full bg-[var(--color-mint-soft)] text-[#075c33] text-[11px] font-semibold inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]" style={{ boxShadow: "0 0 0 3px rgba(0,210,122,0.25)" }} />
            Offline · 12 queued
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["All", "Soft", "Water", "Juice", "Hot"].map((c, i) => (
            <span
              key={c}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11.5px] font-medium",
                i === 0 ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-bg-3)] text-[var(--color-muted)]"
              )}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 flex-1">
          {items.map((item) => (
            <div
              key={item.name}
              className={cn(
                "rounded-[14px] p-2.5 flex flex-col justify-between aspect-[1/1.05]",
                item.hot ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-bg-3)]"
              )}
            >
              <span
                className="w-8 h-8 rounded-[10px] block"
                style={{ background: item.hot ? "var(--color-mint)" : item.color }}
              />
              <div>
                <div className={cn("text-[11.5px] font-semibold leading-tight", !item.hot && "text-[var(--color-ink)]")}>
                  {item.name}
                </div>
                <div className={cn("font-mono text-[10.5px] mt-0.5", item.hot ? "text-white/55" : "text-[var(--color-muted)]")}>
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart sidebar */}
      <aside className="bg-[#fafafa] border-l border-[var(--color-line)] px-4 py-4 flex flex-col gap-2">
        <h4 className="text-[13px] font-semibold flex justify-between items-center">
          Cart
          <small className="font-mono text-[var(--color-muted-2)] text-[11px] font-medium">3 items</small>
        </h4>
        {[
          { name: "Pepsi 1.5L", q: "× 2", p: "440" },
          { name: "Lays · Salt", q: "× 4", p: "240" },
          { name: "Coke 500ml", q: "× 1", p: "120" },
        ].map((row) => (
          <div key={row.name} className="flex justify-between items-start py-2 border-b border-dashed border-[var(--color-line)]">
            <div>
              <div className="text-[12.5px] font-semibold">{row.name}</div>
              <div className="text-[10.5px] text-[var(--color-muted)] font-mono">{row.q}</div>
            </div>
            <div className="font-mono text-[12px] font-semibold">{row.p}</div>
          </div>
        ))}
        <div className="mt-auto p-3.5 bg-white rounded-[14px] shadow-[inset_0_0_0_1px_var(--color-line)]">
          <div className="flex justify-between text-[11.5px] py-0.5 text-[var(--color-muted)]">
            <span>Subtotal</span><span className="font-mono">800</span>
          </div>
          <div className="flex justify-between text-[11.5px] py-0.5 text-[var(--color-muted)]">
            <span>GST 17%</span><span className="font-mono">136</span>
          </div>
          <div className="flex justify-between text-[18px] font-bold text-[var(--color-ink)] pt-2 mt-1 border-t border-[var(--color-line)] tracking-[-0.02em]">
            <span>Total</span><span>Rs 936</span>
          </div>
        </div>
        <div className="p-3.5 bg-[var(--color-ink)] text-white rounded-full text-center font-semibold text-[13.5px] mt-2.5">
          Charge · Cash
        </div>
      </aside>
    </div>
  );
}
