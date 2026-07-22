import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Home/Header'
import Footer from './Home/Footer'
import ScrollToTop from '../page/ScrollToTop'
import OfferPopup from '../components/OfferPopup'
import Chatbot from "../components/Chatbot"

function Layout() {
  const location = useLocation();
  const [openChat, setOpenChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Hide button if user is in top 200px (banner area)
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const openChatHandler = () => setOpenChat(true);
    window.addEventListener("open-support-chat", openChatHandler);
    return () => window.removeEventListener("open-support-chat", openChatHandler);
  }, []);

  // Hide the floating Help button once the footer scrolls into view
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />

      {location.pathname === "/" && <OfferPopup />}

      <div>
        <Outlet />
      </div>

      {/* Floating chat button */}
      {isVisible && !overFooter && (
        <button
          onClick={() => setOpenChat(!openChat)}
          className="fixed bottom-4 right-0 bottom-40 bg-[#f00000] text-white px-6 py-2 rounded-lg shadow-lg 
             hover:bg-red-700 transition transform rotate-270 origin-bottom-right"
        >
          Help
        </button>
      )}


      {/* Chatbox - toggles open/close */}
      {openChat && (
        <div className="fixed bottom-20 right-6 z-50">
          <Chatbot onClose={() => setOpenChat(false)} />
        </div>
      )}

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  )
}

export default Layout