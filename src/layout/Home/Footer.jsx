import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="bg-red-600 text-center py-10 text-white">
                <h3 className="text-xl font-semibold">
                    To Schedule an Appointment Reach Us at <br />
                    Hurontario Location: 905-970-9444 | Airport Location: 905-497-2692
                </h3>
                <button className="bg-white text-black mt-4 rounded-xl hover:bg-black hover:text-white text-xl font-semibold py-4 px-6 hover:cursor-pointer transition-colors duration-300 ">
                    Book an Appointment
                </button>
            </div>
            <div className="bg-black text-white px-[5%] py-[1%] flex justify-between flex-wrap gap-y-8">
                {/* Box 1 */}
                <div className="max-w-[300px]">
                    <h1 className="text-red-600 text-2xl font-bold mb-2">Atal Opticals</h1>
                    <p className="mb-4 text-lg">
                        Atal Optical has been providing luxury eyewear for clients in Toronto and the GTA since 2005.
                        Atal Optical offers a wide selection of fashionable and practical eyewear to suit any lifestyle.
                    </p>
                    <div className="flex items-center gap-2 text-red-600">
                        <div><MdEmail className="text-3xl" /></div>
                        <div className="text-2xl">Email</div>
                    </div>
                    <div className="mt-1 text-lg">info.ataloptical@gmail.com</div>
                </div>

                {/* Box 2 - Useful Links */}
                <div>
                    <h3 className="text-red-600 text-2xl font-semibold mb-2">Useful Links</h3>
                    <ul className="space-y-1">
                        <Link to="/"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">HOME</li></Link>
                        <Link to="/about-us"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">ABOUT</li></Link>
                        <Link to="/atal-meaning"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">MEANING OF ATAL</li></Link>
                        <Link to="/services"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">SERVICES</li></Link>
                        <Link to="/privacy-policy"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">PRIVACY-POLICY</li></Link>
                        <Link to="/book-eye-exam"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">BOOK EYE EXAM</li></Link>
                        <Link to="/faq"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">FAQ</li></Link>
                        <Link to="/contact-us"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg">CONTACT US</li></Link>
                    </ul>
                </div>

                {/* Box 3 - Services */}
                <div>
                    <h3 className="text-red-600 text-2xl font-semibold mb-2">Our Services</h3>
                    <ul className="space-y-1">


                        <Link to="/our-mission"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">Our MISSION</li></Link>
                        <Link to="/our-vision"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">Our VISION</li></Link>
                        <Link to="/disclaimer"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">DISCLAIMER</li></Link>
                        <Link to="/general-info"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">GENERAL INFORMATION</li></Link>
                        <Link to="/eyeglasses-contact-policy"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">EYE GLASSES CONTACT POLICY</li></Link>
                        <Link to="/liability"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">LIMITAIONS OF LIABILITY</li></Link>
                        <Link to="/rights-enforcement-policy"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">RIGHT ENFORCEMENT POLICY</li></Link>
                        <Link to="/terms&Conditions"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">TERMS & CONDITION</li></Link>
                        <Link to="/responsibility"><li className="cursor-pointer hover:text-red-600 hover:underline text-lg hover:underline text-lg">VISION & RESPONSIBILITY</li></Link>
                    </ul>
                </div>

                {/* Box 4 - Contact */}
                <div>
                    <h3 className="text-red-600 text-2xl font-semibold mb-2">Contact Us</h3>
                    <div className="flex items-center gap-2 text-red-600">
                        <div><FaMapMarkedAlt className="text-3xl" /></div>
                        <div className="text-xl">Brompton west</div>
                    </div>
                    <p className="max-w-[200px] mt-1 ">
                        10906 Hurontario St, Unit D7 Brampton, ON L7A 3R9 905-970-9444
                    </p>
                    <div className="flex items-center gap-2 text-red-600 mt-4">
                        <div><FaMapMarkedAlt className="text-3xl" /></div>
                        <div className="text-xl">Airport Rd</div>
                    </div>
                    <p className="max-w-[200px] mt-1">
                        34 Shining Willow Crescent, Brampton, Ontario, Canada
                    </p>
                </div>
            </div>

            <div className="bg-red-600 w-full md:h-[60px] flex justify-evenly items-center text-white text-lg py-3 px-2">
                <div>
                    <p>copyright &copy; 2025 Atal Optical. All rights reserved</p>
                </div>
                <div>
                    <p>Developed By | World WebLogic</p>
                </div>
            </div>

        </>
    )
}

export default Footer