import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "../assets/test/human1.jpg";
import API from "../API/Api";

const OfferPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSaveLater, setIsSaveLater] = useState(false);

    // popup open after 1s (only once per session)
    useEffect(() => {
        const hasShown = sessionStorage.getItem("offerPopupShown");
        if (!hasShown) {
            const timer = setTimeout(() => setShowPopup(true), 1000);
            sessionStorage.setItem("offerPopupShown", "true");
            return () => clearTimeout(timer);
        }
    }, []);

    // Close popup smoothly
    const handleDecline = () => {
        setShowPopup(false);
    };

    // When user clicks "Unlock Discount Now" → open email input (no API)
    const handleUnlockNow = () => {
        setIsSaveLater(false);
        setShowEmailInput(true);
    };

    // When user clicks "Save Discount for Later" → open email input (with API)
    const handleSaveLaterClick = () => {
        setIsSaveLater(true);
        setShowEmailInput(true);
    };

    // Validate & optionally send email → then show code
    const handleEmailSubmit = async () => {
        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            if (isSaveLater) {
                // Only hit the API if the user clicked “Save Discount for Later”
                await API.post("/save-discount-email", {
                    email,
                    discountCode: "ATAL20",
                });
            }

            // Always show discount code after successful input
            setDiscountCode("ATAL20");
        } catch (err) {
            console.error("Email save error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    key="popup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-md bg-black/40"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[90%] md:w-[750px] flex flex-col md:flex-row relative"
                    >
                        {/* Left Image */}
                        <div className="md:w-1/2">
                            <img
                                src={img}
                                alt="Offer visual"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center text-center">
                            {/* Step 1: Offer Screen */}
                            {!showEmailInput && !discountCode && (
                                <>
                                    <h2 className="text-2xl font-semibold mb-2">Atal Opticals</h2>
                                    <p className="text-gray-700 text-sm mb-3">Enjoy</p>

                                    <p className="text-3xl font-bold mb-1">
                                        20% off on contact lenses
                                    </p>
                                    <p className="text-gray-500 mb-3">+ free shipping</p>
                                    <p className="text-lg font-semibold mb-1">&</p>
                                    <p className="text-3xl font-bold mb-2">20% off on glasses</p>
                                    <p className="text-gray-500 mb-6">+ free shipping</p>

                                    {/* Unlock Discount Now → open email (no API) */}
                                    <button
                                        onClick={handleUnlockNow}
                                        className="bg-black text-white py-3 rounded-md mb-3 hover:bg-gray-800 transition-all duration-200"
                                    >
                                        Unlock Discount Now
                                    </button>

                                    {/* Save Discount → open email (with API) */}
                                    <button
                                        onClick={handleSaveLaterClick}
                                        className="border border-black py-3 rounded-md mb-3 hover:bg-gray-100 transition-all duration-200"
                                    >
                                        Save Discount for Later
                                    </button>

                                    {/* Decline */}
                                    <button
                                        onClick={handleDecline}
                                        className="text-gray-500 underline text-sm hover:text-black transition-all duration-200"
                                    >
                                        Decline Discount
                                    </button>
                                </>
                            )}

                            {/* Step 2: Email Input */}
                            {showEmailInput && !discountCode && (
                                <motion.div
                                    key="emailInput"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-semibold mb-3">
                                        Enter your email address
                                    </h3>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="border border-gray-300 rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {error && (
                                        <p className="text-[#f00000] text-sm mb-3">{error}</p>
                                    )}
                                    <button
                                        onClick={handleEmailSubmit}
                                        disabled={loading}
                                        className="bg-black text-white py-3 rounded-md w-full hover:bg-gray-800 transition-all duration-200 disabled:opacity-60"
                                    >
                                        {loading ? "Submitting..." : "Get My Discount Code"}
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="border border-black py-3 rounded-md w-full mt-3 hover:bg-gray-100 transition-all duration-200"
                                    >
                                        Decline Discount
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 3: Show Discount Code */}
                            {discountCode && (
                                <motion.div
                                    key="discountCode"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Your Discount Code
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        Use this code during checkout:
                                    </p>
                                    <div className="border border-dashed border-black rounded-md py-3 text-xl font-bold text-black mb-4 select-all">
                                        {discountCode}
                                    </div>
                                    {email && (
                                        <p className="text-gray-500 text-sm mb-6">
                                            The code has also been sent to <strong>{email}</strong>.
                                        </p>
                                    )}
                                    <button
                                        onClick={handleDecline}
                                        className="bg-black text-white py-3 rounded-md w-full hover:bg-gray-800 transition-all duration-200"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                            onClick={handleDecline}
                        >
                            x
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfferPopup;
