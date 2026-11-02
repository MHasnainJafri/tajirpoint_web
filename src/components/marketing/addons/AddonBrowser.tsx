"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { legal } from "@/lib/config/site";
import type { AddonStatus } from "@/lib/marketing/addon-status";
import { AddonIcon } from "./AddonIcon";
import { StatusBadge } from "./StatusBadge";

/** What a card needs: serialisable, and small (no write-up). */
export interface AddonCard {
  slug: string;
  name: string;
  summary: string;
  iconUrl: string | null;
  status: AddonStatus;
  price: string;
  groupId: string;
  groupLabel: string;
}

const ALL = "all";

function normalise(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/**
 * The add-on catalogue: group chips, a search box and one card per add-on,
 * each linking to its detail page. Every card is in the server-rendered HTML
 * (filtering only hides cards), so all detail links stay crawlable.
 */
export function AddonBrowser({ cards }: { cards: AddonCard[] }) {
  const [group, setGroup] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    for (const c of cards) {
      const g = map.get(c.groupId) ?? { id: c.groupId, label: c.groupLabel, count: 0 };
      g.count += 1;
      map.set(c.groupId, g);
    }
    return [...map.values()];
  }, [cards]);

  const q = normalise(query.trim());
  const visible = useMemo(
    () =>
      cards.filter(
        (c) =>
          (group === ALL || c.groupId === group) &&
          (!q || normalise(`${c.name} ${c.summary} ${c.groupLabel}`).includes(q))
      ),
    [cards, group, q]
  );

  const chips = [{ id: ALL, label: "All", count: cards.length }, ...groups];

  return (
    <div
      lang="en"
      dir="ltr"
      className="mx-auto max-w-[1220px] px-4 pb-[clamp(56px,8vw,90px)] md:px-10"
    >
      {/* ── Search + chips ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="relative mx-auto w-full max-w-[520px]">
          <label htmlFor="addon-search" className="sr-only">
            Search add-ons
          </label>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--color-muted)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="addon-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search add-ons, e.g. payments, kitchen, Shopify"
            autoComplete="off"
            className="w-full rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] py-[13px] pl-11 pr-4 text-[15px] text-[var(--color-ink)] shadow-[var(--shadow-card)] outline-none placeholder:text-[var(--color-muted-2)] focus:border-[var(--color-mint-line)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by type"
          className="flex flex-wrap justify-center gap-2"
        >
          {chips.map((c) => {
            const active = group === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setGroup(c.id)}
                aria-pressed={active}
                className="cursor-pointer rounded-full border px-[14px] py-[8px] text-[13.5px] max-md:min-h-[44px] font-semibold transition-[background,color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]"
                style={{
                  background: active ? "var(--color-ink)" : "var(--color-bg-2)",
                  color: active ? "var(--color-bg)" : "var(--color-ink-3)",
                  borderColor: active ? "var(--color-ink)" : "var(--color-line-2)",
                }}
              >
                {c.label} <span className="font-mono text-[11px] opacity-65">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} add-ons shown
      </p>

      {/* ── Cards ──────────────────────────────────────────────────── */}
      <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,270px),1fr))] gap-3 md:gap-[14px]">
        {cards.map((c) => {
          const shown = visible.includes(c);
          return (
            <li key={c.slug} hidden={!shown} className="min-w-0">
              <Link
                href={`/extensions/${c.slug}`}
                data-track={`addon_card_${c.slug}`}
                className="group flex h-full flex-col rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]"
              >
                <span className="flex items-start justify-between gap-3">
                  <AddonIcon slug={c.slug} iconUrl={c.iconUrl} size={52} />
                  <StatusBadge status={c.status} />
                </span>
                <span className="mt-4 block text-[16.5px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
                  {c.name}
                </span>
                <span className="mt-[6px] line-clamp-3 block text-[13.5px] leading-[1.55] text-[var(--color-muted)]">
                  {c.summary}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[12.5px]">
                  <span className="min-w-0 truncate text-[var(--color-muted)]">{c.groupLabel}</span>
                  <span className="flex-none font-semibold text-[var(--color-ink)]">{c.price}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <div className="mx-auto mt-6 max-w-[460px] rounded-[20px] border border-dashed border-[var(--color-line-3)] p-8 text-center">
          <p className="text-[15.5px] font-semibold text-[var(--color-ink)]">
            No add-on matches that.
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-muted)]">
            Tell us what you need and we will tell you if {legal.product} can do it.
          </p>
          <Link
            href="/get-a-call"
            className="mt-4 inline-flex rounded-full bg-[var(--color-mint)] px-5 py-[10px] text-[14px] font-bold text-[#0A0A0A]"
          >
            Ask for a call back
          </Link>
        </div>
      )}
    </div>
  );
}
