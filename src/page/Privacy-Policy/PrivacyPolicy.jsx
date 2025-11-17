export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Atal Optical Corp – Privacy Policy",
      content: (
        <>
          <p className="mb-3">
            <strong>Corporate Office:</strong> 34 Shining Willow Crescent, Brampton, Ontario, Canada
          </p>
          <p className="mb-3">
            <strong>Toll-Free:</strong> 1-866-242-3545
          </p>
          <p className="mb-6">
            <strong>Email:</strong> info@ataloptical@gmail.com
          </p>
        </>
      )
    },
    {
      title: "Introduction",
      content: (
        <p>
          Atal Optical Corp (“we,” “our,” or “us”) is committed to protecting the privacy and confidentiality of
          personal information collected from our customers, clients, and website visitors (“you” or “users”) in
          accordance with Canadian privacy laws, including PIPEDA (Personal Information Protection and Electronic
          Documents Act) and relevant provincial regulations.
          <br />
          <br />
          This Privacy Policy explains how we collect, use, store, disclose, and protect personal information in the
          context of our optical business, including eyewear products, eye exams, consultations, and online services.
        </p>
      )
    },
    {
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-3">We collect personal information necessary to provide our services and conduct business, including:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Contact Information: Name, address, phone number, email</li>
            <li>Optical & Health Information: Eye prescriptions, medical history related to eye care, vision test results</li>
            <li>Payment Information: Credit card details, billing addresses, and purchase history</li>
            <li>Online Information: IP addresses, browser type, cookies, and site usage analytics</li>
            <li>Service Requests: Appointment requests, consultations, warranty or product service records</li>
            <li>Images/Documentation: Photos for optical records or insurance claims (if applicable)</li>
          </ul>
          <p>Important: We only collect personal information that is necessary for the provision of services and legal compliance.</p>
        </>
      )
    },
    {
      title: "How We Collect Information",
      content: (
        <>
          <p>We may collect information through:</p>
          <ul className="list-disc list-inside space-y-1 mt-3 mb-3">
            <li>Website forms, registrations, and online purchases</li>
            <li>Telephone, email, or in-person communications</li>
            <li>Visits to our corporate office or retail locations</li>
            <li>Third-party service providers (e.g., payment processors, analytics tools)</li>
          </ul>
          <p>We ensure all third-party providers comply with Canadian privacy standards.</p>
        </>
      )
    },
    {
      title: "Use of Personal Information",
      content: (
        <>
          <p>Personal information is used for legitimate business purposes, including:</p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Providing optical services, eye exams, and eyewear products</li>
            <li>Processing orders, payments, and insurance claims</li>
            <li>Sending notifications, confirmations, or promotional communications (with consent)</li>
            <li>Analyzing trends, improving our services, and conducting customer surveys</li>
            <li>Complying with legal or regulatory requirements</li>
          </ul>
          <p className="mt-3">We never sell or rent your personal information to third parties for marketing purposes.</p>
        </>
      )
    },
    {
      title: "Storage and Retention of Information",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Personal information is stored securely in electronic and physical formats</li>
          <li>Access is restricted to authorized personnel only</li>
          <li>Information is retained only for as long as necessary for business, legal, or regulatory purposes</li>
          <li>When information is no longer needed, it is securely destroyed or anonymized</li>
        </ul>
      )
    },
    {
      title: "Sharing and Disclosure of Information",
      content: (
        <>
          <p>We may disclose personal information to:</p>
          <ul className="list-disc list-inside space-y-1 mt-3 mb-3">
            <li>Service Providers: Payment processors, IT providers, and delivery services for legitimate business purposes</li>
            <li>Legal Authorities: When required by law, legal process, or government regulations</li>
            <li>Healthcare Professionals: For legitimate optical or medical purposes, with consent</li>
            <li>Business Transfers: In the event of a merger, sale, or acquisition, with privacy obligations maintained</li>
          </ul>
          <p>Note: We do not share information with unrelated third parties for marketing without your consent.</p>
        </>
      )
    },
    {
      title: "Cookies and Online Tracking",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Our website may use cookies, web beacons, and analytics to improve user experience</li>
          <li>Cookies help us understand site usage, preferences, and improve services</li>
          <li>You can adjust your browser settings to accept or reject cookies, but some features may not function properly</li>
        </ul>
      )
    },
    {
      title: "Security of Information",
      content: (
        <>
          <p>We implement administrative, technical, and physical safeguards to protect personal information from unauthorized access, disclosure, alteration, or destruction, including:</p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Encryption of sensitive data</li>
            <li>Secure servers and access controls</li>
            <li>Employee training and confidentiality agreements</li>
            <li>Regular audits and monitoring of data security</li>
          </ul>
        </>
      )
    },
    {
      title: "Your Privacy Rights",
      content: (
        <>
          <p>Under Canadian law, you have the right to:</p>
          <ul className="list-disc list-inside space-y-1 mt-3 mb-3">
            <li>Access: Request a copy of personal information we hold about you</li>
            <li>Correction: Request corrections or updates to your personal information</li>
            <li>Withdrawal of Consent: Withdraw consent to receive promotional communications</li>
            <li>Deletion: Request deletion of personal information where legally permitted</li>
            <li>Opt-out: Opt-out of marketing communications at any time</li>
          </ul>
          <p>
            Requests can be submitted via{" "}
            <a href="mailto:info@ataloptical@gmail.com" className="text-[#f00000] underline">
              info@ataloptical@gmail.com
            </a>{" "}
            or by contacting our corporate office.
          </p>
        </>
      )
    },
    {
      title: "Contact Us",
      content: (
        <ul className="list-disc list-inside">
          <li>Atal Optical Corp</li>
          <li>34 Shining Willow Crescent, Brampton, Ontario, Canada</li>
          <li>Toll-Free: 1-866-242-3545</li>
          <li>Email: info@ataloptical@gmail.com</li>
        </ul>
      )
    }
  ];

  return (
    <>
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">Privacy Policy</h1>
        <hr className="border-white w-100 mt-2 mx-120" />
      </header>

      <div className="px-6">
        <div className="mx-auto p-8">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <div className="text-gray-700 leading-relaxed">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
