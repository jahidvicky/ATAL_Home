import React from "react";
import { motion } from "framer-motion";

export default function EyeCheckDetails() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Atal Optical - Eye Check Details
                </h1>
                <p className="text-center text-lg mt-3 text-gray-100">
                    Advanced Care for Dry Eye & Complete Eye Health - 2025
                </p>
                <hr className="border-white w-200 mt-3 mx-auto" />
            </header>

            {/* Main Content */}
            <main className="w-7xl mx-auto px-6 py-10 space-y-10">
                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Why Eye Checks at Atal Optical?
                    </h2>
                    <p className="leading-relaxed">
                        At Atal Optical, we understand that your eyes are more than just
                        windows to the world—they're vital to your overall well-being. Our
                        advanced eye check services go beyond routine vision tests to
                        diagnose, treat, and prevent conditions like dry eye syndrome,
                        refractive errors, and other ocular concerns. With expert care and
                        modern technology, we create personalized treatment plans designed
                        to keep your eyes healthy and comfortable.
                    </p>
                </motion.section>

                {/* Specialized Services */}
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Comprehensive Eye Exams",
                            text: "Detailed eye exams to detect early signs of dry eye, refractive errors, and overall eye health issues.",
                        },
                        {
                            title: "Dry Eye Diagnosis",
                            text: "Using tear film analysis and meibomian gland imaging, we identify the exact cause of your discomfort.",
                        },
                        {
                            title: "Advanced Dry Eye Treatments",
                            text: "From prescription drops to in-office therapies, we provide tailored solutions for mild to severe dry eye cases.",
                        },
                        {
                            title: "Lifestyle & Preventive Guidance",
                            text: "Personalized advice on diet, hydration, and screen habits to reduce symptoms and protect your long-term eye health.",
                        },
                    ].map((item, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl shadow-md border border-red-600"
                        >
                            <h3 className="text-xl font-bold text-red-600 mb-3">
                                {item.title}
                            </h3>
                            <p>{item.text}</p>
                        </motion.section>
                    ))}
                </div>

                {/* What to Expect */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        What to Expect During Your Visit
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 ml-3">
                        <li>
                            <strong>Initial Consultation:</strong> Share your symptoms and
                            history with our specialists.
                        </li>
                        <li>
                            <strong>Advanced Testing:</strong> We conduct tear analysis and
                            other diagnostic evaluations.
                        </li>
                        <li>
                            <strong>Personalized Plan:</strong> A tailored treatment plan for
                            your unique eye needs.
                        </li>
                        <li>
                            <strong>Ongoing Support:</strong> Regular follow-ups to ensure
                            long-term comfort and clarity.
                        </li>
                    </ol>
                </motion.section>

                {/* Trends / Innovations */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Innovations in Eye Care - 2025
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ml-3">
                        <li>
                            AI-powered eye screenings for faster and more accurate diagnosis.
                        </li>
                        <li>
                            Non-invasive dry eye treatments for improved patient comfort.
                        </li>
                        <li>
                            Eco-friendly contact lenses and sustainable frame materials.
                        </li>
                        <li>
                            Personalized digital eye strain management programs.
                        </li>
                    </ul>
                </motion.section>

            </main>
        </div>
    );
}
