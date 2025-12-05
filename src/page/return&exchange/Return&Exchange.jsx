import React from "react";
import { motion } from "framer-motion";

export default function ReturnExchangePolicy() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-2 max-w-8xl flex justify-center">
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.2 }}
                className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10"
            >
                {/* Heading */}
                <motion.h1
                    variants={fadeIn}
                    className="text-4xl md:text-5xl font-extrabold text-center text-red-600 mb-10"
                >
                    Return & Exchange Policy
                </motion.h1>

                {/* Section */}
                <motion.div variants={fadeIn} className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        Prescription eyewear and lenses are <strong>final sale and non-exchangeable</strong>,
                        as they are custom-made to the individual’s prescription.
                    </p>

                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        Non-prescription sunglasses and frames may be eligible for <strong>exchange within 7 days</strong>
                        of purchase if they are unused, unworn, and in original packaging.
                        Refunds are not provided.
                    </p>

                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        There are <strong>no restocking fees</strong> for product-related visits or adjustments.
                    </p>

                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        Fit adjustments, screw replacements, and basic aftercare services are provided
                        <strong> free of charge</strong> to our customers.
                    </p>

                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        Contact lenses may be exchanged only if boxes are <strong>unopened, sealed</strong>, and
                        within expiry date. Opened or used boxes are not eligible for return.
                    </p>

                    <p className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        For health and safety reasons, no returns are accepted on eye drops, cleaning
                        solutions, or any consumable products.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
