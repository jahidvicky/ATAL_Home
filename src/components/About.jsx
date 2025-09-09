import React from "react";

function About() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">
                        About Us
                    </h1>
                    <hr className="border-white w-80 mt-3 mx-auto" />
                </div>

                {/* Content */}
                <div className="p-8 text-gray-800 space-y-8 mx-15">
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">
                            Our Story
                        </h2>
                        <hr className="border-red-600 w-50 mx-auto my-2" />

                        <p className="mt-4">
                            Founded in 2005, <strong>ATAL Optical</strong> has been at the
                            forefront of delivering <strong>luxury eyewear and vision solutions</strong> to clients
                            across Toronto and the GTA. What started as a passion for
                            high-quality optical care by <strong>Gopal Puri</strong>, owner of
                            CMAX Optical, has grown into a trusted brand serving thousands of
                            happy customers. With nearly two decades of experience, we have
                            built a reputation not just for offering fashionable eyewear, but
                            for providing <strong>personalized care and expert guidance</strong>. We believe
                            eyewear is more than just a necessity—it’s a reflection of your
                            style, personality, and confidence.
                        </p>

                        {/* Our Offer*/}
                        <h3 className="text-xl font-semibold mt-6">What We Offer</h3>
                        <p className="mt-2">
                            At ATAL Optical, we take pride in carrying a <strong>
                                wide range of premium eyeglasses, sunglasses, and contact lenses
                            </strong> designed to suit every lifestyle. From classic designs to modern
                            trends, we handpick eyewear that blends functionality with
                            fashion. Our <strong>expert opticians and stylists</strong> are
                            trained to help you:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>
                                Find frames that match your <strong>face shape and features</strong>
                            </li>
                            <li>
                                Select styles that fit your <strong>personality and lifestyle</strong>
                            </li>
                            <li>
                                Choose lenses that provide <strong>optimal comfort and vision clarity</strong>
                            </li>
                        </ul>
                        <p className="mt-2">
                            We want you not only to see better but also to look and feel your
                            best in eyewear that’s truly yours.
                        </p>

                        {/* Our Custmer Choice*/}
                        <h3 className="text-xl font-semibold mt-6">
                            Why Customer Choose ATAL Optical
                        </h3>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>
                                <strong>Experience You Can Trust</strong> – Serving Toronto &
                                GTA with excellence since 2005
                            </li>
                            <li>
                                <strong>Massive Selection</strong> – Over <strong>140,000 frames</strong> from world-class eyewear brands
                            </li>
                            <li>
                                <strong>Customer First</strong> – A <strong>95% satisfaction rate</strong> proves our dedication
                            </li>
                            <li>
                                <strong>Affordable Luxury</strong> – Enjoy <strong>40% savings</strong> on multiple pairs of eyewear
                                (exclusions apply)
                            </li>
                            <li>
                                <strong>Lens Benefits</strong> – With a year’s supply of contact
                                lenses, get <strong>hassle-free replacement & exchange</strong>
                            </li>
                            <li>
                                <strong>Engaged Community</strong> – Over <strong>170k+ followers</strong> trust ATAL Optical for style &
                                vision care
                            </li>
                        </ul>

                        {/* Our Promises*/}
                        <h3 className="text-xl font-semibold mt-6">Our Promises to You</h3>
                        <p className="mt-2">
                            We know that choosing eyewear is a personal decision. That’s why
                            we provide:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                            <li>
                                <strong>One-on-One Consultations</strong> to help you discover
                                frames that truly suit you
                            </li>
                            <li>
                                <strong>Cutting-Edge Optical Technology</strong> for precise
                                fittings and vision solutions
                            </li>
                            <li>
                                <strong>Friendly & Knowledgeable Staff</strong> who make your
                                shopping experience seamless
                            </li>
                            <li>
                                <strong>Aftercare Support</strong> to ensure your eyewear
                                continues to deliver comfort and clarity
                            </li>
                        </ul>
                        <p className="mt-2">
                            Our goal is simple: <strong>
                                to help you see the world clearly while expressing your unique
                                style with confidence.
                            </strong>
                        </p>
                    </section>

                    {/* Join Atal Optical Family */}
                    <section>
                        <h3 className="text-xl font-semibold mt-6">Join the ATAL Optical family</h3>
                        <p className="mt-2">
                            Over the years, ATAL Optical has built a loyal community of
                            clients who return to us not just for products, but for the <strong>trust,
                                care, and expertise</strong> that define our service. We’re proud to be
                            more than just an eyewear store—we’re a part of your lifestyle.
                            Come visit one of our locations today or shop our online
                            collection. Whether you’re searching for luxury sunglasses,
                            durable eyeglasses, or comfortable contact lenses, we promise to
                            make your experience exceptional.
                        </p>
                        <p className="text-red-600 mt-8 text-2xl"><strong>ATAL Optical – See Better. Look Better. Live Better.</strong></p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default About;