import { Link } from "@/i18n/navigation";

/**
 * "Which plan is right for a restaurant?" Shown only on the restaurant-type
 * business pages, above the generic plan cards. Every line restates what the
 * live plan bullets already say (Light: 30 products, 100 orders/day, 2 logins,
 * no online order page; Shop: unlimited dishes, 5 logins, online order page;
 * Business: restaurant suite & kitchen display, up to 5 branches, 20 users),
 * so it must be updated together with the plans in the Console.
 */
const ROWS = [
  {
    plan: "Light",
    fits: "Trying it out, or a very small menu",
    points: [
      "Up to 30 dishes and 100 orders a day",
      "2 staff logins, works offline",
      "No online order page",
    ],
  },
  {
    plan: "Shop",
    fits: "One restaurant that sells every day",
    points: [
      "Unlimited dishes and orders, up to 5 logins",
      "Your own online order page, no commission per order",
      "WhatsApp ordering and online payments",
    ],
  },
  {
    plan: "Business",
    fits: "Kitchen screen, or more than one branch",
    points: [
      "Restaurant suite and kitchen display",
      "Up to 5 branches and 20 users",
      "Purchasing, advanced reports, custom domain",
    ],
  },
];

export function RestaurantPlanGuide() {
  return (
    <section aria-labelledby="restaurant-plan-guide" className="mb-10">
      <h2
        id="restaurant-plan-guide"
        className="text-center text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em]"
      >
        Which plan is right for a restaurant?
      </h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {ROWS.map((r) => (
          <div
            key={r.plan}
            className="rounded-[20px] border border-[var(--color-line-2)] bg-white p-5"
          >
            <div className="text-[16px] font-bold">{r.plan}</div>
            <div className="mt-1 text-[13px] text-[var(--color-muted)]">{r.fits}</div>
            <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.5]">
              {r.points.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13px] text-[var(--color-muted)]">
        Prices are in US dollars. Online orders on your own order page carry no commission from us.{" "}
        <Link href="/pricing" className="font-semibold underline underline-offset-2">
          Full plan comparison
        </Link>
      </p>
    </section>
  );
}
