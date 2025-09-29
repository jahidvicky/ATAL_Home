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
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading order summary...</p>
      </div>
    );
  }

  const { subtotal, tax, shipping } = order;
  const finalTotal = subtotal - discount + shipping + tax; // final total after discount

  // Handle COD order creation
  const handleCOD = async () => {
    try {
      const { data } = await API.post("/order", {
        ...order,
        email: order.shippingAddress.email,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        total: finalTotal,
        discount,
        coupon,
      });

      localStorage.removeItem("orderSummary");
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      Swal.fire("Error", "Failed to place COD order", "error");
    }
  };

  // Handle PayPal order creation after success
  const handlePayPalSuccess = async (details) => {
    try {
      const { data } = await API.post("/order", {
        ...order,
        email: order.shippingAddress.email,
        paymentMethod: "PayPal",
        paymentStatus: "Paid",
        transactionId: details.id,
        total: finalTotal,
        discount,
        coupon,
      });

      localStorage.removeItem("orderSummary");
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      Swal.fire("Error", "Failed to save PayPal order", "error");
    }
  };

  // Handle Coupon
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire("Error", "Please enter a coupon code", "error");
      return;
    }

    try {
      const { data } = await API.get(`/validateCoupon/${coupon}`);

      if (data.valid) {
        const match = coupon.match(/(\d+)$/);
        let percentOff = match ? parseInt(match[1]) : 0;

        if (percentOff > 0) {
          const discountAmount = (subtotal * percentOff) / 100;
          setDiscount(discountAmount);
          Swal.fire("Success", `${percentOff}% discount applied!`, "success");
        } else {
          Swal.fire(
            "Error",
            "Coupon code is valid but no discount % found",
            "error"
          );
        }
      } else {
        Swal.fire("Invalid", "Coupon code is not valid", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to apply coupon", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 pt-20 pb-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        {/* Title */}
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
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
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
          <button
            onClick={handleApplyCoupon}
            className="bg-red-600 text-white px-4 rounded-lg hover:bg-black"
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
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: finalTotal.toFixed(2), // use final total
                    currency_code: "USD",

                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
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
            });
          }}
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
