import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/BlueLightTechnology.jpg";
import { Link } from "react-router-dom";

const BlueLightTechnology = () => {
    return (
        <div className="bg-gray-50 text-gray-900 overflow-hidden">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[60vh] flex items-center justify-center bg-black"
            >
                <Link to="/" className="absolute top-6 left-6 z-20">
                    <button
                        className="px-4 py-2 bg-[#f00000] text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                    >
                        Back
                    </button>
                </Link>
                <img
                    src={image}
                    alt="Blue Light Protection"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/50" />
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-5xl md:text-6xl font-extrabold text-[#f00000] text-center"
                >
                    Blue Light Technology
                </motion.h1>
            </motion.div>

            {/* Intro Section */}
            <section className="max-w-7xl mx-auto py-16 px-6 md:px-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                    Advanced <span className="text-[#f00000]">Blue Light Protection</span>
                </motion.h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    In today's digital world, our eyes are constantly exposed to harmful
                    blue light emitted from screens. At <span className="font-semibold text-[#f00000]">Atal Optical</span>,
                    we use cutting-edge <strong>Blue Light Filter Technology</strong> in lenses to reduce
                    eye strain, improve sleep, and enhance long-term vision health.
                </p>
            </section>

            {/* Technology Highlights */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={image}
                            alt="Blue Light Lenses"
                            className="rounded-2xl w-full h-80 object-cover shadow-md"
                            loading="lazy"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-black mb-4">
                            How <span className="text-[#f00000]">Blue Light Filter</span> Works
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Blue light filter lenses use advanced coatings and materials that
                            selectively block harmful high-energy visible (HEV) light while
                            maintaining clear vision and natural color balance.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Reduces digital eye strain and fatigue</li>
                            <li>Improves focus during screen time</li>
                            <li>Enhances contrast and comfort for night use</li>
                            <li>Protects eyes from long-term damage</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="bg-gradient-to-b from-black to-red-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-6"
                    >
                        Why Choose <span className="text-[#f00000]">Atal Optical</span> Blue Light Glasses?
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Precision Lenses",
                                desc: "Crafted with premium coatings that block 90% of harmful blue rays without compromising visual clarity.",
                            },
                            {
                                title: "Screen-Ready Comfort",
                                desc: "Perfect for professionals, gamers, and students — designed for extended digital use.",
                            },
                            {
                                title: "Stylish & Protective",
                                desc: "Available in modern frames that blend technology and fashion effortlessly.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white/10 p-6 rounded-2xl shadow-md hover:shadow-lg border border-white/20 transition"
                            >
                                <h4 className="text-xl font-semibold text-[#f00000] mb-3">
                                    {item.title}
                                </h4>
                                <p className="text-gray-200 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-black mb-4">
                            Tips for <span className="text-[#f00000]">Healthy Digital Vision</span>
                        </h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700">
                            <li>Follow the <strong>20-20-20 rule</strong> - every 20 minutes, look 20 feet away for 20 seconds.</li>
                            <li>Adjust your screen brightness and contrast to reduce glare.</li>
                            <li>Use blue light protection lenses during extended screen use.</li>
                            <li>Keep your screen at least an arm's length away from your eyes.</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={image}
                            alt="Digital Eye Protection"
                            className="rounded-2xl w-full h-80 object-cover shadow-md"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black text-white py-16 text-center mb-10">
                <h3 className="text-3xl font-bold mb-4 text-[#f00000]">
                    Protect Your Eyes from Digital Fatigue
                </h3>
                <p className="max-w-3xl mx-auto leading-relaxed text-gray-300 mb-6">
                    Experience clarity and comfort with Atal Optical's Blue Light Technology lenses.
                    Perfect for professionals, gamers, and anyone who spends hours on screens.
                </p>
            </section>
        </div>
    );
};

export default BlueLightTechnology;
