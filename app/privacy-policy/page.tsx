import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/app/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | NandedSeva',
  description:
    'Privacy Policy for NandedSeva — how we collect, use, and protect your personal information when you use our home services platform.',
  alternates: { canonical: 'https://www.nandedseva.com/privacy-policy' },
};

const SECTIONS = [
  { id: 'introduction',      title: '1. Introduction' },
  { id: 'what-we-collect',   title: '2. Information We Collect' },
  { id: 'how-we-use',        title: '3. How We Use Your Information' },
  { id: 'data-sharing',      title: '4. Data Sharing' },
  { id: 'data-storage',      title: '5. Data Storage' },
  { id: 'your-rights',       title: '6. Your Rights' },
  { id: 'cookies',           title: '7. Cookies' },
  { id: 'childrens-privacy', title: '8. Children\'s Privacy' },
  { id: 'changes',           title: '9. Changes to Policy' },
  { id: 'contact',           title: '10. Contact' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" sections={SECTIONS}>

      <LegalSection id="introduction" title="1. Introduction">
        <p>
          NandedSeva (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates nandedseva.com, a technology platform
          and marketplace that connects customers with independent home and travel service professionals
          in Nanded, Maharashtra.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and protect your personal
          information when you use our platform, website, or contact us via WhatsApp, phone, or email.
          By using NandedSeva, you agree to the collection and use of information in accordance with
          this policy.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" title="2. Information We Collect">
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Personal Identification:</strong> Name and mobile number provided during booking.</li>
          <li><strong>Location Information:</strong> Address or area within Nanded for service delivery.</li>
          <li><strong>Service Information:</strong> Details of services requested, booking history, and preferences.</li>
          <li><strong>Communication Data:</strong> Messages, WhatsApp chats, and call logs with our team.</li>
          <li><strong>Device &amp; Browser Data:</strong> IP address, browser type, operating system, and pages visited on our website.</li>
          <li><strong>Analytics Data:</strong> Usage patterns and interactions collected via Google Analytics.</li>
        </ul>
        <p>We collect this information only when you voluntarily provide it by submitting a booking request, contacting us, or browsing our website.</p>
      </LegalSection>

      <LegalSection id="how-we-use" title="3. How We Use Your Information">
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>To connect you with the appropriate service professional for your request.</li>
          <li>To confirm, manage, and follow up on your bookings.</li>
          <li>To contact you about your service requests via WhatsApp, SMS, or phone call.</li>
          <li>To improve our platform, services, and user experience.</li>
          <li>To send relevant service updates, promotions, or reminders (you may opt out at any time).</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>
        <p className="font-semibold" style={{ color: '#0F3460' }}>
          We do NOT sell, rent, or trade your personal data to third parties for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection id="data-sharing" title="4. Data Sharing">
        <p>
          We share your information only in limited circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Service Professionals:</strong> We share your name, phone number, and address with the assigned
            service professional solely for the purpose of completing your service request.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your information if required by law, court order,
            or government authority.
          </li>
          <li>
            <strong>Business Operations:</strong> We use Supabase for secure data storage and Google Analytics for
            website analytics. These third-party services have their own privacy policies.
          </li>
        </ul>
        <p>
          We do not share your personal data with advertisers, data brokers, or any third party for commercial purposes.
        </p>
      </LegalSection>

      <LegalSection id="data-storage" title="5. Data Storage &amp; Security">
        <p>
          Your data is stored securely on Supabase servers with encryption and access controls. We take
          reasonable technical and organisational measures to protect your information from unauthorised
          access, alteration, or disclosure.
        </p>
        <p>
          We retain booking data and associated personal information for up to <strong>2 years</strong> from the
          date of the service, for service records, dispute resolution, and regulatory compliance.
        </p>
        <p>
          You may request deletion of your personal data at any time by contacting us at{' '}
          <a href="mailto:contact@nandedseva.com" className="underline" style={{ color: '#0F3460' }}>
            contact@nandedseva.com
          </a>. We will process your request within a reasonable timeframe.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="6. Your Rights">
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Deletion:</strong> Request deletion of your personal data (subject to legal obligations).</li>
          <li><strong>Right to Opt-Out:</strong> Opt out of receiving promotional communications at any time.</li>
          <li><strong>Right to Object:</strong> Object to processing of your data in certain circumstances.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:contact@nandedseva.com" className="underline" style={{ color: '#0F3460' }}>
            contact@nandedseva.com
          </a>{' '}
          or call{' '}
          <a href="tel:+918421222893" className="underline" style={{ color: '#0F3460' }}>
            +91 84212 22893
          </a>.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="7. Cookies &amp; Analytics">
        <p>
          We use cookies and similar technologies to enhance your browsing experience, remember your
          language preference, and analyse website traffic through Google Analytics (GA4).
        </p>
        <p>Cookies we use:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Functional cookies:</strong> Remember your language preference (nandedseva-lang).</li>
          <li><strong>Analytics cookies:</strong> Google Analytics to understand how visitors use our site.</li>
          <li><strong>Consent cookie:</strong> Records your cookie consent preference (nandedseva-cookie-consent).</li>
        </ul>
        <p>
          You can disable cookies in your browser settings at any time. Note that disabling cookies may
          affect some functionality of our website.
        </p>
      </LegalSection>

      <LegalSection id="childrens-privacy" title="8. Children's Privacy">
        <p>
          NandedSeva services are intended for individuals who are 18 years of age or older. We do not
          knowingly collect personal information from persons under 18. If you believe we have
          inadvertently collected information from a minor, please contact us immediately so we can
          delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technology, or legal requirements. When we make significant changes, we will update the
          &quot;Last Updated&quot; date at the top of this page.
        </p>
        <p>
          We encourage you to review this policy periodically. Continued use of NandedSeva after
          changes are posted constitutes your acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="10. Contact Us">
        <p>
          For any questions, requests, or concerns regarding this Privacy Policy or how we handle
          your data, please contact us:
        </p>
        <div className="rounded-xl p-4 border border-gray-100 bg-gray-50 space-y-1.5">
          <p><strong>NandedSeva</strong></p>
          <p>Nanded, Maharashtra — 431601, India</p>
          <p>
            Email:{' '}
            <a href="mailto:contact@nandedseva.com" className="underline" style={{ color: '#0F3460' }}>
              contact@nandedseva.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+918421222893" className="underline" style={{ color: '#0F3460' }}>
              +91 84212 22893
            </a>
          </p>
        </div>
      </LegalSection>

    </LegalPage>
  );
}
