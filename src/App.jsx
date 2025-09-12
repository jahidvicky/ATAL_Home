import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home/Home";
import Page from "./page/Page";
import Layout from "./layout/Layout";
import Cartpage from "./page/Cart/Cartpage";
import FAQ from "./page/FAQ/FAQ";
import PrivacyPolicy from "./page/Privacy-Policy/PrivacyPolicy";
import DisclaimerPage from './page/DisclaimerPage/DisclaimerPage';
import TermsAndConditions from "./page/terms&condition/TermsAndConditions";
import LimitationOfLiability from "./page/limitationOfLiability/Liability";
import GeneralInformation from "./page/generalInformation/generalInfo";
import EyeglassesContactPolicy from "./page/eyeglasses-contact-policy/EyeglassesContactPolicy";
import RightsEnforcementPolicy from "./page/rights-enforcement-policy/RightsEnforcementPolicy";
import Dashboardlayout from "./layout/Dashboardlayout";
import Faq from "./components/Faq";
import About from "./components/About";
import CustHome from "./components/CustHome";
import ViewCart from "./page/Cart/ViewCart";
import Product from "./page/allproduct/Product";

import InsuranceClaimForm from "./page/form/InsuranceClaimForm";
import DocumentUploadForm from "./page/form/DocumentUploadForm";
import Checkout from "./page/checkout/Checkout";
import OrderPlaced from "./page/order/OrderPlaced";
import Register from "./page/register/Register";

//  ProtectedRoute
import ProtectedRoute from "./page/protectedRoute/ProtectedRoute";
import Login from "./page/login/Login";
import WishlistPage from "./page/wishlist/WishlistPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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
        {
          path: "/allproduct",
          element: <Product userId={currentUserId} />
        },
        { path: "/disclaimer", element: <DisclaimerPage /> },
        { path: "/terms&Conditions", element: <TermsAndConditions /> },
        { path: "/liability", element: <LimitationOfLiability /> },
        { path: "/general-info", element: <GeneralInformation /> },
        { path: "/eyeglasses-contact-policy", element: <EyeglassesContactPolicy /> },
        { path: "/rights-enforcement-policy", element: <RightsEnforcementPolicy /> },

        //  Protected Routes
        {
          path: "/cart",
          element: (
            // <ProtectedRoute>
            <Cartpage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/viewcart",
          element: (
            // <ProtectedRoute>
            <ViewCart />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            // <ProtectedRoute>
            <Checkout />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <PayPalScriptProvider
              options={{ "client-id": "AXf1IDZMUR6E_q8lxGRiRvOAnLZ3E5DgnyYAV0eaIB3VdLn4KlZ9Msm8kZyvu_XLGcziwc31Lc7nrWPY", currency: "USD" }}
            >
              <Payment />
            </PayPalScriptProvider>
          )
        },
        {
          path: "contact-us",
          element: <ContactPage />
        },
        {
          path: "book-eye-exam",
          element: <EyeExam />
        },
        {
          path: "/form",
          element: <InsuranceClaimForm />,
        },
        {
          path: "/form-new",
          element: <DocumentUploadForm />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/our-mission",
          element: <OurMission />,
        },
        {
          path: "/our-vision",
          element: <OurVision />,
        },
        {
          path: "/atal-meaning",
          element: <AtalMeaning />,
        },
        {
          path: "/responsibility",
          element: <Responsibility />,
        },
        {
          path: "/intellectual-property",
          element: <SiteContentNotice />,
        },
        {
          path: "/learn-about-frame",
          element: <LearnAboutFrame />,
        },
        {
          path: "/learn-about-lens",
          element: <LearnAboutLens />,
        },
        {
          path: "/learn-about-prescription",
          element: <LearnAboutPrescription />,
        },
        {
          path: "/learn-about-maintenance",
          element: <LearnAboutMaintenance />,
        },
        {
          path: "/eye-check-details",
          element: <EyeCheckDetails />,
        },
        {
          path: "/promotions-page",
          element: <PromotionsPage />,
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

    // Protected Dashboard
    {
      path: "/dash",
      element: (
        <ProtectedRoute>
          <Dashboardlayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/dash", element: <CustHome /> },
        // { path: "/dash/about", element: <About /> },
        { path: "/dash/faq", element: <Faq /> },
        { path: "*", element: <Page /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
