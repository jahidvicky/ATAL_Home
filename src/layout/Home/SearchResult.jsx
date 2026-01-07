import React, { useEffect, useMemo, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RecentlyView from '../../page/collections/RecentlyView';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OurPromise from "../../page/Cart/OurPromise";

// Toast setup
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// Initial filters
const initialFilters = {
    brands: new Set(),
    genders: new Set(),
    faceShapes: new Set(),   // 👈 NEW
    frameShapes: new Set(),  // 👈 NEW
    colors: new Set(),
    materials: new Set(),
    priceMin: 0,
    priceMax: 9999,
    isKids: false,
};



const toggleSet = (s, v) => {
    const n = new Set(s);
    n.has(v) ? n.delete(v) : n.add(v);
    return n;
};

// Helper to resolve image URLs
const resolveImg = (src = "") => {
    if (!src) return "/no-image.png";

    if (src.startsWith("http://") || src.startsWith("https://")) return src;

    const base = IMAGE_URL.endsWith("/") ? IMAGE_URL : `${IMAGE_URL}/`;
    const cleanSrc = src.replace(/^\/+/, "");

    return base + cleanSrc;
};

// Product Card Component
function ProductCard({
    data,
    img,
    inWishlist,
    toggleWishlist,
    isInStock,
}) {
    const [activeVar, setActiveVar] = React.useState(null);
    const [slideIdx, setSlideIdx] = React.useState(0);
    const slideTimerRef = React.useRef(null);

    const primary = React.useMemo(() => {
        const v0 = data?.product_variants?.[0]?.images?.[0];
        const c0 = data?.product_image_collection?.[0];
        const fallback = img;

        return resolveImg(v0 || c0 || fallback || "");
    }, [data, img]);

    const baseImgs = React.useMemo(() => {
        const allImgs = [
            ...(data?.product_image_collection || []),
            ...(data?.product_variants?.[0]?.images || []),
        ].filter(Boolean);
        return allImgs.length ? allImgs.map(resolveImg) : [primary];
    }, [data, primary]);

    const images = React.useMemo(() => {
        const srcs = activeVar?.images?.length ? activeVar.images : baseImgs;
        return srcs.map(resolveImg);
    }, [activeVar, baseImgs]);

    const currentImg = images[slideIdx] || images[0] || primary;

    const startSlide = (imgs) => {
        if (!imgs || imgs.length < 2) return;
        if (slideTimerRef.current) clearInterval(slideTimerRef.current);
        setSlideIdx(0);
        slideTimerRef.current = setInterval(() => {
            setSlideIdx((i) => (i + 1) % imgs.length);
        }, 1200);
    };

    const stopSlide = () => {
        if (slideTimerRef.current) clearInterval(slideTimerRef.current);
        slideTimerRef.current = null;
        setSlideIdx(0);
    };

    React.useEffect(() => () => {
        if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    }, []);

    const onSwatchEnter = (variant) => {
        setActiveVar(variant);
        startSlide(variant?.images || []);
    };

    const onCardLeave = () => {
        setActiveVar(null);
        stopSlide();
    };

    const variants = Array.isArray(data.product_variants) ? data.product_variants : [];

    return (
        <div
            className="relative bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center cursor-pointer"
            onMouseLeave={onCardLeave}
        >
            {/* Wishlist */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(data._id);
                }}
                aria-pressed={inWishlist}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white"
            >
                {inWishlist ? (
                    <AiFillHeart className="text-[#f00000] text-xl" />
                ) : (
                    <AiOutlineHeart className="text-gray-500 text-xl" />
                )}
            </button>

            {/* Discount Tag */}
            {data.product_price > data.product_sale_price && (
                <div className="absolute top-2 left-2 bg-gray-200 text-[#f00000] text-xs font-semibold px-2 py-1 rounded-full z-10">
                    {Math.round(
                        ((data.product_price - data.product_sale_price) / data.product_price) * 100
                    )}
                    % OFF
                </div>
            )}

            {/* Product Image */}
            <Link to={`/product/${data._id}/${data.subCategoryName}/${data.subCat_id}`}>
                <img
                    key={currentImg}
                    src={currentImg}
                    alt={data.product_name}
                    className="w-full h-32 object-contain mb-3 mt-4 transition-transform duration-300 hover:scale-105
                     motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out
                     motion-safe:animate-[fadeIn_220ms_ease-out]"
                    loading="lazy"
                    decoding="async"
                />
            </Link>

            {/* Gender */}
            {data.gender && <p className="text-sm text-gray-400">{data.gender}</p>}

            {/* Name */}
            <p className="text-base font-semibold text-gray-900 capitalize mb-1">
                {data.product_name}
            </p>

            {/* Price */}
            <div className="flex justify-center items-center gap-2 mb-1">
                {data.product_price > data.product_sale_price && (
                    <span className="text-gray-400 line-through text-sm">
                        ${Number(data.product_price).toFixed(2)}
                    </span>
                )}
                <span className="text-gray-900 font-bold">
                    ${Number(data.product_sale_price ?? data.product_price ?? 0).toFixed(2)}
                </span>
            </div>

            {/* Stock */}
            <div className="mb-2">
                <span className={`text-sm font-medium ${isInStock ? "text-green-600" : "text-gray-500"}`}>
                    {isInStock ? "In stock" : "Out of stock"}
                </span>
            </div>

            {/* Color Dots */}
            {variants.length > 0 && (
                <div className="flex justify-center gap-2 mt-2">
                    {variants.map((variant, i) => (
                        <span
                            key={i}
                            title={variant.colorName}
                            onMouseEnter={() => onSwatchEnter(variant)}
                            onFocus={() => onSwatchEnter(variant)}
                            onMouseLeave={onCardLeave}
                            onBlur={onCardLeave}
                            className={`w-5 h-5 rounded-full border transition-all duration-200 
                          ${activeVar?.colorName === variant.colorName
                                    ? "border-black ring-2 ring-black/10 scale-110"
                                    : "border-gray-300 hover:scale-105"}`}
                            style={{
                                backgroundColor: variant.colorName?.toLowerCase().trim() || "gray",
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Preview ${variant.colorName}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Filter Sections Component
const FilterSections = ({ filters, setFilters, facetData }) => {
    const Section = ({ title, children }) => (
        <div className="py-3 border-b last:border-b-0">
            <h4 className="font-medium text-sm mb-2">{title}</h4>
            {children}
        </div>
    );

    const Check = ({ label, setKey, value }) => {
        const on = filters[setKey].has(value);
        return (
            <label className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={on}
                    onChange={() =>
                        setFilters((prev) => ({
                            ...prev,
                            [setKey]: toggleSet(prev[setKey], value),
                        }))
                    }
                />
                <span className="text-sm capitalize">{label}</span>
            </label>
        );
    };

    return (
        <div>
            {/* Brand Filter */}
            {facetData.brands.length > 0 && (
                <Section title="Brand">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.brands.map((b) => (
                            <Check key={b} label={b} setKey="brands" value={b} />
                        ))}
                    </div>
                </Section>
            )}

            {/* Gender Filter */}
            {facetData.genders.length > 0 && (
                <Section title="Gender">
                    <div className="flex flex-col gap-1">
                        {facetData.genders.map((g) => (
                            <Check key={g} label={g} setKey="genders" value={g} />
                        ))}
                    </div>
                </Section>
            )}

            {/* Shape Filter */}
            {facetData.faceShapes?.length > 0 && (
                <Section title="Face Shape">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.faceShapes.map(s => (
                            <Check
                                key={s}
                                label={s}
                                setKey="faceShapes"
                                value={s}
                            />
                        ))}
                    </div>
                </Section>
            )}

            {facetData.frameShapes?.length > 0 && (
                <Section title="Frame Shape">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.frameShapes.map(s => (
                            <Check
                                key={s}
                                label={s}
                                setKey="frameShapes"
                                value={s}
                            />
                        ))}
                    </div>
                </Section>
            )}



            {/* Color Filter */}
            {facetData.colors.length > 0 && (
                <Section title="Color">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.colors.map((c) => (
                            <Check key={c} label={c} setKey="colors" value={c} />
                        ))}
                    </div>
                </Section>
            )}

            {/* Material Filter */}
            {facetData.materials.length > 0 && (
                <Section title="Material">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.materials.map((m) => (
                            <Check key={m} label={m} setKey="materials" value={m} />
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
};

// Main SearchResults Component
function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";

    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inventoryMap, setInventoryMap] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 24;

    const [filters, setFilters] = useState(initialFilters);
    const [sort, setSort] = useState("popular");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Fetch Search Results
    const fetchSearchResults = async () => {
        try {
            setIsLoading(true);
            setErrorMsg("");

            if (!query.trim()) {
                setErrorMsg("No search query provided");
                setProducts([]);
                return;
            }

            const res = await API.get(
                `/products/search?search=${encodeURIComponent(query)}`
            );

            const list = Array.isArray(res?.data?.products)
                ? res.data.products
                : [];

            setProducts(list);
            setPage(1);
        } catch (e) {
            console.error("Search fetch error:", e);
            setErrorMsg(e?.response?.data?.message || "Failed to load search results.");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Wishlist
    const fetchWishlist = async () => {
        try {
            const userId = localStorage.getItem("user");
            if (!userId) return;
            const res = await API.get(`/getWishlist/${userId}`);
            const valid = res.data?.products?.filter((p) => p.productId) || [];
            setWishlist(valid.map((p) => p.productId._id));
        } catch (e) {
            console.error("Wishlist fetch error:", e);
        }
    };

    const fetchInventory = async () => {
        try {
            const userLoc = localStorage.getItem("userLocation") || "east";

            const res = await API.get(
                `/inventory/available-products/${userLoc}?scope=global`
            );

            const map = {};
            (res.data.products || []).forEach((p) => {
                map[p._id] = Number(p.availableQty || 0);
            });

            setInventoryMap(map);
        } catch (err) {
            console.error("Inventory fetch failed", err);
        }
    };


    useEffect(() => {
        fetchSearchResults();
        fetchWishlist();
        fetchInventory();
    }, [query]);

    // Facets + Filters
    const facetData = useMemo(() => {
        const brands = new Set();
        const genders = new Set();
        const faceShapes = new Set();
        const frameShapes = new Set();
        const colors = new Set();
        const materials = new Set();

        let min = Infinity;
        let max = -Infinity;

        products.forEach((p) => {
            // Brand
            const brandName =
                p?.brand_id?.brand ||
                p?.brand ||
                p?.product_brand ||
                "";

            if (brandName) brands.add(brandName.trim());

            // Gender
            if (p.gender) genders.add(p.gender.trim());

            // Face & Frame shapes
            if (p.face_shape) faceShapes.add(p.face_shape.trim());
            if (p.frame_shape) frameShapes.add(p.frame_shape.trim());

            // Colors & materials
            if (p.frame_color) colors.add(p.frame_color.trim());
            if (p.frame_material) materials.add(p.frame_material.trim());

            // Price range
            const price = Number(p.product_sale_price || p.product_price || 0);
            if (!Number.isNaN(price)) {
                min = Math.min(min, price);
                max = Math.max(max, price);
            }
        });

        if (!Number.isFinite(min)) {
            min = 0;
            max = 9999;
        }

        return {
            brands: [...brands],
            genders: [...genders],
            faceShapes: [...faceShapes],
            frameShapes: [...frameShapes],
            colors: [...colors],
            materials: [...materials],
            min,
            max,
        };
    }, [products]);


    // Filter and Sort
    const matchesFilters = (p) => {
        const brand =
            p?.brand_id?.brand?.trim() ||
            p?.brand?.trim() ||
            p?.product_brand?.trim() ||
            "";
        const gender = (p.gender || "").trim().toLowerCase();
        const shape = String(p.frame_shape || "").trim();
        const color = String(p.frame_color || "").trim();
        const material = String(p.frame_material || "").trim();
        const price = Number(p.product_sale_price || p.product_price || 0);

        if (filters.brands.size && !filters.brands.has(brand)) return false;
        if (filters.genders.size && ![...filters.genders].some(g => g.toLowerCase() === gender)) return false;
        /* ---------- FACE SHAPE ---------- */
        if (
            filters.faceShapes.size &&
            !filters.faceShapes.has(p.face_shape?.trim())
        ) {
            return false;
        }

        /* ---------- FRAME SHAPE ---------- */
        if (
            filters.frameShapes.size &&
            !filters.frameShapes.has(p.frame_shape?.trim())
        ) {
            return false;
        }

        if (filters.colors.size && !filters.colors.has(color)) return false;
        if (filters.materials.size && !filters.materials.has(material)) return false;
        if (price < filters.priceMin || price > filters.priceMax) return false;
        return true;
    };

    const applySort = (arr) => {
        switch (sort) {
            case "low":
                return [...arr].sort(
                    (a, b) =>
                        (a.product_sale_price || a.product_price || 0) -
                        (b.product_sale_price || b.product_price || 0)
                );
            case "high":
                return [...arr].sort(
                    (a, b) =>
                        (b.product_sale_price || b.product_price || 0) -
                        (a.product_sale_price || a.product_price || 0)
                );
            case "new":
                return [...arr].sort(
                    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                );
            default:
                return arr;
        }
    };

    const filteredProducts = useMemo(
        () => applySort(products.filter(matchesFilters)),
        [products, filters, sort]
    );

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const pageSlice = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredProducts.slice(start, start + pageSize);
    }, [filteredProducts, page]);

    useEffect(() => {
        setPage(1);
    }, [
        sort,
        filters.priceMin,
        filters.priceMax,
        JSON.stringify([...filters.brands]),
        // JSON.stringify([...filters.shapes]),
        JSON.stringify([...filters.colors]),
        JSON.stringify([...filters.materials]),
    ]);

    const wishSet = useMemo(() => new Set(wishlist), [wishlist]);

    // Wishlist Toggle
    const toggleWishlist = async (productId) => {
        const userId = localStorage.getItem("user");
        if (!userId) {
            Toast.fire({ icon: "info", title: "Please sign in to use wishlist" });
            return;
        }
        const isIn = wishSet.has(productId);
        const prev = wishlist;
        const next = isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
        setWishlist(next);
        try {
            if (isIn) {
                await API.delete("/removeWishlist", { data: { userId, productId } });
                Toast.fire({ icon: "success", title: "Removed from wishlist" });
            } else {
                await API.post("/addWishlist", { userId, productId });
                Toast.fire({ icon: "success", title: "Added to wishlist" });
            }
        } catch (err) {
            setWishlist(prev);
            Toast.fire({ icon: "error", title: "Wishlist update failed" });
        }
    };

    const primaryImage = (data) => {
        const src =
            data?.product_variants?.[0]?.images?.[0] ||
            data?.product_image_collection?.[0] ||
            data?.product_image ||
            "";
        return resolveImg(src);
    };


    return (
        <div className="bg-white">
            {/* Header */}
            <div className="w-full border-b border-gray-200 bg-[#f00000]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div>
                        <div className="text-[33px] tracking-wide font-semibold uppercase text-white">
                            Search Results
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <label htmlFor="sort" className="sr-only">
                                Sort by
                            </label>
                            <select
                                id="sort"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white"
                                aria-label="Sort products"
                            >
                                <option value="popular">Most popular</option>
                                <option value="low">Price: Low to high</option>
                                <option value="high">Price: High to low</option>
                                <option value="new">New arrivals</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <h1 className="text-2xl font-bold capitalize">
                    Results for "{query}"
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {isLoading ? "Loading…" : `${filteredProducts.length} Results`}
                </p>
                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mt-3">
                        {errorMsg}
                    </div>
                )}
            </div>

            {/* Mobile Filter Drawer */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 ${isFilterOpen ? "block" : "hidden"
                    }`}
                onClick={() => setIsFilterOpen(false)}
                aria-hidden="true"
            />
            <aside
                id="filters-drawer"
                role="dialog"
                aria-modal="true"
                className={`fixed z-50 inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ${isFilterOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:hidden`}
            >
                <div className="p-4 flex items-center justify-between border-b">
                    <h3 className="text-base font-semibold">Filters</h3>
                    <button
                        className="text-sm px-2 py-1 rounded border"
                        onClick={() => setIsFilterOpen(false)}
                        aria-label="Close filters"
                    >
                        Close
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                    <FilterSections
                        filters={filters}
                        setFilters={setFilters}
                        facetData={facetData}
                    />
                    <div className="mt-4 flex items-center gap-2">
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="flex-1 bg-black text-white rounded px-3 py-2 text-sm"
                        >
                            Apply
                        </button>
                        <button
                            onClick={() => setFilters(initialFilters)}
                            className="flex-1 border rounded px-3 py-2 text-sm"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            </aside>

            {/* Grid + Sidebar Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-8">
                <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:w-64 lg:shrink-0">
                        <div className="border border-black rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-base font-semibold">Filters</h3>
                                <button
                                    onClick={() => setFilters(initialFilters)}
                                    className="text-sm underline"
                                >
                                    Clear
                                </button>
                            </div>
                            <FilterSections
                                filters={filters}
                                setFilters={setFilters}
                                facetData={facetData}
                            />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div>
                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-gray-200 p-4"
                                    >
                                        <div className="h-36 bg-gray-100 rounded mb-4 animate-pulse" />
                                        <div className="h-4 w-3/4 bg-gray-100 rounded mb-2 animate-pulse" />
                                        <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        ) : pageSlice.length === 0 ? (
                            <div className="text-center text-gray-600 py-16">
                                <p className="text-lg">No products found matching your search.</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-4 px-6 py-2 bg-[#f00000] text-white rounded-lg hover:bg-red-700"
                                >
                                    Go Back Home
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {pageSlice.map((data) => {
                                    const img = primaryImage(data);
                                    const inWishlist = wishSet.has(data._id);
                                    const isInStock = (inventoryMap[data._id] || 0) > 0;
                                    return (
                                        <ProductCard
                                            key={data._id}
                                            data={data}
                                            img={img}
                                            inWishlist={inWishlist}
                                            toggleWishlist={toggleWishlist}
                                            isInStock={isInStock}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {!isLoading && filteredProducts.length > pageSize && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <button
                                    className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    aria-label="Previous page"
                                >
                                    <FaChevronLeft />
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({
                                        length: Math.max(
                                            1,
                                            Math.ceil(filteredProducts.length / pageSize)
                                        ),
                                    }).map((_, i) => {
                                        const n = i + 1;
                                        const isActive = n === page;
                                        return (
                                            <button
                                                key={n}
                                                onClick={() => setPage(n)}
                                                className={`px-3 py-1 rounded border ${isActive
                                                    ? "bg-black text-white border-black"
                                                    : "border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                {n}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={page * pageSize >= filteredProducts.length}
                                    aria-label="Next page"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recently Viewed */}
            <RecentlyView />

            {/* Our Promise */}
            <OurPromise />
        </div>
    );
}

export default SearchResults;
