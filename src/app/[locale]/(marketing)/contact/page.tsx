import type { Metadata } from "next";
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
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    title: "Email us",
    desc: "We reply within 24 hours on business days",
    action: "hello@tajirpoint.com",
    href: "mailto:hello@tajirpoint.com",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
        />
      </svg>
    ),
    title: "Live chat",
    desc: "Chat with our team right from the dashboard",
    action: "Open chat →",
    href: siteConfig.dashboardUrl,
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
    title: "Book a demo",
    desc: "30-minute live walkthrough with our team",
    action: "Schedule a call →",
    href: "/book-demo",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
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
                    { label: "Twitter", href: "https://twitter.com/tajirpoint" },
                    { label: "LinkedIn", href: "https://linkedin.com/company/tajirpoint" },
                    { label: "GitHub", href: "https://github.com/tajirpoint" },
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
