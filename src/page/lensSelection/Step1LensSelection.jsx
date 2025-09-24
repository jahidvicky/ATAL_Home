import React from "react";

const Step1LensSelection = ({ selectedLens, onSelect }) => {
  const lensOptions = [
    { name: "Single vision lenses", description: "Corrects one field of vision (near, intermediate or distance)." },
    { name: "Progressive lenses", description: "Corrects multiple fields of vision with one lens (near, intermediate and distance)." },
    { name: "Reading lenses", description: "Corrects one field of vision, to see things near, improving your focus while reading." },
    { name: "Non-prescription lenses", description: "Protective and stylish lenses, without vision correction." },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Choose your vision need</h2>
      <p className="text-sm text-gray-500 mb-4">
        Choose lenses based on your vision need. If your prescription has an ADD value, you'll need progressive lenses.
      </p>

      <div className="space-y-4">
        {lensOptions.map((lens) => (
          <button
            key={lens.name}
            className={`w-full text-left border rounded-lg p-4 hover:bg-gray-100 transition-all ${
              selectedLens === lens.name ? "border-blue-500 bg-gray-100" : "border-gray-300"
            }`}
            onClick={() => onSelect(lens.name)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">{lens.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{lens.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default Step1LensSelection;
