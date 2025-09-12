import React from "react";
import { motion } from "framer-motion";

export default function LearnAboutPrescription() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">Atal Optical - Learn About Prescription</h1>
                <p className="text-center text-lg mt-3 text-gray-100">Understanding Your Eyeglass Prescription: Complete Guide 2025</p>
                <hr className="border-white w-235 mt-3 mx-auto" />
            </header>

            {/* Main content */}
            <main className="w-7xl mx-auto px-6 py-10 space-y-10">
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-2xl shadow-md border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Why your prescription matters</h2>
                    <p className="leading-relaxed">
                        A clear and correctly interpreted eyeglass prescription ensures comfortable vision, sharper focus and healthier eyes. In 2025, prescriptions still follow standard notation — but knowing how to read them helps you choose lenses and frames that match your visual needs.
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="shadow-md p-8 rounded-2xl border border-red-600"
                >
                    <h3 className="text-xl font-bold text-red-600 mb-3">Common prescription terms</h3>
                    <ul className="list-disc list-inside space-y-3 ml-3">
                        <li><strong>OD / OS:</strong> Right eye (OD) and Left eye (OS).</li>
                        <li><strong>Sphere (SPH):</strong> The lens power for nearsightedness (-) or farsightedness (+).</li>
                        <li><strong>Cylinder (CYL):</strong> The amount of astigmatism correction needed.</li>
                        <li><strong>Axis:</strong> Orientation (0-180°) of the astigmatism correction.</li>
                        <li><strong>Add (ADD):</strong> Additional power for near tasks (used in multifocals/progressives).</li>
                        <li><strong>PD (Pupillary Distance):</strong> Distance between pupils in millimeters — crucial for lens centration.</li>
                    </ul>
                </motion.section>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="shadow-md p-6 rounded-2xl border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">How to read a sample prescription</h4>
                        <p>
                            Example: OD -2.00 SPH / -0.75 CYL x 90  |  OS -1.75 SPH / -0.50 CYL x 85  |  ADD +2.00  |  PD 62mm.
                        </p>
                        <p className="mt-3">This means the right eye has moderate myopia with astigmatism at axis 90°, and a near addition of +2.00 diopters for reading. PD of 62mm centers the lenses correctly for you.</p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="shadow-md p-6 rounded-2xl border border-red-600"
                    >
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Prescription tips for buying lenses</h4>
                        <ul className="list-disc list-inside space-y-2 ml-3">
                            <li>Always use the latest prescription (usually within 1 year for adults, 6–12 months for children).</li>
                            <li>Provide your PD — many labs require it to position progressive and single-vision lenses accurately.</li>
                            <li>Consider lens material and coatings: high-index, anti-reflective, blue-light filter, and scratch-resistant options affect comfort and cost.</li>
                            <li>For astigmatism, ensure cylinder and axis values are entered exactly as prescribed.</li>
                        </ul>
                    </motion.section>
                </div>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="shadow-md p-8 rounded-2xl border border-red-600"
                >
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Special cases</h2>
                    <p className="mb-3"><strong>Children:</strong> Prescriptions for kids can change quickly — schedule regular eye checks and choose durable, impact-resistant lenses.</p>
                    <p className="mb-3"><strong>High prescriptions:</strong> High plus or minus powers benefit from high-index lenses to reduce thickness and weight.</p>
                    <p><strong>Monovision or multifocal needs:</strong> Discuss options like monovision, bifocals, or progressives with your optometrist to match lifestyle needs.</p>
                </motion.section>

            </main>

        </div>
    );
}
