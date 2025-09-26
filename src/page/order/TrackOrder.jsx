import React, { useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

const TrackOrder = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async () => {
        if (!trackingNumber.trim()) {
            Swal.fire("Error", "Please enter a tracking number", "error");
            return;
        }
        setLoading(true);
        try {
            const { data } = await API.get(`/order/track/${trackingNumber}`);
            setOrder(data.order);
        } catch (err) {
            Swal.fire("Not Found", "No order found with this tracking number", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
                    Track Your Order
                </h2>
                <div className="flex gap-2 mb-4">
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

                {loading && <p className="text-center">Checking...</p>}

                {order && (
                    <div className="mt-4 text-gray-700">
                        <p><b>Status:</b> {order.orderStatus}</p>
                        {order.deliveryDate && <p><b>Delivery Date:</b> {order.deliveryDate}</p>}

                        <h3 className="mt-4 font-semibold">Tracking History:</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            {order.trackingHistory.map((t, idx) => (
                                <li key={idx}>
                                    <b>{t.status}</b> – {t.message}
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
