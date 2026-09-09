"use client";

import { useCallback, useRef, useState } from "react";

/**
 * The vertical-picker shell.
 *
 * Only the selection lives here. Each panel is rendered on the server and
 * passed in as a node, so all six stay in the HTML — the inactive verticals'
 * links remain crawlable, which is the whole reason this section replaced a
 * grid of six icons.
 *
 * The rail is a horizontal scroller below 981px and a vertical list above it.
 * That is pure CSS via the `tabs:` breakpoint, so there is no matchMedia and
 * no first-paint flash of the wrong layout.
 */

export interface SolutionTab {
  id: string;
  name: string;
  who: string;
  icon: string;
}

export function SolutionTabs({
  tabs,
  label,
  panels,
}: {
  tabs: SolutionTab[];
  label: string;
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const delta =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? 1
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? -1
            : 0;
      if (!delta) return;
      event.preventDefault();
      const next = (active + delta + tabs.length) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    },
    [active, tabs.length]
  );

  return (
    <div data-reveal className="mt-[30px] flex flex-wrap items-stretch gap-4">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex basis-full gap-[6px] overflow-x-auto px-[2px] pb-[6px] pt-[2px] tabs:max-w-[290px] tabs:shrink tabs:grow tabs:basis-[230px] tabs:flex-col tabs:gap-1 tabs:overflow-visible tabs:p-0"
      >
        {tabs.map((tab, i) => {
          const on = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`sol-tab-${tab.id}`}
              aria-selected={on}
              aria-controls={`sol-panel-${tab.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`inline-flex flex-none cursor-pointer items-center gap-2 rounded-full border py-2 pl-2 pr-[14px] text-left transition-all duration-[250ms] tabs:w-full tabs:gap-3 tabs:rounded-[14px] tabs:px-[14px] tabs:py-3 ${
                on
                  ? "border-[var(--color-line-2)] bg-white shadow-[0_10px_24px_rgba(10,10,10,.06)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <span
                className={`grid h-7 w-7 flex-none place-items-center rounded-[10px] text-[#0A0A0A] transition-colors duration-[250ms] tabs:h-9 tabs:w-9 ${
                  on ? "bg-[var(--color-mint)]" : "bg-[var(--color-surface)]"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d={tab.icon} />
                </svg>
              </span>
              <span className="flex min-w-0 flex-col items-start gap-px">
                <span className="whitespace-nowrap text-[14px] font-semibold">{tab.name}</span>
                <span className="hidden max-w-[200px] truncate text-[11.5px] text-[var(--color-muted)] tabs:block">
                  {tab.who}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="shrink basis-[420px] tabs:grow-[3]" style={{ flexGrow: 3 }}>
        {panels.map((panel, i) => (
          <div
            key={tabs[i]?.id ?? i}
            id={`sol-panel-${tabs[i]?.id ?? i}`}
            role="tabpanel"
            aria-labelledby={`sol-tab-${tabs[i]?.id ?? i}`}
            hidden={i !== active}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
