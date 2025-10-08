import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../API/Api";

const ViewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading)
        return (
            <div className="text-center mt-20 text-lg text-gray-600 animate-pulse">
                Loading order details...
            </div>
        );
    if (!order)
        return (
            <div className="text-center mt-20 text-red-500 font-semibold text-lg">
                Order not found.
            </div>
        );

    const handleBack = () => navigate("/order-history");

    const Section = ({ title, children }) => (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md rounded-xl p-6 mb-6"
        >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
            <hr className="border-gray-300 mb-4" />
            {children}
        </motion.section>
    );

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black text-white text-center py-8 relative">
                    <button
                        onClick={handleBack}
                        className="absolute left-6 top-6 bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 active:scale-95 transition-all"
                    >
                        ← Back
                    </button>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold tracking-wide"
                    >
                        Order Details
                    </motion.h1>
                    <p className="text-sm mt-2 opacity-90">
                        Tracking Number: {order.trackingNumber || "N/A"}
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Order Summary */}
                    <Section title="Order Summary">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                            <p><strong>Status:</strong> {order.orderStatus}</p>
                            <p><strong>Payment:</strong> {order.paymentStatus}</p>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Total:</strong> ₹{order.total}</p>
                            <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                            <p><strong>Tax:</strong> ₹{order.tax}</p>
                            <p><strong>Shipping:</strong> ₹{order.shipping}</p>
                        </div>
                    </Section>

                    {/* Customer Info */}
                    <Section title="Customer Information">
                        <p><strong>Email:</strong> {order.email}</p>
                    </Section>

                    {/* Shipping */}
                    <Section title="Shipping Address">
                        {Object.entries(order.shippingAddress || {}).map(([key, val]) => (
                            <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                                {val}
                            </p>
                        ))}
                    </Section>

                    {/* Products */}
                    <Section title="Products">
                        <div className="space-y-5">
                            {order.cartItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-28 object-cover rounded-xl border"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-lg">{item.name}</p>
                                        <p className="text-gray-600">Price: ₹{item.price}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600">
                                            Size: {item.product_size?.join(", ") || "N/A"}
                                        </p>
                                        <p className="text-gray-600">
                                            Color: {item.product_color?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Section>

                    {/* Policy Info */}
                    {order.cartItems[0]?.policy && (
                        <Section title="Policy Information">
                            <p><strong>Policy Name:</strong> {order.cartItems[0].policy.name}</p>
                            <p><strong>Price:</strong> ₹{order.cartItems[0].policy.price}</p>
                            <p><strong>Company:</strong> {order.cartItems[0].policy.companyName}</p>
                            <p><strong>Coverage:</strong> {order.cartItems[0].policy.coverage}</p>
                            <p><strong>Duration:</strong> {order.cartItems[0].policy.durationDays} days</p>
                            <p><strong>Status:</strong> {order.cartItems[0].policy.status}</p>
                        </Section>
                    )}

                    {/* Tracking History */}
                    {order.trackingHistory?.length > 0 && (
                        <Section title="Tracking History">
                            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                                {order.trackingHistory.map((t, i) => (
                                    <li key={i}>
                                        <strong>{t.status}</strong> — {t.message}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ViewOrder;
