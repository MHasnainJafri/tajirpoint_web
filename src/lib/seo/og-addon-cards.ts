/**
 * Share cards for the add-on pages (/extensions/<slug>), so a link to one
 * add-on shared on WhatsApp or Facebook shows that add-on, not the generic
 * banner.
 *
 * - One card per add-on the site knows at build time (every write-up in
 *   src/content/addons plus every snapshot row): /og/addon-<slug>.png.
 * - One card per filter group (ADDON_GROUP_CARDS in og-cards.ts) for an
 *   add-on the backend lists after the build: /og/addons-<group>.png.
 *
 * The name and status come from the backend catalogue when the card is
 * rendered (snapshot if the API is down), so a Coming soon add-on says so on
 * its card. Rendered by src/app/og/[image]/route.tsx, same look and size as
 * the other cards (~80–100 KB, under WhatsApp's ~300 KB limit).
 *
 * Kept out of og-cards.ts on purpose: that file is imported by every page's
 * metadata, and this one pulls in the add-on write-ups.
 */
import { ADDON_CONTENT } from "@/content/addons";
import { ADDON_SNAPSHOT } from "@/content/addons/snapshot";
import { getAddonCatalogue, groupFor } from "@/lib/marketing/addons";
import { deriveStatus, type AddonStatus } from "@/lib/marketing/addon-status";
import { ADDON_GROUP_CARDS, type OgCard } from "./og-cards";

const ADDON_PREFIX = "addon-";
const GROUP_PREFIX = "addons-";

/** Add-ons with their own card: known at build time, so prerendered. */
export const ADDON_CARD_SLUGS: ReadonlySet<string> = new Set([
  ...Object.keys(ADDON_CONTENT),
  ...ADDON_SNAPSHOT.map((r) => r.slug),
]);

/** Every extra card id the og route prerenders (without ".png"). */
export function addonCardIds(): string[] {
  return [
    ...[...ADDON_CARD_SLUGS].map((slug) => `${ADDON_PREFIX}${slug}`),
    ...Object.keys(ADDON_GROUP_CARDS).map((id) => `${GROUP_PREFIX}${id}`),
  ];
}

/** The share image for an add-on page: its own card, else its group's, else the add-ons card. */
export function addonOgImage(slug: string, groupId: string): string {
  if (ADDON_CARD_SLUGS.has(slug)) return `/og/${ADDON_PREFIX}${slug}.png`;
  if (ADDON_GROUP_CARDS[groupId]) return `/og/${GROUP_PREFIX}${groupId}.png`;
  return "/og/extensions.png";
}

/** Cuts `text` at a word boundary so it fits in about three lines of the card. */
function clip(text: string, max = 110): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

const STATUS_NOTE: Partial<Record<AddonStatus, string>> = {
  coming_soon: "Coming soon",
  contact_us: "Set up by our team",
};

function buildCard(input: {
  name: string;
  groupLabel: string;
  status: AddonStatus;
  slug: string;
  fallbackLine: string;
}): OgCard {
  const content = ADDON_CONTENT[input.slug];
  const note = STATUS_NOTE[input.status];
  // Short feature names make good chips; long ones would push the row off the card.
  const pills = (content?.features ?? [])
    .map((f) => f.title)
    .filter((t) => t.length <= 24)
    .slice(0, 3);
  return {
    eyebrow: note ? `${input.groupLabel} add-on · ${note}` : `${input.groupLabel} add-on`,
    title: input.name,
    sub: clip(content?.headline || input.fallbackLine || "An add-on for your TajirPoint shop."),
    pills: pills.length ? pills : [input.groupLabel],
  };
}

/**
 * The card for an add-on or add-on group id (without ".png"), or undefined
 * when the id is not one of ours.
 */
export async function addonOgCard(id: string): Promise<OgCard | undefined> {
  if (id.startsWith(GROUP_PREFIX)) return ADDON_GROUP_CARDS[id.slice(GROUP_PREFIX.length)];
  if (!id.startsWith(ADDON_PREFIX)) return undefined;
  const slug = id.slice(ADDON_PREFIX.length);
  if (!ADDON_CARD_SLUGS.has(slug)) return undefined;

  const { addons } = await getAddonCatalogue();
  const live = addons.find((a) => a.slug === slug);
  if (live) {
    return buildCard({
      slug,
      name: live.name,
      groupLabel: live.group.label,
      status: live.status,
      fallbackLine: live.summary,
    });
  }
  // Not listed by the API (or hidden): fall back to the snapshot row.
  const row = ADDON_SNAPSHOT.find((r) => r.slug === slug);
  return buildCard({
    slug,
    name: row?.name ?? slug,
    groupLabel: groupFor({
      slug,
      category: row?.category ?? "",
      category_label: row?.category_label ?? "",
    }).label,
    status: deriveStatus(row ?? {}),
    fallbackLine: row?.tagline ?? "",
  });
}
