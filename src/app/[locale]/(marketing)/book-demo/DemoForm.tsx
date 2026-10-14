"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { submitDemoRequest, type DemoState } from "./actions";
import {
  BRANCH_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  TIME_OPTIONS,
  preselectType,
  upcomingDays,
} from "@/lib/marketing/demo";
import {
  currentAttribution,
  emptyAttribution,
  readAttribution,
  sessionStore,
  type Attribution,
} from "@/lib/marketing/utm";
import { trackDemoRequest } from "@/lib/analytics/events";
import { whatsappLink } from "@/lib/config/site";
import {
  errorCls,
  hintCls,
  honeypotStyle,
  inputCls,
  labelCls,
  textareaCls,
} from "@/components/forms/styles";

/**
 * Our own demo booking form (no third-party scheduler). Posts through a server action
 * to the backend's demo-request endpoint, with the visitor's first-touch
 * campaign tags in hidden fields.
 *
 * Submitted with onSubmit + startTransition rather than a bare `action=`, so
 * React does not reset every field when the server sends back an error. The
 * `action=` stays for visitors without JavaScript.
 */
export function DemoForm() {
  const [state, action, pending] = useActionState<DemoState | undefined, FormData>(
    submitDemoRequest,
    undefined
  );
  const [businessType, setBusinessType] = useState("");
  const [wantsMigration, setWantsMigration] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const [days, setDays] = useState<Array<{ value: string; label: string }>>([]);
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);
  const tracked = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Browser-only inputs: ?type= / ?migrate= preselection, the day list (the
  // page is static, so dates must be computed here) and the stored first touch.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-off sync from the URL and the clock on mount */
    setBusinessType(preselectType(params.get("type")));
    setWantsMigration(params.get("migrate") === "1");
    setDays(upcomingDays(new Date()));
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setAttribution(readAttribution(sessionStore(), currentAttribution()));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (state?.ok && state.summary && !tracked.current) {
      tracked.current = true;
      trackDemoRequest(state.summary);
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
          Thanks — we&apos;ll WhatsApp you within one working day.
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-body)]">
          We&apos;ll confirm a time that suits you and set up the demo with your kind of business.
          {state.summary?.wantsMigration
            ? " Keep an export from your old POS handy (Excel or CSV is fine) — we'll ask for it."
            : ""}
        </p>
        <a
          href={whatsappLink("Hi TajirPoint, I just booked a demo on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="book_demo_success"
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
    f[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {};

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
      aria-label="Book a demo"
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
        <Field id="name" label="Your name" required error={f.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputCls(!!f.name)}
            {...err("name")}
          />
        </Field>
        <Field
          id="phone"
          label="WhatsApp number"
          required
          hint="Include your country code, for example +1, +44 or +971."
          error={f.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+1 415 555 0123"
            className={inputCls(!!f.phone)}
            aria-describedby={f.phone ? "phone-error" : "phone-hint"}
            aria-invalid={f.phone ? true : undefined}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" optional error={f.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls(!!f.email)}
            {...err("email")}
          />
        </Field>
        <Field id="business_name" label="Business name" optional error={f.business_name}>
          <input
            id="business_name"
            name="business_name"
            type="text"
            autoComplete="organization"
            className={inputCls(!!f.business_name)}
            {...err("business_name")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="business_type" label="Type of business" optional error={f.business_type}>
          <select
            id="business_type"
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
        <Field id="city" label="City" optional error={f.city}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={inputCls(!!f.city)}
            {...err("city")}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelCls}>
          How many shops or branches?{" "}
          <span className="font-normal text-[var(--color-muted)]">(optional)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {BRANCH_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-line-3)] bg-white px-4 py-[10px] text-[14px] font-semibold text-[var(--color-ink)] has-[:checked]:border-[var(--color-mint-2)] has-[:checked]:bg-[var(--color-mint-soft)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[rgba(0,210,122,.35)]"
            >
              <input
                type="radio"
                name="branches"
                value={o.value}
                className="accent-[var(--color-mint-2)]"
              />
              {o.label}
            </label>
          ))}
        </div>
        {f.branches && <p className={errorCls}>{f.branches}</p>}
      </fieldset>

      <Field
        id="current_pos"
        label="Are you using a POS or software now? Which one?"
        optional
        error={f.current_pos}
      >
        <input
          id="current_pos"
          name="current_pos"
          type="text"
          placeholder="e.g. Excel, a register, another POS"
          className={inputCls(!!f.current_pos)}
          {...err("current_pos")}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-4">
        <input
          type="checkbox"
          name="wants_migration"
          checked={wantsMigration}
          onChange={(e) => setWantsMigration(e.target.checked)}
          className="mt-[3px] h-[18px] w-[18px] flex-none accent-[var(--color-mint-2)]"
        />
        <span>
          <span className="block text-[14.5px] font-semibold text-[var(--color-ink)]">
            Move my data for me
          </span>
          <span className={`mt-1 block ${hintCls}`}>
            We load your products, customers, suppliers and credit balances from your old system —
            free.
          </span>
        </span>
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="preferred_date" label="Preferred day" optional error={f.preferred_date}>
          <select
            id="preferred_date"
            name="preferred_date"
            defaultValue=""
            className={inputCls(!!f.preferred_date)}
            {...err("preferred_date")}
          >
            <option value="">Any day</option>
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="preferred_time"
          label="Preferred time (your local time)"
          hint={
            timeZone
              ? `Time zone: ${timeZone}. We will confirm availability with you.`
              : "Tell us your time zone in the message below."
          }
          optional
          error={f.preferred_time}
        >
          <select
            id="preferred_time"
            name="preferred_time"
            defaultValue=""
            className={inputCls(!!f.preferred_time)}
            {...err("preferred_time")}
          >
            <option value="">Any time</option>
            {TIME_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Anything we should know?" optional error={f.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What you sell, what is hard today, what you want to see"
          className={textareaCls(!!f.message)}
          {...err("message")}
        />
      </Field>

      <input type="hidden" name="time_zone" value={timeZone} />

      {/* Honeypot — hidden from people; bots fill it and are dropped. */}
      <div aria-hidden="true" style={honeypotStyle}>
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
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
          {pending ? "Sending…" : "Book my free demo"}
        </button>
        <p className={hintCls}>We only use your number to arrange the demo.</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-[#B42318]">
            {" "}
            *
          </span>
        )}
        {optional && <span className="font-normal text-[var(--color-muted)]"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={hintCls}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={errorCls}>
          {error}
        </p>
      )}
    </div>
  );
}
