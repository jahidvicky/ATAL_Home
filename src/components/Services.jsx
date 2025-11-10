const Services = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">Our Services</h1>
                    <hr className="border-white w-80 mt-3 mx-auto" />
                </div>

                {/* Content */}
                <div className="p-8 text-gray-800 space-y-8 mx-15">
                    <section>
                        <h2 className="text-3xl font-semibold text-[#f00000] text-center">
                            Services At Atal Optical
                        </h2>
                        <hr className="border-red-600 w-90 mx-auto my-2" />

                        <p className="mt-4">
                            At <strong>ATAL Optical</strong>, we go beyond just selling eyewear—we provide a <strong>complete vision care experience</strong> designed to meet your lifestyle
                            and fashion needs. Since 2005, our team of experienced opticians
                            and stylists has been helping clients in Toronto and the GTA see
                            clearly, look stylish, and feel confident.
                        </p>

                        {/* Our Offer*/}
                        <h3 className="text-xl font-semibold mt-6">Prescription Eyewear</h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>Wide range of <strong>luxury eyeglasses</strong> for men, women, and children</li>
                            <li><strong>Designer frames</strong> in classic, modern, and trendy styles</li>
                            <li><strong>Customized lens options</strong> including single vision, bifocals, and progressives</li>
                            <li><strong>Blue light protection</strong> lenses for digital screen users</li>
                        </ul>

                        {/* Sunglasses*/}
                        <h3 className="text-xl font-semibold mt-6">
                            Sunglasses
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>Premium sunglasses for <strong>style and sun protection</strong></li>
                            <li>100% <strong>UV protection</strong> 100% UV protection lenses to safeguard your eyes</li>
                            <li>Polarized lenses to reduce glare and improve clarity</li>
                            <li>Prescription sunglasses for everyday wear</li>
                        </ul>

                        {/* Contact lens services*/}
                        <h3 className="text-xl font-semibold mt-6">Contact Lens Services</h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>Daily, bi-weekly, and monthly <strong>contact lens fittings</strong></li>
                            <li>Comfortable lenses for <strong>astigmatism and presbyopia</strong></li>
                            <li><strong>Contact lens replacement and exchange</strong> with annual supply purchases</li>
                            <li>Expert guidance on safe lens care and hygiene</li>
                        </ul>
                    </section>

                    {/* Designer frames */}
                    <section>
                        <h3 className="text-xl font-semibold mt-6">
                            Luxury & Designer Frames
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>Curated collection of <strong>top designer brands</strong></li>
                            <li>Over <strong>140,000+ frames</strong>to choose from</li>
                            <li>Styles to match every <strong>face shape, personality, and lifestyle</strong></li>
                            <li>Exclusive savings on <strong>multiple pair purchases</strong></li>
                        </ul>
                    </section>


                    {/* Consultation */}
                    <section>
                        <h3 className="text-xl font-semibold mt-6">
                            Expert Optical Consultation
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li><strong>One-on-one style consultation</strong> with trained opticians</li>
                            <li>Guidance on choosing frames that complement your <strong>features and fashion</strong></li>
                            <li>Personalized solutions for your <strong>vision needs</strong></li>
                            <li><strong>Aftercare support</strong> for adjustments and maintenance</li>
                        </ul>
                    </section>


                    {/* Offers */}
                    <section>
                        <h3 className="text-xl font-semibold mt-6">
                            Special Offer and Savings
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li><strong>40% Multiple Pair Savings</strong> on eyewear (some exclusions apply)</li>
                            <li>Exclusive seasonal promotions on frames and sunglasses</li>
                            <li>Free consultations and fittings with eyewear purchase</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6">
                            Why Choose ATAL Optical?
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>Serving Toronto & the GTA since 2005</li>
                            <li>Over <strong>170,000 satisfied clients</strong></li>
                            <li>Friendly, knowledgeable, and caring staff</li>
                            <li>Trusted by <strong>95% of our customers</strong> for quality and service</li>
                        </ul>

                        <p className="text-[#f00000] text-2xl mt-8"><strong>ATAL Optical – See Better. Look Better. Live Better.</strong></p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Services;

