import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaSearch,
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

/* ------------------------ Shared Mega Menu Panel ------------------------ */
function MegaMenuPanel({ open, onClose, activeKey, dataByKey }) {
  const panelRef = useRef(null);

  // Outside click
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

  // ESC to close
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
    if (!img) return // if empty value, use local fallback

    // If imported local file (it becomes a full local path or module URL)
    if (typeof img === "string" && img.startsWith("/")) return img;
    if (img.includes("assets") || img.includes("static")) return img;

    // If full external URL
    if (img.startsWith("http")) return img;

    // Otherwise backend stored image → add prefix
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
            {/* Left: link columns */}
            <div className="grid grid-cols-3 gap-6 p-6">
              {menu.columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {col.title}
                  </h4>

                  {/* Dynamic Brand Grid */}
                  {col.dynamic ? (
                    <div className="grid grid-cols-3 gap-4">
                      {brands.slice(0, 9).map((brand) => (
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


            {/* Right: promo */}
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

/* --------------------------------- Header -------------------------------- */
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homeTimeoutRef = useRef(null);
  const megaTimeoutRef = useRef(null);

  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [brands, setBrands] = useState([]);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [custProfile, setCustProfile] = useState([]);

  const { ID, subCategory, subCatId } = useParams();
  const [product, setProduct] = useState()
  const [homeOpen, setHomeOpen] = useState(false);

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

  // Shared mega menu state (fixed position)
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};
      setProduct(prod)
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // 🆕 Handle Home hover open/close with delay
  const handleHomeEnter = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    setHomeOpen(true);
    setMegaOpen(false); // close mega if open
  };

  const handleHomeLeave = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    homeTimeoutRef.current = setTimeout(() => setHomeOpen(false), 300); // short delay
  };

  // 🆕 Handle Mega menu open/close (hover friendly)
  const handleMegaEnter = (key) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveKey(key);
    setMegaOpen(true);
    setHomeOpen(false); // ensure Home closes when Mega opens
  };

  const handleMegaLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 300);
  };

  // Cleanup timeouts on unmount
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

  // Build data for each mega menu tab
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
            dynamic: true, // 👈 we'll handle dynamic brand rendering separately
            links: [], // will be populated via API
          },
        ],
        promo: {
          image: SUB_IMG.Banner1, // use any banner you already have
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


  const openMega = (key) => {
    // Toggle if same key clicked; otherwise open with new key
    setMegaOpen((prev) => (activeKey === key ? !prev : true));
    setActiveKey(key);
  };
  const closeMega = () => setMegaOpen(false);

  /* ------------------------------ Search logic ------------------------------ */
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setErrorMsg("");

    if (!value.trim()) {
      setFilteredProducts([]);
      setShowResults(false);
      setActiveIdx(-1);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    if (window.innerWidth >= 1024) setOpenDesktop(true);
    else setOpenMobile(true);
    setShowResults(true);

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
          setActiveIdx(list.length ? 0 : -1);
          setErrorMsg(!ok || list.length === 0 ? "No results found" : "");
        }
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setErrorMsg("Something went wrong. Try again.");
          setFilteredProducts([]);
          setActiveIdx(-1);
        }
      } finally {
        setIsLoading(false);
      }
    }, 250);
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
    navigate(`/product/${product._id}/${product.subCategoryName || "details"}/${product.subCat_id}`);
    setShowResults(false);
    setOpenDesktop(false);
    setOpenMobile(false);
    setActiveIdx(-1);
    setQuery("");
    fetchProducts();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate("/login");
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    navigate("/");
  };

  const handleWishlist = () => {
    navigate("/wishlist-page");
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (query) {
      if (window.innerWidth >= 1024) setOpenDesktop(true);
      else setOpenMobile(true);
    } else {
      setOpenDesktop(false);
      setOpenMobile(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target)
      ) {
        setOpenDesktop(false);
        setShowResults(false);
        setActiveIdx(-1);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setOpenMobile(false);
        setShowResults(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#f00000] py-1 text-white flex justify-between items-center px-4 lg:px-6">
        <div className="mt-1 text-md">
          Call Us Today! 1866-242-3545 |
          <a
            href="mailto:info.ataloptical@gmail.com"
            className="text-white hover:underline hover:text-black pl-1"
          >
            sales.ataloptical@gmail.com
          </a>
        </div>
        <div className="flex gap-4 text-lg lg:text-xl">
          <SocialLinks />
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-xl relative">
        <div className="flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              className="object-cover h-[80px] w-[240px] hover:cursor-pointer"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl" ref={desktopSearchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder={["Search for sunglasses...", "Search for eyeglasses...", "Search for contact lenses...", "Search for offers..."][index]}
                value={query || ""}
                onChange={handleSearch}
                onKeyDown={(e) => {
                  if (!showResults || filteredProducts.length === 0) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIdx((prev) => (prev + 1) % filteredProducts.length);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIdx(
                      (prev) =>
                        (prev - 1 + filteredProducts.length) %
                        filteredProducts.length
                    );
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    const chosen =
                      filteredProducts[activeIdx] || filteredProducts[0];
                    if (chosen) goToSelected(chosen);
                  } else if (e.key === "Escape") {
                    setShowResults(false);
                    setOpenDesktop(false);
                    setActiveIdx(-1);
                  }
                }}
                className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-6 pr-10 placeholder-gray-500 focus:outline-none ring-2 ring-red-600 text-black"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:cursor-pointer" />

              {openDesktop && showResults && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                  {isLoading ? (
                    <p className="px-4 py-3 text-gray-500">Searching…</p>
                  ) : errorMsg ? (
                    <p className="px-4 py-3 text-gray-500">{errorMsg}</p>
                  ) : filteredProducts.length > 0 ? (
                    <ul className="max-h-80 overflow-auto py-1">
                      {filteredProducts.map((product, idx) => (
                        <li
                          key={product._id || idx}
                          className={`px-4 py-2 cursor-pointer flex items-center gap-3 ${activeIdx === idx ? "bg-gray-100" : "hover:bg-gray-50"
                            }`}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => goToSelected(product)}
                        >
                          {product.product_image_collection?.[0] ? (
                            <img
                              src={
                                product.product_image_collection[0].startsWith(
                                  "http"
                                )
                                  ? product.product_image_collection[0]
                                  : `${IMAGE_URL}/${product.product_image_collection[0]}`
                              }
                              alt={product.product_name}
                              className="w-20 h-10 object-cover rounded"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded" />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm text-gray-900 truncate">
                              {product.product_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {product.brand || product.categoryName || "Product"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-3 text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-2xl">
            <FaHeart
              onClick={handleWishlist}
              className="text-[#f00000] cursor-pointer hover:text-black"
            />
            <div className="relative">
              <FaCartShopping
                onClick={() => setCartOpen(true)}
                className="text-[#f00000] cursor-pointer hover:text-black text-2xl"
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            {user ? (
              <Link to="/update-profile">
                {custProfile ? (
                  <img
                    src={`${IMAGE_URL}${custProfile}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border border-red-600"
                  />
                ) : (
                  <FaUser className="text-[#f00000] hover:text-black w-8 h-8" />
                )}
              </Link>
            ) : (
              <button onClick={() => navigate("/login")}>
                <FaUser className="text-[#f00000] hover:text-black w-8 h-8" />
              </button>
            )}
            {!user ? (
              <div
                onClick={() => {
                  navigate("/login");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-1 text-[#f00000] cursor-pointer hover:text-black"
              >
                <span className="hover:underline">Sign In</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/order-history">
                  <button className="px-4 py-2 rounded-lg bg-[#f00000] text-white text-sm hover:bg-black">
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
                  className="px-4 py-2 rounded-lg bg-[#f00000] text-white text-sm hover:bg-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="relative">
          <ul className="flex items-center justify-center gap-10 py-3 font-semibold text-white bg-black tracking-wide text-base">
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
                <span
                  className={`inline-block transition-transform duration-200 ${homeOpen ? "rotate-180" : ""
                    }`}
                >
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

            {/* 👓 Glasses Mega Menu */}
            <li
              onMouseEnter={() => handleMegaEnter("glasses")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 ${megaOpen && activeKey === "glasses" ? "text-red-500" : ""
                  }`}
              >
                Glasses
              </button>
            </li>

            {/* 🕶 Sunglasses Mega Menu */}
            <li
              onMouseEnter={() => handleMegaEnter("sunglasses")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 ${megaOpen && activeKey === "sunglasses" ? "text-red-500" : ""
                  }`}
              >
                Sunglasses
              </button>
            </li>

            {/* 👁 Contact Lenses */}
            <li
              onMouseEnter={() => handleMegaEnter("contacts")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 ${megaOpen && activeKey === "contacts" ? "text-red-500" : ""
                  }`}
              >
                Contact Lenses
              </button>
            </li>

            <Link to="/contact-us">
              <li className="cursor-pointer hover:text-red-600">Contact Us</li>
            </Link>
            <Link to="/services">
              <li className="cursor-pointer hover:text-red-600">Services</li>
            </Link>
            <Link to="/faq">
              <li className="cursor-pointer hover:text-red-600">FAQ</li>
            </Link>
            <Link to="/how-to-order">
              <li className="cursor-pointer hover:text-red-600">How To Order</li>
            </Link>
            <Link to="/eye-schedule-test">
              <li className="cursor-pointer hover:text-black hover:bg-white bg-[#f00000] py-1 px-4 rounded-xl">
                BOOK EYE EXAM
              </li>
            </Link>
          </ul>

          {/* Shared Mega Menu Panel (with hover-safe closing) */}
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
              dataByKey={megaData}
              brands={brands} // ✅ pass brands now
            />
          </div>
        </nav>
        <PostHeader />
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 text-center`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-white">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src={logo}
              className="object-cover h-[60px] w-[100px]"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <IoIosCloseCircle
            size={30}
            className="cursor-pointer hover:text-red-600 text-black"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-4 p-4 text-lg font-semibold">
          <Link to="/"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600">Home</Link>

          <Link to="/glasses"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600"
            state={{
              category: CAT.OUR_COLLECTION,
              subcategory: SUB.EYEGLASSES,
              subCategoryName: "Eyeglasses"
            }}>Glasses</Link>

          <Link to="/sunglasses"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600"
            state={{
              category: CAT.OUR_COLLECTION,
              subcategory: SUB.SUNGLASSES, subCategoryName: "Sunglasses"
            }}>Sunglasses</Link>

          <Link to="/contact-lenses"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600"
            state={{
              category: CAT.SHOP_BY_CATEGORY,
              subcategory: SUB.CONTACT_LENSES,
              subCategoryName: "Contact Lenses"
            }}>Contact Lenses</Link>

          <Link to="/contact-us"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600">Contact Us</Link>

          <Link to="/faq"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600">FAQ</Link>

          <Link to="/services"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-600">Services</Link>


          <Link to="/eye-exams"
            onClick={() => setSidebarOpen(false)}
            className="py-2 px-4 rounded-lg hover:text-red-600">BOOK EYE EXAM</Link>

          <li>
            <button onClick={() => navigate("/wishlist-page")} className="hover:text-red-600">WISHLIST</button>
          </li>
          <li>
            <button onClick={() => setCartOpen(true)} className="hover:text-red-600">CART</button>
          </li>
          <li>
            {!user ? (
              <button onClick={() => navigate("/login")} className="hover:text-red-600">Sign In</button>
            ) : (
              <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
            )}
          </li>
        </ul>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Overlay */}
      {
        sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )
      }
    </>
  );
}

export default Header;


