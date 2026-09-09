"use client";

import { useState, useMemo } from "react";
import type { ExtensionStatus } from "@/lib/design/landing";
import { Icon } from "@/components/design/Icon";

export interface ExtensionCard {
  id: string;
  name: string;
  desc: string;
  icon: string;
  cat: string;
  catLabel: string;
  status: ExtensionStatus;
  statusLabel: string;
}

export interface ExtensionCat {
  id: string;
  label: string;
}

export function ExtensionFilter({
  items,
  cats,
  allLabel,
}: {
  items: ExtensionCard[];
  cats: ExtensionCat[];
  allLabel: string;
}) {
  const [active, setActive] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const chips = [{ id: "all", label: allLabel }, ...cats];

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((e) => {
      const matchCat = active === "all" || active === e.cat;
      const matchSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.catLabel.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [items, active, searchQuery]);

  return (
    <>
      {/* ── Search & Filter Controls ─────────────────────────────── */}
      <div data-reveal className="mt-7 flex flex-col gap-4">
        {/* Search input */}
        <div className="relative max-w-[480px]">
          <span className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search extensions (e.g. Stripe, FBR, QuickBooks, Shopify)..."
            className="w-full rounded-full border border-[var(--color-line-2)] bg-white py-2.5 pl-10 pr-10 text-[13.5px] font-medium text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] focus:border-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[var(--color-muted-2)] hover:text-[#0A0A0A]"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap items-center gap-[6px]">
          {chips.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.id)}
                className={`cursor-pointer whitespace-nowrap rounded-full border px-[14px] py-2 text-[12.5px] font-semibold transition-all duration-200 ${
                  on
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-sm"
                    : "border-[var(--color-line-2)] bg-white text-[var(--color-ink-3)] hover:border-[#0A0A0A]"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cards Grid ───────────────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-dashed border-[var(--color-line-2)] p-12 text-center">
          <p className="text-[15px] font-semibold text-[var(--color-ink)]">
            No extensions matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-[13px] text-[var(--color-muted-2)]">
            Try searching for another payment provider, ecommerce store, or shipping service.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActive("all");
            }}
            className="mt-4 rounded-full bg-[#0A0A0A] px-5 py-2 text-[12.5px] font-semibold text-white hover:bg-neutral-800"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {filteredItems.map((e) => (
            <div
              key={e.id}
              data-reveal
              className="group flex flex-col justify-between rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface)] p-[18px] transition-all duration-250 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)] hover:bg-white hover:shadow-[0_16px_34px_rgba(10,10,10,.08)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[12px] border border-[var(--color-line-soft)] bg-white shadow-xs transition-transform duration-200 group-hover:scale-105">
                    <Icon name={e.icon} size={22} />
                  </span>
                  <span
                    className={`flex-none rounded-full px-2.5 py-[3px] text-[10.5px] font-semibold tracking-[0.02em] ${
                      e.status === "live"
                        ? "bg-[var(--color-mint-soft)] text-[#0e3b2c]"
                        : "border border-[var(--color-line-2)] bg-white text-[var(--color-muted)]"
                    }`}
                  >
                    {e.statusLabel}
                  </span>
                </div>

                <div className="mt-3.5 text-[15px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
                  {e.name}
                </div>
                <div className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--color-body)]">
                  {e.desc}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line-soft)] pt-2.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted-2)]">
                <span>{e.catLabel}</span>
                <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-[var(--color-mint-2)] font-sans font-bold text-[12px]">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
