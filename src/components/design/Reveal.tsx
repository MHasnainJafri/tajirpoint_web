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
 *  - `[data-play]`        start a card's step-by-step sequence (see globals.css)
 *
 * Progressive, never blocking: the server HTML paints every element at full
 * opacity, with its final numbers. Once this runs it adds `js-reveal` to <html>
 * and *arms* (`reveal-armed` / `play-armed`) only the elements that are still
 * below the fold; only armed elements start hidden. Whatever is already on
 * screen when JS arrives — the hero, and anything a restored scroll position
 * shows — stays exactly as painted, so first paint never waits on hydration and
 * nothing visible blinks out. Under `prefers-reduced-motion` nothing is armed.
 *
 * Elements that cross the threshold together are staggered by their position in
 * the batch — capped at eight so a twelve-card grid never leaves the last card
 * waiting most of a second. That cascade is what makes a grid feel like it is
 * being dealt rather than switched on, and it is the design's own behaviour.
 *
 * The observers are one-shot: each element is unobserved once it has played.
 * This lives in the persistent marketing layout, so it re-scans on every route
 * change.
 */

const STAGGER_MS = 70;
const STAGGER_CAP = 8;

/** Still entirely below the bottom of the viewport, i.e. not yet seen. */
const belowFold = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight;

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Nothing to animate: leave the server-rendered page exactly as it is.
    if (reduce) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");

    // Read every position before writing any class, so arming costs one layout.
    const pick = (selector: string) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.classList.contains("is-revealed") && !el.classList.contains("is-playing")
      );
    const revealEls = pick("[data-reveal]").filter(belowFold);
    const playEls = pick("[data-play]").filter(belowFold);
    const countEls = Array.from(document.querySelectorAll<HTMLElement>("[data-count]")).filter(
      belowFold
    );
    const drawEls = Array.from(document.querySelectorAll<HTMLElement>("[data-draw]")).filter(
      belowFold
    );
    revealEls.forEach((el) => el.classList.add("reveal-armed"));
    playEls.forEach((el) => el.classList.add("play-armed"));

    // Set once any observer has reported. IntersectionObserver always delivers
    // an initial record per target, so if none has arrived after a while the
    // observer is not working (a tab that was never painted, a throttled
    // browser) and everything armed is shown rather than left blank.
    let observed = false;

    const revealIo = new IntersectionObserver(
      (entries) => {
        observed = true;
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
          revealIo.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    revealEls.forEach((el) => revealIo.observe(el));

    const playIo = new IntersectionObserver(
      (entries) => {
        observed = true;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-playing");
          playIo.unobserve(e.target);
        });
      },
      { threshold: 0.3 }
    );
    playEls.forEach((el) => playIo.observe(el));

    const failsafe = window.setTimeout(() => {
      if (observed) return;
      revealEls.forEach((el) => el.classList.add("is-revealed"));
      playEls.forEach((el) => el.classList.add("is-playing"));
    }, 2500);

    // Counters keep their server-rendered final text until they scroll in; only
    // then do they run up from zero, so a visible number never resets.
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countIo.unobserve(e.target);
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "0", 10);
          const prefix = el.dataset.countPrefix ?? "";
          const suffix = el.dataset.countSuffix ?? "";
          const formatNumber = (num: number) => `${prefix}${num.toLocaleString()}${suffix}`;

          const t0 = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = formatNumber(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.2 }
    );
    countEls.forEach((el) => countIo.observe(el));

    const drawIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          drawIo.unobserve(e.target);
          const path = e.target.querySelector("path");
          if (path) path.style.animation = "tpDash 1.8s cubic-bezier(.4,0,.2,1) forwards";
        });
      },
      { threshold: 0.4 }
    );
    drawEls.forEach((el) => drawIo.observe(el));

    return () => {
      window.clearTimeout(failsafe);
      revealIo.disconnect();
      countIo.disconnect();
      drawIo.disconnect();
      playIo.disconnect();
      // A page left half-armed (navigated away mid-scroll) must not stay hidden
      // if the same nodes survive the route change.
      revealEls.forEach((el) => el.classList.add("is-revealed"));
      playEls.forEach((el) => el.classList.add("is-playing"));
    };
  }, [pathname]);

  return null;
}
