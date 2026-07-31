"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Tabs that drive two panels in different columns — the copy on the left and
 * the device shot on the right.
 *
 * Both sets are rendered on the server and passed in as nodes, so the screens
 * stay server components (they read the filesystem) and every panel's "Learn
 * more" link is in the HTML whether or not its tab is open.
 */

export interface ModeTab {
  id: string;
  label: string;
}

export function ModeSwitcher({
  tabs,
  label,
  copy,
  devices,
}: {
  tabs: ModeTab[];
  /** Accessible name for the tablist. */
  label: string;
  /** One node per tab, same order. */
  copy: React.ReactNode[];
  devices: React.ReactNode[];
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
    "aria-labelledby": `mode-tab-${tabs[i]?.id ?? i}`,
    hidden: i !== active,
  });

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
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
              id={`mode-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`mode-copy-${tab.id} mode-screen-${tab.id}`}
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

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14">
        <div className="lg:order-1">
          {copy.map((panel, i) => (
            <div key={tabs[i]?.id ?? i} id={`mode-copy-${tabs[i]?.id ?? i}`} {...panelProps(i)}>
              {panel}
            </div>
          ))}
        </div>
        <div className="lg:order-2">
          {devices.map((panel, i) => (
            <div key={tabs[i]?.id ?? i} id={`mode-screen-${tabs[i]?.id ?? i}`} {...panelProps(i)}>
              {panel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
