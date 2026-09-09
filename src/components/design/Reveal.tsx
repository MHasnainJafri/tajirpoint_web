"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Drives the scroll-triggered motion the design relies on. Mounted once per
 * page rather than per element, so sections stay server components and ship no
 * JS of their own.
 *
 *  - `[data-reveal]`      fade + rise as they enter the viewport
 *  - `[data-count]`       count up to their target number
 *  - `[data-draw]`        stroke-draw a connector line
 *
 * Elements that cross the threshold together are staggered by their position in
 * the batch — capped at eight so a twelve-card grid never leaves the last card
 * waiting most of a second. That cascade is what makes a grid feel like it is
 * being dealt rather than switched on, and it is the design's own behaviour.
 *
 * The observers are one-shot: each element is unobserved once it has played.
 * This lives in the persistent marketing layout, so it re-scans on every route
 * change — otherwise a client-side navigation would leave the new page's
 * content stuck at opacity:0.
 */

const STAGGER_MS = 70;
const STAGGER_CAP = 8;

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
    }

    const revealIo = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            // Only the ones actually entering get a slot in the cascade, so an
            // element scrolled past on its own still animates immediately.
            const entering = entries.filter((e) => e.isIntersecting);
            entering.forEach((e, i) => {
              const el = e.target as HTMLElement;
              // An explicit data-reveal-delay wins — a few places want to lead
              // or trail their neighbours regardless of DOM order.
              const explicit = el.dataset.revealDelay;
              const delay = explicit ? Number(explicit) : Math.min(i, STAGGER_CAP) * STAGGER_MS;
              el.style.setProperty("--reveal-delay", `${delay}ms`);
              el.classList.add("is-revealed");
              // Drop the compositor hint once the transition has finished.
              window.setTimeout(() => {
                el.style.willChange = "auto";
              }, delay + 800);
              revealIo?.unobserve(el);
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
        );
    if (revealIo) revealEls.forEach((el) => revealIo.observe(el));

    // Failsafe, as in the design's own script: if the observer never reports —
    // a tab that was never painted, a browser that throttles it, a layout that
    // leaves an element zero-height — show everything rather than leave the
    // page blank. Anything already revealed keeps the delay it animated with.
    const failsafe = window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
    }, 2500);

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
      window.clearTimeout(failsafe);
      revealIo?.disconnect();
      countIo.disconnect();
      drawIo.disconnect();
    };
  }, [pathname]);

  return null;
}
