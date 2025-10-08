import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../API/Api";

const ViewLensCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Filter only contact lens items
  const lensItems = cartItems.filter(
    (item) =>
      item?.subcategory?.toLowerCase()?.includes("contact lenses") ||
      item?.subCategoryName?.toLowerCase()?.includes("contact lenses")
  );

  const subtotal = lensItems.reduce(
    (total, item) =>
      total +
      (Number(item.price) + (Number(item.policy?.price) || 0)) *
        (Number(item.quantity) || 1),
    0
  );

  if (lensItems.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No contact lenses in your cart.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Lens Items */}
        <div className="md:col-span-2 space-y-6">
          {lensItems.map((item) => (
            <div
              key={item.variantId || item.id}
              className="flex flex-col md:flex-row items-center justify-between border p-4 rounded shadow-sm"
            >
              {/* Product Image */}
              <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                <img
                  src={item.image || `${IMAGE_URL + item.product_image}`}
                  alt={item.name}
                  className="w-50 h-24 object-cover rounded mr-4 hover:cursor-pointer"
                />
              </Link>

              {/* Product & Prescription Info */}
              <div className="flex-1 mt-4 md:mt-0">
                <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                  <h4 className="text-lg font-semibold hover:cursor-pointer">
                    {item.name}
                  </h4>
                </Link>

                {/* Selected Color */}
                {item.selectedColor && (
                  <p className="mt-1 text-sm text-gray-700">
                    <strong>Color:</strong>{" "}
                    <span
                      className="inline-block w-5 h-5 rounded-full border"
                      style={{ backgroundColor: item.selectedColor }}
                    ></span>
                  </p>
                )}

                {/* Lens / Prescription Details */}
                {item.lens && item.lens.prescription && (
                  <div className="mt-2 text-sm text-gray-700 ml-2">
                    <p>
                      <strong>OD Selected:</strong>{" "}
                      {item.lens.prescription.od_selected ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>OD Sphere:</strong>{" "}
                      {item.lens.prescription.od_sphere}
                    </p>
                    <p>
                      <strong>OD Addition:</strong>{" "}
                      {item.lens.prescription.od_addition}
                    </p>
                    <p>
                      <strong>OS Selected:</strong>{" "}
                      {item.lens.prescription.os_selected ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>OS Sphere:</strong>{" "}
                      {item.lens.prescription.os_sphere}
                    </p>
                    <p>
                      <strong>OS Addition:</strong>{" "}
                      {item.lens.prescription.os_addition}
                    </p>
                    <p>
                      <strong>Prescription Date:</strong>{" "}
                      {item.lens.prescription.prescriptionDate}
                    </p>
                    <p>
                      <strong>Doctor Name:</strong>{" "}
                      {item.lens.prescription.doctorName}
                    </p>
                    <p>
                      <strong>Purchase Type:</strong>{" "}
                      {item.lens.prescription.purchase_type}
                    </p>
                    <p>
                      <strong>Total Lens Price:</strong> $
                      {Number(item.lens.totalPrice).toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Policy */}
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
                      {Number(item.policy.price).toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() =>
                      dispatch(decrementQuantity(item.variantId || item.id))
                    }
                    className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(incrementQuantity(item.variantId || item.id))
                    }
                    className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="text-right mt-4 md:mt-0">
                <p className="font-bold">
                  $
                  {(
                    (item.price + (item.policy?.price || 0)) *
                    item.quantity
                  ).toFixed(2)}
                </p>
                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.variantId || item.id))
                  }
                  className="text-red-500 mt-2 text-sm hover:underline hover:cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        {/* Order Summary */}
        <div className="bg-gray-100 p-6 rounded shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {lensItems.map((item) => (
            <div key={item.variantId || item.id} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-lg">
                  <strong>
                    {item.name} x {item.quantity}
                  </strong>
                </span>
                <span>
                  <strong>
                    $
                    {(
                      (item.price + (item.policy?.price || 0)) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </span>
              </div>
              {/* Policy info */}
              {item.policy && (
                <p className="text-sm text-gray-700 ml-2">
                  Policy: ${(item.policy.price || 0).toFixed(2)} (
                  {item.policy.name})
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition hover:cursor-pointer">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewLensCart;
