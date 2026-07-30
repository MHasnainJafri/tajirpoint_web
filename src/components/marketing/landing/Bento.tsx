import { useTranslations } from "next-intl";
import { MOCK_OFFLINE_ROWS } from "@/lib/design/catalog";

/** The 6-cell differentiator bento. Cell 1 spans 4×2 and carries the offline mock. */
export function Bento() {
  const t = useTranslations("landing.bento");

  const cells = ["accounting", "inventory", "distribution", "storefront", "security"] as const;

  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-[110px] md:px-10">
      <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* ── Offline-first (featured) ──────────────────────────────── */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] md:col-span-2 lg:col-span-4 lg:row-span-2 lg:p-10"
        >
          <div className="text-[13.5px] font-semibold text-[var(--color-brand)]">
            {t("offline.tag")}
          </div>
          <h3 className="mt-[14px] max-w-[420px] text-[30px] font-bold tracking-[-0.03em]">
            {t("offline.title")}
          </h3>
          <p className="mt-[14px] max-w-[400px] text-[15px] leading-[1.6] text-[var(--color-muted)]">
            {t("offline.body")}
          </p>

          <div className="on-dark mt-8 w-full rounded-xl border border-[var(--color-line-2)] bg-[rgba(6,13,10,.85)] p-4 shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-md lg:absolute lg:bottom-7 lg:right-7 lg:mt-0 lg:w-[290px]">
            <div className="flex items-center justify-between text-[12.5px] text-[var(--color-muted-2)]">
              <span className="inline-flex items-center gap-[7px]">
                <span className="h-[7px] w-[7px] animate-[tpPulse_1.6s_infinite] rounded-full bg-[var(--color-amber)]" />
                {t("offline.panelStatus")}
              </span>
              <span className="font-mono">{t("offline.panelTime")}</span>
            </div>

            {MOCK_OFFLINE_ROWS.map((row) => (
              <div key={row.label} className="mt-[10px] flex justify-between text-[13px]">
                <span className="text-[var(--color-muted)]">{row.label}</span>
                <span className="font-mono text-[var(--color-ink-3)]">{row.amount}</span>
              </div>
            ))}

            <div className="mt-3 flex justify-between border-t border-[var(--color-line-2)] pt-[10px] text-[12.5px] font-semibold">
              <span className="text-[var(--color-muted)]">{t("offline.panelQueued")}</span>
              <span className="font-mono text-[var(--color-mint-2)]">
                {t("offline.panelQueuedValue")}
              </span>
            </div>
          </div>
        </div>

        {/* ── The five supporting cells ─────────────────────────────── */}
        {cells.map((id, i) => (
          <div
            key={id}
            data-reveal
            data-reveal-delay={(i % 3) * 80}
            className="relative rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] lg:col-span-2"
          >
            <div className="text-[13px] font-semibold text-[var(--color-muted-2)]">
              {t(`${id}.tag`)}
            </div>
            <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">
              {t(`${id}.title`)}
            </h3>
            <p className="mt-[10px] text-[14px] leading-[1.55] text-[var(--color-muted-2)]">
              {t(`${id}.body`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
