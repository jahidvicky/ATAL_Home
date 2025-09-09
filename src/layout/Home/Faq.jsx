import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer prescription sunglasses?",
      answer:"Yes, we carry a wide range of prescription sunglasses with UV protection, including polarized, transition, and custom-tinted lenses.",
    },
    {
      question: "Why is UV protection important for eye health?",
      answer:'Prolonged UV exposure can lead to cataracts, macular degeneration, and corneal damage. Our sunglasses offer 100% UV-A and UV-B protection.',
    },
    {
      question: " How can I choose the right frame for my face?",
      answer:"Our experienced team will guide you based on face shape, lifestyle, and personal style preferences. Virtual try-on options are also available.",
    },
    {
      question: " What brands do you carry",
      answer:" We offer a curated selection of designer, luxury, and value brands, including Ray-Ban, Oakley, Gucci, Versace, and more.",
    },
    {
      question: " Do you provide glasses for specific professions or safety requirements?",
      answer:"Yes, we offer occupational safety glasses and custom eyewear for professionals, including healthcare workers, tradespeople, and office workers.",
    },
    {
      question: "Can I get fitted for contact lenses at Atal Optical?",
      answer:" Yes. Our optometrists provide professional contact lens fittings, training for first-time wearers, and follow-up care.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="flex md:flex-row flex-col md:mb-20">
        <div className="md:mr-6">
          <div className="bg-red-600 p-10 rounded-xl mt-10 md:ml-26 mx-5 md:min-w-xl">
            <p className="text-white text-4xl">
              <span className="font-bold mr-4">Book</span>Eye Exam
            </p>
            <hr className="text-white text-xl mt-2 w-56"></hr>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mt-10 mr-26">
                <label className="text-white text-xl">Name</label>
                <input
                  type="text"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-white text-xl">Your Email</label>
                <input
                  type="text"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mt-10 mr-26">
                <label className="text-white text-xl">Phone Number</label>
                <input
                  type="number"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-white text-xl">
                  Choose Our location
                </label>
                <input
                  type="text"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mt-10 mr-26">
                <label className="text-white text-xl">City</label>
                <input
                  type="text"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-white text-xl">Postal Code</label>
                <input
                  type="number"
                  className="outline-none border-b-2 text-white md:w-52 w-64"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mt-10 ">
                <label className="text-white text-xl">Address</label>
                <input
                  type="text"
                  className="outline-none border-b-2 text-white md:w-132 w-64"
                />
              </div>
            </div>
            <button className="bg-white p-3 mt-6 rounded-xl text-xl font-semibold flex items-center hover:cursor-pointer hover:bg-black hover:text-white transition-colors duration-300">
              Submit
              <span className="ml-4 p-2 rounded-lg bg-black hover:bg-white hover:text-black">
                <FaArrowRight className="hover:rotate-[-45deg] text-white hover:text-black" />
              </span>
            </button>
          </div>
        </div>
        <div>
          <div className="md:max-w-5xl mx-auto p-6 min-h-[500px] bg-white mt-10 md:mr-10">
            <h1 className="text-3xl font-bold mb-3 text-red-600">FAQ</h1>
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
                    {openIndex === index ? "−" : "+"}
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
