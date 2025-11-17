import React, { useState } from "react";

const Step5TintSelection = ({ selectedTint, onSelect, onApply, goBack }) => {
  const tints = [
    { name: "Grey", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Brown", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    { name: "Green", type: "Solid Tint", price: "$19.50", oldPrice: "$39.00" },
    {
      name: "Grey Polarised",
      type: "Solid Tint",
      price: "$57.50",
      oldPrice: "$115.00",
    },
    {
      name: "Brown Polarised",
      type: "Solid Tint",
      price: "$57.50",
      oldPrice: "$115.00",
    },
    {
      name: "Green Polarised",
      type: "Solid Tint",
      price: "$57.50",
      oldPrice: "$115.00",
    },
    { name: "Sapphire", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Silver", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
    { name: "Gold", type: "Mirror", price: "$37.00", oldPrice: "$74.00" },
  ];

  const [currentTint, setCurrentTint] = useState(selectedTint || null);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Authentic Lens Experience
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Choose your lens tint and finish.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tints.map((tint) => (
          <button
            key={tint.name}
            onClick={() => setCurrentTint(tint)}
            className={`hover:cursor-pointer border rounded-lg p-4 flex flex-col items-center text-center transition-all ${
              currentTint?.name === tint.name
                ? "border-blue-500 bg-gray-100"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-gray-300 mb-2"></div>
            <span className="font-medium">{tint.name}</span>
            <span className="text-xs text-gray-500">{tint.type}</span>
            <div className="mt-1 text-sm">
              <span className="line-through text-gray-400 mr-1">
                {tint.oldPrice}
              </span>
              <span className="text-blue-600 font-semibold">{tint.price}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={goBack}
          className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 mt-3"
        >
          Back
        </button>
        <button
          disabled={!currentTint}
          onClick={() => {
            onSelect(currentTint); //  Pass full object instead of string
            onApply();
          }}
          className="hover:cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Step5TintSelection;
