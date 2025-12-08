export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      content: (
        <p>
          At Atal Optical, we are committed to protecting your personal
          information and respecting your privacy. This policy explains how we
          collect, use, disclose, and safeguard your information in accordance
          with Canadian privacy laws.
          <br />
          <br />
          This policy applies when you visit our website, make a purchase, or
          use any of our optical services.
        </p>
      ),
    },

    {
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-3">We may collect the following information:</p>

          <ul className="space-y-2 list-disc list-inside">
            <li>
              <strong>Personal Information</strong>
              <ul className="mt-1 ml-5 list-disc list-inside">
                <li>Full name</li>
                <li>Address</li>
                <li>Phone number</li>
                <li>Email address</li>
              </ul>
            </li>

            <li>
              <strong>Medical / Optical Information</strong>
              <ul className="mt-1 ml-5 list-disc list-inside">
                <li>Prescription details</li>
                <li>Pupillary distance (PD)</li>
                <li>Basic eye health information</li>
              </ul>
            </li>

            <li>
              <strong>Payment Information</strong>
              <ul className="mt-1 ml-5 list-disc list-inside">
                <li>Billing address</li>
                <li>Transaction details</li>
                <li className="mt-1 text-sm">
                  {" "}
                  We do not store full credit/debit card numbers.
                </li>
              </ul>
            </li>

            <li>
              <strong>Website Usage Information</strong>
              <ul className="mt-1 ml-5 list-disc list-inside">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Cookies and usage analytics</li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },

    {
      title: "How We Use Your Information",
      content: (
        <>
          <p>We use your information to:</p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Process orders and services</li>
            <li>Prepare custom optical products</li>
            <li>Contact you about your order</li>
            <li>Process payments</li>
            <li>Improve customer service and website performance</li>
            <li>Comply with legal obligations</li>
          </ul>
        </>
      ),
    },

    {
      title: "Sharing of Information",
      content: (
        <>
          <p>
            We do not sell or rent your personal information. We may share
            limited information with:
          </p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Lens and frame manufacturers</li>
            <li>Insurance providers (with customer consent)</li>
            <li>Payment processors</li>
            <li>Legal and regulatory authorities when required by law</li>
          </ul>
        </>
      ),
    },

    {
      title: "Cookies & Website Tracking",
      content: (
        <>
          <p>Our website uses cookies to:</p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Improve site functionality</li>
            <li>Track website performance</li>
            <li>Enhance user experience</li>
          </ul>
          <p className="mt-3">
            You may disable cookies through your browser settings.
          </p>
        </>
      ),
    },

    {
      title: "Data Security",
      content: (
        <>
          <p>We protect your information using:</p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Secure servers</li>
            <li>Encryption technologies</li>
            <li>Restricted access controls</li>
            <li>Industry-standard security practices</li>
          </ul>
        </>
      ),
    },

    {
      title: "Data Retention",
      content: (
        <>
          <p>We retain personal information only as long as necessary to:</p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Fulfill business services</li>
            <li>Meet legal and regulatory requirements</li>
          </ul>
        </>
      ),
    },

    {
      title: "Your Rights",
      content: (
        <>
          <p>You have the right to:</p>
          <ul className="space-y-2 list-disc list-inside mt-2">
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Withdraw consent (where applicable)</li>
          </ul>
        </>
      ),
    },

    {
      title: "Policy Updates & Legal Compliance",
      content: (
        <>
          <p className="mb-2">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on our website.
          </p>
          <p>
            This policy is designed to comply with: <br />
            • PIPEDA (Personal Information Protection and Electronic Documents
            Act) <br />
            • Ontario privacy regulations <br />• Applicable Canadian healthcare
            privacy standards
          </p>
        </>
      ),
    },

    {
      title: "Contact Us",
      content: (
        <>
          <p className="mb-1">Atal Optical</p>
          <p className="mb-1">
            Corporate Office : 34 Shining Willow Crescent, Brampton, ON L6P 2A2,
            Canada
          </p>
          <p className="mb-1">Toll-Free: 1-866-242-3545</p>
          <p>Email: info@ataloptical@gmail.com</p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12 text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide px-4">
          Privacy Policy
        </h1>
        <div className="border-b border-white w-20 sm:w-24 mx-auto mt-4 opacity-80" />
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="bg-white shadow-sm p-4 sm:p-6 md:p-8 rounded-xl border border-red-400"
              aria-labelledby={`section-${idx}`}
            >
              <h2
                id={`section-${idx}`}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-red-600 mb-3"
              >
                {section.title}
              </h2>

              <div className="text-gray-700 leading-relaxed text-sm sm:text-[15px] md:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
