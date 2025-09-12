import React from "react";
import { motion } from "framer-motion";

export default function LearnAboutMaintenance() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Atal Optical - Learn About Maintenance
                </h1>
                <p className="text-center text-lg mt-3 text-gray-100">
                    Essential Guide to Eyeglasses Care and Maintenance: Atal Optical's 10 Tips for 2025
                </p>
                <hr className="border-white w-235 mt-3 mx-auto" />
            </header>

            {/* Content */}
            <main className="w-7xl mx-auto px-6 py-10 space-y-10">
                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Why Eyeglass Care Matters
                    </h2>
                    <p className="leading-relaxed">
                        Proper maintenance not only extends the life of your eyeglasses but also ensures clear vision and comfort. In 2025, advanced lens coatings and lightweight frames require the right care routine to keep them in top condition.
                    </p>
                </motion.section>

                {/* 10 Tips */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Atal Optical's 10 Tips for 2025
                    </h2>
                    <ol className="list-decimal list-inside space-y-3 ml-3">
                        <li>Clean lenses daily with a microfiber cloth and lens cleaner.</li>
                        <li>Avoid tissues, paper towels, or shirts — they scratch lenses.</li>
                        <li>Rinse under lukewarm water before wiping to remove dust and debris.</li>
                        <li>Keep glasses in a hard protective case when not in use.</li>
                        <li>Avoid leaving glasses in hot cars — heat can warp frames and coatings.</li>
                        <li>Hold glasses with both hands to avoid bending frames.</li>
                        <li>Schedule regular adjustments at Atal Optical for best fit.</li>
                        <li>Check screws and hinges; tighten or service when needed.</li>
                        <li>Use anti-fog solutions if working in humid or masked environments.</li>
                        <li>Update your prescription regularly to ensure optimal vision.</li>
                    </ol>
                </motion.section>

                {/* Trends */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Eyeglass Care Trends in 2025
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ml-3">
                        <li>Eco-friendly cleaning sprays and biodegradable wipes.</li>
                        <li>UV-protective coatings lasting longer with proper care.</li>
                        <li>Smart cases with built-in cleaners becoming mainstream.</li>
                        <li>Blue-light and anti-reflective coatings requiring gentler maintenance.</li>
                    </ul>
                </motion.section>
            </main>
        </div>
    );
}