"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

/**
 * The hero product shot: a 3D-tilting browser frame with two floating status
 * cards. The tilt tracks the cursor across the wrapper and eases back to flat
 * on leave — the frame itself is the only thing that rotates, so the floating
 * cards keep their own independent bob.
 */
export function HeroTilt({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("landing.hero");

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (ev: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
    };
    const onLeave = () => {
      tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="on-dark relative mt-16 w-[min(1120px,94vw)] animate-[tpFadeUp_1s_.6s_cubic-bezier(.22,1,.36,1)_both] [perspective:1400px]"
    >
      <div
        className="pointer-events-none absolute -inset-x-[60px] -inset-y-10 blur-[30px]"
        style={{
          background: "radial-gradient(ellipse at 50% 20%,rgba(0,210,122,.22),transparent 65%)",
        }}
      />

      <div
        ref={tiltRef}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-line-2)] bg-[var(--color-panel)] shadow-[0_40px_120px_rgba(0,0,0,.6),0_0_0_1px_rgba(0,210,122,.08),0_0_80px_rgba(0,210,122,.1)] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        {children}
      </div>

      {/* Floating status cards — hidden on small screens, where they'd collide */}
      <div className="absolute left-[-34px] top-[38%] hidden animate-[tpFloat_5s_ease-in-out_infinite] rounded-xl border border-[rgba(0,210,122,.35)] bg-[rgba(10,22,16,.92)] px-4 py-3 text-left shadow-[0_16px_44px_rgba(0,0,0,.5)] backdrop-blur-lg lg:block">
        <div className="font-mono text-[10px] tracking-[1.5px] text-[var(--color-mint-2)]">
          {t("floatOfflineLabel")}
        </div>
        <div className="mt-1 text-[13.5px] font-semibold">{t("floatOfflineText")}</div>
      </div>

      <div className="absolute right-[-30px] top-[16%] hidden animate-[tpFloat_6s_.8s_ease-in-out_infinite] rounded-xl border border-[var(--color-line-2)] bg-[rgba(10,22,16,.92)] px-4 py-3 text-left shadow-[0_16px_44px_rgba(0,0,0,.5)] backdrop-blur-lg lg:block">
        <div className="font-mono text-[10px] tracking-[1.5px] text-[var(--color-muted-2)]">
          {t("floatLedgerLabel")}
        </div>
        <div className="mt-1 text-[13.5px] font-semibold text-[var(--color-mint-2)]">
          {t("floatLedgerText")}
        </div>
      </div>
    </div>
  );
}
