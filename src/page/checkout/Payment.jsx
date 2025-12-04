import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import API from "../../API/Api";

const Payment = () => {
  const [order, setOrder] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Square States
  const [card, setCard] = useState(null);
  const [loadingCard, setLoadingCard] = useState(true);
  const [initError, setInitError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [cardReady, setCardReady] = useState(false);

  const navigate = useNavigate();

  const applicationId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  // ---------------------------
  // Load Order Summary
  // ---------------------------
  useEffect(() => {
    const savedOrder = localStorage.getItem("orderSummary");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
  }, []);

  // ---------------------------
  // Detect when #card-container is ready in DOM
  // ---------------------------
  useEffect(() => {
    const checker = setInterval(() => {
      if (document.getElementById("card-container")) {
        setCardReady(true);
        clearInterval(checker);
      }
    }, 50);

    return () => clearInterval(checker);
  }, []);

  // ---------------------------
  // INIT SQUARE (Works on first render)
  // ---------------------------
  useEffect(() => {
    if (!cardReady) return; // Wait for container to load

    if (!applicationId || !locationId) {
      setInitError("Missing Square env vars");
      setLoadingCard(false);
      return;
    }

    const scriptId = "square-web-sdk";

    const initSquare = async () => {
      try {
        if (!window.Square) {
          setInitError("Square.js not loaded");
          setLoadingCard(false);
          return;
        }

        if (window.__square_initialized) {
          setCard(window.__square_card);
          setLoadingCard(false);
          return;
        }

        window.__square_initialized = true;

        const payments = window.Square.payments(applicationId, locationId);
        const cardInstance = await payments.card();
        await cardInstance.attach("#card-container");

        window.__square_card = cardInstance;
        setCard(cardInstance);
      } catch (err) {
        console.error("Square init error:", err);
        setInitError("Failed to initialize Square card");
      } finally {
        setLoadingCard(false);
      }
    };

    // If script already exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      if (window.Square) initSquare();
      else existingScript.addEventListener("load", initSquare);
      return;
    }

    // Inject Square JS
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://web.squarecdn.com/v1/square.js";
    script.async = true;

    script.onload = initSquare;
    script.onerror = () => {
      setInitError("Failed to load Square.js");
      setLoadingCard(false);
    };

    document.body.appendChild(script);
  }, [cardReady]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading order summary...</p>
      </div>
    );
  }

  const { subtotal, tax, shipping } = order;
  const finalTotal = Math.max(subtotal - discount + shipping + tax, 0.01);

  // ---------------------------
  // Create Order in Database
  // ---------------------------
  const createOrder = async (payload) => {
    try {
      const fixedCartItems =
        order.cartItems?.map((item) => ({
          ...item,
          vendorID: item.vendorID || item.vendorId || null,
          categoryId: item.categoryId || null,
        })) || [];

      const { data } = await API.post("/order", {
        userId: order.userId,
        email: order.email,
        cartItems: fixedCartItems,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: finalTotal,
        coupon,
        discount,
        ...payload,
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        html: `<p>Tracking Number: <b>${data.order.trackingNumber}</b></p>`,
        confirmButtonText: "View Order",
      }).then(() => {
        localStorage.removeItem("orderSummary");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("checkoutDraft");
        localStorage.removeItem("lensSelectionDetails");
        navigate(`/order/${data.order._id}`);
      });
    } catch (err) {
      console.error("Order creation failed:", err);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  // ---------------------------
  // Square Payment Handlers
  // ---------------------------
  const handleSquareSuccess = (response) => {
    const transactionId = response?.payment?.id || null;

    createOrder({
      paymentMethod: "Square",
      paymentStatus: "Paid",
      transactionId,
    });
  };

  const handleSquareFail = (message) => {
    createOrder({
      paymentMethod: "Square",
      paymentStatus: "Failed",
      transactionId: null,
    });

    Swal.fire("Payment Failed", message || "Square payment failed.", "error");
  };

  const handlePay = async () => {
    if (!card) return;

    setIsPaying(true);

    try {
      const tokenResult = await card.tokenize();

      if (tokenResult.status !== "OK") {
        return handleSquareFail("Card tokenization failed.");
      }

      const res = await fetch("http://localhost:4000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce: tokenResult.token,
          amount: finalTotal,
        }),
      });

      const data = await res.json();

      if (data.success) handleSquareSuccess(data);
      else handleSquareFail(data.message);
    } catch (err) {
      console.error("Payment error:", err);
      handleSquareFail("Payment processing error.");
    }

    setIsPaying(false);
  };

  // ---------------------------
  // UI
  // ---------------------------
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
            onClick={() => setDiscount(0)}
            className="px-4 bg-gray-300 rounded-lg"
          >
            Apply
          </button>
        </div>

        {/* Square Form */}
        <div className="space-y-3">
          {loadingCard && <p>Loading payment form…</p>}
          {initError && <p className="text-red-600">{initError}</p>}

          <div
            id="card-container"
            className="border rounded-lg p-4 bg-white"
            style={{ minHeight: "60px" }}
          />

          <button
            onClick={handlePay}
            disabled={!card || isPaying || !!initError}
            className={`w-full mt-2 py-2 rounded-lg font-semibold ${!card || isPaying || initError
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#f00000] text-white hover:bg-black"
              }`}
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
