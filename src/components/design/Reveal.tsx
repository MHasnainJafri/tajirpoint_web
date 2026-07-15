"use client";

import { useEffect } from "react";

/**
 * Drives the three scroll-triggered effects the design relies on. Mounted once
 * per page rather than per element, so sections stay server components and ship
 * no JS of their own.
 *
 *  - `[data-reveal]`      fade + rise as they enter the viewport
 *  - `[data-count]`       count up to their target number
 *  - `[data-draw]`        stroke-draw the "how it works" connector line
 *
 * The observers are one-shot: each element is unobserved once it has played.
 */
export function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
    } else {
      revealEls.forEach((el) => {
        const delay = el.dataset.revealDelay;
        if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      });
    }

    const revealIo = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              e.target.classList.add("is-revealed");
              revealIo?.unobserve(e.target);
            });
          },
          { threshold: 0.12 }
        );
    if (revealIo) revealEls.forEach((el) => revealIo.observe(el));

    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countIo.unobserve(e.target);
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "0", 10);
          if (reduce) {
            el.textContent = String(target);
            return;
          }
          const t0 = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => countIo.observe(el));

    const drawIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          drawIo.unobserve(e.target);
          const path = e.target.querySelector("path");
          if (path && !reduce) {
            path.style.animation = "tpDash 1.8s cubic-bezier(.4,0,.2,1) forwards";
          } else if (path) {
            path.style.strokeDashoffset = "0";
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-draw]").forEach((el) => drawIo.observe(el));

    return () => {
      revealIo?.disconnect();
      countIo.disconnect();
      drawIo.disconnect();
    };
  }, []);

  return null;
}
