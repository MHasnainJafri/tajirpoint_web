import Image from "next/image";
import manifest from "@/lib/media/manifest.json";
import { Icon } from "@/components/design/Icon";
import type { MediaRef } from "@/lib/marketing/businesses";
import { InViewVideo } from "./InViewVideo";
import { VideoEmbed } from "./VideoEmbed";

/**
 * One image/video slot on a marketing page.
 *
 * Which file fills the slot is decided at BUILD time from
 * `src/lib/media/manifest.json` (written by scripts/media.mjs before every
 * build), so the browser is never sent a URL that 404s and pages stay static.
 *
 * Order of preference:
 *   1. local video  — `<slot>.webm` / `<slot>.mp4`, poster `<slot>-poster.*`
 *   2. hosted video — `media.youtube` / `media.vimeo` (click-to-load facade)
 *   3. local image  — `<slot>.webp|avif|jpg|jpeg|png` via next/image
 *   4. a branded placeholder
 */

const FILES = new Set<string>(manifest.files);
const IMAGE_EXT = [".webp", ".avif", ".jpg", ".jpeg", ".png"];

function first(base: string, exts: string[]): string | null {
  for (const ext of exts) {
    if (FILES.has(`${base}${ext}`)) return `/media/${base}${ext}`;
  }
  return null;
}

export interface MediaSlotProps {
  /** Folder under public/media, e.g. "business/restaurants". */
  dir: string;
  media: MediaRef;
  /** Shown on the placeholder. */
  title: string;
  /** Icon name for the placeholder (see components/design/Icon). */
  icon?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function defaultRatio(media: MediaRef): string {
  return media.ratio ?? (media.expect === "phone" ? "4/5" : "16/10");
}

export function MediaSlot({
  dir,
  media,
  title,
  icon = "pos",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
  className = "",
}: MediaSlotProps) {
  const base = `${dir}/${media.slot}`;
  const ratio = defaultRatio(media);

  const webm = first(base, [".webm"]);
  const mp4 = first(base, [".mp4"]);
  const poster = first(`${base}-poster`, IMAGE_EXT);
  const image = first(base, IMAGE_EXT);

  const frame = `relative overflow-hidden rounded-[22px] border border-[var(--color-line-2)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ${
    media.expect === "phone" ? "mx-auto w-full max-w-[380px]" : "w-full"
  } ${className}`;

  if (webm || mp4) {
    return (
      <div className={frame} style={{ aspectRatio: ratio }}>
        <InViewVideo
          sources={[
            ...(webm ? [{ src: webm, type: "video/webm" }] : []),
            ...(mp4 ? [{ src: mp4, type: "video/mp4" }] : []),
          ]}
          poster={poster ?? image ?? undefined}
          label={media.alt}
        />
      </div>
    );
  }

  if (media.youtube || media.vimeo) {
    return (
      <div className={frame} style={{ aspectRatio: ratio }}>
        <VideoEmbed
          provider={media.youtube ? "youtube" : "vimeo"}
          id={(media.youtube ?? media.vimeo) as string}
          label={media.alt}
          poster={poster ?? image ?? undefined}
        />
      </div>
    );
  }

  if (image) {
    return (
      <div className={frame} style={{ aspectRatio: ratio }}>
        <Image
          src={image}
          alt={media.alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={frame} style={{ aspectRatio: ratio }}>
      <FeatureIllustration title={title} icon={icon} />
    </div>
  );
}

/** Purposeful artwork while no product photo/video is supplied; never a fake screenshot. */
const FEATURE_ART: Record<string, string> = {
  pos: "artwork-pos-checkout",
  store: "extension-website-builder",
  utensils: "extension-restaurant",
  restaurant: "extension-restaurant",
  pill: "extension-pharmacy",
  cloud: "extension-cloud-kitchen",
  users: "extension-hr-payroll",
  truck: "extension-route-dispatch",
  route: "extension-route-dispatch",
  bike: "extension-route-dispatch",
  scooter: "extension-route-dispatch",
  package: "artwork-inventory",
  warehouse: "artwork-inventory",
  goods: "artwork-inventory",
  book: "extension-accounting-gl",
  ledgerbook: "extension-accounting-gl",
  calculator: "extension-accounting-gl",
  chart: "extension-customer-portal",
  receipt: "artwork-purchasing",
  cash: "extension-cash-management",
  bank: "extension-cash-management",
  wallet: "extension-cash-management",
  shield: "artwork-compliance",
  phone: "extension-ai-phone-ordering",
  ticket: "extension-coupons",
  percent: "extension-coupons",
  alarmpct: "extension-time-promos",
  refresh: "artwork-integrations",
};

function FeatureIllustration({ title, icon }: { title: string; icon: string }) {
  return (
    <div
      role="img"
      aria-label={`${title} — feature illustration`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5"
      style={{ background: "linear-gradient(145deg, #F5FAF7, #EDF3EF)" }}
    >
      <Icon name={FEATURE_ART[icon] ?? "artwork-pos-checkout"} size={68} />
      <span className="max-w-[28ch] text-center text-[12px] font-medium leading-snug text-[var(--color-muted)]">
        {title}
      </span>
    </div>
  );
}
