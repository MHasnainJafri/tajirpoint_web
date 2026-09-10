"use client";

import { useState } from "react";

export interface FaqGroup {
  id: string;
  label: string;
  items: { q: string; a: string }[];
}

/**
 * Grouped FAQ: category pills on the left, an accordion on the right.
 *
 * The first answer in each group starts open, and switching group resets to it,
 * so the panel is never blank. Answers animate on `max-height` rather than
 * being unmounted, which keeps every question and answer in the HTML for search
 * engines whether or not it is expanded.
 */
export function FaqPanel({ groups }: { groups: FaqGroup[] }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);

  const group = groups[tab];

  return (
    <div className="mt-[30px] flex flex-wrap gap-[clamp(18px,3vw,44px)]">
      <div
        data-reveal
        role="tablist"
        aria-label={group?.label}
        className="flex max-w-[240px] shrink grow basis-[160px] flex-wrap content-start gap-[6px]"
      >
        {groups.map((g, i) => {
          const on = i === tab;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setTab(i);
                setOpen(0);
              }}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[12.5px] transition-all duration-[250ms] ${
                on
                  ? "border-[#0A0A0A] bg-[#0A0A0A] font-semibold text-white"
                  : "border-transparent bg-white font-medium text-[var(--color-ink-3)]"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <div data-reveal className="flex shrink basis-[320px] flex-col" style={{ flexGrow: 3 }}>
        {group?.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-[var(--color-line-strong)]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-[18px] text-left text-[15px] font-semibold text-[var(--color-ink)] transition-colors duration-[250ms] hover:text-[var(--color-mint-2)]"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 flex-none place-items-center rounded-full border border-[var(--color-line-2)] text-[11px] transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "bg-white text-[var(--color-muted)] group-hover:border-[var(--color-line-3)]"
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(.3,.9,.3,1)]"
                style={{ maxHeight: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <p className="max-w-[64ch] pb-[18px] text-[14px] leading-[1.75] text-[var(--color-body)]">
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
