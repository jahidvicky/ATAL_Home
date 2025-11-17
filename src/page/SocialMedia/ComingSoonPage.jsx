import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const ComingSoon = () => {
    const { platform } = useParams();
    const navigate = useNavigate();

    const icons = {
        facebook: <FaFacebookF size={80} className="text-blue-600" />,
        instagram: <FaInstagram size={80} className="text-pink-500" />,
        youtube: <FaYoutube size={80} className="text-red-600" />,
        linkedin: <FaLinkedinIn size={80} className="text-blue-700" />,
    };

    const titles = {
        facebook: "Facebook",
        instagram: "Instagram",
        youtube: "YouTube",
        linkedin: "LinkedIn",
    };

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="p-6 sm:p-10 w-full transition-all duration-300">

                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="text-6xl sm:text-7xl md:text-8xl">
                        {icons[platform]}
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800">
                    {titles[platform]} Page
                </h1>

                {/* Subtext */}
                <p className="text-gray-500 mb-6 text-base sm:text-lg md:text-xl">
                    Exciting updates ahead! Our social platforms are launching soon.
                </p>

                {/* Coming Soon Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Coming Soon
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Our {titles[platform]} page will feature the latest eyewear collections,
                    <br />
                    fashion inspiration, and exclusive discounts — all tailored for you.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-8 px-5 sm:px-6 py-2.5 bg-[#f00000] text-white rounded-full font-medium hover:bg-red-700 transition-all text-sm sm:text-base"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ComingSoon;
