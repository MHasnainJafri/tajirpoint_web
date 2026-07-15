"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FAQS } from "@/lib/design/catalog";

export function Faq() {
  const t = useTranslations("landing.faq");
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[840px] border-t border-[var(--color-line-soft)] px-5 py-[110px] md:px-10"
    >
      <div
        data-reveal
        className="text-center font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)]"
      >
        {t("eyebrow")}
      </div>
      <h2
        data-reveal
        className="mb-11 mt-[18px] text-center text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.03em]"
      >
        {t("headline")}
      </h2>

      {FAQS.map((id, i) => (
        <FaqRow
          key={id}
          question={t(`items.${id}.q`)}
          answer={t(`items.${id}.a`)}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </section>
  );
}

function FaqRow({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div data-reveal className="border-b border-[var(--color-line)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-5 px-1 py-[22px] text-left text-[16.5px] font-semibold text-[var(--color-ink)]"
      >
        {question}
        <span
          className="text-[20px] font-normal text-[var(--color-mint)] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      {/* 0fr → 1fr animates to the answer's real height, so nothing is clipped. */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[680px] px-1 pb-6 text-[15px] leading-[1.65] text-[var(--color-muted)]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
