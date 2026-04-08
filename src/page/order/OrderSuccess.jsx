import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import API, { IMAGE_URL, PDF_URL } from "../../API/Api";
import successImage from "../../assets/order/tick.png";
import { clearCart } from "../../redux/cartSlice";

const OrderSuccess = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/order/${id}`);
        setOrder(data.order);
        dispatch(clearCart());
      } catch (err) {
        console.error(err);
        setError("Failed to load order. Please try again.");
      }
    };

    fetchOrder();
  }, [id, dispatch]);

  if (error)
    return (
      <p className="text-[#f00000] text-center mt-20 text-lg">{error}</p>
    );

  if (!order)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>
    );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(price);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full animate-fadeIn">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={successImage}
            alt="Success"
            className="w-24 h-24 object-contain animate-bounce"
          />
        </div>

        <h1 className="text-3xl font-bold text-[#f00000] text-center mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-900 text-center mb-6">
          Thank you{" "}
          <span className="font-semibold">
            {order.shippingAddress?.fullName}
          </span>
          , your order has been placed.
        </p>

        {/* ORDER DETAILS */}
        <section className="mb-6 border-t pt-4">
          <h2 className="font-semibold text-xl mb-3 border-b pb-2">
            Order Details
          </h2>

          <table className="w-full border border-gray-300 text-sm">
            <tbody>

              <tr className="border-b">
                <td className="font-semibold p-3 w-[220px] bg-gray-50">
                  Order ID
                </td>
                <td className="p-3 break-all">
                  {order._id}
                </td>
              </tr>

              {order.orderNumber && (
                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-50">
                    Order Number
                  </td>
                  <td className="p-3 font-mono">
                    {order.orderNumber}
                  </td>
                </tr>
              )}

              <tr className="border-b">
                <td className="font-semibold p-3 bg-gray-50">
                  Status
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  {order.orderStatus}
                </td>
              </tr>

              <tr className="border-b">
                <td className="font-semibold p-3 bg-gray-50">
                  Payment Status
                </td>
                <td className="p-3">
                  {order.paymentStatus}
                </td>
              </tr>

              <tr className="border-b">
                <td className="font-semibold p-3 bg-gray-50">
                  Total
                </td>
                <td className="p-3 font-semibold">
                  {formatPrice(order.total)}
                </td>
              </tr>

              <tr>
                <td className="font-semibold p-3 bg-gray-50">
                  Delivery Address
                </td>
                <td className="p-3">
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.province}{" "}
                  {order.shippingAddress?.postalCode}
                </td>
              </tr>

            </tbody>
          </table>
        </section>

        {/* ITEMS */}
        <section className="mb-6 border-t pt-4">
          <h2 className="font-semibold text-xl mb-4 border-b pb-1">
            Items
          </h2>

          {order.cartItems.map((item, i) => {

            const lensPrice = item.lens?.totalPrice || 0;
            const policyPrice = item.policy?.price || 0;

            const isContactLens =
              item.categoryId === "6915735feeb23fa59c7d532b";

            const itemTotal =
              item.price * item.quantity +
              policyPrice +
              (isContactLens ? 0 : lensPrice);

            return (
              <div key={i} className="flex flex-col py-3 border-b">

                <div className="flex items-center justify-between">

                  <div className="flex items-center space-x-4">

                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : IMAGE_URL + item.image
                      }
                      alt={item.name}
                      className="w-28 h-16 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p>{formatPrice(item.price)}</p>

                      <p className="text-gray-500 text-sm">
                        Quantity: {item.quantity}
                      </p>

                      {!isContactLens &&
                        item.lens?.lens?.selectedLens && (
                          <p className="text-gray-500 text-sm">
                            Lens: {item.lens.lens.selectedLens} (
                            {formatPrice(lensPrice)})
                          </p>
                        )}

                      {item.policy?.name && (
                        <p className="text-gray-500 text-sm">
                          Policy: {item.policy.name} (
                          {formatPrice(policyPrice)})
                        </p>
                      )}
                    </div>

                  </div>

                  <span className="font-semibold">
                    {formatPrice(itemTotal)}
                  </span>

                </div>
              </div>
            );
          })}

          {/* INVOICE DOWNLOAD */}
          <div className="mt-4 flex justify-end gap-3">

            <button
              onClick={() =>
                window.open(`${PDF_URL}/${order._id}/invoice`, "_blank")
              }
              className="bg-[#f00000] text-white px-4 py-2 rounded-lg hover:bg-black"
            >
              Download Invoice
            </button>

            {/* {order.shippingLabel && (
              <button
                onClick={() =>
                  window.open(
                    `${API.defaults.baseURL}/shipping${order.shippingLabel}`,
                    "_blank"
                  )
                }
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"
              >
                Download Shipping Label
              </button>
            )} */}

          </div>
        </section>

        {/* TRACK ORDER */}
        {order.orderNumber && (
          <div className="mb-6 flex justify-center">
            <Link
              to={`/track/${order.orderNumber}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-black"
            >
              Track My Order
            </Link>
          </div>
        )}

        {/* CONTINUE SHOPPING */}
        <Link
          to="/"
          className="block text-center bg-[#f00000] text-white py-3 px-6 rounded-xl hover:bg-black font-semibold"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
};

export default OrderSuccess;