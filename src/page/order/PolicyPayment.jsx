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
  const [containerReady, setContainerReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  if (!data) {
    navigate("/order-history");
    return null;
  }

  const { policy, orderId, type } = data;

  const applicationId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  // ---- STEP 1: Detect container (Fixes first render bug) ----
  useEffect(() => {
    const waitForContainer = setInterval(() => {
      if (document.getElementById("card-container")) {
        setContainerReady(true);
        clearInterval(waitForContainer);
      }
    }, 40);

    return () => clearInterval(waitForContainer);
  }, []);

  // ---- STEP 2: Load Square SDK + Init card ----
  useEffect(() => {
    if (!containerReady) return;

    if (!applicationId || !locationId) {
      setInitError("Missing Square environment keys!");
      setLoading(false);
      return;
    }

    const scriptId = "square-web-sdk-policy";

    const initSquare = async () => {
      try {
        if (!window.Square) {
          setInitError("Square.js not loaded");
          setLoading(false);
          return;
        }

        // Prevent duplicate card initialisation
        if (window.__square_policy_card) {
          setCard(window.__square_policy_card);
          setLoading(false);
          return;
        }

        const payments = window.Square.payments(applicationId, locationId);
        const cardInstance = await payments.card();
        await cardInstance.attach("#card-container");

        window.__square_policy_card = cardInstance;
        setCard(cardInstance);
      } catch (err) {
        console.error("Square init error:", err);
        setInitError("Failed to initialize Square card");
      } finally {
        setLoading(false);
      }
    };

    // Script exists already?
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      if (window.Square) initSquare();
      else existingScript.addEventListener("load", initSquare);
      return;
    }

    // Inject Square SDK
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = initSquare;
    script.onerror = () => {
      setInitError("Failed to load Square SDK");
      setLoading(false);
    };

    document.body.appendChild(script);
  }, [containerReady]);

  // ---- SQUARE PAYMENT ----
  const handleSquarePayment = async () => {
    if (!card) return;

    setIsPaying(true);

    try {
      const tokenResult = await card.tokenize();

      if (tokenResult.status !== "OK") {
        Swal.fire("Error", "Card tokenization failed.", "error");
        setIsPaying(false);
        return;
      }

      const res = await fetch("http://localhost:4000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce: tokenResult.token,
          amount: policy.price,
        }),
      });

      const dataRes = await res.json();

      if (!dataRes.success) {
        Swal.fire("Payment Failed", dataRes.message || "Try again.", "error");
        setIsPaying(false);
        return;
      }

      // SUCCESS → update policy
      const isRenew = type === "renew";
      const endpoint = isRenew
        ? `/renewPolicy/${orderId}`
        : `/payPolicy/${orderId}`;

      await API.put(endpoint, {
        policyId: policy._id || policy.policyId,
        transactionId: dataRes.payment.id,
        paymentMethod: "Square",
      });

      await Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: isRenew
          ? "Your policy has been renewed successfully."
          : "Your policy is now active.",
        confirmButtonColor: "#2563eb",
      });

      navigate(`/view-order`, { state: { id: orderId } });
    } catch (err) {
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

        {/* Square UI */}
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
