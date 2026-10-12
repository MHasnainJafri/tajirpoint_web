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
      <MediaPlaceholder title={title} icon={icon} phone={media.expect === "phone"} hint={base} media={media} />
    </div>
  );
}

/**
 * Stand-in until the real file arrives: a quiet "app window" with the
 * feature's icon and name. Decorative — the section copy beside it carries the
 * meaning. The expected filename only shows in development.
 */
export function MediaPlaceholder({
  title,
  icon,
  phone,
  hint,
  media,
}: {
  title: string;
  icon: string;
  phone: boolean;
  hint?: string;
  media?: MediaRef;
}) {
  const showHint = process.env.NODE_ENV === "development" && hint;
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center p-[8%]"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 80% 0%, rgba(0,210,122,.16), transparent 60%), linear-gradient(160deg, #F7F8FA, #EEF0F3)",
      }}
    >
      <div
        className={`flex flex-col overflow-hidden rounded-[16px] border border-[var(--color-line-2)] bg-white shadow-[var(--shadow-lift)] ${
          phone ? "h-full w-[62%] rounded-[26px]" : "h-full w-full"
        }`}
      >
        <div className="flex items-center gap-[6px] border-b border-[var(--color-line)] px-3 py-[9px]">
          {phone ? (
            <span className="mx-auto h-[5px] w-10 rounded-full bg-[var(--color-line-3)]" />
          ) : (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-[#FF7A6B]" />
              <span className="h-[7px] w-[7px] rounded-full bg-[#F5A524]" />
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--color-mint)]" />
            </>
          )}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-[var(--color-mint-soft)]">
            <Icon name={icon} size={28} />
          </span>
          <span className="max-w-[26ch] text-[14px] font-bold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">
            {title}
          </span>
          <span className="flex w-full max-w-[220px] flex-col gap-[6px]">
            <span className="h-[7px] w-full rounded-full bg-[var(--color-surface)]" />
            <span className="h-[7px] w-4/5 rounded-full bg-[var(--color-surface)]" />
            <span className="h-[7px] w-3/5 rounded-full bg-[var(--color-surface)]" />
          </span>
          {showHint && (
            <span className="font-mono text-[10.5px] text-[var(--color-muted-2)]">
              public/media/{hint}.{media?.expect === "image" ? "webp" : "mp4"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
