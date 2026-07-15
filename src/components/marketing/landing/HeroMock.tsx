"use client";

import { useState, useEffect } from "react";

/**
 * The POS screen shown inside the hero browser frame — an interactive mini-till.
 * Tap a product to ring it up, step quantities up/down, and the cart totals and
 * Charge button update live. Rebuilt in HTML/CSS (no binary asset) and styled as
 * the light POS UI that sits inside the dark browser bezel.
 *
 * It's a decorative hero flourish, so the whole thing is aria-hidden and its
 * controls are taken out of the tab order — mouse-play only, no AT expectations.
 */

type Product = {
  id: string;
  name: string;
  price: number;
  from: string;
  to: string;
  glyph: string;
};

const PRODUCTS: Product[] = [
  { id: "tee", name: "Classic Tee", price: 1200, from: "#2DD4BF", to: "#0D9488", glyph: "tee" },
  { id: "jeans", name: "Denim Jeans", price: 3400, from: "#6366F1", to: "#3730A3", glyph: "pants" },
  { id: "sneakers", name: "Street Sneakers", price: 6900, from: "#FB923C", to: "#C2410C", glyph: "shoe" }, // prettier-ignore
  { id: "cap", name: "Runner Cap", price: 950, from: "#A8A29E", to: "#57534E", glyph: "cap" },
  { id: "hoodie", name: "Zip Hoodie", price: 2800, from: "#64748B", to: "#334155", glyph: "tee" },
  { id: "backpack", name: "Day Backpack", price: 4200, from: "#34D399", to: "#047857", glyph: "bag" }, // prettier-ignore
  { id: "socks", name: "Sport Socks", price: 600, from: "#FBBF24", to: "#B45309", glyph: "sock" },
  { id: "belt", name: "Leather Belt", price: 1100, from: "#B45309", to: "#78350F", glyph: "belt" },
];

const BY_ID: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const GLYPH: Record<string, string> = {
  tee: "M8 3 5 5 3 8l2.5 2 1-1V21h11V9l1 1L21 8l-2-3-3-2c-.5 1.6-2 2.6-3.5 2.6S8.5 4.6 8 3Z",
  pants: "M7 3h10l-.5 8L18 21h-4l-1.5-8h-1L10 21H6l1.5-10L7 3Z",
  shoe: "M2 16c0-1 .5-2 2-3l4-3 2 2 3-1 8 4c1 .5 1 3-1 3H2v-2Z",
  cap: "M3 15a9 9 0 0 1 18 0H3Zm18 0 2 1v2H1v-2l2-1",
  bag: "M6 8h12l1 13H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2",
  sock: "M8 3h6v8c0 2 0 3 2 5l2 2-3 3-4-3c-2-1.5-3-3-3-6V3Z",
  belt: "M2 9h20v6H2zM15 9v6M8 12h4",
};

const ICON: Record<string, string> = {
  clock: "M12 7v5l3 2 M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  home: "M3 11 12 3l9 8 M5 10v10h14V10",
  receipt: "M6 2h12v20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 22V2ZM9 7h6M9 11h6",
  calc: "M6 2h12v20H6zM9 6h6M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01",
  monitor: "M3 4h18v12H3zM9 20h6M12 16v4",
  printer: "M6 8V3h12v5 M6 18H4V9h16v9h-2 M8 14h8v7H8z",
};

const fmt = (n: number) => n.toLocaleString("en-US");

type Line = { id: string; qty: number };

