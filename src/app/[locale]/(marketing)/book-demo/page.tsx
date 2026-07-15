import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "See Tajir Point in action. Book a free 30-minute demo with our team.",
};

export default function BookDemoPage() {
  return (
    <section className="relative overflow-hidden px-5 pb-[110px] pt-[140px] md:px-10">
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ── Left: info ────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-[100px] lg:pt-6">
          <PillBadge>Free 30-minute demo</PillBadge>

          <h1 className="mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,4.6vw,56px)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            See Tajir Point
            <br />
            <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
              in action.
            </span>
          </h1>

          <p className="mt-5 max-w-[440px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.65] text-[var(--color-muted)]">
            One of our product specialists will walk you through a live demo tailored to your
            business type — retail, restaurant, electronics, or services.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {[
              ["30 minutes", "No commitment, just a focused walkthrough"],
              ["Your vertical", "We customise the demo to your shop type"],
              ["Live Q&A", "Ask anything — pricing, integrations, migration"],
              ["In your language", "English, اردو, or العربية"],
            ].map(([title, desc], i) => (
              <li
                key={title}
                data-reveal
                data-reveal-delay={i * 70}
                className="flex items-start gap-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(0,210,122,.3)] bg-[rgba(0,210,122,.12)]">
                  <Check size={12} color="var(--color-mint-2)" strokeWidth={2.5} />
                </span>
                <div>
                  <span className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</span>
                  <span className="ms-2 text-[14px] text-[var(--color-muted)]">{desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-[var(--color-line-soft)] pt-8">
            <p className="text-[13px] text-[var(--color-muted-2)]">
              Prefer to just explore?{" "}
              <a
                href="https://app.tajirpoint.com/signup"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2 transition-colors hover:text-[var(--color-ink)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start a free trial →
              </a>
            </p>
          </div>
        </div>

        {/* ── Right: Calendly embed, framed in a dark panel ─────────── */}
        <div data-reveal data-reveal-delay={120} className="relative">
          <div
            className="pointer-events-none absolute -inset-[30px] blur-[24px]"
            style={{
              background: "radial-gradient(ellipse,rgba(0,210,122,.12),transparent 65%)",
            }}
          />
          <div className="relative rounded-[24px] border border-[var(--color-line-2)] bg-[var(--color-panel)] p-2 shadow-[0_40px_100px_rgba(0,0,0,.55)]">
            {/* Calendly renders its own light UI — keep it, but frame it in the panel. */}
            <div className="overflow-hidden rounded-[18px] bg-white">
              <iframe
                src={`${siteConfig.calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=00d27a`}
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a demo with Tajir Point"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
