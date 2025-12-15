import { MdEmail, MdLocalPhone } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Mastercard from "../../assets/footer/mastercard.png";
import Paypal from "../../assets/footer/paypal.png";
import Visa from "../../assets/footer/visa.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import SocialLinks from "../../page/SocialMedia/SocialLinks";
import { useState } from "react";
import Chatbot from "../../components/Chatbot";

const PaymentCard = ({ img, alt }) => {
  return (
    <div className="flex items-center gap-2 bg-white border rounded-xs px-2 scale-90">
      <img src={img} alt={alt} className="w-6 h-5 object-contain" />
    </div>
  );
};

const Footer = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      {/* Top promo row */}
      <div className="bg-black text-white px-[5%] py-6">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <p className="text-sm tracking-wide">
            Stay up to date with atal optical holiday deals.
          </p>

          <button className="bg-[#f00000] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition">
            <NavLink to="/eye-schedule-test">Select Eye Exam</NavLink>
          </button>
        </div>

        {/* TOP LINE */}
        <div
          className="mt-6 mx-auto"
          style={{
            height: "1px",
            background: "#374151",
            width: "calc(100% - 3px)",
            maxWidth: "1280px",
            marginLeft: "-0.1%",
          }}
        />
      </div>

      {/* MAIN FOOTER GRID */}
      <div className="bg-black text-white px-[5%] py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {/* HELP */}
          <div className="w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">Help</h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/eye-schedule-test"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Book an eye exam
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/optical-policy"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Optical Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  FAQ
                </NavLink>
              </li>
            </ul>

            <div className="mt-5 w-xl pr-15">
              <h5 className="text-[#f00000] font-semibold mb-2">Contact Us</h5>

              <div className="flex items-start gap-1 mb-2 text-gray-300">
                <MdLocalPhone className="text-lg mt-1 text-white" />
                <span className="text-sm">Call 1866-242-3545</span>
              </div>

              <div className="flex items-start gap-1 mb-2 text-gray-300">
                <MdEmail className="text-lg mt-1 text-white" />
                <span className="text-sm">
                  <a
                    href="mailto:sales.ataloptical@gmail.com"
                    className="text-sm hover:text-[#f00000] cursor-pointer"
                  >
                    sales.ataloptical@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-1 mb-2 text-gray-300">
                <MdEmail className="text-lg mt-1 text-white" />
                <span className="text-sm">
                  <a
                    href="mailto:info.ataloptical@gmail.com"
                    className="text-sm hover:text-[#f00000] cursor-pointer"
                  >
                    info.ataloptical@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-1 text-gray-300">
                <FaMapMarkerAlt className="text-xl mt-1 text-white" />
                <button
                  onClick={() => setOpenChat(!openChat)}
                  className="text-sm"
                >
                  Chat with an agent
                </button>
              </div>

              {/* Chatbox - toggles open/close */}
              {openChat && (
                <div className="fixed bottom-20 right-6 z-50">
                  <Chatbot onClose={() => setOpenChat(false)} />
                </div>
              )}
            </div>
          </div>

          {/* GLASSES */}
          <div className="pr-14 w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">Glasses</h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/glasses/lens_type/blue%20violet"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Blue-violet light glasses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/heart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Heart Face
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allproduct/kids/6915705d9ceac0cdda41c83f/69157748eeb23fa59c7d5378"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Kids' glasses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/gender/men"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Men's glasses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/oval"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Oval Face
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/lens_type/progressive"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Progressive
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/round"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Round Face
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/square"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Square Face
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/lens_type/transitions"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Transitions Glasses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/triangle"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Triangle Face
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/glasses/gender/women"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Women's glasses
                </NavLink>
              </li>
            </ul>
          </div>

          {/* CONTACT LENSES */}
          <div className="pr-14 w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">
              Contact Lenses
            </h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/contact_lenses/Acuvue/690c6ecece83c44ad440e02e"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Acuvue
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/Air%20Optix/690c6ee3ce83c44ad440e031"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Air optics
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/category/weekly/6915735feeb23fa59c7d532b"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Biweekly/weekly
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/Biofinity/690c6efbce83c44ad440e034"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Biofinity
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allproduct/Coloured/6915735feeb23fa59c7d532b/69157878eeb23fa59c7d53a2"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Coloured
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/category/daily/6915735feeb23fa59c7d532b"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Daily
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/Everclear/690c708ace83c44ad440e040"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Everclear
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact_lenses/category/monthly/6915735feeb23fa59c7d532b"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Monthly
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allproduct/Multifocal/6915735feeb23fa59c7d532b/69157823eeb23fa59c7d5394"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Multifocal
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allproduct/Single%20Vision/6915735feeb23fa59c7d532b/69157803eeb23fa59c7d538d"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Single Vision
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allproduct/Toric/6915735feeb23fa59c7d532b/6915785beeb23fa59c7d539b"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Toric
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Our services */}
          <div className="pr-2 w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">Our Services</h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/disclaimer"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Disclaimer
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/eyeglasses-contact-policy"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Eye Glasses Contact Policy
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/general-info"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  General Information
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/intellectual-property"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Intellectual Property
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/liability"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Limitations of Liability
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/rights-enforcement-policy"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Right Enforcement Policy
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/responsibility"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Vision & Responsibility
                </NavLink>
              </li>
            </ul>
          </div>

          {/* REWARDS & EYEWEAR */}
          <div className="pr-14 w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">
              Rewards & Eyewear
            </h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/refer-coupon"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Refer a friend
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/face-shape"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Glasses for your face shape
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ABOUT US */}
          <div className="pr-14 w-full">
            <h4 className="text-[#f00000] font-semibold mb-3">About Us</h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/atal-meaning"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Meaning of Atal
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/our-mission"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Our Mission
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/our-vision"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f00000]"
                      : "cursor-pointer hover:text-red-600"
                  }
                >
                  Our Vision
                </NavLink>
              </li>
            </ul>

            {/* Policies moved directly under About Us (like Contact Us under Help) */}
            <div className="mt-5">
              <h5 className="text-[#f00000] font-semibold mb-2">Policies</h5>
              <ul className="text-xs space-y-2 text-gray-300">
                <li>
                  <NavLink
                    to="/cookies-policy"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#f00000]"
                        : "cursor-pointer hover:text-red-600"
                    }
                  >
                    Cookies Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/disclaimer-policy"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#f00000]"
                        : "cursor-pointer hover:text-red-600"
                    }
                  >
                    Disclaimer Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/exchange-policy"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#f00000]"
                        : "cursor-pointer hover:text-red-600"
                    }
                  >
                    Exchange Policy
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/shipping-policy"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#f00000]"
                        : "cursor-pointer hover:text-red-600"
                    }
                  >
                    Shipping Policy
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/return-exchange"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#f00000]"
                        : "cursor-pointer hover:text-red-600"
                    }
                  >
                    Return, Exchange & Consumer Policy
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PAYMENT + COUNTRY */}
        <div className="max-w-[1280px] mt-10 flex items-center justify-between -mb-6">
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-400 min-w-[260px]">
              We guarantee every transaction is 100% secure
            </div>

            <div className="flex items-center gap-2">
              <PaymentCard img={Visa} alt="Visa" />
              <PaymentCard img={Mastercard} alt="Mastercard" />
              <PaymentCard img={Paypal} alt="PayPal" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-black text-white border-t border-gray-800 text-xs py-3 pb-5">
        <div className="max-w-[1280px] mx-auto px-[2%] flex justify-between items-center">
          <SocialLinks />

          <div className="flex items-center gap-3 text-gray-300 pr-2">
            <span>© 2025 Atal Optical</span>
            <span>|</span>
            <span>
              <NavLink
                to="/terms&Conditions"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#f00000]"
                    : "cursor-pointer hover:text-red-600"
                }
              >
                Terms and Conditions
              </NavLink>
            </span>
            <span>|</span>
            <span>
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#f00000]"
                    : "cursor-pointer hover:text-red-600"
                }
              >
                Privacy Policy
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
