import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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

console.log("frontend key", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Payment = () => {
  const [order, setOrder] = useState(null);

  // Coupon States
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [clientSecret, setClientSecret] = useState(null);


  const navigate = useNavigate();


  // Load order
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orderSummary");
      if (!saved) return navigate("/cart");

      setOrder(JSON.parse(saved));
    } catch {
      navigate("/cart");
    }
  }, []);

  const { subtotal, tax, shipping } = order || {};
  const finalTotal = order
    ? Math.max(subtotal - discount + shipping + tax, 0.01)
    : 0;

  const hasCreatedPI = useRef(false);

  useEffect(() => {
    if (!order || hasCreatedPI.current) return;

    hasCreatedPI.current = true;

    API.post("/payment/create-payment-intent", {
      amount: finalTotal,
    }).then(({ data }) => {
      setClientSecret(data.clientSecret);
    });
  }, [order]);


  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading order summary...</p>
      </div>
    );
  }

  // ==========================
  // COUPON HANDLER
  // ==========================
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire("Error", "Please enter a coupon code", "error");
      return;
    }

    try {
      const category = order.cartItems?.[0]?.categoryId || "";

      const { data } = await API.get(
        `/validateCoupon/${coupon}?cartTotal=${subtotal}&category=${category}`
      );

      if (data.success) {
        setDiscount(data.data.discountAmount);

        Swal.fire(
          "Success",
          `Coupon Applied! Discount: $${data.data.discountAmount.toFixed(2)}`,
          "success"
        );
      } else {
        setDiscount(0);
        Swal.fire("Invalid Coupon", data.message, "error");
      }
    } catch (err) {
      setDiscount(0);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to apply coupon",
        "error"
      );
    }
  };




  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 pt-20 pb-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#f00000]">
          Complete Your Payment
        </h2>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-bold text-[#f00000] text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="ENTER COUPON CODE"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className="flex-1 border p-2 rounded-lg uppercase"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={coupon.trim().length < 2}
            className={`px-4 rounded-lg ${coupon.trim().length < 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#f00000] text-white hover:bg-black"
              }`}
          >
            Apply
          </button>
        </div>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
            key={clientSecret}
          >
            <PaymentForm
              order={order}
              finalTotal={finalTotal}
              coupon={coupon}
              discount={discount}
              navigate={navigate}
            />
          </Elements>
        )}


      </div>
    </div>
  );
};


const PaymentForm = ({ order, finalTotal, coupon, discount, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  // const handlePay = async () => {
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
  //     const { data } = await API.post("/order", {
  //       ...order,
  //       total: finalTotal,
  //       coupon,
  //       discount,
  //       paymentMethod: "Stripe",
  //       paymentStatus: "Paid",
  //       transactionId: result.paymentIntent.id,
  //     });

  //     Swal.fire("Order Placed!", "Payment successful", "success").then(() => {
  //       localStorage.removeItem("orderSummary");
  //       localStorage.removeItem("cartItems");
  //       localStorage.removeItem("checkoutDraft");
  //       localStorage.removeItem("lensSelectionDetails");
  //       navigate(`/order/${data.order._id}`);
  //     });
  //   }

  //   setIsPaying(false);
  // };

  const handlePay = async () => {
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
      const { data } = await API.post("/order", {
        ...order,
        total: finalTotal,
        coupon,
        discount,
        paymentMethod: "Stripe",
        paymentStatus: "Paid",
        transactionId: paymentIntent.id,
      });

      Swal.fire("Order Placed!", "Payment successful", "success").then(() => {
        localStorage.removeItem("orderSummary");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("checkoutDraft");
        localStorage.removeItem("lensSelectionDetails");
        navigate(`/order/${data.order._id}`);
      });
    }

    setIsPaying(false);
  };


  return (
    <>
      <PaymentElement options={{ layout: "tabs" }} />
      <button
        onClick={handlePay}
        disabled={isPaying}
        className="w-full mt-3 py-2 rounded-lg bg-[#f00000] text-white hover:bg-black"
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </>
  );
};


export default Payment;