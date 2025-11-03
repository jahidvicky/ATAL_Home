import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/Optometrists.jpg";
import team1 from "../../assets/Services-images/Optometrist1.jpg";
import team2 from "../../assets/Services-images/Optometrist2.jpg";
import team3 from "../../assets/Services-images/Optometrist3.jpg";
import { Link } from "react-router-dom";

const Optometrists = () => {
    return (
        <div className="bg-gray-50 text-gray-900 overflow-hidden">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[60vh] flex items-center justify-center bg-black"
            >
                <Link to="/" className="absolute top-6 left-6 z-20">
                    <button
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                    >
                        Back
                    </button>
                </Link>
                <img
                    src={image}
                    alt="Optometrists"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-5xl md:text-6xl font-extrabold text-red-600 drop-shadow-lg text-center"
                >
                    Our Optometrists
                </motion.h1>
            </motion.div>

            {/* Intro */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto py-16 px-6 md:px-20 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                    Expert Vision Care by{" "}
                    <span className="text-red-700">Atal Optical Specialists</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Our team of certified optometrists combines years of experience,
                    advanced technology, and genuine care to ensure your eyes receive the
                    attention they deserve. At Atal Optical, your vision is our mission.
                </p>
            </motion.section>

            {/* Red Diagonal Section */}
            <section className="relative bg-red-700 text-white py-20 md:py-28 -skew-y-2">
                <div className="max-w-6xl mx-auto px-6 md:px-20 skew-y-2">
                    <h3 className="text-3xl font-bold mb-6">Why Choose Our Optometrists</h3>
                    <p className="leading-relaxed text-gray-100 mb-6">
                        Our optometrists specialize in comprehensive eye examinations,
                        vision correction, and early detection of eye conditions. They
                        believe in building lasting relationships with patients through
                        trust, expertise, and compassion.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-100">
                        <li>Comprehensive vision and eye health check-ups</li>
                        <li>State-of-the-art diagnostic tools and equipment</li>
                        <li>Personalized solutions for every visual need</li>
                        <li>Guidance on eyewear, contact lenses, and eye care habits</li>
                    </ul>
                </div>
            </section>

            {/* Team Cards Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-20 text-center mb-10">
                    <h3 className="text-3xl font-bold text-black mb-4">
                        Meet Our <span className="text-red-700">Experienced Team</span>
                    </h3>
                    <p className="text-gray-700">
                        Each of our optometrists brings a unique combination of skill,
                        empathy, and dedication to help you see better and live better.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 md:px-20">
                    {[{ name: "DR. MELISSA YUEN", img: team1, role: "Chief Optometrist", desc: "Specialist in advanced vision analysis and customized lens fitting." },
                    { name: "DR. MALISA", img: team2, role: "Eye Health Consultant", desc: "Expert in detecting early signs of glaucoma and retinal disorders." },
                    { name: "Dr. EMMA KARLIN", img: team3, role: "Contact Lens Specialist", desc: "Dedicated to providing comfort-focused contact lens solutions." }]
                        .map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6"
                            >
                                <img
                                    src={doc.img}
                                    alt={doc.name}
                                    className="w-full h-64 object-cover rounded-xl mb-6"
                                />
                                <h4 className="text-xl font-semibold text-black mb-1">{doc.name}</h4>
                                <p className="text-red-700 font-medium mb-3">{doc.role}</p>
                                <p className="text-gray-700 leading-relaxed">{doc.desc}</p>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Closing Black Section */}
            <section className="bg-black text-white py-16 text-center mb-10">
                <h3 className="text-3xl font-bold mb-4 text-red-500">
                    Vision Care You Can Trust
                </h3>
                <p className="max-w-3xl mx-auto leading-relaxed text-gray-300">
                    From comprehensive eye exams to expert guidance on frames and lenses,
                    our optometrists are committed to enhancing your visual clarity and
                    comfort. Discover the human side of eye care with Atal Optical.
                </p>
            </section>
        </div>
    );
};

export default Optometrists;
