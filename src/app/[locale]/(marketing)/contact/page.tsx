import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { legal, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Contact TajirPoint",
    description:
      "Email hello@tajirpoint.com or WhatsApp +92 344 6800893. Ask about pricing, switching from another POS or support — we reply within one working day.",
    path: "/contact",
    locale,
  });
}

const cardCls =
  "flex flex-col gap-3 rounded-[20px] border border-[var(--color-line-2)] bg-white p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--shadow-lift)]";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang="en" dir="ltr" className="px-[clamp(16px,4vw,40px)] pb-[clamp(60px,9vw,110px)]">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="pb-10 pt-[clamp(36px,7vw,90px)] text-center">
        <PillBadge>Get in touch</PillBadge>
        <h1 className="mx-auto mt-6 max-w-[18ch] text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
          Talk to the TajirPoint team.
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-body)]">
          Questions about pricing, switching from another POS, or help with your account — WhatsApp
          or email us and we&apos;ll reply within one working day.
        </p>
      </section>

      {/* ── Ways to reach us ────────────────────────────────────────── */}
      <section
        aria-label="Ways to reach us"
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
          <span className="text-[17px] font-bold text-[var(--color-ink)]">WhatsApp</span>
          <span className="text-[14px] text-[var(--color-body)]" dir="ltr">
            {legal.whatsappDisplay}
          </span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            Start a chat →
          </span>
        </a>
        <a href={`mailto:${legal.email}`} className={cardCls}>
          <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
            <Mail size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold text-[var(--color-ink)]">Email</span>
          <span className="text-[14px] text-[var(--color-body)]">{legal.email}</span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            Write to us →
          </span>
        </a>
        <Link href="/book-demo" className={cardCls}>
          <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
            <CalendarDays size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold text-[var(--color-ink)]">Book a free demo</span>
          <span className="text-[14px] text-[var(--color-body)]">
            See it with your own kind of business. We can move your data for free.
          </span>
          <span className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)]">
            Book a demo →
          </span>
        </Link>
      </section>

      {/* ── Form ────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-[clamp(40px,6vw,72px)] grid max-w-[1080px] items-start gap-[clamp(28px,5vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15] tracking-[-0.03em]">
            Or send us a message
          </h2>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.65] text-[var(--color-body)]">
            Every message goes to {legal.email} and is answered by the team that builds TajirPoint.
          </p>
          <p className="mt-6 text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
            TajirPoint is operated by {legal.operator}, {legal.city}, {legal.country}.
          </p>
        </div>
        <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)]">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
