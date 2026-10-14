"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SHOWCASE, type ShowcaseBusiness, type ShowcaseProduct } from "@/lib/design/heroShowcase";
import { ProductArt, ProductArtDefs } from "./ProductArt";
import { Stroke } from "./Stroke";

/**
 * The hero demo: a live till and the invoice it produces.
 *
 * It plays a loop — items are tapped into the cart one by one, payment is taken,
 * the invoice is stamped — then moves on to the next kind of business, so the
 * first screen shows TajirPoint is not "a grocery POS". Anyone can interrupt it:
 * tapping a business, a product or a payment method takes over the demo and
 * hands it back after a few idle seconds. Under `prefers-reduced-motion` it
 * stays on one finished sale and only changes when the visitor picks a business.
 *
 * Narrow screens show one device at a time (switchable, and it follows the
 * sale: till while building, invoice once paid); wide ones show both.
 */

type Cart = Record<string, number>;
type Manual = { cart: Cart; pay: number; paid: boolean };

const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const unitsOf = (b: ShowcaseBusiness) =>
  Object.entries(b.cart).flatMap(([id, qty]) => Array.from({ length: qty }, () => id));

const cartAt = (units: string[], step: number): Cart => {
  const cart: Cart = {};
  for (const id of units.slice(0, step)) cart[id] = (cart[id] ?? 0) + 1;
  return cart;
};

const IDLE_RESUME_MS = 10_000;

/** How long the loop dwells on a step before moving on (step U+1 = the finished sale). */
const stepDelay = (step: number, U: number) =>
  step === 0 ? 700 : step < U ? 650 : step === U ? 1100 : 3600;

/** Fraction of one business's loop that is over once `step` has been shown. */
const loopProgress = (step: number, U: number) => {
  let done = 0;
  let total = 0;
  for (let i = 0; i <= U + 1; i++) {
    total += stepDelay(i, U);
    if (i <= step) done += stepDelay(i, U);
  }
  return done / total;
};

