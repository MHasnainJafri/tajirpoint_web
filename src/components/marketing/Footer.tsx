import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { FEATURES } from "@/lib/design/catalog";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";
import { legal } from "@/lib/config/site";
import { uxCopy } from "@/content/ux/copy";
import { COMPARE_LABEL } from "@/content/compare/label";
import {
  ALL_LOCATIONS_LABEL,
  LOCATIONS,
  LOCATIONS_HEADING,
  labelLocale,
  locationPath,
} from "@/content/locations";
import { guidesNavLabel } from "@/content/guides/labels";

/**
 * Link columns beside the brand block, then a rule and the fine print.
 * Every href points at a page that exists.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tFeat = useTranslations("nav.megaFeatures.items");
  const locale = useLocale();
  const ux = uxCopy(locale);

  return (
    <footer className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pb-9 pt-[clamp(44px,6vw,72px)] max-md:pb-[124px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-7">
        <div className="min-w-[200px]">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-[var(--color-ink)]"
          >
            <Wordmark size={30} text={20} />
            <span className="sr-only">{ux.home}</span>
          </Link>
          <div className="mt-2 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-muted-2)]">
            {t("strapline")}
          </div>
          <p className="mt-[14px] max-w-[30ch] text-[13px] leading-[1.65] text-[var(--color-muted)]">
            {t("tagline")}
          </p>
          <div className="mt-4 flex flex-col items-start gap-[6px] text-[13px] max-md:gap-0">
            <span className="font-semibold text-[var(--color-ink)]">{t("reach")}</span>
            <a
              href={legal.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${TAP} text-[var(--color-ink-3)] hover:text-[var(--color-ink)]`}
            >
              WhatsApp <span dir="ltr">{legal.whatsappDisplay}</span>
            </a>
            <a
              href={`mailto:${legal.email}`}
              className={`${TAP} [overflow-wrap:anywhere] text-[var(--color-ink-3)] hover:text-[var(--color-ink)]`}
            >
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
          <FooterLink href="/business">{t("links.allBusinesses")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("product")}>
          {FEATURES.map((f) => (
            <FooterLink key={f.id} href={f.href}>
              {tFeat(`${f.id}.name`)}
            </FooterLink>
          ))}
          <FooterLink href="/extensions">{ux.addOns}</FooterLink>
          <FooterLink href="/pricing">{t("links.pricing")}</FooterLink>
          <FooterLink href="/compare">{COMPARE_LABEL[locale] ?? COMPARE_LABEL.en}</FooterLink>
          <FooterLink href="/guides">{guidesNavLabel(locale).title}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={LOCATIONS_HEADING[labelLocale(locale)]}>
          {LOCATIONS.map((l) => (
            <FooterLink key={l.slug} href={locationPath(l.slug)}>
              {l.label[labelLocale(locale)]}
            </FooterLink>
          ))}
          <FooterLink href="/pos">{ALL_LOCATIONS_LABEL[labelLocale(locale)]}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("company")}>
          <FooterLink href="/book-demo">{t("links.bookDemo")}</FooterLink>
          <FooterLink href="/get-a-call">{t("links.getACall")}</FooterLink>
          <FooterLink href="/contact">{t("links.contact")}</FooterLink>
          <FooterLink href="/about">{t("links.about")}</FooterLink>
          <FooterLink href="/security">{t("links.security")}</FooterLink>
          <FooterLink href="/docs">{t("links.developers")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-[14px] border-t border-[var(--color-line)] pt-5 text-[12px] text-[var(--color-muted)]">
        <span>{t("copyright")}</span>
        <span className="flex flex-wrap gap-x-4 gap-y-2 max-md:gap-y-0">
          <Link href="/terms" className={`${TAP} hover:text-[var(--color-ink)]`}>
            {t("links.terms")}
          </Link>
          <Link href="/privacy" className={`${TAP} hover:text-[var(--color-ink)]`}>
            {t("links.privacy")}
          </Link>
          <Link href="/cookies" className={`${TAP} hover:text-[var(--color-ink)]`}>
            {t("links.cookies")}
          </Link>
          <Link href="/refund-policy" className={`${TAP} hover:text-[var(--color-ink)]`}>
            {t("links.refund")}
          </Link>
          <Link href="/delete-account" className={`${TAP} hover:text-[var(--color-ink)]`}>
            {t("links.deleteAccount")}
          </Link>
        </span>
      </div>
    </footer>
  );
}

/** Phones: every footer link is at least 44px tall, so a thumb hits the right one. */
const TAP = "max-md:inline-flex max-md:min-h-[44px] max-md:items-center";

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
        {heading}
      </div>
      <div className="mt-3 flex flex-col items-start gap-[9px] text-[13.5px] max-md:mt-1 max-md:gap-0">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`${TAP} text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]`}
    >
      {children}
    </Link>
  );
}
