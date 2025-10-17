import React from "react";
import { useRecentlyViewed } from "./RecentlyViewedContext";
import { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";

function RecentlyView() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  // Get only the latest 4 products
  const latestProducts = recentlyViewed.slice(-4).reverse(); // slice last 4 and reverse for latest first

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
           <Link
            to="/product/:name"
            state={{
              category: product.cat_id,
              subcategory: product.subCat_id,
              ID:product._id
            }}>
             {/* Product Image */}
            <div className="mb-4">
              <img
                src={
                  product.product_image_collection?.[0]?.startsWith("http")
                    ? product.product_image_collection[0]
                    : IMAGE_URL + product.product_image_collection?.[0]
                }
                alt={product.product_name}
                className="w-full h-36 object-contain hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
           </Link>

            {/* Product Name */}
            <p className="text-xl font-semibold tracking-wide text-red-600 capitalize mb-2">
              {product.product_name}
            </p>

            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-600 line-through text-sm">
                ${product.product_price}
              </span>
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
