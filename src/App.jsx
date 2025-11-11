import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  GlassesResolver,
  SunglassesResolver,
  ContactsResolver,
  // shapes
  AviatorResolver, RoundResolver, RectangleResolver, CatEyeResolver, OvalResolver, SquareResolver,
  // shop-by-category
  MensFramesResolver, WomensFramesResolver, KidsGlassesResolver,
  // collections
  EyeglassesResolver, SportsGlassesResolver, BlueGlassesResolver,
  // trending/seller
  TrendingResolver, BestSellerResolver,
} from "./constants/plpResolvers";

import Home from "./page/Home/Home";
import Page from "./page/Page";
import Layout from "./layout/Layout";

import Cartpage from "./page/Cart/Cartpage";
import ViewCart from "./page/Cart/ViewCart";

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
import InsuranceClaimPage from "./page/allEyeServices/Insurance";
import BlueLightTechnology from "./page/allEyeServices/BlueLightTechnology";
import SubscribeSave from "./page/SubscribeSavePage/SubscriveSave";
import ComingSoon from "./page/SocialMedia/ComingSoonPage";

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

        { path: "/allproduct/:subCategory/:catId/:subCatId", element: <Product /> },

        { path: "/disclaimer", element: <DisclaimerPage /> },
        { path: "/terms&Conditions", element: <TermsAndConditions /> },
        { path: "/liability", element: <LimitationOfLiability /> },
        { path: "/general-info", element: <GeneralInformation /> },
        { path: "/eyeglasses-contact-policy", element: <EyeglassesContactPolicy /> },
        { path: "/rights-enforcement-policy", element: <RightsEnforcementPolicy /> },

        { path: "/product/:ID/:subCategory/:subCatId", element: <Cartpage /> },

        { path: "/cart", element: <CartPageWrapper /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/order/:id", element: <OrderSuccess /> },
        { path: "/payment-policy", element: <PolicyPayment /> },
        { path: "/payment", element: <Payment /> },

        { path: "/contact-us", element: <ContactPage /> },
        { path: "/book-eye-exam", element: <EyeExam /> },

        // Friendly routes → resolvers
        { path: "/glasses", element: <GlassesResolver /> },
        { path: "/glasses/mens-frame", element: <MensFramesResolver /> },
        { path: "/glasses/womens-frame", element: <WomensFramesResolver /> },
        { path: "/glasses/kids-glasses", element: <KidsGlassesResolver /> },

        { path: "/glasses/aviator-frames", element: <AviatorResolver /> },
        { path: "/glasses/round-frames", element: <RoundResolver /> },
        { path: "/glasses/rectangle-frames", element: <RectangleResolver /> },
        { path: "/glasses/cat-eye-frames", element: <CatEyeResolver /> },
        { path: "/glasses/oval-frames", element: <OvalResolver /> },
        { path: "/glasses/square-frames", element: <SquareResolver /> },

        { path: "/glasses/sports-glasses", element: <SportsGlassesResolver /> },
        { path: "/glasses/blue-glasses", element: <BlueGlassesResolver /> },

        { path: "/sunglasses", element: <SunglassesResolver /> },

        { path: "/contact-lenses", element: <ContactsResolver /> },

        { path: "/trending", element: <TrendingResolver /> },
        { path: "/best-sellers", element: <BestSellerResolver /> },

        { path: "/products", element: <Product /> },

        { path: "/services", element: <Services /> },
        {
          path: "/insurance-claim",
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
        { path: "/product/:ID/:subCategory/:subCatId/lens-selection-flow", element: <LensSelection /> },
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
          path: "/product/:ID/:subCategory/:subCatId/lens-selection-flow",
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
          element: <InsuranceClaimPage />,
        },
        {
          path: "/eye-services/blue-light-technology",
          element: <BlueLightTechnology />,
        },
        {
          path: "/subscribe-save",
          element: <SubscribeSave />,
        },
        {
          path: "/:platform",
          element: <ComingSoon />,
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
