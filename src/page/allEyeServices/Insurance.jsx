import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/InsuranceClaims.jpg";
import { Link } from "react-router-dom";

const InsuranceClaims = () => {
    return (
        <div className="bg-gray-50 text-gray-900 overflow-hidden">
            {/* Header / Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[60vh] flex items-center justify-center bg-black"
            >
                <Link to="/" className="absolute top-6 left-6 z-20">
                    <button
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                    >
                        Back
                    </button>
                </Link>
                <img
                    src={image}
                    alt="Insurance Claims"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-5xl md:text-6xl font-extrabold text-red-600 drop-shadow-lg text-center"
                >
                    Insurance Claims
                </motion.h1>
            </motion.div>

            {/* Intro */}
            <section className="max-w-5xl mx-auto py-16 px-6 md:px-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                    Hassle-Free <span className="text-red-700">Insurance Claims</span>
                </motion.h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    At <span className="font-semibold text-red-700">Atal Optical</span>, we make
                    your eyewear insurance claims simple and stress-free. Whether it's for
                    spectacles, contact lenses, or eye exams, our team helps you with every
                    step of the process — from documentation to final approval.
                </p>
            </section>

            {/* Process Steps */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6 md:px-20">
                    <h3 className="text-3xl font-bold text-center mb-10 text-black">
                        Claim Process <span className="text-red-700">Made Easy</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Step 1: Consultation",
                                desc: "Visit Atal Optical and get your eye exam or eyewear invoice. Ensure your insurance covers the required service or product.",
                            },
                            {
                                title: "Step 2: Documentation",
                                desc: "Collect all necessary documents — medical prescription, payment receipt, and insurance card copy.",
                            },
                            {
                                title: "Step 3: Claim Submission",
                                desc: "Submit your claim through our team or directly to your provider. We assist in completing the forms correctly for faster approval.",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                            >
                                <h4 className="text-xl font-semibold text-red-700 mb-3">
                                    {step.title}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Red Info Section */}
            <section className="relative bg-red-700 text-white py-20 md:py-28 -skew-y-2 mt-10">
                <div className="max-w-6xl mx-auto px-6 md:px-20 skew-y-2">
                    <h3 className="text-3xl font-bold mb-6">What’s Covered?</h3>
                    <p className="leading-relaxed text-gray-100 mb-6">
                        Insurance policies differ by provider, but most cover:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-100">
                        <li>Prescription eyeglasses and sunglasses</li>
                        <li>Contact lenses (monthly, yearly, or specialized)</li>
                        <li>Comprehensive eye exams and vision tests</li>
                        <li>Replacement lenses due to damage or prescription change</li>
                    </ul>
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-black mb-4">
                            Tips for a Smooth <span className="text-red-700">Claim Experience</span>
                        </h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700">
                            <li>Keep all your receipts and prescriptions safely stored.</li>
                            <li>Double-check your insurance provider’s coverage details.</li>
                            <li>Submit claims within the valid timeframe mentioned in your policy.</li>
                            <li>Reach out to our staff for any clarification or assistance.</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={image}
                            alt="Insurance Support"
                            className="rounded-2xl w-full h-80 object-cover shadow-md"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Black CTA Section */}
            <section className="bg-black text-white py-16 text-center mb-10">
                <h3 className="text-3xl font-bold mb-4 text-red-500">
                    Need Help with Your Claim?
                </h3>
                <p className="max-w-3xl mx-auto leading-relaxed text-gray-300 mb-6">
                    Our insurance support team at Atal Optical is ready to guide you through
                    every step — from form submission to claim approval. We believe in
                    transparency, efficiency, and care.
                </p>
                <Link to="/contact-us">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition">
                        Contact Us
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default InsuranceClaims;
