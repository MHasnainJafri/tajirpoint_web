import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { PartnerForm } from "@/components/marketing/partners/PartnerForm";
import { legal, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { BRAND_NAME } from "@/lib/config/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: `Become a ${BRAND_NAME} Reseller or Setup Partner`,
    description: `Sell, set up or support ${BRAND_NAME} POS for the shops and restaurants you already work with. Tell us about your work and we will call you to talk it through.`,
    path: "/partners",
    locale,
  });
}

/* Copy. Honest by rule: no commission rates, no promised perks we have not
   agreed. The partner programme is new; terms are agreed one by one. */

const WHO: string[] = [
  "Computer and IT shops that sell to local businesses",
  "POS hardware sellers: printers, scanners, cash drawers, tills",
  "People who set up and train shops and restaurants",
  "Accountants and bookkeepers who work with small businesses",
  "Software agencies whose customers need a POS",
];

const WAYS: Array<[string, string]> = [
  [
    "Reseller",
    `You introduce ${BRAND_NAME} to shops and restaurants you know, and help them choose a plan.`,
  ],
  [
    "Setup partner",
    `You set ${BRAND_NAME} up for a business: products, printers, staff, and a little training.`,
  ],
  [
    "Local support",
    "You are the person a shop calls first in your city, with our team behind you.",
  ],
];

const STEPS: Array<[string, string]> = [
  ["Send the form", "Tell us who you are, where you work and what you do now."],
  ["We call you", "Someone from our team calls within one working day to talk it through."],
  [
    "We agree the terms",
    "Commission, your area and who supports which shop — we agree these with you on the call.",
  ],
  ["You start", `We show you ${BRAND_NAME} in depth, and you bring in your first business.`],
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How much commission do partners get?",
    a: "There is no fixed public rate yet. We will discuss commission with you on the call, based on what you do — introducing shops, setting them up, or supporting them.",
  },
  {
    q: "What do the shops I bring get?",
    a: "The same offer as everyone: the Light plan is free for 3 months with no card, and our team helps move their data from their old POS for free.",
  },
];

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang="en" dir="ltr">
      <JsonLd schema={pageBreadcrumbs(locale, [["Partners", "/partners"]])} />
      <JsonLd schema={faqSchema(FAQS.map(({ q, a }) => ({ question: q, answer: a })))} />

      <section className="relative px-[clamp(16px,4vw,40px)] pb-[clamp(48px,7vw,80px)] pt-[clamp(36px,7vw,90px)]">
        <div className="relative mx-auto grid max-w-[1160px] items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-[clamp(32px,5vw,72px)] lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1">
            <PillBadge>Partners</PillBadge>
            <h1 className="mt-6 text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance">
              Work with us.{" "}
              <span className="text-[var(--color-mint-2)]">Grow with your shops.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
              {`Already selling to, setting up or helping shops and restaurants? Become a ${BRAND_NAME} reseller or setup partner. Our partner programme is new, so we agree the terms with each partner — including commission.`}
            </p>
          </div>

          <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)] lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-[20px] font-bold tracking-[-0.02em]">Partner enquiry</h2>
            <p className="mb-6 mt-1 text-[13.5px] text-[var(--color-muted)]">
              Fields marked <span className="text-[#B42318]">*</span> are required.
            </p>
            <PartnerForm />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:mt-8">
            <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
              Who it is for
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {WHO.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
                    <Check
                      size={14}
                      color="var(--color-mint-2)"
                      strokeWidth={2.6}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[15px] leading-[1.55] text-[var(--color-body)]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            {legal.whatsappUrl && (
              <p className="mt-8 border-t border-[var(--color-line-2)] pt-6 text-[14px] text-[var(--color-body)]">
                Rather talk now?{" "}
                <a
                  href={whatsappLink(
                    `Hi ${BRAND_NAME}, I'd like to talk about becoming a partner.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="partners_aside"
                  className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
                >
                  WhatsApp us at <span dir="ltr">{legal.whatsappDisplay}</span>
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line-soft)] px-[clamp(16px,4vw,40px)] py-[clamp(48px,8vw,90px)]">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance">
            Ways to partner
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {WAYS.map(([title, body]) => (
              <li
                key={title}
                className="min-w-0 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)] sm:p-6"
              >
                <h3 className="text-[16px] font-bold text-[var(--color-ink)]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">{body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-[clamp(40px,6vw,64px)] text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance">
            How it works
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, body], i) => (
              <li
                key={title}
                className="min-w-0 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-mint-soft)] text-[14px] font-bold text-[var(--color-ink)]">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[16px] font-bold text-[var(--color-ink)]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">{body}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-[clamp(40px,6vw,64px)] text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance">
            Questions
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-[16px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5"
              >
                <summary className="cursor-pointer list-none text-[16px] font-semibold text-[var(--color-ink)]">
                  {q}
                </summary>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-body)]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
