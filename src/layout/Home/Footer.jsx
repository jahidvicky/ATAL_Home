import React from "react";
import { MdEmail } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-[#f00000] text-center py-10 text-white">
        <h3 className="text-xl font-semibold">
          Corporate Office : 34 Shining Willow Crescent, <br />
          Brampton, ON L6P 2A2, Canada
        </h3>
        <NavLink to="/eye-schedule-test">
          <button className="bg-white text-black mt-4 rounded-xl hover:bg-black hover:text-white text-xl font-semibold py-4 px-6 hover:cursor-pointer transition-colors duration-300">
            Book an Appointment
          </button>
        </NavLink>
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
            <br />
            <a
              href="mailto:info.ataloptical@gmail.com"
              className="text-white hover:underline hover:text-red-600"
            >
              info.ataloptical@gmail.com
            </a>
          </div>
        </div>

        {/* Box 2 - Useful Links */}
        <div>
          <h3 className="text-[#f00000] text-2xl font-semibold mb-2">
            Useful Links
          </h3>
          <ul className="space-y-1">
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>About</li>
            </NavLink>

            <NavLink
              to="/eye-schedule-test"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Book Eye Exam</li>
            </NavLink>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Contact Us</li>
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>FAQ</li>
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Home</li>
            </NavLink>

            <NavLink
              to="/atal-meaning"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Meaning of Atal</li>
            </NavLink>

            <NavLink
              to="/privacy-policy"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Privacy Policy</li>
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Services</li>
            </NavLink>

            <NavLink
              to="/terms&Conditions"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f00000] underline text-md"
                  : "cursor-pointer hover:text-red-600 hover:underline text-md"
              }
            >
              <li>Terms & Conditions</li>
            </NavLink>
          </ul>
        </div>

        {/* Box 3 - Services */}
        <div>
          <h3 className="text-[#f00000] text-2xl font-semibold mb-2">
            Our Services
          </h3>
          <ul className="space-y-1">
            {[
              { to: "/disclaimer", label: "Disclaimer" },
              { to: "/eyeglasses-contact-policy", label: "Eye Glasses Contact Policy" },
              { to: "/general-info", label: "General Information" },
              { to: "/intellectual-property", label: "Intellectual Property" },
              { to: "/liability", label: "Limitations of Liability" },
              { to: "/our-mission", label: "Our Mission" },
              { to: "/our-vision", label: "Our Vision" },
              { to: "/rights-enforcement-policy", label: "Right Enforcement Policy" },
              { to: "/responsibility", label: "Vision & Responsibility" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#f00000] underline text-md"
                    : "cursor-pointer hover:text-red-600 hover:underline text-md"
                }
              >
                <li>{item.label}</li>
              </NavLink>
            ))}
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
