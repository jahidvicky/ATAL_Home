import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
const ProductCard = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(product.mainImage);

  return (
    <div className="md:w-65 bg-white shadow-md rounded-xl overflow-hidden relative group duration-500 hover:scale-105 hover:shadow-xl">
      <button className="absolute top-2 right-2 z-10 bg-white/80 hover:text-red-600 rounded-full p-1 transition">
        <FaHeart className="text-3xl text-zinc-400 hover:text-red-600" />
      </button>
      <div className="mt-5 block md:w-65 w-80">
        <img
          src={imageSrc}
          alt="Product"
          className="h-45 w-full object-contain rounded-xl"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-black truncate capitalize mb-2">
          {product.name}
        </p>
        {product.altImages.length > 0 && (
          <div className="flex gap-2">
            {product.altImages.map((img, idx) => (
              <button
                key={idx}
                className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-gray-300 hover:ring-black hover:cursor-pointer"
                style={{ backgroundColor: img.color }}
                onMouseEnter={() => setImageSrc(img.url)}
                onMouseLeave={() => setImageSrc(product.mainImage)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const products = [
    {
      name: "Murcia Glasses",
      mainImage:
        "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-blue-full-rim-wayfarer-lenskart-blu-lb-e13740-c3_dsc5572_11_10_2024.jpg",
      altImages: [
        {
          color: "#6f42c1",
          url: "https://s3.zeelool.com/admin/product/image/97ce507f6478cdb2bd79c8e6f2679778.jpg",
        },
        {
          color: "#d2691e",
          url: "https://s3.zeelool.com/admin/product/image/7520f33b85a1a0461a870d1c7fe8d544.jpg",
        },
        {
          color: "#002672",
          url: "https://s3.zeelool.com/admin/product/image/423277a4e4e9591f941b879526e127e2.jpg",
        },
      ],
    },
    {
      name: "Osorio Glasses",
      mainImage:
        "https://s3.zeelool.com/admin/product/image/97ce507f6478cdb2bd79c8e6f2679778.jpg",
      altImages: [
        {
          color: "#6f42c1",
          url: "https://s3.zeelool.com/admin/product/image/97ce507f6478cdb2bd79c8e6f2679778.jpg",
        },
        {
          color: "#d2691e",
          url: "https://s3.zeelool.com/admin/product/image/7520f33b85a1a0461a870d1c7fe8d544.jpg",
        },
        {
          color: "#002672",
          url: "https://s3.zeelool.com/admin/product/image/423277a4e4e9591f941b879526e127e2.jpg",
        },
      ],
    },
    {
      name: "Finklea Glasses",
      mainImage:
        "https://s3.zeelool.com/admin/product/image/f45642b15ade36b18f0ae6b1130d389b.jpg",
      altImages: [
        {
          color: "#6f42c1",
          url: "https://s3.zeelool.com/admin/product/image/97ce507f6478cdb2bd79c8e6f2679778.jpg",
        },
        {
          color: "#d2691e",
          url: "https://s3.zeelool.com/admin/product/image/7520f33b85a1a0461a870d1c7fe8d544.jpg",
        },
        {
          color: "#002672",
          url: "https://s3.zeelool.com/admin/product/image/423277a4e4e9591f941b879526e127e2.jpg",
        },
      ],
    },
    {
      name: "Farris Glasses",
      mainImage:
        "https://s3.zeelool.com/admin/product/image/f45642b15ade36b18f0ae6b1130d389b.jpg",
      altImages: [
        {
          color: "#6f42c1",
          url: "https://s3.zeelool.com/admin/product/image/97ce507f6478cdb2bd79c8e6f2679778.jpg",
        },
        {
          color: "#d2691e",
          url: "https://s3.zeelool.com/admin/product/image/7520f33b85a1a0461a870d1c7fe8d544.jpg",
        },
        {
          color: "#002672",
          url: "https://s3.zeelool.com/admin/product/image/423277a4e4e9591f941b879526e127e2.jpg",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black md:ml-22 ml-6">
          Best Seller
        </h2>
        <button className="flex items-center gap-4 text-white font-medium bg-red-600 px-4 py-2 rounded md:mr-22 mr-6 hover:bg-black transition-colors duration-300 hover:cursor-pointer">
          FIND MORE
          <span className="bg-white text-black p-1 rounded-full">
            <FiArrowRight size={16} className="hover:rotate-[-40deg]" />
          </span>
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-16 justify-items-center gap-6 md:gap-0">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </section>
    </div>
  );
};

export default ProductGrid;
