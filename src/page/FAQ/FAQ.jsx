import React, { useEffect, useState } from "react";
import woman from '../../assets/category/woman.jpg'
import API from "../../API/Api";
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [faqdata, setfaqdata] = useState([{}]);

  const fetchallfaq = async () => {
    try {
      const response = await API.get("/getallfaq", {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${admintoken}`,
        }
      });
      setfaqdata(response.data.faqs);
      // console.log(response.data.faqs);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchallfaq();
  }, [])

  return (
    <>
      <div className="flex mb-20">
        <div className="mr-6 hidden lg:block">
          <div className="mt-20 ml-26 min-w-xl">
            <img src={woman} loading="lazy" decoding="async" alt="woman" className="rounded-2xl" />
          </div>
        </div>
        <div>
          <div className="max-w-5xl mx-auto p-6 bg-white mt-10 md:mr-10 ">
            <p className="md:text-4xl text-2xl">
              Frequently Asked <span className="font-bold text-red-600">Questions</span>
            </p>
            <hr className="md:w-102 w-66 mb-10 mt-2 border-black"></hr>
            {faqdata.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-black pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center focus:outline-none hover:cursor-pointer">
                  <div className="flex flex-col">
                    <span className="md:text-lg text-base font-medium">{faq.title}</span>
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
                  <p className="text-gray-700">{faq.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
