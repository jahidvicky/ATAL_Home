import React from "react";

const EyeExamBooking = () => {
    return (
        <div className="p-10 bg-white">
            <h1 className="text-4xl text-red-600 text-center font-bold mb-6">
                Book Your Eye Consultation
            </h1>
            <p className="text-xl text-center mb-10">
                Enter your information in order to complete the online booking.
            </p>

            <div className="grid grid-cols-2 gap-10 border border-gray-300 rounded-lg p-8">
                {/* Left Section - Appointment Info */}
                <div>
                    <h2 className="text-lg font-bold mb-4">YOUR APPOINTMENT</h2>
                    <p className="text-gray-700">
                        <span className="font-medium">Tuesday September 16, 2025 at 10:40 am</span>
                    </p>
                    <p className="mt-2 text-gray-700">Full Eye Exam</p>

                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">EYE CARE PROFESSIONAL</h3>
                        <div className="flex items-center">
                            <img
                                src="https://via.placeholder.com/60"
                                alt="Doctor"
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <p className="text-gray-800 font-medium">Dr. Melissa Yuen</p>
                        </div>
                    </div>

                    <button className="mt-6 flex items-center text-red-600 hover:underline">
                        ✎ MODIFY APPOINTMENT
                    </button>
                </div>

                {/* Right Section - Form */}
                <div>
                    <h2 className="text-lg font-bold mb-4">YOUR INFORMATION</h2>

                    {/* Gender + DOB */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date of Birth</label>
                            <div className="grid grid-cols-3 gap-2">
                                <select className="border border-gray-300 rounded-md p-2">
                                    <option>Year</option>
                                </select>
                                <select className="border border-gray-300 rounded-md p-2">
                                    <option>Month</option>
                                </select>
                                <select className="border border-gray-300 rounded-md p-2">
                                    <option>Day</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Confirm your email"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter your phone"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Choose</label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option>Mobile</option>
                                <option>Home</option>
                                <option>Work</option>
                            </select>
                        </div>
                    </div>

                    {/* Consent */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-2">Consent and declaration</h3>
                        <div className="flex items-start">
                            <input type="checkbox" className="mt-1 mr-2" />
                            <p className="text-sm text-gray-600">
                                I declare that all the information provided in this form are true,
                                complete and accurate and I agree to send my personal information
                                to my clinic for the processing of my appointment request.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="w-full rounded-md p-3 bg-black text-white mt-6 hover:bg-gray-800">
                        CONFIRM MY APPOINTMENT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EyeExamBooking;

