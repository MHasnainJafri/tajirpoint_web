import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface Tier {
  name: string;
  desc: string;
  price: string;
  per?: string;
  features: string[];
  cta: { label: string; href: string; variant: "soft" | "mint" | "ghost" };
  featured?: boolean;
  ribbon?: string;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    desc: "For one shop, one register",
    price: "Rs 4,500",
    per: "/month",
    features: [
      "1 branch · 2 users",
      "POS · Inventory · Khata",
      "Storefront subdomain",
      "FBR submission",
      "Email support",
    ],
    cta: { label: "Start free", href: "https://dashboard.tajirpoint.com/signup", variant: "soft" },
  },
  {
    name: "Growth",
    desc: "Multi-branch, full ERP",
    price: "Rs 12,000",
    per: "/month",
    features: [
      "Up to 5 branches · 15 users",
      "Everything in Starter",
      "Purchases · Dispatch · Reports",
      "Restaurant KDS",
      "Custom domain",
      "Priority chat support",
    ],
    cta: { label: "Start free", href: "https://dashboard.tajirpoint.com/signup", variant: "mint" },
    featured: true,
    ribbon: "Most popular",
  },
  {
    name: "Enterprise",
    desc: "Chains, franchises, custom",
    price: "Custom",
    features: [
      "Unlimited branches & users",
      "Single sign-on (SSO)",
      "Dedicated success manager",
      "Custom integrations & SLA",
      "On-premise option",
      "Migration assistance",
    ],
    cta: { label: "Talk to sales", href: "/contact", variant: "ghost" },
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeader right="No per-module up-sells, no transaction fees. Pay per branch, scale as you grow. 14-day free trial, no card required.">
          <Eyebrow>Simple, predictable pricing</Eyebrow>
          <h2 className="display-2">
            One price.
            <br />
            Every module.
          </h2>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-16">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={cn(
                "p-9 px-9 rounded-[32px] flex flex-col relative transition-[background,transform] duration-200 hover:-translate-y-1",
                t.featured ? "bg-[var(--color-ink)] text-white/[0.78] hover:bg-[#0f0f0f]" : "bg-[var(--color-bg-2)]"
              )}
            >
              {t.ribbon && (
                <span className="absolute top-6 right-6 text-[11px] tracking-[0.06em] text-[var(--color-ink)] bg-[var(--color-mint)] px-3 py-1.5 rounded-full font-semibold">
                  {t.ribbon}
                </span>
              )}
              <div className={cn("text-[24px] font-bold tracking-[-0.025em]", t.featured && "text-white")}>
                {t.name}
              </div>
              <div className={cn("mt-2 text-[14px]", t.featured ? "text-white/65" : "text-[var(--color-muted-2)]")}>
                {t.desc}
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-[64px] font-extrabold tracking-[-0.04em] leading-none",
                    t.featured && "text-white"
                  )}
                >
                  {t.price}
                </span>
                {t.per && (
                  <span className={cn("text-[13.5px]", t.featured ? "text-white/65" : "text-[var(--color-muted-2)]")}>
                    {t.per}
                  </span>
                )}
              </div>
              <ul className="my-8 flex flex-col gap-3 flex-1" role="list">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "text-[14.5px] pl-7 relative leading-[1.5]",
                      t.featured ? "text-white/[0.78]" : "text-[var(--color-ink-3)]"
                    )}
                  >
                    <span
                      className="absolute left-0 top-0 w-[18px] h-[18px] rounded-full bg-[var(--color-mint)] text-[var(--color-ink)] text-[10px] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={t.cta.variant === "ghost" && t.featured ? "dark-ghost" : t.cta.variant}>
                <Link href={t.cta.href}>
                  {t.cta.label}
                  {t.cta.variant === "mint" && <span className="arrow">→</span>}
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
