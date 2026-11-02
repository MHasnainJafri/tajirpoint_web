import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolBreadcrumbs, ToolCta, ToolFaqs, ToolGrid } from "@/components/tools/ToolSections";
import { TOOLS, TOOLS_HUB } from "@/content/tools/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { toolsListSchema } from "@/lib/seo/tool-schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: TOOLS_HUB.seo.title,
    description: TOOLS_HUB.seo.description,
    path: "/tools",
    locale,
    keywords: TOOLS.flatMap((t) => t.seo.keywords.slice(0, 1)),
  });
}

export default async function ToolsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div lang="en" dir="ltr">
      <JsonLd
        schema={[
          pageBreadcrumbs(locale, [["Free tools", "/tools"]]),
          toolsListSchema(TOOLS, locale),
          faqSchema([...TOOLS_HUB.faqs]),
        ]}
      />

      <section className="px-[clamp(16px,4vw,40px)] pb-[clamp(40px,6vw,64px)] pt-[clamp(28px,6vw,72px)]">
        <div className="mx-auto max-w-[1140px]">
          <ToolBreadcrumbs trail={[["Free tools", "/tools"]]} />
          <PillBadge>Free · no sign-up</PillBadge>
          <h1 className="mt-6 max-w-[18ch] text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-balance">
            {TOOLS_HUB.heading}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {TOOLS_HUB.intro}
          </p>
          <p className="mt-4 inline-flex items-start gap-2 text-[14px] leading-[1.55] text-[var(--color-ink-3)]">
            <ShieldCheck
              aria-hidden="true"
              className="mt-[2px] h-[18px] w-[18px] shrink-0 text-[var(--color-mint-2)]"
            />
            Private by design: nothing you type is sent to us or saved.
          </p>
        </div>
      </section>

      <section aria-label="Tools" className="px-[clamp(16px,4vw,40px)] pb-[clamp(48px,7vw,80px)]">
        <div className="mx-auto max-w-[1140px]">
          <ToolGrid />
        </div>
      </section>

      <section className="border-t border-[var(--color-line-soft)] px-[clamp(16px,4vw,40px)] py-[clamp(48px,7vw,72px)]">
        <ToolFaqs faqs={TOOLS_HUB.faqs} />
      </section>

      <section id="tools-cta" className="px-[clamp(16px,4vw,40px)] pb-[clamp(64px,9vw,110px)]">
        <ToolCta />
      </section>
    </div>
  );
}
