import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * A photography slot.
 *
 * The marketing photos don't exist yet, so every slot renders a labelled
 * placeholder carrying the exact filename it is waiting for. Drop a file into
 * `public/images/` named after the slot id and it takes over automatically —
 * no code change. The shooting brief for each id lives in IMAGE-PROMPTS.md.
 *
 * Server component: it stats the public folder, so it must not be imported
 * into a "use client" tree.
 */

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const IMAGE_DIR = path.join(process.cwd(), "public", "images");

let cached: Map<string, string> | null = null;

function index(): Map<string, string> {
  // Cache in production only — in dev the folder is re-read on every render so
  // a newly added photo shows up on refresh instead of after a server restart.
  if (cached && process.env.NODE_ENV === "production") return cached;

  const found = new Map<string, string>();
  try {
    for (const file of fs.readdirSync(IMAGE_DIR)) {
      const ext = path.extname(file).toLowerCase();
      if (EXTENSIONS.includes(ext)) found.set(path.basename(file, ext), `/images/${file}`);
    }
  } catch {
    // No public/images yet — every slot falls through to its placeholder.
  }
  cached = found;
  return found;
}

export interface ShotProps {
  /** Slot id — also the filename stem under public/images. */
  id: string;
  /** Alt text for the real photo. Placeholders are decorative and aria-hidden. */
  alt: string;
  /** CSS aspect-ratio, e.g. "4/3". Reserves the box so nothing shifts on swap. */
  ratio?: string;
  /** Responsive `sizes` hint passed to next/image. */
  sizes?: string;
  /** Short human note rendered on the placeholder so the page still reads. */
  label?: string;
  /**
   * Rendered instead of the generic placeholder while the file is missing.
   * Used where something better than an empty box already exists — the hero
   * passes the coded POS mock here.
   */
  fallback?: React.ReactNode;
  /**
   * Corner radius, applied inline so a caller can flatten it — inside the
   * hero's device bezel the frame already does the rounding, and a competing
   * Tailwind radius class would leave the bezel showing through the corners.
   */
  radius?: string;
  priority?: boolean;
  className?: string;
}

export function Shot({
  id,
  alt,
  ratio = "4/3",
  sizes = "(max-width: 720px) 100vw, 33vw",
  label,
  fallback,
  radius = "20px",
  priority = false,
  className = "",
}: ShotProps) {
  const src = index().get(id);

  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-bg-3)] ${className}`}
      style={{ aspectRatio: ratio, borderRadius: radius }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        (fallback ?? <Placeholder id={id} label={label ?? alt} ratio={ratio} />)
      )}
    </div>
  );
}

function Placeholder({ id, label, ratio }: { id: string; label: string; ratio: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] px-6 text-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg,rgba(6,26,17,.035) 0 1px,transparent 1px 11px)",
      }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg-2)] text-[var(--color-muted-3)]">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <circle cx="8.5" cy="10" r="1.6" />
          <path d="m4 17 4.5-4.5 3 3L15 12l5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="max-w-[280px] text-[13.5px] font-semibold leading-snug text-[var(--color-muted)]">
        {label}
      </div>
      <div className="font-mono text-[11px] text-[var(--color-muted-3)]">
        /images/{id}.jpg · {ratio.replace("/", ":")}
      </div>
    </div>
  );
}
