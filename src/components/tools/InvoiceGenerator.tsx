"use client";

import { useId, useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";
import { invoiceTotals, parseAmount } from "@/lib/tools/calc";
import { inputCls, labelCls, textareaCls } from "@/components/forms/styles";
import { NumberField, ToolCard, fmt, useToolUse, useTrackFirstResult } from "./ToolKit";

/**
 * A simple invoice, filled in and printed (or saved as PDF) by the browser.
 * Nothing is stored — no localStorage, no request — so a reload clears it.
 * The print stylesheet below hides everything on the page except the invoice.
 */

interface Line {
  key: number;
  description: string;
  quantity: string;
  price: string;
}

const CURRENCIES = ["PKR", "GBP", "AED", "SAR", "USD", "EUR", "QAR", "OMR", "KWD", "BHD"] as const;

/**
 * Print only #tp-invoice: every element that neither holds the invoice nor
 * sits inside it is removed, and the invoice's ancestors lose their padding,
 * borders and grid so the invoice starts at the top of the first page.
 * (`:has` — every current browser; an older one prints the whole page.)
 */
const PRINT_CSS = `
@media print {
  @page { margin: 14mm; }
  html, body { background: #fff !important; }
  body *:not(:has(#tp-invoice)):not(#tp-invoice):not(#tp-invoice *) { display: none !important; }
  body *:has(#tp-invoice) {
    display: block !important; position: static !important; margin: 0 !important;
    padding: 0 !important; border: 0 !important; box-shadow: none !important;
    background: #fff !important; max-width: none !important; width: auto !important;
  }
  #tp-invoice {
    border: 0 !important; border-radius: 0 !important; box-shadow: none !important;
    padding: 0 !important; color: #000 !important; overflow: visible !important;
  }
}`;

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function prettyDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function InvoiceGenerator() {
  const uid = useId();
  const track = useToolUse("invoice-generator");
  const [seller, setSeller] = useState("");
  const [sellerDetails, setSellerDetails] = useState("");
  const [buyer, setBuyer] = useState("");
  const [buyerDetails, setBuyerDetails] = useState("");
  const [number, setNumber] = useState("INV-001");
  const [date, setDate] = useState(today);
  const [due, setDue] = useState("");
  const [currency, setCurrency] = useState<string>("PKR");
  const [taxName, setTaxName] = useState("Tax");
  const [taxRate, setTaxRate] = useState("");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [nextKey, setNextKey] = useState(2);
  const [lines, setLines] = useState<Line[]>([
    { key: 1, description: "", quantity: "1", price: "" },
  ]);

  const parsed = lines.map((l) => ({
    ...l,
    q: parseAmount(l.quantity) ?? 0,
    p: parseAmount(l.price) ?? 0,
  }));
  const rate = parseAmount(taxRate) ?? 0;
  const totals = invoiceTotals(
    parsed.map((l) => ({ quantity: l.q, unitPrice: l.p })),
    rate,
    parseAmount(discount) ?? 0
  );
  const hasItems = parsed.some((l) => l.description.trim() && l.q * l.p !== 0);
  useTrackFirstResult("invoice-generator", hasItems);

  const updateLine = (key: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  const addLine = () => {
    setLines((ls) => [...ls, { key: nextKey, description: "", quantity: "1", price: "" }]);
    setNextKey((k) => k + 1);
  };
  const removeLine = (key: number) =>
    setLines((ls) => (ls.length > 1 ? ls.filter((l) => l.key !== key) : ls));

  const print = () => {
    track("print");
    window.print();
  };

  const money = (n: number) => `${currency} ${fmt(n)}`;
  const field = (id: string) => `${uid}-${id}`;

  return (
    <>
      <style>{PRINT_CSS}</style>
      <div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_1fr] xl:items-start">
        <ToolCard>
          <form className="flex min-w-0 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="grid min-w-0 gap-4 sm:grid-cols-2">
              <legend className="mb-3 text-[16px] font-bold">From and to</legend>
              <TextField
                id={field("seller")}
                label="Your business name"
                value={seller}
                onChange={setSeller}
              />
              <TextField
                id={field("buyer")}
                label="Customer name"
                value={buyer}
                onChange={setBuyer}
              />
              <TextArea
                id={field("seller-details")}
                label="Your address, phone, tax number"
                value={sellerDetails}
                onChange={setSellerDetails}
              />
              <TextArea
                id={field("buyer-details")}
                label="Customer address, phone"
                value={buyerDetails}
                onChange={setBuyerDetails}
              />
            </fieldset>

            <fieldset className="grid min-w-0 gap-4 sm:grid-cols-2">
              <legend className="mb-3 text-[16px] font-bold">Invoice details</legend>
              <TextField
                id={field("number")}
                label="Invoice number"
                value={number}
                onChange={setNumber}
              />
              <div className="flex min-w-0 flex-col gap-2">
                <label htmlFor={field("currency")} className={labelCls}>
                  Currency
                </label>
                <select
                  id={field("currency")}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`${inputCls()} appearance-auto`}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <TextField
                id={field("date")}
                label="Date"
                type="date"
                value={date}
                onChange={setDate}
              />
              <TextField
                id={field("due")}
                label="Due date (optional)"
                type="date"
                value={due}
                onChange={setDue}
              />
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="mb-3 text-[16px] font-bold">Items</legend>
              <ol className="flex flex-col gap-4">
                {lines.map((l, i) => (
                  <li
                    key={l.key}
                    className="grid min-w-0 grid-cols-[1fr_1fr_auto] gap-3 rounded-[16px] border border-[var(--color-line-2)] p-3 sm:grid-cols-[2fr_0.8fr_1fr_auto] sm:items-end"
                  >
                    <div className="col-span-3 flex min-w-0 flex-col gap-2 sm:col-span-1">
                      <label htmlFor={field(`d${l.key}`)} className={labelCls}>
                        Item {i + 1}
                      </label>
                      <input
                        id={field(`d${l.key}`)}
                        type="text"
                        dir="auto"
                        value={l.description}
                        onChange={(e) => updateLine(l.key, { description: e.target.value })}
                        placeholder="What you sold"
                        className={inputCls()}
                      />
                    </div>
                    <NumberField
                      id={field(`q${l.key}`)}
                      label="Qty"
                      value={l.quantity}
                      onChange={(v) => updateLine(l.key, { quantity: v })}
                      placeholder="1"
                    />
                    <NumberField
                      id={field(`p${l.key}`)}
                      label="Price"
                      value={l.price}
                      onChange={(v) => updateLine(l.key, { price: v })}
                    />
                    <button
                      type="button"
                      onClick={() => removeLine(l.key)}
                      disabled={lines.length === 1}
                      aria-label={`Remove item ${i + 1}`}
                      className="mt-auto inline-flex h-[48px] w-[44px] items-center justify-center rounded-[12px] border border-[var(--color-line-3)] text-[var(--color-muted)] transition-colors hover:text-[#B42318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)] disabled:opacity-40"
                    >
                      <Trash2 aria-hidden="true" className="h-[18px] w-[18px]" />
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={addLine}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-line-3)] px-4 text-[14px] font-semibold text-[var(--color-ink-3)] hover:border-[var(--color-muted-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)]"
              >
                <Plus aria-hidden="true" className="h-4 w-4" /> Add item
              </button>
            </fieldset>

            <fieldset className="grid min-w-0 gap-4 sm:grid-cols-3">
              <legend className="mb-3 text-[16px] font-bold">Discount and tax</legend>
              <NumberField
                id={field("discount")}
                label="Discount (amount)"
                value={discount}
                onChange={setDiscount}
              />
              <TextField
                id={field("tax-name")}
                label="Tax name"
                value={taxName}
                onChange={setTaxName}
                placeholder="VAT, GST, Sales tax"
              />
              <NumberField
                id={field("tax-rate")}
                label="Tax rate"
                value={taxRate}
                onChange={setTaxRate}
                suffix="%"
              />
            </fieldset>

            <TextArea
              id={field("notes")}
              label="Notes (optional)"
              value={notes}
              onChange={setNotes}
              placeholder="Payment details, thank-you note"
            />
          </form>
        </ToolCard>

        <div className="min-w-0 xl:sticky xl:top-[96px]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[16px] font-bold">Preview</h2>
            <button
              type="button"
              onClick={print}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-brand)] px-5 text-[15px] font-semibold text-[var(--color-on-brand)] shadow-[var(--shadow-card)] hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)]"
            >
              <Printer aria-hidden="true" className="h-[18px] w-[18px]" /> Print / Save as PDF
            </button>
          </div>

          {/* The invoice itself — black on white so it prints well on any printer. */}
          <article
            id="tp-invoice"
            aria-label="Invoice preview"
            className="min-w-0 overflow-hidden rounded-[16px] border border-[var(--color-line-2)] bg-white p-[clamp(16px,4vw,32px)] text-[13.5px] leading-[1.55] text-[#111]"
          >
            <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#111] pb-4">
              <div className="min-w-0">
                <div dir="auto" className="break-words text-[20px] font-extrabold">
                  {seller || "Your business name"}
                </div>
                {sellerDetails && (
                  <div dir="auto" className="whitespace-pre-line break-words text-[#444]">
                    {sellerDetails}
                  </div>
                )}
              </div>
              <div className="text-end">
                <div className="text-[22px] font-extrabold tracking-[0.04em]">INVOICE</div>
                <div dir="auto" className="break-all">
                  {number}
                </div>
              </div>
            </header>

            <div className="mt-4 flex flex-wrap justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#555]">
                  Bill to
                </div>
                <div dir="auto" className="break-words font-bold">
                  {buyer || "Customer name"}
                </div>
                {buyerDetails && (
                  <div dir="auto" className="whitespace-pre-line break-words text-[#444]">
                    {buyerDetails}
                  </div>
                )}
              </div>
              <dl className="grid grid-cols-[auto_auto] gap-x-3 text-end">
                <dt className="text-[#555]">Date</dt>
                <dd>{prettyDate(date)}</dd>
                {due && (
                  <>
                    <dt className="text-[#555]">Due</dt>
                    <dd>{prettyDate(due)}</dd>
                  </>
                )}
              </dl>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[280px] border-collapse">
                <thead>
                  <tr className="border-b border-[#111] text-[11.5px] uppercase tracking-[0.06em]">
                    <th scope="col" className="py-2 pe-2 text-start font-bold">
                      Item
                    </th>
                    <th scope="col" className="px-2 py-2 text-end font-bold">
                      Qty
                    </th>
                    <th scope="col" className="px-2 py-2 text-end font-bold">
                      Price
                    </th>
                    <th scope="col" className="py-2 ps-2 text-end font-bold">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.map((l) => (
                    <tr key={l.key} className="border-b border-[#ddd] align-top">
                      <td dir="auto" className="break-words py-2 pe-2">
                        {l.description || "—"}
                      </td>
                      <td className="px-2 py-2 text-end tabular-nums">
                        {fmt(l.q, l.q % 1 ? 2 : 0)}
                      </td>
                      <td className="px-2 py-2 text-end tabular-nums">{fmt(l.p)}</td>
                      <td className="py-2 ps-2 text-end tabular-nums">{fmt(l.q * l.p)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="ms-auto mt-4 grid max-w-[300px] grid-cols-[1fr_auto] gap-x-4 gap-y-1 tabular-nums">
              <dt>Subtotal</dt>
              <dd className="text-end">{money(totals.subtotal)}</dd>
              {totals.discount > 0 && (
                <>
                  <dt>Discount</dt>
                  <dd className="text-end">− {money(totals.discount)}</dd>
                </>
              )}
              {rate > 0 && (
                <>
                  <dt dir="auto">
                    {taxName || "Tax"} ({fmt(rate, rate % 1 ? 2 : 0)}%)
                  </dt>
                  <dd className="text-end">{money(totals.tax)}</dd>
                </>
              )}
              <dt className="mt-1 border-t-2 border-[#111] pt-2 text-[15px] font-extrabold">
                Total
              </dt>
              <dd className="mt-1 border-t-2 border-[#111] pt-2 text-end text-[15px] font-extrabold">
                {money(totals.total)}
              </dd>
            </dl>

            {notes && (
              <p
                dir="auto"
                className="mt-6 whitespace-pre-line break-words border-t border-[#ddd] pt-3 text-[#444]"
              >
                {notes}
              </p>
            )}
          </article>
          <p className="mt-3 text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
            Nothing is saved. Print or save the PDF before you close this page.
          </p>
        </div>
      </div>
    </>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "date";
  placeholder?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        dir="auto"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls()}
      />
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <textarea
        id={id}
        dir="auto"
        rows={3}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={textareaCls()}
      />
    </div>
  );
}
