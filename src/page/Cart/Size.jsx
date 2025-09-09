import React, { useState } from "react";

const Size = () => {
  const sizes = ["S", "M", "L"];
  const [selectedSize, setSelectedSize] = useState(null);
  return (
    <>
      <div>
        <label className="text-xl font-medium">Size</label>
        <p>
          This model is <strong>Adjustable Nosepads</strong>
        </p>
        <div className="flex space-x-2 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)} // Update selected size on click
              className={`border px-3 py-1 rounded text-sm hover:border-red-600
              ${selectedSize === size
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-black"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Size;
