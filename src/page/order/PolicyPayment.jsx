import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../API/Api";

const PaymentPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState(null);
  const [ready, setReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  if (!data) {
    navigate("/order-history");
    return null;
  }

  const { policy, orderId, type } = data;

  const applicationId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  // STEP 1 — Wait for card container
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.getElementById("card-container")) {
        setReady(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // STEP 2 — Load Square SDK + Initialize card
  useEffect(() => {
    if (!ready) return;

    if (!applicationId || !locationId) {
      setInitError("Missing Square environment keys!");
      setLoading(false);
      return;
    }

    const scriptId = "square-policy-sdk";

    const initSquare = async () => {
      try {
        if (!window.Square) {
          setInitError("Square.js not loaded");
          setLoading(false);
          return;
        }

        if (window.__policy_square_card) {
          setCard(window.__policy_square_card);
          setLoading(false);
          return;
        }

        const payments = window.Square.payments(applicationId, locationId);
        const cardInstance = await payments.card();
        await cardInstance.attach("#card-container");

        window.__policy_square_card = cardInstance;
        setCard(cardInstance);
      } catch (error) {
        console.error("Square init error:", error);
        setInitError("Failed to initialize Square card");
      } finally {
        setLoading(false);
      }
    };

    const existing = document.getElementById(scriptId);
    if (existing) {
      if (window.Square) initSquare();
      else existing.addEventListener("load", initSquare);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    // script.src = "https://sandbox.web.squarecdn.com/v1/square.js"; //sandbox use only
    script.src = "https://web.squarecdn.com/v1/square.js"; //production use only
    script.async = true;
    script.onload = initSquare;
    script.onerror = () => {
      setInitError("Failed to load Square SDK");
      setLoading(false);
    };

    document.body.appendChild(script);
  }, [ready]);

  // STEP 3 — Handle Payment
  const handleSquarePayment = async () => {
    if (!card) return;

    setIsPaying(true);

    try {
      const tokenResult = await card.tokenize();

      if (tokenResult.status !== "OK") {
        Swal.fire("Error", "Card tokenization failed", "error");
        setIsPaying(false);
        return;
      }

      // CALL BACKEND USING AXIOS (Correct)
      const { data: payResponse } = await API.post("/pay", {
        nonce: tokenResult.token,
        amount: policy.price,
      });

      if (!payResponse.success) {
        Swal.fire(
          "Payment Failed",
          payResponse.message || "Card declined",
          "error"
        );
        setIsPaying(false);
        return;
      }

      // SUCCESS → UPDATE POLICY
      const endpoint =
        type === "renew" ? `/renewPolicy/${orderId}` : `/payPolicy/${orderId}`;

      await API.put(endpoint, {
        policyId: policy._id || policy.policyId,
        transactionId: payResponse.payment.id,
        paymentMethod: "Square",
      });

      await Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text:
          type === "renew"
            ? "Your policy has been renewed successfully."
            : "Your policy is now active.",
        confirmButtonColor: "#2563eb",
      });

      navigate("/view-order", { state: { id: orderId } });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }

    setIsPaying(false);
  };

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

        {loading && <p>Loading payment form…</p>}
        {initError && <p className="text-red-600">{initError}</p>}

        <div
          id="card-container"
          className="border rounded-lg p-4 bg-white"
          style={{ minHeight: "60px", marginBottom: "20px" }}
        />

        <button
          onClick={handleSquarePayment}
          disabled={!card || isPaying}
          className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${!card || isPaying
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#f00000] hover:bg-black"
            }`}
        >
          {isPaying ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPolicy;
