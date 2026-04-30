import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

import DiwaliImg from "../../assets/freeExam/diwali.jpg";
import VaisakhiImg from "../../assets/freeExam/vaisakhi.png";
import ChristmasImg from "../../assets/freeExam/Christmas.png";
import { Link } from "react-router-dom";
import API from "../../API/Api";

const festivals = [
  {
    name: "Diwali",
    desc: "Celebrate Diwali with a brighter vision. Get a free comprehensive eye checkup and protect your eyes from digital strain and festive lights.",
    img: DiwaliImg,
  },
  {
    name: "Vaisakhi",
    desc: "This Vaishakhi, take a step towards healthy eyes. Our experts provide free vision testing and consultation for all age groups.",
    img: VaisakhiImg,
  },
  {
    name: "Christmas",
    desc: "Spread joy this Christmas with clear vision. Enjoy a free eye checkup and professional guidance for better eye health.",
    img: ChristmasImg,
  },
];

export default function FreeEyeCheckup() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Submitting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await API.post("/addEyeCheckup", formData);

      if (res.data.success) {
        Swal.fire({
          title: "Success 🎉",
          text: res.data.message,
          icon: "success",
          confirmButtonColor: "#f00000",
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Error ❌",
          text: res.data.message,
          icon: "error",
        });
      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Server Error ❌",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white overflow-hidden">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-6 bg-[#f00000] text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Free Eye Checkup Camp
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          This festive season, take care of your most precious sense.
          We are offering <strong>FREE eye checkups</strong> during
          Diwali, Vaisakhi, and Christmas.
        </p>
      </motion.section>


      {/* FORM SECTION */}
      <section className="bg-[#f9f9f9] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">

          {/* LEFT SIDE CONTENT */}
          <div className="md:w-1/2 mt-25">
            <h2 className="text-4xl font-bold text-[#f00000] mb-4">
              Take Care of Your Vision Today
            </h2>

            <p className="text-gray-700 mb-6">
              Join our free eye checkup camp and ensure your eyes stay healthy.
              Our expert optometrists provide accurate testing and personalized
              consultation to help you see clearly.
            </p>

            <ul className="space-y-3 text-gray-700 mb-6">
              <li>✔ Free vision testing by professionals</li>
              <li>✔ Early detection of eye problems</li>
              <li>✔ Consultation for better eye care</li>
              <li>✔ Suitable for all age groups</li>
            </ul>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="md:w-1/2 w-full max-w-[500px] mx-auto bg-white border border-red-300 rounded-2xl p-8 shadow-lg">

            <h3 className="text-2xl font-bold text-center text-[#f00000] mb-6">
              Book Free Eye Checkup
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Any concerns or notes..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#f00000] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Book Appointment
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* FESTIVALS */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {festivals.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="md:w-1/2">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
              />
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#f00000] mb-4">
                {item.name} Special Free Eye Checkup
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {item.desc}
              </p>

              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#f00000] text-white px-8 py-3 rounded-full"
                >
                  Visit Our Store
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* WHY */}
      <motion.section className="text-center px-6 pb-20">
        <h2 className="text-4xl font-bold text-[#f00000] mb-6">
          Why a Free Eye Checkup Matters
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          Many eye problems develop silently. Regular checkups help detect issues early.
        </p>
      </motion.section>

      {/* INCLUDED */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-4xl text-center text-[#f00000] mb-12 font-bold">
          What’s Included
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Vision Testing", "Eye Power Check", "Eye Pressure Screening", "Doctor Consultation"].map((item) => (
            <div key={item} className="p-6 border border-red-500 rounded-xl text-center">
              👁️ {item}
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#f00000] text-white py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Limited Time Offer
        </h3>
        <Link to="/">
          <button className="bg-white text-[#f00000] px-8 py-3 rounded-full">
            Visit Store
          </button>
        </Link>
      </section>

    </div>
  );
}