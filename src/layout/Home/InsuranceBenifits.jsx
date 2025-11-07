import React from "react";
import { motion } from "framer-motion";
import insuranceImage from "../../assets/Services-images/InsuranceClaims.jpg";
import { useNavigate } from "react-router-dom";

const InsuranceBenefits = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-gray-300 mt-10 text-black py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            {/* Left Text Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 text-center md:text-left z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Claim your <span className="text-red-600">insurance benefits</span> with direct billing to save on your order
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                    Discount applied at checkout by selecting{" "}
                    <span className="font-semibold text-red-500">"Apply vision insurance"</span>.
                </p>
                <button
                    onClick={(() => navigate("/eye-services/insurance-claims"))}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform active:scale-95">
                    Learn more
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
                    src={insuranceImage}
                    alt="Insurance Benefits"
                    className="w-80 md:w-[420px] drop-shadow-lg rounded-lg"
                />
            </motion.div>

            {/* Background Accent (faint red shield) */}
            <div className="absolute right-0 bottom-0 text-red-100 text-[300px] font-extrabold opacity-10 select-none">
                +
            </div>
        </div>
    );
};

export default InsuranceBenefits;
