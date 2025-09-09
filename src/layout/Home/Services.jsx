import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ServicesContainer from "./ServicesContainer";

const Services = () => {
  return (
    <>
      <div className="bg-black md:px-10 py-20">
        <div className="text-white text-3xl font-semibold md:ml-20 ml-6">
          Our Eye Services
        </div>
        <hr className="w-42 md:ml-20 text-white mt-2 ml-6"></hr>
        <div className="flex mt-4 mb-6 md:ml-20 items-center md:flex-row flex-col">
          <div className="text-3xl md:mr-90 text-white mx-6 md:mx-0 md:mb-0 mb-6">
            <strong className="text-red-600 font-bold">Give Best Care For Your</strong> Eyes Our Eye Services
          </div>
          <button className="flex items-center bg-white text-black py-2 px-5 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out hover:cursor-pointer text-lg hover:text-white">
            View All{" "}
            <span className="ml-4 bg-black p-3 rounded-xl text-white hover:bg-white hover:text-black">
              <FaArrowRight className="hover:rotate-[-45deg] transition duration-300 ease-in-out" />
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:ml-16 md:mr-10 mx-6">
          <ServicesContainer />
        </div>
      </div>
    </>
  );
};

export default Services;
