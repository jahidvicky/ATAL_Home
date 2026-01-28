import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../API/Api";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const PaymentPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [clientSecret, setClientSecret] = useState(null);

  if (!data) {
    navigate("/order-history");
    return null;
  }

  const { policy, orderId, type } = data;

  // Create Stripe PaymentIntent for policy price
  useEffect(() => {
    API.post("/payment/create-payment-intent", {
      amount: policy.price,
    })
      .then(({ data }) => setClientSecret(data.clientSecret))
      .catch(() => {
        Swal.fire("Error", "Unable to start payment", "error");
        navigate("/order-history");
      });
  }, [policy.price, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 pt-20 pb-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#f00000]">
          Pay for Policy
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Policy Name:</span>
            <span>{policy.name}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Amount:</span>
            <span>${policy.price.toFixed(2)}</span>
          </div>
        </div>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <PolicyStripeForm
              policy={policy}
              orderId={orderId}
              type={type}
              navigate={navigate}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

const PolicyStripeForm = ({ policy, orderId, type, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  // const handleStripePayment = async () => {
  //   if (!stripe || !elements || isPaying) return;

  //   setIsPaying(true);

  //   const result = await stripe.confirmPayment({
  //     elements,
  //     redirect: "if_required",
  //   });

  //   if (result.error) {
  //     Swal.fire("Payment Failed", result.error.message, "error");
  //     setIsPaying(false);
  //     return;
  //   }

  //   if (result.paymentIntent.status === "succeeded") {
  //     const endpoint =
  //       type === "renew"
  //         ? `/renewPolicy/${orderId}`
  //         : `/payPolicy/${orderId}`;

  //     await API.put(endpoint, {
  //       policyId: policy._id || policy.policyId,
  //       transactionId: result.paymentIntent.id,
  //       paymentMethod: "Stripe",
  //       paymentStatus: "Paid",
  //     });

  //     await Swal.fire({
  //       icon: "success",
  //       title: "Payment Successful",
  //       text:
  //         type === "renew"
  //           ? "Your policy has been renewed successfully."
  //           : "Your policy is now active.",
  //       confirmButtonColor: "#dc2626",
  //     });

  //     navigate("/view-order", { state: { id: orderId } });
  //   }

  //   setIsPaying(false);
  // };

  const handleStripePayment = async () => {
    if (!stripe || !elements || isPaying) return;

    setIsPaying(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      Swal.fire("Payment Failed", error.message, "error");
      setIsPaying(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const endpoint =
        type === "renew"
          ? `/renewPolicy/${orderId}`
          : `/payPolicy/${orderId}`;

      await API.put(endpoint, {
        policyId: policy._id || policy.policyId,
        transactionId: paymentIntent.id,
        paymentMethod: "Stripe",
        paymentStatus: "Paid",
      });

      await Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text:
          type === "renew"
            ? "Your policy has been renewed successfully."
            : "Your policy is now active.",
        confirmButtonColor: "#dc2626",
      });

      navigate("/view-order", { state: { id: orderId } });
    }

    setIsPaying(false);
  };



  return (
    <>
      <PaymentElement options={{ layout: "tabs" }} />
      <button
        onClick={handleStripePayment}
        disabled={isPaying}
        className={`w-full mt-4 px-4 py-2 rounded-lg text-white font-semibold ${isPaying
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#f00000] hover:bg-black"
          }`}
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </>
  );
};

export default PaymentPolicy;
