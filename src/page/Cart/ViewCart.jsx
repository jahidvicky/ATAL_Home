import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const ViewCart = ({ items, hideCheckout }) => {
  // const cartItems = useSelector((state) => state.cart.items);
  const cartItems = items || [];
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => {
    const framePrice = Number(item.price) || 0;
    const lensPrice = Number(item.lens?.totalPrice) || 0;
    const policyPrice = Number(item.policy?.price) || 0;
    const qty = Number(item.quantity) || 1;
    return total + (framePrice + lensPrice + policyPrice) * qty;
  }, 0);

  const orderItems = cartItems.map((item) => ({
    productId: item.id,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
    quantity: item.quantity,
    framePrice: item.price,
    lens: item.lens,
    policy: item.policy,
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      {/* <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2> */}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.
          <Link
            to="/"
            className="text-blue-600 ml-2 hover:underline hover:cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded shadow-sm"
              >
                <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-50 h-24 object-cover rounded mr-4 hover:cursor-pointer"
                  />
                </Link>

                <div className="flex-1 mt-4 md:mt-0">
                  <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                    <h4 className="text-lg font-semibold hover:cursor-pointer">
                      {item.name}
                    </h4>
                  </Link>

                  <p>
                    Size:{" "}
                    {item.selectedSize?.length ? item.selectedSize : "None"}
                  </p>

                  <p>
                    Color:{" "}
                    <span
                      style={{
                        backgroundColor: item.selectedColor,
                        padding: "0 10px",
                        borderRadius: "50%",
                      }}
                    ></span>{" "}
                    {item.selectedColor || "None"}
                  </p>

                  <div className="mt-1">
                    {item.originalPrice &&
                    Number(item.originalPrice) > Number(item.price) ? (
                      <div className="flex items-center gap-3">
                        <span className="line-through text-sm">
                          ${Number(item.originalPrice).toFixed(2)}
                        </span>
                        <span className="font-semibold">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">
                        ${Number(item.price || 0).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {item.lens && (
                    <div className="mt-2 text-sm text-gray-700">
                      {item.lens && (
                        <p>
                          Lens: ${(item.lens.totalPrice || 0).toFixed(2)} (
                          {item.lens.lens?.selectedLens || "N/A"})
                        </p>
                      )}

                      <p>
                        <strong>Prescription Method:</strong>{" "}
                        {item.lens.lens?.prescriptionMethod}
                      </p>

                      {item.lens.lens?.prescription && (
                        <div className="ml-2">
                          <p>
                            OD: {item.lens.lens?.prescription.odSph}/
                            {item.lens.lens.prescription.odCyl}
                          </p>
                          <p>
                            OS: {item.lens.lens?.prescription.osSph}/
                            {item.lens.lens.prescription.osCyl}
                          </p>
                          <p>
                            PD: {item.lens.lens?.prescription.pdLeft}/
                            {item.lens.lens?.prescription.pdRight}
                          </p>
                          <p>Doctor: {item.lens.lens?.prescription.doctor}</p>
                        </div>
                      )}

                      {item.lens.lens?.lensType && (
                        <p>
                          <strong>Lens Type:</strong>{" "}
                          {item.lens.lens?.lensType.name} (
                          {item.lens.lens?.lensType.price})
                        </p>
                      )}

                      {item.lens.lens?.thickness && (
                        <p>
                          <strong>Thickness:</strong>{" "}
                          {item.lens.lens?.thickness.name} (
                          {item.lens.lens?.thickness.price})
                        </p>
                      )}

                      {item.lens.lens?.tint && (
                        <p>
                          <strong>Tint:</strong> {item.lens.lens?.tint.name} (
                          {item.lens.lens?.tint.price})
                        </p>
                      )}

                      {item.lens.lens?.enhancement && (
                        <p>
                          <strong>Enhancement:</strong>{" "}
                          {item.lens.lens?.enhancement.name} (
                          {item.lens.lens?.enhancement.price})
                        </p>
                      )}

                      <p>
                        <strong>Total Lens Price:</strong> $
                        {(item.lens.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {item.policy && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        <strong>Policy Name:</strong> {item.policy.name}
                      </p>
                      <p>
                        <strong>Company:</strong> {item.policy.companyName}
                      </p>
                      <p>
                        <strong>Coverage:</strong> {item.policy.coverage}
                      </p>
                      <p>
                        <strong>Price:</strong> $
                        {(item.policy.price || 0).toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(item.variantId))
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.variantId))
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right mt-4 md:mt-0">
                  <p className="font-bold">
                    $
                    {(
                      (item.price +
                        (item.lens?.totalPrice || 0) +
                        (item.policy?.price || 0)) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.variantId))}
                    className="text-red-500 mt-2 text-sm hover:underline hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-6 rounded shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-2 mb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-30 h-15 object-cover rounded mr-4"
                />
                <div className="flex-1 text-sm md:text-base">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Frame:{" "}
                    {item.originalPrice &&
                    Number(item.originalPrice) > Number(item.price) ? (
                      <>
                        <span className="line-through text-sm mr-2">
                          ${Number(item.originalPrice).toFixed(2)}
                        </span>
                        <span className="font-semibold">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">
                        ${Number(item.price || 0).toFixed(2)}
                      </span>
                    )}
                  </p>
                  {item.lens && (
                    <p>
                      Lens: ${(item.lens.totalPrice || 0).toFixed(2)} (
                      {item.lens.selectedLens})
                    </p>
                  )}
                  {item.policy && (
                    <p>
                      Policy: ${(item.policy.price || 0).toFixed(2)} (
                      {item.policy.name})
                    </p>
                  )}
                  <p className="font-bold">
                    Total: $
                    {(
                      (item.price +
                        (item.lens?.totalPrice || 0) +
                        (item.policy?.price || 0)) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* <Link to="/checkout">
              <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition hover:cursor-pointer">
                Proceed to Checkout
              </button>
            </Link> */}

            {!hideCheckout && (
              <Link to="/checkout">
                <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition hover:cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
