import React, { useEffect, useState } from "react";
import API from "../../API/Api";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const user = localStorage.getItem("user")


    const fetchOrders = async () => {
        try {
            const res = await API.get(`/order/history/${user}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
                // },
            });
            setOrders(res.data.orders || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch order history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    if (loading) return <p>Loading order history...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Order History</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">Products</th>
                            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.products.map((p, idx) => (
                                        <div key={idx}>
                                            {p.productId?.product_name} (x{p.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${order.totalAmount}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.orderStatus}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(order.createdAt).toLocaleString()}
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
