import React, { useEffect, useState } from "react";
import FAQs from '../../assets/category/FAQs.jpg'
import API from "../../API/Api";
import ReactPaginate from "react-paginate";
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [faqData, setFaqData] = useState([{}]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fetchPage = async () => {
    try {
      const res = await API.get(`/getPagination?page=${currentPage + 1}&limit=8`);

      setFaqData(res.data.data);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };


  const fetchallfaq = async () => {
    try {
      const response = await API.get("/getallfaq", {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setFaqData(response.data.faqs);
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
          <div className="mt-20 ml-26 ">
            <img src={FAQs} loading="lazy" decoding="async" alt="woman" className="rounded-2xl w-full" />
          </div>
        </div>
        <div>
          <div className="max-w-5xl mx-auto p-6 bg-white mt-10 md:mr-10 ">
            <p className="md:text-4xl text-2xl">
              Frequently Asked <span className="font-bold text-[#f00000]">Questions</span>
            </p>
            <hr className="md:w-102 w-66 mb-10 mt-2 border-black"></hr>
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-black pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center focus:outline-none hover:cursor-pointer">
                  <div className="flex flex-col">
                    <span className="md:text-lg text-base font-medium">{faq.title}</span>
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
                  <p className="text-gray-700">{faq.description}</p>
                </div>
              </div>
            ))}

            {/* Pagination Component */}
            <ReactPaginate
              previousLabel={"← "}
              nextLabel={" →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"flex gap-2 mt-6 justify-center"}
              pageClassName={"border px-3 py-1 rounded"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={"border px-3 py-1 rounded hover:cursor-pointer"}
              nextClassName={"border px-3 py-1 rounded hover:cursor-pointer"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
