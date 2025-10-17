import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRecentlyViewed } from "../collections/RecentlyViewedContext";
import RecentlyView from "../collections/RecentlyView";
import StockAvailability from "../collections/StockAvailability";

function Product() {
  const location = useLocation();
  const { category, subcategory, subCategoryName } = location.state;

  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { handleProductClick } = useRecentlyViewed();

  // Fetch products
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${category}/${subcategory}`);
      setProduct(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      const res = await API.get(`/getWishlist/${userId2}`);
      const validProducts =
        res.data?.products?.filter((p) => p.productId) || [];
      setWishlist(validProducts.map((p) => p.productId._id));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchWishlist();
  }, []);

  // Toggle wishlist (add/remove)
  const toggleWishlist = async (productId) => {
    const userId2 = localStorage.getItem("user");
    try {
      if (wishlist.includes(productId)) {
        await API.delete("/removeWishlist", {
          data: { userId: userId2, productId },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        await API.post("/addWishlist", { userId: userId2, productId });
        setWishlist((prev) => [...prev, productId]);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Added in wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  return (
    <>
      <div className="mt-5 ml-10 font-bold text-2xl">{product.cat_sec}</div>
      <div className="mt-2 ml-10 font-semibold text-lg">
        {product.length} Results
      </div>
      <div className=" flex flex-wrap gap-3 mx-36 py-8">
        {product.map((data, index) => (
          <div
            className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center border-red-500 border shadow-gray-200"
            key={index}
            onClick={() => handleProductClick(data)}
          >
            {/* Wishlist toggle, no CSS change */}
            <div className="flex items-center space-x-30">
              <StockAvailability data={data.stockAvailability} />
              <div
                onClick={() => toggleWishlist(data._id)}
                className="cursor-pointer"
              >
                {wishlist.includes(data._id) ? (
                  <AiFillHeart className="text-red-500 text-3xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-3xl" />
                )}
              </div>
            </div>

            {/* Image */}
            {data.product_image_collection &&
              data.product_name &&
              data.product_image_collection.length > 0 ? (
              <Link
                to={`/product/${data.product_name}`}
                state={{
                  ID: data._id,
                  category: category,
                  subcategory: subcategory,
                  subCategoryName: subCategoryName,
                }}
              >
                <img
                  src={
                    data.product_image_collection[0].startsWith("http")
                      ? data.product_image_collection[0]
                      : `${IMAGE_URL + data.product_image_collection[0]}`
                  }
                  alt={data.product_name}
                  className="w-full h-36 object-contain mb-4 hover:scale-105 hover:cursor-pointer"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            ) : (
              "No Images"
            )}

            {/* Title and Price */}
            <Link
              to={`/product/${data.product_name}`}
              state={{
                ID: data._id,
                category: category,
                subcategory: subcategory,
              }}
              className="hover:cursor-pointer"
            >
              <div className="flex justify-between items-center w-full mt-3">
                <h2 className="font-semibold text-gray-800 text-base capitalize">
                  {data.product_name}
                </h2>
              </div>
            </Link>

            {/* Rating & Button */}
            <div className="flex justify-between items-center w-full mt-3">
              <div className="flex items-center gap-1">
                <span>CAD</span>
                <span className="line-through">${data.product_price}</span>
                <span className="text-red-600 font-semibold">
                  $
                  {data.discountedPrice
                    ? data.discountedPrice
                    : data.product_sale_price}{" "}
                  CAD
                </span>
              </div>

              {data.stockAvailability > 0 ? (
                <Link
                  to={`/product/${data.product_name}`}
                  state={{
                    ID: data._id,
                    category: category,
                    subcategory: subcategory,
                  }}
                  className="hover:cursor-pointer"
                >
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:cursor-pointer">
                    Buy
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm font-medium cursor-not-allowed hover:cursor-pointer"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <RecentlyView />
    </>
  );
}

export default Product;
