"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { submitCallbackRequest, type CallbackState } from "./actions";
import { BUSINESS_TYPE_OPTIONS, preselectType } from "@/lib/marketing/demo";
import {
  currentAttribution,
  emptyAttribution,
  readAttribution,
  sessionStore,
  type Attribution,
} from "@/lib/marketing/utm";
import { trackCallbackRequest } from "@/lib/analytics/events";
import { whatsappLink } from "@/lib/config/site";
import { hintCls, honeypotStyle, inputCls, textareaCls } from "@/components/forms/styles";
import { Field } from "@/components/forms/Field";
import { PhoneField } from "@/components/forms/PhoneField";

/**
 * The short "Interested? We'll call you" form. Same mechanics as the demo
 * form: a server action posts it to the backend (here the call-back endpoint)
 * with the visitor's first-touch campaign tags in hidden fields; `action=`
 * stays for visitors without JavaScript.
 *
 * `idPrefix` keeps ids unique when the form sits inside another page;
 * `location` labels the analytics event.
 */
export function CallbackForm({
  idPrefix = "cb",
  location,
}: {
  idPrefix?: string;
  location: string;
}) {
  const [state, action, pending] = useActionState<CallbackState | undefined, FormData>(
    submitCallbackRequest,
    undefined
  );
  const [businessType, setBusinessType] = useState("");
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);
  const tracked = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const id = (name: string) => `${idPrefix}-${name}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-off sync from the URL and the stored first touch on mount */
    setBusinessType(preselectType(params.get("type")));
    setAttribution(readAttribution(sessionStore(), currentAttribution()));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (state?.ok && state.summary && !tracked.current) {
      tracked.current = true;
      trackCallbackRequest({ businessType: state.summary.businessType, location });
      successRef.current?.focus();
    } else if (state?.error) {
      errorRef.current?.focus();
    }
  }, [state, location]);

  if (state?.ok) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[22px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-[clamp(22px,4vw,36px)] outline-none"
      >
        <p className="text-[22px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
          Thanks — our team will call you within one working day.
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-body)]">
          Keep your phone close. If you would rather not wait, message us on WhatsApp now.
        </p>
        <a
          href={whatsappLink("Hi TajirPoint, I just asked for a call back on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="callback_success"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-[14.5px] font-bold text-white transition-transform duration-200 hover:-translate-y-[2px]"
        >
          Message us on WhatsApp now
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  const f = state?.fields ?? {};
  const err = (name: keyof typeof f) =>
    f[name] ? { "aria-invalid": true as const, "aria-describedby": `${id(name)}-error` } : {};

  return (
    <form
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Ask for a call back"
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
        <Field id={id("business_name")} label="Business name" required error={f.business_name}>
          <input
            id={id("business_name")}
            name="business_name"
            type="text"
            autoComplete="organization"
            required
            className={inputCls(!!f.business_name)}
            {...err("business_name")}
          />
        </Field>
        <Field id={id("name")} label="Your name" required error={f.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputCls(!!f.name)}
            {...err("name")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <PhoneField id={id("phone")} label="Phone number" required error={f.phone ?? f.country} />
        <Field id={id("email")} label="Email" optional error={f.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls(!!f.email)}
            {...err("email")}
          />
        </Field>
      </div>

      <Field id={id("business_type")} label="Type of business" optional error={f.business_type}>
        <select
          id={id("business_type")}
          name="business_type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className={inputCls(!!f.business_type)}
        >
          <option value="">Choose one</option>
          {BUSINESS_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={id("message")} label="What would you like to know?" optional error={f.message}>
        <textarea
          id={id("message")}
          name="message"
          rows={3}
          placeholder="Prices, switching from your old system, hardware…"
          className={textareaCls(!!f.message)}
          {...err("message")}
        />
      </Field>

      {/* Honeypot — hidden from people; bots fill it and are dropped. */}
      <div aria-hidden="true" style={honeypotStyle}>
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {(Object.keys(attribution) as (keyof Attribution)[]).map((k) => (
        <input key={k} type="hidden" name={k} value={attribution[k]} />
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-[10px] rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15.5px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,210,122,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Call me back"}
        </button>
        <p className={hintCls}>We only use your number to call you about TajirPoint.</p>
      </div>
    </form>
  );
}
