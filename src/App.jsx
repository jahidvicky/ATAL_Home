import React, { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './page/Home/Home.jsx';
const Page = lazy(() => import("./page/Page"));
import Layout from "./layout/Layout";
import Loader from './loader/Loader.jsx';

const Cartpage = lazy(() => import("./page/Cart/Cartpage"));
import FAQ from "./page/FAQ/FAQ.jsx";
const PrivacyPolicy = lazy(() => import("./page/Privacy-Policy/PrivacyPolicy"));
const OpticalPolicy = lazy(() => import("./page/opticalPolicy/OpticalPolicy"));
const DisclaimerPage = lazy(() => import("./page/DisclaimerPage/DisclaimerPage"));
const TermsAndConditions = lazy(() =>
  import("./page/terms&condition/TermsAndConditions")
);
const LimitationOfLiability = lazy(() =>
  import("./page/limitationOfLiability/Liability")
);
const GeneralInformation = lazy(() =>
  import("./page/generalInformation/generalInfo")
);
const EyeglassesContactPolicy = lazy(() =>
  import("./page/eyeglasses-contact-policy/EyeglassesContactPolicy")
);
const RightsEnforcementPolicy = lazy(() =>
  import("./page/rights-enforcement-policy/RightsEnforcementPolicy")
);

const Dashboardlayout = lazy(() => import("./layout/Dashboardlayout"));
const About = lazy(() => import("./components/About"));
const Category = lazy(() => import("./layout/Home/Category"));


const Product = lazy(() => import("./page/allproduct/Product"));

const Checkout = lazy(() => import("./page/checkout/Checkout"));
const OrderPlaced = lazy(() => import("./page/order/OrderPlaced"));
const Login = lazy(() => import("./page/login/Login"));
const Register = lazy(() => import("./page/register/Register"));

import ProtectedRoute from "./page/protectedRoute/ProtectedRoute.jsx";

const WishlistPage = lazy(() =>
  import("./page/wishlist/WishlistPage")
);
const ContactPage = lazy(() =>
  import("./page/contactUs/ContactPage")
);
const EyeExam = lazy(() =>
  import("./page/bookEyeExam/EyeExam")
);
const Services = lazy(() =>
  import("./components/Services")
);
const OurMission = lazy(() =>
  import("./components/OurMission")
);
const OurVision = lazy(() =>
  import("./components/OurVision")
);
const AtalMeaning = lazy(() =>
  import("./components/AtalMeaning")
);

const Responsibility = lazy(() =>
  import("./components/Responsibility")
);
const SiteContentNotice = lazy(() =>
  import("./components/SiteContentNotice")
);
const LearnAboutFrame = lazy(() =>
  import("./page/learnAboutFrame/LearnAboutFrame")
);
const LearnAboutLens = lazy(() =>
  import("./page/learnAboutFrame/LearnAboutLens")
);
const LearnAboutPrescription = lazy(() =>
  import("./page/learnAboutFrame/LearnAboutPrescription")
);
const LearnAboutMaintenance = lazy(() =>
  import("./page/learnAboutFrame/LearnAboutMaintenance")
);
const EyeCheckDetails = lazy(() =>
  import("./page/EyeCheckDetais/EyeCheckDetails")
);
const PromotionsPage = lazy(() =>
  import("./page/promorionPage/PromotionsPage")
);


import { useDispatch } from "react-redux";
import { fetchWishlist } from "./redux/wishlistSlice";


const Payment = lazy(() =>
  import("./page/checkout/Payment")
);
const HowToOrder = lazy(() =>
  import("./page/howToOrderPage/HowToOrder")
);
const AppointmentType = lazy(() =>
  import("./layout/Home/AppointmentType")
);
const AppointmentSchedule = lazy(() =>
  import("./layout/Home/AppointmentSchedule")
);
const EyeExamStep1 = lazy(() =>
  import("./page/EyeExamPage/EyeExamStep1")
);
const OrderSuccess = lazy(() =>
  import("./page/order/OrderSuccess")
);
const UpdateProfile = lazy(() =>
  import("./page/updateProfile/UpdateProfile")
);
const LensSelection = lazy(() =>
  import("./page/lensSelection/LensSelectionFlow")
);
const TrackOrder = lazy(() =>
  import("./page/order/TrackOrder")
);
const OrderHistory = lazy(() =>
  import("./page/order/OrderHistory")
);
const ViewOrder = lazy(() =>
  import("./page/order/ViewOrder")
);
const InsuranceClaim = lazy(() =>
  import("./page/insurance/InsuranceClaim")
);
const CartPageWrapper = lazy(() =>
  import("./page/Cart/CartPageWrapper")
);
const PolicyPayment = lazy(() =>
  import("./page/order/PolicyPayment")
);
const EyeWearGlasses = lazy(() =>
  import("./page/allEyeServices/EyeWearGlasses")
);
const ContactLens = lazy(() =>
  import("./page/allEyeServices/ContactLens")
);
const EyeExamService = lazy(() =>
  import("./page/allEyeServices/EyeExamService")
);
const Promotions = lazy(() =>
  import("./page/allEyeServices/Promotions")
);

const Brands = lazy(() =>
  import("./page/allEyeServices/Brands")
);
const Optometrists = lazy(() =>
  import("./page/allEyeServices/Optometrists")
);
const InsuranceClaimPage = lazy(() =>
  import("./page/allEyeServices/Insurance")
);
const BlueLightTechnology = lazy(() =>
  import("./page/allEyeServices/BlueLightTechnology")
);
const SubscribeSave = lazy(() =>
  import("./page/SubscribeSavePage/SubscriveSave")
);
const SearchResult = lazy(() =>
  import("./layout/Home/SearchResult")
);
const ComingSoon = lazy(() =>
  import("./page/SocialMedia/ComingSoonPage")
);
const ContactLensPage = lazy(() =>
  import("./page/Cart/ContactLensPage")
);
const PricingPage = lazy(() =>
  import("./page/postHeader/PricingPage")
);
const CustomerCarePage = lazy(() =>
  import("./page/postHeader/CustomerCarePage")
);
const FastShippingPage = lazy(() =>
  import("./page/postHeader/FastShippingPage")
);
const ReferCoupon = lazy(() =>
  import("./components/ReferCoupon")
);
const FaceShape = lazy(() =>
  import("./page/tipsAndGuides/FaceShape")
);
const ReturnExchangePolicy = lazy(() =>
  import("./page/return&exchange/Return&Exchange")
);
const ExchangePolicy = lazy(() =>
  import("./page/exchangePolicy/ExchangePolicy")
);
const CookiesPolicy = lazy(() =>
  import("./page/cookiesPolicy/CookiesPolicy")
);
const ShippingPolicy = lazy(() =>
  import("./page/shippingPolicy/ShippingPolicy")
);
const DisclaimerPolicy = lazy(() =>
  import("./page/disclaimerPolicy/DisclaimerPolicy")
);
import NoCopy from "./components/NoCopy";

const OurCommunity = lazy(() =>
  import("./components/OurComminity")
);
const OpticalEducation = lazy(() =>
  import("./page/opticalEducation/OpticalEducation")
);
const FreeEyeExam = lazy(() =>
  import("./page/freeExam/FreeEyeExam")
);
const InsurancePolicies = lazy(() =>
  import("./page/insurance/InsurancePolicies")
);
const Locations = lazy(() =>
  import("./page/location/Locations")
);


function App() {
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("user") || null
  );
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
        { path: "/optical-policy", element: <OpticalPolicy /> },

        {
          path: "/allproduct/:subCategory/:catId/:subCatId",
          element: <Product />,
        },
        { path: "/product/:ID/:subCategory/:subCatId", element: <Cartpage /> },

        { path: "/disclaimer", element: <DisclaimerPage /> },
        { path: "/terms&Conditions", element: <TermsAndConditions /> },
        { path: "/liability", element: <LimitationOfLiability /> },
        { path: "/general-info", element: <GeneralInformation /> },
        {
          path: "/eyeglasses-contact-policy",
          element: <EyeglassesContactPolicy />,
        },
        {
          path: "/rights-enforcement-policy",
          element: <RightsEnforcementPolicy />,
        },
        { path: "/return-exchange", element: <ReturnExchangePolicy /> },
        { path: "/exchange-policy", element: <ExchangePolicy /> },
        { path: "/cookies-policy", element: <CookiesPolicy /> },
        { path: "/shipping-policy", element: <ShippingPolicy /> },
        { path: "/disclaimer-policy", element: <DisclaimerPolicy /> },

        { path: "/cart", element: <CartPageWrapper /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/order/:id", element: <OrderSuccess /> },
        { path: "/payment-policy", element: <PolicyPayment /> },
        { path: "/payment", element: <Payment /> },

        { path: "/contact-us", element: <ContactPage /> },
        { path: "/book-eye-exam", element: <EyeExam /> },

        // Friendly routes → resolvers
        { path: "/glasses/:shape", element: <Product /> },
        { path: "/glasses/gender/:gender", element: <Product /> },
        { path: "/glasses/lens_type/:lens_type", element: <Product /> },
        { path: "/sunglasses/frame_shape/:frame_shape", element: <Product /> },
        { path: "/sunglasses/lens_type/:lens_type", element: <Product /> },
        { path: "/sunglasses/collection/:collection", element: <Product /> },
        {
          path: "/contact_lenses/category/:lens_cat/:catId",
          element: <Product />,
        },
        {
          path: "/contact_lenses/category/:lens_cat/:catId",
          element: <ContactLensPage />,
        },
        {
          path: "/contact_lenses/:brand/:contactBrandId",
          element: <Product />,
        },

        {
          path: "/collectionProducts/:collectionName",
          element: <Product />,
        },
        {
          path: "/categoryProducts/:frameSlug",
          element: <Product />,
        },
        {
          path: "/products/frame-shape/:frameShape",
          element: <Product />,
        },
        {
          path: "/products/collection/:collection",
          element: <Product />,
        },
        {
          path: "/allproduct/:categoryName/:categoryId",
          element: <Product />,
        },
        {
          path: "/brands/:BrandId",
          element: <Product />,
        },
        {
          path: "/allBrands/:allBrands",
          element: <Product />,
        },

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
        { path: "/optical-education", element: <OpticalEducation /> },
        { path: "/free-eye-exam", element: <FreeEyeExam /> },
        {
          path: "/learn-about-prescription",
          element: <LearnAboutPrescription />,
        },
        {
          path: "/learn-about-maintenance",
          element: <LearnAboutMaintenance />,
        },
        { path: "/eye-check-details", element: <EyeCheckDetails /> },
        { path: "/promotions-page", element: <PromotionsPage /> },
        { path: "/how-to-order", element: <HowToOrder /> },
        { path: "/appointmentType", element: <AppointmentType /> },
        { path: "/appointmentSchedule", element: <AppointmentSchedule /> },
        { path: "/eye-schedule-test", element: <EyeExamStep1 /> },
        { path: "/update-profile", element: <UpdateProfile /> },
        {
          path: "/product/:ID/:subCategory/:subCatId/lens-selection-flow",
          element: <LensSelection />,
        },
        { path: "/track/:trackingNumber", element: <TrackOrder /> },
        { path: "/view-order", element: <ViewOrder /> },
        { path: "/order-history", element: <OrderHistory /> },
        { path: "/place-order", element: <OrderPlaced /> },

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
          path: "connect/:platform",
          element: <ComingSoon />,
        },

        //post header pages

        {
          path: "/offer-page",
          element: <PricingPage />,
        },
        {
          path: "/customer-care",
          element: <CustomerCarePage />,
        },
        {
          path: "/fast-shipping",
          element: <FastShippingPage />,
        },

        {
          path: "/wishlist-page",
          element: (
            // <ProtectedRoute>
            <WishlistPage userId={currentUserId} />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/search-results",
          element: (
            // <ProtectedRoute>
            <SearchResult />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/refer-coupon",
          element: (
            // <ProtectedRoute>
            <ReferCoupon />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/face-shape",
          element: (
            // <ProtectedRoute>
            <FaceShape />
            // </ProtectedRoute>
          ),
        },

        {
          path: "/our-community",
          element: (
            // <ProtectedRoute>
            <OurCommunity />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/location",
          element: (

            <Locations />

          ),
        },
        {
          path: "/insurance-policies",
          element: (
            // <ProtectedRoute>
            <InsurancePolicies />
            // </ProtectedRoute>
          ),
        },

        // <Route path="/search-results" element={<SearchResults />} />

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
      children: [{ path: "*", element: <Page /> }],
    },
  ]);

  return (
    <>
      <NoCopy />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );

}

export default App;
