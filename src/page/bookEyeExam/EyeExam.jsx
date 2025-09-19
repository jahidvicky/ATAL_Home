import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";

const EyeExam = () => {
  const location = useLocation();
  const { doctorName, day, weekday, time, examType, doctorImage } = location.state || {};

  const [consent, setConsent] = useState(false);
  const [examData, setExamData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  const custId = localStorage.getItem("user")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Safely combine day and time
    const appointmentDate = day && time ? `${day} ${time}` : "";

    try {
      const payload = {
        ...examData,
        custId: custId || null,
        doctorName: doctorName || "",
        appointmentDate,
        examType: examType || "",
        weekday: weekday || "",
      };

      const res = await API.post("/addEyeExam", payload);

      if (res.data.success) {
        alert("Appointment booked successfully!");
        setExamData({
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          email: "",
          phone: "",
        });
      } else {
        alert(res.data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50">
      <h1 className="text-2xl md:text-4xl text-red-600 text-center font-bold mb-3">
        Book Your Eye Consultation
      </h1>
      <p className="text-sm md:text-[16px] text-gray-700 text-center mb-6 md:mb-10">
        Enter your details below to confirm your online booking.
      </p>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden">


          {/* Left Section - Appointment Info */}
          <div className="bg-red-50 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Appointment
              </h2>
              <p className="text-gray-700 text-lg">
                <span className="font-medium">
                  {day}, {time}
                </span>
              </p>
              <p className="mt-2 text-gray-600">{examType}</p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Eye Care Professional
                </h3>
                <div className="flex items-center">
                  <img
                    src={doctorImage}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full border-2 border-red-500 mr-4"
                  />
                  <p className="text-gray-800 font-medium">{doctorName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-5 md:mb-6">
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={examData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={examData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Gender + DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={examData.gender}
                    onChange={handleChange}
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={examData.dob}
                    onChange={handleChange}
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={examData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={examData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    className="w-full border border-red-500 rounded-md p-2 text-sm md:text-base focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Consent & Declaration</h3>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 mr-2"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <p className="text-sm text-gray-600">
                    I declare that all the information provided is true, complete, and accurate.
                    I agree to send my personal information to my clinic for processing this appointment request.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!consent} // disabled if consent is false
                className={`w-full rounded-md p-3 hover:cursor-pointer text-white font-semibold text-base md:text-lg mt-4 transition ${consent ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Book Appointment
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EyeExam;
