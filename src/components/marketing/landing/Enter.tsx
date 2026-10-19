"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Entrance animations for the hero's live demo, without a blank first frame.
 *
 * The hero is above the fold, so whatever the server renders must paint at
 * full opacity. A CSS entrance like `tpSlideIn … both` starts at opacity 0 the
 * moment the element exists — including in the server HTML — which is what
 * left the hero empty until it faded in.
 *
 * `<Enter>` only applies its animation to elements that mount *after* the
 * first render. Rows present in the server HTML (and the matching hydration
 * render) never animate; rows the demo adds later — a new cart line, the PAID
 * stamp, the next activity card — slide in as before.
 */

const Live = createContext(false);

/** Wraps a live demo: everything inside that mounts after hydration may animate. */
export function EnterScope({ children }: { children: ReactNode }) {
  const [live, setLive] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- flips once, after the first paint
  useEffect(() => setLive(true), []);
  return <Live value={live}>{children}</Live>;
}

/** True once the enclosing EnterScope has mounted. */
export function useLive() {
  return useContext(Live);
}

export function Enter({
  as: Tag = "div",
  className = "",
  motion,
  style,
  children,
}: {
  as?: "div" | "span";
  className?: string;
  /** The animation class(es), e.g. `motion-safe:animate-[tpSlideIn_260ms_ease-out_both]`. */
  motion: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const live = useLive();
  // Captured at mount: an element keeps the answer it was born with, so one
  // that was on screen at first paint never starts animating later.
  const [animate] = useState(live);
  return (
    <Tag className={animate ? `${className} ${motion}` : className} style={style}>
      {children}
    </Tag>
  );
}
