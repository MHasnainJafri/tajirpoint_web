import { useTranslations } from "next-intl";
import {
  Blocks,
  BookUser,
  Calculator,
  Megaphone,
  Package,
  Puzzle,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { PILLARS } from "@/lib/design/landing";

/** One purpose-drawn icon per capability (Lucide), instead of the generic strokes. */
const PILLAR_ICON: Record<(typeof PILLARS)[number]["id"], LucideIcon> = {
  sell: ShoppingCart,
  stock: Package,
  buy: ReceiptText,
  getPaid: Wallet,
  credit: BookUser,
  account: Calculator,
  comply: ShieldCheck,
  grow: Megaphone,
  deliver: Truck,
  people: Users,
  specialise: Puzzle,
  integrate: Blocks,
};

/**
 * Twelve bordered cards covering the whole back office. The point of the
 * section is breadth, so it is a plain auto-fit grid rather than a bento —
 * every capability gets the same weight.
 */
export function Pillars() {
  const t = useTranslations("landing.pillars");

  return (
    <section className="mt-[clamp(64px,9vw,120px)]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            {t("headline")}
          </h2>
        </div>
        <p className="max-w-[40ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>
      </div>

      <div className="mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {PILLARS.map((p) => {
          const Icon = PILLAR_ICON[p.id];
          return (
            <div
              key={p.id}
              data-reveal
              className="rounded-[18px] border border-[var(--color-line)] p-[18px] transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-[var(--color-line-3)] hover:shadow-[0_16px_34px_rgba(10,10,10,.08)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#0A0A0A] text-[var(--color-mint)] shadow-[0_6px_16px_rgba(10,10,10,.14)]">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="mt-[14px] text-[15px] font-bold tracking-[-0.01em]">
                {t(`items.${p.id}.title`)}
              </div>
              <div className="mt-[5px] text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
                {t(`items.${p.id}.body`)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
