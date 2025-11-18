import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";
import { useRecentlyViewed } from "../../page/collections/RecentlyViewedContext";
import StockAvailability from "../../page/collections/StockAvailability";

const ProductCard = ({ product, onClick, children }) => {
  // Start with first variant's first image if present
  const [imageSrc, setImageSrc] = useState(
    product?.product_variants?.[0]?.images?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState(null);

  // Normalize to absolute URL
  const getImageURL = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${IMAGE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  const variants = Array.isArray(product?.product_variants)
    ? product.product_variants
    : [];

  // Default image to revert after hover
  const defaultImage = product?.product_variants?.[0]?.images?.[0] || "";

  // Keep image consistent if product changes (e.g., when grid updates)
  useEffect(() => {
    setImageSrc(defaultImage || "");
    setSelectedColor(null);
  }, [product?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative bg-white border border-red-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center cursor-pointer"
      onClick={onClick}
    >
      {/* Discount Tag */}
      {product.discountValue > 0 && (
        <div className="absolute top-2 left-2 bg-[#f00000] text-[#f00000] text-xs font-semibold px-2 py-1 rounded-full z-10">
          {product.discountValue}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="w-full flex justify-center items-center mb-3">
        <img
          src={getImageURL(imageSrc)}
          alt={product.product_name}
          className="w-65 h-32 object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Meta */}
      {!!product.gender && (
        <p className="text-sm text-gray-400">{product.gender}</p>
      )}

      <p className="text-base font-semibold text-gray-900 capitalize mb-1">
        {product.product_name}
      </p>

      <div className="flex justify-center items-center gap-2 mb-1">
        {product.product_price > product.product_sale_price && (
          <span className="text-gray-400 line-through text-sm">
            ${Number(product.product_price).toFixed(2)}
          </span>
        )}
        <span className="text-gray-900 font-bold">
          ${Number(product.product_sale_price ?? product.product_price ?? 0).toFixed(2)}
        </span>
      </div>

      {/* Stock badge via children */}
      {children}

      {/* Color Variants: hover to preview, click to select */}
      {variants.length > 0 && (
        <div
          className="flex justify-center gap-2 mt-3"
          role="radiogroup"
          aria-label="Choose color"
        >
          {variants.map((variant, index) => {
            const color = (variant.colorName || "").toLowerCase().trim() || "gray";
            const firstImage = getImageURL(variant.images?.[0]);
            const isSelected = selectedColor === color;

            return (
              <button
                key={index}
                type="button"
                title={variant.colorName}
                aria-label={variant.colorName}
                role="radio"
                aria-checked={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                  if (firstImage) setImageSrc(firstImage);
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  if (firstImage) setImageSrc(firstImage);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  if (selectedColor) {
                    const selectedVariant = variants.find(
                      (v) =>
                        (v.colorName || "").toLowerCase().trim() === selectedColor
                    );
                    const selectedImage = getImageURL(selectedVariant?.images?.[0]);
                    setImageSrc(selectedImage || getImageURL(defaultImage));
                  } else {
                    setImageSrc(getImageURL(defaultImage));
                  }
                }}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${isSelected
                  ? "border-blue-600 scale-110"
                  : "border-gray-300 hover:scale-110"
                  }`}
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const ProductGrid = () => {
  const [bestSellerData, setBestSellerData] = useState([]);
  const { handleProductClick } = useRecentlyViewed();

  const getBestSeller = async () => {
    try {
      const res = await API.get(
        "/getBestSellerProduct"
      );

      // Support both array and wrapped response
      const products = Array.isArray(res.data)
        ? res.data
        : res.data?.products || [];

      // Only approved products
      const approvedProducts = products.filter(
        (p) => p.productStatus === "Approved"
      );

      // Latest first
      setBestSellerData(approvedProducts.reverse());
    } catch (err) {
      console.error("Error Fetching Best Seller Product", err);
    }
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  // Show first 4 for homepage
  const visibleProducts = bestSellerData.slice(0, 4);

  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black ml-2">
          Best Seller
        </h2>

        {bestSellerData.length > 4 && (
          <Link to="/products/collection/best-seller">
            <button className="flex items-center gap-4 text-white font-medium bg-[#f00000] px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 cursor-pointer">
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
            to={`/product/${product._id}/${product.subCategoryName}/${product.subCat_id}`}
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
