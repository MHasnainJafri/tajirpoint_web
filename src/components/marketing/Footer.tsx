import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { FEATURES } from "@/lib/design/catalog";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";
import { legal } from "@/lib/config/site";

/**
 * Link columns beside the brand block, then a rule and the fine print.
 * Every href points at a page that exists.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tFeat = useTranslations("nav.megaFeatures.items");
  const locale = useLocale();

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
          <div className="mt-4 flex flex-col gap-[6px] text-[13px]">
            <span className="font-semibold text-[var(--color-ink)]">{t("reach")}</span>
            <a href={legal.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)]">
              WhatsApp <span dir="ltr">{legal.whatsappDisplay}</span>
            </a>
            <a href={`mailto:${legal.email}`} className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)]">
              {legal.email}
            </a>
          </div>
        </div>

        <FooterColumn heading={t("businesses")}>
          {BUSINESSES.map((b) => (
            <FooterLink key={b.slug} href={`/business/${b.slug}`}>
              {businessLabel(b, locale).name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn heading={t("product")}>
          {FEATURES.map((f) => (
            <FooterLink key={f.id} href={f.href}>
              {tFeat(`${f.id}.name`)}
            </FooterLink>
          ))}
          <FooterLink href="/extensions">{t("links.allExtensions")}</FooterLink>
          <FooterLink href="/pricing">{t("links.pricing")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("company")}>
          <FooterLink href="/book-demo">{t("links.bookDemo")}</FooterLink>
          <FooterLink href="/contact">{t("links.contact")}</FooterLink>
          <FooterLink href="/about">{t("links.about")}</FooterLink>
          <FooterLink href="/security">{t("links.security")}</FooterLink>
          <FooterLink href="/docs">{t("links.developers")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-[14px] border-t border-[var(--color-line)] pt-5 text-[12px] text-[var(--color-muted)]">
        <span>{t("copyright")}</span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/terms" className="hover:text-[var(--color-ink)]">
            {t("links.terms")}
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-ink)]">
            {t("links.privacy")}
          </Link>
          <Link href="/cookies" className="hover:text-[var(--color-ink)]">
            {t("links.cookies")}
          </Link>
          <Link href="/refund-policy" className="hover:text-[var(--color-ink)]">
            {t("links.refund")}
          </Link>
          <Link href="/delete-account" className="hover:text-[var(--color-ink)]">
            {t("links.deleteAccount")}
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
    <Link href={href} className="text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]">
      {children}
    </Link>
  );
}
