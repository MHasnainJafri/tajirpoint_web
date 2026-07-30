import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { EXTENSIONS } from "@/lib/design/catalog";

/** Two counter-scrolling rails of every extension, split down the middle. */
export function ExtensionsRail() {
  const t = useTranslations("landing.extensions");
  const tItems = useTranslations("extensions.items");
  const tFilters = useTranslations("extensions.filters");

  const half = Math.ceil(EXTENSIONS.length / 2);
  const rows = [EXTENSIONS.slice(0, half), EXTENSIONS.slice(half)];

  return (
    <section
      className="relative overflow-hidden border-t border-[var(--color-line-soft)] pb-[110px] pt-[120px]"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,210,122,.07),transparent)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-10">
        <Eyebrow className="!text-center">{t("eyebrow")}</Eyebrow>
        <h2
          data-reveal
          className="mt-[18px] text-[clamp(32px,4.2vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em]"
        >
          {t("headline")} <span className="text-[var(--color-brand)]">{t("headlineAccent")}</span>
        </h2>
        <p
          data-reveal
          className="mx-auto mt-[22px] max-w-[600px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]"
        >
          {t("body")}
        </p>
      </div>

      <div data-reveal className="mt-14 flex flex-col gap-4">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`marquee-track marquee-track-slow ${idx === 1 ? "marquee-track-rev" : ""}`}
          >
            {[...row, ...row].map((ext, i) => (
              <div
                key={`${ext.id}-${i}`}
                className="mx-2 flex items-center gap-3 whitespace-nowrap rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] px-[22px] py-[14px] transition-colors duration-[250ms] hover:border-[rgba(0,210,122,.5)]"
              >
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[rgba(0,210,122,.12)] text-[var(--color-mint-2)]">
                  <Icon name={ext.icon} size={17} />
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold">{tItems(`${ext.id}.name`)}</span>
                  <span className="block text-[12px] text-[var(--color-muted-2)]">
                    {tFilters(ext.cat)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div data-reveal className="mt-11 text-center">
        <Link
          href="/extensions"
          className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] px-7 py-[14px] text-[15.5px] font-semibold text-[var(--color-ink)] shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:shadow-[var(--shadow-lift)]"
        >
          {t("cta")} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
