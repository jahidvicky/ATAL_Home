import React from "react";
import { useRecentlyViewed } from "./RecentlyViewedContext";
import { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";

function RecentlyView() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  // Get only latest 4 items
  const latestProducts = recentlyViewed.slice(-4).reverse();

  // Function to get correct product image
  const getProductImage = (product) => {
    // NEW STRUCTURE → product_variants[0].images[0]
    if (
      product.product_variants &&
      product.product_variants.length > 0 &&
      product.product_variants[0].images &&
      product.product_variants[0].images.length > 0
    ) {
      const img = product.product_variants[0].images[0];
      return img.startsWith("http") ? img : IMAGE_URL + img;
    }

    // OPTIONAL FALLBACK → product_color for sunglasses
    if (
      product.product_color &&
      product.product_color.length > 0
    ) {
      const img = product.product_color[0];
      return img.startsWith("http") ? img : IMAGE_URL + img;
    }

    // FINAL FALLBACK
    return "/no-image.png";
  };

  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.map((product, idx) => (
          <div
            key={product._id || idx}
            className="border border-red-600 rounded-lg shadow-2xl hover:shadow-red-500 transition-all p-4 text-center cursor-pointer duration-500"
          >
            <Link to={`/product/${product._id}/${product.subCategoryName}/${product.subCat_id}`}>
              {/* PRODUCT IMAGE */}
              <div className="mb-4">
                <img
                  src={getProductImage(product)}
                  alt={product.product_name}
                  className="w-full h-36 object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* PRODUCT NAME */}
            <p className="text-xl font-semibold tracking-wide text-[#f00000] capitalize mb-2">
              {product.product_name}
            </p>

            {/* PRICES */}
            <div className="flex justify-center items-center gap-2">
              {product.product_price && (
                <span className="text-gray-600 line-through text-sm">
                  ${product.product_price}
                </span>
              )}
              <span className="text-black font-bold">
                ${product.product_sale_price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentlyView;
