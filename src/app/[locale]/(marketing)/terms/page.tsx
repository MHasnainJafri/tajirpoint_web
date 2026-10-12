import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  LegalNote,
  LegalPage,
  LegalSection,
  MailLink,
  WhatsAppLink,
  defineSections,
} from "@/components/legal/LegalPage";
import { legal, siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Terms of Service",
    description:
      "The terms for using TajirPoint: the free Light plan, paid plans and billing, cancellation and refunds, acceptable use, your data, liability and governing law.",
    path: "/terms",
    locale,
  });
}

const S = defineSections({
  acceptance: "Acceptance of these Terms",
  "who-we-are": "Who we are",
  eligibility: "Eligibility",
  accounts: "Your account and logins",
  service: "The service and changes to it",
  "light-plan": "The free Light plan and read-only mode",
  billing: "Paid plans, billing and taxes",
  renewals: "Renewals and failed payments",
  refunds: "Cancellation and refunds",
  "third-party": "Extensions, integrations and third-party services",
  "acceptable-use": "Acceptable use",
  "your-data": "Your data and ownership",
  "customer-data": "Your customers' data",
  availability: "Availability, offline mode and maintenance",
  ip: "Intellectual property",
  feedback: "Feedback",
  confidentiality: "Confidentiality",
  disclaimers: "Disclaimers",
  liability: "Limitation of liability",
  indemnity: "Indemnity",
  termination: "Suspension and termination",
  law: "Governing law and disputes",
  changes: "Changes to these Terms",
  general: "General",
  contact: "Contact",
});

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPage
      title="Terms of Service"
      toc={Object.values(S)}
      intro={
        <p>
          These Terms of Service (“Terms”) are an agreement between you and {legal.operator} (“
          {legal.product}”, “we”, “us”) for your use of {legal.product}. Please read them carefully.
          Our <Link href="/privacy">Privacy Policy</Link>,{" "}
          <Link href="/cookies">Cookie Policy</Link> and{" "}
          <Link href="/refund-policy">Refund & Cancellation Policy</Link> also apply.
        </p>
      }
    >
      <LegalNote title="The short version">
        <ul>
          <li>The Light plan is free for 90 days from the day you create your account.</li>
          <li>
            After that, choose a paid plan to keep adding records. If you don’t, your account
            becomes read-only — you can still sign in, view and export everything.
          </li>
          <li>You own your business data and can export it at any time.</li>
          <li>Cancel any time; you can ask for a refund within 15 days of a payment.</li>
          <li>Don’t use {legal.product} for anything illegal, fraudulent or spammy.</li>
        </ul>
        <p className="mt-3">This summary is for convenience; the full Terms below apply.</p>
      </LegalNote>

      <LegalSection {...S.acceptance}>
        <p>
          By creating an account, signing in, or otherwise using {legal.product} (including our web
          app at app.tajirpoint.com, our Windows desktop app, our Android apps, and the order pages
          and shop websites we host for you), you agree to these Terms on behalf of yourself and the
          business you represent (“you”). If you do not agree, do not use {legal.product}.
        </p>
      </LegalSection>

      <LegalSection {...S["who-we-are"]}>
        <p>
          {legal.product} is a product of{" "}
          <a href={legal.operatorUrl} target="_blank" rel="noopener noreferrer">
            {legal.operator}
          </a>
          , a company based in {legal.city}, {legal.country}. You can reach us at <MailLink /> or on
          WhatsApp at <WhatsAppLink />.
        </p>
      </LegalSection>

      <LegalSection {...S.eligibility}>
        <p>
          {legal.product} is a tool for businesses. To use it you must be at least 18 years old and
          have the authority to accept these Terms for the business you register. If you sign up for
          an organisation, “you” means that organisation.
        </p>
      </LegalSection>

      <LegalSection {...S.accounts}>
        <ul>
          <li>Give us accurate account details and keep them up to date.</li>
          <li>
            Give each staff member their own login and only the permissions they need. Do not share
            passwords.
          </li>
          <li>
            You are responsible for what happens under your account, including the actions of staff,
            riders and anyone else you give access to.
          </li>
          <li>
            Tell us straight away at <MailLink subject="Security" /> if you think someone has
            accessed your account without permission.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.service}>
        <p>
          {legal.product} is a hosted point-of-sale and business system. Depending on your plan and
          the extensions you switch on, it includes tools for sales (POS), inventory, khata (credit)
          ledgers, purchases, accounting, restaurants (including a kitchen display), online order
          pages and shop websites, delivery and rider management, route and van sales, and reports.
          It is available on the web, on Windows desktop and on Android.
        </p>
        <p>
          We improve {legal.product} continuously, so features may be added, changed or removed. If
          we remove a feature that is a material part of a paid plan you are using, we will give you
          reasonable notice. Plan limits and features are as shown on our{" "}
          <Link href="/pricing">pricing page</Link> at the time you buy, and may change with notice.
        </p>
      </LegalSection>

      <LegalSection {...S["light-plan"]}>
        <p>
          Every new account starts on the <strong>Light</strong> plan, which is{" "}
          <strong>free for 90 days</strong> from the date the account is created. Light includes 1
          shop, 2 staff users, 30 products, 100 orders per day (point-of-sale sales and online
          orders, counted per shop per day), 1 warehouse and a selected set of extensions. Other
          extensions need the Shop plan or above.
        </p>
        <p>
          We will remind you by email and in the app 14 days, 7 days and 1 day before your free
          period ends, and on the day it ends. If the 90 days end and you have not chosen a paid
          plan, your account becomes <strong>read-only</strong>: you can still sign in, view all of
          your data, export it, and choose and pay for a plan, but you cannot create or change
          records until you upgrade.
        </p>
        <p>
          If a paid plan is cancelled or lapses, the account returns to Light. Because Light is free
          only for the first 90 days after sign-up, the account will then normally be read-only
          until you choose a paid plan again.
        </p>
      </LegalSection>

      <LegalSection {...S.billing}>
        <ul>
          <li>
            Our current plans are Light, Shop, Business and Enterprise. Plan names, prices and
            limits are shown on the <Link href="/pricing">pricing page</Link>.
          </li>
          <li>
            Shop and Business are paid plans, billed monthly or annually in advance, in US dollars.
            Invoices in Pakistani rupees (payable by bank transfer, JazzCash or Easypaisa) are
            available on request. Enterprise is priced by custom quote and may be covered by a
            separate written agreement.
          </li>
          <li>
            Online card payments for {legal.product} subscriptions are processed by Lemon Squeezy,
            which acts as the merchant of record (reseller) for those payments. Lemon Squeezy’s own
            terms and privacy notice also apply to that payment.
          </li>
          <li>
            Prices do not include taxes unless stated. Applicable sales tax, VAT or similar taxes
            may be added at checkout or on your invoice.
          </li>
          <li>
            We may change our prices. A price increase will not apply to a period you have already
            paid for, and we will tell you at least 30 days before it applies to your next renewal.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.renewals}>
        <p>
          Paid plans renew automatically at the end of each billing period until you cancel. If a
          renewal payment fails, you have a <strong>14-day grace period</strong> to update your
          payment details or pay the invoice. After that, your account is restricted until the
          payment is made.
        </p>
      </LegalSection>

      <LegalSection {...S.refunds}>
        <p>
          You can cancel a paid plan at any time from the billing screen in the app or by contacting
          us. Your plan stays active until the end of the period you have already paid for and is
          not renewed after that.
        </p>
        <p>
          You may ask for a refund of a subscription payment within 15 days of that payment. After
          15 days, fees are non-refundable except where the law requires otherwise. Full details,
          including annual plans, extensions and how refunds are paid, are in our{" "}
          <Link href="/refund-policy">Refund & Cancellation Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection {...S["third-party"]}>
        <p>
          You can add extensions (add-ons) to {legal.product} and connect third-party services — for
          example payment gateways such as Stripe or PayPal, delivery platforms and couriers, online
          store platforms, messaging providers and AI features. When you do:
        </p>
        <ul>
          <li>
            Your relationship with that third party is governed by its own terms and privacy policy.
            A payment gateway you connect for your customers is a contract between you and that
            provider.
          </li>
          <li>You authorise us to exchange the data needed to make the integration work.</li>
          <li>
            We are not responsible for third-party services, including their availability, fees, the
            goods or deliveries they handle, or how they use data. If a third party changes or
            withdraws its service, the integration may stop working.
          </li>
        </ul>
        <p>Paid extensions are billed and refunded on the same basis as subscriptions.</p>
      </LegalSection>

      <LegalSection {...S["acceptable-use"]}>
        <p>You agree not to, and not to let anyone else:</p>
        <ul>
          <li>
            sell or promote illegal goods or services, or use {legal.product} for any unlawful
            purpose;
          </li>
          <li>commit or facilitate fraud, money laundering or deceptive practices;</li>
          <li>
            send spam or unsolicited messages through our SMS, WhatsApp, voice or email features, or
            message people who have not agreed to hear from you where consent is required;
          </li>
          <li>
            upload or publish content that infringes someone else’s rights, or that is unlawful,
            defamatory or harmful;
          </li>
          <li>
            reverse-engineer, decompile or copy our software, scrape or crawl the service, probe or
            test its security without our permission, or overload or disrupt it;
          </li>
          <li>upload viruses or other malicious code;</li>
          <li>
            resell, sublicense or share access to {legal.product} without a written agreement with
            us;
          </li>
          <li>
            try to get around plan limits, the read-only mode or other technical restrictions;
          </li>
          <li>impersonate another person or business.</li>
        </ul>
        <p>
          You must comply with the tax, consumer-protection, data-protection and other laws that
          apply to your business in your country. You are responsible for your customers’ data that
          you put into {legal.product}, and for the accuracy of your tax settings, prices and
          receipts.
        </p>
      </LegalSection>

      <LegalSection {...S["your-data"]}>
        <ul>
          <li>
            <strong>You own your business data</strong> — products, sales, customers, suppliers,
            ledgers, reports and everything else you enter.
          </li>
          <li>
            You give us a limited licence to host, copy, process and display that data only as
            needed to provide, secure and support {legal.product} for you, and as described in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </li>
          <li>
            You can export your data at any time, including while your account is read-only, using
            the export tools in the app, or by asking us at <MailLink />.
          </li>
          <li>
            You can ask us to delete your account and data — see{" "}
            <Link href="/delete-account">how to delete your account</Link>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S["customer-data"]}>
        <p>
          For personal data about your own customers, suppliers and staff that you enter into{" "}
          {legal.product} (for example names, phone numbers, addresses, orders and khata balances),
          you are the controller and we process it on your behalf and on your instructions. You are
          responsible for having a lawful basis to collect and use it, for giving any notices your
          customers are entitled to, and for answering their requests. We will pass on to you any
          request we receive from your customers about their data. A Data Processing Agreement is
          available on request.
        </p>
      </LegalSection>

      <LegalSection {...S.availability}>
        <p>
          We work hard to keep {legal.product} available and reliable, but we do not guarantee that
          it will be uninterrupted or error-free. The point of sale can keep recording sales during
          an internet outage and syncs them when the connection returns; other features need a
          connection. We may need to carry out maintenance, and we try to do this at quiet times. No
          uptime commitment or service credit applies unless it is agreed in a written Enterprise
          agreement.
        </p>
      </LegalSection>

      <LegalSection {...S.ip}>
        <p>
          {legal.product}, including its software, apps, design, documentation and brand, belongs to{" "}
          {legal.operator} and its licensors. We give you a limited, non-exclusive, non-transferable
          right to use it for your business while your account is in good standing. These Terms do
          not transfer any of our intellectual property to you.
        </p>
      </LegalSection>

      <LegalSection {...S.feedback}>
        <p>
          If you send us ideas or suggestions, we may use them to improve {legal.product} without
          any obligation to you.
        </p>
      </LegalSection>

      <LegalSection {...S.confidentiality}>
        <p>
          Each of us will keep the other’s non-public business information confidential and use it
          only for the purposes of this agreement, except where disclosure is required by law. Your
          business data is treated as your confidential information.
        </p>
      </LegalSection>

      <LegalSection {...S.disclaimers}>
        <p>
          {legal.product} is provided “as is” and “as available”. To the extent the law allows, we
          disclaim implied warranties such as fitness for a particular purpose.
        </p>
        <p>
          Tax, accounting, invoicing and tax-authority (for example FBR) features are tools to help
          you. They are not tax, legal or accounting advice. You remain responsible for your tax
          settings, your records and your filings, and for checking them with a qualified adviser
          where needed.
        </p>
      </LegalSection>

      <LegalSection {...S.liability}>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>
            we are not liable for indirect, incidental, special or consequential losses, or for loss
            of profits, revenue, goodwill or data;
          </li>
          <li>
            our total liability for all claims relating to {legal.product} or these Terms is limited
            to the fees you paid us in the 12 months before the event giving rise to the claim — or,
            if you have only used the free Light plan, USD 100.
          </li>
        </ul>
        <p>
          Nothing in these Terms limits liability that cannot be limited by law, such as liability
          for fraud, or removes mandatory rights you have under the consumer or data-protection laws
          of your own country.
        </p>
      </LegalSection>

      <LegalSection {...S.indemnity}>
        <p>
          You will compensate {legal.operator} for claims, losses and reasonable costs (including
          legal fees) arising from your breach of these Terms, your unlawful use of {legal.product},
          or the data and content you put into it, including claims by your customers.
        </p>
      </LegalSection>

      <LegalSection {...S.termination}>
        <p>
          You can stop using {legal.product} and cancel at any time. We may suspend or close your
          account if you seriously or repeatedly breach these Terms, do not pay, or if we must do so
          by law or to protect {legal.product} or other users. Where reasonable, we will warn you
          first and give you a chance to fix the problem and export your data.
        </p>
        <p>
          After an account is closed, we delete or anonymise its personal data within a reasonable
          period — our target is within 90 days — except records we must keep by law, such as tax
          and accounting records of payments made to us. Backups are overwritten on their normal
          cycle. Sections that by their nature should survive (such as liability, indemnity and
          governing law) continue after termination.
        </p>
      </LegalSection>

      <LegalSection {...S.law}>
        <p>
          These Terms are governed by {legal.governingLaw}. If a dispute arises, please contact us
          first — most problems can be solved quickly and informally. If we cannot resolve it
          informally, the dispute will be subject to the exclusive jurisdiction of {legal.courts}.
          This does not remove any mandatory consumer or data-protection rights you have under the
          law of your own country.
        </p>
      </LegalSection>

      <LegalSection {...S.changes}>
        <p>
          We may update these Terms from time to time. We will give you at least 14 days’ notice of
          material changes by email or in the app before they take effect. If you keep using{" "}
          {legal.product} after that, the updated Terms apply. If you do not agree, you can cancel
          before the changes take effect.
        </p>
      </LegalSection>

      <LegalSection {...S.general}>
        <p>
          These Terms, together with the policies linked above and any written order or Enterprise
          agreement, are the whole agreement between us about {legal.product}. If any part is found
          unenforceable, the rest stays in effect. If we do not enforce a right straight away, we do
          not lose it. You may not transfer this agreement without our consent.
        </p>
      </LegalSection>

      <LegalSection {...S.contact}>
        <p>
          {legal.operator}, {legal.city}, {legal.country}
          <br />
          Email: <MailLink />
          <br />
          WhatsApp: <WhatsAppLink />
          <br />
          Web app: <a href={siteConfig.dashboardUrl}>app.tajirpoint.com</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
