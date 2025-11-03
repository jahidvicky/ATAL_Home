import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/EyeWearGlasses.jpg";
import { Link } from "react-router-dom";

const EyeWearGlasses = () => {
    return (
        <div className="bg-white text-gray-900 py-16 px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
            >

                <div className="flex items-center justify-content mb-8">
                    <Link to="/">
                        <button
                            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                        >
                            Back
                        </button>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-red-700 ml-70">
                        Eye Wear Glasses
                    </h1>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-10 text-center">
                    Eye wear glasses are not just about vision—they represent style,
                    confidence, and individuality. At our store, we believe in delivering
                    eyewear that complements your personality while ensuring ultimate
                    comfort and clarity.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Why Quality Matters
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        High-quality eyewear ensures your eyes are properly protected and
                        your vision remains sharp in every condition. Whether it's reducing
                        digital eye strain, improving clarity, or preventing harmful UV
                        rays, premium lenses make all the difference. Our glasses combine
                        advanced optical technology with durable frames that last.
                    </p>
                </section>

                <div className="leading-relaxed space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <section className="mb-12 bg-red-50 p-6 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-semibold text-red-700 mb-4">
                            Perfect Fit for Every Face
                        </h2>
                        <p className="text-gray-800 leading-relaxed">
                            Our eyewear collection is crafted to match every face shape and
                            personal taste. From minimalist rimless frames to bold, statement
                            designs — each pair is engineered for a perfect balance of
                            aesthetics and functionality. With adjustable nose pads and
                            lightweight materials, you can enjoy comfort that lasts all day
                            long. Modern eyewear is designed to suit all face shapes and preferences.
                            Whether you prefer a bold, classic, or minimal look, the right pair
                            of glasses can highlight your features and enhance your personal style
                            while providing clear and comfortable vision.
                        </p>
                    </section>
                    <div>
                        <img
                            src={image}
                            alt="Eye Wear Glasses"
                            className="w-full h-89 rounded-xl object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Style That Defines You
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Glasses are no longer just a necessity — they are a fashion
                        statement. Our curated designs feature the latest trends from
                        timeless classics to contemporary styles. Each frame is crafted to
                        help you express your individuality while maintaining the elegance
                        and charm that define true confidence.
                    </p>
                </section>

                <section className="bg-black text-white p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-red-500">
                        Invest in Your Vision
                    </h2>
                    <p className="leading-relaxed">
                        Your eyes deserve the best — and so do you. Choosing the right
                        eyewear means investing in both style and protection. Our commitment
                        is to provide premium glasses that elevate your everyday look while
                        taking care of your visual health. Explore designs that redefine
                        sophistication, built for those who see the world differently.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default EyeWearGlasses;
