import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
import { legal, siteConfig, whatsappLink } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { DemoForm } from "./DemoForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Book a Free Demo",
    description:
      "See TajirPoint with your own kind of business. Book a free demo — we WhatsApp you within one working day, and we can move your data from your old POS for free.",
    path: "/book-demo",
    locale,
  });
}

const POINTS: Array<[string, string]> = [
  ["Your kind of business", "Restaurant, shop, pharmacy, distributor — we show the screens you will use."],
  ["Your own products", "Send a few items beforehand and we set them up for the demo."],
  ["We move your data", "Switching from another POS? We load your products, customers and khata for free."],
  ["In your language", "English or Urdu, on WhatsApp video or a call."],
];

export default async function BookDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="relative px-[clamp(16px,4vw,40px)] pb-[clamp(60px,9vw,110px)] pt-[clamp(36px,7vw,90px)]">
      <div className="relative mx-auto grid max-w-[1160px] items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* ── Left: what to expect ──────────────────────────────────── */}
        <div className="lg:sticky lg:top-[100px]">
          <PillBadge>Free demo · no obligation</PillBadge>

          <h1 className="mt-6 text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance">
            See TajirPoint run <span className="text-[var(--color-mint-2)]">your</span> business.
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            Tell us a little about your shop and we&apos;ll WhatsApp you within one working day to
            fix a time.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {POINTS.map(([title, desc]) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
                  <Check size={14} color="var(--color-mint-2)" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</div>
                  <div className="mt-[2px] text-[14px] leading-[1.55] text-[var(--color-muted)]">{desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-line-2)] pt-6 text-[14px] text-[var(--color-body)]">
            <p>
              In a hurry?{" "}
              <a
                href={whatsappLink("Hi TajirPoint, I'd like a demo.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="book_demo_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                WhatsApp us at <span dir="ltr">{legal.whatsappDisplay}</span>
              </a>
            </p>
            <p>
              Prefer to try it yourself?{" "}
              <a
                href={siteConfig.signupUrl}
                data-track="book_demo_aside"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                Start free — 3 months, no card
              </a>
            </p>
          </div>
        </div>

        {/* ── Right: the form ───────────────────────────────────────── */}
        <div className="min-w-0 rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(18px,3.4vw,36px)] shadow-[var(--shadow-card)]">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Book your free demo</h2>
          <p className="mb-6 mt-1 text-[13.5px] text-[var(--color-muted)]">
            Fields marked <span className="text-[#B42318]">*</span> are required.
          </p>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
