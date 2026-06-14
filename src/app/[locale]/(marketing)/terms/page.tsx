import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms and conditions governing your use of Tajir Point products and services. Covers subscriptions, acceptable use, liability, and dispute resolution.",
  path: "/terms",
});

const LAST_UPDATED = "1 May 2025";

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[800px] px-7 lg:px-10 py-20 lg:py-28">
        <span className="text-[13px] font-semibold text-[var(--color-mint)]">Last updated: {LAST_UPDATED}</span>
        <h1 className="mt-4 text-[40px] lg:text-[56px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)]">
          Terms of Service
        </h1>
        <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.7]">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Tajir Point software, applications, and services (&ldquo;Services&rdquo;) provided by Tajir Point (Pvt) Ltd (&ldquo;Tajir Point&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using our Services, you agree to be bound by these Terms.
        </p>

        <div className="mt-14 flex flex-col gap-12 prose-content">
          <LegalSection title="1. Acceptance of terms">
            <p>
              By creating an account or using any Tajir Point service, you confirm that you are at least 18 years old, have the authority to bind the business you represent, and agree to these Terms and our Privacy Policy. If you do not agree, do not use our Services.
            </p>
          </LegalSection>

          <LegalSection title="2. Account registration">
            <p>
              You must provide accurate, complete, and up-to-date information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:security@tajirpoint.com" className="text-[var(--color-mint)] hover:underline">security@tajirpoint.com</a> if you suspect unauthorised access.
            </p>
          </LegalSection>

          <LegalSection title="3. Subscription and payment">
            <ul>
              <li>Plans are billed monthly or annually in advance. All fees are non-refundable except as required by law.</li>
              <li>Prices are listed in PKR (Pakistan), AED (UAE), and SAR (Saudi Arabia) inclusive of applicable taxes.</li>
              <li>We may change pricing with 30 days' notice. Continued use after the effective date constitutes acceptance.</li>
              <li>Failure to pay may result in suspension of your account. Data is retained for 30 days after suspension before deletion.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Acceptable use">
            <p>You agree not to:</p>
            <ul>
              <li>Use our Services for any unlawful purpose or in violation of applicable regulations (FBR, ZATCA, AML/CFT, etc.).</li>
              <li>Reverse-engineer, decompile, or attempt to extract source code from our software.</li>
              <li>Transmit viruses, malware, or any harmful code through our platform.</li>
              <li>Resell, sublicense, or redistribute access to our Services without written permission.</li>
              <li>Use automated tools to scrape, crawl, or stress-test our infrastructure.</li>
              <li>Impersonate another person or business.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Intellectual property">
            <p>
              Tajir Point and its licensors own all intellectual property in the Services, including software, design, trademarks, and documentation. These Terms do not grant you any ownership rights. You retain ownership of your business data — we are merely a processor.
            </p>
          </LegalSection>

          <LegalSection title="6. Your data">
            <p>
              You grant us a limited, non-exclusive licence to host, process, and transmit your data solely to provide the Services. We will not use your data for any other purpose. You may export or delete your data at any time. Refer to our Privacy Policy for full details.
            </p>
          </LegalSection>

          <LegalSection title="7. Uptime and availability">
            <p>
              We target 99.9% monthly uptime for cloud-synced features. Core POS and inventory features work offline and are not subject to the uptime SLA. Planned maintenance is excluded from downtime calculations. Status information is available at <a href="https://status.tajirpoint.com" className="text-[var(--color-mint)] hover:underline" target="_blank" rel="noopener noreferrer">status.tajirpoint.com</a>.
            </p>
          </LegalSection>

          <LegalSection title="8. Limitation of liability">
            <p>
              To the maximum extent permitted by law, Tajir Point&apos;s total liability to you for any claim arising from these Terms or the Services shall not exceed the fees you paid in the 12 months prior to the claim. We are not liable for indirect, incidental, special, or consequential damages, including loss of profits or data.
            </p>
          </LegalSection>

          <LegalSection title="9. Indemnification">
            <p>
              You agree to indemnify and hold harmless Tajir Point, its officers, employees, and partners from any claim, liability, or expense (including legal fees) arising from your use of the Services, your violation of these Terms, or your violation of any third-party rights.
            </p>
          </LegalSection>

          <LegalSection title="10. Termination">
            <p>
              You may cancel your account at any time from the dashboard. We may suspend or terminate your account immediately if you breach these Terms. Upon termination, your access ceases and we will delete your data after a 30-day grace period (unless legal retention applies).
            </p>
          </LegalSection>

          <LegalSection title="11. Governing law">
            <p>
              These Terms are governed by the laws of Pakistan. Any disputes shall be resolved exclusively in the courts of Karachi, Pakistan. For customers in the UAE or Saudi Arabia, disputes may also be resolved through the DIFC courts or SAMA arbitration as applicable.
            </p>
          </LegalSection>

          <LegalSection title="12. Changes to terms">
            <p>
              We may update these Terms periodically. We will provide at least 14 days&apos; notice of material changes via email or in-app notification. Continued use after the effective date constitutes acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection title="13. Contact">
            <p>For questions about these Terms, contact:</p>
            <ul>
              <li>Email: <a href="mailto:legal@tajirpoint.com" className="text-[var(--color-mint)] hover:underline">legal@tajirpoint.com</a></li>
              <li>Address: Shaheed-e-Millat Road, PECHS, Karachi 75400, Pakistan</li>
            </ul>
          </LegalSection>
        </div>
      </div>

      <style>{`
        .prose-content p { font-size: 15.5px; color: var(--color-muted); line-height: 1.7; margin-bottom: 14px; }
        .prose-content ul { margin: 10px 0 14px 1.4rem; list-style: disc; }
        .prose-content li { font-size: 15px; color: var(--color-muted); line-height: 1.65; margin-bottom: 6px; }
        .prose-content strong { color: var(--color-ink); font-weight: 600; }
      `}</style>
    </main>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--color-ink)] mb-4 pb-3 border-b border-[var(--color-line)]">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