export function HeroShowcase() {
  const [idx, setIdx] = useState(0);
  // Start on a finished sale so server HTML and no-JS visitors see a full till.
  const [step, setStep] = useState(() => unitsOf(SHOWCASE[0]!).length + 1);
  const [manual, setManual] = useState<Manual | null>(null);
  const [locked, setLocked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [viewOverride, setViewOverride] = useState<"till" | "invoice" | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const biz = SHOWCASE[idx] ?? SHOWCASE[0]!;
  const units = useMemo(() => unitsOf(biz), [biz]);
  const U = units.length;

  const auto = manual === null;
  const cart: Cart = auto ? cartAt(units, Math.min(step, U)) : manual.cart;
  const paid = auto ? step >= U + 1 : manual.paid;
  const pay = auto ? biz.defaultPayment : manual.pay;
  const lastAdded = auto && step >= 1 && step <= U ? (units[step - 1] ?? null) : null;

  const lines = biz.products.filter((p) => cart[p.id]).map((p) => ({ p, qty: cart[p.id] ?? 0 }));
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const tax = total - total / (1 + biz.taxRate);

  /* ── environment ─────────────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => e && setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    const onVis = () => setVisible((v) => (document.hidden ? false : v));
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(
    () => () => {
      if (idleRef.current) clearTimeout(idleRef.current);
    },
    []
  );

  /* ── the scripted loop ───────────────────────────────────────── */
  const frozen = locked || !visible || reduced;
  useEffect(() => {
    if (frozen) return;
    const delay = stepDelay(step, U);
    const id = setTimeout(() => {
      if (step <= U) {
        setStep(step + 1);
      } else {
        setIdx((i) => (i + 1) % SHOWCASE.length);
        setStep(0);
      }
    }, delay);
    return () => clearTimeout(id);
  }, [frozen, step, U]);

  /* ── visitor takes over, then hands back after a pause ───────── */
  const holdDemo = useCallback(() => {
    setLocked(true);
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      setLocked(false);
      setManual(null);
      setIdx((i) => (i + 1) % SHOWCASE.length);
      setStep(0);
    }, IDLE_RESUME_MS);
  }, []);

  const selectBusiness = (i: number) => {
    setIdx(i);
    setStep(unitsOf(SHOWCASE[i]!).length + 1);
    setManual(null);
    holdDemo();
  };

  const addProduct = (p: ShowcaseProduct) => {
    setManual({ cart: { ...cart, [p.id]: (cart[p.id] ?? 0) + 1 }, pay, paid: false });
    holdDemo();
  };

  const removeProduct = (id: string) => {
    const next = { ...cart };
    if ((next[id] ?? 0) <= 1) delete next[id];
    else next[id] = (next[id] ?? 1) - 1;
    setManual({ cart: next, pay, paid: false });
    holdDemo();
  };

  const choosePayment = (i: number) => {
    setManual({ cart, pay: i, paid: false });
    holdDemo();
  };

  const completeSale = () => {
    if (!lines.length) return;
    setManual({ cart, pay, paid: true });
    setViewOverride("invoice");
    holdDemo();
  };

  const view = viewOverride ?? "till";

  return (
    <div ref={rootRef} lang="en" dir="ltr" className="@container relative mt-8">
      <ProductArtDefs />

      {/* ── business switcher ─────────────────────────────────── */}
      <div
        className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-2"
        role="tablist"
        aria-label="See TajirPoint in your kind of business"
      >
        <span className="mr-1 w-full text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8F98] @[560px]:w-auto">
          Built for
        </span>
        {SHOWCASE.map((b, i) => {
          const active = i === idx;
          return (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectBusiness(i)}
              className={`relative inline-flex cursor-pointer items-center gap-[7px] whitespace-nowrap rounded-full px-3 py-[7px] text-[12.5px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-[var(--color-mint)] text-[#0A0A0A] shadow-[0_6px_18px_rgba(0,210,122,.3)]"
                  : "bg-white/[0.08] text-[#C9CDD6] hover:bg-white/[0.14]"
              }`}
            >
              <Stroke name={b.icon} size={14} width={2} />
              {b.label}
              {active && !frozen && (
                <span className="pointer-events-none absolute inset-x-3 bottom-[3px] h-[2px] overflow-hidden rounded-full bg-black/15">
                  <span
                    key={idx}
                    className="block h-full origin-left rounded-full bg-[#0A0A0A]/70"
                    style={{
                      transform: `scaleX(${loopProgress(step, U)})`,
                      transition: `transform ${stepDelay(step, U)}ms linear`,
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
        <span className="text-[12px] text-[#8A8F98]">
          + wholesale, distribution, factories &amp; more
        </span>
      </div>

      {/* ── narrow screens: one device at a time ──────────────── */}
      <div
        className="mb-3 inline-flex rounded-full bg-white/[0.08] p-[3px] @[640px]:hidden"
        role="group"
        aria-label="Show"
      >
        {(["till", "invoice"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => {
              setViewOverride(v);
              holdDemo();
            }}
            className={`cursor-pointer rounded-full px-4 py-[6px] text-[12.5px] font-semibold transition-colors ${
              view === v ? "bg-white text-[#0A0A0A]" : "text-[#C9CDD6]"
            }`}
          >
            {v === "till" ? "Till" : "Invoice"}
            {v === "invoice" && paid && view !== "invoice" && (
              <span className="ml-1.5 inline-block h-[7px] w-[7px] rounded-full bg-[#00D27A] align-middle" />
            )}
          </button>
        ))}
      </div>

      {/* ── devices ───────────────────────────────────────────── */}
      <div className="gap-3 @[640px]:flex @[640px]:items-stretch">
        <div
          className={`min-w-0 motion-safe:animate-[tpSlideIn_300ms_ease-out_both] @[640px]:flex-1 ${
            view === "till" ? "" : "hidden @[640px]:block"
          }`}
        >
          <Till
            key={biz.id}
            biz={biz}
            lines={lines}
            total={total}
            tax={tax}
            pay={pay}
            paid={paid}
            lastAdded={lastAdded}
            step={step}
            onAdd={addProduct}
            onRemove={removeProduct}
            onPay={choosePayment}
            onComplete={completeSale}
            onTouch={holdDemo}
          />
        </div>

        <div
          className={`min-w-0 motion-safe:animate-[tpSlideIn_300ms_ease-out_both] @[640px]:w-[236px] @[640px]:flex-none ${
            view === "invoice" ? "" : "hidden @[640px]:block"
          }`}
        >
          <Invoice
            biz={biz}
            lines={lines}
            total={total}
            tax={tax}
            paid={paid}
            method={biz.payments[pay] ?? biz.payments[0]}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══ Till ═══════════════════════════════════════════════════════ */

function Till({
  biz,
  lines,
  total,
  tax,
  pay,
  paid,
  lastAdded,
  step,
  onAdd,
  onRemove,
  onPay,
  onComplete,
  onTouch,
}: {
  biz: ShowcaseBusiness;
  lines: { p: ShowcaseProduct; qty: number }[];
  total: number;
  tax: number;
  pay: number;
  paid: boolean;
  lastAdded: string | null;
  step: number;
  onAdd: (p: ShowcaseProduct) => void;
  onRemove: (id: string) => void;
  onPay: (i: number) => void;
  onComplete: () => void;
  onTouch: () => void;
}) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const shown = biz.products.filter((p) => {
    const q = search.toLowerCase().trim();
    return (cat === "All" || p.cat === cat) && (!q || p.name.toLowerCase().includes(q));
  });

  return (
    <div className="@container rounded-[18px] bg-white p-3 text-[#0A0A0A] shadow-[0_30px_70px_rgba(0,0,0,.6)] @[440px]:p-4">
      {/* status bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-[#EEF0F3] pb-2.5 text-[12px]">
        <div className="min-w-0">
          <span className="font-bold">{biz.shop}</span>
          <span className="text-[#8A8F98]"> · {biz.register}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4FAEF] px-2.5 py-[3px] text-[11px] font-semibold text-[#00A862]">
          <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#00D27A]" />
          Online · Synced
        </span>
      </div>

      {/* search + scan */}
      <div className="mt-3 flex items-center gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7.5" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onTouch();
            }}
            placeholder={biz.searchHint}
            className="w-full rounded-[10px] border border-[#E3E5EA] bg-[#F7F8FA] py-2 pl-8 pr-3 text-[16px] font-medium text-[#0A0A0A] placeholder:text-[#9AA0A6] focus:border-[#0A0A0A] focus:bg-white focus:outline-none @[440px]:text-[12.5px]"
          />
        </label>
        <span className="relative inline-flex flex-none items-center gap-1.5 overflow-hidden rounded-[10px] border border-[#E3E5EA] bg-[#F7F8FA] px-3 py-2 font-mono text-[11px] font-semibold text-[#4B5058]">
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
            <span className="block h-[1.5px] w-full bg-[#00D27A] opacity-80 shadow-[0_0_6px_#00D27A] motion-safe:animate-[tpLaserScan_2.8s_ease-in-out_infinite]" />
          </span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14" />
          </svg>
          {biz.scanLabel}
        </span>
      </div>

      {/* categories */}
      <div className="-mx-1 mt-2.5 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {biz.cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCat(c);
              onTouch();
            }}
            className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${
              cat === c
                ? "bg-[#0A0A0A] text-white"
                : "bg-[#F0F2F5] text-[#5F6368] hover:bg-[#E3E5EA]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* products + cart */}
      <div className="mt-2.5 grid gap-3 @[440px]:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="grid grid-cols-3 gap-2">
            {shown.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onAdd(p)}
                className="group relative cursor-pointer overflow-hidden rounded-[10px] border border-[#ECEEF2] bg-[#F9FAFB] p-1 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D27A] hover:bg-white hover:shadow-sm active:scale-95"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[7px] bg-[#EEF1F5]">
                  {p.photo ? (
                    <Image
                      src={`/images/hero-pos/${p.photo}.jpg`}
                      alt=""
                      fill
                      sizes="120px"
                      loading="eager"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <ProductArt id={p.art!} className="absolute inset-0 h-full w-full p-1.5" />
                  )}
                  {lastAdded === p.id && (
                    <span
                      key={step}
                      className="pointer-events-none absolute inset-0 grid place-items-center bg-[#00D27A]/25"
                    >
                      <span className="h-8 w-8 rounded-full border-2 border-[#00D27A] motion-safe:animate-[tpTapRing_650ms_ease-out_both]" />
                    </span>
                  )}
                </div>
                <div className="px-0.5 pb-0.5 pt-1.5">
                  <div className="line-clamp-2 min-h-[2.4em] text-[11px] font-bold leading-[1.2]">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-extrabold text-[#00A862]">
                    {money(p.price)}
                  </div>
                  <div className="truncate font-mono text-[9.5px] text-[#9AA0A6]">{p.stock}</div>
                </div>
              </button>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="py-8 text-center text-[12px] text-[#8A8F98]">
              Nothing matches. Clear the search or pick “All”.
            </div>
          )}
        </div>

        {/* cart */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#F4F5F7] p-3">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[#E3E5EA] pb-1.5 text-[12px]">
              <span className="font-extrabold">Current sale</span>
              <span className="truncate text-[11px] text-[#6B7079]">{biz.customer}</span>
            </div>
            <div className="mt-2 min-h-[92px] space-y-1.5">
              {lines.map(({ p, qty }) => (
                <div
                  key={`${p.id}-${qty}`}
                  className="flex items-center justify-between gap-2 text-[11.5px] motion-safe:animate-[tpSlideIn_260ms_ease-out_both]"
                >
                  <div className="min-w-0 truncate">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[#8A8F98]"> ×{qty}</span>
                  </div>
                  <div className="flex flex-none items-center gap-1.5 font-mono font-bold">
                    {money(p.price * qty)}
                    <button
                      type="button"
                      aria-label={`Remove one ${p.name}`}
                      onClick={() => onRemove(p.id)}
                      className="grid h-5 w-5 cursor-pointer place-items-center rounded-full text-[14px] leading-none text-[#C5221F] hover:bg-white"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))}
              {lines.length === 0 && (
                <div className="grid min-h-[84px] place-items-center text-center text-[11.5px] text-[#8A8F98]">
                  Tap an item to start a sale
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="my-2 h-px bg-[#E3E5EA]" />
            <div className="flex justify-between text-[11px] text-[#6B7079]">
              <span>Tax (incl. {Math.round(biz.taxRate * 100)}%)</span>
              <span className="font-mono">{money(tax)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[14px] font-extrabold">
              <span>Total</span>
              <span className="font-mono text-[#00A862]">{money(total)}</span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              {biz.payments.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onPay(i)}
                  className={`cursor-pointer rounded-[8px] px-1 py-1.5 text-center text-[11px] font-bold transition-colors ${
                    pay === i
                      ? "bg-[#00D27A] text-[#0A0A0A]"
                      : "bg-white text-[#4B5058] hover:bg-[#ECEEF2]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onComplete}
              className={`mt-2 w-full cursor-pointer rounded-[9px] py-2 text-center font-mono text-[12px] font-bold transition-colors active:scale-[0.98] ${
                paid ? "bg-[#00A862] text-white" : "bg-[#0A0A0A] text-white hover:opacity-90"
              }`}
            >
              {paid ? "✓ Sale completed" : `Complete sale · ${money(total)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Invoice ════════════════════════════════════════════════════ */

const stampFor = (method: string) =>
  method === "Credit" || method === "Tab"
    ? "ON CREDIT"
    : method === "Installments"
      ? "INSTALLMENTS"
      : "PAID";

function Invoice({
  biz,
  lines,
  total,
  tax,
  paid,
  method,
}: {
  biz: ShowcaseBusiness;
  lines: { p: ShowcaseProduct; qty: number }[];
  total: number;
  tax: number;
  paid: boolean;
  method: string;
}) {
  const stamp = stampFor(method);
  const settled = stamp === "PAID";

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white p-4 text-[#0A0A0A] shadow-[0_30px_70px_rgba(0,0,0,.6)]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-[#0A0A0A] text-[13px] font-extrabold text-[var(--color-mint)]">
            {biz.shop[0]}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold leading-tight">{biz.shop}</div>
            <div className="truncate text-[10px] text-[#8A8F98]">{biz.place}</div>
          </div>
        </div>
        <span
          className={`flex-none rounded-full px-2 py-[3px] text-[10px] font-bold transition-colors duration-300 ${
            paid
              ? settled
                ? "bg-[#E4FAEF] text-[#00A862]"
                : "bg-[#FFF3DC] text-[#B36B00]"
              : "bg-[#F0F2F5] text-[#6B7079]"
          }`}
        >
          {paid ? (settled ? "Paid" : "On account") : "Draft"}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-dashed border-[#E3E5EA] pt-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A8F98]">
            Invoice
          </div>
          <div className="text-[13px] font-extrabold">{biz.invoiceNo}</div>
        </div>
        <div className="text-right text-[10px] text-[#6B7079]">
          <div>Billed to</div>
          <div className="text-[11px] font-semibold text-[#0A0A0A]">{biz.customer}</div>
        </div>
      </div>

      <div className="mt-3 min-h-[112px] flex-1 space-y-1.5 border-t border-[#EEF0F3] pt-3">
        {lines.map(({ p, qty }) => (
          <div
            key={`${p.id}-${qty}`}
            className="flex items-start justify-between gap-2 text-[11px] motion-safe:animate-[tpSlideIn_260ms_ease-out_both]"
          >
            <span className="min-w-0">
              <span className="font-semibold">{p.name}</span>
              <span className="block text-[10px] text-[#8A8F98]">
                {qty} × {money(p.price)}
              </span>
            </span>
            <span className="flex-none font-mono font-bold">{money(p.price * qty)}</span>
          </div>
        ))}
        {lines.length === 0 && (
          <div className="grid min-h-[96px] place-items-center text-[11px] text-[#9AA0A6]">
            Items appear as they’re sold
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1 border-t border-[#EEF0F3] pt-2.5 text-[11px]">
        <div className="flex justify-between text-[#6B7079]">
          <span>Tax (incl. {Math.round(biz.taxRate * 100)}%)</span>
          <span className="font-mono">{money(tax)}</span>
        </div>
        <div className="flex items-center justify-between text-[15px] font-extrabold">
          <span>Total</span>
          <span className="font-mono">{money(total)}</span>
        </div>
        <div className="flex justify-between text-[10px] text-[#8A8F98]">
          <span>Method</span>
          <span className="font-semibold text-[#4B5058]">{method}</span>
        </div>
      </div>

      <div className="mt-1 grid h-[58px] place-items-center">
        {paid && (
          <span
            key={`${biz.id}-${stamp}`}
            className={`-rotate-[14deg] rounded-[6px] border-[2.5px] px-2.5 py-0.5 text-[15px] font-black tracking-[0.1em] motion-safe:animate-[tpStamp_420ms_cubic-bezier(.2,.9,.3,1.2)_both] ${
              settled ? "border-[#00A862] text-[#00A862]" : "border-[#B36B00] text-[#B36B00]"
            }`}
          >
            {stamp}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-semibold text-[#4B5058]">
        {["WhatsApp", "Email", "Print"].map((a) => (
          <span key={a} className="rounded-[7px] bg-[#F4F5F7] py-1.5">
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
