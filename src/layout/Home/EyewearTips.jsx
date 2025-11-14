import API, { IMAGE_URL } from "../../API/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EyewearTips() {

  const [eyewearTips, setEyewearTips] = useState([])

  const fetchEyewearTips = async () => {
    try {
      const response = await API.get("/getEyewearTips")
      setEyewearTips(response.data.EyewearTips)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchEyewearTips();
  }, [])

  const eyewearLinks = [
    'learn-about-frame',
    'learn-about-lens',
    'learn-about-prescription',
    'learn-about-maintenance',
  ]

  return (
    <section className="bg-black bg-gradient-to-b from-black to-red-600 text-white pb-16 px-4 sm:px-6 md:px-6 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Eyewear Insights & Tips</h2>
      <hr className="w-24 sm:w-48 md:w-[116px] mt-2 mb-4 mx-auto border-gray-300" />

      <p className="max-w-3xl mx-auto text-gray-300 mb-10 text-sm sm:text-base px-2">
        Gain valuable knowledge and practical tips to enhance your eyewear experience,
        ensuring comfort, style, and lasting performance.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:mx-20 mx-2 sm:mx-6">
        {eyewearTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white text-black p-5 sm:p-6 rounded-xl shadow-xl hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer hover:-translate-y-2 hover:bg-black hover:text-white border-2 border-red-600 hover:border-black"
          >
            <div className="flex justify-center mb-4">
              <img
                src={IMAGE_URL + tip.image}
                alt={tip.fullName}
                className="w-12 h-12 rounded-full object-cover mb-4 shadow border border-red-600"
                loading='lazy'
                decoding='async'
              />
            </div>

            <h3 className="font-semibold text-base sm:text-lg mb-2">{tip.title}</h3>

            <p className="mb-4 text-gray-500 text-sm sm:text-base">
              {tip.description}
            </p>

            <Link to={`/${eyewearLinks[index]}`}>
              <button className="mt-auto border border-red-500 text-[#f00000] px-4 py-1 rounded-full hover:bg-red-500 hover:text-white transition">
                Learn More →
              </button>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
}
