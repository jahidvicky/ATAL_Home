import React from "react";
import { MapPin, Clock, Eye, Shield, Heart, Sparkles, Cpu } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image from "../../assets/Eye-Exam-images/Optometrists.webp"
import image1 from "../../assets/Eye-Exam-images/Optometrists-1.jpg"
import Optical_Store from "../../assets/Eye-Exam-images/Optical-Store.jpg"

export default function EyeExamStep1() {
    const navigate = useNavigate();

    const handleClick = () => {
        Swal.fire({
            title: "<h2 class='text-2xl font-bold'>Book an eye exam at <span style='color:#dc2626;'>Atal Optical</span></h2>",
            html: `
        <ol style="text-align:left; line-height:1.6; margin-top:10px;">
          <li>1. Click below and we'll take you over to our optometry partner's website.</li>
          <li>2. Select an exam type and an open slot with one of our local optometrists.</li>
          <li>3. Fill in your details and we'll send a confirmation email. We look forward to seeing you!</li>
        </ol>
        <br />
        <p><strong>Need to cancel or reschedule?</strong></p>
        <p>Click the link in the original confirmation email you received to edit your booking.</p>
      `,
            confirmButtonText: "Book eye exam",
            confirmButtonColor: "#da1515ff",
            background: "#fff",
            width: "600px",
            showCloseButton: true,
            focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/appointmentType");
            }
        })
    };

    return (
        <div className=" text-black min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center text-5xl font-bold text-white">
                Atal Optical
                <hr className="border-white w-90 mt-3 mx-auto" />
            </header>

            {/* Store Info */}
            <section className="max-w-6xl mx-auto p-18 grid md:grid-cols-3 gap-6 text-center">
                <div>
                    <Eye className="w-10 h-10 mx-auto mb-2 text-[#f00000]" />
                    <h2 className="font-bold">Atal Optical - Queen St</h2>
                    <p>Best eyewear & eye care in Toronto</p>
                </div>
                <div>
                    <Clock className="w-10 h-10 mx-auto mb-2 text-[#f00000]" />
                    <h2 className="font-bold">Store Hours</h2>
                    <p>Mon - Sat: 10 AM - 7 PM</p>
                    <p>Sun: Closed</p>
                </div>
                <div>
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-[#f00000]" />
                    <h2 className="font-bold">Directions</h2>
                    <p>Corporate Office : 34 Shining Willow Crescent, Brampton, ON L6P 2A2, Canada</p>
                </div>
            </section>

            <div className="grid grid-cols-2 bg-[#f00000] gap-20 items-center">
                {/* Store Image with zoom-in effect */}
                <motion.section
                    className="mt-11 flex justify-end pr-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible
                >
                    <img
                        src={Optical_Store}
                        alt="Atal Optical Store"
                        className="rounded-2xl shadow-lg w-[90%]"
                    />
                </motion.section>

                {/* Services with bounce-up effect */}
                <motion.section
                    className="py-10 pl-10 text-white"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Store Services</h2>
                    <ul className="space-y-3 text-lg">
                        <li>Eye Exams with Licensed Optometrists</li>
                        <li>Contact Lens Fittings</li>
                        <li>Prescription Glasses & Sunglasses</li>
                        <li>Kids Glasses & Safety Eyewear</li>
                        <li>Fashion-forward Eyewear Collections</li>
                        <li>Comprehensive Eye Exam for all ages</li>
                        <li>Glasses PD, and optical measurement</li>
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className="rounded-md px-6 py-2 bg-black mt-5 text-white hover:bg-white hover:text-red-600 text-[20px] hover:cursor-pointer"
                    >
                        Book Eye Exam
                    </motion.button>
                </motion.section>
            </div>
            {/* Reasons */}
            <section className="max-w-6xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-8">Top Reasons to Get Your Eyes Checked</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div>
                        <Shield className="w-10 h-10 mx-auto text-[#f00000] mb-2" />
                        <p>Vision Protection</p>
                    </div>
                    <div>
                        <Heart className="w-10 h-10 mx-auto text-[#f00000] mb-2" />
                        <p>General Health</p>
                    </div>
                    <div>
                        <Sparkles className="w-10 h-10 mx-auto text-[#f00000] mb-2" />
                        <p>Everyday Comfort</p>
                    </div>
                    <div>
                        <Cpu className="w-10 h-10 mx-auto text-[#f00000] mb-2" />
                        <p>Leading Tech</p>
                    </div>
                </div>
            </section>

            {/* Exclusive Offer */}
            <section className="bg-black py-10 text-center border-t border-red-600">
                <h2 className="text-2xl font-bold mb-4 text-[#f00000]">In-store Exclusive</h2>
                <p className="text-lg text-white">$20 OFF on your first pair of glasses at Atal Optical Queen St</p>
            </section>

            {/* Optometrists */}
            <section className="max-w-6xl mx-auto p-6 mb-7">
                <h2 className="text-2xl font-bold text-center mb-8">Meet Our Optometrists</h2>
                <div className="grid md:grid-cols-2 gap-6 text-center">
                    <div className="rounded-2xl p-6 shadow-lg hover:shadow-red-400 border border-red-200">
                        <img
                            src={image1}
                            alt="Dr. Yuen"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="font-bold">Dr. Melissa Yuen</h3>
                        <p>With Atal Optical</p>
                    </div>
                    <div className="rounded-2xl p-6 shadow-lg hover:shadow-red-400 border border-red-200">
                        <img
                            src={image}
                            alt="Dr. Hughes"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="font-bold">Dr. Ekow Hughes</h3>
                        <p>Specialist in Vision & Eye Health</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
