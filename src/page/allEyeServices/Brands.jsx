import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/Brands.jpeg";
import { Link } from "react-router-dom";

const Brands = () => {
    return (
        <div className="bg-white text-gray-900">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] overflow-hidden">
                <Link to="/" className="absolute top-6 left-6 z-20">
                    <button
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                    >
                        Back
                    </button>
                </Link>
                <img
                    src={image}
                    alt="Brand"
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-extrabold text-red-600 drop-shadow-lg text-center"
                    >
                        Our Brand
                    </motion.h1>
                </div>
            </div>

            {/* Intro Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto py-16 px-6 md:px-20 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    The Identity of <span className="text-red-700">Atal Optical</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Atal Optical represents trust, precision, and timeless style. Our brand
                    stands for excellence in vision care — where innovation meets tradition.
                    Each product we offer reflects our dedication to quality, comfort, and
                    individuality.
                </p>
            </motion.section>

            {/* Split Red-Black Section */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-red-700 text-white p-10 md:p-16 flex flex-col justify-center"
                >
                    <h3 className="text-2xl font-semibold mb-4">A Legacy of Vision</h3>
                    <p className="leading-relaxed text-gray-100">
                        For years, Atal Optical has been more than an eyewear brand — it’s a
                        statement of confidence. Our mission is to redefine the way people
                        experience vision by combining cutting-edge technology with
                        world-class craftsmanship.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-black text-white p-10 md:p-16 flex flex-col justify-center"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-red-500">
                        Our Brand Promise
                    </h3>
                    <p className="leading-relaxed text-gray-200">
                        Every frame, lens, and design embodies our promise — to deliver the
                        best visual clarity and unmatched comfort. We are committed to
                        innovation, sustainability, and bringing a fashionable edge to every
                        look.
                    </p>
                </motion.div>
            </div>

            {/* Values Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <div className="bg-red-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-red-700 mb-3">Innovation</h4>
                    <p className="text-gray-700 leading-relaxed">
                        Constantly evolving with the latest in optical technology to give
                        you sharper, smarter, and safer vision.
                    </p>
                </div>

                <div className="bg-black text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-red-500 mb-3">Quality</h4>
                    <p className="leading-relaxed">
                        We use the finest materials and expert craftsmanship to ensure every
                        product meets our premium standards.
                    </p>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-red-700 mb-3">Style</h4>
                    <p className="text-gray-700 leading-relaxed">
                        Our designs are inspired by modern aesthetics and timeless trends,
                        crafted to match every personality and face.
                    </p>
                </div>
            </motion.section>

            {/* Closing Section */}
            <section className="bg-black text-white p-10 md:p-16 text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 text-red-500">
                    Discover the Spirit of Atal Optical
                </h2>
                <p className="max-w-3xl mx-auto leading-relaxed text-gray-300">
                    Our brand stands for trust, clarity, and sophistication. Join us on our
                    journey to make vision care not just a necessity, but a lifestyle. Atal
                    Optical — where your eyes meet elegance.
                </p>
            </section>
        </div>
    );
};

export default Brands;
