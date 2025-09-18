import React from "react";
import { MapPin, Clock, Eye, Shield, Heart, Sparkles, Cpu } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EyeExamStep1() {
    const navigate = useNavigate();

    const handleClick = () => {
        Swal.fire({
            title: "<h2 class='text-2xl font-bold'>Book an eye exam at <span style='color:#dc2626;'>Atal Opticals</span></h2>",
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
        // ✅ Use React Router navigation instead of window
        navigate("/appointmentType");
      }
    })
    };

    return (
        <div className=" text-black min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center text-5xl font-bold text-white">
                Atal Opticals
                <hr className="border-white w-90 mt-3 mx-auto" />
            </header>

            {/* Store Info */}
            <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 text-center">
                <div>
                    <Eye className="w-10 h-10 mx-auto mb-2 text-red-500" />
                    <h2 className="font-bold">Atal Opticals - Queen St</h2>
                    <p>Best eyewear & eye care in Toronto</p>
                </div>
                <div>
                    <Clock className="w-10 h-10 mx-auto mb-2 text-red-500" />
                    <h2 className="font-bold">Store Hours</h2>
                    <p>Mon - Sat: 10 AM - 7 PM</p>
                    <p>Sun: Closed</p>
                </div>
                <div>
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-red-500" />
                    <h2 className="font-bold">Directions</h2>
                    <p>123 Queen St, Toronto</p>
                </div>
            </section>
            <div className="grid grid-cols-2 bg-red-600">
                {/* Store Image */}
                <section className="pl-50 p-10">
                    <img
                        src="https://t4.ftcdn.net/jpg/02/44/14/05/360_F_244140583_MQ27ktdnXHxoWcDCRyX7YjZF49NsuJ86.jpg"
                        alt="Atal Opticals Store"
                        className="rounded-2xl shadow-lg w-full"
                    />
                </section>

                {/* Services */}
                <section className="py-10 pl-20">
                    <h2 className="text-2xl font-bold mb-6">Store Services</h2>
                    <ul className="space-y-3 text-white">
                        <li>Eye Exams with Licensed Optometrists</li>
                        <li>Contact Lens Fittings</li>
                        <li>Prescription Glasses & Sunglasses</li>
                        <li>Kids Glasses & Safety Eyewear</li>
                        <li>Fashion-forward Eyewear Collections</li>
                        <li>Comprehensive Eye Exam for all ages</li>
                        <li>Glasses PD, and optical measurment</li>
                    </ul>
                    <button
                        onClick={handleClick}
                        className="w-50 rounded-md p-2 bg-white mt-5 text-red-500 hover:bg-black">Book Eye Exam
                    </button>
                </section>
            </div>

            {/* Reasons */}
            <section className="max-w-6xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-8">Top Reasons to Get Your Eyes Checked</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div>
                        <Shield className="w-10 h-10 mx-auto text-red-500 mb-2" />
                        <p>Vision Protection</p>
                    </div>
                    <div>
                        <Heart className="w-10 h-10 mx-auto text-red-500 mb-2" />
                        <p>General Health</p>
                    </div>
                    <div>
                        <Sparkles className="w-10 h-10 mx-auto text-red-500 mb-2" />
                        <p>Everyday Comfort</p>
                    </div>
                    <div>
                        <Cpu className="w-10 h-10 mx-auto text-red-500 mb-2" />
                        <p>Leading Tech</p>
                    </div>
                </div>
            </section>

            {/* Exclusive Offer */}
            <section className="bg-black py-10 text-center border-t border-red-600">
                <h2 className="text-2xl font-bold mb-4 text-red-500">In-store Exclusive</h2>
                <p className="text-lg text-white">$20 OFF on your first pair of glasses at Atal Opticals Queen St</p>
            </section>

            {/* Optometrists */}
            <section className="max-w-6xl mx-auto p-6 mb-7">
                <h2 className="text-2xl font-bold text-center mb-8">Meet Our Optometrists</h2>
                <div className="grid md:grid-cols-2 gap-6 text-center">
                    <div className="rounded-2xl p-6 shadow-lg hover:shadow-red-400 border border-red-200">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Dr. Yuen"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="font-bold">Dr. Melissa Yuen</h3>
                        <p>With Atal Opticals since 2015</p>
                    </div>
                    <div className="rounded-2xl p-6 shadow-lg hover:shadow-red-400 border border-red-200">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="Dr. Hughes"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="font-bold">Dr. Ekow Hughes</h3>
                        <p>Specialist in Vision & Eye Health</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
