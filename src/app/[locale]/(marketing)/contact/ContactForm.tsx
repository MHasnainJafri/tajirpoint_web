"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitContact, type ContactState } from "./actions";
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
import { PhoneField } from "@/components/forms/PhoneField";
import { pickCopy } from "@/content/i18n/page-copy";
import {
  CONTACT_FORM_COPY,
  SHARED_FORM_COPY,
  businessTypeOptions,
  localizeError,
  localizeErrors,
} from "@/content/i18n/lead-pages/forms";

/**
 * The contact page's message form. Words follow the page language
 * (src/content/i18n/lead-pages/forms.ts); the server action answers in
 * English and `localizeError` translates it.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined
  );
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);
  const tracked = useRef(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const locale = useLocale();
  const { t } = pickCopy(CONTACT_FORM_COPY, locale);
  const shared = pickCopy(SHARED_FORM_COPY, locale).t;

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
        <p className="text-[19px] font-extrabold text-[var(--color-ink)]">{t.successTitle}</p>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
          {t.successBody}{" "}
          <Link
            href="/book-demo"
            className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
          >
            {t.successLink}
          </Link>
        </p>
      </div>
    );
  }

  const f = localizeErrors(state?.fields, locale);
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
      aria-label={t.formLabel}
      className="flex flex-col gap-5"
    >
      {state?.error && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[12px] border border-[#F3C3BD] bg-[#FEF3F2] px-4 py-3 text-[14px] text-[#B42318] outline-none"
        >
          {localizeError(state.error, locale)}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className={labelCls}>
            {t.name}{" "}
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
            {t.email}{" "}
            <span aria-hidden="true" className="text-[#B42318]">
              *
            </span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            dir="ltr"
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
        <PhoneField id="c-phone" label={t.phone} optional error={f.phone} />
        <div className="flex flex-col gap-2">
          <label htmlFor="c-business" className={labelCls}>
            {t.businessType}{" "}
            <span className="font-normal text-[var(--color-muted)]">{shared.optional}</span>
          </label>
          <select id="c-business" name="business_type" defaultValue="" className={inputCls(false)}>
            <option value="">{shared.chooseOne}</option>
            {businessTypeOptions(locale).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className={labelCls}>
          {t.message}{" "}
          <span aria-hidden="true" className="text-[#B42318]">
            *
          </span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
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
          {pending ? shared.sending : t.submit}
        </button>
        <p className={hintCls}>
          {t.walkthrough}{" "}
          <Link
            href="/book-demo"
            className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
          >
            {t.bookDemo}
          </Link>
        </p>
      </div>
    </form>
  );
}
