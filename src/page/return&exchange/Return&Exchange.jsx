import React from "react";

export default function ReturnExchangePolicy() {
  const sections = [
    {
      title: "Custom & Prescription Products – Final Sale",
      content: (
        <>
          <p>
            All prescription eyeglasses, prescription sunglasses, custom lenses,
            and medical optical devices are custom-made and personalized.
          </p>
          <p>
            As per Ontario Consumer Protection Act – Custom Goods Exemption,
            these products are final sale.
          </p>
          <p>Orders cannot be cancelled, refunded, or changed once production has started.</p>
        </>
      ),
    },
    {
      title: "Non-Custom / Non-Prescription Products",
      content: (
        <>
          <p>
            Non-prescription frames, sunglasses, contact lens accessories,
            cleaning kits, and cases may be returned within 7 days of purchase.
          </p>
          <p>
            Products must be unused, in original packaging, in resalable
            condition, and accompanied by the original receipt.
          </p>
        </>
      ),
    },
    {
      title: "Defective or Incorrect Products",
      content: (
        <>
          <p>
            If Atal Optical makes an error or supplies a defective product,
            repair, replacement, or remake will be provided at no additional
            charge.
          </p>
          <p>
            Claims must be reported within 7 calendar days of delivery/pickup
            and customers should provide proof of defect (photos or in-store
            inspection).
          </p>
        </>
      ),
    },
    {
      title: "Legal Cooling-Off Rights (Ontario Law)",
      content: (
        <>
          <p>
            For in-store purchases, Ontario law does not provide automatic
            refund or cooling-off rights except where required by law.
          </p>
          <p>
            For online or remote sales, customers may cancel within 7 days only
            if the product has not entered production.
          </p>
        </>
      ),
    },
    {
      title: "Deposits and Special Orders",
      content: (
        <>
          <p>Deposits for special orders are non-refundable once the manufacturing process has started.</p>
          <p>Any balance must be paid before product collection or delivery.</p>
        </>
      ),
    },
    {
      title: "Sale, Clearance & Promotional Items",
      content: (
        <p>
          All discounted, clearance, promotional, and warehouse sale items are
          considered final sale and are not eligible for return, exchange, or refund.
        </p>
      ),
    },
    {
      title: "Return Approval Conditions",
      content: (
        <>
          <p>Returned items must be in original packaging with a valid receipt.</p>
          <p>
            Items must show no scratches, marks, damage, or wear and must
            include all accessories.
          </p>
          <p>Items failing inspection will be refused.</p>
        </>
      ),
    },
    {
      title: "Refunds (Where Applicable)",
      content: (
        <>
          <p>Approved refunds are issued only to the original payment method.</p>
          <p>Refund processing time: 7–10 business days.</p>
          <p>Shipping charges are non-refundable.</p>
        </>
      ),
    },
    {
      title: "Shipping, Delivery & Risk of Loss",
      content: (
        <>
          <p>
            Responsibility transfers to the customer once the order is
            collected, shipped, or delivered.
          </p>
          <p>Atal Optical is not responsible for delays caused by third-party couriers.</p>
        </>
      ),
    },
    {
      title: "Warranty Coverage",
      content: (
        <>
          <p>Manufacturer warranties apply to frames and lenses for manufacturing defects only.</p>
          <p>Warranties do NOT cover scratches, accidents, misuse, or normal wear and tear.</p>
        </>
      ),
    },
    {
      title: "Order Refusal Rights",
      content: (
        <p>
          Atal Optical reserves the right to refuse service, cancel orders,
          limit quantities, or protect against fraud or misuse.
        </p>
      ),
    },
    {
      title: "Legal Compliance Statement",
      content: (
        <>
          <p>
            This policy follows the Ontario Consumer Protection Act (CPA),
            Canadian Custom Goods Regulations, and industry standards for
            healthcare and optical devices.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12 text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide px-4">
          Return, Exchange & Consumer Policy
        </h1>
        <hr className="border border-gray-200 my-4 w-230 mx-auto" />
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="bg-white shadow-sm p-4 sm:p-6 md:p-8 rounded-xl border border-red-400"
              aria-labelledby={`section-${idx}`}
            >
              <h2
                id={`section-${idx}`}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-red-600 mb-3"
              >
                {section.title}
              </h2>

              <div className="text-gray-700 leading-relaxed text-sm sm:text-[15px] md:text-base space-y-2">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
