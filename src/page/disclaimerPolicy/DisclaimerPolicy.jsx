export default function DisclaimerPolicy() {
 
  return (
    <main className="min-h-screen bg-[#f00000]/5 flex items-center justify-center p-6">
      <article className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="bg-[#f00000] px-6 py-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">DISCLAIMER POLICY</h1>
        </header>

        <section className="p-6 sm:p-8 text-gray-800 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 1. General Information</h2>
            <p className="mt-2 text-sm sm:text-base">The content on the Atal Optical website is for informational purposes only. While we strive to provide accurate and up-to-date information, we make no guarantees regarding the completeness, accuracy, or reliability of any content, products, or services listed on the website.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 2. Medical & Optical Advice</h2>
            <ul className="mt-2 list-inside list-disc text-sm sm:text-base space-y-1">
              <li>Prescription glasses, lenses, and other optical products are customized medical devices.</li>
              <li>The information provided on this website does not replace professional eye care advice.</li>
              <li>Customers should consult a qualified eye care professional for any vision or eye health concerns.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 3. Product Information</h2>
            <p className="mt-2 text-sm sm:text-base">Product images, descriptions, and specifications are provided for reference only. Actual product appearance, colour, or dimensions may vary slightly from website images. Availability and pricing are subject to change without notice.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 4. Limitation of Liability</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical and its affiliates are not liable for any damages, losses, or injuries resulting from the use or misuse of our products, indirect or consequential damages, or errors and omissions on the website. The maximum liability is limited to the purchase price of the product in question.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 5. Third-Party Links</h2>
            <p className="mt-2 text-sm sm:text-base">The website may include links to third-party websites. We do not control or endorse the content of these sites and are not responsible for any loss or damage from using third-party websites.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 6. Website Use</h2>
            <p className="mt-2 text-sm sm:text-base">By using the Atal Optical website, users agree to use the website lawfully, not to copy or reproduce content without permission, and not to use the website for fraudulent purposes.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 7. Policy Updates</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical reserves the right to update this Disclaimer Policy at any time. Changes will be posted on the website; users are encouraged to review it regularly.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 8. Contact Information</h2>
            <p className="mt-2 text-sm sm:text-base">For questions regarding this Disclaimer Policy, contact us:</p>
             <p className="text-gray-600 mt-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:sales.ataloptical@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sales.ataloptical@gmail.com
                </a>
                <span> | </span>
                <a
                  href="mailto:info.ataloptical@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  info.ataloptical@gmail.com
                </a>
              </p>

              <p className="text-gray-600">
                <strong>Address:</strong> Corporate Office: 34 Shining Willow Crescent, Brampton,
                ON L6P 2A2, Canada
              </p>
          </div>
        </section>

      </article>
    </main>
  );
}
