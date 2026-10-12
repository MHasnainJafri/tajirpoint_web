"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping product demo that plays only while it is on screen.
 *
 * `preload="none"` keeps the bytes off the wire until the clip scrolls into
 * view; visitors who ask for reduced motion get the poster and the controls,
 * never autoplay.
 */
export function InViewVideo({
  sources,
  poster,
  label,
}: {
  sources: { src: string; type: string }[];
  poster?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not reflect `muted` as an attribute; autoplay needs it set.
    video.muted = true;

    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (reduce || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay refused — the controls are there */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="none"
      aria-label={label}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
