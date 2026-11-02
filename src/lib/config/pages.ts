import { notFound } from "next/navigation";
import { brand } from "./brand";

/**
 * Which pages this build of the site has (the brand layer, brand.ts).
 *
 * The TajirPoint build has every page. A build for another market or for a
 * server that serves only some business types leaves out what does not apply
 * there: the page 404s, and the menus, footer, sitemap and llms.txt skip it.
 * One rule list, so a link can never point at a page the build left out.
 */

/** Pages written for Pakistan only: PKR, FBR, khata, PK cities and competitors. */
const PAKISTAN_ONLY = [
  "/compare",
  "/pos",
  "/guides",
  "/features/khata",
  "/features/e-invoicing",
  "/extensions/fbr-integration",
  "/extensions/jazzcash-payments",
  "/extensions/easypaisa-payments",
  "/extensions/hbl-payments",
  "/extensions/courier-tcs",
  "/extensions/courier-leopards",
  "/extensions/courier-postex",
];

/**
 * Pages about one kind of business, by backend `Shop.BusinessType`: shown only
 * when the server serves one of the types (NEXT_PUBLIC_BUSINESS_TYPES).
 */
const FOR_BUSINESS_TYPES: Record<string, readonly string[]> = {
  "/features/van-sales": ["distribution", "wholesale"],
  "/extensions/pharmacy-pack": ["pharmacy"],
  "/extensions/route-dispatch": ["distribution", "wholesale"],
};

function under(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`);
}

function servesAny(types: readonly string[]): boolean {
  return brand.businessTypes.length === 0 || types.some((t) => brand.businessTypes.includes(t));
}

/** True when this build leaves the page out. `path` is locale-free ("/compare/x"). */
export function isPageHidden(path: string): boolean {
  const p = path.split(/[?#]/)[0]!.replace(/\/+$/, "") || "/";
  if (!brand.isPakistan && PAKISTAN_ONLY.some((prefix) => under(p, prefix))) return true;
  for (const [prefix, types] of Object.entries(FOR_BUSINESS_TYPES)) {
    if (under(p, prefix) && !servesAny(types)) return true;
  }
  return brand.extraHiddenPages.some((prefix) => under(p, prefix));
}

export function isPageShown(path: string): boolean {
  return !isPageHidden(path);
}

/** Call at the top of a page: a page this build leaves out is a 404. */
export function assertPageShown(path: string): void {
  if (isPageHidden(path)) notFound();
}
