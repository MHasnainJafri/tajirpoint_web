"use client";

import { useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics/events";
import type { DesktopFile, DesktopOs } from "@/lib/marketing/downloads";

/**
 * The two desktop download cards (Windows, Mac). After hydration the card for
 * the visitor's own computer is marked "For this computer" and moved first;
 * the server render (and a phone visitor) gets both cards as equals.
 */
export function DesktopDownloads({
  files,
  version,
}: {
  files: readonly DesktopFile[];
  version: string;
}) {
  // The visitor's system never changes while the page is open: nothing to
  // subscribe to. The server snapshot is null, so the first paint matches.
  const mine = useSyncExternalStore(noSubscribe, detectOs, () => null);

  const ordered = mine
    ? [...files.filter((f) => f.os === mine), ...files.filter((f) => f.os !== mine)]
    : files;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ordered.map((f) => {
        const isMine = f.os === mine;
        return (
          <div
            key={f.os}
            className={`relative flex flex-col rounded-[24px] border bg-[var(--color-bg-2)] p-[clamp(20px,3vw,28px)] shadow-[var(--shadow-card)] ${
              isMine
                ? "border-[var(--color-mint-line)] ring-2 ring-[var(--color-mint-line)]"
                : "border-[var(--color-line-2)]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-ink)]">
                  {f.os === "windows" ? <WindowsMark /> : <AppleMark />}
                </span>
                <span>
                  <span className="block text-[18px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                    {f.os === "windows" ? "Windows" : "Mac"}
                  </span>
                  <span className="block text-[13px] text-[var(--color-muted)]">{f.requires}</span>
                </span>
              </span>
              {isMine && (
                <span className="rounded-full bg-[var(--color-mint-soft)] px-[10px] py-[5px] text-[11.5px] font-bold text-[var(--color-mint-2)]">
                  For this computer
                </span>
              )}
            </div>

            <a
              href={f.href}
              download
              onClick={() => trackEvent("desktop_download", { os: f.os, version })}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-[10px] rounded-full bg-[var(--color-brand)] px-6 py-[14px] text-[16px] font-semibold text-[var(--color-on-brand)] shadow-[var(--shadow-card)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-lift)]"
            >
              <DownloadArrow />
              {f.label}
            </a>
            <p className="mt-3 text-center text-[12.5px] text-[var(--color-muted)]">
              {f.detail} · {f.size} · version {version}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function noSubscribe(): () => void {
  return () => {};
}

function detectOs(): DesktopOs | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  // Phones and tablets first: an iPad reports itself as a Mac.
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return null;
  if (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) return null;
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  return null;
}

export function WindowsMark({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M3 5.1 10.4 4v7.1H3V5.1Zm8.3-1.2L21 2.5v8.6h-9.7V3.9ZM3 12.9h7.4V20L3 18.9v-6Zm8.3 0H21v8.6l-9.7-1.4v-7.2Z" />
    </svg>
  );
}

export function AppleMark({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-3.8ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" />
    </svg>
  );
}

function DownloadArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
    </svg>
  );
}
