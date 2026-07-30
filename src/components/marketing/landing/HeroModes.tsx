"use client";

import { useCallback, useRef, useState } from "react";

/**
 * The hero's two-column shell plus its mode switcher.
 *
 * State lives here because one tab drives two panels in different columns —
 * the copy on the left and the device shot on the right. Both sets are
 * rendered on the server and passed in as nodes, so the screens stay server
 * components (they read the filesystem) and every panel's "Learn more" link
 * is in the HTML whether or not its tab is open.
 *
 * The grid is placed explicitly rather than with `order`: source order is
 * headline → device → switcher, which is the right reading order when it
 * collapses to one column on a phone.
 */

export interface HeroTab {
  id: string;
  label: string;
}

export function HeroModes({
  tabs,
  title,
  copy,
  devices,
  children,
}: {
  tabs: HeroTab[];
  title: string;
  /** One node per tab, same order. */
  copy: React.ReactNode[];
  devices: React.ReactNode[];
  /** The static hero header — headline, sub, CTAs. */
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!delta) return;
      event.preventDefault();
      const next = (active + delta + tabs.length) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    },
    [active, tabs.length]
  );

  const panelProps = (i: number) => ({
    role: "tabpanel" as const,
    "aria-labelledby": `hero-tab-${tabs[i]?.id ?? i}`,
    hidden: i !== active,
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)] lg:gap-x-12 lg:gap-y-10">
      {/* Headline block */}
      <div className="lg:col-start-1 lg:row-start-1 lg:self-end">{children}</div>

      {/* Device — spans both rows on desktop, second in the mobile stack */}
      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
        {devices.map((panel, i) => (
          <div key={tabs[i]?.id ?? i} id={`hero-screen-${tabs[i]?.id ?? i}`} {...panelProps(i)}>
            {panel}
          </div>
        ))}
      </div>

      {/* Mode switcher */}
      <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
        <div className="border-t border-[var(--color-line)] pt-8">
          <p className="text-[14px] font-semibold text-[var(--color-ink-3)]">{title}</p>

          <div
            role="tablist"
            aria-label={title}
            onKeyDown={onKeyDown}
            className="mt-4 flex flex-wrap gap-2"
          >
            {tabs.map((tab, i) => {
              const selected = i === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hero-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`hero-copy-${tab.id} hero-screen-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer rounded-full border px-[18px] py-[9px] text-[14.5px] font-semibold transition-colors duration-200 ${
                    selected
                      ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                      : "border-[var(--color-line-2)] bg-[var(--color-bg-2)] text-[var(--color-ink-3)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            {copy.map((panel, i) => (
              <div key={tabs[i]?.id ?? i} id={`hero-copy-${tabs[i]?.id ?? i}`} {...panelProps(i)}>
                {panel}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
