import React, { useState } from "react";

const Step7EnhancementsSelection = ({
  selectedEnhancement,
  onSelect,
  onContinue,
  goBack,
}) => {
  const enhancements = [
    {
      id: "anti-reflective",
      name: "Anti-reflective coating",
      description:
        "Minimises unwanted reflections and reduces irritating glare.",
      benefits: ["Reduced glare"],
      price: "Included",
    },
    {
      id: "c-shield",
      name: "C Shield",
      description:
        "A six-in-one protective coating for cleaner, clearer and stronger lenses.",
      benefits: ["Reduced glare", "Water-repellent", "Smudge-repellent"],
      price: "$25.00",
      oldPrice: "$50.00",
      discount: "50% OFF",
    },
  ];

  const [selected, setSelected] = useState(selectedEnhancement || null);

  const handleSelect = (enh) => {
    setSelected(enh);
    onSelect(enh); //  send full enhancement object
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Enhance your lens performance
      </h2>
      <p className="text-gray-600 mb-6">
        Give your lens a boost with performance-enhancing features and premium
        add-ons.
      </p>

      <div className="space-y-4">
        {enhancements.map((enh) => (
          <div
            key={enh.id}
            className={`hover:cursor-pointer border rounded-lg p-4 cursor-pointer transition ${
              selected?.id === enh.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(enh)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{enh.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{enh.description}</p>

                <ul className="mt-2 space-y-1 text-sm text-green-600">
                  {enh.benefits.map((b, idx) => (
                    <li key={idx}>✓ {b}</li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                >
                  Learn More
                </a>
              </div>

              {/* Price */}
              <div className="text-right">
                {enh.price === "Included" ? (
                  <span className="text-gray-600 font-medium">{enh.price}</span>
                ) : (
                  <div>
                    {enh.discount && (
                      <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                        {enh.discount}
                      </span>
                    )}
                    <div className="mt-1">
                      {enh.oldPrice && (
                        <span className="line-through text-gray-500 text-sm mr-1">
                          {enh.oldPrice}
                        </span>
                      )}
                      <span className="text-blue-600 font-semibold">
                        {enh.price}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={goBack}
          className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>

        <button
          onClick={onContinue}
          disabled={!selected}
          className={`hover:cursor-pointer px-6 py-2 rounded-lg text-white ${
            selected
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step7EnhancementsSelection;
