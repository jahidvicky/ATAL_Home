import React, { useState } from "react";

const Color = () => {
    const colors = ["#d4b9a5", "#ffffff", "#e1e1e1", "#000000"];
  const [selectedColor, setSelectedColor] = useState(null);
  return (
    <>
      <div>
      <label className="font-medium text-xl">5 Colours Available</label>
      <div className="flex space-x-2 mt-1">
        {colors.map((color, index) => (
          <span
            key={index}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={`w-6 h-6 rounded-full border cursor-pointer
              ${
                selectedColor === color
                  ? "border-1 border-red-500"
                  : "border-gray-300"
              }
            `}
          ></span>
        ))}
      </div>
    </div>
    </>
  )
}

export default Color