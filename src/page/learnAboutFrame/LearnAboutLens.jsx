import React from "react";
import { motion } from "framer-motion";

export default function LearnAboutLens() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Atal Optical - Learn About Lens
                </h1>
                <p className="text-center text-lg mt-3 text-gray-100">
                    Progressive Lenses: The Complete Guide 2025
                </p>
                <hr className="border-white w-210 mt-3 mx-auto" />
            </header>

            <main className="w-7xl mx-auto px-6 py-10 space-y-10">
                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        What are Progressive Lenses?
                    </h2>
                    <p className="leading-relaxed">
                        Progressive lenses (also known as no-line bifocals) provide a smooth
                        transition between multiple focal distances — near, intermediate, and
                        distance — within a single lens. Unlike traditional bifocals, there
                        are no visible lines; the power changes gradually to match your vision
                        needs throughout the day.
                    </p>
                </motion.section>

                {/* Why choose progressive */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h3 className="text-xl font-bold text-red-600 mb-3">Why choose progressive lenses?</h3>
                    <ul className="list-disc list-inside ml-3 space-y-2">
                        <li>Smooth, natural vision at all distances — no switching glasses.</li>
                        <li>Cleaner appearance — no visible bifocal line.</li>
                        <li>Convenience for mixed activities: reading, computer work, driving.</li>
                        <li>Modern lens designs reduce distortion and improve comfort.</li>
                    </ul>
                </motion.section>

                {/* How they work and types */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-2xl shadow-md border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">How they work</h4>
                        <p>
                            Progressive lenses are digitally surfaced to provide continuous
                            optical power from the top (distance) down to the bottom (near).
                            The wearer looks through different parts of the lens depending on
                            the activity — driving uses the upper zone, computer work uses the
                            middle, and reading uses the lower zone.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="shadow-md p-6 rounded-2xl border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Types of progressive lenses</h4>
                        <ul className="ml-3 list-disc list-inside space-y-2">
                            <li>Standard progressives — balanced design for general use.</li>
                            <li>Computer-focused progressives — extended intermediate zones.</li>
                            <li>Narrow-field progressives — for smaller frames or minimal distortion.</li>
                            <li>Premium free-form progressives — digitally optimized for wider fields and personalization.</li>
                        </ul>
                    </motion.section>
                </div>

                {/* Choosing and fitting */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="shadow-md p-8 rounded-2xl border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">How to choose & fit progressive lenses</h2>

                    <h5 className="text-md font-semibold text-red-500 mt-3">1. Get an up-to-date prescription</h5>
                    <p>An accurate prescription, including your pupillary distance (PD), is essential for comfortable progressives.</p>

                    <h5 className="text-md font-semibold text-red-500 mt-3">2. Frame selection matters</h5>
                    <p>Choose frames that offer enough vertical height (generally 30mm+ lens height) to accommodate the progressive zones. Small lenses can limit intermediate and near areas.</p>

                    <h5 className="text-md font-semibold text-red-500 mt-3">3. Consider lens design based on use</h5>
                    <p>If you spend long hours on a computer, pick a design with an expanded intermediate zone. For driving, prioritize clear distance vision and a stable corridor.</p>

                    <h5 className="text-md font-semibold text-red-500 mt-3">4. Frame fitting and measurements</h5>
                    <p>Accurate vertical fitting, pantoscopic tilt, and proper temple length ensure the progressive zones align with your eyes. Atal Optical recommends an in-person fitting with our specialists for best results.</p>
                </motion.section>

                {/* Adapting and care */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="shadow-md p-6 rounded-2xl border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Adapting period</h4>
                        <p>
                            Most people adapt to progressives within a few days to a couple of
                            weeks. Mild symptoms like slight dizziness or swimming can occur as
                            your brain learns to use the new zones—these usually resolve with
                            regular wear.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="shadow-md p-6 rounded-2xl border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Care & maintenance</h4>
                        <ul className="ml-3 list-disc list-inside space-y-2">
                            <li>Use a microfibre cloth and lens cleaner — avoid tissue or shirt fabric.</li>
                            <li>Store in a hard case to prevent warping and scratches.</li>
                            <li>Have annual eye checks — vision can change, affecting progressive comfort.</li>
                        </ul>
                    </motion.section>
                </div>

                {/* 2025 trends */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="shadow-md p-8 rounded-2xl border border-red-500"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Progressive Lens Trends 2025</h2>
                    <ul className="list-disc list-inside space-y-2 ml-3">
                        <li>Personalized free-form surfaces created with AI-driven prescriptions.</li>
                        <li>Blue-light filtering integrated into progressive designs for digital lifestyles.</li>
                        <li>Sustainable lens materials and recyclable packaging.</li>
                        <li>Smart lenses with variable tint or AR-friendly optics are becoming more accessible.</li>
                    </ul>
                </motion.section>

            </main>
        </div>
    );
}
