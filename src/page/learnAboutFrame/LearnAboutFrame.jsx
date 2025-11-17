import React from "react";
import { motion } from "framer-motion";

export default function LearnAboutFrame() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Atal Optical - Learn About Frame
                </h1>
                <p className="text-center text-lg mt-3 text-gray-100">
                    How to Choose the Perfect Eyeglasses for Your Face Shape: Complete Guide 2025
                </p>
                <hr className="border-white w-210 mt-3 mx-auto" />
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
                    <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
                        Why Choosing the Right Frame Matters
                    </h2>
                    <p className="leading-relaxed">
                        The right eyeglasses are more than just a vision aid—they reflect your
                        personality, enhance your facial features, and boost your confidence.
                        In 2025, trends are evolving, but timeless rules about face shapes and
                        frame compatibility still guide the perfect choice.
                    </p>
                </motion.section>

                {/* Face Shape Sections */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl shadow-md border border-red-600"
                    >
                        <h3 className="text-xl font-bold text-[#f00000] mb-3">Round Face</h3>
                        <p>
                            Angular frames such as rectangular or geometric designs help balance
                            the natural curves of a round face. Avoid overly round frames, as
                            they may exaggerate facial roundness.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl shadow-md border border-red-600"
                    >
                        <h3 className="text-xl font-bold text-[#f00000] mb-3">Square Face</h3>
                        <p>
                            Round or oval frames soften sharp jawlines and strong features,
                            creating balance. Steer clear of boxy frames that emphasize angularity.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl shadow-md border border-red-600"
                    >
                        <h3 className="text-xl font-bold text-[#f00000] mb-3">Oval Face</h3>
                        <p>
                            Almost any frame style works! Oval faces are versatile, but bold,
                            oversized frames are especially flattering, adding character without
                            overwhelming natural proportions.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl shadow-md border border-red-600"
                    >
                        <h3 className="text-xl font-bold text-[#f00000] mb-3">Heart Face</h3>
                        <p>
                            Frames that are wider at the bottom, like aviators or rimless styles,
                            balance a broader forehead with a narrower chin, creating harmony.
                        </p>
                    </motion.section>
                </div>

                {/* 2025 Trends */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
                        Eyeglass Trends in 2025
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ml-3">
                        <li>Transparent and eco-friendly frames are gaining popularity.</li>
                        <li>Bold red, metallic, and black accents define modern looks.</li>
                        <li>Lightweight titanium and sustainable acetate materials lead the way.</li>
                        <li>Custom-fit and AI-powered frame recommendations are trending.</li>
                    </ul>
                </motion.section>
            </main>


        </div>
    );
}
