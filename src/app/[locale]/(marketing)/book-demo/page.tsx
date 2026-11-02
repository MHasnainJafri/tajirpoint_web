import type { Metadata } from "next";
import { pageBreadcrumbs } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { legal, siteConfig, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { BOOK_DEMO_COPY } from "@/content/i18n/lead-pages/pages";
import { SHARED_FORM_COPY } from "@/content/i18n/lead-pages/forms";
import { pickCopy } from "@/content/i18n/page-copy";
import { DemoForm } from "./DemoForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(BOOK_DEMO_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/book-demo",
    locale,
  });
}

export default async function BookDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { t, lang, dir, rtl } = pickCopy(BOOK_DEMO_COPY, locale);
  const shared = pickCopy(SHARED_FORM_COPY, locale).t;

  return (
    <section
      lang={lang}
      dir={dir}
      className="relative px-[clamp(16px,4vw,40px)] pb-[clamp(60px,9vw,110px)] pt-[clamp(36px,7vw,90px)]"
    >
      <JsonLd schema={pageBreadcrumbs(locale, [[t.breadcrumb, "/book-demo"]])} />
      <div className="relative mx-auto grid max-w-[1160px] items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-[clamp(32px,5vw,72px)] lg:gap-y-0">
        {/* Phones (where ad clicks land) see heading → form → reasons;
            desktop keeps heading + reasons on the left, form on the right. */}
        {/* ── Heading ───────────────────────────────────────────────── */}
        <div className="lg:col-start-1 lg:row-start-1">
          <PillBadge>{t.badge}</PillBadge>

          <h1
            className={`mt-6 text-[clamp(32px,4.6vw,54px)] font-extrabold text-balance ${rtl ? "leading-[1.3] tracking-normal" : "leading-[1.06] tracking-[-0.035em]"}`}
          >
            {t.headline.before}
            <span className="text-[var(--color-mint-2)]">{t.headline.accent}</span>
            {t.headline.after}
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {t.sub}
          </p>
        </div>

        {/* ── The form ──────────────────────────────────────────────── */}
        <div className="min-w-0 rounded-[24px] lg:col-start-2 lg:row-span-2 lg:row-start-1 border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)]">
          <h2 className={`text-[20px] font-bold ${rtl ? "" : "tracking-[-0.02em]"}`}>
            {t.formTitle}
          </h2>
          <p className="mb-6 mt-1 text-[13.5px] text-[var(--color-muted)]">
            {shared.requiredBefore} <span className="text-[#B42318]">*</span> {shared.requiredAfter}
          </p>
          <DemoForm />
        </div>
        {/* ── What to expect ────────────────────────────────────────── */}
        <div className="lg:col-start-1 lg:row-start-2 lg:mt-8">
          <ul className="flex flex-col gap-4">
            {t.points.map(({ title, body: desc }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
                  <Check
                    size={14}
                    color="var(--color-mint-2)"
                    strokeWidth={2.6}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</div>
                  <div className="mt-[2px] text-[14px] leading-[1.55] text-[var(--color-muted)]">
                    {desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-line-2)] pt-6 text-[14px] text-[var(--color-body)]">
            <p>
              {t.hurry}{" "}
              <a
                href={whatsappLink("Hi TajirPoint, I'd like a demo.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="book_demo_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                {t.whatsappUs} <span dir="ltr">{legal.whatsappDisplay}</span>
              </a>
            </p>
            <p>
              {t.justTalk}{" "}
              <Link
                href="/get-a-call"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                {t.askCall}
              </Link>
            </p>
            <p>
              {t.tryYourself}{" "}
              <a
                href={siteConfig.signupUrl}
                data-track="book_demo_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                {t.startFree}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
