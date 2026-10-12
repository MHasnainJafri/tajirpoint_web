import { getTranslations } from "next-intl/server";
import type { PlanCardLabels } from "./PlanCards";

/** The plan-card labels in the page's locale (messages: landing.pricing.*). */
export async function getPlanLabels(): Promise<PlanCardLabels> {
  const t = await getTranslations("landing.pricing");
  return {
    perMonth: t("perMonth"),
    perYear: t("perYear"),
    monthly: t("monthly"),
    annual: t("annual"),
    save: t.raw("save") as string,
    recommended: t("recommended"),
    notIncluded: t("notIncluded"),
    billingLabel: t("billingLabel"),
    freePeriod: t("freePeriod"),
  };
}
