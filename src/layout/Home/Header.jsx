import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaUser, FaHeart, FaSearch, FaBars } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "../../assets/category/logo.png";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "./CartDrawer";
import API, { IMAGE_URL } from "../../API/Api";
import { motion, AnimatePresence } from "framer-motion";
import { CAT, SUB, SUB_IMG } from "../../constants/catalogIds";
import PostHeader from "./PostHeader";
import SocialLinks from "../../page/SocialMedia/SocialLinks";
import MegaMenuPanel from "./headerHelper/MegaMenuPanel";
import SearchModal from "./headerHelper/SearchModal";

/* ======================== Main Header Component ======================== */
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [mobileDropdown, setMobileDropdown] = useState({
    glasses: false,
    sunglasses: false,
    contact_lenses: false,
    brands: false,
    about: false,
    home: false,
    policyMobile: false
  });

  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTimeoutRef = useRef(null);

  const [locationOpen, setLocationOpen] = useState(false);
  const locationTimeoutRef = useRef(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef(null);

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

  const [policySubOpen, setPolicySubOpen] = useState(false);
  const policySubTimeoutRef = useRef(null);

  const [grouped, setGrouped] = useState([]);

  const { ID } = useParams();
  const [product, setProduct] = useState();

  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
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

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await API.get("/getallsubcategory");
        const subs = res.data?.subcategories || [];

        const categoryMap = {};

        subs.forEach((sub) => {
          const cat = sub.category;

          // ?? Skip if category object or _id is missing (fix for live error)
          if (!cat || !cat._id) return;

          if (!categoryMap[cat._id]) {
            categoryMap[cat._id] = {
              categoryId: cat._id,
              _id: cat._id,
              categoryName: cat.categoryName,
              categoryImage: cat.categoryImage,
              subCategories: [],
            };
          }

          categoryMap[cat._id].subCategories.push({
            id: sub._id,
            name: sub.name,
            image: sub.image,
            slug: sub.slug,
          });
        });

        setGrouped(Object.values(categoryMap));
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchSubcategories();
  }, []);

  const handleHomeEnter = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    setHomeOpen(true);
    setMegaOpen(false);
  };

  const handleHomeLeave = () => {
    if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
    homeTimeoutRef.current = setTimeout(() => setHomeOpen(false), 300);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 300);
  };


  const handlePolicySubEnter = () => {
    if (policySubTimeoutRef.current) clearTimeout(policySubTimeoutRef.current);
    setPolicySubOpen(true);
  };

  const handlePolicySubLeave = () => {
    if (policySubTimeoutRef.current) clearTimeout(policySubTimeoutRef.current);
    policySubTimeoutRef.current = setTimeout(() => {
      setPolicySubOpen(false);
    }, 300);
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

  const toggleMobileDropdown = (key) => {
    setMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    return () => {
      if (homeTimeoutRef.current) clearTimeout(homeTimeoutRef.current);
      if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
      if (policySubTimeoutRef.current)
        clearTimeout(policySubTimeoutRef.current);
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

  //  MEGA MENU DATA WITH FRAME SHAPE FILTERING
  const megaData = useMemo(
    () => ({
      glasses: {
        columns: [
          {
            id: 101,
            title: "Shop By Face Shape",
            links: [
              { id: 1011, label: "Heart Face", faceShape: "heart" },
              { id: 1012, label: "Oval Face", faceShape: "oval" },
              { id: 1013, label: "Round Face", faceShape: "round" },
              { id: 1014, label: "Square Face", faceShape: "square" },
              { id: 1015, label: "Triangle Face", faceShape: "triangle" },
            ],
          },

          {
            id: 102,
            title: "Shop by Category",
            links: [
              { id: 1021, label: "Men's Glasses", gender: "men" },
              { id: 1022, label: "Women's Glasses", gender: "women" },
            ],
          },

          {
            id: 103,
            title: "Shop By Lens Type",
            links: [
              {
                id: 1031,
                label: "Blue-violet light glasses",
                lens_type: "blue violet",
              },
              { id: 1032, label: "Progressive", lens_type: "progressive" },
              {
                id: 1033,
                label: "Transitions® Glasses",
                lens_type: "transitions",
              },
            ],
          },
        ],

        promo: {
          id: 199,
          image: SUB_IMG.Banner1,
          headline: "Meet the new collections",
          text: "Fresh arrivals inspired by the latest trends.",
          ctaLabel: "Shop Eyeglasses",
          ctaTo: "/allproduct/Eyeglasses/69157332eeb23fa59c7d5326",
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
            id: 201,
            title: "Shop by Our Picks",
            links: [
              { id: 2011, label: "Best Seller", collection: "best-seller" },
              {
                id: 2012,
                label: "Ray-Ban",
                collection: "690c6e4bce83c44ad440e022",
              },
              { id: 2013, label: "Trending", collection: "trending" },
              {
                id: 2014,
                label: "Versace",
                collection: "690c6e7ece83c44ad440e028",
              },
            ],
          },
          {
            id: 203,
            title: "Shop by Frame Shape",
            links: [
              { id: 2031, label: "Aviator", frame_shape: "aviator" },
              { id: 2032, label: "Cat-Eye", frame_shape: "cat-eye" },
              { id: 2033, label: "Oval", frame_shape: "oval" },
              { id: 2034, label: "Rectangle", frame_shape: "rectangle" },
              { id: 2035, label: "Round", frame_shape: "round" },
              { id: 2036, label: "Square", frame_shape: "square" },
            ],
          },
        ],

        promo: {
          id: 299,
          image: SUB_IMG.Banner2,
          headline: "Seasonal offers",
          text: "Save on top silhouettes and lens upgrades.",
          ctaLabel: "Shop Sunglasses",
          ctaTo: "/allproduct/Sunglasses/6915705d9ceac0cdda41c83f",
          state: {
            category: CAT.OUR_COLLECTION,
            subcategory: SUB.SUNGLASSES,
            subCategoryName: "Sunglasses",
          },
          badge: "SALE",
        },
      },

      contact_lenses: {
        columns: [
          {
            id: 301,
            title: "Shop by Lens Category",
            links: [
              {
                id: 3012,
                label: "Daily",
                lens_cat: "daily",
                catId: "6915735feeb23fa59c7d532b",
              },
              {
                id: 3011,
                label: "Biweekly / Weekly",
                lens_cat: "weekly" || "biweekly",
                catId: "6915735feeb23fa59c7d532b",
              },
              {
                id: 3013,
                label: "Monthly",
                lens_cat: "monthly",
                catId: "6915735feeb23fa59c7d532b",
              },
            ],
          },
          {
            id: 302,
            title: "Top Brands",
            links: [
              {
                id: 3022,
                label: "Air Optix",
                brandId: "690c6ee3ce83c44ad440e031",
              },
              {
                id: 3021,
                label: "Acuvue",
                brandId: "690c6ecece83c44ad440e02e",
              },
              {
                id: 3023,
                label: "Biofinity",
                brandId: "690c6efbce83c44ad440e034",
              },
              {
                id: 3024,
                label: "Dailies",
                brandId: "690c706cce83c44ad440e03d",
              },
              {
                id: 3025,
                label: "Everclear",
                brandId: "690c708ace83c44ad440e040",
              },
              {
                id: 3026,
                label: "MayDay",
                brandId: "690c70a0ce83c44ad440e043",
              },
              {
                id: 3027,
                label: "Splash",
                brandId: "690c70fbce83c44ad440e04c",
              },
              {
                id: 3028,
                label: "Total30",
                brandId: "690c7110ce83c44ad440e04f",
              },
            ],
          },
        ],

        promo: {
          id: 399,
          image: SUB_IMG.Banner3,
          headline: "Subscribe & save 20%",
          text: "Auto-delivery with free shipping.",
          ctaLabel: "Shop Contact Lenses",
          ctaTo: "/allproduct/Contact-Lenses/6915735feeb23fa59c7d532b",
          badge: "SAVE",
        },
      },

      brands: {
        columns: [
          {
            id: 401,
            title: "Top Brands",
            links: [
              {
                id: 4011,
                label: "Armani Exchange",
                brandId: "690c6d6dce83c44ad440e002",
              },
              {
                id: 4012,
                label: "Michael Kors",
                brandId: "690c6de1ce83c44ad440e016",
              },
              {
                id: 4013,
                label: "Oakley",
                brandId: "690c6dface83c44ad440e019",
              },
              {
                id: 4014,
                label: "Ray-Ban",
                brandId: "690c6e4bce83c44ad440e022",
              },
              {
                id: 4015,
                label: "Versace",
                brandId: "690c6e7ece83c44ad440e028",
              },
              {
                id: 4016,
                label: "Vogue-Eyewear",
                brandId: "690c6ea9ce83c44ad440e02b",
              },
            ],
          },
          {
            id: 402,
            title: "Shop by Brands",
            links: [
              {
                id: 4021,
                label: "Armani Exchange",
                brandId: "690c6d6dce83c44ad440e002",
              },
              {
                id: 4022,
                label: "Arnette",
                brandId: "690c6d9bce83c44ad440e010",
              },
              {
                id: 4023,
                label: "Coach NewYork",
                brandId: "690c6dc6ce83c44ad440e013",
              },
              {
                id: 4024,
                label: "Michael Kors",
                brandId: "690c6de1ce83c44ad440e016",
              },
              {
                id: 4025,
                label: "Oakley",
                brandId: "690c6dface83c44ad440e019",
              },
              {
                id: 4026,
                label: "Persol",
                brandId: "690c6e0ece83c44ad440e01c",
              },
              {
                id: 4027,
                label: "Polo Ralph Lauren",
                brandId: "690c6e35ce83c44ad440e01f",
              },
              {
                id: 4028,
                label: "Ray-Ban",
                brandId: "690c6e4bce83c44ad440e022",
              },
              {
                id: 4029,
                label: "Tory Burch",
                brandId: "690c6e67ce83c44ad440e025",
              },
              {
                id: 4030,
                label: "Versace",
                brandId: "690c6e7ece83c44ad440e028",
              },
              {
                id: 4031,
                label: "Vogue-Eyewear",
                brandId: "690c6ea9ce83c44ad440e02b",
              },
            ],
          },
        ],

        promo: {
          id: 499,
          image: SUB_IMG.Banner4,
          headline: "Shop the Best Brands",
          text: "Explore our top eyewear brands with exclusive styles and premium quality.",
          ctaLabel: "View All Brands",
          ctaTo: "/allBrands/allProduct",
        },
      },
    }),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setErrorMsg("");

    // if empty query -> clear everything and abort outstanding requests
    if (!value.trim()) {
      setFilteredProducts([]);
      setErrorMsg("");
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    // clear previous debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        // abort previous fetch
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setIsLoading(true);

        const res = await API.get(
          `/products/search?search=${encodeURIComponent(value)}`,
          { signal: controller.signal }
        );

        const ok = res?.data?.success;
        const serverList = Array.isArray(res?.data?.products)
          ? res.data.products
          : [];

        // helper to get product display name (adjust if your API uses a different key)
        const getName = (p) =>
          (p?.name || p?.title || p?.product_name || "").toString();

        // prefix filter: only keep products whose name starts with the query
        const qLower = value.toLowerCase();
        const filteredByPrefix = serverList.filter((p) =>
          getName(p).toLowerCase().startsWith(qLower)
        );

        setFilteredProducts(filteredByPrefix);

        if (!ok || filteredByPrefix.length === 0) {
          setErrorMsg("No products found");
        } else {
          setErrorMsg("");
        }
      } catch (err) {
        // ignore abort errors
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
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
      0,
      10
    );
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
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
      0,
      10
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    navigate(
      `/product/${product._id}/${product.subCategoryName || "details"}/${product.subCat_id
      }`
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

  const handleAboutEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    aboutTimeoutRef.current = setTimeout(() => setAboutOpen(false), 300);
  };

  const handleLocationEnter = () => {
    if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
    setLocationOpen(true);
  };

  const handleLocationLeave = () => {
    if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
    locationTimeoutRef.current = setTimeout(() => setLocationOpen(false), 300);
  };


  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current); // 👈 NEW
    };
  }, []);


  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#f00000] py-1 text-white flex justify-between items-center px-4 lg:px-6">
        <div className="mt-1 text-xs sm:text-sm">
          Call Us Today! 1866-242-3545 |
          <a
            href="mailto: sales.ataloptical@gmail.com"
            className="text-white hover:underline hover:text-black pl-1"
          >
            sales.ataloptical@gmail.com
          </a>
          <span> |</span>
          <a
            href="mailto:info.ataloptical@gmail.com"
            className="text-white hover:underline hover:text-black pl-1"
          >
            info.ataloptical@gmail.com
          </a>
        </div>

        <SearchModal />

        <div className="flex gap-4 text-lg lg:text-xl">
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
            <span className="text-sm text-gray-600 truncate">
              {placeholders[index]}
            </span>
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
            <button
              onClick={() => navigate("/login")}
              className="flex-shrink-0 p-1"
            >
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
          <ul className="flex items-center justify-center gap-7 py-2 font-semibold text-white bg-black tracking-wide text-base flex-wrap">
            <li
              className="relative"
              onMouseEnter={handleHomeEnter}
              onMouseLeave={handleHomeLeave}
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={homeOpen}
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
                    className="absolute left-1/2 -translate-x-1/2 mt-3 ml-11 w-47 bg-white text-gray-900 border rounded-lg shadow-2xl z-50"
                  >
                    <ul className="py-2">
                      {/* Regular Home submenu items */}
                      <li>
                        <Link
                          to="/general-info"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          General Information
                        </Link>
                      </li>

                      {/* ===========================
               CORPORATE POLICY SUBMENU
          ============================ */}
                      <li
                        className="relative"
                        onMouseEnter={handlePolicySubEnter}
                        onMouseLeave={handlePolicySubLeave}
                      >
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex justify-between items-center"
                        >
                          Corporate Policy
                          <span
                            className={`inline-block text-lg transition-transform duration-200 ${policySubOpen ? "rotate-150" : ""
                              }`}
                          >
                            ▾
                          </span>
                        </button>

                        {/* RIGHT SUBMENU WITH 2 SECOND DELAY */}
                        {policySubOpen && (
                          <div
                            className="absolute top-0 left-full ml-1 w-56 bg-white border rounded-lg shadow-2xl transition-all z-50"
                            onMouseEnter={handlePolicySubEnter}
                            onMouseLeave={handlePolicySubLeave}
                          >
                            <ul className="py-2">
                              <li>
                                <Link
                                  to="/cookies-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Cookies Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/disclaimer-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Disclaimer Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/exchange-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Exchange Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/eyeglasses-contact-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Eyeglasses Contact Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/privacy-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Privacy Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/return-exchange"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Return, Exchange & Consumer Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/rights-enforcement-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Right Enforcement Policy
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to="/shipping-policy"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  Shipping Policy
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </li>

                      <li>
                        <Link
                          to="/optical-policy"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Optical Policy
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li
              className="relative"
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <Link to="/about-us">
                <button
                  type="button"
                  className="flex items-center gap-1 cursor-pointer hover:text-red-600 transition-colors"
                >
                  About Us
                  <span
                    className={`inline-block transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▾
                  </span>
                </button>
              </Link>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white text-gray-900 border rounded-lg shadow-2xl z-50"
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/our-mission"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Our Mission
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/our-vision"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Our Vision
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/responsibility"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Vision & Responsibility
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>


            <li
              className="relative"
              onMouseEnter={handleLocationEnter}
              onMouseLeave={handleLocationLeave}
            >
              <button type="button" className="flex items-center gap-1">
                Location ▾
              </button>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border rounded-lg shadow-2xl z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={() => navigate(`${location.pathname}?location=all`)}
                          className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate(`${location.pathname}?location=east`)}
                          className="block w-full text-left px-4 py-2 text-black text-sm hover:bg-gray-100"
                        >
                          East
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate(`${location.pathname}?location=west`)}
                          className="block w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          West
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>





            <li
              onMouseEnter={() => handleMegaEnter("glasses")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "glasses" ? "text-red-500" : ""
                  }`}
              >
                Glasses
              </button>
            </li>

            <li
              onMouseEnter={() => handleMegaEnter("sunglasses")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "sunglasses" ? "text-red-500" : ""
                  }`}
              >
                Sunglasses
              </button>
            </li>

            <li
              onMouseEnter={() => handleMegaEnter("contact_lenses")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "contact_lenses"
                  ? "text-red-500"
                  : ""
                  }`}
              >
                Contact Lenses
              </button>
            </li>

            <li
              onMouseEnter={() => handleMegaEnter("brands")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={`cursor-pointer hover:text-red-600 transition-colors ${megaOpen && activeKey === "brands" ? "text-red-500" : ""
                  }`}
              >
                Brands
              </button>
            </li>

            <li
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link to="/services">
                <button
                  type="button"
                  className="flex items-center gap-1 cursor-pointer hover:text-red-600 transition-colors"
                >
                  Services
                  <span
                    className={`inline-block transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▾
                  </span>
                </button>
              </Link>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white text-gray-900 border rounded-lg shadow-2xl z-50"
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/optical-education"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Optical Education
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/our-community"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Our Community
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/insurance-policies"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Insurance Policies
                        </Link>
                      </li>


                      <li>
                        <Link
                          to="/free-eye-exam"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Free Eye Exam
                        </Link>
                      </li>

                      {/* <li>
                        <Link
                          to="/blog"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Blog
                        </Link>
                      </li> */}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <Link
              to="/faq"
              className="hover:text-red-600 transition-colors"
            >
              <li className="cursor-pointer">FAQ</li>
            </Link>

            <Link
              to="/how-to-order"
              className="hover:text-red-600 transition-colors"
            >
              <li className="cursor-pointer">How To Order</li>
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-red-600 transition-colors"
            >
              <li className="cursor-pointer">Contact Us</li>
            </Link>

            <Link
              to="/eye-schedule-test"
              className="hover:text-black transition-colors"
            >
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
              dataByKey={megaData}
              grouped={grouped}
              brands={brands}
            />
          </div>
        </nav>
        <PostHeader />
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-white text-gray-900 transform transition-all duration-300 ease-out z-50 shadow-2xl ${sidebarOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
          }`}
      >
        {/* FIXED HEADER */}
        <div className="flex justify-between items-center bg-white h-[70px] border-b border-gray-200 px-3 sticky top-0 z-50">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src={logo}
              className="object-cover h-[70px] w-[150px]"
              alt="Logo"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-900 hover:text-[#f00000]"
          >
            <IoIosCloseCircle size={28} />
          </button>
        </div>

        {/* FULL SCROLLABLE AREA */}
        <div className="overflow-y-auto h-[calc(100vh-70px)] px-1 pb-24">
          {/* NAVIGATION LIST */}
          <nav className="flex flex-col p-4 text-base font-semibold overscroll-contain">

            {/* HOME DROPDOWN */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("home")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                Home
                <span>{mobileDropdown.home ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.home && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">

                  {/* GENERAL INFORMATION */}
                  <Link
                    to="/general-info"
                    onClick={() => setSidebarOpen(false)}
                    className="py-1 px-2 rounded hover:bg-gray-100"
                  >
                    General Information
                  </Link>

                  {/* CORPORATE POLICY DROPDOWN */}
                  <button
                    onClick={() => toggleMobileDropdown("policyMobile")}
                    className="w-full flex justify-between items-center py-2 rounded hover:bg-gray-100"
                  >
                    Corporate Policy
                    <span>{mobileDropdown.policyMobile ? "▲" : "▼"}</span>
                  </button>

                  {mobileDropdown.policyMobile && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">

                      <Link to="/cookies-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Cookies Policy
                      </Link>

                      <Link to="/disclaimer-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Disclaimer Policy
                      </Link>

                      <Link to="/exchange-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Exchange Policy
                      </Link>

                      <Link to="/eyeglasses-contact-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Eyeglasses Contact Policy
                      </Link>

                      <Link to="/privacy-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Privacy Policy
                      </Link>

                      <Link to="/return-exchange" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Return, Exchange & Consumer Policy
                      </Link>

                      <Link to="/rights-enforcement-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Right Enforcement Policy
                      </Link>

                      <Link to="/shipping-policy" onClick={() => setSidebarOpen(false)} className="py-1 px-2 rounded hover:bg-gray-100">
                        Shipping Policy
                      </Link>

                    </div>
                  )}

                  {/* OPTICAL POLICY */}
                  <Link
                    to="/optical-policy"
                    onClick={() => setSidebarOpen(false)}
                    className="py-1 px-2 rounded hover:bg-gray-100"
                  >
                    Optical Policy
                  </Link>

                </div>
              )}
            </div>


            {/* ABOUT US */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("about")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                About Us
                <span>{mobileDropdown.about ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.about && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                  <Link
                    to="/our-mission"
                    onClick={() => setSidebarOpen(false)}
                    className="py-1 px-2 rounded hover:bg-gray-100"
                  >
                    Our Mission
                  </Link>

                  <Link
                    to="/our-vision"
                    onClick={() => setSidebarOpen(false)}
                    className="py-1 px-2 rounded hover:bg-gray-100"
                  >
                    Our Vision
                  </Link>

                  <Link
                    to="/responsibility"
                    onClick={() => setSidebarOpen(false)}
                    className="py-1 px-2 rounded hover:bg-gray-100"
                  >
                    Vision & Responsibility
                  </Link>
                </div>
              )}
            </div>


            {/* GLASSES */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("glasses")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                Glasses
                <span>{mobileDropdown.glasses ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.glasses && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                  {megaData.glasses.columns.map((col) =>
                    col.links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          navigate("/glasses", { state: link });
                          setSidebarOpen(false);
                        }}
                        className="py-1 px-2 rounded hover:bg-gray-100 text-left"
                      >
                        {link.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* SUNGLASSES */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("sunglasses")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                Sunglasses
                <span>{mobileDropdown.sunglasses ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.sunglasses && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                  {megaData.sunglasses.columns.map((col) =>
                    col.links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          navigate("/sunglasses", { state: link });
                          setSidebarOpen(false);
                        }}
                        className="py-1 px-2 rounded hover:bg-gray-100 text-left"
                      >
                        {link.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* CONTACT LENSES */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("contact_lenses")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                Contact Lenses
                <span>{mobileDropdown.contact_lenses ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.contact_lenses && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                  {megaData.contact_lenses.columns.map((col) =>
                    col.links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          navigate("/contact-lenses", { state: link });
                          setSidebarOpen(false);
                        }}
                        className="py-1 px-2 rounded hover:bg-gray-100 text-left"
                      >
                        {link.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* BRANDS */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleMobileDropdown("brands")}
                className="w-full flex justify-between items-center py-2 hover:text-red-600"
              >
                Brands
                <span>{mobileDropdown.brands ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown.brands && (
                <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                  {megaData.brands.columns.map((col) =>
                    col.links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          navigate(`/brands/${link.brandId}`);
                          setSidebarOpen(false);
                        }}
                        className="py-1 px-2 rounded hover:bg-gray-100 text-left"
                      >
                        {link.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* EXTRA LINKS */}
            <hr className="my-2" />

            <Link
              to="/contact-us"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
            >
              Services
            </Link>
            <Link
              to="/faq"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
            >
              FAQ
            </Link>
            <Link
              to="/how-to-order"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
            >
              How To Order
            </Link>

            {/* BOOK TEST */}
            <Link
              to="/eye-schedule-test"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 my-2 text-center bg-[#f00000] text-white rounded hover:bg-red-700"
            >
              BOOK EYE EXAM
            </Link>

            <hr className="my-2" />

            {/* WISHLIST */}
            <button
              onClick={() => {
                navigate("/wishlist-page");
                setSidebarOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 text-left"
            >
              Wishlist
            </button>

            <hr className="my-2" />

            {/* LOGIN / LOGOUT */}
            {!user ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setSidebarOpen(false);
                }}
                className="px-4 py-3 bg-[#f00000] text-white rounded hover:bg-red-700"
              >
                Sign In
              </button>
            ) : (
              <>
                <Link
                  to="/update-profile"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
                >
                  My Profile
                </Link>

                <Link
                  to="/order-history"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 hover:bg-gray-100 hover:text-red-600 rounded"
                >
                  My Orders
                </Link>

                <button
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    localStorage.clear();
                    navigate("/");
                    setSidebarOpen(false);
                  }}
                  className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 mt-2 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
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
