import React from 'react'
import ServicesContaineHead from './service-head-cont/ServicesContainerHead'
import { GiSunglasses } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { GiMicroscopeLens } from "react-icons/gi";
import { TbScanEye } from "react-icons/tb";
import { TbBasketDiscount } from "react-icons/tb";
import { CiShop } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuFlashlight } from "react-icons/lu";
const ServicesContainer = () => {
  return (
    <>

      <ServicesContaineHead
        icon={<GiSunglasses />}
        headText="Eye Wear Glasses"
        content="Eyeglasses have come a long way since they were first believed to have been made centuries ago"
        arrow={<FaArrowRight />}
      />



      <ServicesContaineHead
        icon={<GiMicroscopeLens />}
        headText="Contact Lens"
        content="Choose from our premium selection of contact lenses for a seamless blend of vision correction and modern aesthetics."
        arrow={<FaArrowRight />}
      />



      <ServicesContaineHead
        icon={<TbScanEye />}
        headText="Eye Exam"
        content="Get accurate prescriptions and expert care with quick, hassle-free eye checkups by certified professionals."
        arrow={<FaArrowRight />}
      />



      <ServicesContaineHead
        icon={<TbBasketDiscount />}
        headText="Promotions"
        content="Enjoy exciting discounts on sunglasses, contact lenses, and more. Limited-time offers to upgrade your style and save big!"
        arrow={<FaArrowRight />}
      />



      <ServicesContaineHead
        icon={<CiShop />}
        headText="Brands"
        content="Shop from leading names like Ray-Ban, Oakley, Vogue, Bausch & Lomb, and more — all in one place."
        arrow={<FaArrowRight />}
      />


      <ServicesContaineHead
        icon={<FaUserDoctor />}
        headText="Optometrists"
        content="Our certified optometrists offer professional eye care, accurate prescriptions, and personalized vision solutions."
        arrow={<FaArrowRight />}
      />

      <ServicesContaineHead
        icon={<IoNewspaperOutline />}
        headText="Insurance Claims"
        content="Easily submit your vision insurance claims with our support team by your side—fast, simple, and stress-free."
        arrow={<FaArrowRight />}
      />


      <ServicesContaineHead
        icon={<LuFlashlight />}
        headText="Blue Light Technology"
        content="Shield your eyes from digital strain with lenses that block harmful blue light—perfect for screen-heavy lifestyles."
        arrow={<FaArrowRight />}
      />
    </>
  )
}

export default ServicesContainer
