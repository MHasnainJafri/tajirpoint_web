import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { PillBadge, CtaPanel } from "@/components/design/primitives";
import { VERTICALS } from "@/lib/design/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("solutions.meta");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/solutions",
  });
}

export default function SolutionsPage() {
  const t = useTranslations("solutions");
  const tInd = useTranslations("solutions.industries");

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-10 pt-[150px] text-center md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>{t("badge")}</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          {t("headline")}{" "}
          <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
            {t("headlineAccent")}
          </span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[18px] leading-[1.6] text-[var(--color-muted)]">
          {t("sub")}
        </p>

        {/* Jump nav */}
        <div className="relative mt-[34px] flex animate-[tpFadeUp_.8s_.4s_cubic-bezier(.22,1,.36,1)_both] flex-wrap justify-center gap-2">
          {VERTICALS.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-[18px] py-[9px] text-[13.5px] font-semibold text-[var(--color-muted)] transition-colors duration-[250ms] hover:border-[rgba(0,210,122,.5)] hover:text-[var(--color-ink-2)]"
            >
              <span className="inline-flex text-[var(--color-mint-2)]">
                <Icon name={v.icon} size={15} />
              </span>
              {tInd(`${v.id}.name`)}
            </a>
          ))}
        </div>
      </section>

      {/* ── One section per industry, alternating side ───────────────── */}
      {VERTICALS.map((v, i) => {
        const chips = tInd.raw(`${v.id}.chips`) as string[];
        const feats = tInd.raw(`${v.id}.feats`) as { t: string; d: string }[];
        const flip = i % 2 === 1;

        return (
          <section
            key={v.id}
            id={v.id}
            className="scroll-mt-20 border-t border-[var(--color-line-soft)] px-5 py-[90px] md:px-10"
          >
            <div className="mx-auto grid max-w-[1160px] items-center gap-[70px] lg:grid-cols-[1fr_1.1fr]">
              <div data-reveal className={flip ? "lg:order-2" : ""}>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[15px] border border-[rgba(0,210,122,.3)] bg-[rgba(0,210,122,.12)] text-[var(--color-mint-2)]">
                  <Icon name={v.icon} size={25} />
                </div>

                <div className="mt-5 font-mono text-[11px] tracking-[2.5px] text-[var(--color-mint-2)]">
                  {tInd(`${v.id}.tag`)}
                </div>

                <h2 className="mt-3 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                  {tInd(`${v.id}.headline`)}
                </h2>

                <p className="mt-[18px] max-w-[460px] text-[16px] leading-[1.65] text-[var(--color-muted)]">
                  {tInd(`${v.id}.body`)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[var(--color-mint-line)] bg-[rgba(0,210,122,.06)] px-[13px] py-[6px] text-[12.5px] font-semibold text-[var(--color-mint-2)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div
                data-reveal
                data-reveal-delay={120}
                className={`rounded-[18px] border border-[var(--color-line-2)] bg-[var(--color-panel)] p-[26px] shadow-[0_30px_80px_rgba(0,0,0,.45)] ${
                  flip ? "lg:order-1" : ""
                }`}
              >
                <div className="mb-[18px] font-mono text-[10.5px] tracking-[2px] text-[var(--color-muted-3)]">
                  {tInd(`${v.id}.panelTitle`)}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {feats.map((f) => (
                    <div
                      key={f.t}
                      className="rounded-xl border border-[var(--color-line)] bg-[var(--surface-2)] p-4 transition-[border-color,background] duration-[250ms] hover:border-[rgba(0,210,122,.45)] hover:bg-[rgba(0,210,122,.05)]"
                    >
                      <div className="text-[14px] font-bold">{f.t}</div>
                      <div className="mt-[5px] text-[12.5px] leading-[1.45] text-[var(--color-muted-2)]">
                        {f.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line-soft)] px-5 pb-[110px] pt-10 md:px-10">
        <CtaPanel className="mt-15">
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            {t("cta.headline")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            {t("cta.body")}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <a
              href={siteConfig.signupUrl}
              className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
            >
              {t("cta.primary")} <span>→</span>
            </a>
            <Link
              href="/extensions"
              className="inline-flex items-center whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--surface-3)] px-7 py-[15px] text-[16px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--surface-strong)] hover:text-[var(--color-ink-2)]"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
