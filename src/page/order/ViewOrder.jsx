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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangingId, setExchangingId] = useState(null);

  //  Sunglasses category ID
  const SUNGLASSES_CATEGORY_ID = "6915705d9ceac0cdda41c83f";

  //  Check if product is eligible for exchange
  const canExchange = (item) => {
    if (!order) return false;
    if (order.orderStatus !== "Delivered") return false;
    if (!order.deliveryDate) return false;

    // Sunglasses only
    if (item.categoryId !== SUNGLASSES_CATEGORY_ID) return false;

    if (item.isPrescription) return false;
    if (item.status === "Cancelled") return false;
    if (item.exchangeStatus && item.exchangeStatus !== "None") return false;

    const hours =
      (Date.now() - new Date(order.deliveryDate).getTime()) /
      (1000 * 60 * 60);

    return hours <= 48;
  };


  const handleExchange = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Request Exchange",
      width: 600,
      showCancelButton: true,
      confirmButtonText: "Submit Request",
      confirmButtonColor: "#2563eb",
      html: `
      <div style="text-align:left">
        <label style="font-weight:600">Reason</label>
        <textarea 
          id="reason" 
          class="swal2-textarea" 
          placeholder="Why do you want to exchange this product?"
        ></textarea>

        <label style="font-weight:600;margin-top:10px;display:block">
          Upload Images
        </label>

        <input 
          id="images" 
          type="file" 
          class="swal2-file" 
          multiple 
          accept="image/*"
        />

        <div 
          id="preview"
          style="display:flex;flex-wrap:wrap;margin-top:10px;gap:8px"
        ></div>
      </div>
    `,
      focusConfirm: false,

      didOpen: () => {
        const input = document.getElementById("images");
        const preview = document.getElementById("preview");

        input.addEventListener("change", () => {
          preview.innerHTML = "";

          Array.from(input.files).forEach((file) => {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "80px";
            img.style.height = "80px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "6px";
            img.style.border = "1px solid #ddd";
            preview.appendChild(img);
          });
        });
      },

      preConfirm: () => {
        const reason = document.getElementById("reason").value;
        const images = document.getElementById("images").files;

        if (!reason.trim()) {
          Swal.showValidationMessage("Please enter exchange reason");
          return false;
        }

        return { reason, images };
      },
    });

    if (!formValues) return;

    const formData = new FormData();
    formData.append("productId", item._id);
    formData.append("reason", formValues.reason);

    Array.from(formValues.images || []).forEach((img) => {
      formData.append("exchangeImages", img);
    });

    try {
      setExchangingId(item._id);

      const res = await API.post(
        `/order/exchange/${order._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire("Success", "Exchange request sent", "success");
      setOrder(res.data.order);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Exchange failed",
        "error"
      );
    } finally {
      setExchangingId(null);
    }
  };


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
      navigate("/payment-policy", {
        state: {
          policy: {
            _id: policy._id,
            name: policy.name,
            companyId: policy.companyId,
            price: policy.price,
          },
          orderId: order._id,
          type: "renew",
        },
      });
    } catch (error) {
      console.error("Error while setting renew policy:", error);
      Swal.fire(
        "Error",
        "Something went wrong while renewing policy.",
        "error"
      );
    }
  };


  const handleProductCancel = async () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: "warning",
        title: "No Product Selected",
        text: "Please select a product to cancel.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const userId = localStorage.getItem("user");
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to cancel the product.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Cancel Product?",
      text: `Do you want to cancel "${selectedProduct.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel",
    });

    if (!result.isConfirmed) return;

    setCancelling(true);
    try {
      const res = await API.put(`/cancleOrder/${order._id}`, {
        userId,
        productId: selectedProduct._id, // sending selected product ID
      });

      Swal.fire({
        icon: "success",
        title: "Product Cancelled",
        text: res.data.message || `${selectedProduct.name} has been cancelled.`,
        confirmButtonColor: "#2563eb",
      });
      setOrder(res.data.order);
      setSelectedProduct(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error cancelling product",
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
        <svg className="animate-spin h-10 w-10 mr-2" viewBox="0 0 24 24">
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
      <div className="text-center mt-16 text-[#f00000] font-semibold text-base">
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
          {/* Cancel Product Section */}
          {["Placed", "Processing"].includes(order.orderStatus) && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Product Selection */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Select Product
                </label>
                <select
                  value={selectedProduct?._id || ""}
                  onChange={(e) => {
                    const product = order?.cartItems.find(
                      (item) => item._id === e.target.value
                    );
                    setSelectedProduct(product);
                  }}
                  required
                  className="border border-gray-300 p-2 w-64 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="">-- Select Product --</option>
                  {order?.cartItems
                    .filter(item => item.status !== "Cancelled")
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name} (${item.price})
                      </option>
                    ))}
                </select>
              </div>

              {/* Cancel Button */}
              <button
                onClick={handleProductCancel}
                disabled={cancelling || !selectedProduct}
                className={`text-md font-medium px-4 py-3 rounded-md mt-7 transition-colors ${cancelling || !selectedProduct
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#f00000] hover:cursor-pointer text-white hover:bg-red-700"
                  }`}
              >
                {cancelling ? "Cancelling..." : "Cancel Selected Product"}
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Ordered Products */}
            <Section title="Ordered Products">
              <div className="space-y-3">
                {order.cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
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
                      {/* PRODUCT NAME */}
                      <p
                        className={`text-base font-medium ${item.status === "Cancelled"
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                          }`}
                      >
                        {item.name}

                        {/* ❌ Cancelled Badge */}
                        {item.status === "Cancelled" && (
                          <span className="ml-2 text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                            Cancelled
                          </span>
                        )}
                      </p>

                      {/* PRODUCT META */}
                      <p className="text-sm text-gray-600">
                        ${Math.round(item.price)} × {item.quantity}
                      </p>

                      <p className="text-sm text-gray-600">
                        Size: {item.product_size?.join(", ") || "N/A"}
                      </p>

                      <p className="text-sm text-gray-600">
                        Color: {item.product_color?.join(", ") || "N/A"}
                      </p>

                      {/* 🔁 EXCHANGE UI */}
                      <div className="mt-2">
                        {item.exchangeStatus === "Requested" && (
                          <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                            Exchange Requested
                          </span>
                        )}

                        {item.exchangeStatus === "Approved" && (
                          <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                            Exchange Approved – Processing
                          </span>
                        )}

                        {item.exchangeStatus === "Rejected" && (
                          <span className="inline-block text-xs font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                            Exchange Rejected
                          </span>
                        )}

                        {item.exchangeStatus === "Completed" && (
                          <span className="inline-block text-xs font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                            Exchange Completed
                          </span>
                        )}

                        {/* 🔁 REQUEST EXCHANGE BUTTON */}
                        {canExchange(item) && (
                          <button
                            onClick={() => handleExchange(item)}
                            disabled={exchangingId === item._id}
                            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            {exchangingId === item._id
                              ? "Requesting..."
                              : "Request Exchange"}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>


            {/* Policy Details */}
            {order.cartItems[0]?.policy && (
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
                        className={`font-semibold ${new Date(order.cartItems[0].policy.expiryDate) <
                          new Date()
                          ? "text-[#f00000]"
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
                                className={`font-semibold ${isExpired ? "text-[#f00000]" : "text-green-600"
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
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${order.orderStatus === "Cancelled"
                      ? "bg-[#f00000]"
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
