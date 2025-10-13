import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import API from "../../API/Api";

const PaymentPolicy = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("renewPolicy") || localStorage.getItem("payPolicy");
    if (stored) setData(JSON.parse(stored));
    else navigate("/order-history");
  }, [navigate]);

  if (!data) return null;

  const { policy, orderId } = data;

  const handlePayPalSuccess = async (details) => {
    try {
      await API.put(`/payPolicy/${orderId}`, {
        policyId: policy._id || policy.policyId,
        transactionId: details.id,
        paymentMethod: "PayPal",
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your policy is now active.",
      });

      localStorage.removeItem("renewPolicy");
      localStorage.removeItem("payPolicy");
      navigate(`/order/${orderId}`);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Payment failed", "error");
    }
  };

  const handlePayPalFail = () => {
    Swal.fire("Payment Failed", "Policy payment was not completed.", "error");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 pt-20 pb-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
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

        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [{ amount: { value: policy.price.toFixed(2), currency_code: "USD" } }],
            })
          }
          onApprove={(data, actions) =>
            actions.order.capture().then((details) => {
              if (details.status === "COMPLETED") handlePayPalSuccess(details);
              else handlePayPalFail();
            })
          }
          onError={handlePayPalFail}
          onCancel={handlePayPalFail}
        />
      </div>
    </div>
  );
};

export default PaymentPolicy;
