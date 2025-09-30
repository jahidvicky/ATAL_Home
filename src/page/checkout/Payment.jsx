import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import API from "../../API/Api";

const Payment = () => {
  const [order, setOrder] = useState(null);
  const [coupon, setCoupon] = useState(""); // coupon input
  const [discount, setDiscount] = useState(0); // discount value
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem("orderSummary");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
  }, []);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading order summary...</p>
      </div>
    );
  }

  const { subtotal, tax, shipping, items } = order;
  const finalTotal = subtotal - discount + shipping + tax;

  // Handle COD order creation
  const handleCOD = async () => {
    try {
      const { data } = await API.post("/order", {
        ...order,
        // user: user._id,
        email: order.shippingAddress.email,
        total: finalTotal,
        discount,
        coupon,
        // ...payload,
      });
      localStorage.removeItem("orderSummary");
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to place COD order",);

    }
  };

  // Handle PayPal success
  const handlePayPalSuccess = (details) => {
    createOrder({
      paymentMethod: "PayPal",
      paymentStatus: "Paid",
      transactionId: details.id,
    });
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire("Error", "Please enter a coupon code", "error");
      return;
    }

    try {
      // Pass subtotal and category as query params
      const category = order.items?.[0]?.category || ""; // example: take first item category
      const { data } = await API.get(
        `/validateCoupon/${coupon}?cartTotal=${subtotal}&category=${category}`
      );

      if (data.success) {
        setDiscount(data.data.discountAmount);
        Swal.fire(
          "Success",
          `Coupon applied! ${data.data.discountType === "percentage"
            ? "Discounted " + data.data.discountAmount.toFixed(2)
            : "Flat discount " + data.data.discountAmount.toFixed(2)
          }`,
          "success"
        );
      } else {
        setDiscount(0);
        Swal.fire("Invalid", data.message || "Coupon not valid", "error");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
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

            {/* Discount row */}
            {discount > 0 && (
              <div className="flex justify-between items-start text-green-600 mt-2">
                {/* Discount label */}
                <span className="font-semibold">Discount</span>

                {/* Amount and Remove button in column */}
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-green-700">
                    - ${discount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      setDiscount(0);
                      setCoupon(""); // clear coupon input
                      Swal.fire("Removed", "Coupon removed", "info");
                    }}
                    className="text-red-500 rounded hover:text-red-600 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-bold text-red-600 text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className="flex-1 border p-2 rounded-lg uppercase"
          />
          {/* current */}
          <button
            onClick={handleApplyCoupon}
            disabled={coupon.trim().length < 3} // disable if less than 3 characters
            className={`px-4 rounded-lg 
    ${coupon.trim().length < 3
                ? "bg-gray-400 cursor-not-allowed" // disabled style
                : "bg-red-600 text-white hover:bg-black" // enabled style
              }`}
          >
            Apply
          </button>
        </div>

        {/* PayPal Buttons */}
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
                    value: finalTotal.toFixed(2), // use final total
                    currency_code: "USD",

                  },
                },
              ],
            })
          }
          onApprove={(data, actions) =>
            actions.order.capture().then((details) => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Transaction completed by ${details.payer.name.given_name}`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });
              handlePayPalSuccess(details);
            })
          }
          onError={(err) => {
            console.error("PayPal Checkout Error:", err);
            Swal.fire("Error", "PayPal Checkout Failed", "error");
          }}
        />

        {/* COD Button */}
        <div className="mt-5">
          <button
            onClick={handleCOD}
            className="bg-black text-white text-2xl p-3 rounded-lg w-full hover:bg-red-600 hover:text-white"
          >
            Cash On Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
