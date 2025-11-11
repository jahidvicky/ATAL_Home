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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-center px-6">
            <div className="bg-white shadow-lg rounded-3xl p-10 max-w-lg w-full">
                <div className="flex justify-center mb-6">{icons[platform]}</div>
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    {titles[platform]} Page
                </h1>
                <p className="text-gray-500 mb-6 text-lg">We're working hard to bring this page to life.</p>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4 animate-pulse">
                    Coming Soon
                </h2>
                <p className="text-gray-600">
                    Stay tuned! Our {titles[platform]} page will be launching soon with
                    exciting updates, promotions, and exclusive content.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
                >
                    Back to Social Links
                </button>
            </div>
        </div>
    );
};

export default ComingSoon;
