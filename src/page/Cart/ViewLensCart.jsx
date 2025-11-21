import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../API/Api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ViewLensCart = ({ items, hideCheckout }) => {
  const dispatch = useDispatch();
  const lensItems = items || [];

  // Track expanded details
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {lensItems.map((item) => {
            const id = item.variantId || item.id;

            return (
              <div
                key={id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={item.image || `${IMAGE_URL + item.product_image}`}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded mr-4"
                />

                {/* Product Information */}
                <div className="flex-1 mt-4 md:mt-0">
                  <h4 className="text-lg font-semibold">{item.name}</h4>

                  {/* Expand / Collapse Button */}
                  <button
                    onClick={() => toggleDetails(id)}
                    className="text-blue-600 text-sm mt-1 flex items-center gap-1 underline"
                  >
                    {openDetails[id] ? (
                      <>
                        Hide Details <FiChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        View Details <FiChevronDown size={16} />
                      </>
                    )}
                  </button>

                  {/* Slide-down Animated Details */}
                  <AnimatePresence>
                    {openDetails[id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3 bg-gray-50 border rounded text-sm text-gray-700 space-y-2">

                          {/* Prescription */}
                          {item.lens?.prescription && (
                            <div>
                              <p><strong>OD Selected:</strong> {item.lens.prescription.od_selected ? "Yes" : "No"}</p>
                              <p><strong>OD Sphere:</strong> {item.lens.prescription.od_sphere}</p>
                              <p><strong>OD Addition:</strong> {item.lens.prescription.od_addition}</p>

                              <p><strong>OS Selected:</strong> {item.lens.prescription.os_selected ? "Yes" : "No"}</p>
                              <p><strong>OS Sphere:</strong> {item.lens.prescription.os_sphere}</p>
                              <p><strong>OS Addition:</strong> {item.lens.prescription.os_addition}</p>

                              <p><strong>Prescription Date:</strong> {item.lens.prescription.prescriptionDate}</p>
                              <p><strong>Doctor Name:</strong> {item.lens.prescription.doctorName}</p>

                              <p><strong>Purchase Type:</strong> {item.lens.prescription.purchase_type}</p>
                              <p><strong>Total Lens Price:</strong> ${Number(item.lens.totalPrice).toFixed(2)}</p>
                            </div>
                          )}

                          {/* Pack */}
                          <p><strong>Pack Size:</strong> {item?.pack?.packSize || "Not selected"}</p>

                          {/* Policy */}
                          {item.policy && (
                            <div>
                              <p><strong>Policy Name:</strong> {item.policy.name}</p>
                              <p><strong>Company:</strong> {item.policy.companyName}</p>
                              <p><strong>Coverage:</strong> {item.policy.coverage}</p>
                              <p><strong>Price:</strong> ${Number(item.policy.price).toFixed(2)}</p>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => dispatch(decrementQuantity(id))}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(id))}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right mt-4 md:mt-0">
                  <p className="font-bold">
                    ${((item.price + (item.policy?.price || 0)) * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(id))}
                    className="text-red-600 mt-2 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-100 p-6 rounded shadow-sm h-fit">
          {lensItems.map((item) => (
            <div
              key={item.variantId || item.id}
              className="flex items-center justify-between border-b pb-2 mb-2"
            >
              <img
                src={item.image || `${IMAGE_URL + item.product_image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1 text-sm md:text-base ml-3">
                <h4 className="font-semibold">{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p className="font-bold">
                  ${(
                    (Number(item.price || 0) + Number(item.policy?.price || 0)) *
                    Number(item.quantity || 1)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {!hideCheckout && (
            <Link to="/checkout">
              <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900">
                Proceed to Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLensCart;
