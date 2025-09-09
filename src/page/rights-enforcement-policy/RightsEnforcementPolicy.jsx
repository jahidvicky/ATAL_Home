import React from "react";

export default function RightsEnforcementPolicy() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">Our Rights & Enforcement Policy</h1>
                    <hr className="border-white w-200 mx-auto mt-3" />
                </div>

                {/* Content */}
                <div className="mx-15 p-8 text-gray-800 space-y-8">

                    {/* Intro */}
                    <section>
                        <p>
                            At Atal Optical, we are committed to maintaining the safety, integrity, and lawful use of our Site.
                            We reserve the right to take appropriate action as outlined below.
                        </p>
                    </section>

                    {/* Monitoring and Disclosure */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Monitoring and Disclosure</h2>
                        <hr className="border-red-600 w-94 mx-auto my-2" />
                        <p>We may, at our sole discretion:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Monitor use of the Site, including communication and uploaded content.</li>
                            <li>
                                Disclose content or records if required:
                                <ul className="list-disc list-inside space-y-1 ml-6">
                                    <li>To comply with laws, regulations, or government requests</li>
                                    <li>To ensure site functionality and operational integrity</li>
                                    <li>To protect our legal rights, property, or the safety of other users</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mt-3">
                            Atal Optical does not guarantee active monitoring or review of all user-submitted content.
                            However, upon notification of allegedly illegal, infringing, defamatory, or harmful material, we may:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Conduct an internal investigation</li>
                            <li>Remove or request removal of such content at our discretion</li>
                        </ul>
                    </section>

                    {/* Right to Restrict Access */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Right to Restrict Access</h2>
                        <hr className="border-red-600 w-86 mx-auto my-2" />
                        <p>We reserve the right to:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                Terminate or suspend user access to the Site — in whole or in part — without notice,
                                for conduct that we determine:
                                <ul className="list-disc list-inside ml-6 space-y-1">
                                    <li>Violates these Terms or any law</li>
                                    <li>Harms another user, third-party, or Atal Optical itself</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mt-3">We also reserve the right to:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Refuse sales to individuals if there is reasonable belief that products are being purchased for resale</li>
                            <li>Limit quantities of items purchased per customer</li>
                        </ul>
                    </section>

                    {/* Termination Policy */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Termination Policy</h2>
                        <hr className="border-red-600 w-68 mx-auto my-2" />
                        <p>These Terms remain in effect unless and until terminated by either party.</p>
                        <p>
                            If you no longer accept these Terms, you must discontinue use of the Site.
                            Subject to applicable law, Atal Optical reserves the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Suspend or revoke your access</li>
                            <li>Delete your account, data, and history without notice</li>
                            <li>Restrict your future access to all or parts of the Site</li>
                        </ul>
                        <p className="mt-3">You agree that:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Termination may occur without prior warning</li>
                            <li>We shall not be liable to you or any third party for such action</li>
                            <li>You will not be entitled to any compensation or restoration of data or files following termination</li>
                        </ul>
                    </section>

                    {/* Governing Law & Jurisdiction */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Governing Law & Jurisdiction</h2>
                        <hr className="border-red-600 w-105 mx-auto my-2" />
                        <h3 className="text-xl font-semibold mt-4">International Use</h3>
                        <p>
                            We make no guarantees that content on the Site is suitable for access outside of Canada.
                            Users who access the Site from other jurisdictions do so at their own risk
                            and are responsible for complying with local laws.
                        </p>

                        <h3 className="text-xl font-semibold mt-4">Export Restrictions</h3>
                        <p>
                            Content may not be used or exported in violation of Canadian or U.S. export laws and regulations.
                        </p>

                        <h3 className="text-xl font-semibold mt-4">Jurisdiction</h3>
                        <p>
                            All claims and disputes (“Claims”) related to this Site, its content, or services
                            shall be governed exclusively by:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The laws of the Province of Ontario</li>
                            <li>The federal laws of Canada applicable therein</li>
                        </ul>
                        <p>
                            By using the Site, you irrevocably consent to the exclusive jurisdiction of courts in Ontario, Canada
                            and agree that final judgments rendered may be enforced across jurisdictions.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Contact Us</h2>
                        <hr className="border-red-600 w-45 mx-auto my-2" />
                        <p>Atal Optical Inc.</p>
                        <p>34 Shining Willow Crescent, Brampton, Ontario, Canada</p>
                        <p>Toll-Free: 1-866-242-3545</p>
                        <p>Email: support@ataloptical.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
