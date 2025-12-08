export default function ShippingPolicy() {
  

  return (
    <main className="min-h-screen bg-[#f00000]/5 flex items-center justify-center p-6">
      <article className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="bg-[#f00000] px-6 py-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">SHIPPING POLICY</h1>
        </header>

        <section className="p-6 sm:p-8 text-gray-800 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 1. Shipping Carriers</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical ships orders using trusted national and international courier partners: UPS, DHL, FedEx, and Canada Post. Carrier selection depends on destination, service level, package size, and delivery urgency.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 2. Order Processing Time</h2>
            <p className="mt-2 text-sm sm:text-base">Standard processing time (production/packing, not transit):</p>
            <ul className="mt-2 list-inside list-disc text-sm sm:text-base space-y-1">
              <li>Non-prescription products: <strong>1–3 business days</strong></li>
              <li>Prescription / custom products: <strong>3–7 business days</strong></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 3. Custom & Prescription Product Shipping</h2>
            <p className="mt-2 text-sm sm:text-base">Prescription glasses and custom lenses are made-to-order — production begins after payment confirmation. Shipping timelines may vary due to laboratory processing.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 4. Shipping Methods & Delivery Times</h2>
            <p className="mt-2 text-sm sm:text-base">Estimated delivery timelines (not guaranteed):</p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Ontario / Canada</p>
                <p>Standard Shipping: 3–7 business days</p>
                <p>Express Shipping: 1–3 business days</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">International</p>
                <p>Delivery timelines vary by destination and carrier.</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-600">Delays may occur due to weather, customs, or courier issues.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 5. Shipping Fees</h2>
            <p className="mt-2 text-sm sm:text-base">Shipping charges are calculated at checkout based on destination, package size/weight, and courier service selected. Shipping fees are non-refundable.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 6. Risk of Loss & Responsibility</h2>
            <p className="mt-2 text-sm sm:text-base">Responsibility transfers to the customer once the order is shipped or handed over to the courier. Atal Optical is not liable for delayed deliveries, lost packages by carrier, or damage caused by couriers.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 7. Incorrect or Incomplete Addresses</h2>
            <p className="mt-2 text-sm sm:text-base">Customers are responsible for providing accurate shipping details. Additional shipping costs due to incorrect addresses are the customer’s responsibility.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 8. Tracking & Delivery Confirmation</h2>
            <p className="mt-2 text-sm sm:text-base">A tracking number will be sent via email once shipped. Customers must monitor courier websites directly for the latest status.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 9. Customs, Duties & Taxes</h2>
            <p className="mt-2 text-sm sm:text-base">For international shipments, customers are responsible for import duties, customs taxes, and brokerage fees. These are not included in product or shipping prices.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 10. Shipping Damage Claims</h2>
            <p className="mt-2 text-sm sm:text-base">If a package arrives damaged, please take photos immediately, report within 24 hours of delivery, and keep all original packaging. Claims outside this time frame may not be accepted.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 11. No Shipping to Certain Locations</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical may restrict shipping to PO Boxes and remote or high-risk areas for courier deliveries.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 12. Legal Compliance</h2>
            <p className="mt-2 text-sm sm:text-base">This policy follows Ontario business standards, Canadian commercial shipping regulations, and courier company shipping terms.</p>
          </div>
        </section>

      </article>
    </main>
  );
}
