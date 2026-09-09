"use client";

import { useState, useMemo } from "react";
import { DEMO } from "@/lib/design/landing";

interface PosProduct {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  category: "all" | "pantry" | "beverages" | "bakery";
  sku: string;
  stock: number;
  color: string;
  iconSvg: string;
}

const PRODUCTS: PosProduct[] = [
  {
    id: "p1",
    name: "Olive oil 1 L",
    price: 16.5,
    priceFormatted: "$16.50",
    category: "pantry",
    sku: "SKU-8821",
    stock: 24,
    color: "#E8F5E9",
    iconSvg:
      '<path d="M9 3h6v3H9zM10 6v3h4V6M8 9h8l2 11H6L8 9z" stroke="#2E7D32" strokeWidth="1.8" fill="none"/>',
  },
  {
    id: "p2",
    name: "Coffee beans 500 g",
    price: 5.9,
    priceFormatted: "$5.90",
    category: "beverages",
    sku: "SKU-4102",
    stock: 16,
    color: "#EFEBE9",
    iconSvg:
      '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="#4E342E" strokeWidth="1.8" fill="none"/>',
  },
  {
    id: "p3",
    name: "Green tea 250 g",
    price: 10.0,
    priceFormatted: "$10.00",
    category: "beverages",
    sku: "SKU-3190",
    stock: 32,
    color: "#E8F8F0",
    iconSvg:
      '<path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9 1.5 0 2.9-.37 4.14-1.02L21 21l-1.02-4.86A8.96 8.96 0 0 0 21 12a9 9 0 0 0-9-9zM7 12c2 0 4 1 5 3" stroke="#00A862" strokeWidth="1.8" fill="none"/>',
  },
  {
    id: "p4",
    name: "Flour 2 kg",
    price: 4.5,
    priceFormatted: "$4.50",
    category: "bakery",
    sku: "SKU-1029",
    stock: 45,
    color: "#FFF8E1",
    iconSvg:
      '<path d="M12 2l7 4v12l-7 4-7-4V6l7-4zM12 12l7-4M12 12v10M12 12L5 8" stroke="#F57F17" strokeWidth="1.8" fill="none"/>',
  },
  {
    id: "p5",
    name: "Pure sugar 1 kg",
    price: 1.6,
    priceFormatted: "$1.60",
    category: "pantry",
    sku: "SKU-9941",
    stock: 50,
    color: "#F3E5F5",
    iconSvg:
      '<rect x="4" y="4" width="16" height="16" rx="3" stroke="#7B1FA2" strokeWidth="1.8" fill="none"/><path d="M9 9h6M9 12h6M9 15h3" stroke="#7B1FA2" strokeWidth="1.8"/>',
  },
  {
    id: "p6",
    name: "Red lentils 1 kg",
    price: 3.2,
    priceFormatted: "$3.20",
    category: "pantry",
    sku: "SKU-5521",
    stock: 28,
    color: "#FBE9E7",
    iconSvg:
      '<circle cx="12" cy="12" r="8" stroke="#D84315" strokeWidth="1.8" fill="none"/><path d="M12 7v5l3 3" stroke="#D84315" strokeWidth="1.8"/>',
  },
];

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "pantry", label: "Pantry" },
  { id: "beverages", label: "Beverages" },
  { id: "bakery", label: "Bakery" },
] as const;

