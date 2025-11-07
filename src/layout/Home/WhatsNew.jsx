import React from "react";
import { motion } from "framer-motion";
import GlassImage from "../../assets/megaMenu/Trending.jpg";
import raybanImage from "../../assets/megaMenu/glasses.jpg";
import { useNavigate } from "react-router-dom";

const WhatsNew = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-white text-black py-16 px-6 md:px-20">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">What's New?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Get inspired by our latest drops and for your next pair of eyewear.
                    These are the new arrivals that draw on the newest trends while
                    speaking to your style, so that all eyes are on YOU.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 gap-12">
                {/* Left Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-150 h-90 overflow-hidden rounded-xl shadow-lg mb-6">
                        <img
                            src={GlassImage}
                            alt="Brand"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">
                        Meet the new <span className="text-red-600">Atal Optical collections</span>
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Whether you’re on the hunt for your everyday go-to's or
                        statement-making style, the newest Atal Optical collections have just
                        what you need.
                    </p>
                    <button
                        onClick={(() => navigate("/glasses/mens-frame"))}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md shadow-md transition-transform active:scale-95">
                        Shop At Atal Optical
                    </button>
                </motion.div>

                {/* Right Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-150 h-90 overflow-hidden rounded-xl shadow-lg mb-6">
                        <img
                            src={raybanImage}
                            alt="Brand"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">
                        Introducing the <span className="text-red-600">Atal Optical</span>
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                        With padded contours and fashion-forward edge, the Atal Optical frames
                        is a hip-hop take on the timeless classic frames, designed by Atal Optical.
                    </p>
                    <button
                        onClick={(() => navigate("/glasses/womens-frame"))}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md shadow-md transition-transform active:scale-95">
                        Shop now
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default WhatsNew;
