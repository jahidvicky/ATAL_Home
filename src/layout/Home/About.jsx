import React from "react";
import image from "../../assets/about/about-us.jpg";
import bgimage from "../../assets/about/bgimage.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      className="bg-cover bg-center h-[90vh] lg:h-[100vh] mb-20"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:py-12 md:max-w-7xl mx-auto">
        {/* Left - Image */}
        <div className="relative w-full lg:w-1/2 md:flex justify-center pt-10 hidden ">
          <img
            src={image}
            alt="Eye Checkup"
            className="max-w-[400px]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-4 left-94 bg-[#f00000] text-white text-center rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-lg hover:bounce hover:cursor-pointer ">
            <span className="text-3xl font-bold">Clear</span>
            <span className="text-3xl">Vision</span>
          </div>
        </div>

        {/* Right - Text */}
        <div className="mt-8 lg:mt-0 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-[#f00000] text-2xl font-semibold mb-2">
            Welcome To ATAL Optical
          </h2>
          <hr className="md:w-50 mb-6 border-red-500 md:ml-0 mx-6"></hr>
          <h1 className="text-2xl md:text-4xl font-light leading-snug mb-4">
            ATAL Optical has been providing{" "}
            <strong className="font-semibold">
              luxury eye wear for clients
            </strong>{" "}
            in Toronto and the GTA since 2024.
          </h1>
          <p className="text-gray-600 text-base">
            Since 2024, Atal Optical has been proudly serving Toronto and the GTA with premium eye care and luxury eyewear. With a focus on quality, style, and precision, we have built a reputation for offering high-end frames, advanced lenses, and personalized eye care solutions that cater to both fashion and function. Our commitment to excellence ensures that every client not only sees better but also looks their best, making Atal Optical a trusted destination for luxury eyewear for nearly two decades.
          </p>
          <p className="text-gray-600 text-base mt-6 mb-6">
            Over the years, Atal Optical has grown into a trusted name by combining professional expertise with a curated selection of world-class eyewear brands. Our team of experienced opticians and eye care specialists takes pride in delivering a personalized experience, ensuring each client finds the perfect balance of comfort, vision, and style. From trendsetting luxury frames to advanced prescription solutions, we are dedicated to meeting the diverse needs of our Toronto and GTA community with the highest standards of care.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link to="/about-us"><button className="flex items-center bg-[#f00000] text-white p-3 rounded-lg mt-6 hover:bg-black hover:cursor-pointer">
              About Us{" "}
              <span className="ml-4 bg-white p-2 rounded-lg">
                <FaArrowRight className="hover:rotate-[-45deg] hover:cursor-pointer transition duration-250 ease-in-out text-black" />
              </span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
