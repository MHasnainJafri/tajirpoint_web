import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Bike,
  ChefHat,
  Globe,
  Smartphone,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/**
 * Restaurants are the first customer, so the first scroll after the hero
 * answers "what do I get as a restaurant?" in six short tiles. Every other
 * trade stays reachable through the marquee and "Find your business" below.
 */
const ITEMS: { id: string; icon: LucideIcon }[] = [
  { id: "dineIn", icon: UtensilsCrossed },
  { id: "takeaway", icon: Store },
  { id: "delivery", icon: Bike },
  { id: "kitchen", icon: ChefHat },
  { id: "waiter", icon: Smartphone },
  { id: "online", icon: Globe },
];

export function RestaurantStrip() {
  const t = useTranslations("landing.restaurantStrip");
  return (
    <section className="mt-[clamp(28px,4vw,48px)]" aria-labelledby="restaurant-strip-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="restaurant-strip-title"
          className="text-[clamp(22px,2.6vw,32px)] font-extrabold tracking-[-0.03em]"
        >
          {t("title")}
        </h2>
        <Link
          href="/business/restaurants"
          className="text-[14px] font-semibold underline-offset-4 hover:underline"
        >
          {t("link")}
        </Link>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ITEMS.map(({ id, icon: Icon }) => (
          <li
            key={id}
            className="rounded-[18px] bg-[var(--color-surface)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#0A0A0A] text-white">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div className="mt-3 text-[14px] font-bold">{t(`items.${id}.title`)}</div>
            <div className="mt-1 text-[12.5px] leading-[1.5] text-[var(--color-muted)]">
              {t(`items.${id}.body`)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
