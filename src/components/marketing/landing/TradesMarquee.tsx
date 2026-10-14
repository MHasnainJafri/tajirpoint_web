import { useTranslations } from "next-intl";
import {
  Factory,
  Hammer,
  Laptop,
  Pill,
  Scissors,
  ShoppingBasket,
  Smartphone,
  Store,
  Truck,
  UtensilsCrossed,
  Warehouse,
  ChefHat,
  type LucideIcon,
} from "lucide-react";

/**
 * A slow, endless ticker of the trades TajirPoint is used in. It sits directly
 * under the hero so the first scroll answers "is this for my kind of business?"
 * before any feature copy does. Pauses on hover; stands still (and wraps) for
 * visitors who prefer reduced motion.
 */
const TRADES: { id: string; icon: LucideIcon }[] = [
  { id: "restaurants", icon: UtensilsCrossed },
  { id: "retail", icon: ShoppingBasket },
  { id: "laptops", icon: Laptop },
  { id: "mobiles", icon: Smartphone },
  { id: "wholesale", icon: Warehouse },
  { id: "trucking", icon: Truck },
  { id: "factories", icon: Factory },
  { id: "pharmacy", icon: Pill },
  { id: "salons", icon: Scissors },
  { id: "cloud", icon: ChefHat },
  { id: "hardware", icon: Hammer },
  { id: "online", icon: Store },
];

export function TradesMarquee() {
  const t = useTranslations("landing.trades");

  const row = (hidden: boolean) => (
    <ul
      className="flex flex-none items-center gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center"
      aria-hidden={hidden || undefined}
    >
      {TRADES.map(({ id, icon: Icon }) => (
        <li
          key={id}
          className="flex flex-none items-center gap-2.5 whitespace-nowrap rounded-full border border-[var(--color-line)] bg-white px-[18px] py-[10px] text-[14px] font-semibold tracking-[-0.01em] transition-colors hover:border-[var(--color-line-3)]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0A0A0A] text-[var(--color-mint)]">
            <Icon size={15} strokeWidth={2} aria-hidden="true" />
          </span>
          {t(`items.${id}`)}
        </li>
      ))}
    </ul>
  );

  return (
    <section data-reveal className="mt-[clamp(40px,5vw,64px)]" aria-label={t("eyebrow")}>
      <div className="flex justify-center">
        <div className="eyebrow">{t("eyebrow")}</div>
      </div>
      <div
        className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        dir="ltr"
      >
        <div className="marquee-track marquee-track-slow group-hover:[animation-play-state:paused] motion-reduce:!w-auto motion-reduce:animate-none">
          {row(false)}
          <div className="motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  );
}
