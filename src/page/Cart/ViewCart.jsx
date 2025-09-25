import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const ViewCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>

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
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded shadow-sm"
              >
                <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-50 h-24 object-cover rounded mr-4 hover:cursor-pointer"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.name}`} state={{ ID: item.id }}>
                    <h4 className="text-lg font-semibold hover:cursor-pointer">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="px-2 py-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
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

            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-30 h-15 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Subtotal (Before Tax) :</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <button
                className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition hover:cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
