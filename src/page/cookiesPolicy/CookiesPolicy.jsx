export default function CookiesPolicy() {


  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <article className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="bg-[#f00000] px-6 py-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">COOKIES POLICY</h1>
        </header>

        <section className="p-6 sm:p-8 text-gray-800 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 1. What Are Cookies?</h2>
            <p className="mt-2 text-sm sm:text-base">Cookies are small text files stored on your device when you visit a website. They help us improve your browsing experience and website functionality.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 2. Types of Cookies We Use</h2>
            <ul className="mt-2 text-sm sm:text-base list-inside list-disc space-y-2">
              <li><strong>Essential Cookies</strong> — Required for website security, login sessions, and shopping cart functionality.</li>
              <li><strong>Performance Cookies</strong> — Used to analyze website traffic and improve website speed and performance.</li>
              <li><strong>Functional Cookies</strong> — Used to remember user preferences, language and location settings.</li>
              <li><strong>Marketing Cookies</strong> — Used to display relevant promotions and track engagement with marketing content.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 3. Purpose of Cookies</h2>
            <p className="mt-2 text-sm sm:text-base">We use cookies to:</p>
            <ul className="mt-2 text-sm sm:text-base list-disc list-inside space-y-1">
              <li>Improve website functionality</li>
              <li>Enhance user experience</li>
              <li>Monitor website performance</li>
              <li>Support marketing activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 4. Managing Cookies</h2>
            <p className="mt-2 text-sm sm:text-base">You have full control over cookies. You can enable or disable cookies through your browser settings and delete stored cookies at any time. Please note disabling cookies may affect some website functions.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 5. Third-Party Cookies</h2>
            <p className="mt-2 text-sm sm:text-base">We may allow trusted third-party services to place cookies, including analytics tools, advertising partners, and security monitoring services. All partners are required to follow strict privacy standards.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 6. Updates to This Policy</h2>
            <p className="mt-2 text-sm sm:text-base">Atal Optical reserves the right to update this Cookies Policy at any time. Updates will be posted directly on the website.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 7. Legal Compliance</h2>
            <p className="mt-2 text-sm sm:text-base">This Cookies Policy complies with Canadian PIPEDA regulations, Ontario privacy guidelines, and digital privacy best practices.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#f00000]"> 8. Contact Us</h2>
            <p className="mt-2 text-sm sm:text-base">For any cookie-related inquiries, contact us:</p>

             <p className="text-gray-600 mt-2">
               <strong> Email:</strong>{" "}
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
               <strong> Address:</strong> Corporate Office: 34 Shining Willow Crescent, Brampton,
                ON L6P 2A2, Canada
              </p>
          </div>
        </section>


      </article>
    </main>
  );
}
