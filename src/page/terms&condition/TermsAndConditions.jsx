const TermsAndConditions = () => {
  return (
    <>
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">
          Terms & Conditions
        </h1>
        <hr className="border-white w-120 mt-2 ml-110"></hr>
      </header>
      <section className="px-4 sm:px-8 lg:px-16">
        <div className="mx-auto rounded-2xl p-8">
          {/* Page Title */}

          <p className="">
            Please read these terms carefully before using our website.
          </p>
          <div className="pr-4">
            {/* 1. Acceptance of Terms */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                By accessing or using this Site, you acknowledge that you have
                read, understood, and agree to be bound by these Terms and
                Conditions, along with our{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                ,{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Returns & Exchange Policy
                </span>
                , and{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Intellectual Property Policy
                </span>
                .
              </p>
            </div>

            {/* 2. Account Registration */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                2. Account Registration & Responsibilities
              </h2>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>
                  Provide true, accurate, current, and complete information
                </li>
                <li>Maintain and promptly update your account information</li>
                <li>
                  Be solely responsible for all activities under your account
                </li>
              </ul>
            </div>

            {/* Repeat for other sections */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold">3. Legal Use & Conduct</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                You agree to use the Site for lawful and personal purposes only.
                Misuse will result in termination and possible legal action.
              </p>
            </div>

            {/* Example for Shipping Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold"> 6. Shipping & Delivery</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                We offer delivery to Canadian addresses within a maximum of 30
                days, subject to unforeseen delays.
              </p>
            </div>

            {/* Contact Info */}
            <div className="">
              <h2 className="text-xl font-semibold">7. Contact Us</h2>
              <p className="text-gray-600 mt-2">
                Email:{" "}
                <a
                  href="mailto:support@ataloptical.com"
                  className="text-blue-600 hover:underline"
                >
                  support@ataloptical.com
                </a>
              </p>
              <p className="text-gray-600">
                Address: 123 Vision Street, Toronto, ON, Canada
              </p>
              <p className="text-gray-600">Phone: 1-800-OPTIC-CA</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
