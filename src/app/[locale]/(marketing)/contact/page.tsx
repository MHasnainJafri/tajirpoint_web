import type { Metadata } from "next";
import { BookOpen, CalendarDays, Mail, MessageCircle } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Tajir Point — Talk to Our Team",
  description:
    "Get in touch with the Tajir Point team. Book a demo, ask about pricing, or get support. We're here to help merchants everywhere they sell.",
  path: "/contact",
});

const CONTACT_OPTIONS = [
  {
    icon: <Mail size={22} strokeWidth={1.8} />,
    title: "Email us",
    desc: "We reply within 24 hours on business days",
    action: "hello@tajirpoint.com",
    href: "mailto:hello@tajirpoint.com",
  },
  {
    icon: <MessageCircle size={22} strokeWidth={1.8} />,
    title: "Live chat",
    desc: "Chat with our team right from the dashboard",
    action: "Open chat →",
    href: siteConfig.dashboardUrl,
  },
  {
    icon: <CalendarDays size={22} strokeWidth={1.8} />,
    title: "Book a demo",
    desc: "30-minute live walkthrough with our team",
    action: "Schedule a call →",
    href: siteConfig.calendlyUrl,
  },
  {
    icon: <BookOpen size={22} strokeWidth={1.8} />,
    title: "Documentation",
    desc: "Self-serve guides, API reference, and tutorials",
    action: "Browse docs →",
    href: siteConfig.docsUrl,
  },
];

const OFFICES = [
  {
    city: "Karachi",
    country: "Pakistan",
    flag: "🇵🇰",
    address: "Shaheed-e-Millat Road, PECHS, Karachi 75400",
  },
  { city: "Dubai", country: "UAE", flag: "🇦🇪", address: "Dubai Silicon Oasis, Dubai, UAE" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-14 pt-[150px] text-center md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>Get in touch</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.4vw,64px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
          We&apos;d love to hear
          <br />
          <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
            from you.
          </span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[540px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[18px] leading-[1.6] text-[rgba(242,247,244,.64)]">
          Whether you have a question about features, pricing, need a demo, or just want to say
          hello — we&apos;re ready.
        </p>
      </section>

      {/* ── Contact options ─────────────────────────────────────────── */}
      <section className="px-5 pb-[110px] md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_OPTIONS.map((opt, i) => (
              <a
                key={opt.title}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-reveal
                data-reveal-delay={i * 70}
                className="group flex flex-col gap-4 rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-[26px] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,210,122,.25)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
                  {opt.icon}
                </span>
                <div>
                  <div className="text-[16px] font-bold tracking-[-0.01em]">{opt.title}</div>
                  <div className="mt-[8px] text-[13.5px] leading-[1.6] text-[rgba(242,247,244,.58)]">
                    {opt.desc}
                  </div>
                </div>
                <div className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint-2)] underline-offset-2 group-hover:underline">
                  {opt.action}
                </div>
              </a>
            ))}
          </div>

          {/* ── Form + offices ────────────────────────────────────────── */}
          <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_380px] lg:gap-20">
            <div>
              <h2
                data-reveal
                className="mb-8 text-[clamp(28px,3.4vw,36px)] font-extrabold tracking-[-0.035em]"
              >
                Send us a message
              </h2>
              <ContactForm />
            </div>

            <div className="lg:pt-2">
              <h2 className="mb-6 text-[20px] font-bold tracking-[-0.02em]">Our offices</h2>
              <div className="mb-10 flex flex-col gap-[14px]">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className="rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-5"
                  >
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="text-xl">{o.flag}</span>
                      <span className="text-[15px] font-bold">{o.city}</span>
                      <span className="rounded-full border border-[var(--color-line-2)] bg-white/[0.03] px-2.5 py-0.5 text-[11.5px] font-semibold text-[var(--color-muted-2)]">
                        {o.country}
                      </span>
                    </div>
                    <p className="text-[13.5px] leading-[1.55] text-[var(--color-muted)]">
                      {o.address}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-5">
                <h3 className="mb-3 font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)]">
                  Support hours
                </h3>
                <ul className="flex flex-col gap-2 text-[13.5px] text-[var(--color-muted)]">
                  <li className="flex justify-between gap-3">
                    <span>Pakistan (PKT)</span>
                    <span className="font-semibold text-[var(--color-ink)]">
                      9am – 6pm, Mon–Sat
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>UAE (GST)</span>
                    <span className="font-semibold text-[var(--color-ink)]">
                      9am – 6pm, Mon–Fri
                    </span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Email</span>
                    <span className="font-semibold text-[var(--color-ink)]">24h response SLA</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-[var(--color-line-soft)] pt-6">
                <p className="mb-3 font-mono text-[11px] tracking-[2px] text-[var(--color-muted-3)]">
                  Follow us
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "YouTube", href: siteConfig.social.youtube },
                    { label: "Facebook", href: siteConfig.social.facebook },
                    { label: "Instagram", href: siteConfig.social.instagram },
                    { label: "TikTok", href: siteConfig.social.tiktok },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[var(--color-line-2)] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--color-muted)] transition-colors duration-200 hover:border-[rgba(0,210,122,.5)] hover:text-[var(--color-ink-2)]"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
