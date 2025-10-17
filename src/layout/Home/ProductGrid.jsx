import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";
import { useRecentlyViewed } from "../../page/collections/RecentlyViewedContext";
import StockAvailability from "../../page/collections/StockAvailability";

const ProductCard = ({ product, onClick, children }) => {
  const [imageSrc, setImageSrc] = useState(product.product_image_collection[0]);

  return (
    <div
      className="border border-red-600 rounded-lg shadow-2xl hover:shadow-red-500 transition-all text-center p-4 h-full cursor-pointer shadow-white relative duration-500"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="mb-4 relative">
        <img
          src={imageSrc?.startsWith("http") ? imageSrc : IMAGE_URL + imageSrc}
          alt={product.product_name}
          className="w-full h-36 object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {/* StockAvailability passed as children */}
        <div className="absolute top-1 left-2">{children}</div>
      </div>

      {/* Product Name */}
      <p className="text-xl font-semibold tracking-wide text-red-600 capitalize mb-2">
        {product.product_name}
      </p>

      {/* Product Price */}
      <div className="flex justify-center items-center gap-2">
        <span className="text-gray-600 line-through text-sm">
          ${product.product_price}
        </span>
        <span className="text-black font-bold">
          ${product.discountedPrice ? product.discountedPrice : product.product_sale_price} CAD
        </span>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [bestSellerData, setBestSellerData] = useState([]);
  const { handleProductClick } = useRecentlyViewed();

  const getBestSeller = async () => {
    try {
      const res = await API.get(
        "/products/68cd4400f0089635c3663a5d/68cd44dbf0089635c3663a67"
      );

      // Sort or reverse to show latest first
      const sortedData = res.data.reverse(); // assuming latest at end
      setBestSellerData(sortedData);
    } catch (err) {
      console.error("Error Fetching Best Seller Product", err);
    }
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  // Show only first 4 products on homepage
  const visibleProducts = bestSellerData.slice(0, 4);

  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black ml-2">
          Best Seller
        </h2>

        {/* Show "Find More" button only if more than 4 products */}
        {bestSellerData.length > 4 && (
          <Link
            to="/allproduct"
            state={{
              category: bestSellerData[0]?.cat_id,
              subcategory: bestSellerData[0]?.subCat_id,
            }}
          >
            <button className="flex items-center gap-4 text-white font-medium bg-red-600 px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 cursor-pointer">
              FIND MORE
              <span className="bg-white text-black p-1 rounded-full">
                <FiArrowRight
                  size={16}
                  className="hover:rotate-[-40deg] transition-transform"
                />
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product, idx) => (
          <Link
            key={product._id || idx}
            to={`/product/${product.product_name}`}
            state={{
              category: product.cat_id,
              subcategory: product.subCat_id,
              ID: product._id,
            }}
            className="hover:cursor-pointer"
          >
            <ProductCard
              product={product}
              onClick={() => handleProductClick(product)}
            >
              <StockAvailability data={product.stockAvailability} />
            </ProductCard>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
