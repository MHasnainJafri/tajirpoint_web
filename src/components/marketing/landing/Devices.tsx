import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/design/primitives";
import { MOCK_PHONE_ROWS, MOCK_DRIVER_ROWS } from "@/lib/design/catalog";

/** Keyed by the literal union on MOCK_DRIVER_ROWS[].state, so lookups are total. */
const DRIVER_DOT = {
  done: { bg: "#00D27A", fg: "#04130B" },
  active: { bg: "rgba(0,210,122,.2)", fg: "#3BE698" },
  queued: { bg: "rgba(255,255,255,.1)", fg: "rgba(242,247,244,.6)" },
};

export function Devices() {
  const t = useTranslations("landing.devices");

  return (
    <section className="overflow-hidden border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-[60px] lg:grid-cols-2">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            data-reveal
            className="mt-[18px] text-[clamp(32px,4.4vw,60px)] font-extrabold leading-[1.04] tracking-[-0.03em]"
          >
            {t("headlineA")}
            <br />
            {t("headlineB")}
          </h2>
          <p
            data-reveal
            className="mt-[22px] max-w-[440px] text-[16.5px] leading-[1.65] text-[var(--color-muted)]"
          >
            {t("body")}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#cta"
              className="inline-flex items-center gap-[11px] rounded-xl bg-[#101418] px-[18px] py-[10px] text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="text-[20px]">▶</span>
              <span>
                <span className="block text-[9.5px] font-semibold tracking-[0.5px] opacity-65">
                  {t("getItOn")}
                </span>
                <span className="mt-px block text-[15.5px] font-extrabold">{t("googlePlay")}</span>
              </span>
            </Link>
            <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[var(--color-line-2)] px-[18px] py-[14px] text-[13px] font-semibold text-[var(--color-muted-2)]">
              {t("ios")}
            </span>
          </div>

          <div data-reveal className="mt-[22px] text-[13.5px] text-[var(--color-muted-2)]">
            <span className="font-bold text-[var(--color-ink)]">{t("metaDesktop")}</span> ·{" "}
            {t("metaDesktopValue")} &nbsp;&nbsp;
            <span className="font-bold text-[var(--color-ink)]">{t("metaWeb")}</span> ·{" "}
            {t("metaWebValue")} &nbsp;&nbsp;
            <span className="font-bold text-[var(--color-ink)]">{t("metaHardware")}</span> ·{" "}
            {t("metaHardwareValue")}
          </div>
        </div>

        {/* ── The two floating phones ───────────────────────────────── */}
        <div data-reveal data-reveal-delay={120} className="relative h-[560px]">
          <div
            className="pointer-events-none absolute inset-0 blur-[28px]"
            style={{
              background: "radial-gradient(ellipse at 60% 50%,rgba(0,210,122,.12),transparent 65%)",
            }}
          />

          {/* Owner dashboard — light phone */}
          <div className="absolute left-[2%] top-[30px] w-[230px] rotate-[-7deg] animate-[tpFloat_7s_ease-in-out_infinite] rounded-[34px] border border-white/[0.16] bg-[#0E1B14] p-[10px] shadow-[0_40px_90px_rgba(0,0,0,.6)] sm:left-[4%] sm:w-[250px]">
            <div className="overflow-hidden rounded-[26px] bg-[#F4F8F5] text-[#0A1A12]">
              <div className="flex justify-center pt-[9px]">
                <span className="h-2 w-[76px] rounded-full bg-[#0E1B14]" />
              </div>
              <div className="px-[18px] pb-5 pt-[18px]">
                <div className="font-mono text-[9.5px] tracking-[2px] text-[#0A9B5F]">
                  {t("phoneToday")}
                </div>
                <div className="mt-[6px] text-[27px] font-extrabold tracking-[-0.02em]">
                  {t("phoneAmount")}
                </div>
                <div className="mt-[2px] text-[11px] font-semibold text-[#0A9B5F]">
                  {t("phoneDelta")}
                </div>

                {MOCK_PHONE_ROWS.map((row) => (
                  <div
                    key={row.t}
                    className="mt-3 flex items-center justify-between rounded-xl border border-[rgba(10,26,18,.08)] bg-white px-[13px] py-[11px]"
                  >
                    <span>
                      <span className="block text-[12px] font-bold">{row.t}</span>
                      <span
                        className="mt-[2px] block font-mono text-[9.5px]"
                        style={{ color: row.alert ? "#D0453A" : "rgba(10,26,18,.45)" }}
                      >
                        {row.s}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#0A1A12]">
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Driver app — dark phone */}
          <div className="on-dark absolute right-[2%] top-0 z-[2] w-[230px] rotate-[6deg] animate-[tpFloat_8s_1s_ease-in-out_infinite] rounded-[34px] border border-white/[0.16] bg-[#0E1B14] p-[10px] shadow-[0_40px_90px_rgba(0,0,0,.6)] sm:right-[4%] sm:w-[250px]">
            <div className="overflow-hidden rounded-[26px] border border-white/[0.06] bg-[var(--color-panel-2)]">
              <div className="flex justify-center pt-[9px]">
                <span className="h-2 w-[76px] rounded-full bg-black" />
              </div>
              <div className="px-[18px] pb-5 pt-[18px]">
                <div className="font-mono text-[9.5px] tracking-[2px] text-[var(--color-mint-2)]">
                  {t("driverLabel")}
                </div>
                <div className="mt-[6px] text-[25px] font-extrabold tracking-[-0.02em]">
                  {t("driverStops")}
                </div>
                <div className="mt-[2px] text-[11px] text-[var(--color-muted-2)]">
                  {t("driverRoute")}
                </div>

                {MOCK_DRIVER_ROWS.map((row) => {
                  const dot = DRIVER_DOT[row.state];
                  return (
                    <div
                      key={row.t}
                      className="mt-3 flex items-center gap-[10px] rounded-xl border border-white/[0.08] bg-white/[0.05] px-[13px] py-[11px]"
                    >
                      <span
                        className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full text-[11px] font-bold"
                        style={{ background: dot.bg, color: dot.fg }}
                      >
                        {row.dot}
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold">{row.t}</span>
                        <span className="mt-[2px] block font-mono text-[9.5px] text-[rgba(242,247,244,.45)]">
                          {row.s}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
