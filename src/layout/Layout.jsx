import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Home/Header'
import Footer from './Home/Footer'
import ScrollToTop from '../page/ScrollToTop'
import OfferPopup from '../components/OfferPopup'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      {location.pathname === "/" && <OfferPopup />}
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout