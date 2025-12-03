import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../../assets/megaMenu/1st.avif";
import img2 from "../../assets/megaMenu/3rd.avif";

const red = "#f00000";

const PricingPage = () => {
    return (
        <div className="w-full">

            {/* Hero Section */}
            <section style={{ backgroundColor: red }} className="text-white py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold"
                    >
                        High-quality eyewear at affordable prices
                    </motion.h1>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Affordable Prices for Premium Eyewear
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                        {/* Glasses Pricing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-50 rounded-xl shadow p-6 border flex flex-col h-full"
                            style={{ borderColor: red }}
                        >
                            <img
                                src={img1}
                                alt="Glasses"
                                className="w-full h-90 object-cover rounded-lg"
                            />

                            <div className="mt-auto pt-6 text-center">
                                <Link to="/allproduct/glasses/69157332eeb23fa59c7d5326">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-8 py-3 text-white rounded-full font-semibold"
                                        style={{ backgroundColor: red }}
                                    >
                                        Shop Glasses
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>


                        {/* Contacts Pricing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-50 rounded-xl shadow p-6 border flex flex-col h-full"
                            style={{ borderColor: red }}
                        >
                            <img
                                src={img2}
                                alt="Contact Lenses"
                                className="w-full h-90 object-cover rounded-lg"
                            />

                            <div className="mt-auto pt-6 text-center">
                                <Link to="/allproduct/contact_lenses/6915735feeb23fa59c7d532b">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-8 py-3 text-white rounded-full font-semibold"
                                        style={{ backgroundColor: red }}
                                    >
                                        Shop Contact Lenses
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Buy From Us?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {[
                            {
                                icon: "fa-shield",
                                title: "Premium Quality",
                                text: "Certified optical products sourced for Canadian standards.",
                            },
                            {
                                icon: "fa-truck-fast",
                                title: "Fast Delivery",
                                text: "Fast & reliable shipping across Canada.",
                            },
                            {
                                icon: "fa-headset",
                                title: "24/7 Support",
                                text: "Our team is always ready to help you.",
                            },
                            {
                                icon: "fa-tag",
                                title: "Affordable Pricing",
                                text: "Best value compared to retail optical stores.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 + i * 0.1 }}
                                className="p-6 bg-white rounded-xl shadow border"
                                style={{ borderColor: red }}
                            >
                                <i
                                    className={`fa-solid ${item.icon} text-3xl mb-3`}
                                    style={{ color: red }}
                                ></i>
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-black text-white text-center">
                <h2 className="text-3xl font-bold mb-3">Upgrade Your Vision Today</h2>
                <p className="mb-6 text-lg">
                    High-quality eyewear at prices you'll love.
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-10 py-3 bg-white font-semibold rounded-full shadow"
                        style={{ color: red }}
                    >
                        Explore Products
                    </motion.button>
                </Link>
            </section>

        </div>
    );
};

export default PricingPage;
