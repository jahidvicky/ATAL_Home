import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Chatbot from "../../components/Chatbot"


const red = "#f00000";

const CustomerCarePage = () => {
    const [openChat, setOpenChat] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
                        24/7 Customer Care
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg mt-2"
                    >
                        We're here for you anytime, anywhere – because your vision matters.
                    </motion.p>

                </div>
            </section>

            {/* Main Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">We're Always Available to Help You</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Whether it's about your order, prescription, subscription plan, or general support —
                        our dedicated optical care team is available round-the-clock to assist you.
                        Call, chat, or email us anytime.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">

                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="p-8 bg-white rounded-xl shadow border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-phone-volume text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                            <p className="text-gray-600">Talk to our experts 24/7 for quick help.</p>
                            <p style={{ color: red }} className="font-bold mt-3">+1 1866-242-3545</p>
                        </motion.div>

                        {/* Live Chat */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="p-8 bg-white rounded-xl shadow border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-comments text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                            <p className="text-gray-600">Instant solutions through live chat support.</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="mt-4 px-6 py-2 text-white rounded-full"
                                style={{ backgroundColor: red }}
                                onClick={() => setOpenChat(!openChat)}
                            >
                                Start Chat
                            </motion.button>
                        </motion.div>

                        {/* Chatbox - toggles open/close */}
                        {openChat && (
                            <div className="fixed bottom-20 right-6 z-50">
                                <Chatbot onClose={() => setOpenChat(false)} />
                            </div>
                        )}

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="p-8 bg-white rounded-xl shadow border"
                            style={{ borderColor: red }}
                        >
                            <i className="fa-solid fa-envelope-open-text text-4xl mb-4" style={{ color: red }}></i>
                            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                            <p className="text-gray-600">Get responses within minutes — any time of day.</p>
                            <p className="font-bold mt-3" style={{ color: red }}>
                                sales.ataloptical@gmail.com <br />
                                info.ataloptical@gmail.com
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-10">What We Can Help You With</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {[
                            { icon: "fa-file-prescription", title: "Prescription Help", text: "Understanding your vision prescription made easy." },
                            { icon: "fa-box", title: "Order Tracking", text: "Real-time updates for your order shipments." },
                            { icon: "fa-sync", title: "Subscription Support", text: "Modify, pause, or cancel your subscription anytime." },
                            { icon: "fa-wand-magic-sparkles", title: "Frame & Lens Advice", text: "Find the best style and lens type for your needs." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 + i * 0.1 }}
                                className="p-6 bg-white rounded-xl shadow border text-center"
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

            {/* CTA */}
            <section className="py-20 bg-black text-white text-center">
                <h2 className="text-3xl font-bold mb-3">Need Help Right Now?</h2>
                <p className="mb-6">Our support team is standing by 24/7 to assist you.</p>
                <Link to="/contact-us">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-10 py-3 bg-white font-semibold rounded-full shadow"
                        style={{ color: red }}
                    >
                        Contact Support
                    </motion.button>
                </Link>
            </section>

        </div>
    );
};

export default CustomerCarePage;