export function HeroMock() {
  // Seeded so the till looks in-use on load; matches the design's opening total.
  const [cart, setCart] = useState<Line[]>([
    { id: "tee", qty: 1 },
    { id: "cap", qty: 1 },
  ]);
  const [flash, setFlash] = useState<string | null>(null);

  // Clear the just-added highlight shortly after (setState lives in the timeout,
  // not the effect body, so it doesn't trip the cascading-render lint).
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 450);
    return () => clearTimeout(t);
  }, [flash]);

  const add = (id: string) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      if (found) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id, qty: 1 }];
    });
    setFlash(id);
  };
  const inc = (id: string) =>
    setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)));
  const dec = (id: string) =>
    setCart((c) =>
      c.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]))
    );

  const qtyOf = (id: string) => cart.find((l) => l.id === id)?.qty ?? 0;
  const units = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + (BY_ID[l.id]?.price ?? 0) * l.qty, 0);

  return (
    <div
      aria-hidden="true"
      className="aspect-[1857/911] w-full overflow-hidden bg-[#F5F6F7] font-sans text-[#101418]"
    >
      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[#E7E9EC] bg-white px-3 py-[7px] text-[7px] sm:text-[10px]">
        <span className="font-mono uppercase tracking-wide text-[#9AA1A9]">Customer</span>
        <span className="flex items-center gap-1 rounded-md border border-[#E1E4E8] px-2 py-1 font-semibold">
          Walk in Customer <span className="text-[#9AA1A9]">▾</span>
        </span>
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-md border border-[#E1E4E8] text-[#6B7280] sm:h-6 sm:w-6">
          +
        </span>
        <span className="ml-1 font-mono uppercase tracking-wide text-[#9AA1A9]">Price</span>
        <span className="flex items-center gap-1 rounded-md border border-[#E1E4E8] px-2 py-1 font-semibold">
          Retail <span className="text-[#9AA1A9]">▾</span>
        </span>
        <span className="rounded-md border border-[#E1E4E8] px-2 py-1 font-semibold text-[#374151]">
          + Open Item
        </span>
        <span className="hidden rounded-md border border-[#E1E4E8] px-2 py-1 font-semibold text-[#374151] sm:inline">
          Park
        </span>

        <div className="ml-auto flex items-center gap-1.5 text-[#6B7280]">
          {["clock", "home", "receipt", "calc", "monitor", "printer"].map((k) => (
            <ToolIcon key={k} d={ICON[k] ?? ""} />
          ))}
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-md bg-[#101418] text-white sm:h-6 sm:w-6">
            ≡
          </span>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="grid h-[calc(100%-33px)] grid-cols-[38%_1fr] sm:h-[calc(100%-41px)] sm:grid-cols-[34%_1fr]">
        {/* Left — Current Sale */}
        <div className="flex flex-col border-r border-[#E7E9EC] bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold tracking-[-0.02em] sm:text-[15px]">
              Current Sale
            </span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EEF0F2] px-1 text-[8px] font-bold text-[#6B7280] tabular-nums sm:text-[10px]">
              {units}
            </span>
          </div>
          <div className="mt-1 text-[7px] text-[#9AA1A9] tabular-nums sm:text-[9px]">
            {cart.length} lines · {units} units
          </div>

          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-[#E1E4E8] px-2 py-1.5 text-[7px] text-[#9AA1A9] sm:mt-3 sm:text-[9px]">
            <span>⌕</span> Scan / search product by name, code, IMEI
            <span className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-[#101418] text-white sm:h-5 sm:w-5">
              ⤢
            </span>
          </div>

          {/* Cart */}
          <div className="mt-2 flex-1 space-y-1.5 overflow-y-auto sm:mt-3">
            {cart.length === 0 ? (
              <div className="flex h-full items-center justify-center px-2 text-center text-[8px] leading-relaxed text-[#9AA1A9] sm:text-[11px]">
                Cart is empty — tap a product to ring it up →
              </div>
            ) : (
              cart.map((line) => {
                const p = BY_ID[line.id];
                if (!p) return null;
                return (
                  <div
                    key={line.id}
                    className={`flex items-center gap-1.5 rounded-lg border bg-[#FAFBFB] px-1.5 py-1.5 transition-colors duration-300 sm:gap-2 ${
                      flash === line.id ? "border-[#00D27A] bg-[#ECFDF5]" : "border-[#EEF0F2]"
                    }`}
                  >
                    <span
                      className="h-6 w-6 flex-none rounded-md sm:h-8 sm:w-8"
                      style={{ background: `linear-gradient(150deg, ${p.from}, ${p.to})` }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[8px] font-bold sm:text-[11px]">
                        {p.name}
                      </span>
                      <span className="block font-mono text-[7px] text-[#9AA1A9] tabular-nums sm:text-[9px]">
                        Rs {fmt(p.price * line.qty)}
                      </span>
                    </span>

                    {/* Quantity stepper */}
                    <span className="flex flex-none items-center rounded-full border border-[#E1E4E8] bg-white">
                      <Step label="Decrease" onClick={() => dec(line.id)}>
                        −
                      </Step>
                      <span className="min-w-3 px-0.5 text-center text-[8px] font-bold tabular-nums sm:min-w-4 sm:text-[10px]">
                        {line.qty}
                      </span>
                      <Step label="Increase" onClick={() => inc(line.id)}>
                        +
                      </Step>
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Totals + charge */}
          <div className="mt-2 space-y-0.5 border-t border-[#EEF0F2] pt-2 text-[7px] tabular-nums sm:text-[9px]">
            <Row label="Subtotal" value={`Rs ${fmt(total)}`} />
            <Row label="GST 0%" value="Rs 0" muted />
            <div className="flex items-center justify-between pt-0.5 text-[9px] font-extrabold sm:text-[12px]">
              <span>Total</span>
              <span>Rs {fmt(total)}</span>
            </div>
          </div>
          <button
            type="button"
            tabIndex={-1}
            disabled={units === 0}
            className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[8px] font-extrabold transition-colors duration-200 sm:py-2.5 sm:text-[11px] ${
              units === 0
                ? "cursor-default bg-[#E7E9EC] text-[#9AA1A9]"
                : "bg-[#00D27A] text-[#04130B] hover:bg-[#00b86a]"
            }`}
          >
            {units === 0 ? "Cart empty" : `Charge Rs ${fmt(total)} →`}
          </button>
        </div>

        {/* Right — product grid */}
        <div className="flex flex-col overflow-hidden p-3 sm:p-4">
          <div className="flex items-center gap-2 text-[8px] font-semibold text-[#6B7280] sm:text-[11px]">
            <span>Category</span>
            <span>Brand</span>
            <span className="rounded-md bg-[#101418] px-2 py-1 font-bold text-white">Featured</span>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-1.5 sm:mt-3 sm:gap-2">
            {PRODUCTS.map((p) => {
              const inCart = qtyOf(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => add(p.id)}
                  className="group relative overflow-hidden rounded-lg border border-[#EAECEF] bg-white text-left transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(16,20,24,.13)] active:scale-95"
                >
                  <div
                    className="relative flex aspect-square items-center justify-center"
                    style={{ background: `linear-gradient(150deg, ${p.from}, ${p.to})` }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-1/2 w-1/2 opacity-90 transition-transform duration-150 group-active:scale-90"
                      fill="none"
                      stroke="white"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={GLYPH[p.glyph] ?? GLYPH.tee} />
                    </svg>

                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#22C55E] ring-2 ring-white" />

                    {/* Top-left: qty-in-cart badge, or an add "+" on hover */}
                    {inCart > 0 ? (
                      <span className="absolute left-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-white px-1 text-[8px] font-extrabold tabular-nums text-[#0D9488] shadow sm:h-5 sm:min-w-5 sm:text-[11px]">
                        {inCart}
                      </span>
                    ) : (
                      <span className="absolute left-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/90 text-[9px] font-bold text-[#0D9488] opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100 sm:h-5 sm:w-5 sm:text-[12px]">
                        +
                      </span>
                    )}
                  </div>

                  <div className="px-1.5 py-1">
                    <div className="truncate text-[7px] font-bold sm:text-[9.5px]">{p.name}</div>
                    <div className="font-mono text-[7px] text-[#6B7280] tabular-nums sm:text-[9px]">
                      Rs {fmt(p.price)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 sm:h-[15px] sm:w-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function Step({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      onClick={onClick}
      className="flex h-4 w-4 items-center justify-center text-[10px] font-bold leading-none text-[#374151] transition-colors hover:text-[#00D27A] sm:h-5 sm:w-5 sm:text-[13px]"
    >
      {children}
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#9AA1A9]">{label}</span>
      <span className={`font-mono ${muted ? "text-[#9AA1A9]" : "text-[#374151]"}`}>{value}</span>
    </div>
  );
}
