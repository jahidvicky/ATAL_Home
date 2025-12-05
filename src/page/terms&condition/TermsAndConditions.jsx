import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <>
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">
          Terms & Conditions
        </h1>
        <hr className="border-white w-120 mt-3 mx-auto" />
      </header>

      <section className="px-4 sm:px-8 lg:px-16">
        <div className="mx-auto rounded-2xl p-8">
          <p>Please read these terms carefully before using our website.</p>

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
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Privacy Policy
                </Link>
                ,{" "}
                <Link
                  to="/return-exchange"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Returns & Exchange Policy
                </Link>
                , and{" "}
                <Link
                  to="/intellectual-property"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Intellectual Property Policy
                </Link>
                .
              </p>
            </div>

            {/* 2. Account Registration */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                2. Account Registration & Responsibilities
              </h2>

              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Provide true, accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Be solely responsible for all activities under your account</li>
              </ul>
            </div>

            {/* 3. Legal Use */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold">3. Legal Use & Conduct</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                You agree to use the Site for lawful and personal purposes only.
                Misuse will result in termination and possible legal action.
              </p>
            </div>

            {/* 6. Shipping */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold">6. Shipping & Delivery</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                We offer delivery to Canadian addresses within a maximum of 30
                days, subject to unforeseen delays.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold">7. Contact Us</h2>

              <p className="text-gray-600 mt-2">
                Email:{" "}
                <a
                  href="mailto:sales.ataloptical@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sales.ataloptical@gmail.com
                </a>
                <span> | </span>
                <a
                  href="mailto:info.ataloptical@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  info.ataloptical@gmail.com
                </a>
              </p>

              <p className="text-gray-600">
                Address: Corporate Office: 34 Shining Willow Crescent, Brampton,
                ON L6P 2A2, Canada
              </p>

              <p className="text-gray-600">Phone: 1866-242-3545</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
