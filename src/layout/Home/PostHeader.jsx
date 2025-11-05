import React from "react";
import { motion } from "framer-motion";
import { FaGlasses, FaHeadset, FaShippingFast } from "react-icons/fa";
import { MdSavings } from "react-icons/md";

const PostHeader = () => {
    return (
        <div className="w-full">
            {/* Top Black Moving Banner */}
            <div className="bg-black text-white overflow-hidden relative py-2">
                <motion.div
                    className="whitespace-nowrap text-center text-sm font-semibold"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear",
                    }}
                >
                    SEASON ESSENTIALS SALE: Up to 60% off frames + 50% off all lenses &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    Buy 1 Get 1 Free on Contact Lenses &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    Free Eye Test on Every Purchase &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    Shop Smart. Save More with Atal Optical
                </motion.div>
            </div>

            {/* Bottom Features Row */}
            <div className="bg-gray-100 py-2 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <MdSavings className="text-lg" />
                    <span>Subscribe & save: 20% off</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaGlasses className="text-lg" />
                    <span>Glasses from ₹499 and contacts from ₹299</span>
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
