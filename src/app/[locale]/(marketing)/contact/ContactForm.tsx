"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { Link } from "@/i18n/navigation";
import { submitContact, type ContactState } from "./actions";
import { BUSINESS_TYPE_OPTIONS } from "@/lib/marketing/demo";
import {
  currentAttribution,
  emptyAttribution,
  readAttribution,
  sessionStore,
  type Attribution,
} from "@/lib/marketing/utm";
import { trackContactSubmit } from "@/lib/analytics/events";
import {
  errorCls,
  hintCls,
  honeypotStyle,
  inputCls,
  labelCls,
  textareaCls,
} from "@/components/forms/styles";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined
  );
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);
  const tracked = useRef(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the stored first touch once, on mount
    setAttribution(readAttribution(sessionStore(), currentAttribution()));
  }, []);

  useEffect(() => {
    if (state?.ok && !tracked.current) {
      tracked.current = true;
      trackContactSubmit({ businessType: state.businessType ?? "" });
      doneRef.current?.focus();
    } else if (state?.error) {
      errorRef.current?.focus();
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-[18px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-7 outline-none"
      >
        <p className="text-[19px] font-extrabold text-[var(--color-ink)]">
          Message sent — thank you.
        </p>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
          We&apos;ll reply within one working day. Want to see the product sooner?{" "}
          <Link
            href="/book-demo"
            className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
          >
            Book a free demo
          </Link>
          .
        </p>
      </div>
    );
  }

  const f = state?.fields ?? {};
  const err = (name: keyof typeof f) =>
    f[name] ? { "aria-invalid": true as const, "aria-describedby": `c-${name}-error` } : {};

  return (
    <form
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {state?.error && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[12px] border border-[#F3C3BD] bg-[#FEF3F2] px-4 py-3 text-[14px] text-[#B42318] outline-none"
        >
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className={labelCls}>
            Name{" "}
            <span aria-hidden="true" className="text-[#B42318]">
              *
            </span>
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputCls(!!f.name)}
            {...err("name")}
          />
          {f.name && (
            <p id="c-name-error" className={errorCls}>
              {f.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className={labelCls}>
            Email{" "}
            <span aria-hidden="true" className="text-[#B42318]">
              *
            </span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputCls(!!f.email)}
            {...err("email")}
          />
          {f.email && (
            <p id="c-email-error" className={errorCls}>
              {f.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-phone" className={labelCls}>
            Phone / WhatsApp{" "}
            <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 415 555 0123"
            className={inputCls(!!f.phone)}
            {...err("phone")}
          />
          {f.phone && (
            <p id="c-phone-error" className={errorCls}>
              {f.phone}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-business" className={labelCls}>
            Type of business{" "}
            <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <select id="c-business" name="business_type" defaultValue="" className={inputCls(false)}>
            <option value="">Choose one</option>
            {BUSINESS_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className={labelCls}>
          Message{" "}
          <span aria-hidden="true" className="text-[#B42318]">
            *
          </span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          placeholder="How can we help?"
          className={textareaCls(!!f.message)}
          {...err("message")}
        />
        {f.message && (
          <p id="c-message-error" className={errorCls}>
            {f.message}
          </p>
        )}
      </div>

      <div aria-hidden="true" style={honeypotStyle}>
        <label htmlFor="c-company">Company</label>
        <input id="c-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {(Object.keys(attribution) as (keyof Attribution)[]).map((k) => (
        <input key={k} type="hidden" name={k} value={attribution[k]} />
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-[10px] rounded-full bg-[#0A0A0A] px-7 py-[14px] text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className={hintCls}>
          Want a walkthrough instead?{" "}
          <Link
            href="/book-demo"
            className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
          >
            Book a demo
          </Link>
        </p>
      </div>
    </form>
  );
}
