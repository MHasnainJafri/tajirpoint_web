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

const inputCls =
  "h-[48px] px-4 rounded-[12px] border border-[var(--color-line)] bg-white text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-mint)] focus:ring-2 focus:ring-[var(--color-mint)]/20 transition";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined,
  );

  if (state?.ok) {
    return (
      <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-8">
        <p className="font-extrabold text-[18px] text-[var(--color-ink)]">Message sent ✓</p>
        <p className="mt-2 text-[14px] text-[var(--color-muted)] leading-[1.6]">
          Thanks for reaching out — we&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[13.5px] font-semibold text-[var(--color-ink)]">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your full name" className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[13.5px] font-semibold text-[var(--color-ink)]">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="business" className="text-[13.5px] font-semibold text-[var(--color-ink)]">Business type</label>
        <select id="business" name="business" className={inputCls} defaultValue="">
          <option value="">Select your business type</option>
          {BUSINESS_TYPES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-[13.5px] font-semibold text-[var(--color-ink)]">Subject</label>
        <input id="subject" name="subject" type="text" placeholder="How can we help?" className={inputCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[13.5px] font-semibold text-[var(--color-ink)]">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us more about your business and how we can help..."
          className="px-4 py-3 rounded-[12px] border border-[var(--color-line)] bg-white text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-mint)] focus:ring-2 focus:ring-[var(--color-mint)]/20 transition resize-none"
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
        <p className="text-[13.5px] text-[var(--color-destructive,#dc2626)]" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
