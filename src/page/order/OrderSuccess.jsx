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
    return <p className="text-red-500 text-center mt-20 text-lg">{error}</p>;
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
        {/*  Success Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={successImage}
            alt="Success"
            className="w-24 h-24 object-contain animate-bounce"
          />
        </div>

        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-900 text-center mb-6">
          Thank you{" "}
          <span className="font-semibold">
            {order.shippingAddress?.fullName}
          </span>
          , your order has been placed.
        </p>

        {/*  Order Details */}
        <section className="mb-6 border-t pt-4">
          <h2 className="font-semibold text-xl mb-2 border-b pb-1">
            Order Details
          </h2>
          <p>
            <b>Order ID:</b> {order._id}
          </p>

          {order.trackingNumber && (
            <p>
              <b>Tracking Number:</b>{" "}
              <span className="font-mono text-black">
                {order.trackingNumber}
              </span>
            </p>
          )}

          <p>
            <b>Order Status:</b>{" "}
            <span className="text-black">{order.orderStatus}</span>
          </p>
          <p>
            <b>Payment Method:</b> {order.paymentMethod}
          </p>
          <p>
            <b>Total:</b>{" "}
            <span className="text-black font-semibold">
              {formatPrice(order.total)}
            </span>
          </p>
          <p>
            <b>Delivery To:</b> {order.shippingAddress?.address},{" "}
            {order.shippingAddress?.city}, {order.shippingAddress?.province}{" "}
            {order.shippingAddress?.postalCode}
          </p>
        </section>

        {/*  Items */}
        <section className="mb-6 border-t pt-4">
          <h2 className="font-semibold text-xl mb-4 border-b pb-1">Items</h2>
          {order.cartItems.map((item, i) => {
            const lensPrice = item.lens?.totalPrice || 0;
            const policyPrice = item.policy?.price || 0;

            const isContactLens = item.subCategoryName === "Contact Lenses";

            const itemTotal =
              item.price * item.quantity +
              policyPrice +
              (isContactLens ? 0 : lensPrice);


            return (
              <div key={i} className="flex flex-col py-2 border-b">
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
                      <p>${item.price}</p>
                      <p className="text-gray-500 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      {/* {item.lens?.lens?.selectedLens && (
                        <p className="text-gray-500 text-sm">
                          Lens: {item.lens.lens.selectedLens} ($
                          {lensPrice.toFixed(2)})
                        </p>
                      )} */}

                      {/* Hide lens info for contact lenses */}
                      {!isContactLens && item.lens?.lens?.selectedLens && (
                        <p className="text-gray-500 text-sm">
                          Lens: {item.lens.lens.selectedLens} ($
                          {lensPrice.toFixed(2)})
                        </p>
                      )}

                      {item.policy?.name && (
                        <p className="text-gray-500 text-sm">
                          Policy: {item.policy.name} (${policyPrice.toFixed(2)})
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

          {/*  Download Invoice */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                window.open(`${PDF_URL}/${order._id}/invoice`, "_blank")
              }
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-black hover:cursor-pointer"
            >
              Download Invoice
            </button>
          </div>
        </section>

        {/*  Track My Order Button (using trackingNumber!) */}
        {order.trackingNumber && (
          <div className="mb-6 flex justify-center">
            <Link
              to={`/track/${order.trackingNumber}`} //  Correct tracking number
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-black hover:cursor-pointer"
            >
              Track My Order
            </Link>
          </div>
        )}

        {/* Continue Shopping */}
        <Link
          to="/"
          className="block text-center bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-black transition-colors duration-300 font-semibold hover:cursor-pointer"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
