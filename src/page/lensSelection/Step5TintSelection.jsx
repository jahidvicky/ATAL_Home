import React, { useState } from "react";

const Step6LensThicknessSelection = ({ goBack, onApply }) => {
  const [selectedTint, setSelectedTint] = useState("Grey");

  const tints = [
    { name: "Grey", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Grey Polarised", type: "Solid Tint", price: "$57.50", oldPrice: "$115.00" },
    { name: "Brown", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Brown Polarised", type: "Solid Tint", price: "$57.50", oldPrice: "$115.00" },
    { name: "Green Polarised", type: "Solid Tint", price: "$57.50", oldPrice: "$115.00" },
    { name: "Blue", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Green", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Purple", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Green Grey", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Pink", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Yellow", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Orange", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Red", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Sapphire", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Sapphire Polarised", type: "Mirror", price: "$75.00", oldPrice: "$150.00" },
    { name: "Silver", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Brown Gold", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Green Grey", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Grey Red", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Silver Polarised", type: "Mirror", price: "$75.00", oldPrice: "$150.00" },
    { name: "Green Grey Polarised", type: "Mirror", price: "$75.00", oldPrice: "$150.00" },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Authentic Lens Experience</h2>
      <p className="text-sm text-gray-500 mb-4">Choose your lens tint and finish.</p>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {tints.map((tint) => (
          <button
            key={tint.name}
            onClick={() => setSelectedTint(tint.name)}
            className={`border rounded-lg p-4 flex flex-col items-center text-center transition-all ${
              selectedTint === tint.name ? "border-blue-500 bg-gray-100" : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {/* Tint preview circle */}
            <div className="w-14 h-14 rounded-full bg-gray-300 mb-3"></div>
            <span className="font-medium text-gray-700">{tint.name}</span>
            <span className="text-xs text-gray-500">{tint.type}</span>
            <div className="mt-1 text-sm">
              {tint.oldPrice && <span className="line-through text-gray-400 mr-1">{tint.oldPrice}</span>}
              <span className="text-blue-600 font-semibold">{tint.price}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="mt-8 flex justify-between">
        <button onClick={goBack} className="text-blue-500 underline">
          ← Back
        </button>
        <button
          onClick={() => onApply(selectedTint)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default Step6LensThicknessSelection;
