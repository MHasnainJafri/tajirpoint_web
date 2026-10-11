import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BusinessGrid } from "@/components/marketing/business/BusinessGrid";

/** Home: "Find your business" — every catalog business, linking to its page. */
export async function FindYourBusiness() {
  const t = await getTranslations("landing.businesses");
  const locale = await getLocale();
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2
            id="businesses-title"
            className="mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance"
          >
            {t("headline")}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">{t("sub")}</p>
        </div>
        <Link href="/business" className="text-[14px] font-semibold text-[var(--color-ink)] underline underline-offset-4">
          {t("all")} →
        </Link>
      </div>
      <div className="mt-8">
        <BusinessGrid locale={locale} />
      </div>
    </section>
  );
}
