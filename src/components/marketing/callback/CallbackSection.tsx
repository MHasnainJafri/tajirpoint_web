import { useLocale } from "next-intl";
import { Tick } from "@/components/marketing/landing/Stroke";
import { legal, whatsappLink } from "@/lib/config/site";
import { CALLBACK_SECTION_COPY } from "@/content/i18n/lead-pages/pages";
import { pickCopy } from "@/content/i18n/page-copy";
import { CallbackForm } from "./CallbackForm";
import { businessTypeOptions } from "@/content/i18n/lead-pages/business-types";

/**
 * "Interested? We'll call you" band for the bottom of the home and pricing
 * pages, in the page language (src/content/i18n/lead-pages/pages.ts) like the
 * form inside it.
 */
export function CallbackSection({ id = "call-back", location }: { id?: string; location: string }) {
  const locale = useLocale();
  const { t, lang, dir, rtl } = pickCopy(CALLBACK_SECTION_COPY, locale);
  return (
    <section
      id={id}
      lang={lang}
      dir={dir}
      aria-labelledby={`${id}-title`}
      className="mt-[clamp(64px,9vw,110px)] scroll-mt-[86px] rounded-[26px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-[clamp(16px,4vw,52px)]"
    >
      <div className="grid items-start gap-[clamp(24px,4vw,56px)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="min-w-0 px-1 pt-1 sm:px-0">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2
            id={`${id}-title`}
            className={`mt-3 max-w-[18ch] text-[clamp(26px,3.4vw,42px)] font-bold text-balance text-[var(--color-ink)] ${rtl ? "leading-[1.35] tracking-normal" : "leading-[1.1] tracking-[-0.03em]"}`}
          >
            {t.title}
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            {t.body}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {t.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
              >
                <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                  <Tick size={18} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-[var(--color-body)]">
            {t.prefer}{" "}
            <a
              href={whatsappLink("Hi TajirPoint, I'm interested in your POS.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`${location}_callback_aside`}
              className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
            >
              {t.whatsapp} <span dir="ltr">{legal.whatsappDisplay}</span>
            </a>
          </p>
        </div>

        <div className="min-w-0 rounded-[22px] border border-[var(--color-line-2)] bg-white p-[clamp(16px,3.4vw,32px)] shadow-[var(--shadow-card)]">
          <CallbackForm idPrefix={id} location={location} typeOptions={businessTypeOptions(locale)} />
        </div>
      </div>
    </section>
  );
}
