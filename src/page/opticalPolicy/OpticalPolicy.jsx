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
                        Atal Optical is committed to providing high-quality optical products and professional
                        services to ensure customer satisfaction.
                    </p>
                </section>

                {/* Policy Items */}
                <section className="grid gap-6 sm:gap-8 sm:grid-cols-2">

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Product Quality Standards</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• All eyeglasses, sunglasses, and optical lenses are sourced from reputable suppliers and meet strict quality standards.</li>
                            <li>• Products are inspected and tested to ensure clarity, durability, and comfort.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Customer Service & Support</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Our trained staff provide guidance on selecting the right optical products for your needs.</li>
                            <li>• We offer professional measurements, fittings, and adjustments to ensure optimal vision and comfort.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Returns & Exchanges</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Returns and exchanges are accepted in accordance with our product warranty and return policy.</li>
                            <li>• Customers must provide a valid receipt or proof of purchase.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Safety & Hygiene</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• We adhere to health and safety guidelines during product handling, eye examinations, and customer interactions.</li>
                            <li>• All equipment and instruments are sanitized regularly to maintain a safe environment.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl sm:col-span-2 bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Professional Consultation</h2>
                        <ul className="mt-3 space-y-2 text-sm text-black">
                            <li>• Customers are encouraged to consult our optical experts for personalized advice.</li>
                            <li>• Our team ensures that prescriptions are accurately filled and that lenses meet the required specifications.</li>
                        </ul>
                    </article>

                    <article className="rounded-xl sm:col-span-2 bg-gray-50 p-6 border border-red-500 shadow-sm">
                        <h2 className="text-lg font-semibold text-red-600">Continuous Improvement</h2>
                        <p className="mt-3 text-sm text-black">
                            Atal Optical regularly updates its Optical Policy to reflect the latest industry standards, customer feedback, and technological advancements.
                        </p>
                    </article>

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
