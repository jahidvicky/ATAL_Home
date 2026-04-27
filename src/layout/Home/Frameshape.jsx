import React, { useEffect, useState } from "react";
import API from "../../API/Api";
import { Link } from "react-router-dom";

import aviator from "../../assets/shape/aviator.jpg";
import round from "../../assets/shape/round.jpg";
import rectangle from "../../assets/shape/rectangle.jpg";
import cat_eye from "../../assets/shape/cat-eye.jpg";
import oval from "../../assets/shape/ovel.jpg";
import square from "../../assets/shape/square.jpg";

const Frameshape = () => {
  const [availableShapes, setAvailableShapes] = useState([]);

  // Shape list + images (static)
  const allShapes = [
    { name: "Aviator", img: aviator },
    { name: "Round", img: round },
    { name: "Rectangle", img: rectangle },
    { name: "Cat Eye", img: cat_eye },
    { name: "Oval", img: oval },
    { name: "Square", img: square },
  ];

  const getAllProducts = async () => {
    try {
      const res = await API.get("/getAllProduct");
      const products = res.data.products || [];

      // Find which shapes exist in actual product list
      const productShapes = new Set(
        products
          .map((p) => p.frame_shape)
          .filter((s) => typeof s === "string" && s.trim() !== "")
      );

      // Filter shapes that exist in products
      const filtered = allShapes.filter((shape) =>
        productShapes.has(shape.name)
      );

      setAvailableShapes(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-ray text-center py-10">
      <h2 className="text-3xl font-bold mt-4">Shop by <span className=" text-[#f00000]">Frame Shape</span></h2>
      <hr className="w-80 mt-1 mb-2 mx-auto border-black" />
      <p className="text-gray-700 text-xl font-semibold">
        Choose the perfect frames for your face or your style.
      </p>

      <div className="flex justify-between md:mx-26 mt-8 flex-wrap gap-y-6 mx-12">
        {availableShapes.map((shape, idx) => (
          <Link
            key={idx}
            to={`/products/frame-shape/${shape.name.toLowerCase()}`}
          >
            <div className="text-center cursor-pointer">
              <img
                src={shape.img}
                alt={shape.name}
                loading="lazy"
                decoding="async"
                className='hover:scale-120 hover:cursor-pointer'
              />
              <h1 className="mt-2 text-lg font-medium">{shape.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Frameshape;
