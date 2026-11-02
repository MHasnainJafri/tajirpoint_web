import type { Metadata } from "next";
import { pageBreadcrumbs } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { CallbackForm } from "@/components/marketing/callback/CallbackForm";
import { BUSINESS_TYPE_OPTIONS } from "@/lib/marketing/demo";
import { legal, siteConfig, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Get a Free Call Back from Our POS Team",
    description:
      "Interested in TajirPoint POS? Leave your business name and phone number and a person from our team calls you within one working day to answer your questions.",
    path: "/get-a-call",
    locale,
  });
}

const POINTS: Array<[string, string]> = [
  ["A person, not a bot", "Someone from the TajirPoint team calls you on the number you give."],
  [
    "Your questions answered",
    "Prices, hardware, how it works for your kind of business — ask anything.",
  ],
  [
    "Help to switch",
    "Moving from another POS or a register? We load your products and customers for free.",
  ],
];

export default async function GetACallPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section
      lang="en"
      dir="ltr"
      className="relative px-[clamp(16px,4vw,40px)] pb-[clamp(60px,9vw,110px)] pt-[clamp(36px,7vw,90px)]"
    >
      <JsonLd schema={pageBreadcrumbs(locale, [["Get a call back", "/get-a-call"]])} />
      <div className="relative mx-auto grid max-w-[1160px] items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-[clamp(32px,5vw,72px)] lg:gap-y-0">
        {/* Phones see heading → form → reasons; desktop keeps heading +
            reasons on the left, form on the right (same as Book a demo). */}
        <div className="lg:col-start-1 lg:row-start-1">
          <PillBadge>Free · no obligation</PillBadge>

          <h1 className="mt-6 text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance">
            Interested? <span className="text-[var(--color-mint-2)]">We&apos;ll call you.</span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            Leave your business name and phone number. Our team calls you within one working day.
          </p>
        </div>

        <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)] lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Ask for a call back</h2>
          <p className="mb-6 mt-1 text-[13.5px] text-[var(--color-muted)]">
            Fields marked <span className="text-[#B42318]">*</span> are required.
          </p>
          <CallbackForm idPrefix="cb" location="get_a_call" typeOptions={BUSINESS_TYPE_OPTIONS} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:mt-8">
          <ul className="flex flex-col gap-4">
            {POINTS.map(([title, desc]) => (
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
              In a hurry?{" "}
              <a
                href={whatsappLink("Hi TajirPoint, I'm interested in your POS.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="get_a_call_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                WhatsApp us at <span dir="ltr">{legal.whatsappDisplay}</span>
              </a>
            </p>
            <p>
              Want to see it running?{" "}
              <Link
                href="/book-demo"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                Book a free demo
              </Link>{" "}
              or{" "}
              <a
                href={siteConfig.signupUrl}
                data-track="get_a_call_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                start free
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
