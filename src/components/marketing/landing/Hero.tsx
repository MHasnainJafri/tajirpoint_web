import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Stroke } from "./Stroke";
import { HeroTillMock } from "./HeroTillMock";
import { HERO_BARS, HERO_BAR_PEAK, HERO_PORTAL_ROWS, DEMO } from "@/lib/design/landing";

/**
 * The hero is a bento, not a headline-beside-a-screenshot: one tall black
 * panel carrying the pitch and a clipped till mock, with four stat cards
 * stacked beside it.
 *
 * The mock deliberately overflows the bottom of the black panel (negative
 * bottom margin against `overflow:hidden`) so the devices read as sitting
 * *inside* the panel and running past its edge, rather than floating on it.
 *
 * Everything inside the two device mocks is simulated app chrome — the amounts,
 * party names and register numbers are fixtures, and like the rest of the mock
 * data in `landing.ts` they are deliberately not translated.
 */
export function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="flex flex-wrap items-stretch gap-[14px]">
      {/* ── The black panel ─────────────────────────────────────── */}
      <div
        data-reveal
        className="on-dark relative flex min-h-[clamp(440px,44vw,620px)] shrink basis-[520px] flex-col justify-between overflow-hidden rounded-[26px] bg-[#0A0A0A] p-[clamp(22px,3.4vw,44px)] text-white"
        style={{ flexGrow: 2 }}
      >
        <div className="pointer-events-none absolute -bottom-[240px] -right-[180px] h-[680px] w-[680px] rounded-full border border-[rgba(0,210,122,.16)]" />
        <div className="pointer-events-none absolute -bottom-[170px] -right-[100px] h-[480px] w-[480px] rounded-full border border-white/[0.07]" />

        <div className="relative max-w-[600px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] py-[6px] pl-[9px] pr-3 text-[12px] text-[#C9CDD6] transition-all duration-200 hover:bg-white/[0.12]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint)]" />
            </span>
            {t("badge")}
          </div>

          <h1 className="mt-[18px] text-[clamp(34px,4.6vw,60px)] font-extrabold leading-[1.04] tracking-[-0.045em] text-balance">
            {t("headline")} <span className="text-[var(--color-mint)]">{t("headlineAccent")}</span>
          </h1>

          <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.65] text-[#B5B9C2]">{t("sub")}</p>

          <div className="mt-[26px] flex flex-wrap items-center gap-[10px]">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] py-3 pl-[22px] pr-3 text-[14px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)] motion-safe:animate-[tpPulseGlow_4s_ease-in-out_infinite]"
            >
              {t("ctaPrimary")}
              <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0A0A0A] text-[var(--color-mint)]">
                <Stroke name="arrowRight" size={14} width={2.2} />
              </span>
            </Link>
            <a
              href="#product"
              className="whitespace-nowrap rounded-full border border-white/[0.22] px-[22px] py-3 text-[14px] font-semibold text-white transition-all duration-[250ms] hover:border-white/40 hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <div className="mt-[14px] text-[12px] text-[#8A8F98]">{t("note")}</div>
        </div>

        {/* ── The clipped device mocks ──────────────────────────── */}
        <div
          className="relative mx-0 mb-[-76px] mt-9 flex items-end gap-3 motion-safe:animate-[tpFloat_6s_ease-in-out_infinite]"
          aria-hidden="true"
        >
          {/* Interactive Till with live POS Search */}
          <HeroTillMock />

          {/* Customer portal on a phone */}
          <div className="max-w-[190px] shrink grow basis-[140px] rounded-[20px] border border-white/[0.14] bg-[#0A0A0A] p-[6px] shadow-[0_30px_60px_rgba(0,0,0,.55)] transition-transform duration-300 hover:-translate-y-1">
            <div className="flex min-h-[200px] flex-col gap-[5px] rounded-[15px] bg-white px-[10px] py-[11px] text-[#0A0A0A]">
              <div className="flex justify-between font-[family-name:var(--font-mono)] text-[7.5px] text-[#8A8F98]">
                <span>9:41</span>
                <span>●●●</span>
              </div>
              <div className="mt-1 text-[7.5px] text-[#6B7079]">Your account at</div>
              <div className="text-[9.5px] font-bold leading-[1.2]">{DEMO.shop}</div>
              <div className="mt-1 text-[17px] font-extrabold tracking-[-0.03em]">
                {DEMO.balance}
              </div>
              <div className="text-[7.5px] text-[#6B7079]">outstanding · due 15 Sep</div>
              {HERO_PORTAL_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between border-t border-[#EEF0F3] py-1 text-[7.5px]"
                >
                  <span>{row.label}</span>
                  <span
                    className="font-semibold"
                    style={row.payment ? { color: "#00A862" } : undefined}
                  >
                    {row.amt}
                  </span>
                </div>
              ))}
              <div className="mt-auto rounded-[7px] bg-[#0A0A0A] p-[6px] text-center text-[8px] font-bold text-white transition-opacity hover:opacity-90">
                Pay online
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The stat column ─────────────────────────────────────── */}
      <div className="flex shrink grow basis-[300px] flex-col gap-[14px]">
        {/* Sales today */}
        <div
          data-reveal
          className="rounded-[20px] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center justify-between gap-[10px]">
            <div className="flex items-center gap-[9px] text-[13px] font-semibold">
              <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#0A0A0A] text-white">
                <Stroke name="chart" size={13} width={2} />
              </span>
              {t("cards.sales.title")}
            </div>
            <span className="text-[11px] text-[var(--color-muted)]">
              {t("cards.sales.branches")}
            </span>
          </div>
          <div className="mt-2 text-[26px] font-extrabold tracking-[-0.03em]">
            <span data-count="1842" data-count-prefix="$" data-count-suffix=".00">
              {DEMO.salesToday}
            </span>
          </div>

          <div
            className="relative mt-3 flex h-[92px] items-end gap-1 border-b border-[var(--color-line-strong)]"
            aria-hidden="true"
          >
            {HERO_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t-[4px] transition-all duration-[250ms] hover:brightness-75 hover:scale-y-105 motion-safe:animate-[tpGrow_.8s_cubic-bezier(.2,.8,.3,1)_both]"
                style={{
                  height: `${h}%`,
                  background: i === HERO_BAR_PEAK ? "#0A0A0A" : "#9FE3C2",
                  animationDelay: `${300 + i * 60}ms`,
                }}
              />
            ))}
            <div className="absolute -top-[6px] left-[66%] -translate-x-1/2 whitespace-nowrap rounded-[7px] bg-[#0A0A0A] px-2 py-[3px] text-[10px] font-semibold text-white shadow-sm">
              {DEMO.salesPeak}
            </div>
          </div>
          <div className="flex justify-between pt-[6px] font-[family-name:var(--font-mono)] text-[9.5px] text-[var(--color-muted-2)]">
            <span>9 am</span>
            <span>12 pm</span>
            <span>3 pm</span>
            <span>6 pm</span>
            <span>9 pm</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[14px]">
          {/* Customer credit — the one warm surface in the design */}
          <div
            data-reveal
            className="rounded-[20px] bg-[var(--color-cream)] p-[18px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(60,40,10,.12)]"
          >
            <div className="flex items-center gap-2 text-[12.5px] font-semibold">
              <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[#0A0A0A] text-white">
                <Stroke name="book" size={12} width={2} />
              </span>
              {t("cards.credit.title")}
            </div>
            <div className="mt-4 text-[24px] font-extrabold tracking-[-0.03em]">
              <span data-count="4126" data-count-prefix="$" data-count-suffix=".00">
                {DEMO.creditTotal}
              </span>
            </div>
            <div className="text-[11px] text-[var(--color-cream-ink)]">
              {t("cards.credit.owed")}
            </div>
            <div className="mt-3 flex items-center gap-[6px] text-[11px] font-semibold">
              <span className="text-[var(--color-mint-2)]">
                <Stroke name="whatsapp" size={13} width={2} />
              </span>
              {t("cards.credit.reminders")}
            </div>
          </div>

          {/* Offline */}
          <div
            data-reveal
            className="on-dark relative overflow-hidden rounded-[20px] bg-[#0A0A0A] p-[18px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,.5)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-[130px] w-[130px] rounded-full border border-white/[0.08]" />
            <div className="flex items-center gap-2 text-[12.5px] font-semibold">
              <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[var(--color-mint)] text-[#0A0A0A]">
                <Stroke name="wifiOff" size={12} width={2} />
              </span>
              {t("cards.offline.title")}
            </div>
            <div className="mt-4 text-[24px] font-extrabold tracking-[-0.03em]">
              <span data-count="14" data-count-suffix=" sales">
                14 sales
              </span>
            </div>
            <div className="text-[11px] text-[#B5B9C2]">{t("cards.offline.queued")}</div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[var(--color-mint)]">
              <span className="h-[7px] w-[7px] flex-none rounded-full bg-[var(--color-mint)] motion-safe:animate-[tpPulseRing_1.6s_ease-out_infinite]" />
              {t("cards.offline.syncs")}
            </div>
          </div>
        </div>

        {/* Language & currency */}
        <div
          data-reveal
          className="flex flex-1 flex-col justify-between gap-3 rounded-[20px] bg-[var(--color-surface)] p-[18px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center gap-2 text-[12.5px] font-semibold">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[#0A0A0A] text-white">
              <Stroke name="globe" size={12} width={2} />
            </span>
            {t("cards.lang.title")}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#0A0A0A] px-[14px] py-[7px] text-[12.5px] font-semibold text-white">
              {t("cards.lang.chipEnglish")}
            </span>
            <span className="rounded-full bg-white px-[14px] py-[7px] text-[12.5px] font-semibold">
              {t("cards.lang.chipLocal")}
            </span>
            <span className="rounded-full bg-white px-[14px] py-[7px] text-[12.5px] font-semibold">
              {t("cards.lang.chipCurrency")}
            </span>
          </div>
          <div className="text-[11.5px] leading-[1.5] text-[var(--color-muted)]">
            {t("cards.lang.body")}
          </div>
        </div>
      </div>
    </section>
  );
}
