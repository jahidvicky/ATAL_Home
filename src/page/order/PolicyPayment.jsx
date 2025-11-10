import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../API/Api";

const PaymentPolicy = () => {
  // const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    navigate("/order-history");
    return null;
  }

  const { policy, orderId } = data;

  const handlePayPalSuccess = async (details) => {
    try {
      const { policy, orderId, type } = data;
      const isRenew = type === "renew";

      const endpoint = isRenew
        ? `/renewPolicy/${orderId}`
        : `/payPolicy/${orderId}`;

      await API.put(endpoint, {
        policyId: policy._id || policy.policyId,
        transactionId: details.id,
        paymentMethod: "PayPal",
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
      Swal.fire(
        "Error",
        err.response?.data?.message || "Payment failed",
        "error"
      );
    }
  };

  const handlePayPalFail = () => {
    Swal.fire("Payment Failed", "Policy payment was not completed.", "error");
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

        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: policy.price.toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
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
