import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaPanel, GhostButton, MintButton } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { GUIDES, GUIDES_HUB, readMinutes } from "@/content/guides";
import { brand } from "@/lib/config/brand";
import { siteConfig } from "@/lib/config/site";
import { guidesHubSchema } from "@/lib/marketing/guide-schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageBreadcrumbs } from "@/lib/seo/schemas";
import { assertPageShown } from "@/lib/config/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: GUIDES_HUB.seoTitle,
    description: GUIDES_HUB.seoDescription,
    path: GUIDES_HUB.path,
    locale,
  });
}

export default async function GuidesHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Left out of builds for another market or business type (src/lib/config/pages.ts).
  assertPageShown("/guides");

  return (
    // English copy; keep its own language and direction on /ur and /ar.
    <div lang={locale === "en" ? undefined : "en"} dir={locale === "en" ? undefined : "ltr"}>
      <JsonLd
        schema={[guidesHubSchema(locale), pageBreadcrumbs(locale, [["Guides", GUIDES_HUB.path]])]}
      />

      <div className="mx-auto max-w-[1180px] px-4 md:px-6" style={{ overflowX: "clip" }}>
        <nav aria-label="Breadcrumb" className="pt-5 text-[12.5px] text-[var(--color-muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[var(--color-ink)]">
              Guides
            </li>
          </ol>
        </nav>

        <header className="max-w-[760px] pb-[clamp(28px,5vw,48px)] pt-[clamp(24px,4vw,48px)]">
          <div className="eyebrow">Guides</div>
          <h1 className="mt-3 text-[clamp(32px,4.8vw,54px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-balance">
            {GUIDES_HUB.title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-[var(--color-body)]">
            {GUIDES_HUB.intro}
          </p>
        </header>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="flex h-full flex-col rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] md:p-6"
              >
                <span className="text-[12.5px] font-semibold text-[var(--color-mint-2)]">
                  {g.category}
                </span>
                <h2 className="mt-2 text-[19px] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
                  {g.title}
                </h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
                  {g.summary}
                </p>
                <span className="mt-4 text-[13px] font-semibold text-[var(--color-ink-3)]">
                  {readMinutes(g)} min read · Read the guide <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[70ch] text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
          {brand.founderName
            ? `Written by ${brand.founderName}, ${brand.founderTitle.toLowerCase()} of ${siteConfig.name}.`
            : `Written by the ${siteConfig.name} team.`}{" "}
          Guides that mention laws link to the official source and say when we checked it. They are
          general information, not legal or tax advice.
        </p>
      </div>

      <section className="px-4 pb-[90px] pt-[clamp(48px,7vw,88px)] md:px-6">
        <CtaPanel>
          <h2 className="relative text-[clamp(26px,3.6vw,42px)] font-extrabold tracking-[-0.03em] text-balance">
            Have a question these guides don&apos;t answer?
          </h2>
          <p className="relative mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.6] opacity-85">
            Leave your number and a person from our team calls you within one working day.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
            <MintButton href="/get-a-call">
              Get a call back <span aria-hidden="true">→</span>
            </MintButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
