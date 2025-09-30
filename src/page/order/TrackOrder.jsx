import React, { useState, useEffect } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

const TrackOrder = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    // Steps must match your Mongoose enum exactly
    const steps = [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
    ];

    // Calculate current step (highlight)
    const currentStep = order
        ? steps.findIndex(
            (s) => s.toLowerCase() === (order.orderStatus || "").toLowerCase()
        )
        : -1;

    // Fetch order by tracking number
    const handleTrack = async () => {
        if (!trackingNumber.trim()) {
            Swal.fire("Error", "Please enter a tracking number", "error");
            return;
        }
        setLoading(true);
        try {
            const { data } = await API.get(`/order/track/${trackingNumber}`);
            // Save entire order object (contains orderStatus & trackingHistory)
            setOrder({
                ...data,
                orderStatus: data.status, // API returns "status", rename for convenience
            });
        } catch (err) {
            Swal.fire("Not Found", "No order found with this tracking number", "error");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
                    Track Your Order
                </h2>

                {/* Input */}
                <div className="flex gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="Enter Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        className="flex-1 border p-2 rounded-lg uppercase"
                    />
                    <button
                        onClick={handleTrack}
                        className="bg-red-600 text-white px-4 rounded-lg hover:bg-black"
                    >
                        Track
                    </button>
                </div>

                {/* Progress Chain */}
                <div className="flex items-center justify-between w-full mb-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            {/* Circle */}
                            <div className="flex flex-col items-center w-20">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors
                  ${currentStep >= index
                                            ? "bg-red-600 border-red-600 text-white"
                                            : "border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <span
                                    className={`text-xs mt-2 ${currentStep >= index
                                        ? "text-red-600 font-semibold"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-[4px] mb-6 transition-colors duration-500
                  ${currentStep > index ? "bg-red-600" : "bg-gray-300"}`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-600 mb-4">Checking...</p>
                )}

                {/* Order Details */}
                {order && (
                    <div className="text-gray-700">
                        <p>
                            <b>Status:</b> {order.orderStatus}
                        </p>

                        {order.deliveryDate && (
                            <p>
                                <b>Delivery Date:</b>{" "}
                                {new Date(order.deliveryDate).toLocaleString([], {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true, // use false for 24-hour format
                                })}
                            </p>
                        )}

                        <h3 className="mt-4 font-semibold">Tracking History:</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            {order.trackingHistory.map((t, idx) => (
                                <li key={idx}>
                                    <b>{t.status}</b> - {t.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
