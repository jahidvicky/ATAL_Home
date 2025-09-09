import React, { useEffect, useState } from "react";
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

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    navigate("/");
  };

  const handleWishlist = () => {
    navigate("/wishlist-page")
  }

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
              className="object-cover h-[80px] w-[240px]"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder={placeholders[index]}
                className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-6 pr-10 placeholder-gray-500 focus:outline-none ring-2 ring-red-600 text-black"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-2xl">
            <FaHeart onClick={handleWishlist} className="text-red-600 cursor-pointer hover:text-black" />

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

            {/* Auth Section */}
            {!user ? (
              <div
                onClick={handleLogin}
                className="flex items-center gap-1 text-red-600 cursor-pointer hover:text-black"
              >
                <FaUser />
                <span className="hover:underline">Sign In</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* user image */}
                <FaUser className="text-red-600 hover:text-black" />
                {/* logout button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nav Menu */}
        <nav>
          <ul className="flex items-center justify-center gap-8 py-3 font-semibold text-white bg-black tracking-wide text-base">
            <Link to="/">
              <li className="cursor-pointer hover:text-red-600">HOME</li>
            </Link>
            <li className="cursor-pointer hover:text-red-600">ABOUT US</li>
            <li className="cursor-pointer hover:text-red-600">SERVICES</li>
            <li className="cursor-pointer hover:text-red-600">PROMOTION</li>
            <li className="cursor-pointer hover:text-red-600">CATEGORY</li>
            <Link to="/contact-us">
              <li className="cursor-pointer hover:text-red-600">CONTACT US</li>
            </Link>
            <Link to="/faq">
              <li className="cursor-pointer hover:text-red-600">FAQ</li>
            </Link>
            <li className="cursor-pointer hover:text-red-600">COLLECTIONS</li>
            <Link to="/book-eye-exam">
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
          <img
            src={logo}
            className="h-[100px] w-[100px]"
            alt="Logo"
            loading="lazy"
            decoding="async"
          />
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
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <IoIosCloseCircle
            size={30}
            className="cursor-pointer hover:text-red-600"
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
          <li className="cursor-pointer hover:text-red-600">ABOUT US</li>
          <li className="cursor-pointer hover:text-red-600">SERVICES</li>
          <li className="cursor-pointer hover:text-red-600">PROMOTION</li>
          <li className="cursor-pointer hover:text-red-600">CATEGORY</li>
          <li className="cursor-pointer hover:text-red-600">CONTACT US</li>
          <Link
            to="/faq"
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
            FAQ
          </Link>
          <li className="cursor-pointer hover:text-red-600">COLLECTIONS</li>
          <li className="bg-red-600 py-2 px-4 rounded-lg text-center cursor-pointer">
            BOOK EYE EXAM
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
