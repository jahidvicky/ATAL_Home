import { Link, NavLink } from "react-router-dom";

const TermsAndConditions = () => {
  const openEmail = (email) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const highlights = [
    {
      title: "Website Use",
      text: "Our website provides information about Atal Optical Corp., our eyewear, optical products, services, promotions and locations. You agree to use the website lawfully and responsibly.",
    },
    {
      title: "Products & Pricing",
      text: "We make reasonable efforts to ensure that product descriptions, images, prices and availability are accurate. Information, pricing and availability may change without notice.",
    },
    {
      title: "Prescription Products",
      text: "Prescription eyewear and contact lenses are subject to applicable Ontario laws and professional requirements. Customers are responsible for providing accurate prescription information.",
    },
    {
      title: "Professional Advice",
      text: "Information on this website is for general information only and does not replace an eye examination, diagnosis, treatment or professional eye-care advice.",
    },
    {
      title: "Orders & Payments",
      text: "Customers must provide accurate information when placing an order. Orders are subject to product availability, prescription requirements and payment confirmation.",
    },
    {
      title: "Returns & Refunds",
      text: "Returns, exchanges and refunds are subject to Atal Optical Corp.'s applicable policies. Customized and prescription products may have specific conditions.",
    },
    {
      title: "Customer Reviews & Submissions",
      text: "Reviews, feedback, photographs and other voluntary submissions may be used by Atal Optical Corp. for legitimate business and promotional purposes, subject to applicable privacy requirements and our Privacy Policy.",
    },
    {
      title: "Copyright & Intellectual Property",
      text: "Website content, including our logo, photographs, graphics, text, designs and other materials, is protected by applicable intellectual-property laws and may not be used without authorization.",
    },
    {
      title: "Third-Party Links",
      text: "Our website may contain links to third-party websites. Atal Optical Corp. is not responsible for the content or practices of those websites.",
    },
    {
      title: "Website Availability",
      text: "We make reasonable efforts to maintain the website, but we do not guarantee that it will always be available, uninterrupted or error-free.",
    },
    {
      title: "Applicable Law",
      text: "These Terms & Conditions are governed by the laws of Ontario and applicable Canadian law.",
    },
  ];

  const quickLinks = [
    { to: "/full-terms-and-conditions", label: "Read Full Terms & Conditions" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/return-exchange", label: "Return & Refund Policy" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <>
      {/* Header */}
      <header className="mb-10 bg-gradient-to-r from-black via-red-600 to-black py-14 px-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center">
          Terms & Conditions
        </h1>
        <p className="text-white/80 text-center mt-2 text-sm sm:text-base">
          Atal Optical Corp.
        </p>
        <hr className="border-white/40 w-24 sm:w-32 mt-4 mx-auto" />
      </header>

      <section className="px-4 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Intro Card */}
          <div className="rounded-xl border border-red-500 bg-red-50 p-6 sm:p-8 mb-10 shadow-sm">
            <p className="text-gray-800 leading-relaxed">
              <strong>Welcome to Atal Optical Corp.</strong> These Terms &
              Conditions explain the rules that apply when you access or use
              our website and when you purchase or inquire about our optical
              products and services.
            </p>
            <p className="text-gray-800 leading-relaxed mt-3">
              By using this website, you agree to comply with these Terms &
              Conditions.
            </p>
          </div>

          {/* What You Should Know */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-5">
              What You Should Know
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl bg-gray-50 border border-gray-200 p-5 shadow-sm hover:border-red-300 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </article>
              ))}

              {/* Privacy card (has a link, kept separate for the inline Link element) */}
              <article className="rounded-xl bg-gray-50 border border-gray-200 p-5 shadow-sm hover:border-red-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1.5">
                  Privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We respect your privacy. Personal information and
                  information collected in connection with our services will
                  be handled in accordance with our{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-red-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and applicable privacy laws.
                </p>
              </article>
            </div>
          </section>

          {/* Your Privacy and Prescription Information */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-10 shadow-sm">
            <h2 className="text-xl font-bold text-red-600 mb-3">
              Your Privacy and Prescription Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Please do not submit confidential medical or personal health
              information through general website forms unless the form
              specifically requests that information or you have been
              instructed to do so by Atal Optical Corp.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              For information about how we collect, use, protect and retain
              personal information, please see our{" "}
              <Link
                to="/privacy-policy"
                className="text-red-600 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Read the Complete Terms */}
          <section className="rounded-xl border border-red-500 bg-gray-50 p-6 sm:p-8 mb-10 shadow-sm">
            <h2 className="text-xl font-bold text-red-600 mb-3">
              Read the Complete Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              This page provides a convenient summary of our Terms &
              Conditions. <strong>The complete Terms & Conditions</strong>{" "}
              contain additional details and should be read together with our
              Privacy Policy and applicable store policies.
            </p>

            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-block rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Company Info / Last Updated */}
          <div className="text-center text-sm text-gray-500 mb-10">
            <p className="font-semibold text-gray-700">Atal Optical Corp.</p>
            <p>Ontario, Canada</p>
            <p className="mt-1">
              <strong>Last Updated:</strong> September 1, 2026
            </p>
          </div>

          {/* Contact Us */}
          <section className="rounded-xl bg-black text-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Contact Us
            </h2>

            <div className="space-y-2 text-sm sm:text-base text-gray-200">
              <p>
                Email:{" "}
                <button
                  onClick={() => openEmail("sales.ataloptical@gmail.com")}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  sales.ataloptical@gmail.com
                </button>
                <span className="mx-1">|</span>
                <button
                  onClick={() => openEmail("info.ataloptical@gmail.com")}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  info.ataloptical@gmail.com
                </button>
              </p>

              <p>
                Corporate Office:{" "}
                <NavLink
                  to="/location"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-400 underline"
                      : "text-red-400 hover:underline"
                  }
                >
                  34 Shining Willow Crescent, Brampton, ON L6P 2A2, Canada
                </NavLink>
              </p>

              <p>
                Phone:{" "}
                <a
                  href="tel:+18662423545"
                  className="text-red-400 hover:underline"
                >
                  1866-242-3545
                </a>
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;