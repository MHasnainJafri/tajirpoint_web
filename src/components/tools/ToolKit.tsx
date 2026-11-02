"use client";

/**
 * Small building blocks shared by the free tools: a number field that accepts
 * what people actually type ("1,250", Arabic-Indic digits), a two-way switch,
 * the results panel, and a usage counter that sends ONE "tool_use" event per
 * tool/action per visit — never the numbers.
 */

import { useCallback, useEffect, useRef } from "react";
import { trackToolUse } from "@/lib/analytics/events";
import { hintCls, inputCls, labelCls } from "@/components/forms/styles";

/** "1,234.50" — fixed decimals, Latin digits (numbers are shown LTR in every locale). */
export function fmt(value: number, dp = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  }).format(value);
}

/** "33.3%" */
export function fmtPct(value: number, dp = 1): string {
  return `${fmt(value, dp)}%`;
}

type ToolAction = Parameters<typeof trackToolUse>[0]["action"];

/** Returns `track(action, label?)` — sends each action/label pair at most once per page view. */
export function useToolUse(tool: string) {
  const sent = useRef(new Set<string>());
  return useCallback(
    (action: ToolAction, label?: string) => {
      const key = `${action}:${label ?? ""}`;
      if (sent.current.has(key)) return;
      sent.current.add(key);
      trackToolUse({ tool, action, label });
    },
    [tool]
  );
}

/** Fires "calculate" once, the first time `ready` becomes true. */
export function useTrackFirstResult(tool: string, ready: boolean) {
  const track = useToolUse(tool);
  useEffect(() => {
    if (!ready) return;
    // Wait for the visitor to pause typing, so a half-typed number doesn't count.
    const t = window.setTimeout(() => track("calculate"), 1200);
    return () => window.clearTimeout(t);
  }, [ready, track]);
  return track;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  hint,
  suffix,
  placeholder = "0",
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
  /** Shown inside the field's end, e.g. "%". */
  suffix?: string;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          dir="ltr"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${inputCls(invalid)} tabular-nums ${suffix ? "pe-10" : ""}`}
        />
        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-[15px] font-semibold text-[var(--color-muted)]"
          >
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className={hintCls}>
          {hint}
        </p>
      )}
    </div>
  );
}

/** A two- or three-way choice as real radio buttons (keyboard and screen-reader friendly). */
export function Switch<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
}: {
  name: string;
  legend: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (next: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={`${labelCls} mb-2`}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          const checked = o.value === value;
          return (
            <label
              key={o.value}
              htmlFor={id}
              className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-4 text-[14.5px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[rgba(0,210,122,.45)] ${
                checked
                  ? "border-[var(--color-mint-2)] bg-[var(--color-mint-soft)] text-[var(--color-ink)]"
                  : "border-[var(--color-line-3)] bg-[var(--color-bg-2)] text-[var(--color-ink-3)] hover:border-[var(--color-muted-2)]"
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** The answer area. Announced politely to screen readers as results change. */
export function Results({
  title = "Result",
  children,
  empty,
  after,
}: {
  title?: string;
  children?: React.ReactNode;
  /** Extra lines under the figures (a warning, a source) — outside the <dl>. */
  after?: React.ReactNode;
  /** Shown instead of the rows when there's nothing to show yet. */
  empty?: string | null;
}) {
  return (
    <section
      aria-live="polite"
      aria-label={title}
      className="min-w-0 rounded-[20px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-[clamp(16px,3vw,24px)]"
    >
      <h2 className="text-[14px] font-semibold text-[var(--color-ink-3)]">{title}</h2>
      {empty ? (
        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-body)]">{empty}</p>
      ) : (
        <dl className="mt-3 flex flex-col gap-3">{children}</dl>
      )}
      {!empty && after}
    </section>
  );
}

export function ResultRow({
  label,
  value,
  big,
  note,
}: {
  label: string;
  value: string;
  big?: boolean;
  note?: string;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[rgba(0,168,98,.18)] pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[14.5px] text-[var(--color-ink-3)]">
        {label}
        {note && <span className="block text-[12.5px] text-[var(--color-muted)]">{note}</span>}
      </dt>
      <dd
        dir="ltr"
        className={`min-w-0 break-all font-extrabold tabular-nums text-[var(--color-ink)] ${
          big ? "text-[clamp(24px,5vw,30px)] tracking-[-0.02em]" : "text-[18px]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Card that holds a tool's inputs and results side by side on wide screens. */
export function ToolCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-[clamp(16px,3.4vw,32px)] shadow-[var(--shadow-card)]">
      {children}
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-line-3)] px-4 text-[14px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-muted-2)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)]"
    >
      Clear
    </button>
  );
}
