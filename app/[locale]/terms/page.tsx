import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/molecules/Header';
import { Footer } from '@/components/molecules/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  
  return {
    title: t('terms.title') + ' | TajirPoint',
    description: t('terms.description'),
  };
}

export default function TermsOfServicePage() {
  const t = useTranslations('legal');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            {t('terms.title')}
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: February 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using TajirPoint&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                TajirPoint provides cloud-based point of sale software and related services for businesses. Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Point of sale transactions processing</li>
                <li>Inventory management</li>
                <li>Customer relationship management</li>
                <li>Business analytics and reporting</li>
                <li>Multi-location management</li>
                <li>Offline mode functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To use our services, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Subscription and Payments</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">4.1 Pricing</h3>
              <p className="text-muted-foreground mb-4">
                Subscription fees are based on the plan you select. Prices are subject to change with 30 days notice.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">4.2 Billing</h3>
              <p className="text-muted-foreground mb-4">
                Subscriptions are billed in advance on a monthly or annual basis. Payment is due at the beginning of each billing cycle.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">4.3 Refunds</h3>
              <p className="text-muted-foreground mb-4">
                We offer a 14-day money-back guarantee for new subscriptions. After this period, fees are non-refundable except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Upload malicious code or content</li>
                <li>Resell or redistribute the service without authorization</li>
                <li>Use the service to process prohibited transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Ownership</h2>
              <p className="text-muted-foreground mb-4">
                You retain ownership of all data you input into our system. We do not claim ownership of your business data. You grant us a limited license to use your data solely for providing our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive for 99.9% uptime but do not guarantee uninterrupted service. We are not liable for any downtime or service interruptions. Our offline mode helps ensure business continuity during internet outages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                TajirPoint and its licensors own all intellectual property rights in the service. You may not copy, modify, distribute, sell, or lease any part of our service or software.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, TajirPoint shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
              </p>
              <p className="text-muted-foreground mb-4">
                Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground mb-4">
                You agree to indemnify and hold harmless TajirPoint, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the service or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Termination</h2>
              <p className="text-muted-foreground mb-4">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Your access to the service will be discontinued</li>
                <li>You may export your data within 30 days</li>
                <li>We may delete your data after the 30-day period</li>
                <li>Any outstanding fees become immediately due</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will provide notice of material changes via email or through the service. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TajirPoint is incorporated, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                Any disputes arising from these terms shall first be attempted to be resolved through good-faith negotiation. If unsuccessful, disputes shall be resolved through binding arbitration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-none text-muted-foreground">
                <li>Email: legal@tajirpoint.com</li>
                <li>Address: TajirPoint Inc.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
