import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function WishlistPage({ userId }) {
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist on load
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const userId2 = localStorage.getItem("user");
                const res = await API.get(`/getWishlist/${userId2}`);
                const products = res.data?.products || [];
                setWishlist(products); // keep full product objects
            } catch (err) {
                console.error("Failed to fetch wishlist:", err);
            }
        };
        fetchWishlist();
    }, [userId]);



    const toggleWishlist = async (productId) => {
        const userId2 = localStorage.getItem("user");
        try {
            if (wishlist.some((item) => item?.productId?._id === productId)) {
                // remove
                await API.delete("/removeWishlist", { data: { userId: userId2, productId } });
                setWishlist((prev) =>
                    prev.filter((item) => item?.productId?._id !== productId)
                );
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
                // add
                await API.post("/addWishlist", { userId: userId2, productId });
                const res = await API.get(`/getWishlist/${userId2}`);
                setWishlist(res.data?.products || []);
            }
        } catch (err) {
            console.error("Wishlist toggle failed:", err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <h1 className="text-4xl font-bold mb-8 border-b border-gray-300 pb-2">
                My Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <p className="text-[#f00000] text-lg">Your wishlist is empty.</p>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {wishlist.map((item) => {
                        const product = item?.productId;
                        if (!product) return null; // safety check

                        return (
                            <div
                                key={product._id}
                                className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center border-red-500 border"
                            >
                                {/* Wishlist toggle */}
                                <div
                                    className="ml-40"
                                    onClick={() => toggleWishlist(product._id)}>
                                    <AiFillHeart className="fill-red-500 hover:cursor-pointer text-3xl" />
                                </div>

                                {/* Product Image */}
                                {product.image || product.product_image_collection ? (
                                    <Link to={`/product/${product.product_name}`}
                                        state={{ ID: product._id }}>
                                        <img
                                            src={
                                                product.image
                                                    ? `${IMAGE_URL + product.image}`
                                                    : `${IMAGE_URL + product.product_image_collection[0]}`
                                            }
                                            alt={product.name || product.product_name}
                                            className="w-full h-36 object-contain mb-4 hover:scale-105 hover:cursor-pointer transition-transform"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </Link>
                                ) : (
                                    "No Images"
                                )}

                                {/* Title */}
                                <div className="flex justify-between items-center w-full mt-3">
                                    <h2 className="font-semibold text-gray-800 text-base capitalize">
                                        {product.name || product.product_name}
                                    </h2>
                                </div>

                                {/* Price + Button */}
                                <div className="flex justify-between items-center w-full mt-3">
                                    <div className="flex items-center gap-1">
                                        {product.price && (
                                            <span className="text-gray-500 line-through">
                                                ${product.price}
                                            </span>
                                        )}
                                        <span className="text-gray-500 font-bold line-through mr-2">
                                            ${product.product_price}
                                        </span>
                                        <span className="text-[#f00000] font-semibold">
                                            ${product.product_sale_price}
                                        </span>


                                    </div>
                                    <Link
                                        to={`/product/${product.product_name}`}
                                        state={{ ID: product._id }}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:cursor-pointer"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;