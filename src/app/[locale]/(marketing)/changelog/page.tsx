import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CtaPanel, GhostButton, MintButton, PillBadge } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { CHANGELOG, type ChangelogAudience } from "@/content/changelog/entries";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageBreadcrumbs } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "What's New in TajirPoint POS: Monthly Updates",
    description:
      "What changed in TajirPoint this month: new features for shops and restaurants, in plain words. Only work that is already live for every shop is listed here.",
    path: "/changelog",
    locale,
  });
}

/** Chip colours per audience. Text stays dark on a soft tint for contrast. */
const AUDIENCE_CLASS: Record<ChangelogAudience, string> = {
  Everyone: "bg-[var(--color-mint-soft)] text-[var(--color-ink)]",
  Restaurants: "bg-[#FFF4E5] text-[#7A3E00]",
  Shops: "bg-[#EAF2FF] text-[#173B7A]",
  Website: "bg-[#F2EEFF] text-[#3B2A7A]",
};

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang="en" dir="ltr">
      <JsonLd schema={pageBreadcrumbs(locale, [["What's new", "/changelog"]])} />

      <section className="px-4 pb-10 pt-[clamp(48px,8vw,96px)] text-center sm:px-7 md:px-10">
        <PillBadge>What&apos;s new</PillBadge>
        <h1 className="mx-auto mt-6 max-w-[820px] text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance text-[var(--color-ink)]">
          What&apos;s new in TajirPoint
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.65] text-[var(--color-body)]">
          The changes we shipped each month, in plain words. Only things that are already live for
          shops are listed — nothing that is still being built.
        </p>
        {CHANGELOG.length > 1 && (
          <nav aria-label="Months" className="mt-7 flex flex-wrap justify-center gap-2">
            {CHANGELOG.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] px-4 text-[14px] font-semibold text-[var(--color-ink)] hover:-translate-y-[1px]"
              >
                {m.label}
              </a>
            ))}
          </nav>
        )}
      </section>

      <div className="px-4 pb-[clamp(56px,9vw,100px)] sm:px-7 md:px-10">
        <div className="mx-auto flex max-w-[860px] flex-col gap-[clamp(40px,6vw,64px)]">
          {CHANGELOG.map((month) => (
            <section
              key={month.id}
              id={month.id}
              aria-labelledby={`${month.id}-h`}
              className="scroll-mt-24"
            >
              <h2
                id={`${month.id}-h`}
                className="text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
              >
                {month.label}
              </h2>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-[var(--color-muted)]">
                {month.summary}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {month.items.map((item) => (
                  <li
                    key={item.title}
                    className="min-w-0 rounded-[18px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-[clamp(16px,3vw,24px)] shadow-[var(--shadow-card)]"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
                        {item.title}
                      </h3>
                      <span
                        className={`rounded-full px-[10px] py-[3px] text-[12px] font-semibold ${AUDIENCE_CLASS[item.audience]}`}
                      >
                        {item.audience}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.65] text-[var(--color-body)]">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <section className="px-4 pb-[clamp(64px,10vw,110px)] sm:px-7 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
            Want to see it for your business?
          </h2>
          <p className="relative mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Start on the Light plan, free for 3 months, or ask us for a call back.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href={siteConfig.signupUrl} external>
              Start free <span aria-hidden>→</span>
            </MintButton>
            <GhostButton href="/get-a-call">Get a call back</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
