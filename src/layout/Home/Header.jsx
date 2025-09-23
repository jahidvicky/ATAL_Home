import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaSearch,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareInstagram, FaBars } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/category/logo.png";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "./CartDrawer";
import API, { IMAGE_URL } from "../../API/Api";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const searchRef = useRef(null);
  const desktopSearchRef = useRef(null);
const mobileSearchRef = useRef(null);

  // const [open, setOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(false);
const [openMobile, setOpenMobile] = useState(false);

  const [custProfile, setCustProfile] = useState([])

  // cart quantity from redux
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // auth state from redux (example: state.auth.user)
  const user = localStorage.getItem("user");

  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // rotating placeholder logic
  const placeholders = [
    "Search for sunglasses...",
    "Search for eyeglasses...",
    "Search for contact lenses...",
    "Search for offers...",
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      try {
        const res = await API.get(`/products/search?search=${value}`);
        if (res.data.success) {
          setFilteredProducts(
            Array.isArray(res.data.products) ? res.data.products : []
          );
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };


  const getCustProfile = async () => {
    try {
      const response = await API.get(`/customer/${user}`)
      // console.log(response.data.data.profileImage);

      setCustProfile(response.data.data.profileImage)
    } catch (error) {

    }
  }

  useEffect(() => {
    getCustProfile()
  }, [])


  const handleSelect = (product) => {
    setQuery(product.name);
    setFilteredProducts([]); // hide dropdown after selection
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setFade(false);
      }, 300);
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

  const handleCartMenu = () => {
    setCartOpen(true);
    setSidebarOpen(false);
  };

  // useEffect(() => {
  //   if (query) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // }, [query]);

   useEffect(() => {
  if (query) {
    if (window.innerWidth >= 1024) {
      setOpenDesktop(true);
    } else {
      setOpenMobile(true);
    }
  } else {
    setOpenDesktop(false);
    setOpenMobile(false);
  }
}, [query]);


  useEffect(() => {
  function handleClickOutside(event) {
    if (
      desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)
    ) {
      setOpenDesktop(false);
    }
    if (
      mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)
    ) {
      setOpenMobile(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  return (
    <>
      {/* Top Bar */}
      <div className="bg-red-600 py-1 text-white flex justify-between items-center px-4 lg:px-6">
        <p className="text-sm lg:text-base">
          Call Us Today! 1-866-242-3545 | info.ataloptical@gmail.com
        </p>
        <div className="flex gap-4 text-lg lg:text-xl">
          <FaFacebookF className="hover:cursor-pointer hover:text-black" />
          <FaYoutube className="hover:cursor-pointer hover:text-black" />
          <FaSquareInstagram className="hover:cursor-pointer hover:text-black" />
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-xl">
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
                placeholder={placeholders[index]}
                value={query || ""}
                onChange={handleSearch}
                className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-6 pr-10 placeholder-gray-500 focus:outline-none ring-2 ring-red-600 text-black"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:cursor-pointer" />

              {openDesktop && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                  {filteredProducts.length > 0 ? (
                    <ul>
                      {filteredProducts.map((product, index) => (
                        <li className="mt-4" key={index}>
                          <Link
                            to="/allProduct"
                            key={index}
                            onClick={() => handleSelect(product)}
                            className="px-4 py-2 cursor-pointer"
                            state={{
                              category: product.cat_id,
                              subcategory: product.subCat_id,
                            }}
                          >
                            {product.product_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-2xl">
            <FaHeart
              onClick={handleWishlist}
              className="text-red-600 cursor-pointer hover:text-black"
            />

            {/* Cart */}
            <div className="relative">
              <FaCartShopping
                onClick={() => setCartOpen(true)}
                className="text-red-600 cursor-pointer hover:text-black text-2xl"
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            <Link to="/update-profile">
              {custProfile && user ? (
                <img
                  src={`${IMAGE_URL}${custProfile}`}
                  alt="ProfileImage"
                  className="w-12 h-12 rounded-full object-cover border border-red-600"
                />
              ) : (
                <FaUser className="text-red-600 hover:text-black w-8 h-8" />
              )}
            </Link>
            {!user ? (
              <div
                onClick={handleLogin}
                className="flex items-center gap-1 text-red-600 cursor-pointer hover:text-black"
              >

                <span className="hover:underline">Sign In</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* logout button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:cursor-pointer hover:bg-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nav Menu */}
        <nav>
          <ul className="flex items-center justify-center gap-12 py-3 font-semibold text-white bg-black tracking-wide text-base">
            <Link to="/">
              <li className="cursor-pointer hover:text-red-600">HOME</li>
            </Link>
            <Link to="/about-us">
              <li className="cursor-pointer hover:text-red-600">ABOUT US</li>
            </Link>
            <Link to="/services">
              <li className="cursor-pointer hover:text-red-600">SERVICES</li>
            </Link>

            <Link to="/category">
              <li className="cursor-pointer hover:text-red-600">CATEGORY</li>
            </Link>

            <Link to="/contact-us">
              <li className="cursor-pointer hover:text-red-600">CONTACT US</li>
            </Link>
            <Link to="/faq">
              <li className="cursor-pointer hover:text-red-600">FAQ</li>
            </Link>
            <Link to="/collections">
              <li className="cursor-pointer hover:text-red-600">COLLECTIONS</li>
            </Link>
            <Link to="/how-to-order">
              <li className="cursor-pointer hover:text-red-600">
                HOW TO ORDER
              </li>
            </Link>

            <Link to="/eye-schedule-test">
              <li className="cursor-pointer hover:text-black hover:bg-white bg-red-600 py-1 px-4 rounded-xl">
                BOOK EYE EXAM
              </li>
            </Link>
          </ul>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-xl">
        <div className="flex items-center justify-between px-4 md:py-3">
          <Link to="/">
            <img
              src={logo}
              className="h-[100px] w-[100px]"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <div className="flex-grow max-w-2xl" ref={mobileSearchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder={placeholders[index]}
                value={query || ""}
                onChange={handleSearch}
                className="w-55 rounded-full border border-gray-300 bg-gray-100 py-2 pl-6 pr-10 placeholder-gray-500 focus:outline-none ring-2 ring-red-600 text-black"
              />
              <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-black hover:cursor-pointer" />

              {openMobile && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                  {filteredProducts.length > 0 ? (
                    <ul>
                      {filteredProducts.map((product, index) => (
                        <li className="mt-4" key={index}>
                          <Link
                            to="/allProduct"
                            key={index}
                            onClick={() => handleSelect(product)}
                            className="px-4 py-2 cursor-pointer"
                            state={{
                              category: product.cat_id,
                              subcategory: product.subCat_id,
                            }}
                          >
                            {product.product_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <FaBars
            size={24}
            className="text-black cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 text-center`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-white">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              className="object-cover h-[60px] w-[100px] hover:cursor-pointer"
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
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            HOME
          </Link>
          <Link
            to="/about-us"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            ABOUT US
          </Link>
          <Link
            to="/services"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            SERVICES
          </Link>
          <li className="cursor-pointer hover:text-red-600">CATEGORY</li>
          <Link
            to="/contact-us"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            CONTACT US
          </Link>
          <Link
            to="/faq"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            FAQ
          </Link>
          <Link
            to="/collections"
            onClick={() => setSidebarOpen(false)}
          >
            <li className="cursor-pointer hover:text-red-600">COLLECTIONS</li>
          </Link>
          <Link
            to="/eye-schedule-test"
            onClick={() => setSidebarOpen(false)}
            className="py-2 px-4 rounded-lg text-center cursor-pointer hover:text-red-600"
          >
            BOOK EYE EXAM
          </Link>
          <li>
            {" "}
            <button
              onClick={handleWishlist}
              className="text-white cursor-pointer hover:text-red-600"
            >
              WISHLIST
            </button>
          </li>
          <li>
            <div>
              <button
                onClick={handleCartMenu}
                className="text-white cursor-pointer hover:text-red-600"
              >
                CART
              </button>
            </div>
          </li>
          <li>
            {/* Auth Section */}
            {!user ? (
              <div
                onClick={handleLogin}
                className=" text-white cursor-pointer hover:text-red-600"
              >
                <span className="hover:underline">Sign In</span>
              </div>
            ) : (
              <div
                onClick={handleLogout}
                className="text-white cursor-pointer hover:text-red-600"
              >
                <span className="hover:underline">Logout</span>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
