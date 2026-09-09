import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { FEATURES, VERTICALS } from "@/lib/design/catalog";

/**
 * Four link columns beside the brand block, then a rule and the fine print.
 *
 * Every href here points at a page that exists — the design's footer lists a
 * few we haven't built (help centre, blog), and a footer full of 404s is worse
 * than a shorter one.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tFeat = useTranslations("nav.megaFeatures.items");
  const tSol = useTranslations("solutions.industries");

  return (
    <footer className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pb-9 pt-[clamp(44px,6vw,72px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-7">
        <div className="min-w-[200px]">
          <div className="flex items-center gap-2 text-[var(--color-ink)]">
            <Wordmark size={30} text={20} />
          </div>
          <div className="mt-2 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-muted-2)]">
            {t("strapline")}
          </div>
          <p className="mt-[14px] max-w-[30ch] text-[13px] leading-[1.65] text-[var(--color-muted)]">
            {t("tagline")}
          </p>
          <div className="mt-4 flex flex-wrap gap-[6px]">
            <span className="rounded-full border border-[var(--color-line-2)] px-[10px] py-[5px] text-[11.5px] font-semibold">
              {t("chipEnglish")}
            </span>
            <span className="rounded-full border border-[var(--color-line-2)] px-[10px] py-[5px] text-[11.5px] font-semibold">
              {t("chipLocal")}
            </span>
          </div>
        </div>

        <FooterColumn heading={t("product")}>
          {FEATURES.map((f) => (
            <FooterLink key={f.id} href={f.href}>
              {tFeat(`${f.id}.name`)}
            </FooterLink>
          ))}
          <FooterLink href="/extensions">{t("links.onlineStore")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("solutions")}>
          {VERTICALS.map((v) => (
            <FooterLink key={v.id} href={`/solutions#${v.id}`}>
              {tSol(`${v.id}.name`)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn heading={t("extensions")}>
          <FooterLink href="/extensions">{t("links.payments")}</FooterLink>
          <FooterLink href="/extensions">{t("links.ecommerce")}</FooterLink>
          <FooterLink href="/extensions">{t("links.couriers")}</FooterLink>
          <FooterLink href="/extensions">{t("links.tax")}</FooterLink>
          <FooterLink href="/extensions">{t("links.allExtensions")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("company")}>
          <FooterLink href="/pricing">{t("links.pricing")}</FooterLink>
          <FooterLink href="/docs">{t("links.developers")}</FooterLink>
          <FooterLink href="/security">{t("links.security")}</FooterLink>
          <FooterLink href="/about">{t("links.about")}</FooterLink>
          <FooterLink href="/contact">{t("links.contact")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-[14px] border-t border-[var(--color-line)] pt-5 text-[12px] text-[var(--color-muted-2)]">
        <span>{t("copyright")}</span>
        <span>{t("badge")}</span>
        <span className="flex gap-4">
          <Link href="/terms" className="text-[var(--color-muted)]">
            {t("links.terms")}
          </Link>
          <Link href="/privacy" className="text-[var(--color-muted)]">
            {t("links.privacy")}
          </Link>
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
        {heading}
      </div>
      <div className="mt-3 flex flex-col gap-[9px] text-[13.5px]">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]"
    >
      {children}
    </Link>
  );
}
