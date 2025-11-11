import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaSearch,
  FaFacebookF,
  FaYoutube,
  FaBars,
  FaClock,
  FaTimes,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/category/logo.png";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "./CartDrawer";
import API, { IMAGE_URL } from "../../API/Api";
import { motion, AnimatePresence } from "framer-motion";
import { CAT, SUB, SUB_IMG } from "../../constants/catalogIds";
import PostHeader from "./PostHeader";
import SocialLinks from "../../page/SocialMedia/SocialLinks";

/* ======================== MegaMenuPanel Component ======================== */
function MegaMenuPanel({ open, onClose, activeKey, dataByKey }) {
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) onClose?.();
    };
    if (open) {
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("touchstart", onDoc, { passive: true });
    }
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open, onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const menu = dataByKey[activeKey] || null;

  const panelMotion = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.18, ease: "easeInOut" },
  };

  const getImageSrc = (img) => {
    if (!img) return;
    if (typeof img === "string" && img.startsWith("/")) return img;
    if (img.includes("assets") || img.includes("static")) return img;
    if (img.startsWith("http")) return img;
    return IMAGE_URL + img;
  };

  return (
    <AnimatePresence>
      {open && menu && (
        <motion.div
          {...panelMotion}
          ref={panelRef}
          className="absolute left-1/2 -translate-x-1/2 top-full bg-white text-gray-800 border border-gray-200 rounded-xl shadow-2xl z-50 w-[1040px] max-w-[90vw] overflow-hidden"
          role="menu"
          aria-label={`${activeKey} mega menu`}
        >
          <div className="grid grid-cols-[620px_1fr]">
            <div className="grid grid-cols-3 gap-6 p-6">
              {menu.columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {col.title}
                  </h4>
                  {col.dynamic ? (
                    <div className="grid grid-cols-3 gap-4">
                      {dataByKey.brands?.slice(0, 9).map((brand) => (
                        <div
                          key={brand._id}
                          className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => {
                            onClose?.();
                            navigate(`/allproduct/${brand._id}`, {
                              state: { brandId: brand._id, brandName: brand.brand },
                            });
                          }}
                        >
                          <img
                            src={
                              brand.image?.startsWith("http")
                                ? brand.image
                                : `${IMAGE_URL}${brand.image}`
                            }
                            alt={brand.brand}
                            className="w-16 h-10 object-contain mb-2"
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="text-sm text-gray-700">{brand.brand}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {col.links.map((l) => (
                        <li key={`${col.title}-${l.label}`}>
                          <Link
                            to={l.to}
                            state={l.state}
                            role="menuitem"
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded px-2 py-1"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose?.();
                            }}
                          >
                            <img
                              className="w-12 h-12 object-cover rounded-full"
                              src={getImageSrc(l.state.subCategoryImage)}
                              alt={l.label}
                            />
                            <span>{l.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="border-l border-gray-100 bg-white">
              <div className="p-6 h-full flex flex-col">
                <div className="relative rounded-md overflow-hidden">
                  {menu.promo?.image && (
                    <img
                      src={menu.promo.image}
                      alt={menu.promo?.headline || "Promo"}
                      className="w-full h-[300px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {menu.promo?.badge && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[11px] tracking-wide px-2 py-1 rounded">
                      {menu.promo.badge}
                    </span>
                  )}
                </div>
                <h5 className="mt-4 text-base font-semibold text-gray-900">
                  {menu.promo?.headline}
                </h5>
                <p className="text-sm text-gray-600 mt-1">{menu.promo?.text}</p>
                {menu.promo?.ctaLabel && (
                  <Link
                    to={menu.promo.ctaTo || "#"}
                    state={menu.promo.state}
                    className="inline-block mt-3 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-[#f00000]"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => onClose?.()}
                  >
                    {menu.promo.ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ======================== Enhanced Search Modal with Scrollable Filters ======================== */
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

  const ProductCard = ({ product, isCompact = false }) => (
    <div
      onClick={() => goToSelected(product)}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className={`relative bg-gray-100 overflow-hidden ${isCompact ? "h-32" : "h-48"}`}>
        {product.product_image_collection?.[0] ? (
          <img
            src={
              product.product_image_collection[0].startsWith("http")
                ? product.product_image_collection[0]
                : `${IMAGE_URL}/${product.product_image_collection[0]}`
            }
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaSearch className="text-gray-300" size={24} />
          </div>
        )}
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-200/70"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-50 pt-4 pb-8 max-h-[90vh] overflow-hidden flex flex-col"
          >
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
                    aria-label="Search"
                  >
                    <FaSearch size={20} />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  aria-label="Close search"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
                {/* Search history (if no query) */}
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
                        <FaTrash size={12} />
                        Clear All
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
                            aria-label="Remove search"
                          >
                            <FaTimes size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
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
                        {selectedProduct ? (
                          // Product Details View
                          <div>
                            <button
                              onClick={() => setSelectedProduct(null)}
                              className="mb-4 text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                            >
                              ← Back to Results
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                              {/* Main Product */}
                              <div className="sm:col-span-2">
                                <div className="bg-white rounded-lg p-6 border border-gray-200">
                                  <div className="mb-6">
                                    <img
                                      src={
                                        selectedProduct.product_image_collection?.[0]?.startsWith("http")
                                          ? selectedProduct.product_image_collection[0]
                                          : `${IMAGE_URL}/${selectedProduct.product_image_collection?.[0]}`
                                      }
                                      alt={selectedProduct.product_name}
                                      className="w-full h-80 object-contain rounded"
                                    />
                                  </div>
                                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedProduct.product_name}
                                  </h2>
                                  <p className="text-lg text-gray-600 mb-4">
                                    {selectedProduct.brand}
                                  </p>
                                  <div className="flex items-center gap-3 mb-6">
                                    {selectedProduct.product_price > selectedProduct.product_sale_price && (
                                      <span className="text-xl text-gray-400 line-through">
                                        ${Number(selectedProduct.product_price).toFixed(2)}
                                      </span>
                                    )}
                                    <span className="text-3xl font-bold text-red-600">
                                      ${Number(
                                        selectedProduct.product_sale_price || selectedProduct.product_price
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => goToSelected(selectedProduct)}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                  >
                                    View Full Details
                                  </button>
                                </div>
                              </div>

                              {/* Related Products */}
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
                                      View All
                                      <FaArrowRight size={12} />
                                    </button>
                                  )}
                                </div>
                                <div className="space-y-3">
                                  {relatedProducts.slice(0, 4).map((product) => (
                                    <ProductCard
                                      key={product._id}
                                      product={product}
                                      isCompact={true}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Product List View
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
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors truncate">
                                          {product.product_name}
                                        </p>
                                        <p className="text-xs text-gray-600 truncate">
                                          {product.brand} • ${Number(product.product_sale_price || product.product_price).toFixed(2)}
                                        </p>
                                      </div>
                                      <span className="text-gray-400 group-hover:text-red-600 transition-colors ml-2 flex-shrink-0">
                                        →
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* Related Products */}
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
                                      View All
                                      <FaArrowRight size={12} />
                                    </button>
                                  )}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {relatedProducts.slice(0, 3).map((product) => (
                                    <ProductCard
                                      key={product._id}
                                      product={product}
                                      isCompact={true}
                                    />
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

/* ======================== Main Header Component ======================== */
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homeTimeoutRef = useRef(null);
  const megaTimeoutRef = useRef(null);

  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [brands, setBrands] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const [custProfile, setCustProfile] = useState([]);
  const [homeOpen, setHomeOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const { ID } = useParams();
  const [product, setProduct] = useState();

  const totalQuantity = useSelector(
    (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const user = localStorage.getItem("user");
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const placeholders = [
    "Search for sunglasses...",
    "Search for eyeglasses...",
    "Search for contact lenses...",
    "Search for offers...",
  ];
  const [index, setIndex] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};
      setProduct(prod);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleHomeEnter = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    setHomeOpen(true);
    setMegaOpen(false);
  };

  const handleHomeLeave = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    homeTimeoutRef.current = setTimeout(() => setHomeOpen(false), 300);
  };

  const handleMegaEnter = (key) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveKey(key);
    setMegaOpen(true);
    setHomeOpen(false);
  };

  const handleMegaLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 300);
  };

  useEffect(() => {
    return () => {
      if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
      if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await API.get("/getBrand");
        setBrands(res.data.data || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const megaData = useMemo(
    () => ({
      glasses: {
        columns: [

          {
            title: "Frame Shape",
            links: [
              {
                label: "Aviator",
                to: "/glasses/aviator-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.AVIATOR,
                  subCategoryName: "Aviator Frame",
                  subCategoryImage: SUB_IMG.AVIATOR,
                },
              },
              {
                label: "Cat-Eye",
                to: "/glasses/cat-eye-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.CAT_EYE,
                  subCategoryName: "Cat-Eye Frame",
                  subCategoryImage: SUB_IMG.CAT_EYE,
                },
              },
              {
                label: "Oval",
                to: "/glasses/oval-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.OVAL,
                  subCategoryName: "Oval Frame",
                  subCategoryImage: SUB_IMG.OVAL,
                },
              },
              {
                label: "Rectangle",
                to: "/glasses/rectangle-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.RECTANGLE,
                  subCategoryName: "Rectangle Frame",
                  subCategoryImage: SUB_IMG.RECTANGLE,
                },
              },
              {
                label: "Round",
                to: "/glasses/round-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.ROUND,
                  subCategoryName: "Round Frame",
                  subCategoryImage: SUB_IMG.ROUND,
                },
              },
              {
                label: "Square",
                to: "/glasses/square-frames",
                state: {
                  category: CAT.FRAME_SHAPE,
                  subcategory: SUB.SQUARE,
                  subCategoryName: "Square Frame",
                  subCategoryImage: SUB_IMG.SQUARE,
                },
              },
            ],
          },
          {
            title: "Our Collection",
            links: [
              {
                label: "Blue Glasses",
                to: "/glasses/blue-glasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.BLUE_GLASSES,
                  subCategoryName: "Blue Glasses",
                  subCategoryImage: SUB_IMG.BLUE_GLASSES,
                },
              },
              {
                label: "Eyeglasses",
                to: "/glasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.EYEGLASSES,
                  subCategoryName: "Eyeglasses",
                  subCategoryImage: SUB_IMG.EYEGLASSES,
                },
              },
              {
                label: "Sports Glasses",
                to: "/glasses/sports-glasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.SPORTS_GLASSES,
                  subCategoryName: "Sports Glasses",
                  subCategoryImage: SUB_IMG.SPORTS_GLASSES,
                },
              },
              {
                label: "Sunglasses",
                to: "/sunglasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.SUNGLASSES,
                  subCategoryName: "Sunglasses",
                  subCategoryImage: SUB_IMG.SUNGLASSES,
                },
              },
            ],
          },
          {
            title: "Shop by Category",
            links: [
              {
                label: "Kids Glasses",
                to: "/glasses/kids-glasses",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.KIDS_GLASSES,
                  subCategoryName: "Kids Glasses",
                  subCategoryImage: SUB_IMG.KIDS_GLASSES,
                },
              },
              {
                label: "Men's Frames",
                to: "/glasses/mens-frame",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.MENS_FRAMES,
                  subCategoryName: "Men's Frames",
                  subCategoryImage: SUB_IMG.MENS_FRAME,
                },
              },
              {
                label: "Women's Frames",
                to: "/glasses/womens-frame",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.WOMENS_FRAMES,
                  subCategoryName: "Women's Frames",
                  subCategoryImage: SUB_IMG.WOMENS_FRAME,
                },
              },
            ],
          },
        ],
        promo: {
          image: SUB_IMG.Banner1,
          headline: "Meet the new collections",
          text: "Fresh arrivals inspired by the latest trends.",
          ctaLabel: "Shop Eyeglasses",
          ctaTo: "/glasses",
          state: {
            category: CAT.OUR_COLLECTION,
            subcategory: SUB.EYEGLASSES,
            subCategoryName: "Eyeglasses",
            subCategoryImage: SUB_IMG.EYEGLASSES,
          },
          badge: "NEW",
        },
      },
      sunglasses: {
        columns: [
          {
            title: "Shop",
            links: [
              {
                label: "Blue Glasses",
                to: "/glasses/blue-glasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.BLUE_GLASSES,
                  subCategoryName: "Blue Glasses",
                  subCategoryImage: SUB_IMG.BLUE_GLASSES,
                },
              },
              {
                label: "Sports Glasses",
                to: "/glasses/sports-glasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.SPORTS_GLASSES,
                  subCategoryName: "Sports Glasses",
                  subCategoryImage: SUB_IMG.SPORTS_GLASSES,
                },
              },
              {
                label: "Sunglasses",
                to: "/sunglasses",
                state: {
                  category: CAT.OUR_COLLECTION,
                  subcategory: SUB.SUNGLASSES,
                  subCategoryName: "Sunglasses",
                  subCategoryImage: SUB_IMG.SUNGLASSES,
                },
              },
            ],
          },
          {
            title: "Trending & Seller",
            links: [
              {
                label: "Best Seller",
                to: "/best-sellers",
                state: {
                  category: CAT.SELLER,
                  subcategory: SUB.BEST_SELLER,
                  subCategoryName: "Best Seller",
                  subCategoryImage: SUB_IMG.Best_Seller,
                },
              },
              {
                label: "Trending",
                to: "/trending",
                state: {
                  category: CAT.CURRENTLY_TRENDING,
                  subcategory: SUB.TRENDING,
                  subCategoryName: "Trending",
                  subCategoryImage: SUB_IMG.Trending,
                },
              },
            ],
          },
        ],
        promo: {
          image: SUB_IMG.Banner2,
          headline: "Seasonal offers",
          text: "Save on top silhouettes and lens upgrades.",
          ctaLabel: "Shop Sunglasses",
          ctaTo: "/sunglasses",
          state: {
            category: CAT.OUR_COLLECTION,
            subcategory: SUB.SUNGLASSES,
            subCategoryName: "Sunglasses",
          },
          badge: "SALE",
        },
      },
      contacts: {
        columns: [
          {
            title: "Explore",
            links: [
              {
                label: "Best Seller",
                to: "/best-sellers",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.CONTACT_LENSES,
                  subCategoryName: "Best Seller",
                  subCategoryImage: SUB_IMG.CONTACT_LENSE,
                },
              },
              {
                label: "Trending",
                to: "/trending",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.CONTACT_LENSES,
                  subCategoryName: "Trending",
                  subCategoryImage: SUB_IMG.Contact_Lens,
                },
              },
            ],
          },
          {
            title: "Shop",
            links: [
              {
                label: "Contact Lenses",
                to: "/contact-lenses",
                state: {
                  category: CAT.SHOP_BY_CATEGORY,
                  subcategory: SUB.CONTACT_LENSES,
                  subCategoryName: "Contact Lenses",
                  subCategoryImage: SUB_IMG.Contact_Lens2,
                },
              },
            ],
          },
        ],
        promo: {
          image: SUB_IMG.Banner3,
          headline: "Subscribe & save 20%",
          text: "Auto-delivery with free shipping.",
          ctaLabel: "Shop Contacts",
          ctaTo: "/contact-lenses",
          state: {
            category: CAT.SHOP_BY_CATEGORY,
            subcategory: SUB.CONTACT_LENSES,
            subCategoryName: "Contact Lenses",
          },
          badge: "SAVE",
        },
      },
      brands: {
        columns: [
          {
            title: "Brands",
            dynamic: true,
            links: [],
          },
        ],
        promo: {
          image: SUB_IMG.Banner1,
          headline: "Discover Top Brands",
          text: "Explore premium eyewear brands trusted worldwide.",
          ctaLabel: "View All Brands",
          ctaTo: "/brands",
          badge: "TOP",
        },
      },
    }),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setErrorMsg("");

    if (!value.trim()) {
      setFilteredProducts([]);
      setErrorMsg("");
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setIsLoading(true);
        const res = await API.get(
          `/products/search?search=${encodeURIComponent(value)}`,
          { signal: controller.signal }
        );

        const ok = res?.data?.success;
        if (ok) {
          const list = Array.isArray(res?.data?.products)
            ? res.data.products
            : [];
          setFilteredProducts(list);
          setErrorMsg(!ok || list.length === 0 ? "No products found" : "");
        }
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setErrorMsg("Something went wrong. Try again.");
          setFilteredProducts([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleSearchClick = () => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    navigate(`/search-results?q=${encodeURIComponent(query)}`);
    setSearchModalOpen(false);
    setQuery("");
    setFilteredProducts([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) handleSearchClick();
      return;
    }
    if (e.key === "Escape") {
      setSearchModalOpen(false);
      setQuery("");
      setFilteredProducts([]);
    }
  };

  const handleRemoveSearch = (search) => {
    const updated = recentSearches.filter((s) => s !== search);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const getCustProfile = async () => {
    try {
      const response = await API.get(`/customer/${user}`);
      setCustProfile(response?.data?.data?.profileImage);
    } catch (error) { }
  };

  useEffect(() => {
    getCustProfile();
  }, [user]);

  const goToSelected = (product) => {
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    navigate(
      `/product/${product._id}/${product.subCategoryName || "details"}/${product.subCat_id}`
    );
    setSearchModalOpen(false);
    setQuery("");
    setFilteredProducts([]);
    fetchProducts();
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    handleSearch({ target: { value: search } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen || cartOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [sidebarOpen, cartOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#f00000] py-1 text-white flex justify-between items-center px-4 lg:px-6">
        <div className="mt-1 text-xs sm:text-sm">
          Call Us Today! 1866-242-3545 |
          <a
            href="mailto:info.ataloptical@gmail.com"
            className="text-white hover:underline hover:text-black pl-1"
          >
            sales.ataloptical@gmail.com
          </a>
        </div>
        <div className="flex gap-4 text-lg lg:text-xl">
          {/* <FaFacebookF className="hover:cursor-pointer hover:text-black transition-colors" />
          <FaYoutube className="hover:cursor-pointer hover:text-black transition-colors" />
          <FaSquareInstagram className="hover:cursor-pointer hover:text-black transition-colors" /> */}
          <SocialLinks />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="block lg:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2 gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex-shrink-0 p-2 text-black hover:text-[#f00000] transition-colors"
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>

          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex-grow mx-2 flex items-center gap-2 bg-white border-2 border-red-600 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
            aria-label="Open search"
          >
            <FaSearch size={16} className="text-red-600" />
            <span className="text-sm text-gray-600 truncate">{placeholders[index]}</span>
          </button>

          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!user) {
                  navigate("/login");
                } else {
                  setCartOpen(true);
                }
              }}
              className="p-1"
              aria-label="Open cart"
            >
              <FaCartShopping className="text-[#f00000] hover:text-black text-xl transition-colors" />
            </button>
            {totalQuantity > 0 && user && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold">
                {totalQuantity}
              </span>
            )}
          </div>

          {user ? (
            <Link to="/update-profile" className="flex-shrink-0">
              {custProfile ? (
                <img
                  src={`${IMAGE_URL}${custProfile}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-red-600"
                />
              ) : (
                <FaUser className="text-[#f00000] hover:text-black w-6 h-6 transition-colors" />
              )}
            </Link>
          ) : (
            <button onClick={() => navigate("/login")} className="flex-shrink-0 p-1">
              <FaUser className="text-[#f00000] hover:text-black w-6 h-6 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-lg relative">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              className="object-cover h-[85px] w-[280px]"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>

          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex-grow max-w-2xl mx-6 flex items-center gap-2 bg-white border-2 border-red-600 rounded-full px-6 py-2 hover:bg-gray-50 transition-all group"
            aria-label="Open search"
          >
            <FaSearch size={18} className="text-red-600" />
            <span className="text-gray-600 group-hover:text-red-600 transition-colors">
              {placeholders[index]}
            </span>
          </button>

          <div className="flex items-center gap-6 text-2xl">
            <FaHeart
              onClick={() => navigate("/wishlist-page")}
              className="text-[#f00000] cursor-pointer hover:text-black transition-colors"
            />
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!user) {
                    navigate("/login");
                  } else {
                    setCartOpen(true);
                  }
                }}
                className="p-1 relative"
                aria-label="Open cart"
              >
                <FaCartShopping className="text-[#f00000] cursor-pointer hover:text-black text-2xl transition-colors" />
              </button>
              {totalQuantity > 0 && user && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalQuantity}
                </span>
              )}
            </div>
            {user ? (
              <Link to="/update-profile" className="flex-shrink-0">
                {custProfile ? (
                  <img
                    src={`${IMAGE_URL}${custProfile}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-600 hover:border-black transition-colors"
                  />
                ) : (
                  <FaUser className="text-[#f00000] hover:text-black w-8 h-8 transition-colors" />
                )}
              </Link>
            ) : (
              <button onClick={() => navigate("/login")} className="p-1">
                <FaUser className="text-[#f00000] hover:text-black w-8 h-8 transition-colors" />
              </button>
            )}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1 text-[#f00000] cursor-pointer hover:text-black transition-colors font-semibold"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/order-history">
                  <button className="px-4 py-2 rounded-lg bg-[#f00000] text-white text-sm hover:bg-black transition-colors font-semibold">
                    My Orders
                  </button>
                </Link>
                <button
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("cartItems");
                    navigate("/");
                  }}
                  className="px-4 py-2 rounded-lg bg-[#f00000] text-white text-sm hover:bg-black transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="relative border-t border-gray-200">
          <ul className="flex items-center justify-center gap-10 py-3 font-semibold text-white bg-black tracking-wide text-base flex-wrap">
            <li
              className="relative"
              onMouseEnter={handleHomeEnter}
              onMouseLeave={handleHomeLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={homeOpen}
                onClick={() => navigate("/")}
              >
                Home
                <span className={`inline-block transition-transform duration-200 ${homeOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              <AnimatePresence>
                {homeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white text-gray-900 border rounded-lg shadow-2xl z-50"
                    onMouseEnter={handleHomeEnter}
                    onMouseLeave={handleHomeLeave}
                  >
                    <ul className="py-2">
                      {[
                        { label: "Eye Glasses Contact Policy", path: "/eyeglasses-contact-policy" },
                        { label: "General Information", path: "/general-info" },
                        { label: "Our Mission", path: "/our-mission" },
                        { label: "Our Vision", path: "/our-vision" },
                        { label: "Right Enforcement Policy", path: "/rights-enforcement-policy" },
                        { label: "Vision & Responsibility", path: "/responsibility" },
                      ].map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-red-600 transition-all duration-200"
                            onClick={() => setHomeOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li onMouseEnter={() => handleMegaEnter("glasses")} onMouseLeave={handleMegaLeave}>
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "glasses" ? "text-red-500" : ""
                  }`}
              >
                Glasses
              </button>
            </li>

            <li onMouseEnter={() => handleMegaEnter("sunglasses")} onMouseLeave={handleMegaLeave}>
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "sunglasses" ? "text-red-500" : ""
                  }`}
              >
                Sunglasses
              </button>
            </li>

            <li onMouseEnter={() => handleMegaEnter("contacts")} onMouseLeave={handleMegaLeave}>
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "contacts" ? "text-red-500" : ""
                  }`}
              >
                Contact Lenses
              </button>
            </li>

            <Link to="/contact-us" className="hover:text-red-600 transition-colors">
              <li className="cursor-pointer">Contact Us</li>
            </Link>
            <Link to="/services" className="hover:text-red-600 transition-colors">
              <li className="cursor-pointer">Services</li>
            </Link>
            <Link to="/faq" className="hover:text-red-600 transition-colors">
              <li className="cursor-pointer">FAQ</li>
            </Link>
            <Link to="/how-to-order" className="hover:text-red-600 transition-colors">
              <li className="cursor-pointer">How To Order</li>
            </Link>
            <Link to="/eye-schedule-test" className="hover:text-black hover:bg-white transition-all">
              <li className="cursor-pointer bg-[#f00000] py-1 px-4 rounded-xl">
                BOOK EYE EXAM
              </li>
            </Link>
          </ul>

          <div
            onMouseEnter={() => {
              if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
            }}
            onMouseLeave={handleMegaLeave}
          >
            <MegaMenuPanel
              open={megaOpen}
              onClose={() => setMegaOpen(false)}
              activeKey={activeKey}
              dataByKey={{ ...megaData, brands }}
            />
          </div>
        </nav>
        <PostHeader />
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-gray-900 transform transition-all duration-300 ease-out z-50 overflow-y-auto overscroll-contain shadow-2xl ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
      >
        <div className="flex justify-between pr-2 items-center border-b border-gray-200 bg-white sticky top-0 z-50">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src={logo}
              className="object-cover h-[70px] w-[150px]"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-900 hover:text-[#f00000] transition-colors"
            aria-label="Close menu"
          >
            <IoIosCloseCircle size={28} />
          </button>
        </div>

        <nav className="flex flex-col p-4 text-base font-semibold overscroll-contain">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors">
            Home
          </Link>
          <Link
            to="/glasses"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
            state={{ category: CAT.OUR_COLLECTION, subcategory: SUB.EYEGLASSES, subCategoryName: "Eyeglasses" }}
          >
            Glasses
          </Link>
          <Link
            to="/sunglasses"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
            state={{ category: CAT.OUR_COLLECTION, subcategory: SUB.SUNGLASSES, subCategoryName: "Sunglasses" }}
          >
            Sunglasses
          </Link>
          <Link
            to="/contact-lenses"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
            state={{ category: CAT.SHOP_BY_CATEGORY, subcategory: SUB.CONTACT_LENSES, subCategoryName: "Contact Lenses" }}
          >
            Contact Lenses
          </Link>

          <hr className="border-gray-300 my-2" />

          <Link to="/contact-us" onClick={() => setSidebarOpen(false)} className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
          <Link to="/services" onClick={() => setSidebarOpen(false)} className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors">
            Services
          </Link>
          <Link to="/faq" onClick={() => setSidebarOpen(false)} className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors">
            FAQ
          </Link>
          <Link to="/how-to-order" onClick={() => setSidebarOpen(false)} className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors">
            How To Order
          </Link>

          <Link
            to="/eye-schedule-test"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded bg-[#f00000] hover:bg-red-700 text-white my-2 text-center transition-colors font-semibold"
          >
            BOOK EYE EXAM
          </Link>

          <hr className="border-gray-300 my-2" />

          <button
            onClick={() => {
              navigate("/wishlist-page");
              setSidebarOpen(false);
            }}
            className="px-4 py-3 text-left rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
          >
            Wishlist
          </button>

          <hr className="border-gray-300 my-2" />

          {!user ? (
            <button
              onClick={() => {
                navigate("/login");
                setSidebarOpen(false);
              }}
              className="px-4 py-3 text-left rounded bg-[#f00000] hover:bg-red-700 text-white transition-colors font-semibold"
            >
              Sign In
            </button>
          ) : (
            <>
              <Link
                to="/update-profile"
                onClick={() => setSidebarOpen(false)}
                className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
              >
                My Profile
              </Link>
              <Link
                to="/order-history"
                onClick={() => setSidebarOpen(false)}
                className="px-4 py-3 rounded hover:text-red-600 hover:bg-gray-100 transition-colors"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  localStorage.removeItem("cartItems");
                  navigate("/");
                  setSidebarOpen(false);
                }}
                className="px-4 py-3 text-left rounded bg-red-600 hover:bg-red-700 text-white mt-2 transition-colors font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 ease-out opacity-100"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false);
          setQuery("");
          setFilteredProducts([]);
        }}
        query={query}
        handleSearch={handleSearch}
        handleSearchClick={handleSearchClick}
        handleKeyDown={handleKeyDown}
        filteredProducts={filteredProducts}
        isLoading={isLoading}
        errorMsg={errorMsg}
        goToSelected={goToSelected}
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
        onRemoveSearch={handleRemoveSearch}
        onClearAllSearches={handleClearAllSearches}
        navigate={navigate}
        brands={brands}
      />

      {/* Cart Drawer */}
      {cartOpen && user && (
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}

      {/* Cart Overlay */}
      {cartOpen && user && (
        <div
          className="fixed inset-0 z-[45] transition-opacity duration-300 ease-out opacity-100"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Header;
