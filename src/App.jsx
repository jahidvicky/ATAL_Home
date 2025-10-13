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
import Category from "./layout/Home/Category";
import CustHome from "./components/CustHome";
import ViewCart from "./page/Cart/ViewCart";
import Product from "./page/allproduct/Product";

// import InsuranceClaimForm from "./page/form/InsuranceClaimForm";
// import DocumentUploadForm from "./page/form/DocumentUploadForm";
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
          element: <Product />
        },
        { path: "/disclaimer", element: <DisclaimerPage /> },
        { path: "/terms&Conditions", element: <TermsAndConditions /> },
        { path: "/liability", element: <LimitationOfLiability /> },
        { path: "/general-info", element: <GeneralInformation /> },
        { path: "/eyeglasses-contact-policy", element: <EyeglassesContactPolicy /> },
        { path: "/rights-enforcement-policy", element: <RightsEnforcementPolicy /> },

        //  Protected Routes
        {
          path: "/product/:name",
          element: (
            // <ProtectedRoute>
            <Cartpage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            // <ProtectedRoute>
            <CartPageWrapper />
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
          path: "/order/:id",
          element: (
            // <ProtectedRoute>
            <OrderSuccess />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/payment-policy",
          element: (
            // <ProtectedRoute>
            <PolicyPayment />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (

            <Payment />

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
        // {
        //   path: "/form",
        //   element: <InsuranceClaimForm />,
        // },
        // {
        //   path: "/form-new",
        //   element: <DocumentUploadForm />,
        // },
        {
          path: "/insurance-claim",
          element: <InsuranceClaim />
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
          path: "/category",
          element: <Category />,
        },
        {
          path: "/collections",
          element: <Collections />,
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
          path: "/how-to-order",
          element: <HowToOrder />,
        },
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
