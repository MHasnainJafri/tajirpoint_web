import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { LEDGER_FEATURES, MOCK_LEDGER } from "@/lib/design/catalog";

export function Ledger() {
  const t = useTranslations("landing.ledger");

  return (
    <section className="mt-[70px] border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-[70px] lg:grid-cols-[1fr_1.1fr]">
        {/* ── Copy + feature grid ───────────────────────────────────── */}
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            data-reveal
            className="mt-[18px] text-[clamp(30px,3.8vw,52px)] font-extrabold leading-[1.06] tracking-[-0.03em]"
          >
            {t("headline")}
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-[460px] text-[16.5px] leading-[1.65] text-[var(--color-muted)]"
          >
            {t("body")}
          </p>

          <div className="mt-10 grid gap-[26px] sm:grid-cols-2">
            {LEDGER_FEATURES.map((f, i) => (
              <div key={f.id} data-reveal data-reveal-delay={i * 70}>
                <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[rgba(0,210,122,.25)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
                  <Icon name={f.icon} />
                </span>
                <div className="mt-3 text-[15.5px] font-bold">{t(`features.${f.id}.t`)}</div>
                <div className="mt-[6px] text-[13.5px] leading-[1.55] text-[var(--color-muted-2)]">
                  {t(`features.${f.id}.d`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── The khata card ────────────────────────────────────────── */}
        <div data-reveal data-reveal-delay={120} className="relative">
          <div
            className="pointer-events-none absolute -inset-[30px] blur-[24px]"
            style={{
              background: "radial-gradient(ellipse,rgba(0,210,122,.12),transparent 65%)",
            }}
          />
          {/* A simulated screenshot with fabricated invoice numbers — hidden
              from assistive tech, like the hero mock. */}
          <div
            aria-hidden="true"
            className="on-dark relative overflow-hidden rounded-[18px] border border-[var(--color-line-2)] bg-[var(--color-panel)] shadow-[0_40px_100px_rgba(0,0,0,.55)]"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,.07)] px-[22px] py-[18px]">
              <div className="flex items-center gap-3">
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[var(--color-mint)] text-[13px] font-extrabold text-[var(--color-mint-ink)]">
                  {MOCK_LEDGER.initials}
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{MOCK_LEDGER.party}</span>
                  <span className="block text-[11.5px] text-[var(--color-muted-2)]">
                    {MOCK_LEDGER.since}
                  </span>
                </span>
              </div>
              <span className="font-mono text-[10.5px] tracking-[1.5px] text-[var(--color-muted-2)]">
                {MOCK_LEDGER.creditLimit}
              </span>
            </header>

            <div className="px-[22px] pb-[6px] pt-5">
              <div className="font-mono text-[10px] tracking-[2px] text-[var(--color-muted-3)]">
                {t("outstanding")}
              </div>
              <div className="mt-[6px] flex items-baseline gap-[10px]">
                <span className="text-[clamp(28px,4vw,36px)] font-extrabold tracking-[-0.02em]">
                  {MOCK_LEDGER.balance}
                </span>
                <span className="font-mono text-[11px] text-[var(--color-muted-3)]">PKR</span>
              </div>
              <span className="mt-[10px] inline-flex items-center gap-[7px] rounded-full border border-[rgba(245,165,36,.4)] bg-[rgba(245,165,36,.08)] px-3 py-1 text-[11.5px] font-semibold text-[var(--color-amber)]">
                ▾ {MOCK_LEDGER.aging}
              </span>
            </div>

            <div className="px-4 pb-2 pt-[14px] sm:px-[22px]">
              {/* The date column is dropped below `sm`: four fixed columns
                  could not shrink under ~360px and pushed the card past a
                  320px viewport. The date moves under the description. */}
              <div className="grid grid-cols-[1fr_66px_66px] gap-2 border-b border-[rgba(255,255,255,.07)] pb-[10px] font-mono text-[9.5px] tracking-[1.5px] text-[var(--color-muted-3)] sm:grid-cols-[76px_1fr_90px_90px] sm:gap-[10px]">
                <span className="hidden sm:block">{t("colDate")}</span>
                <span>{t("colDescription")}</span>
                <span className="text-right">{t("colDebit")}</span>
                <span className="text-right">{t("colCredit")}</span>
              </div>

              {MOCK_LEDGER.rows.map((row) => (
                <div
                  key={row.desc}
                  className="grid grid-cols-[1fr_66px_66px] items-center gap-2 border-b border-white/[0.05] py-3 sm:grid-cols-[76px_1fr_90px_90px] sm:gap-[10px]"
                >
                  <span className="hidden font-mono text-[11px] text-[var(--color-muted-2)] sm:block">
                    {row.date}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold">{row.desc}</span>
                    <span className="mt-[2px] block font-mono text-[10px] text-[var(--color-muted-3)]">
                      <span className="sm:hidden">{row.date} · </span>
                      {row.sub}
                    </span>
                  </span>
                  <span className="text-right font-mono text-[12.5px] text-[var(--color-berry)]">
                    {row.debit}
                  </span>
                  <span className="text-right font-mono text-[12.5px] text-[var(--color-mint-2)]">
                    {row.credit}
                  </span>
                </div>
              ))}
            </div>

            <footer className="flex flex-wrap gap-[18px] border-t border-[var(--color-line-soft)] bg-[var(--surface-2)] px-[22px] py-[14px]">
              {MOCK_LEDGER.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-[7px] font-mono text-[9.5px] tracking-[1.5px] text-[var(--color-muted-2)]"
                >
                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-mint)]" />
                  {b}
                </span>
              ))}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
