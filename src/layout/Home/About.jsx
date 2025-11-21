import React from "react";
import image from "../../assets/about/about-us.jpg";
import bgimage from "../../assets/about/bgimage.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      className="bg-cover bg-center w-full min-h-[100vh] mb-20 py-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 md:px-10 max-w-7xl mx-auto">

        {/* Left - Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center pt-10">
          <img
            src={image}
            alt="Eye Checkup"
            className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] rounded-md"
            loading="lazy"
            decoding="async"
          />

          {/* Red Round Bubble */}
          <div className="absolute top-6 right-20 bg-[#f00000] text-white text-center rounded-full 
            w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center shadow-xl">
            <span className="text-xl sm:text-2xl font-bold">Clear</span>
            <span className="text-xl sm:text-2xl">Vision</span>
          </div>
        </div>

        {/* Right - Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-[#f00000] text-3xl font-semibold mb-2">
            Welcome To ATAL Optical
          </h2>

          <hr className="w-90 border-red-500 mx-auto lg:mx-0 mb-6" />

          <h1 className="text-2xl md:text-4xl font-light leading-snug mb-4">
            ATAL Optical has been providing{" "}
            <strong className="font-semibold">
              luxury eye wear for clients
            </strong>{" "}
            in Toronto and the GTA since 2024.
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            Since 2024, Atal Optical has been proudly serving Toronto and the GTA
            with premium eye care and luxury eyewear. With a focus on quality,
            style, and precision, we have built a reputation for offering high-end
            frames, advanced lenses, and personalized eye care solutions that
            cater to both fashion and function. Our commitment to excellence
            ensures that every client not only sees better but also looks their
            best, making Atal Optical a trusted destination for luxury eyewear
            for nearly two decades.
          </p>

          <p className="text-gray-600 text-base leading-relaxed mt-6 mb-6">
            Over the years, Atal Optical has grown into a trusted name by combining
            professional expertise with a curated selection of world-class eyewear
            brands. Our team of experienced opticians and eye care specialists
            takes pride in delivering a personalized experience, ensuring each
            client finds the perfect balance of comfort, vision, and style. From
            trendsetting luxury frames to advanced prescription solutions, we are
            dedicated to meeting the diverse needs of our Toronto and GTA community
            with the highest standards of care.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link to="/about-us">
              <button className="flex items-center bg-[#f00000] text-white px-5 py-3 rounded-sm mt-6 hover:bg-black transition">
                About Us{" "}
                <span className="ml-4 bg-white p-2 rounded-lg">
                  <FaArrowRight className="text-black transition duration-200 hover:-rotate-45" />
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
