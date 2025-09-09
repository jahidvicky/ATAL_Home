import React from "react";
import bgimage from "../../assets/promotion/bgimage.png";
import woman from "../../assets/promotion/woman.jpg";
import { TbMathGreater } from "react-icons/tb";
function Promotion() {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="flex ">
          <div className="mt-14 h-[560px] w-[665px] ml-26 hidden md:block">
            <img
              src={woman}
              alt="Woman"
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full rounded-tl-2xl rounded-bl-2xl"
            />
          </div>
          <div className="bg-white mt-14 md:mr-26 md:w-160">
            <h1 className="text-3xl font-bold mt-10 ml-10"> OUR <span className="text-red-600">PROMOTIONS</span> </h1>
            <hr className="mt-2 w-68 ml-10 border-black"></hr>
            <p className="text-lg text-zinc-600 m-10 text-justify">
              We offers Multiple Pair Savings of 40% on our eyewear. Some
              exclusions apply. With the purchase of a Year Supply of Contacts,
              Eyewear Concepts offers: Contact Lens Replacement and Exchange –
              Contact lens replacement and exchange
            </p>
            <div className="flex items-center ml-10 mb-8">
              <span>
                <TbMathGreater className="bg-red-600 text-white rounded-full text-center text-3xl p-1 hover:rotate-180 hover:cursor-pointer" />
              </span>
              <span className="font-semibold text-lg mr-8 ml-2">
                Progressive Lenses
              </span>
              <span>
                <TbMathGreater className="bg-red-600 rounded-full text-center text-white text-3xl p-1 hover:rotate-180 hover:cursor-pointer" />
              </span>
              <span className="font-semibold text-lg ml-2">
                2 Pairs of Prescription Glasses
              </span>
            </div>
            <div className="flex items-center ml-10 mb-8">
              <span>
                <TbMathGreater className="bg-red-600 text-white rounded-full text-center text-3xl p-1 hover:rotate-180 hover:cursor-pointer" />
              </span>
              <span className="font-semibold text-lg mr-16 ml-2">
                Contact Lenses
              </span>
              <span>
                <TbMathGreater className="bg-red-600 rounded-full text-center text-white text-3xl p-1 hover:rotate-180 hover:cursor-pointer" />
              </span>
              <span className="font-semibold text-lg ml-2">
                Designer Frames
              </span>
            </div>
            <div className="flex items-center ml-10">
              <span>
                <TbMathGreater className="bg-red-600 text-white rounded-full text-center text-3xl p-1 hover:rotate-180 hover:cursor-pointer" />
              </span>
              <span className="font-semibold text-lg mr-8 ml-2">
                Childrens Glasses
              </span>
            </div>
            <button className="bg-red-600 rounded-lg text-white p-3 font-semibold text-lg ml-10 mt-8 mb-6 hover:cursor-pointer hover:bg-black">
              View Promotion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promotion;
