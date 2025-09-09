import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Home/Header'
import Footer from './Home/Footer'
import ScrollToTop from '../page/ScrollToTop'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout