"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const BUSINESS_TYPES = [
  "General retail / Kiryana",
  "Restaurant / Food",
  "Electronics / Mobile",
  "Services / Salon",
  "Distributor / Wholesale",
  "Other",
];

const fieldCls =
  "rounded-[12px] border border-[var(--color-line-2)] bg-white/[0.04] text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-3)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[rgba(0,210,122,.35)] focus:border-[var(--color-mint)] focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[rgba(0,210,122,.2)]";

const inputCls = `h-[48px] px-4 ${fieldCls}`;

const selectCls = `${inputCls} [&>option]:bg-[var(--color-panel)] [&>option]:text-[var(--color-ink)]`;

const labelCls = "text-[13.5px] font-semibold text-[var(--color-ink)]";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined
  );

  if (state?.ok) {
    return (
      <div className="rounded-[18px] border border-[var(--color-mint-line)] bg-[rgba(0,210,122,.06)] p-8">
        <p className="text-[18px] font-extrabold text-[var(--color-mint-2)]">Message sent ✓</p>
        <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-muted)]">
          Thanks for reaching out — we&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="business" className={labelCls}>
          Business type
        </label>
        <select id="business" name="business" className={selectCls} defaultValue="">
          <option value="">Select your business type</option>
          {BUSINESS_TYPES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelCls}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us more about your business and how we can help..."
          className={`resize-none px-4 py-3 ${fieldCls}`}
        />
      </div>

      {/* Honeypot — hidden from humans; bots fill it and get silently dropped. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {state?.error && (
        <p
          className="rounded-[12px] border border-[rgba(255,122,107,.35)] bg-[rgba(255,122,107,.08)] px-4 py-3 text-[13.5px] text-[var(--color-berry)]"
          role="alert"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex select-none items-center gap-[10px] self-start whitespace-nowrap rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
