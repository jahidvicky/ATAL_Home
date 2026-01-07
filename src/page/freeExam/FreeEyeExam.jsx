import { motion } from "framer-motion";
import DiwaliImg from "../../assets/freeExam/diwali.jpg";
import VaisakhiImg from "../../assets/freeExam/vaisakhi.png";
import ChristmasImg from "../../assets/freeExam/Christmas.png";
import { Link } from "react-router-dom";



const festivals = [
  {
    name: "Diwali",
    desc: "Celebrate Diwali with a brighter vision. Get a free comprehensive eye checkup and protect your eyes from digital strain and festive lights.",
    img: DiwaliImg,
  },
  {
    name: "Vaisakhi",
    desc: "This Vaishakhi, take a step towards healthy eyes. Our experts provide free vision testing and consultation for all age groups.",
    img: VaisakhiImg,
  },
  {
    name: "Christmas",
    desc: "Spread joy this Christmas with clear vision. Enjoy a free eye checkup and professional guidance for better eye health.",
    img: ChristmasImg,
  },
];

export default function FreeEyeExam() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-6 bg-[#f00000] text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Free Eye Checkup Camp
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          This festive season, take care of your most precious sense.
          We are offering <strong>FREE eye checkups</strong> during
          Diwali, Vaisakhi, and Christmas to help you see the world clearly.
        </p>
      </motion.section>

      {/* ================= FESTIVAL SECTIONS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {festivals.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* IMAGE */}
            <div className="md:w-1/2">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-2xl shadow-lg w-full h-[320px] object-cover object-top"
              />
            </div>

            {/* CONTENT */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#f00000] mb-4">
                {item.name} Special Free Eye Checkup
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {item.desc}
              </p>

              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#f00000] text-white px-8 py-3 rounded-full font-semibold shadow-md"
                >
                  Visit Our Store
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= WHY IT MATTERS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-20 text-center"
      >
        <h2 className="text-4xl font-bold text-[#f00000] mb-6">
          Why a Free Eye Checkup Matters
        </h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg">
          Many eye problems develop silently. Regular eye checkups help
          detect vision issues early, reduce eye strain, and protect your
          long-term eye health—especially in today’s screen-driven lifestyle.
        </p>
      </motion.section>

      {/* ================= WHAT’S INCLUDED ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#f00000] mb-12">
            What’s Included in Your Free Eye Checkup
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              "Vision Testing",
              "Eye Power Check",
              "Eye Pressure Screening",
              "Doctor Consultation",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 border border-red-600 rounded-2xl shadow-md"
              >
                <div className="text-4xl mb-4 text-[#f00000]">👁️</div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {item}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= WHO SHOULD ATTEND ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-[#f00000] mb-10 text-center">
          Who Should Attend This Camp?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-black text-lg">
          {[
            "People working long hours on digital screens",
            "Senior citizens facing vision issues",
            "Children & students for early eye care",
            "Existing spectacle or lens users",
            "Drivers needing sharp night vision",
            "Anyone with eye strain or headaches",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 border border-red-600 rounded-xl bg-white shadow-sm"
            >
              {text}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ================= TRUST SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#fff5f5] py-20 px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-[#f00000] mb-6">
          Trusted Eye Care Professionals
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Our free eye checkups are conducted by certified optometrists
          using advanced diagnostic equipment to ensure accurate results
          and personalized eye care advice.
        </p>
      </motion.section>

      {/* ================= FINAL CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#f00000] text-white py-16 text-center px-6"
      >
        <h3 className="text-3xl font-bold mb-4">
          Limited Time Festive Offer
        </h3>
        <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
          Free eye checkup includes vision testing, eye pressure screening,
          and expert consultation. Don’t miss this festive opportunity.
        </p>

        <Link to="/">
          <button className="bg-white text-[#f00000] px-10 py-3 rounded-full font-bold">
            Visit Our Store
          </button>
        </Link>
      </motion.section>

    </div>
  );
}
