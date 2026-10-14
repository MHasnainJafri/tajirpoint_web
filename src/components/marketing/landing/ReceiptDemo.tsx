"use client";

import { useId, useState } from "react";
import { RECEIPT_LANGS, RECEIPT_TOTAL } from "@/lib/design/landing";

/**
 * A receipt that re-renders in another language — and flips to right-to-left —
 * when you pick a tab. The strings are the subject of the demo rather than site
 * copy, so they come from `RECEIPT_LANGS` verbatim and are never translated:
 * running "Recibo" through next-intl would turn the demo back into English.
 *
 * `dir` is set on the receipt itself, not the page, so only the mock mirrors.
 */
export function ReceiptDemo({ caption, label }: { caption: string; label: string }) {
  const [active, setActive] = useState(0);
  const receiptId = useId();
  // `noUncheckedIndexedAccess` is on: a number index is never assumed present.
  const lang = RECEIPT_LANGS[active] ?? RECEIPT_LANGS[0];

  return (
    <div
      data-reveal
      className="flex flex-col items-center gap-[18px] rounded-[24px] bg-[var(--color-surface)] p-[clamp(18px,2.6vw,32px)]"
    >
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={(event) => {
          const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
          if (!delta && event.key !== "Home" && event.key !== "End") return;
          event.preventDefault();
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? RECEIPT_LANGS.length - 1
                : (active + delta + RECEIPT_LANGS.length) % RECEIPT_LANGS.length;
          setActive(next);
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
        }}
        className="inline-flex max-w-full flex-wrap justify-center rounded-full border border-[var(--color-line)] bg-white p-1"
      >
        {RECEIPT_LANGS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            id={`${receiptId}-tab-${i}`}
            aria-controls={`${receiptId}-panel`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`cursor-pointer rounded-full border-none px-3 py-[10px] sm:px-4 text-[13px] font-semibold leading-[1.4] transition-all duration-200 ${
              i === active ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[var(--color-ink-3)]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div
        id={`${receiptId}-panel`}
        role="tabpanel"
        aria-labelledby={`${receiptId}-tab-${active}`}
        dir={lang.dir}
        lang={lang.id}
        className="w-full max-w-[320px] rounded-[14px] bg-white px-[22px] py-5 leading-[1.6] shadow-[0_20px_44px_rgba(10,10,10,.08)]"
      >
        <div className="text-[15px] font-bold">{lang.shop}</div>
        <div className="mt-[2px] text-[12px] text-[var(--color-muted)]">{lang.title} · #1042</div>

        <div className="my-3 border-t border-dashed border-[#D5D8DE]" />

        {lang.items.map((it) => (
          <div key={it.name} className="flex justify-between gap-3 py-[5px] text-[13.5px]">
            <span>{it.name}</span>
            <span dir="ltr" className="tabular-nums">
              {it.amt}
            </span>
          </div>
        ))}

        <div className="my-3 border-t border-dashed border-[#D5D8DE]" />

        <div className="flex justify-between gap-3 text-[16px] font-extrabold">
          <span>{lang.total}</span>
          <span>{RECEIPT_TOTAL}</span>
        </div>
        <div className="mt-[6px] flex justify-between gap-3 text-[12.5px] text-[var(--color-muted)]">
          <span>{lang.paid}</span>
          <span>{lang.thanks}</span>
        </div>
      </div>

      <div className="text-center text-[12px] text-[var(--color-muted)]">{caption}</div>
    </div>
  );
}
