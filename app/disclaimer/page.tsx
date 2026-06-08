import type { Metadata } from 'next';
import LegalPage, { LegalSection, LegalAlert } from '@/app/components/LegalPage';

export const metadata: Metadata = {
  title: 'Disclaimer | NandedSeva',
  description:
    'Disclaimer for NandedSeva — important notices about our platform, independent contractors, pricing estimates, and property safety.',
  alternates: { canonical: 'https://www.nandedseva.com/disclaimer' },
};

const SECTIONS = [
  { id: 'general',               title: '1. General Disclaimer' },
  { id: 'independent-contractors', title: '2. Independent Contractors' },
  { id: 'pricing',               title: '3. Pricing Disclaimer' },
  { id: 'verification',          title: '4. Verification Disclaimer' },
  { id: 'property-safety',       title: '5. Property Safety Advisory' },
  { id: 'third-party',           title: '6. Third-Party Links' },
  { id: 'availability',          title: '7. Service Availability' },
  { id: 'errors',                title: '8. Errors &amp; Omissions' },
  { id: 'contact',               title: '9. Contact' },
];

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" sections={SECTIONS}>

      <LegalSection id="general" title="1. General Disclaimer">
        <p>
          The information provided on nandedseva.com is for general informational purposes only.
          NandedSeva makes no representations or warranties of any kind, express or implied,
          regarding the accuracy, completeness, reliability, suitability, or availability of the
          website or the information, services, or related graphics contained on the website for
          any purpose.
        </p>
        <p>
          Any reliance you place on such information is strictly at your own risk. NandedSeva
          disclaims all liability for any loss or damage, including without limitation indirect or
          consequential loss or damage, or any loss or damage arising from use of this website.
        </p>
      </LegalSection>

      <LegalSection id="independent-contractors" title="2. Independent Contractors">
        <LegalAlert>
          All service professionals listed on NandedSeva are independent contractors. They are NOT
          employees, agents, partners, joint-venture partners, or representatives of NandedSeva.
        </LegalAlert>
        <p className="mt-3">
          NandedSeva acts solely as a technology intermediary to facilitate bookings. We have no
          control over, and are not responsible for, the conduct, actions, quality of work,
          timeliness, accuracy of representations, or any other aspect of services provided by
          independent professionals listed on our platform.
        </p>
        <p>
          Any contracts for services are entered into directly between the customer and the
          service professional. NandedSeva is not a party to such contracts.
        </p>
      </LegalSection>

      <LegalSection id="pricing" title="3. Pricing Disclaimer">
        <p>
          All prices, rates, and charges displayed on the NandedSeva website are <strong>starting
          estimates only</strong>. They are indicative and do not constitute a fixed quote or binding offer.
        </p>
        <p>Final prices may vary based on the following factors assessed during the service visit:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Complexity, scope, and nature of the work required.</li>
          <li>Cost of spare parts, materials, or consumables used.</li>
          <li>Distance and travel charges for locations outside central Nanded.</li>
          <li>Time required to complete the work.</li>
          <li>Emergency or after-hours service premiums, if applicable.</li>
        </ul>
        <p>
          The service professional will provide a final quote after inspecting the job on-site.
          Customers are advised to confirm the final price before authorising the professional to
          proceed with any work.
        </p>
        <p>
          Visit charges are applicable as shown per service and are <strong>adjusted in the final
          bill</strong> if the customer proceeds with the work.
        </p>
      </LegalSection>

      <LegalSection id="verification" title="4. Verification Disclaimer">
        <p>
          NandedSeva makes reasonable efforts to screen and verify service professionals before
          listing them on our platform. This may include identity verification and assessment of
          their stated skills and experience.
        </p>
        <p>
          However, NandedSeva <strong>cannot guarantee</strong> the complete accuracy of information
          provided by service professionals, their continued fitness for the listed services, or
          that all listed qualifications and certifications are current and valid.
        </p>
        <p>
          Customers are advised to exercise their own reasonable judgement, ask for identification,
          and satisfy themselves of the professional&apos;s competence before authorising any work.
          You may call NandedSeva at{' '}
          <a href="tel:+918421222893" className="underline" style={{ color: '#0F3460' }}>
            +91 84212 22893
          </a>{' '}
          to verify the identity of the technician before allowing entry.
        </p>
      </LegalSection>

      <LegalSection id="property-safety" title="5. Property Safety Advisory">
        <LegalAlert>
          <strong>NandedSeva is NOT responsible for any loss, theft, or damage to property</strong>{' '}
          during service visits. We strongly urge all customers to follow these precautions.
        </LegalAlert>
        <p className="mt-3">
          NandedSeva strongly advises all customers to take the following precautions before and
          during any service visit:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li><strong>Secure all valuables:</strong> Lock away cash, jewellery, important documents, and other valuables before the technician arrives.</li>
          <li><strong>Be present:</strong> Remain present or have a trusted adult present for the entire duration of the service visit. Do not leave the professional unattended in any room.</li>
          <li><strong>Verify identity:</strong> Ask for the technician&apos;s name and call NandedSeva at +91 84212 22893 to confirm the technician&apos;s identity before allowing entry into your home.</li>
          <li><strong>Report promptly:</strong> Any suspicious behaviour should be reported to NandedSeva and, if necessary, to local police immediately.</li>
        </ul>
        <p className="mt-3">
          NandedSeva does not carry or provide insurance for customer property. Any claims relating
          to theft or property damage must be addressed with the service professional directly and,
          where appropriate, through law enforcement authorities.
        </p>
      </LegalSection>

      <LegalSection id="third-party" title="6. Third-Party Links">
        <p>
          Our website may contain links to third-party websites, applications, or services (such as
          WhatsApp, Google Maps, or payment platforms). These links are provided for convenience only.
        </p>
        <p>
          NandedSeva does not endorse, control, or take responsibility for the content, privacy
          policies, or practices of any third-party websites. We encourage you to review the privacy
          policy and terms of service of any third-party site you visit.
        </p>
      </LegalSection>

      <LegalSection id="availability" title="7. Service Availability">
        <p>
          NandedSeva does not guarantee the availability of any specific service, service category,
          or service professional at any given time or location.
        </p>
        <p>
          Service availability depends on the availability of qualified professionals in your area,
          time of day, day of week, and other factors beyond NandedSeva&apos;s control. NandedSeva
          shall not be liable for any inconvenience, loss, or damage arising from the non-availability
          of services at any time.
        </p>
        <p>
          We operate from 7:00 AM to 9:00 PM, seven days a week, and make best-effort attempts to
          fulfil all service requests within this window.
        </p>
      </LegalSection>

      <LegalSection id="errors" title="8. Errors &amp; Omissions">
        <p>
          While NandedSeva strives to maintain accurate, up-to-date information on its website, we
          do not warrant that all information — including service descriptions, prices, availability,
          and professional details — is complete, current, or error-free.
        </p>
        <p>
          NandedSeva reserves the right to correct any errors, inaccuracies, or omissions and to
          change or update information at any time without prior notice.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="9. Contact Us">
        <p>
          If you have questions about this disclaimer or need to report a concern, please reach out:
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
