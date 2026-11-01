import Image from "next/image";
import { Icon } from "@/components/design/Icon";

/** Local artwork for an add-on the API sends without an icon. */
const FALLBACK_BY_SLUG: Record<string, string> = {
  "courier-nash": "scooter",
};

/**
 * The add-on's icon from the catalogue (`icon_url` on media.tajirpoint.com),
 * in a white tile so transparent brand logos sit on the same ground in light
 * and dark themes. Falls back to the site's own artwork when there is none.
 */
export function AddonIcon({
  slug,
  iconUrl,
  size = 48,
  priority = false,
}: {
  slug: string;
  iconUrl: string | null;
  /** Tile size in px; the image fills ~80% of it. */
  size?: number;
  priority?: boolean;
}) {
  const inner = Math.round(size * 0.8);
  return (
    <span
      className="grid flex-none place-items-center overflow-hidden rounded-[14px] border border-[var(--color-line-2)] bg-white"
      style={{ width: size, height: size }}
    >
      {iconUrl ? (
        <Image
          src={iconUrl}
          alt=""
          aria-hidden="true"
          width={inner}
          height={inner}
          sizes={`${inner}px`}
          priority={priority}
          style={{ width: inner, height: inner, objectFit: "contain" }}
        />
      ) : (
        <Icon name={FALLBACK_BY_SLUG[slug] ?? "package"} size={Math.round(size * 0.42)} />
      )}
    </span>
  );
}
