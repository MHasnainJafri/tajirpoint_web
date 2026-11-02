"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useLocale } from "next-intl";
import {
  COUNTRIES,
  countryByIso,
  flagEmoji,
  guessCountry,
  isInternational,
  normalizePhone,
  parsePhoneInput,
  searchCountries,
  type Country,
} from "@/lib/marketing/phone";
import { pickCopy } from "@/content/i18n/page-copy";
import { SHARED_FORM_COPY } from "@/content/i18n/lead-pages/forms";
import { OptionalMark, RequiredMark } from "./Field";
import { errorCls, hintCls, inputCls, labelCls } from "./styles";

/**
 * Phone number with a country dial-code picker.
 *
 * Posts four fields: the picker's own `phone_country` (ISO2) + `phone_local`
 * (what was typed), and the results `phone` (E.164) + `country` (ISO2).
 * The server rebuilds the number from the first two (see `phoneFromForm`), so
 * the form still works before JavaScript loads: the page is rendered with a
 * native <select>, swapped for the searchable picker once hydrated.
 *
 * A number pasted (or autofilled) with "+" or "00" is taken as it is and the
 * picker switches to its country.
 *
 * Urdu / Arabic pages: labels come from SHARED_FORM_COPY, the open picker
 * shows country names in the page language (Intl.DisplayNames, English when
 * the browser has none) and matches a search in either language. The code
 * picker + number row is always left-to-right ("+92 300 1234567"), the way
 * phone numbers are written in both scripts; label, hint and list follow the
 * page direction.
 */
