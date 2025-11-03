import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./page/Home/Home";
import Page from "./page/Page";
import Layout from "./layout/Layout";

import Cartpage from "./page/Cart/Cartpage";
import ViewCart from "./page/Cart/ViewCart";
import CartPageWrapper from "./page/Cart/CartPageWrapper";

import FAQ from "./page/FAQ/FAQ";
import PrivacyPolicy from "./page/Privacy-Policy/PrivacyPolicy";
import DisclaimerPage from "./page/DisclaimerPage/DisclaimerPage";
import TermsAndConditions from "./page/terms&condition/TermsAndConditions";
import LimitationOfLiability from "./page/limitationOfLiability/Liability";
import GeneralInformation from "./page/generalInformation/generalInfo";
import EyeglassesContactPolicy from "./page/eyeglasses-contact-policy/EyeglassesContactPolicy";
import RightsEnforcementPolicy from "./page/rights-enforcement-policy/RightsEnforcementPolicy";

import Dashboardlayout from "./layout/Dashboardlayout";
import Faq from "./components/Faq";
import About from "./components/About";
import Category from "./layout/Home/Category";
import CustHome from "./components/CustHome";

import Product from "./page/allproduct/Product";

import Checkout from "./page/checkout/Checkout";
import OrderPlaced from "./page/order/OrderPlaced";
import Register from "./page/register/Register";
import ProtectedRoute from "./page/protectedRoute/ProtectedRoute";
import Login from "./page/login/Login";
import WishlistPage from "./page/wishlist/WishlistPage";
import ContactPage from "./page/contactUs/ContactPage";
import EyeExam from "./page/bookEyeExam/EyeExam";
import Services from "./components/Services";
import OurMission from "./components/OurMission";
import OurVision from "./components/OurVision";
import AtalMeaning from "./components/AtalMeaning";
import Responsibility from "./components/Responsibility";
import SiteContentNotice from "./components/SiteContentNotice";
import LearnAboutFrame from "./page/learnAboutFrame/LearnAboutFrame";
import LearnAboutLens from "./page/learnAboutFrame/LearnAboutLens";
import LearnAboutPrescription from "./page/learnAboutFrame/LearnAboutPrescription";
import LearnAboutMaintenance from "./page/learnAboutFrame/LearnAboutMaintenance";
import EyeCheckDetails from "./page/EyeCheckDetais/EyeCheckDetails";
import PromotionsPage from "./page/promorionPage/PromotionsPage";

import { useDispatch } from "react-redux";
import { fetchWishlist } from "./redux/wishlistSlice";

import Payment from "./page/checkout/Payment";
import HowToOrder from "./page/howToOrderPage/HowToOrder";
import AppointmentType from "./layout/Home/AppointmentType";
import AppointmentSchedule from "./layout/Home/AppointmentSchedule";
import EyeExamStep1 from "./page/EyeExamPage/EyeExamStep1";
import OrderSuccess from "./page/order/OrderSuccess";
import UpdateProfile from "./page/updateProfile/UpdateProfile";
import Collections from "./page/collections/Collections";
import LensSelection from "./page/lensSelection/LensSelectionFlow";
import TrackOrder from "./page/order/TrackOrder";
import OrderHistory from "./page/order/OrderHistory";
import ViewOrder from "./page/order/ViewOrder";
import InsuranceClaim from "./page/insurance/InsuranceClaim";
import CartPageWrapper from "./page/Cart/CartPageWrapper";
import PolicyPayment from "./page/order/PolicyPayment"
import EyeWearGlasses from "./page/allEyeServices/EyeWearGlasses";
import ContactLens from "./page/allEyeServices/ContactLens";
import EyeExamService from "./page/allEyeServices/EyeExamService";
import Promotions from "./page/allEyeServices/Promotions";
import Brands from "./page/allEyeServices/Brands";
import Optometrists from "./page/allEyeServices/Optometrists";
import InsuranceClaims from "./page/allEyeServices/Insurance";
import BlueLightTechnology from "./page/allEyeServices/BlueLightTechnology";

