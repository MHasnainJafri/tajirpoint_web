import type { Metadata } from "next";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "See Tajir Point in action. Book a free 30-minute demo with our team.",
};

export default function BookDemoPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1320px] px-7 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: info */}
          <div className="lg:pt-6 lg:sticky lg:top-[100px]">
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
              <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
              Free 30-minute demo
            </span>
            <h1 className="text-[40px] lg:text-[56px] font-extrabold tracking-[-0.035em] leading-[1.06] text-[var(--color-ink)]">
              See Tajir Point
              <br />
              in action.
            </h1>
            <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[440px]">
              One of our product specialists will walk you through a live demo tailored to your
              business type — retail, restaurant, electronics, or services.
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {[
                ["30 minutes", "No commitment, just a focused walkthrough"],
                ["Your vertical", "We customise the demo to your shop type"],
                ["Live Q&A", "Ask anything — pricing, integrations, migration"],
                ["In your language", "English, اردو, or العربية"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center">
                    <Check size={12} color="var(--color-mint)" strokeWidth={2.5} />
                  </span>
                  <div>
                    <span className="text-[15px] font-semibold text-[var(--color-ink)]">
                      {title}
                    </span>
                    <span className="text-[14px] text-[var(--color-muted)] ms-2">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-[var(--color-line)]">
              <p className="text-[13px] text-[var(--color-muted)]">
                Prefer to just explore?{" "}
                <a
                  href="https://app.tajirpoint.com/signup"
                  className="text-[var(--color-ink)] font-semibold underline underline-offset-2 hover:text-[var(--color-mint)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start a free trial →
                </a>
              </p>
            </div>
          </div>

          {/* Right: Calendly embed */}
          <div className="rounded-[24px] border border-[var(--color-line)] overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.07)]">
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
    </main>
  );
}
