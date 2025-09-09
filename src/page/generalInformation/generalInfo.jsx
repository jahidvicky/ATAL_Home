import React from "react";

export default function GeneralInformation() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className=" mx-auto bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">General Information</h1>
                    <hr className="border-white w-120 mt-2 ml-110" />
                </div>

                {/* Content */}
                <div className="p-8 text-gray-800 space-y-8 mx-15">
                    <p>
                        These Terms and Conditions of Use constitute the entire agreement
                        between you (<strong>"User"</strong>) and Atal Optical Corp
                        (<strong>"we," "us," or "our"</strong>) governing your access to and
                        use of this Site. In addition to these Terms, you may be subject to
                        other applicable terms when using affiliated services, third-party
                        content, or third-party software integrated with the Site.
                    </p>
                    <p>
                        Our failure to enforce or exercise any right or provision under
                        these Terms shall not be deemed a waiver of such right or provision.
                        If any clause or provision of these Terms is held to be invalid,
                        illegal, or unenforceable by a court of competent jurisdiction, the
                        remaining provisions shall continue in full force and effect, and
                        the court shall endeavor to enforce the original intention of the
                        parties to the fullest extent permitted by law.
                    </p>
                    <p>
                        You agree that any claim or cause of action arising out of or
                        related to your use of the Site or these Terms must be filed within
                        one (1) year after the claim or cause of action arose, or such claim
                        shall be permanently barred.
                    </p>

                    {/* Submissions Section */}
                    <h2 className="text-3xl text-center font-semibold text-red-600 mt-10">Submissions</h2>
                    <hr className="border-red-600 w-50 ml-136 mb-15 mt-1" />
                    <ul className="list-disc list-inside space-y-2">
                        <li>All Submissions shall be deemed and remain the exclusive property of Atal Optical Corp.</li>
                        <li>We hold no obligation of confidentiality concerning any Submissions you provide.</li>
                        <li>We are not liable for any use or disclosure of any Submissions.</li>
                        <li>
                            You hereby irrevocably assign to Atal Optical Corp, without
                            compensation or further obligation, all existing and future rights
                            worldwide in and to the Submissions, including intellectual
                            property rights.
                        </li>
                        <li>
                            We may use, reproduce, publish, modify, adapt, distribute, or
                            otherwise exploit the Submissions for any commercial or
                            non-commercial purpose, including display on the Site or other
                            platforms, without limitation.
                        </li>
                    </ul>

                    {/* Copyright Section */}
                    <h2 className="text-3xl text-center font-semibold text-red-600 mt-10">Copyright Notice</h2>
                    <hr className="border-red-600 w-65 ml-129 mb-4 mt-1" />
                    <p>
                        © 2025 Atal Optical Corp. All rights reserved. All rights not
                        expressly granted herein are reserved. Unauthorized use or
                        reproduction of Site content is prohibited.
                    </p>
                </div>
            </div>
        </div>
    );
}
