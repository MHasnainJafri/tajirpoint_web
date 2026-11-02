"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import type { CallbackState } from "@/components/marketing/callback/actions";
import { submitPartnerRequest } from "./actions";
import { PARTNER_TYPES } from "./partner-request";
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
 * The short partner enquiry on /partners. Same mechanics as the call-back
 * form (server action, first-touch campaign tags in hidden fields, honeypot);
 * the server action turns the partner answers into a "PARTNER:" message.
 */
export function PartnerForm({ idPrefix = "pt" }: { idPrefix?: string }) {
  const [state, action, pending] = useActionState<CallbackState | undefined, FormData>(
    submitPartnerRequest,
    undefined
  );
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);
  const tracked = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const id = (name: string) => `${idPrefix}-${name}`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of the stored first touch on mount
    setAttribution(readAttribution(sessionStore(), currentAttribution()));
  }, []);

  useEffect(() => {
    if (state?.ok && !tracked.current) {
      tracked.current = true;
      trackCallbackRequest({ businessType: "partner", location: "partners" });
      successRef.current?.focus();
    } else if (state?.error) {
      errorRef.current?.focus();
    }
  }, [state]);

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
          We will talk about the shops you work with and how a partnership could work.
        </p>
        <a
          href={whatsappLink("Hi TajirPoint, I just sent a partner enquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="partners_success"
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
      aria-label="Partner enquiry"
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
        <Field
          id={id("business_name")}
          label="Company or business name"
          required
          error={f.business_name}
        >
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={id("partner_type")} label="What kind of partner?" optional>
          <select
            id={id("partner_type")}
            name="partner_type"
            defaultValue=""
            className={inputCls()}
          >
            <option value="">Choose one</option>
            {PARTNER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("area")} label="City and country" optional>
          <input
            id={id("area")}
            name="area"
            type="text"
            maxLength={120}
            autoComplete="address-level2"
            placeholder="e.g. Lahore, Pakistan"
            className={inputCls()}
          />
        </Field>
      </div>

      <Field id={id("message")} label="Tell us about your work" optional error={f.message}>
        <textarea
          id={id("message")}
          name="message"
          rows={3}
          maxLength={2500}
          placeholder="How many shops or restaurants you work with, what you sell or set up…"
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
          className="inline-flex min-h-[44px] items-center justify-center gap-[10px] rounded-full bg-[var(--color-mint)] px-7 py-[14px] text-[15.5px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,210,122,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send my enquiry"}
        </button>
        <p className={hintCls}>We only use your details to talk to you about partnering.</p>
      </div>
    </form>
  );
}
