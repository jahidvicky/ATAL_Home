import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlasses, FaHeadset, FaShippingFast } from "react-icons/fa";
import { MdSavings } from "react-icons/md";

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
        }, 4000); // 20 seconds
        return () => clearInterval(timer);
    }, [messages.length]);



    return (
        <div className="w-full">
            {/* Top Black Moving Banner */}
            <div className="bg-red-600 text-white overflow-hidden relative py-2 h-10 flex items-center justify-center">
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
                <div className="flex items-center gap-2">
                    <MdSavings className="text-lg" />
                    <span>Subscribe & save: 20% off</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaGlasses className="text-lg" />
                    <span>Glasses from $499 and contacts from $299</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaHeadset className="text-lg" />
                    <span>24/7 customer care</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaShippingFast className="text-lg" />
                    <span>Fast shipping and delivery</span>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;
