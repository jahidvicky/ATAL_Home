import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleViewCart = () => {
    onClose(); // close drawer
    navigate('/viewcart'); // navigate to View Cart page
  };

  const handleCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-xl hover:cursor-pointer font-bold">
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex hover:cursor-pointer items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-16 object-cover rounded ml-10"
              />
              <div className="ml-4">
                <p className="font-semibold">{item.name}</p>
                <p>${item.price} x {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Subtotal & Buttons */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-bold text-lg mb-3">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex gap-2 justify-around">
          <button
            onClick={handleViewCart}
            className="bg-blue-600 hover:cursor-pointer rounded-lg text-white py-2 px-6 hover:bg-blue-800 text-xl"
          >
            View Cart
          </button>

          <button onClick={handleCheckout} className="bg-green-500 rounded-lg hover:cursor-pointer text-white py-2 px-6 hover:bg-green-700 text-xl">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
