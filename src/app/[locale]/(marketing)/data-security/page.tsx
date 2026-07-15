import type { Metadata } from "next";
import Link from "next/link";
import { PillBadge } from "@/components/design/primitives";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Security — Enterprise-Grade Protection",
  description:
    "Tajir Point's security infrastructure — AES-256 encryption, zero-trust access controls, security practices aligned with SOC 2 and ISO 27001, and a documented incident response plan.",
  path: "/data-security",
});

const CONTROLS = [
  {
    category: "Encryption",
    items: [
      { label: "Data at rest", value: "AES-256, key rotation every 90 days" },
      { label: "Data in transit", value: "TLS 1.3 (1.2 minimum, older disabled)" },
      { label: "Database backups", value: "Encrypted before leaving primary region" },
      { label: "Key management", value: "AWS KMS with hardware-backed HSM" },
    ],
  },
  {
    category: "Access control",
    items: [
      { label: "Internal access", value: "Zero-trust, MFA required for all staff" },
      { label: "Production access", value: "Break-glass with full audit log, reviewed monthly" },
      { label: "API authentication", value: "OAuth 2.0, short-lived tokens (1-hour TTL)" },
      { label: "Merchant roles", value: "Granular RBAC — cashier, manager, owner, API" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { label: "Cloud provider", value: "AWS — practices aligned with ISO 27001 & SOC 2" },
      { label: "Uptime SLA", value: "99.9% monthly (cloud sync). POS works offline." },
      { label: "Backups", value: "Daily, geo-redundant, 30-day retention" },
      { label: "DDoS protection", value: "AWS Shield Standard + CloudFront WAF" },
    ],
  },
  {
    category: "Testing & audits",
    items: [
      { label: "Penetration testing", value: "Regular internal security reviews" },
      { label: "Dependency scanning", value: "Automated daily via Snyk + Dependabot" },
      { label: "SAST / DAST", value: "Integrated in CI/CD — every pull request" },
      { label: "Bug bounty", value: "Responsible disclosure via security@tajirpoint.com" },
    ],
  },
];

const CERTIFICATIONS = [
  { name: "ISO 27001 practices", desc: "Aligned to the standard" },
  { name: "SOC 2 practices", desc: "Aligned to the standard" },
  { name: "AWS infrastructure", desc: "Hosted on AWS" },
  { name: "ZATCA e-invoicing", desc: "Saudi e-invoicing support" },
  { name: "FBR integration", desc: "Pakistan POS-IRN support" },
];

const INCIDENT_STEPS = [
  {
    time: "0–1 hr",
    action: "Detect & contain",
    desc: "Automated alerts triage and isolate affected systems.",
  },
  {
    time: "1–4 hr",
    action: "Assess & notify",
    desc: "Severity assessed. Affected merchants notified via email and in-app.",
  },
  {
    time: "4–24 hr",
    action: "Remediate",
    desc: "Root cause fixed, patch deployed, access reviewed.",
  },
  {
    time: "Post-incident",
    action: "Report & improve",
    desc: "Full post-mortem published on status.tajirpoint.com.",
  },
];

export default function DataSecurityPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-[150px] lg:pb-20">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-7 lg:px-10">
          <PillBadge>Data Security</PillBadge>
          <h1 className="mt-6 max-w-[760px] text-[clamp(40px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            Enterprise-grade security
            <br />
            for every merchant.
          </h1>
          <p className="mt-5 max-w-[520px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            From a single kiryana to a 50-branch chain — every merchant gets the same AES-256
            encryption, zero-trust access controls, and 99.9% uptime SLA.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="mailto:security@tajirpoint.com"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
            >
              Report a vulnerability →
            </a>
            <span className="text-[var(--color-muted-3)]">·</span>
            <Link
              href="/data-privacy"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Data Privacy →
            </Link>
          </div>
        </div>
      </section>

      {/* Security controls */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CONTROLS.map((group) => (
              <div
                key={group.category}
                className="overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white/[0.025]"
              >
                <div className="border-b border-[var(--color-line)] bg-white/[0.04] px-6 py-4">
                  <h3 className="font-mono text-[12px] uppercase tracking-[2px] text-[var(--color-mint-2)]">
                    {group.category}
                  </h3>
                </div>
                <div className="divide-y divide-[var(--color-line)]">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 px-6 py-4"
                    >
                      <span className="shrink-0 text-[13.5px] text-[var(--color-muted)]">
                        {item.label}
                      </span>
                      <span className="text-end text-[13.5px] font-semibold text-[var(--color-ink)]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-2)] py-16">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="mb-6 text-[20px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
            Standards & compliance
          </h2>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint-soft)] text-[9px] font-bold text-[var(--color-mint)] ring-1 ring-[var(--color-mint-line)]">
                  ✓
                </span>
                <div>
                  <div className="text-[13.5px] font-bold text-[var(--color-ink)]">{c.name}</div>
                  <div className="text-[11.5px] text-[var(--color-muted-2)]">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident response */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] lg:text-[36px]">
                Incident response
              </h2>
              <p className="text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
                We have a documented incident response plan. If something goes wrong, you'll know —
                fast. Every security incident is triaged, contained, and disclosed transparently.
              </p>
              <a
                href="https://status.tajirpoint.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
              >
                Live status page →
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {INCIDENT_STEPS.map((step, i) => (
                <div
                  key={step.time}
                  className="flex items-start gap-4 rounded-[16px] border border-[var(--color-line)] bg-white/[0.025] p-5"
                >
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-mint)] text-[11px] font-bold text-[var(--color-mint-ink)]">
                      {i + 1}
                    </span>
                    {i < INCIDENT_STEPS.length - 1 && (
                      <span className="h-4 w-px bg-[var(--color-line-2)]" />
                    )}
                  </div>
                  <div>
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[var(--color-ink)]">
                        {step.action}
                      </span>
                      <span className="rounded-full border border-[var(--color-line-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-muted-2)]">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-2)] py-14">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="max-w-[600px]">
            <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
              Found a vulnerability?
            </h2>
            <p className="mb-5 text-[15px] leading-[1.65] text-[var(--color-muted)]">
              We welcome responsible disclosure. Email{" "}
              <a
                href="mailto:security@tajirpoint.com"
                className="font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
              >
                security@tajirpoint.com
              </a>{" "}
              with a description and reproduction steps. We'll acknowledge within 24 hours, keep you
              informed, and never pursue legal action against good-faith researchers.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/security"
                className="text-[13.5px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                Security overview →
              </Link>
              <span className="text-[var(--color-muted-3)]">·</span>
              <Link
                href="/data-privacy"
                className="text-[13.5px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                Data privacy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
