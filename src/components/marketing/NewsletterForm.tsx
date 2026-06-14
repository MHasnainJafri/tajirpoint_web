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
      <p className="text-[13.5px] font-semibold text-[var(--color-mint)]">
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
          className="flex-1 h-[42px] px-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-[13.5px] text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-mint)] transition"
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
          className="h-[42px] px-5 rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[13px] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </form>
      {state?.error && <p className="mt-2 text-[11.5px] text-red-400">{state.error}</p>}
    </>
  );
}
