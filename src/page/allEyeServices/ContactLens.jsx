import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/ContactLens.jpg";
import { Link } from "react-router-dom";

const ContactLens = () => {
    return (
        <div className=" text-white py-16 px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-6xl mx-auto"
            >
                {/* Title */}
                <div className="text-center mb-12 relative">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/">
                            <button
                                className="px-4 py-2 bg-[#f00000] text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                            >
                                Back
                            </button>
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#f00000] ml-35 text-center">
                            Contact Lens
                        </h1>

                        {/* Spacer div to balance flex layout */}
                        <div className="w-[200px]"></div>
                    </div>

                    <div className="w-80 h-1 bg-[#f00000] mx-auto mb-6 rounded-full"></div>

                    <p className="text-black text-lg mx-auto leading-relaxed max-w-6xl">
                        Experience the freedom of crystal-clear vision with contact lenses that combine technology, comfort, and style. Designed for those who live life without boundaries — contact lenses provide effortless clarity and confidence in every look.
                    </p>
                </div>


                {/* Image & Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={image}
                            alt="Contact Lens"
                            className="rounded-2xl shadow-2xl w-full h-87 object-cover border-4 border-red-700"
                            loading="lazy"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#f00000] p-8 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-black">
                            Perfect Vision, Every Moment
                        </h2>
                        <p className="text-gray-100 leading-relaxed">
                            Contact lenses provide natural vision correction by adapting seamlessly to your eye's movement. Whether you're working, traveling, or exercising, these lenses ensure uninterrupted clarity. Lightweight and nearly invisible, they redefine comfort and confidence for your everyday lifestyle. Contact lenses are a modern alternative to traditional eyewear, offering clear, natural vision without the frames. Whether you’re looking for daily comfort, style flexibility, or freedom during sports and outdoor activities, contact lenses provide a seamless visual experience that moves with you.
                        </p>
                    </motion.div>
                </div>

                {/* Why Choose Section */}
                <section className="bg-gray-900 p-8 rounded-2xl mb-12">
                    <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
                        Why Choose Contact Lenses?
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Unlike traditional glasses, contact lenses move with your eyes, providing a full field of vision. Made with advanced moisture-lock technology, they allow your eyes to breathe and remain hydrated all day. Ideal for all lifestyles, contact lenses give you a sleek, frame-free experience that complements every occasion.
                    </p>
                </section>

                {/* Care Section */}
                <section className="text-black p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-black">
                        Eye Care & Hygiene
                    </h2>
                    <p className="leading-relaxed text-black/90">
                        Proper lens care is key to keeping your eyes healthy and your vision sharp. Always clean and store your lenses using recommended solutions. With the right care routine, your lenses stay comfortable, safe, and effective — allowing you to enjoy clear, confident vision every day.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default ContactLens;