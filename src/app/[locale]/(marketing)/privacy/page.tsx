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
import { legal } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Privacy Policy",
    description:
      "How TajirPoint collects, uses, shares and protects personal data — for merchants, their customers, riders and website visitors — and how to exercise your rights.",
    path: "/privacy",
    locale,
  });
}

const S = defineSections({
  "who-we-are": "Who we are and what this policy covers",
  roles: "Our two roles: controller and processor",
  collect: "Information we collect",
  use: "How we use information",
  "marketing-site": "Our website, ads and campaign tracking",
  location: "Location data",
  ai: "Optional AI features",
  providers: "Service providers we use",
  sharing: "When we share information",
  transfers: "International transfers",
  retention: "How long we keep information",
  security: "Security",
  rights: "Your rights",
  gdpr: "EU and UK users (GDPR)",
  pakistan: "Pakistan",
  "merchant-customers": "If you are a customer of a shop that uses TajirPoint",
  children: "Children",
  cookies: "Cookies",
  changes: "Changes to this policy",
  contact: "Contact us",
});

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPage
      title="Privacy Policy"
      toc={Object.values(S)}
      intro={
        <p>
          This policy explains what personal data {legal.product} collects, why, who we share it
          with, how long we keep it and the choices you have. It applies to our website, the{" "}
          {legal.product} web, desktop and Android apps, and the order pages and shop websites we
          host for merchants.
        </p>
      }
    >
      <LegalNote title="The short version">
        <ul>
          <li>
            Merchants own their business data. For their customers’ data, the merchant decides how
            it is used and we process it for them.
          </li>
          <li>
            We collect what we need to run {legal.product}, bill for it, support you and improve it
            — plus, on our website, which ad or link brought you to us.
          </li>
          <li>
            Location is only used in the rider app while a rider is on shift, and on order pages if
            a customer chooses to share it for delivery.
          </li>
          <li>
            You can export your data any time and ask us to delete it. Email{" "}
            <MailLink email={legal.privacyEmail} />.
          </li>
        </ul>
      </LegalNote>

      <LegalSection {...S["who-we-are"]}>
        <p>
          {legal.product} is a product of{" "}
          <a href={legal.operatorUrl} target="_blank" rel="noopener noreferrer">
            {legal.operator}
          </a>
          , {legal.city}, {legal.country} (“we”, “us”). This policy covers:
        </p>
        <ul>
          <li>
            <strong>Merchants</strong> — businesses that sign up for {legal.product}, and their
            owners and staff who use it;
          </li>
          <li>
            <strong>Riders</strong> — delivery riders who use the rider app;
          </li>
          <li>
            <strong>Customers of merchants</strong> — people who buy from a shop that uses{" "}
            {legal.product}, including through its order page or shop website;
          </li>
          <li>
            <strong>Visitors and leads</strong> — people who visit tajirpoint.com, book a demo or
            contact us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.roles}>
        <p>
          <strong>When the merchant is in charge.</strong> When a merchant enters data about its own
          customers, suppliers and staff into {legal.product} (for example names, phone numbers,
          addresses, orders and khata (credit) balances), the merchant is the <em>controller</em> of
          that data. We act as its <em>processor</em>: we store and process the data on the
          merchant’s behalf and on its instructions, to provide the service. The merchant’s own
          privacy notice applies to that data.
        </p>
        <p>
          <strong>When we are in charge.</strong> {legal.operator} is the controller of merchant
          account data (who signed up, logins, billing), rider accounts, website visitor data, and
          the details people send us when they book a demo or contact us.
        </p>
      </LegalSection>

      <LegalSection {...S.collect}>
        <h3>Account data</h3>
        <p>
          Name, email address, phone number, business name and type, city and country, and the
          logins and roles of staff users you create.
        </p>
        <h3>Billing data</h3>
        <p>
          Card payments for subscriptions are handled by Lemon Squeezy. We see your plan, the
          amount, the payment status and similar billing details — not your full card number. If you
          pay by invoice, we keep the invoice and payment records.
        </p>
        <h3>Business data you enter</h3>
        <p>
          Products, stock, prices, sales, purchases, expenses, customers, suppliers, ledgers,
          orders, deliveries and the other records you keep in {legal.product}. We process this on
          your behalf (see section 2).
        </p>
        <h3>Device and usage data</h3>
        <p>
          IP address, browser and device type, operating system and app version, app logs and error
          reports, and how features are used. We use this to run, secure and fix the service.
        </p>
        <h3>Location data</h3>
        <p>
          Only in the rider/delivery app while a rider is on shift, and on order pages when a
          customer chooses to share their location for delivery. See section 6.
        </p>
        <h3>Communications</h3>
        <p>Support emails, WhatsApp messages and other messages you send us, and our replies.</p>
        <h3>Website and lead data</h3>
        <p>
          When you book a demo or contact us: your name, phone/WhatsApp number, email, business
          details, preferred time and message. We also record how you found us — campaign parameters
          (utm_source, utm_medium, utm_campaign, utm_content), the Facebook click ID (fbclid), the
          landing page and the referring site. See section 5.
        </p>
      </LegalSection>

      <LegalSection {...S.use}>
        <p>We use personal data to:</p>
        <ul>
          <li>create and run your account and provide the features you use;</li>
          <li>sync your data between devices and keep offline sales safe until they sync;</li>
          <li>process subscription payments, send invoices and manage renewals;</li>
          <li>
            send service messages — for example receipts, plan reminders and notices about your
            account;
          </li>
          <li>answer questions, give support and help move your data from your old system;</li>
          <li>keep {legal.product} secure, prevent fraud and abuse, and fix errors;</li>
          <li>understand how {legal.product} is used so we can improve it;</li>
          <li>
            follow up on demo requests and send product news or offers — you can unsubscribe at any
            time using the link in the email or by contacting us;
          </li>
          <li>comply with the law, including tax and accounting rules.</li>
        </ul>
      </LegalSection>

      <LegalSection {...S["marketing-site"]}>
        <p>
          On tajirpoint.com we may use Google Analytics and Google Tag Manager to understand how the
          site is used, and the Meta Pixel to measure our Facebook and Instagram ads. During a visit
          we remember the campaign parameters you arrived with, so that if you book a demo we know
          which ad or link brought you. Details, and how to opt out, are in our{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection {...S.location}>
        <ul>
          <li>
            <strong>Riders:</strong> the rider app collects the device’s location while the rider is
            on shift, so the merchant can assign and track deliveries. It is not collected when the
            rider is off shift.
          </li>
          <li>
            <strong>Customers ordering online:</strong> an order page may ask for your location to
            help with delivery. Sharing it is your choice.
          </li>
        </ul>
        <p>Maps and location features use Google Maps Platform.</p>
      </LegalSection>

      <LegalSection {...S.ai}>
        <p>
          Some features use third-party AI model providers — for example AI phone ordering, the
          WhatsApp ordering assistant and AI image generation. These features are optional and are
          off unless a merchant switches them on. When they are on, the content needed for the
          feature (such as a customer’s call audio or messages, the menu or product details, or an
          image prompt) is sent to the provider to produce the result. Providers may include OpenAI,
          Google, OpenRouter and, for voice, ElevenLabs.
        </p>
      </LegalSection>

      <LegalSection {...S.providers}>
        <p>
          We use trusted service providers to run {legal.product}. They may process personal data
          for us, only to provide their service:
        </p>
        <ul>
          <li>
            <strong>Cloud hosting and infrastructure</strong> — our servers run on rented cloud
            servers; our websites are served via Vercel and Cloudflare.
          </li>
          <li>
            <strong>Email delivery</strong> — the email service of Zoho.
          </li>
          <li>
            <strong>Subscription payments</strong> — Lemon Squeezy.
          </li>
          <li>
            <strong>Payment gateways a merchant connects</strong> — for example Stripe or PayPal,
            chosen by the merchant to take payments from its own customers.
          </li>
          <li>
            <strong>Website analytics and advertising</strong> — Google Analytics, Google Tag
            Manager and Meta Pixel.
          </li>
          <li>
            <strong>Maps and location</strong> — Google Maps Platform.
          </li>
          <li>
            <strong>SMS, voice and WhatsApp messaging</strong> — for example Twilio, and
            WhatsApp/Meta for WhatsApp messages.
          </li>
          <li>
            <strong>Push notifications</strong> in the mobile apps — Google Firebase Cloud
            Messaging.
          </li>
          <li>
            <strong>Error monitoring</strong> — to detect and fix crashes and bugs.
          </li>
          <li>
            <strong>AI model providers</strong> — only for the optional AI features in section 7.
          </li>
        </ul>
        <p>
          This list can change. An up-to-date list is available on request at <MailLink />.
        </p>
      </LegalSection>

      <LegalSection {...S.sharing}>
        <p>We share personal data only:</p>
        <ul>
          <li>with the service providers described above;</li>
          <li>
            with third parties a merchant chooses to connect (for example a payment gateway,
            courier, delivery platform or online store) — on the merchant’s instructions;
          </li>
          <li>
            between a merchant and the people it serves — for example a customer’s order details go
            to the shop, and delivery details go to the assigned rider;
          </li>
          <li>
            when the law requires it, for example in response to a valid request from a court or
            authority, or to protect the rights and safety of our users or {legal.product};
          </li>
          <li>with your consent, or at your direction.</li>
        </ul>
      </LegalSection>

      <LegalSection {...S.transfers}>
        <p>
          We and our providers may process data in countries other than yours — including Pakistan
          and countries where our providers operate, such as the EU, the United States and the
          United Kingdom. Where the law requires it, we rely on appropriate safeguards for these
          transfers, such as standard contractual clauses.
        </p>
      </LegalSection>

      <LegalSection {...S.retention}>
        <ul>
          <li>
            <strong>Account and business data:</strong> while the account is open, and for a
            reasonable period afterwards. After an account is closed we delete or anonymise personal
            data — our target is within 90 days — except what we must keep by law.
          </li>
          <li>
            <strong>Demo and contact requests:</strong> up to 24 months, unless the person becomes a
            customer.
          </li>
          <li>
            <strong>Logs:</strong> typically up to 90 days.
          </li>
          <li>
            <strong>Billing records:</strong> as long as tax and accounting law requires.
          </li>
          <li>
            <strong>Backups</strong> are overwritten on their normal cycle.
          </li>
        </ul>
        <p>
          To delete an account, see <Link href="/delete-account">how to delete your account</Link>.
        </p>
      </LegalSection>

      <LegalSection {...S.security}>
        <p>
          We use reasonable technical and organisational measures to protect personal data,
          including encrypted connections (HTTPS/TLS), hashed passwords, per-user logins with
          role-based permissions, access to production systems limited to authorised personnel,
          regular backups and activity logs for key business actions. No system is 100% secure, so
          we cannot guarantee absolute security. Where the law requires, we will notify affected
          merchants of a personal data breach without undue delay. More on our{" "}
          <Link href="/security">Security page</Link>.
        </p>
      </LegalSection>

      <LegalSection {...S.rights}>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>correct data that is wrong or incomplete;</li>
          <li>ask us to delete it;</li>
          <li>receive a copy in a portable format (export);</li>
          <li>object to, or ask us to restrict, certain processing;</li>
          <li>
            withdraw consent at any time — for example unsubscribe from marketing emails using the
            link in the email;
          </li>
          <li>complain to the data-protection authority in your country.</li>
        </ul>
        <p>
          To exercise a right, email{" "}
          <MailLink email={legal.privacyEmail} subject="Privacy request" />. We may need to confirm
          your identity. We reply within 30 days. Merchants can also export their data at any time
          from the app.
        </p>
      </LegalSection>

      <LegalSection {...S.gdpr}>
        <p>
          If you are in the European Union or the United Kingdom, the GDPR or UK GDPR applies. We
          rely on these legal bases:
        </p>
        <ul>
          <li>
            <strong>Contract</strong> — to provide {legal.product} to merchants and riders;
          </li>
          <li>
            <strong>Legitimate interests</strong> — to secure and improve the service, prevent
            fraud, and follow up on demo requests and business enquiries;
          </li>
          <li>
            <strong>Consent</strong> — for non-essential cookies and, where required, marketing
            messages;
          </li>
          <li>
            <strong>Legal obligation</strong> — for example to keep tax and accounting records.
          </li>
        </ul>
        <p>
          Merchants who need a Data Processing Agreement for their customers’ data can request one
          at <MailLink subject="Data Processing Agreement" />.
        </p>
      </LegalSection>

      <LegalSection {...S.pakistan}>
        <p>
          {legal.operator} is based in {legal.country}. We handle personal data consistently with
          the Prevention of Electronic Crimes Act 2016 (PECA) and any other data-protection law that
          applies to us.
        </p>
      </LegalSection>

      <LegalSection {...S["merchant-customers"]}>
        <p>
          The shop you bought from controls your data in {legal.product} and is the right place to
          send requests about it. If you contact us instead, we will pass your request to that
          merchant and help them respond.
        </p>
      </LegalSection>

      <LegalSection {...S.children}>
        <p>
          {legal.product} is a service for businesses and is not directed at children under 16. Our
          website is not intended for children under 13. We do not knowingly collect children’s
          personal data; if you think we have, contact us and we will delete it. Merchants must not
          use {legal.product} to collect children’s data unlawfully.
        </p>
      </LegalSection>

      <LegalSection {...S.cookies}>
        <p>
          We use cookies and similar storage on our website, web app and order pages. See our{" "}
          <Link href="/cookies">Cookie Policy</Link> for the details and your choices.
        </p>
      </LegalSection>

      <LegalSection {...S.changes}>
        <p>
          We may update this policy from time to time. The date at the top shows when it last
          changed. If we make material changes, we will tell merchants by email or in the app.
        </p>
      </LegalSection>

      <LegalSection {...S.contact}>
        <p>
          {legal.operator}, {legal.city}, {legal.country}
          <br />
          Email: <MailLink email={legal.privacyEmail} />
          <br />
          WhatsApp: <WhatsAppLink />
        </p>
      </LegalSection>
    </LegalPage>
  );
}
