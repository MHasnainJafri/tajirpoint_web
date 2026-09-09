import { useTranslations } from "next-intl";
import { Stroke, Tick } from "./Stroke";
import {
  JOURNAL_LINES,
  JOURNAL_STATEMENTS,
  JOURNAL_TOTAL,
  KHATA_LIMIT,
  KHATA_ROWS,
  OFFLINE_STEPS,
  RECEIPT_MOCK,
  RECEIPT_QR_DATA,
  RECEIPT_QR_FINDER,
  SIGNATURE_BULLETS,
  TAX_CHIPS,
  TRIP_PROGRESS,
  TRIP_ROWS,
  TRIP_STATS,
  DEMO,
} from "@/lib/design/landing";

const MONO_LABEL =
  "font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-[var(--color-muted)]";

const BLOCK =
  "rounded-[24px] bg-[var(--color-surface)] p-[clamp(18px,2.6vw,32px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,3vw,48px)] items-center";

/** Ticked bullet list — the same four-up grid under every feature block. */
function Bullets({ t, block }: { t: (k: string) => string; block: string }) {
  return (
    <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4 gap-y-[9px]">
      {Array.from({ length: SIGNATURE_BULLETS }, (_, i) => (
        <div
          key={i}
          className="flex items-start gap-[9px] text-[13.5px] font-medium leading-[1.45]"
        >
          <span className="text-[var(--color-mint-2)]">
            <Tick />
          </span>
          {t(`${block}.bullets.${i}`)}
        </div>
      ))}
    </div>
  );
}

/**
 * The five things the product does differently, each paired with the screen
 * that proves it. Blocks alternate which side the artwork sits on; the last
 * two share a row because neither needs the full width.
 *
 * Every figure inside the cards is mock data from `landing.ts` — simulated app
 * chrome, deliberately untranslated.
 */
