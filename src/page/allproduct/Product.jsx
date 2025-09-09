import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
import API, { IMAGE_URL } from "../../API/Api";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Product({ userId }) {
  const location = useLocation();
  const { category, subcategory } = location.state;

  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/getProducts/${category}/${subcategory}`);
      setProduct(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await API.get(`/getWishlist/${userId}`);
      setWishlist(res.data?.products.map((p) => p.productId._id) || []);
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
    try {
      if (wishlist.includes(productId)) {
        await API.delete("/removeWishlist", { data: { userId, productId } });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
      } else {
        await API.post("/addWishlist", { userId, productId });
        setWishlist((prev) => [...prev, productId]);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Added in wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  const dispatch = useDispatch();

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
          >
            {/* Wishlist toggle, no CSS change */}
            <div onClick={() => toggleWishlist(data._id)}>
              {wishlist.includes(data._id) ? (
                <AiFillHeart className="fill-red-500 hover:cursor-pointer text-3xl" />
              ) : (
                <AiOutlineHeart className="fill-gray-500 hover:cursor-pointer text-3xl" />
              )}
            </div>

            {/* Image */}
            {data.product_image_collection &&
              data.product_image_collection.length > 0 ? (
              <Link to="/cart" state={{ ID: data._id }}>
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
            <div className="flex justify-between items-center w-full mt-3">
              <h2 className="font-semibold text-gray-800 text-base capitalize">
                {data.product_name}
              </h2>
            </div>

            {/* Rating & Button */}
            <div className="flex justify-between items-center w-full mt-3">
              <div className="flex items-center gap-1">
                <span>From</span>
                <span className="line-through">${data.product_price}</span>
                <span className="text-red-600 font-semibold">
                  ${data.product_sale_price}
                </span>
              </div>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: data._id,
                      name: data.product_name,
                      price: data.product_sale_price,
                      image: `${IMAGE_URL + data.product_image_collection[0]}`,
                    })
                  );
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Product;

