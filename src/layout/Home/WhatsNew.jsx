import React from "react";
import { motion } from "framer-motion";
import GlassImage from "../../assets/megaMenu/Trending.jpg";
import raybanImage from "../../assets/megaMenu/glasses.jpg";
import { useNavigate } from "react-router-dom";

const WhatsNew = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-black py-10 px-4 sm:px-6 md:px-20">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#f00000]">
                    What's New?
                </h2>
                <p className="text-black text-sm sm:text-base max-w-xl mx-auto px-2">
                    Get inspired by our latest drops and for your next pair of eyewear.
                    These are the new arrivals that draw on the newest trends while
                    speaking to your style.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

                {/* Left Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-xl shadow-lg mb-5">
                        <img
                            src={GlassImage}
                            alt="Brand"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 px-2">
                        Meet the new <span className="text-[#f00000]">Atal Optical collections</span>
                    </h3>
                    <p className="text-black mb-6 text-sm sm:text-base max-w-md px-3">
                        Whether you're on the hunt for everyday go-to's or statement
                        styles, the newest Atal Optical collections have just what you need.
                    </p>
                    <button
                        onClick={() => navigate("/glasses/mens-frame")}
                        className="bg-[#f00000] hover:bg-red-700 text-white font-medium px-5 py-3 rounded-md shadow-md active:scale-95 transition"
                    >
                        Shop At Atal Optical
                    </button>
                </motion.div>

                {/* Right Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-xl shadow-lg mb-5">
                        <img
                            src={raybanImage}
                            alt="Brand"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 px-2">
                        Introducing the <span className="text-[#f00000]">Atal Optical</span>
                    </h3>
                    <p className="text-black mb-6 text-sm sm:text-base max-w-md px-3">
                        With padded contours and a fashion-forward edge, the Atal Optical
                        frames bring a hip-hop twist to timeless classic eyewear.
                    </p>
                    <button
                        onClick={() => navigate("/glasses/womens-frame")}
                        className="bg-[#f00000] hover:bg-red-700 text-white font-medium px-5 py-3 rounded-md shadow-md active:scale-95 transition"
                    >
                        Shop now
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default WhatsNew;
