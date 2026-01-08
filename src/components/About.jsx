import React from "react";
import image from "../assets/about/about us.png"
import { Link } from "react-router-dom";


const About = () => {
    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">About Us - Atal Optical</h1>
                <hr className="border-white w-150 mt-3 mx-auto" />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-10 text-gray-800 leading-relaxed space-y-6">
                <p>
                    <strong>Atal Optical</strong> stands as a beacon of dedication, vision,
                    and community service in the Canadian optical industry. Founded with a
                    heartfelt mission to bring accessible, high-quality eye care and
                    eyewear to all, including those who may otherwise go without, Atal
                    Optical reflects the passion and perseverance of its visionary leader.
                </p>

                <h2 className="text-2xl font-semibold">Our CEO: A Visionary Leader with a Clear Purpose</h2>
                <p>
                    Born in a small village, our CEO's journey is a testament to
                    self-motivation, discipline, and resilience. Beginning his career with
                    the prestigious <strong>Oswal Group</strong>, he quickly earned a
                    reputation as a self-made, respected pillar of society. His relentless
                    drive propelled him through the ranks of major corporations such as{" "}
                    <strong>Hindustan Lever</strong> and <strong>DuPont Chemicals</strong>,
                    and later in Canada with <strong>SNC Lavalin, Magna Group, Honeywell</strong>,
                    and key players in the aviation and petrochemical industries.
                </p>
                <p>
                    In 2007, inspired by his own vision and the leadership he admired
                    within Canada's optical industry, he aspired to start his own optical
                    business. However, due to demanding career commitments, this dream was
                    temporarily set aside. Despite the delay, his vision never wavered. He
                    remained deeply inspired by the optical leaders in Canada, keeping the
                    dream alive.
                </p>

                <h2 className="text-2xl font-semibold">Bringing a Dream to Life</h2>
                <p>
                    After years of building a successful career and settling his
                    family—whose members have since flourished in Canadian society through
                    their own community contributions—our CEO finally turned his long-held
                    vision into reality. In 2024, <strong>Atal Optical</strong> was
                    officially incorporated, marking a powerful new chapter dedicated to
                    serving the community with integrity, expertise, and compassion.
                </p>

                <div className="leading-relaxed space-y-6 grid grid-cols-2 gap-x-10">
                    <div>
                        <img
                            src={image}
                            alt="AboutUS Image"
                            className="w-full h-full rounded-xl mt-3 object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Atal Optical: More Than Just an Optical Store</h2>
                        <p className="mt-6">
                            Atal Optical is not just a business; it is a commitment to excellence
                            and accessibility in eye care. Leveraging decades of corporate
                            experience and deep industry knowledge, the company strives to
                            provide:
                        </p>
                        <p className="mt-2">
                            - State-of-the-art optical products that meet the highest standards of
                            quality and style.
                        </p>
                        <p className="mt-2">
                            - Comprehensive eye care services that prioritize patient health and
                            comfort.
                        </p>
                        <p className="mt-2">
                            - A special focus on offering <strong>free glasses</strong> to
                            Canadians who cannot afford them, embodying the company's spirit of
                            giving back.
                        </p>
                        <p className="mt-2">
                            With a leadership team that blends visionary insight and practical
                            experience, Atal Optical is positioned to become a trusted name across
                            communities in Canada.
                        </p>
                        <Link to="/"><button className="flex items-center bg-[#f00000] text-white p-3 rounded-lg hover:bg-black hover:cursor-pointer mt-5">Visit Website</button></Link>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold">A Vision Rooted in Experience and Service</h2>
                <p>
                    Our CEO's extensive background in management and leadership across
                    multiple industries has instilled a unique perspective on business,
                    service, and innovation. His ability to balance strategic thinking
                    with compassionate leadership drives Atal Optical's commitment to
                    customers and community alike.
                </p>
                <p>
                    <strong>Atal Optical</strong> represents the fulfillment of a lifelong
                    dream — a dream to create a company where vision care is accessible to
                    all, regardless of circumstance. With unwavering dedication and a
                    clear strategic focus, Atal Optical is poised to make a meaningful
                    difference in the lives of Canadians.
                </p>

                <h2 className="text-2xl font-semibold">Join Us on This Visionary Journey</h2>
                <p>
                    At Atal Optical, we don't just sell glasses; we empower people to see
                    clearly, live confidently, and embrace life fully. We invite you to be
                    part of our story — a story of vision, perseverance, and community
                    spirit.
                </p>
            </div>

            {/* Bottom Red Strip */}
            <div className="bg-[#f00000] h-4"></div>
        </div>
    );
};

export default About;