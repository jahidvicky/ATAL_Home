import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/Promotions.jpg";
import { Link } from "react-router-dom";

const Promotions = () => {
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
                            className="px-6 py-2 bg-[#f00000] text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                        >
                            Back
                        </button>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#f00000] ml-50">
                        Promotions - Atal Optical
                    </h1>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-10 text-center">
                    At Atal Optical, we love rewarding our valued customers. Explore our
                    latest promotions and special offers designed to make premium eyewear,
                    lenses, and accessories more accessible — without compromising on
                    quality or style.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Smart Savings for Smart Vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Get more for less with Atal Optical's exclusive promotions. Whether
                        you're buying your first pair of glasses, upgrading your lenses, or
                        picking up stylish sunglasses, our offers ensure you enjoy premium
                        products at unbeatable prices. We believe everyone deserves crystal
                        clear vision — affordably.
                    </p>
                </section>

                <div className="leading-relaxed space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <section className="mb-12 bg-[#f00000] p-6 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
                            What's on Offer
                        </h2>
                        <p className="text-gray-800 leading-relaxed">
                            Enjoy exciting deals on prescription glasses, contact lenses,
                            and designer frames. From seasonal discounts to “Buy One, Get One”
                            offers, there's always something new to discover. Stay tuned for
                            festive promotions, loyalty points, and referral rewards that make
                            your shopping experience even more delightful. From seasonal discounts to combo deals and loyalty rewards, we ensure you get the best experience every time you visit. Discover unbeatable savings on premium eyewear brands, stylish sunglasses, contact lenses, and advanced eye care services — all under one roof.
                        </p>
                    </section>
                    <div>
                        <img
                            src={image}
                            alt="Promotions - Atal Optical"
                            className="w-full h-84 rounded-xl object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Why Choose Atal Optical Offers
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We understand that eyewear is both a necessity and a style choice.
                        Our promotional offers are designed to give you access to the best
                        frames, lenses, and accessories at affordable prices — without
                        cutting corners on quality. With Atal Optical, you can see clearly,
                        look great, and save smartly.
                    </p>
                </section>

                <section className="bg-black text-white p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-[#f00000]">
                        Stay Updated on Upcoming Deals
                    </h2>
                    <p className="leading-relaxed">
                        Don't miss out on our latest offers and seasonal promotions. Follow
                        Atal Optical on social media or subscribe to our newsletter for
                        exclusive early access to discounts and new collections. Because at
                        Atal Optical, great vision always comes with great value.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default Promotions;