export function PhoneField({
  id,
  label,
  required,
  optional,
  hint,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
}) {
  const [country, setCountry] = useState("");
  const [local, setLocal] = useState("");
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const locale = useLocale();
  const t = pickCopy(SHARED_FORM_COPY, locale).t.phone;
  const localNames = useLocalCountryNames(locale);
  const nameOf = (c: Country) => localNames?.(c.iso2) ?? c.name;

  const wrapRef = useRef<HTMLDivElement>(null);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const localRef = useRef<HTMLInputElement>(null);

  const listId = `${id}-countries`;
  const optId = (iso: string) => `${id}-opt-${iso}`;
  const selected = countryByIso(country);
  const parsed = parsePhoneInput(local, country);
  const filtered = useMemo(() => {
    const base = searchCountries(query);
    const q = query.trim();
    if (!localNames || !q) return base;
    // Also match the country name in the page language ("پاکستان", "باكستان").
    const seen = new Set(base.map((c) => c.iso2));
    const extra = COUNTRIES.filter(
      (c) => !seen.has(c.iso2) && (localNames(c.iso2) ?? "").includes(q)
    );
    return [...extra, ...base];
  }, [query, localNames]);

  // Once hydrated: keep anything chosen or typed before JavaScript loaded,
  // else default the country from the time zone / browser language.
  useEffect(() => {
    const typed = localRef.current?.value ?? "";
    const picked = nativeRef.current?.value ?? "";
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      /* very old browsers */
    }
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (typed) setLocal(typed);
    setCountry(picked || guessCountry({ timeZone, languages }));
    setEnhanced(true);
  }, []);

  // Close the picker on a click anywhere else.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Focus the search box on open; keep the highlighted option in view.
  useEffect(() => {
    if (!open) return;
    if (document.activeElement !== searchRef.current) searchRef.current?.focus();
    const c = filtered[active];
    if (c) document.getElementById(optId(c.iso2))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optId only depends on id
  }, [open, active, filtered]);

  function openPicker(initial = "") {
    const list = searchCountries(initial);
    setQuery(initial);
    setActive(
      initial
        ? 0
        : Math.max(
            0,
            list.findIndex((c) => c.iso2 === country)
          )
    );
    setOpen(true);
  }

  function choose(iso: string) {
    setCountry(iso);
    setOpen(false);
    setQuery("");
    localRef.current?.focus();
  }

  /** "+44 20 7946 0123" → country GB, number "2079460123". */
  function takeInternational(text: string) {
    const p = parsePhoneInput(text, country);
    if (p.e164 && p.country) {
      setCountry(p.country);
      setLocal(p.national);
    } else {
      setLocal(text.trim());
    }
  }

  function onSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const last = filtered.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "PageDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 8, last));
        break;
      case "PageUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 8, 0));
        break;
      case "Enter":
        // Never submit the form from the search box.
        e.preventDefault();
        if (filtered[active]) choose(filtered[active].iso2);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  function onButtonKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openPicker();
    } else if (e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Type-to-search straight from the closed picker.
      e.preventDefault();
      openPicker(e.key);
    }
  }

  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const borderCls = error
    ? "border-[#B42318]"
    : "border-[var(--color-line-3)] hover:border-[var(--color-muted-2)]";
  const pickerCls = `inline-flex h-[48px] shrink-0 items-center gap-1.5 rounded-[12px] border bg-white px-3 text-[15px] font-semibold text-[var(--color-ink)] transition-[border-color,box-shadow] duration-200 focus:border-[var(--color-mint-2)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,210,122,.25)] ${borderCls}`;
  const activeOpt = filtered[active];

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} id={`${id}-label`} className={labelCls}>
        {label}
        {required && <RequiredMark />}
        {optional && <OptionalMark />}
      </label>

      <div ref={wrapRef} className="relative min-w-0">
        <div role="group" aria-labelledby={`${id}-label`} dir="ltr" className="flex min-w-0 gap-2">
          {enhanced ? (
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={open ? listId : undefined}
              aria-label={selected ? t.codeFor(nameOf(selected), selected.dial) : t.chooseCode}
              onClick={() => (open ? setOpen(false) : openPicker())}
              onKeyDown={onButtonKey}
              className={pickerCls}
            >
              {selected ? (
                <>
                  <span aria-hidden="true" className="text-[19px] leading-none">
                    {flagEmoji(selected.iso2)}
                  </span>
                  <span className="tabular-nums">+{selected.dial}</span>
                </>
              ) : (
                <span className="text-[var(--color-muted)]">{t.code}</span>
              )}
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`text-[var(--color-muted)] transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            <select
              ref={nativeRef}
              name="phone_country"
              aria-label={t.nativeLabel}
              defaultValue=""
              className={`${pickerCls} w-[128px] min-w-0 font-medium`}
            >
              <option value="">{t.nativeEmpty}</option>
              {COUNTRIES.map((c) => (
                <option key={c.iso2} value={c.iso2}>
                  {c.name} (+{c.dial})
                </option>
              ))}
            </select>
          )}

          <input
            ref={localRef}
            id={id}
            name="phone_local"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required={required}
            placeholder={placeholder ?? t.placeholder}
            value={local}
            onChange={(e) => {
              const v = e.target.value;
              // Autofill (or a paste we did not catch) drops in a whole
              // "+…" number at once: adopt its country straight away.
              if (v.length - local.length > 3 && isInternational(v) && normalizePhone(v)) {
                takeInternational(v);
              } else {
                setLocal(v);
              }
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text");
              if (isInternational(text)) {
                e.preventDefault();
                takeInternational(text);
              }
            }}
            onBlur={() => {
              if (isInternational(local)) takeInternational(local);
            }}
            className={`${inputCls(!!error)} flex-1`}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
          />
        </div>

        {enhanced && open && (
          <div className="absolute inset-x-0 top-[calc(100%+6px)] z-40 overflow-hidden rounded-[14px] border border-[var(--color-line-2)] bg-white shadow-[0_18px_40px_rgba(10,10,10,.14)]">
            <div className="relative border-b border-[var(--color-line-2)] p-2">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                ref={searchRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeOpt ? optId(activeOpt.iso2) : undefined}
                aria-label={t.searchLabel}
                placeholder={t.searchPlaceholder}
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onSearchKey}
                className="h-[42px] w-full min-w-0 rounded-[10px] border border-[var(--color-line-3)] bg-white pe-3 ps-9 text-[16px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] focus:border-[var(--color-mint-2)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,210,122,.25)]"
              />
            </div>
            <ul
              id={listId}
              role="listbox"
              aria-label={t.listLabel}
              className="max-h-[min(280px,45vh)] overflow-y-auto overscroll-contain py-1"
            >
              {filtered.map((c, i) => (
                <li
                  key={c.iso2}
                  id={optId(c.iso2)}
                  role="option"
                  aria-selected={c.iso2 === country}
                  // Keep focus in the search box while clicking an option.
                  onPointerDown={(e) => e.preventDefault()}
                  onPointerMove={() => i !== active && setActive(i)}
                  onClick={() => choose(c.iso2)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-[10px] text-[14.5px] text-[var(--color-ink)] ${
                    i === active ? "bg-[var(--color-mint-soft)]" : ""
                  } ${c.iso2 === country ? "font-semibold" : ""}`}
                >
                  <span aria-hidden="true" className="text-[18px] leading-none">
                    {flagEmoji(c.iso2)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{nameOf(c)}</span>
                  <span dir="ltr" className="tabular-nums text-[var(--color-muted)]">
                    +{c.dial}
                  </span>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-[14px] text-[var(--color-muted)]">{t.noMatch(query)}</p>
            )}
          </div>
        )}
      </div>

      {enhanced && <input type="hidden" name="phone_country" value={country} />}
      <input type="hidden" name="phone" value={parsed.e164} />
      <input type="hidden" name="country" value={parsed.country} />

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

/**
 * Country names in the page language, or null on English pages (the list
 * already has English names) and where the browser lacks Intl.DisplayNames.
 */
function useLocalCountryNames(locale: string): ((iso2: string) => string | undefined) | null {
  return useMemo(() => {
    if (locale === "en" || typeof Intl === "undefined" || !("DisplayNames" in Intl)) return null;
    try {
      const names = new Intl.DisplayNames([locale], { type: "region" });
      return (iso2: string) => {
        try {
          const n = names.of(iso2);
          return n && n !== iso2 ? n : undefined;
        } catch {
          return undefined;
        }
      };
    } catch {
      return null;
    }
  }, [locale]);
}
