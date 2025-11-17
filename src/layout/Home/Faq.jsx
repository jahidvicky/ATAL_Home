import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer prescription sunglasses?",
      answer:
        "Yes, we carry a wide range of prescription sunglasses with UV protection, including polarized, transition, and custom-tinted lenses.",
    },
    {
      question: "Why is UV protection important for eye health?",
      answer:
        "Prolonged UV exposure can lead to cataracts, macular degeneration, and corneal damage. Our sunglasses offer 100% UV-A and UV-B protection.",
    },
    {
      question: "How can I choose the right frame for my face?",
      answer:
        "Our experienced team will guide you based on face shape, lifestyle, and personal style preferences. Virtual try-on options are also available.",
    },
    {
      question: "What brands do you carry",
      answer:
        "We offer a curated selection of designer, luxury, and value brands, including Ray-Ban, Oakley, Gucci, Versace, and more.",
    },
    {
      question: "Do you provide glasses for specific professions or safety requirements?",
      answer:
        "Yes, we offer occupational safety glasses and custom eyewear for professionals, including healthcare workers, tradespeople, and office workers.",
    },
    {
      question: "Can I get fitted for contact lenses at Atal Optical?",
      answer:
        "Yes. Our optometrists provide professional contact lens fittings, training for first-time wearers, and follow-up care.",
    },
    {
      question: "Do you offer eye exams in-store?",
      answer:
        "Yes, we have qualified optometrists available for comprehensive eye exams, including vision tests, prescription updates, and eye health checks.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "We accept returns and exchanges within 14 days of purchase, provided the product is in its original condition with proof of purchase.",
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
                  className="w-full text-left flex justify-between items-center focus:outline-none hover:cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{faq.question}</span>
                  </div>
                  <span className="text-xl">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${openIndex === index
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
