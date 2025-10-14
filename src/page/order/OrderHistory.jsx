import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const user = localStorage.getItem("user");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get(`/order/history/${user}`);
                setOrders(res.data.orders || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch order history");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setError("User not logged in");
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <p className="text-center">Loading order history...</p>;
    }

    if (error) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-red-600">Order History</h2>
                <p className="text-black mt-4 text-lg">{error}</p>
                <Link
                    to="/"
                    className="mt-6 inline-block bg-red-600 text-white px-6 py-2 mb-10 rounded-lg hover:bg-black"
                >
                    Go to Home
                </Link>
            </div>
        );
    }


    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
                My Order
            </h2>

            {orders.length === 0 ? (
                <div className="text-center mt-6">
                    <p>No orders found.</p>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-black"
                    >
                        Go to Home
                    </Link>
                </div>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Tracking no.</th>
                            <th className="border px-10 py-2">Image</th>
                            <th className="border px-4 py-2">Products</th>
                            <th className="border px-4 py-2">Total Amount</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Manage Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 text-center">
                                <td className="border px-4 py-2">{order.trackingNumber}</td>
                                <td className="border px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        {order.cartItems.map((cartItem, idx) => {
                                            const imageUrl = cartItem.image.startsWith("http")
                                                ? cartItem.image
                                                : IMAGE_URL + cartItem.image;
                                            return (
                                                <img
                                                    key={idx}
                                                    src={imageUrl}
                                                    alt={cartItem.image.split("/").pop()}
                                                    className="h-13 w-30 object-cover rounded"
                                                />
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    {order.cartItems.map((p, idx) => (
                                        <div key={idx}>
                                            {p.name} (x{p.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                                <td className="border px-4 py-2">{order.orderStatus}</td>
                                <td className="border px-4 py-2">
                                    <Link
                                        to={`/view-order`}
                                        state={{ id: order._id }}
                                    >
                                        <button className="bg-yellow-600 text-white mr-3 px-4 py-2 rounded-lg hover:bg-yellow-800 hover:cursor-pointer">
                                            View Order
                                        </button>
                                    </Link>

                                    {/* Show claim button only if policy is active AND order not cancelled */}
                                    {order?.cartItems?.some(item => item?.policy?.status === "Active") && (
                                        <Link
                                            to={order.orderStatus === "Cancelled" ? "#" : `/insurance-claim`}
                                            state={order.orderStatus === "Cancelled" ? {} : { order }}
                                        >
                                            <button
                                                className={`mr-3 px-4 py-2 rounded-lg ${order.orderStatus === "Cancelled"
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-black hover:cursor-pointer"
                                                    }`}
                                                disabled={order.orderStatus === "Cancelled"} // disable button
                                            >
                                                Claim
                                            </button>
                                        </Link>
                                    )}

                                    <Link to={`/track/${order.trackingNumber}`}>
                                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-black hover:cursor-pointer">
                                            Track Order
                                        </button>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
