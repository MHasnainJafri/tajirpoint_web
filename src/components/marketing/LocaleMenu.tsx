"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Stroke } from "@/components/marketing/landing/Stroke";
import type { Locale } from "@/i18n/routing";

/**
 * Language picker.
 *
 * This replaces a button that cycled through locales behind a coloured circle
 * showing the first letter of the current one ("E"). That gave no clue what the
 * other options were, no way back except cycling forward, and read as a
 * placeholder. This is a normal menu: a globe, the language you are in, and the
 * ones you can switch to written in their own script.
 */

type Entry = { code: Locale; native: string; english: string };

const LOCALES: Entry[] = [
  { code: "en", native: "English", english: "English" },
  { code: "ur", native: "اردو", english: "Urdu" },
  { code: "ar", native: "العربية", english: "Arabic" },
];

export function LocaleMenu({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  const pick = (code: Locale) => {
    close();
    if (code !== locale) router.replace(pathname, { locale: code });
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${current.english}`}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-surface)] ${
          compact
            ? "border border-[var(--color-line-2)] px-4 py-3 text-[14px]"
            : "px-3 py-2 text-[13px]"
        } ${open && !compact ? "bg-[var(--color-surface)]" : ""}`}
      >
        <Stroke name="globe" size={16} />
        <span>{current.native}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[13px] w-[13px] opacity-60 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-[70] min-w-[210px] animate-[tpMenuIn_.18s_ease_both] overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-white p-[6px] shadow-[0_24px_50px_rgba(10,10,10,.16)] ${
            compact ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2"
          }`}
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <button
                key={l.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => pick(l.code)}
                dir={l.code === "en" ? "ltr" : "rtl"}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-[10px] text-left transition-colors duration-150 ${
                  active ? "bg-[var(--color-surface)]" : "hover:bg-[var(--color-surface)]"
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-[var(--color-ink)]">
                    {l.native}
                  </span>
                  <span className="mt-px block text-[11.5px] text-[var(--color-muted)]" dir="ltr">
                    {l.english}
                  </span>
                </span>
                {active && (
                  <span className="flex-none text-[var(--color-mint-2)]" aria-hidden="true">
                    <Stroke name="check" size={16} width={2.4} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
