import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../API/Api";
import Swal from "sweetalert2";


const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/order/${id}`);
        setOrder(res.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const handleBack = () => navigate("/order-history");

  // const handleRenew = async (policy) => {
  //   const result = await Swal.fire({
  //     title: "Renew Policy?",
  //     text: `Do you want to renew the policy "${policy.name}"?`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#2563eb",
  //     cancelButtonColor: "#6b7280",
  //     confirmButtonText: "Proceed to Payment",
  //   });

  //   if (!result.isConfirmed) return;

  //   // Store policy & order info in localStorage to access in payment page
  //   localStorage.setItem(
  //     "renewPolicy",
  //     JSON.stringify({ policy, orderId: order._id })
  //   );

  //   // Navigate to Payment Page
  //   navigate("/payment-policy");
  // };

  const handleRenew = async (policy) => {
  const result = await Swal.fire({
    title: "Renew Policy?",
    text: `Do you want to renew the policy "${policy.name}"?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Proceed to Payment",
  });

  if (!result.isConfirmed) return;

  try {
    // ✅ Save renewal data to localStorage before redirect
    localStorage.setItem(
      "renewPolicy",
      JSON.stringify({
        policy,                 // full policy data
        orderId: order._id,     // order ID
        from: location.pathname // for going back later
      })
    );

    // ✅ Redirect to payment policy page
    navigate("/payment-policy", { state: { from: location.pathname } });
  } catch (error) {
    console.error("Error while setting renew policy:", error);
    Swal.fire("Error", "Something went wrong while renewing policy.", "error");
  }
};

  const handleCancel = async () => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to cancel the order.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    setCancelling(true);
    try {
      const res = await API.put(`/cancleOrder/${order._id}`, { userId });
      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        text: res.data.message,
        confirmButtonColor: "#2563eb",
      });
      setOrder(res.data.order);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error cancelling order",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setCancelling(false);
    }
  };

  const Section = ({ title, children }) => (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
    >
      <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
      {children}
    </motion.section>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-base">
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Loading order details...
      </div>
    );

  if (!order)
    return (
      <div className="text-center mt-16 text-red-600 font-semibold text-base">
        Order not found.
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="text-gray-700 hover:cursor-pointer hover:text-black font-medium text-md flex items-center gap-1 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Orders
            </button>
          </div>
          <div className="text-center sm:text-right">
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
          </div>
          {["Placed", "Processing"].includes(order.orderStatus) && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className={`text-md font-medium px-4 py-3 rounded-md transition-colors ${
                cancelling
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:cursor-pointer text-white hover:bg-red-700"
              }`}
            >
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Ordered Products */}
            <Section title="Ordered Sunglasses">
              <div className="space-y-3">
                {order.cartItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start gap-3 border-b border-gray-200 py-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${Math.round(item.price)} × {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Size: {item.product_size?.join(", ") || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Color: {item.product_color?.join(", ") || "N/A"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Policy Details */}
            {order.cartItems[0] && (
              <Section title="Policy Details">
                <div className="space-y-2 text-sm text-gray-600">
                  {/* Current Policy */}
                  <div className="mb-3 border-b border-gray-200 pb-2">
                    <h3 className="font-medium mb-1">Current Policy:</h3>
                    {[
                      "name",
                      "price",
                      "companyName",
                      "coverage",
                      "durationDays",
                      "expiryDate",
                    ].map((key) => (
                      <div className="flex justify-between" key={key}>
                        <span className="font-medium">
                          {key.charAt(0).toUpperCase() +
                            key
                              .slice(1)
                              .replace("Name", " Name")
                              .replace("Days", " Days")}
                          :
                        </span>
                        <span>
                          {key === "price"
                            ? `$${Math.round(order.cartItems[0].policy[key])}`
                            : key === "expiryDate"
                            ? new Date(
                                order.cartItems[0].policy[key]
                              ).toLocaleDateString()
                            : order.cartItems[0].policy[key] || "N/A"}
                        </span>
                      </div>
                    ))}

                    {/* Status with color */}
                    <div className="flex justify-between mt-1">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`font-semibold ${
                          new Date(order.cartItems[0].policy.expiryDate) <
                          new Date()
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {new Date(order.cartItems[0].policy.expiryDate) <
                        new Date()
                          ? "Expired"
                          : "Active"}
                      </span>
                    </div>
                  </div>

                  {/* Previous Policies */}
                  {order.cartItems[0].previousPolicies?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-1">Previous Policies:</h3>
                      {order.cartItems[0].previousPolicies.map((prev, i) => {
                        const isExpired =
                          new Date(prev.expiryDate) < new Date();
                        return (
                          <div
                            key={i}
                            className="mb-2 border-b border-gray-100 pb-1 text-xs text-gray-700"
                          >
                            {[
                              "name",
                              "price",
                              "companyName",
                              "purchasedAt",
                              "expiryDate",
                            ].map((key) => (
                              <div className="flex justify-between" key={key}>
                                <span className="font-medium">
                                  {key.charAt(0).toUpperCase() +
                                    key
                                      .slice(1)
                                      .replace("Name", " Name")
                                      .replace("At", " At")}
                                  :
                                </span>
                                <span>
                                  {key === "price"
                                    ? `$${Math.round(prev[key])}`
                                    : ["purchasedAt", "expiryDate"].includes(
                                        key
                                      )
                                    ? new Date(prev[key]).toLocaleDateString()
                                    : prev[key] || "N/A"}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between">
                              <span className="font-medium">Status:</span>
                              <span
                                className={`font-semibold ${
                                  isExpired ? "text-red-600" : "text-green-600"
                                }`}
                              >
                                {isExpired ? "Expired" : "Active"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Section>
            )}

            {(() => {
              const policy = order?.cartItems?.[0]?.policy;
              if (!policy) return null;

              const isExpired = new Date(policy.expiryDate) < new Date();
              if (isExpired) {
                return (
                  <button
                    onClick={() => handleRenew(policy)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3"
                  >
                    Renew Policy
                  </button>
                );
              }
              return null;
            })()}

            {/* Tracking History */}
            {order.trackingHistory?.length > 0 && (
              <Section title="Tracking History">
                <ul className="space-y-2 text-sm text-gray-600">
                  {order.trackingHistory.map((t, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-2"
                    >
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          {t.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 sm:mt-0">
                        {new Date(t.updatedAt).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Order Summary */}
            <Section title="Order Summary">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      order.orderStatus === "Cancelled"
                        ? "bg-red-500"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment:</span>
                  <span>{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Method:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span>${Math.round(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax:</span>
                  <span>${Math.round(order.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping:</span>
                  <span>${Math.round(order.shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total:</span>
                  <span>${Math.round(order.total)}</span>
                </div>
              </div>
            </Section>

            {/* Shipping Address */}
            <Section title="Shipping Address">
              <div className="text-sm text-gray-600 space-y-1">
                {Object.entries(order.shippingAddress || {}).map(
                  ([key, val]) => (
                    <p key={key}>
                      <span className="font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>{" "}
                      {val}
                    </p>
                  )
                )}
              </div>
            </Section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewOrder;
