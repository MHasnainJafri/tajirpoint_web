import type { Metadata } from "next";
import { BookOpen, CalendarDays, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Tajir Point — Talk to Our Team",
  description:
    "Get in touch with the Tajir Point team. Book a demo, ask about pricing, or get support. We're here to help merchants in Pakistan, UAE, and Saudi Arabia.",
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
    href: "/book-demo",
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
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Get in touch
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)]">
            We&apos;d love to hear
            <br />
            from you.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[500px]">
            Whether you have a question about features, pricing, need a demo, or just want to say
            hello — we&apos;re ready.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {CONTACT_OPTIONS.map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-4 rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6 hover:border-[var(--color-mint)] hover:shadow-[0_4px_24px_rgba(0,210,122,0.1)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)]">
                  {opt.icon}
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[var(--color-ink)] mb-1">
                    {opt.title}
                  </div>
                  <div className="text-[13.5px] text-[var(--color-muted)] leading-[1.5]">
                    {opt.desc}
                  </div>
                </div>
                <div className="mt-auto text-[13.5px] font-semibold text-[var(--color-mint)] group-hover:underline underline-offset-2">
                  {opt.action}
                </div>
              </a>
            ))}
          </div>

          {/* Two column: form + offices */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-20">
            {/* Contact form */}
            <div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-8">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Offices */}
            <div className="lg:pt-2">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--color-ink)] mb-6">
                Our offices
              </h2>
              <div className="flex flex-col gap-4 mb-10">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xl">{o.flag}</span>
                      <span className="font-bold text-[15px] text-[var(--color-ink)]">
                        {o.city}
                      </span>
                      <span className="text-[12px] text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-2.5 py-0.5">
                        {o.country}
                      </span>
                    </div>
                    <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.5]">
                      {o.address}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                <h3 className="font-bold text-[15px] text-[var(--color-ink)] mb-2">
                  Support hours
                </h3>
                <ul className="flex flex-col gap-1.5 text-[13.5px] text-[var(--color-muted)]">
                  <li className="flex justify-between">
                    <span>Pakistan (PKT)</span>
                    <span className="font-medium text-[var(--color-ink)]">9am – 6pm, Mon–Sat</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UAE (GST)</span>
                    <span className="font-medium text-[var(--color-ink)]">9am – 6pm, Mon–Fri</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Email</span>
                    <span className="font-medium text-[var(--color-ink)]">24h response SLA</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-line)]">
                <p className="text-[13px] text-[var(--color-muted)] mb-3">Follow us</p>
                <div className="flex gap-3">
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
                      className="text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors border border-[var(--color-line)] rounded-full px-3.5 py-1.5"
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
    </main>
  );
}
