import React from "react";
import { MdEmail } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-[#f00000] text-center py-10 text-white">
        <h3 className="text-xl font-semibold">
          Corporate Office : 34 Shining Willow Crescent, <br />
          Brampton, ON L6P 2A2, Canada
        </h3>
        <Link to="/eye-schedule-test">
          <button className="bg-white text-black mt-4 rounded-xl hover:bg-black hover:text-white text-xl font-semibold py-4 px-6 hover:cursor-pointer transition-colors duration-300">
            Book an Appointment
          </button>
        </Link>
      </div>

      <div className="bg-black text-white px-[5%] py-[1%] flex justify-between flex-wrap gap-y-8">
        {/* Box 1 */}
        <div className="max-w-[300px]">
          <h1 className="text-[#f00000] text-2xl font-bold mb-2">
            Atal Optical
          </h1>
          <p className="mb-4 text-sm">
            Atal Optical stands as a beacon of dedication, vision, and community service in the Canadian optical industry.
          </p>
          <div className="flex items-center gap-2 text-[#f00000]">
            <div>
              <MdEmail className="text-3xl" />
            </div>
            <div className="text-2xl">Email</div>
          </div>
          <div className="mt-1 text-md">
            <a
              href="mailto:sales.ataloptical@gmail.com"
              className="text-white hover:underline hover:text-red-600"
            >
              sales.ataloptical@gmail.com
            </a>
          </div>
        </div>

        {/* Box 2 - Useful Links */}
        <div>
          <h3 className="text-[#f00000] text-2xl font-semibold mb-2">
            Useful Links
          </h3>
          <ul className="space-y-1">
            <Link to="/about-us">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                About
              </li>
            </Link>
            <Link to="/eye-schedule-test">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Book Eye Exam
              </li>
            </Link>
            <Link to="/contact-us">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Contact Us
              </li>
            </Link>
            <Link to="/faq">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                FAQ
              </li>
            </Link>
            <Link to="/">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Home
              </li>
            </Link>
            <Link to="/atal-meaning">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Meaning of Atal
              </li>
            </Link>
            <Link to="/privacy-policy">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Privacy Policy
              </li>
            </Link>
            <Link to="/services">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Services
              </li>
            </Link>
            <Link to="/terms&Conditions">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Terms & Conditions
              </li>
            </Link>
          </ul>
        </div>

        {/* Box 3 - Services */}
        <div>
          <h3 className="text-[#f00000] text-2xl font-semibold mb-2">
            Our Services
          </h3>
          <ul className="space-y-1">
            <Link to="/disclaimer">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Disclaimer
              </li>
            </Link>
            <Link to="/eyeglasses-contact-policy">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Eye Glasses Contact Policy
              </li>
            </Link>
            <Link to="/general-info">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                General Information
              </li>
            </Link>
            <Link to="/intellectual-property">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Intellectual Property
              </li>
            </Link>
            <Link to="/liability">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Limitations of Liability
              </li>
            </Link>
            <Link to="/our-mission">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Our Mission
              </li>
            </Link>
            <Link to="/our-vision">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Our Vision
              </li>
            </Link>

            <Link to="/rights-enforcement-policy">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Right Enforcement Policy
              </li>
            </Link>
            <Link to="/responsibility">
              <li className="cursor-pointer hover:text-red-600 hover:underline text-md">
                Vision & Responsibility
              </li>
            </Link>
          </ul>
        </div>

        {/* Box 4 - Contact */}
        <div>
          <h3 className="text-[#f00000] text-2xl font-semibold mb-2">
            Contact Us
          </h3>
          <div className="flex items-center gap-2 text-[#f00000]">
            <div>
              <FaMapMarkedAlt className="text-3xl" />
            </div>
            <div className="text-xl">Brompton west</div>
          </div>
          <p className="max-w-[200px] mt-1">
            Corporate Office : 34 Shining Willow Crescent, Brampton, ON L6P 2A2,
            Canada
          </p>
          <div className="flex items-center gap-2 mt-4 mb-5">
            <div>
              <MdLocalPhone className="text-3xl text-[#f00000]" />
            </div>
            <div className="text-l">1866-242-3545</div>
          </div>
        </div>
      </div>

      <div className="bg-[#f00000] w-full md:h-[60px] flex justify-evenly items-center text-white text-xs py-3 px-2">
        <div>
          <p>&copy; 2025 Atal Optical. All rights reserved</p>
        </div>
        <div>
          <p>Developed By | World WebLogic</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
