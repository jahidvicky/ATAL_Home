import { motion } from "framer-motion";

const company = {
  name: "magniteBarbeque.pvt.ltd",
  tagline: "Reliable Protection for Your Vision Investments",
};

const policies = [
  {
    name: "Vision Care Basic",
    description:
      "Covers accidental damage to lenses or sunglasses up to $2,000 and includes free repair within the warranty period.",
    price: 499,
    duration: 365,
  },
  {
    name: "Lens Protection Plus",
    description:
      "Protects your prescription lenses from scratches, breakage, and coating wear with one free replacement per year.",
    price: 899,
    duration: 365,
  },
  {
    name: "Sunglass Shield Premium",
    description:
      "Full protection for designer sunglasses against accidental damage, lens cracks, or frame bending.",
    price: 265,
    duration: 365,
  },
  {
    name: "Complete Eye Gear Cover",
    description:
      "A comprehensive plan covering damage, theft, or loss of any eyewear purchased, plus 20% off on replacements.",
    price: 185,
    duration: 300,
  },
];

export default function InsurancePolicies() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#f00000] text-white text-center py-20 px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Insurance Plans
        </h1>
        <p className="text-lg opacity-90">
          Offered by <strong>{company.name}</strong>
        </p>
        <p className="mt-3 max-w-3xl mx-auto opacity-90">
          {company.tagline}
        </p>
      </motion.section>

      {/* ================= POLICIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-[#f00000] mb-12"
        >
          Choose the Right Policy for You
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div>
                <h3 className="text-xl font-bold text-[#f00000] mb-3">
                  {policy.name}
                </h3>

                <p className="text-gray-700 text-sm mb-5 leading-relaxed">
                  {policy.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Coverage Duration:</span>{" "}
                    {policy.duration} days
                  </p>
                </div>
              </div>

              {/* PRICE BUTTON (INFO ONLY) */}
              <button
                disabled
                className="mt-6 bg-[#f00000] text-white py-3 rounded-xl font-semibold cursor-default"
              >
                <span className="block text-lg">${policy.price}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHY INSURANCE ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-20 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#f00000] mb-6">
            Why Insure Your Eyewear?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Eyewear is an essential investment for your daily life.
            Our insurance plans ensure peace of mind by protecting
            against accidental damage, loss, and unexpected repair costs.
            Stay protected and save more in the long run.
          </p>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#f00000] text-white py-16 text-center px-6"
      >
        <h3 className="text-3xl font-bold mb-4">
          Secure Your Vision Today
        </h3>
        <p className="max-w-2xl mx-auto mb-6 opacity-90 text-lg">
          These insurance plans are available at our store during
          eyewear purchase. Visit us to know more.
        </p>
        <button className="bg-white text-[#f00000] px-10 py-3 rounded-full font-bold">
          Visit Our Store
        </button>
      </motion.section>

    </div>
  );
}
