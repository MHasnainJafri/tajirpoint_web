import { getTrialDays } from "@/lib/api/plans";

/**
 * The live trial length, as bare text — for copy like "Start free <TrialDays />-day trial".
 * Hard-coding the number drifted: ten pages said 14 while production granted 90.
 */
export async function TrialDays() {
  return <>{await getTrialDays()}</>;
}
