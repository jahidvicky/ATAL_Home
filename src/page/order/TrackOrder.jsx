import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API/Api";
import Swal from "sweetalert2";

const TrackOrder = () => {
    const navigate = useNavigate();
    const { trackingNumber: paramTracking } = useParams();

    const [trackingNumber, setTrackingNumber] = useState(paramTracking || "");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    const steps = [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
    ];

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
            setOrder({
                ...data,
                orderStatus: data.status,
            });
        } catch (err) {
            Swal.fire("Not Found", "No order found with this tracking number", "error");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    // Automatically track if param is present
    useEffect(() => {
        if (paramTracking) handleTrack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramTracking]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#f00000]">
                        Track Your Order
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition hover:cursor-pointer"
                    >
                        ← Back
                    </button>
                </div>

                {/* Input */}
                <div className="flex gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="Enter Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        className="flex-1 border border-gray-300 p-2 rounded-lg uppercase focus:ring-2 focus:ring-red-500 outline-none"
                        disabled
                    />
                    <button
                        onClick={handleTrack}
                        disabled={loading}
                        className={`px-4 rounded-lg text-white transition hover:cursor-pointer ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#f00000] hover:bg-black"
                            }`}
                    >
                        {loading ? "Checking..." : "Track"}
                    </button>
                </div>

                {/* Progress Steps */}
                {order && (
                    <div className="flex items-center justify-between w-full mb-8">
                        {steps.map((step, index) => (
                            <React.Fragment key={step}>
                                <div className="flex flex-col items-center w-20">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors
                                            ${currentStep >= index
                                                ? "bg-[#f00000] border-red-600 text-white"
                                                : "border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`text-xs mt-2 ${currentStep >= index
                                            ? "text-[#f00000] font-semibold"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {step}
                                    </span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-[3px] mb-6 transition-colors duration-500
                                            ${currentStep > index ? "bg-[#f00000]" : "bg-gray-300"}`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Order Info */}
                {order ? (
                    <div className="text-gray-700 space-y-2">
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
                                    hour12: true,
                                })}
                            </p>
                        )}
                        <div>
                            <h3 className="mt-4 font-semibold text-gray-800 border-b pb-2">
                                Tracking History:
                            </h3>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                {order.trackingHistory.map((t, idx) => (
                                    <li key={idx}>
                                        <b>{t.status}</b> – {t.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    !loading && (
                        <p className="text-center text-gray-500">
                            Enter your tracking number to check order progress.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
