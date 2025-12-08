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
          <p className="text-gray-700 mb-6">
            Please read these terms carefully before using our website or
            purchasing our products or services.
          </p>

          <div className="pr-4 space-y-8 text-gray-700">
            {/* 1. Business Overview */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                1. Business Overview
              </h2>
              <p className="mt-2 leading-relaxed">
                Atal Optical is a retail optical business operating in Ontario,
                Canada, providing prescription eyewear, frames, lenses,
                sunglasses, contact lenses, and related optical services. By
                using our website or purchasing our products or services, you
                agree to these Terms & Conditions.
              </p>
            </div>

            {/* 2. Eligibility */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                2. Eligibility
              </h2>
              <p className="mt-2 leading-relaxed">
                By using our website or services, you confirm that:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  You are at least <strong>18 years of age</strong>, or
                </li>
                <li>You have permission from a legal guardian</li>
              </ul>
            </div>

            {/* 3. Prescription Accuracy & Customer Responsibility */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                3. Prescription Accuracy & Customer Responsibility
              </h2>
              <p className="mt-2 leading-relaxed">
                Customers are responsible for providing:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>A valid and current prescription</li>
                <li>Accurate personal information</li>
                <li>Correct pupillary distance (PD) if required</li>
              </ul>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Atal Optical is <strong>not responsible</strong> for vision
                issues caused by incorrect information supplied by the customer.
              </p>
            </div>

            {/* 4. Orders & Acceptance */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                4. Orders & Acceptance
              </h2>
              <p className="mt-2 leading-relaxed">
                All orders placed are subject to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Product availability</li>
                <li>Price confirmation</li>
                <li>Prescription validation</li>
              </ul>
              <p className="mt-2 text-gray-600 leading-relaxed">
                We reserve the right to refuse service, cancel suspicious or
                fraudulent orders, and limit quantities per customer.
              </p>
            </div>

            {/* 5. Pricing & Payments */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                5. Pricing & Payments
              </h2>
              <p className="mt-2 leading-relaxed">
                Prices are listed in Canadian Dollars (CAD). We accept debit,
                credit cards, and approved financing options. Prices may change
                without prior notice. Full payment is required before order
                processing.
              </p>
            </div>

            {/* 6. Refund, Return & Exchange Policy Reference */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                6. Refund, Return & Exchange Policy Reference
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Prescription eyewear and frames are final sale</li>
                <li>No refunds on custom products</li>
                <li>
                  Only eligible non-prescription sunglasses may qualify for
                  exchange (as per separate policy)
                </li>
              </ul>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Please refer to our separate Returns & Exchange Policy for full
                details. You can view it{" "}
                <Link
                  to="/return-exchange"
                  className="text-blue-600 hover:underline"
                >
                  here
                </Link>
                .
              </p>
            </div>

            {/* 7. Warranty Policy */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                7. Warranty Policy
              </h2>
              <p className="mt-2 leading-relaxed">
                Manufacturer warranties apply only to manufacturing defects and
                material faults. Warranties do not cover scratches, accidental
                breakage, normal wear and tear, or improper use or storage.
              </p>
            </div>

            {/* 8. Shipping & Delivery Terms */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                8. Shipping & Delivery Terms
              </h2>
              <p className="mt-2 leading-relaxed">
                Delivery timelines are estimated only. We are not liable for
                courier delays, weather delays, or incorrect address details
                provided by the customer. Risk of loss transfers to the customer
                once the product is shipped.
              </p>
            </div>

            {/* 9. Product Measurements & Fittings */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                9. Product Measurements & Fittings
              </h2>
              <p className="mt-2 leading-relaxed">
                Customers are responsible for frame size selection and fit
                preferences. In-store adjustments are provided as a courtesy and
                are not guaranteed.
              </p>
            </div>

            {/* 10. Privacy & Data Protection */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                10. Privacy & Data Protection
              </h2>
              <p className="mt-2 leading-relaxed">
                Customer information is collected and protected in accordance
                with PIPEDA (Canada) and Ontario privacy regulations. Refer to
                our separate{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                for full details.
              </p>
            </div>

            {/* 11. Promotions, Discounts & Gift Cards */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                11. Promotions, Discounts & Gift Cards
              </h2>
              <p className="mt-2 leading-relaxed">
                Promotional offers are time-limited and cannot be combined
                unless stated. Final sale items are excluded from additional
                promotions. Gift cards are non-refundable, have no cash value,
                and cannot be replaced if lost or stolen.
              </p>
            </div>

            {/* 12. Limitation of Liability */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                12. Limitation of Liability
              </h2>
              <p className="mt-2 leading-relaxed">
                Atal Optical is not responsible for indirect damages, loss of
                income or profits, or vision discomfort resulting from
                customer-provided prescription errors. Liability is limited to
                the purchase price of the product.
              </p>
            </div>

            {/* 13. Governing Law */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                13. Governing Law
              </h2>
              <p className="mt-2 leading-relaxed">
                All transactions and disputes are governed by the laws of the
                <strong> Province of Ontario, Canada</strong>, and federal laws
                of Canada.
              </p>
            </div>

            {/* 14. Changes to Terms & Conditions */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                14. Changes to Terms & Conditions
              </h2>
              <p className="mt-2 leading-relaxed">
                Atal Optical reserves the right to modify these Terms &amp;
                Conditions at any time. Updates will be published on the website
                without prior notice.
              </p>
            </div>

            {/* 15. Termination of Use */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                15. Termination of Use
              </h2>
              <p className="mt-2 leading-relaxed">
                We reserve the right to suspend website access, terminate
                service, or refuse transactions if misuse, abuse, or fraudulent
                activity is detected.
              </p>
            </div>

            {/* Contact Us - Keep existing contact info as requested */}
            <div>
              <h2 className="text-xl font-semibold">Contact Us</h2>

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
