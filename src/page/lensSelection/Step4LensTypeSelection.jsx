import React, { useState } from "react";

const Step4LensTypeSelection = ({ goBack, onSelectLensType, onContinue }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const lensTypes = [
    {
      name: "Sun lenses",
      description: "Choose from different lens colours and tints.",
      price: "$19.50",
      oldPrice: "$39.00",
      discount: "50% OFF",
    },
    {
      name: "Transitions® GEN S™",
      description:
        "Adapt from clear indoors to dark outdoors, for sun, clear and blue-violet light filtering lenses all in one.",
      price: "$85.00",
      oldPrice: "$170.00",
      discount: "50% OFF",
      colors: [
        { name: "Gray", hex: "#6e6e6e" },
        { name: "Brown", hex: "#8B4513" },
        { name: "Emerald", hex: "#2ecc71" },
        { name: "Amber", hex: "#FFBF00" },
        { name: "Sapphire", hex: "#0066cc" },
        { name: "Amethyst", hex: "#9966cc" },
      ],
    },
    {
      name: "Clear lenses",
      description: "Premium lenses, perfect for everyday use.",
      price: "Included",
    },
    {
      name: "Blue-light treatment lenses",
      description:
        "Blue-violet light filtering lenses help reduce exposure indoors and outdoors.",
      price: "$22.50",
      oldPrice: "$45.00",
      discount: "50% OFF",
    },
  ];

  const handleLensSelect = (lens) => {
    setSelectedType(lens.name);
    setSelectedColor(null);

    if (lens.name !== "Transitions® GEN S™") {
      // Pass full lens object
      onSelectLensType(lens);
      onContinue();
    }
  };

  const handleColorSelect = (lens, color) => {
    setSelectedColor(color.name);
    setSelectedType("Transitions® GEN S™");

    // Pass full lens object with color attached
    onSelectLensType({
      ...lens,
      name: `${lens.name} - ${color.name}`,
      color: color,
    });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Choose your lens type
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Lenses and protective treatments to suit your lifestyle.
      </p>

      <div className="space-y-4">
        {lensTypes.map((lens) => (
          <div
            key={lens.name}
            className={`hover:cursor-pointer border rounded-lg p-4 transition-all ${selectedType === lens.name
                ? "border-blue-500 bg-gray-100"
                : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            {/* Lens Type Button */}
            <button
              onClick={() => handleLensSelect(lens)}
              className="w-full text-left hover:cursor-pointer"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {lens.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {lens.description}
                  </p>
                </div>
                <div className="text-right">
                  {lens.oldPrice && (
                    <span className="line-through text-gray-400 text-sm mr-2">
                      {lens.oldPrice}
                    </span>
                  )}
                  <span className="text-blue-600 font-semibold">
                    {lens.price}
                  </span>
                  {lens.discount && (
                    <div className="text-[#f00000] text-xs">{lens.discount}</div>
                  )}
                </div>
              </div>
            </button>

            {/* Always show color swatches for Transitions® GEN S™ */}
            {lens.colors && lens.name === "Transitions® GEN S™" && (
              <div className="mt-4 flex flex-wrap gap-3">
                {lens.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(lens, color)}
                    className={`hover:cursor-pointer w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color.name
                        ? "border-blue-600 scale-110"
                        : "border-gray-300 hover:scale-105"
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Continue button (only after a color is tapped) */}
            {lens.name === "Transitions® GEN S™" && selectedColor && (
              <button
                onClick={onContinue}
                className="hover:cursor-pointer mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Continue
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={goBack}
        className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 mt-3"
      >
        Back
      </button>
    </>
  );
};

export default Step4LensTypeSelection;
