import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need a prescription to buy glasses or contact lenses?",
      answer:
        "Yes. All prescription glasses, prescription sunglasses, and contact lenses require a valid prescription from a licensed optometrist or ophthalmologist in Canada. Orders cannot be processed without a valid prescription.",
    },
    {
      question: "Can I exchange or return prescription glasses or frames?",
      answer:
        "Prescription glasses and frames are custom-made medical devices and are final sale under Ontario and Canadian law. They cannot be exchanged or refunded. Only non-prescription sunglasses are eligible for exchange within 1–2 days of purchase.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit cards including Visa, MasterCard, and American Express, as well as debit cards. Select financing options may also be available where applicable. Please note that full payment is required before any order can be processed.",
    },
    {
      question: "How long does it take to process and ship my order?",
      answer:
        "Non-prescription items typically require 1–3 business days for processing, while prescription or custom eyewear may take 3–7 business days. Shipping time varies based on the carrier and delivery destination, and tracking information will be provided once your order has been shipped.",
    },
    {
      question: "Which shipping carriers do you use?",
      answer:
        "Atal Optical ships orders using trusted carriers including UPS, DHL, FedEx, and Canada Post. Shipping fees are calculated at checkout based on the selected service and are non-refundable.",
    },
    {
      question: "What if my order is lost or damaged during shipping?",
      answer:
        "If your package arrives damaged, take photos of the package and the item immediately. Report the damage to Atal Optical within 24 hours of delivery, and keep all original packaging for inspection. Please note that late claims may not be accepted.",
    },
    {
      question: "Do you offer eye exams in-store?",
      answer:
        "Yes, we have qualified optometrists available for comprehensive eye exams, including vision tests, prescription updates, and eye health checks.",
    },
    {
      question: "How do I provide measurements for glasses?",
      answer:
        "Prescription eyewear requires your pupillary distance (PD). You can provide this measurement from your optometrist, or we can take the measurement for you in-store.",
    },
  ];

  const steps = [
    {
      title: "Step 1: Open Book Eye Exam",
    },
    {
      title: "Step 2: Click the Book Eye Exam Button",
    },
    {
      title: "Step 3: Confirm Booking Start",
    },
    {
      title: "Step 4: Select Appointment Type",
    },
    {
      title: "Step 5: Choose a Time Slot",
    },
    {
      title: "Step 6: Fill the Form & Book",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="flex md:flex-row flex-col md:mb-20">
        <div className="md:mr-6">
          <div className="bg-[#f00000] p-9 rounded-xl mt-10 md:ml-26 mx-5 md:min-w-xl">
            <div className="max-w-3xl w-full">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center text-black mb-12"
              >
                How to Book Eye Exam
                <hr className="border border-white mx-auto mt-3 w-40 sm:w-60 md:w-80 lg:w-[26rem] " />
              </motion.h1>

              {/* Vertical Steps Timeline */}
              <div className="relative border-l-4 border-white pl-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="mb-10"
                  >
                    <div className="flex items-start">
                      {/* Number Circle */}
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold mr-4 shadow-md">
                        {index + 1}
                      </div>
                      {/* Text */}
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {step.title}
                        </h2>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link to="/eye-schedule-test">
              <button className="bg-white p-3 mt-6 rounded-xl text-xl font-semibold flex items-center hover:cursor-pointer hover:bg-black hover:text-white transition-colors duration-300">
                Book Eye Exam
                <span className="ml-4 p-2 rounded-lg bg-black hover:bg-white hover:text-black">
                  <FaArrowRight className="hover:rotate-[-45deg] text-white hover:text-black" />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="md:max-w-5xl mx-auto p-6 min-h-[500px] bg-white mt-10 md:mr-10">
            <h1 className="text-3xl font-bold mb-3 text-[#f00000]">FAQ</h1>
            <p className="text-4xl">
              Frequently Asked <span className="font-bold">Questions</span>
            </p>
            <hr className="md:w-102 w-42 mb-10 mt-2 border-black"></hr>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-black pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center focus:outline-none hover:cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{faq.question}</span>
                  </div>
                  <span className="text-xl">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === index
                      ? "max-h-40 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mr-14">
            <Link to="/faq">
              <button className="flex items-center gap-4 text-white font-medium bg-[#f00000] px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 cursor-pointer">
                FIND MORE
                <span className="bg-white text-black p-1 rounded-full">
                  <FiArrowRight
                    size={16}
                    className="hover:rotate-[-40deg] transition-transform"
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
