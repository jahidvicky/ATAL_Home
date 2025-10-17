import React from "react";

const Eyewearsection = () => {
  return (
    <div className="bg-black px-6 py-16 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Heading */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight font-serif">
            Eyewear<br />
            Crafted For<br />
            Every Moment
          </h1>
        </div>

        {/* Right side - Paragraph */}
        <div>
          <p className="md:text-base text-white leading-relaxed">
            Looking for glasses that perfectly match every moment of your life? At Atal Opticals, we know that one pair of eyeglasses doesn't fit every occasion. That's why we offer an ever-growing collection of trendy, high-quality glasses frames and prescription glasses at prices that make sense. Whether you’re shopping for glasses online or updating your style, we stay ahead of the latest trends so you don’t have to. And with our seamless digital experience, finding your next perfect pair of frames is easier than ever. Whether you’re switching things up or building your eyewear wardrobe, Atal Opticals is here to help you see the world in style.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Eyewearsection;
