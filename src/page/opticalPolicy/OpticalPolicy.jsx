import React from "react";

export default function OpticalPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-600">
                        Atal Optical — Optical Policy
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-red-500">
                        Committed to high-quality products and professional service
                    </p>
                </header>

                {/* Intro Card */}
                <section className="rounded-xl border border-red-500 bg-red-100 p-6 sm:p-8 mb-10 shadow-sm">
                    <p className="text-sm sm:text-base leading-relaxed text-black">
                        Atal Optical is committed to providing high-quality eyewear, lenses, optical products, and
                        professional services. Our goal is to provide accurate prescriptions, quality products,
                        proper fitting, and excellent customer service.
                    </p>
                </section>

                {/* Policy Items */}
                <section className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">1. Product Quality Standards</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• All eyeglasses, sunglasses, optical lenses, and related products are sourced from reputable suppliers and meet applicable quality standards.</li>
                            <li>• Products are inspected to ensure quality, clarity, durability, proper fitting, and comfort.</li>
                            <li>• Prescription lenses are prepared according to the prescription and specifications provided by the customer or prescribing professional.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">2. Customer Service & Support</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Our trained staff provide guidance in selecting frames, lenses, and optical products based on individual customer needs.</li>
                            <li>• We provide professional measurements, fittings, adjustments, and after-sales support.</li>
                            <li>• Customers are encouraged to contact us promptly if they have any concerns regarding their eyewear, fitting, or product.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">3. Returns & Exchanges</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Returns and exchanges are subject to Atal Optical's applicable return and warranty terms.</li>
                            <li>• Custom-made prescription lenses and prescription eyewear may have specific return or exchange conditions.</li>
                            <li>• Customers must provide a valid receipt or proof of purchase.</li>
                            <li>• Certain customized, special-order, sale, or other products may be subject to specific conditions.</li>
                        </ul>
                        <p className="mt-3 text-xs font-medium text-red-600">
                            Please refer to our Full Terms & Conditions for complete details.
                        </p>
                    </article>


                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">4. Warranty & Remake Policy</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Warranty coverage may vary depending on the product, manufacturer, and purchase.</li>
                            <li>• Manufacturing defects will be reviewed and, where covered, repaired or replaced in accordance with the applicable warranty.</li>
                            <li>• Where applicable, prescription lens remakes may be considered if an error is identified in the prescription, measurements, specifications, or manufacturing process.</li>
                            <li>• Warranty coverage may not include accidental damage, scratches, misuse, normal wear and tear, or unauthorized modifications.</li>
                        </ul>
                        <p className="mt-3 text-xs font-medium text-red-600">
                            Please refer to our Full Terms & Conditions for complete warranty details.
                        </p>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">5. Safety & Hygiene</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• We follow applicable health, safety, and hygiene practices during product handling, measurements, fittings, and customer interactions.</li>
                            <li>• Optical equipment and instruments are cleaned and sanitized regularly.</li>
                            <li>• We maintain appropriate hygiene practices to provide a safe and comfortable environment for our customers.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">6. Professional Consultation</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Customers are encouraged to consult with qualified optical professionals for personalized advice regarding eyewear and lens selection.</li>
                            <li>• Prescription eyewear is prepared according to the prescription and specifications provided to us.</li>
                            <li>• We verify measurements and order details whenever applicable before processing an order.</li>
                            <li>• Customers should contact us promptly if they have concerns regarding their prescription, eyewear, or fitting.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">7. Prescription & Customer Information</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Customers are responsible for providing accurate and current prescription information where applicable.</li>
                            <li>• Customer and prescription information is handled appropriately and in accordance with applicable privacy requirements.</li>
                            <li>• Information provided to Atal Optical is used for the purpose of providing optical products and services.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">8. Orders & Payment</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Customized and prescription orders may be subject to specific payment, deposit, or order conditions.</li>
                            <li>• Customers are encouraged to review order details, including frame, lens type, coatings, prescription, and selected options before confirming an order.</li>
                            <li>• Special-order and customized products may be subject to additional terms and conditions.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">9. Continuous Improvement</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• We regularly review our products, services, procedures, and customer feedback to improve the quality of our service.</li>
                            <li>• We welcome customer feedback and suggestions.</li>
                        </ul>
                    </article>

                </section>

                {/* Summary Note */}
                <section className="mt-10 rounded-xl border border-red-500 bg-gray-50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-black leading-relaxed">
                        This page provides a general summary of Atal Optical's Optical Policy. Specific terms may
                        apply depending on the product or service purchased. For complete details regarding
                        returns, exchanges, warranties, prescription remakes, special orders, payments, and other
                        applicable conditions, please review our Full Terms & Conditions.
                    </p>
                    <a
                        href="/terms-and-conditions"
                        className="shrink-0 inline-block text-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                    >
                        Read Full Terms & Conditions
                    </a>
                </section>

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <p className="text-lg text-black">
                        If you have questions about our policy or need assistance, please{" "}
                        <a href="/contact-us" className="underline text-red-500 hover:text-red-600">
                            contact us
                        </a>.
                    </p>
                </footer>
            </div>
        </main>
    );
}
