import { Link } from "react-router-dom";

const OpticalEducation = () => {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-[#f00000] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Optical Education
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Learn the basics of eye care, lenses, and eyewear to make informed
            decisions for your vision health.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-[#f00000]">
            Why Optical Education Matters
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl">
            Good vision is essential for daily life, yet many people are unaware
            of how their eyes work or how to choose the right eyewear. Optical
            education helps you understand eye conditions, lens options, and
            proper eye care so you can protect your vision for the long term.
          </p>
        </div>
      </section>

      {/* Eye Conditions */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-[#f00000]">
            Common Vision Problems
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Myopia (Near-sightedness)",
                desc: "Difficulty seeing distant objects clearly. Commonly corrected with concave lenses.",
              },
              {
                title: "Hyperopia (Far-sightedness)",
                desc: "Difficulty focusing on nearby objects. Corrected using convex lenses.",
              },
              {
                title: "Astigmatism",
                desc: "Blurred or distorted vision due to an irregularly shaped cornea or lens.",
              },
              {
                title: "Presbyopia",
                desc: "Age-related condition causing difficulty in near vision, usually after 40.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lens Types */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-[#f00000]">
            Types of Lenses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Single Vision Lenses",
                desc: "Designed to correct one field of vision – near or distance.",
              },
              {
                title: "Bifocal Lenses",
                desc: "Contain two optical powers for near and distance vision.",
              },
              {
                title: "Progressive Lenses",
                desc: "Provide a smooth transition between near, intermediate, and distance vision.",
              },
              {
                title: "Blue Light Lenses",
                desc: "Reduce exposure to blue light from digital screens, helping reduce eye strain.",
              },
              {
                title: "Photochromic Lenses",
                desc: "Automatically darken in sunlight and clear indoors.",
              },
              {
                title: "Anti-Reflective Coating",
                desc: "Minimizes glare and improves visual clarity, especially at night.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eye Care Tips */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-[#f00000]">
            Eye Care Tips
          </h2>

          <ul className="grid md:grid-cols-2 gap-6 text-gray-700">
            {[
              "Get your eyes examined regularly by a certified optometrist.",
              "Follow the 20-20-20 rule when using digital screens.",
              "Wear UV-protected sunglasses outdoors.",
              "Maintain a balanced diet rich in vitamins A, C, and E.",
              "Avoid rubbing your eyes frequently.",
              "Ensure proper lighting while reading or working.",
            ].map((tip, index) => (
              <li
                key={index}
                className="bg-white p-5 rounded-lg border flex items-start gap-3"
              >
                <span className="text-[#f00000] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Need Help Choosing the Right Eyewear?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you select the perfect lenses and frames
            based on your lifestyle and vision needs.
          </p>
          <Link to="/eye-schedule-test">
            <button className="bg-[#f00000] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Book an Eye Test
          </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default OpticalEducation;
