import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function InsurancePolicies() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* ================= HERO ================= */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center py-24 px-6 bg-gradient-to-r from-red-600 to-red-500 text-white"
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Insurance Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Smart protection for your eyewear. Simple, fast, and reliable coverage
          designed for everyday life.
        </p>
      </motion.section>

      {/* ================= WHAT IS INSURANCE ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-5">
            What is an Insurance Policy?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            An insurance policy protects your eyewear from unexpected situations
            like accidental damage, loss, or repairs. It ensures you don’t have
            to bear the full cost again, giving you financial safety and peace
            of mind.
          </p>
        </motion.div>
      </section>

      {/* ================= HOW TO PURCHASE ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-12">
          How to Purchase
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            "Select your eyewear",
            "Choose size & lenses",
            "Go to insurance section",
            "Pick a policy",
            "Checkout securely",
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-12">
            Benefits of Insurance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Damage Protection",
                desc: "Covers accidental breakage and damage.",
              },
              {
                title: "Loss Coverage",
                desc: "Support if your eyewear is lost.",
              },
              {
                title: "Repair Cost Saving",
                desc: "Avoid high repair expenses.",
              },
              {
                title: "Affordable Plans",
                desc: "Budget-friendly pricing options.",
              },
              {
                title: "Easy Claims",
                desc: "Quick and simple claim process.",
              },
              {
                title: "Peace of Mind",
                desc: "Stay worry-free after purchase.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-red-600 to-red-500 text-white">
        <h3 className="text-3xl font-bold mb-4">
          Protect Your Eyewear Today
        </h3>
        <p className="max-w-xl mx-auto mb-6 opacity-90">
          Add insurance while purchasing your product and enjoy worry-free usage.
        </p>

        <Link to="/">
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Explore Products
          </button>
        </Link>
      </section>
    </div>
  );
}