function App() {
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("user") || null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "null") {
      setCurrentUserId(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchWishlist(currentUserId));
    }
  }, [currentUserId, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/faq", element: <FAQ /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },

        { path: "/allproduct/:category/:subCategory", element: <Product /> },

        { path: "/disclaimer", element: <DisclaimerPage /> },
        { path: "/terms&Conditions", element: <TermsAndConditions /> },
        { path: "/liability", element: <LimitationOfLiability /> },
        { path: "/general-info", element: <GeneralInformation /> },
        { path: "/eyeglasses-contact-policy", element: <EyeglassesContactPolicy /> },
        { path: "/rights-enforcement-policy", element: <RightsEnforcementPolicy /> },

        { path: "/product/:name", element: <Cartpage /> },

        { path: "/cart", element: <CartPageWrapper /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/order/:id", element: <OrderSuccess /> },
        { path: "/payment-policy", element: <PolicyPayment /> },
        { path: "/payment", element: <Payment /> },

        { path: "/contact-us", element: <ContactPage /> },
        { path: "/book-eye-exam", element: <EyeExam /> },

        { path: "/glasses", element: <Product /> },
        { path: "/glasses/men", element: <Product /> },
        { path: "/glasses/women", element: <Product /> },
        { path: "/glasses/kids", element: <Product /> },

        { path: "/glasses/aviator", element: <Product /> },
        { path: "/glasses/round", element: <Product /> },
        { path: "/glasses/rectangle", element: <Product /> },
        { path: "/glasses/cat-eye", element: <Product /> },
        { path: "/glasses/oval", element: <Product /> },
        { path: "/glasses/square", element: <Product /> },
        { path: "/glasses/sports", element: <Product /> },
        { path: "/glasses/blue", element: <Product /> },

        { path: "/sunglasses", element: <Product /> },
        { path: "/sunglasses/men", element: <Product /> },
        { path: "/sunglasses/women", element: <Product /> },
        { path: "/sunglasses/kids", element: <Product /> },

        { path: "/contact-lenses", element: <Product /> },
        { path: "/contact-lenses/daily", element: <Product /> },
        { path: "/contact-lenses/biweekly", element: <Product /> },
        { path: "/contact-lenses/monthly", element: <Product /> },

        { path: "/collections", element: <Collections /> },
        { path: "/collections/new", element: <Product /> },
        { path: "/collections/best-sellers", element: <Product /> },
        { path: "/collections/editors", element: <Product /> },
        { path: "/collections/signature", element: <Product /> },
        { path: "/collections/eco", element: <Product /> },
        { path: "/collections/premium", element: <Product /> },
        { path: "/collections/kids", element: <Product /> },
        { path: "/collections/lookbook", element: <Product /> },
        { path: "/collections/style-guide", element: <Product /> },
        { path: "/collections/materials", element: <Product /> },

        { path: "/trending", element: <Product /> },
        { path: "/best-sellers", element: <Product /> },

        { path: "/products", element: <Product /> },

        { path: "/services", element: <Services /> },
        {
          path: "/eye-services/insurance-claims",
          element: <InsuranceClaim />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        { path: "/category", element: <Category /> },
        { path: "/our-mission", element: <OurMission /> },
        { path: "/our-vision", element: <OurVision /> },
        { path: "/atal-meaning", element: <AtalMeaning /> },
        { path: "/responsibility", element: <Responsibility /> },
        { path: "/intellectual-property", element: <SiteContentNotice /> },
        { path: "/learn-about-frame", element: <LearnAboutFrame /> },
        { path: "/learn-about-lens", element: <LearnAboutLens /> },
        { path: "/learn-about-prescription", element: <LearnAboutPrescription /> },
        { path: "/learn-about-maintenance", element: <LearnAboutMaintenance /> },
        { path: "/eye-check-details", element: <EyeCheckDetails /> },
        { path: "/promotions-page", element: <PromotionsPage /> },
        { path: "/how-to-order", element: <HowToOrder /> },
        { path: "/appointmentType", element: <AppointmentType /> },
        { path: "/appointmentSchedule", element: <AppointmentSchedule /> },
        { path: "/eye-schedule-test", element: <EyeExamStep1 /> },
        { path: "/update-profile", element: <UpdateProfile /> },
        { path: "/product/:name/lens-selection-flow", element: <LensSelection /> },
        { path: "/track/:trackingNumber", element: <TrackOrder /> },
        { path: "/view-order", element: <ViewOrder /> },
        { path: "/order-history", element: <OrderHistory /> },
        { path: "/place-order", element: <OrderPlaced /> },

        {
          path: "/appointmentType",
          element: <AppointmentType />,
        },
        {
          path: "/appointmentSchedule",
          element: <AppointmentSchedule />,
        },
        {
          path: "/eye-schedule-test",
          element: <EyeExamStep1 />,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "/product/:name/lens-selection-flow",
          element: <LensSelection />,
        },
        {
          path: "/track/:trackingNumber",
          element: <TrackOrder />,
        },
        {
          path: "/view-order",
          element: <ViewOrder />,
        },
        {
          path: "/order-history",
          element: <OrderHistory />,
        },
        {
          path: "/eye-services/eye-wear-glass",
          element: <EyeWearGlasses />,
        },
        {
          path: "/eye-services/contact-lens",
          element: <ContactLens />,
        },
        {
          path: "/eye-services/eye-exam",
          element: <EyeExamService />,
        },
        {
          path: "/eye-services/promotions",
          element: <Promotions />,
        },
        {
          path: "/eye-services/brands",
          element: <Brands />,
        },
        {
          path: "/eye-services/optometrists",
          element: <Optometrists />,
        },
        {
          path: "/eye-services/insurance-claims",
          element: <InsuranceClaims />,
        },
        {
          path: "/eye-services/blue-light-technology",
          element: <BlueLightTechnology />,
        },
        {
          path: "/place-order",
          element: (
            // <ProtectedRoute>
            <OrderPlaced />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist-page",
          element: (
            // <ProtectedRoute>
            <WishlistPage userId={currentUserId} />
            // </ProtectedRoute>
          ),
        },

        { path: "*", element: <Page /> },
      ],
    },

    {
      path: "/dash",
      element: (
        <ProtectedRoute>
          <Dashboardlayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <CustHome /> },
        { path: "faq", element: <Faq /> },
        { path: "*", element: <Page /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
