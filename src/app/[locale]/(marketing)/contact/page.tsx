import type { Metadata } from "next";
import { pageBreadcrumbs } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";
import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { legal, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONTACT_COPY } from "@/content/i18n/lead-pages/pages";
import { forwardArrow, pickCopy } from "@/content/i18n/page-copy";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(CONTACT_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    absoluteTitle: true,
    description: t.meta.description,
    path: "/contact",
    locale,
  });
}

const cardCls =
  "flex flex-col gap-3 rounded-[20px] border border-[var(--color-line-2)] bg-white p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--shadow-lift)]";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { t, lang, dir, rtl } = pickCopy(CONTACT_COPY, locale);
  const arrow = forwardArrow(rtl);

  return (
    <div lang={lang} dir={dir} className="px-[clamp(16px,4vw,40px)] pb-[clamp(60px,9vw,110px)]">
      <JsonLd schema={pageBreadcrumbs(locale, [[t.breadcrumb, "/contact"]])} />
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="pb-10 pt-[clamp(36px,7vw,90px)] text-center">
        <PillBadge>{t.badge}</PillBadge>
        <h1
          className={`mx-auto mt-6 max-w-[18ch] text-[clamp(32px,5vw,60px)] font-extrabold text-balance ${rtl ? "leading-[1.3] tracking-normal" : "leading-[1.05] tracking-[-0.035em]"}`}
        >
          {t.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-body)]">
          {t.sub}
        </p>
      </section>

      {/* ── Ways to reach us ────────────────────────────────────────── */}
      <section
        aria-label={t.waysLabel}
        className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4"
      >
        <a
          href={whatsappLink("Hi TajirPoint")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="contact_card"
          className={cardCls}
        >
          <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
            <MessageCircle size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold text-[var(--color-ink)]">{t.whatsapp}</span>
          <span className="text-[14px] text-[var(--color-body)]" dir="ltr">
            {legal.whatsappDisplay}
          </span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            {t.startChat} {arrow}
          </span>
        </a>
        <a href={`mailto:${legal.email}`} className={cardCls}>
          <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
            <Mail size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold text-[var(--color-ink)]">{t.email}</span>
          <span className="text-[14px] text-[var(--color-body)]" dir="ltr">
            {legal.email}
          </span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            {t.writeUs} {arrow}
          </span>
        </a>
        <Link href="/book-demo" className={cardCls}>
          <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
            <CalendarDays size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold text-[var(--color-ink)]">{t.demoTitle}</span>
          <span className="text-[14px] text-[var(--color-body)]">{t.demoBody}</span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            {t.demoLink} {arrow}
          </span>
        </Link>
      </section>

      {/* ── Form ────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-[clamp(40px,6vw,72px)] grid max-w-[1080px] items-start gap-[clamp(28px,5vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15] tracking-[-0.03em]">
            {t.formHeading}
          </h2>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.65] text-[var(--color-body)]">
            {t.formBody(legal.email)}
          </p>
          <p className="mt-6 text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
            {t.operatedBy(legal.operator, legal.city, legal.country)}
          </p>
        </div>
        <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)]">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
