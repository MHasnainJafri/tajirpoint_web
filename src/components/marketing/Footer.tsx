import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config/site";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--color-line-soft)] px-5 pb-10 pt-[70px] md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/lockup/lockup-on-white.svg"
            alt="TajirPoint"
            width={166}
            height={46}
            className="h-[46px] w-auto dark:hidden"
          />
          <Image
            src="/brand/lockup/lockup-on-dark.svg"
            alt="TajirPoint"
            width={166}
            height={46}
            className="hidden h-[46px] w-auto dark:block"
          />
          <p className="mt-4 max-w-[280px] text-[13.5px] leading-[1.6] text-[var(--color-muted-2)]">
            {t("tagline")}
          </p>
        </div>

        <FooterColumn heading={t("product")}>
          <FooterLink href="/#platform">{t("links.platform")}</FooterLink>
          <FooterLink href="/extensions">{t("links.extensions")}</FooterLink>
          <FooterLink href="/#pricing">{t("links.pricing")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("industries")}>
          <FooterLink href="/solutions#retail">{t("links.retail")}</FooterLink>
          <FooterLink href="/solutions#restaurants">{t("links.restaurants")}</FooterLink>
          <FooterLink href="/solutions#distribution">{t("links.distribution")}</FooterLink>
        </FooterColumn>

        <FooterColumn heading={t("company")}>
          <FooterLink href="/about">{t("links.about")}</FooterLink>
          <FooterLink href="/contact">{t("links.contact")}</FooterLink>
          <a
            href={siteConfig.dashboardUrl}
            className="text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink-2)]"
          >
            {t("links.signIn")}
          </a>
          <FooterLink href="/docs">{t("links.developers")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="mx-auto mt-[50px] flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-[var(--color-line-soft)] pt-6 text-[12.5px] text-[var(--color-muted-3)]">
        <span>{t("copyright")}</span>
        <span className="flex flex-wrap items-center gap-4">
          <FooterLink href="/privacy" muted>
            {t("links.privacy")}
          </FooterLink>
          <FooterLink href="/terms" muted>
            {t("links.terms")}
          </FooterLink>
          <span className="font-mono tracking-[1px]">{t("badge")}</span>
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-mono text-[11px] tracking-[2px] text-[var(--color-muted-3)]">
        {heading}
      </div>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  muted,
  children,
}: {
  href: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        muted
          ? "text-[12.5px] text-[var(--color-muted-3)] transition-colors hover:text-[var(--color-ink-2)]"
          : "text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink-2)]"
      }
    >
      {children}
    </Link>
  );
}
