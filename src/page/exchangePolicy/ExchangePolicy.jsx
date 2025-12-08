export default function ExchangePolicy() {
  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <section className="w-full max-w-4xl bg-white shadow-md rounded-2xl overflow-hidden">
        <header className="bg-[#f00000] text-white p-6 flex justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Exchange Policy</h1>
        </header>

        <article className="p-6 sm:p-8 text-gray-800">
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> Prescription Glasses — No Exchange / No Refund</h2>
            <ul className="mt-2 list-disc list-inside text-sm sm:text-base space-y-1">
              <li>All prescription glasses are custom-made medical optical products.</li>
              <li>These items are final sale and not eligible for exchange or refund under any circumstances.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> Frames — No Exchange / No Refund</h2>
            <p className="mt-2 text-sm sm:text-base">All frames, once sold and adjusted, are final sale and are not eligible for exchange or refund.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> Sunglasses — Exchange Only</h2>
            <p className="mt-2 text-sm sm:text-base">Only sunglasses (non-prescription) are eligible for exchange.</p>
            <ul className="mt-2 ml-5 list-disc list-inside text-sm sm:text-base space-y-1">
              <li>Exchange requests must be made within <strong>48 hours (1–2 days)</strong> of purchase or delivery.</li>
              <li>Items must be:</li>
            </ul>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-red-50">
                <span className="text-[#f00000] font-semibold"></span>
                <span className="text-sm">Unused</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-red-50">
                <span className="text-[#f00000] font-semibold"></span>
                <span className="text-sm">In original packaging</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-red-50">
                <span className="text-[#f00000] font-semibold"></span>
                <span className="text-sm">With original receipt</span>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> No Refunds Policy</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical does not offer refunds for any products. Only exchanges are permitted for eligible sunglasses.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> Final Inspection Condition</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical reserves the right to refuse exchange if products show signs of wear, scratches, damage, or tampering.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f00000] flex items-center"> Legal Compliance</h2>
            <p className="mt-2 text-sm sm:text-base">This policy follows Ontario Consumer Protection Act guidelines for medical and non-medical optical products.</p>
          </section>
        </article>

    
      </section>
    </main>
  );
}
