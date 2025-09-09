import React from "react";
import img2 from "../../assets/category/eyecheck2.png"
import img3 from "../../assets/newcollection/sunglass.jpg"
import img4 from "../../assets/newcollection/blueglasses.jpg"

const LimitationOfLiability = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}

            <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">General Information</h1>
                <hr className="border-white w-120 mt-2 ml-110" />
            </div>

            {/* Content */}
            <div className="p-8 text-gray-800 space-y-8 mx-15">
                <p>
                    By accessing or using this website (the “Site”) operated by{" "}
                    <strong>Atal Optical Corp</strong> (“we,” “us,” or “our”), you
                    expressly acknowledge and agree that you assume full responsibility
                    and all associated risks arising from your use of this Site,
                    including but not limited to any costs incurred for servicing or
                    repairing any equipment used in connection with your access or use of
                    the Site.
                </p>

                <h2 className="text-3xl text-center font-semibold text-red-600 mt-10">No Liability for Damages</h2>
                <hr className="border-red-600 w-90 ml-117 mb-4 mt-2" />
                <p>
                    Under no circumstances shall Atal Optical Corp, its affiliates,
                    subsidiaries, officers, directors, employees, agents, partners,
                    licensors, or any other party involved in the creation, production,
                    or distribution of this Site be liable for any direct, indirect,
                    incidental, special, consequential, or punitive damages, including
                    but not limited to:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Loss of profits</li>
                    <li>Loss of goodwill</li>
                    <li>Loss or corruption of data</li>
                    <li>Loss of use or other intangible losses</li>
                </ul>

                <p>
                    Even if we have been advised of the possibility of such damages,
                    arising from or relating to:
                </p>
                <ul className="list-decimal ml-6 space-y-1">
                    <li>Your use of, or inability to use, the Site;</li>
                    <li>
                        The procurement, purchase, or use of substitute goods or services;
                    </li>
                    <li>Unauthorized access to, or alteration of, your data;</li>
                    <li>Actions of any third party on or through the Site;</li>
                    <li>
                        Any other matters related to the products, services, or information
                        provided through the Site.
                    </li>
                </ul>

                <p>
                    This limitation of liability applies to all Content, products,
                    services, and functionalities available through the Site. In certain
                    jurisdictions where such exclusions are not permitted, liability will
                    be limited to the maximum extent allowed by law.
                </p>

                {/* Indemnification */}
                <h2 className="text-3xl text-center font-semibold text-red-600 mt-10">Indemnification</h2>
                <hr className="border-red-600 w-60 ml-131 mb-4 mt-1" />
                <p>
                    You agree to indemnify, defend, and hold harmless Atal Optical Corp,
                    including its subsidiaries, affiliates, officers, directors, agents,
                    co-branders or partners, and employees, from and against any and all
                    claims, demands, losses, liabilities, damages, costs, or expenses
                    (including reasonable attorneys’ fees) arising out of or related to:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Content you submit, post, or transmit through the Site;</li>
                    <li>Your use or misuse of the Site;</li>
                    <li>Your connection to the Site;</li>
                    <li>Your violation of these Terms of Use; or</li>
                    <li>
                        Your infringement of any intellectual property or other rights of
                        another party.
                    </li>
                </ul>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <img
                        src={img2}
                        alt="Eye Care"
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        src={img3}
                        alt="Optical Store"
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        src={img4}
                        alt="Eyewear"
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    );
};

export default LimitationOfLiability;
