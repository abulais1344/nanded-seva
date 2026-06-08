import type { Metadata } from 'next';
import LegalPage, { LegalSection, LegalAlert, LegalSteps } from '@/app/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | NandedSeva',
  description:
    'Terms of Service for NandedSeva — the rules and conditions governing use of our home and travel services marketplace in Nanded.',
  alternates: { canonical: 'https://www.nandedseva.com/terms-of-service' },
};

const SECTIONS = [
  { id: 'acceptance',              title: '1. Acceptance of Terms' },
  { id: 'platform-nature',         title: '2. Platform Nature' },
  { id: 'services',                title: '3. Services' },
  { id: 'booking-payments',        title: '4. Booking & Payments' },
  { id: 'liability',               title: '5. Platform Liability' },
  { id: 'customer-responsibilities', title: '6. Customer Responsibilities' },
  { id: 'theft-damage',            title: '7. Theft & Property Damage' },
  { id: 'service-quality',         title: '8. Service Quality' },
  { id: 'cancellation',            title: '9. Cancellation Policy' },
  { id: 'prohibited-uses',         title: '10. Prohibited Uses' },
  { id: 'termination',             title: '11. Termination' },
  { id: 'indemnification',         title: '12. Indemnification' },
  { id: 'governing-law',           title: '13. Governing Law' },
  { id: 'changes',                 title: '14. Changes to Terms' },
  { id: 'contact',                 title: '15. Contact' },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" sections={SECTIONS}>

      <LegalSection id="acceptance" title="1. Acceptance of Terms">
        <p>
          By accessing or using NandedSeva (nandedseva.com), you confirm that you have read,
          understood, and agree to be bound by these Terms of Service and our Privacy Policy.
        </p>
        <p>
          If you do not agree with any part of these terms, please do not use our platform.
          These terms apply to all visitors, customers, and service professionals who use
          NandedSeva in any capacity.
        </p>
      </LegalSection>

      <LegalSection id="platform-nature" title="2. Platform Nature — Important">
        <LegalAlert>
          <strong>NandedSeva is a TECHNOLOGY PLATFORM and MARKETPLACE — not a service provider.</strong>
          <br />
          We connect customers with independent service professionals. NandedSeva does NOT directly
          employ service professionals, supervise or control their work, guarantee the quality of
          services, or act as a service provider itself.
        </LegalAlert>
        <p>
          Service professionals listed on our platform are <strong>independent contractors</strong> — not
          employees, agents, partners, or representatives of NandedSeva. They operate their own
          independent businesses and are solely responsible for the services they provide.
        </p>
        <p>
          NandedSeva&apos;s role is limited to facilitating the connection between customers and
          these independent professionals.
        </p>
      </LegalSection>

      <LegalSection id="services" title="3. Services">
        <p>NandedSeva facilitates bookings for the following categories of services:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Home Services:</strong> Electrician, plumber, AC repair, RO service, washing machine repair, mistri work, painting, and other household repair services.</li>
          <li><strong>Travel Services:</strong> Taxi, car rental, driver for a day, outstation trips, and airport pickup/drop.</li>
          <li><strong>Other Services:</strong> Additional local services as listed on the platform from time to time.</li>
        </ul>
        <p>
          Service availability depends on professional availability in your area and at the requested time.
          NandedSeva does not guarantee availability of any specific service or professional.
        </p>
      </LegalSection>

      <LegalSection id="booking-payments" title="4. Booking &amp; Payments">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Bookings are initiated via WhatsApp, phone, or the booking form and confirmed by our team.</li>
          <li>Prices shown on the website are <strong>starting estimates only</strong> and subject to change based on on-site assessment.</li>
          <li>Final pricing is determined by the service professional after visiting your location and inspecting the job.</li>
          <li>Visit charges apply as shown per service category. Visit charges are <strong>adjusted in the final bill</strong> if work proceeds.</li>
          <li>Payments are made <strong>directly to the service professional</strong> in cash or via UPI/bank transfer as agreed.</li>
          <li>NandedSeva does not currently process or collect payments on behalf of service professionals.</li>
          <li>NandedSeva is not responsible for any payment disputes between customers and service professionals.</li>
        </ul>
      </LegalSection>

      <LegalSection id="liability" title="5. Platform Liability — Important">
        <LegalAlert>
          NandedSeva shall NOT be held liable for any of the following:
        </LegalAlert>
        <ul className="list-disc pl-5 space-y-1.5 mt-3">
          <li>Theft, loss, or damage to customer property during a service visit.</li>
          <li>Poor quality of work, defective repairs, or unsatisfactory services by professionals.</li>
          <li>Accidents, injuries, or bodily harm during service visits.</li>
          <li>Disputes, disagreements, or conflicts between customers and service professionals.</li>
          <li>Delay, non-completion, or cancellation of services by professionals.</li>
          <li>Any financial loss arising from or related to service bookings made through our platform.</li>
          <li>Actions, omissions, misconduct, or negligence of service professionals.</li>
          <li>Errors or inaccuracies in service professional profiles or information.</li>
        </ul>
        <p>
          To the maximum extent permitted by applicable law, NandedSeva&apos;s total liability for
          any claim shall not exceed ₹500 (five hundred rupees).
        </p>
      </LegalSection>

      <LegalSection id="customer-responsibilities" title="6. Customer Responsibilities">
        <p>By using NandedSeva, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Be present — or have a responsible adult present — throughout the entire service visit.</li>
          <li><strong>Secure all cash, jewellery, important documents, and valuables</strong> before the technician arrives and during the service visit.</li>
          <li>Verify the technician&apos;s identity by calling NandedSeva at +91 84212 22893 before allowing entry.</li>
          <li>Not leave the service professional unattended in any room that contains valuables.</li>
          <li>Provide accurate address, contact information, and service requirements at the time of booking.</li>
          <li>Report any issues, complaints, or grievances within <strong>24 hours</strong> of service completion.</li>
          <li>Treat service professionals and NandedSeva staff with courtesy and respect.</li>
          <li>Pay the agreed or final quoted amount directly to the service professional upon completion of work.</li>
        </ul>
      </LegalSection>

      <LegalSection id="theft-damage" title="7. Theft &amp; Property Damage Policy">
        <LegalAlert>
          <strong>NandedSeva is NOT financially liable for any theft or property damage</strong> caused by
          service professionals. NandedSeva does not provide insurance or compensation for customer
          property. Customers are strongly advised to secure their valuables before any service visit.
        </LegalAlert>
        <p className="mt-3">In the event of alleged theft or property damage during a service visit, follow these steps:</p>
        <LegalSteps
          steps={[
            'Contact NandedSeva immediately at +91 84212 22893 to report the incident.',
            'NandedSeva will officially record your complaint with date, time, and details.',
            'NandedSeva will contact the service professional to hear their response.',
            'NandedSeva will facilitate communication between both parties.',
            'For theft, the customer MUST file a police complaint (FIR) at the nearest police station.',
          ]}
        />
        <p className="mt-3">
          NandedSeva may suspend or permanently remove the service professional from the platform
          pending investigation. However, NandedSeva does not have the legal or financial authority
          to recover stolen property or compensate for losses on behalf of customers.
        </p>
      </LegalSection>

      <LegalSection id="service-quality" title="8. Service Quality">
        <p>
          NandedSeva makes reasonable efforts to list experienced and verified service professionals
          but <strong>does not guarantee the quality, standard, or outcome of any service</strong> provided.
        </p>
        <p>
          If you are unsatisfied with the quality of work, please contact us within <strong>24 hours</strong> of
          service completion at{' '}
          <a href="tel:+918421222893" className="underline" style={{ color: '#0F3460' }}>
            +91 84212 22893
          </a>. We will make a good-faith effort to resolve the issue by facilitating communication
          between you and the professional, or arranging a re-visit where appropriate.
        </p>
        <p>
          NandedSeva is not liable for the cost of re-doing, correcting, or reversing any work
          performed by service professionals.
        </p>
      </LegalSection>

      <LegalSection id="cancellation" title="9. Cancellation Policy">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Before technician dispatch:</strong> Free cancellation — no charges apply.</li>
          <li><strong>After technician has departed for your location:</strong> A visit charge may apply as shown for that service category.</li>
          <li><strong>Customer no-show after confirmed booking:</strong> A visit charge may apply if the professional has already travelled to your address.</li>
          <li>Travel service cancellations (taxi, outstation) are subject to separate cancellation terms agreed at the time of booking.</li>
        </ul>
      </LegalSection>

      <LegalSection id="prohibited-uses" title="10. Prohibited Uses">
        <p>You must not use NandedSeva for any of the following:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Providing false, inaccurate, or misleading information in any booking or communication.</li>
          <li>Using the platform for any illegal activity or in violation of applicable laws.</li>
          <li>Contacting service professionals directly outside of NandedSeva to bypass platform processes or commission arrangements.</li>
          <li>Posting fake, misleading, or defamatory reviews or information about NandedSeva or its professionals.</li>
          <li>Harassing, threatening, or abusing service professionals, staff, or other users.</li>
          <li>Attempting to access or tamper with any restricted part of the platform.</li>
          <li>Reproducing, distributing, or commercially exploiting any content from NandedSeva without permission.</li>
        </ul>
      </LegalSection>

      <LegalSection id="termination" title="11. Termination">
        <p>
          NandedSeva reserves the right, at its sole discretion, to suspend or permanently terminate
          access to the platform for any user who:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Violates any provision of these Terms of Service.</li>
          <li>Engages in abusive, fraudulent, or illegal behaviour.</li>
          <li>Repeatedly makes bookings without payment or good faith.</li>
        </ul>
        <p>Termination may occur without prior notice in serious cases.</p>
      </LegalSection>

      <LegalSection id="indemnification" title="12. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless NandedSeva and its team members from and
          against any claims, liabilities, damages, losses, costs, and expenses (including reasonable
          legal fees) arising out of or in any way connected with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Your use of the NandedSeva platform.</li>
          <li>Your violation of these Terms of Service.</li>
          <li>Your violation of any applicable laws or third-party rights.</li>
          <li>Any dispute between you and a service professional.</li>
        </ul>
      </LegalSection>

      <LegalSection id="governing-law" title="13. Governing Law &amp; Jurisdiction">
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of the
          State of Maharashtra, India, and the laws of India as applicable.
        </p>
        <p>
          Any dispute, claim, or controversy arising out of or relating to these terms or the use
          of NandedSeva shall be subject to the <strong>exclusive jurisdiction of the courts
          in Nanded, Maharashtra, India</strong>.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="14. Changes to Terms">
        <p>
          NandedSeva reserves the right to modify, update, or replace these Terms of Service at any
          time at its sole discretion. Updated terms will be posted on this page with a revised
          &quot;Last Updated&quot; date.
        </p>
        <p>
          Your continued use of the NandedSeva platform after any changes are posted constitutes
          your acceptance of the revised Terms of Service.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="15. Contact Us">
        <p>
          For questions, concerns, or complaints about these Terms of Service, please contact us:
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