export function Signature() {
  const t = useTranslations("landing.signature");

  return (
    <section id="product" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            {t("headline")}
          </h2>
        </div>
        <p className="max-w-[40ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>
      </div>

      {/* ── 01 · Digital credit ledger ────────────────────────────── */}
      <div id="khata" data-reveal className={`mt-[34px] scroll-mt-[86px] ${BLOCK}`}>
        <div>
          <div className={MONO_LABEL}>{t("khata.label")}</div>
          <h3 className="mt-3 text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
            {t("khata.title")}
          </h3>
          <p className="mt-[14px] text-[14.5px] leading-[1.7] text-[var(--color-body)]">
            {t("khata.body")}
          </p>
          <Bullets t={t} block="khata" />
        </div>

        <div className="rounded-[18px] border border-[var(--color-cream-line)] bg-[var(--color-cream)] p-[18px] shadow-[0_24px_50px_rgba(60,40,10,.10)]">
          <div className="flex items-start justify-between gap-[10px]">
            <div>
              <div className="text-[11px] text-[var(--color-cream-ink)]">
                {t("khata.card.ledgerOf")}
              </div>
              <div className="mt-[2px] text-[16px] font-bold">{DEMO.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[var(--color-cream-ink)]">
                {t("khata.card.balanceDue")}
              </div>
              <div className="text-[20px] font-extrabold tracking-[-0.03em]">{DEMO.balance}</div>
            </div>
          </div>

          <div className="mt-[14px] grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-x-3 border-b border-[var(--color-cream-line-2)] pb-[6px] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-cream-muted)]">
            <span>{t("khata.card.date")}</span>
            <span>{t("khata.card.detail")}</span>
            <span className="text-right">{t("khata.card.drcr")}</span>
            <span className="text-right">{t("khata.card.balance")}</span>
          </div>

          {KHATA_ROWS.map((k) => (
            <div
              key={k.date + k.detail}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-x-3 border-b border-[var(--color-cream-line-2)] py-[9px] text-[12.5px]"
            >
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-cream-ink)]">
                {k.date}
              </span>
              <span className="truncate">{k.detail}</span>
              <span
                className="text-right font-semibold tabular-nums"
                style={{ color: k.debit ? "#0A0A0A" : "#00A862" }}
              >
                {k.amt}
              </span>
              <span className="text-right font-bold tabular-nums">{k.bal}</span>
            </div>
          ))}

          <div className="mt-[14px]">
            <div className="flex justify-between text-[11.5px] text-[var(--color-cream-ink)]">
              <span>{t("khata.card.limit", { amount: KHATA_LIMIT.limit })}</span>
              <span>{t("khata.card.used", { percent: KHATA_LIMIT.used })}</span>
            </div>
            <div className="mt-[6px] h-[6px] overflow-hidden rounded-full bg-[var(--color-cream-line)]">
              <div
                className="h-full rounded-full bg-[#0A0A0A]"
                style={{ width: `${KHATA_LIMIT.used}%` }}
              />
            </div>
          </div>

          <div className="mt-[14px] flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-[6px] rounded-full bg-[var(--color-mint)] px-[14px] py-2 text-[12px] font-bold">
              <Stroke name="whatsapp" size={13} width={2} />
              {t("khata.card.share")}
            </span>
            <span className="rounded-full border border-[var(--color-cream-line-3)] px-[14px] py-2 text-[12px] font-semibold">
              {t("khata.card.remind")}
            </span>
          </div>
        </div>
      </div>

      {/* ── 02 · Accounting on autopilot ──────────────────────────── */}
      <div data-reveal className={`mt-[18px] ${BLOCK}`}>
        <div className="rounded-[18px] bg-white p-[18px] shadow-[0_20px_44px_rgba(10,10,10,.08)]">
          <div className="flex flex-wrap items-center justify-between gap-[10px]">
            <div>
              <div className="text-[11px] text-[var(--color-muted)]">Journal entry JE-20931</div>
              <div className="mt-[2px] text-[14px] font-bold">From Sale #1042 · Register 1</div>
            </div>
            <span className="inline-flex items-center gap-[6px] rounded-full bg-[var(--color-mint-soft)] px-[10px] py-[5px] text-[11.5px] font-semibold">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-mint)]" />
              {t("accounting.card.posted")}
            </span>
          </div>

          <div className="mt-[14px] grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-[14px] border-b border-[var(--color-line)] pb-[6px] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-muted-2)]">
            <span>{t("accounting.card.account")}</span>
            <span className="text-right">{t("accounting.card.debit")}</span>
            <span className="text-right">{t("accounting.card.credit")}</span>
          </div>

          {JOURNAL_LINES.map((j) => (
            <div
              key={j.name}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-[14px] border-b border-[var(--color-line)] py-[9px] text-[12.5px] tabular-nums"
            >
              <span
                className={`truncate ${j.indent ? "pl-[14px] text-[var(--color-body)]" : "font-semibold"}`}
              >
                {j.name}
              </span>
              <span className="text-right">{j.dr}</span>
              <span className="text-right">{j.cr}</span>
            </div>
          ))}

          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-[14px] pt-[10px] text-[12.5px] font-bold tabular-nums">
            <span>{t("accounting.card.balanced")}</span>
            <span className="text-right">{JOURNAL_TOTAL}</span>
            <span className="text-right">{JOURNAL_TOTAL}</span>
          </div>

          <div className="mt-[14px] flex flex-wrap gap-[6px]">
            {JOURNAL_STATEMENTS.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[var(--color-surface)] px-[10px] py-[5px] text-[11px] font-semibold"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className={MONO_LABEL}>{t("accounting.label")}</div>
          <h3 className="mt-3 text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
            {t("accounting.title")}
          </h3>
          <p className="mt-[14px] text-[14.5px] leading-[1.7] text-[var(--color-body)]">
            {t("accounting.body")}
          </p>
          <Bullets t={t} block="accounting" />
        </div>
      </div>

      {/* ── 03 · Van sales & distribution ─────────────────────────── */}
      <div data-reveal className={`mt-[18px] ${BLOCK}`}>
        <div>
          <div className={MONO_LABEL}>{t("van.label")}</div>
          <h3 className="mt-3 text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
            {t("van.title")}
          </h3>
          <p className="mt-[14px] text-[14.5px] leading-[1.7] text-[var(--color-body)]">
            {t("van.body")}
          </p>
          <Bullets t={t} block="van" />
        </div>

        <div className="on-dark rounded-[18px] bg-[#0A0A0A] p-[18px] text-white shadow-[0_24px_50px_rgba(10,10,10,.25)]">
          <div className="flex flex-wrap items-center justify-between gap-[10px]">
            <div>
              <div className="text-[11px] text-[#8A8F98]">Trip TRP-0418 · LEB-4471</div>
              <div className="mt-[2px] text-[14px] font-bold">Gulberg → Model Town</div>
            </div>
            <span className="rounded-full bg-[rgba(0,210,122,.16)] px-[10px] py-[5px] text-[11.5px] font-semibold text-[var(--color-mint)]">
              {t("van.card.progress")}
            </span>
          </div>

          <div className="mt-[14px] h-[6px] overflow-hidden rounded-full bg-white/[0.12]">
            <div
              className="h-full rounded-full bg-[var(--color-mint)]"
              style={{ width: `${TRIP_PROGRESS}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[10px]">
            {TRIP_STATS.map((s) => (
              <div key={s.id} className="rounded-[12px] bg-white/[0.06] p-3">
                <div className="text-[10.5px] text-[#8A8F98]">{t(`van.card.${s.id}`)}</div>
                <div
                  className="mt-[3px] text-[16px] font-extrabold tracking-[-0.02em]"
                  style={s.good ? { color: "#00D27A" } : undefined}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[14px] flex flex-col">
            {TRIP_ROWS.map((r) => (
              <div
                key={r.a}
                className="flex justify-between gap-3 border-t border-white/[0.1] py-[9px] text-[12.5px]"
              >
                <span className="text-[#C9CDD6]">{r.a}</span>
                <span className="whitespace-nowrap font-semibold">{r.b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 04 offline + 05 tax, sharing a row ────────────────────── */}
      <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
        <div
          data-reveal
          className="on-dark relative overflow-hidden rounded-[24px] bg-[#0A0A0A] p-[clamp(18px,2.6vw,32px)] text-white"
        >
          <div className="pointer-events-none absolute -right-[120px] -top-[120px] h-[340px] w-[340px] rounded-full border border-[rgba(0,210,122,.18)]" />
          <div className="font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-[#8A8F98]">
            {t("offline.label")}
          </div>
          <h3 className="mt-3 max-w-[20ch] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
            {t("offline.title")}
          </h3>
          <p className="mt-[14px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#B5B9C2]">
            {t("offline.body")}
          </p>

          <div className="mt-[22px] flex flex-col">
            {OFFLINE_STEPS.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 border-t border-white/[0.1] py-[10px]"
              >
                <span className="w-[44px] font-[family-name:var(--font-mono)] text-[11.5px] text-[#8A8F98]">
                  {s.time}
                </span>
                <span
                  className="h-[10px] w-[10px] rounded-full"
                  style={{ background: s.dot }}
                  aria-hidden="true"
                />
                <span className="text-[13px]">{t(`offline.steps.${s.id}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 rounded-[24px] bg-[var(--color-surface)] p-[clamp(18px,2.6vw,32px)]"
        >
          <div>
            <div className={MONO_LABEL}>{t("tax.label")}</div>
            <h3 className="mt-3 max-w-[16ch] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
              {t("tax.title")}
            </h3>
            <p className="mt-[14px] text-[14.5px] leading-[1.7] text-[var(--color-body)]">
              {t("tax.body")}
            </p>
            <div className="mt-4 flex flex-wrap gap-[6px]">
              {TAX_CHIPS.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-white px-[11px] py-[6px] text-[11.5px] font-semibold"
                >
                  {t(`tax.chips.${c}`)}
                </span>
              ))}
            </div>
          </div>

          {/* The printed receipt, with its verified e-invoice QR */}
          <div
            className="w-[150px] rounded-[10px] bg-white p-3 font-[family-name:var(--font-mono)] text-[8.5px] leading-[1.5] text-[var(--color-body)] shadow-[0_16px_34px_rgba(10,10,10,.1)]"
            aria-hidden="true"
          >
            <div className="text-center font-semibold text-[var(--color-ink)]">
              {RECEIPT_MOCK.shop}
            </div>
            <div className="text-center text-[var(--color-muted-2)]">{RECEIPT_MOCK.taxId}</div>
            <div className="my-2 border-t border-dashed border-[#D5D8DE]" />
            {RECEIPT_MOCK.lines.map((l) => (
              <div key={l.name} className="flex justify-between">
                <span>{l.name}</span>
                <span>{l.amt}</span>
              </div>
            ))}
            <div className="flex justify-between text-[var(--color-muted-2)]">
              <span>{RECEIPT_MOCK.tax.label}</span>
              <span>{RECEIPT_MOCK.tax.amt}</span>
            </div>
            <div className="my-2 border-t border-dashed border-[#D5D8DE]" />
            <div className="flex justify-between font-semibold text-[var(--color-ink)]">
              <span>TOTAL</span>
              <span>{RECEIPT_MOCK.total}</span>
            </div>
            <div className="mt-[10px] grid place-items-center">
              <svg
                viewBox="0 0 21 21"
                className="h-[62px] w-[62px]"
                shapeRendering="crispEdges"
                fill="#0A0A0A"
              >
                <path fillRule="evenodd" d={RECEIPT_QR_FINDER} />
                <path d={RECEIPT_QR_DATA} />
              </svg>
            </div>
            <div className="mt-[6px] text-center font-semibold text-[var(--color-ink)]">
              {RECEIPT_MOCK.ref}
            </div>
            <div className="text-center font-semibold text-[var(--color-mint-2)]">VERIFIED</div>
          </div>
        </div>
      </div>
    </section>
  );
}
