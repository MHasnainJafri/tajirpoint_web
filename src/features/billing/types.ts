export type PlanId = "starter" | "pro" | "enterprise";

export interface Subscription {
  planId: PlanId;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd: string;
}