export function HeroTillMock() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<"all" | "pantry" | "beverages" | "bakery">("all");
  const [selectedPayment, setSelectedPayment] = useState<"Cash" | "Card" | "JazzCash" | "Credit">(
    "Credit"
  );
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>(
    [
      { id: "p1", name: "Olive oil 1 L", price: 16.5, qty: 1 },
      { id: "p2", name: "Coffee beans 500 g", price: 5.9, qty: 1 },
      { id: "p3", name: "Green tea 250 g", price: 10.0, qty: 1 },
    ]
  );

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchCat = activeCat === "all" || p.category === activeCat;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  const addToCart = (prod: PosProduct) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === prod.id);
      if (exists) {
        return prev.map((item) => (item.id === prod.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  return (
    <div
      className="shrink basis-[320px] rounded-[18px] bg-white p-3 text-[#0A0A0A] shadow-[0_30px_70px_rgba(0,0,0,.6)] transition-all duration-300"
      style={{ flexGrow: 2.2 }}
    >
      {/* ── Top Status Bar ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#EEF0F3] pb-2 text-[8.5px]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#0A0A0A]">{DEMO.shop} · Reg 01</span>
          <span className="text-[#8A8F98]">· Cashier: {DEMO.cashier}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E4FAEF] px-2 py-[2px] font-semibold text-[#00A862]">
            <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-[#00D27A]" />
            Online · Synced
          </span>
          <span className="font-mono text-[8px] text-[#8A8F98]">100% · Wi-Fi</span>
        </div>
      </div>

      {/* ── POS Search & Barcode Scan Bar ─────────────────────────── */}
      <div className="mt-2.5 flex items-center gap-1.5">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8F98]">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items or scan barcode (F2)..."
            className="w-full rounded-[8px] border border-[#E3E5EA] bg-[#F7F8FA] py-1.5 pl-6 pr-6 text-[9px] font-medium text-[#0A0A0A] placeholder:text-[#9AA0A6] focus:border-[#0A0A0A] focus:bg-white focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-[#8A8F98] hover:text-[#0A0A0A]"
            >
              ✕
            </button>
          )}
        </div>
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-[8px] border border-[#E3E5EA] bg-[#F7F8FA] px-2 py-1.5 font-mono text-[8px] font-semibold text-[#4B5058]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14" />
          </svg>
          SCAN [F2]
        </span>
      </div>

      {/* ── Category Filter Pills ──────────────────────────────────── */}
      <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-1 text-[8px]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCat(cat.id)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-2 py-0.5 font-semibold transition-colors ${
              activeCat === cat.id
                ? "bg-[#0A0A0A] text-white"
                : "bg-[#F0F2F5] text-[#5F6368] hover:bg-[#E3E5EA]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Main Layout: Product Grid + Order Cart ──────────────────── */}
      <div className="mt-2 grid grid-cols-[1.45fr_1fr] gap-2.5">
        {/* Left: Product Grid */}
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-1.5">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => addToCart(p)}
                className="group relative cursor-pointer overflow-hidden rounded-[8px] border border-[#ECEEF2] bg-[#F9FAFB] p-1 text-left transition-all hover:border-[#00D27A] hover:bg-white hover:shadow-xs active:scale-95"
              >
                <div
                  className="flex aspect-[1.3] w-full items-center justify-center rounded-[6px]"
                  style={{ background: p.color }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: p.iconSvg }}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div className="mt-1">
                  <div className="truncate text-[7.5px] font-bold text-[#0A0A0A]">{p.name}</div>
                  <div className="flex items-center justify-between text-[7px]">
                    <span className="font-extrabold text-[#00A862]">{p.priceFormatted}</span>
                    <span className="font-mono text-[#9AA0A6]">{p.stock} in stock</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-6 text-center text-[8px] text-[#8A8F98]">
              No items found. Tap &ldquo;All Items&rdquo; or clear search.
            </div>
          )}

          <div className="mt-2 flex items-center justify-between border-t border-[#EEF0F3] pt-1.5 text-[7px] text-[#8A8F98]">
            <span>Click any item to add to register</span>
            <span className="font-semibold text-[#00A862]">● Quick keys active</span>
          </div>
        </div>

        {/* Right: Cart & Tender Panel */}
        <div className="flex flex-col justify-between rounded-[10px] bg-[#F4F5F7] p-2">
          <div>
            <div className="flex items-center justify-between border-b border-[#E3E5EA] pb-1 text-[8px]">
              <span className="font-extrabold text-[#0A0A0A]">Current Cart</span>
              <span className="truncate max-w-[90px] font-medium text-[#6B7079]">
                {DEMO.customer}
              </span>
            </div>

            {/* Cart Line Items */}
            <div className="mt-1.5 max-h-[105px] space-y-1 overflow-y-auto pr-0.5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-[7.5px] text-[#2D3139]"
                >
                  <div className="truncate pr-1">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-[#8A8F98]"> ×{item.qty}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-none font-mono font-bold">
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer text-[9px] text-[#C5221F] hover:font-extrabold"
                      title="Remove item"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="py-4 text-center text-[7.5px] text-[#8A8F98]">Cart is empty</div>
              )}
            </div>
          </div>

          <div>
            <div className="my-1.5 h-px bg-[#E3E5EA]" />
            <div className="flex justify-between text-[7.5px] text-[#6B7079]">
              <span>Tax (incl. 18%)</span>
              <span className="font-mono">${(total * 0.18).toFixed(2)}</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[9.5px] font-extrabold text-[#0A0A0A]">
              <span>Total</span>
              <span className="font-mono text-[#00A862]">${total.toFixed(2)}</span>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-1.5 grid grid-cols-2 gap-1">
              {(["Cash", "Card", "JazzCash", "Credit"] as const).map((method) => {
                const active = selectedPayment === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedPayment(method)}
                    className={`cursor-pointer rounded-[5px] p-1 text-center text-[7.5px] font-bold transition-all ${
                      active
                        ? "bg-[#00D27A] text-[#0A0A0A] shadow-xs"
                        : "bg-white text-[#4B5058] hover:bg-[#ECEEF2]"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>

            {/* Charge Button */}
            <button
              type="button"
              className="mt-1.5 w-full rounded-[6px] bg-[#0A0A0A] py-1 text-center font-mono text-[8px] font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Complete Sale · ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
