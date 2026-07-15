"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type SubscribeState } from "./newsletter-action";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<SubscribeState | undefined, FormData>(
    subscribeNewsletter,
    undefined
  );

  if (state?.ok) {
    return (
      <p className="text-[13.5px] font-semibold text-[var(--color-mint-2)]">
        Subscribed ✓ — thanks, you&apos;re on the list.
      </p>
    );
  }

  return (
    <>
      <form action={action} className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@business.com"
          className="h-[42px] flex-1 rounded-full border border-[var(--color-line-2)] bg-white/[0.04] px-4 text-[13.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-3)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[rgba(0,210,122,.35)] focus:border-[var(--color-mint)] focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[rgba(0,210,122,.2)]"
        />
        {/* Honeypot — hidden; bots fill it and get silently dropped. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <button
          type="submit"
          disabled={pending}
          className="h-[42px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-5 text-[13px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,210,122,.4)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </form>
      {state?.error && (
        <p className="mt-2 text-[11.5px] text-[var(--color-berry)]">{state.error}</p>
      )}
    </>
  );
}
