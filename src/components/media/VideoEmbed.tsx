"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-load YouTube / Vimeo embed.
 *
 * Nothing is requested from YouTube or Vimeo until the visitor presses play,
 * so the page sets no third-party cookies just by loading. YouTube uses the
 * privacy-enhanced youtube-nocookie.com host; Vimeo gets `dnt=1`.
 */
export function VideoEmbed({
  provider,
  id,
  label,
  poster,
}: {
  provider: "youtube" | "vimeo";
  id: string;
  label: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const safeId = encodeURIComponent(id);
  const src =
    provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${safeId}?autoplay=1&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${safeId}?autoplay=1&dnt=1`;

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${label}`}
      className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--color-mint-2)]"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 80% 0%, rgba(0,210,122,.22), transparent 60%), linear-gradient(160deg, #0B2419, #071510)",
      }}
    >
      {poster && (
        <Image src={poster} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
      )}
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[var(--color-mint)] text-[#0A0A0A] shadow-[0_14px_30px_rgba(0,0,0,.35)] transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </button>
  );
}
