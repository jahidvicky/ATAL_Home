export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      content: (
        <p>
          Atal Optical (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information in compliance with Canadian privacy laws, including PIPEDA.
          <br /><br />
          This policy applies when you visit our website, make a purchase, or use any of our optical services.
        </p>
      )
    },
    {
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-3">We collect information required to deliver our services, including:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Personal Information: Name, email, phone, address</li>
            <li>Optical & Health Data: Prescriptions, eye test results, history</li>
            <li>Payment Details: Billing info, purchase history</li>
            <li>Technical Data: IP address, device info, browser data, cookies</li>
            <li>Service Details: Appointments, warranty/repair requests</li>
            <li>Documents: Insurance or optical-related files, if provided</li>
          </ul>
        </>
      )
    },
    {
      title: "How We Collect Information",
      content: (
        <>
          <ul className="space-y-1 list-disc list-inside">
            <li>Online forms and website interactions</li>
            <li>In-store visits or phone conversations</li>
            <li>Email or customer support communication</li>
            <li>Trusted third-party services (payment processors, analytics)</li>
          </ul>
        </>
      )
    },
    {
      title: "How We Use Your Information",
      content: (
        <>
          <p>Your information is used to:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li>Process orders and appointments</li>
            <li>Provide optical and customer services</li>
            <li>Process payments and insurance claims</li>
            <li>Send service-related updates</li>
            <li>Improve site performance and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </>
      )
    },
    {
      title: "Data Security & Retention",
      content: (
        <>
          <ul className="space-y-1 list-disc list-inside">
            <li>Data stored securely using modern security standards</li>
            <li>Access granted only to authorized staff</li>
            <li>Regular audits to maintain security</li>
          </ul>
          <p className="mt-3">
            Information is retained only as long as required for business or legal purposes, then securely deleted.
          </p>
        </>
      )
    },
    {
      title: "Sharing Your Information",
      content: (
        <>
          <p>We may share your information with:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li>Secure payment processors</li>
            <li>Analytics and website service providers</li>
            <li>Healthcare professionals (with consent)</li>
            <li>Legal authorities when required</li>
            <li>Business successors (in case of merger/acquisition)</li>
          </ul>
          <p className="mt-3">We never sell or rent your data to third parties.</p>
        </>
      )
    },
    {
      title: "Cookies & Tracking",
      content: (
        <ul className="space-y-1 list-disc list-inside">
          <li>Used to enhance browsing experience</li>
          <li>Helps improve website performance</li>
          <li>You can disable cookies in your browser settings</li>
        </ul>
      )
    },
    {
      title: "Your Rights",
      content: (
        <>
          <ul className="space-y-1 list-disc list-inside">
            <li>Access your personal data</li>
            <li>Request corrections or updates</li>
            <li>Request deletion (where legally applicable)</li>
            <li>Withdraw consent from marketing emails</li>
          </ul>
        </>
      )
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p className="mb-1">Atal Optical</p>
          <p className="mb-1">Corporate Office : 34 Shining Willow Crescent, Brampton, ON L6P 2A2, Canada</p>
          <p className="mb-1">Toll-Free: 1-866-242-3545</p>
          <p>Email: info@ataloptical@gmail.com</p>
        </>
      )
    }
  ];

  return (
    <>
      {/* SIMPLE PREMIUM HEADER */}
      <header className="mb-10 bg-gradient-to-r from-black via-red-600 to-black py-14 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Privacy Policy
        </h1>
        <div className="border-b border-white w-24 mx-auto mt-4 opacity-70"></div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pb-16">
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white shadow-sm p-6 md:p-8 rounded-xl border border-red-400">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">{section.title}</h2>
              <div className="text-gray-700 leading-relaxed text-[15px] md:text-base">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
