import { useTranslations } from "next-intl";
import { Stroke } from "./Stroke";
import { ReceiptDemo } from "./ReceiptDemo";
import { APP_LINKS, PLATFORMS } from "@/lib/design/landing";

/**
 * "Runs on what you own" — one card per surface, plus the store link.
 *
 * The four cards state *where* the product runs; the Play button underneath is
 * how you actually get it, carried over from the previous site (the only
 * section of it this rebuild didn't already replace). There is no App Store
 * link to match it: iOS is still the dashed "coming soon" card above, so its
 * chip is deliberately not a link.
 */
export function Platforms() {
  const t = useTranslations("landing.platforms");

  return (
    <section
      id="platforms"
      className="mt-[clamp(64px,9vw,120px)] grid scroll-mt-[86px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(20px,4vw,56px)]"
    >
      <div data-reveal>
        <div className="eyebrow">{t("eyebrow")}</div>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
          {t("headline")}
        </h2>
        <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>

        <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[10px]">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className={`rounded-[14px] p-[14px] ${
                p.soon
                  ? "border border-dashed border-[var(--color-line-3)] text-[var(--color-muted-2)]"
                  : "border border-[var(--color-line)]"
              }`}
            >
              <Stroke name={p.icon} size={20} />
              <div className="mt-[10px] text-[14px] font-bold">{t(`devices.${p.id}.name`)}</div>
              <div className={`mt-[2px] text-[12px] ${p.soon ? "" : "text-[var(--color-muted)]"}`}>
                {t(`devices.${p.id}.sub`)}
              </div>
            </div>
          ))}
        </div>

        {/* App access — the store link the previous site carried. */}
        <div className="mt-[14px] flex flex-wrap items-center gap-[10px]">
          <a
            href={APP_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[11px] rounded-[14px] bg-[#0A0A0A] px-[18px] py-[10px] text-white transition-transform duration-200 hover:-translate-y-[2px]"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[19px] w-[19px]"
              fill="currentColor"
            >
              <path d="M4.2 2.3a1 1 0 0 0-.5.9v17.6a1 1 0 0 0 .5.9l9.4-9.7-9.4-9.7zm10.7 8.4 2.9-3-9.1-5.2 6.2 8.2zm0 2.6-6.2 8.2 9.1-5.2-2.9-3zm1.3-1.3 3.3-1.9c.7-.4.7-1.4 0-1.8l-3.3-1.9-2 2.8 2 2.8z" />
            </svg>
            <span>
              <span className="block text-[9.5px] font-semibold tracking-[0.5px] opacity-65">
                {t("app.getItOn")}
              </span>
              <span className="mt-px block text-[15.5px] font-extrabold">
                {t("app.googlePlay")}
              </span>
            </span>
          </a>
          <span className="text-[12.5px] text-[var(--color-muted)]">{t("app.note")}</span>
        </div>

        <div className="mt-[14px] text-[12.5px] text-[var(--color-muted)]">{t("hardware")}</div>
      </div>

      <ReceiptDemo caption={t("receiptCaption")} label={t("receiptTablistLabel")} />
    </section>
  );
}
