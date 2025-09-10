import React from "react";

const SiteContentNotice = () => {

    return (
        <div className="bg-gray-50">


            {/* Header */}
            <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">

                    Site Content & Intellectual Property Notice
                </h1>
                <hr className="border-white w-260 mt-3 mx-auto" />
            </div>

            {/* Body */}
            <div className="p-8 text-gray-800 space-y-5 mx-15">

                {/* Entity Info */}
                <section>
                    <h2 className="text-xl font-semibold">Entity Information</h2>
                    <hr className="border-gray-300 my-2" />
                    <p><strong>Entity:</strong> Atal Optical Corp</p>
                    <p><strong>Corporate Office:</strong> 34 Shining Willow Crescent, Brampton, Ontario, Canada</p>
                    <p><strong>Toll-Free:</strong> 1-866-242-3545</p>
                </section>

                {/* Ownership of Content */}
                <section>
                    <h2 className="text-xl font-semibold">Ownership of Content</h2>
                    <hr className="border-gray-300 my-2" />
                    <p>

                        All content available on the Atal Optical Corp website (the “Site”) is the intellectual property of Atal Optical Corp or its licensors, affiliates, suppliers, or content providers. This includes but is not limited to:
                    </p>
                    <ul className="list-disc list-inside mt-3 space-y-1 pl-3">
                        <li>Photographs</li>
                        <li>Videos</li>
                        <li>Text and descriptions</li>
                        <li>Graphics and illustrations</li>
                        <li>Software and code</li>
                        <li>Data compilations and metadata</li>
                        <li>Sounds, typefaces, and designs</li>
                    </ul>
                    <p className="mt-3">

                        All rights in the design, layout, coordination, and arrangement of the Content, including derivative enhancements, are exclusively owned by Atal Optical Corp.
                    </p>
                </section>

                {/* Restrictions on Use */}
                <section>
                    <h2 className="text-xl font-semibold">Restrictions on Use</h2>
                    <hr className="border-gray-300 my-2" />
                    <p>You may not, without explicit written authorization from Atal Optical Corp:</p>
                    <ul className="list-disc list-inside mt-3 space-y-1 pl-3">
                        <li>Modify, reproduce, republish, upload, post, transmit, or distribute any Content</li>
                        <li>Use the Content for commercial, resale, or public display purposes</li>
                        <li>Create derivative works or reverse-engineer Site software or systems</li>
                        <li>Remove or alter copyright or trademark notices</li>
                        <li>Use the Site in a way that infringes on our rights or those of partners</li>
                    </ul>
                </section>

                {/* Permitted Personal Use */}
                <section>
                    <h2 className="text-xl font-semibold">Permitted Personal Use</h2>
                    <hr className="border-gray-300 my-2" />
                    <p>You may print or download limited portions of Content strictly for personal, non-commercial use, provided that:</p>
                    <ul className="list-disc list-inside mt-3 space-y-1 pl-3">
                        <li>The Content is not altered or modified</li>
                        <li>All copyright and proprietary notices remain intact</li>
                        <li>The material is not transferred or mirrored to another server</li>
                    </ul>
                    <p className="mt-3">

                        This does not grant any license, title, or ownership interest in the Content.
                    </p>
                </section>

                {/* Software and Licensing */}
                <section>
                    <h2 className="text-xl font-semibold">Software and Licensing</h2>
                    <hr className="border-gray-300 my-2" />
                    <p>

                        Any software or source code provided via the Site is governed by the specific software license agreement (if provided). If none is provided, the software is licensed on a non-exclusive, revocable, non-transferable basis for personal, non-commercial use only.
                    </p>
                    <p className="mt-3">

                        Reverse engineering, decompilation, or unauthorized redistribution of such software is strictly prohibited.
                    </p>
                </section>

                {/* Legal Enforcement */}
                <section>
                    <h2 className="text-xl font-semibold">Legal Enforcement & Compliance</h2>
                    <hr className="border-gray-300 my-2" />
                    <p>

                        Unauthorized use of Content may violate copyright, trademark, and privacy laws. Atal Optical Corp reserves the right to take legal action in cases of:
                    </p>
                    <ul className="list-disc list-inside mt-3 space-y-1 pl-3">
                        <li>Infringement of proprietary materials</li>
                        <li>Breach of these Terms and Conditions</li>
                        <li>Use of the Site contrary to Canadian, U.S., or international laws</li>
                    </ul>
                    <p className="mt-3">

                        For licensing inquiries or permission to use content in commercial or academic publications, please contact:
                    </p>
                    <p className="text-gray-600 mt-2">
                        Email:{" "}
                        <a
                            href="mailto:support@ataloptical.com"
                            className="text-blue-600 hover:underline"
                        >
                            support@ataloptical.com
                        </a>
                    </p>
                </section>
            </div>

        </div>

    );

};

export default SiteContentNotice;

