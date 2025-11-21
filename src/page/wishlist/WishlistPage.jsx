import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function WishlistPage({ userId }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch wishlist on mount
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const userId2 = localStorage.getItem("user");
                const res = await API.get(`/getWishlist/${userId2}`);
                const products = res.data?.products || [];
                setWishlist(products.filter(p => p?.productId));
            } catch (err) {
                console.error("Failed to fetch wishlist:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load wishlist",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    // Helper: Get primary image
    const getProductImage = (product) => {
        const img =
            product.product_image_collection?.[0] ||
            product.product_variants?.[0]?.images?.[0];

        return img ? `${IMAGE_URL}${img}` : null;
    };

    // Helper: Show discount badge
    const getDiscountPercentage = (product) => {
        if (product.discountType === "percentage") {
            return product.discountValue;
        }
        if (product.product_price && product.product_sale_price) {
            return Math.round(
                ((product.product_price - product.product_sale_price) / product.product_price) * 100
            );
        }
        return 0;
    };

    // Helper: Is product in stock
    const isInStock = (product) => product.stockAvailability > 0;

    // Wishlist toggler
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
                setWishlist((res.data?.products || []).filter(p => p?.productId));
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Added to wishlist",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });
            }
        } catch (err) {
            console.error("Wishlist toggle failed:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update wishlist",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading wishlist...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <h1 className="text-4xl font-bold mb-8 border-b border-gray-300 pb-2">
                My Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-4">
                        Your wishlist is empty.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => {
                        const product = item?.productId;
                        if (!product) return null;

                        const imageUrl = getProductImage(product);
                        const inStock = isInStock(product);
                        const discount = getDiscountPercentage(product);

                        return (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 flex flex-col"
                            >
                                {/* Wishlist Toggle & Discount Badge */}
                                <div className="relative h-40 bg-gray-100 group">
                                    {/* Discount Badge */}
                                    {discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                                            {discount}% OFF
                                        </div>
                                    )}

                                    {/* Stock Status */}
                                    {!inStock && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
                                            <span className="text-white font-bold text-lg">
                                                Out of Stock
                                            </span>
                                        </div>
                                    )}

                                    {/* Wishlist Heart */}
                                    <button
                                        onClick={() => toggleWishlist(product._id)}
                                        className="absolute top-2 right-2 z-30 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                                        title={wishlist.some((item) => item?.productId?._id === product._id) ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        <AiFillHeart className="text-red-500 text-2xl" />
                                    </button>

                                    {/* Product Image */}
                                    {imageUrl ? (
                                        <Link
                                            to={`/product/${product._id}/${product.subCategoryName}/${product.subCat_id}`}
                                            state={{ ID: product._id }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={product.product_name}
                                                className="w-full h-40 object-contain group-hover:scale-102 transition-transform duration-200"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </Link>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image Available
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-3 flex flex-col flex-grow">
                                    <h2 className="font-semibold text-gray-800 text-base capitalize line-clamp-2 mb-2">
                                        {product.product_name}
                                    </h2>

                                    {/* Frame Details */}
                                    <div className="text-xs text-gray-600 space-y-1 mb-2">
                                        {product.frame_color && <p>Color: {product.frame_color}</p>}
                                        {product.frame_shape && <p>Shape: {product.frame_shape}</p>}
                                    </div>

                                    {/* Price Section */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2">
                                            {product.product_price && (
                                                <span className="text-gray-400 line-through text-md">
                                                    ${product.product_price.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="text-red-600 font-bold text-lg">
                                                ${product.product_sale_price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <Link
                                        to={`/product/${product._id}/${product.subCategoryName}/${product.subCat_id}`}
                                        className={`w-full block text-center py-2 rounded-lg font-medium transition ${inStock
                                            ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                    >
                                        {inStock ? "View Details" : "Out of Stock"}
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
