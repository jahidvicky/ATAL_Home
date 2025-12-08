import { motion } from "framer-motion";

export default function ReturnExchangePolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      id: 1,
      title: "Custom & Prescription Products – Final Sale",
      icon: "FiShield",
      content: [
        "All prescription eyeglasses, prescription sunglasses, custom lenses, and medical optical devices are custom-made and personalized.",
        "As per Ontario Consumer Protection Act – Custom Goods Exemption, these products are final sale.",
        "Orders cannot be cancelled, refunded, or changed once production has started.",
      ],
    },
    {
      id: 2,
      title: "Non-Custom / Non-Prescription Products",
      icon: "FiPackage",
      content: [
        "Non-prescription frames, sunglasses, contact lens accessories, cleaning kits, and cases may be returned within 7 days of purchase.",
        "Products must be unused, in original packaging, in resalable condition, and accompanied by the original receipt.",
      ],
    },
    {
      id: 3,
      title: "Defective or Incorrect Products",
      icon: "FiInfo",
      content: [
        "If Atal Optical makes an error or supplies a defective product, repair, replacement, or remake will be provided at no additional charge.",
        "Claims must be reported within 7 calendar days of delivery/pickup and customers should provide proof of defect (photos or in-store inspection).",
      ],
    },
    {
      id: 4,
      title: "Legal Cooling-Off Rights (Ontario Law)",
      icon: "FiInfo",
      content: [
        "For in-store purchases, Ontario law does not provide automatic refund or cooling-off rights except where required by law.",
        "For online or remote sales, customers may cancel within 7 days only if the product has not entered production.",
      ],
    },
    {
      id: 5,
      title: "Deposits and Special Orders",
      icon: "FiCreditCard",
      content: [
        "Deposits for special orders are non-refundable once the manufacturing process has started.",
        "Any balance must be paid before product collection or delivery.",
      ],
    },
    {
      id: 6,
      title: "Sale, Clearance & Promotional Items",
      icon: "FiPackage",
      content: [
        "All discounted, clearance, promotional, and warehouse sale items are considered final sale and are not eligible for return, exchange, or refund.",
      ],
    },
    {
      id: 7,
      title: "Return Approval Conditions",
      icon: "FiPackage",
      content: [
        "Returned items must be in original packaging and include the original receipt/proof of purchase.",
        "Items must show no scratches, marks, damage, or wear and include all accessories. Items failing inspection will be refused.",
      ],
    },
    {
      id: 8,
      title: "Refunds (Where Applicable)",
      icon: "FiCreditCard",
      content: [
        "Approved refunds are issued only to the original payment method — no cash refunds.",
        "Refund processing time: 7–10 business days. Shipping charges are non-refundable.",
      ],
    },
    {
      id: 9,
      title: "Shipping, Delivery & Risk of Loss",
      icon: "FiPackage",
      content: [
        "Responsibility transfers to the customer once the order is collected, shipped, or delivered.",
        "Atal Optical is not responsible for delays caused by third-party couriers.",
      ],
    },
    {
      id: 10,
      title: "Warranty Coverage",
      icon: "FiShield",
      content: [
        "Manufacturer warranties apply to frames and lenses and cover manufacturing defects only.",
        "Warranties do not cover accidental damage, scratches, misuse, neglect, or normal wear and tear.",
      ],
    },
    {
      id: 11,
      title: "Order Refusal Rights",
      icon: "FiShield",
      content: [
        "Atal Optical reserves the legal right to refuse service, cancel orders, limit quantities, and protect against fraud or misuse.",
      ],
    },
    {
      id: 12,
      title: "Legal Compliance Statement",
      icon: "FiInfo",
      content: [
        "This policy follows the Ontario Consumer Protection Act (CPA), Canadian Custom Goods Regulations, and industry standards for healthcare and optical devices.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <motion.main
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08 }}
        className="w-full max-w-5xl"
      >
        <motion.header variants={fadeIn} className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600">
            RETURN, EXCHANGE & CONSUMER POLICY
          </h1>
        </motion.header>

        <motion.section
          variants={fadeIn}
          className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10"
        >
        

          <div className="space-y-3 md:space-y-4">
            {sections.map((sec) => (
              <details
                key={sec.id}
                className="group bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    {/* simple decorative icon box */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold">
                      {sec.id}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{sec.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Click to expand for details</p>
                    </div>
                  </div>

                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>

                <div className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed space-y-2 pl-1">
                  {sec.content.map((line, idx) => (
                    <p key={idx} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>

         
        </motion.section>
      </motion.main>
    </div>
  );
}
