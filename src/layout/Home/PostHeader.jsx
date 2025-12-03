import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlasses, FaHeadset, FaShippingFast } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import { Link } from "react-router-dom";  // ✅ ADD THIS

const PostHeader = () => {

    const messages = [
        "SEASON ESSENTIALS SALE: Up to 60% off frames + 50% off all lenses",
        "Buy 1 Get 1 Free on Contact Lenses",
        "Free Eye Test on Every Purchase",
        "Shop Smart. Save More with Atal Optical",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [messages.length]);

    return (
        <div className="w-full">
            {/* Top Black Moving Banner */}
            <div className="bg-[#f00000] text-white overflow-hidden relative py-2 h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute text-center text-sm font-semibold w-full"
                    >
                        {messages[index]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Features Row */}
            <div className="bg-gray-100 py-2 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-800">

                {/* Subscribe & Save */}
                <Link
                    to="/subscribe-save"
                    className="flex items-center gap-2 hover:text-red-600 transition"
                >
                    <MdSavings className="text-lg" />
                    <span>Subscribe & save: 20% off</span>
                </Link>

                {/* Pricing */}
                <Link
                    to="/offer-page"
                    className="flex items-center gap-2 hover:text-red-600 transition"
                >
                    <FaGlasses className="text-lg" />
                    <span>Glasses from $499 and contacts from $299</span>
                </Link>

                {/* Customer Care */}
                <Link
                    to="/customer-care"
                    className="flex items-center gap-2 hover:text-red-600 transition"
                >
                    <FaHeadset className="text-lg" />
                    <span>24/7 customer care</span>
                </Link>

                {/* Fast Shipping */}
                <Link
                    to="/fast-shipping"
                    className="flex items-center gap-2 hover:text-red-600 transition"
                >
                    <FaShippingFast className="text-lg" />
                    <span>Fast shipping and delivery</span>
                </Link>

            </div>
        </div>
    );
};

export default PostHeader;
