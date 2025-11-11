import React, { useState } from "react";

const Step6LensThicknessSelection = ({ goBack, onSelectThickness }) => {
  const [selectedThickness, setSelectedThickness] = useState(null);

  const thicknessOptions = [
    {
      name: "Standard lenses",
      description:
        "Slim, plastic lens (index 1.50) for low prescriptions and best for occasional wearers.",
      details: [
        "Prescriptions between +2.5 and -2.5",
        "Recommended for low prescriptions",
      ],
      price: "Included",
    },
    {
      name: "Polycarbonate lenses",
      description:
        "Thin, durable and lightweight polycarbonate lens (index 1.59), best for everyday wearers.",
      details: [
        "Prescriptions between +4 and -4",
        "Recommended for low to medium prescriptions",
        "Anti-reflective",
        "Impact resistant",
      ],
      oldPrice: "$50.00",
      price: "$25.00",
      discount: "50% OFF",
    },
    {
      name: "Thin lenses",
      description:
        "A thinner and lighter lens (index 1.60) that is best for medium prescriptions.",
      details: [
        "Prescriptions between +4.5 and -4.5",
        "Recommended for medium prescriptions",
        "Anti-reflective",
        "Impact resistant",
      ],
      oldPrice: "$80.00",
      price: "$40.00",
      discount: "50% OFF",
    },
  ];

  const handleSelect = (option) => {
    setSelectedThickness(option.name);
    onSelectThickness(option); // pass whole object, not just name
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Choose your lens thickness
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        When choosing your lens thickness, remember that a thinner lens will be
        lighter and look best with thin-edged frames.
      </p>

      <div className="space-y-4">
        {thicknessOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => handleSelect(option)}
            className={`hover:cursor-pointer w-full text-left border rounded-lg p-4 transition-all ${selectedThickness === option.name
              ? "border-blue-500 bg-gray-100"
              : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {option.description}
                </p>
                <ul className="text-xs text-gray-500 list-disc ml-4 mt-2">
                  {option.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                {option.oldPrice && (
                  <span className="line-through text-gray-400 text-sm mr-2">
                    {option.oldPrice}
                  </span>
                )}
                <span className="text-blue-600 font-semibold">
                  {option.price}
                </span>
                {option.discount && (
                  <div className="text-[#f00000] text-xs">{option.discount}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goBack}
          className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>
        {selectedThickness && (
          <button
            onClick={() => onSelectThickness(selectedThickness)}
            className="hover:cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Step6LensThicknessSelection;
