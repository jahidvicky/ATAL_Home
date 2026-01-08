import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const red = "#f00000";

const FastShippingPage = () => {
    return (
        <div className="w-full">

            {/* Hero Section */}
            <section style={{ backgroundColor: red }} className="text-white py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold"
                    >
                        Fast Shipping & Delivery
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg mt-2"
                    >
                        Get your glasses, contact lenses, and accessories delivered quickly—anywhere in Canada.
                    </motion.p>

                </div>
            </section>

            {/* Main Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    <h2 className="text-3xl font-bold mb-6">Canada-Wide Fast Delivery</h2>

                    <p className="text-gray-600 max-w-3xl mx-auto">
                        We ensure quick and reliable delivery for all your eyewear products.
                        Whether you’re ordering prescription glasses, contact lenses, or accessories,
                        your order is processed and shipped with care—so you can enjoy clear vision without delay.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">

                        {/* Delivery Speed */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="p-8 bg-white rounded-xl shadow text-center border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-bolt text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                            <p className="text-gray-600">Orders are packed and processed within 24 hours.</p>
                        </motion.div>

                        {/* Canada Wide */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="p-8 bg-white rounded-xl shadow text-center border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-map-canada text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Canada-Wide Delivery</h3>
                            <p className="text-gray-600">Reliable delivery across all provinces & territories.</p>
                        </motion.div>

                        {/* Tracking */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="p-8 bg-white rounded-xl shadow text-center border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-location-dot text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                            <p className="text-gray-600">Track your shipment live from warehouse to doorstep.</p>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* Delivery Partners Section */}
            <section className="py-5">
                <div className="max-w-6xl mx-auto px-4 mb-15 text-center">
                    <h2 className="text-3xl font-bold mb-8">Top Delivery Partners</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            "Purolator",
                            "Canada Post",
                            "UPS Canada",
                            "FedEx Canada",
                            "DHL Express",
                        ].map((name, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 + index * 0.1 }}
                                className="p-5 bg-white rounded-xl shadow border text-lg font-semibold"
                                style={{ borderColor: red }}
                            >
                                {name}
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>


            {/* Shipping Methods */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    <h2 className="text-3xl font-bold mb-10">Shipping Options</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {[
                            { icon: "fa-truck", title: "Standard Delivery", text: "3–7 business days across Canada." },
                            { icon: "fa-plane", title: "Express Delivery", text: "1–3 business day express option available." },
                            { icon: "fa-house-circle-check", title: "Home Delivery", text: "Orders delivered straight to your doorstep." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 + i * 0.1 }}
                                className="p-8 bg-white rounded-xl shadow border"
                                style={{ borderColor: red }}
                            >
                                <i
                                    className={`fa-solid ${item.icon} text-4xl mb-4`}
                                    style={{ color: red }}
                                ></i>
                                <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.text}</p>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#f00000] text-white text-center">
                <h2 className="text-3xl font-bold mb-3">Ready to Receive Your Order Fast?</h2>
                <p className="mb-6 text-lg">Place your order today and enjoy reliable, fast shipping.</p>
                <Link to="/allproduct/glasses/69157332eeb23fa59c7d5326">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-10 py-3 bg-white font-semibold rounded-full shadow"
                        style={{ color: red }}
                    >
                        Shop Eyewear Now
                    </motion.button>
                </Link>
            </section>

        </div>
    );
};

export default FastShippingPage;
