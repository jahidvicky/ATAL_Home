import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "../assets/test/human1.jpg";

const OfferPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showEmailBox, setShowEmailBox] = useState(false);
    const [email, setEmail] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const hasShown = sessionStorage.getItem("offerPopupShown");
        if (!hasShown) {
            const timer = setTimeout(() => setShowPopup(true), 1000);
            sessionStorage.setItem("offerPopupShown", "true");
            return () => clearTimeout(timer);
        }
    }, []);

    const handleEmailSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setDiscountCode("ATAL20");
    };

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    key="popup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-md bg-black/40"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[90%] md:w-[700px] flex flex-col md:flex-row relative"
                    >
                        {/* Left Image */}
                        <div className="md:w-1/2">
                            <img
                                src={img}
                                alt="Offer visual"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center text-center">
                            {!showEmailBox && !discountCode && (
                                <>
                                    <h2 className="text-2xl font-semibold mb-2">Atal Opticals</h2>
                                    <p className="text-2xl font-bold mb-1">
                                        20% off contact lenses
                                    </p>
                                    <p className="text-gray-500 mb-3">+ free shipping</p>
                                    <p className="text-lg font-semibold mb-1">&</p>
                                    <p className="text-2xl font-bold mb-2">30% off glasses</p>
                                    <p className="text-gray-500 mb-6">+ free shipping</p>

                                    <button
                                        onClick={() => setShowEmailBox(true)}
                                        className="bg-black text-white py-3 rounded-md mb-3 hover:bg-gray-800 transition"
                                    >
                                        Unlock Discount Now
                                    </button>
                                    <button className="border border-black py-3 rounded-md mb-3 hover:bg-gray-100 transition">
                                        Save Discount for Later
                                    </button>

                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="text-gray-500 underline text-sm hover:text-black transition"
                                    >
                                        Decline Discount
                                    </button>
                                </>
                            )}

                            {/* Email Box */}
                            {showEmailBox && !discountCode && (
                                <motion.div
                                    key="emailBox"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-semibold mb-3">
                                        Enter your email to unlock your code
                                    </h3>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="border border-gray-300 rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mb-3">{error}</p>
                                    )}
                                    <button
                                        onClick={handleEmailSubmit}
                                        className="bg-black text-white py-3 rounded-md w-full hover:bg-gray-800 transition"
                                    >
                                        Get Discount Code
                                    </button>
                                </motion.div>
                            )}

                            {/* Discount Code Display */}
                            {discountCode && (
                                <motion.div
                                    key="discountCode"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-semibold mb-4">
                                        Congratulations!
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        Here’s your exclusive discount code:
                                    </p>
                                    <div className="border border-dashed border-black rounded-md py-3 text-xl font-bold text-black mb-4">
                                        {discountCode}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Use this code at checkout to save instantly.
                                    </p>
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="bg-black text-white py-3 rounded-md w-full hover:bg-gray-800 transition"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                            onClick={() => setShowPopup(false)}
                        >
                            ×
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfferPopup;
