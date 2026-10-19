"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Boxes,
  CloudOff,
  Factory,
  Laptop,
  MessageCircle,
  ReceiptText,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Enter, EnterScope } from "./Enter";

/**
 * A quiet "live activity" feed beside the headline: the kind of events a real
 * business sees in a day, across trades. New items drop in at the top while
 * older ones fade down and out. Purely decorative (aria-hidden); frozen for
 * visitors who prefer reduced motion.
 *
 * Above the fold, so the first four cards are in the server HTML at their
 * resting opacity; only cards that drop in after hydration slide in (`Enter`).
 */
type Event = { icon: LucideIcon; title: string; meta: string; tone?: "mint" | "amber" };

const EVENTS: Event[] = [
  { icon: ReceiptText, title: "Table 4 paid", meta: "Restaurant · $37.00 · card", tone: "mint" },
  {
    icon: Boxes,
    title: "Low stock · Olive oil 1 L",
    meta: "Retail · 4 left · PO drafted",
    tone: "amber",
  },
  {
    icon: Laptop,
    title: "Serial SN-8841 sold",
    meta: "Laptop shop · warranty started",
    tone: "mint",
  },
  { icon: Truck, title: "Van TRP-0418 · 14 / 18 stops", meta: "Distribution · cash $842.00" },
  {
    icon: Smartphone,
    title: "IMEI verified",
    meta: "Mobile shop · installment 1 of 3 paid",
    tone: "mint",
  },
  { icon: CloudOff, title: "14 offline sales synced", meta: "0 duplicates · 0 lost", tone: "mint" },
  { icon: Factory, title: "Batch #55 completed", meta: "Factory · 240 units into stock" },
  {
    icon: MessageCircle,
    title: "Invoice INV-2217 sent",
    meta: "WhatsApp · delivered",
    tone: "mint",
  },
  { icon: BadgeCheck, title: "Period closed", meta: "Books balanced · ready for your accountant" },
];

const VISIBLE = 4;

export function HeroActivity() {
  const [head, setHead] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (!document.hidden) setHead((h) => (h + 1) % EVENTS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  // Newest first. Keys follow the event so React moves, rather than recreates,
  // the cards that stay on screen.
  const items = Array.from({ length: VISIBLE }, (_, i) => {
    const n = head - i;
    const idx = ((n % EVENTS.length) + EVENTS.length) % EVENTS.length;
    return { e: EVENTS[idx]!, key: n, age: i };
  });

  return (
    <EnterScope>
      <div aria-hidden="true" className="relative hidden h-[340px] w-full select-none lg:block">
        <div className="absolute inset-x-0 top-0 flex flex-col gap-2.5">
          {items.map(({ e, key, age }) => {
            const Icon = e.icon;
            return (
              <Enter
                key={key}
                className="flex items-center gap-3 rounded-[16px] border border-white/[0.1] bg-white/[0.06] px-3.5 py-3 backdrop-blur-sm transition-all duration-700 ease-out"
                motion="motion-safe:animate-[tpSlideIn_600ms_ease-out_both]"
                style={{
                  opacity: 1 - age * 0.24,
                  transform: `scale(${1 - age * 0.035})`,
                  transformOrigin: "top center",
                }}
              >
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-[11px] ${
                    e.tone === "amber"
                      ? "bg-[#FFB020]/15 text-[#FFB020]"
                      : e.tone === "mint"
                        ? "bg-[var(--color-mint)]/15 text-[var(--color-mint)]"
                        : "bg-white/10 text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-white">
                    {e.title}
                  </span>
                  <span className="block truncate text-[11.5px] text-[#9AA0AA]">{e.meta}</span>
                </span>
                <span className="ml-auto flex-none text-[10.5px] text-[#6B7079]">
                  {age === 0 ? "now" : `${age * 3}s`}
                </span>
              </Enter>
            );
          })}
        </div>
      </div>
    </EnterScope>
  );
}
