import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    FaSearch,
    FaClock,
    FaTimes,
    FaTrash,
    FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_URL } from "../../../API/Api";

function SearchModal({
    isOpen,
    onClose,
    query,
    handleSearch,
    handleSearchClick,
    handleKeyDown,
    filteredProducts,
    isLoading,
    errorMsg,
    goToSelected,
    recentSearches,
    onRecentSearchClick,
    onRemoveSearch,
    onClearAllSearches,
    navigate,
}) {
    const searchInputRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const relatedProducts = useMemo(() => {
        return (filteredProducts || []).slice(4, 8);
    }, [filteredProducts]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 80);
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            setSelectedProduct(null);
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen, onClose]);

    //  Universal Image Getter
    const getProductImage = (product) => {
        // PRIMARY - new system (sunglasses + contact lenses)
        const variantImage = product?.product_variants?.[0]?.images?.[0];
        if (variantImage) {
            return variantImage.startsWith("http")
                ? variantImage
                : IMAGE_URL + variantImage;
        }

        // FALLBACK for sunglasses color images
        const colorImage = product?.product_color?.[0];
        if (colorImage) {
            return colorImage.startsWith("http")
                ? colorImage
                : IMAGE_URL + colorImage;
        }

        return "/no-image.png";
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleViewAll = () => {
        if (query.trim()) {
            const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 10);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
            navigate(`/search-results?q=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    // Updated Product Card With New Image System
    const ProductCard = ({ product, isCompact = false }) => (
        <div
            onClick={() => goToSelected(product)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className={`relative bg-gray-100 overflow-hidden ${isCompact ? "h-32" : "h-48"}`}>
                <img
                    src={getProductImage(product)}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                />

                {product.product_price > product.product_sale_price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {Math.round(
                            ((product.product_price - product.product_sale_price) /
                                product.product_price) *
                            100
                        )}
                        % OFF
                    </div>
                )}
            </div>

            <div className="p-3">
                <p className="text-xs text-gray-600 mb-1 font-medium">
                    {product.brand || "Brand"}
                </p>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                    {product.product_name}
                </h4>
                <div className="flex items-center justify-between gap-1">
                    {product.product_price > product.product_sale_price && (
                        <span className="text-xs text-gray-400 line-through">
                            ${Number(product.product_price).toFixed(0)}
                        </span>
                    )}
                    <span className="text-sm font-bold text-red-600">
                        ${Number(product.product_sale_price || product.product_price).toFixed(0)}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-gray-200/70"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-gray-50 pt-4 pb-8 max-h-[90vh] overflow-hidden flex flex-col"
                    >

                        {/* 🔍 Search Bar */}
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-grow relative">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search for eyeglasses, sunglasses, contact lenses, brands..."
                                        value={query}
                                        onChange={handleSearch}
                                        onKeyDown={handleKeyDown}
                                        className="w-full rounded-full border-2 border-red-600 bg-white py-3 pl-6 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900 text-base sm:text-lg transition-all"
                                    />
                                    <button
                                        onClick={handleSearchClick}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <FaSearch size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                        </div>

                        {/* MAIN SEARCH BODY */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">

                                {/* RECENT SEARCHES */}
                                {recentSearches.length > 0 && !query && (
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                                                Recent Searches
                                            </h3>
                                            <button
                                                onClick={onClearAllSearches}
                                                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                                            >
                                                <FaTrash size={12} /> Clear All
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {recentSearches.slice(0, 10).map((search, idx) => (
                                                <div
                                                    key={idx}
                                                    className="px-4 py-2 bg-white hover:bg-red-50 text-gray-700 text-sm rounded-full transition-colors flex items-center gap-2 border border-gray-200"
                                                >
                                                    <button
                                                        onClick={() => onRecentSearchClick(search)}
                                                        className="flex items-center gap-2 flex-1"
                                                    >
                                                        <FaClock size={12} />
                                                        {search}
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onRemoveSearch(search);
                                                        }}
                                                        className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                                                    >
                                                        <FaTimes size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* SEARCH RESULTS */}
                                {query && (
                                    <div>
                                        {isLoading ? (
                                            <div className="flex justify-center py-12">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                                            </div>
                                        ) : errorMsg ? (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500">{errorMsg}</p>
                                            </div>
                                        ) : filteredProducts.length > 0 ? (
                                            <>
                                                {/* PRODUCT PAGE */}
                                                {selectedProduct ? (
                                                    <div>
                                                        <button
                                                            onClick={() => setSelectedProduct(null)}
                                                            className="mb-4 text-sm text-red-600 font-semibold flex items-center gap-1"
                                                        >
                                                            ← Back to Results
                                                        </button>

                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                                                            {/* LEFT: PRODUCT DETAIL CARD */}
                                                            <div className="sm:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
                                                                <img
                                                                    src={getProductImage(selectedProduct)}
                                                                    alt={selectedProduct.product_name}
                                                                    className="w-full h-80 object-contain rounded mb-6"
                                                                />

                                                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                                    {selectedProduct.product_name}
                                                                </h2>

                                                                <p className="text-lg text-gray-600 mb-4">
                                                                    {selectedProduct.brand}
                                                                </p>

                                                                <div className="flex items-center gap-3 mb-6">
                                                                    {selectedProduct.product_price > selectedProduct.product_sale_price && (
                                                                        <span className="text-xl text-gray-400 line-through">
                                                                            ${selectedProduct.product_price}
                                                                        </span>
                                                                    )}

                                                                    <span className="text-3xl font-bold text-red-600">
                                                                        ${selectedProduct.product_sale_price || selectedProduct.product_price}
                                                                    </span>
                                                                </div>

                                                                <button
                                                                    onClick={() => goToSelected(selectedProduct)}
                                                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                                                >
                                                                    View Full Details
                                                                </button>
                                                            </div>

                                                            {/* RIGHT: RELATED PRODUCTS */}
                                                            <div className="sm:col-span-1">
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <h4 className="text-sm font-bold text-gray-900 uppercase">
                                                                        Related Products
                                                                    </h4>
                                                                    {filteredProducts.length > 4 && (
                                                                        <button
                                                                            onClick={handleViewAll}
                                                                            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                                                                        >
                                                                            View All <FaArrowRight size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>

                                                                <div className="space-y-3">
                                                                    {relatedProducts.slice(0, 4).map((p) => (
                                                                        <ProductCard key={p._id} product={p} isCompact={true} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (

                                                    // LIST RESULTS PAGE
                                                    <div>
                                                        <h3 className="text-base font-bold text-gray-900 mb-4">
                                                            Search Results ({filteredProducts.length})
                                                        </h3>

                                                        <div className="bg-white rounded-lg border border-gray-200 mb-6 max-h-96 overflow-y-auto">
                                                            <ul className="divide-y divide-gray-200">
                                                                {filteredProducts.map((product) => (
                                                                    <li key={product._id}>
                                                                        <button
                                                                            onClick={() => handleProductClick(product)}
                                                                            className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center justify-between group"
                                                                        >
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-sm font-medium text-gray-900">
                                                                                    {product.product_name}
                                                                                </p>
                                                                                <p className="text-xs text-gray-600">
                                                                                    {product.brand} • ${product.product_sale_price || product.product_price}
                                                                                </p>
                                                                            </div>
                                                                            <span className="text-gray-400 group-hover:text-red-600 ml-2">
                                                                                →
                                                                            </span>
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* RELATED BELOW LIST */}
                                                        {relatedProducts.length > 0 && (
                                                            <div>
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <h4 className="text-sm font-bold text-gray-900 uppercase">
                                                                        Related Products
                                                                    </h4>

                                                                    {filteredProducts.length > 3 && (
                                                                        <button
                                                                            onClick={handleViewAll}
                                                                            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                                                                        >
                                                                            View All <FaArrowRight size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>

                                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                                    {relatedProducts.slice(0, 3).map((p) => (
                                                                        <ProductCard key={p._id} product={p} isCompact={true} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : null}
                                    </div>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default SearchModal;
