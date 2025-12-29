import { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/order/history/${user}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order history"
        );
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
      <div className="text-center mt-10 px-4">
        <h2 className="text-3xl font-bold text-[#f00000]">Order History</h2>
        <p className="text-black mt-4 text-lg">{error}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#f00000] text-white px-6 py-2 mb-10 rounded-lg hover:bg-black"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#f00000]">
        My Order
      </h2>

      {orders.length === 0 ? (
        <div className="text-center mt-6 px-4">
          <p>No orders found.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-[#f00000] text-white px-6 py-2 rounded-lg hover:bg-black"
          >
            Go to Home
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet: table layout */}
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Tracking no.</th>
                  <th className="border px-10 py-2">Image</th>
                  <th className="border px-4 py-2 text-left">Products</th>
                  <th className="border px-4 py-2">Total Amount</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Manage Order</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 text-center align-top"
                  >
                    <td className="border px-4 py-2 text-left align-top">
                      {order.trackingNumber}
                    </td>
                    <td className="border px-4 py-2 text-center align-top">
                      <div className="flex justify-center gap-2 flex-wrap">
                        {order.cartItems.map((cartItem, idx) => {
                          const imageUrl = cartItem.image?.startsWith("http")
                            ? cartItem.image
                            : IMAGE_URL + cartItem.image;
                          return (
                            <img
                              key={idx}
                              src={imageUrl}
                              alt={cartItem.image?.split("/").pop()}
                              className="h-20 w-24 object-cover rounded"
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="border px-4 py-2 align-top text-left">
                      {order.cartItems.map((p, idx) => (
                        <div key={idx} className="truncate">
                          {p.name} (x{p.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 align-top">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 align-top">
                      {order.orderStatus}
                    </td>
                    <td className="border px-4 py-2 align-top">
                      {(() => {
                        const btns = [];
                        btns.push(
                          <Link
                            to={`/view-order`}
                            state={{ id: order._id }}
                            key="view"
                          >
                            <button className="bg-yellow-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-yellow-800">
                              View
                            </button>
                          </Link>
                        );

                        // show claim button only if any cart item has a policy
                        if (
                          order?.cartItems?.some(
                            (item) => item?.policy?.status === "Active"
                          )
                        ) {
                          const isCancelled = order.orderStatus === "Cancelled";
                          const isDelivered = order.orderStatus === "Delivered";
                          const canClaim = isDelivered && !isCancelled;

                          btns.push(
                            <Link
                              to={canClaim ? `/insurance-claim` : "#"}
                              state={canClaim ? { order } : {}}
                              key="claim"
                            >
                              <button
                                className={`px-3 py-1.5 text-sm rounded-lg ${canClaim
                                  ? "bg-blue-600 text-white hover:bg-black"
                                  : "bg-gray-400 text-white cursor-not-allowed"
                                  }`}
                                disabled={!canClaim}
                              >
                                Claim
                              </button>
                            </Link>
                          );
                        }

                        btns.push(
                          <Link
                            to={`/track/${order.trackingNumber}`}
                            key="track"
                          >
                            <button className="bg-[#f00000] text-white px-3 py-1.5 text-sm rounded-lg hover:bg-black">
                              Track
                            </button>
                          </Link>
                        );
                        return (
                          <div className="flex items-center justify-end gap-2 w-full">
                            {btns}
                          </div>
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length > itemsPerPage && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-black text-white" : ""
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

          </div>

          {/* Mobile: card layout */}
          <div className="block md:hidden space-y-4">
            {paginatedOrders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">
                    Tracking:{" "}
                    <span className="font-normal">{order.trackingNumber}</span>
                  </div>
                  <div className="text-sm">{order.orderStatus}</div>
                </div>

                <div className="mb-2">
                  <div className="flex overflow-x-auto gap-2 pb-2">
                    {order.cartItems.map((cartItem, idx) => {
                      const imageUrl = cartItem.image?.startsWith("http")
                        ? cartItem.image
                        : IMAGE_URL + cartItem.image;
                      return (
                        <img
                          key={idx}
                          src={imageUrl}
                          alt={cartItem.image?.split("/").pop()}
                          className="h-16 w-20 object-cover rounded flex-shrink-0"
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-2 text-sm">
                  {order.cartItems.map((p, idx) => (
                    <div key={idx} className="truncate">
                      {p.name} (x{p.quantity})
                    </div>
                  ))}
                </div>

                <div className="mb-3 text-sm font-medium">
                  Total: ${order.total.toFixed(2)}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to={`/view-order`} state={{ id: order._id }}>
                    <button className="w-full sm:w-auto bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800">
                      View Order
                    </button>
                  </Link>

                  {order?.cartItems?.some(
                    (item) => item?.policy?.status === "Active"
                  ) && (
                      (() => {
                        const isCancelled = order.orderStatus === "Cancelled";
                        const isDelivered = order.orderStatus === "Delivered";
                        const canClaim = isDelivered && !isCancelled;

                        return (
                          <Link
                            to={canClaim ? `/insurance-claim` : "#"}
                            state={canClaim ? { order } : {}}
                          >
                            <button
                              className={`w-full sm:w-auto px-4 py-2 rounded-lg ${canClaim
                                ? "bg-blue-600 text-white hover:bg-black"
                                : "bg-gray-400 text-white cursor-not-allowed"
                                }`}
                              disabled={!canClaim}
                            >
                              Claim
                            </button>
                          </Link>
                        );
                      })()
                    )}

                  <Link to={`/track/${order.trackingNumber}`}>
                    <button className="w-full sm:w-auto bg-[#f00000] text-white px-4 py-2 rounded-lg hover:bg-black">
                      Track Order
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;

