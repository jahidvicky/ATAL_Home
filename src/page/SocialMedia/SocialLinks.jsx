import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const SocialLinks = () => {
    const navigate = useNavigate();

    const socialPlatforms = [
        {
            name: "Facebook",
            icon: <FaFacebookF size={20} />,
            url: "https://www.facebook.com/profile.php?id=61584202492519"
        },
        { name: "Instagram", icon: <FaInstagram size={20} />, path: "instagram" },
        { name: "YouTube", icon: <FaYoutube size={20} />, path: "youtube" },
        { name: "LinkedIn", icon: <FaLinkedinIn size={20} />, path: "linkedin" },
    ];

    return (
        <div>
            <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-4 gap-4 sm:gap-5">
                {socialPlatforms.map((platform) => (
                    <div
                        key={platform.name}
                        onClick={() => {
                            if (platform.url) {
                                window.open(platform.url, "_blank");
                            } else {
                                navigate(`connect/${platform.path}`);
                            }
                        }}
                        className="flex flex-col items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:text-black"
                    >
                        {platform.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialLinks;
