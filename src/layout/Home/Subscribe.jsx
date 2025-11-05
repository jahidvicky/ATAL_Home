import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../../assets/megaMenu/contact.avif";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-black text-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            {/* Left Text Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 text-center md:text-left z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                    SUBSCRIBE & SAVE: <span className="text-white">20% OFF</span> + FREE SHIPPING
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                    Get a contact lenses subscription — you'll never run out of contacts.
                    Plus, you'll save <span className="text-red-500 font-semibold">20%</span> and get free shipping every time!
                </p>
                <button
                    onClick={(() => navigate("/subscribe-save"))}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform active:scale-95">
                    Discover more
                </button>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            >
                <img
                    src={bannerImage}
                    alt="Contact Lenses"
                    className="w-80 md:w-[420px] drop-shadow-lg rounded-lg"
                />
            </motion.div>

            {/* Background Text */}
            <h1 className="absolute text-[180px] md:text-[300px] font-extrabold text-red-900/10 right-0 bottom-0 select-none">
                20%
            </h1>
        </div>
    );
};

export default Subscribe;
