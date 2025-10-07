import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import API from "../../API/Api"

const ViewOrder = () => {
    const location = useLocation();
    const { id } = location.state;
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
        fetchOrder();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading order details...</div>;
    if (!order) return <div className="text-center mt-10 text-red-500">Order not found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center py-10">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-7xl p-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black text-white text-center py-8 rounded-xl mb-8">
                    <h1 className="text-4xl font-semibold">Order Details</h1>
                    <p className="text-sm mt-2 opacity-90">Tracking Number: {order.trackingNumber}</p>
                </div>

                {/* Order Summary */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <hr className="border-gray-300 mb-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>Order Status:</strong> {order.orderStatus}</p>
                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Total:</strong> ₹{order.total}</p>
                        <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                        <p><strong>Tax:</strong> ₹{order.tax}</p>
                        <p><strong>Shipping:</strong> ₹{order.shipping}</p>
                    </div>
                </section>

                {/* Customer Info */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                    <hr className="border-gray-300 mb-3" />
                    <p><strong>Email:</strong> {order.email}</p>
                </section>

                {/* Shipping Address */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
                    <hr className="border-gray-300 mb-3" />
                    <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
                    <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                    <p><strong>City:</strong> {order.shippingAddress.city}</p>
                    <p><strong>Province:</strong> {order.shippingAddress.province}</p>
                    <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                    <p><strong>Country:</strong> {order.shippingAddress.country}</p>
                    <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                </section>

                {/* Cart Items */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <hr className="border-gray-300 mb-3" />
                    <div className="space-y-4">
                        {order.cartItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 border-b pb-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-30 h-25 object-cover rounded-lg border"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">
                                        Size: {item.product_size?.join(", ") || "N/A"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Color: {item.product_color?.join(", ") || "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Policy Info */}
                {order.cartItems[0]?.policy && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Policy Information</h2>
                        <hr className="border-gray-300 mb-3" />
                        <p><strong>Policy Name:</strong> {order.cartItems[0].policy.name}</p>
                        <p><strong>Price:</strong> ₹{order.cartItems[0].policy.price}</p>
                        <p><strong>Company:</strong> {order.cartItems[0].policy.companyName}</p>
                        <p><strong>Coverage:</strong> {order.cartItems[0].policy.coverage}</p>
                        <p><strong>Duration:</strong> {order.cartItems[0].policy.durationDays} days</p>
                        <p><strong>Status:</strong> {order.cartItems[0].policy.status}</p>
                    </section>
                )}

                {/* Tracking History */}
                {order.trackingHistory && order.trackingHistory.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Tracking History</h2>
                        <hr className="border-gray-300 mb-3" />
                        <ul className="list-disc ml-6 text-sm text-gray-700">
                            {order.trackingHistory.map((t, i) => (
                                <li key={i}>
                                    <strong>{t.status}</strong> — {t.message}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ViewOrder;
